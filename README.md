# Study Pilot

中国大学 MOOC 的学习助手（Chrome / Edge 扩展，MV3）。它读你在平台上的课程、作业与测验，
把"还剩什么"列出来；能自动做的事（看课件、客观题测验、互评、自评）按你的开关在后台完成；
**考试不自动提交**，做题助手只在你点的时候才提交。

这份文件是唯一的说明。规则不写在这里，写在代码里：每条约定都放在它约束的那个文件顶部，
并由 scripts/check.mjs 机器核对。

## 怎么跑

    pnpm install
    pnpm -r test            # 各包测试
    pnpm build              # 构建扩展（apps/extension/.output/chrome-mv3）
    node scripts/check.mjs  # 唯一的检查：4 条

装到浏览器：chrome://extensions → 开发者模式 → 加载已解压的扩展程序 →
选 apps/extension/.output/chrome-mv3。

## 目录

    packages/
      core/          小工具（md5 等）
      transport/     慕课 DWR 传输：签名、请求、错误分类
      platform-mooc/ 慕课接口：读课程/作业/测验、取卷、完成上报、评分
      ai/            OpenAI 兼容接口（讨论区留言用，可选）
    apps/extension/  浏览器扩展
      src/background/ 调度与路由（跑什么、什么时候跑）
      src/platforms/  平台装配（把 platform-mooc 接进后台）
      src/browser/    扩展能力：消息、请求头改写、运行状态推送
      src/settings/   配置读写
      src/features/   注入到慕课页面里的功能
      entrypoints/    弹窗与主页面
      test/           测试

## 唯一的约定

**界面只经 src/ui-bridge.ts 访问核心**，不许 import src/platforms、src/background、
src/browser、src/settings。这是"界面可以换人重写、核心可以独立跑"的全部地基。

写操作只允许出现在 src/background/ 与 src/platforms/ 里；考试提交永远由人触发。
以上三条加文本卫生（LF、无 BOM、结尾换行）由 scripts/check.mjs 核对。

## 数据从哪来

只读你在平台上的真实数据，请求都从你已登录的浏览器发出：

- 打开看板与弹窗不向平台发请求，只读本地快照；要读平台只有"读取最新"这一个显式动作。
- AI 密钥只存本机，不进日志、不上报。
- 除你在设置里填的 AI 地址，不向任何第三方域名发请求。
