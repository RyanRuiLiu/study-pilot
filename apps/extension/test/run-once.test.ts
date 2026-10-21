/*
 * 执行一轮的结果落定：重读清单失败也不能把按钮留在禁用态。
 *
 * 流程是「先说结果 → 再重读 → 复位按钮」。重读是网络往返，失败时如果
 * 直接抛出，setEnabled(true) 永远走不到：按钮一直是灰的，只能重开页面。
 */

import { describe, expect, it, vi } from 'vitest';

const bridge = vi.hoisted(() => ({
  sendToBackground: vi.fn(),
  REJECTION_MESSAGES: { ALREADY_RUNNING: '正在执行，稍后再试' },
}));

vi.mock('../src/messages.ts', () => bridge);

const { runNow } = await import('../src/browser/run-once.ts');

function handles(refresh: () => Promise<void>) {
  const setStatus = vi.fn();
  const setEnabled = vi.fn();
  return { setStatus, setEnabled, refresh };
}

describe('runNow 的收尾', () => {
  it('重读失败：结果句照常写出，按钮仍复位，不抛异常', async () => {
    bridge.sendToBackground.mockResolvedValueOnce({ ok: true, done: 1, manual: 0, failed: [] });
    const h = handles(async () => {
      throw new Error('重读失败');
    });

    await expect(runNow(h, { platformId: 'mooc' })).resolves.toBeUndefined();

    expect(h.setStatus).toHaveBeenLastCalledWith('完成 1 项', 'idle');
    expect(h.setEnabled.mock.calls).toEqual([[false], [true]]);
  });

  it('并发被拒不算错误色：沿用拒因的通用措辞', async () => {
    bridge.sendToBackground.mockResolvedValueOnce({ ok: false, reason: 'ALREADY_RUNNING' });
    const h = handles(async () => undefined);

    await runNow(h, { platformId: 'zhihuishu' });

    expect(h.setStatus).toHaveBeenLastCalledWith('正在执行，稍后再试', 'idle');
    expect(h.setEnabled.mock.calls).toEqual([[false], [true]]);
  });
});
