/*
 * 互评进度解析测试。
 *
 * 样本是实测抓取的真实响应（大物第三单元 testId 1258704159）。
 *
 * 互评的完成条件由平台给出，即 totalEvaluateCount。页面上对应
 * 「请至少为5份 作业进行评分；不评或者少评都会直接影响 作业成绩和证书发放」。
 * 因此解析出 required 与 completed 是判断「做完了没有」的唯一依据，
 * 解析错会导致少评而影响成绩。
 */

import { describe, expect, it } from 'vitest';
import { countDwrArray } from '../src/review.ts';

/** getEvaluateDetail 的真实响应：已完成 2 份、进行中 1 份、配额 5 份。 */
const EVALUATE_DETAIL = [
  '//#DWR-INSERT',
  '//#DWR-REPLY',
  'var s0=[];var s4={};var s5={};var s1={};var s2={};var s3={};s0[0]=s4;s0[1]=s5;',
  's4.answerformId=3531401359;s4.evaluateId=1805191301;s4.evaluateJudgeType=2;',
  's4.evaluatorId=1;s4.origScore=100.0;s4.status=2;s4.testId=1258704159;',
  's5.answerformId=3531850067;s5.evaluateId=1805195884;s5.evaluateJudgeType=2;',
  's5.evaluatorId=1;s5.origScore=100.0;s5.status=2;s5.testId=1258704159;',
  's1.id=1258704159;s1.name="\\u7B2C\\u4E09\\u5355\\u5143 \\u5355\\u5143\\u4F5C\\u4E1A";',
  's2.answerformId=3532031261;s2.evaluateId=1805172730;s2.evaluateJudgeType=3;s2.status=1;',
  's3.answerformId=3531912641;s3.evaluateId=1805193103;s3.evaluateJudgeType=2;s3.status=1;',
  "dwr.engine._remoteHandleCallback('1790365791170','0',{completedEvaluates:s0,enoughAnswer:true,",
  'maxEvaluateCount:30,selfEvaluate:s2,startedEvaluate:s3,totalEvaluateCount:5,trained:false});',
  '',
].join('\r\n');

/** 全部评完时的响应：completedEvaluates 有 5 项。 */
const ALL_DONE = [
  '//#DWR-REPLY',
  'var s0=[];var s1={};s0[0]=s1;s0[1]=s1;s0[2]=s1;s0[3]=s1;s0[4]=s1;',
  "dwr.engine._remoteHandleCallback('1','0',{completedEvaluates:s0,enoughAnswer:true,totalEvaluateCount:5});",
  '',
].join('\r\n');

describe('countDwrArray', () => {
  it('按最大下标得出数组长度', () => {
    expect(countDwrArray(EVALUATE_DETAIL, 's0')).toBe(2);
    expect(countDwrArray(ALL_DONE, 's0')).toBe(5);
  });

  it('空数组返回 0', () => {
    expect(countDwrArray('var s0=[];', 's0')).toBe(0);
  });

  it('不把别的对象字段误判为数组项', () => {
    // s1.testId=... 不是数组赋值，不应计入
    expect(countDwrArray(EVALUATE_DETAIL, 's1')).toBe(0);
    expect(countDwrArray(EVALUATE_DETAIL, 's3')).toBe(0);
  });

  it('下标不连续时以最大值加一为准', () => {
    expect(countDwrArray('s0[0]=a;s0[9]=b;', 's0')).toBe(10);
  });
});

describe('互评完成条件', () => {
  /** 与 getEvaluationDetail 内部的取值方式保持一致。 */
  function parse(raw: string) {
    const payload = raw.replace(/^[\s\S]*?_remoteHandleCallback\(/, '');
    const required = Number(payload.match(/totalEvaluateCount:(\d+)/)?.[1] ?? 0);
    const completedRef = payload.match(/completedEvaluates:(s\d+)/)?.[1];
    const completed = completedRef ? countDwrArray(raw, completedRef) : 0;
    return { required, completed, remaining: Math.max(0, required - completed) };
  }

  it('未评完时给出还差几份', () => {
    const result = parse(EVALUATE_DETAIL);
    expect(result.required).toBe(5);
    expect(result.completed).toBe(2);
    expect(result.remaining).toBe(3);
  });

  it('评满时还差 0 份', () => {
    const result = parse(ALL_DONE);
    expect(result.completed).toBe(5);
    expect(result.remaining).toBe(0);
  });

  it('需要评的份数与服务端上限是两回事', () => {
    // maxEvaluateCount 是单次上限，totalEvaluateCount 才是配额，不能混用
    expect(EVALUATE_DETAIL).toContain('maxEvaluateCount:30');
    expect(EVALUATE_DETAIL).toContain('totalEvaluateCount:5');
    expect(parse(EVALUATE_DETAIL).required).toBe(5);
  });
});
