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

import type { HostCapabilities } from '@study-pilot/application';
import type { FetchLike } from '@study-pilot/transport';
import { MOOC_ORIGIN } from '../client.ts';

/**
 * 会话恢复那一次静默 GET 的默认出站环境：全局 fetch。
 *
 * 包一层箭头函数而不是直接拿 `fetch` 当默认值——把全局 fetch 解构出来再调用，
 * 在浏览器里是「Illegal invocation」。（调用方若能给出载体的 fetch，别用这个默认值：
 * 扩展那边要等 Origin 改写规则生效，命令行那边要自己设头。）
 */
const defaultSend: FetchLike = (input, init) => fetch(input, init);

/**
 * 三个 cookie 的名字。**全项目只有这一处写字面量**：读会话、续期时比对、
 * 外壳观察的登录信号，用的都是这一组。改名字只改这里。
 */
export const SESSION_COOKIES = {
  /** 未登录时就有（32 位匿名会话）；`.rpc` 的 csrfKey、DWR 的 httpSessionId */
  token: 'NTESSTUDYSI',
  /** 登录后下发；值里带 userId（`邮箱|8|<userId>|时间戳`） */
  info: 'STUDY_INFO',
  /** 登录后下发；服务端会话。续期成没成，靠它的值变没变判断 */
  sess: 'STUDY_SESS',
} as const;

/**
 * 外壳要观察的登录信号。
 *
 * 为什么是 `STUDY_INFO` 而不是 `NTESSTUDYSI`：后者在访客状态下也会下发（见上面的表），
 * 拿它当信号会在没人登录时补跑一轮——这是实测踩过的坑。
 *
 * domain 是 cookie 查询用的可注册域（不带 www），与 `MOOC_ORIGIN` 同域。
 */
export const LOGIN_COOKIE = { name: SESSION_COOKIES.info, domain: 'icourse163.org' } as const;

export interface MoocSession {
  /** 是否处于登录态 */
  loggedIn: boolean;
  /** 登录用户 id；未登录为 0 */
  userId: number;
  /** 会话令牌（`SESSION_COOKIES.token`）的值；可能为空串 */
  token: string;
}

/** 读一个 cookie。域名是本平台的事实，取值与容错在宿主实现里。 */
function readCookie(host: HostCapabilities, name: string): Promise<string> {
  return host.readCookie(MOOC_ORIGIN, name);
}

/** 解析 STUDY_INFO 得到用户 id。格式不符时返回 0。 */
function parseUserId(studyInfo: string): number {
  const parts = decodeURIComponent(studyInfo).split('|');
  const id = Number(parts[2]);
  return Number.isFinite(id) && id > 0 ? id : 0;
}

async function readSession(host: HostCapabilities): Promise<MoocSession> {
  const [token, studyInfo] = await Promise.all([
    readCookie(host, SESSION_COOKIES.token),
    readCookie(host, SESSION_COOKIES.info),
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
 * 实测确认恢复是服务端行为：
 * 删掉会话 cookie 后只发一次带凭据的 GET，NTESSTUDYSI、STUDY_INFO、
 * STUDY_SESS 三者都会被重新下发，不需要加载页面、不需要执行页面脚本。
 * 所以这里一次静默请求即可，不必打开标签页打扰用户。
 *
 * 只在确实没有会话时才发请求：已经可用时跳过，避免每次读会话都打一次网络。
 *
 * 边界：它只处理「本地 cookie 缺失」这一种失效。cookie 还在而服务端会话
 * 已死的情形由 {@link renewSession} 处理——那里的判据是服务端的表态，
 * 不是本地的 cookie。
 */
export async function ensureSession(
  host: HostCapabilities,
  send: FetchLike = defaultSend,
  origin: string = MOOC_ORIGIN,
): Promise<MoocSession> {
  const current = await readSession(host);
  if (current.loggedIn && current.token) return current;

  try {
    await send(`${origin}/`, { credentials: 'include' });
  } catch {
    // 网络失败就按当前状态返回，由调用方决定怎么提示
    return current;
  }

  return readSession(host);
}

/**
 * 平台会话在服务端已失效。
 *
 * 由数据读取路径在识别出未登录形态（auth 错误）后抛出，编排层捕获它
 * 决定续期重试。它不是给界面看的错误文案——用户该看到的是「已自动恢复」
 * 或「请重新登录」，而不是这句内部描述。
 */
export class SessionExpiredError extends Error {
  constructor() {
    super('平台会话已失效');
    this.name = 'SessionExpiredError';
  }
}

/**
 * 用持久凭证换取一份新会话，并回答「换到没有」。
 *
 * 为什么需要它：`ensureSession` 只在本地 cookie **缺失**时才发起恢复，
 * 而「本地 cookie 还在、服务端会话已死」是另一种真实状态——浏览器长期
 * 驻留（启动加速、后台运行）会让会话级 cookie 活过服务端会话的寿命。
 * 此时按 cookie 存在与否判断登录必然误判，只有让服务端重新表态才有意义。
 *
 * 换发与否不靠猜：服务端重新接受登录时会下发新的 `STUDY_SESS`，
 * 值发生变化即换发成功；值未变说明持久凭证也失效了，只能让用户去登录。
 * 用 cookie 值前后对比而不是读响应头，是因为 `Set-Cookie` 对脚本不可见，
 * 而 cookies API 是扩展本来就持有的权限。
 *
 * 只在已经看到「未登录形态」的响应之后调用。会话本来就活着时调用它，
 * 「未换发」会被误读成「登录失效」——它其实说明不了任何事。
 */
export async function renewSession(
  host: HostCapabilities,
  send: FetchLike = defaultSend,
  origin: string = MOOC_ORIGIN,
): Promise<{ renewed: boolean; session: MoocSession }> {
  const before = await readCookie(host, SESSION_COOKIES.sess);
  try {
    await send(`${origin}/`, { credentials: 'include' });
  } catch {
    return { renewed: false, session: await readSession(host) };
  }
  const after = await readCookie(host, SESSION_COOKIES.sess);
  return { renewed: after !== '' && after !== before, session: await readSession(host) };
}

/** 读取令牌，供后台使用。 */
export function readToken(host: HostCapabilities): Promise<string> {
  return readCookie(host, SESSION_COOKIES.token);
}
