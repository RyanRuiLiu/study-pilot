/*
 * 设置迁移的测试。
 *
 * 迁移只有在**存量数据**上才看得出来对不对，而它错了的表现是
 * 「用户调过的值静默回到默认」——不报错、也不会有日志，因此必须钉住。
 */

import { describe, expect, it } from 'vitest';
/*
 * 从包的入口直接导入，不走扩展侧 settings 的门：后者会连带 storage.ts，
 * 而它顶层就建立存储项、读 browser.runtime，测试环境里必然抛错。
 */
import { DEFAULT_MOOC, DEFAULT_SETTINGS, normalize } from '../src/index.ts';

/*
 * 版本 2 → 5：两段迁移连着跑。版本 2 的存量数据是最老的形状
 * （调度配置还挂在 `mooc.background.schedule` 下面），必须一路走到当前形状，
 * 用户调过的值一个都不丢。
 */
describe('版本 2 的存量数据（两段迁移连着跑）', () => {
  const legacy = {
    version: 2,
    enabled: false,
    mooc: {
      background: {
        schedule: { checkIntervalMinutes: 7, keepOverdueDays: 0 },
        courses: [{ termId: 123, name: '电路', enabled: true }],
        autoReview: { enabled: true, comment: '先搬后丢' },
      },
    },
  };

  it('用户调过的三个值都活着走到新位置', () => {
    const settings = normalize(legacy);
    expect(settings.mooc.keepOverdueDays).toBe(0);
    expect(settings.mooc.reviewComment).toBe('先搬后丢');
    expect(settings.mooc.courses).toHaveLength(1);
    expect(settings.mooc.courses[0].termId).toBe(123);
  });

  it('没有去处的旧键一个都不留', () => {
    const settings = normalize(legacy);
    expect('enabled' in settings).toBe(false);
    expect('schedule' in settings).toBe(false);
    expect('background' in settings.mooc).toBe(false);
  });
});

/*
 * 版本 4 → 5：从「后台自动执行」收到「手动工具箱」。
 *
 * 必须搬的只有三样用户改过的东西：课程、评语、过期保留天数。
 * 四个 auto* 开关与总开关没有去处——它们服务的自动执行已经不在代码里。
 */
describe('版本 4 → 5 的设置迁移', () => {
  const legacy = {
    version: 4,
    enabled: true,
    mooc: {
      background: {
        autoCourseware: { enabled: true },
        autoQuiz: { enabled: true },
        autoReview: { enabled: true, comment: '完成得不错' },
        autoSelfEvaluate: { enabled: false },
        courses: [{ termId: 7, name: '模拟电子技术', enabled: true }],
      },
    },
    schedule: { checkIntervalMinutes: 11, keepOverdueDays: 5 },
  };

  it('评语、保留天数、课程都按新位置落座', () => {
    const settings = normalize(legacy);
    expect(settings.mooc.reviewComment).toBe('完成得不错');
    expect(settings.mooc.keepOverdueDays).toBe(5);
    expect(settings.mooc.courses[0].termId).toBe(7);
  });

  it('自动执行与总开关没有去处，也不留残键', () => {
    const settings = normalize(legacy);
    expect('enabled' in settings).toBe(false);
    expect('schedule' in settings).toBe(false);
    expect('background' in settings.mooc).toBe(false);
    expect(Object.keys(settings.mooc).sort()).toEqual(['courses', 'keepOverdueDays', 'reviewComment']);
  });

  it('评语缺失时退回默认那句（与 normalize 的兜底一致）', () => {
    const settings = normalize({
      ...legacy,
      mooc: { background: { ...legacy.mooc.background, autoReview: { enabled: true } } },
    });
    expect(settings.mooc.reviewComment).toBe(DEFAULT_MOOC.reviewComment);
  });
});

describe('没有旧键时的默认值', () => {
  it('空数据拿默认值', () => {
    expect(normalize({}).mooc).toEqual(DEFAULT_SETTINGS.mooc);
    expect(normalize(null).mooc.keepOverdueDays).toBe(3);
  });
});

describe('版本 6：AI 地址钉死在智谱', () => {
  it('存量数据里自填的接口地址被丢弃——地址已固定，不再由用户提供', () => {
    const out = normalize({
      version: 5,
      ai: { enabled: true, baseUrl: 'https://api.example.com/v1', model: 'glm-4-flash', apiKey: 'k' },
    });
    expect('baseUrl' in out.ai).toBe(false);
    expect(out.version).toBe(7);
  });

  it('模型留空退回默认（glm-4-flash）——空模型会让「已启用」与「生成器可用」互相矛盾', () => {
    const out = normalize({ version: 5, ai: { enabled: true, baseUrl: '', model: '', apiKey: 'k' } });
    expect(out.ai.model).toBe('glm-4-flash');
    expect(out.ai.apiKey).toBe('k');
  });
});

/*
 * 版本 7：新增 `ui.activeTab`（记住上次停留的 tab）。
 * 纯新增，不需要迁移段；但取值是有限的，规范化必须把野值收敛回默认——
 * mergeWithBase 只查类型，`{'activeTab': 'weibo'}` 这种字符串它照收。
 */
describe('版本 7 新增的 ui.activeTab', () => {
  it('存量数据没有这个键时补默认值 mooc', () => {
    const settings = normalize({ version: 6, mooc: {}, ai: {} });
    expect(settings.ui.activeTab).toBe('mooc');
  });

  it('非法取值收敛回默认', () => {
    const settings = normalize({ ui: { activeTab: 'weibo' } });
    expect(settings.ui.activeTab).toBe('mooc');
  });

  it('合法取值原样保留', () => {
    const settings = normalize({ ui: { activeTab: 'zhihuishu' } });
    expect(settings.ui.activeTab).toBe('zhihuishu');
  });
});
