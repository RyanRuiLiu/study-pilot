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
 * 可用环境变量 STUDY_PILOT_PROFILE 覆盖。首次 pnpm dev 后手动登录一次（MOOC 与智慧树各一次）。
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
 * 第三方工具，与任何学习平台均无关联。接入两个平台（中国大学 MOOC、
 * 智慧树），架构上按平台分包：平台的事都在各自 adapters 下，外壳不认识平台名字。
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
     * 主机权限：请求实际发往的源，都在这里静态声明（安装即授权）。
     *
     *   icourse163.org    学习平台本身（慕课）；
     *   zhihuishu.com     智慧树全系域名——页面、接口、静态库分布在不同子域
     *                     （studywisdomh5 / studyservice-api / appcomm-user …），
     *                     用一条通配覆盖，逐个子域列举只会漏；
     *   open.bigmodel.cn  智谱开放平台——AI 的唯一出口（见 application 的
     *                     AI_BASE_URL，地址固定，因此权限可以静态声明，
     *                     不再有「按需申请」那一步）。
     *
     * 没有 optional_host_permissions：AI 地址不由用户填，扩展不需要
     * 「任意域名」这把伞。加平台时同时补 host_permissions 与内容脚本匹配，
     * 并在这里说明用途——商店审查会比对权限与说明是否一致。
     *
     * 权限仍可能不在：用户可以在扩展详情页收回「网站访问权限」。那种情况下
     * 界面如实提示（见 src/ai/permission.ts），计划里的讨论单元不进队列。
     */
    host_permissions: ['*://*.icourse163.org/*', '*://*.zhihuishu.com/*', 'https://open.bigmodel.cn/*'],
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
  /*
   * 单文件分发的产物名钉死在这里。
   *
   * 不写的话 WXT 拿 package.json 的 `name` 去派生——`@study-pilot/extension` 洗掉
   * 符号后是 `study-pilotextension`，与仓库里既有的 `study-pilot-extension-<版本>-chrome.zip`
   * 差一个连字符：同一个东西两种名字，挑包上传时只能靠眼看。产物名是对外契约，
   * 不该由包名的清洗规则顺带决定。
   */
  zip: { name: 'study-pilot-extension' },
});
