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
 * 移动端凭证被平台作废（`paperDetail/v1` 回 `-10012`）。
 *
 * 实测（2026-10-26，样本 .probe/api/mooc-mobile-paper.*.json）：网页会话正常
 * （卷面读得到、aid 有效、STUDY_SESS 续期前后同值），`getMobToken.do` 也照常回
 * `code:0` 的 320 位 token，但 `/mob/course/paperDetail/v1` 拿这个 token 回
 * `{status:{code:-10012,message:"系统检测您的帐号已经于…在其他设备上登录…"}}`。
 * 三条取证：
 *   · 同一会话连调两次 `getMobToken.do`，token 指纹一致（粘性，不是每次现发新会话）；
 *   · 源码镜像（607 个脚本）里 `$getMobToken` 只有定义、没有任何调用点——网页前端
 *     自己不消费移动端凭证，它是 App 专属协议；
 *   · 扫码登录流 `getLoginQrCode → 手机确认 → mocMobChangeCookie` 是**手机→网页**
 *     单向授权，平台没有反向（网页→手机）的换发口。
 * 于是 -10012 说的是**账号手机侧会话被其他设备登录顶掉**：重登网页、续期会话都救不了
 * 它，唯一出路是手机 App 重登一次（之后 `getMobToken.do` 透出的即是新会话凭证）。
 * 判据按码，不按文本（CONTRIBUTING：不靠启发式匹配）。
 */
export const MOOC_MOBILE_CODE_SESSION_KILLED = -10012;

export const MOOC_MOBILE_SESSION_EXPIRED =
  '移动端凭证已被平台作废（其他设备上登录）：在手机 MOOC App 重新登录后再取答案';

export function sessionExpired(raw?: string): TransportError {
  return { ...unauthenticatedError(raw), message: MOOC_SESSION_EXPIRED };
}
