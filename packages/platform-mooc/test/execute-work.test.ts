/*
 * 自动完成测验、自评、互评的执行面（`execute/work.ts`）。
 *
 * 这三条路会**真的向平台提交答案与评分**，所以这里钉的不是「函数被调用了」，
 * 而是每条路的结局与说法：
 *
 *   - 题库覆盖不全时一道都不提交（部分作答只会拿到低分，不如留给用户）
 *   - 会在服务端留下痕迹的调用（开卷、占配额）排在所有无副作用读取之后
 *   - 只有提交成功才报 done，detail 里的数字与实际提交的内容一致
 *   - 提交失败如实报 failed，不把失败说成「已完成」
 *   - 互评按服务端给的剩余份数评够即止，不多评也不中途放弃
 *   - 自评按满分给，评语原样传下去
 *   - 没有客观题 / 没有可评题目 / 不在互评期：skipped，不是 failed
 *
 * 平台接口按模块替身，但纯函数
 * （`buildAnswers`、`buildAnswerIndex`、`buildEvaluationItems`、
 * `currentEvaluatePhase`）走真实实现：这三条路的判据就建在它们上面，
 * 换掉它们等于把要验的东西一起换掉，测试就只剩下「我调用了你」。
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ok } from '@study-pilot/core';
import type { TransportError } from '@study-pilot/transport';
import type {
  EvaluationProgress,
  HomeworkInfo,
  HomeworkPaper,
  MoocClient,
  QuizPaper,
  SubmissionProgress,
} from '../src/index.ts';
import type { SnapshotCourse, SnapshotWork } from '../src/policy/read/types.ts';
import type { WorkAutoAction } from '../src/policy/plan/types.ts';

/* 只替身「会向平台写」的那几个调用，纯函数（buildAnswers / buildAnswerIndex /
   currentEvaluatePhase 等）走真实实现：判据就建在它们上面，换掉等于把要验的东西一起换掉。
   替身按被测代码 import 的模块分：测验在 ../src/quiz.ts，作业与互评在 ../src/review.ts。 */
vi.mock('../src/quiz.ts', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return { ...actual, getQuizPaper: vi.fn(), submitQuiz: vi.fn() };
});

vi.mock('../src/review.ts', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  return {
    ...actual,
    getHomeworkInfo: vi.fn(),
    getEvaluationDetail: vi.fn(),
    getHomeworkPaper: vi.fn(),
    nextSubmission: vi.fn(),
    submitEvaluation: vi.fn(),
  };
});

import {
  getEvaluationDetail,
  getHomeworkInfo,
  getHomeworkPaper,
  nextSubmission,
  submitEvaluation,
} from '../src/review.ts';
import { getQuizPaper, submitQuiz } from '../src/quiz.ts';
import { runQuiz, runReview, runSelf } from '../src/policy/execute/work.ts';

const DAY = 24 * 60 * 60 * 1000;
/*
 * 阶段判定（currentEvaluatePhase）走的是真实实现，它拿本机时间与截止时间比。
 * 因此这里用「现在」而不是写死的日期：写死的日期会随机器时间流过而翻面，
 * 测试第二天就变成验另一件事。
 */
const NOW = Date.now();
const TID = 1001;
const TERM_ID = 7;
const SELF_EVALUATE_ID = 501;
const SELF_ANSWERFORM_ID = 601;

/** 平台接口的失败态。这三条路只用到 message，kind 取 http。 */
function fail(message: string): { ok: false; error: TransportError } {
  return { ok: false, error: { kind: 'http', message } };
}

/**
 * 平台接口的替身不碰凭证。只有题库（getQuizBank）会经 client.rpc 真发请求——
 * 它是 buildAnswersWithBank 内部直接调用的模块函数，替身模块换不掉，只能从这里给。
 * 默认空题库：「卷面没答案、题库也没有 → 不交」是下面几条失败用例的前提。
 */
let bank: unknown[] = [];
const client = { rpc: { call: async () => ok(bank) } } as unknown as MoocClient;

function snapshotWork(overrides: Partial<SnapshotWork> = {}): SnapshotWork {
  return {
    tid: TID,
    name: '第一单元测验',
    chapterName: '第1章',
    examId: null,
    type: 'quiz',
    submitted: false,
    deadline: NOW - DAY,
    evaluateStart: NOW - DAY,
    evaluateEnd: NOW + 5 * DAY,
    evaluateScoreRelease: null,
    score: null,
    totalScore: 100,
    reviewable: true,
    evaluateDone: 0,
    evaluateTotal: 3,
    selfDone: false,
    ...overrides,
  };
}

function snapshotCourse(): SnapshotCourse {
  return {
    termId: TERM_ID,
    courseId: 100,
    schoolShortName: 'UNI',
    mode: 0,
    courseName: '测试课程',
    works: [],
    units: [],
  };
}

function workAction(
  kind: WorkAutoAction['kind'],
  overrides: Partial<SnapshotWork> = {},
): WorkAutoAction {
  return { kind, course: snapshotCourse(), work: snapshotWork(overrides), remaining: 0 };
}

// ---------- 测验的夹具 ----------

/** 试卷上的一道客观题：选项带正确标记（答案就在卷面上，2026-10-17 换接口）。 */
function objectiveQuestion(
  id: number,
  options: Array<[number, boolean]>,
): NonNullable<QuizPaper['objectiveQList']> {
  return [{ id, type: 1, optionDtos: options.map(([optionId, answer]) => ({ id: optionId, answer })) }];
}

function quizPaper(overrides: Partial<QuizPaper> = {}): QuizPaper {
  return { tid: TID, aid: 55, objectiveQList: [], ...overrides };
}

// ---------- 作业（自评 / 互评）的夹具 ----------

/** 截止已过、成绩未发布 → 阶段 2（互评期）。 */
function homeworkInfo(overrides: Partial<HomeworkInfo> = {}): HomeworkInfo {
  return { tid: TID, aid: 77, deadline: NOW - DAY, evaluateScoreReleaseTime: null, ...overrides };
}

function progress(overrides: Partial<EvaluationProgress> = {}): EvaluationProgress {
  return {
    testId: TID,
    required: 0,
    completed: 0,
    remaining: 0,
    started: null,
    enoughAnswer: true,
    self: null,
    ...overrides,
  };
}

/** 一份带两个评分点的作业卷，合计满分 14。 */
function homeworkPaper(overrides: Partial<HomeworkPaper> = {}): HomeworkPaper {
  return {
    tid: TID,
    subjectiveQList: [
      {
        id: 21,
        score: 14,
        judgeDtos: [
          { id: 9001, maxScore: 10 },
          { id: 9002, maxScore: 4 },
        ],
      },
    ],
    ...overrides,
  };
}

function nextOf(
  evaluateId: number | null,
  overrides: Partial<SubmissionProgress> = {},
): SubmissionProgress {
  return {
    next:
      evaluateId === null
        ? null
        : { evaluateId, aid: 500 + evaluateId, status: 1, testId: TID },
    total: 5,
    max: 30,
    completed: 0,
    ...overrides,
  };
}

beforeEach(() => {
  vi.resetAllMocks();
  bank = [];
});

// ---------- 测验 ----------

describe('runQuiz：自动完成一份单元测验', () => {
  /*
   * 取卷（aid = 0）会覆盖该课已过期的旧答卷，这是平台自己的行为
   * （页面点「开始测验」就是它）；答案随卷面一起回来，见 quiz.ts。
   */
  it('取卷失败：如实报失败，不提交', async () => {
    vi.mocked(getQuizPaper).mockResolvedValue(fail('HTTP 403'));

    const result = await runQuiz(client, workAction('quiz'));

    expect(result).toEqual({
      tid: TID,
      name: '第一单元测验',
      kind: 'quiz',
      status: 'failed',
      detail: '取卷失败：HTTP 403',
    });
    expect(submitQuiz).not.toHaveBeenCalled();
  });

  it('取卷用 aid = 0：这一步同时就是页面上的「开始测验」', async () => {
    vi.mocked(getQuizPaper).mockResolvedValue(fail('停在这里'));

    await runQuiz(client, workAction('quiz'));

    expect(getQuizPaper).toHaveBeenCalledWith(client, TID, 0);
  });

  it('有一道题取不到答案：一道都不提交，并说明原因', async () => {
    vi.mocked(getQuizPaper).mockResolvedValue(
      ok(
        quizPaper({
          objectiveQList: [
            ...objectiveQuestion(11, [[101, true]]),
            ...objectiveQuestion(12, [[103, false], [104, false]]),
          ],
        }),
      ),
    );

    const result = await runQuiz(client, workAction('quiz'));

    expect(result.status).toBe('failed');
    expect(result.detail).toBe(
      '1 道题取不到答案（卷面既无正确选项标记、也无标准答案），已跳过以免得到低分',
    );
    // 关键：部分作答会拿到低于预期的分数，宁可一份都不交
    expect(submitQuiz).not.toHaveBeenCalled();
  });

  it('卷面没答案（未提交的单元测验）：题库按选项 id 补上后照常提交', async () => {
    vi.mocked(submitQuiz).mockResolvedValue(ok(undefined));
    const paper = quizPaper({
      objectiveQList: [...objectiveQuestion(11, [[101, null], [102, null]])],
    });
    vi.mocked(getQuizPaper).mockResolvedValue(ok(paper));
    bank = [{ id: 9001, type: 1, optionDtos: [{ id: 101, answer: false }, { id: 102, answer: true }] }];

    const result = await runQuiz(client, workAction('quiz'));

    expect(result.status).toBe('done');
    expect(vi.mocked(submitQuiz).mock.calls[0]?.[1]?.answers).toEqual([
      { qid: 11, type: 1, optIds: [102], time: expect.any(Number) },
    ]);
  });

  it('含主观题：failed，不自动交（只交客观部分=残缺答卷）', async () => {
    vi.mocked(getQuizPaper).mockResolvedValue(
      ok(
        quizPaper({
          objectiveQList: objectiveQuestion(11, [[101, true]]),
          subjectiveQList: [{ id: 21, type: 10, plainTextTitle: '试述…' }],
        }),
      ),
    );

    const result = await runQuiz(client, workAction('quiz'));

    expect(result.status).toBe('failed');
    expect(result.detail).toBe('这份测验含 1 道主观题，需人工作答，不自动提交');
    expect(submitQuiz).not.toHaveBeenCalled();
  });

  it('答卷没有客观题：skipped，不提交', async () => {
    vi.mocked(getQuizPaper).mockResolvedValue(ok(quizPaper({ objectiveQList: [] })));

    const result = await runQuiz(client, workAction('quiz'));

    expect(result).toEqual({
      tid: TID,
      name: '第一单元测验',
      kind: 'quiz',
      status: 'skipped',
      detail: '这份答卷没有客观题',
    });
    expect(submitQuiz).not.toHaveBeenCalled();
  });

  it('正常路径：答案按卷面标记填好再提交，数字与实际提交一致', async () => {
    vi.mocked(submitQuiz).mockResolvedValue(ok(undefined));

    const paper = quizPaper({
      objectiveQList: [
        ...objectiveQuestion(11, [[101, true], [102, false]]),
        ...objectiveQuestion(12, [[103, true]]),
      ],
    });
    vi.mocked(getQuizPaper).mockResolvedValue(ok(paper));

    const result = await runQuiz(client, workAction('quiz'));

    expect(result).toEqual({
      tid: TID,
      name: '第一单元测验',
      kind: 'quiz',
      status: 'done',
      detail: '已提交 2 道客观题',
    });
    // 提交的是取卷拿到的那一份，答案已经就地填好
    expect(submitQuiz).toHaveBeenCalledTimes(1);
    const submitted = vi.mocked(submitQuiz).mock.calls[0]?.[1];
    expect(submitted).toBe(paper);
    expect(submitted?.answers).toEqual([
      { qid: 11, type: 1, optIds: [101], time: expect.any(Number) },
      { qid: 12, type: 1, optIds: [103], time: expect.any(Number) },
    ]);
  });

  it('提交失败：如实报失败，不谎报完成', async () => {
    vi.mocked(getQuizPaper).mockResolvedValue(
      ok(quizPaper({ objectiveQList: objectiveQuestion(11, [[101, true]]) })),
    );
    vi.mocked(submitQuiz).mockResolvedValue(fail('服务端 500'));

    const result = await runQuiz(client, workAction('quiz'));

    expect(result.status).toBe('failed');
    expect(result.detail).toBe('提交失败：服务端 500');
  });
});

// ---------- 自评 ----------

describe('runSelf：自动完成一份作业的自评', () => {
  const args = [client, workAction('self'), 1, '自评评语'] as const;

  it('读取作业信息失败：如实报失败', async () => {
    vi.mocked(getHomeworkInfo).mockResolvedValue(fail('作业接口 502'));

    const result = await runSelf(...args);

    expect(result.kind).toBe('self');
    expect(result.status).toBe('failed');
    expect(result.detail).toBe('读取作业信息失败：作业接口 502');
    expect(getEvaluationDetail).not.toHaveBeenCalled();
  });

  it('不在互评期：skipped，不读评测进度', async () => {
    vi.mocked(getHomeworkInfo).mockResolvedValue(
      ok(homeworkInfo({ deadline: NOW + DAY })),
    );

    const result = await runSelf(...args);

    expect(result.status).toBe('skipped');
    expect(result.detail).toBe('已不在互评期内');
    expect(getEvaluationDetail).not.toHaveBeenCalled();
  });

  it('读取评测进度失败：如实报失败', async () => {
    vi.mocked(getHomeworkInfo).mockResolvedValue(ok(homeworkInfo()));
    vi.mocked(getEvaluationDetail).mockResolvedValue(fail('DWR 解析失败'));

    const result = await runSelf(...args);

    expect(result.status).toBe('failed');
    expect(result.detail).toBe('读取评测进度失败：DWR 解析失败');
  });

  it('这份作业没有自评环节：skipped', async () => {
    vi.mocked(getHomeworkInfo).mockResolvedValue(ok(homeworkInfo()));
    vi.mocked(getEvaluationDetail).mockResolvedValue(ok(progress({ self: null })));

    const result = await runSelf(...args);

    expect(result).toEqual({
      tid: TID,
      name: '第一单元测验',
      kind: 'self',
      status: 'skipped',
      detail: '这份作业没有自评环节',
    });
  });

  it('自评已完成：skipped，不再取卷', async () => {
    vi.mocked(getHomeworkInfo).mockResolvedValue(ok(homeworkInfo()));
    vi.mocked(getEvaluationDetail).mockResolvedValue(
      ok(
        progress({
          self: { evaluateId: SELF_EVALUATE_ID, answerformId: SELF_ANSWERFORM_ID, done: true },
        }),
      ),
    );

    const result = await runSelf(...args);

    expect(result.status).toBe('skipped');
    expect(result.detail).toBe('自评已完成');
    expect(getHomeworkPaper).not.toHaveBeenCalled();
  });

  it('取自评答卷失败：如实报失败', async () => {
    vi.mocked(getHomeworkInfo).mockResolvedValue(ok(homeworkInfo()));
    vi.mocked(getEvaluationDetail).mockResolvedValue(
      ok(
        progress({
          self: { evaluateId: SELF_EVALUATE_ID, answerformId: SELF_ANSWERFORM_ID, done: false },
        }),
      ),
    );
    vi.mocked(getHomeworkPaper).mockResolvedValue(fail('答卷接口 500'));

    const result = await runSelf(...args);

    expect(result.status).toBe('failed');
    expect(result.detail).toBe('取自评答卷失败：答卷接口 500');
    expect(submitEvaluation).not.toHaveBeenCalled();
  });

  it('没有可评题目：skipped（两份题目列表都空）', async () => {
    vi.mocked(getHomeworkInfo).mockResolvedValue(ok(homeworkInfo()));
    vi.mocked(getEvaluationDetail).mockResolvedValue(
      ok(
        progress({
          self: { evaluateId: SELF_EVALUATE_ID, answerformId: SELF_ANSWERFORM_ID, done: false },
        }),
      ),
    );
    // 两份列表都是 null：这样才走到 `?? []` 那一步（另一条用例专测「只有客观题」）
    vi.mocked(getHomeworkPaper).mockResolvedValue(
      ok(homeworkPaper({ subjectiveQList: null, objectiveQList: null })),
    );
    vi.mocked(submitEvaluation).mockResolvedValue(ok(true));

    const result = await runSelf(...args);

    expect(result.status).toBe('skipped');
    expect(result.detail).toBe('这份作业没有可评的题目');
    expect(submitEvaluation).not.toHaveBeenCalled();
  });

  it('答卷只有客观题列表时也照评：不因为主观题为空就放弃', async () => {
    vi.mocked(getHomeworkInfo).mockResolvedValue(ok(homeworkInfo()));
    vi.mocked(getEvaluationDetail).mockResolvedValue(
      ok(
        progress({
          self: { evaluateId: SELF_EVALUATE_ID, answerformId: SELF_ANSWERFORM_ID, done: false },
        }),
      ),
    );
    vi.mocked(getHomeworkPaper).mockResolvedValue(
      ok(
        homeworkPaper({
          subjectiveQList: null,
          objectiveQList: [{ id: 22, score: 5, judgeDtos: [{ id: 9100, maxScore: 5 }] }],
        }),
      ),
    );
    vi.mocked(submitEvaluation).mockResolvedValue(ok(true));

    const result = await runSelf(...args);

    expect(result.status).toBe('done');
    expect(result.detail).toBe('已提交 1 项自评评分');
  });

  it('提交自评失败：如实报失败', async () => {
    vi.mocked(getHomeworkInfo).mockResolvedValue(ok(homeworkInfo()));
    vi.mocked(getEvaluationDetail).mockResolvedValue(
      ok(
        progress({
          self: { evaluateId: SELF_EVALUATE_ID, answerformId: SELF_ANSWERFORM_ID, done: false },
        }),
      ),
    );
    vi.mocked(getHomeworkPaper).mockResolvedValue(ok(homeworkPaper()));
    vi.mocked(submitEvaluation).mockResolvedValue(fail('评分接口 400'));

    const result = await runSelf(...args);

    expect(result.status).toBe('failed');
    expect(result.detail).toBe('提交自评失败：评分接口 400');
  });

  it('正常路径：用自评对象的答卷与 evaluateId，按满分提交且评语原样传下去', async () => {
    vi.mocked(getHomeworkInfo).mockResolvedValue(ok(homeworkInfo()));
    vi.mocked(getEvaluationDetail).mockResolvedValue(
      ok(
        progress({
          self: { evaluateId: SELF_EVALUATE_ID, answerformId: SELF_ANSWERFORM_ID, done: false },
        }),
      ),
    );
    vi.mocked(getHomeworkPaper).mockResolvedValue(ok(homeworkPaper()));
    vi.mocked(submitEvaluation).mockResolvedValue(ok(true));

    const result = await runSelf(...args);

    expect(result).toEqual({
      tid: TID,
      name: '第一单元测验',
      kind: 'self',
      status: 'done',
      detail: '已提交 2 项自评评分',
    });
    // 取的是「自己那一份」的答卷：aid 与 evaluateId 都来自 self
    expect(getHomeworkPaper).toHaveBeenCalledWith(client, TID, {
      aid: SELF_ANSWERFORM_ID,
      evaluateId: SELF_EVALUATE_ID,
      phase: 2,
    });
    // 评的是自己，按各评分点满分给；评语原样带去
    expect(submitEvaluation).toHaveBeenCalledWith(client, SELF_EVALUATE_ID, TID, [
      { qid: 21, jid: '9001', qscore: 14, jscore: 10, comment: '自评评语', answerCanViewComment: true },
      { qid: 21, jid: '9002', qscore: 14, jscore: 4, comment: '自评评语', answerCanViewComment: true },
    ]);
  });
});

// ---------- 互评 ----------

describe('runReview：自动完成一份作业的互评', () => {
  const args = [client, workAction('review'), 1, '互评评语'] as const;

  /** 走到「可以开始评」所需的前置：作业信息、进度、作答卷。 */
  function readyToReview(detail: Partial<EvaluationProgress>): void {
    vi.mocked(getHomeworkInfo).mockResolvedValue(ok(homeworkInfo()));
    vi.mocked(getEvaluationDetail).mockResolvedValue(ok(progress(detail)));
    vi.mocked(getHomeworkPaper).mockResolvedValue(ok(homeworkPaper()));
  }

  it('读取作业信息失败：如实报失败', async () => {
    vi.mocked(getHomeworkInfo).mockResolvedValue(fail('作业接口 502'));

    const result = await runReview(...args);

    expect(result.kind).toBe('review');
    expect(result.status).toBe('failed');
    expect(result.detail).toBe('读取作业信息失败：作业接口 502');
    expect(getEvaluationDetail).not.toHaveBeenCalled();
  });

  it('不在互评期：skipped，不读评测进度', async () => {
    vi.mocked(getHomeworkInfo).mockResolvedValue(ok(homeworkInfo({ deadline: NOW + DAY })));

    const result = await runReview(...args);

    expect(result.status).toBe('skipped');
    expect(result.detail).toBe('已不在互评期内');
    expect(getEvaluationDetail).not.toHaveBeenCalled();
  });

  it('读取互评进度失败：如实报失败', async () => {
    vi.mocked(getHomeworkInfo).mockResolvedValue(ok(homeworkInfo()));
    vi.mocked(getEvaluationDetail).mockResolvedValue(fail('DWR 解析失败'));

    const result = await runReview(...args);

    expect(result.status).toBe('failed');
    expect(result.detail).toBe('读取互评进度失败：DWR 解析失败');
  });

  it('这份作业不需要互评：skipped', async () => {
    readyToReview({ required: 0, remaining: 0 });

    const result = await runReview(...args);

    expect(result).toEqual({
      tid: TID,
      name: '第一单元测验',
      kind: 'review',
      status: 'skipped',
      detail: '这份作业不需要互评',
    });
    expect(nextSubmission).not.toHaveBeenCalled();
  });

  it('互评配额已满：skipped，一分也不多评', async () => {
    readyToReview({ required: 3, completed: 3, remaining: 0 });

    const result = await runReview(...args);

    expect(result).toEqual({
      tid: TID,
      name: '第一单元测验',
      kind: 'review',
      status: 'skipped',
      detail: '互评已完成 3 / 3 份',
    });
    expect(nextSubmission).not.toHaveBeenCalled();
  });

  it('取作业答卷失败：如实报失败', async () => {
    vi.mocked(getHomeworkInfo).mockResolvedValue(ok(homeworkInfo()));
    vi.mocked(getEvaluationDetail).mockResolvedValue(ok(progress({ required: 2, remaining: 2 })));
    vi.mocked(getHomeworkPaper).mockResolvedValue(fail('答卷接口 500'));

    const result = await runReview(...args);

    expect(result.status).toBe('failed');
    expect(result.detail).toBe('取作业答卷失败：答卷接口 500');
    expect(nextSubmission).not.toHaveBeenCalled();
  });

  it('没有可评题目：skipped，不取待评答卷', async () => {
    vi.mocked(getHomeworkInfo).mockResolvedValue(ok(homeworkInfo()));
    vi.mocked(getEvaluationDetail).mockResolvedValue(ok(progress({ required: 2, remaining: 2 })));
    // 两份列表都是 null：这样才走到 `?? []` 那一步
    vi.mocked(getHomeworkPaper).mockResolvedValue(
      ok(homeworkPaper({ subjectiveQList: null, objectiveQList: null })),
    );

    const result = await runReview(...args);

    expect(result.status).toBe('skipped');
    expect(result.detail).toBe('这份作业没有可评的题目');
    expect(nextSubmission).not.toHaveBeenCalled();
  });

  it('评够剩余份数即止：服务端还有答卷也不多评', async () => {
    readyToReview({ required: 2, completed: 0, remaining: 2 });
    vi.mocked(nextSubmission)
      .mockResolvedValueOnce(ok(nextOf(11)))
      .mockResolvedValueOnce(ok(nextOf(12)))
      .mockResolvedValue(ok(nextOf(13)));
    vi.mocked(submitEvaluation).mockResolvedValue(ok(true));

    const result = await runReview(...args);

    expect(result.status).toBe('done');
    expect(result.detail).toBe('已提交 2 份互评');
    // 只评 2 份、只取 2 次：第 3 份即使拿得到也不评
    expect(submitEvaluation).toHaveBeenCalledTimes(2);
    expect(nextSubmission).toHaveBeenCalledTimes(2);
    expect(vi.mocked(submitEvaluation).mock.calls.map((call) => call[1])).toEqual([11, 12]);
  });

  it('评到一半按了停止：那一份评完就中断，如实报已评几份', async () => {
    readyToReview({ required: 3, completed: 0, remaining: 3 });
    let stopped = false;
    vi.mocked(nextSubmission).mockResolvedValue(ok(nextOf(11)));
    vi.mocked(submitEvaluation).mockImplementation(async () => {
      // 第一份评完后，用户按了停止
      stopped = true;
      return ok(true);
    });

    const result = await runReview(...args, { stopped: () => stopped });

    expect(result.status).toBe('skipped');
    expect(result.detail).toBe('已评 1 份，按停止键中断');
    // 不再向服务端要下一份：要卷本身会占用配额
    expect(nextSubmission).toHaveBeenCalledTimes(1);
    expect(submitEvaluation).toHaveBeenCalledTimes(1);
  });

  it('服务端不再分配、一份都没评：skipped，说下次再试', async () => {
    readyToReview({ required: 3, completed: 0, remaining: 3 });
    vi.mocked(nextSubmission).mockResolvedValue(ok(nextOf(null)));

    const result = await runReview(...args);

    expect(result.status).toBe('skipped');
    expect(result.detail).toBe('暂无可评答卷，将在下一轮重试');
    expect(submitEvaluation).not.toHaveBeenCalled();
  });

  it('服务端不再分配、只评了一部分：如实报还差几份，不说成已完成', async () => {
    readyToReview({ required: 3, completed: 0, remaining: 3 });
    vi.mocked(nextSubmission)
      .mockResolvedValueOnce(ok(nextOf(11)))
      .mockResolvedValue(ok(nextOf(null)));
    vi.mocked(submitEvaluation).mockResolvedValue(ok(true));

    const result = await runReview(...args);

    expect(result.status).toBe('failed');
    expect(result.detail).toBe('已评 1 份，还差 2 份但暂无可评答卷');
  });

  it('evaluateId 为 0 视为没有分配，不拿它去提交', async () => {
    readyToReview({ required: 3, completed: 0, remaining: 3 });
    vi.mocked(nextSubmission)
      .mockResolvedValueOnce(ok(nextOf(11)))
      .mockResolvedValue(ok(nextOf(0)));
    vi.mocked(submitEvaluation).mockResolvedValue(ok(true));

    const result = await runReview(...args);

    expect(result.status).toBe('failed');
    expect(result.detail).toBe('已评 1 份，还差 2 份但暂无可评答卷');
    expect(vi.mocked(submitEvaluation).mock.calls.map((call) => call[1])).toEqual([11]);
  });

  it('取待评答卷失败、一份都没评：failed', async () => {
    readyToReview({ required: 3, completed: 0, remaining: 3 });
    vi.mocked(nextSubmission).mockResolvedValue(fail('分配接口 500'));

    const result = await runReview(...args);

    expect(result.status).toBe('failed');
    expect(result.detail).toBe('取待评答卷失败：分配接口 500');
  });

  it('取待评答卷失败、已评了一部分：算 done，并说明后续失败', async () => {
    readyToReview({ required: 3, completed: 0, remaining: 3 });
    vi.mocked(nextSubmission)
      .mockResolvedValueOnce(ok(nextOf(11)))
      .mockResolvedValue(fail('分配接口 500'));
    vi.mocked(submitEvaluation).mockResolvedValue(ok(true));

    const result = await runReview(...args);

    // 配额没评够就不是完成：结局是 failed，detail 里保留已经评了几份
    expect(result.status).toBe('failed');
    expect(result.detail).toBe('已评 1 份，后续取卷失败：分配接口 500');
  });

  it('提交互评失败、一份都没评：failed', async () => {
    readyToReview({ required: 3, completed: 0, remaining: 3 });
    vi.mocked(nextSubmission).mockResolvedValue(ok(nextOf(11)));
    vi.mocked(submitEvaluation).mockResolvedValue(fail('评分接口 400'));

    const result = await runReview(...args);

    expect(result.status).toBe('failed');
    expect(result.detail).toBe('提交互评失败：评分接口 400');
  });

  it('提交互评失败、已评了一部分：算 done，并说明后续失败', async () => {
    readyToReview({ required: 3, completed: 0, remaining: 3 });
    vi.mocked(nextSubmission)
      .mockResolvedValueOnce(ok(nextOf(11)))
      .mockResolvedValueOnce(ok(nextOf(12)))
      .mockResolvedValue(ok(nextOf(13)));
    vi.mocked(submitEvaluation)
      .mockResolvedValueOnce(ok(true))
      .mockResolvedValue(fail('评分接口 400'));

    const result = await runReview(...args);

    expect(result.status).toBe('failed');
    expect(result.detail).toBe('已评 1 份，后续提交失败：评分接口 400');
  });

  it('配额大得异常时按循环上限停下，不空转也不谎报评够', async () => {
    readyToReview({ required: 100, completed: 0, remaining: 100 });
    let assigned = 0;
    vi.mocked(nextSubmission).mockImplementation(async () => ok(nextOf(++assigned)));
    vi.mocked(submitEvaluation).mockResolvedValue(ok(true));

    const result = await runReview(...args);

    expect(result.status).toBe('failed');
    expect(result.detail).toBe('已评 40 份，还差 60 份但暂无可评答卷');
    expect(submitEvaluation).toHaveBeenCalledTimes(40);
  });

  it('互评也按满分提交，评语与答卷项一致', async () => {
    readyToReview({ required: 1, completed: 0, remaining: 1 });
    vi.mocked(nextSubmission).mockResolvedValue(ok(nextOf(11)));
    vi.mocked(submitEvaluation).mockResolvedValue(ok(true));

    await runReview(...args);

    expect(getHomeworkPaper).toHaveBeenCalledWith(client, TID, { aid: 77, phase: 2 });
    expect(submitEvaluation).toHaveBeenCalledWith(client, 11, TID, [
      { qid: 21, jid: '9001', qscore: 14, jscore: 10, comment: '互评评语', answerCanViewComment: true },
      { qid: 21, jid: '9002', qscore: 14, jscore: 4, comment: '互评评语', answerCanViewComment: true },
    ]);
  });
});
