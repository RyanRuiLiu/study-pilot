/**
 * 网易云课堂系（NPC）接口签名。
 *
 * 本文件是**按线上源码逐行还原**的实现，不是推断。
 *
 * 原始代码（`core.js` 偏移 166060，学习页 bundle 内另有同构副本）：
 *
 * ```js
 * c.geneAuthHeaders = function (e) {
 *   if (!window.md5) i._$md5js();
 *   var t = function (e, t, n) {                  // e=data, t=timestamp, n=nonce
 *     var i = t || +new Date;
 *     var o = n || Math.floor(9e3 * Math.random()) + 1e3;
 *     var a = "[Object Object]" === Object.prototype.toString.call(e) ? JSON.stringify(e) : e || "";
 *     var r = a + o + i + "fu2s2kxcswgn5hqanx7asmlogyr5wu29";
 *     var s = "";
 *     try { s = (window.md5(r) || "").toLocaleUpperCase() } catch (c) { console.error("md5计算错误") }
 *     return s
 *   };
 *   var n = +new Date, o = Math.floor(9e3 * Math.random()) + 1e3, a = "v1";
 *   var r = e.data;
 *   var s = t(r, n, o);
 *   return {
 *     Timestamp: "" + n,
 *     "Auth-Signature": s,
 *     Nonce: "" + o,
 *     System: a,
 *     "Content-Type": "application/json;charset=UTF-8"
 *   }
 * };
 * ```
 *
 * 三个容易写错的点：
 *
 * 1. **空值边界**。页面是 `e || ""`：不是普通对象时，假值（`undefined` / `null` / `0` / `""`）
 *    一律当空串参与签名，而**不是** JSON 序列化。上一代实现无条件
 *    `JSON.stringify(body ?? {})`，空 body 时会签成 `"{}"`，与页面不一致。
 *
 * 2. **这里没有 `edu-script-token`**。`geneAuthHeaders` 的返回对象只有五个字段。
 *    `edu-script-token` 在源码里是另一个模块（`base-logger`）的 `csrf_cookie`，
 *    且 `domainRegex` 指向 `study.163.com`，与 icourse163 的 `.rpc` 请求无关。
 *    上一代实现把它当请求头附加，属于没有依据的多余动作。
 *
 * 3. **签名不是无条件的**。调用点是 `if (n.isNeedAuth) headers = {...geneAuthHeaders(n)}`，
 *    是否签名由各接口的配置决定。本实现把开关交给调用方（见 `RpcClient` 的 `sign` 选项），
 *    默认全部签名——因为已实测带签名的只读请求全部返回 `code: 0`，服务端不会拒绝。
 *    哪些接口**必须**签名、哪些接口**不接受**签名，尚未逐接口核对。
 */

import type { Md5HexFn } from '@study-pilot/core';

/** 签名盐值。随平台前端发版可能变化；改版后先核对 bundle 里的字面量。 */
export const SIGN_SALT = 'fu2s2kxcswgn5hqanx7asmlogyr5wu29';

/** 协议版本，对应源码里写死的 `"v1"`。 */
export const SIGN_SYSTEM = 'v1';

/** 请求体内容类型，大小写与源码一致。 */
export const JSON_CONTENT_TYPE = 'application/json;charset=UTF-8';

/**
 * 按页面语义把请求体序列化成参与签名的字符串。
 *
 * - 普通对象（`[object Object]`）→ `JSON.stringify`
 * - 其它假值（`undefined` / `null` / `0` / `''`）→ 空串
 * - 其它真值（字符串、数字）→ 字符串化
 */
export function serializeForSign(data: unknown): string {
  if (Object.prototype.toString.call(data) === '[object Object]') {
    return JSON.stringify(data);
  }
  return data ? String(data) : '';
}

/**
 * 生成 nonce：`Math.floor(9000 * Math.random()) + 1000`，取值区间 1000–9999。
 * 与源码一致——不是 0–9999，也不是 100000–999999。
 */
export function randomNonce(): number {
  return Math.floor(9000 * Math.random()) + 1000;
}

/**
 * 计算签名：`MD5(body + nonce + timestamp + SALT)` 的十六进制大写。
 *
 * 顺序是 **body → nonce → timestamp → SALT**，不是常见的 timestamp 在前。
 */
export function makeSignature(
  signedBody: string,
  timestamp: number,
  nonce: number,
  md5: Md5HexFn,
): string {
  return md5(signedBody + nonce + timestamp + SIGN_SALT).toUpperCase();
}

/** 签名请求头。字段名与源码一致。 */
export interface AuthHeaders {
  Timestamp: string;
  Nonce: string;
  System: string;
  'Auth-Signature': string;
  'Content-Type': string;
}

export interface BuildAuthHeadersOptions {
  /** 毫秒时间戳，缺省取当前时间 */
  timestamp?: number;
  /** 随机数，缺省随机生成 1000–9999 */
  nonce?: number;
}

/**
 * 构造签名请求头。
 *
 * @param body 请求体。会先经 {@link serializeForSign} 处理，语义与页面一致。
 * @param md5 MD5 实现。浏览器环境用 `@study-pilot/core` 的 `md5hex`；
 *            Node 环境可直接用 `node:crypto`。
 */
export function buildAuthHeaders(
  body: unknown,
  md5: Md5HexFn,
  options: BuildAuthHeadersOptions = {},
): AuthHeaders {
  const timestamp = options.timestamp ?? Date.now();
  const nonce = options.nonce ?? randomNonce();
  return {
    Timestamp: String(timestamp),
    Nonce: String(nonce),
    System: SIGN_SYSTEM,
    'Auth-Signature': makeSignature(serializeForSign(body), timestamp, nonce, md5),
    'Content-Type': JSON_CONTENT_TYPE,
  };
}
