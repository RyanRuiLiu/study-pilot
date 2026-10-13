/*
 * 单元明细：取数与状态处理，表的摆法在 src/ui/details.ts。
 *
 * 三种情况分别呈现，不混为一谈：
 *   失败           显示失败原因，便于判断是网络、登录还是平台侧的问题
 *   成功但没有单元  说明确实没有可列出的内容（通常是尚未勾选课程）
 *   成功且有单元    正常列表
 *
 * 登录状态已失效与一般失败分开：会话 cookie 关浏览器几天就过期，用户没做错什么，
 * 只是需要重新登录一次，所以给的是去处而不是错误。
 */

import { workPageUrl } from '@study-pilot/platform-mooc';
import { sendToBackground, type UnitDetail, WORK_STATUS } from '../../src/platform/messaging';
import { formatDateTime } from '../../src/features/format';
import { detailTable, type DetailGroup, type DetailRow } from '../../src/ui/details.ts';
import { button, note } from '../../src/ui/form.ts';

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

/** 状态一格：互评进度附在状态后面，不单占一列。 */
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
 * 整行做成链接，点进那一项的页面。
 *
 * 明细的用途是「这门课我做到哪了」，看到之后下一步往往是去处理它。
 * 考试也一样——它有专门的答卷页，地址需要 examId 与题型。
 * 视图名与详情里的类型一一对应，直接把类型传给拼地址的函数，不做映射转换。
 *
 * 每行带一个可定位的 id（`unit-<tid>`）：通知点进来时要落到具体那一项，
 * 而不是把用户丢在页面顶部让他在几十行里找。
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
function groupsOf(details: UnitDetail[]): DetailGroup[] {
  const groups: DetailGroup[] = [];
  for (const detail of details) {
    const last = groups[groups.length - 1];
    const row = rowOf(detail);
    if (last && last.course === detail.courseName) last.rows.push(row);
    else groups.push({ course: detail.courseName, rows: [row] });
  }
  return groups;
}

/** 明细区。数据是异步取的，取到之前先占位。 */
export function unitDetailsView(): HTMLElement {
  const box = document.createElement('div');
  box.id = 'unit-details';
  void loadUnitDetails(box);
  return box;
}

/**
 * 重新读取单元明细。
 *
 * 课程勾选变化后调用。明细按勾选的课程过滤，取消勾选后那一门的内容
 * 就该从表里消失——不重读的话它会一直列着，用户以为取消没生效。
 *
 * 找不到容器时什么也不做：那说明明细分区还没渲染或已被移除。
 */
export function reloadUnitDetails(): void {
  const box = document.getElementById('unit-details');
  if (box) loadUnitDetails(box);
}

/** 往容器里填单元明细。抽出来是为了能被重复调用，见 reloadUnitDetails。 */
export function loadUnitDetails(box: HTMLElement): void {
  box.replaceChildren(note('正在读取…'));

  void sendToBackground({ type: 'UNIT_DETAILS' })
    .then((outcome) => {
      if (outcome.status === 'error') {
        if (outcome.reason === 'NOT_LOGGED_IN') {
          box.replaceChildren(
            note('登录状态已失效，需要重新登录慕课平台后才能读取单元明细。'),
            button({ label: '前往登录', href: 'https://www.icourse163.org/', outline: true }),
          );
          return;
        }
        box.replaceChildren(failure(`读取失败：${outcome.message}`));
        return;
      }

      box.replaceChildren(
        detailTable(
          groupsOf(outcome.value),
          '没有可列出的单元。请先在上方的「课程列表」里读取并勾选课程。',
        ),
      );
      signalContentReady();
    })
    .catch((error: unknown) => {
      box.replaceChildren(failure(`读取失败：${error instanceof Error ? error.message : String(error)}`));
      signalContentReady();
    });
}

function failure(text: string): HTMLElement {
  const element = document.createElement('p');
  element.className = 'sp-error';
  element.textContent = text;
  return element;
}

/**
 * 通知一次「异步内容已渲染」。
 *
 * 单元明细与运行状态的数据都是异步取的，取到之前它们只是占位文字。
 * 锚点跳转若发生在数据到达之前，会滚到一个之后会变短的位置上，
 * 等内容填进去就偏了。渲染完成后再定位一次。
 */
export function signalContentReady(): void {
  document.dispatchEvent(new CustomEvent('sp:content-ready'));
}
