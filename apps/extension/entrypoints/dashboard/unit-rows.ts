/*
 * 平台明细 → 明细表的行。
 *
 * 平台上给的是状态码与一段解释，界面上要显示的是「当前状态」这句话本身
 * （未提交、互评 2 / 5、成绩已公布）。这一层只做两件事：
 *   - 状态码 → 说法与配色语气
 *   - 一条单元 → 明细表要的字段（名称、状态、截止、得分、去处）
 * 表的摆法在 src/ui/details.ts，这里不管 DOM。
 */

import { workPageUrl } from '@study-pilot/platform-mooc';
import { WORK_STATUS, type UnitDetail } from '../../src/platform/messaging';
import { formatDateTime } from '../../src/features/format';
import type { DetailGroup, DetailRow } from '../../src/ui/details.ts';

/**
 * 状态的配色分类。
 *
 *   未提交 / 已过截止未提交   需要注意
 *   互评阶段                  仍要用户动手
 *   成绩已公布 / 等待成绩公布  已完成，无需行动
 */
function statusTone(detail: UnitDetail): DetailRow['tone'] {
  if (!detail.submitted) return 'warn';
  if (detail.status === WORK_STATUS.REVIEWING) return 'active';
  // 互评已完成仍需等待成绩，但不需用户动手，归入完成态
  return 'ok';
}

/**
 * 状态一格。
 *
 * 互评进度附在状态后面，不单占一列：「互评阶段」这四个字不说明做到哪一步——
 * 一份未评与已经评够，字面完全相同。附上「2 / 5」把两者分开。
 */
function statusCell(detail: UnitDetail): { text: string; title: string } {
  if (detail.status === WORK_STATUS.REVIEWING && detail.evaluateTotal !== null) {
    return {
      text: `互评 ${detail.evaluateDone} / ${detail.evaluateTotal}`,
      title: `已为 ${detail.evaluateDone} 份作业评分，配额 ${detail.evaluateTotal} 份`,
    };
  }
  return { text: detail.status, title: detail.statusDetail };
}

/** 截止一格。明细只给绝对时间，不给「还有几天」——那是弹窗要回答的问题。 */
function whenCell(detail: UnitDetail): { text: string; title?: string } {
  if (detail.deadline === null) return { text: '无' };
  return {
    text: formatDateTime(detail.deadline),
    title:
      detail.status === WORK_STATUS.OVERDUE
        ? `已于 ${formatDateTime(detail.deadline)} 截止`
        : `截止 ${formatDateTime(detail.deadline)}`,
  };
}

/**
 * 得分一格，统一成「得分 / 满分」。
 *
 * 未作答时用短横占位，与已作答行的格式一致，两列对齐后一眼能看出哪些空着。
 * totalScore 是这份作业的总分值，不是我的得分，所以不能写成「满分 100」。
 */
function scoreCell(detail: UnitDetail): { text: string; title: string } | undefined {
  if (detail.totalScore == null) return undefined;
  const got = detail.score ?? '—';
  return {
    text: `${got} / ${detail.totalScore}`,
    title:
      detail.score != null
        ? `得分 ${detail.score}，满分 ${detail.totalScore}`
        : `尚未作答，满分 ${detail.totalScore}`,
  };
}

/**
 * 一条单元一行，整行可点。
 *
 * 明细的用途是「这门课我做到哪了」，看到之后下一步往往是去处理它。
 * 考试也一样——它有专门的答卷页，地址需要 examId 与题型。
 * 视图名与详情里的类型一一对应，直接把类型传给拼地址的函数，不做映射转换。
 */
function rowOf(detail: UnitDetail): DetailRow {
  const status = statusCell(detail);
  const when = whenCell(detail);
  const score = scoreCell(detail);

  return {
    key: String(detail.tid),
    name: detail.chapterName ? `${detail.chapterName} · ${detail.name}` : detail.name,
    status: status.text,
    tone: statusTone(detail),
    statusTitle: status.title,
    when: when.text,
    whenTitle: when.title,
    score: score?.text,
    scoreTitle: score?.title,
    href: workPageUrl(
      {
        courseId: detail.courseId,
        schoolShortName: detail.schoolShortName,
        mode: detail.mode,
        termId: detail.termId,
      },
      detail.type,
      detail.tid,
      detail.examId ?? undefined,
    ),
  };
}

/** 按课程分段：同一个名字的连续几行归一段，顺序沿用后台给的顺序。 */
export function unitGroups(details: UnitDetail[]): DetailGroup[] {
  const groups: DetailGroup[] = [];
  for (const detail of details) {
    const last = groups[groups.length - 1];
    const row = rowOf(detail);
    if (last && last.course === detail.courseName) last.rows.push(row);
    else groups.push({ course: detail.courseName, rows: [row] });
  }
  return groups;
}
