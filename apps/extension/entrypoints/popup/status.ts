/*
 * 状态行：执行状态、按钮可用性、执行期间的跟随。
 *
 * 单一通道：运行状态的推送端口（subscribeRunState）——后台每变一步推一份
 * 完整快照；进度、开始、结束都由它驱动，**不轮询**（端口天生「有变化才说话」，
 * 页面关掉连接自动断，不需要清理定时器）。
 *
 * 全流程只有两次一次性读取（getTaskState），因为它们要的字段不在运行快照里：
 *   打开弹窗时（renderState）——取该平台的 live / 失败留痕 / interrupted；
 *   一轮结束那一瞬（推送里 running 变回 false）——为收尾句再取一次。
 * 读取按当前 tab 的平台点名（平台状态相互独立，问谁答谁）。
 *
 * 状态一律取自后台，弹窗不自己推断：
 *   running       正在跑；跑完自动重读待办（别处发起的轮次）
 *   interrupted   上次运行没结束，是浏览器被强杀留下的标记，不会自己恢复
 *                 点「全部执行」即可重新开始——没做过的事不需要「接着」
 *
 * 空闲时把上一轮留下的失败如实说出来：只呈现**当前 tab 平台**的那条（留痕按
 * 平台独立，见 application 的 TaskState.platforms）；当前平台没有、而外壳自己有
 * （SHELL_PLATFORM_ID，监听器都注册不上这类）时，呈现系统级那条——那是它唯一
 * 能被人看见的地方。这一行只在下次该平台成功执行后被清掉，不显示的话
 * 「什么都没做」与「试了但失败了」长得一样。
 */

import { getTaskState, stopRun, subscribeRunState, type RunState } from '../../src/ui-bridge';
import { SHELL_PLATFORM_ID } from '@study-pilot/application';
import type { RunFailureAction } from '../../src/protocol.ts';
import { errorText } from '../../src/ui/format.ts';
import { isPlatformRunning, platformProgressText, stoppedLine, STOPPING_TEXT } from '../../src/ui/run-view.ts';
import { runBtn, setText, stateActionEl, stateEl, stateLine, stopBtn, todoEl, zhsTodoEl } from './elements.ts';

/** 清「全部列表」时用这一组；按平台置灰走 todoListOf（跑哪家灰哪家）。 */
const todoLists = [todoEl, zhsTodoEl];

/** 平台 → 它的待办容器（运行态的置灰只落在运行的那家）。 */
function todoListOf(platformId: string): HTMLElement | null {
  if (platformId === 'mooc') return todoEl;
  if (platformId === 'zhihuishu') return zhsTodoEl;
  return null;
}

let onIdle: (() => void) | null = null;
let latest: RunState | null = null;
/** 状态行呈现哪个平台：弹窗按当前 tab（平台状态相互独立，问谁答谁）。 */
let statusPlatform = 'mooc';
/** 当前这一轮是不是本弹窗点的（点过执行按钮起，到一轮结束止；设置页叫 localRun，同一含义） */
let localRun = false;
/** 本弹窗按过停止、并确认停到了一轮：{平台, 完成数}——只在**那个平台**的收尾句里消费 */
let stoppedHere: { platform: string; done: number } | null = null;
/** 按过停止、目标平台还没收尾：该平台的状态行显示「正在停止」，不再一路报进度 */
let stoppingHere: string | null = null;
/** 最后一次「还在跑」快照里的完成数。跑完时进度被清空，收尾文案从这里数 */
let lastFinished = 0;
/** 上一次 renderState 见到的运行状态：用来识别「新一轮开始」 */
let wasRunning = false;
/** 推送里上一次见到的运行状态：用来识别「刚刚跑完」这一瞬 */
let sawRunning = false;
/** 此刻有没有一轮在跑（收口 run 按钮的可用性） */
let runningNow = false;
/** 当前 tab 的平台允许执行吗（没有可执行内容的平台为假） */
let scopeAllowsRun = true;

/** run 按钮的唯一收口：执行中禁用、平台没有可执行内容时禁用 */
function applyRunEnabled(): void {
  if (runBtn) runBtn.disabled = runningNow || !scopeAllowsRun;
}

/** 「全部执行」作用于当前 tab 的平台；没有可执行内容的平台为假 */
export function setRunScope(allows: boolean): void {
  scopeAllowsRun = allows;
  applyRunEnabled();
}

/** 切换状态行面向的平台（弹窗 tab 切换时调）。切过去立刻按新平台重渲染。 */
export function setStatusPlatform(platformId: string): void {
  statusPlatform = platformId;
  void renderState();
}

/** 状态行显示一条结果或过程。执行的两处入口（顶栏「全部执行」、行内「执行」）共用。 */
export function showStatus(text: string, tone: 'idle' | 'busy' | 'error'): void {
  stateLine?.classList.toggle('is-busy', tone === 'busy');
  stateLine?.classList.toggle('is-error', tone === 'error');
  setText(stateEl, text);
}

/*
 * 「停止」：一轮进行中才现身（.state.is-running 控制显示）。
 * 点了先禁用自己，一次就够；下一轮开始时由 setRunning 复位。
 *
 * 记下「停到过一轮」：若这一轮是别处发起的，结果落在发起页——弹窗作为
 * 跟随者收尾时会[把状态行清空]，那这条停止看起来就像没发生过。
 */
stopBtn?.addEventListener('click', () => {
  if (stopBtn === null) return;
  stopBtn.disabled = true;
  stoppingHere = statusPlatform;
  setText(stateEl, STOPPING_TEXT);
  void stopRun(statusPlatform).then((result) => {
    if (result.stopped) {
      // 完成数取停止那一刻的最后快照；只在**这个平台**的收尾句里消费
      stoppedHere = { platform: statusPlatform, done: lastFinished };
      return;
    }
    // 没停到（多半是刚好已经跑完）：撤下这句话，让状态行按现状重新落定
    stoppingHere = null;
    void renderState();
  });
});

/**
 * 运行期间整页按钮都不可点：顶栏的执行按钮与每一行的「执行」。
 * 后台本来也会拒并发，这里只是别让人白点。
 *
 * 同时记住「这一轮是本弹窗点的」——结束时的状态行由点击者收尾
 * （runNow 的最后一步写结果），收尾读不抢那一句。
 */
export function setRunning(running: boolean): void {
  runningNow = running;
  applyRunEnabled();
  // 置灰按平台收窄：跑哪家灰哪家（另一家的「执行」不受影响）
  todoListOf(statusPlatform)?.classList.toggle('is-running', running);
  stateLine?.classList.toggle('is-running', running);
  if (running) {
    stoppingHere = null; // 新一轮：上一轮留下的停止态不该算到它头上
    if (stopBtn) stopBtn.disabled = false;
    // 上一轮失败的动作位也让位：这一态的信息是「进度」，不是「下一步」
    applyStateAction(null);
  }
  localRun = running;
}

/** 执行结束后要做什么（重读待办）。由入口注册一次。 */
export function setFollowIdleHandler(handler: () => void): void {
  onIdle = handler;
}

/**
 * 订阅运行状态的推送。入口调一次。
 *
 * 一轮不论在哪里发起（弹窗/设置页），只要弹窗开着就如实跟随：
 * 状态行立刻现身、进度实时、停止够得着——别的页面点「执行」后切回弹窗，
 * 看到的应该就是它正在做的那件事，而不是空白。
 *
 * 结束那一瞬（推送从「在跑」变回「不在跑」）做一次收尾读：
 * 本弹窗点的一轮由 runNow 写结果句（收尾读不碰文字）；别处发起的一轮
 * 没有人在等结果，收尾读负责报上一轮的失败 / 清空，并触发重读待办。
 */
export function watchRunState(): void {
  subscribeRunState((state) => {
    latest = state;

    if (isPlatformRunning(state, statusPlatform)) {
      sawRunning = true;
      lastFinished = state.platforms.find((platform) => platform.id === statusPlatform)?.finished ?? 0;
      stateLine?.classList.add('is-running');
      if (!localRun) {
        // 别处发起：那家的行内「执行」一并禁掉（本弹窗自己点的那轮归 setRunning 管）
        todoListOf(statusPlatform)?.classList.add('is-running');
        runningNow = true;
        applyRunEnabled();
      }
      setText(stateEl, followText());
      // 跑动中动作位让位给「停止」（每步推送都过这里——上一次失败留下的动作
      // 不能借着进度更新赖在行上；幂等，重复置隐藏无代价）
      applyStateAction(null);
      return;
    }

    if (sawRunning) {
      sawRunning = false;
      if (stoppingHere === statusPlatform) stoppingHere = null;
      const own = localRun;
      void renderState({ settleText: !own }).then(() => {
        if (!own) onIdle?.();
      });
    }
  });
}

/** 跟随期间状态行说什么：该平台的停止收尾中就不再报进度，免得像没听见停止。 */
function followText(): string {
  return stoppingHere === statusPlatform ? STOPPING_TEXT : platformProgressText(latest, statusPlatform);
}

/**
 * 渲染状态行并落定。返回此刻后台是否真的在跑。
 * 调用点：打开弹窗时、按停止没停到时、一轮结束的收尾读。
 *
 * `settleText`（默认开）指不在跑时要不要顺手收尾状态文字：显示上一轮的
 * 失败、或清空。对本弹窗自己点的那一轮说不——那一条的结果由点击者写，
 * 收尾读插一句会把状态行闪成空白。
 */
export async function renderState(options: { settleText?: boolean } = {}): Promise<boolean> {
  try {
    const status = await getTaskState(statusPlatform);
    const running = status.live === 'running';
    // 失败留痕按平台独立：先看状态行面向的那家；没有就看外壳自己那条
    // （系统级失败——监听器都注册不上这类，页面级状态行是它唯一能被人看见的地方）
    const failure =
      status.state.platforms[statusPlatform]?.failure ??
      status.state.platforms[SHELL_PLATFORM_ID]?.failure ??
      null;

    stateLine?.classList.remove('is-busy', 'is-error');

    if (running) {
      // 新一轮开始：上一轮的标记与停止态不该算到它头上
      if (!wasRunning) {
        stoppedHere = null;
        stoppingHere = null;
        if (stopBtn) stopBtn.disabled = false;
      }
      wasRunning = true;
      setText(stateEl, followText());
      stateLine?.classList.add('is-busy');
      // 跟在跑的一轮（哪怕不是本弹窗发起的）都该能停
      stateLine?.classList.add('is-running');
      // 别处发起的执行也要把那家行内的「执行」变灰（本弹窗点的那轮归 setRunning 管）
      if (!localRun) todoListOf(statusPlatform)?.classList.add('is-running');
      // 跑动时动作位让位给「停止」
      applyStateAction(null);
    } else {
      wasRunning = false;
      if (stoppingHere === statusPlatform) stoppingHere = null;
      stateLine?.classList.remove('is-running');
      // 清全部（自愈）：按平台置灰是收窄的，这里的清必须是宽的，免得留灰
      if (!localRun) for (const list of todoLists) list?.classList.remove('is-running');
      if (options.settleText ?? true) {
        if (status.live === 'interrupted') {
          setText(stateEl, '上次执行未正常结束，可重新执行「全部执行」');
        } else if (stoppedHere !== null && stoppedHere.platform === statusPlatform) {
          /*
           * 本弹窗按过停止、且确实停到了**这个平台**：留一句收尾而不是清空。
           * 完成数在按停止那一刻记下（进度在跑完时会被清空）。
           * 别家的停止记录在这里不消费——它要在它自己那家的收尾句里出现。
           */
          setText(stateEl, stoppedLine(stoppedHere.done));
          stoppedHere = null;
        } else if (failure !== null) {
          setText(stateEl, `上次执行出错：${failure.message}`);
          stateLine?.classList.add('is-error');
        } else {
          setText(stateEl, '');
        }
      }
      // 「下一步」动作位（与「停止」同槽）：不在跑且有动作时才现身
      applyStateAction(failure?.action ?? null);
    }

    runningNow = running;
    applyRunEnabled();
    return running;
  } catch (error) {
    setText(stateEl, errorText(error));
    stateLine?.classList.add('is-error');
    runningNow = false;
    applyRunEnabled();
    return false;
  }
}

/** 「下一步」动作位（与「停止」同槽）：不在跑、且有动作时才现身。 */
function applyStateAction(action: RunFailureAction | null): void {
  if (stateActionEl === null) return;
  stateActionEl.hidden = action === null;
  if (action !== null) {
    stateActionEl.textContent = action.label;
    stateActionEl.href = action.url;
  }
}
