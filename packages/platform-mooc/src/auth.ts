/*
 * 会话失效在慕课这一侧的**唯一说法与构造**。
 *
 * 两类信号归到同一个错误种类（`kind: 'auth'`）：
 *   1. 平台回「未登录形态的数据」：`.rpc` 信封里 `result` 为 `null`（实测 2026-10-03）。
 *      整个判定只有一个入口：`client.ts` 的 `callRead`（读类）加上
 *      `courses.ts` / `structure.ts` 对**内层**结构的检查；
 *   2. `.rpc` 回 HTTP 401（标准语义「未认证」，transport 把它归到 auth，
 *      见 `packages/transport/src/rpc.ts` 里那一段注释）。
 *
 * 措辞只写在这里：各处各写一句，界面上就会出现几种说法。
 * 处置（续期 → 重读 → 仍不行才引导登录）仍归 `policy/recovery.ts`。
 */

import { unauthenticatedError, type TransportError } from '@study-pilot/transport';

/** 对用户的那句话（CONTRIBUTING 常用句；平台名随包）。 */
export const MOOC_SESSION_EXPIRED = '登录已失效，需重新登录慕课';

/**
 * 移动端会话被同槽位的新登录顶掉（`paperDetail/v1` 回 `-10012`）。
 *
 * 判据是码，不是文本。扩展的 UNS 登录按网页/PC 画像建立独立会话，与手机、
 * 平板的移动端会话分属不同槽；它们登录不会让这个会话失效。仍回 -10012 时
 * （例如同槽位被其他设备登录），`quiz.ts` 会用配置的账密自动重登一次并重试；
 * 未配置时如实失败（待办里只展示、不执行）。
 */
export const MOOC_MOBILE_CODE_SESSION_KILLED = -10012;

export const MOOC_MOBILE_SESSION_EXPIRED = '移动端会话已被其它设备的登录顶掉';

export function sessionExpired(raw?: string): TransportError {
  return { ...unauthenticatedError(raw), message: MOOC_SESSION_EXPIRED };
}
