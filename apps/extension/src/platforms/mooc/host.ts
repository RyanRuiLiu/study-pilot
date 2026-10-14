/*
 * 慕课平台需要宿主提供的能力。
 *
 * 平台内部不出现 `browser.*`：谁运行它——扩展、命令行、测试——谁实现这个接口。
 * 这样平台代码与浏览器无关，接第二个平台或脱离浏览器跑都不用改它。
 *
 * 只有这五件事，每件都对应平台内部真实的一处调用；不多留"以后可能用得上"的口子。
 */

import type { NetRuleSet } from '../types.ts';

export interface MoocHost {
  /**
   * 等请求头改写规则生效。
   *
   * 规则由外壳安装（declarativeNetRequest 是外壳的活），平台只说"我需要它们生效了"。
   * 注入而不是 import：平台不该认识外壳的任何模块。
   */
  whenRequestRulesReady: (rules: NetRuleSet[]) => Promise<void>;

  /** 读一个慕课 cookie 的值；没有或读失败都返回空串 */
  readCookie: (name: string) => Promise<string>;

  /** 系统通知中心里现有的通知 id（用于按前缀清理自己发过的旧通知） */
  listNotifications: () => Promise<string[]>;

  /** 清掉一条系统通知 */
  clearNotification: (id: string) => Promise<void>;

  /**
   * 发一条系统通知。
   *
   * id 由调用方给：每次用新 id 才能让系统把它当成新通知弹出来（见 reminder.ts）。
   * 图标由宿主决定——那是宿主的东西，不是平台的。
   */
  showNotification: (id: string, notice: { title: string; message: string }) => Promise<void>;
}
