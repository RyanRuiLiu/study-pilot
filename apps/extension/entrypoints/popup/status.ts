/*
 * 状态行：执行状态、按钮可用性、执行期间的跟随。
 *
 * 状态一律取自后台（getTaskState 的 live），弹窗不自己推断：
 *   running       正在跑——跟着轮询（1 秒一次），跑完自动重读待办
 *   interrupted   上次运行没结束，是浏览器被强杀留下的标记，不会自己恢复
 *                 点「立即执行」即可重新开始——没做过的事不需要「接着」
 *
 * 执行中还会显示进度（x/y）：它来自运行状态的推送通道（subscribeRunState），
 * 后台每变一步就推一份，比轮询快，也不需要额外请求。
 *
 * 空闲时把上一轮留下的失败如实说出来（lastError）：那一行只在下次成功
 * 执行后被清掉，不显示的话「什么都没做」与「试了但失败了」长得一样。
 */

import { getTaskState, subscribeRunState, type RunState } from '../../src/ui-bridge';
import { runBtn, setText, stateEl } from './elements.ts';

let followTimer: number | null = null;
let onIdle: (() => void) | null = null;
let latest: RunState | null = null;

/** 执行结束后要做什么（重读待办）。由入口注册一次。 */
export function setFollowIdleHandler(handler: () => void): void {
  onIdle = handler;
}

/** 订阅运行状态的推送。入口调一次；进度文字在跟随期间从这一份来。 */
export function watchRunState(): void {
  subscribeRunState((state) => {
    latest = state;
    // 只在跟随（正在跑）期间改写；其他时刻由 renderState 决定状态行说什么
    if (followTimer !== null) setText(stateEl, progressText());
  });
}

/** 进度文字：「正在执行 3/7」。没有可报的数就先不报。 */
function progressText(): string {
  const platforms = latest?.platforms ?? [];
  const total = platforms.reduce((sum, platform) => sum + platform.total, 0);
  const finished = platforms.reduce((sum, platform) => sum + platform.finished, 0);
  if (total === 0) return '正在执行';
  return `正在执行 ${finished}/${total}`;
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
    void renderState().then((running) => {
      if (running) return;
      stopFollowing();
      onIdle?.();
    });
  }, 1000);
}

/**
 * 渲染状态行并跟随。返回此刻后台是否真的在跑。
 *
 * `justClicked` 表示这一两秒前刚点过执行：此时保留点击结果或「正在执行」
 * 的文案，等跟随的轮询把它接手过去。
 */
export async function renderState(options: { justClicked?: boolean } = {}): Promise<boolean> {
  try {
    const status = await getTaskState();
    const running = status.live === 'running';

    stateEl?.classList.remove('is-busy', 'is-error');

    if (running) {
      setText(stateEl, progressText());
      stateEl?.classList.add('is-busy');
      ensureFollowing();
    } else {
      stopFollowing();
      if (status.live === 'interrupted') {
        setText(stateEl, '上次执行没有正常结束，可以重新点「立即执行」');
      } else if (!options.justClicked) {
        if (status.state.lastError !== null) {
          setText(stateEl, `上次执行出错：${status.state.lastError}`);
          stateEl?.classList.add('is-error');
        } else {
          setText(stateEl, '');
        }
      }
    }

    if (runBtn) runBtn.disabled = running;
    return running;
  } catch (error) {
    setText(stateEl, error instanceof Error ? error.message : '读取失败');
    stateEl?.classList.add('is-error');
    if (runBtn) runBtn.disabled = false;
    return false;
  }
}
