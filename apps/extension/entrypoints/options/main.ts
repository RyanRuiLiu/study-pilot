/**
 * 设置页。
 *
 * 职责：把 {@link Settings} 渲染成可编辑表单，改动即时落盘；
 * 并提供课程列表读取与任务的手动触发入口。
 *
 * 表单改动直接写存储，后台任务在每次执行时重新读取配置，因此不需要显式的保存按钮。
 * 手动触发只是「立即执行一次」，是否真的执行由后台的门禁决定——
 * 这里的开关检查只用于提前给出提示。
 *
 * 样式分三层引入：tokens 与 theme（取值、Shoelace 变量映射）、components（控件外观）、
 * 本页布局。必须通过 import 引入，不能用 HTML 的 <link>——构建后源路径不会被改写，
 * 会变成死链，页面于是回退到浏览器默认样式。
 */

import '../../src/ui/tokens.css';
import '../../src/ui/theme.css';
import '../../src/ui/components.css';
import './style.css';

import {
  getSettings,
  resetSettings,
} from '../../src/settings';
import {
  sendToBackground,
} from '../../src/platform/messaging';
import { required } from '../../src/ui/dom';

const app = required<HTMLElement>('#app');
const toc = document.getElementById('toc');
const toastEl = required<HTMLElement>('#toast');

function toast(text: string): void {
  toastEl.textContent = text;
  toastEl.classList.add('on');
  window.setTimeout(() => toastEl.classList.remove('on'), 3200);
}

/*
 * 版本号显示在左栏底部，与「恢复默认设置」并列。
 *
 * 取运行时清单里的版本，不写死字面量：它就是浏览器里实际装着的这一版。
 * 排查「改动有没有生效」时看这一个数就够，比翻扩展管理页快。
 */
const versionEl = document.getElementById('version');
if (versionEl) versionEl.textContent = `v${browser.runtime.getManifest().version}`;


import { setCurrent, setRender, setToast } from '../../src/settings/page-state.ts';
import { aiSection } from './sections/ai.ts';
import { scheduleSection } from './sections/schedule.ts';
import { moocSettings } from '../../src/platforms/mooc/settings.ts';

// ---------- 渲染 ----------

function render(): void {
  app.replaceChildren();

  /*
   * 通用设置在前、各平台的分区在后。
   *
   * 分区由拥有者渲染：运行时机、AI、执行与诊断属于外壳（跨平台），
   * 账号与课程、自动任务、前台功能属于慕课（见 src/platforms/mooc/settings.ts）。
   * 新增平台时这里不用改——多出来的分区自然接在后面。
   */
  app.append(
    // 调度是跨平台的，因此它与 AI 一样属于外壳的通用分区
    scheduleSection(),
    // 各平台自己的分区（账号与课程、自动任务、前台功能）
    ...moocSettings.render(),
    // 外壳的通用分区在后（AI 与执行诊断跨平台）
    aiSection(),
  );

  renderToc();
  applyAnchor();
}

/**
 * 跳到地址里指定的锚点。
 *
 * 通知点击后打开看板的单元明细（dashboard.html#platforms），
 * 这一页本地的通知锚点已经用不上了；这段跟随逻辑留给页面内的分区跳转：
 * 这一页有几个异步视图（运行状态、课程列表），数据到达前后文档高度相差
 * 上千像素，因此不能在渲染完成时只定位一次就完事。
 *
 * 这里观察文档高度，每次变化都重新对准目标；用户自己一开始滚动就停止跟随，
 * 免得把人拽回去。跟随最多持续几秒，之后即便还有零星变化也不再干预。
 */
function applyAnchor(): void {
  const id = window.location.hash.replace(/^#/, '');
  if (!id) return;

  const scroll = (): void => {
    const target = document.getElementById(id);
    if (!target) return;
    window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY);
  };

  scroll();

  const observer = new ResizeObserver(scroll);
  observer.observe(document.body);

  let stopped = false;
  const stop = (): void => {
    if (stopped) return;
    stopped = true;
    observer.disconnect();
    window.removeEventListener('wheel', stop);
    window.removeEventListener('touchstart', stop);
    window.clearTimeout(timer);
  };

  // 用户一动手就不再跟随
  window.addEventListener('wheel', stop, { passive: true });
  window.addEventListener('touchstart', stop, { passive: true });
  const timer = window.setTimeout(stop, 6000);
}

/**
 * 生成左侧分区导航，并让它跟着滚动高亮当前分区。
 *
 * 导航项从实际渲染出的分区读取标题，不手写一份列表：
 * 手写的话，改了分区标题而忘了改导航，两边就会对不上。
 *
 * 高亮用滚动位置判断而不是 IntersectionObserver：
 * 分区高度差异很大（列表能上千像素，设置项只有一百像素），
 * 用可见比例判定会跳来跳去，按「最后一个已越过顶部的分区」最稳。
 */
function renderToc(): void {
  if (!toc) return;

  const sections = Array.from(app.querySelectorAll<HTMLElement>('.sp-section'));
  toc.replaceChildren();

  const links = sections.map((el) => {
    const link = document.createElement('a');
    link.href = `#${el.id}`;
    link.textContent = el.querySelector('.sp-section-title')?.textContent ?? el.id;
    toc.append(link);
    return link;
  });

  /*
   * 导航吸顶的位置要避开页头，页头高度随字号与换行变化，
   * 因此实测一次写进变量，而不是写死一个数字。
   */
  const masthead = document.querySelector('.masthead');
  const offset = (masthead?.getBoundingClientRect().height ?? 110) + 24;
  document.documentElement.style.setProperty('--toc-top', `${offset}px`);

  const highlight = (): void => {
    // 已经越过分区顶部、且离顶部最近的那个就是当前分区
    let currentIndex = 0;
    sections.forEach((el, index) => {
      if (el.getBoundingClientRect().top <= offset + 8) currentIndex = index;
    });
    // 滚到底时最后一个分区必须点亮，否则末尾几个短分区永远选不中
    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) currentIndex = sections.length - 1;

    links.forEach((link, index) => {
      link.classList.toggle('is-current', index === currentIndex);
    });
  };

  highlight();
  window.addEventListener('scroll', highlight, { passive: true });
  window.addEventListener('resize', highlight, { passive: true });
}


/**
 * 读取课程列表。
 *
 * 主动打开设置页，或按下「读取课程列表」，都走这条路：
 * 直接去平台拉一次，不用按天缓存。用户此刻想看的是最新状态。
 * 按天缓存只给后台自动任务用——那种场景一天拉一次足够，
 * 反复开关浏览器不该重复请求。
 *
 * 失败不弹提示：页面本身会显示课程区的空状态与错误说明，
 * 再弹一条只会重复。
 */
async function loadCourses(): Promise<void> {
  try {
    await sendToBackground({ type: 'REFRESH_COURSES' });
  } catch {
    // 拉取失败时沿用已有的课程列表
  }
}

async function init(): Promise<void> {
  // 读取配置期间先给出占位，避免 #app 从零高度被内容突然撑开，
  // 那会让页头与底部按钮先排一遍、再被顶走，看起来像"加载时定了一下"。
  app.textContent = '正在读取配置…';
  app.className = 'sp-loading';

  /*
   * 先读配置画出界面，再在后台刷新课程。
   *
   * 不 await 刷新的原因：拉课程是两次网络往返，放在渲染之前会让
   * 「正在读取配置」多停一两秒。先用存储里的数据把界面画出来，
   * 刷新完成后再重画——用户很快看到内容，随后自动更新到最新。
   */
  setCurrent(await getSettings());
  app.className = '';
  render();

  void loadCourses().then(async () => {
    setCurrent(await getSettings());
    render();
  });

  document.getElementById('reset')?.addEventListener('click', () => {
    if (!window.confirm('确定恢复默认设置？所有开关回到默认，课程列表与勾选一并清空。')) return;
    void resetSettings().then((next) => {
      setCurrent(next);
      render();
      toast('已恢复默认设置');
    });
  });
}

setToast(toast);
setRender(render);

void init();