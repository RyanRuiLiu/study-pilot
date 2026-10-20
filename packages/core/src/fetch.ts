/**
 * 出站请求的最小依赖。
 *
 * 定义在 core 而不是各自包里：`transport`（平台协议）与 `ai`（模型调用）都要
 * 注入 `fetch`，两处各写一份同名类型迟早会写出细微差别。这里只有一处。
 *
 * `RequestInit`/`Response` 取自 base tsconfig `lib` 里的 DOM 定义，只作类型用；
 * 本文件不发起任何请求，也不要求运行环境提供 DOM——浏览器与 Node 的全局 `fetch`
 * 都满足这个签名。
 */
export type FetchLike = (url: string, init?: RequestInit) => Promise<Response>;
