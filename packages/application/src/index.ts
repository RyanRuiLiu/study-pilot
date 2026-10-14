/*
 * @study-pilot/application：载体无关的应用层。
 *
 * 三块内容，各自一件事：
 *   model.ts   模型：换载体、换平台都不变的形状
 *   ports.ts   端口：应用与载体之间的唯一接口
 *   config/    配置：形状、默认值、规范化与迁移（纯逻辑，不碰存储）
 *   state.ts   跨次运行状态的判据与迁移
 *   progress.ts 执行进度的迁移
 *
 * 本包不认识浏览器、不认识 Node、不认识任何厂商：`browser.` / `window.` / `wxt`
 * 或任何厂商名字出现在这里即为越界。这条边界要机械核对，不靠人记。
 */
export * from './model.ts';
export * from './ai.ts';
export * from './state.ts';
export * from './progress.ts';
export * from './ports.ts';
export * from './config/index.ts';
