/*
 * 配置结构的装配点。
 *
 * 组织方式：平台在顶层，平台下分「前台」（页面内生效）与「后台」（与页面无关的任务）。
 * 新增平台时加一个同级的平台键即可，扩展侧功能代码通过 `Settings['mooc']` 这样的
 * 具体类型取用，不做通用抽象——只有一个平台时，通用抽象是负担不是资产。
 *
 * 安全默认按「是不是自动做」划线：
 * 后台任务在检查时自己就动了（`autoQuiz` / `autoReview` / `autoSelfEvaluate` /
 * `autoCourseware`），一律默认关闭；前台功能要有人打开页面、再动手才会发生
 * （`foreground`），默认打开。只读的提醒（`deadlineReminder` / `completionNotice`）
 * 也默认打开，装上就能用。
 *
 * 各平台的类型与默认值在 `mooc.ts` / `ai.ts`，本文件只做根类型、版本与规范化。
 */

import { DEFAULT_AI, type AiSettings } from './ai.ts';
import { DEFAULT_MOOC, type MoocSettings } from './mooc.ts';
import { DEFAULT_SCHEDULE, type ScheduleSettings } from './schedule.ts';

export * from './ai.ts';
export * from './mooc.ts';
export * from './schedule.ts';

export interface Settings {
  version: number;
  /** 总开关。关闭后前台增强与后台任务都停止 */
  enabled: boolean;
  mooc: MoocSettings;
  ai: AiSettings;
  /**
   * 调度（跨平台）：多久检查一次、过期项保留几天。
   * 从 `mooc.background.schedule` 提升上来，见下面的迁移。
   */
  schedule: ScheduleSettings;
}

/**
 * 配置结构版本。
 *
 * 首个发布的结构记作 1。结构发生不兼容变化时递增，届时在 `normalize` 里
 * 补一段迁移——存储里存的是值，没有「用户改过」与「默认填的」之分，
 * 因此默认值的语义变了也要递增。
 *
 * 迁移分支只写已经发生过的：每个版本一段，各自只对带旧形状的存量数据生效。
 */
export const SETTINGS_VERSION = 3;

export const DEFAULT_SETTINGS: Settings = {
  version: SETTINGS_VERSION,
  /**
   * 总开关默认打开。
   *
   * 装上之后什么都不做会让人以为没生效。而它下面每个写操作各自默认关闭，
   * 所以开着也不会替用户做任何事 —— 打开它只是让只读的提醒开始工作。
   */
  enabled: true,
  ai: DEFAULT_AI,
  mooc: DEFAULT_MOOC,
  schedule: DEFAULT_SCHEDULE,
};

type Json = unknown;

/**
 * 版本 1 → 2 的迁移：得分指导的设置键由 `homeworkAnswers` 改名为 `guidance`。
 *
 * 为什么必须搬旧值：不搬的话，新键取默认值（开启），而用户此前可能明确关过它——
 * 于是界面文案会自己冒出来。这是**改平台数据的开关**的近亲，静默改掉比报错更糟。
 *
 * 只做一次：迁移之后旧键不再出现在代码里，这段也只对带旧键的存量数据生效。
 * 这里保留旧键的字面量，是因为它正是要被读出来的那个东西。
 */
function migrateGuidanceKey(raw: Json): Json {
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) return raw;
  const source = raw as Record<string, unknown>;
  const mooc = source.mooc;
  if (mooc === null || typeof mooc !== 'object' || Array.isArray(mooc)) return raw;

  const moocRecord = mooc as Record<string, unknown>;
  const foreground = moocRecord.foreground;
  if (foreground === null || typeof foreground !== 'object' || Array.isArray(foreground)) {
    return raw;
  }

  const foregroundRecord = foreground as Record<string, unknown>;
  if (!('homeworkAnswers' in foregroundRecord) || 'guidance' in foregroundRecord) return raw;

  const { homeworkAnswers, ...rest } = foregroundRecord;
  return { ...source, mooc: { ...moocRecord, foreground: { ...rest, guidance: homeworkAnswers } } };
}

/**
 * 版本 2 → 3 的迁移：调度配置由 `mooc.background.schedule` 提升到顶层。
 *
 * 为什么不搬旧值：间隔与保留天数是用户实际调过的（有人会调小间隔、把保留天数设 0），
 * 不搬就会静默回到默认值——而这两个值直接影响「什么时候发请求」和「还报不报过期项」。
 */
function migrateScheduleToTopLevel(raw: Json): Json {
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) return raw;
  const source = raw as Record<string, unknown>;
  // 已经是新形状：不动它
  if ('schedule' in source) return raw;

  const mooc = source.mooc;
  if (mooc === null || typeof mooc !== 'object' || Array.isArray(mooc)) return raw;
  const moocRecord = mooc as Record<string, unknown>;

  const background = moocRecord.background;
  if (background === null || typeof background !== 'object' || Array.isArray(background)) {
    return raw;
  }
  const backgroundRecord = background as Record<string, unknown>;

  const legacy = backgroundRecord.schedule;
  if (legacy === null || typeof legacy !== 'object' || Array.isArray(legacy)) return raw;

  const { schedule: _moved, ...restBackground } = backgroundRecord;
  return {
    ...source,
    schedule: legacy,
    mooc: { ...moocRecord, background: restBackground },
  };
}

/**
 * 以 `base` 为骨架合并 `patch`。
 *
 * - 对象：逐键递归，只保留 `base` 里存在的键
 * - 数组：整体替换（课程列表是用户数据，不做逐项合并）
 * - 原始值：类型一致才采纳
 *
 * 放在这里而不是 storage.ts：这是纯逻辑，测试要能直接调它。
 * storage.ts 顶层会建立存储项，导入即读 browser.runtime，
 * 测试环境里会直接抛错，纯逻辑跟着一起就不可测了。
 */
export function mergeWithBase<T>(base: T, patch: Json): T {
  if (patch === null || patch === undefined) return base;

  if (Array.isArray(base)) {
    return (Array.isArray(patch) ? patch : base) as T;
  }

  if (typeof base === 'object' && base !== null) {
    if (typeof patch !== 'object' || patch === null || Array.isArray(patch)) return base;
    const source = patch as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(base as Record<string, unknown>)) {
      out[key] = mergeWithBase(value, source[key]);
    }
    return out as T;
  }

  return (typeof patch === typeof base ? patch : base) as T;
}

/**
 * 把任意来源的数据规范成合法配置。
 *
 * 除逐键合并之外，还有一处按语义兜底：互评评语不能为空。
 * 合并只做类型检查，而空串是合法的 string，会被原样采纳——平台在校验时
 * 会拒掉空评语，返回的错误却不指明是哪个字段，用户清空输入框之后就只看到
 * 一句「提交失败」。这里留空退回默认评语，设置页也标注了这一条。
 */
export function normalize(raw: Json): Settings {
  const merged = mergeWithBase(DEFAULT_SETTINGS, migrateScheduleToTopLevel(migrateGuidanceKey(raw)));
  const review = merged.mooc.background.autoReview;

  return {
    ...merged,
    version: SETTINGS_VERSION,
    mooc: {
      ...merged.mooc,
      background: {
        ...merged.mooc.background,
        autoReview: {
          ...review,
          comment: review.comment.trim() || DEFAULT_MOOC.background.autoReview.comment,
        },
      },
    },
  };
}
