/*
 * 慕课需要的请求头改写规则（平台事实）。
 *
 * 规则本身由外壳安装（declarativeNetRequest 是外壳的活），这里给出「哪些域名、
 * 哪两条路径」，以及它为什么长这样（平台事实，见 docs/platforms/mooc.md 的请求头一节）。
 *
 * 平台为什么需要这条规则（实测对比）：
 *
 *   service worker 发的请求   Origin: chrome-extension://<id>        -> 403
 *   页面上下文发的请求         Origin: https://www.icourse163.org   -> 200
 *
 * 同一接口、同一签名、同一请求体，差别只在 Origin；服务端对扩展来源一律拒绝。
 *
 *
 * 两条路径都要覆盖：
 *   /web/j/      .rpc 接口
 *   /dwr/call/   DWR 接口（互评、待办等走这条）
 * 只覆盖其一的话，另一类请求仍会被 403 拒掉。
 */

import { MOOC_ORIGIN } from '../client.ts';
import type { NetRuleSet } from '@study-pilot/application';

export const MOOC_REQUEST_RULES: NetRuleSet[] = [
  { origin: MOOC_ORIGIN, paths: ['/web/j/', '/dwr/'] },
];
