/*
 * 智慧树课件卡：每门课的已学 / 总数，与「执行」。
 *
 * 「执行」就是对这门课**剩下的视频单元**的授权：逐个单元走
 * 「取记录 → 全时长 1× 上报 → 回读确认」（口径与实现见平台包 report.ts /
 * policy/execute.ts 的注释）。它写平台、不可撤销，因此按钮文案直说做了什么。
 *
 * 执行期间进度与「停止」都在这门课自己那行；结果用底部浮层提示。
 * 运行状态的读取按平台收窄（platformRunningItem('zhihuishu')）——
 * 慕课在跑时不该画到这里，反之亦然。
 *
 * 停止在下一个安全点生效：不再发新的写请求，正在飞的落地即止。
 */

import { getTaskState, getZhsCourseware, runNow, stopRun, subscribeRunState } from '../../src/ui-bridge';
import type { ZhsCoursewareProgress, ZhsCoursewareSummary, QueryOutcome } from '../../src/ui-bridge';
import { COURSEWARE_KINDS } from '../../src/ui/scopes.ts';
import { errorText } from '../../src/ui/format.ts';
import { platformRunningItem, progressLine, stoppedLine, STOPPING_TEXT } from '../../src/ui/run-view.ts';
import { note } from './note.ts';
import { skeletonBlock } from './skeleton.ts';
import { renderZhsStatusLine } from './zhihuishu-status-line.ts';
import { toast } from './toast.ts';

/** 未运行时的按钮标题；禁用时换成 dataset.emptyTitle 里的原因。 */
const EXEC_TITLE = '执行：完成这门课余下的视频单元';

/** 运行期间的按钮集合：跑的时候全部禁掉（后台也会拒并发，这里只是别让人白点）。 */
const buttons: HTMLButtonElement[] = [];

/** 每门课那行里的「正在执行」小字与按钮，按课程名索引；重画时整体换新。 */
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
 * 重读课件区。跑完一轮之后、课程勾选变动之后、以及读取课程列表之后都用它。
 *
 * 重读即是等待：先换与首帧一致的块状骨架（同时把旧范围算出的旧数字撤下）。
 * 卡头状态行自带骨架，见 zhihuishu-status-line.ts。
 */
export async function refreshZhsCourseViews(): Promise<void> {
  const listEl = document.getElementById('zhs-courseware-list');
  if (listEl !== null) listEl.replaceChildren(skeletonBlock());
  const fresh = getZhsCourseware();
  await Promise.all([renderZhsStatusLine(fresh), renderZhsCourseware(fresh)]);
}

let watching = false;
/** 这一轮是本页发起的（与弹窗的 localRun 同一含义）：收尾文案归 runNow */
let localRun = false;
/** 按过停止、那一轮还没收尾：行里显示「正在停止」，不再被进度盖掉 */
let stopping = false;
/** 本页按过停止、并确认停到了一轮：若不归本页报结果，收尾时补一句「已停止」 */
let stoppedHere = false;
/** 最后一次「还在跑」快照里的完成数（智慧树平台自己的）。收尾文案从这里数 */
let lastFinished = 0;
/** 订阅里见过「正在跑」：用来识别「刚刚跑完」这一瞬（开通时的空闲快照不算） */
let sawRun = false;

/**
 * 课件卡头的「上次执行出错」行：失败留痕按平台独立（见 application 的
 * TaskState.platforms），这里只呈现智慧树自己那条；平台给了「下一步」动作时
 * 卡头右侧给一个跳转钮（新标签页，与「读取课程列表」同一个按钮位）。
 * 跑动中不呈现——那一路的状态是课件行里的运行明细。
 */
async function renderZhsFailure(): Promise<void> {
  const statusEl = document.getElementById('zhs-courseware-status');
  const actionEl = document.getElementById('zhs-courseware-action');
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
      // 收尾后由 refreshZhsCourseViews 重画回来）
      if (!sawRun) void renderZhsFailure();
      sawRun = true;
      lastFinished = zhihuishu.finished;
    }

    // 正在跑的那一项（读取与措辞与弹窗共用同一份；按平台收窄）
    const step = platformRunningItem(state, 'zhihuishu');

    // 行内小字：只有跑的那门课有；停止收尾中冻结（「正在停止…」由点击处写）
    for (const [course, el] of currents) {
      if (running && stopping) continue;
      const text = running && step !== null ? progressLine(step) : undefined;
      const onThisCourse = running && step !== null && step.course === course;
      el.hidden = !onThisCourse;
      el.closest('.cw-row')?.classList.toggle('is-running', onThisCourse);
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
     * 本页在这里补一次重读——否则「待学」计数留在旧值。
     * sawRun 门闩：订阅建立时会先回一份空闲快照，那一下不该触发重读。
     */
    if (sawRun && !localRun) void refreshZhsCourseViews();
    sawRun = false;
  });
}

/** 一门课一行：名字组（课名 + 运行明细）、已学 x/y、「执行」/「停止」。 */
function buildRow(entry: ZhsCoursewareProgress): HTMLElement {
  const row = document.createElement('div');
  row.className = 'cw-row';

  const group = document.createElement('span');
  group.className = 'cw-group';

  const name = document.createElement('span');
  name.className = 'cw-name';
  name.textContent = entry.courseName;

  const current = document.createElement('span');
  current.className = 'cw-current';
  current.hidden = true;
  currents.set(entry.courseName, current);

  group.append(name, current);

  const progress = document.createElement('span');
  progress.className = 'cw-progress';
  if (entry.unread === true) {
    /*
     * 结构没读成（缺入口参数或平台读取失败）：只说事实，数字不显示——
     * 不拿全 0 冒充「这门课没有内容」。原因在读取时的提示里说过，
     * 这里给一句悬停说明去向。
     */
    progress.textContent = '未读取到内容';
    progress.title = '未读取到这门课的结构，点击上方「读取课程列表」刷新。';
  } else if (entry.total === 0) {
    progress.textContent = '未读取到内容';
    progress.title = '平台未返回课程结构';
  } else {
    progress.textContent = `已学 ${entry.done}/${entry.total}`;
    progress.title = `余 ${entry.pending} 个视频单元`;
  }

  const button = document.createElement('button');
  button.className = 'btn ghost';
  button.type = 'button';
  button.textContent = '执行';
  button.title = EXEC_TITLE;
  if (entry.pending === 0 && entry.unread !== true) {
    button.disabled = true;
    button.dataset.empty = 'yes';
    button.dataset.emptyTitle = entry.total === 0 ? '未读取到这门课的内容' : '这门课的单元已全部完成';
    button.title = button.dataset.emptyTitle;
  }
  if (entry.unread === true) {
    button.disabled = true;
    button.dataset.empty = 'yes';
    button.dataset.emptyTitle = '未读取到这门课的结构';
    button.title = button.dataset.emptyTitle;
  }
  buttonsOfCourse.set(entry.courseName, button);

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
        // 没停到（多半是刚好已经跑完）：整行还原，别挂着「正在停止」
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
        refresh: refreshZhsCourseViews,
      },
      // 与慕课课件卡同一范围：只发课件类，别把这门课的别类事项一并做掉
      { platformId: 'zhihuishu', kinds: COURSEWARE_KINDS, group: entry.courseName },
    );
  });

  buttons.push(button);
  row.append(group, progress, button);
  return row;
}

export async function renderZhsCourseware(
  read?: Promise<QueryOutcome<ZhsCoursewareSummary>>,
): Promise<void> {
  const listEl = document.getElementById('zhs-courseware-list');
  if (listEl === null) return;

  // 卡头的「上次执行出错」行与列表走同一条渲染路径（首帧、重读、跑完都会到这里）
  void renderZhsFailure();

  watchRun();

  buttons.length = 0;
  currents.clear();
  buttonsOfCourse.clear();

  let outcome: QueryOutcome<ZhsCoursewareSummary>;
  try {
    outcome = await (read ?? getZhsCourseware());
  } catch (error) {
    listEl.replaceChildren(note(errorText(error), true));
    return;
  }

  listEl.replaceChildren();

  if (outcome.status === 'error') {
    listEl.append(
      note(
        outcome.reason === 'NOT_LOGGED_IN'
          ? '未登录，在浏览器登录智慧树后执行。'
          : `读取失败：${outcome.message}`,
        outcome.reason !== 'NOT_LOGGED_IN',
      ),
    );
    return;
  }

  if (outcome.value.courses.length === 0) {
    listEl.append(note('尚未选择参与任务的课程，见上方「账号与课程」。'));
    return;
  }

  listEl.append(...outcome.value.courses.map(buildRow));
}
