/**
 * `@study-pilot/core`：与平台无关的纯函数。
 *
 * 约束：本包不允许依赖任何具体平台、不允许有副作用。运行时只要求浏览器与 Node
 * 都提供的标准全局对象（`TextEncoder`、`fetch`），不调用任何浏览器专有 API；
 * `fetch.ts` 的 `RequestInit`/`Response` 属于类型层面借用 `lib.dom` 的定义
 * （base tsconfig 的 `lib` 含 DOM），编译期需要、运行期不需要。
 * 这样它既能在扩展里跑，也能在 Node 里被测试直接调用。
 */

export { md5hex, type Md5HexFn } from './md5.ts';
export { ok, err, type Result } from './result.ts';
export type { FetchLike } from './fetch.ts';
