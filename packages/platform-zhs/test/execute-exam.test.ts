/*
 * 答卷会话的机械核对。
 *
 * 假 client 按接口名分派响应并记录调用序列——这一层要证的正是**顺序与闸门**：
 * 什么时候开口、什么时候不许交、什么时候根本不碰平台。
 */

import { describe, expect, it } from 'vitest';
import { NEVER_STOPPED, type RunControl } from '@study-pilot/application';
import { executeExam, type ExamRunInput, type ExamTarget } from '../src/policy/execute-exam.ts';
import type { AnswerKey } from '../src/exam-answers.ts';
import type { ZhsClient } from '../src/client.ts';

const TARGET: ExamTarget = {
  recruitId: 473310,
  courseId: 1000006163,
  schoolId: 6729,
  listId: 'wDOALWxA',
  examKey: 'y79mmz7e',
  examIdNum: 67291233,
  stuExamIdNum: 3214675441,
};

/** 卷面两题，每题 2 分（合计 4）——与神谕的判据配套。 */
const PAPER = {
  examBase: {
    workExamParts: [
      {
        questionDtos: [
          {
            eid: 'eid-1',
            name: '第一题',
            questionType: { id: 1 },
            questionOptions: [
              { id: 561505107, content: '对' },
              { id: 561505108, content: '错' },
            ],
          },
          {
            eid: 'eid-2',
            name: '第二题',
            questionType: { id: 1 },
            questionOptions: [
              { id: 561505200, content: '对' },
              { id: 561505201, content: '错' },
            ],
          },
        ],
      },
    ],
  },
};

/** 正解 = 每题的第一个选项。 */
const FULL_KEY: AnswerKey = {
  version: 1,
  correctOptionIds: ['561505107', '561505200'],
  entries: [],
};

/** 只覆盖第一题。 */
const HALF_KEY: AnswerKey = { version: 1, correctOptionIds: ['561505107'], entries: [] };

const ORACLE_PASS = { status: '200', rt: { '111': { score: '2' }, '222': { score: '2' } } };
const ORACLE_ZERO = { status: '200', rt: { '111': { score: '2' }, '222': { score: '0' } } };

function recordingClient(responses: Record<string, unknown>): {
  client: ZhsClient;
  names: string[];
  payloads: unknown[];
} {
  const names: string[] = [];
  const payloads: unknown[] = [];
  const client: ZhsClient = {
    call: async (name, payload) => {
      names.push(name);
      payloads.push(payload);
      if (!(name in responses)) throw new Error(`假 client 没有登记 ${name}`);
      return responses[name];
    },
  };
  return { client, names, payloads };
}

function input(overrides: Partial<ExamRunInput> = {}): ExamRunInput {
  return {
    target: TARGET,
    userId: 884054321,
    key: FULL_KEY,
    questionIds: [111, 222],
    totalScore: 4,
    popupLessonId: 1000058306,
    ...overrides,
  };
}

describe('有键路径', () => {
  it('开卷 → 逐题作答 → 神谕 → 交卷（顺序固定）', async () => {
    const { client, names } = recordingClient({
      examDoHomework: { rt: PAPER },
      examSaveAnswer: { rt: { statu: '1' } },
      examQuestionDoneState: ORACLE_PASS,
      examSubmit: { rt: { statu: '0', score: '4' } },
    });
    const outcome = await executeExam(client, input(), NEVER_STOPPED);
    expect(outcome.status).toBe('done');
    expect(outcome.message).toContain('神谕确认满分');
    expect(names).toEqual([
      'examDoHomework',
      'examSaveAnswer',
      'examSaveAnswer',
      'examQuestionDoneState',
      'examSubmit',
    ]);
  });

  it('神谕不通过 → 不交卷，如实说明原因', async () => {
    const { client, names } = recordingClient({
      examDoHomework: { rt: PAPER },
      examSaveAnswer: { rt: { statu: '1' } },
      examQuestionDoneState: ORACLE_ZERO,
    });
    const outcome = await executeExam(client, input(), NEVER_STOPPED);
    expect(outcome.status).toBe('failed');
    expect(outcome.message).toContain('神谕未通过');
    expect(outcome.message).toContain('0 分');
    expect(names).not.toContain('examSubmit');
  });

  it('清单没给总分 → 判据失效，不交卷', async () => {
    const { client, names } = recordingClient({
      examDoHomework: { rt: PAPER },
      examSaveAnswer: { rt: { statu: '1' } },
      examQuestionDoneState: ORACLE_PASS,
    });
    const outcome = await executeExam(client, input({ totalScore: null }), NEVER_STOPPED);
    expect(outcome.status).toBe('failed');
    expect(outcome.message).toContain('判据失效');
    expect(names).not.toContain('examSubmit');
  });

  it('键覆盖不全 → 只留下空草稿，不作答、不交卷', async () => {
    // 覆盖率要对着卷面算，所以开卷这一步躲不掉；代价是一份未作答的草稿（不计分）
    const { client, names } = recordingClient({ examDoHomework: { rt: PAPER } });
    const outcome = await executeExam(client, input({ key: HALF_KEY }), NEVER_STOPPED);
    expect(outcome.status).toBe('failed');
    expect(outcome.message).toContain('50%');
    expect(names).toEqual(['examDoHomework']);
  });

  it('停止信号落在交卷前 → 不交卷', async () => {
    const { client, names } = recordingClient({
      examDoHomework: { rt: PAPER },
      examSaveAnswer: { rt: { statu: '1' } },
      examQuestionDoneState: ORACLE_PASS,
    });
    // 两个安全点都放过（开卷后、作答后），第三次问（交卷前）才答"已停止"
    let asked = 0;
    const control: RunControl = { stopped: () => ++asked > 2 };
    const outcome = await executeExam(client, input(), control);
    expect(outcome.status).toBe('skipped');
    expect(outcome.message).toContain('未交卷');
    expect(names).not.toContain('examSubmit');
  });

  it('会话失效（非 JSON 响应）→ 停轮 + 打开登录的动作位', async () => {
    const client: ZhsClient = {
      call: async () => {
        throw new SyntaxError('Unexpected token < in JSON at position 0');
      },
    };
    await expect(executeExam(client, input(), NEVER_STOPPED)).rejects.toMatchObject({
      name: 'ZhsRoundHalt',
      action: { platformId: 'zhihuishu', label: '打开智慧树登录' },
    });
  });

  it('没有 userId / 没有题号 → 照常交卷，但如实记「未过神谕」', async () => {
    const { client, names } = recordingClient({
      examDoHomework: { rt: PAPER },
      examSaveAnswer: { rt: { statu: '1' } },
      examSubmit: { rt: { statu: '0' } },
    });
    const outcome = await executeExam(client, input({ userId: null }), NEVER_STOPPED);
    expect(outcome.status).toBe('done');
    expect(outcome.message).toContain('未过神谕');
    expect(names).not.toContain('examQuestionDoneState');
  });
});

describe('缺键路径（探路重做）', () => {
  const PROBE_RESPONSES = {
    examRedoNum: { rt: 0 },
    examIsObject: { rt: 1 },
    examDoHomework: { rt: PAPER },
    examSaveAnswer: { rt: { statu: '1' } },
    examSubmit: { rt: { statu: '0' } },
    examLookHomework: {
      rt: {
        examBase: {
          workExamParts: [
            {
              questionDtos: [
                { id: 111, eid: null, name: '第一题', questionType: { id: 1 }, questionOptions: [{ id: 561505107, content: '对' }] },
                { id: 222, eid: null, name: '第二题', questionType: { id: 1 }, questionOptions: [{ id: 561505200, content: '对' }] },
              ],
            },
          ],
        },
      },
    },
    // 通道按题号回正解——两题都要回，否则建出来的键覆盖不全（这本身就是被测行为）
    popupExam: {
      data: {
        lessonTestQuestionUseInterfaceDtos: [
          { testQuestion: { name: '第一题', questionOptions: [{ id: 561505107, content: '对', result: '1' }] } },
          { testQuestion: { name: '第二题', questionOptions: [{ id: 561505200, content: '对', result: '1' }] } },
        ],
      },
    },
    examApplyRedo: { rt: 1 },
    examQuestionDoneState: ORACLE_PASS,
  };

  it('剩余不足 2 次 → 完全不动手，只提醒', async () => {
    const { client, names } = recordingClient({ examRedoNum: { rt: 2 }, examIsObject: { rt: 1 } });
    const outcome = await executeExam(client, input({ key: null, questionIds: [] }), NEVER_STOPPED);
    expect(outcome.status).toBe('skipped');
    expect(outcome.message).toContain('1 次');
    expect(names).not.toContain('examDoHomework');
  });

  it('非客观题 → 不申请重做，只提醒', async () => {
    const { client, names } = recordingClient({ examRedoNum: { rt: 0 }, examIsObject: { rt: 0 } });
    const outcome = await executeExam(client, input({ key: null, questionIds: [] }), NEVER_STOPPED);
    expect(outcome.status).toBe('skipped');
    expect(outcome.message).toContain('非客观题');
    expect(names).not.toContain('examApplyRedo');
  });

  it('剩余 ≥2 → 探路一枪 → 收割建键 → 申请重做 → 重开卷定分', async () => {
    const { client, names } = recordingClient(PROBE_RESPONSES);
    const outcome = await executeExam(client, input({ key: null, questionIds: [] }), NEVER_STOPPED);
    expect(outcome.status).toBe('done');
    expect(outcome.message).toContain('探路后重做定分');
    // 两次开卷：探路一枪 + 重做一枪
    expect(names.filter((n) => n === 'examDoHomework')).toHaveLength(2);
    // 两次交卷：探路那次 + 定分那次
    expect(names.filter((n) => n === 'examSubmit')).toHaveLength(2);
    // 收割链路完整：回顾 → 弹题通道 → 申请重做
    expect(names).toEqual(
      expect.arrayContaining(['examLookHomework', 'popupExam', 'examApplyRedo']),
    );
    // 重做后的定分那一枪过了神谕（题号是用探路收割来的，不是空的）
    expect(names).toContain('examQuestionDoneState');
  });

  it('探路后拿不到题号 → 不申请重做（不白花一次机会）', async () => {
    const { client, names } = recordingClient({
      ...PROBE_RESPONSES,
      examLookHomework: { rt: { examBase: { workExamParts: [] } } },
    });
    const outcome = await executeExam(client, input({ key: null, questionIds: [] }), NEVER_STOPPED);
    expect(outcome.status).toBe('failed');
    expect(outcome.message).toContain('没拿到题号');
    expect(names).not.toContain('examApplyRedo');
  });

  it('申请重做未成功 → 如实失败，不再开第二枪', async () => {
    const { client, names } = recordingClient({ ...PROBE_RESPONSES, examApplyRedo: { rt: 0 } });
    const outcome = await executeExam(client, input({ key: null, questionIds: [] }), NEVER_STOPPED);
    expect(outcome.status).toBe('failed');
    expect(outcome.message).toContain('申请重做未成功');
    expect(names.filter((n) => n === 'examDoHomework')).toHaveLength(1);
  });
});
