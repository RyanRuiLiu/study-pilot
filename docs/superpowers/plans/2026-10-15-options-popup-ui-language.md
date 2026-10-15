# 设置页与弹窗界面语言统一（含三 tab 版式）实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 设置页与弹窗统一到一份令牌 + 一份共享组件 + 五态语言（净白 · 群青）；三个 tab（通用 / 慕课 / 智慧树）立起来，切到哪家读哪家；修掉右列对齐、按钮右上角、品牌字重三处现场问题。

**Architecture:** 令牌（`tokens.css`，镜像 `tokens.ts` 由 parity 测试咬合）→ 控件骨架（`controls.css`）→ 共享组件层（新 `components.css`：面板、三个行模板、tab 条、徽标、骨架、状态行）→ 共享 tab 行为（新 `src/ui/tabs.ts`，W3C APG 模式）→ 两个页面只留各自容器与布局。配置新增 `ui.activeTab`（记住上次停留的 tab）。行为变化仅两处：加载态由文字改骨架；平台数据按 tab 按需加载（规格第 13 节）。

**Tech Stack:** WXT + 原生 TS/CSS（无框架）、vitest、Playwright probe（真机验证一律走 `pnpm probe`）。

**Spec:** `docs/superpowers/specs/2026-10-15-options-popup-ui-language-design.md`（实现前先读；本计划与它冲突时以 spec 为准）

## Global Constraints

- 术语唯一叫法（README）：设置页 / 弹窗 / 读取课程列表 / 快速完成 / 全部执行 / 执行 / 停止 / 课件 / 互评评语 / AI 连接（智谱）/ 通用 / 慕课 / 智慧树。
- 禁止自创：色值、字号、间距只能取 `tokens.css` 的表；按钮/骨架/空态/tab 无障碍一律用本文档写死的现成做法（Bootstrap placeholder 的 1em、原生勾选框 + accent-color、W3C APG tabs 模式、GitHub 下划线 tab）。
- 信息不得减少：任何现有文案/数字/状态都必须保留（只允许换位置与长相）。
- 页面上不得出现手挑 px（1px 细线除外）；`tokens.css` ⇄ `tokens.ts` 必须同改（parity 测试拦）。
- 一次打开最多读一家：通用＝零平台请求；平台数据只在切到该 tab 时读；同一次打开内切回用内存；不为凑徽标预读另一家。
- 真机验证一律走 `pnpm probe`；界面改完**不截图自审**，构建重载后交 Ryan 看。
- 构建前先关探测浏览器（Windows 上 `.output` 会被占用报 EBUSY）：`pnpm probe kill` → `pnpm build` → `pnpm probe open` → `pnpm probe ext reload`。

## Review Focus

实现者与评审者注意——这些是规格暗示但单测抓不到、最容易翻车的地方，各自在所属任务里有对应的检查步骤：

1. **切 tab 的取数边界**：通用零请求、首次切到慕课才读、切回不重读、徽标只在读过后出现——用一个页面会话里的网络面板核对（Task 5/6）。
2. **超长课名/任务名**（真实课名可达 14+ 字）：折行或省略都不能把右列挤走（列模板 + `min-width:0` + `overflow-wrap`）。Task 5/6。
3. **同一列表里「有执行」与「无执行」的行混排**：右列（剩余时间/日期）必须一列到底、不横移。Task 6。
4. **徽标宽度不一的四种取值**（未提交/互评阶段/成绩已公布/已过截止）：跟在标题后，右列不受影响。Task 6。
5. **未登录 / 读取失败 / 空列表 / 智慧树占位**：四种非正常态各自的长相（失败 `.note.is-error`，未登录灰字给去处，空态给下一步，占位说实话不给假骨架）。Task 5/6。
6. **弹窗 320px 下的最长行**（「可以替你评分，还差 2 份 + 执行 + 日期」）：不溢出、不换行错位；tab 条加入后总高度仍容得下约 8 条待办。Task 6。

---

### Task 1: 令牌改值（tokens.css ⇄ tokens.ts）

**Files:**
- Modify: `apps/extension/src/ui/tokens.css`（全量替换）
- Modify: `apps/extension/src/ui/tokens.ts`（全量替换）
- Test: `apps/extension/test/tokens-parity.test.ts`（现有，不动）

**Interfaces:**
- Produces: 新令牌名（后续任务全部依赖）：`--paper/--paper-2/--ink/--ink-soft/--ink-faint/--accent/--accent-deep/--accent-wash/--warn/--line/--line-on-wash/--control/--hover/--skeleton/--check-border/--on-accent/--font/--text-xs…xl/--space-4…80/--radius-lg…xs/--radius-full`

- [ ] **Step 1: 全量替换 `src/ui/tokens.css`**

```css
/*
 * Study Pilot 设计令牌（唯一常量源）。
 *
 * 全部界面共用这一份：弹窗、设置页。注入到别人页面的块（得分指导）
 * 只能用内联样式（那是它的隔离手段），其色值/圆角/间距镜像在 src/ui/tokens.ts，
 * 由 test/tokens-parity.test.ts 与这份文件逐条核对——改这里必须同步改那边，
 * 测试会拦下不一致。
 *
 * 用法约定：
 *   主色 --accent 只出现在可点击的地方（按钮、勾选、链接、进行中点、行内「执行」、tab 激活）。
 *   边界不靠边框：白面浮在纸底，行间靠留白；--line 只画「换了话题」的细分界。
 *   间距一律取 --space-*（4px 网格），字号一律取 --text-*；
 *   页面上不再出现手挑的 px 值（1px 细线与描边除外）。
 *
 * 取色以对比度为准，不以「看起来舒服」为准
 * -------------------------------------------
 * 每个色值都量过对比度（WCAG 2.1，正文要求 4.5:1）。三级文字：
 * ink 19:1、ink-soft 7.7:1、ink-faint 4.8:1（最弱但仍合格的最低一档，
 * 承担日期、元信息这类「要看清但不要突出」的内容）。
 * 主色 #2b4acb 作按钮底色时白字 7.1:1，作白底文字 7.1:1，两个用途都达标。
 * 未勾选勾选框的描边是非文字控件，按 3:1 定（#8e8e93 实测 3.3:1）。
 * 改色时请重新量，别凭观感调：浅色的观感与实测差得比想象中大。
 */

:root {
  /* 底色。净白页底 + 纯白面（面板、弹窗）；面与底的差就是边界 */
  --paper: #fafafa;
  --paper-2: #ffffff;

  /* 文字三级：正文、次级说明、最弱的元信息（全部 ≥4.5:1） */
  --ink: #111214;
  --ink-soft: #52525b;
  --ink-faint: #71717a;

  /* 主色（群青）。accent 同时用作底色与文字色，两处都 7.1:1 */
  --accent: #2b4acb;
  --accent-deep: #223c9f;
  /* 主色的极浅底：进行中行的整行衬底，也是注入块（得分指导）的衬底 */
  --accent-wash: #eef1fc;

  /* 警示：错误、已过截止、紧急剩余时间（白底 6.6:1） */
  --warn: #b42318;

  /* 细分界：只用在「换了话题」处（弹窗顶栏/状态行/ tab 条的下缘、待办组与组之间）。
     列表内部的行与行不再画线——留白分区 */
  --line: #f2f2f4;

  /* 浅主色底（accent-wash）上的分界：--line 压在这种底上看不见，
     注入块（得分指导）的分隔线用它（主色 20% 混入浅底的结果） */
  --line-on-wash: #c7d0f2;

  /* 控件底：次按钮、输入框、徽标（填充面代替描边） */
  --control: #f2f2f3;

  /* 悬停底。中性灰，不用主色的浅色变体——浅蓝在成列表的行里
     一片一片地亮起来会显得脏 */
  --hover: #f5f5f6;

  /* 骨架占位。比 --line 深一档：它是「一条内容」的形状，不是线 */
  --skeleton: #efeff1;

  /* 未勾选勾选框的描边（非文字控件，≥3:1） */
  --check-border: #8e8e93;

  /* 主色上的文字。这个令牌名点明它只能配主色用 */
  --on-accent: #ffffff;

  /* 字体。单一无衬线，不混排 */
  --font: 'HarmonyOS Sans SC', 'MiSans', 'PingFang SC', 'Microsoft YaHei UI', 'Microsoft YaHei',
    system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;

  /*
   * 字号。四档 + 一档标题：
   *   xs 徽标、行内「执行」    sm 次级说明（状态行、日期、按钮文字）
   *   md 正文                  lg 弹窗品牌名
   *   xl 页面标题（18——比正文重一档已足够，更安静）
   */
  --text-xs: 11px;
  --text-sm: 12px;
  --text-md: 13px;
  --text-lg: 14px;
  --text-xl: 18px;

  /* 间距。4px 网格的系统梯级（与 Tailwind 默认梯级同族）。
     页面上所有 margin / padding / gap 只能取这里的值 */
  --space-4: 4px;
  --space-8: 8px;
  --space-12: 12px;
  --space-16: 16px;
  --space-20: 20px;
  --space-24: 24px;
  --space-32: 32px;
  --space-40: 40px;
  --space-48: 48px;
  --space-64: 64px;
  --space-80: 80px;

  /* 圆角。按元素大小递减；胶囊（按钮/徽标/骨架条）用 radius-full */
  --radius-lg: 12px;
  --radius-md: 10px;
  --radius-sm: 8px;
  --radius-xs: 4px;
  --radius-full: 999px;
}
```

- [ ] **Step 2: 跑 parity 测试，确认它变红（tokens.ts 还是旧值）**

Run: `pnpm --filter @study-pilot/extension test tokens-parity`
Expected: FAIL —— 多条「不一致：css=#2b4acb ts=#0f766e」之类的断言失败。

- [ ] **Step 3: 全量替换 `src/ui/tokens.ts`**

```ts
/*
 * 设计令牌的 TS 镜像（只给注入块用）。
 *
 * 为什么需要它：得分指导块注入在**别人的页面**里，扩展的样式表在那里
 * 不可用，样式只能写成内联——这是它的隔离手段，不是将就。但内联不等于
 * 可以把色值手抄进代码：先前这些值散在 block.ts 里靠注释「与 tokens.css
 * 同一批」人工同步，正是这类手抄迟早对不上的地方。
 *
 * 约定：键与 tokens.css 的变量名一一对应（camelCase ⇄ --kebab-case，
 * 数字后缀加连字符：space4 ⇄ --space-4）。test/tokens-parity.test.ts
 * 会读 tokens.css 逐条比对——改一边必须改另一边，测试拦下不一致。
 *
 * 只镜像注入块真正用到的值；CSS 侧的完整标尺以 tokens.css 为准。
 */

export const TOKENS = {
  accent: '#2b4acb',
  accentWash: '#eef1fc',
  ink: '#111214',
  inkSoft: '#52525b',
  inkFaint: '#71717a',
  line: '#f2f2f4',
  lineOnWash: '#c7d0f2',
  onAccent: '#ffffff',
  radiusMd: '10px',
  space4: '4px',
  space8: '8px',
  space12: '12px',
  space16: '16px',
  textMd: '13px',
} as const;
```

- [ ] **Step 4: 跑 parity 测试，确认绿**

Run: `pnpm --filter @study-pilot/extension test tokens-parity`
Expected: PASS（两条全过）。

- [ ] **Step 5: 提交**

```bash
git add apps/extension/src/ui/tokens.css apps/extension/src/ui/tokens.ts
git commit -m "feat(ui): 令牌改值——净白群青换装，补 control/skeleton/check-border/radius-full 与浅底分界色"
```

---

### Task 2: 控件骨架（controls.css：胶囊按钮、三种尺寸、禁用压暗）

**Files:**
- Modify: `apps/extension/src/ui/controls.css`（全量替换）
- Test: 无单测；验证＝构建通过 + Task 5/6 的 probe 目检

**Interfaces:**
- Consumes: Task 1 的 `--accent/--accent-deep/--control/--hover/--radius-full/--on-accent/--text-*`
- Produces: `.btn`（26 高）/ `.btn.ghost`（灰面）/ `.state-stop`（22 高）/ `.todo-run`（20 高，无底色）——Task 5/6 依赖这些类名

- [ ] **Step 1: 全量替换 `src/ui/controls.css`**

```css
/*
 * 交互控件基座——全扩展共用一份（弹窗、设置页）。
 *
 * 前置：使用方先引入 tokens.css（本文件只用它的变量，不替它引入）——
 * 引入顺序见各页面样式表开头几行。控件自己 @import 令牌会让打包器
 * 把同一份 :root 抽出两份（实测），所以这里刻意不引。
 *
 * 形态：胶囊（--radius-full）。全站只有三种尺寸：
 *   .btn          26px 高，左右 12px，12px 字——标准按钮
 *                 （设置页全部按钮、弹窗顶栏两个；顶栏定宽 68 见 components.css）
 *   .state-stop   22px 高，左右 8px，11px 字——弹窗状态行「停止」
 *   .todo-run     20px 高，11px 字，无底色——待办行内「执行」（指到才浮出实心）
 * 骨架（底色、悬停、禁用、焦点环）只在这里写一次。
 * 次按钮是「填充面」不是描边——边界不靠边框（见 tokens.css 约定）。
 */

:is(.btn, .state-stop, .todo-run) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--radius-full);
  background: var(--accent);
  color: var(--on-accent);
  font: inherit;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease;
}

/* 悬停：加深。todo-run 静息是幽灵态，指到才浮出实心——也走这一条 */
:is(.btn, .state-stop, .todo-run):hover {
  background: var(--accent-deep);
  color: var(--on-accent);
}

/* 禁用：整体压暗，光标收回 */
:is(.btn, .state-stop, .todo-run):disabled {
  opacity: 0.4;
  cursor: default;
}

/* 焦点环：键盘可达性，全控件一致 */
:is(.btn, .state-stop, .todo-run):focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* 次按钮（灰面）：读取课程列表、快速完成、更多、停止 */
.btn.ghost,
.state-stop {
  background: var(--control);
  color: var(--ink-soft);
}

.btn.ghost:hover,
.state-stop:hover {
  background: var(--hover);
  color: var(--ink);
}

/* 行内「执行」：字为主，无底无框（悬停由上面的共享规则浮出实心） */
.todo-run {
  height: 20px;
  padding: 0;
  background: transparent;
  color: var(--accent);
  font-size: var(--text-xs);
  font-weight: 500;
}

/* ---------- 尺寸 ---------- */

.btn {
  height: 26px;
  padding: 0 var(--space-12);
  font-size: var(--text-sm);
}

.state-stop {
  height: 22px;
  padding: 0 var(--space-8);
  font-size: var(--text-xs);
}
```

- [ ] **Step 2: 构建通过（此时页面新旧混搭，属预期；构建必须绿）**

Run: `pnpm build`
Expected: 构建成功，无错误。（若报 EBUSY：`pnpm probe kill` 后重跑。）

- [ ] **Step 3: 提交**

```bash
git add apps/extension/src/ui/controls.css
git commit -m "feat(ui): 按钮骨架改胶囊三尺寸（26/22/20），禁用压暗 .4，次按钮改填充面"
```

---

### Task 3: 共享组件层（新建 components.css）

**Files:**
- Create: `apps/extension/src/ui/components.css`
- Test: 无单测；验证＝构建通过 + Task 5/6 目检

**Interfaces:**
- Consumes: Task 1 令牌、Task 2 按钮骨架
- Produces（Task 5/6 的全部类名）：
  - 面板：`.panel` `.panel-head` `.panel-title` `.head-status`（`.is-loading` 骨架态）
  - 说明：`.note`（`.is-error`）
  - tab：`.tabs`（`.pop .tabs` 通栏变体）`.tab`（`[aria-selected='true']` 激活态）`.tab-count` `.tab-empty`
  - 行模板：`.course-row`（`.is-off`）`.course-name` `.course-meta`；`.cw-row`（`.is-running`）`.cw-group` `.cw-name` `.cw-current` `.cw-progress`；`.todo-item` `.todo-line` `.todo-name` `.todo-phase` `.todo-when`（`.is-urgent`）`.todo-sub` `.todo-handling`（`.is-auto/.is-overdue`）`.todo-date` `.todo-open` `.todo-run`
  - 组：`.todo-group` `.todo-course` `.todo-count`
  - 状态：`.todo-empty` `.todo-error` `.todo-login` `.todo-login-text`
  - 骨架：`.skeleton`（`.is-box/.is-line/.is-meta/.is-badge/.is-btn`）
  - 弹窗外壳：`.bar` `.brand` `.state`（`.is-running/.is-busy/.is-error`）`.state-text` `.state-stop` 显示开关
  - 浮层：`.toast`（`.on`）

- [ ] **Step 1: 新建 `src/ui/components.css`（全量）**

```css
/*
 * 共享组件层——设置页与弹窗的「同一种长相」都住在这里。
 *
 * 前置：使用方先引入 tokens.css 与 controls.css。本文件只放两个页面
 * 共用的模式（面板、tab 条、行模板、徽标、说明、骨架、状态行、顶栏、浮层）；
 * 页面样式表只留该页自己的容器与布局。
 *
 * 行模板是这个界面层的地基，列定义写死在这里：
 *   .course-row  16px | minmax(0,1fr) | auto        （勾选行）
 *   .cw-row      minmax(0,1fr) | 96px | auto        （数据行）
 *   .todo-item   minmax(0,1fr) | auto（两行）        （待办条）
 * 两条规矩（见规格文档第 4 节）：
 *   「状态贴文字」——徽标跟标题后、「执行」跟处置句后、运行明细跟课名后；
 *   「时间归右列」——剩余时间/日期/进度右对齐、等宽数字，与状态无关不横移。
 * 加新行必须从这三条模板里挑，或先更新规格文档并在此登记。
 */

/* ---------- 面板 ---------- */

.panel {
  background: var(--paper-2);
  border-radius: var(--radius-lg);
  padding: var(--space-16);
  margin-top: var(--space-12);
}

.panel-head {
  display: flex;
  align-items: center;
  gap: var(--space-12);
  margin: 0 0 var(--space-12);
}

.panel-title {
  flex: none;
  font-size: var(--text-md);
  font-weight: 600;
}

/* 面板里没有卡头的标题（课件、互评评语）：与内容留 12px */
.panel > .panel-title {
  display: block;
  margin: 0 0 var(--space-12);
}

/* 面板头状态行：贴右、在按钮之前；只在加载完成后出现（见 status-line.ts）。
   加载中它是最终位置上的一条骨架（高度与文字同高） */
.head-status {
  margin-left: auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--text-sm);
  color: var(--ink-soft);
  font-variant-numeric: tabular-nums;
}

.head-status.is-loading {
  flex: none;
  width: 150px;
  height: 12px;
  border-radius: var(--radius-full);
  background: var(--skeleton);
}

/* 标题后直跟按钮（卡片没有状态行）时，按钮自己贴右——动作永远在面板头右端 */
.panel-title + .btn {
  margin-left: auto;
}

/* ---------- 平台 tab 条 ---------- */

/* 下划线制（GitHub 同款，安静不抢；行为与无障碍见 src/ui/tabs.ts） */
.tabs {
  display: flex;
  gap: var(--space-16);
  border-bottom: 1px solid var(--line);
}

/* 弹窗里的 tab 条通栏（设置页里由页面样式给外边距） */
.pop .tabs {
  padding: 0 var(--space-16);
}

.tab {
  display: flex;
  align-items: baseline;
  gap: var(--space-4);
  padding: 0 0 var(--space-8);
  margin-bottom: -1px;
  border: none;
  border-bottom: 2px solid transparent;
  background: none;
  font-family: inherit;
  font-size: var(--text-md);
  color: var(--ink-soft);
  cursor: pointer;
}

.tab:hover {
  color: var(--ink);
}

.tab[aria-selected='true'] {
  color: var(--ink);
  font-weight: 600;
  border-bottom-color: var(--accent);
}

.tab:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: var(--radius-xs) var(--radius-xs) 0 0;
}

/* 数量徽标：本次打开已加载的平台才有；0 隐藏（见各类渲染代码） */
.tab-count {
  font-size: var(--text-xs);
  color: var(--ink-faint);
  font-variant-numeric: tabular-nums;
}

/* 占位（未接入的平台）：空态形态的一句话——不是骨架、不是错误 */
.tab-empty {
  margin: 0;
  padding: var(--space-20) var(--space-16);
  font-size: var(--text-sm);
  color: var(--ink-faint);
}

/* ---------- 说明文本 ---------- */

/* 附注/状态一句话：跟在上文之后留 12px；空内容不占位 */
.note {
  display: block;
  margin: var(--space-12) 0 0;
  font-size: var(--text-sm);
  color: var(--ink-faint);
  line-height: 1.7;
}

.note:empty {
  display: none;
}

/* 失败如实说、用警示色；未登录与空态不用它 */
.note.is-error {
  color: var(--warn);
}

/* ---------- 勾选行（设置页·账号与课程） ---------- */

.course-row {
  display: grid;
  grid-template-columns: 16px minmax(0, 1fr) auto;
  column-gap: var(--space-8);
  align-items: center;
  padding: var(--space-8) 0;
  cursor: pointer;
}

.course-row > input[type='checkbox'] {
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: var(--accent);
  cursor: pointer;
}

.course-name {
  min-width: 0;
  font-size: var(--text-md);
  color: var(--ink);
  text-decoration: none;
}

.course-name:hover {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.course-name:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.course-meta {
  font-size: var(--text-sm);
  color: var(--ink-faint);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

/* 未参与的课：课名与元信息一起弱化（勾选框不弱化——它仍是可点的） */
.course-row.is-off .course-name,
.course-row.is-off .course-meta {
  color: var(--ink-faint);
}

/* ---------- 数据行（设置页·课件） ---------- */

.cw-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 96px auto;
  column-gap: var(--space-12);
  align-items: center;
  padding: var(--space-8) 0;
}

/* 课名与运行明细的名字组：明细紧跟课名（同排），两者各自可省略 */
.cw-group {
  display: flex;
  align-items: baseline;
  gap: var(--space-8);
  min-width: 0;
}

.cw-name {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--text-md);
}

/* 运行明细：主色小字 + 前缀圆点（伪元素——文本才能走省略号）。
   让位给课名：至多占行宽 45% */
.cw-current {
  flex: 0 1 auto;
  min-width: 0;
  max-width: 45%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--text-sm);
  color: var(--accent);
}

.cw-current::before {
  content: '';
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: var(--space-8);
  border-radius: var(--radius-full);
  background: var(--accent);
  vertical-align: middle;
}

.cw-progress {
  text-align: right;
  font-size: var(--text-sm);
  color: var(--ink-faint);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

.cw-row .btn {
  justify-self: end;
}

/* 运行态：整行浅主色底（水平向外 8px 出血，保持列对齐）；
   进度不撤，动作列原地变成「停止」（按钮身份由 courseware.ts 切换） */
.cw-row.is-running {
  background: var(--accent-wash);
  border-radius: var(--radius-sm);
  padding-right: var(--space-8);
  padding-left: var(--space-8);
  margin-right: calc(var(--space-8) * -1);
  margin-left: calc(var(--space-8) * -1);
}

/* ---------- 待办条（弹窗） ---------- */

.todo-item {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  column-gap: var(--space-8);
  padding: var(--space-8) var(--space-16);
}

/* 整行是一个垫底的透明长链接（点行去平台）；「执行」抬在其上只执行不跳转 */
.todo-open {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.todo-item:hover {
  background: var(--hover);
}

.todo-open:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: -2px;
}

/* 行 1：任务名 + 阶段徽标（状态贴文字） */
.todo-line {
  grid-column: 1;
  grid-row: 1;
  display: flex;
  align-items: baseline;
  gap: var(--space-8);
  min-width: 0;
}

.todo-name {
  flex: 0 1 auto;
  min-width: 0;
  overflow-wrap: anywhere;
  font-size: var(--text-md);
}

/* 阶段徽标：始终显示（「未提交」也显示），四种取值宽度不一也不动右列 */
.todo-phase {
  flex: none;
  padding: 0 var(--space-8);
  border-radius: var(--radius-full);
  background: var(--control);
  color: var(--ink-soft);
  font-size: var(--text-xs);
  line-height: 18px;
  white-space: nowrap;
}

/* 行 1 右列：剩余时间 */
.todo-when {
  grid-column: 2;
  grid-row: 1;
  justify-self: end;
  font-size: var(--text-sm);
  color: var(--ink-soft);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

.todo-when.is-urgent {
  color: var(--warn);
  font-weight: 600;
}

/* 行 2：处置句 + 行内「执行」（执行跟在文字后） */
.todo-sub {
  grid-column: 1;
  grid-row: 2;
  display: flex;
  align-items: baseline;
  gap: var(--space-8);
  min-width: 0;
}

.todo-handling {
  min-width: 0;
  overflow-wrap: anywhere;
  font-size: var(--text-sm);
  color: var(--ink-soft);
}

.todo-handling.is-auto {
  color: var(--ink-faint);
}

.todo-handling.is-overdue {
  color: var(--warn);
}

/* 行 2 右列：日期 */
.todo-date {
  grid-column: 2;
  grid-row: 2;
  justify-self: end;
  font-size: var(--text-sm);
  color: var(--ink-faint);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

/* 一轮运行中：行内执行整体禁用（后台也拒并发，这里只是别让人白点） */
.todo.is-running .todo-run {
  opacity: 0.4;
  pointer-events: none;
}

/* 加载态：骨架行不响应悬停 */
.todo.is-loading .todo-item {
  pointer-events: none;
}

/* ---------- 待办组 ---------- */

.todo-group {
  padding: var(--space-12) 0 var(--space-4);
}

/* 组与组之间是「换了话题」：一条细分界 */
.todo-group + .todo-group {
  border-top: 1px solid var(--line);
  margin-top: var(--space-8);
}

.todo-course {
  display: flex;
  align-items: baseline;
  gap: var(--space-8);
  margin: 0 0 var(--space-4);
  padding: 0 var(--space-16);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--ink);
}

.todo-count {
  margin-left: auto;
  font-weight: 400;
  font-size: var(--text-xs);
  color: var(--ink-faint);
  font-variant-numeric: tabular-nums;
}

/* ---------- 列表区状态（空/错误/未登录） ---------- */

.todo-empty,
.todo-error,
.todo-login {
  padding: var(--space-20) var(--space-16);
}

.todo-empty,
.todo-error,
.todo-login-text {
  margin: 0;
  font-size: var(--text-sm);
  line-height: 1.7;
}

.todo-empty {
  color: var(--ink-faint);
}

.todo-error {
  color: var(--warn);
}

.todo-login-text {
  color: var(--ink-soft);
  margin-bottom: var(--space-12);
}

/* ---------- 骨架 ---------- */

/* 形状：高度＝它将替换的那格（现成标准：Bootstrap placeholder 的 min-height:1em，
   占位与目标同高，落定不跳）。宽度在标记里给——每条多长是内容的事 */
.skeleton {
  border-radius: var(--radius-full);
  background: var(--skeleton);
  animation: sp-skeleton-pulse 1.2s ease-in-out infinite;
}

.skeleton.is-box {
  width: 16px;
  height: 16px;
  border-radius: var(--radius-xs);
}

.skeleton.is-line {
  height: 13px;
}

.skeleton.is-meta {
  height: 12px;
}

.skeleton.is-badge {
  height: 18px;
}

.skeleton.is-btn {
  height: 26px;
}

@keyframes sp-skeleton-pulse {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
  }
}

/* ---------- 弹窗顶栏与状态行 ---------- */

.bar {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  padding: var(--space-12) var(--space-16);
  border-bottom: 1px solid var(--line);
}

.brand {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--text-lg);
  font-weight: 700;
  letter-spacing: 0.01em;
}

/* 顶栏按钮定宽：出现任何状态文字/禁用都不推挤品牌 */
.bar .btn {
  flex: none;
  width: 68px;
  padding: 0;
}

/* 执行状态/结果行：全局一轮，不随 tab；平时收起到零高，有话说时滑开 */
.state {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  max-height: 0;
  overflow: hidden;
  padding: 0 var(--space-16);
  border-bottom: 0 solid var(--line);
  font-size: var(--text-sm);
  line-height: 20px;
  color: var(--ink-soft);
  transition: max-height 0.16s ease-out, padding 0.16s ease-out, border-bottom-width 0.16s ease-out;
}

.state:not(.is-blank) {
  max-height: 96px;
  padding: var(--space-8) var(--space-16);
  border-bottom-width: 1px;
}

.state-text {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}

/* 进行中点：只有一轮进行时出现（伪元素——status.ts 不需要碰它） */
.state.is-running .state-text::before {
  content: '';
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: var(--space-8);
  border-radius: var(--radius-full);
  background: var(--accent);
  vertical-align: middle;
}

.state.is-busy {
  color: var(--accent);
}

.state.is-error {
  color: var(--warn);
}

/* 「停止」：只在一轮进行时现身 */
.state-stop {
  display: none;
  flex: none;
}

.state.is-running .state-stop {
  display: inline-flex;
}

@media (prefers-reduced-motion: reduce) {
  .state {
    transition: none;
  }
}

/* ---------- 浮层提示 ---------- */

/* 浮在底部居中，不占布局位置；出现与消失只做透明度，避免布局跳动 */
.toast {
  position: fixed;
  left: 50%;
  bottom: var(--space-24);
  transform: translateX(-50%);
  max-width: 80vw;
  padding: var(--space-8) var(--space-16);
  border-radius: var(--radius-sm);
  background: var(--ink);
  color: var(--paper-2);
  font-size: var(--text-sm);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.toast.on {
  opacity: 1;
}
```

- [ ] **Step 2: 构建通过**

Run: `pnpm build`
Expected: 构建成功。（此时两个页面还没引入它，属预期。）

- [ ] **Step 3: 提交**

```bash
git add apps/extension/src/ui/components.css
git commit -m "feat(ui): 共享组件层——面板/平台 tab/三个行模板/徽标/骨架/状态行/浮层，列定义写死"
```

---

### Task 4: 配置新增 `ui.activeTab`（记住上次停留的 tab）

**Files:**
- Modify: `packages/application/src/config/index.ts`
- Modify: `apps/extension/src/settings/index.ts`（转出新的类型与默认值）
- Test: `packages/application/test/settings-migration.test.ts`（追加一段）

**Interfaces:**
- Consumes: 现有 `normalize` / `mergeWithBase` / `DEFAULT_SETTINGS`
- Produces（Task 5/6 依赖）：`ActiveTab = 'general' | 'mooc' | 'zhihuishu'`；`UiSettings { activeTab: ActiveTab }`；`DEFAULT_UI = { activeTab: 'mooc' }`；`Settings.ui`；规范化负责把非法取值收敛回默认

- [ ] **Step 1: 先写测试（追加到 `settings-migration.test.ts` 末尾）**

```ts
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
```

- [ ] **Step 2: 跑测试，确认它红**

Run: `pnpm --filter @study-pilot/application test settings-migration`
Expected: FAIL —— `settings.ui` 是 undefined（第一条断言 `Cannot read properties of undefined`）。

- [ ] **Step 3: 改 `packages/application/src/config/index.ts`**

在 `Settings` 接口处加入 `ui`，并新增类型/默认值（放在接口之前）：

```ts
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
  ai: AiSettings;
  ui: UiSettings;
}
```

`DEFAULT_SETTINGS` 加一行：

```ts
export const DEFAULT_SETTINGS: Settings = {
  version: SETTINGS_VERSION,
  ai: DEFAULT_AI,
  mooc: DEFAULT_MOOC,
  ui: DEFAULT_UI,
};
```

版本号 6 → 7，并补一段注释（写在既有版本注释之后）：

```ts
/*
 * 版本 7：新增 `ui.activeTab`（记住上次停留的 tab）。纯新增——
 * 存量数据没有这个键，合并时由新骨架补上默认值（mooc），不需要迁移段；
 * 需要的是取值收敛，见 normalize 里对 ACTIVE_TABS 的核对。
 */
export const SETTINGS_VERSION = 7;
```

`normalize` 的返回值加 ui 收敛（与现有 mooc/ai 两处兜底并列）：

```ts
  const activeTab = (ACTIVE_TABS as readonly string[]).includes(merged.ui.activeTab)
    ? merged.ui.activeTab
    : DEFAULT_UI.activeTab;

  return {
    ...merged,
    version: SETTINGS_VERSION,
    ui: { activeTab },
    mooc: { ... },
    ai: { ... },
  };
```

同时把文件头注释里的「跨平台的只剩 version 与 ai」改为「跨平台的只剩 version、ai 与 ui」。

- [ ] **Step 4: 跑测试，确认绿**

Run: `pnpm --filter @study-pilot/application test`
Expected: 全部 PASS（含既有迁移测试）。

- [ ] **Step 5: 扩展侧的门转出新名字（`apps/extension/src/settings/index.ts`）**

```ts
export type {
  ActiveTab,
  AiSettings,
  MoocSettings,
  SelectedCourse,
  Settings,
  UiSettings,
} from '@study-pilot/application';
export {
  DEFAULT_AI,
  DEFAULT_MOOC,
  DEFAULT_SETTINGS,
  DEFAULT_UI,
  SETTINGS_VERSION,
  mergeWithBase,
  normalize,
} from '@study-pilot/application';
export { configStore, getSettings, updateSettings } from './storage.ts';
```

- [ ] **Step 6: 类型检查全绿 + 提交**

Run: `pnpm -r typecheck`
Expected: 全部通过。

```bash
git add packages/application/src/config/index.ts packages/application/test/settings-migration.test.ts apps/extension/src/settings/index.ts
git commit -m "feat(config): 新增 ui.activeTab（记住上次停留的 tab）——版本 7，纯新增 + 取值收敛"
```

---

### Task 5: 设置页接入（三 tab + 骨架首帧 + 行模板 + 按需加载）

**Files:**
- Create: `apps/extension/src/ui/tabs.ts`（共享 tab 行为，弹窗也用）
- Modify: `apps/extension/entrypoints/options/style.css`（全量替换＝瘦身）
- Modify: `apps/extension/entrypoints/options/index.html`（全量替换：tab 结构 + 骨架）
- Modify: `apps/extension/entrypoints/options/main.ts`（全量替换：按需装配）
- Modify: `apps/extension/entrypoints/options/courses.ts`（`buildRow` 拍平 + `.is-off` + 错误着色）
- Modify: `apps/extension/entrypoints/options/courseware.ts`（`buildRow` 名字组 + 运行行标记 + 错误着色）
- Modify: `apps/extension/entrypoints/options/status-line.ts`（顺带写 tab 徽标）
- Test: `apps/extension/test/*`（现有全跑，必须绿）

**Interfaces:**
- Consumes: Task 1–4 全部
- Produces（Task 6 依赖）：`src/ui/tabs.ts` 的 `initTabs(hooks)`：`TabId = 'general' | 'mooc' | 'zhihuishu'`；钩子 `onFirstActivate(id)`（某 tab 第一次成为当前 tab）、`onActivate(id)`（每次切换）；记忆落 `settings.ui.activeTab`；未知/不存在的记忆值回落到第一个 tab（弹窗的 general→mooc 靠它）

- [ ] **Step 1: 新建 `src/ui/tabs.ts`**

```ts
/*
 * 平台 tab 条的行为——设置页与弹窗共用一份（长相在 components.css）。
 *
 * 三件事：
 *   记忆——打开回到上次停留的 tab（settings.ui.activeTab，随切随写）；
 *   按需——只有「第一次切到」才让所属页面去取数（通用零请求、智慧树占位）；
 *   无障碍——W3C APG 的 tabs 模式：role=tablist/tab/tabpanel（在各方 HTML 里）、
 *   roving tabindex、←/→/Home/End。
 *
 * 取数钩子由入口传进来（本文件不认识 courses/courseware，只管 tab）。
 * 记忆值在页面上不存在时（弹窗没有「通用」）回落到第一个 tab——
 * 这就是规格 13.2 里「落到 general 按 mooc 处理」的实现。
 */

import { getSettings, updateSettings } from '../ui-bridge';

export type TabId = 'general' | 'mooc' | 'zhihuishu';

const TAB_IDS: readonly string[] = ['general', 'mooc', 'zhihuishu'];

function isTabId(value: string | undefined): value is TabId {
  return value !== undefined && TAB_IDS.includes(value);
}

export interface TabsHooks {
  /** 某 tab 第一次成为当前 tab（取数的时机；通用与智慧树没有要取的数） */
  onFirstActivate?: (id: TabId) => void;
  /** 每次切换都调用（如弹窗按 tab 更新「全部执行」的可用性） */
  onActivate?: (id: TabId) => void;
}

/** 装配 tab 条。DOM 约定：`.tabs > .tab[data-tab]` 与 `#panel-<id>[data-tab]`。 */
export async function initTabs(hooks: TabsHooks = {}): Promise<void> {
  const tabsEl = document.getElementById('tabs');
  if (tabsEl === null) return;

  const tabs = Array.from(tabsEl.querySelectorAll<HTMLButtonElement>('.tab'));
  const panels = new Map<TabId, HTMLElement>();
  for (const tab of tabs) {
    const id = tab.dataset.tab;
    if (!isTabId(id)) continue;
    const panel = document.getElementById(`panel-${id}`);
    if (panel !== null) panels.set(id, panel);
  }

  /** 已经取过数的 tab：同一次打开内切回不重读（重开一切重来） */
  const activated = new Set<TabId>();

  function activate(id: TabId, moveFocus = false): void {
    for (const tab of tabs) {
      const on = tab.dataset.tab === id;
      tab.classList.toggle('is-active', on);
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
    }
    for (const [panelId, panel] of panels) panel.hidden = panelId !== id;

    if (moveFocus) tabs.find((tab) => tab.dataset.tab === id)?.focus();

    hooks.onActivate?.(id);
    if (!activated.has(id)) {
      activated.add(id);
      hooks.onFirstActivate?.(id);
    }
  }

  function switchTo(tab: HTMLButtonElement): void {
    const id = tab.dataset.tab;
    if (!isTabId(id)) return;
    activate(id);
    void updateSettings({ ui: { activeTab: id } });
  }

  tabsEl.addEventListener('click', (event) => {
    const target = (event.target as HTMLElement).closest<HTMLButtonElement>('.tab');
    if (target !== null) switchTo(target);
  });

  // ←/→ 绕圈，Home/End 到两端（APG 的建议做法）；焦点跟着走、切换即刻生效
  tabsEl.addEventListener('keydown', (event) => {
    const current = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
    if (current < 0) return;
    let next: number | null = null;
    if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    if (next === null) return;
    event.preventDefault();
    const target = tabs[next];
    if (target !== undefined) {
      switchTo(target);
      target.focus();
    }
  });

  const settings = await getSettings();
  const remembered = settings.ui.activeTab;
  const initial =
    tabs.some((tab) => tab.dataset.tab === remembered) && isTabId(remembered)
      ? remembered
      : (tabs[0]?.dataset.tab as TabId | undefined) ?? 'mooc';
  activate(initial);
}
```

- [ ] **Step 2: 全量替换 `entrypoints/options/style.css`**

```css
@import '../../src/ui/tokens.css';
@import '../../src/ui/controls.css';
@import '../../src/ui/components.css';

/*
 * 设置页。单列，居中：页头一行、平台 tab（通用/慕课/智慧树）、
 * 当前 tab 的面板、页脚一行。
 *
 * 面板、tab、行模板、说明、骨架、按钮骨架都在共享层
 * （components.css / controls.css）——本文件只留页面容器与表单。
 *
 * 间距与字号一律取 tokens.css 的标尺；本文件不再出现手挑的 px。
 */

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font);
  font-size: var(--text-md);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

.page {
  max-width: 680px;
  margin: 0 auto;
  padding: var(--space-40) var(--space-24) var(--space-80);
}

.masthead {
  margin-bottom: var(--space-12);
}

.masthead h1 {
  margin: 0;
  font-size: var(--text-xl);
  font-weight: 700;
  letter-spacing: -0.01em;
}

/* 平台 tab：页头与内容之间 */
.page > .tabs {
  margin-bottom: var(--space-12);
}

/* 两个列表都可能很长：限高到五六行，内部滚动 */
#course-list,
#courseware-list {
  max-height: 320px;
  overflow-y: auto;
  overscroll-behavior: contain;
}

/* ---------- 表单 ---------- */

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-top: var(--space-12);
}

.field-label {
  font-size: var(--text-sm);
  color: var(--ink-soft);
}

.field input {
  width: 100%;
  height: 32px;
  padding: 0 var(--space-12);
  border: none;
  border-radius: var(--radius-sm);
  background: var(--control);
  color: var(--ink);
  font: inherit;
  font-size: var(--text-md);
}

.field input::placeholder {
  color: var(--ink-faint);
}

.field input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

.check {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  font-size: var(--text-md);
  cursor: pointer;
}

.check input[type='checkbox'] {
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: var(--accent);
  cursor: pointer;
}

/* ---------- 页脚与链接 ---------- */

.foot {
  margin-top: var(--space-24);
  font-size: var(--text-sm);
  color: var(--ink-faint);
}

a { color: var(--accent); }

a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

- [ ] **Step 3: 全量替换 `entrypoints/options/index.html`**

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Study Pilot 设置</title>
    <!--
      设置页在独立标签页中打开，而不是嵌进扩展管理页的小弹窗。
      不声明这一条的话，WXT 生成的 manifest 会写成 open_in_tab: false，
      即便 wxt.config.ts 里写的是 true——entrypoint 自己的声明优先。
      嵌在小弹窗里时页面宽度只有约 600px，表单会被压成一条窄栏。
    -->
    <meta name="manifest.open_in_tab" content="true" />
    <!-- 样式在 main.ts 里通过 import 引入（理由见 popup/index.html 同款注释） -->
  </head>
  <body>
    <div class="page">
      <!--
        页头只有名字：状态数据放在它所属的地方——未登录提示在课程卡里、
        课件数在课件卡里、待交数是弹窗与 tab 徽标的事。页头不做仪表盘。
      -->
      <header class="masthead">
        <h1>Study Pilot</h1>
      </header>

      <!--
        平台 tab：通用 / 慕课 / 智慧树（规格第 13 节）。
        打开回到上次停留的 tab；一次打开最多读一家——通用零平台请求、
        慕课只在它是当前 tab 时读、智慧树先占位。行为与记忆见 src/ui/tabs.ts。
      -->
      <div class="tabs" id="tabs" role="tablist" aria-label="设置分区">
        <button class="tab" role="tab" id="tab-general" data-tab="general" aria-controls="panel-general" aria-selected="false" tabindex="-1" type="button">通用</button>
        <button class="tab" role="tab" id="tab-mooc" data-tab="mooc" aria-controls="panel-mooc" aria-selected="false" tabindex="-1" type="button">慕课<span class="tab-count" id="tab-count-mooc" hidden></span></button>
        <button class="tab" role="tab" id="tab-zhihuishu" data-tab="zhihuishu" aria-controls="panel-zhihuishu" aria-selected="false" tabindex="-1" type="button">智慧树</button>
      </div>

      <!-- 通用：跨平台功能（AI 连接）。配置即时读，没有平台请求 -->
      <section class="tab-panel" role="tabpanel" id="panel-general" aria-labelledby="tab-general" data-tab="general" hidden>
        <section class="panel">
          <div class="panel-head">
            <h2 class="panel-title">AI 连接（智谱）</h2>
            <button id="ai-test" class="btn" type="button">保存并测试连接</button>
          </div>
          <label class="check">
            <input id="ai-enabled" type="checkbox" />
            <span>启用（讨论单元的留言需要它）</span>
          </label>
          <label class="field">
            <span class="field-label">模型</span>
            <input id="ai-model" type="text" placeholder="glm-4-flash（免费）" />
          </label>
          <label class="field">
            <span class="field-label">密钥</span>
            <input id="ai-api-key" type="password" />
          </label>
          <p class="note">
            AI 请求只发往智谱开放平台（open.bigmodel.cn），glm-4-flash 免费。
            没有密钥就去
            <a href="https://open.bigmodel.cn/" target="_blank" rel="noreferrer">智谱开放平台</a>
            申请：注册后完成实名认证，在控制台 → API Keys 里新建。
          </p>
          <span class="note" id="ai-status"></span>
        </section>
      </section>

      <!--
        慕课：平台自己的三块。数据只在慕课第一次成为当前 tab 时读一次
        （见 main.ts 的 onFirstActivate）。
      -->
      <section class="tab-panel" role="tabpanel" id="panel-mooc" aria-labelledby="tab-mooc" data-tab="mooc" hidden>
        <section class="panel">
          <div class="panel-head">
            <h2 class="panel-title">账号与课程</h2>
            <p class="head-status" id="session-text"></p>
            <button id="refresh-courses" class="btn ghost" type="button">读取课程列表</button>
          </div>
          <!-- 等待平台读取：骨架照抄勾选行的列（勾选位/课名/右列元信息），落定不跳 -->
          <div id="course-list">
            <div class="course-row" aria-hidden="true">
              <span class="skeleton is-box"></span>
              <span class="skeleton is-line" style="width: 190px"></span>
              <span class="skeleton is-meta" style="width: 150px"></span>
            </div>
            <div class="course-row" aria-hidden="true">
              <span class="skeleton is-box"></span>
              <span class="skeleton is-line" style="width: 220px"></span>
              <span class="skeleton is-meta" style="width: 150px"></span>
            </div>
            <div class="course-row" aria-hidden="true">
              <span class="skeleton is-box"></span>
              <span class="skeleton is-line" style="width: 170px"></span>
              <span class="skeleton is-meta" style="width: 150px"></span>
            </div>
          </div>
        </section>

        <!--
          课件：每门课的已完成 / 总数，与「快速完成」。
          它不在弹窗里——课件没有截止时间，属于「想清进度时来一趟」的地方。
          跑起来时进度与「停止」都在它自己那行，结果用底部浮层提示（见 courseware.ts）。
        -->
        <section class="panel">
          <h2 class="panel-title">课件</h2>
          <!-- 等待平台读取：骨架照抄数据行的列（课名/进度 96px/按钮位 76×26） -->
          <div id="courseware-list">
            <div class="cw-row" aria-hidden="true">
              <span class="skeleton is-line" style="width: 170px"></span>
              <span class="skeleton is-meta" style="width: 80px; justify-self: end"></span>
              <span class="skeleton is-btn" style="width: 76px"></span>
            </div>
            <div class="cw-row" aria-hidden="true">
              <span class="skeleton is-line" style="width: 200px"></span>
              <span class="skeleton is-meta" style="width: 80px; justify-self: end"></span>
              <span class="skeleton is-btn" style="width: 76px"></span>
            </div>
            <div class="cw-row" aria-hidden="true">
              <span class="skeleton is-line" style="width: 150px"></span>
              <span class="skeleton is-meta" style="width: 80px; justify-self: end"></span>
              <span class="skeleton is-btn" style="width: 76px"></span>
            </div>
          </div>
        </section>

        <section class="panel">
          <h2 class="panel-title">互评评语</h2>
          <label class="field">
            <input id="review-comment" type="text" aria-label="互评评语" />
          </label>
          <p class="note">平台要求评语非空；留空会退回默认那句（见输入框里的值）。</p>
        </section>
      </section>

      <!-- 智慧树：占位（功能未接入）。不是骨架、不是错误——没有东西在等 -->
      <section class="tab-panel" role="tabpanel" id="panel-zhihuishu" aria-labelledby="tab-zhihuishu" data-tab="zhihuishu" hidden>
        <p class="tab-empty">智慧树还没接入。它的功能做好后，课程与课件会出现在这个 tab 下。</p>
      </section>

      <!-- 页脚：版本与出处。它不是内容，一行弱色就够，不占一张卡 -->
      <footer class="foot">
        <span id="version"></span> · <a href="https://github.com/RyanRuiLiu/study-pilot" target="_blank" rel="noreferrer">GitHub</a> · MIT
      </footer>
    </div>

    <!-- 提示条。放在内容之外，浮在底部居中，不占布局位置 -->
    <span id="toast" class="toast" role="status" aria-live="polite"></span>

    <script type="module" src="./main.ts"></script>
  </body>
</html>
```

- [ ] **Step 4: 全量替换 `entrypoints/options/main.ts`**

```ts
/*
 * 设置页（入口）。
 *
 * 平台 tab（通用/慕课/智慧树）由 src/ui/tabs.ts 装配：
 *   通用＝配置即时读（AI 连接，随页面初始化）；
 *   慕课＝平台数据，只在它第一次成为当前 tab 时读一次；
 *   智慧树＝占位。
 * 「一次打开最多读一家」见规格第 13 节。
 *
 * 数据只从 src/ui-bridge.ts（以及平台包的纯地址工具）取。
 * 样式分三层引入：tokens（取值）、本页布局、共享组件；import 而不是 <link>（理由见 popup）。
 *
 * 装配在这里，各块实现见同级模块。
 */

import '../../src/ui/tokens.css';
import './style.css';

import { getCourseware } from '../../src/ui-bridge';
import { initTabs } from '../../src/ui/tabs.ts';
import { initCourseActions, renderCourses } from './courses.ts';
import { renderCourseware } from './courseware.ts';
import { renderParams } from './params.ts';
import { renderStatusLine } from './status-line.ts';
import { initToast } from './toast.ts';

function init(): void {
  const toastEl = document.getElementById('toast');
  if (toastEl !== null) initToast(toastEl);

  const versionEl = document.getElementById('version');
  if (versionEl !== null) versionEl.textContent = `v${browser.runtime.getManifest().version}`;

  /*
   * 配置类的块（评语、AI 连接）不依赖平台网络：始终初始化——
   * 两个 tab 面板都在 DOM 里（隐藏的那个也填好），切过去就是现成的。
   */
  void renderParams();

  void initTabs({
    onFirstActivate: (id) => {
      if (id !== 'mooc') return;
      /*
       * 课件进度只读一次，状态行与课件区共用：各读各的会让这一 tab
       * 一打开就发两遍同样的请求，而两处显示的是同一件事。
       */
      const courseware = getCourseware();
      initCourseActions();
      void renderCourses();
      void renderStatusLine(courseware);
      void renderCourseware(courseware);
    },
  });
}

init();
```

- [ ] **Step 5: 改 `entrypoints/options/courses.ts`（`buildRow` 与失败说明）**

`buildRow` 全量替换为：

```ts
function buildRow(course: SelectedCourse): HTMLElement {
  const row = document.createElement('label');
  row.className = 'course-row';
  row.classList.toggle('is-off', !course.enabled);

  const check = document.createElement('input');
  check.type = 'checkbox';
  check.checked = course.enabled;

  /*
   * 点课程名打开学习页；点勾选框只切换参与。
   * 名链接嵌在 label 里：给链接加 stopPropagation，避免点击被 label 吞掉又翻转勾选。
   */
  const name = document.createElement('a');
  name.className = 'course-name';
  name.href = coursePageUrl(course);
  name.target = '_blank';
  name.rel = 'noreferrer';
  name.textContent = course.name;
  name.addEventListener('click', (event) => event.stopPropagation());

  const meta = document.createElement('span');
  meta.className = 'course-meta';
  const range = formatTermRange(course.startTime, course.endTime);
  const parts = [course.schoolName, range];
  // 未选课的课读不到内容（平台不给结构），在列表里如实标出来
  if (course.hasEnroll === false) parts.push('未选课');
  meta.textContent = parts.filter(Boolean).join(' · ');

  row.append(check, name, meta);

  check.addEventListener('change', () => {
    // 弱化态跟着勾选走：勾上就不灰，取消就灰（不等重画）
    row.classList.toggle('is-off', !check.checked);
    void toggle(course.termId, check.checked);
  });

  return row;
}
```

`note()` 增加错误变体，读取失败的调用点改用它：

```ts
/** 列表里的一句说明；error 为真时用警示色（读取失败如实说）。 */
function note(text: string, error = false): HTMLElement {
  const el = document.createElement('p');
  el.className = error ? 'note is-error' : 'note';
  el.textContent = text;
  return el;
}
```

renderCourses 的 catch 分支改为：

```ts
  } catch (error) {
    listEl.replaceChildren(note(error instanceof Error ? error.message : String(error), true));
    return;
  }
```

- [ ] **Step 6: 改 `entrypoints/options/courseware.ts`（`buildRow`、运行行标记、错误说明）**

`buildRow` 全量替换为：

```ts
/** 一门课一行：名字组（课名 + 运行明细）、已学 x/y、「快速完成」/「停止」。 */
function buildRow(entry: CoursewareProgress): HTMLElement {
  const row = document.createElement('div');
  row.className = 'cw-row';

  const group = document.createElement('span');
  group.className = 'cw-group';

  const name = document.createElement('span');
  name.className = 'cw-name';
  name.textContent = entry.courseName;

  /*
   * 运行小字：跑这门课时写在这里（订阅推送更新），紧跟课名同排；
   * 挂在行上而不是别处——点的是这一行，进度与「停止」也都该在这一行。
   */
  const current = document.createElement('span');
  current.className = 'cw-current';
  current.hidden = true;
  currents.set(entry.courseName, current);

  group.append(name, current);

  const progress = document.createElement('span');
  progress.className = 'cw-progress';
  if (entry.unread === true) {
    /*
     * 结构没读到，只说事实：平台没有返回这门课的结构。实测（2026-10-15）
     * 这种课的共同点是「已不在平台的课程列表里」——多半是退课/下架留下的
     * 旧记录，刷新课程列表即可清掉。不猜别的原因。
     */
    progress.textContent = '读不到内容';
    progress.title = '平台没有返回这门课的结构；点上方「读取课程列表」刷新后，已不在你课程里的旧记录会被清掉';
  } else if (entry.total === 0) {
    // 结构读到了但是空的（实测：课程列表里它的课时数本身就是 0）
    progress.textContent = '读不到内容';
    progress.title = '平台返回的结构是空的（0 章节 0 单元）';
  } else {
    progress.textContent = `已学 ${entry.done}/${entry.total}`;
    progress.title = `未完成且能自动做的 ${entry.pending} 项`;
  }

  const button = document.createElement('button');
  button.className = 'btn ghost';
  button.type = 'button';
  button.textContent = '快速完成';
  if (entry.pending === 0) {
    button.disabled = true;
    button.dataset.empty = 'yes';
    button.dataset.emptyTitle =
      entry.total === 0 ? '这门课没有读到内容' : '这门课没有要做的课件了';
    button.title = button.dataset.emptyTitle;
  }
  buttonsOfCourse.set(entry.courseName, button);

  button.addEventListener('click', () => {
    // 同一枚按钮两种身份：跑着的时候它是「停止」
    if (button.dataset.mode === 'stop') {
      button.disabled = true;
      stopping = true;
      current.hidden = false;
      current.textContent = STOPPING_TEXT;
      void stopRun().then((result) => {
        if (result.stopped) {
          stoppedHere = true;
          return;
        }
        // 没停到（多半是刚好已经跑完）：整行还原，别挂着「正在停止」
        stopping = false;
        delete button.dataset.mode;
        button.textContent = '快速完成';
        button.disabled = button.dataset.empty === 'yes';
        button.title = button.dataset.emptyTitle ?? '';
        current.hidden = true;
      });
      return;
    }
    stopping = false; // 新一轮开始：上一轮留下的停止态不该算到它头上
    localRun = true;
    void runNow(
      {
        setStatus,
        setEnabled,
        refresh: refreshCourseViews,
      },
      { kinds: COURSEWARE_KINDS, group: entry.courseName },
    );
  });

  buttons.push(button);
  row.append(group, progress, button);
  return row;
}
```

`watchRun()` 里的小字更新循环加一行行标记（该行的整行浅底跟着明细走）：

```ts
    // 行内小字：只有跑的那门课有；停止收尾中冻结（「正在停止…」由点击处写）
    for (const [course, el] of currents) {
      if (running && stopping) continue;
      const text = running && step !== null && step.course === course ? progressLine(step) : undefined;
      el.hidden = text === undefined;
      el.closest('.cw-row')?.classList.toggle('is-running', text !== undefined);
      if (text !== undefined) el.textContent = text;
    }
```

`note()` 加错误变体；`renderCourseware` 的 catch 与 error 分支改用：

```ts
/** 列表区里的一句说明；error 为真时用警示色。 */
function note(text: string, error = false): HTMLElement {
  const el = document.createElement('p');
  el.className = error ? 'note is-error' : 'note';
  el.textContent = text;
  return el;
}
```

```ts
  } catch (error) {
    listEl.replaceChildren(note(error instanceof Error ? error.message : String(error), true));
    return;
  }
```

```ts
  if (outcome.status === 'error') {
    listEl.append(
      note(
        outcome.reason === 'NOT_LOGGED_IN'
          ? '未登录——先在浏览器里登录慕课平台。'
          : `读取失败：${outcome.message}`,
        outcome.reason !== 'NOT_LOGGED_IN',
      ),
    );
    return;
  }
```

- [ ] **Step 7: 改 `entrypoints/options/status-line.ts`（顺带写 tab 徽标，不加请求）**

在课件读取落定、算出 `count` 之后（`parts.push(...)` 两段之后）加：

```ts
    // tab 徽标与状态行同源：同一次读取顺带写上，不为它多读一次
    const badge = document.getElementById('tab-count-mooc');
    if (badge !== null) {
      badge.textContent = count === 0 ? '' : String(count);
      badge.hidden = count === 0;
    }
```

- [ ] **Step 8: 测试与类型检查全绿**

Run: `pnpm --filter @study-pilot/extension test && pnpm --filter @study-pilot/extension typecheck`
Expected: 全部 PASS。

- [ ] **Step 9: 真机看一眼设置页（构建重载）**

```bash
pnpm probe kill
pnpm build
pnpm probe open
pnpm probe ext reload
```

检查（对照 spec §13 与画稿 `tabs-final.html`）：三个 tab 就位、打开落在上次停留的 tab；停在通用＝网络面板零平台请求；切到慕课＝骨架落位后内容同刻替换、tab 上出现 `18`；切到智慧树＝占位一句话；「保存并测试连接」在右上角。**不用截图自审——构建重载后交 Ryan 看。**

- [ ] **Step 10: 提交**

```bash
git add apps/extension/src/ui/tabs.ts apps/extension/entrypoints/options/
git commit -m "feat(options): 三 tab（通用/慕课/智慧树）+ 按需加载与记忆——行模板落地、骨架守位、徽标同源"
```

---

### Task 6: 弹窗接入（两 tab + 状态行全局 + 待办条两行两列）

**Files:**
- Modify: `apps/extension/entrypoints/popup/style.css`（全量替换＝瘦身）
- Modify: `apps/extension/entrypoints/popup/index.html`（全量替换：状态行上移 + tab 条 + 占位）
- Modify: `apps/extension/entrypoints/popup/main.ts`（装配 tab 与作用域）
- Modify: `apps/extension/entrypoints/popup/todo.ts`（`buildRow` 重构、登录按钮改 `.btn`、徽标）
- Modify: `apps/extension/entrypoints/popup/status.ts`（run 按钮可用性收口 `applyRunEnabled` + `setRunScope`）
- Test: `apps/extension/test/*`（现有全跑，必须绿）

**Interfaces:**
- Consumes: Task 1–5 全部（含 `src/ui/tabs.ts`）
- Produces: 弹窗 DOM 结构（`.bar > .state > .tabs > .tab-panel#panel-mooc/#panel-zhihuishu`）；`status.ts` 的 `setRunScope(allows: boolean)`

- [ ] **Step 1: 全量替换 `entrypoints/popup/style.css`**

```css
@import '../../src/ui/tokens.css';
@import '../../src/ui/controls.css';
@import '../../src/ui/components.css';

/*
 * 弹窗。宽 320px，通体白面，自上而下：
 *   顶栏一行 —— 品牌、全部执行、更多
 *   状态行   —— 全局一轮的执行进度/结果（平时收起到零高，不随 tab）
 *   平台 tab —— 慕课 / 智慧树（弹窗没有通用项）
 *   待办     —— 当前 tab 的主体，占其余全部高度
 *
 * 320 而不是更宽：宽度由最长的一行定（处置句 + 执行 + 日期），
 * 再宽只会让行中间多出一段空白。极端长的任务名会折行，那是内容的事。
 *
 * 顶栏、状态行、tab、待办条与组的长相都在 components.css——本文件只留容器。
 */

* { box-sizing: border-box; }

body {
  margin: 0;
  width: 320px;
  background: var(--paper-2);
  color: var(--ink);
  font-family: var(--font);
  font-size: var(--text-md);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

.todo {
  max-height: 480px;
  overflow-y: auto;
  overscroll-behavior: contain;
}
```

- [ ] **Step 2: 全量替换 `entrypoints/popup/index.html`**

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Study Pilot</title>
    <!--
      样式在 main.ts 里通过 import 引入。
      不用 <link>：构建后源路径不会被打包器改写，会变成死链，
      页面于是回退到浏览器默认样式（字体、间距全丢）。
    -->
  </head>
  <body>
    <main class="pop">
      <!--
        顶栏一行放完：品牌、全部执行、更多。
        「全部执行」只做当前 tab 平台的待办（测验、作业、考试里能替你做的那部分），
        与每行悬停现身的「执行」配成一对：全部 vs 单条。
        课件不在这里——它没有截止时间，属于设置页的「课件」区。
      -->
      <header class="bar">
        <span class="brand">Study Pilot</span>
        <button id="run-now" class="btn" type="button" title="全部执行：把待办里能替你做的一次做完">全部执行</button>
        <button id="open-settings" class="btn ghost" type="button">更多</button>
      </header>

      <!--
        状态行：一轮执行的进度与结果——全局的（不分 tab，切到哪家都说哪家，
        停止永远够得着）。文字单独一个元素：setText 会整体改写它，按钮不能住在里面。
      -->
      <div id="state-line" class="state is-blank">
        <span id="state-text" class="state-text"></span>
        <button id="stop-run" class="state-stop" type="button" title="停止执行：不再发新的写请求">停止</button>
      </div>

      <!--
        平台 tab：慕课 / 智慧树（规格第 13 节）。打开回到上次停留的
        平台（记忆落到「通用」时按慕课处理）；一次打开最多读一家。
        行为见 src/ui/tabs.ts。
      -->
      <div class="tabs" id="tabs" role="tablist" aria-label="平台">
        <button class="tab" role="tab" id="tab-mooc" data-tab="mooc" aria-controls="panel-mooc" aria-selected="false" tabindex="-1" type="button">慕课<span class="tab-count" id="tab-count-mooc" hidden></span></button>
        <button class="tab" role="tab" id="tab-zhihuishu" data-tab="zhihuishu" aria-controls="panel-zhihuishu" aria-selected="false" tabindex="-1" type="button">智慧树</button>
      </div>

      <section class="tab-panel" role="tabpanel" id="panel-mooc" aria-labelledby="tab-mooc" data-tab="mooc" hidden>
        <!--
          待办区先放三条骨架：弹窗每次打开都要拉一次最新数据（约两秒）。
          骨架照抄真实待办条的列（行 1 名字+徽标、右列剩余时间；行 2 处置、右列日期），
          落定时直接从占位换内容，不跳。写入第一份数据时整体被替换。
        -->
        <div id="todo-text" class="todo is-loading">
          <div class="todo-item" aria-hidden="true">
            <span class="todo-line"><span class="skeleton is-line" style="width: 150px"></span><span class="skeleton is-badge" style="width: 44px"></span></span>
            <span class="skeleton is-meta" style="width: 48px; grid-area: 1 / 2; justify-self: end"></span>
            <span class="skeleton is-meta" style="width: 110px; grid-area: 2 / 1"></span>
            <span class="skeleton is-meta" style="width: 44px; grid-area: 2 / 2; justify-self: end"></span>
          </div>
          <div class="todo-item" aria-hidden="true">
            <span class="todo-line"><span class="skeleton is-line" style="width: 170px"></span><span class="skeleton is-badge" style="width: 44px"></span></span>
            <span class="skeleton is-meta" style="width: 48px; grid-area: 1 / 2; justify-self: end"></span>
            <span class="skeleton is-meta" style="width: 130px; grid-area: 2 / 1"></span>
            <span class="skeleton is-meta" style="width: 44px; grid-area: 2 / 2; justify-self: end"></span>
          </div>
          <div class="todo-item" aria-hidden="true">
            <span class="todo-line"><span class="skeleton is-line" style="width: 140px"></span><span class="skeleton is-badge" style="width: 44px"></span></span>
            <span class="skeleton is-meta" style="width: 48px; grid-area: 1 / 2; justify-self: end"></span>
            <span class="skeleton is-meta" style="width: 120px; grid-area: 2 / 1"></span>
            <span class="skeleton is-meta" style="width: 44px; grid-area: 2 / 2; justify-self: end"></span>
          </div>
        </div>
      </section>

      <!-- 智慧树：占位（功能未接入）。不是骨架、不是错误——没有东西在等 -->
      <section class="tab-panel" role="tabpanel" id="panel-zhihuishu" aria-labelledby="tab-zhihuishu" data-tab="zhihuishu" hidden>
        <p class="tab-empty">智慧树还没接入。它的功能做好后，待办会出现在这里。</p>
      </section>
    </main>
    <script type="module" src="./main.ts"></script>
  </body>
</html>
```

- [ ] **Step 3: 改 `entrypoints/popup/status.ts`（可用性收口 + 作用域）**

改动三处（其余不动）：

1) 模块顶部状态变量旁加：

```ts
/** 此刻有没有一轮在跑（收口 run 按钮的可用性） */
let runningNow = false;
/** 当前 tab 的平台允许执行吗（智慧树占位期＝不允许） */
let scopeAllowsRun = true;

/** run 按钮的唯一收口：执行中禁用、平台没有可执行内容时禁用 */
function applyRunEnabled(): void {
  if (runBtn) runBtn.disabled = runningNow || !scopeAllowsRun;
}

/** 「全部执行」作用于当前 tab 的平台；占位平台没有可执行内容 */
export function setRunScope(allows: boolean): void {
  scopeAllowsRun = allows;
  applyRunEnabled();
}
```

2) `setRunning` 里 `if (runBtn) runBtn.disabled = running;` 一条改为：

```ts
  runningNow = running;
  applyRunEnabled();
```

3) `renderState` 里两处按钮写入同样收口：运行分支与结尾的 `if (runBtn) runBtn.disabled = running;` 改为

```ts
    runningNow = running;
    applyRunEnabled();
```

（放在 `return running;` 之前；catch 分支的 `if (runBtn) runBtn.disabled = false;` 改为 `runningNow = false; applyRunEnabled();`。）

- [ ] **Step 4: 全量替换 `entrypoints/popup/main.ts` 的 init 主体**

```ts
/*
 * 扩展弹窗（入口）。
 *
 * 数据来源：
 *   状态行   后台的 getTaskState（本地状态，不联网）+ 运行状态的推送——全局，不分 tab
 *   待办     当前 tab 的平台现读现算：能替你做的那部分标出来，其余交给你
 *
 * 平台 tab（慕课/智慧树）由 src/ui/tabs.ts 装配：打开只读默认平台的那一家，
 * 切到没读过的平台才取数——一次打开最多读一家（规格第 13 节）。
 *
 * 两者都只从 src/ui-bridge.ts 取——界面唯一的取数入口，不 import
 * src/adapters、src/background、src/browser、src/settings。
 *
 * 样式分三层引入：tokens（取值）、本页布局、共享组件。
 * 必须通过 import 引入，不能用 HTML 的 <link>——构建后源路径不会被
 * 打包器改写，会变成死链，页面于是回退到浏览器默认样式。
 *
 * 分工：元素引用见 elements.ts，状态行与跟随见 status.ts，
 * 待办渲染见 todo.ts；本文件只做装配。
 */

import '../../src/ui/tokens.css';
import './style.css';

import { runNow } from '../../src/ui-bridge';
import { PENDING_KINDS } from '../../src/ui/scopes.ts';
import { initTabs } from '../../src/ui/tabs.ts';
import { runBtn, settingsBtn } from './elements.ts';
import { renderState, setFollowIdleHandler, setRunning, setRunScope, showStatus, watchRunState } from './status.ts';
import { renderTodo } from './todo.ts';

async function init(): Promise<void> {
  watchRunState();
  setFollowIdleHandler(() => {
    void renderTodo();
  });

  /*
   * 状态行先在本地画出（不联网，快），执行状态是全局的、不随 tab。
   * 待办只拉一次：现在的界面不缓存任何平台数据，每次渲染就是一次真实
   * 网络往返，拉两遍纯属浪费。数据到达前那三条骨架就是给这段等待的。
   */
  await renderState();

  await initTabs({
    onFirstActivate: (id) => {
      if (id === 'mooc') void renderTodo();
    },
    onActivate: (id) => {
      // 「全部执行」作用于当前 tab 的平台：智慧树占位期没有可执行的内容
      setRunScope(id === 'mooc');
    },
  });

  runBtn?.addEventListener('click', () => {
    /*
     * 按钮文字始终是「全部执行」，不随状态变化。
     * 先前点下去改成「执行中」、结束后又改回来，字数从 2 变 3 再变 4，
     * 而旁边按钮宽度固定，于是整排按钮在点击过程中被推着左右移动。
     * 执行中的信息交给状态行表达，按钮只负责「可以点」与「不能点」。
     *
     * 范围只发待办那几类（PENDING_KINDS）：课件不在这里点——
     * 它没有截止时间，属于设置页的「课件」区。
     */
    void runNow(
      {
        setStatus: showStatus,
        setEnabled: (enabled) => setRunning(!enabled),
        refresh: () => renderTodo(),
      },
      { kinds: PENDING_KINDS },
    );
  });

  settingsBtn?.addEventListener('click', () => {
    void browser.runtime.openOptionsPage();
    window.close();
  });
}

void init();
```

- [ ] **Step 5: 重构 `entrypoints/popup/todo.ts` 的 `buildRow` + 登录按钮 + 徽标**

`buildRow` 全量替换为：

```ts
/**
 * 构造一条待办。
 *
 * 两行两列（列定义在 components.css）：
 *   行1 左：任务名 + 阶段徽标（徽标跟在标题后）   右：剩余时间
 *   行2 左：处置句 + [执行]（执行跟在文字后）     右：具体日期
 *
 * 「状态贴文字、时间归右列」：徽标与「执行」跟着各自修饰的文字，
 * 右列只放时间——有没有「执行」、徽标多宽，右列都不横移。
 *
 * 阶段始终显示（「未提交」也显示）：每一行右列的落点一致。
 * 相对时间与具体日期分列两行：相对说法判远近，具体日期用来核对。
 *
 * 能替你完成的那部分（handling 为 auto）在处置句尾跟一个小「执行」按钮，
 * 点它只做这一条（把 entry.itemIds 发给后台；互评与自评合成的一行
 * 会两条一起做，见 to-messages 的合并说明）。叫「执行」不叫「完成」：
 * 互评点一次只评一份，说「完成」是吹牛，而「执行」与顶栏「全部执行」
 * 同一套词——全部 vs 单条。
 *
 * 「整行点击去平台」由一个透明的长链接垫底实现（.todo-open 铺满整行），
 * 而不是把 <a> 套在所有内容外面：第二行里有一个真正的 <button>，
 * 按钮套在链接里点击语义会打架（点按钮顺带跳转、读屏也读不明白）。
 * 链接垫底、按钮抬一层，两件事各归各。
 */
function buildRow(entry: PendingEntry): HTMLElement {
  const item = document.createElement('div');
  item.className = 'todo-item';
  item.title = entry.statusDetail;

  /*
   * 每一行都能点开去平台，包括已过截止的：平台自己会把关（不接受逾期提交），
   * 而点进去仍能看清当时要交什么、老师给了什么反馈。
   * 能不能点是「这件事做不做得成」之外的另一回事，不该跟着它变——
   * 时灵时不灵的行比多点一次更让人困惑。
   */
  const open = document.createElement('a');
  open.className = 'todo-open';
  open.href = entry.href;
  open.target = '_blank';
  open.rel = 'noreferrer';
  open.setAttribute('aria-label', `打开${KIND_TEXT[entry.kind]}页面`);
  item.append(open);

  // 行 1：任务名 + 阶段徽标
  const line = document.createElement('span');
  line.className = 'todo-line';

  const name = document.createElement('span');
  name.className = 'todo-name';
  name.textContent = entry.name;
  line.append(name);

  const phase = document.createElement('span');
  phase.className = 'todo-phase';
  phase.textContent = entry.status;
  line.append(phase);

  // 行 1 右列：剩余时间
  const when = document.createElement('span');
  when.className = 'todo-when';
  if (isUrgent(entry.deadline)) when.classList.add('is-urgent');
  when.textContent = `${relativeDay(entry.deadline)} ${formatClock(entry.deadline)}`.trim();

  // 行 2：处置（后面跟「执行」按钮）
  const sub = document.createElement('span');
  sub.className = 'todo-sub';

  const handling = document.createElement('span');
  handling.className = 'todo-handling';
  if (entry.overdue) handling.classList.add('is-overdue');
  else if (entry.handling === 'auto') handling.classList.add('is-auto');
  handling.textContent = handlingText(entry);
  sub.append(handling);

  if (entry.handling === 'auto') {
    const button = document.createElement('button');
    button.className = 'todo-run';
    button.type = 'button';
    button.textContent = '执行';
    button.title = '只执行这一条，不碰其他';
    button.addEventListener('click', () => {
      void runNow(
        {
          setStatus: showStatus,
          setEnabled: (enabled) => setRunning(!enabled),
          refresh: () => renderTodo(),
        },
        { ids: entry.itemIds },
      );
    });
    sub.append(button);
  }

  // 行 2 右列：具体日期
  const date = document.createElement('span');
  date.className = 'todo-date';
  date.textContent = formatDate(entry.deadline);

  item.append(line, when, sub, date);
  return item;
}
```

`showLoginPrompt()` 里的链接按钮改类名（按钮骨架与设置页同一枚）：

```ts
  const link = document.createElement('a');
  link.className = 'btn';
  link.href = 'https://www.icourse163.org/';
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.textContent = '前往登录';
```

徽标：加一个小函数并在 `renderTodo` 拿到条数后调用——

```ts
/** 待办条数写在慕课 tab 上；0 隐藏。与列表同源，不为它多读一次。 */
function setTabCount(count: number): void {
  const badge = document.getElementById('tab-count-mooc');
  if (badge === null) return;
  badge.textContent = count === 0 ? '' : String(count);
  badge.hidden = count === 0;
}
```

```ts
  const entries = outcome.value.entries;
  setTabCount(entries.length);
  if (entries.length === 0) {
    writeTodo([note('todo-empty', '暂无待办。')]);
    return;
  }
```

- [ ] **Step 6: 测试与类型检查全绿**

Run: `pnpm --filter @study-pilot/extension test && pnpm --filter @study-pilot/extension typecheck`
Expected: 全部 PASS。

- [ ] **Step 7: 真机看一眼弹窗（构建重载）**

```bash
pnpm probe kill
pnpm build
pnpm probe open
pnpm probe ext reload
```

检查（对照画稿 `tabs-final.html`）：打开即三条两行骨架；徽标出现在慕课 tab 上；「执行」在处置句后、徽标在标题后；有/无执行的行右列不横移；切到智慧树＝占位、`全部执行` 禁用、零请求；运行中状态行在顶栏与 tab 条之间、切 tab 不消失。**不截图自审——交 Ryan 看。**

- [ ] **Step 8: 提交**

```bash
git add apps/extension/entrypoints/popup/
git commit -m "feat(popup): 两 tab（慕课/智慧树）+ 状态行全局——待办条两行两列、徽标同源、按需加载"
```

---

### Task 7: 注入块（得分指导）分界线换浅底专用色

**Files:**
- Modify: `apps/extension/src/features/mooc/guidance/block.ts`（两处 `TOKENS.line` → `TOKENS.lineOnWash`）
- Modify: `apps/extension/src/ui/tokens.ts`（移除不再使用的 `line` 键）
- Test: `apps/extension/test/guidance.test.ts`（现有）、`tokens-parity.test.ts`

**Interfaces:**
- Consumes: Task 1 的 `--line-on-wash` / `TOKENS.lineOnWash`
- Produces: —（注入块只用内联样式，与扩展样式表隔离）

- [ ] **Step 1: 改 `block.ts` 的两处分界色**

```
`border:1px solid ${TOKENS.line}`  →  `border:1px solid ${TOKENS.lineOnWash}`
`border-top:1px solid ${TOKENS.line}` → `border-top:1px solid ${TOKENS.lineOnWash}`
```

理由（写进该行旁边的注释）：块底是 accent-wash，--line 压在浅主色底上看不见；
line-on-wash 是主色 20% 混入浅底的结果，在站外页面上也立得住。

- [ ] **Step 2: 从 `tokens.ts` 移除 `line` 键**（镜像只留注入块真正用到的值）

- [ ] **Step 3: 跑测试**

Run: `pnpm --filter @study-pilot/extension test`
Expected: 全部 PASS（parity 只校验存在的键；guidance 测试不受样式值影响）。

- [ ] **Step 4: 提交**

```bash
git add apps/extension/src/features/mooc/guidance/block.ts apps/extension/src/ui/tokens.ts
git commit -m "feat(guidance): 注入块分界线换浅底专用色——--line 在 accent-wash 上看不见"
```

---

### Task 8: 全量验收（测试、类型检查、构建、真机走查、交 Ryan）

**Files:**
- 无代码改动（只验收；发现问题回到相应任务修）

- [ ] **Step 1: 全仓测试 + 类型检查**

Run: `pnpm -r test && pnpm -r typecheck`
Expected: 全部 PASS。

- [ ] **Step 2: 无表外手挑值抽查**

Run: `rg -n '[0-9]+px' apps/extension/entrypoints apps/extension/src/ui --glob '*.css'`
Expected: 只剩 1px 细线/描边与 `tokens.css` 自身（`is-box` 的 16px 方块、骨架定宽、状态行 7px 圆点等形状值除外——形状类允许，间距/字号不允许）。

- [ ] **Step 3: 构建 + 重载**

```bash
pnpm probe kill
pnpm build
pnpm probe open
pnpm probe ext reload
```

- [ ] **Step 4: 真机走查清单（spec §10，逐条对画稿 `tabs-final.html`）**

1. 设置页：三 tab 就位、打开落上次停留；停在通用零请求；切到慕课骨架落位→同刻换内容、卡头骨架→文字、tab 徽标出现；切到智慧树占位。
2. 点「读取课程列表」：按钮禁用 + 行进说明；完成 toast。
3. 课件「快速完成」：整行浅底、明细在课名后、按钮变「停止」；停止收尾干净。
4. 弹窗：骨架 → 分组列表；切 tab 只读一家、切回不重读；有/无「执行」的行右列不动；hover / Tab（含 ←/→）/ 点「执行」只执行不跳转。
5. 跑一轮时切到智慧树：状态行还在、停止够得着；「全部执行」在该 tab 禁用。
6. 未登录（清 cookie）与断网：文案分流正确（失败警示色、未登录灰字给去处）。
7. 得分指导块在真实讨论页的观感（浅底上分界线可见）。
8. 缩放 125%/150% 下无错位；`prefers-reduced-motion` 无动效。

- [ ] **Step 5: 交 Ryan 看（不截图自审）**

两个页面各看一遍常态、加载瞬间、三个 tab；按 spec §12 验收清单勾选。

- [ ] **Step 6: 收尾提交（如有走查修正）**

```bash
git add -A
git commit -m "fix(ui): 真机走查修正——<一句话如实描述>"
```
