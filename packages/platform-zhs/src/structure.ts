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

/** 读结构 + 学情，合并成单元表（章节自然序）。 */
export async function getCourseUnits(
  client: ZhsClient,
  course: { recruitAndCourseId: string; recruitId: number },
): Promise<ZhsUnit[]> {
  const listBody = (await client.call('videoList', { recruitAndCourseId: course.recruitAndCourseId })) as {
    data?: { videoChapterDtos?: Array<Record<string, unknown>> | null } | null;
  };
  const chapters = listBody.data?.videoChapterDtos ?? [];

  const units: ZhsUnit[] = [];
  const lessonIds: number[] = [];
  const smallLessonIds: number[] = [];
  for (const chapter of chapters) {
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

function num(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function arr(value: unknown): Array<Record<string, unknown>> {
  return Array.isArray(value) ? (value as Array<Record<string, unknown>>) : [];
}
