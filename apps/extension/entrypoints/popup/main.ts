/*
 * 弹窗入口。
 *
 * 只做装配：取数、挂事件、跟随执行状态。界面在 src/ui/（组件）与 view.ts（摆法），
 * 因此这个文件里没有样式，也没有构造 DOM 的代码。
 *
 * 弹窗是扩展页，不需要 shadow DOM；组件层仍按「不依赖全局样式」写，
 * 为的是将来把同一份组件放进慕课页面里的注入面板。
 *
 * 样式必须在 TS 里 import，不能用 HTML 的 <link>：构建后源路径不会被改写，
 * 会变成死链，页面于是退回浏览器默认样式。
 */

import '../../src/ui/tokens.css';
import '../../src/ui/theme.css';
import '../../src/ui/components.css';
import './style.css';

import { required } from '../../src/ui/dom';
import { sendToBackground, type PendingSummary, type TaskStatus } from '../../src/platform/messaging';
import { getSettings, watchSettings } from '../../src/settings';
import { renderLoading, renderPopup, type PopupData, type PopupView } from './view.ts';
import { runNow } from './run.ts';

const body = required<HTMLElement>('#popup-body');
const runButton = required<HTMLElement>('#run-now');

let view: PopupView | null = null;
let followTimer: number | null = null;

function reason(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/**
 * 取数：两个请求，各司其职。
 *
 *   TASK_STATE       后台此刻在不在跑。界面不自己拿字段猜（理由见 envelope.ts）
 *   PENDING_SUMMARY  让后台立刻去平台拉一次并更新快照，并带回这一屏要的一切：
 *                    待办条目、计数、跳转地址、读取时刻，以及「未登录 / 读取失败」。
 *
 * 这里不再读 DASHBOARD：那是给看板的中立模型，而弹窗要的东西平台汇总里全都有。
 * 读两份同一份快照的数据只会多一层要同步的东西。
 */
async function load(): Promise<PopupData> {
  let live: TaskStatus['live'] = 'idle';
  let error: string | null = null;
  let notLoggedIn = false;
  let staleList = false;
  let summary: PendingSummary | null = null;

  try {
    live = (await sendToBackground({ type: 'TASK_STATE' })).live;
  } catch (cause) {
    error = reason(cause);
  }

  try {
    const pending = await sendToBackground({ type: 'PENDING_SUMMARY' });
    if (pending.status === 'error') {
      if (pending.reason === 'NOT_LOGGED_IN') notLoggedIn = true;
      else error = pending.message;
    } else {
      summary = pending.value;
      // 后台在执行期间不重新拉取时会带上这个标记，见 envelope.ts 的 QueryOutcome
      staleList = pending.running === true;
    }
  } catch (cause) {
    error = error ?? reason(cause);
  }

  return { live, summary, notLoggedIn, staleList, error };
}

/** 执行按钮的可按性。正在执行时点它只会被后台拒绝，直接禁掉更省事。 */
function setRunEnabled(enabled: boolean): void {
  runButton.toggleAttribute('disabled', !enabled);
}

function openSettings(): void {
  void browser.runtime.openOptionsPage();
  window.close();
}

async function refresh(): Promise<void> {
  const data = await load();
  view = renderPopup(body, data, {
    dashboardUrl: browser.runtime.getURL('/dashboard.html'),
    onSettings: openSettings,
  });

  const settings = await getSettings();
  setRunEnabled(settings.enabled && data.live !== 'running');
  if (data.live === 'running') ensureFollowing();
  else stopFollowing();
}

function stopFollowing(): void {
  if (followTimer === null) return;
  window.clearInterval(followTimer);
  followTimer = null;
}

/**
 * 执行期间每秒看一次后台状态。
 *
 * 只在真的在跑的时候轮询：浏览器刚启动时的自动执行、或用户几秒前点过「执行」，
 * 弹窗只读一次的话这两种都会显示成「什么都没有」，而清单几秒后突然变样。无事时不发请求。
 */
function ensureFollowing(): void {
  if (followTimer !== null) return;
  followTimer = window.setInterval(() => {
    void follow();
  }, 1000);
}

async function follow(): Promise<void> {
  try {
    const status = await sendToBackground({ type: 'TASK_STATE' });
    if (status.live === 'running') return;
    // 执行结束：重读一次——清单是执行之前读的，执行改的是平台状态
    await refresh();
  } catch (cause) {
    stopFollowing();
    view?.setStatus(reason(cause), 'error');
  }
}

async function init(): Promise<void> {
  renderLoading(body, '正在获取最新数据');
  setRunEnabled(false);

  await refresh();

  watchSettings(() => {
    void refresh();
  });

  runButton.addEventListener('click', () => {
    void runNow({
      setStatus: (text, tone) => view?.setStatus(text, tone),
      setEnabled: setRunEnabled,
      refresh,
    });
  });
}

void init();
