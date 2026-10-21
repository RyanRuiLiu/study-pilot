/*
 * 会话 cookie 的解析容错：坏掉的 STUDY_INFO 按「未登录」处理，不抛。
 *
 * cookie 是外部输入（浏览器里可以被改、被别的工具覆写）。decodeURIComponent
 * 对坏掉的百分号编码会抛 URIError；抛出去等于把一条坏 cookie 变成整次会话读取
 * 失败，而正确结论只是「读不出用户 id」。
 */

import { describe, expect, it } from 'vitest';
import { ensureSession } from '../src/index.ts';
import type { HostCapabilities } from '@study-pilot/application';

function hostWith(cookies: Record<string, string>): HostCapabilities {
  return {
    readCookie: async (_origin, name) => cookies[name] ?? '',
    whenRequestRulesReady: async () => undefined,
  };
}

/** 静默恢复那一次 GET 的替身：不碰网络。 */
const noNetwork = async (): Promise<Response> => new Response('ok');

describe('STUDY_INFO 的解析', () => {
  it('百分号编码坏掉：按未登录返回，不抛', async () => {
    const host = hostWith({ NTESSTUDYSI: 'token', STUDY_INFO: '%E0%A4%A' });
    const session = await ensureSession(host, noNetwork);
    expect(session).toEqual({ loggedIn: false, userId: 0, token: 'token' });
  });

  it('正常形态：取到 userId 即登录', async () => {
    const host = hostWith({ NTESSTUDYSI: 'token', STUDY_INFO: encodeURIComponent('a@b|8|12345|1700000000000') });
    const session = await ensureSession(host, noNetwork);
    expect(session).toEqual({ loggedIn: true, userId: 12345, token: 'token' });
  });
});
