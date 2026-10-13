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
 * 样式分三层引入：tokens（取值）、base（通用元素）、本页布局。
 * 必须通过 import 引入，不能用 HTML 的 <link>——构建后源路径不会被改写，
 * 会变成死链，页面于是回退到浏览器默认样式。
 * 弹窗用的是同一组 tokens 与 base，两页的字体、纸墨与控件因此完全一致。
 */

import '../../src/ui/tokens.css';
import './style.css';

import {
  getSettings,
  resetSettings,
  updateSettings,
  type Settings,
} from '../../src/settings';
import { chatOrigin } from '@study-pilot/ai';
import { testAiConnection } from '../../src/ai';
import { ensureHostPermission } from '../../src/ai/permission';
import {
  REJECTION_MESSAGES,
  sendToBackground,
  WORK_STATUS,
  type JobRejection,
  type UnitDetail,
} from '../../src/platform/messaging';
import { describeRunState } from '../../src/background/runtime/scheduler';
import { coursePageUrl, describeCourseMode, workPageUrl } from '@study-pilot/platform-mooc';
import type { SelectedCourse } from '../../src/settings';
import { formatDateTime, formatTermRange } from '../../src/features/format';

const app = document.getElementById('app')!;
const toc = document.getElementById('toc');
const toastEl = document.getElementById('toast')!;

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


import { current, setCurrent, setRender, setToast } from './state.ts';
import { accountSection } from './sections/account.ts';
import { detailsSection } from './sections/details.ts';
import { scheduleSection } from './sections/schedule.ts';
import { tasksSection } from './sections/tasks.ts';
import { aiSection } from './sections/ai.ts';
import { foregroundSection } from './sections/foreground.ts';
import { executionSection } from './sections/execution.ts';
import { courseList } from './course-list.ts';
import { progressView, resetProgress, runAll } from './run-views.ts';
import { row, toggle, numberInput, textInput, note, button, platform, prose, section } from './ui.ts';
import { lastRunHint, readSessionInto, sessionBadge } from './session-row.ts';
import { loadUnitDetails, reloadUnitDetails, statusClass, unitDetailsView, signalContentReady } from './unit-details.ts';
import { writePatch, setPath, patchAt, bindSetting, toggleCourse } from './settings-write.ts';
import { requestAiPermission, checkAiConnection, describeRejection, refreshCourses } from './actions.ts';

// ---------- 渲染 ----------



/**
 * 课程列表。
 *
 * 每门课呈现为一张卡片：课程名、类型、学校、学期区间、规模，
 * 以及是否参与后台任务的勾选框。点击卡片主体会打开该课程的学习页。
 *
 * 不显示 termId 之类的内部标识——它们对用户没有意义，
 * 需要时由后台自己按课程索引。
 */

function render(): void {
  app.replaceChildren();
  const mooc = current.mooc;
  const ai = current.ai;

  app.append(
    accountSection(),

    /*
     * 单元明细紧跟课程之后。
     *
     * 它依赖上面已勾选的课程，位置顺；同时这一份清单是「我还剩什么没做」
     * 的答案，是打开设置页最常想看的东西，放在前面比埋在执行与诊断里省事。
     */
    /*
     * 明细也套一层卡片，与其余分区一致。
     *
     * 先前它直接放在页面底色上，于是这一段的背景与其他板块不同——
     * 而底色本来就比卡片浅，视觉上会显得这一块「没有边界」。
     */
    detailsSection(),

    scheduleSection(),

    /*
     * 运作方式。
     *
     * 这一节没有可调的东西，只有事实：扩展什么时候动、动什么、不动什么、
     * 出了边界会怎样。用户从界面上只能看到「未提交」这类结果，看不到背后
     * 的规则，而这几条规则决定了他能否放心把提交交给它。
     *
     * 写法上先定义动作，再讲时机。原因是有四个动作容易被混为一谈——
     * 检查不发请求、拉取只读、执行写平台、通知是给用户看的——
     * 而它们的差别正是用户最关心的：会不会频繁请求、会不会动我的数据。
     * 不先分清，后面每句话都会含糊。
     *
     * 每一条都对应代码里的一个实际分支，不是泛泛的承诺。
     */

    tasksSection(),

    aiSection(),

    foregroundSection(),


    executionSection(),
  );

  renderToc();
  applyAnchor();
}

/**
 * 跳到地址里指定的锚点。
 *
 * 通知点击后打开的是 options.html#details。这一页有几个异步视图
 * （运行状态、单元明细），数据到达前后文档高度相差上千像素，
 * 因此不能在渲染完成时只定位一次就完事。
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

  const sections = Array.from(app.querySelectorAll<HTMLElement>('.section'));
  toc.replaceChildren();

  const links = sections.map((el) => {
    const link = document.createElement('a');
    link.href = `#${el.id}`;
    link.textContent = el.querySelector('.section-title')?.textContent ?? el.id;
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
  app.className = 'loading';

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