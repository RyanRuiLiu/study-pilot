/*
 * 宿主能力的浏览器实现。
 *
 * 全仓库唯一允许把 `browser.*` 当作"宿主能力"交出去的地方：平台要的那几件事在这里落地。
 * 它不认识任何平台——cookie 的域名由调用方给。换宿主（命令行、测试）时换这个文件即可。
 */

import type { HostCapabilities } from '../platforms/types.ts';
import { whenNetRulesReady } from './net-rules.ts';

const NOTIFICATION_ICON = '/icon/128.png';

export const browserCapabilities: HostCapabilities = {
  whenRequestRulesReady: (rules) => whenNetRulesReady(rules),

  readCookie: async (origin, name) => {
    try {
      const cookie = await browser.cookies.get({ url: origin, name });
      return cookie?.value ?? '';
    } catch {
      return '';
    }
  },

  listNotifications: async () => {
    try {
      return Object.keys(await browser.notifications.getAll());
    } catch {
      return [];
    }
  },

  clearNotification: async (id) => {
    try {
      await browser.notifications.clear(id);
    } catch {
      // 清不掉旧通知只是不够干净，不该挡住发送
    }
  },

  showNotification: async (id, notice) => {
    await browser.notifications.create(id, {
      type: 'basic',
      iconUrl: browser.runtime.getURL(NOTIFICATION_ICON),
      title: notice.title,
      message: notice.message,
    });
  },
};
