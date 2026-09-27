/**
 * `@study-pilot/core`：与平台无关的纯函数。
 *
 * 约束：本包不允许依赖浏览器 API、不允许依赖任何具体平台、不允许有副作用。
 * 这样它既能在扩展里跑，也能在 Node 里被测试直接调用。
 */

export { md5hex, type Md5HexFn } from './md5.ts';
export { ok, err, unwrap, type Ok, type Err, type Result } from './result.ts';
