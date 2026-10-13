# 扩展运行架构设计（2026-10-14）

本文件是**唯一的计划**：目标、已定的架构决定、还没做完的部分。现状说明见
[architecture.md](../architecture.md)，平台事实见 [platforms/mooc.md](../platforms/mooc.md)，
开发纪律见 [development.md](../development.md)。凡是已落地的部分，只写「结论 + 为什么」，
不再抄实现细节。

## 1. 目标与非目标

**目标**

1. 后台把「接口能完成的」全部自动做掉；前台只负责**把材料摆到眼前**（主观题的得分指导），
   不代写、不代提交、不代上传。
2. 一个**总的只读看板**：各平台 × 各课程 × 各任务的状态、截止、得分。
3. 加第二个平台、加新功能时**不改核心**。
4. 代码服从「一个人（或一次 AI 会话）能在一屏上下文里改对」这条约束。

**非目标（明确不做）**

- 不做能力矩阵／动态插件发现／事件总线。当前只有四类写操作，不为此上框架。
- 看板不做操作入口（只读；要执行去弹窗或设置页），不做历史统计、图表、导出。
- 不引入状态管理库、UI 框架（组件层用的是 Web Components，不是框架）。

## 2. 三个平面

```
视图面（只读）   看板页 · 弹窗摘要 · 通知
                     ▲  读模型（快照 + 运行结果）
执行面（后台）   快照 → 计划(纯函数) → 执行 → 结果        ← 唯一的写路径
                     ▲  只读：页面材料
呈现面（前台）   内容脚本按「页面挂载点」就地呈现
```

- **写只发生在执行面。** 前台不允许有 `client.rpc.call` 写操作——这一条由门禁守着
  （写接口只出现在后台、内容脚本不建客户端），不靠自觉。
- **前台不自己建 HTTP 客户端。** 需要平台数据时发消息给后台，后台已有一个共享节流器。这样也
  消掉了旧实现里「后台与内容脚本各建一个 client、两个节流器互不知情」的并发问题。
- 呈现面只读页面 DOM（材料来自页面本身），绝大多数情况下不需要任何请求。

## 3. 中立模型（一处定义）

```ts
Task { id; platformId; courseId; kind; title; dueAt?; score?; maxScore?; mode; state }
type TaskKind  = 'video'|'document'|'text'|'quiz'|'discuss'|'homework'
               | 'exam-objective'|'exam-subjective'|'peer-review'|'self-review';
type TaskMode  = 'auto' | 'assisted' | 'manual';
type TaskState = 'todo' | 'done' | 'failed';
```

- **为什么 `state` 只有三态**：`doing`（正在跑）是**运行时**状态，属于后台，不属于任务数据。
  写进模型会让看板出现「刷新几次都卡在 doing」的假象。
- **为什么 `mode` 不是能力数组**：三种取值对应的处理路径完全不同，`auto` 由后台独立完成、
  `assisted` 需要人看一眼或确认、`manual` 只能人工（前台把材料摆到眼前）。能力矩阵在这个规模下
  只会增加间接层。
- **计数与排序只有一处**：`summarize` / `orderTasks` / `autoTasks` 在
  [plan.ts](../../apps/extension/src/domain/plan.ts)。看板、弹窗、后台用同一份，才不会出现
  「看板说 3 项待办、执行面只做了 2 项」这类两套算法。

## 4. 平台接口与注册表

```ts
interface PlatformAdapter {
  id: string; name: string;
  listCourses(): Promise<Result<Course[]>>;
  listTasks(course: Course): Promise<Result<Task[]>>;
  run?(task: Task): Promise<Result<TaskState>>;   // 只在 mode 为 auto｜assisted 时调用
}
```

注册表在 app 装配层（[platforms/index.ts](../../apps/extension/src/platforms/index.ts)），**核心包
不 import 任何平台包**；现在只有一个实现 `moocAdapter`（
[platforms/mooc.ts](../../apps/extension/src/platforms/mooc.ts)），做平台领域类型 → 中立模型的映射。
映射放在 app 侧，平台包保持纯粹。第二个平台到位时：新增一个包 + 一个 adapter + 注册一行，核心不动。

**归属判据（依次问）**：需要页面的 DOM/路由吗（需要 → 呈现面）；需要人在场吗（看、确认、抄写 →
`assisted` / `manual`）；会写平台数据吗（会 → 只能在执行面，且受开关控制）。

## 5. 三页职责

| 页面 | 回答的问题 | 内容 |
|---|---|---|
| 弹窗 | 现在要做什么 | 状态一行、最紧要的几项、计数、立即执行、「看板」「设置」两个入口 |
| 看板 | 整体还剩什么 | 各课程进度、任务列表与筛选；只读，不直接发请求 |
| 设置 | 它怎么运行 | 账号与课程、运行时机、自动任务、前台功能、AI、执行与诊断 |

- **注入面板不是页面**：它按「页面挂载点」就地出现在慕课页的题目下方，不占三页之一。
- 单元明细属于「还剩什么」，因此从设置页搬进看板；设置页不再重复一份。
- 计数一律走 [plan.ts](../../apps/extension/src/domain/plan.ts) 的 `summarize`，各页不许自己算。

## 6. 组件层

- **选型：Shoelace / Web Awesome（Web Components）**。默认就有成品设计；shadow DOM 天然隔离——
  注入面板塞进慕课页时既不被动（宿主的 CSS 进不来）也不主动（我们的 CSS 不污染宿主）；无框架依赖。
- **一处定义**：[tokens.css](../../apps/extension/src/ui/tokens.css) 是设计令牌，映射成 Shoelace 的
  `--sl-*` 变量写在 [theme.css](../../apps/extension/src/ui/theme.css)；组件的构造与排版在
  [index.ts](../../apps/extension/src/ui/index.ts) 与 [components.css](../../apps/extension/src/ui/components.css)，
  只用类选择器，供 shadow DOM 复用。
- **页面 CSS 只留布局**：页面不再自带控件样式。弹窗已从 384 行降到 30 行；设置页与看板在收尾。
- **体积代价已接受**：Shoelace 让生产包增加约 80 kB，换来三页一致的成品视觉与隔离，值得。

## 7. 产品立场：默认是助手，代做是显式开启的高级功能

- **后台任务默认全部关闭**：它们在检查时自己就动，替用户做这个决定要他本人点头。
- **页面内功能默认开启**：要人打开页面、动手点才会发生，写平台的动作都由人触发。
- **AI 默认关闭且不预填任何厂商**：地址、模型、密钥都由用户填，密钥只存本机。
- 这条立场有门禁：`check-release` 的「代你写平台的功能默认关闭」直接读设置默认值，代做类开关写成
  `true` 即失败。

## 8. 代码组织规则（硬约束）

1. **一个文件一个职责，超过 300 行必须拆**（ESLint `max-lines`，含本文件在内的文档同样适用）。
2. **深模块**：接口＝调用者必须知道的一切，实现藏在后面。判据是**删除测试**——删掉它复杂度会散到
   多个调用点才值得存在，否则是透传。
3. **唯一来源**：同一知识不允许出现第二次。已收拢：`UNIT_TYPE`、`BEHAVIORS`、`ENDPOINTS`、学习
   上报出口、节流与重试、`AI_TASKS`、提示词、计划计数。一度以为 `kind` 标签映射与时间格式化各有
   三处重复，核实后不成立：前者是两个键空间与两种语域（待办类别文案 / 通知短词），后者是相对说法
   与绝对日期——强行合并只会更绕。
4. **端口注入**：跨层只通过函数类型端口（如 `TextGenerator`），实现在最外层装配。
5. **测试即契约**：测试写在接口上；改实现不应改测试。
6. **不兜底、不兼容、不防御**：一件事只有一条路径；做不成如实失败，交人工。

## 9. 门禁清单

`node scripts/probe/checks/check-all.mjs` 一次跑完全部门禁，并核对**项数快照**
（[expected-checks.json](../../scripts/probe/checks/expected-checks.json)）——删项、改名、漏跑都会红。

| 脚本 | 守住什么 |
|---|---|
| [check-release.mjs](../../scripts/probe/checks/check-release.mjs) | 交付文件齐备、无身份信息、文案与术语、写路径只在后台、内容脚本不持客户端、代做类默认关闭 |
| [check-copy.mjs](../../scripts/probe/checks/check-copy.mjs) | 界面文案：内部术语、口语化、与功能一致、标点统一 |
| [check-privacy.mjs](../../scripts/probe/checks/check-privacy.mjs) | 隐私政策覆盖申请的全部权限 |
| [check-eslint.mjs](../../scripts/verify/check-eslint.mjs) | 行数上限、代码卫生、术语唯一写法、依赖方向 |
| [check-knip.mjs](../../scripts/verify/check-knip.mjs) | 没有未使用的导出、文件与依赖 |
| [check-remark.mjs](../../scripts/verify/check-remark.mjs) | markdown 里的链接、锚点与引用定义 |
| [check-doc-refs.mjs](../../scripts/verify/check-doc-refs.mjs) | 源码注释里引用的文档路径与节号真实存在（remark 只看链接、knip 不看注释，这中间的缝由它补） |
| [check-syncpack.mjs](../../scripts/verify/check-syncpack.mjs) | 同一依赖在各包版本一致 |
| [check-version-literal.mjs](../../scripts/verify/check-version-literal.mjs) | 版本号只有一个来源（package.json） |

打包产物另有一条发布前必过项：[verify-package.mjs](../../scripts/probe/checks/verify-package.mjs)
（产物能被浏览器加载）。规则本身写在配置或标准工具里，不自写正则；适配脚本只做「工具结果 →
通过/失败 名称」的转换。

## 10. 已落地

- **三个平面与唯一写路径**：后台执行面持有全部写操作；内容脚本不再自建客户端，平台数据走消息。
- **中立模型与注册表**：[task.ts](../../apps/extension/src/domain/task.ts) 定义模型与工厂，
  `plan.ts` 定义计划语义，`platforms/` 是注册表与 mooc adapter，核心包不依赖任何平台包。
- **只读看板**：新 entrypoint `dashboard`，数据来自本地快照与最近一次运行结果，不直接发请求，
  显示「上次读取」时间。
- **组件层与三页接入**：Shoelace 接入 `src/ui/`，弹窗 CSS 从 384 行降到 30 行并配 DOM 级测试；
  设置页从 751 行降到 224 行（只留布局）。
- **单元明细迁入看板**：设置页那份已删，明细行与「还剩什么」一起归看板。
- **删除「启动延迟」**：设置项、schema 字段与后台延迟逻辑一并删掉，启动后立即检查，中断恢复
  语义不变。
- **文件拆分**：全部源码文件 ≤300 行，由 `max-lines` 守着。
- **课件按类型留下与真人一致的记录**，讨论留言由用户自己配置的 AI 生成。

## 11. 未完成

1. **看板组件化收尾**：看板接入组件层、页面 CSS 只留布局，并为看板补 DOM 级测试。设置页已接入，
   弹窗是样板。
2. **注入面板 shadow DOM 化**：组件层已按「不依赖全局样式」写，面板本身仍按老方式注入宿主页面，
   需要迁到自定义元素里。
3. **设置页窄屏**：两栏布局在 720px 以下会挤，需要一档单栏断点。
4. **第二个平台**：命名与归属约定已定（见 [architecture.md](../architecture.md) 第 3.5 节），
   等真实需求出现再落包。
5. **看板刷新入口**：数据陈旧时目前只显示上次读取时间，是否给一个手动刷新按钮待定。

## 12. 验收标准

- 每个阶段：五个包 `tsc --noEmit` 通过；测试全绿且**新增行为都有测试**；`check-all` 全绿
  （脚本数与项数与快照一致）；扩展构建成功。
- 拆分：无文件超过 300 行；现有功能行为不变（同一轮真实运行结果与拆分前一致）。
- 中立模型与看板：看板能列出 mooc 全部课程与任务，字段与快照一致；新增一个假 adapter 时核心
  零改动（用测试证明）。
- 全程：写路径只有执行面一条（静态检查：内容脚本无写接口调用）。

## 13. 风险与回退

| 风险 | 缓解 |
|---|---|
| 拆分引入行为回归 | 每步只移动代码不改逻辑；测试先行；一次真实运行对比结果 |
| 中立模型与 mooc 字段对不齐 | 模型只放现有界面真正用到的字段；缺什么再加，不预留 |
| 看板数据陈旧引起误判 | 显示「上次读取时间」，并提供刷新入口 |
| 内容脚本不再建客户端后，前台功能依赖后台存活 | MV3 收到消息会唤醒后台；失败时前台显示「后台未就绪」而非静默 |
| 门禁项被悄悄删掉 | 项数快照 + 本次新增的注释引用断言；删项必须改快照，diff 里看得见 |
