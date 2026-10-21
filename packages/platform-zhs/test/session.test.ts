/* 会话读取的形态核对（假 cookie 读取器，直接喂 cookie 值）。 */

import { describe, expect, it } from 'vitest';
import { readSession, type CookieReader } from '../src/session.ts';

function cookieReturning(value: string): CookieReader {
  return async () => value;
}

describe('readSession', () => {
  it('登录形态：cookie 是 URL 编码的 JSON（真实观测形态），uuid 与 userId 都取到', async () => {
    // 2026-10-17 chrome.cookies 实测：值是 percent-encoded JSON
    const encoded = encodeURIComponent(JSON.stringify({ realName: '测试', userId: 900000009, uuid: 'TESTuuid1' }));
    const session = await readSession(cookieReturning(encoded));
    expect(session).toEqual({ loggedIn: true, uuid: 'TESTuuid1', userId: 900000009 });
  });

  it('未编码的 JSON 同样可读（解码是无害直通）', async () => {
    const session = await readSession(cookieReturning(JSON.stringify({ uuid: 'TESTuuid1', userId: 1 })));
    expect(session).toEqual({ loggedIn: true, uuid: 'TESTuuid1', userId: 1 });
  });

  it('cookie 缺失（空串）视为未登录', async () => {
    const session = await readSession(cookieReturning(''));
    expect(session).toEqual({ loggedIn: false, uuid: '', userId: null });
  });

  it('cookie 落在裸域（host-only）而 www 上读不到：两个 origin 都问', async () => {
    const value = JSON.stringify({ uuid: 'TESTuuid1', userId: 900000009 });
    const reader: CookieReader = async (origin) =>
      origin === 'https://zhihuishu.com' ? value : '';
    await expect(readSession(reader)).resolves.toEqual({
      loggedIn: true,
      uuid: 'TESTuuid1',
      userId: 900000009,
    });
  });

  it('没有 uuid 视为未登录（不拿别的字段凑数）', async () => {
    const session = await readSession(cookieReturning(JSON.stringify({ realName: '某人', userId: 1 })));
    expect(session).toEqual({ loggedIn: false, uuid: '', userId: null });
  });

  it('uuid 不是非空字符串同样视为未登录', async () => {
    for (const bad of [JSON.stringify({ uuid: 123 }), JSON.stringify({ uuid: '' })]) {
      const session = await readSession(cookieReturning(bad));
      expect(session).toEqual({ loggedIn: false, uuid: '', userId: null });
    }
  });

  it('cookie 内容不是 JSON 视为未登录', async () => {
    const session = await readSession(cookieReturning('not-json'));
    expect(session).toEqual({ loggedIn: false, uuid: '', userId: null });
  });

  it('userId 缺失不影响登录（视频线只要 uuid），但显式给 null 而不是 0', async () => {
    const session = await readSession(cookieReturning(JSON.stringify({ uuid: 'TESTuuid1' })));
    expect(session).toEqual({ loggedIn: true, uuid: 'TESTuuid1', userId: null });
  });

  it('userId 不是有限数字 → null（不拿字符串或 NaN 顶替）', async () => {
    for (const bad of [JSON.stringify({ uuid: 'u', userId: '900000009' }), JSON.stringify({ uuid: 'u', userId: null })]) {
      const session = await readSession(cookieReturning(bad));
      expect(session.userId).toBeNull();
      expect(session.loggedIn).toBe(true);
    }
  });
});
