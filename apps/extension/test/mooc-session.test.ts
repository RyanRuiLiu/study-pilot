/*
 * 登录态消息的对外形状：只给 loggedIn / userId，凭证留在后台。
 *
 * `NTESSTUDYSI` 在访客状态下也有值；把它随响应送回前台，只是让一份凭证多跑一趟。
 * 早先的 `satisfies` 只校验形状、不裁剪字段——登录态下曾把 token 一并送回。
 */

import { describe, expect, it } from 'vitest';
import { sessionCommand } from '../src/adapters/mooc/messages/session.ts';
import type { MoocMessageDeps } from '../src/adapters/mooc/messages/deps.ts';
import type { HostCapabilities } from '@study-pilot/application';

const HOST: HostCapabilities = {
  readCookie: async (_origin, name) =>
    name === 'NTESSTUDYSI' ? 'token-123' : encodeURIComponent('a@b|8|12345|1700000000000'),
  whenRequestRulesReady: async () => undefined,
};

const DEPS = {
  host: HOST,
  client: {
    origin: 'https://www.icourse163.org',
    send: async () => new Response('ok'),
    rpc: {
      call: async () => ({ ok: true, value: { result: [], pagination: { total: 0 } } }),
      callEnvelope: async () => ({ ok: true, value: { code: 0, result: [] } }),
    },
    dwr: {},
  },
  renew: async () => false,
  refreshCourses: async () => ({ ok: false, message: '未使用' }),
  loadSnapshot: async () => ({}),
  selectedCourses: () => [],
  coursewareContext: () => ({}),
  shell: { recordFailure: async () => undefined },
} as unknown as MoocMessageDeps;

function ask(): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    void sessionCommand(DEPS)({ type: 'MOOC_SESSION' } as never, ((response: Record<string, unknown>) =>
      resolve(response)) as never);
  });
}

describe('MOOC_SESSION 的响应形状', () => {
  it('已登录：只带 loggedIn 与 userId，不带 token', async () => {
    const response = await ask();
    expect(response).toEqual({ loggedIn: true, userId: 12345 });
    expect('token' in response).toBe(false);
  });
});
