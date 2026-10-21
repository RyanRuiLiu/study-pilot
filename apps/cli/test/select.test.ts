/* `courses --select`：两个平台同一套切换语义，不因平台不同而单选/多选混用。 */

import { describe, expect, it } from 'vitest';
import { toggleCourse } from '../src/select.ts';

interface Course {
  termId: number;
  enabled: boolean;
}

const COURSES: Course[] = [
  { termId: 1, enabled: true },
  { termId: 2, enabled: false },
  { termId: 3, enabled: true },
];

describe('toggleCourse', () => {
  it('勾上一门未参与的课：只改它，不取消别家已勾的', () => {
    const result = toggleCourse(COURSES, (course) => course.termId === 2);
    expect(result.found).toBe(true);
    expect(result.enabled).toBe(true);
    expect(result.courses.map((course) => course.enabled)).toEqual([true, true, true]);
  });

  it('再切换一次取消参与，别家不受影响', () => {
    const first = toggleCourse(COURSES, (course) => course.termId === 1);
    expect(first.enabled).toBe(false);
    expect(first.courses.map((course) => course.enabled)).toEqual([false, false, true]);
  });

  it('找不到这门课：原样返回，调用方据此报错', () => {
    const result = toggleCourse(COURSES, (course) => course.termId === 99);
    expect(result.found).toBe(false);
    expect(result.courses).toEqual(COURSES);
  });

  it('不原地修改传入的列表（数组是整体替换的契约）', () => {
    const input = COURSES.map((course) => ({ ...course }));
    toggleCourse(input, (course) => course.termId === 2);
    expect(input.map((course) => course.enabled)).toEqual([true, false, true]);
  });
});
