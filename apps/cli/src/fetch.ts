/*
 * 出站环境（命令行载体）：自己把头设上。
 *
 * 扩展那一侧靠 declarativeNetRequest 把 Origin 与 Cookie 写到出站请求上；命令行没有那层，
 * 于是这里按**每个平台自己的事实**补齐（差别是实测的，出处见各平台包的 net-rules）：
 *   Cookie          浏览器里本来就有的那一串（按平台从会话文件取，见 host.ts）
 *   Origin/Referer  慕课必须指向平台自己的域名——实测：带扩展 Origin 的请求会被回
 *                   403「非法跨域请求」；智慧树**不需要**改写（直连即 200），因此由
 *                   调用方按平台给 `rewriteOrigin`
 *   User-Agent      各平台的接口按常规浏览器 UA 判来源（两个平台包各自导出自己的那份）
 *
 * 类型与 @study-pilot/core 的 FetchLike 同形（(url, init) => Promise<Response>），
 * 因此不需要为了一个类型多引一个包。
 */

import type { SessionFile } from './host.ts';

export interface OutboundOptions {
  /** 出站 UA：平台各自的事实（从对应平台包取，别在这里抄字符串） */
  userAgent: string;
  /** 是否把 Origin/Referer 改写成会话来源（慕课要、智慧树不要——见文件头） */
  rewriteOrigin: boolean;
}

export function createHeaderFetch(
  session: SessionFile,
  options: OutboundOptions,
): (url: string, init?: RequestInit) => Promise<Response> {
  const cookie = Object.entries(session.cookies)
    .map(([name, value]) => `${name}=${value}`)
    .join('; ');

  return async (url, init) => {
    const headers = new Headers(init?.headers);
    headers.set('Cookie', cookie);
    if (options.rewriteOrigin) {
      headers.set('Origin', session.origin);
      headers.set('Referer', `${session.origin}/`);
    }
    headers.set('User-Agent', options.userAgent);
    return await fetch(url, { ...init, headers });
  };
}
