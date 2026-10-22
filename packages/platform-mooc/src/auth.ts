/*
 * 会话失效在慕课这一侧的**唯一说法与构造**。
 *
 * 两类信号归到同一个错误种类（`kind: 'auth'`）：
 *   1. 平台回「未登录形态的数据」：`.rpc` 信封里 `result` 为 `null`（实测 2026-10-03）。
 *      读取层在拿到响应的地方判（`courses.ts` / `structure.ts`）；
 *   2. `.rpc` 回 HTTP 401（标准语义「未认证」，transport 把它归到 auth，
 *      见 `packages/transport/src/rpc.ts` 里那一段注释）。
 *
 * 措辞只写在这里：三个读取点各写一句，界面上就会出现三种说法。
 * 处置（续期 → 重读 → 仍不行才引导登录）仍归 `policy/recovery.ts`。
 */

import { unauthenticatedError, type TransportError } from '@study-pilot/transport';

/** 对用户的那句话（CONTRIBUTING 常用句；平台名随包）。 */
export const MOOC_SESSION_EXPIRED = '登录已失效，需重新登录慕课';

export function sessionExpired(raw?: string): TransportError {
  return { ...unauthenticatedError(raw), message: MOOC_SESSION_EXPIRED };
}
