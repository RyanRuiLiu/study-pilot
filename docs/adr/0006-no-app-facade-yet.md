# ADR 0006：暂不造 createApp 门面，runRound 已是运行面门面

- 状态：已采纳｜2026-10-21
- 关联：`packages/application/src/round.ts`、`packages/application/src/ports.ts`、
  `apps/cli/src/main.ts`、`apps/extension/src/ui-bridge.ts`

## 背景

多端路线里曾计划一个 `createApp()`，把 `listCourses / pending / run / stop` 收成统一 DTO，
让新载体只画界面。现状是两个载体对「读」的需求并不一样：扩展有 9 条慕课消息
（含题库、卷面、得分指导），CLI 只有 `courses / pending / run` 三条；
把两者压成同一套 DTO，要么让扩展放弃页面内需要的字段，要么让 CLI 背上用不到的字段。

## 决定

不造门面。运行面已经只有一处：`createRunner({ platforms, tasks, progress }).runRound(selection)`，
两个载体都直接用它；读面各自按需要调用平台包（读的是同一批判据，不是同一份 DTO）。
端口实现由 `@study-pilot/adapters-node` 与扩展的 `settings/browser` 提供。

## 后果

- 好处：不用维护一份「谁都不完全合适」的 DTO；载体按自己页面组织数据，读的仍是同一条判据。
- 代价：新载体要自己写读面的映射（但那是它自己的界面契约）。
- 何时重审：第三个载体出现、且它的读面与现有某一个高度重合（同一批字段、同一顺序）时，
  把那一段抽出来共享；不预先为假想的重合做抽象。
