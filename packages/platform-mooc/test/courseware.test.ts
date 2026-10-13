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
import { createThrottle } from '@study-pilot/transport';
import { createMoocClient } from '../src/client.ts';
import {
  BEHAVIORS,
  UNIT_TYPE,
  completeUnit,
  getCourseStructure,
  isCompletable,
  isUnitComplete,
  type CourseUnit,
} from '../src/index.ts';

const TOKEN = 'e7f7a05b3c30492ab56fb86dd13a8a9d';

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
        const raw =
          typeof payload === 'string'
            ? payload
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
    throttle: createThrottle({ minGapMs: 0 }),
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

describe('文档：逐页上报，进度按页码推进', () => {
  it('三页文档发三条，末页才 finished，每页带声明的阅读秒数', async () => {
    const { client, rpcCalls } = clientStub({
      getLessonUnitLearnVo: 's0.textPages=3;\n',
    });
    await completeUnit(client, unitOf({ contentType: UNIT_TYPE.PDF }));

    expect(rpcCalls('getLessonUnitLearnVo')).toHaveLength(1);
    const pages = rpcCalls('saveMocContentLearn').map((c) => c.body.dto as Record<string, unknown>);
    expect(pages).toHaveLength(3);
    expect(pages.map((dto) => dto.pageNum)).toEqual([1, 2, 3]);
    expect(pages.map((dto) => dto.finished)).toEqual([false, false, true]);
    expect(pages.map((dto) => dto.index)).toEqual([0, 1, 2]);
    for (const dto of pages) {
      expect(dto.contentType).toBe(UNIT_TYPE.PDF);
      expect(dto.learnedVideoTimeCount).toBe(30);
      expect(typeof dto.lastLearnTime).toBe('number');
    }
  });

  it('拿不到页数时退回一次完成上报，不猜页数', async () => {
    const { client, rpcCalls } = clientStub({ getLessonUnitLearnVo: 's0.textUrl="x";\n' });
    await completeUnit(client, unitOf({ contentType: UNIT_TYPE.PDF }));

    const pages = rpcCalls('saveMocContentLearn');
    expect(pages).toHaveLength(1);
    expect(pages[0]?.body).toEqual({
      dto: { unitId: 1001, contentType: UNIT_TYPE.PDF, finished: true },
    });
  });
});

describe('随堂测验：像真人一样交一份答卷', () => {
  const paper = {
    id: 5001,
    objectiveQList: [
      { id: 11, type: 1, optionDtos: [{ id: 101 }, { id: 102 }] },
      { id: 12, type: 1, optionDtos: [{ id: 103 }, { id: 104 }] },
    ],
  };
  const bank = [
    { id: 9001, optionDtos: [{ id: 101, answer: true }, { id: 102, answer: false }] },
    { id: 9002, optionDtos: [{ id: 103, answer: false }, { id: 104, answer: true }] },
  ];

  it('题库能覆盖全部题目时提交答卷，并补完成上报', async () => {
    const { client, rpcCalls } = clientStub({
      getOpenQuizPaperDto: { code: 0, message: '', result: paper },
      getQuestionListByTermId: { code: 0, message: '', result: bank },
    });
    await completeUnit(client, unitOf({ contentType: UNIT_TYPE.QUESTION }));

    const submitted = rpcCalls('submitAnswers');
    expect(submitted).toHaveLength(1);
    const paperDto = submitted[0]?.body.paperDto as Record<string, unknown>;
    expect(paperDto.answers).toEqual([
      { qid: 11, type: 1, optIds: [101], time: expect.any(Number) },
      { qid: 12, type: 1, optIds: [104], time: expect.any(Number) },
    ]);
    expect(rpcCalls('saveMocContentLearn')).toHaveLength(1);
  });

  it('题库缺答案时不提交——只写一半交上去会留下低分记录', async () => {
    const { client, rpcCalls } = clientStub({
      getOpenQuizPaperDto: { code: 0, message: '', result: paper },
      getQuestionListByTermId: {
        code: 0,
        message: '',
        result: [{ id: 9001, optionDtos: [{ id: 101, answer: true }] }],
      },
    });
    await completeUnit(client, unitOf({ contentType: UNIT_TYPE.QUESTION }));

    expect(rpcCalls('submitAnswers')).toHaveLength(0);
    // 完成上报照发：完成与作答本来就是两件事
    expect(rpcCalls('saveMocContentLearn')).toHaveLength(1);
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

  it('回复走 DWR MocForumBean.addReply，内容由生成器给出', async () => {
    const { client, dwrCalls, rpcCalls } = clientStub();
    const seen: Array<{ task: string; input: string }> = [];
    await completeUnit(
      client,
      unitOf({ contentType: UNIT_TYPE.DISCUSS, contentId: 6006, name: '讨论：静态工作点的稳定性问题' }),
      {
        generateText: async (request) => {
          seen.push(request);
          return { ok: true, text: '关于静态工作点的稳定性，我理解关键在于偏置电路的负反馈。' };
        },
      },
    );

    expect(seen).toEqual([{ task: 'discuss-reply', input: '讨论：静态工作点的稳定性问题' }]);
    const replies = dwrCalls('addReply');
    expect(replies).toHaveLength(1);
    const body = String((replies[0]?.body as { __raw?: string }).__raw ?? '');
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
    expect(decodeURIComponent(body)).toContain('我理解关键在于偏置电路的负反馈');
    expect(rpcCalls('saveMocContentLearn')).toHaveLength(1);
  });

  it('生成失败或不合规时返回失败：不留言、也不报完成', async () => {
    const variants = [
      { ok: false as const, reason: '超时' },
      { ok: true as const, text: '好' + '很'.repeat(300) },
      { ok: true as const, text: '   ' },
    ];

    for (const value of variants) {
      const { client, dwrCalls, rpcCalls } = clientStub();
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
    const { client, dwrCalls } = clientStub();
    const result = await completeUnit(client, unitOf({ contentType: UNIT_TYPE.DISCUSS }), {
      generateText: async () => ({ ok: true, text: '看这里 https://example.com/answer 有详解' }),
    });

    expect(result.ok).toBe(true);
    const body = decodeURIComponent(
      String((dwrCalls('addReply')[0]?.body as { __raw?: string }).__raw ?? ''),
    );
    expect(body).toContain('看这里');
    expect(body).not.toContain('example.com');
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
            id: 1488277459,
            courseId: 1467539170,
            courseName: '示例课',
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

    const structure = await getCourseStructure(client, 1488277459);

    expect(structure.ok).toBe(true);
    if (!structure.ok) return;
    expect(structure.value.units).toEqual([
      {
        unitId: 1001,
        contentId: 2002,
        termId: 1488277459,
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
});
