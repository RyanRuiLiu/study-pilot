/*
 * 宿主能力（命令行载体）。
 *
 * 会话从浏览器导出的 cookie 文件读，形状与 Playwright storageState / yt-dlp
 * --cookies-from-browser 那类做法一致：{ origin, cookies: { 名字: 值 } }。
 * 导出脚本在 scripts/probe/lib/cookies.mjs（只读、产物已被 git 忽略）。
 *
 * 出站请求头不在这一层：命令行没有 declarativeNetRequest，改由 fetch.ts 自己设。
 */

import { readFileSync } from 'node:fs';
import type { HostCapabilities } from '@study-pilot/application';

export interface SessionFile {
  origin: string;
  cookies: Record<string, string>;
}

export function readSessionFile(file: string): SessionFile {
  const parsed = JSON.parse(readFileSync(file, 'utf8')) as SessionFile;
  if (typeof parsed.origin !== 'string' || parsed.origin === '') {
    throw new Error(`会话文件里没有 origin：${file}`);
  }
  if (parsed.cookies === undefined || Object.keys(parsed.cookies).length === 0) {
    throw new Error(`会话文件里没有 cookie：${file}`);
  }
  return parsed;
}

export function createCookieFileHost(session: SessionFile): HostCapabilities {
  return {
    // 命令行没有「等规则挂上网络栈」这件事
    whenRequestRulesReady: async () => {},
    readCookie: async (_origin, name) => session.cookies[name] ?? '',
  };
}
