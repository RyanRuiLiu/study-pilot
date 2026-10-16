/*
 * 课程任务树：videolist（任务结构）+ queryStuyInfo（学情）合并成视频单元表。
 *
 * 结构事实（2026-10-16，三门已选课逐门核对）：
 *   - 章节 videoChapterDtos[]：视频课时 videoLessons[]（含子节 videoSmallLessons[]）
 *     与章节测验 studentExamDto（测验不在本模块范围内——只读视频单元）；
 *   - 子节的位次映射：父课时提供 lessonId 与 chapterId，子节自己提供 id——
 *     上报数组里 smallLessonId 取子节 id、lessonId 取父课时 id（无子节的课时为 0）。
 *
 * 学情两表（queryStuyInfo）：lesson（无子节课时）与 lv（子节视频），
 * 键都是单元 id，值 {watchState, studyTotalTime}；watchState=1 即完成。
 *
 * 学情请求载荷与真实浏览器逐字段核对过（2026-10-16 金样本解密）：
 *   lessonIds = **全部**父课时 id（含有子节的也进——站点对每个 videoLesson
 *   都 `le.value.push(E.id)`）；lessonVideoIds = 子节 id 列表，**非空才附**
 *   （站点：`Ae.value.length && (g.lessonVideoIds = Ae.value)`）。
 */

import type { ZhsClient } from './client.ts';

export interface ZhsUnit {
  videoId: number;
  /** 所属课时 id（子节视频为其父课时 id） */
  lessonId: number;
  /** 子节 id；无子节为 0 */
  smallLessonId: number;
  chapterId: number;
  chapterName: string;
  name: string;
  /** 视频时长（秒），上报的 y 用料 */
  sec: number;
  /** 是否已完成（watchState=1） */
  done: boolean;
  /** 平台上累计的观看秒数（上报的 Ke 基数） */
  studyTotalTime: number;
}

/** 章节原始节点（videolist 的 `videoChapterDtos[]` 元素）。 */
export type ZhsChapterNode = Record<string, unknown>;

/**
 * 一次 `videolist` 读取，返回章节原始表。
 *
 * 抽出来是因为**同一份表要喂两个消费者**（视频单元与章节测验条目）——
 * 让它们各读一次等于每门课多付一次读费，而这个仓的口径是「每门课一次结构读取」。
 */
export async function readCourseChapters(
  client: ZhsClient,
  course: { recruitAndCourseId: string; recruitId: number },
): Promise<ZhsChapterNode[]> {
  const listBody = (await client.call('videoList', { recruitAndCourseId: course.recruitAndCourseId })) as {
    data?: { videoChapterDtos?: ZhsChapterNode[] | null } | null;
  };
  return listBody.data?.videoChapterDtos ?? [];
}

/** 读结构 + 学情，合并成单元表（章节自然序）。`chapters` 给了就不重复读 videolist。 */
export async function getCourseUnits(
  client: ZhsClient,
  course: { recruitAndCourseId: string; recruitId: number },
  chapters?: readonly ZhsChapterNode[],
): Promise<ZhsUnit[]> {
  const nodes = chapters ?? (await readCourseChapters(client, course));

  const units: ZhsUnit[] = [];
  const lessonIds: number[] = [];
  const smallLessonIds: number[] = [];
  for (const chapter of nodes) {
    const chapterId = num(chapter.id);
    const chapterName = str(chapter.name);
    for (const lesson of arr(chapter.videoLessons)) {
      const lessonId = num(lesson.id);
      // 每个父课时都进 lessonIds——含有子节的也进（与站点一致，金样本 59/59）
      lessonIds.push(lessonId);
      const kids = arr(lesson.videoSmallLessons);
      if (kids.length > 0) {
        for (const child of kids) {
          const childId = num(child.id);
          smallLessonIds.push(childId);
          units.push({
            videoId: num(child.videoId),
            lessonId,
            smallLessonId: childId,
            chapterId,
            chapterName,
            name: str(child.name),
            sec: num(child.videoSec),
            done: false,
            studyTotalTime: 0,
          });
        }
      } else {
        units.push({
          videoId: num(lesson.videoId),
          lessonId,
          smallLessonId: 0,
          chapterId,
          chapterName,
          name: str(lesson.name),
          sec: num(lesson.videoSec),
          done: false,
          studyTotalTime: 0,
        });
      }
    }
  }

  const infoPayload: Record<string, unknown> = { lessonIds, recruitId: course.recruitId };
  // 子节表非空才附（站点语义；空数组不上线）
  if (smallLessonIds.length > 0) infoPayload.lessonVideoIds = smallLessonIds;
  const infoBody = (await client.call('studyInfo', infoPayload)) as {
    data?: {
      lesson?: Record<string, { watchState?: unknown; studyTotalTime?: unknown }> | null;
      lv?: Record<string, { watchState?: unknown; studyTotalTime?: unknown }> | null;
    } | null;
  };
  const marks = new Map<number, { watchState?: unknown; studyTotalTime?: unknown }>();
  for (const table of [infoBody.data?.lesson, infoBody.data?.lv]) {
    for (const [key, value] of Object.entries(table ?? {})) marks.set(Number(key), value);
  }

  return units.map((unit) => {
    const mark = marks.get(unit.smallLessonId !== 0 ? unit.smallLessonId : unit.lessonId);
    return {
      ...unit,
      done: mark?.watchState === 1,
      studyTotalTime: num(mark?.studyTotalTime),
    };
  });
}

/**
 * 章节测验条目——每章一个「测试」（官方名「单元测试」，进「平时测试成绩」）。
 *
 * 四个 id 分两套形态，**缺一不可**（实测样本 `.probe/zhs-ctm-videolist.json`）：
 *   - 数字那对（神谕入参）：`studentExamDto.id` = stuExamId、`studentExamDto.exam.id` = examId；
 *   - 8 字符串那对（PC 考试族入参）：`examUrl` 的路由段
 *     `dohomework/<recruitId>/<listId>/<examKey>/<courseId>/<schoolId>/<N>`
 *     ——`listId` 就是清单的 `id`（lookHomework 的 studentExamId 用料），`examKey` 是 `t2`。
 *
 * **数字那对只在这里有**：考试族的 PC 清单只给 8 字符串形态，神谕只吃数字形态，
 * 两边靠这个 DTO 合上。这也解释了为什么神谕的入参不需要任何「找 id」的动作——
 * 它本来就在我们已经在读的结构里。
 */
export interface ZhsChapterExam {
  chapterName: string;
  /** dohomework 路由的 t1；清单的 `id`；lookHomework 的 studentExamId */
  listId: string;
  /** dohomework 路由的 t2（examBase.id） */
  examKey: string;
  /** 数字 examId（神谕入参） */
  examId: number;
  /** 数字 stuExamId（神谕入参） */
  stuExamId: number;
}

/**
 * 从章节表里取测验条目（纯函数）。
 *
 * 解析不出必需字段的章节**跳过**——那表示该章没有测验（或平台换了形态），
 * 不猜、不占位。`examUrl` 按**段位**取（在整串里正则找会把课程号/id 认错）。
 */
export function chapterExams(chapters: readonly ZhsChapterNode[]): ZhsChapterExam[] {
  const exams: ZhsChapterExam[] = [];
  for (const chapter of chapters) {
    const dto = chapter.studentExamDto as Record<string, unknown> | null | undefined;
    if (dto === null || dto === undefined) continue;

    const stuExamId = num(dto.id);
    const examId = num((dto.exam as Record<string, unknown> | null | undefined)?.id);
    const route = parseHomeworkRoute(str(dto.examUrl));
    if (stuExamId === 0 || examId === 0 || route === null) continue;

    exams.push({
      chapterName: str(chapter.name),
      listId: route.listId,
      examKey: route.examKey,
      examId,
      stuExamId,
    });
  }
  return exams;
}

/** 取 `…/dohomework/<recruitId>/<t1>/<t2>/…` 的两枚 8 字符串；形态不符返回 null。 */
function parseHomeworkRoute(url: string): { listId: string; examKey: string } | null {
  const segments = url.split('/');
  const at = segments.indexOf('dohomework');
  if (at < 0) return null;
  const listId = segments[at + 2]; // dohomework 之后：recruitId, t1, t2, …
  const examKey = segments[at + 3];
  if (listId === undefined || examKey === undefined || listId === '' || examKey === '') return null;
  return { listId, examKey };
}

function num(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function arr(value: unknown): Array<Record<string, unknown>> {
  return Array.isArray(value) ? (value as Array<Record<string, unknown>>) : [];
}
