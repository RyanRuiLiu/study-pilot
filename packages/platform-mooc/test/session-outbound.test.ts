/*
 * 会话恢复的出站环境（ensureSession / renewSession）。
 *
 * 这两个函数以前自己发全局 fetch、自己拼平台首页地址。对扩展没事（那边走
 * declarativeNetRequest 改写），但对没有那层改写的载体，这一下会带着错的 Origin
 * 打到错的站点，于是「恢复失败」——而它看起来和「持久凭证也失效了」一模一样，
 * 把人往错的方向引。现在它们用调用方给的出站与地址，这里钉住。
 */

import { describe, expect, it } from 'vitest';
import type { HostCapabilities } from '@study-pilot/application';
import { ensureSession, renewSession } from '../src/policy/session.ts';

const PROBE_ORIGIN = 'https://mooc.example.test';

/** 记录每一次出站的地址。 */
function recorder() {
  const sent: string[] = [];
  const fetchImpl = async (input: string) => {
    sent.push(input);
    return new Response('', { status: 200 });
  };
  return { sent, fetchImpl };
}

/** 一个「本地什么 cookie 都没有」的宿主——正好触发恢复那一步。 */
const noCookieHost: HostCapabilities = {
  whenRequestRulesReady: async () => {},
  readCookie: async () => '',
};

describe('会话恢复走调用方的出站', () => {
  it('ensureSession 的恢复 GET 用注入的 fetch 与站点地址', async () => {
    const { sent, fetchImpl } = recorder();

    await ensureSession(noCookieHost, fetchImpl, PROBE_ORIGIN);

    expect(sent).toEqual([`${PROBE_ORIGIN}/`]);
  });

  it('renewSession 的恢复 GET 同样用注入的 fetch 与站点地址', async () => {
    const { sent, fetchImpl } = recorder();

    await renewSession(noCookieHost, fetchImpl, PROBE_ORIGIN);

    expect(sent).toEqual([`${PROBE_ORIGIN}/`]);
  });

  it('已经登录时不打网络（恢复只在缺会话时发生）', async () => {
    const { sent, fetchImpl } = recorder();
    // loggedIn 的判据是 STUDY_INFO 第三段的 userId > 0（不是有没有 token——访客也有 token）
    const loggedInHost: HostCapabilities = {
      whenRequestRulesReady: async () => {},
      readCookie: async (_origin, name) =>
        name === 'NTESSTUDYSI'
          ? 'token-abcdef'
          : name === 'STUDY_INFO'
            ? 'someone@example.com|8|42|1700000000000'
            : '',
    };

    const session = await ensureSession(loggedInHost, fetchImpl, PROBE_ORIGIN);

    expect(sent).toEqual([]);
    expect(session.loggedIn).toBe(true);
    expect(session.userId).toBe(42);
  });

  it('恢复请求抛异常时如实回当前状态，不冒出去', async () => {
    const session = await ensureSession(
      noCookieHost,
      async () => {
        throw new TypeError('Failed to fetch');
      },
      PROBE_ORIGIN,
    );

    expect(session.loggedIn).toBe(false);
  });

  it('给 client.send 就直接用它：整条出站规则（等规则生效、回绝重发）一并生效', async () => {
    // 这是 createPlatformClient 那侧的接线方式：客户端持有的 send 就是那层包装
    const { sent, fetchImpl } = recorder();
    const asClientSend = fetchImpl;

    await renewSession(noCookieHost, asClientSend, PROBE_ORIGIN);

    expect(sent).toHaveLength(1);
  });
});
