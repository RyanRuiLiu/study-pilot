/*
 * 做题页阶段判定测试。
 *
 * 阶段判定决定面板给出什么操作，判错会让用户在错误的页面上点错按钮：
 * 在开考前点填充会毫无反应，在已批改的页面上点提交则可能造成无意义的操作。
 * 因此各分支都要钉住，包括容易漏掉的中间状态。
 */

import { describe, expect, it } from 'vitest';
import {
  STAGE_DESCRIPTIONS,
  detectQuizStage,
  probeQuizStage,
  type QuizStageProbe,
} from '../src/features/quiz-stage';

function probe(overrides: Partial<QuizStageProbe>): QuizStageProbe {
  return {
    hasStartButton: false,
    hasSubmitButton: false,
    questionCount: 0,
    gradedQuestionCount: 0,
    ...overrides,
  };
}

describe('detectQuizStage', () => {
  it('存在开始按钮时判定为开考前', () => {
    expect(detectQuizStage(probe({ hasStartButton: true }))).toBe('before-start');
  });

  it('存在提交按钮时判定为作答中', () => {
    expect(
      detectQuizStage(probe({ hasSubmitButton: true, questionCount: 10 })),
    ).toBe('answering');
  });

  it('有题目且全部带批改标记时判定为已批改', () => {
    expect(detectQuizStage(probe({ questionCount: 3, gradedQuestionCount: 3 }))).toBe('graded');
  });

  it('只有部分题目带批改标记时不判定为已批改', () => {
    expect(detectQuizStage(probe({ questionCount: 3, gradedQuestionCount: 2 }))).toBe('loading');
  });

  it('没有题目的空页面判定为加载中', () => {
    expect(detectQuizStage(probe({ questionCount: 0, gradedQuestionCount: 0 }))).toBe('loading');
  });

  it('开始按钮优先于其它判据', () => {
    expect(
      detectQuizStage(
        probe({ hasStartButton: true, hasSubmitButton: true, questionCount: 5 }),
      ),
    ).toBe('before-start');
  });

  it('提交按钮优先于批改标记', () => {
    expect(
      detectQuizStage(probe({ hasSubmitButton: true, questionCount: 2, gradedQuestionCount: 2 })),
    ).toBe('answering');
  });

  it('每个阶段都有非空说明', () => {
    const stages = ['before-start', 'answering', 'graded', 'loading'] as const;
    for (const stage of stages) {
      expect(STAGE_DESCRIPTIONS[stage].trim().length).toBeGreaterThan(0);
    }
  });
});

/** 构造一个最小的 DOM 替身，只实现探测所需的方法。 */
function fakeElement(visible: boolean): { getClientRects: () => ArrayLike<unknown> } {
  return { getClientRects: () => (visible ? [{}] : []) };
}

function fakeRoot(options: {
  start?: boolean;
  startVisible?: boolean;
  submit?: boolean;
  submitVisible?: boolean;
  graded?: number;
  active?: number;
}): ParentNode {
  const graded = Array.from({ length: options.graded ?? 0 }, () => ({
    classList: { contains: (name: string) => name === 'analysisMode' },
  }));
  const active = Array.from({ length: options.active ?? 0 }, () => ({
    classList: { contains: () => false },
  }));
  const questions = [...graded, ...active];

  return {
    querySelector: (selector: string) => {
      if (selector === '.j-startBtn') {
        return options.start ? fakeElement(options.startVisible ?? true) : null;
      }
      if (selector === '.j-submitBtn') {
        return options.submit ? fakeElement(options.submitVisible ?? true) : null;
      }
      return null;
    },
    querySelectorAll: (selector: string) =>
      selector === '.u-questionItem' ? questions : [],
  } as unknown as ParentNode;
}

describe('probeQuizStage', () => {
  it('从文档替身中读出开始按钮', () => {
    expect(probeQuizStage(fakeRoot({ start: true }))).toEqual({
      hasStartButton: true,
      hasSubmitButton: false,
      questionCount: 0,
      gradedQuestionCount: 0,
    });
  });

  it('统计题目数量与批改数量', () => {
    expect(probeQuizStage(fakeRoot({ submit: true, graded: 2, active: 3 }))).toEqual({
      hasStartButton: false,
      hasSubmitButton: true,
      questionCount: 5,
      gradedQuestionCount: 2,
    });
  });

  it('隐藏的开始按钮不计入', () => {
    // 进入作答状态后开始按钮仍留在文档中，只是被隐藏，
    // 若按存在性判断会把页面误判为开考前并禁用全部操作。
    const probe = probeQuizStage(fakeRoot({ start: true, startVisible: false, submit: true }));
    expect(probe.hasStartButton).toBe(false);
    expect(detectQuizStage(probe)).toBe('answering');
  });

  it('隐藏的提交按钮不计入', () => {
    const probe = probeQuizStage(fakeRoot({ start: true, submit: true, submitVisible: false }));
    expect(probe.hasSubmitButton).toBe(false);
    expect(detectQuizStage(probe)).toBe('before-start');
  });

  it('探测结果与判定函数可以直接串起来', () => {
    expect(detectQuizStage(probeQuizStage(fakeRoot({ start: true })))).toBe('before-start');
    expect(detectQuizStage(probeQuizStage(fakeRoot({ submit: true, active: 4 })))).toBe(
      'answering',
    );
    expect(detectQuizStage(probeQuizStage(fakeRoot({ graded: 4 })))).toBe('graded');
    expect(detectQuizStage(probeQuizStage(fakeRoot({})))).toBe('loading');
  });
});
