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

import '@shoelace-style/shoelace/dist/themes/light.css';
import '../../src/ui/layout.css';
import './style.css';

import { required } from '../../src/ui/dom';
import {
  sendToBackground,
  type PendingSummary,
  type Snapshot,
  type TaskStatus,
} from '../../src/browser/messaging';
import { getSettings, watchSettings } from '../../src/settings';
import { renderLoading, renderPopup, type PopupData, type PopupView } from './view.ts';
import { runNow } from '../../src/browser/run-once.ts';
import { subscribeRunState } from '../../src/browser/run-feed.ts';

const body = required<HTMLElement>('#popup-body');
const runButton = required<HTMLElement>('#run-now');

/** 失败原因照原文上报：界面不解释它，也不改写成一句更好听的话。 */
function reason(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

let view: PopupView | null = null;
/** 这一屏是否已经见过「在跑」：只在跑完那一次重读清单，空闲推送不重复刷。 */
let sawRunning = false;

/**
 * 取数：两个请求，各司其职。
 *
 *   TASK_STATE       后台此刻在不在跑，以及上一轮记下的失败原因。界面不自己猜（理由见 envelope.ts）
 *   PENDING_SUMMARY  让后台立刻去平台拉一次并更新快照，并带回「要交的东西」：
 *                    条目、计数、跳转地址、读取时刻，以及「未登录 / 读取失败」。
 *   DASHBOARD        同一份快照的全体（课件单元也在里面）。
 *
 * 多读一次 DASHBOARD 是为了回答一个 PENDING_SUMMARY 答不了的问题：
 * 「没有要交的东西，那还剩什么」。单元的完成度只在快照里，而用户的课上
 * 大多是没看完的课件——少了这份数据，弹窗在无事可交时只会说「暂无待办」，
 * 看起来像坏了。两个请求读的是同一份快照，因此不会互相矛盾。
 */
async function load(): Promise<PopupData> {
  let live: TaskStatus['live'] = 'idle';
  let lastError: string | null = null;
  let error: string | null = null;
  let notLoggedIn = false;
  let staleList = false;
  let summary: PendingSummary | null = null;
  let courseware: PopupData['courseware'] = null;

  try {
    const status = await sendToBackground({ type: 'TASK_STATE' });
    live = status.live;
    lastError = status.state.lastError;
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

  try {
    const outcome = await sendToBackground({ type: 'DASHBOARD' });
    if (outcome.status === 'ok' && outcome.value !== null) {
      courseware = countCourseware(outcome.value);
    }
  } catch (cause) {
    error = error ?? reason(cause);
  }

  return { live, lastError, summary, courseware, notLoggedIn, staleList, error };
}

/** 课件单元没看完多少：完成度在快照里，只有它知道。 */
function countCourseware(snapshot: Snapshot): { unfinished: number; total: number } {
  let unfinished = 0;
  let total = 0;
  for (const course of snapshot.courses) {
    for (const unit of course.units) {
      total += 1;
      if (unit.completePercent < 1) unfinished += 1;
    }
  }
  return { unfinished, total };
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
    pageUrl: browser.runtime.getURL('/options.html#overview'),
    onSettings: openSettings,
  });

  const settings = await getSettings();
  setRunEnabled(settings.enabled && data.live !== 'running');
}

/*
 * 跟随执行进度：与主页面「运行」那页读同一条推送（run-feed.ts）。
 *
 * 先前这里是每秒读一次 TASK_STATE，只在打开时就已经在跑才跟。两个毛病：
 * 一是「间隔内发生的变化要等下一秒」，进度数字看起来会卡住；
 * 二是「后台几秒后才开始跑」这种情况根本不会开始跟，用户对着一个不动的清单
 * 不知道它到底在不在做事。改成推送之后，开始、每一项、结束都即时到，
 * 而且没有定时器要收拾——弹窗关掉，端口自然断。
 */
function followProgress(): void {
  subscribeRunState((state) => {
    const running = state.platforms.filter((platform) => platform.state !== 'idle');

    if (running.length > 0) {
      sawRunning = true;
      setRunEnabled(false);
      view?.setStatus(
        `正在执行 · ${running.map((platform) => `${platform.name} ${platform.finished}/${platform.total}`).join(' · ')}`,
        'busy',
      );
      return;
    }

    // 跑完了：清单是执行之前读的那一份，必须重读，否则用户看到的还是旧状态
    if (sawRunning) {
      sawRunning = false;
      void refresh();
    }
  });
}

async function init(): Promise<void> {
  renderLoading(body, '正在获取最新数据');
  setRunEnabled(false);

  await refresh();
  followProgress();

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
