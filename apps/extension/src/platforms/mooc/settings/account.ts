/*
 * 设置区：account。
 *
 * 「读取课程列表」这个动作也在这里：它做的是慕课的事（向后台要慕课的课程），
 * 而外壳不该认识它。此前这个函数住在 `entrypoints/options/actions.ts`，
 * 由本文件反向 import 页面——平台依赖页面，方向是倒的。
 */

import { row, toggle, button, platform, section } from '../../../ui/form.ts';
import { bindSetting } from '../../../settings/page-write.ts';
import { describeRejection, sendToBackground } from '../../../browser/messaging';
import { getSettings } from '../../../settings';
import { sessionBadge, syncSessionBadge } from './session-row.ts';
import { courseList } from './course-list.ts';
import { current, render, setCurrent, toast } from '../../../settings/page-state.ts';

/**
 * 主动读取课程列表。
 *
 * 由用户按下按钮触发，因此总是真的去平台拉一次，不走缓存——他想看到
 * 此刻的状态，不是昨天存下来的。「今天拉过没有」那个判据只服务于自动任务。
 */
async function refreshCourses(): Promise<void> {
  toast('正在读取课程列表');
  const response = await sendToBackground({ type: 'REFRESH_COURSES' });
  if (!response.ok) {
    toast(describeRejection(response.reason));
    /*
     * 后台报未登录时，让同一区块的登录状态行重读一次。
     *
     * 长时间闲置后「课程读不出」而登录行还挂着旧的「已登录」时，用户看到的
     * 是两行互相矛盾的话（「已登录」+「请先登录」），无从判断该信哪一行。
     */
    if (response.reason === 'NOT_LOGGED_IN') syncSessionBadge?.();
    return;
  }
  setCurrent(await getSettings());
  render();
  toast(`已读取 ${response.courses.length} 门课程`);
}

export function accountSection(): HTMLElement {
  return section('account', '账号与课程', '先确认登录状态，再选择参与任务的课程。', [
      platform('慕课平台', 'icourse163.org', [
        row(
          '启用 Study Pilot',
          '关闭后不再执行后台任务，页面里的辅助面板也不再显示',
          toggle(current.enabled, bindSetting<boolean>('enabled')),
        ),
        row(
          '登录状态',
          '需要登录才能读取你在平台上的课程与作业',
          sessionBadge(),
        ),
        row(
          '课程列表',
          '读取当前账号的课程，之后手动勾选参与任务的课程',
          button({
            label: '读取课程列表',
            variant: 'primary',
            onClick: () => {
              void refreshCourses();
            },
          }),
        ),
        courseList(),
      ]),
    ]);
}
