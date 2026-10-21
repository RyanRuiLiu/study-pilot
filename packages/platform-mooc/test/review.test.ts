/*
 * 互评 DWR 响应解析测试。
 *
 * 形态取自实测抓取的真实响应（id 与课程名已换成合成样例）。
 *
 * 这里钉住格式是有必要的：DWR 把对象拆成逐字段赋值，
 * 早期实现误以为响应形如 `s0{...}`，结果所有字段都解析不到，
 * 而调用方只会看到空的 evaluateId，表现为「服务端没有分配答卷」，
 * 真正的错误被掩盖了。
 */

import { describe, expect, it } from 'vitest';
import { buildEvaluationItems, parseDwrObjectVariables, submitEvaluation } from '../src/review.ts';
import type { PaperQuestion } from '../src/types.ts';

/** 取下一份待评答卷的真实响应。 */
const NEXT_SUBMISSION_RESPONSE = [
  '//#DWR-INSERT',
  '//#DWR-REPLY',
  'var s0={};s0.answerformId=3500000001;s0.evaluateId=1805000001;',
  's0.evaluateJudgeType=2;s0.evaluatorId=1;s0.origScore=0.0;',
  's0.status=1;s0.testId=1200000003;',
  "dwr.engine._remoteHandleCallback('1790366273307','0',{next:s0,total:5,max:30,completed:2});",
  '',
].join('\r\n');

/** 互评进度查询的真实响应。 */
const EVALUATE_DETAIL_RESPONSE = [
  '//#DWR-INSERT',
  '//#DWR-REPLY',
  'var s0=[];var s4={};var s5={};var s1={};var s2={};var s3={};s0[0]=s4;s0[1]=s5;',
  's4.answerformId=3500000002;s4.evaluateId=1805000002;s4.evaluateJudgeType=2;',
  's4.evaluatorId=1;s4.origScore=100.0;s4.status=2;s4.testId=1200000003;',
  's5.answerformId=3500000003;s5.evaluateId=1805000003;s5.evaluateJudgeType=2;',
  's5.evaluatorId=1;s5.origScore=100.0;s5.status=2;s5.testId=1200000003;',
  "s1.id=1200000003;s1.name=\"\\u7B2C\\u4E09\\u5355\\u5143 \\u5355\\u5143\\u4F5C\\u4E1A\";s1.termId=1400000002;",
  's2.answerformId=3500000004;s2.evaluateId=1805000004;s2.evaluateJudgeType=3;s2.status=1;',
  's3.answerformId=3500000001;s3.evaluateId=1805000001;s3.evaluateJudgeType=2;s3.status=1;',
  "dwr.engine._remoteHandleCallback('1790365791170','0',{completedEvaluates:s0,enoughAnswer:true,",
  'maxEvaluateCount:30,selfEvaluate:s2,startedEvaluate:s3,totalEvaluateCount:5,trained:false});',
  '',
].join('\r\n');

describe('parseDwrObjectVariables', () => {
  it('解析 next 对象的全部字段', () => {
    const fields = parseDwrObjectVariables(NEXT_SUBMISSION_RESPONSE);

    expect(fields.evaluateId).toBe('1805000001');
    expect(fields.answerformId).toBe('3500000001');
    expect(fields.status).toBe('1');
    expect(fields.testId).toBe('1200000003');
    expect(fields.evaluateJudgeType).toBe('2');
    expect(fields.evaluatorId).toBe('1');
  });

  it('同一响应里有多个对象时都能取到', () => {
    const fields = parseDwrObjectVariables(EVALUATE_DETAIL_RESPONSE);

    // s4 与 s5 是已完成的互评，s3 是进行中的，取值应来自最后一个赋值的对象
    expect(fields.evaluateId).toBe('1805000001');
    expect(fields.status).toBe('1');
    expect(fields.answerformId).toBe('3500000001');
  });

  it('解析带转义引号的字符串字段', () => {
    const fields = parseDwrObjectVariables(EVALUATE_DETAIL_RESPONSE);
    expect(fields.name).toContain('\\u4E09');
  });

  it('没有对象赋值时返回空结果而不是抛错', () => {
    expect(parseDwrObjectVariables('//#DWR-REPLY\n')).toEqual({});
  });

  it('不会把 `s0{...}` 这种不存在的形态当作有效输入', () => {
    // 该形态在真实响应里不出现，早期实现按它解析导致全部字段丢失
    const fields = parseDwrObjectVariables('var s0={};s0{evaluateId=1;}');
    expect(fields.evaluateId).toBeUndefined();
  });
});

describe('buildEvaluationItems', () => {
  const questions: PaperQuestion[] = [
    {
      id: 3300000001,
      score: 35,
      judgeDtos: [{ id: 30000000000001, maxScore: 35, msg: '得分指导' }],
    },
    {
      id: 3300000002,
      score: 35,
      judgeDtos: [
        { id: 30000000000002, maxScore: 20, msg: '第一部分' },
        { id: 30000000000003, maxScore: 15, msg: '第二部分' },
      ],
    },
  ];

  it('按评分点逐个展开', () => {
    const items = buildEvaluationItems({ subjectiveQList: questions }, '评语');
    expect(items).toHaveLength(3);
    expect(items.map((item) => item.jid)).toEqual([
      '30000000000001',
      '30000000000002',
      '30000000000003',
    ]);
  });

  it('每个评分点按各自的 maxScore 给分', () => {
    const items = buildEvaluationItems({ subjectiveQList: questions }, '评语');
    expect(items.map((item) => item.jscore)).toEqual([35, 20, 15]);
  });

  it('评分点 id 转为字符串，与页面的 data-jid 一致', () => {
    const items = buildEvaluationItems({ subjectiveQList: questions }, '评语');
    for (const item of items) {
      expect(typeof item.jid).toBe('string');
    }
  });
});

describe('submitEvaluation 的业务成败', () => {
  const ITEMS = [
    { qid: 1, jid: '9', qscore: 6, jscore: 6, comment: '按点给分', answerCanViewComment: true },
  ];

  /** 只回答一份 DWR 原始回包，够验成败判定。 */
  const dwrClient = (raw: string) =>
    ({ dwr: { call: async () => ({ ok: true, value: { raw } }) } }) as never;

  it('业务异常（_remoteHandleException）→ Result 失败，不能记成已评', async () => {
    const result = await submitEvaluation(
      dwrClient("dwr.engine._remoteHandleException('1','0','java.lang.RuntimeException');"),
      1,
      2,
      ITEMS,
    );
    expect(result.ok).toBe(false);
  });

  it('正常回包 → ok(true)', async () => {
    const result = await submitEvaluation(
      dwrClient("dwr.engine._remoteHandleCallback('1','0',true);"),
      1,
      2,
      ITEMS,
    );
    expect(result).toEqual({ ok: true, value: true });
  });
});
