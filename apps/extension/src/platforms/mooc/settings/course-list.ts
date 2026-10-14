/*
 * 课程列表：读取、勾选与状态显示。
 *
 * 结构是官方的：一份 sl-details 收起放概要（已选几门），展开后每门课一个
 * sl-checkbox（标签就是课程名，说明里放学校、学期与统计），后面跟一个打开课程的按钮。
 * 勾选与「打开课程」是两个独立动作，因此不用一个标签把整行包起来。
 */

import { coursePageUrl, describeCourseMode } from '@study-pilot/platform-mooc';
import { formatTermRange } from '../../../ui/format';
import { button, checkbox } from '../../../ui/form.ts';
import { toggleCourse } from '../../../settings/page-write.ts';
import { current } from '../../../settings/page-state.ts';

export function courseList(): HTMLElement {
  const courses = current.mooc.background.courses;

  if (courses.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = '尚未读取课程。请先点上面的「读取课程列表」。';
    return empty;
  }

  /*
   * 默认收起，只留一行概要。
   *
   * 六门课展开后每门两行，占掉大半屏，把后面的内容全推到下面去；
   * 而经过首次勾选之后，用户多数时候只是想知道「选了几门」。
   */
  const summaryText = (): string =>
    `已选 ${courses.filter((course) => course.enabled).length} 门，共 ${courses.length} 门`;

  const list = document.createElement('div');
  list.className = 'sp-stack';

  const details = document.createElement('sl-details');
  details.setAttribute('summary', summaryText());
  details.append(list);

  for (const course of courses) {
    const line = document.createElement('div');
    line.className = 'sp-line';

    const modeText = describeCourseMode(course.mode);
    const facts = [course.schoolName, formatTermRange(course.startTime, course.endTime)];
    if (modeText !== '') facts.push(modeText);
    if (course.lessonsCount > 0) facts.push(`${course.lessonsCount} 课时`);
    if (course.enrollCount > 0) facts.push(`${course.enrollCount} 人选课`);

    const check = checkbox({
      label: course.name,
      help: facts.join('，'),
      value: course.enabled,
      onChange: (next) => {
        /*
         * 概要条上的「已选 N 门」是该数字最容易过时的地方——用户勾掉一门，
         * 它仍显示旧数目，看起来像没生效。因此这里就地改一次。
         */
        details.setAttribute('summary', summaryText());
        void toggleCourse(course.termId, next);
      },
    });

    const open = button({
      label: '打开课程',
      href: coursePageUrl(course),
      outline: true,
      title: '在新标签页打开这门课程的页面',
    });

    line.append(check, open);
    list.append(line);
  }

  return details;
}
