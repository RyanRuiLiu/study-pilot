/*
 * 从平台拉取填充快照。
 *
 * 一次现读现填，**不落任何存储**：读回来的东西只活在这一次调用里，
 * 界面上看到的每一个数字都来自刚刚发出的请求。
 *
 * 这里曾经还描述过一套「把上次读到的存下来、判断值不值得去拉」的省请求
 * 机制（对应的存储键是当年的 study-pilot-snapshot）——它早已随定时检查
 * 一起删掉：现在每次读取都由人点按钮触发，「值不值得拉」由用户决定，
 * 那个键在代码里没有任何读写方。
 */

import { deriveStatus, getCourseStructure } from '../../structure.ts';
import { currentEvaluatePhase, getEvaluationDetail } from '../../review.ts';
import type { MoocClient } from '../../client.ts';
import { SessionExpiredError } from '../session.ts';
import type { InspectCourse, Snapshot, SnapshotCourse, SnapshotWork } from './types.ts';

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
  let authFailures = 0;
  /*
   * 第一条失败的具体原因。只报「全部 N 门都失败」等于把最有用的信息丢掉：
   * 用户与排查者都分不清是会话、地址、签名还是平台改了字段。
   */
  let firstFailure = '';

  for (const course of courses) {
    const structure = await getCourseStructure(client, course.termId);
    if (!structure.ok) {
      /*
       * auth 失败单独记账：它同时是「会话已死」的候选证据。
       * mocTermDto 为 null 也可能只是那一门课真的没了，所以只有
       * **全部**课程都栽在这个形态上才判会话失效——个别课程如此时，
       * 仍按普通的单门失败处理，其余课程照常进快照。
       */
      if (structure.error.kind === 'auth') authFailures++;
      failures++;
      if (firstFailure === '') {
        firstFailure = `课程 ${course.courseId}：${structure.error.kind} ${structure.error.message}`;
      }
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
        usedTryCount: asNumber(work.test.usedTryCount),
        totalTryCount: asNumber(work.test.totalTryCount),
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
      units: structure.value.units,
    });
  }

  if (failures > 0 && snapshotCourses.length === 0) {
    /*
     * 全部失败且全部是未登录形态：会话在服务端已死。
     * 抛专用错误而不是普通消息，调用方才能走「续期后重读」而不是
     * 把一句失败文案端给用户。续期后仍如此的情形（课程真的都不在了）
     * 由编排层区分，这里不下那个结论。
     */
    if (authFailures === courses.length) throw new SessionExpiredError();
    throw new Error(`全部 ${failures} 门课程都读取失败（${firstFailure}）`);
  }

  return { courses: snapshotCourses };
}
