/*
 * 账号与课程卡头里的状态行（标题右侧，与读取按钮同一行）。
 *
 *   账号与课程   已登录 · 5 门课程参与 · 待交 18 项 · 课件剩 985 项   [读取课程列表]
 *
 * 只负责**加载完成后的状态**：读取期间卡头立一条骨架占位（与课件卡同一种
 * 等待语言，不写字）；读取失败或未登录时卡头保持空白——「正在读取…」那句
 * 说明只在内容区出现一次；未登录的指引也放内容区（见 courses.ts），
 * 因为那是一句要读进去的话，不是一行状态。
 *
 * 数字来自与课件区共用的同一条平台读取（courseware 响应），不另发消息；
 * 数字读不到时头部只留本地事实（已登录 · N 门参与），失败细节由课件卡自己报。
 *
 * 每个平台分区各有一行（智慧树那份见 zhihuishu-status-line.ts）；
 * 待交数刻意不上移到平台切换 tab 的徽标——徽标会把「读不到结构」的课
 * 算成一个数字，读不到与没有要交的事就分不清了。
 */

import { getCourseware, getSession, getSettings } from '../../src/ui-bridge';
import type { CoursewareSummary, QueryOutcome } from '../../src/ui-bridge';

/**
 * 卡头状态行立刻进入等待（骨架守位）。
 * 两处调用：本行自己的重读（renderStatusLine 内部），以及
 * 「读取课程列表」点击那一刻——那是整块慕课数据的刷新入口，
 * 三块区域要同一刻进入等待，它不能等到重读发起才亮骨架。
 */
export function markStatusLineLoading(): void {
  const el = document.getElementById('session-text');
  if (el === null) return;
  el.textContent = '';
  el.classList.add('is-loading');
}

export async function renderStatusLine(
  coursewareRead?: Promise<QueryOutcome<CoursewareSummary>>,
): Promise<void> {
  const el = document.getElementById('session-text');
  if (el === null) return;

  /**
   * 落定：写文字并**撤掉骨架**——所有出口都走这里。
   *
   * 与智慧树那份（zhihuishu-status-line.ts）同一个漏：三条早退路径只写文字、
   * 不撤 `is-loading`，而骨架是**点击「读取课程列表」那一刻**就立起来的，
   * 于是走完那三条路骨架就永远留在卡头——「未登录」最常撞上。
   * 统一出口是唯一不会再漏的形状（弹窗待办区的 `write` 同理）。
   */
  const settle = (text: string): void => {
    el.classList.remove('is-loading');
    el.textContent = text;
  };

  let loggedIn = false;
  let enabled = 0;
  try {
    const [session, settings] = await Promise.all([getSession(), getSettings()]);
    loggedIn = session.loggedIn;
    enabled = settings.mooc.courses.filter((course) => course.enabled).length;
  } catch {
    settle('');
    return;
  }

  // 未登录：卡头空白，指引在内容区
  if (!loggedIn) {
    settle('');
    return;
  }

  if (enabled === 0) {
    settle('已登录 · 未选择课程');
    return;
  }

  // 要等平台读取了：先在最终位置立起骨架（等的是同一份数，与课件卡
  // 同一种等待语言），落定后同一刻换成文字——内容不从虚无里冒出来。
  markStatusLineLoading();

  const parts = ['已登录', `${enabled} 门课程参与`];
  const courseware = await (coursewareRead ?? getCourseware());
  if (courseware.status === 'ok') {
    const count = courseware.value.pending.auto + courseware.value.pending.manual;
    parts.push(count === 0 ? '暂无待交' : `待交 ${count} 项`);
    const left = courseware.value.courses.reduce((sum, entry) => sum + entry.pending, 0);
    parts.push(left === 0 ? '课件已完成' : `课件剩 ${left} 项`);
  }

  settle(parts.join(' · '));
}
