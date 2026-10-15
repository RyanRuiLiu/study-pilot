/*
 * 状态行：执行状态、按钮可用性、执行期间的跟随。
 *
 * 单一通道：运行状态的推送端口（subscribeRunState）——后台每变一步推一份
 * 完整快照；进度、开始、结束都由它驱动，**不轮询**（端口天生「有变化才说话」，
 * 页面关掉连接自动断，不需要清理定时器）。
 *
 * 全流程只有两次一次性读取（getTaskState），因为它们要的字段不在运行快照里：
 *   打开弹窗时（renderState）——取 live / lastError / interrupted；
 *   一轮结束那一瞬（推送里 running 变回 false）——为收尾句再取一次。
 *
 * 状态一律取自后台，弹窗不自己推断：
 *   running       正在跑；跑完自动重读待办（别处发起的轮次）
 *   interrupted   上次运行没结束，是浏览器被强杀留下的标记，不会自己恢复
 *                 点「全部执行」即可重新开始——没做过的事不需要「接着」
 *
 * 空闲时把上一轮留下的失败如实说出来（lastError）：那一行只在下次成功
 * 执行后被清掉，不显示的话「什么都没做」与「试了但失败了」长得一样。
 */

import { getTaskState, stopRun, subscribeRunState, type RunState } from '../../src/ui-bridge';
import { errorText } from '../../src/ui/format.ts';
import { isRunning, progressTextOf, stoppedLine, STOPPING_TEXT } from '../../src/ui/run-view.ts';
import { runBtn, setText, stateEl, stateLine, stopBtn, todoEl } from './elements.ts';

let onIdle: (() => void) | null = null;
let latest: RunState | null = null;
/** 当前这一轮是不是本弹窗点的（点过执行按钮起，到一轮结束止；设置页叫 localRun，同一含义） */
let localRun = false;
/** 本弹窗按过停止、并确认停到了一轮：跑完后状态行要留一句「已停止」而不是清空 */
let stoppedHere = false;
/** 按过停止、那一轮还没收尾：状态行显示「正在停止」，不再一路报进度 */
let stopping = false;
/** 最后一次「还在跑」快照里的完成数。跑完时进度被清空，收尾文案从这里数 */
let lastFinished = 0;
/** 上一次 renderState 见到的运行状态：用来识别「新一轮开始」 */
let wasRunning = false;
/** 推送里上一次见到的运行状态：用来识别「刚刚跑完」这一瞬 */
let sawRunning = false;
/** 此刻有没有一轮在跑（收口 run 按钮的可用性） */
let runningNow = false;
/** 当前 tab 的平台允许执行吗（智慧树占位期＝不允许） */
let scopeAllowsRun = true;

/** run 按钮的唯一收口：执行中禁用、平台没有可执行内容时禁用 */
function applyRunEnabled(): void {
  if (runBtn) runBtn.disabled = runningNow || !scopeAllowsRun;
}

/** 「全部执行」作用于当前 tab 的平台；占位平台没有可执行内容 */
export function setRunScope(allows: boolean): void {
  scopeAllowsRun = allows;
  applyRunEnabled();
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
  stopping = true;
  setText(stateEl, STOPPING_TEXT);
  void stopRun().then((result) => {
    if (result.stopped) {
      stoppedHere = true;
      return;
    }
    // 没停到（多半是刚好已经跑完）：撤下这句话，让状态行按现状重新落定
    stopping = false;
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
  todoEl?.classList.toggle('is-running', running);
  stateLine?.classList.toggle('is-running', running);
  if (running) {
    stopping = false; // 新一轮：上一轮留下的停止态不该算到它头上
    if (stopBtn) stopBtn.disabled = false;
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

    if (isRunning(state)) {
      sawRunning = true;
      lastFinished = state.platforms.reduce((sum, platform) => sum + platform.finished, 0);
      stateLine?.classList.add('is-running');
      if (!localRun) {
        // 别处发起：行内「执行」一并禁掉（本弹窗自己点的那轮归 setRunning 管）
        todoEl?.classList.add('is-running');
        runningNow = true;
        applyRunEnabled();
      }
      setText(stateEl, followText());
      return;
    }

    if (sawRunning) {
      sawRunning = false;
      stopping = false;
      const own = localRun;
      void renderState({ settleText: !own }).then(() => {
        if (!own) onIdle?.();
      });
    }
  });
}

/** 跟随期间状态行说什么：停止收尾中就不再报进度，免得像没听见停止。 */
function followText(): string {
  return stopping ? STOPPING_TEXT : progressTextOf(latest);
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
    const status = await getTaskState();
    const running = status.live === 'running';

    stateLine?.classList.remove('is-busy', 'is-error');

    if (running) {
      // 新一轮开始：上一轮的标记与停止态不该算到它头上
      if (!wasRunning) {
        stoppedHere = false;
        stopping = false;
        if (stopBtn) stopBtn.disabled = false;
      }
      wasRunning = true;
      setText(stateEl, followText());
      stateLine?.classList.add('is-busy');
      // 跟在跑的一轮（哪怕不是本弹窗发起的）都该能停
      stateLine?.classList.add('is-running');
      // 别处发起的执行也要把行内的「执行」变灰（本弹窗点的那轮归 setRunning 管）
      if (!localRun) todoEl?.classList.add('is-running');
    } else {
      wasRunning = false;
      stopping = false;
      stateLine?.classList.remove('is-running');
      if (!localRun) todoEl?.classList.remove('is-running');
      if (options.settleText ?? true) {
        if (status.live === 'interrupted') {
          setText(stateEl, '上次执行未正常结束，可重新执行「全部执行」');
        } else if (stoppedHere) {
          /*
           * 本弹窗按过停止、且确实停到了：留一句收尾而不是清空。
           * 完成数取最后一次「还在跑」的快照——进度在跑完时会被清空。
           */
          setText(stateEl, stoppedLine(lastFinished));
          stoppedHere = false;
        } else if (status.state.lastError !== null) {
          setText(stateEl, `上次执行出错：${status.state.lastError}`);
          stateLine?.classList.add('is-error');
        } else {
          setText(stateEl, '');
        }
      }
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
