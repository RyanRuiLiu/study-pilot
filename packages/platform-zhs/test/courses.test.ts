/* 课程列表：响应解析与「只沿用勾选」的合并规则。 */

import { describe, expect, it } from 'vitest';
import { getShareCourses, mergeCourses } from '../src/courses.ts';
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
              courseId: 1000006163,
              recruitId: 473310,
              courseName: '创造性思维与创新方法',
              schoolName: '同济大学',
              progress: '0%',
              secret: '4e5f5a5b44594859454a5859584358455b',
            },
          ],
        },
      }),
    );
    expect(briefs).toEqual([
      {
        courseId: 1000006163,
        recruitId: 473310,
        secret: '4e5f5a5b44594859454a5859584358455b',
        name: '创造性思维与创新方法',
        schoolName: '同济大学',
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
