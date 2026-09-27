# 探测与自检工具链

**存在理由**：平台随时可能改版。改版后如果只会读旧代码猜选择器，就会出现
「代码看起来对、实际早已失效」的情况（本仓库踩过这个坑）。

这套工具的作用是：**把「网页真实长什么样」变成可复现、可入库、可对比的产物**，
而不是靠一次性手工操作和记忆。开发期间它还承担另一件事：**改完之后自证改对了**。

零依赖：只用 Node 内置的 `fetch` 与 `WebSocket`，不需要 puppeteer / playwright。

## 目录

```
lib/        基础设施，其余脚本都依赖它们
inspect/    逆向取证：把线上真实情况取回来
checks/     自检：改完之后验证改对了
run/        跑一次：重载、执行、截图
maintain/   维护：审计与清理，偶尔用
```

## 环境前提

**必须用 Chrome for Testing 启动调试宿主。** 品牌版 Chrome 从 137 起移除了
`--load-extension`，且没有 CDP 的 `Extensions` 域，无法加载与重载扩展。
细节见 [`docs/development.md`](../../docs/development.md)。

```
C:\Users\<你>\.cache\chrome-for-testing\chrome\win64-<版本>\chrome-win64\chrome.exe
```

## lib/ — 基础设施

| 文件 | 作用 |
|---|---|
| `cdp.mjs` | 最小 CDP 客户端（连接、发命令、订阅事件）。其余脚本都复用它 |
| `ext-id.mjs` | 取当前加载的扩展 id。它由加载路径决定，不能写死 |
| `session.mjs` | 登录态快照的 save / restore / status。登录一次即可长期复用 |

## inspect/ — 逆向取证

改接口用法之前先用这些把事实取回来。全部只读。

| 文件 | 作用 |
|---|---|
| `launch.mjs` | 启动/关闭探测专用 Chrome。独立 profile 在 `.probe/profile`；`--extension <目录>` 可顺带加载扩展 |
| `collect.mjs` | 打开一个 URL，把 DOM、网络、JS、控制台、cookie 全量落盘。`--eval` 可在加载后执行页面操作，用于「必须先点一下才有数据」的页面 |
| `call.mjs` | 在**页面上下文**里调 `.rpc` 接口。默认只放行只读方法，写方法直接拦截 |
| `decompile.mjs` | 拉取并拆分线上 bundle，按模块落盘，便于搜索 |
| `watch.mjs` | 在你操作页面时实时打印网络请求，用于「点一下看它调什么」 |
| `eval.mjs` | 在页面上下文里执行一段表达式，取回结果 |
| `redact.mjs` | 样本脱敏：把身份字段替换为固定占位值，保留结构 id |

**找接口用 `collect.mjs`，不要用临时手写的监听。**
`watch.mjs` 适合快速看一眼，但它的时序与缓存都不受控：页面命中缓存时不发
请求、事件挂晚了会漏掉前几个请求、脚本退出时产物也没留下。
本项目曾据此得出「考试没有接口」的错误结论，实际那个接口一直在
课程结构响应里。`collect.mjs` 把请求、响应体、DOM 一并落盘，
结论可以事后复核，因此需要下判断时用它。

需要交互才有数据的页面（例如考试页要先点「开始考试」）用 `--eval`：

```bash
node scripts/probe/inspect/collect.mjs --url <URL> --out .probe/<名字> \
  --eval "[...document.querySelectorAll('button')].find(b => b.textContent.trim() === '开始考试').click()"
```

## checks/ — 自检

改完代码后用这些验证，**每一条都是实测而非静态检查**。

| 文件 | 验证什么 |
|---|---|
| `selfcheck.mjs` | 全面自检：逐个调后台消息，并与界面实际渲染的内容比对 |
| `selfcheck-ui.mjs` | 前台注入面板自检：测验页、作业页的面板是否按预期出现 |
| `selfcheck-run.mjs` | 拒绝路径与只读判定：停用、未选课、已提交必有分等 |
| `dryrun-tasks.mjs` | 打印这一轮会做什么，**不做**。会真的拉一次最新状态 |
| `check-classes.mjs` | 用到的类名是否都有样式。删 CSS 规则时最容易漏的就是这个 |
| `check-copy.mjs` | 文案：有无内部术语、口语化、与功能是否一致、标点是否统一 |
| `check-toc.mjs` | 设置页左侧导航：项数与分区一致、滚动高亮跟随、吸顶生效 |
| `check-control-styles.mjs` | 同类控件的**实际渲染尺寸**是否一致 |
| `check-detail-links.mjs` | 单元明细的每条链接是否拼得正确、能否打开 |
| `check-anchor.mjs` | 通知点击后的锚点定位 |
| `check-bar-stable.mjs` | 弹窗顶栏在点击「执行」前后位置是否位移 |
| `check-active-refresh.mjs` | 手动打开设置页是否绕过节流、拉到最新数据 |
| `check-net-rules.mjs` | 出站请求头规则是否安装、是否限定资源类型、是否覆盖两条路径 |
| `test-session-refresh.mjs` | 会话恢复：删掉会话 cookie 后只发一次请求，看能否恢复 |
| `verify-package.mjs` | 打包产物能否被加载、页面能否打开 |

## run/ — 跑一次

| 文件 | 作用 |
|---|---|
| `reload-ext.mjs` | 强制重载已加载的扩展。**改完代码必须先跑**，否则测的还是旧版本 |
| `run-once.mjs` | 真实执行一轮并打印前后状态（**会写平台**） |
| `shot.mjs` | 给扩展页面截图，用于目视检查排版 |

## maintain/ — 维护

| 文件 | 用途 |
|---|---|
| `audit-time-fields.mjs` | 列出所有涉及时间字段的用法。排查「时间取错字段」类问题 |
| `dump-copy.mjs` | 导出全部界面文案，供通读检查措辞 |
| `purge-identity.mjs` | 把样本里的真实账号信息换成占位值。**开仓前跑一次**，用法见下 |

`purge-identity.mjs` 不把真实值写在文件里——它自己也在仓库里，
写进去等于脱敏工具变成泄露源。真实值从命令行给：

```bash
node scripts/probe/maintain/purge-identity.mjs \
  --user-id <用户 id> --phone <手机号> [--check]
```

邮箱前缀是固定形态，不需要传参。清完工作区不等于清完历史：
若那些值曾经提交过，它们在 git 历史里仍然存在，需要重写历史。

## 典型工作流

```bash
# 启动探测浏览器（带窗口，你能看见它在做什么）
pnpm probe:launch

# 首次使用：在弹出的窗口里登录一次，然后存下会话快照
pnpm probe:session -- save

# 改完代码后：
pnpm build
pnpm probe:reload                       # 必须：否则测的是旧版本
pnpm selfcheck
node scripts/probe/checks/check-classes.mjs

# 想知道某个按钮调什么接口：
pnpm probe:watch                        # 然后在页面上点它

# 用完关掉
pnpm probe:kill
```

## 采集产物结构

```
.probe/<采集名>/
├── meta.json      本次采集的元信息（目标 URL、最终 URL、时间、浏览器版本、计数）
├── page.html      渲染后的 DOM（脚本跑完之后的真实结构，不是 View Source）
├── network.jsonl  每条请求：url / method / 请求头 / 请求体 / 状态码 / 响应头
├── console.jsonl  页面控制台输出与错误
├── cookies.json   cookie 元信息（**只记 valueLength，不落盘 value**）
├── scripts/       JS 原文，按 URL 去重
└── bodies/        文本响应体（json/text/html，< 1MB）
```

`.probe/` 已在 `.gitignore` 中——**原始采集物不入库**，用完即清。
其中 `.probe/profile` 是探测浏览器的独立 profile，**含登录 cookie**，
不要把它复制到别处。

需要长期保留的结论写进 `docs/`。结论是文字与依据，不是原始响应——
平台的内容不属于本项目，账号数据也不该进仓库。

## 写新探测脚本的约定

1. 复用 `lib/cdp.mjs`，不要引入 puppeteer/playwright。
2. 采集产物一律写 `.probe/` 下，不要把原始产物提交进仓库。
3. 只读：不点击提交类按钮、不调用写接口。
4. 结论要能追溯到具体产物文件与偏移，写进 `docs/`。
5. **一次性诊断脚本用完就删**。留在仓库里的应该都是能反复用的；
   结论要落进代码注释或文档，不能只存在于某个脚本里。
6. 需要「加载后先操作再采集」时，给 `collect.mjs` 加 `--eval`，
   不要另写一个脚本——采集口径一旦分叉，产物就对不齐了。
