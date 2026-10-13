/*
 * 中立映射的测试。
 *
 * 看板只认中立模型，因此这一层错一处，看板上就是「某一类任务整体消失或状态不对」，
 * 而它不会报错。这里逐条钉住四件事：
 *   1. 类别映射（六种课件单元 + 四类工作项）
 *   2. `mode`：谁来做（auto / assisted / manual）
 *   3. `state`：做到哪了（只有三态）
 *   4. 派生任务：已提交的作业会分出互评与自评两条
 */

import { describe, expect, it } from 'vitest';
import { UNIT_TYPE } from '@study-pilot/platform-mooc';
import type { SnapshotCourse, SnapshotWork } from '../src/background/mooc/snapshot';
import { PLATFORMS, adapterOf } from '../src/platforms/index';
import { taskId } from '../src/domain/task';

const COURSE: SnapshotCourse = {
  termId: 9000000030,
  courseId: 9000000014,
  schoolShortName: 'NTU',
  mode: 0,
  courseName: '示例课程丁',
  works: [],
  units: [],
};

function work(overrides: Partial<SnapshotWork> = {}): SnapshotWork {
  return {
    tid: 900,
    name: '第三单元作业',
    chapterName: '第三章',
    examId: null,
    type: 'homework',
    submitted: false,
    deadline: 1_800_000_000_000,
    evaluateStart: null,
    evaluateEnd: null,
    evaluateScoreRelease: null,
    score: null,
    totalScore: null,
    reviewable: false,
    evaluateDone: null,
    evaluateTotal: null,
    selfDone: null,
    ...overrides,
  };
}

function course(overrides: Partial<SnapshotCourse> = {}): SnapshotCourse {
  return { ...COURSE, ...overrides };
}

describe('注册表', () => {
  it('按平台 id 取 adapter；没有的返回 null', () => {
    expect(adapterOf('mooc')?.platform.name).toBe('慕课');
    expect(adapterOf('unknown')).toBeNull();
    expect(PLATFORMS).toHaveLength(1);
  });
});

describe('课件单元 → 任务', () => {
  it('六种已知类型各自的类别、做法与状态', () => {
    const units = [
      { contentType: UNIT_TYPE.VIDEO, kind: 'video', mode: 'auto' },
      { contentType: UNIT_TYPE.PDF, kind: 'document', mode: 'auto' },
      { contentType: UNIT_TYPE.TEXT, kind: 'text', mode: 'auto' },
      { contentType: UNIT_TYPE.QUESTION, kind: 'quiz', mode: 'auto' },
      // 讨论要 AI 写留言，因此不是 auto
      { contentType: UNIT_TYPE.DISCUSS, kind: 'discuss', mode: 'assisted' },
    ] as const;

    for (const [index, row] of units.entries()) {
      const tasks = adapterOf('mooc')!.toTasks(
        course({
          units: [
            {
              unitId: 1000 + index,
              contentId: 2000 + index,
              termId: 9000000030,
              lessonId: 1,
              lessonName: '1.1',
              name: `单元 ${index}`,
              contentType: row.contentType,
              durationInSeconds: null,
              completePercent: 0,
              viewStatus: 0,
            },
          ],
        }),
      );

      expect(tasks).toHaveLength(1);
      expect(tasks[0]).toMatchObject({
        kind: row.kind,
        mode: row.mode,
        state: 'todo',
        id: taskId('mooc', 9000000014, row.kind, 1000 + index),
      });
    }
  });

  it('已完成按 completePercent 判定', () => {
    const tasks = adapterOf('mooc')!.toTasks(
      course({
        units: [
          {
            unitId: 1,
            contentId: 2,
            termId: 3,
            lessonId: 4,
            lessonName: '1.1',
            name: '看过的视频',
            contentType: UNIT_TYPE.VIDEO,
            durationInSeconds: 500,
            completePercent: 1,
            viewStatus: 5,
          },
        ],
      }),
    );
    expect(tasks[0]?.state).toBe('done');
  });

  it('未实测的类型不映射——宁可不展示也不猜', () => {
    const tasks = adapterOf('mooc')!.toTasks(
      course({
        units: [
          {
            unitId: 1,
            contentId: 2,
            termId: 3,
            lessonId: 4,
            lessonName: '1.1',
            name: '直播',
            contentType: UNIT_TYPE.LIVE,
            durationInSeconds: null,
            completePercent: 0,
            viewStatus: 0,
          },
        ],
      }),
    );
    expect(tasks).toEqual([]);
  });
});

describe('工作项 → 任务', () => {
  it('测验未提交时可由后台完成，考试与作业只能人工', () => {
    const tasks = adapterOf('mooc')!.toTasks(
      course({
        works: [
          work({ tid: 1, type: 'quiz', name: '单元测验' }),
          work({ tid: 2, type: 'homework', name: '单元作业' }),
          work({ tid: 3, type: 'exam-objective', name: '期末（客观）' }),
          work({ tid: 4, type: 'exam-subjective', name: '期末（主观）' }),
        ],
      }),
    );

    const byTid = Object.fromEntries(tasks.map((t) => [t.title, t.mode]));
    expect(byTid).toEqual({
      单元测验: 'auto',
      单元作业: 'manual',
      '期末（客观）': 'manual',
      '期末（主观）': 'manual',
    });
  });

  it('已提交的作业会分出互评与自评两条独立任务', () => {
    const tasks = adapterOf('mooc')!.toTasks(
      course({
        works: [
          work({
            tid: 900,
            submitted: true,
            reviewable: true,
            evaluateTotal: 5,
            evaluateDone: 2,
            selfDone: false,
          }),
        ],
      }),
    );

    const kinds = tasks.map((t) => t.kind).sort();
    expect(kinds).toEqual(['homework', 'peer-review', 'self-review']);

    const peer = tasks.find((t) => t.kind === 'peer-review');
    expect(peer).toMatchObject({ mode: 'auto', state: 'todo' });
    const self = tasks.find((t) => t.kind === 'self-review');
    expect(self).toMatchObject({ mode: 'auto', state: 'todo' });
    // 工作项本身已提交，因此是 done
    expect(tasks.find((t) => t.kind === 'homework')?.state).toBe('done');
  });

  it('互评评够、自评做完时两条都是完成', () => {
    const tasks = adapterOf('mooc')!.toTasks(
      course({
        works: [
          work({ submitted: true, reviewable: true, evaluateTotal: 5, evaluateDone: 5, selfDone: true }),
        ],
      }),
    );
    expect(tasks.filter((t) => t.state === 'done')).toHaveLength(3);
  });

  it('配额未知时不派生互评——那说明上次没读到进度，占一份配额有副作用', () => {
    const tasks = adapterOf('mooc')!.toTasks(
      course({ works: [work({ submitted: true, reviewable: true })] }),
    );
    expect(tasks.map((t) => t.kind)).toEqual(['homework']);
  });

  it('每条任务都带可跳转地址（由平台 adapter 提供）', () => {
    const tasks = adapterOf('mooc')!.toTasks(course({ works: [work({ tid: 42 })] }));
    expect(tasks[0]?.link).toContain('id=42');
  });
});

describe('课程映射', () => {
  it('带上平台与学期，供看板分组', () => {
    expect(adapterOf('mooc')!.toCourse(COURSE)).toEqual({
      platformId: 'mooc',
      courseId: 9000000014,
      termId: 9000000030,
      name: '示例课程丁',
    });
  });
});
