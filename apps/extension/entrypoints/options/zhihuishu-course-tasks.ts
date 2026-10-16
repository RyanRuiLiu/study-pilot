/*
 * 智慧树「课程任务」卡：每门课一张卡，按**成绩构成组件**报进度，与「执行」。
 *
 * 没有「课件」一说（设计文档 §2 定案）：智慧树的任务不套慕课那套「课件/待办」
 * 二分，它的组件由平台自己给——卡上逐行就是成绩分析页的那几个组件，用官方名、
 * 报官方数。本期能填的是「学习进度（教程+测试）」这一项；见面课与期末要等
 * 模块 4/6，**不给空行占位**（摆一行填不出的组件，人会以为那些是零）。
 *
 * 课名链到平台自己的成绩分析页——那是这门课成绩的唯一事实源，组件口径也出自那里。
 *
 * 「执行」就是对这门课**剩下的待办**的授权：视频单元走「取记录 → 全时长 1× 上报
 * → 回读确认」，单元测试走答卷会话（口径见平台包 report.ts / policy/execute-exam.ts）。
 * 它写平台、不可撤销，因此按钮文案直说做了什么。
 *
 * 执行期间进度与「停止」都在这门课自己那卡；结果用底部浮层提示。
 * 运行状态的读取按平台收窄（platformRunningItem('zhihuishu')）——
 * 慕课在跑时不该画到这里，反之亦然。
 *
 * 停止在下一个安全点生效：不再发新的写请求，正在飞的落地即止。
 */

import { getTaskState, getZhsCourseTasks, runNow, stopRun, subscribeRunState } from '../../src/ui-bridge';
import type { ZhsCourseTask, ZhsCourseTaskSummary, QueryOutcome } from '../../src/ui-bridge';
import { errorText } from '../../src/ui/format.ts';
import { platformRunningItem, progressLine, stoppedLine, STOPPING_TEXT } from '../../src/ui/run-view.ts';
import { loginNote, note, ZHS_LOGIN_URL } from './note.ts';
import { skeletonBlock } from './skeleton.ts';
import { renderZhsStatusLine } from './zhihuishu-status-line.ts';
import { toast } from './toast.ts';

/** 未运行时的按钮标题；禁用时换成 dataset.emptyTitle 里的原因。 */
const EXEC_TITLE = '执行：完成这门课余下的待办';

/** 运行期间的按钮集合：跑的时候全部禁掉（后台也会拒并发，这里只是别让人白点）。 */
const buttons: HTMLButtonElement[] = [];

/** 每门课那卡里的「正在执行」小字与按钮，按课程名索引；重画时整体换新。 */
const currents = new Map<string, HTMLElement>();
const buttonsOfCourse = new Map<string, HTMLButtonElement>();

function setStatus(text: string, tone: 'idle' | 'busy' | 'error'): void {
  if (tone === 'busy' || text === '') return;
  toast(text);
}

function setEnabled(enabled: boolean): void {
  for (const button of buttons) {
    button.disabled = !enabled || button.dataset.empty === 'yes';
  }
  if (enabled) {
    // 收尾已由发起方写（runNow 的 setStatus）：本页的标记在这里复位
    localRun = false;
    stopping = false;
    stoppedHere = false;
  }
}

/**
 * 重读课程任务区。跑完一轮之后、课程勾选变动之后、以及读取课程列表之后都用它。
 *
 * 重读即是等待：先换与首帧一致的块状骨架（同时把旧范围算出的旧数字撤下）。
 * 卡头状态行自带骨架，见 zhihuishu-status-line.ts。
 */
export async function refreshZhsTaskViews(): Promise<void> {
  const listEl = document.getElementById('zhs-tasks-list');
  if (listEl !== null) listEl.replaceChildren(skeletonBlock());
  const fresh = getZhsCourseTasks();
  await Promise.all([renderZhsStatusLine(fresh), renderZhsCourseTasks(fresh)]);
}

let watching = false;
/** 这一轮是本页发起的（与弹窗的 localRun 同一含义）：收尾文案归 runNow */
let localRun = false;
/** 按过停止、那一轮还没收尾：卡里显示「正在停止」，不再被进度盖掉 */
let stopping = false;
/** 本页按过停止、并确认停到了一轮：若不归本页报结果，收尾时补一句「已停止」 */
let stoppedHere = false;
/** 最后一次「还在跑」快照里的完成数（智慧树平台自己的）。收尾文案从这里数 */
let lastFinished = 0;
/** 订阅里见过「正在跑」：用来识别「刚刚跑完」这一瞬（开通时的空闲快照不算） */
let sawRun = false;

/**
 * 卡头的「上次执行出错」行：失败留痕按平台独立（见 application 的
 * TaskState.platforms），这里只呈现智慧树自己那条；平台给了「下一步」动作时
 * 卡头右侧给一个跳转钮（新标签页，与「读取课程列表」同一个按钮位）。
 * 跑动中不呈现——那一路的状态是课程任务卡里的运行明细。
 */
async function renderZhsFailure(): Promise<void> {
  const statusEl = document.getElementById('zhs-tasks-status');
  const actionEl = document.getElementById('zhs-tasks-action');
  if (statusEl === null || !(actionEl instanceof HTMLAnchorElement)) return;

  const status = await getTaskState('zhihuishu');
  const failure =
    status.live === 'running' ? null : (status.state.platforms['zhihuishu']?.failure ?? null);

  statusEl.classList.toggle('is-error', failure !== null);
  statusEl.textContent = failure !== null ? `上次执行失败：${failure.message}` : '';

  actionEl.hidden = failure?.action == null;
  if (failure !== null && failure.action !== null) {
    actionEl.textContent = failure.action.label;
    actionEl.href = failure.action.url;
  }
}

function watchRun(): void {
  if (watching) return;
  watching = true;
  subscribeRunState((state) => {
    const zhihuishu = state.platforms.find((platform) => platform.id === 'zhihuishu');
    const running = zhihuishu !== undefined && zhihuishu.state === 'running';
    if (!running) stopping = false;
    if (running) {
      // 刚起跑：卡头的失败行让位（renderZhsFailure 读到 running 会自行清空；
      // 收尾后由 refreshZhsTaskViews 重画回来）
      if (!sawRun) void renderZhsFailure();
      sawRun = true;
      lastFinished = zhihuishu.finished;
    }

    // 正在跑的那一项（读取与措辞与弹窗共用同一份；按平台收窄）
    const step = platformRunningItem(state, 'zhihuishu');

    // 卡内小字：只有跑的那门课有；停止收尾中冻结（「正在停止…」由点击处写）
    for (const [course, el] of currents) {
      if (running && stopping) continue;
      const text = running && step !== null ? progressLine(step) : undefined;
      const onThisCourse = running && step !== null && step.course === course;
      el.hidden = !onThisCourse;
      el.closest('.ct-card')?.classList.toggle('is-running', onThisCourse);
      if (onThisCourse && text !== undefined) el.textContent = text;
    }

    /*
     * 按钮：跑的那门课把「执行」换成「停止」；一轮在跑期间其余按钮一律禁用
     * （不论这一轮在哪里发起——后台拒并发，别让人白点）；跑完了整区还原。
     */
    for (const [course, button] of buttonsOfCourse) {
      if (running && step !== null && course === step.course) {
        button.dataset.mode = 'stop';
        button.textContent = '停止';
        button.title = '停止：不再发出新的写入请求';
        if (!stopping) button.disabled = false;
        continue;
      }
      if (running) {
        button.disabled = true;
        continue;
      }
      if (button.dataset.mode === 'stop') {
        delete button.dataset.mode;
        button.textContent = '执行';
        button.title = button.dataset.emptyTitle ?? EXEC_TITLE;
      }
      button.disabled = button.dataset.empty === 'yes';
    }

    if (running) return;
    // 收尾了：本页发起的那轮由 runNow 报结果；旁观者（别处发起、用户在这里停的）补一句
    const stopped = stoppedHere;
    stoppedHere = false;
    if (stopped && !localRun) toast(stoppedLine(lastFinished));

    /*
     * 收尾重读只归一个人：别处发起的轮次（比如弹窗的执行）没有人等结果，
     * 本页在这里补一次重读——否则「可代为完成」计数留在旧值。
     * sawRun 门闩：订阅建立时会先回一份空闲快照，那一下不该触发重读。
     */
    if (sawRun && !localRun) void refreshZhsTaskViews();
    sawRun = false;
  });
}

/** 一行成绩组件：左官方名、右官方数。读不成时由 value 里的话说清，不摆 0。 */
function buildPart(label: string, value: string, title?: string): HTMLElement[] {
  const name = document.createElement('span');
  name.className = 'ct-label';
  name.textContent = label;

  const text = document.createElement('span');
  text.className = 'ct-value';
  text.textContent = value;
  if (title !== undefined) text.title = title;

  return [name, text];
}

/**
 * 一门课的卡：头上是课名（链到平台成绩分析页）与运行明细、「执行」/「停止」，
 * 下面逐行是这门课的成绩构成组件。
 */
function buildCard(entry: ZhsCourseTask): HTMLElement {
  const card = document.createElement('div');
  card.className = 'ct-card';

  const head = document.createElement('div');
  head.className = 'ct-head';

  const group = document.createElement('span');
  group.className = 'cw-group';

  // 课名是平台成绩分析页的入口：组件口径与官方数都在那一页
  const name = document.createElement('a');
  name.className = 'ct-name';
  name.href = entry.reportUrl;
  name.target = '_blank';
  name.rel = 'noreferrer';
  name.textContent = entry.courseName;
  name.title = '打开这门课的成绩分析页';

  const current = document.createElement('span');
  current.className = 'cw-current';
  current.hidden = true;
  currents.set(entry.courseName, current);

  group.append(name, current);
  head.append(group);

  const button = document.createElement('button');
  button.className = 'btn ghost';
  button.type = 'button';
  button.textContent = '执行';
  button.title = EXEC_TITLE;
  /*
   * 禁用判据必须建立在**读全了**的前提上。
   *
   * `pending === 0` 是个显示计数器：读不全时它只是下界（测试那两页签没读到，
   * 或者清单超过一页），拿它说「已无待完成项」就是**用一个可能错的数替执行侧
   * 做了决定**——按钮灰着，而执行本来还有活可干，人只会以为没事做。
   * 读不全时不禁用：执行侧现读现算，让它自己判。
   */
  const known = entry.unread !== true && entry.quizUnreadReason === null;
  if (known && entry.pending === 0) {
    button.disabled = true;
    button.dataset.empty = 'yes';
    button.dataset.emptyTitle = '这门课已无待完成项';
    button.title = button.dataset.emptyTitle;
  }
  if (entry.unread === true) {
    button.disabled = true;
    button.dataset.empty = 'yes';
    button.dataset.emptyTitle = '未读取到这门课的结构';
    button.title = button.dataset.emptyTitle;
  }
  buttonsOfCourse.set(entry.courseName, button);
  head.append(button);

  button.addEventListener('click', () => {
    // 同一枚按钮两种身份：跑着的时候它是「停止」
    if (button.dataset.mode === 'stop') {
      button.disabled = true;
      stopping = true;
      current.hidden = false;
      current.textContent = STOPPING_TEXT;
      void stopRun('zhihuishu').then((result) => {
        if (result.stopped) {
          stoppedHere = true;
          return;
        }
        // 没停到（多半是刚好已经跑完）：整卡还原，别挂着「正在停止」
        stopping = false;
        delete button.dataset.mode;
        button.textContent = '执行';
        button.disabled = button.dataset.empty === 'yes';
        button.title = button.dataset.emptyTitle ?? EXEC_TITLE;
        current.hidden = true;
      });
      return;
    }
    stopping = false; // 新一轮开始：上一轮留下的停止态不该算到它头上
    localRun = true;
    void runNow(
      {
        setStatus,
        setEnabled,
        refresh: refreshZhsTaskViews,
      },
      /*
       * **不带 kinds**：智慧树不套用慕课的「待办/课件」二分（设计文档 §3 模块 5 定案），
       * 它的范围就是「这门课」。带上 categories 会把单元测试（kind=quiz）挡在外面——
       * 待办里列着它、点执行却不做它，正是这个仓反复要消灭的那种错位。
       */
      { platformId: 'zhihuishu', group: entry.courseName },
    );
  });

  const parts = document.createElement('div');
  parts.className = 'ct-parts';

  if (entry.unread === true) {
    /*
     * 结构没读成（缺入口参数或平台读取失败）：只说事实，数字不显示——
     * 不拿全 0 冒充「这门课没有内容」。原因在读取时的提示里说过，
     * 这里给一句悬停说明去向。
     */
    parts.append(
      ...buildPart('学习进度（教程+测试）', '未读取到内容', '未读取到这门课的结构，点击上方「读取课程列表」刷新。'),
    );
  } else {
    /*
     * 官方名与官方口径（设计文档 §1.2，成绩分析页原文）：
     * 「学习进度 = 教程进度 + 测试进度」——两半都在这一行里说清。
     *
     * 测试那半读不成时只换那一半的措辞（`quizUnreadReason`），
     * 视频那半照常报数：能报的报，报不了的说明，不整行撤掉。
     */
    const quizText =
      entry.quizUnreadReason === null
        ? `单元测试 ${entry.quiz.done}/${entry.quiz.total}`
        : '单元测试未读取到';
    parts.append(
      ...buildPart(
        '学习进度（教程+测试）',
        `视频 ${entry.video.done}/${entry.video.total} · ${quizText}`,
        entry.quizUnreadReason === null
          ? '教程与测试各自的完成数，口径同平台的成绩分析页'
          : `单元测试读取失败：${entry.quizUnreadReason}`,
      ),
    );
  }

  card.append(head, parts);
  return card;
}

export async function renderZhsCourseTasks(
  read?: Promise<QueryOutcome<ZhsCourseTaskSummary>>,
): Promise<void> {
  const listEl = document.getElementById('zhs-tasks-list');
  if (listEl === null) return;

  // 卡头的「上次执行出错」行与列表走同一条渲染路径（首帧、重读、跑完都会到这里）
  void renderZhsFailure();

  watchRun();

  buttons.length = 0;
  currents.clear();
  buttonsOfCourse.clear();

  let outcome: QueryOutcome<ZhsCourseTaskSummary>;
  try {
    outcome = await (read ?? getZhsCourseTasks());
  } catch (error) {
    listEl.replaceChildren(note(errorText(error), true));
    return;
  }

  listEl.replaceChildren();

  if (outcome.status === 'error') {
    if (outcome.reason === 'NOT_LOGGED_IN') {
      // 未登录不是「出错」，是少做了一步：给按钮把人送去登录，而不是只留一句话
      listEl.append(loginNote('未登录，在浏览器登录智慧树后执行。', ZHS_LOGIN_URL));
      return;
    }
    listEl.append(note(`读取失败：${outcome.message}`, true));
    return;
  }

  if (outcome.value.courses.length === 0) {
    listEl.append(note('尚未选择参与任务的课程，见上方「账号与课程」。'));
    return;
  }

  listEl.append(...outcome.value.courses.map(buildCard));
}
