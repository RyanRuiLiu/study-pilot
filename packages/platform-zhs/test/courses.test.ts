/* 课程列表：响应解析与「只沿用勾选」的合并规则。 */

import { describe, expect, it } from 'vitest';
import { getShareCourses, mergeCourses, readCourseIsApply } from '../src/courses.ts';
import type { ZhsClient } from '../src/client.ts';
import type { ZhihuishuCourse } from '@study-pilot/application';

function clientReturning(body: unknown): ZhsClient {
  return { call: async () => body };
}

describe('getShareCourses', () => {
  it('从 result.courseOpenDtos 取出课程事实（字段名对齐平台）', async () => {
    const briefs = await getShareCourses(
      clientReturning({
        code: 200,
        result: {
          totalCount: 1,
          courseOpenDtos: [
            {
              courseId: 9000000002,
              recruitId: 900004,
              courseName: '示例课程己',
              schoolName: '示例大学',
              progress: '0%',
              secret: 'bb66bb66bb66bb66bb66bb66bb66bb66bb66bb',
            },
          ],
        },
      }),
    );
    expect(briefs).toEqual([
      {
        courseId: 9000000002,
        recruitId: 900004,
        secret: 'bb66bb66bb66bb66bb66bb66bb66bb66bb66bb',
        name: '示例课程己',
        schoolName: '示例大学',
        progressText: '0%',
      },
    ]);
  });

  it('缺 id 的畸形条目不进列表', async () => {
    const briefs = await getShareCourses(
      clientReturning({ code: 200, result: { courseOpenDtos: [{ courseName: '无 id' }] } }),
    );
    expect(briefs).toEqual([]);
  });
});

describe('readCourseIsApply', () => {
  it('服务端给值就用（金样本实况：数字 1）', async () => {
    expect(await readCourseIsApply(clientReturning({ code: 0, data: { isApply: 1 } }), 'hex')).toBe(1);
  });

  it('服务端没给（0 / 缺字段 / 无 data）时回落站点自己的 "1"', async () => {
    expect(await readCourseIsApply(clientReturning({ code: 0, data: { isApply: 0 } }), 'hex')).toBe('1');
    expect(await readCourseIsApply(clientReturning({ code: 0, data: {} }), 'hex')).toBe('1');
    expect(await readCourseIsApply(clientReturning({ code: 0 }), 'hex')).toBe('1');
  });
});

describe('mergeCourses', () => {
  const fresh = [
    { courseId: 1, recruitId: 10, secret: 'a', name: '甲', schoolName: 'A 校', progressText: '10%' },
    { courseId: 2, recruitId: 20, secret: 'b', name: '乙', schoolName: 'B 校', progressText: '0%' },
  ];
  const existing: ZhihuishuCourse[] = [
    { courseId: 1, recruitId: 10, secret: 'old', name: '甲', schoolName: 'A 校', progressText: '9%', enabled: true },
  ];

  it('已勾课程沿用勾选，平台事实以新读的为准', () => {
    const merged = mergeCourses(fresh, existing);
    expect(merged[0]).toMatchObject({ courseId: 1, enabled: true, progressText: '10%', secret: 'a' });
  });

  it('新出现的课程默认不勾（不把用户没同意过的课拖进范围）', () => {
    const merged = mergeCourses(fresh, existing);
    expect(merged[1]).toMatchObject({ courseId: 2, enabled: false });
  });

  it('用户取消过的勾选同样被沿用（不会因为刷新又勾回来）', () => {
    const merged = mergeCourses(fresh, [{ ...existing[0], enabled: false }]);
    expect(merged[0].enabled).toBe(false);
  });
});
