/*
 * 课程快照。
 *
 * 上一次从平台读到的东西，原样存下来。它的唯一用途是：**在没有发任何请求的
 * 前提下，判断「现在值不值得去拉一次最新的」**。
 *
 * 为什么不直接拿它做判断和提醒
 * ----------------------------
 * 它记录的是过去某一刻的状态。你在别处做过、老师改过截止、互评配额变了，
 * 这些都不会反映在里面。所以：
 *   - 它说「没事」→ 可以不去拉（省请求）
 *   - 它说「有事」→ 必须拉回来确认
 *   - 它从不直接用于通知，通知只报确认过的事实
 *
 * 存什么、不存什么
 * ----------------
 * 只存判断所需的字段：做没做、截止时间、互评进度。不存题干、不存答案、
 * 不存得分明细——那些对判断没有用，存了只是扩大泄漏面。
 *
 * 与用户配置分开存放
 * ----------------
 * 配置是用户的意图，快照是运行时的观测结果。混在一起会让「恢复默认设置」
 * 把观测数据也一起清掉，也会让配置的迁移逻辑被无关字段拖累。
 *
 * 这个文件做三件事：定义结构、从平台拉取填充、读写到本地。
 * 三者是同一件事的三段——结构决定拉什么，拉取产出结构，读写负责存取。
 * 拆开的话，加一个字段要改三个文件，而漏改任何一个都不会有编译错误。
 */

import { storage } from 'wxt/utils/storage';
import {
  currentEvaluatePhase,
  deriveStatus,
  getCourseStructure,
  getEvaluationDetail,
  type MoocClient,
} from '@study-pilot/platform-mooc';
import { dateKey } from './scheduler';

/** 一个单元项在快照里的样子。 */
export interface SnapshotWork {
  tid: number;
  name: string;
  chapterName: string;
  /**
   * 考试自身的 id，仅考试有。
   *
   * 答卷页地址需要它，而它不属于任何单元，只能随快照一起存下来。
   */
  examId: number | null;
  type: 'quiz' | 'homework' | 'exam-objective' | 'exam-subjective';
  /** 做没做。测验看 usedTryCount，作业看是否交过 */
  submitted: boolean;
  /** 提交截止 */
  deadline: number | null;
  /** 互评窗口起点 */
  evaluateStart: number | null;
  /** 互评截止 */
  evaluateEnd: number | null;
  /** 成绩发布时间 */
  evaluateScoreRelease: number | null;
  score: number | null;
  totalScore: number | null;
  /** 这份作业是否带互评环节 */
  reviewable: boolean;
  /** 互评已完成的份数；未查过为 null */
  evaluateDone: number | null;
  /** 互评配额；未查过为 null */
  evaluateTotal: number | null;
  /** 自评是否已完成；未查过为 null */
  selfDone: boolean | null;
}

export interface SnapshotCourse {
  termId: number;
  /** 拼跳转地址用 */
  courseId: number;
  schoolShortName: string;
  mode: number;
  courseName: string;
  works: SnapshotWork[];
}

export interface Snapshot {
  /** 拉到这份数据的时刻 */
  fetchedAt: number;
  /** 拉取那天的本地日期键，用于判断「今天全量拉过没有」 */
  fetchedDate: string;
  courses: SnapshotCourse[];
}

const item = storage.defineItem<Snapshot | null>('local:study-pilot-snapshot', {
  fallback: null,
});

/**
 * 读快照。
 *
 * 返回 null 表示「确实还没存过快照」（首次安装），这与「读不出来」是两件事，
 * 所以不在这里吞掉存储异常——它抛出来由调用方处理。
 * 把两者合并成一个 null，排查时就说不出到底发生过什么。
 */
export async function readSnapshot(): Promise<Snapshot | null> {
  return await item.getValue();
}

export async function writeSnapshot(snapshot: Snapshot): Promise<void> {
  await item.setValue(snapshot);
}

export async function clearSnapshot(): Promise<void> {
  await item.setValue(null);
}

/** 用当前时间构造一份快照的元信息。 */
export function snapshotStamp(now: number = Date.now()): {
  fetchedAt: number;
  fetchedDate: string;
} {
  return { fetchedAt: now, fetchedDate: dateKey(now) };
}

/** 今天是否已经全量拉取过。 */
export function fetchedToday(snapshot: Snapshot | null, now: number = Date.now()): boolean {
  return snapshot !== null && snapshot.fetchedDate === dateKey(now);
}

/**
 * 平台返回的数值字段可能是 null、也可能是别的类型，还有可能是缺失的。
 *
 * 平台上测验、作业、考试三种 test 的字段并不完全一致，
 * 公共类型里用了索引签名兜底。直接取会得到 unknown，
 * 而我们要的是「不是数字就当没有」，所以统一走这里。
 */
function asNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

/**
 * 与 `asNumber` 相同，但把 0 当作「没有」。
 *
 * 用在满分这类字段上：0 在这些字段上不是有效值，而是「这部分不存在」的
 * 表示法——一份纯客观题考试会把主观题满分报成 0。
 */
function positive(value: unknown): number | null {
  const parsed = asNumber(value);
  return parsed !== null && parsed > 0 ? parsed : null;
}

/**
 * 拉取时需要的课程信息。
 *
 * 只列真正用到的字段，而不是要求一个完整的 CourseSummary。理由是调用方
 * 持有的是用户配置里的课程（只有 termId、课程名与定位信息），
 * 为了凑齐接口类型去编造 schoolName、coverUrl 之类的字段，
 * 等于在代码里写下不存在的事实。
 */
export interface InspectCourse {
  termId: number;
  courseId: number;
  schoolShortName: string;
  /** 课程模式。缺失时为 null，快照里记 -1 表示未知 */
  mode: number | null;
  /** 课程名。为空时回退到平台返回的名字 */
  name: string;
}

/**
 * 拉取指定课程的当前状态，产出一份快照。
 *
 * 单门课失败不中断整轮：其余课程的数据仍然有用，而失败的那门会在下一次
 * 拉取时补上。若全部失败则抛错——那种情况下返回一份空快照会让上层误以为
 * 「确实没有待办」。
 */
export async function inspect(
  client: MoocClient,
  courses: InspectCourse[],
  evaluatorId: number,
  now: number = Date.now(),
): Promise<Snapshot> {
  const snapshotCourses: SnapshotCourse[] = [];
  let failures = 0;

  for (const course of courses) {
    const structure = await getCourseStructure(client, course.termId);
    if (!structure.ok) {
      failures++;
      continue;
    }

    const works: SnapshotWork[] = [];

    for (const work of structure.value.works) {
      const status = deriveStatus(work, now);
      const isHomework = work.type === 'homework';
      const phase = isHomework ? currentEvaluatePhase(work.test, now) : null;

      const entry: SnapshotWork = {
        tid: work.tid,
        name: work.name,
        chapterName: work.chapterName,
        examId: work.examId ?? null,
        type: work.type,
        submitted: status.submitted,
        deadline: asNumber(work.test.deadline),
        evaluateStart: asNumber(work.test.evaluateStart),
        evaluateEnd: asNumber(work.test.evaluateEnd),
        evaluateScoreRelease: asNumber(work.test.evaluateScoreReleaseTime),
        score: asNumber(work.test.userScore),
        /*
         * 考试的满分不在 totalScore 上，而是按题型分开：
         * 主观题在 sbjTotalScore、客观题在 objTotalScore，两者的
         * totalScore 都是 null。只读一个字段会让考试的得分列一直空着——
         * 明明有分数，却显示不出「100 / 100」。
         *
         * 三处都要跳过 0，不能只跳过 null。0 在这几个字段上不是
         * 「满分为零」，而是「这部分不存在」：一份纯客观题考试会报
         * sbjTotalScore 为 0 而 objTotalScore 为 100。用 ?? 会把 0 当成
         * 有效值，于是满分显示成 0。
         */
        totalScore:
          positive(work.test.totalScore) ??
          positive(work.test.sbjTotalScore) ??
          positive(work.test.objTotalScore),
        reviewable: status.reviewable,
        evaluateDone: null,
        evaluateTotal: null,
        selfDone: null,
      };

      /*
       * 只对「已提交且处于互评期」的作业查配额。
       *
       * 三个条件缺一不可：
       *   已提交   —— 没交的话根本轮不到评
       *   支持互评 —— 有些作业没有互评环节
       *   互评期中 —— 窗口外查出来的份数没有意义
       * 这样一次检查通常只多出一两个请求。
       */
      if (status.submitted && status.reviewable && phase === 2) {
        const detail = await getEvaluationDetail(client, work.tid, evaluatorId);
        if (detail.ok) {
          const { required, remaining } = detail.value;
          entry.evaluateTotal = required;
          entry.evaluateDone = required - remaining;
          entry.selfDone = detail.value.self?.done ?? null;
        }
      }

      works.push(entry);
    }

    snapshotCourses.push({
      termId: course.termId,
      courseId: course.courseId,
      schoolShortName: course.schoolShortName,
      mode: course.mode ?? -1,
      courseName: course.name,
      works,
    });
  }

  if (failures > 0 && snapshotCourses.length === 0) {
    throw new Error(`全部 ${failures} 门课程都读取失败`);
  }

  return { ...snapshotStamp(now), courses: snapshotCourses };
}
