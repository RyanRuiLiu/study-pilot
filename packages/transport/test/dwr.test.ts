/*
 * DWR 响应判定的测试。
 *
 * 这里的判据以前写错过：早先的实现假设回调返回值一定是 `true`，
 * 于是所有返回对象或数组的接口都被当成失败。
 * 样本覆盖 DWR 的三种实际形态，钉住判定规则。
 */

import { describe, expect, it } from 'vitest';
import { extractDwrPayload, isDwrSuccess } from '../src/dwr.ts';

/** 提交类接口：回调返回布尔。 */
const BOOLEAN_OK = [
  '//#DWR-INSERT',
  '//#DWR-REPLY',
  "dwr.engine._remoteHandleCallback('123','0',true);",
  '',
].join('\r\n');

/** 查询类接口：回调返回对象，字段被拆成逐条赋值。 */
const OBJECT_OK = [
  '//#DWR-INSERT',
  '//#DWR-REPLY',
  'var s0={};var s1={};var s4={};s1.needEvaluateHomework=s4;',
  's4.testId=1258704159;s4.name="\\u4F5C\\u4E1A";',
  "dwr.engine._remoteHandleCallback('456','0',{latestUnit:s0,upcoming:s1});",
  '',
].join('\r\n');

/** 查询类接口：回调返回数组。 */
const ARRAY_OK = [
  '//#DWR-REPLY',
  'var s0=[];var s1={};s0[0]=s1;',
  "dwr.engine._remoteHandleCallback('789','0',s0);",
  '',
].join('\r\n');

/** 服务端抛出异常。 */
const EXCEPTION = [
  '//#DWR-REPLY',
  "dwr.engine._remoteHandleException('123','0',{name:'java.lang.Exception',message:'fail'});",
  '',
].join('\r\n');

describe('isDwrSuccess', () => {
  it('回调返回布尔时判定为成功', () => {
    expect(isDwrSuccess(BOOLEAN_OK)).toBe(true);
  });

  it('回调返回对象时判定为成功', () => {
    // 早先的实现只匹配 ,true)，这里会被误判为失败
    expect(isDwrSuccess(OBJECT_OK)).toBe(true);
  });

  it('回调返回数组时判定为成功', () => {
    expect(isDwrSuccess(ARRAY_OK)).toBe(true);
  });

  it('回调返回 false 也是成功——接口执行完了，只是结果为否', () => {
    const raw = "dwr.engine._remoteHandleCallback('1','0',false);";
    expect(isDwrSuccess(raw)).toBe(true);
  });

  it('服务端抛异常时判定为失败', () => {
    expect(isDwrSuccess(EXCEPTION)).toBe(false);
  });

  it('空响应判定为失败', () => {
    expect(isDwrSuccess('')).toBe(false);
    expect(isDwrSuccess(' ')).toBe(false);
  });

  it('HTTP 错误页判定为失败', () => {
    expect(isDwrSuccess('<!DOCTYPE html><html>403</html>')).toBe(false);
  });
});

describe('extractDwrPayload', () => {
  it('取出对象载荷', () => {
    const payload = extractDwrPayload(OBJECT_OK);
    expect(payload).toContain('upcoming:s1');
  });

  it('取出数组载荷', () => {
    expect(extractDwrPayload(ARRAY_OK)).toBe('s0');
  });

  it('取出布尔载荷', () => {
    expect(extractDwrPayload(BOOLEAN_OK)).toBe('true');
  });

  it('没有回调时返回 null', () => {
    expect(extractDwrPayload('//#DWR-REPLY\r\n')).toBeNull();
  });
});
