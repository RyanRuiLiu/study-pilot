/*
 * 设置迁移的测试。
 *
 * 版本 1 → 2 把得分指导的设置键由 homeworkAnswers 改成 guidance。
 * 这类迁移只有在**存量数据**上才看得出来对不对，而它错了的表现是
 * 「用户关掉的功能自己开了」——不报错、也不会有日志，因此必须钉住。
 */

import { describe, expect, it } from 'vitest';
/*
 * 从 schema 直接导入，不走 settings 的 barrel：后者会连带 storage.ts，
 * 而它顶层就建立存储项、读 browser.runtime，测试环境里必然抛错
 * （这一点 schema/index.ts 的文件头写着，我第一版正是踩了它）。
 */
import { DEFAULT_SETTINGS, SETTINGS_VERSION, normalize } from '../src/settings/schema/index.ts';

describe('版本 1 → 2 的设置迁移', () => {
  it('旧键的值搬到新键上，用户关掉的功能不会自己打开', () => {
    const settings = normalize({
      version: 1,
      mooc: { foreground: { homeworkAnswers: { enabled: false } } },
    });

    expect(settings.mooc.foreground.guidance.enabled).toBe(false);
    // 迁移后的对象里不该再留着旧键
    expect('homeworkAnswers' in settings.mooc.foreground).toBe(false);
  });

  it('两键同时存在时以新键为准', () => {
    const settings = normalize({
      mooc: { foreground: { homeworkAnswers: { enabled: false }, guidance: { enabled: true } } },
    });
    expect(settings.mooc.foreground.guidance.enabled).toBe(true);
  });

  it('没有旧键时用默认值', () => {
    const settings = normalize({});
    expect(settings.mooc.foreground.guidance.enabled).toBe(
      DEFAULT_SETTINGS.mooc.foreground.guidance.enabled,
    );
    expect(settings.version).toBe(SETTINGS_VERSION);
  });

  it('归一化后的版本号总是当前版本', () => {
    expect(normalize({ version: 1 }).version).toBe(SETTINGS_VERSION);
    expect(normalize({ version: 99 }).version).toBe(SETTINGS_VERSION);
  });

  it('形状不对的输入不炸，退回默认值', () => {
    expect(normalize(null).mooc.foreground.guidance.enabled).toBe(true);
    expect(normalize('nonsense').mooc.foreground.guidance.enabled).toBe(true);
    expect(normalize({ mooc: { foreground: 'nonsense' } }).mooc.foreground.guidance.enabled).toBe(
      true,
    );
  });
});

/*
 * 版本 2 → 3：调度配置由 `mooc.background.schedule` 提升到顶层。
 *
 * 必须搬旧值：间隔与保留天数是用户实际调过的，不搬就会静默回到默认值，
 * 而这两个值直接影响「什么时候发请求」和「还报不报过期项」。
 */
describe('版本 2 → 3 的设置迁移', () => {
  const legacy = { version: 2, mooc: { background: { schedule: { checkIntervalMinutes: 7, keepOverdueDays: 0 } } } };

  it('旧位置的调度值搬到顶层，用户调过的值不丢', () => {
    const settings = normalize(legacy);
    expect(settings.schedule).toEqual({ checkIntervalMinutes: 7, keepOverdueDays: 0 });
    expect('schedule' in settings.mooc.background).toBe(false);
  });

  it('顶层已有调度配置时以它为准', () => {
    const settings = normalize({
      ...legacy,
      schedule: { checkIntervalMinutes: 11, keepOverdueDays: 5 },
    });
    expect(settings.schedule).toEqual({ checkIntervalMinutes: 11, keepOverdueDays: 5 });
  });

  it('没有旧键时用默认值', () => {
    expect(normalize({}).schedule).toEqual(DEFAULT_SETTINGS.schedule);
    expect(normalize(null).schedule.checkIntervalMinutes).toBe(30);
  });
});
