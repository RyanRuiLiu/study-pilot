/*
 * 宿主能力的浏览器实现。
 *
 * 这是全仓库唯一允许把 `browser.*` 交给平台的地方：平台要的那几件事在这里落地，
 * 平台自己只认 host.ts 里的接口。换宿主（命令行、测试替身）时，实现换这个文件即可。
 */

import type { MoocHost } from '../platforms/mooc/host.ts';

const MOOC_ORIGIN = 'https://www.icourse163.org';
const NOTIFICATION_ICON = '/icon/128.png';

export const browserMoocHost: MoocHost = {
  readCookie: async (name) => {
    try {
      const cookie = await browser.cookies.get({ url: MOOC_ORIGIN, name });
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
      // 清不掉旧通知只是不够干净，不该挡住发送（同 reminder.ts 的判断）
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
