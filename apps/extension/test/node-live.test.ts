/*
 * 真机 Node 冒烟：在 Node 里用浏览器导出的会话，向慕课读一次课程列表。
 *
 * ============================ 这一步要证明什么 ============================
 *
 * 前面那条冒烟（plan-smoke.test.ts）证明的是「计划与通知不碰浏览器」。
 * 这条更进一步，证明**整个功能层可以脱离浏览器运行**：传输（DWR 签名）、
 * 会话、读取路径全都在 Node 里跑，请求真的发到 icourse163.org 并拿到真实数据。
 *
 * 只读：只调 getCourses（读课程列表），不提交、不完成、不修改任何平台数据。
 * ======================================================================
 *
 * 前置：
 *   1. 浏览器（探测用的那个）里已登录慕课；
 *   2. pnpm probe state export                ← 把登录态落到 .probe/（Playwright storageState，已 gitignore）
 * 跑法：
 *   node node_modules/vitest/vitest.mjs run --root apps/extension test/node-live.test.ts
 *
 * 没有会话文件时这条用例会跳过，而不是失败——它需要真实账号，不该卡住其它人。
 */

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { BROWSER_USER_AGENT, COURSE_TYPE, createMoocClient, getCourses } from '@study-pilot/platform-mooc';
import { md5hex } from '@study-pilot/core';

const SESSION_FILE = resolve(process.cwd(), '../../.probe/browser-session.json');

interface SessionFile {
  origin: string;
  cookies: Record<string, string>;
}

/** 读 `pnpm probe state export` 生成的 storageState，归一化成 { origin, cookies: 名字→值 }。 */
function readSession(): SessionFile | null {
  if (!existsSync(SESSION_FILE)) return null;
  try {
    const parsed = JSON.parse(readFileSync(SESSION_FILE, 'utf8')) as {
      cookies?: Array<{ name?: string; value?: string; domain?: string }>;
    };
    const cookies: Record<string, string> = {};
    for (const cookie of parsed.cookies ?? []) {
      if (typeof cookie?.name !== 'string' || typeof cookie?.value !== 'string') continue;
      if (!/^(.*\.)?icourse163\.org$/.test(String(cookie.domain ?? '').trim().toLowerCase())) continue;
      cookies[cookie.name] = cookie.value;
    }
    if (Object.keys(cookies).length === 0) return null;
    return { origin: 'https://www.icourse163.org', cookies };
  } catch {
    return null;
  }
}

/**
 * 宿主端的 fetch：把浏览器里本来就有的东西补齐。
 *
 * 慕课服务端会因为 Origin 是扩展而返回 403（见 packages/platform-mooc/src/policy/net-rules.ts 的实测），
 * 扩展靠 declarativeNetRequest 改写请求头；Node 里没有那层，就在这儿直接写上去。
 * 这几行就是"宿主适配"的全部内容——平台代码一行都没改。
 */
function nodeFetch(sessionFile: SessionFile): typeof fetch {
  const cookie = Object.entries(sessionFile.cookies)
    .map(([name, value]) => `${name}=${value}`)
    .join('; ');

  return (input, init) => {
    const headers = new Headers(init?.headers);
    headers.set('Cookie', cookie);
    headers.set('Origin', sessionFile.origin);
    headers.set('Referer', `${sessionFile.origin}/`);
    headers.set('User-Agent', BROWSER_USER_AGENT);
    return fetch(input, { ...init, headers });
  };
}

const sessionFile = readSession();

describe('Node 里连真实平台（只读）', () => {
  it.skipIf(sessionFile === null)('读得到课程列表', async () => {
    if (sessionFile === null) return;

    const client = createMoocClient({
      origin: sessionFile.origin,
      fetch: nodeFetch(sessionFile),
      getToken: async () => sessionFile.cookies.NTESSTUDYSI ?? '',
      md5: md5hex,
    });

    const result = await getCourses(client, { courseType: COURSE_TYPE.MOOC, pageSize: 50 });

    console.log('\n——— Node 直连慕课（无浏览器）———');
    if (!result.ok) {
      // 失败是常态（未登录、限流、会话失效），如实打出来
      console.log(`读取失败：${result.error.kind}`);
      console.log(result.error);
    } else {
      // Result 成功分支的字段是 value（见 packages/core/src/result.ts）
      console.log(`拿到 ${result.value.length} 门课程：`);
      for (const course of result.value.slice(0, 8)) {
        console.log(`  - ${course.name}（termId=${course.termId}）`);
      }
    }
    console.log('——— 完 ———\n');

    expect(result.ok).toBe(true);
  });
});
