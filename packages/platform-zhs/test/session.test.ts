/* 会话读取的形态核对（假 cookie 读取器，直接喂 cookie 值）。 */

import { describe, expect, it } from 'vitest';
import { readSession, type CookieReader } from '../src/session.ts';

function cookieReturning(value: string): CookieReader {
  return async () => value;
}

describe('readSession', () => {
  it('登录形态：cookie 是 URL 编码的 JSON（真实观测形态），uuid 非空', async () => {
    // 2026-10-17 chrome.cookies 实测：值是 percent-encoded JSON
    const encoded = encodeURIComponent(JSON.stringify({ realName: '示例学生', userId: 900000009, uuid: 'DEMO0001' }));
    const session = await readSession(cookieReturning(encoded));
    expect(session).toEqual({ loggedIn: true, uuid: 'DEMO0001' });
  });

  it('未编码的 JSON 同样可读（解码是无害直通）', async () => {
    const session = await readSession(cookieReturning(JSON.stringify({ uuid: 'DEMO0001' })));
    expect(session).toEqual({ loggedIn: true, uuid: 'DEMO0001' });
  });

  it('cookie 缺失（空串）视为未登录', async () => {
    const session = await readSession(cookieReturning(''));
    expect(session).toEqual({ loggedIn: false, uuid: '' });
  });

  it('没有 uuid 视为未登录（不拿别的字段凑数）', async () => {
    const session = await readSession(cookieReturning(JSON.stringify({ realName: '某人', userId: 1 })));
    expect(session).toEqual({ loggedIn: false, uuid: '' });
  });

  it('uuid 不是非空字符串同样视为未登录', async () => {
    for (const bad of [JSON.stringify({ uuid: 123 }), JSON.stringify({ uuid: '' })]) {
      const session = await readSession(cookieReturning(bad));
      expect(session).toEqual({ loggedIn: false, uuid: '' });
    }
  });

  it('cookie 内容不是 JSON 视为未登录', async () => {
    const session = await readSession(cookieReturning('not-json'));
    expect(session).toEqual({ loggedIn: false, uuid: '' });
  });
});
