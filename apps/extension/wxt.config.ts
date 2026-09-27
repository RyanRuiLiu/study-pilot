import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'wxt';

/**
 * 调试宿主浏览器。
 *
 * 必须用 Chrome for Testing，不能用系统里的官方品牌版。依据是 Chrome 官方发布说明：
 *
 *   Remove --load-extension command line switch
 *   为了提升安全性，官方品牌版自 Chrome 137 起移除了 --load-extension；
 *   未打包扩展改用 chrome://extensions 的「加载已解压的扩展程序」按钮；
 *   开发者仍可在 Chromium 与 Chrome For Testing 中使用该开关。
 *
 *   https://support.google.com/chrome/a/answer/10314655
 *
 * 安装：
 *   npx @puppeteer/browsers install chrome@stable --path ~/.cache/chrome-for-testing
 */
const CHROME_FOR_TESTING_ROOT =
  process.env.CHROME_FOR_TESTING_PATH ??
  (process.env.USERPROFILE
    ? `${process.env.USERPROFILE.replace(/\\/g, '/')}/.cache/chrome-for-testing`
    : '');

/** 扫描 Chrome for Testing 的安装目录，取版本号最大的一个。 */
function findChromeForTesting(): string | undefined {
  if (!CHROME_FOR_TESTING_ROOT) return undefined;

  const chromeDir = `${CHROME_FOR_TESTING_ROOT}/chrome`;
  if (!existsSync(chromeDir)) return undefined;

  const versions = readdirSync(chromeDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .reverse();

  for (const version of versions) {
    const candidates = [
      `${chromeDir}/${version}/chrome-win64/chrome.exe`,
      `${chromeDir}/${version}/chrome-win32/chrome.exe`,
      `${chromeDir}/${version}/chrome-linux64/chrome`,
      `${chromeDir}/${version}/chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`,
    ];
    const hit = candidates.find((candidate) => existsSync(candidate));
    if (hit) return hit;
  }

  return undefined;
}

/** 系统里的官方品牌版。仅用于给出安装提示，不作为调试宿主。 */
const BRANDED_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  process.env.LOCALAPPDATA
    ? process.env.LOCALAPPDATA + '/Google/Chrome/Application/chrome.exe'
    : '',
].filter((p) => Boolean(p));

const chromeBinary = findChromeForTesting();

if (!chromeBinary) {
  const branded = BRANDED_CANDIDATES.find((p) => existsSync(p));
  throw new Error(
    [
      '找不到 Chrome for Testing，无法以开发模式启动。',
      '',
      '系统里的官方品牌版 Chrome 自 Chrome 137 起移除了 --load-extension，',
      '加载未打包扩展会失败（表现为扩展页面 ERR_BLOCKED_BY_CLIENT）。',
      branded ? `  检测到品牌版：${branded}` : '',
      '',
      '请先安装 Chrome for Testing：',
      '  npx @puppeteer/browsers install chrome@stable --path ~/.cache/chrome-for-testing',
      '',
      `查找位置：${CHROME_FOR_TESTING_ROOT}`,
    ]
      .filter(Boolean)
      .join('\n'),
  );
}

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
    name: 'Study Pilot',
    /*
     * 商店列表里显示的就是这一句。
     *
     * 措辞克制：不写「破解」「刷课」这类说法，也不宣称与平台有任何关联。
     * 只客观说明它辅助什么。功能细节在设置页与 README 里如实列出。
     */
    description: '慕课平台辅助工具：整理课程待办与截止时间，可辅助完成客观题测验',
    version: '0.1.0',
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
      'notifications',
      /*
       * 定时唤醒后台检查。MV3 的后台线程不能常驻，没有它就只能等
       * 浏览器下次启动，而那意味着「作业刚发布时你正开着浏览器，
       * 却什么都不会发生」。用途与间隔见 src/background/alarms.ts。
       */
      'alarms',
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
    options_ui: {
      page: 'options.html',
      open_in_tab: true,
    },
  },
  webExt: {
    ...(chromeBinary ? { binaries: { chrome: chromeBinary } } : {}),
    chromiumProfile,
    keepProfileChanges: true,
    chromiumArgs: [
      // 固定开启 CDP 调试端口，供探测工具通过 9222 读取页面与扩展。
      '--remote-debugging-port=9222',
      '--remote-allow-origins=*',
    ],
  },
});
