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

  it('cookie 落在裸域（host-only）而 www 上读不到：两个 origin 都问', async () => {
    const cookies: Record<string, string> = {
      NTESSTUDYSI: 'token',
      STUDY_INFO: encodeURIComponent('a@b|8|12345|1700000000000'),
    };
    const host: HostCapabilities = {
      whenRequestRulesReady: async () => undefined,
      readCookie: async (origin, name) =>
        origin === 'https://icourse163.org' ? (cookies[name] ?? '') : '',
    };
    const session = await ensureSession(host, noNetwork);
    expect(session).toEqual({ loggedIn: true, userId: 12345, token: 'token' });
  });
});

/*
 * cookie 读不出 userId（缺失/格式变了）但服务端会话仍活：用户点「读取课程列表」
 * 能拉到课，界面却显示未登录。这时让服务端表态，别把 cookie 的结论当登录结论。
 */
describe('cookie 读不出用户而服务端认得', () => {
  const host = hostWith({ NTESSTUDYSI: 'token', STUDY_INFO: 'not-the-old-format' });

  function clientWith(result: unknown) {
    return { rpc: { call: async () => ({ ok: true, value: { result } }) } } as never;
  }

  it('课程列表探问成功：按登录处理（userId 保持 0）', async () => {
    const session = await ensureSession(
      host,
      noNetwork,
      'https://www.icourse163.org',
      clientWith([]),
    );
    expect(session).toEqual({ loggedIn: true, userId: 0, token: 'token' });
  });

  it('服务端回未登录形态：仍是未登录', async () => {
    const session = await ensureSession(
      host,
      noNetwork,
      'https://www.icourse163.org',
      clientWith(null),
    );
    expect(session).toEqual({ loggedIn: false, userId: 0, token: 'token' });
  });
});
