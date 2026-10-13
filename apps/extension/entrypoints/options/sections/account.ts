/*
 * 设置区：account。
 *
 * 从 options/main.ts 的 render() 搬出；表达式原样，只在开头取一次配置。
 */

import { row, toggle, button, platform, section } from '../ui.ts';
import { bindSetting } from '../settings-write.ts';
import { sessionBadge } from '../session-row.ts';
import { refreshCourses } from '../actions.ts';
import { courseList } from '../course-list.ts';
import { current } from '../state.ts';

export function accountSection(): HTMLElement {
  const mooc = current.mooc;
  const ai = current.ai;
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
          button('读取课程列表', () => {
            void refreshCourses();
          }),
        ),
        courseList(),
      ]),
    ]);
}
