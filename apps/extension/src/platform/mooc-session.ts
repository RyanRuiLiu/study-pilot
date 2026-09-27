/**
 * MOOC 会话凭证。
 *
 * 三个 cookie 的分工（已实测确认）：
 *
 * | cookie | 下发时机 | 用途 |
 * |---|---|---|
 * | `NTESSTUDYSI` | **未登录时就有**（32 位匿名会话） | `.rpc` 的 `csrfKey`、DWR 的 `httpSessionId` |
 * | `STUDY_INFO` | 登录后 | 用户 id |
 * | `STUDY_SESS` | 登录后 | 服务端会话 |
 *
 * 两个容易混淆的点：
 *
 * 1. **不能拿 `NTESSTUDYSI` 判断登录**。它在访客状态下也存在，
 *    有值只说明服务端给过一个匿名会话。
 * 2. `STUDY_INFO` 的值是管道分隔的 `邮箱|8|<userId>|时间戳`，第三段是用户 id。
 *    该格式由 `getQuizInfo` 返回的 `answererId` 交叉验证过（两处一致）。
 */

export const MOOC_ORIGIN = 'https://www.icourse163.org';

export interface MoocSession {
  /** 是否处于登录态 */
  loggedIn: boolean;
  /** 登录用户 id；未登录为 0 */
  userId: number;
  /** NTESSTUDYSI 的值；可能为空串 */
  token: string;
}

async function readCookie(name: string): Promise<string> {
  try {
    const cookie = await browser.cookies.get({ url: MOOC_ORIGIN, name });
    return cookie?.value ?? '';
  } catch {
    return '';
  }
}

/** 解析 STUDY_INFO 得到用户 id。格式不符时返回 0。 */
export function parseUserId(studyInfo: string): number {
  const parts = decodeURIComponent(studyInfo).split('|');
  const id = Number(parts[2]);
  return Number.isFinite(id) && id > 0 ? id : 0;
}

export async function readSession(): Promise<MoocSession> {
  const [token, studyInfo] = await Promise.all([
    readCookie('NTESSTUDYSI'),
    readCookie('STUDY_INFO'),
  ]);
  const userId = parseUserId(studyInfo);
  return { loggedIn: userId > 0, userId, token };
}

/**
 * 恢复会话。
 *
 * 背景：NTESSTUDYSI 与 STUDY_INFO 都是**会话级** cookie，正常关闭浏览器
 * 就会消失；而 NTESSTUDYSI 是所有接口的 csrfKey，没有它连一个请求都发不出去。
 * 平台上还留着两个持久 cookie（NTES_YD_PASSPORT 记住我、STUDY_PERSIST 持久登录），
 * 但服务端只会在收到请求时才用它们换回会话。
 *
 * 于是出现这样的现象：装好扩展后点「读取课程列表」报「非法跨域请求」，
 * 登录状态也显示未登录；随手打开一次 MOOC 网页，再回来就一切正常——
 * 那次访问替扩展完成了会话恢复。
 *
 * 实测（scripts/probe/checks/test-session-refresh.mjs）确认恢复是服务端行为：
 * 删掉会话 cookie 后只发一次带凭据的 GET，NTESSTUDYSI、STUDY_INFO、
 * STUDY_SESS 三者都会被重新下发，不需要加载页面、不需要执行页面脚本。
 * 所以这里一次静默请求即可，不必打开标签页打扰用户。
 *
 * 只在确实没有会话时才发请求：已经可用时跳过，避免每次读会话都打一次网络。
 */
export async function ensureSession(): Promise<MoocSession> {
  const current = await readSession();
  if (current.loggedIn && current.token) return current;

  try {
    await fetch(`${MOOC_ORIGIN}/`, { credentials: 'include' });
  } catch {
    // 网络失败就按当前状态返回，由调用方决定怎么提示
    return current;
  }

  return readSession();
}

/** 读取令牌，供后台使用。 */
export function readToken(): Promise<string> {
  return readCookie('NTESSTUDYSI');
}

// ---------- 内容脚本的读取方式 ----------
//
// browser.cookies 在内容脚本中不可用，该 API 只在后台与弹窗页面可用。
// 而 NTESSTUDYSI 的 httpOnly 为 false，实测在已登录状态下同样可被页面脚本读取，
// 因此内容脚本直接读 document.cookie 即可，不需要经后台中转。
//
// 这条路径已经取代了上一代的「统一经 background 获取令牌」设计，
// 那个设计建立在一个不成立的前提上（见 docs/platforms/mooc.md 第 3 节）。

function readCookieFromDocument(name: string): string {
  const pattern = new RegExp(`(?:^|;\\s*)${name}=([^;]*)`);
  const match = document.cookie.match(pattern);
  return match ? decodeURIComponent(match[1]) : '';
}

/** 从 document.cookie 读取 NTESSTUDYSI。 */
export function readTokenFromDocument(): string {
  return readCookieFromDocument('NTESSTUDYSI');
}

/** 从 document.cookie 读取登录用户 id，未登录返回 0。 */
export function readUserIdFromDocument(): number {
  return parseUserId(readCookieFromDocument('STUDY_INFO'));
}
