/*
 * 宿主能力（命令行载体）。
 *
 * 会话从浏览器导出的文件读。文件形状是 Playwright 的 storageState
 * （`{ cookies: [{ name, value, domain, ... }], origins: [...] }`），
 * 由 `pnpm probe state export` 生成（只读、产物已被 git 忽略）。
 * 同一个文件里两个平台的 cookie 都有（浏览器同一次登录），这里一次解析、
 * 按平台各归一成内部用的 `{ origin, cookies: { 名字: 值 } }`。
 *
 * 归一规则按平台各写各的（两个平台的 cookie 事实不同）：
 *   慕课    —— 只收 icourse163.org 域的（照旧）；
 *   智慧树  —— 收 zhihuishu.com 全域。同名 cookie 出现在多个域时取**域最宽**
 *              的那份（`.zhihuishu.com` 的 CASLOGC 各子域通用），与浏览器
 *              发送顺序一致的近似：实测（2026-10-17）以此口径读过
 *              queryShareCourseInfo / c/has / lessonPopupExam 三族接口，全部 200。
 *
 * 出站请求头不在这一层：命令行没有 declarativeNetRequest，改由 fetch.ts 按平台出。
 */

import { readFileSync } from 'node:fs';
import type { HostCapabilities } from '@study-pilot/application';
import { MOOC_ORIGIN } from '@study-pilot/platform-mooc';
import { ZHS_SITE_ORIGIN as ZHS_ORIGIN } from '@study-pilot/platform-zhs';

export interface SessionFile {
  origin: string;
  cookies: Record<string, string>;
}

/** 会话文件里两家平台的登录态（各自消费；一家没登录另一家照常用）。 */
export interface Sessions {
  mooc: SessionFile;
  zhihuishu: SessionFile;
}

interface StorageStateCookie {
  name?: string;
  value?: string;
  domain?: string;
}

/**
 * 两家平台的源取自各自的包（`MOOC_ORIGIN` / `ZHS_SITE_ORIGIN`）——
 * 会话文件的归属判定与 cookie 锚点都要按源筛，而「这一家住在哪个域」是平台的事实，
 * 载体抄一份就是第二处：换域名时必然有一处改漏，表现是把 cookie 筛空、看着像没登录。
 */
export function readSessions(file: string): Sessions {
  const parsed = JSON.parse(readFileSync(file, 'utf8')) as { cookies?: StorageStateCookie[] };
  const list = Array.isArray(parsed.cookies) ? parsed.cookies : [];

  const moocCookies: Record<string, string> = {};
  // 同名取域最宽的一份：域越短越靠根（.zhihuishu.com 短于 a.zhihuishu.com）
  const zhsByName = new Map<string, { domain: string; value: string }>();
  for (const cookie of list) {
    if (typeof cookie?.name !== 'string' || typeof cookie?.value !== 'string') continue;
    const domain = String(cookie.domain ?? '').trim().toLowerCase();
    // 域匹配必须两端锚定：endsWith('icourse163.org') 会放过 evil-icourse163.org 这类伪造域
    if (/^(.*\.)?icourse163\.org$/.test(domain)) moocCookies[cookie.name] = cookie.value;
    if (/(^|\.)zhihuishu\.com$/.test(domain)) {
      const prev = zhsByName.get(cookie.name);
      if (prev === undefined || domain.length < prev.domain.length) {
        zhsByName.set(cookie.name, { domain, value: cookie.value });
      }
    }
  }
  const zhsCookies: Record<string, string> = {};
  for (const [name, entry] of zhsByName) zhsCookies[name] = entry.value;

  if (Object.keys(moocCookies).length === 0 && Object.keys(zhsCookies).length === 0) {
    throw new Error(
      `会话文件里没有慕课或智慧树的 cookie（形状应为 Playwright storageState，导出方式：pnpm probe state export）：${file}`,
    );
  }
  return {
    mooc: { origin: MOOC_ORIGIN, cookies: moocCookies },
    zhihuishu: { origin: ZHS_ORIGIN, cookies: zhsCookies },
  };
}

export function createCookieFileHost(session: SessionFile): HostCapabilities {
  return {
    // 命令行没有「等规则挂上网络栈」这件事
    whenRequestRulesReady: async () => {},
    readCookie: async (_origin, name) => session.cookies[name] ?? '',
  };
}
