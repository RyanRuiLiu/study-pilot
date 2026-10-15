import { existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { defineConfig } from 'wxt';

/*
 * 调试宿主浏览器：Playwright 管理的 Chromium——与探测浏览器（scripts/probe/probe.mjs）
 * 同源同款，`pnpm exec playwright install chromium` 装一次两处都用。
 *
 * 不用品牌版 Chrome 的原因：它自 137 起移除了 `--load-extension`，加载未打包扩展
 * 会「假成功」。https://support.google.com/chrome/a/answer/10314655
 *
 * 找不到时这里**不**抛错。配置文件被读到的场合不只是开发模式——`wxt prepare`、构建、
 * 类型检查与测试都要读它，把「缺浏览器」变成「整个仓库不能构建」是过头的，
 * 也让 CI 必须先装一个浏览器才能跑测试。
 */
const chromeBinary = (() => {
  try {
    const executable = chromium.executablePath();
    return existsSync(executable) ? executable : null;
  } catch {
    return null;
  }
})();

/**
 * 调试专用 Chrome 配置目录，固定在项目内以长期保留登录 Cookie。
 * 可用环境变量 STUDY_PILOT_PROFILE 覆盖。首次 pnpm dev 后手动登录一次 MOOC。
 * web-ext(chrome-launcher) 启动时需该目录存在，故提前创建。已在 .gitignore 忽略。
 */
const profileFromEnv = process.env.STUDY_PILOT_PROFILE;
const chromiumProfile = profileFromEnv
  ? profileFromEnv
  : fileURLToPath(new URL('.dev-profile', import.meta.url));
mkdirSync(chromiumProfile, { recursive: true });

/*
 * Study Pilot 扩展配置。
 *
 * 第三方工具，与任何学习平台均无关联。当前接入一个平台，
 * 架构上按平台分包，后续可增加。
 */
export default defineConfig({
  srcDir: '.',
  outDir: '.output',
  manifest: {
    /*
     * 名称与说明取自 _locales，而不是写字面量。
     *
     * 商店与浏览器靠 _locales 目录判断扩展支持哪些语言。一个都没有时
     * 会被当作未本地化，默认归到英语——而这个扩展的界面全是中文，
     * 于是在商店里会要求填一份英文详情，中文反而要另外添加。
     *
     * 声明 default_locale 并放置对应的 messages.json 之后，
     * 商店才能识别出中文，也才能在以后增加其它语言。
     */
    name: '__MSG_extensionName__',
    description: '__MSG_extensionDescription__',
    default_locale: 'zh_CN',
    /*
     * 最低浏览器版本。
     *
     * 取 96 是因为用到了 declarativeNetRequestWithHostAccess，该权限在
     * Chrome 96 才有。写出来让商店在低版本浏览器上直接判为不兼容，
     * 而不是装上之后功能静默失效——那种情况用户只会以为扩展做坏了。
     *
     * Edge 与其他 Chromium 浏览器同此版本基线。
     */
    minimum_chrome_version: '96',
    // 平台接口按 Origin 判别来源：service worker 发出的请求 Origin 是
    // chrome-extension://...，会被服务端 403 拒绝。用 declarativeNetRequest
    // 把出站请求的 Origin 改写成平台域名，后台才能独立发请求。
    // 修改请求头需要 declarativeNetRequestWithHostAccess 而非基础权限。
    permissions: [
      'cookies',
      'storage',
      'declarativeNetRequestWithHostAccess',
    ],
    /*
     * 目前只申请这一个平台的主机权限。
     *
     * 扩展只在用户自己已登录的账号上工作，不采集任何数据。
     * 后续增加平台时需要同时补上对应的 host_permissions 与内容脚本匹配，
     * 并在这里说明新增的用途——商店审查会比对权限与说明是否一致。
     */
    host_permissions: ['*://*.icourse163.org/*'],
    /*
     * AI 接口的主机权限：可选，按需申请。
     *
     * 接口地址由用户在设置里填写，事先不知道是哪个域名，所以声明只能给通配。
     * 「声明」不等于「拥有」：未获授权时这些域名的请求发不出去，实际申请时
     * 也只申请用户填写的那个源。
     * 不开启 AI 就一个第三方域名都没有。
     */
    optional_host_permissions: ['*://*/*'],
    options_ui: {
      page: 'options.html',
      open_in_tab: true,
    },
  },
  webExt: {
    ...(chromeBinary ? { binaries: { chrome: chromeBinary } } : {}),
    chromiumProfile,
    keepProfileChanges: true,
  },
});
