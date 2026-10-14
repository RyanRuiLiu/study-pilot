/**
 * 扩展主页面：概览 / 运行 / 设置 / 关于。
 *
 * 本文件只做四件事：把四个标签挂起来、按地址栏的 hash 决定落在哪个标签、
 * 订阅后台的运行状态推给各页、提供「立即执行」这一个全局动作。
 * 每个标签里放什么由各自的模块决定，这里不认识任何平台字段。
 *
 * 顶栏那句状态与「运行」页读的是**同一条推送**（run-feed.ts），
 * 因此不会出现顶栏说在跑、运行页说空闲。判据在后台，界面只负责显示。
 */

import '@shoelace-style/shoelace/dist/themes/light.css';
import '../../src/ui/layout.css';
import './style.css';

import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';

import type SlAlert from '@shoelace-style/shoelace/dist/components/alert/alert.js';

import type { PlatformViews } from '../../src/platforms/types.ts';
import { moocOverview } from '../../src/platforms/mooc/overview.ts';
import { subscribeRunState } from '../../src/browser/run-feed.ts';
import { runNow } from '../../src/browser/run-once.ts';
import type { Tone } from '../../src/ui';
import { formatDateTime } from '../../src/ui/format';
import { required } from '../../src/ui/dom';
import { mountOverview } from './overview.ts';
import { mountRun } from './run.ts';
import { loadSettingsInto, mountSettings } from './settings.ts';
import { mountAbout } from './about.ts';

/** 有哪几个平台：装配层的事实，新增平台只往这里加一项。 */
const platforms: PlatformViews[] = [moocOverview];

const TABS = ['overview', 'run', 'settings', 'about'] as const;
type TabName = (typeof TABS)[number];

/** sl-tab-group 的 show() 按面板名找标签，参数就是上面这四个名字。 */
const nav = required<HTMLElement & { show(name: string): void }>('#nav');
const toastEl = required<SlAlert>('#toast');
const toastText = required<HTMLElement>('#toast-text');
const summary = required<HTMLElement>('#run-summary');
const runButton = required<HTMLElement>('#run-now');

/**
 * 提示条走组件自带的 toast()：它把这条 alert 挂进 sl-toast-stack，
 * 播完自己摘掉，下次再调用还能复用同一个元素。
 * 早先是手写 fixed 定位加 open 开关，而 duration 只在自动关闭模式下生效，
 * 于是提示会一直留在屏幕上。
 */
function toast(text: string, tone: Tone = 'idle'): void {
  toastText.textContent = text;
  // 语气决定颜色：出错的提示与只是说一声的提示不该长得一样
  toastEl.variant = tone === 'error' ? 'danger' : tone === 'busy' ? 'primary' : 'neutral';
  void toastEl.toast();
}

const overview = mountOverview(platforms);
const run = mountRun();
const settings = mountSettings(toast);

required<HTMLElement>('#overview').append(overview.host);
required<HTMLElement>('#run').append(run.host);
required<HTMLElement>('#settings').append(settings.host);
required<HTMLElement>('#about').append(mountAbout());

/* ---------- 标签切换与地址栏 ---------- */

function current(): TabName {
  const hash = window.location.hash.replace(/^#/, '');
  return (TABS as readonly string[]).includes(hash) ? (hash as TabName) : 'overview';
}

/** 每个标签自己管数据：切过来时重读一次，避免看到上一次留下的旧画面。 */
function load(name: TabName): void {
  if (name === 'overview') void overview.reload();
  if (name === 'settings') void loadSettingsInto(settings.render);
}

function select(name: TabName): void {
  nav.show(name);
  load(name);
}

// 组件已经切好标签，这里只补地址栏与数据，不再回头调用 show
nav.addEventListener('sl-tab-show', (event) => {
  const name = (event as CustomEvent<{ name: string }>).detail.name as TabName;
  history.replaceState(null, '', `#${name}`);
  load(name);
});

/* ---------- 运行状态：一条推送喂顶栏与运行页 ---------- */

let lastFinishedAt = -1;

subscribeRunState((state) => {
  run.apply(state);

  const running = state.platforms.filter((platform) => platform.state !== 'idle');
  overview.setBusy(running.length > 0);
  if (running.length > 0) {
    runButton.setAttribute('disabled', '');
    summary.textContent = `正在执行 · ${running
      .map((platform) => `${platform.name} ${platform.finished}/${platform.total}`)
      .join(' · ')}`;
    return;
  }

  runButton.removeAttribute('disabled');
  const last = state.history[0];
  summary.textContent =
    last === undefined
      ? '还没有执行过'
      : `上次执行 ${formatDateTime(last.finishedAt)} · 完成 ${last.done} · 失败 ${last.failed}`;

  // 一轮结束会改动平台上的东西，清单必须跟着重读，否则用户看到的还是执行前那份
  if (last !== undefined && last.finishedAt !== lastFinishedAt) {
    lastFinishedAt = last.finishedAt;
    void overview.reload();
  }
});

/* ---------- 手动执行 ---------- */

runButton.addEventListener('click', () => {
  void runNow({
    setStatus: toast,
    setEnabled: (enabled) => enabled
      ? runButton.removeAttribute('disabled')
      : runButton.setAttribute('disabled', ''),
    /*
     * 执行会改动平台上的状态，而这一页的清单是执行之前读的那一份。
     * 立刻重读，不等推送里那句「一轮结束了」——两处各说一次不算重复，
     * 但用户点完按钮看到列表原地不动，就会怀疑这一下没生效。
     */
    refresh: () => overview.reload(),
  });
});

/* ---------- 启动 ---------- */

void loadSettingsInto(settings.render).then(() => select(current()));
