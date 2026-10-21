# Study Pilot

学习平台助手（Chrome / Edge 扩展，MV3；另有命令行载体），接入两个平台：
中国大学 MOOC 与智慧树。它读你在平台上的课程、作业与测验，把「还剩什么」列出来；
能替你做的事（看课件、客观题测验、互评、自评）在你点下按钮时完成——没有定时任务，
也不会在你没点的时候写任何东西。自动做的只有**单元测验**（慕课）与**单元测试**（智慧树）
这一类客观题；**期末考试与智能考试不自动**（只读展示 + 可点），**见面课测验的自动作答尚未开发**。
期末自动化在二期设计中（docs/zhs-task-modules-design.md），落地时本文件与
PRIVACY.md 会同步改写。已经能自动做的客观题测验里，智慧树那一家可能申请**重做**（新分数覆盖旧分数），
一时取不到答案时还可能先交一份**探路卷**换回题号——这些不可撤销的后果逐条写在 `PRIVACY.md`
「关于提交类功能」一节，开启前请读它。

这份文件回答「它是什么、怎么跑」。**开发标准全部集中在 `CONTRIBUTING.md`**
（总体思想、放置决策、调试标准、测试与提交、界面语言）——动手前读那一份。
规则不在这里展开：每条约定的理由写在它约束的那个文件顶部。

## 怎么跑

    pnpm install
    pnpm -r typecheck       # 各包类型检查（连测试一起编）
    pnpm -r test            # 各包测试（全绿才算收工；不依赖任何登录态）
    pnpm build              # 构建扩展 → apps/extension/.output/chrome-mv3
    pnpm --filter @study-pilot/extension zip
                            # 打成单文件 → apps/extension/.output/study-pilot-extension-<版本>-chrome.zip
                            # 版本号在 apps/extension/package.json（清单与设置页页脚都取自它）

四条冒烟（可选，后两条要本地已有登录会话）：

    pnpm --filter @study-pilot/platform-mooc exec vitest run test/plan-smoke.test.ts
        # 证明计划逻辑不碰浏览器（用一个会抛异常的 browser 代理）

    pnpm --filter @study-pilot/platform-mooc exec vitest run test/headless.test.ts
        # 证明整个策略层只认端口：假端口喂进去就能跑完「入会话 → 读 → 计划」

    pnpm probe state export
        # 从探测浏览器导出登录态到 .probe/（Playwright storageState；见「真机调试」一节）

    STUDY_PILOT_LIVE=1 pnpm --filter @study-pilot/extension exec vitest run test/node-live.test.ts
        # 在 Node 里直连平台读慕课课程列表（只读，不写平台）
        # 这条必须显式给 STUDY_PILOT_LIVE=1：它要真账号，服务端会话过期是常态，
        # 让它挂在默认门禁上只会教人忽略红灯

装到浏览器：chrome://extensions → 开发者模式 → 加载已解压的扩展程序 →
选 apps/extension/.output/chrome-mv3。

命令行载体（第二个载体；与扩展同覆盖——两个平台都接；courses / pending 只读，run 默认预演）：

    node apps/cli/src/main.ts courses
        # 去两个平台各读一次课程列表（同一个会话文件里两家的 cookie 都有）；
        # 加 --select <id> 切换那门课的参与状态：慕课是 termId、智慧树是 courseId，
        # 两家都是逐门切换（再跑一次即反向，与设置页的勾选框同一语义）；
        # 可加 --platform 只读一家
    node apps/cli/src/main.ts pending
        # 读一遍并算出要做什么（可自动 / 需人工），不改平台上的任何数据；--platform 收窄
    node apps/cli/src/main.ts run
        # 预演这一轮会做什么；**加 --yes 才真的执行**——写平台会改账号上的学习记录且不可撤销，
        # 所以默认只摆出来，动手必须显式授权（扩展那边等价的是用户点按钮）
        # 可加 --platform mooc|zhihuishu、--kind courseware,quiz 与 --course <课程名>
        # 收窄范围；预演与执行两侧同样生效

    三个文件的默认路径都相对**仓库根**解析（不按当前目录，从哪儿跑都找到同一份）：
        --cookies .probe/browser-session.json   登录态（probe state export 导出的）
        --config  .probe/cli-config.json        配置（课程勾选、评语、AI 设置）
        --state   .probe/cli-state.json         跨次运行的状态（中断判定与失败留痕）

退出码是契约（脚本与 CI 按它分支，不看输出文字）：

        0  正常            1  有失败（某家读不到、某项没做成、--select 没命中）
        2  未登录（含会话文件读不出）        3  没有勾选课程
        4  上一轮还没结束（状态文件的防重入）  64  命令或参数本身不对

直接跑 TS 即可：Node 22+ 会剥掉类型，而包内的相对导入都带 .ts 扩展名，因此不经打包也能加载。
要单文件分发时再打包：pnpm --filter @study-pilot/cli build → apps/cli/.output/main.mjs（esbuild）。

    产物落点的唯一规矩：每个载体的构建输出都在它自己的 .output/ 下——
        扩展   apps/extension/.output/chrome-mv3/（可直接装载）
              apps/extension/.output/study-pilot-extension-<版本>-chrome.zip（单文件）
        命令行 apps/cli/.output/main.mjs
    已上传过商店的历史包归档在 apps/extension/releases/（git 忽略，只用于回看当时交了什么）。

## 真机调试（探测浏览器）

一次性准备（每台机器一次）：

    pnpm exec playwright install chromium   # Playwright 管理的 Chromium（探测与 pnpm dev 共用）
    pnpm probe open                         # 起探测浏览器（持久登录；关窗即退出）

    # 首次在窗口里登录（慕课与智慧树各登录一次），然后把它导出给 CLI / Node 用：
    pnpm probe state export

日常：

    pnpm probe state check                  # 核对导出文件与浏览器当前登录是否一致（不一致时平台会回 null）
    pnpm probe capture --url <URL> --out <名字>
        # 抓取 → .probe/<名字>/：trace.har（DevTools 可直接打开）+ page.html + console.jsonl
        # + shot.png + scripts/；需要「先点一下才有数据」时加 --eval <代码>（可多次）
    pnpm probe har --dir <名字> --match <URL 片段> [--out <文件>]
        # 从采集的 HAR 里取出匹配请求的响应体
    pnpm probe call --bean <Bean> --method <getXxx> --body '{...}'
        # 在页面上下文发 .rpc 请求（慕课专用；默认只放行只读方法，写方法要 --allow-write 显式放行）
    pnpm probe shot --url <URL>             # 截一张图
    pnpm probe src fetch [--url <页面>...]  # 拉 mooc 全站前端源码 → .probe/mooc-src/
        # raw/ 原样 + readable/ 格式化（js-beautify）+ INDEX.md（URL→文件、关键标记→文件）
    pnpm probe src grep <关键词>            # 在镜像里搜（文件名:行号）——查「服务端/源码怎么说」
    pnpm probe zhs --list                   # 智慧树端点表（名字 / 方法 / 宿主 / 是否签名 / 读或写）
    pnpm probe zhs --endpoint <名字> [--params '<JSON>|@文件']
        # 调智慧树接口：走包内签名客户端（Node 直发），cookie 从探测浏览器取活的；
        # 默认只放行读端点，写端点（如 saveStudyInterval）要 --allow-write 显式放行；
        # 响应存 .probe/api/，被拒（-12 门、-1 解码错…）也照常打印与归档
    pnpm probe ext id | ext reload          # 打印扩展 id / 重载扩展（要求探测浏览器在运行）
    pnpm probe icon [--check] [--preview]  # 生成扩展图标 → apps/extension/public/icon/
        # 色值与字体现读 tokens.css；产物是**入库文件**，改完要看过 diff 再提交
        # --check 只核对不生成（界面 tokens.css 变了用它确认图标是否过期）
    pnpm probe store [--check]              # 生成商店促销磁贴 → apps/extension/.output/store/（440x280 与 1400x560）
        # 落 .output/（git 忽略）：那是对外商店素材，随构建重生，不入库；--check 只核对不生成
    pnpm probe kill                         # 关闭探测浏览器

两个平台共用同一个探测浏览器与登录态（state check 两家都报）。

**调试标准（唯一姿势，别另开写法）**：找接口、抓响应一律用 `capture`（真实页面的 HAR 即事实源）
与 `call` / `zhs`（调已知接口）；**不为一次问题另写脚本**——一次性脚本用完即删，值得留下的
能力收进 `probe.mjs` 或包内端点表（`packages/platform-zhs/src/endpoints.ts` 是全项目唯一
写智慧树接口路径的地方）。要读**平台自己的实现**（题型枚举、提交字段、界面文案）时，先
`probe src fetch` 把前端源码镜像到本地再搜：**源码与服务端是仅有的两个事实源，猜不算**。
.probe/ 是草稿区：产物（HAR、api 响应、源码镜像）可留作证据，代码不留。

约定：取证一律用 capture / call，**不要手写临时监听**（时序与缓存不可控，本项目曾据此误判）；
产物一律落 `.probe/`（git 忽略），结论写进代码注释。规则全文在 `scripts/probe/probe.mjs` 头部，
命令一览：`pnpm probe --help`。

## 目录

    packages/
      core/          小工具（md5、Result 等）
      adapters-node/ Node 载体的现成端口实现：文件配置/状态、会话文件、按平台设头的 fetch；
                     第三个 Node 载体只装配，不重写端口
      transport/     HTTP 协议层共用件：浏览器 UA、节流、出站超时、错误分类（慕课的签名与 DWR 也在这）
      platform-mooc/ 慕课一个包，两半：接口层（读课程/作业/测验、取卷、提交、评分）
                     与策略层 policy/（会话、读取、计划、执行、厂商装配）
      platform-zhs/  智慧树一个包，同一分法：签名/接口清单/客户端/会话/课程/结构/上报，
                     与策略层 policy/（计划、课件执行、答卷执行、请求头改写）。
                     答案键与作答计划（exam-answers.ts，纯函数）+ 答卷会话（policy/execute-exam.ts）
                     是单元测试那条自动化链路的地基
      application/   载体无关的应用层：模型、端口、配置、状态机、「跑一轮」用例
      ai/            OpenAI 兼容接口（讨论区留言用，可选）
    apps/extension/  载体一：浏览器扩展
      src/adapters/mooc/      慕课的消息与视图适配器
      src/adapters/zhihuishu/ 智慧树的消息适配器（课程、四板块待办与成绩构成卡、会话）
      src/background/ 消息路由与运行状态（执行只由人点按钮发起）
      src/browser/    宿主能力：cookie、请求头改写、运行状态推送、执行入口
      src/settings/   配置落到浏览器存储（形状与规范化在 packages/application）
      src/features/   页内功能：测验与客观题考试页的做题助手、作业与主观题考试页的得分指导
      src/ui/         界面共用：设计令牌、格式化、执行范围的分类、状态行视图、登录地址唯一源
      src/ai/         AI 用例：提示词与生成器（把 packages/ai 接给策略层）
      src/ui-bridge.ts  界面唯一的取数入口
      entrypoints/    后台装配、弹窗（含 zhihuishu-todo）、设置页（含智慧树卡片）、内容脚本
      test/           测试（boundaries.test.ts 是分层的机械核对）
    apps/cli/        载体二：命令行（两个平台都接）
      src/progress.ts      执行进度打到标准输出（本载体自己的那一件）
      src/select.ts        courses --select 的逐门切换（与设置页同一语义）
      src/report.ts        一轮结局的收尾句（停止的一轮要明说）
      src/run-lock.ts      跨进程执行锁（状态文件旁的 .lock，按 PID 判活）
      src/main.ts          命令：courses / pending / run（run 默认预演，--yes 才写）
      # 配置/状态/会话文件与按平台设头的 fetch 在 packages/adapters-node（见上）
    scripts/probe/   真机调试唯一入口（pnpm probe；见「真机调试」一节）
    docs/            设计记录与决策：zhs-task-modules-design.md（智慧树二期设计，内含
                     「落地状态」逐条写明哪些已接进执行）、adr/（跨端决策，只记为什么与
                     何时重审）。已实现且不再需要留档的设计不进仓库（规则在代码注释里，历史在 git）

## 新人从哪读起

改代码按这个顺序读，能最快建立全图（三句话背下来更省事）：

    核心用例在 application，平台事实在 platform-*，载体（扩展 / 命令行）只做搬运。

    1. packages/application/src/ports.ts        应用层与载体之间的唯一接口
    2. packages/application/src/round.ts        「跑一轮」用例：先读这个再看平台
    3. packages/platform-*/src/index.ts         两家平台各自的出口面（先看导出清单与头注释）
    4. packages/*/src/policy/assembly.ts | tasks.ts   一轮怎么装配、做什么怎么计划
    5. apps/extension/entrypoints/background.ts 载体一：把两个平台接进一条消息路由
    6. apps/cli/src/main.ts                     载体二：更小更直白，读完就懂「载体只是壳」

规则不在别处：每条约定都写在它约束的那个文件顶部。新写的东西放哪一层，
读 `apps/extension/test/boundaries.test.ts` 的六条边界（跑 pnpm -r test 就会核对）。

## 标准

三层架构与边界、新东西放哪、代码与注释规则、调试标准（`pnpm probe` 唯一姿势）、
测试与提交、平台接入流程、界面语言与文案——**全部在 `CONTRIBUTING.md`**。
其中六条分层边界是机械核对，跑 `pnpm -r test` 就会验。

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
- 命令行载体把配置与运行状态落在你指定的 JSON 文件（默认 .probe/cli-config.json 与
  .probe/cli-state.json），登录态从浏览器导出的会话文件读——它自己不存任何凭证。

