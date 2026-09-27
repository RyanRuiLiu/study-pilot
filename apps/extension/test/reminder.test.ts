/*
 * 通知内容的组织。
 *
 * 这一块改过几次，用例是照每次的问题写的：
 *
 * 一、新增「互评过期」与「自评过期」时，过期判据只认原来的两种，
 *     于是那两项被当成「待你处理」报给用户——而它们做不了。
 *     判据现已收敛到 OVERDUE_REASONS 一处。
 *
 * 二、通知只按计划组织，不看执行结果。计划是执行之前算的，里面写着
 *     「将自动完成」，而执行之后那些事已经做完了，通知与事实对不上。
 *
 * 三、曾经还报一类「将自动完成」——把扩展打算做的事列给用户。
 *     那不是提醒而是自我说明，用户既不用为它做什么也不关心。
 *     现在只有两类：作业截止、自动完成。
 */

import { describe, expect, it } from 'vitest';
import { composeNotice, type NoticeSettings } from '../src/background/reminder';
import type { Plan, ManualItem, AutoAction } from '../src/background/task-plan';
import type { ExecResult } from '../src/background/execute';
import type { SnapshotCourse, SnapshotWork } from '../src/background/snapshot';

const NOW = new Date(2026, 8, 26, 10, 0, 0).getTime();
const DAY = 24 * 60 * 60 * 1000;

const course = { courseName: '模拟电子技术' } as SnapshotCourse;

/** 两类都开。多数用例关心的是内容，不是开关。 */
const BOTH: NoticeSettings = { deadlineEnabled: true, advanceDays: 1, completionEnabled: true };
/** 只开自动完成提醒。 */
const ONLY_COMPLETION: NoticeSettings = {
  deadlineEnabled: false,
  advanceDays: 1,
  completionEnabled: true,
};
/** 只开截止提醒。 */
const ONLY_DEADLINE: NoticeSettings = {
  deadlineEnabled: true,
  advanceDays: 1,
  completionEnabled: false,
};
/** 都关。 */
const NONE: NoticeSettings = { deadlineEnabled: false, advanceDays: 1, completionEnabled: false };

function work(name: string, deadline: number | null = NOW + 12 * 60 * 60 * 1000): SnapshotWork {
  return {
    tid: 1,
    name,
    chapterName: '第1章',
    examId: null,
    type: 'homework',
    submitted: false,
    deadline,
    evaluateStart: null,
    evaluateEnd: null,
    evaluateScoreRelease: null,
    score: null,
    totalScore: 100,
    reviewable: false,
    evaluateDone: null,
    evaluateTotal: null,
    selfDone: null,
  };
}

function manual(
  reason: ManualItem['reason'],
  name = '第3章 单元作业',
  deadline: number | null = NOW + 12 * 60 * 60 * 1000,
): ManualItem {
  return { course, work: work(name, deadline), deadline, reason };
}

function auto(kind: AutoAction['kind'], name = '第4章 单元测验'): AutoAction {
  return { kind, course, work: work(name), remaining: 0 };
}

function result(
  status: ExecResult['status'],
  name = '第4章 单元测验',
  detail = '',
  kind: ExecResult['kind'] = 'quiz',
): ExecResult {
  return { tid: 1, name, kind, status, detail };
}

function plan(parts: Partial<Plan> = {}): Plan {
  return { auto: [], manual: [], ...parts };
}

describe('无事可说', () => {
  it('两类的开关都关着时不发通知', () => {
    expect(composeNotice(plan(), [result('done')], NONE, NOW)).toBeNull();
  });

  it('没有任何内容时不发通知', () => {
    expect(composeNotice(plan(), [], BOTH, NOW)).toBeNull();
  });

  it('只有 skipped 也返回 null——跳过不是问题，不必报', () => {
    expect(composeNotice(plan(), [result('skipped')], BOTH, NOW)).toBeNull();
  });

  it('有可自动完成的事但还没执行时，不报——那只是扩展的打算', () => {
    expect(composeNotice(plan({ auto: [auto('quiz')] }), [], BOTH, NOW)).toBeNull();
  });
});

describe('自动完成提醒', () => {
  it('完成了就发通知，即使没有任何待办', () => {
    const notice = composeNotice(plan(), [result('done')], BOTH, NOW);
    expect(notice).not.toBeNull();
  });

  it('标题说完成了多少项', () => {
    const notice = composeNotice(
      plan(),
      [result('done'), result('done', '第5章 单元作业')],
      BOTH,
      NOW,
    );
    expect(notice?.title).toBe('Study Pilot：已自动完成 2 项');
  });

  it('正文带上执行结果里的细节', () => {
    const notice = composeNotice(
      plan(),
      [result('done', '第3章 单元作业', '互评 5 / 5', 'review')],
      BOTH,
      NOW,
    );
    expect(notice?.message).toContain('已完成互评');
    expect(notice?.message).toContain('互评 5 / 5');
  });

  it('没有细节时不留空括号', () => {
    const notice = composeNotice(plan(), [result('done')], BOTH, NOW);
    expect(notice?.message).not.toContain('（）');
  });

  it('完成的事排在待办之前——用户最想知道刚发生了什么', () => {
    const notice = composeNotice(
      plan({ manual: [manual('homework-unsubmitted')] }),
      [result('done')],
      BOTH,
      NOW,
    );
    const lines = notice?.message.split('\n') ?? [];
    expect(lines[0]).toContain('已完成');
    expect(lines[1]).toContain('需要你处理');
  });

  it('关掉这个开关后不再报完成，但截止提醒照旧', () => {
    const notice = composeNotice(
      plan({ manual: [manual('homework-unsubmitted')] }),
      [result('done')],
      ONLY_DEADLINE,
      NOW,
    );
    expect(notice?.message).not.toContain('已完成');
    expect(notice?.message).toContain('需要你处理');
  });

  it('关掉这个开关后，只有完成项时通知整个不发', () => {
    expect(composeNotice(plan(), [result('done')], ONLY_DEADLINE, NOW)).toBeNull();
  });
});

describe('未能完成', () => {
  it('标题说未能完成，不说已完成', () => {
    const notice = composeNotice(
      plan(),
      [result('failed', '第4章 单元测验', '题库缺少答案')],
      BOTH,
      NOW,
    );
    expect(notice?.title).toBe('Study Pilot：1 项未能完成');
  });

  it('正文带上失败原因', () => {
    const notice = composeNotice(
      plan(),
      [result('failed', '第4章 单元测验', '题库缺少答案')],
      BOTH,
      NOW,
    );
    expect(notice?.message).toContain('题库缺少答案');
  });

  it('有成功也有失败时，标题报成功数', () => {
    const notice = composeNotice(
      plan(),
      [result('done'), result('failed', '第5章 单元测验', '取卷失败')],
      BOTH,
      NOW,
    );
    expect(notice?.title).toBe('Study Pilot：已自动完成 1 项');
    expect(notice?.message).toContain('未完成');
  });
});

describe('作业截止提醒', () => {
  it('临近截止的会提醒', () => {
    const notice = composeNotice(plan({ manual: [manual('homework-unsubmitted')] }), [], BOTH, NOW);
    expect(notice?.message).toContain('需要你处理');
    expect(notice?.message).toContain('剩余 1 天');
  });

  it('还很久才截止的不提醒——列出来只是噪声', () => {
    const far = manual('homework-unsubmitted', '两周后的作业', NOW + 14 * DAY);
    expect(composeNotice(plan({ manual: [far] }), [], BOTH, NOW)).toBeNull();
  });

  it('提前量按设置走', () => {
    const inThreeDays = manual('homework-unsubmitted', '三天后的作业', NOW + 3 * DAY);
    const wide: NoticeSettings = { deadlineEnabled: true, advanceDays: 5, completionEnabled: false };
    expect(composeNotice(plan({ manual: [inThreeDays] }), [], wide, NOW)).not.toBeNull();
    expect(composeNotice(plan({ manual: [inThreeDays] }), [], ONLY_DEADLINE, NOW)).toBeNull();
  });

  it('开关关掉后临近截止的也不提醒', () => {
    const notice = composeNotice(
      plan({ manual: [manual('homework-unsubmitted')] }),
      [],
      ONLY_COMPLETION,
      NOW,
    );
    expect(notice).toBeNull();
  });

  it('没有截止时间的不进截止提醒——无从判断临不临近', () => {
    const noDeadline = manual('homework-unsubmitted', '无截止的作业', null);
    expect(composeNotice(plan({ manual: [noDeadline] }), [], BOTH, NOW)).toBeNull();
  });

  it('标题不报总数，说明是哪一类', () => {
    const notice = composeNotice(plan({ manual: [manual('homework-unsubmitted')] }), [], BOTH, NOW);
    expect(notice?.title).toBe('Study Pilot：有作业临近截止');
  });
});

describe('已过截止', () => {
  /*
   * 四种过期都要走到「已过截止」那一类，一个都不能落进「待你处理」。
   */
  const reasons: Array<ManualItem['reason']> = [
    'homework-overdue',
    'quiz-overdue',
    'review-overdue',
    'self-overdue',
  ];

  for (const reason of reasons) {
    it(`${reason} 不被说成「需要你处理」`, () => {
      const notice = composeNotice(plan({ manual: [manual(reason)] }), [], BOTH, NOW);
      expect(notice?.message).not.toContain('需要你处理');
      expect(notice?.message).toContain('已过截止');
    });
  }

  it('只有过期项时标题说明是已过截止', () => {
    const notice = composeNotice(plan({ manual: [manual('quiz-overdue')] }), [], BOTH, NOW);
    expect(notice?.title).toBe('Study Pilot：有作业已过截止');
  });

  it('过期项跟着截止提醒走，关掉后不再报', () => {
    const notice = composeNotice(
      plan({ manual: [manual('quiz-overdue')] }),
      [],
      ONLY_COMPLETION,
      NOW,
    );
    expect(notice).toBeNull();
  });
});

describe('混合与上限', () => {
  it('需要处理的排在过期之前', () => {
    const notice = composeNotice(
      plan({
        manual: [manual('quiz-overdue', '过期的'), manual('homework-unsubmitted', '要做的')],
      }),
      [],
      BOTH,
      NOW,
    );
    const lines = notice?.message.split('\n') ?? [];
    expect(lines[0]).toContain('要做的');
    expect(lines[1]).toContain('过期的');
  });

  it('超过上限时折叠为计数，不无限拉长通知', () => {
    const many = Array.from({ length: 9 }, (_, i) =>
      manual('homework-unsubmitted', `作业 ${i}`, NOW + DAY),
    );
    const notice = composeNotice(plan({ manual: many }), [], BOTH, NOW);
    const lines = notice?.message.split('\n') ?? [];
    expect(lines).toHaveLength(6);
    expect(lines[5]).toContain('另有 4 项');
  });

  it('折叠计数把已完成与未完成也算进去', () => {
    const many = Array.from({ length: 4 }, (_, i) =>
      manual('homework-unsubmitted', `作业 ${i}`, NOW + DAY),
    );
    const results = [result('done'), result('failed', '另一项', '失败'), result('done', '又一项')];
    const notice = composeNotice(plan({ manual: many }), results, BOTH, NOW);
    // 3 条结果 + 2 条待办 = 5 条明细，4 + 3 - 5 = 2 项折叠
    expect(notice?.message).toContain('另有 2 项');
  });
});
