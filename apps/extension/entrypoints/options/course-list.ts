/*
 * 课程列表：读取、勾选与状态显示。
 *
 * 从 options/main.ts 搬出。账号区要用它，因此单独成模块，避免区块反向引用入口。
 * 主体原样搬运，只补上它用到的外部名字。
 */

import { coursePageUrl, describeCourseMode } from '@study-pilot/platform-mooc';
import { formatTermRange } from '../../src/features/format';
import { toggleCourse } from './settings-write.ts';
import { reloadUnitDetails } from './unit-details.ts';
import { current } from './state.ts';
export function courseList(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'courses';
  const courses = current.mooc.background.courses;

  if (courses.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty';
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
  const selected = courses.filter((course) => course.enabled).length;

  const bar = document.createElement('button');
  bar.type = 'button';
  bar.className = 'courses-toggle';
  bar.setAttribute('aria-expanded', 'false');

  const summary = document.createElement('span');
  summary.className = 'courses-summary';
  summary.textContent = `已选 ${selected} 门，共 ${courses.length} 门`;

  const disclosure = document.createElement('span');
  disclosure.className = 'courses-disclosure';
  disclosure.textContent = '展开';

  bar.append(summary, disclosure);

  const list = document.createElement('div');
  list.className = 'courses-list f-dn';

  bar.addEventListener('click', () => {
    const expanded = list.classList.toggle('f-dn') === false;
    bar.setAttribute('aria-expanded', String(expanded));
    disclosure.textContent = expanded ? '收起' : '展开';
  });

  for (const course of courses) {
    const item = document.createElement('div');
    item.className = 'course';
    if (course.enabled) item.classList.add('is-on');

    // 勾选框与「打开课程」是两个独立动作，因此不用 label 包住整张卡片
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'course-check';
    check.checked = course.enabled;
    check.title = '参与后台任务';
    check.addEventListener('change', () => {
      course.enabled = check.checked;
      item.classList.toggle('is-on', check.checked);

      /*
       * 勾选变化要连带更新三处，光存盘不够。
       *
       * 概要条上的「已选 N 门」是该数字最容易过时的地方——用户勾掉一门，
       * 它仍显示旧数目，看起来像没生效。而单元明细按勾选的课程过滤，
       * 取消勾选后那一门仍列在那里，用户会以为取消没成功。
       */
      summary.textContent = `已选 ${
        courses.filter((c) => c.enabled).length
      } 门，共 ${courses.length} 门`;

      // 落盘以存储里的课程列表为基准（见 toggleCourse），界面上的改动是即时的
      void toggleCourse(course.termId, check.checked).then(() => reloadUnitDetails());
    });

    const link = document.createElement('a');
    link.className = 'course-main';
    // MOOC 走 /learn/，SPOC 与 ROOC 走 /spoc/learn/，两种前缀不可混用
    link.href = coursePageUrl(course);
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.title = '打开课程页面';

    const head = document.createElement('div');
    head.className = 'course-head';

    const name = document.createElement('span');
    name.className = 'course-name';
    name.textContent = course.name;

    head.append(name);

    // 平台未提供模式时省略这一项，而不是显示占位词
    const modeText = describeCourseMode(course.mode);
    if (modeText) {
      const mode = document.createElement('span');
      mode.className = 'course-mode';
      mode.textContent = modeText;
      head.append(mode);
    }

    const meta = document.createElement('div');
    meta.className = 'course-meta';
    meta.textContent = `${course.schoolName} · ${formatTermRange(course.startTime, course.endTime)}`;

    const stats = document.createElement('div');
    stats.className = 'course-stats';
    const parts: string[] = [];
    if (course.lessonsCount > 0) parts.push(`${course.lessonsCount} 课时`);
    if (course.enrollCount > 0) parts.push(`${course.enrollCount} 人选课`);
    stats.textContent = parts.join(' · ');

    link.append(head, meta, stats);
    item.append(check, link);
    list.append(item);
  }

  wrap.append(bar, list);
  return wrap;
}
