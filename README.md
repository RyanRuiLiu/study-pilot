# Study Pilot

中国大学 MOOC 的学习助手（Chrome / Edge 扩展，MV3；另有命令行载体）。它读你在平台上的
课程、作业与测验，把「还剩什么」列出来；能替你做的事（看课件、客观题测验、互评、自评）
在你点下按钮时完成——没有定时任务，也不会在你没点的时候写任何东西。
**考试永远不自动提交**。

这份文件是唯一的说明。规则不写在这里，写在代码里：每条约定都放在它约束的那个文件顶部。
唯一的机器检查是 tsc 与 vitest（见下）。

## 怎么跑

    pnpm install
    pnpm -r typecheck       # 各包类型检查（包含测试）
    pnpm -r test            # 各包测试
    pnpm build              # 构建扩展（apps/extension/.output/chrome-mv3）

三条冒烟（可选，后两条要本地已有登录会话）：

    pnpm --filter @study-pilot/platform-mooc exec vitest run test/plan-smoke.test.ts
        # 证明计划逻辑不碰浏览器（用一个会抛异常的 browser 代理）

    pnpm --filter @study-pilot/platform-mooc exec vitest run test/headless.test.ts
        # 证明整个策略层只认端口：假端口喂进去就能跑完「入会话 → 读 → 计划」

    pnpm probe state export
        # 从探测浏览器导出登录态到 .probe/（Playwright storageState；见「真机调试」一节）

    pnpm --filter @study-pilot/extension exec vitest run test/node-live.test.ts
        # 在 Node 里直连平台读课程列表（只读，不写平台）

装到浏览器：chrome://extensions → 开发者模式 → 加载已解压的扩展程序 →
选 apps/extension/.output/chrome-mv3。

命令行载体（第二个载体；courses / pending 只读，run 默认预演）：

    node apps/cli/src/main.ts courses --cookies .probe/mooc-session.json --config .probe/cli-config.json
        # 去平台读课程列表；加 --select <termId> 把它勾上并写进配置文件
    node apps/cli/src/main.ts pending --cookies .probe/mooc-session.json --config .probe/cli-config.json
        # 读一遍并算出要做什么（可自动 / 需人工），不改平台上的任何数据
    node apps/cli/src/main.ts run --cookies .probe/mooc-session.json --config .probe/cli-config.json
        # 预演这一轮会做什么；**加 --yes 才真的执行**——写平台会改账号上的学习记录且不可撤销，
        # 所以默认只摆出来，动手必须显式授权（扩展那边等价的是用户点按钮）
        # 可加 --kind courseware,quiz 与 --course <课程名> 收窄范围；预演与执行两侧同样生效

直接跑 TS 即可：Node 22+ 会剥掉类型，而包内的相对导入都带 .ts 扩展名，因此不经打包也能加载。
要单文件分发时再打包：pnpm --filter @study-pilot/cli build → apps/cli/dist/main.mjs（esbuild）。

## 真机调试（探测浏览器）

一次性准备（每台机器一次）：

    pnpm exec playwright install chromium   # Playwright 管理的 Chromium（探测与 pnpm dev 共用）
    pnpm probe open                         # 起探测浏览器（持久登录；关窗即退出）

    # 首次在窗口里登录一次慕课，然后把它导出给 CLI / Node 用：
    pnpm probe state export

日常：

    pnpm probe state check                  # 核对导出文件与浏览器当前登录是否一致（不一致时平台会回 null）
    pnpm probe capture --url <URL> --out <名字>
        # 抓取 → .probe/<名字>/：trace.har（DevTools 可直接打开）+ page.html + console.jsonl
        # + shot.png + scripts/；需要「先点一下才有数据」时加 --eval <代码>（可多次）
    pnpm probe har --dir <名字> --match <URL 片段> [--out <文件>]
        # 从采集的 HAR 里取出匹配请求的响应体
    pnpm probe call --bean <Bean> --method <getXxx> --body '{...}'
        # 在页面上下文发 .rpc 请求（默认只放行只读方法，写方法被拦截）
    pnpm probe ext reload                   # 改完扩展：重载（不用重开浏览器；要求探测浏览器在运行）
    pnpm probe kill                         # 关闭探测浏览器

约定：取证一律用 capture / call，**不要手写临时监听**（时序与缓存不可控，本项目曾据此误判）；
产物一律落 `.probe/`（git 忽略），结论写进代码注释。规则全文在 `scripts/probe/probe.mjs` 头部，
命令一览：`pnpm probe --help`。

## 目录

    packages/
      core/          小工具（md5、Result 等）
      transport/     慕课 DWR 传输：签名、请求、错误分类、节流
      platform-mooc/ 慕课一个包，两半：接口层（读课程/作业/测验、取卷、提交、评分）
                     与策略层 policy/（会话、读取、计划、执行、厂商装配）
      application/   载体无关的应用层：模型、端口、配置、状态机、「跑一轮」用例
      ai/            OpenAI 兼容接口（讨论区留言用，可选）
    apps/extension/  载体一：浏览器扩展
      src/adapters/   慕课的消息与视图适配器、本载体补的那半装配
      src/background/ 消息路由与运行状态（执行只由人点按钮发起）
      src/browser/    宿主能力：cookie、请求头改写、运行状态推送、执行入口
      src/settings/   配置落到浏览器存储（形状与规范化在 packages/application）
      src/features/   页面内功能：作业页的得分指导注入
      src/ui/         界面共用：设计令牌、格式化、执行范围的分类
      src/ai/         AI 用例：提示词与生成器（把 packages/ai 接给策略层）
      src/ui-bridge.ts  界面唯一的取数入口
      entrypoints/    后台装配、弹窗、设置页、作业页内容脚本
      test/           测试（boundaries.test.ts 是分层的机械核对）
    apps/cli/        载体二：命令行
      src/config-store.ts  配置端口落到一个 JSON 文件
      src/host.ts          会话从浏览器导出的 cookie 文件读
      src/fetch.ts         出站请求头自己设（命令行没有 declarativeNetRequest）
      src/main.ts          命令：courses / pending（都只读）
    scripts/probe/   真机调试唯一入口（pnpm probe；见「真机调试」一节）

## 边界与唯一的约定

**界面只经 src/ui-bridge.ts 访问核心**，不许 import src/adapters、src/background、
src/browser、src/settings。这是"界面可以换人重写、核心可以独立跑"的全部地基。

分层边界不止这一条，其余写在 `apps/extension/test/boundaries.test.ts` 里，跑
`pnpm -r test` 就会核对（6 条）：包内不出现 browser/wxt；包的相对 import 不许跑出本包；
应用层不认识任何厂商；厂商适配器不直接用宿主全局；各载体之间互不依赖；文件级循环为 0。

改平台数据的写操作只在 packages/* 的执行面与触发它的载体侧（消息路由、界面）里发生；
执行的发起者永远是人——扩展里是弹窗与设置页上的按钮，命令行里是 --yes；
一轮随时可以停：不再发新的写请求，手上正在飞的请求落地即止；
考试提交永远由人触发。

## 用词（唯一叫法）

跨文件的说法只认这几个。写代码、写注释、写界面文案都用它们，别处造的
同义词视为要改的旧说法：

    一轮执行 / 点执行    只有人点按钮才会发生的事；没有定时，没有自动触发
    运行记录            一轮里逐项结果的落盘记录（run-state）；界面与它对齐
    状态行              报「正在执行 / 已完成 / 上次出错」的那一行（弹窗与设置页）
    快照                一次真实读取的内存结果：读完即用，不落存储、不缓存
    现读现算            平台数据的原则：界面上的每个数字都来自刚发出的请求
    待办 / 课件         两类事的叫法：要交的工作项（quiz/homework/…）与代刷的课件单元
    挂起                会话失效且恢复失败：本轮如实收尾不写任何东西，等重新登录

## 数据从哪来

只读你在平台上的真实数据，请求都从你已登录的浏览器发出：

    配置（你的东西：课程勾选、评语、AI 密钥） → 本地存储即时读。
        它就是唯一事实源，不是平台数据的副本——所以「账号与课程」列表
        一打开就有，那不是缓存，是你的选择本身；平台上的变化（新课、
        改名）由「读取课程列表」按钮带进来，且只由人点按钮触发。
    平台数据（课程结构、待交、课件计数）      → 每次真实请求，现读现算；
        不落存储、不缓存，读不到就如实报错。
    执行记录（做过什么、上次失败）            → 例外，必须落盘
        （run-state / task-state）：它记的是我们做过什么，不是平台是什么。

- AI 密钥只存本机，不进日志、不上报。
- AI 请求只发往智谱开放平台（open.bigmodel.cn）——地址固定、唯一出口；没启用 AI 就不发。

