/*
 * `@study-pilot/adapters-node`：在 Node 载体上实现应用层端口的现成件。
 *
 * 这四个文件原先住在 `apps/cli/src` 里——CLI 是唯一消费者时就地放没问题，
 * 但它们与应用层一点关系都没有（只认端口与 JSON 文件），第三个 Node 载体
 * （服务端、定时任务、桌面壳）会原样再写一遍。搬到一个包里，载体只装配。
 *
 * 只做落盘与读写：形状、默认值、规范化都在 `@study-pilot/application`。
 */

export { createFileConfigStore } from './config-store.ts';
export { createFileTaskStore } from './task-store.ts';
export { createCookieFileHost, readSessions, type SessionFile, type Sessions } from './session-file.ts';
export { createHeaderFetch, type OutboundOptions } from './header-fetch.ts';
