/*
 * 智慧树的平台实现（后台半边）。
 *
 * 与慕课同一条契约（application/ports.ts 的 PlatformTasks）：调度层只看到
 * PlanItem 与 RunOutcome，courseId/recruitId/lessonId 这些装进 payload 原样往返。
 *
 * 计划 = 「勾选的课程里，所有未完成的视频单元 ＋ 所有该我们做的单元测试」。
 * 视频按章节自然序（平台里部分课程禁止跨章学习，自然序同时满足那种约束）；
 * 单元测试的判据与待办同源（`needsWork`），否则界面列着的与执行做的会对不上。
 * 每门课三次读取：videolist ＋ queryStuyInfo ＋ 作业清单两个页签。
 */

import type {
  ConfigPort,
  PlanItem,
  PlanResult,
  PlatformTasks,
  RunControl,
  RunOutcome,
  RunSelection,
} from '@study-pilot/application';
import type { ZhihuishuCourse } from '@study-pilot/application';
import { ZhsAuthError, type ZhsClient } from '../client.ts';
import { readCourseIsApply, selectedCourses } from '../courses.ts';
import {
  getExamList,
  HOMEWORK_STATE,
  MEET_COURSE_TYPE,
  needsWork,
  type ZhsExamListItem,
} from '../exam-list.ts';
import { readSession, type CookieReader } from '../session.ts';
import { chapterExams, getCourseUnits, readCourseChapters, type ZhsChapterExam, type ZhsUnit } from '../structure.ts';
import { executeUnit, type ExecuteUnitInput } from './execute.ts';
import { executeExam, type ExamEnter, type ExamRunInput, type ExamTarget } from './execute-exam.ts';
import { getMeetSessions, type ZhsMeetSession } from '../meet.ts';
import { readMeetWatchHistory, watchMeetReplay } from '../meet-watch.ts';

/** 平台跑一轮需要的外界能力。由装配层创建后注入（与慕课同一形状）。 */
export interface ZhsRunDeps {
  config: ConfigPort;
  client: ZhsClient;
  /** 读 cookie 的宿主能力：会话判定的唯一来源（见 session.ts） */
  readCookie: CookieReader;
}

/** 单元项的 id 与标题取名（界面展示与「只做这一条」回传都用它，必须同一份）。 */
export function unitItemId(unit: ZhsUnit): string {
  return `zhs-unit-${unit.videoId}-${unit.smallLessonId}`;
}

/** payload 形状由本文件保证（plan 放进去，run 取出来）。 */
interface UnitPayload {
  course: ZhihuishuCourse;
  unit: ZhsUnit;
}

/** 单元测试项的 id（展示与「只做这一条」回传都用它，必须同一份）。 */
export function quizItemId(item: ZhsExamListItem): string {
  return `zhs-quiz-${item.id}`;
}

/** 见面课观看项的载荷。 */
interface MeetPayload {
  course: ZhihuishuCourse;
  session: ZhsMeetSession;
}

/** 见面课观看项的 id（与学员界面「执行」的范围 id 同一份）。 */
export function meetItemId(session: ZhsMeetSession): string {
  return `zhs-meet-${session.taskId}`;
}

/** 单元测试项的载荷：清单条目 + 章节结构（数字 id 与弹题通道入口都在后者里）。 */
interface QuizPayload {
  course: ZhihuishuCourse;
  item: ZhsExamListItem;
  chapter: ZhsChapterExam;
  /** 该卷总分（清单给的；判满分的基准。拿不到就是 null，神谕判据会据此失效） */
  totalScore: number | null;
  /** 进会话的方式——决定要不要先申请重做（见 execute-exam.ts 的 ExamEnter） */
  enter: ExamEnter;
}

export function createZhsTasks(deps: ZhsRunDeps): PlatformTasks {
  /**
   * 每课一份 isApply（开课载荷用料）。真实页面每次加载读一次 queryCourse；
   * 我们按「一轮里每课一次」对齐——plan 开始时清空，同轮各单元共用一份。
   */
  const isApplyByCourse = new Map<number, Promise<number | string>>();

  function isApplyOf(course: ZhihuishuCourse): Promise<number | string> {
    let entry = isApplyByCourse.get(course.courseId);
    if (entry === undefined) {
      entry = readCourseIsApply(deps.client, course.secret);
      // 失败不进缓存（取钥先例）：下次调用应该重试，而不是永远拿到那个失败的 Promise
      entry.catch(() => isApplyByCourse.delete(course.courseId));
      isApplyByCourse.set(course.courseId, entry);
    }
    return entry;
  }

  return {
    id: 'zhihuishu',
    name: '智慧树',

    async isReady(): Promise<boolean> {
      return (await readSession(deps.readCookie)).loggedIn;
    },

    async plan(_now: number, scope?: RunSelection): Promise<PlanResult> {
      isApplyByCourse.clear();
      const settings = await deps.config.read();
      const selected = selectedCourses(settings, scope);
      if (selected.length === 0) return { items: [], blocked: 'no-course' };

      const account = await readSession(deps.readCookie);
      if (!account.loggedIn) return { items: [], needsLogin: true };

      const items: PlanItem[] = [];
      try {
        for (const course of selected) {
          // 每门课一次结构读取：同一份章节表喂视频单元与章节测验条目（见 structure.ts）
          const chapters = await readCourseChapters(deps.client, {
            recruitAndCourseId: course.secret,
            recruitId: course.recruitId,
          });
          const units = await getCourseUnits(
            deps.client,
            { recruitAndCourseId: course.secret, recruitId: course.recruitId },
            chapters,
          );
          for (const unit of units) {
            if (unit.done) continue;
            items.push({
              id: unitItemId(unit),
              group: course.name,
              title: unit.name,
              mode: 'auto',
              kind: 'courseware',
              payload: { course, unit } satisfies UnitPayload,
            });
          }

          /*
           * 单元测试：判据是 `needsWork`（**与待办同一个**）——未交页签里
           * 「没动过」与「重做已申请」的都进计划，只是进法不同（见 `ExamEnter`）。
           * 其余状态（4 已交且已满分）由已交那一条覆盖。
           *
           * 对上章节靠的是**路由段**：清单条目的 `id` ＝ 该章 `studentExamDto.examUrl`
           * 里 dohomework/checkHomework 之后的第一个 token（`chapterExams` 叫它 `listId`）。
           * 对不上就不排（那条数字卷号与神谕入参都拿不到）。`cpOrderNumber` 只是章节名，
           * 用来给人看的，不参与匹配。
           */
          const chapterList = chapterExams(chapters);
          const chapterByListId = new Map(chapterList.map((exam) => [exam.listId, exam]));
          const chapterOrder = new Map(chapterList.map((exam, index) => [exam.listId, index]));
          /** 本课的测验项：先收齐再按章节自然序排，避免后面的未做项插到前面低分卷之前 */
          const quizItems: PlanItem[] = [];
          const pendingPage = await getExamList(deps.client, {
            recruitId: course.recruitId,
            courseId: course.courseId,
            submitted: false,
          });
          const historyPage = await getExamList(deps.client, {
            recruitId: course.recruitId,
            courseId: course.courseId,
            submitted: true,
          });
          /*
           * 没取全就**不排这一轮**：半份清单排出来的计划会漏掉该做的卷，
           * 而漏掉的那些不会自己说话。整轮停下来说清原因，比默默少做几张便宜。
           * 这与「一页取全」的实测结论配套——结论写死在 EXAM_LIST_PAGE_SIZE 上。
           */
          if (!pendingPage.complete || !historyPage.complete) {
            throw new Error('读取失败：作业清单超过一页未取全');
          }
          const pending = pendingPage.items;
          const history = historyPage.items;

          const pushQuiz = (item: ZhsExamListItem, totalScore: number | null, enter: ExamEnter): void => {
            /*
             * **只排单元测试**。见面课测验只有一次作答机会，与期末同一处置：
             * 只展示、不自动。平台目前也确实把它放在另一份清单里；这里再判一次
             * 题型，是为了平台哪天把两类混进同一份清单时也不会被自动作答。
             */
            if (item.meetCourseType !== MEET_COURSE_TYPE.unitTest) return;
            const chapter = chapterByListId.get(item.id);
            if (chapter === undefined) return; // 对不上章节就不做（拿不到数字卷号，神谕也用不了）
            quizItems.push({
              id: quizItemId(item),
              group: course.name,
              title: item.examName,
              mode: 'auto',
              kind: 'quiz',
              payload: { course, item, chapter, totalScore, enter } satisfies QuizPayload,
            });
          };

          /*
           * ① 未交页签里我们接手的那些。见面课测验在 `pushQuiz` 里被题型闸挡掉：
           * 平台的重做只按 `examId` 判、不分题型（源码 `9.c58d…js:11803`），
           * 但我们**只替用户做单元测试**——见面课测验只有一次机会，与期末同一处置。
           */
          for (const item of pending) {
            if (!needsWork(item)) continue;
            pushQuiz(item, item.totalScore, item.state === HOMEWORK_STATE.redone ? 'redoOpen' : 'fresh');
          }
          /*
           * ② 已交但没满分的（Ryan 口径：直接走第二次——收割建键是只读的，不用重打第一枪）。
           * 同样只限单元测试；机会门槛仍由执行侧的 `remainingGate` 把。
           */
          for (const item of history) {
            if (item.state !== HOMEWORK_STATE.submitted) continue;
            if (item.score === null || item.totalScore === null || item.score >= item.totalScore) continue;
            pushQuiz(item, item.totalScore, 'submitted');
          }
          quizItems.sort((left, right) => {
            const leftOrder = chapterOrder.get((left.payload as QuizPayload).item.id) ?? Number.MAX_SAFE_INTEGER;
            const rightOrder = chapterOrder.get((right.payload as QuizPayload).item.id) ?? Number.MAX_SAFE_INTEGER;
            if (leftOrder !== rightOrder) return leftOrder - rightOrder;
            return left.title.localeCompare(right.title, 'zh-CN');
          });
          items.push(...quizItems);

          /*
           * 见面课：只排「在线观看 + 已结束 + 有回放 + 还没看完」的场次。
           * 观看 80% 即考勤完成（2026-10-23 真机闭环）；现场签到型与未来直播不排，
           * 由界面如实留着。已出现 `#` 的视为完成，不再排——否则 CLI 的待办会
           * 把已看完的回放一直列成可做，与弹窗口径对不上。
           * 读失败不拖垮整门课的计划——见面课是附加项；单场历史读不到时保留，
           * 由执行侧再读一次。
           */
          try {
            const sessions = await getMeetSessions(deps.client, course.recruitId);
            for (const session of sessions) {
              if (session.signOpenStatus !== 2) continue;
              if (session.status !== 3 || session.replayUrl === null) continue;
              if (account.userId !== null && session.liveCourseId !== null) {
                try {
                  const history = await readMeetWatchHistory(
                    deps.client,
                    session.liveCourseId,
                    account.userId,
                  );
                  if (history.split(',').includes('#')) continue;
                } catch (error) {
                  if (error instanceof ZhsAuthError) throw error;
                  // 保留该项，执行侧会再读历史再决定
                }
              }
              items.push({
                id: meetItemId(session),
                group: course.name,
                title: session.name,
                mode: 'auto',
                kind: 'meetWatch',
                payload: { course, session } satisfies MeetPayload,
              });
            }
          } catch (error) {
            if (error instanceof ZhsAuthError) throw error;
            // 见面课读取失败不阻断视频/测验计划；界面另有场次读取的如实说明
          }
        }
      } catch (error) {
        // 登录失效是账号级的事实：整份计划作废，按未登录交回去（与慕课 plan 同一形状）
        if (error instanceof ZhsAuthError) return { items: [], needsLogin: true };
        throw error;
      }
      return { items };
    },

    async run(item: PlanItem, _heartbeat: () => Promise<void>, control: RunControl): Promise<RunOutcome> {
      if (item.kind === 'meetWatch') {
        const { course, session } = item.payload as MeetPayload;
        const current = await readSession(deps.readCookie);
        if (!current.loggedIn) return { status: 'failed', message: '未登录' };
        if (current.userId === null) return { status: 'failed', message: '会话缺少 userId，无法上报见面课观看进度' };
        if (control.stopped()) return { status: 'skipped', message: '已停止' };
        try {
          return await watchMeetReplay(
            deps.client,
            session,
            { recruitId: course.recruitId, userId: current.userId },
            control,
          );
        } catch (error) {
          if (error instanceof ZhsAuthError) throw error;
          return { status: 'failed', message: error instanceof Error ? error.message : String(error) };
        }
      }
      if (item.kind === 'quiz') return runQuiz(item, control);
      const { course, unit } = item.payload as UnitPayload;
      if (course.secret.length === 0) {
        return { status: 'failed', message: '课程缺少入口参数，先读取课程列表' };
      }
      const session = await readSession(deps.readCookie);
      if (!session.loggedIn) return { status: 'failed', message: '未登录' };

      let isApply: number | string;
      try {
        isApply = await isApplyOf(course);
      } catch (error) {
        return { status: 'failed', message: error instanceof Error ? error.message : String(error) };
      }

      const input: ExecuteUnitInput = {
        recruitAndCourseId: course.secret,
        courseId: course.courseId,
        recruitId: course.recruitId,
        unit,
        deviceUuid: session.uuid,
        isApply,
      };
      // 快速模式：单元内无长等待，心跳交还给外壳自己的节奏
      return executeUnit(deps.client, input, control);
    },
  };

  /**
   * 单元测试那一枪。
   *
   * 第一期**答案键只有一个来源：该卷历史已交**（`lookHomework` → 弹题通道），
   * 所以这里每次现收割、用完即弃（不落盘，见设计文档 §7-5）。这也意味着
   * **从没交过的卷没有键**——那正是探路重做存在的理由。
   *
   * 收割是只读的；真正的写（开卷/作答/交卷/重做）全在 executeExam 里，
   * 由它自己的闸门看着。
   */
  async function runQuiz(item: PlanItem, control: RunControl): Promise<RunOutcome> {
    const { course, item: entry, chapter, totalScore, enter } = item.payload as QuizPayload;
    const session = await readSession(deps.readCookie);
    if (!session.loggedIn) return { status: 'failed', message: '未登录' };

    const target: ExamTarget = {
      recruitId: course.recruitId,
      courseId: course.courseId,
      schoolId: chapter.schoolId,
      listId: entry.id,
      examKey: entry.examId,
      examIdNum: chapter.examId,
      stuExamIdNum: chapter.stuExamId,
    };

    const input: ExamRunInput = {
      target,
      userId: session.userId,
      key: null, // 第一期不做键的落盘：每次现收割、用完即弃（见 execute-exam.ts 的 harvestKey）
      questionIds: [],
      totalScore,
      popupLessonId: chapter.lessonId,
      enter,
      recruitAndCourseId: course.secret,
    };
    return executeExam(deps.client, input, control);
  }
}

