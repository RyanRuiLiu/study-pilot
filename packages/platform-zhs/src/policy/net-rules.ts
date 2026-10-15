/*
 * 智慧树需要的请求头改写规则：**一条都不需要**。
 *
 * 与慕课的差别是实测事实（2026-10-16）：智慧树接口接受来自扩展 Service Worker
 * 的直连请求——离线复刻的签名 + `credentials:'include'` 发出，studyservice-api
 * 与 appcomm-user 均返回 200（见 .probe/zhs-src/sw-test.mjs 的验证），
 * 无需把 Origin/Referer 改写成页面来源。
 *
 * 这个空数组是**声明**而不是省略：规则安装是全量替换的，每个平台都必须
 * 交出自己的那一份（见 PlatformWiring.requestRules 的说明），
 * 忘了声明的平台会把别人的规则一起清掉。
 */

import type { NetRuleSet } from '@study-pilot/application';

export const ZHS_REQUEST_RULES: NetRuleSet[] = [];
