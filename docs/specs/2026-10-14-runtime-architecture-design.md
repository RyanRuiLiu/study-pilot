# 扩展运行架构设计（2026-10-14）

本文件是**设计**，不是现状说明。现状见 [architecture.md](../architecture.md)。

## 1. 目标与非目标

**目标**

1. 后台把「接口能完成的」全部自动做掉；前台只负责**把材料摆到眼前**（主观题的得分指导），不代写、不代提交、不代上传。
2. 一个**总的只读看板**：各平台 × 各课程 × 各任务的状态、截止、得分。
3. 加第二个平台、加新功能时**不改核心**。
4. 代码服从「一个人（或一次 AI 会话）能在一屏上下文里改对」这条约束。

**非目标（明确不做）**

- 不做能力矩阵／动态插件发现／事件总线。当前只有 4 类写操作，不为此上框架。
- 看板不做操作入口（只读；要执行去弹窗或设置页）。
- 不做历史统计、图表、导出。
- 不引入状态管理库、UI 框架。

## 2. 三个平面

```
视图面（只读）   看板页 · 弹窗摘要 · 通知
                     ▲  读模型（快照 + 运行结果）
执行面（后台）   快照 → 计划(纯函数) → 执行 → 结果        ← 唯一的写路径
                     ▲  只读：页面材料
呈现面（前台）   内容脚本按「页面挂载点」就地呈现
```

- **写只发生在执行面。** 前台不允许有 `client.rpc.call` 写操作。
- **前台不自己建 HTTP 客户端。** 需要平台数据时发消息给后台（后台已有一个共享节流器）。这样也消掉了现状里「后台/内容脚本各建一个 client、两个节流器互不知情」的问题。
- 呈现面只读页面 DOM（材料来自页面本身），因此绝大多数情况下不需要任何请求。

## 3. 中立模型（一处定义）

```ts
Platform { id: string; name: string }

Course {
  platformId: string; courseId: number; termId?: number;
  name: string; teacher?: string;
  progress?: { learned: number; total: number };
}

Task {
  id: string;              // `${platformId}:${courseId}:${kind}:${localId}`，看板用它做 key
  platformId: string; courseId: number;
  kind: TaskKind;
  title: string;
  dueAt?: number; score?: number; maxScore?: number;
  mode: TaskMode;
  state: TaskState;
}

type TaskKind  = 'video'|'document'|'text'|'quiz'|'discuss'|'homework'
               | 'exam-objective'|'exam-subjective'|'peer-review'|'self-review';
type TaskMode  = 'auto' | 'assisted' | 'manual';
type TaskState = 'todo' | 'done' | 'failed';
```

**为什么 `state` 只有三态**：`doing`（正在跑）是**运行时**状态，属于后台的运行状态，不属于任务数据。写进模型会让看板出现「刷新几次都卡在 doing」的假象。

**为什么 `mode` 不是能力数组**：三种取值对应的处理路径完全不同，且与现有功能一一对上（见第 5 节）。能力矩阵在这个规模下只会增加间接层。

- `auto`：后台独立完成，人工零介入。
- `assisted`：后台生成、需要人在页面看一眼或确认（AI 讨论留言、AI 兜底作答）。
- `manual`：平台侧只能人工（主观题抄写、上传图片）→ 前台负责把材料摆到眼前。

## 4. 平台接口与注册表

```ts
interface PlatformAdapter {
  id: string;
  name: string;
  listCourses(): Promise<Result<Course[]>>;
  listTasks(course: Course): Promise<Result<Task[]>>;
  /**
   * 执行一个任务。执行面只在 mode 为 auto｜assisted 时调用；
   * manual 的任务（主观题抄写、上传图片）永不传入——那属于呈现面。
   */
  run?(task: Task): Promise<Result<TaskState>>;
}
```

- 注册表在 app 装配层（`src/platforms/index.ts`），**核心包不 import 任何平台包**。
- 现在只有一个实现：`moocAdapter`（包在 `packages/platform-mooc` 之外薄薄一层，做 mooc 领域类型 → 中立模型的映射）。映射放在 app 侧，平台包保持纯粹。
- 第二个平台到位时：新增一个包 + 一个 adapter + 注册一行，核心不动。

## 5. 归属判据与现有功能

**判据（依次问）**

1. 需要页面的 DOM/路由吗？需要 → 呈现面；不需要 → 执行面。
2. 需要人在场吗（看、确认、抄写）？需要 → `assisted` / `manual`。
3. 会写平台数据吗？会 → 只能在执行面，且受开关控制。

| 现有功能 | 现在在哪 | 目标 | mode |
|---|---|---|---|
| 自动完成课件（视频/文档/文本/随堂测验） | 后台 execute | 执行面 | auto |
| 自动完成课件·讨论 | 后台 execute | 执行面 | assisted（需 AI） |
| 自动完成测验（客观题） | 后台 execute | 执行面 | auto |
| 互评 / 自评 | 后台 execute | 执行面 | auto |
| 截止提醒、待办整理 | 后台 reminder | 执行面（只读）+ 视图面 | — |
| 做题助手（填充，用户点提交） | 前台 quiz-helper | 呈现面 + 用户动作 | assisted |
| 作业得分指导 | 前台 homework-answers | 呈现面 | manual |
| 单元明细 | 挤在 options | 看板 | — |
| **总看板** | 无 | 视图面（新增） | — |

**结论**：现有功能一个都不需要改归属，只缺看板。分层方向正确，要补的是中立模型、看板与文件拆分。

## 6. 前台呈现规范（主观题场景）

以「作业得分指导」为准绳，其余呈现遵循同一套：

1. **就地插入**：材料锚定到**题目**（插在题干下方），不弹面板、不遮挡作答区。
2. **不遮挡**：最大高度受限，超出时可折叠。
3. **可复制**：每段材料一个复制按钮。
4. **没有就不插**：拿不到得分说明时什么都不插，不插占位符、不插「暂无」。
5. **只读**：不修改页面的输入控件，不触发页面保存，不代提交。
6. **面板只在需要连续多步时出现**（填答案 → 检查 → 提交）；得分指导不使用面板。

## 7. 看板（只读）

- **载体**：新 entrypoint `dashboard`（扩展内的独立页面），与 options 同级。
- **数据来源**：本地快照（结构 + 工作项 + 单元）+ 最近一次运行结果。看板**不直接发请求**；数据陈旧时只提示「上次读取于 …」，刷新由用户点或在后台定时任务里完成。
- **结构**：按平台分组的课程列表 → 每门课：进度、待办数、失败数、最近截止；展开看任务列表（kind / 标题 / 截止 / 得分 / mode / state）。
- **筛选**：平台、课程、kind、mode、state；默认只看 `todo` 与 `failed`。
- **不做**：写操作、历史趋势、导出。

## 8. 代码组织规则（硬约束）

1. **一个文件一个职责，超过 300 行必须拆。** 现状超标的 8 个文件见阶段一。
2. **深模块**：接口＝调用者必须知道的一切；实现藏在后面。判据是**删除测试**——删掉它复杂度会散到多个调用点才值得存在，否则是透传。
3. **唯一来源**：同一知识不允许出现第二次。已收拢：`UNIT_TYPE`、`BEHAVIORS`、`ENDPOINTS`、学习上报出口、节流与重试、`AI_TASKS`、提示词。
4. **端口注入**：跨层只通过函数类型端口（如 `TextGenerator`），实现在最外层装配。
5. **测试即契约**：测试写在接口上；改实现不应改测试。
6. **不兜底、不兼容、不防御**：一件事只有一条路径；做不成如实失败，交人工。

## 9. 阶段一：拆分（行为不变）

按 300 行规则与职责拆分，**每一步都必须有测试护着，行为不变**：

| 文件 | 行数 | 目标 |
|---|---|---|
| `entrypoints/options/main.ts` | 1479 | `options/render.ts`（布局与控件）＋ `options/sections/*.ts`（每区一节）＋ `options/actions.ts`（手动运行等动作） |
| `entrypoints/background.ts` | 1001 | `background/wiring.ts`（client/规则/闹钟装配）＋ `background/router.ts`（消息路由）＋ `background/run.ts`（运行编排与通知） |
| `entrypoints/popup/main.ts` | 701 | `popup/summary.ts` ＋ `popup/actions.ts` |
| `features/mooc/homework-answers.ts` | 467 | `guidance/extract.ts`（从页面取材料）＋ `guidance/inject.ts`（插到题目下） |
| `settings/schema.ts` | 431 | `settings/general.ts` / `settings/mooc.ts` / `settings/ai.ts` + 一处汇总 |
| `platform/messaging.ts` | 368 | `messaging/core.ts`（通用信封）＋ `messaging/mooc.ts`（平台载荷） |
| `background/mooc/execute.ts` | 355 | `execute/work.ts` ＋ `execute/courseware.ts` ＋ `execute/shared.ts` |
| `background/mooc/task-plan.ts` | 355 | `plan/auto.ts` ＋ `plan/manual.ts` ＋ `plan/order.ts` |

**同时清理**

初稿这里列了「kind 标签映射三处」「时间格式化三处」，**核实后是我写错了**，实际都不算重复：

| 初稿的说法 | 核实结果 |
|---|---|
| kind → 标签映射三处 | ❌ 不成立。`popup/KIND_TEXT`（待办类别→用户文案）与 `reminder/KIND_LABEL`（执行结果类别→通知短词）是两个键空间、两种语域；`AUTO_KIND`/`MANUAL_KIND`（内部动作→待办类别）本来只有一处。强行合并只会更绕 |
| 时间格式化三处 | ❌ 不成立。`daysBetween`/`relativeDay`（「今天/3 天后」相对说法）与 `formatDateTime`/`formatDate`（绝对日期）是不同知识；`dateKey` 是调度用的日期键 |

真正要处理的：

| 问题 | 状态 | 处理 |
|---|---|---|
| 两个 client / 两个节流器 | 已核实：`background.ts:186`、`mooc.content.ts:42` | 内容脚本不再自建 client，只读数据经消息取自后台 |
| 遗留 `??`/`\|` 默认值 | 已核实：8 个文件 20 处 | 逐个判定唯一来源：归一化保留并注明，兜底删除 |
| 探测脚本堆积 | 已核实：检查脚本 20 个，其中只有 3 个在门禁里；4 处引用已过期 | 已处理：留 5 个（门禁套件 + 产物验证），删 15 个一次性脚本 |
| `startupDelayMinutes` | 待核实 | 核实后决定删除或保留 |

## 10. 阶段二：中立模型 + 看板

1. `src/domain/task.ts`：中立模型与工厂（唯一来源）。
2. `src/platforms/mooc.ts`：`moocAdapter`，把 `platform-mooc` 的类型映射成 `Task`/`Course`。
3. `src/platforms/index.ts`：`PLATFORMS` 注册表。
4. 后台计划改为在 `Task[]` 上工作（`mode`/`state` 决定是否自动），写动作仍由平台包提供。
5. 新 entrypoint `dashboard`，只读渲染中立模型；options 里的「单元明细」迁入。
6. 文档：更新 [`docs/architecture.md`](../architecture.md)（加三个平面与中立模型）、新增 `docs/specs/`（本文件）。

## 11. 验收标准

- 每个阶段：5 个包 `tsc --noEmit` 通过；测试全绿且**新增行为都有测试**；`check-release`、`check-privacy` 通过；扩展构建成功。
- 阶段一结束：无文件超过 300 行（`entrypoints` 与 `src` 均如此）；现有功能行为不变（同一轮真实运行结果与拆分前一致）。
- 阶段二结束：看板能列出 mooc 全部课程与任务，字段与快照一致；新增一个假 adapter 时核心零改动（用测试证明）。
- 全程：写路径只有执行面一条（可用静态检查证明内容脚本无写接口调用）。

## 12. 风险与回退

| 风险 | 缓解 |
|---|---|
| 拆分引入行为回归 | 每步只移动代码不改逻辑；测试先行；一次真实运行对比结果 |
| 中立模型与 mooc 字段对不齐（缺少必需字段） | 模型先只放现有界面真正用到的字段；缺什么再加，不预留 |
| 看板数据陈旧引起误判 | 显示「上次读取时间」，并提供刷新入口 |
| 内容脚本不再建 client 后，前台功能依赖后台存活 | MV3 收到消息会唤醒后台；失败时前台显示「后台未就绪」而非静默 |
