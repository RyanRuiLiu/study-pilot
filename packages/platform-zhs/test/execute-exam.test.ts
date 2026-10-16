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
import { ZhsApiError, type ZhsClient } from '../src/client.ts';

const TARGET: ExamTarget = {
  recruitId: 900004,
  courseId: 9000000002,
  schoolId: 9001,
  listId: 'DEMOa001',
  examKey: 'DEMOb002',
  examIdNum: 90000007,
  stuExamIdNum: 9000000036,
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
              { id: 900000006, content: '对' },
              { id: 900000007, content: '错' },
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
  correctOptionIds: ['900000006', '561505200'],
  entries: [],
};

/** 只覆盖第一题。 */
const HALF_KEY: AnswerKey = { version: 1, correctOptionIds: ['900000006'], entries: [] };

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
    userId: 900000009,
    key: FULL_KEY,
    questionIds: [111, 222],
    totalScore: 4,
    popupLessonId: 1000058306,
    recruitAndCourseId: 'hex-secret',
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
    expect(outcome.message).toContain('平台确认满分');
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
    expect(outcome.message).toContain('平台确认未通过');
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
    expect(outcome.message).toContain('清单未给总分');
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
      action: { platformId: 'zhihuishu', label: '打开登录页' },
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
    expect(outcome.message).toContain('未过平台确认');
    expect(names).not.toContain('examQuestionDoneState');
  });
});

describe('业务码（rt.statu）不被吞掉', () => {
  it('作答被要求图形验证码（statu=-10）→ 整轮停止，不继续作答、不交卷', async () => {
    const { client, names } = recordingClient({
      examDoHomework: { rt: PAPER },
      examSaveAnswer: { rt: { msg: '', statu: '-10' } },
    });
    await expect(executeExam(client, input(), NEVER_STOPPED)).rejects.toMatchObject({
      name: 'ZhsRoundHalt',
    });
    expect(names.filter((n) => n === 'examSaveAnswer')).toHaveLength(1);
    expect(names).not.toContain('examSubmit');
  });

  it('作答被拒（statu 缺失/未知）→ 如实失败，不当成功', async () => {
    const { client, names } = recordingClient({
      examDoHomework: { rt: PAPER },
      examSaveAnswer: { rt: { msg: '出错了' } },
    });
    const outcome = await executeExam(client, input(), NEVER_STOPPED);
    expect(outcome.status).toBe('failed');
    expect(outcome.message).toContain('作答失败');
    expect(names).not.toContain('examSubmit');
  });

  it('交卷 statu=1 也是成功（平台两个成功值：0 给分、1 转问卷）', async () => {
    const { client } = recordingClient({
      examDoHomework: { rt: PAPER },
      examSaveAnswer: { rt: { statu: '1' } },
      examQuestionDoneState: ORACLE_PASS,
      examSubmit: { rt: { msg: '提交成功', statu: '1' } },
    });
    const outcome = await executeExam(client, input(), NEVER_STOPPED);
    expect(outcome.status).toBe('done');
  });

  it('作答遇易盾（code=-12）→ 整轮停止，不当作普通失败', async () => {
    // 真 client 会把 code=-12 映射成 ZhsApiError 抛出，这里直接抛，跳过替身的模拟
    const names: string[] = [];
    const client: ZhsClient = {
      call: async (name) => {
        names.push(name);
        if (name === 'examDoHomework') return { rt: PAPER };
        throw new ZhsApiError(-12, '需要弹出滑块验证');
      },
    };
    await expect(executeExam(client, input(), NEVER_STOPPED)).rejects.toMatchObject({ name: 'ZhsRoundHalt' });
    expect(names).not.toContain('examSubmit');
  });

  it('作答遇挂起的另一个信封码（code=-1）→ 同一条处置，并把「打开验证页」带上', async () => {
    /*
     * -1 是同一道门在保存通道上的回码（`.probe/zhs-gate-log.txt` 里 isSlide=true
     * 期间每条保存都是 -1）。它此前没被映射，界面上只剩一句「智慧树接口返回
     * code=-1」——用户看不出平台要的是「人来过一次验证」。这里钉住处置与去处。
     */
    const client: ZhsClient = {
      call: async (name) => {
        if (name === 'examDoHomework') return { rt: PAPER };
        throw new ZhsApiError(-1, '');
      },
    };
    await expect(executeExam(client, input(), NEVER_STOPPED)).rejects.toMatchObject({
      name: 'ZhsRoundHalt',
      message: '需完成人机验证',
      action: { platformId: 'zhihuishu', label: '打开验证页' },
    });
  });

  it('交卷的 statu=-1（已提交）不是门：信封码才有门的含义', async () => {
    // 同一个数字在两个通道里意思相反，处置不许混（见 ZhsStatuError 的说明）
    const { client } = recordingClient({
      examDoHomework: { rt: PAPER },
      examSaveAnswer: { rt: { statu: '1' } },
      examQuestionDoneState: ORACLE_PASS,
      examSubmit: { rt: { msg: '作业已提交，不可重复提交', statu: '-1' } },
    });
    const outcome = await executeExam(client, input(), NEVER_STOPPED);
    expect(outcome.status).toBe('failed');
    expect(outcome.message).toContain('作业已提交');
  });

  it('交卷被拒不重复提交（statu=-1）→ 如实失败并带平台原话', async () => {
    const { client } = recordingClient({
      examDoHomework: { rt: PAPER },
      examSaveAnswer: { rt: { statu: '1' } },
      examQuestionDoneState: ORACLE_PASS,
      examSubmit: { rt: { msg: '作业已提交', statu: '-1' } },
    });
    const outcome = await executeExam(client, input(), NEVER_STOPPED);
    expect(outcome.status).toBe('failed');
    expect(outcome.message).toContain('不可重复提交');
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
                { id: 111, eid: null, name: '第一题', questionType: { id: 1 }, questionOptions: [{ id: 900000006, content: '对' }] },
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
          { testQuestion: { name: '第一题', questionOptions: [{ id: 900000006, content: '对', result: '1' }] } },
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
    expect(outcome.message).toContain('回顾未取到题号');
    expect(names).not.toContain('examApplyRedo');
  });

  it('申请重做未成功 → 如实失败，不再开第二枪', async () => {
    const { client, names } = recordingClient({ ...PROBE_RESPONSES, examApplyRedo: { rt: 0 } });
    const outcome = await executeExam(client, input({ key: null, questionIds: [] }), NEVER_STOPPED);
    expect(outcome.status).toBe('failed');
    expect(outcome.message).toContain('申请重做失败');
    expect(names.filter((n) => n === 'examDoHomework')).toHaveLength(1);
  });
});
