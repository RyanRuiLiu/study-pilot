/*
 * 登录态消息：未登录时不得把 token 送出后台。
 *
 * 响应类型的注释写着「未登录那一支不给 token」，而实现有一支把 session.token 原样带上。
 * 界面不读它——送出去只是多一份离开后台的凭证。两个未登录分支都钉住。
 */

import { describe, expect, it, vi } from 'vitest';

const platform = vi.hoisted(() => ({
  ensureSession: vi.fn(),
  renewSession: vi.fn(),
  getCourses: vi.fn(),
  COURSE_TYPE: { MOOC: 1 },
}));

vi.mock('@study-pilot/platform-mooc', () => platform);

const { sessionCommand } = await import('../src/adapters/mooc/messages/session.ts');

const deps = {
  host: {},
  client: { send: vi.fn(), origin: 'https://www.icourse163.org' },
  renew: vi.fn(),
};

async function ask(): Promise<unknown> {
  return new Promise((resolve) => {
    void sessionCommand(deps as never)({}, resolve);
  });
}

describe('登录态消息', () => {
  it('未登录（本地判定）：不带 token', async () => {
    platform.ensureSession.mockResolvedValueOnce({ loggedIn: false, userId: 0, token: 'visitor-token' });
    const response = await ask();
    expect(response).toEqual({ loggedIn: false, userId: 0 });
    expect(JSON.stringify(response)).not.toContain('visitor-token');
  });

  it('续期也救不回来：报未登录，且不带 token', async () => {
    platform.ensureSession.mockResolvedValueOnce({ loggedIn: true, userId: 7, token: 'secret-token' });
    platform.getCourses.mockResolvedValue({ ok: false, error: { kind: 'auth', message: '未登录' } });
    platform.renewSession.mockResolvedValueOnce({ renewed: false, session: { loggedIn: true, userId: 7, token: 'x' } });

    const response = await ask();
    expect(response).toEqual({ loggedIn: false, userId: 0 });
    expect(JSON.stringify(response)).not.toContain('secret-token');
  });

  it('服务端认得：照常带登录态', async () => {
    platform.ensureSession.mockResolvedValueOnce({ loggedIn: true, userId: 7, token: 'secret-token' });
    platform.getCourses.mockResolvedValueOnce({ ok: true, value: [] });
    const response = await ask();
    expect(response).toMatchObject({ loggedIn: true, userId: 7 });
  });
});
