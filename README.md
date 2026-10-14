# Study Pilot

中国大学 MOOC 的学习助手（Chrome / Edge 扩展，MV3）。它读你在平台上的课程、作业与测验，
把"还剩什么"列出来；能自动做的事（看课件、客观题测验、互评、自评）按你的开关在后台完成；
**考试不自动提交**，做题助手只在你点的时候才提交。

这份文件是唯一的说明。规则不写在这里，写在代码里：每条约定都放在它约束的那个文件顶部。
唯一的机器检查是 tsc 与 vitest（见下）。

## 怎么跑

    pnpm install
    pnpm -r typecheck       # 各包类型检查（包含测试）
    pnpm -r test            # 各包测试
    pnpm build              # 构建扩展（apps/extension/.output/chrome-mv3）

两条冒烟（可选，第二条要本地已有登录会话）：

    node node_modules/vitest/vitest.mjs run --root apps/extension test/plan-smoke.test.ts
        # 证明计划逻辑不碰浏览器（用一个会抛异常的 browser 代理）

    node scripts/probe/lib/cookies.mjs
        # 从正在运行的浏览器导出慕课会话到 .probe/（只读、已被 git 忽略）

    node node_modules/vitest/vitest.mjs run --root apps/extension test/node-live.test.ts
        # 在 Node 里直连平台读课程列表（只读，不写平台）

装到浏览器：chrome://extensions → 开发者模式 → 加载已解压的扩展程序 →
选 apps/extension/.output/chrome-mv3。

## 目录

    packages/
      core/          小工具（md5、Result 等）
      transport/     慕课 DWR 传输：签名、请求、错误分类、节流
      platform-mooc/ 慕课一个包，两半：接口层（读课程/作业/测验、取卷、提交、评分）
                     与策略层 policy/（会话、读取、计划、执行）
      application/   载体无关的应用层：模型、端口、配置（纯逻辑，不碰浏览器/存储）
      ai/            OpenAI 兼容接口（讨论区留言用，可选）
    apps/extension/  载体一：浏览器扩展
      src/adapters/   慕课的消息与视图适配器、本厂商的装配点
      src/background/ 调度与路由（跑什么、什么时候跑）、运行状态、定时
      src/browser/    宿主能力：cookie、请求头改写、运行状态推送
      src/settings/   配置落到浏览器存储（形状与规范化在 packages/application）
      src/ai/         AI 用例：提示词与生成器（把 packages/ai 接给策略层）
      src/ui-bridge.ts  界面唯一的取数入口
      entrypoints/    后台装配与弹窗/设置页
      test/           测试（boundaries.test.ts 是分层的机械核对）

## 边界与唯一的约定

**界面只经 src/ui-bridge.ts 访问核心**，不许 import src/adapters、src/background、
src/browser、src/settings。这是"界面可以换人重写、核心可以独立跑"的全部地基。

分层边界不止这一条，其余写在 `apps/extension/test/boundaries.test.ts` 里，跑
`pnpm -r test` 就会核对（6 条）：包内不出现 browser/wxt；包的相对 import 不许跑出本包；
应用层不认识任何厂商；厂商适配器不直接用宿主全局；各载体之间互不依赖；文件级循环为 0。

改平台数据的写操作只在 packages/* 的执行面与触发它的 src/{background,adapters}/ 里发生；
考试提交永远由人触发。

## 数据从哪来

只读你在平台上的真实数据，请求都从你已登录的浏览器发出：

- 不缓存任何平台数据：界面上看到的每一项都是刚读回来的，读不到就如实报错。
- AI 密钥只存本机，不进日志、不上报。
- 除你在设置里填的 AI 地址，不向任何第三方域名发请求。

