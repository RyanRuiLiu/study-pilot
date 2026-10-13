import { err, ok, type Result } from '@study-pilot/core';
import { aiError, type AiError } from './errors.ts';

/**
 * 归一化用户填写的接口地址。
 *
 * 不内置任何厂商，因此地址完全由用户决定。允许三种写法，最终都落到同一个端点：
 *
 *   https://api.example.com                 → https://api.example.com/v1/chat/completions
 *   https://api.example.com/v1              → https://api.example.com/v1/chat/completions
 *   https://api.example.com/v1/chat/completions → 原样使用
 *
 * 只接受 http/https：其它协议（例如误把文档地址粘进来）在配置阶段就报错，
 * 而不是等请求失败时给出一句读不懂的话。
 */
export function chatEndpoint(baseUrl: string): Result<string, AiError> {
  const trimmed = baseUrl.trim().replace(/\/+$/, '');
  if (!trimmed) return err(aiError('config', '未填写接口地址'));

  if (!/^https?:\/\//i.test(trimmed)) {
    return err(aiError('config', '接口地址必须以 http:// 或 https:// 开头'));
  }
  if (/\/chat\/completions$/i.test(trimmed)) return ok(trimmed);
  if (/\/v\d+$/i.test(trimmed)) return ok(`${trimmed}/chat/completions`);
  return ok(`${trimmed}/v1/chat/completions`);
}

/**
 * 从接口地址取出源（scheme + host）。
 *
 * 用于申请主机权限：用户填了哪个域名，就只申请哪一个。
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
