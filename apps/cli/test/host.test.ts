/*
 * 会话文件的读取（命令行载体）：一次解析、两家平台各取各的 cookie。
 *
 * 域过滤与「同名取域最宽」两条规则是实测口径（见 host.ts 文件头），
 * 这里用 storageState 形状的夹具把它们钉住；真机路径由 node-live 类冒烟覆盖。
 */

import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { createCookieFileHost, readSessions } from '../src/host.ts';

const dirs: string[] = [];

afterEach(() => {
  for (const dir of dirs) rmSync(dir, { recursive: true, force: true });
  dirs.length = 0;
});

function sessionFile(cookies: Array<{ name: string; value: string; domain: string }>): string {
  const dir = mkdtempSync(join(tmpdir(), 'study-pilot-cli-host-'));
  dirs.push(dir);
  const file = join(dir, 'session.json');
  writeFileSync(file, JSON.stringify({ cookies, origins: [] }));
  return file;
}

describe('readSessions', () => {
  it('两家平台各取自己域的 cookie，互不串门', () => {
    const sessions = readSessions(
      sessionFile([
        { name: 'STUDY_SESS', value: 'm1', domain: '.icourse163.org' },
        { name: 'CASLOGC', value: 'z1', domain: '.zhihuishu.com' },
        { name: 'JSESSIONID', value: 'z2', domain: 'hike.zhihuishu.com' },
        // 伪造域不许过：端锚定的要点
        { name: 'EVIL', value: 'x', domain: 'evil-icourse163.org' },
        { name: 'EVIL2', value: 'x', domain: 'notzhihuishu.com' },
      ]),
    );
    expect(sessions.mooc.cookies).toEqual({ STUDY_SESS: 'm1' });
    expect(sessions.zhihuishu.cookies).toEqual({ CASLOGC: 'z1', JSESSIONID: 'z2' });
    expect(sessions.mooc.origin).toBe('https://www.icourse163.org');
    expect(sessions.zhihuishu.origin).toBe('https://www.zhihuishu.com');
  });

  it('同名 cookie 取域最宽的那份（.zhihuishu.com 的 CASLOGC 各子域通用）', () => {
    const sessions = readSessions(
      sessionFile([
        { name: 'CASLOGC', value: 'narrow', domain: 'hike.zhihuishu.com' },
        { name: 'CASLOGC', value: 'wide', domain: '.zhihuishu.com' },
        { name: 'CASLOGC', value: 'wider', domain: 'zhihuishu.com' },
      ]),
    );
    expect(sessions.zhihuishu.cookies.CASLOGC).toBe('wider');
  });

  it('一家没登录不影响另一家（不抛错，那一家只是空 cookie）', () => {
    const sessions = readSessions(sessionFile([{ name: 'CASLOGC', value: 'z', domain: '.zhihuishu.com' }]));
    expect(sessions.mooc.cookies).toEqual({});
    expect(sessions.zhihuishu.cookies).toEqual({ CASLOGC: 'z' });
  });

  it('两家都没有 cookie 才判会话文件没用（抛错带导出方式）', () => {
    expect(() => readSessions(sessionFile([{ name: 'X', value: '1', domain: 'example.com' }]))).toThrow(
      /pnpm probe state export/,
    );
  });
});

describe('createCookieFileHost', () => {
  it('readCookie 给值；没有的名字回空串（会话判定的说法由平台包定）', async () => {
    const host = createCookieFileHost({ origin: 'https://www.zhihuishu.com', cookies: { CASLOGC: 'v' } });
    expect(await host.readCookie('https://www.zhihuishu.com', 'CASLOGC')).toBe('v');
    expect(await host.readCookie('https://www.zhihuishu.com', '没有的')).toBe('');
  });
});
