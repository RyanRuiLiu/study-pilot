import { err, ok, type Result } from '@study-pilot/core';
import { aiError, type AiError } from './errors.ts';

/**
 * 归一化 AI 接口地址。
 *
 * **地址不由用户填写**：扩展侧唯一的来源是 application 的 `AI_BASE_URL`
 * （钉死智谱 `https://open.bigmodel.cn/api/paas/v4`），主机权限在
 * `apps/extension/wxt.config.ts` 的 `host_permissions` 里**静态声明**（安装即授权），
 * 没有「按需申请」那一步。本模块只是把那个固定地址拼成端点，不是多厂商地址解析器；
 * 「补 /v1」这几种拼法留着，是因为 `AI_BASE_URL` 以 `/v4` 结尾，走的正是
 * 「以 `/v<N>` 结尾」那一条分支——换平台时不用改这里。
 *
 * 允许三种写法，最终都落到同一个端点：
 *
 *   https://api.example.com                 → https://api.example.com/v1/chat/completions
 *   https://api.example.com/v1              → https://api.example.com/v1/chat/completions
 *   https://api.example.com/v1/chat/completions → 原样使用
 *
 * 只接受 https：`Authorization: Bearer <密钥>` 走 http 就是明文外送。
 * 现有全部地址（`AI_BASE_URL` 与测试 fixture）都是 https，收紧不改变任何真实行为。
 * 其它协议（例如误把文档地址粘进来）与解析不了的字符串在配置阶段就报错，
 * 而不是等请求失败时给出一句读不懂的话。
 */
export function chatEndpoint(baseUrl: string): Result<string, AiError> {
  const trimmed = baseUrl.trim().replace(/\/+$/, '');
  if (!trimmed) return err(aiError('config', '未填写接口地址'));

  if (!/^https:\/\//i.test(trimmed)) {
    return err(aiError('config', '接口地址必须以 https:// 开头'));
  }

  /*
   * 下面的拼接是纯字符串后缀拼接，前提是地址能被 URL 解析、且末尾没有 query/hash
   * （`AI_BASE_URL` 两者都满足）。带查询串的地址会被拼成 `...?key=1/chat/completions`，
   * 与其发出去等一个 404，不如在这里拒绝。
   */
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return err(aiError('config', '接口地址不是合法的 https 地址'));
  }
  if (url.search || url.hash) {
    return err(aiError('config', '接口地址不能带查询串或锚点'));
  }

  if (/\/chat\/completions$/i.test(trimmed)) return ok(trimmed);
  if (/\/v\d+$/i.test(trimmed)) return ok(`${trimmed}/chat/completions`);
  return ok(`${trimmed}/v1/chat/completions`);
}

/**
 * 从接口地址取出源（scheme + host）。
 *
 * 源只有 `AI_BASE_URL` 那一个，主机权限在清单里静态声明；这里不参与申请，
 * 只把源算出来，供 extension 的 `src/ai/permission.ts` 核对权限此刻在不在
 * （用户可能在扩展详情页把网站访问权限收回）。
 *
 * 协议收窄只在 `chatEndpoint` 做：这里的职责是「算出源」，不判断地址可用与否。
 */
export function chatOrigin(baseUrl: string): string | null {
  try {
    const url = new URL(baseUrl.trim());
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    return url.origin;
  } catch {
    return null;
  }
}
