/*
 * 移动端会话的载体存储。
 *
 * storage.session 只在内存里，浏览器关闭即清，不落盘；但能跨 service worker
 * 重启复用同一枚 mob-token，避免每次回收都重新登录、把另一台设备顶掉。
 */

import { browser } from 'wxt/browser';

const KEY = 'studyPilotMoocMobileSession';

export const mobileSessionStore = {
  async load(): Promise<string | null> {
    const stored = await browser.storage.session.get(KEY);
    const value = stored[KEY];
    return typeof value === 'string' ? value : null;
  },
  async save(token: string): Promise<void> {
    await browser.storage.session.set({ [KEY]: token });
  },
  async clear(): Promise<void> {
    await browser.storage.session.remove(KEY);
  },
};
