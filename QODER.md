# Qoder 项目说明（动手前读这一份）

Study Pilot：在用户**自己已登录**的慕课账号上整理待办、提醒截止，并按开关代做部分后台任务的浏览器扩展。
WXT（MV3）+ TypeScript + pnpm workspace，界面用 Shoelace Web Components，无框架、无服务端。

```
packages/core         纯函数（MD5、Result）
packages/transport    DWR 协议：签名、节流、重试
packages/ai           OpenAI 兼容客户端（唯一用途：讨论区留言）
packages/platform-mooc 慕课平台协议：接口、页面地址、作答与评分的数据形状
apps/extension        装配与运行：三个页面、后台调度、内容脚本呈现面
```

## 命令

```bash
pnpm install
pnpm dev                     # 需 Chrome for Testing，前置检查会自己报错并给出安装命令
pnpm build                   # 产物在 apps/extension/.output/chrome-mv3
pnpm -r test                 # 单元测试（vitest + WXT 的 fakeBrowser）
pnpm typecheck && pnpm lint
node scripts/probe/checks/check-all.mjs   # 全部门禁，改完必跑
node scripts/probe/run/reload-ext.mjs     # 改完代码后重载扩展，否则测的是旧构建
```

## 硬约束（对真实账号的写操作）

平台的成绩规则是**取最高分**，一次误提交可能覆盖真实作答且不可撤销。

1. **考试不自动提交**：只有一次作答机会，填充与得分指导可以，提交由人点。
2. **写只发生在执行面**：`src/background/`、`src/platforms/*/execute|messages/`。内容脚本、三个页面、
   `src/ui`、`src/settings` 里出现写接口即门禁失败（`check-release` 扫整个 app）。
3. **会在服务端留下痕迹的调用排在所有无副作用读取之后**：取卷带 `aid = 0` 会新建答卷、
   `startOneSubmissionEvaluate` 会占一份配额。先读题库、再开卷。
4. **代做类开关默认关闭**，页面内功能默认开启（判据是「会不会自己动」）。默认值由门禁读代码核对。
5. 探测账号前按 `scripts/probe/README.md` 核对目标单元的过期与得分状态；未过期且未满分的单元是禁区。

## 代码规则

1. **一个文件一个职责，超过 300 行必须拆**（`max-lines`）。
2. **同一知识只写一次**。路由表、端点、单位类型、提示词、计数与判据都只有一处；
   要加第二处之前先合并。方向由 `eslint-plugin-boundaries` 判（packages 之间 + app 内三个平面）。
3. **不兜底、不兼容、不防御**：不做静默回退、不做向后兼容分支、不吞异常、不用 `?? 默认值`
   掩盖「没读到」。失败要如实交出去并让用户看得见（后台一轮的失败记在运行状态里，由弹窗显示）。
   例外只有真正的边界：存储里的用户配置以默认值为骨架做规范化。
4. **深模块**：接口＝调用者必须知道的一切。判据是删除测试——删掉它复杂度会散到多个调用点才值得存在。
5. **端口注入**：跨层只通过函数类型端口传递能力（如 `TextGenerator`、`recordFailure`），
   实现在最外层装配；平台不反向 import 外壳与页面。
6. **测试即契约**：测试写在接口上，改实现不该改测试。只 mock I/O 边界，
   **不 mock 被测模块自己的判据**（那等于把要验的东西换成替身）。
7. 注释写「为什么」与实测依据，不写任务历史；术语与代码一致（互评在平台接口层沿用平台叫法，
   我们自己的概念用 review）。

## 事实与文档

| 想知道 | 去看 |
|---|---|
| 平台协议、签名、页面结构、课件完成 | `docs/platforms/mooc.md`（标注 `[源码]` / `[实测]` / `[待核]`） |
| 为什么这样分层、关键取舍 | `docs/architecture.md`、`docs/specs/` |
| 调试环境的实测坑（Origin、Chrome for Testing、profile、worker 回收） | `docs/development.md` |
| 工具链（探测、采集、门禁脚本） | `scripts/probe/README.md` |

不写状态表、进度文档与「已完成功能清单」：代码与测试就是状态，那种文档只会腐烂成假结论。
文档里的结论必须标取证等级；没验证过的写 `[待核]`，不要写成已完成。
