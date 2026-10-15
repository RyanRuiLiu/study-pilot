/*
 * 宿主能力（命令行载体）。
 *
 * 会话从浏览器导出的文件读。文件形状是 Playwright 的 storageState
 * （`{ cookies: [{ name, value, domain, ... }], origins: [...] }`），
 * 由 `pnpm probe state export` 生成（只读、产物已被 git 忽略）。
 * 这里只做一件事：把它归一化成内部用的 `{ origin, cookies: { 名字: 值 } }`。
 *
 * 出站请求头不在这一层：命令行没有 declarativeNetRequest，改由 fetch.ts 自己设。
 */

import { readFileSync } from 'node:fs';
import type { HostCapabilities } from '@study-pilot/application';

export interface SessionFile {
  origin: string;
  cookies: Record<string, string>;
}

interface StorageStateCookie {
  name?: string;
  value?: string;
  domain?: string;
}

export function readSessionFile(file: string): SessionFile {
  const parsed = JSON.parse(readFileSync(file, 'utf8')) as { cookies?: StorageStateCookie[] };
  const list = Array.isArray(parsed.cookies) ? parsed.cookies : [];
  const cookies: Record<string, string> = {};
  for (const cookie of list) {
    if (typeof cookie?.name !== 'string' || typeof cookie?.value !== 'string') continue;
    // 平台在 .com / .cn 上也有同名 cookie，那是另一份登录态，只用 icourse163.org 域的。
    // 域匹配必须两端锚定：endsWith('icourse163.org') 会放过 evil-icourse163.org 这类伪造域。
    if (!/^(.*\.)?icourse163\.org$/.test(String(cookie.domain ?? '').trim().toLowerCase())) continue;
    cookies[cookie.name] = cookie.value;
  }
  if (Object.keys(cookies).length === 0) {
    throw new Error(
      `会话文件里没有 icourse163 的 cookie（形状应为 Playwright storageState，导出方式：pnpm probe state export）：${file}`,
    );
  }
  return { origin: 'https://www.icourse163.org', cookies };
}

export function createCookieFileHost(session: SessionFile): HostCapabilities {
  return {
    // 命令行没有「等规则挂上网络栈」这件事
    whenRequestRulesReady: async () => {},
    readCookie: async (_origin, name) => session.cookies[name] ?? '',
  };
}
