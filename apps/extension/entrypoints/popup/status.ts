/*
 * 状态行：执行状态、按钮可用性、执行期间的跟随。
 *
 * 状态一律取自后台（getTaskState 的 live），弹窗不自己推断：
 *   running       正在跑——跟着轮询（1 秒一次），跑完自动重读待办
 *   interrupted   上次运行没结束，是浏览器被强杀留下的标记，不会自己恢复
 *                 点「全部执行」即可重新开始——没做过的事不需要「接着」
 *
 * 执行中还会显示进度（x/y）：它来自运行状态的推送通道（subscribeRunState），
 * 后台每变一步就推一份，比轮询快，也不需要额外请求。
 *
 * 空闲时把上一轮留下的失败如实说出来（lastError）：那一行只在下次成功
 * 执行后被清掉，不显示的话「什么都没做」与「试了但失败了」长得一样。
 */

import { getTaskState, stopRun, subscribeRunState, type RunState } from '../../src/ui-bridge';
import { progressLine, runningItem, stoppedLine, STOPPING_TEXT } from '../../src/ui/run-view.ts';
import { runBtn, setText, stateEl, stateLine, stopBtn, todoEl } from './elements.ts';

let followTimer: number | null = null;
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
 * 同时记住「这一轮是本弹窗点的」，并在一轮结束时停掉跟随：
 * 结束时的状态行由点击者收尾（runNow 的最后一步写结果），
 * 跟随轮询抢在前面清空的话，那一行会闪一次空白。
 */
export function setRunning(running: boolean): void {
  if (runBtn) runBtn.disabled = running;
  todoEl.classList.toggle('is-running', running);
  stateLine?.classList.toggle('is-running', running);
  if (running) {
    stopping = false; // 新一轮：上一轮留下的停止态不该算到它头上
    if (stopBtn) stopBtn.disabled = false;
  }
  localRun = running;
  if (!running) stopFollowing();
}

/** 执行结束后要做什么（重读待办）。由入口注册一次。 */
export function setFollowIdleHandler(handler: () => void): void {
  onIdle = handler;
}

/** 订阅运行状态的推送。入口调一次；进度文字在跟随期间从这一份来。 */
export function watchRunState(): void {
  subscribeRunState((state) => {
    latest = state;
    if (state.platforms.some((platform) => platform.state === 'running')) {
      lastFinished = state.platforms.reduce((sum, platform) => sum + platform.finished, 0);
    }
    // 只在跟随（正在跑）期间改写；其他时刻由 renderState 决定状态行说什么
    if (followTimer !== null) setText(stateEl, followText());
  });
}

/** 进度文字。有一项在跑就报它（与设置页同一句话）；还没进到某一项就报到哪算哪。 */
function progressText(): string {
  const step = runningItem(latest);
  if (step !== null) return progressLine(step);
  const platforms = latest?.platforms ?? [];
  const total = platforms.reduce((sum, platform) => sum + platform.total, 0);
  if (total === 0) return '正在执行';
  const finished = platforms.reduce((sum, platform) => sum + platform.finished, 0);
  return `正在执行 ${finished}/${total}`;
}

/** 跟随期间状态行说什么：停止收尾中就不再报进度，免得像没听见停止。 */
function followText(): string {
  return stopping ? STOPPING_TEXT : progressText();
}

function stopFollowing(): void {
  if (followTimer !== null) {
    window.clearInterval(followTimer);
    followTimer = null;
  }
}

/**
 * 只在正在执行时轮询。
 *
 * 弹窗可能在执行进行中被打开（比如设置页点完「快速完成」又开了弹窗），
 * 只在打开那一刻读一次状态的话，会显示成「什么都没有」，
 * 几秒后才突然变样。无事发生时不发任何请求，与后台「不做无用请求」的原则一致。
 */
function ensureFollowing(): void {
  if (followTimer !== null) return;
  followTimer = window.setInterval(() => {
    /*
     * 跑完这一下的收尾有两种人：
     *   本弹窗点的一轮（own）——结果由 runNow 写、重读也归它（refresh），
     *     这里只停表，不碰状态行；
     *   别处跑的一轮——没有人在等结果，由这里收尾并触发重读。
     */
    const own = localRun;
    void renderState({ settleText: !own }).then((running) => {
      if (running) return;
      stopFollowing();
      if (!own) onIdle?.();
    });
  }, 1000);
}

/**
 * 渲染状态行并跟随。返回此刻后台是否真的在跑。
 *
 * `settleText`（默认开）指跑完时要不要顺手收尾状态文字：显示上一轮的
 * 失败、或清空。跟随轮询对本弹窗自己点的那一轮说不——那一条的结果
 * 由点击者写，轮询插一句会把状态行闪成空白。
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
      if (!localRun) todoEl.classList.add('is-running');
      ensureFollowing();
    } else {
      wasRunning = false;
      stopping = false;
      stopFollowing();
      stateLine?.classList.remove('is-running');
      if (!localRun) todoEl.classList.remove('is-running');
      if (options.settleText ?? true) {
        if (status.live === 'interrupted') {
          setText(stateEl, '上次执行没有正常结束，可以重新点「全部执行」');
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

    if (runBtn) runBtn.disabled = running;
    return running;
  } catch (error) {
    setText(stateEl, error instanceof Error ? error.message : '读取失败');
    stateLine?.classList.add('is-error');
    if (runBtn) runBtn.disabled = false;
    return false;
  }
}
