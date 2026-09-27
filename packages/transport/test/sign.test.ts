/**
 * 签名测试。
 *
 * 两条验证策略：
 *   1. **交叉验证**：自实现的 MD5 与 `node:crypto` 对同一输入必须给出相同结果。
 *      自实现是必须的（Web Crypto 不提供 MD5），但也是风险最高的部分——
 *      一旦有偏差，所有请求都会签名错误。用第二实现对照是唯一可靠的检查方式。
 *   2. **规格锁定**：把 `signature.ts` 里还原出来的拼接顺序、取值区间、
 *      空值语义固定成断言，防止以后被"顺手优化"改坏。
 */

import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { md5hex } from '@study-pilot/core';
import {
  buildAuthHeaders,
  makeSignature,
  randomNonce,
  serializeForSign,
  SIGN_SALT,
  SIGN_SYSTEM,
} from '../src/sign.ts';

const nodeMd5 = (input: string): string =>
  createHash('md5').update(input, 'utf8').digest('hex');

describe('md5hex 与 node:crypto 交叉验证', () => {
  // 覆盖 ASCII、多字节 UTF-8、超长输入、以及跨 64 字节分块边界的情况
  const cases = [
    '',
    'abc',
    'hello',
    'The quick brown fox jumps over the lazy dog',
    'a'.repeat(55), // 补位后刚好压线，走 i > 55 分支
    'a'.repeat(56),
    'a'.repeat(64), // 正好一个分块
    'a'.repeat(65),
    'a'.repeat(1000),
    '中文测试',
    '模拟电子技术',
    '混合 mixed 内容 with 多字节字符：日本語、한국어、Ελληνικά、Русский',
    '{"tid":1258539430,"termId":1487834456}',
  ];

  for (const input of cases) {
    it(`输入 ${JSON.stringify(input.slice(0, 24))}${input.length > 24 ? '…' : ''}（${input.length} 字符）`, () => {
      expect(md5hex(input)).toBe(nodeMd5(input));
    });
  }

  it('输出为 32 位小写十六进制', () => {
    expect(md5hex('abc')).toMatch(/^[0-9a-f]{32}$/);
  });
});

describe('serializeForSign 的空值语义', () => {
  // 页面是 `"[Object Object]" === toString.call(e) ? JSON.stringify(e) : e || ""`
  it('普通对象走 JSON.stringify', () => {
    expect(serializeForSign({ tid: 1 })).toBe('{"tid":1}');
    expect(serializeForSign({})).toBe('{}');
  });

  it('空数组、Date 等非普通对象按真值字符串化', () => {
    // [object Array] 不是 [object Object]，所以落到 e || "" 分支
    expect(serializeForSign([1, 2])).toBe('1,2');
  });

  it('假值一律变空串', () => {
    expect(serializeForSign(undefined)).toBe('');
    expect(serializeForSign(null)).toBe('');
    expect(serializeForSign('')).toBe('');
    expect(serializeForSign(0)).toBe('');
  });

  it('真值（非对象）字符串化', () => {
    expect(serializeForSign('abc')).toBe('abc');
    expect(serializeForSign(123)).toBe('123');
  });
});

describe('makeSignature', () => {
  it('拼接顺序为 body + nonce + timestamp + SALT', () => {
    const body = '{"tid":1258539430}';
    const timestamp = 1790257895088;
    const nonce = 8229;

    const expected = nodeMd5(body + nonce + timestamp + SIGN_SALT).toUpperCase();
    expect(makeSignature(body, timestamp, nonce, md5hex)).toBe(expected);
  });

  it('输出为大写十六进制', () => {
    const sig = makeSignature('{}', 1, 1000, md5hex);
    expect(sig).toMatch(/^[0-9A-F]{32}$/);
  });

  it('换掉任意一个输入都会改变签名', () => {
    const base = makeSignature('{}', 1000, 5000, md5hex);
    expect(makeSignature('{"a":1}', 1000, 5000, md5hex)).not.toBe(base);
    expect(makeSignature('{}', 1001, 5000, md5hex)).not.toBe(base);
    expect(makeSignature('{}', 1000, 5001, md5hex)).not.toBe(base);
  });
});

describe('randomNonce', () => {
  it('始终落在 1000–9999', () => {
    for (let i = 0; i < 2000; i++) {
      const n = randomNonce();
      expect(Number.isInteger(n)).toBe(true);
      expect(n).toBeGreaterThanOrEqual(1000);
      expect(n).toBeLessThanOrEqual(9999);
    }
  });
});

describe('buildAuthHeaders', () => {
  const headers = buildAuthHeaders({ tid: 1 }, md5hex, {
    timestamp: 1700000000000,
    nonce: 4321,
  });

  it('字段集合与源码一致，且不含 edu-script-token', () => {
    expect(Object.keys(headers).sort()).toEqual(
      ['Auth-Signature', 'Content-Type', 'Nonce', 'System', 'Timestamp'].sort(),
    );
    expect(headers).not.toHaveProperty('edu-script-token');
  });

  it('System 为 v1，Timestamp/Nonce 为字符串', () => {
    expect(headers.System).toBe(SIGN_SYSTEM);
    expect(headers.Timestamp).toBe('1700000000000');
    expect(headers.Nonce).toBe('4321');
  });

  it('签名可由相同输入复现', () => {
    const again = buildAuthHeaders({ tid: 1 }, md5hex, {
      timestamp: 1700000000000,
      nonce: 4321,
    });
    expect(again['Auth-Signature']).toBe(headers['Auth-Signature']);
  });

  it('时间戳省略时取当前时间', () => {
    const h = buildAuthHeaders({}, md5hex);
    const ts = Number(h.Timestamp);
    expect(Math.abs(Date.now() - ts)).toBeLessThan(5000);
  });
});
