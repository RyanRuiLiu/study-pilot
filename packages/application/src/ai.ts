/*
 * 配置能不能支撑文本生成。
 *
 * 放在应用层而不是扩展侧：计划层要用它判断「讨论单元进不进计划」，而计划层
 * 属于厂商适配器、不认识扩展。判据本身是纯的——只看配置，不碰网络与存储。
 */

import type { Settings } from './config/index.ts';

/** 设置里是否已经填齐 AI 的必要信息。计划层与生成器共用这一处判断。 */
export function hasTextGenerator(settings: Settings): boolean {
  const { enabled, baseUrl, model, apiKey } = settings.ai;
  return enabled && baseUrl.trim() !== '' && model.trim() !== '' && apiKey.trim() !== '';
}
