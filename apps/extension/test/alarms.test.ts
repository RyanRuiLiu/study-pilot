/*
 * 周期检查的安装与重建（`background/runtime/alarms.ts`）。
 *
 * 钉住一条官方文档写明的行为：同名再 `create` 会**取消旧的并重新计时**。
 * 后台每次被唤醒都会调用 ensureAlarm（闹钟、启动、装扩展、改设置都算一次），
 * 所以无条件重建等于让「醒得比检查间隔更频繁」的浏览器永远推后这次检查——
 * 表现是定时检查看起来装了却从不触发，而界面上没有任何异常。
 *
 * 浏览器 API 用 WXT 官方的内存实现（fakeBrowser，见 vitest.config.ts），
 * 设置走真实的读写路径：这里要验的正是「设置里的间隔落到定时器上」。
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fakeBrowser } from 'wxt/testing/fake-browser';
import { clearAlarm, ensureAlarm, isCheckAlarm } from '../src/background/runtime/alarms';
import { updateSettings } from '../src/settings';

/** 取出我们那一个 alarm；没装就是 undefined。 */
async function ourAlarm() {
  return await fakeBrowser.alarms.get('study-pilot-check');
}

beforeEach(async () => {
  fakeBrowser.reset();
  await updateSettings({ schedule: { checkIntervalMinutes: 30, keepOverdueDays: 3 } });
});

describe('周期检查', () => {
  it('装好之后按设置里的间隔定时', async () => {
    await ensureAlarm();

    const alarm = await ourAlarm();
    expect(alarm?.name).toBe('study-pilot-check');
    expect(alarm?.periodInMinutes).toBe(30);
  });

  it('已经装好且间隔没变时不重建：重建会把周期重新计时', async () => {
    await ensureAlarm();
    const create = vi.spyOn(fakeBrowser.alarms, 'create');

    // 后台被唤醒一次的等价物
    await ensureAlarm();
    await ensureAlarm();

    expect(create).not.toHaveBeenCalled();
    expect((await ourAlarm())?.periodInMinutes).toBe(30);
  });

  it('用户改过间隔之后，下一次调用把定时器换到新间隔', async () => {
    await ensureAlarm();

    await updateSettings({ schedule: { checkIntervalMinutes: 10 } });
    await ensureAlarm();

    expect((await ourAlarm())?.periodInMinutes).toBe(10);
  });

  it('关掉总开关时清掉定时器，不再空转唤醒后台', async () => {
    await ensureAlarm();

    await clearAlarm();

    expect(await ourAlarm()).toBeUndefined();
  });

  it('只认我们自己的 alarm 名', () => {
    expect(isCheckAlarm({ name: 'study-pilot-check' })).toBe(true);
    expect(isCheckAlarm({ name: 'other-extension-check' })).toBe(false);
  });
});
