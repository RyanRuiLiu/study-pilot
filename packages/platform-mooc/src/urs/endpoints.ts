/**
 * 网易 URS（统一登录）移动端的端点与常量。
 *
 * 事实来源：
 *   · 路径与产品级常量来自抓包（2026-10-23 / 2026-10-26 两份 icourse HAR 的
 *     `sdk.reg.163.com` 请求）；
 *   · `p3` 在两份抓包里逐字节相同 → 它是产品级 ACCESS_ID，不是随机数；
 *   · 报文结构与信封算法与公开实现 NEORUAA/MeiloX 的 `NeteaseUrsSmsLogin` 一致
 *     （该实现用于网易云音乐，路径 `/uns/sdk/...` 与本产品相同，产品号不同）。
 *
 * 账号级登录只用于取得 `ursToken`（再经 `ursCellphoneLogin/v1` 换移动端会话），
 * 不做其他任何事。
 */
export const URS_HOSTS = ['sdk.reg.163.com', 'sdk2.reg.163.com'] as const;

/** icourse163 的产品级 ACCESS_ID（抓包中 `p3` 头的值，两份抓包一致）。 */
export const URS_ACCESS_ID = 'b86b0dde87b086504ddbdf31cef6c461';

/** 本产品在 URS 侧的产品标识（网页 bundle 的注册入口与登录页均为 `product=imooc`）。 */
export const URS_PRODUCT = 'imooc';

export const URS_ENDPOINTS = {
  /** 注册安装并领取 appId。请求体 `{sdv:{}}`，响应 `{data:{appId}}`。 */
  init: '/uns/sdk/app/v1/ini',
  /** 账密登录。载荷 `{username, password}` + 设备字段；响应 `{code, data}`（加密）。 */
  passwordLogin: '/uns/sdk/login/mob/pwd/v1/login',
} as const;
