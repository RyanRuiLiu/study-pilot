/*
 * 课程列表：读取、勾选与状态显示。
 *
 * 从 options/main.ts 搬出。账号区要用它，因此单独成模块，避免区块反向引用入口。
 * 控件（折叠区、勾选框）来自组件层，这一份只决定放哪几项、写什么字。
 */

import { coursePageUrl, describeCourseMode } from '@study-pilot/platform-mooc';
import { formatTermRange } from '../../../features/format';
import { checkbox, disclosure } from '../../../ui/form.ts';
import { toggleCourse } from '../../../settings/page-write.ts';
import { current } from '../../../settings/page-state.ts';

export function courseList(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'sp-courses';
  const courses = current.mooc.background.courses;

  if (courses.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'sp-empty';
    empty.textContent = '尚未读取课程。请先点击上方的「读取课程列表」。';
    wrap.append(empty);
    return wrap;
  }

  /*
   * 默认收起，只留一行概要。
   *
   * 六门课展开后每门三行，占掉大半屏，把后面的内容全推到下面去；
   * 而经过首次勾选之后，用户多数时候只是想知道"选了几门"，
   * 不再需要逐门看。概要里给出这个数字，想看细节再展开。
   */
  const summaryText = (): string =>
    `已选 ${courses.filter((course) => course.enabled).length} 门，共 ${courses.length} 门`;

  const list = document.createElement('div');
  const details = disclosure(summaryText(), [list]);

  for (const course of courses) {
    const item = document.createElement('div');
    item.className = 'sp-course';

    // 勾选框与「打开课程」是两个独立动作，因此不用 label 包住整张卡片
    const check = checkbox(course.enabled, '参与后台任务', (next) => {
      course.enabled = next;

      /*
       * 概要条上的「已选 N 门」是该数字最容易过时的地方——用户勾掉一门，
       * 它仍显示旧数目，看起来像没生效。因此这里就地改一次。
       *
       * 落盘以存储里的课程列表为基准（见 toggleCourse），界面上的改动是即时的。
       * 勾选变化还会影响看板上的单元明细，但那一页每次打开都重新读，
       * 不需要在这里通知它。
       */
      details.setAttribute('summary', summaryText());
      void toggleCourse(course.termId, next);
    });

    const link = document.createElement('a');
    link.className = 'sp-course-main';
    // MOOC 走 /learn/，SPOC 与 ROOC 走 /spoc/learn/，两种前缀不可混用
    link.href = coursePageUrl(course);
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.title = '打开课程页面';

    const head = document.createElement('div');
    head.className = 'sp-course-head';

    const name = document.createElement('span');
    name.className = 'sp-course-name';
    name.textContent = course.name;
    head.append(name);

    // 平台未提供模式时省略这一项，而不是显示占位词
    const modeText = describeCourseMode(course.mode);
    if (modeText) {
      const mode = document.createElement('span');
      mode.className = 'sp-course-mode';
      mode.textContent = modeText;
      head.append(mode);
    }

    const meta = document.createElement('div');
    meta.className = 'sp-course-meta';
    meta.textContent = `${course.schoolName} · ${formatTermRange(course.startTime, course.endTime)}`;

    const stats = document.createElement('div');
    stats.className = 'sp-course-stats';
    const parts: string[] = [];
    if (course.lessonsCount > 0) parts.push(`${course.lessonsCount} 课时`);
    if (course.enrollCount > 0) parts.push(`${course.enrollCount} 人选课`);
    stats.textContent = parts.join(' · ');

    link.append(head, meta, stats);
    item.append(check, link);
    list.append(item);
  }

  wrap.append(details);
  return wrap;
}
