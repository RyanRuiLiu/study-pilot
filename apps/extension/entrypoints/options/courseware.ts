/*
 * 课件：每门课的已完成 / 总数，与「执行」。
 *
 * 数字来自只读的课件进度查询，与执行同源（同一套完成判据）——
 * 显示的可做数就是点下去会做的数。
 *
 * 点「执行」就是对那门课课件动手的授权。它写平台、不可撤销，
 * 因此按钮文案直说做了什么，类别也只发课件（COURSEWARE_KINDS）——
 * 不会碰到任何要交的东西。
 *
 * 执行期间进度与「停止」都在这门课自己那行：行内小字报「正在执行 6/40 · 单元」，
 * 按钮就地变身「停止」。结果用底部浮层（toast）提示——一句话可能很长，
 * 塞进行里放不下，为它常驻一行又不值。
 *
 * 停止在下一个安全点生效：不再发新的写请求，正在飞的落地即止。
 */

import { getCourseware, getTaskState, runNow, stopRun, subscribeRunState } from '../../src/ui-bridge.ts';
import type { CoursewareProgress, CoursewareSummary, QueryOutcome } from '../../src/ui-bridge.ts';
import { errorText } from '../../src/ui/format.ts';
import { platformRunningItem, progressLine, stoppedLine, STOPPING_TEXT } from '../../src/ui/run-view.ts';
import { COURSEWARE_KINDS } from '../../src/ui/scopes.ts';
import { loginNote, note, MOOC_LOGIN_URL } from './note.ts';
import { skeletonBlock } from './skeleton.ts';
import { renderStatusLine } from './status-line.ts';
import { toast } from './toast.ts';

/** 未运行时的按钮标题；禁用时换成 dataset.emptyTitle 里的原因。 */
const EXEC_TITLE = '执行：完成这门课余下的课件';

/** 运行期间的按钮集合：跑的时候全部禁掉（后台也会拒并发，这里只是别让人白点）。 */
const buttons: HTMLButtonElement[] = [];

/** 每门课那行里的「正在执行」小字与按钮，按课程名索引；重画时整体换新。 */
const currents = new Map<string, HTMLElement>();
const buttonsOfCourse = new Map<string, HTMLButtonElement>();

/*
 * 运行结果用浮层提示。进度不停在这一层——那是行内小字的事；
 * 「正在执行」这类过程文案也不必弹（busy 一律跳过）。
 */
function setStatus(text: string, tone: 'idle' | 'busy' | 'error'): void {
  if (tone === 'busy' || text === '') return;
  toast(text);
}

function setEnabled(enabled: boolean): void {
  for (const button of buttons) {
    button.disabled = !enabled || button.dataset.empty === 'yes';
  }
  if (enabled) {
    /*
     * 收尾已由发起方写（runNow 的 setStatus）：本页的标记在这里复位，
     * 收尾分支才不会再补一句「已停止」——同一件事弹两次。
     */
    localRun = false;
    stopping = false;
    stoppedHere = false;
  }
}

/**
 * 重读课件区。跑完一轮之后、课程勾选变动之后都用它（后者的调用见 courses.ts）。
 *
 * 重读即是等待：列表区先换成与首帧一致的块状骨架——统一等待语言之外，
 * 还把「按旧范围算出的旧数字」一并撤下（现读现算：范围变了，旧数字
 * 就不成立，不能继续摆着）。卡头状态行自带骨架，见 status-line.ts。
 */
export async function refreshCourseViews(): Promise<void> {
  const listEl = document.getElementById('courseware-list');
  if (listEl !== null) listEl.replaceChildren(skeletonBlock());
  const fresh = getCourseware();
  await Promise.all([renderStatusLine(fresh), renderCourseware(fresh)]);
}

/*
 * 订阅运行状态：正在跑的那一项落在它所属课程那一行上——行内小字报进度，
 * 按钮就地变身「停止」。别处发起的轮次（比如弹窗的待办执行）同样按课落到行里，
 * 停也就近可停。
 *
 * 「正在完成『课程名』…」那句文案曾经写死在点击处，而 runNow 起手就会
 * 用「正在执行」覆盖它——从来没有显示过；推送比那句话准得多。
 */
let watching = false;
/** 这一轮是本页发起的（与弹窗的 localRun 同一含义）：收尾文案归 runNow */
let localRun = false;
/** 按过停止、那一轮还没收尾：行里显示「正在停止」，不再被进度盖掉 */
let stopping = false;
/** 本页按过停止、并确认停到了一轮：若不归本页报结果，收尾时补一句「已停止」 */
let stoppedHere = false;
/** 最后一次「还在跑」快照里的完成数。跑完时进度被清空，收尾文案从这里数 */
let lastFinished = 0;
/** 订阅里见过「正在跑」：用来识别「刚刚跑完」这一瞬（开通时的空闲快照不算） */
let sawRun = false;
/**
 * 课件卡头的「上次执行失败」行：失败留痕按平台独立（见 application 的
 * TaskState.platforms），这里只呈现慕课自己那条；平台给了「下一步」动作时
 * 卡头右侧给一个跳转钮（新标签页，与「读取课程列表」同一个按钮位）。
 * 跑动中不呈现——那一路的状态是课件行里的运行明细。与智慧树那份同构
 * （zhihuishu-courseware.ts 的 renderZhsFailure）。
 */
async function renderFailure(): Promise<void> {
  const statusEl = document.getElementById('courseware-status');
  const actionEl = document.getElementById('courseware-action');
  if (statusEl === null || !(actionEl instanceof HTMLAnchorElement)) return;

  const status = await getTaskState('mooc');
  const failure =
    status.live === 'running' ? null : (status.state.platforms['mooc']?.failure ?? null);

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
    /*
     * 本卡的课件行只认慕课自己的运行状态：智慧树在跑时，
     * 它的单元（kind 同样是 courseware）不该画到慕课的行上。
     */
    const mooc = state.platforms.find((platform) => platform.id === 'mooc');
    const running = mooc !== undefined && mooc.state === 'running';
    // 收尾了就撤下停止态——下面的还原循环才走得对
    if (!running) stopping = false;
    if (running) {
      // 刚起跑：卡头的失败行让位（renderFailure 读到 running 会自行清空；
      // 收尾后由 refreshCourseViews 重画回来）
      if (!sawRun) void renderFailure();
      sawRun = true;
      lastFinished = mooc.finished;
    }

    // 正在跑的那一项（读取与措辞与弹窗共用同一份）。
    // 课件行只认课件类的步骤：待办（测验/作业…）在执行时不蹭课件板块——
    // 它由页面右上角的运行提示报（见 run-hint.ts）。
    const step = platformRunningItem(state, 'mooc');
    const cwStep = step !== null && step.kind === 'courseware' ? step : null;

    // 行内小字：只有跑的那门课有；停止收尾中冻结（「正在停止…」由点击处写）
    for (const [course, el] of currents) {
      if (running && stopping) continue;
      const text = running && cwStep !== null && cwStep.course === course ? progressLine(cwStep) : undefined;
      el.hidden = text === undefined;
      el.closest('.cw-row')?.classList.toggle('is-running', text !== undefined);
      if (text !== undefined) el.textContent = text;
    }

    /*
     * 按钮：跑的那门课把「执行」换成「停止」；一轮在跑期间其余按钮一律禁用
     * （不论这一轮在哪里发起——后台拒并发，别让人白点）；跑完了整区还原。
     */
    for (const [course, button] of buttonsOfCourse) {
      if (running && cwStep !== null && course === cwStep.course) {
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
    /*
     * 收尾了：本页发起的那轮由 runNow 报结果（localRun）——这里不补，
     * 同一件事弹两次很难看；只有旁观者（别处发起、用户在这里停的）需要这一句。
     */
    const stopped = stoppedHere;
    stoppedHere = false;
    if (stopped && !localRun) toast(stoppedLine(lastFinished));

    /*
     * 收尾重读只归一个人：别处发起的轮次（比如弹窗的执行）没有人等结果，
     * 本页在这里补一次重读——否则「待交 / 课件剩」留在旧值
     * （本页发起的那轮由 runNow 的 refresh 负责，顺序在其结果句之后）。
     * sawRun 门闩：订阅建立时会先回一份空闲快照，那一下不该触发重读。
     */
    if (sawRun && !localRun) void refreshCourseViews();
    sawRun = false;
  });
}

/** 一门课一行：名字组（课名 + 运行明细）、已学 x/y、「执行」/「停止」。 */
function buildRow(entry: CoursewareProgress): HTMLElement {
  const row = document.createElement('div');
  row.className = 'cw-row';

  const group = document.createElement('span');
  group.className = 'cw-group';

  const name = document.createElement('span');
  name.className = 'cw-name';
  name.textContent = entry.courseName;

  /*
   * 运行小字：跑这门课时写在这里（订阅推送更新），紧跟课名同排；
   * 挂在行上而不是别处——点的是这一行，进度与「停止」也都该在这一行。
   */
  const current = document.createElement('span');
  current.className = 'cw-current';
  current.hidden = true;
  currents.set(entry.courseName, current);

  group.append(name, current);

  const progress = document.createElement('span');
  progress.className = 'cw-progress';
  if (entry.unread === true) {
    /*
     * 结构没读到，只说事实：平台没有返回这门课的结构。实测（2026-10-15）
     * 这种课的共同点是「已不在平台的课程列表里」——多半是退课/下架留下的
     * 旧记录，刷新课程列表即可清掉。不猜别的原因。
     */
    progress.textContent = '未读取到内容';
    progress.title = '平台未返回这门课的结构。刷新后不在列表中的旧记录将被清除。';
  } else if (entry.total === 0) {
    // 结构读到了但是空的（实测：课程列表里它的课时数本身就是 0）
    progress.textContent = '未读取到内容';
    progress.title = '平台未返回课程结构（0 章节 0 单元）';
  } else {
    progress.textContent = `已学 ${entry.done}/${entry.total}`;
    progress.title = `余 ${entry.pending} 项可代为完成`;
  }

  const button = document.createElement('button');
  button.className = 'btn ghost';
  button.type = 'button';
  button.textContent = '执行';
  button.title = EXEC_TITLE;
  if (entry.pending === 0) {
    button.disabled = true;
    button.dataset.empty = 'yes';
    button.dataset.emptyTitle =
      entry.total === 0 ? '未读取到这门课的内容' : '这门课的课件已全部完成';
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
      void stopRun('mooc').then((result) => {
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
        refresh: refreshCourseViews,
      },
      // 点名平台：两平台共存后类别名不保证互斥，这一次点击只作用于慕课
      { platformId: 'mooc', kinds: COURSEWARE_KINDS, group: entry.courseName },
    );
  });

  buttons.push(button);
  row.append(group, progress, button);
  return row;
}

export async function renderCourseware(
  read?: Promise<QueryOutcome<CoursewareSummary>>,
): Promise<void> {
  const listEl = document.getElementById('courseware-list');
  if (listEl === null) return;

  watchRun();
  void renderFailure();

  buttons.length = 0;
  currents.clear();
  buttonsOfCourse.clear();

  let outcome: QueryOutcome<CoursewareSummary>;
  try {
    outcome = await (read ?? getCourseware());
  } catch (error) {
    listEl.replaceChildren(note(errorText(error), true));
    return;
  }

  listEl.replaceChildren();

  if (outcome.status === 'error') {
    if (outcome.reason === 'NOT_LOGGED_IN') {
      // 未登录不是「出错」，是少做了一步：给去处，不带责备（与智慧树那份逐字同构）
      listEl.append(loginNote('未登录，在浏览器登录慕课后执行。', MOOC_LOGIN_URL));
      return;
    }
    listEl.append(note(`读取失败：${outcome.message}`, true));
    return;
  }

  if (outcome.value.courses.length === 0) {
    listEl.append(note('尚未选择参与任务的课程，见上方「账号与课程」。'));
    return;
  }

  listEl.append(...outcome.value.courses.map(buildRow));

  /*
   * 做不了的那些如实说一句，并把两种原因分开：只差 AI 的可以行动
   * （去下面配 AI），平台数据不全的只能手动。混成一句「需要 AI 或
   * 平台数据不全」，用户既不知道是哪一种，也不知道自己能做什么。
   */
  const cannot = outcome.value.courses.reduce((sum, entry) => sum + entry.cannot, 0);
  if (cannot > 0) {
    const needsAi = outcome.value.courses.reduce((sum, entry) => sum + entry.needsAi, 0);
    const blocked = cannot - needsAi;
    const parts: string[] = [];
    if (needsAi > 0) parts.push(`${needsAi} 项讨论需配置 AI 后方可完成（见下方「AI 连接」）`);
    if (blocked > 0) parts.push(`${blocked} 项平台数据不全，需在平台手动完成`);
    listEl.append(note(`另有 ${cannot} 项暂不能完成：${parts.join('；')}。`));
  }
}
