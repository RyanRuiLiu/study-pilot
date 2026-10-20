/*
 * @study-pilot/application：载体无关的应用层。
 *
 * 三块内容，各自一件事：
 *   model.ts   模型：换载体、换平台都不变的形状
 *   ports.ts   端口：应用与载体之间的唯一接口
 *   ai.ts      AI 能力的形状与默认值（生成器端口、默认模型）
 *   config/    配置：形状、默认值、规范化与迁移（纯逻辑，不碰存储）
 *   state.ts   跨次运行状态的判据与迁移
 *   progress.ts 执行进度的迁移
 *   round.ts   「跑一轮」用例（调用方给类别与课程范围，无自动触发）
 *
 * 本包不认识浏览器、不认识 Node、不认识任何厂商：`browser.` / `window.` / `wxt`
 * 或任何厂商名字出现在这里即为越界。这条边界要机械核对，不靠人记。
 */
export * from './model.ts';
export * from './ai.ts';
export * from './state.ts';
export * from './progress.ts';
export * from './round.ts';
export * from './ports.ts';
/*
 * config 这一段逐个列名，不用 `export *`：`ACTIVE_TABS` 只是 normalize 收敛
 * `ui.activeTab` 取值时的内部依据（界面上的 tab 由扩展自己列），包外没有消费者，
 * 就不跟着进对外面。新增配置项要对外时得在这里补一行——收紧面就是要人工确认过。
 */
export type {
  ActiveTab,
  AiSettings,
  MoocSettings,
  SelectedCourse,
  Settings,
  UiSettings,
  ZhihuishuCourse,
  ZhihuishuSettings,
} from './config/index.ts';
export {
  AI_BASE_URL,
  AI_DEFAULT_MODEL,
  DEFAULT_AI,
  DEFAULT_MOOC,
  DEFAULT_SETTINGS,
  DEFAULT_UI,
  DEFAULT_ZHIHUISHU,
  SETTINGS_VERSION,
  mergeWithBase,
  normalize,
} from './config/index.ts';
