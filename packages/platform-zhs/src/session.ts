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
 * cookie 作用域是 `.zhihuishu.com`（任何子域读到的是同一枚），这里以 www 页
 * 作为读取锚点；读不到返回空串——宿主能力的约定，见扩展侧 capabilities.ts。
 */

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

/** CASLOGC 的读取锚点：cookie 落在 .zhihuishu.com，任何子域等价。 */
const SESSION_ORIGIN = 'https://www.zhihuishu.com';

/**
 * 判据（形态来自 2026-10-17 对真实 cookie 的实测）：
 *   · cookie 不存在 → 未登录；
 *   · cookie 值是 **URL 编码**的 JSON（真实观测：`%7B%22realName%22%3A...`），
 *     先 decodeURIComponent 再解析；解码后不是 JSON / uuid 缺失或不是非空字符串
 *     → 未登录（不拿别的字段凑数）。
 */
export async function readSession(readCookie: CookieReader): Promise<ZhsSession> {
  const raw = await readCookie(SESSION_ORIGIN, 'CASLOGC');
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
