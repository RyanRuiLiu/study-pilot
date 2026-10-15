/*
 * 配置结构的装配点。
 *
 * 组织方式：平台在顶层，平台下是它自己的设置；跨平台的只剩 version、ai 与 ui。
 * 新增平台时加一个同级的平台键即可，扩展侧功能代码通过 `Settings['mooc']`
 * 这样的具体类型取用，不做通用抽象——通用抽象要等第二个平台真的出现。
 *
 * 各平台的类型与默认值在 `mooc.ts` / `ai.ts`，本文件只做根类型、版本与规范化。
 */

import { DEFAULT_AI, type AiSettings } from './ai.ts';
import { DEFAULT_MOOC, type MoocSettings } from './mooc.ts';
import { DEFAULT_ZHIHUISHU, type ZhihuishuSettings } from './zhihuishu.ts';

export * from './ai.ts';
export * from './mooc.ts';
export * from './zhihuishu.ts';

/** 界面偏好：记住上次停留的 tab（打开设置页/弹窗时回到这里）。 */
export const ACTIVE_TABS = ['general', 'mooc', 'zhihuishu'] as const;
export type ActiveTab = (typeof ACTIVE_TABS)[number];

export interface UiSettings {
  activeTab: ActiveTab;
}

export const DEFAULT_UI: UiSettings = { activeTab: 'mooc' };

export interface Settings {
  version: number;
  mooc: MoocSettings;
  zhihuishu: ZhihuishuSettings;
  ai: AiSettings;
  ui: UiSettings;
}

/**
 * 配置结构版本。
 *
 * 首个发布的结构记作 1。结构发生不兼容变化时递增，届时在 `normalize` 里
 * 补一段迁移——存储里存的是值，没有「用户改过」与「默认填的」之分，
 * 因此默认值的语义变了也要递增。
 *
 * 迁移分支只写已经发生过的：每个版本一段，各自只对带旧形状的存量数据生效。
 * 链条按版本先后串在 `normalize` 里，一段的输出就是下一段的输入。
 *
 * 版本 4：删掉页面内功能的开关（`foreground`）与两个提醒开关
 * （`deadlineReminder` / `completionNotice`）——它们对应的功能已经不在代码里，
 * 键留着只会让界面渲染出一排不起作用的开关。删键不需要搬值：`mergeWithBase`
 * 只保留骨架里存在的键，存量数据里的旧键会被自然丢掉。
 *
 * 版本 5：删掉自动执行那一整套——总开关 `enabled`、四个 auto* 开关、
 * `schedule.checkIntervalMinutes`；课程、互评评语、过期保留天数收进 `mooc` 顶层。
 * 详见 `toManualShape`。
 */
/*
 * 版本 6：`ai.baseUrl` 删除——AI 地址钉死在智谱（见 config/ai.ts 的 AI_BASE_URL）。
 * 旧数据里的 baseUrl 不需要迁移段：合并对着新骨架进行，未知键自然丢弃。
 */
/*
 * 版本 7：新增 `ui.activeTab`（记住上次停留的 tab）。纯新增——
 * 存量数据没有这个键，合并时由新骨架补上默认值（mooc），不需要迁移段；
 * 需要的是取值收敛，见 normalize 里对 ACTIVE_TABS 的核对。
 */
/*
 * 版本 8：新增 `zhihuishu` 平台段（参与任务的共享课列表）。
 * 纯新增，不需要迁移段：存量数据没有这个键，合并时补上空课程表——
 * 「一门课都没勾」本来就是新平台上线时的真实状态，没有需要搬的旧值。
 */
export const SETTINGS_VERSION = 8;

export const DEFAULT_SETTINGS: Settings = {
  version: SETTINGS_VERSION,
  ai: DEFAULT_AI,
  mooc: DEFAULT_MOOC,
  zhihuishu: DEFAULT_ZHIHUISHU,
  ui: DEFAULT_UI,
};

type Json = unknown;

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
 * 版本 4 → 5 的迁移：从「后台自动执行」的形状收到「手动工具箱」的形状。
 *
 * 搬三样用户改过的东西：
 *   mooc.background.courses             → mooc.courses
 *   mooc.background.autoReview.comment  → mooc.reviewComment
 *   schedule.keepOverdueDays            → mooc.keepOverdueDays
 *
 * 其余旧键（enabled、四个 auto* 开关、checkIntervalMinutes）没有去处：
 * 它们对应的行为已经不在代码里。不搬不等于丢掉用户意图——写操作的同意
 * 本来就不该预置在配置里，现在是每次点击表态。
 */
function toManualShape(raw: Json): Json {
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) return raw;
  const source = raw as Record<string, unknown>;

  const mooc = source.mooc;
  if (mooc === null || typeof mooc !== 'object' || Array.isArray(mooc)) return raw;
  const moocRecord = mooc as Record<string, unknown>;
  // 已经是新形状：不动它
  if (!('background' in moocRecord)) return raw;

  const background = moocRecord.background;
  if (background === null || typeof background !== 'object' || Array.isArray(background)) {
    return raw;
  }
  const backgroundRecord = background as Record<string, unknown>;

  const review = backgroundRecord.autoReview;
  const comment =
    review !== null && typeof review === 'object' && !Array.isArray(review)
      ? (review as Record<string, unknown>).comment
      : undefined;

  const schedule = source.schedule;
  const keepOverdueDays =
    schedule !== null && typeof schedule === 'object' && !Array.isArray(schedule)
      ? (schedule as Record<string, unknown>).keepOverdueDays
      : undefined;

  const { background: _removed, ...restMooc } = moocRecord;
  return {
    ...source,
    mooc: {
      ...restMooc,
      courses: backgroundRecord.courses,
      ...(comment !== undefined ? { reviewComment: comment } : {}),
      ...(keepOverdueDays !== undefined ? { keepOverdueDays } : {}),
    },
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
 * 迁移按版本先后串起来：每段只认自己接手的旧形状，输出交给下一段，
 * 最后由 `mergeWithBase` 对着骨架收尾（旧键在这一步被自然丢掉）。
 *
 * 除逐键合并之外，还有两处按语义兜底：
 *   - 互评评语不能为空。合并只做类型检查，而空串是合法的 string，会被原样
 *     采纳——平台在校验时会拒掉空评语，返回的错误却不指明是哪个字段，用户
 *     清空输入框之后就只看到一句「提交失败」。这里留空退回默认评语，设置页
 *     也标注了这一条。
 *   - AI 模型不能为空：留空退回默认（glm-4-flash）。模型空串会让「AI 已启用」
 *     与「生成器可用」互相矛盾——设置页看是开着的，讨论单元却因缺模型进不了计划。
 */
export function normalize(raw: Json): Settings {
  const migrated = toManualShape(migrateScheduleToTopLevel(raw));
  const merged = mergeWithBase(DEFAULT_SETTINGS, migrated);
  const comment = merged.mooc.reviewComment;
  const model = merged.ai.model;
  // 取值收敛：mergeWithBase 只查类型，是字符串就收——野值在这里退回默认
  const activeTab = (ACTIVE_TABS as readonly string[]).includes(merged.ui.activeTab)
    ? merged.ui.activeTab
    : DEFAULT_UI.activeTab;

  return {
    ...merged,
    version: SETTINGS_VERSION,
    ui: { activeTab },
    mooc: {
      ...merged.mooc,
      reviewComment: comment.trim() || DEFAULT_MOOC.reviewComment,
    },
    ai: {
      ...merged.ai,
      model: model.trim() || DEFAULT_AI.model,
    },
  };
}
