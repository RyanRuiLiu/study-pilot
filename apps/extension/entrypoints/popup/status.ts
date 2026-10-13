/*
 * 状态行：渲染执行状态、按状态决定按钮可按性、执行期间跟随刷新。
 *
 * 状态一律取自后台（TASK_STATE 的 live），弹窗不自己推断：
 *   running         正在跑——跟着轮询，跑完自动重读待办
 *   interrupted     上次运行没结束，是浏览器被强杀留下的标记，不会自己恢复
 *   awaiting-login  因未登录挂起，登录后会自动补做
 *
 * 早期这里是 `settings.enabled && state.runningSince !== null`，两处都错：
 * 总开关一关，真实状态就被掩盖；而那个字段在强杀之后仍留着，于是弹窗
 * 一直显示「正在执行」，用户等的是一件永远不会发生的事。
 */

import { getSettings, type Settings } from '../../src/settings';
import { sendToBackground } from '../../src/platform/messaging';
import { runBtn, setText, stateEl } from './elements.ts';

export interface StateView {
  /** 此刻后台是否真的在跑 */
  running: boolean;
  settings: Settings;
}

let followTimer: number | null = null;
let onIdle: ((settings: Settings) => void) | null = null;

/** 执行结束后要做什么（重读待办）。由入口注册一次。 */
export function setFollowIdleHandler(handler: (settings: Settings) => void): void {
  onIdle = handler;
}

export function stopFollowing(): void {
  if (followTimer !== null) {
    window.clearInterval(followTimer);
    followTimer = null;
  }
}

/**
 * 只在正在执行时轮询。
 *
 * 后台的执行可能正在进行中——浏览器刚启动时的自动执行，或用户几秒前点了
 * 「执行」。弹窗只在打开那一刻读一次状态的话，这两种情况都会显示成
 * 「什么都没有」，几秒后待办才突然变样，用户不知道中间发生了什么。
 * 无事发生时不发任何请求，与后台「不做无用请求」的原则一致。
 */
function ensureFollowing(): void {
  if (followTimer !== null) return;
  followTimer = window.setInterval(() => {
    void renderState().then(({ running, settings }) => {
      if (running) return;
      stopFollowing();
      onIdle?.(settings);
    });
  }, 1000);
}

/**
 * 渲染状态行并跟随。
 *
 * `justClicked` 表示这一两秒前刚点过「执行」，后台可能还没落下心跳：
 * 此时保留点击那一刻写好的文案，但状态本身仍以后台为准——
 * 下一秒的轮询就会把它纠正过来。
 */
export async function renderState(options: { justClicked?: boolean } = {}): Promise<StateView> {
  const settings = await getSettings();

  try {
    const status = await sendToBackground({ type: 'TASK_STATE' });
    const running = status.live === 'running';

    stateEl?.classList.remove('is-busy', 'is-error');

    if (running) {
      setText(stateEl, '正在执行');
      stateEl?.classList.add('is-busy');
    } else if (status.live === 'interrupted') {
      setText(stateEl, '上次运行未结束，下次检查时接着做');
    } else if (status.live === 'awaiting-login') {
      setText(stateEl, '等待登录，登录后接着完成');
    } else if (!options.justClicked) {
      // 没有正在发生的事就收起这一行；刚点过执行时留着结果显示
      setText(stateEl, '');
    }

    setRunEnabled(settings.enabled && !running);
    if (running) ensureFollowing();
    else stopFollowing();

    return { running, settings };
  } catch (error) {
    setText(stateEl, error instanceof Error ? error.message : '读取失败');
    stateEl?.classList.add('is-error');
    setRunEnabled(settings.enabled);
    return { running: false, settings };
  }
}

/** 执行按钮的可按性。正在执行时点击只会被后台拒绝，直接禁掉更省事。 */
export function setRunEnabled(enabled: boolean): void {
  if (runBtn) runBtn.disabled = !enabled;
}

/** 状态行显示「正在做某事」。 */
export function showBusy(text: string): void {
  stateEl?.classList.remove('is-error');
  stateEl?.classList.add('is-busy');
  setText(stateEl, text);
}

/** 状态行显示一条结果；`isError` 决定用不用错误色。 */
export function showResult(text: string, isError: boolean): void {
  stateEl?.classList.remove('is-busy');
  stateEl?.classList.toggle('is-error', isError);
  setText(stateEl, text);
}
