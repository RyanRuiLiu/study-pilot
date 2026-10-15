/* 会话读取的形态核对（假 client，直接喂响应体）。 */

import { describe, expect, it } from 'vitest';
import { readSession } from '../src/session.ts';
import type { ZhsClient } from '../src/client.ts';

function clientReturning(body: unknown): ZhsClient {
  return { call: async () => body };
}

describe('readSession', () => {
  it('登录形态：code=0 且 result.uuid 非空', async () => {
    const session = await readSession(
      clientReturning({ code: 0, message: null, result: { uuid: 'XM8jD752', realName: '某某' } }),
    );
    expect(session).toEqual({ loggedIn: true, uuid: 'XM8jD752' });
  });

  it('code 非 0 视为未登录', async () => {
    const session = await readSession(clientReturning({ code: 401, message: '未登录', result: null }));
    expect(session).toEqual({ loggedIn: false, uuid: '' });
  });

  it('没有 uuid 视为未登录（不拿别的字段凑数）', async () => {
    const session = await readSession(clientReturning({ code: 0, result: { username: 'someone' } }));
    expect(session).toEqual({ loggedIn: false, uuid: '' });
  });

  it('result 为空对象同样视为未登录', async () => {
    const session = await readSession(clientReturning({ code: 0, result: {} }));
    expect(session).toEqual({ loggedIn: false, uuid: '' });
  });
});
