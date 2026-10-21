# ADR 0001：包以 TypeScript 源码直接出口，不做构建

- 状态：已采纳｜2026-10-21
- 关联：`packages/*/package.json`（main/types/exports 都指向 `./src/index.ts`）

## 背景

仓库里的 7 个包都只被本仓库的两个载体（扩展、命令行）消费；Node 22 能直接剥类型跑 TS，
扩展侧由 WXT/Vite 打包。若每个包都加一层 `tsc`/打包产物，就要维护
「改源码 → 构建 → 再被消费」的链路与 `.d.ts` 的生成顺序。

## 决定

包不构建，`main`/`types`/`exports` 一律指向 `./src/index.ts`；相对导入写全 `.ts`
扩展名。类型检查由每个包的 `tsc --noEmit` 负责。

## 后果

- 好处：改一处立即对整个仓库生效；没有产物过期的问题；CI 只有一条验证链。
- 代价：本仓库之外不能直接消费这些包；相对导入必须带 `.ts`（Node 的 type stripping 要求）。
- 何时重审：出现第三方载体或要在 npm 发布时，改为 `tsc --build` + 子路径 exports，
  并保留源码出口给仓库内消费者。
