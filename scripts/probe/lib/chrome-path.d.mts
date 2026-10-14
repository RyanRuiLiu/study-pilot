/*
 * scripts/probe/lib/chrome-path.mjs 的类型声明。
 *
 * 那个模块是纯 Node 脚本共用的实现（不编译、不打包），因此类型写在这里，
 * 让 TypeScript 侧（wxt.config.ts）也能安全引用它。
 */

/** Chrome for Testing 的安装根目录；空串表示这台机器上没有可查的位置。 */
export declare function chromeForTestingRoot(): string;

/** Chrome for Testing 的可执行文件路径，找不到返回 null。 */
export declare function findChromeForTesting(): string | null;

/**
 * 官方品牌版 Chrome 的可执行文件路径，找不到返回 null。
 * 它不能作为调试宿主，只用于报错时说明检测到的是哪一个。
 */
export declare function findBrandedChrome(): string | null;

/** 装不上时给用户的统一说法。 */
export declare function chromeForTestingInstallHint(): string;
