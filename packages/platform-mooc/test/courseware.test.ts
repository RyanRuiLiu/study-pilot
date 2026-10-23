/*
 * 课件单元的完成行为。
 *
 * 这里有两条容易被改坏、而界面上看不出来的契约，各用一组测试钉住：
 *
 *   1. **类型清单只有一处**（`BEHAVIORS`）。清单里少一种类型，表现是那种单元
 *      每轮重现、永远做不掉；多一种没实测过的类型，则可能发出平台不认的报文。
 *   2. **各类型的报文形状**。写错的表现只是「平台不记账」——`code` 仍为 0，
 *      界面上看不到任何异常。
 *
 * 报文里的值一律来自课程结构或平台接口：测试用固定样本，断言输出与之一致。
 */

import { describe, expect, it } from 'vitest';
import { md5hex } from '@study-pilot/core';
import { createMoocClient } from '../src/client.ts';
import { executeActions } from '../src/policy/execute/index.ts';
import {
  BEHAVIORS,
  DISCUSS_REPLY_MAX_CHARS,
  UNIT_TYPE,
  completeUnit,
  getCourseStructure,
  isCompletable,
  isUnitComplete,
  type CourseUnit,
} from '../src/index.ts';

const TOKEN = 'deadbeefdeadbeefdeadbeefdeadbeef';

/**
 * 取一条 DWR 调用的原始报文。没发出去时给空串——断言会立刻看出来，
 * 而不是在解构 undefined 时抛一个与断言无关的错。
 */
function rawBody(call: { body?: unknown } | undefined): string {
  return String((call?.body as { __raw?: string } | undefined)?.__raw ?? '');
}

function unitOf(overrides: Partial<CourseUnit> = {}): CourseUnit {
  return {
    unitId: 1001,
    contentId: 2002,
    termId: 3003,
    lessonId: 3004,
    lessonName: '1.1 课时',
    name: '示例单元',
    contentType: UNIT_TYPE.VIDEO,
    durationInSeconds: 500,
    completePercent: 0,
    viewStatus: 0,
    ...overrides,
  };
}

/** 记录每次请求，并按路径给出响应。 */
function clientStub(responses: Record<string, unknown> = {}) {
  const calls: Array<{ kind: 'rpc' | 'dwr'; path: string; body: Record<string, unknown> }> = [];
  const client = createMoocClient({
    fetch: (async (url: string, init?: RequestInit) => {
      const path = new URL(url).pathname;
      const isDwr = path.includes('/dwr/');
      const body = isDwr
        ? { __raw: String(init?.body ?? '') }
        : (JSON.parse(String(init?.body ?? '{}')) as Record<string, unknown>);
      calls.push({ kind: isDwr ? 'dwr' : 'rpc', path, body });

      const key = Object.keys(responses).find((candidate) => path.includes(candidate));
      const payload = key ? responses[key] : { code: 0, message: '', result: true };
      if (isDwr) {
        /*
         * 夹具里的字符串是 DWR 的**变量赋值段**；真实响应还带一行 callback。
         * 客户端现在拒收「既没有回调也没有异常」的响应体，所以这里按真实形态包起来——
         * 夹具要长得像真响应，判定测的才是生产路径。
         */
        const raw =
          typeof payload === 'string'
            ? payload.includes('_remoteHandleCallback')
              ? payload
              : `//#DWR-REPLY\n${payload}\ndwr.engine._remoteHandleCallback('1','0',true);\n`
            : `//#DWR-REPLY\ndwr.engine._remoteHandleCallback('1','0',true);\n`;
        return new Response(raw, { status: 200, headers: { 'content-type': 'text/plain' } });
      }
      return new Response(JSON.stringify(payload), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    }) as never,
    getToken: () => TOKEN,
    md5: md5hex,
    minGapMs: 0,
  });
  return {
    client,
    calls,
    rpcCalls: (method: string) => calls.filter((c) => c.path.includes(method)),
    dwrCalls: (method: string) => calls.filter((c) => c.path.includes(method)),
  };
}

describe('类型清单', () => {
  it('登记的类型与实测过的类型完全一致', () => {
    expect([...BEHAVIORS].map((b) => b.type).sort((a, b) => a - b)).toEqual([1, 3, 4, 5, 6]);
  });

  it('没有登记的类型不进计划，也不发请求', async () => {
    const live = unitOf({ contentType: UNIT_TYPE.LIVE });
    expect(isCompletable(live)).toBe(false);

    const { client, calls } = clientStub();
    const result = await completeUnit(client, live);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe('skipped');
    expect(calls).toHaveLength(0);
  });

  it('视频缺时长时不进计划——结构里没有这个数就不报', () => {
    expect(isCompletable(unitOf({ durationInSeconds: null }))).toBe(false);
    expect(isCompletable(unitOf())).toBe(true);
  });

  it('完成判据看 completePercent：部分学习的视频 viewStatus 已是 5，但没学完', () => {
    expect(isUnitComplete(unitOf({ completePercent: 0.32, viewStatus: 5 }))).toBe(false);
    expect(isUnitComplete(unitOf({ completePercent: 1, viewStatus: 5 }))).toBe(true);
  });
});

describe('视频：位置与本次学时取整段时长', () => {
  it('报文含 videoTime 与 learnedVideoTimeCount，值来自结构里的时长', async () => {
    const { client, rpcCalls } = clientStub();
    await completeUnit(client, unitOf());

    const calls = rpcCalls('saveMocContentLearn');
    expect(calls).toHaveLength(1);
    expect(calls[0]?.body).toEqual({
      dto: {
        unitId: 1001,
        contentType: UNIT_TYPE.VIDEO,
        finished: true,
        videoTime: 500,
        learnedVideoTimeCount: 500,
      },
    });
  });
});

describe('文本：打开即完成，与真人一致', () => {
  it('只报单元与类型', async () => {
    const { client, rpcCalls } = clientStub();
    await completeUnit(client, unitOf({ contentType: UNIT_TYPE.TEXT }));

    const calls = rpcCalls('saveMocContentLearn');
    expect(calls).toHaveLength(1);
    expect(calls[0]?.body).toEqual({
      dto: { unitId: 1001, contentType: UNIT_TYPE.TEXT, finished: true },
    });
  });
});

describe('文档：首末两报，进度与时长都不靠中间态', () => {
  it('三页文档发两条：第 1 页开场、末页 finished，时长合计 90 秒', async () => {
    const { client, rpcCalls } = clientStub({
      getLessonUnitLearnVo: 's0.textPages=3;\n',
    });
    await completeUnit(client, unitOf({ contentType: UNIT_TYPE.PDF }));

    expect(rpcCalls('getLessonUnitLearnVo')).toHaveLength(1);
    const reports = rpcCalls('saveMocContentLearn').map((c) => c.body.dto as Record<string, unknown>);
    // 真人「打开 → 拖到结尾」的两条；中间页不发
    expect(reports).toHaveLength(2);
    expect(reports.map((dto) => dto.pageNum)).toEqual([1, 3]);
    expect(reports.map((dto) => dto.finished)).toEqual([false, true]);
    expect(reports.map((dto) => dto.index)).toEqual([0, 2]);
    // 时长按声明秒数累加：30 + 60 = 90，与逐页口径的总量一致
    expect(reports.map((dto) => dto.learnedVideoTimeCount)).toEqual([30, 60]);
    for (const dto of reports) {
      expect(dto.contentType).toBe(UNIT_TYPE.PDF);
      expect(typeof dto.lastLearnTime).toBe('number');
    }
  });

  it('单页文档只发一条：开场即 finished', async () => {
    const { client, rpcCalls } = clientStub({
      getLessonUnitLearnVo: 's0.textPages=1;\n',
    });
    await completeUnit(client, unitOf({ contentType: UNIT_TYPE.PDF }));

    const reports = rpcCalls('saveMocContentLearn').map((c) => c.body.dto as Record<string, unknown>);
    expect(reports).toHaveLength(1);
    expect(reports[0]?.pageNum).toBe(1);
    expect(reports[0]?.finished).toBe(true);
    expect(reports[0]?.learnedVideoTimeCount).toBe(30);
  });

  it('拿不到页数时返回失败：不发任何上报，交人工', async () => {
    const { client, rpcCalls } = clientStub({ getLessonUnitLearnVo: 's0.textUrl="x";\n' });
    const result = await completeUnit(client, unitOf({ contentType: UNIT_TYPE.PDF }));

    expect(result.ok).toBe(false);
    expect(rpcCalls('saveMocContentLearn')).toHaveLength(0);
  });
});

describe('随堂测验：像真人一样交一份答卷', () => {
  /*
   * 答案在卷面自身（2026-10-17 换接口）：选项带正确标记、填空带 stdAnswer，
   * 不再有题库 RPC。形状与真机提交回读一致。
   */
  const paper = {
    id: 5001,
    objectiveQList: [
      { id: 11, type: 1, optionDtos: [{ id: 101, answer: true }, { id: 102, answer: false }] },
      { id: 12, type: 4, optionDtos: [{ id: 103, answer: false }, { id: 104, answer: true }] },
      { id: 13, type: 3, optionDtos: null, stdAnswer: '时间' },
    ],
  };

  it('卷面带答案时提交答卷（含填空题），并补完成上报', async () => {
    const { client, rpcCalls } = clientStub({
      getOpenQuizPaperDto: { code: 0, message: '', result: paper },
    });
    await completeUnit(client, unitOf({ contentType: UNIT_TYPE.QUESTION }));

    const submitted = rpcCalls('submitAnswers');
    expect(submitted).toHaveLength(1);
    const paperDto = submitted[0]?.body.paperDto as Record<string, unknown>;
    expect(paperDto.answers).toEqual([
      { qid: 11, type: 1, optIds: [101], time: expect.any(Number) },
      { qid: 12, type: 4, optIds: [104], time: expect.any(Number) },
      {
        qid: 13,
        type: 3,
        optIds: null,
        content: { content: '时间', attachments: null },
        time: expect.any(Number),
      },
    ]);
    expect(rpcCalls('saveMocContentLearn')).toHaveLength(1);
  });

  it('含主观题的卷不自动交：只交客观部分等于残缺答卷', async () => {
    const { client, rpcCalls } = clientStub({
      getOpenQuizPaperDto: {
        code: 0,
        message: '',
        result: {
          id: 5002,
          objectiveQList: [{ id: 11, type: 1, optionDtos: [{ id: 101, answer: true }] }],
          subjectiveQList: [{ id: 21, type: 10, plainTextTitle: '试述…' }],
        },
      },
    });
    const result = await completeUnit(client, unitOf({ contentType: UNIT_TYPE.QUESTION }));

    expect(result.ok).toBe(false);
    expect(rpcCalls('submitAnswers')).toHaveLength(0);
    expect(rpcCalls('saveMocContentLearn')).toHaveLength(0);
  });

  it('卷面取不到答案、没有移动端凭证时返回失败：不交残缺答卷，也不报完成', async () => {
    const { client, rpcCalls } = clientStub({
      getOpenQuizPaperDto: {
        code: 0,
        message: '',
        result: {
          id: 5001,
          objectiveQList: [
            { id: 11, type: 1, optionDtos: [{ id: 101, answer: true }] },
            { id: 12, type: 1, optionDtos: [{ id: 103 }, { id: 104 }] },
          ],
        },
      },
    });
    const result = await completeUnit(client, unitOf({ contentType: UNIT_TYPE.QUESTION }));

    expect(result.ok).toBe(false);
    expect(rpcCalls('submitAnswers')).toHaveLength(0);
    expect(rpcCalls('saveMocContentLearn')).toHaveLength(0);
  });

  it('卷面没带答案且没有移动端凭证：不交，也不报完成', async () => {
    const { client, rpcCalls } = clientStub({
      getOpenQuizPaperDto: {
        code: 0,
        message: '',
        result: {
          id: 5003,
          objectiveQList: [
            { id: 11, type: 1, optionDtos: [{ id: 101 }, { id: 102 }] },
            { id: 12, type: 4, optionDtos: [{ id: 103 }, { id: 104 }] },
          ],
        },
      },
    });
    const result = await completeUnit(client, unitOf({ contentType: UNIT_TYPE.QUESTION }));

    expect(result.ok).toBe(false);
    expect(rpcCalls('submitAnswers')).toHaveLength(0);
    expect(rpcCalls('saveMocContentLearn')).toHaveLength(0);
  });

  it('停止键在提交之前生效：交卷不可撤销，停了就一条写请求都不发', async () => {
    const { client, rpcCalls } = clientStub({
      getOpenQuizPaperDto: {
        code: 0,
        message: '',
        result: {
          id: 5004,
          objectiveQList: [{ id: 11, type: 1, optionDtos: [{ id: 101, answer: true }] }],
        },
      },
    });

    const result = await completeUnit(
      client,
      unitOf({ contentType: UNIT_TYPE.QUESTION }),
      {},
      { stopped: () => true },
    );

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe('stopped');
    expect(rpcCalls('submitAnswers')).toHaveLength(0);
    expect(rpcCalls('saveMocContentLearn')).toHaveLength(0);
  });
});

describe('讨论：AI 写回复，写不出来就失败（没有固定文案）', () => {
  it('没有 AI 时不进计划，硬执行也返回失败且不发请求', async () => {
    expect(isCompletable(unitOf({ contentType: UNIT_TYPE.DISCUSS }))).toBe(false);
    expect(isCompletable(unitOf({ contentType: UNIT_TYPE.DISCUSS }), { text: true })).toBe(true);

    const { client, calls } = clientStub();
    const result = await completeUnit(client, unitOf({ contentType: UNIT_TYPE.DISCUSS }));
    expect(result.ok).toBe(false);
    expect(calls).toHaveLength(0);
  });

  it('题目取自讨论帖正文，不是单元名', async () => {
    /*
     * 单元名是「讨论3.4」这种编号，正文才是题目。这条测试钉住的就是这件事——
     * 曾经把单元名当题目喂给模型，结果是留言围着编号编（实测发生过）。
     * 同时用 \uXXXX 转义写法，确保解析按 JSON 字符串解码（DWR 就是这样发的）。
     */
    const escaped =
      's0.title="3.4 \\u8BA8\\u8BBA\\u9898";' +
      's0.content="<p>\\u5982\\u4F55\\u533A\\u5206\\u793A\\u4F8B\\u6982\\u5FF5\\u7532\\u4E0E\\u793A\\u4F8B\\u6982\\u5FF5\\u4E59\\uFF1F</p>";';
    const { client, dwrCalls, rpcCalls } = clientStub({ getLessonUnitLearnVo: escaped });
    const seen: Array<{ task: string; input: string }> = [];

    await completeUnit(
      client,
      unitOf({ contentType: UNIT_TYPE.DISCUSS, contentId: 6006, name: '讨论3.4' }),
      {
        generateText: async (request) => {
          seen.push(request);
          return { ok: true, text: '我理解示例概念甲按静态看，示例概念乙只看变化量。' };
        },
      },
    );

    expect(seen).toHaveLength(1);
    expect(seen[0]?.task).toBe('discuss-reply');
    expect(seen[0]?.input).toContain('如何区分示例概念甲与示例概念乙？');
    expect(seen[0]?.input).not.toContain('讨论3.4');

    const replies = dwrCalls('addReply');
    expect(replies).toHaveLength(1);
    const body = rawBody(replies[0]);
    expect(body).toContain('c0-scriptName=MocForumBean');
    expect(body).toContain('c0-methodName=addReply');
    // 顶层对象内联、字段用引用：与抓到的真实报文一致
    expect(body).toContain('c0-e1=number:6006');
    expect(body).toContain('c0-e3=number:0');
    expect(body).toContain(
      'c0-param0=Object_Object:{postId:reference:c0-e1,content:reference:c0-e2,anonymous:reference:c0-e3}',
    );
    // 字符串值按百分号编码：真实抓包里就是 %3Cp%3E… 的形式
    expect(body).toContain('c0-e2=string:%3Cp%3E');
    // 第二个参数（图片附件）不能省：少了它服务端报缺参数
    expect(body).toContain('c0-param1=Array:[]');
    expect(decodeURIComponent(body)).toContain('示例概念乙只看变化量');
    expect(rpcCalls('saveMocContentLearn')).toHaveLength(1);
  });

  it('标题即题目（正文为空）也照常作答：两种形态都是平台真实下发的数据', async () => {
    /*
     * 实测形态（2026-10-17）：有的课只给标题、正文为空，题面就写在
     * 标题里。代码两种形态都处理——标题取自平台，不是编的。样例题面是合成的。
     */
    const raw = 's0.title="讨论：在比较示例概念甲与示例概念乙时，有哪些需要注意的？";s0.content="<p> </p>";';
    const { client, dwrCalls, rpcCalls } = clientStub({ getLessonUnitLearnVo: raw });
    const seen: Array<{ task: string; input: string }> = [];

    await completeUnit(
      client,
      unitOf({ contentType: UNIT_TYPE.DISCUSS, contentId: 6007, name: '4.2 讨论' }),
      {
        generateText: async (request) => {
          seen.push(request);
          return { ok: true, text: '比较两个概念时要先固定条件，再看各自的适用范围。' };
        },
      },
    );

    expect(seen).toHaveLength(1);
    expect(seen[0]?.input).toContain('在比较示例概念甲与示例概念乙时，有哪些需要注意的？');
    expect(dwrCalls('addReply')).toHaveLength(1);
    expect(rpcCalls('saveMocContentLearn')).toHaveLength(1);
  });

  it('标题与正文都取不到可用题目时返回失败：不生成、不留言', async () => {
    const raws = [
      // 平台没给标题/正文
      's0.name="讨论3.4";',
      // 正文与标题都只有编号，给不出可回答的内容
      's0.title="3.4 讨论题";s0.content="<p>3.4 讨论题</p>";',
      // 标题是编号、正文为空
      's0.title="3.4 讨论题";s0.content="<p> </p>";',
    ];

    for (const raw of raws) {
      const { client, dwrCalls, rpcCalls } = clientStub({ getLessonUnitLearnVo: raw });
      const generated: string[] = [];
      const result = await completeUnit(
        client,
        unitOf({ contentType: UNIT_TYPE.DISCUSS }),
        {
          generateText: async (request) => {
            generated.push(request.input);
            return { ok: true, text: '不该被用到' };
          },
        },
      );

      expect(result.ok).toBe(false);
      expect(generated).toHaveLength(0);
      expect(dwrCalls('addReply')).toHaveLength(0);
      expect(rpcCalls('saveMocContentLearn')).toHaveLength(0);
    }
  });

  it('生成失败或不合规时返回失败：不留言、也不报完成', async () => {
    const variants = [
      { ok: false as const, reason: '超时' },
      // 超过产品上限（DISCUSS_REPLY_MAX_CHARS = 500）
      { ok: true as const, text: '好' + '很'.repeat(500) },
      { ok: true as const, text: '   ' },
    ];

    for (const value of variants) {
      const { client, dwrCalls, rpcCalls } = clientStub({
        getLessonUnitLearnVo: 's0.title="3.4 讨论题";s0.content="<p>如何区分示例概念甲与示例概念乙？</p>";',
      });
      const result = await completeUnit(
        client,
        unitOf({ contentType: UNIT_TYPE.DISCUSS }),
        { generateText: async () => value },
      );

      expect(result.ok).toBe(false);
      expect(dwrCalls('addReply')).toHaveLength(0);
      expect(rpcCalls('saveMocContentLearn')).toHaveLength(0);
    }
  });

  it('生成内容里的链接被去掉，句子本身保留', async () => {
    const { client, dwrCalls } = clientStub({
      getLessonUnitLearnVo: 's0.title="3.4 讨论题";s0.content="<p>如何区分示例概念甲与示例概念乙？</p>";',
    });
    const result = await completeUnit(client, unitOf({ contentType: UNIT_TYPE.DISCUSS }), {
      generateText: async () => ({ ok: true, text: '看这里 https://example.com/answer 有详解' }),
    });

    expect(result.ok).toBe(true);
    const body = decodeURIComponent(
      rawBody(dwrCalls('addReply')[0]),
    );
    expect(body).toContain('看这里');
    expect(body).not.toContain('example.com');
  });

  it('长度按产品上限放行/拒绝（与提示词共用一个常量，不写死数字）', async () => {
    const question = 's0.title="3.4 讨论题";s0.content="<p>如何区分示例概念甲与示例概念乙？</p>";';

    // 上限以内（含边界）：照发
    const withinLimit = '在'.repeat(DISCUSS_REPLY_MAX_CHARS - 1) + '。';
    {
      const { client, dwrCalls } = clientStub({ getLessonUnitLearnVo: question });
      const result = await completeUnit(client, unitOf({ contentType: UNIT_TYPE.DISCUSS }), {
        generateText: async () => ({ ok: true, text: withinLimit }),
      });
      expect(result.ok).toBe(true);
      expect(dwrCalls('addReply')).toHaveLength(1);
    }

    // 超出一个字：判失败，且不留言、不报完成
    {
      const { client, dwrCalls, rpcCalls } = clientStub({ getLessonUnitLearnVo: question });
      const result = await completeUnit(client, unitOf({ contentType: UNIT_TYPE.DISCUSS }), {
        generateText: async () => ({ ok: true, text: '在'.repeat(DISCUSS_REPLY_MAX_CHARS + 1) }),
      });
      expect(result.ok).toBe(false);
      expect(dwrCalls('addReply')).toHaveLength(0);
      expect(rpcCalls('saveMocContentLearn')).toHaveLength(0);
    }
  });
});

describe('结构里的课件单元', () => {
  it('从 lessons[].units[] 读出单元，并带上学期 id', async () => {
    const { client } = clientStub({
      getLastLearnedMocTermDto: {
        code: 0,
        message: '',
        result: {
          mocTermDto: {
            id: 1400000002,
            courseId: 1000000002,
            courseName: '示例课程甲',
            // 曾经写错的位置：单元不在章节下。这里刻意放一个，断言它被忽略
            units: [{ id: 9999, contentType: 1 }],
            chapters: [
              {
                id: 1,
                name: '第一章',
                lessons: [
                  {
                    id: 3004,
                    name: '1.1 课时',
                    units: [
                      {
                        id: 1001,
                        contentId: 2002,
                        contentType: 1,
                        name: '示例视频',
                        durationInSeconds: 500,
                        completePercent: 0.5,
                        viewStatus: 5,
                      },
                      { id: 0, contentType: 3 },
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
    });

    const structure = await getCourseStructure(client, 1400000002);

    expect(structure.ok).toBe(true);
    if (!structure.ok) return;
    expect(structure.value.units).toEqual([
      {
        unitId: 1001,
        contentId: 2002,
        termId: 1400000002,
        lessonId: 3004,
        lessonName: '1.1 课时',
        name: '示例视频',
        contentType: 1,
        durationInSeconds: 500,
        completePercent: 0.5,
        viewStatus: 5,
      },
    ]);
  });

  it('章节/课时/单元/考试列表里的畸形条目跳过，不让空指针炸掉整门课', async () => {
    const { client } = clientStub({
      getLastLearnedMocTermDto: {
        code: 0,
        message: '',
        result: {
          mocTermDto: {
            id: 1,
            chapters: [
              null,
              'not-an-object',
              {
                id: 1,
                name: '第一章',
                quizs: [null, 'x', { test: { id: 5, name: '单元测验' } }],
                homeworks: null,
                lessons: [
                  null,
                  'x',
                  {
                    id: 2,
                    name: '课时',
                    units: [null, 'x', { id: 3, name: '单元', contentType: 1 }],
                  },
                ],
              },
            ],
            exams: [
              null,
              'x',
              { id: 9, name: '考试', objectTest: null, subjectTest: { id: 10, name: '主观题' } },
            ],
          },
        },
      },
    });

    const structure = await getCourseStructure(client, 1);

    expect(structure.ok).toBe(true);
    if (!structure.ok) return;
    expect(structure.value.works.map((work) => work.tid).sort((a, b) => a - b)).toEqual([5, 10]);
    expect(structure.value.units.map((unit) => unit.unitId)).toEqual([3]);
  });

  it('列表字段不是数组：抛错并点名字段，不静默读成空', async () => {
    const { client } = clientStub({
      getLastLearnedMocTermDto: {
        code: 0,
        message: '',
        result: {
          mocTermDto: {
            id: 1,
            chapters: [{ id: 1, name: '第一章', quizs: { not: 'a list' } }],
            exams: [],
          },
        },
      },
    });

    await expect(getCourseStructure(client, 1)).rejects.toThrow(/quizs/);
  });
});

// ---------- 讨论预取 ----------

describe('讨论预取：生成先并发做完，发帖仍逐条串行', () => {
  const QUESTION = 's0.title="3.4 讨论题";s0.content="<p>如何区分示例概念甲与示例概念乙？</p>";';

  it('袋子里的预取结果直接使用：不再调生成器', async () => {
    const { client, dwrCalls } = clientStub({ getLessonUnitLearnVo: QUESTION });
    let generated = 0;
    const result = await completeUnit(
      client,
      unitOf({ contentType: UNIT_TYPE.DISCUSS, contentId: 6006 }),
      {
        generateText: async () => {
          generated += 1;
          return { ok: true, text: '不该被用到' };
        },
        preparedReplies: new Map([
          [6006, { ok: true as const, text: '预取好的：示例概念甲只看静态，示例概念乙只看变化量。' }],
        ]),
      },
    );

    expect(result.ok).toBe(true);
    expect(generated).toBe(0);
    const body = decodeURIComponent(
      rawBody(dwrCalls('addReply')[0]),
    );
    expect(body).toContain('预取好的：示例概念甲只看静态');
  });

  it('袋子里是失败结论：如实失败，不再二次生成', async () => {
    const { client, dwrCalls } = clientStub({ getLessonUnitLearnVo: QUESTION });
    let generated = 0;
    const result = await completeUnit(
      client,
      unitOf({ contentType: UNIT_TYPE.DISCUSS, contentId: 6006 }),
      {
        generateText: async () => {
          generated += 1;
          return { ok: true, text: 'x' };
        },
        preparedReplies: new Map([
          [6006, { ok: false as const, reason: 'AI 生成讨论回复失败：超时' }],
        ]),
      },
    );

    expect(result.ok).toBe(false);
    expect(generated).toBe(0);
    expect(dwrCalls('addReply')).toHaveLength(0);
  });

  it('预取因停止而中断：按跳过呈现，不是红色失败', async () => {
    const { client, dwrCalls } = clientStub({ getLessonUnitLearnVo: QUESTION });
    const result = await completeUnit(
      client,
      unitOf({ contentType: UNIT_TYPE.DISCUSS, contentId: 6006 }),
      {
        generateText: async () => ({ ok: true, text: 'x' }),
        preparedReplies: new Map([
          [6006, { ok: false as const, reason: '按停止键中断，未生成', stopped: true as const }],
        ]),
      },
    );

    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value).toBe('stopped');
    expect(dwrCalls('addReply')).toHaveLength(0);
  });

  it('编排层：两个讨论单元各生成一次（发帖之前），随后各发一条', async () => {
    const { client, dwrCalls, rpcCalls } = clientStub({ getLessonUnitLearnVo: QUESTION });
    const generated: number[] = [];
    const actions = [7007, 8008].map((unitId, index) => ({
      kind: 'courseware' as const,
      course: {} as never,
      unit: unitOf({ unitId, contentId: 6006 + index, contentType: UNIT_TYPE.DISCUSS }),
    }));

    const results = await executeActions(client, actions, 1, '评语', undefined, {
      generateText: async () => {
        generated.push(1);
        return { ok: true, text: '生成的回复内容' };
      },
    });

    expect(generated).toHaveLength(2); // 预取阶段各一次
    expect(dwrCalls('addReply')).toHaveLength(2); // 发帖两次
    expect(rpcCalls('saveMocContentLearn')).toHaveLength(2);
    expect(results.map((entry) => entry.status)).toEqual(['done', 'done']);
  });
});
