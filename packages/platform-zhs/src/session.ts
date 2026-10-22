/*
 * 智慧树会话。
 *
 * 登录事实与设备号（uuid）的唯一来源是 `CASLOGC` cookie——一份 JSON：
 *   { realName, userId, uuid, headPic, username, ... }
 * 站点自己就用它：首页 header 的「用户名 / 安全退出」由它渲染；学习页把
 * `JSON.parse(At("CASLOGC")).uuid` 当 deviceUuid（study-DhL5V96B.js:11069），
 * 也就是上报里 token = `uuid + "zhs"` 的那枚值。
 *
 * 历史（2026-10-17 实测）：本模块最初以免签接口 `getLoginUserInfo` 判会话、取
 * uuid。该接口是遗留端点——对已下载全量前端源码的检索里已无任何调用点，且当天
 * 起对工具链固定返回 403「未登录」；同期学习接口与首页真实接口全部正常（会话
 * 本身是活的）。故改为读 cookie，与站点的机制对齐，不再向服务端做「谁在登录」
 * 的推测式提问。
 *
 * cookie 作用域通常是 `.zhihuishu.com`（任何子域读到的是同一枚），但浏览器也
 * 可能把某枚会话 cookie 落在**裸域**（host-only `zhihuishu.com`）上；cookies API
 * 按 URL 精确匹配，只问 www 会漏。两个 origin 都问，读不到返回空串——宿主能力
 * 的约定，见扩展侧 capabilities.ts。
 */

import { ZhsApiError, ZhsAuthError, type ZhsClient } from './client.ts';
import { ZHS_SITE_ORIGIN } from './pages.ts';

/** 查询 cookie 的两个锚点：先 www（站点日常入口），再裸域（host-only cookie）。 */
const COOKIE_ORIGINS = [ZHS_SITE_ORIGIN, 'https://zhihuishu.com'] as const;

export type CookieReader = (origin: string, name: string) => Promise<string>;

export interface ZhsSession {
  /** 是否处于登录态 */
  loggedIn: boolean;
  /** 设备号（报告的 token 用料）。未登录为空串 */
  uuid: string;
  /**
   * 站点用户 id（`CASLOGC.userId`）——**神谕的入参**。
   *
   * 读不到时为 `null`，且**不影响 loggedIn**：视频线只要 uuid 就能跑，
   * 把它变成登录的必要条件会让本来能用的会话失效。但下游（答卷路径）
   * 必须显式处理 null——**不许拿 0 顶替**（0 会被服务端当成一个真实用户 id
   * 静默查空，比报错更难查）。
   */
  userId: number | null;
}

/**
 * 判据（形态来自 2026-10-17 对真实 cookie 的实测）：
 *   · cookie 不存在 → 未登录；
 *   · cookie 值是 **URL 编码**的 JSON（真实观测：`%7B%22realName%22%3A...`），
 *     先 decodeURIComponent 再解析；解码后不是 JSON / uuid 缺失或不是非空字符串
 *     → 未登录（不拿别的字段凑数）。
 */
export async function readSession(readCookie: CookieReader): Promise<ZhsSession> {
  let raw = '';
  for (const origin of COOKIE_ORIGINS) {
    raw = await readCookie(origin, 'CASLOGC');
    if (raw !== '') break;
  }
  if (raw === '') return { loggedIn: false, uuid: '', userId: null };
  let text = raw;
  try {
    text = decodeURIComponent(raw);
  } catch {
    // 不是合法百分号编码：按原样尝试解析
  }
  try {
    const parsed = JSON.parse(text) as { uuid?: unknown; userId?: unknown };
    if (typeof parsed.uuid === 'string' && parsed.uuid.length > 0) {
      return {
        loggedIn: true,
        uuid: parsed.uuid,
        userId: typeof parsed.userId === 'number' && Number.isFinite(parsed.userId) ? parsed.userId : null,
      };
    }
  } catch {
    // 解码后仍不是 JSON：按未登录处理
  }
  return { loggedIn: false, uuid: '', userId: null };
}

/**
 * 服务端是否还认这份会话。
 *
 * cookie 只能证明「曾经登录」。用一次免签只读调用问服务端：`loginUserInfo`
 * 不需要签名、没有副作用；失效时实测回 **403 + 「未登录」**（2026-10-21；
 * 同一时刻签名网关回 401）。
 *
 * 三种结论：成功 → ok；平台明确拒绝（401/403）→ auth；其余（网络、超时、
 * 信封里的其他失败）→ unknown，由调用方保留 cookie 的结论——不能把网络问题
 * 说成「登录失效」。
 */
export type SessionProbe = 'ok' | 'auth' | 'unknown';

export async function probeSession(client: ZhsClient): Promise<SessionProbe> {
  try {
    await client.call('loginUserInfo');
    return 'ok';
  } catch (error) {
    // 401/403 两种到法都算：网关层是 HTTP 状态，信封层是 code（实测 loginUserInfo 回 code:403）
    if (error instanceof ZhsAuthError) return 'auth';
    if (error instanceof ZhsApiError && (error.code === 401 || error.code === 403)) return 'auth';
    return 'unknown';
  }
}
