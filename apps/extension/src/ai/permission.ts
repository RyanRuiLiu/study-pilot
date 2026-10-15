/*
 * AI 主机权限的实测。
 *
 * 智谱的源在清单里**静态声明**（wxt.config.ts 的 host_permissions，安装即授权），
 * 因此不再有「按需申请」那一步。但权限仍可能不在：用户可以在扩展详情页把
 * 「网站访问权限」收回（或设为「点击时」），那时网络层会直接拒发——计划与
 * 界面需要知道这件事，不然讨论单元会以「每轮都失败」的形态进队列。
 *
 * 这里只做**只读核对**，不触发任何申请；设置页与执行前的计划判断都走这一处。
 */

import { chatOrigin } from '@study-pilot/ai';
import { AI_BASE_URL, hasTextGenerator, type Settings } from '@study-pilot/application';

/** 智谱的源。从 AI_BASE_URL 推出，保证与请求实际发出的源一致。 */
const AI_ORIGIN = chatOrigin(AI_BASE_URL);
if (AI_ORIGIN === null) {
  // 常量自己坏了就整个炸掉，别让一个错地址悄悄降级成「没有权限」
  throw new Error(`AI_BASE_URL 不是合法地址：${AI_BASE_URL}`);
}

/** 此刻是否持有对智谱的主机权限（不触发申请）。 */
export async function hasAiHostPermission(): Promise<boolean> {
  if (typeof browser === 'undefined' || !browser.permissions) return false;
  return await browser.permissions.contains({ origins: [`${AI_ORIGIN}/*`] });
}

/**
 * AI 文本能力此刻是否真的可用：设置齐（启用/模型/密钥）**且**权限在。
 *
 * 计划、待办摘要与课件摘要共用这一个判断——「设置齐」不等于「此刻可用」，
 * 权限被收回时讨论单元不该进执行队列（进了必失败），而是按需人工呈现。
 */
export async function aiTextAvailable(settings: Settings): Promise<boolean> {
  if (!hasTextGenerator(settings)) return false;
  return await hasAiHostPermission();
}
