/**
 * 网易 URS 的信封：`p1`（SM4 加密的载荷）与 `p2`（RSA 包裹的会话密钥）。
 *
 * 算法与公开实现 NEORUAA/MeiloX 的 `NeteaseUrsCrypto` 一致（2026-10-26 取）：
 *
 *   key/iv ← 16 字节随机
 *   p1     ← hex( SM4-CBC-PKCS7( key, iv, JSON(参数) ) )
 *   p2     ← hex_upper( ASCII( base64( RSA_PKCS1( 服务端公钥, JSON{smkey,smIv} ) ) ) )
 *
 * 响应：`key`/`iv` 是 base64 的 RSA 密文（客户端私钥解出的是**十六进制文本**），
 * `data` 是 hex 的 SM4 密文。
 *
 * 两把密钥（服务端公钥 / 客户端私钥）是 App 资源，由 `libnedat` 解出；本模块
 * 只接收 base64 DER，不内置任何密钥。
 *
 * 用合成密钥的往返测试见 `test/urs-envelope.test.ts`。
 */

import {
  parseRsaPrivateKey,
  parseRsaPublicKey,
  rsaPkcs1Decrypt,
  rsaPkcs1Encrypt,
} from './pkcs1.ts';
import { sm4CbcDecrypt, sm4CbcEncrypt } from './sm4.ts';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const toHex = (bytes: Uint8Array): string =>
  Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');

const fromHex = (value: string): Uint8Array => {
  if (value.length % 2 !== 0 || /[^0-9a-fA-F]/.test(value)) throw new Error('不是合法的十六进制串');
  return Uint8Array.from(value.match(/../g) ?? [], (pair) => Number.parseInt(pair, 16));
};

const fromBase64 = (value: string): Uint8Array => Uint8Array.from(atob(value), (c) => c.charCodeAt(0));

const toBase64 = (bytes: Uint8Array): string => btoa(String.fromCharCode(...bytes));

export interface UrsHeaders {
  /** SM4 密文的十六进制（小写） */
  p1: string;
  /** base64 文本的十六进制（大写） */
  p2: string;
  /** 本次使用的会话密钥，供测试核对；不上网 */
  key: Uint8Array;
  iv: Uint8Array;
}

export interface UrsHeaderOptions {
  /** 测试注入的随机源；默认用 WebCrypto */
  random?: (length: number) => Uint8Array;
}

const defaultRandom = (length: number): Uint8Array => {
  const out = new Uint8Array(length);
  crypto.getRandomValues(out);
  return out;
};

/** 生成 `p1`/`p2`。`params` 是要交给平台的 JSON 参数。 */
export function buildUrsHeaders(
  params: Record<string, unknown>,
  serverPublicKeyBase64: string,
  options: UrsHeaderOptions = {},
): UrsHeaders {
  const random = options.random ?? defaultRandom;
  const key = random(16);
  const iv = random(16);
  const keys = JSON.stringify({ smkey: toHex(key), smIv: toHex(iv) });
  const wrapped = rsaPkcs1Encrypt(parseRsaPublicKey(serverPublicKeyBase64), encoder.encode(keys));
  return {
    p1: toHex(sm4CbcEncrypt(key, iv, encoder.encode(JSON.stringify(params)))),
    p2: toHex(encoder.encode(toBase64(wrapped))).toUpperCase(),
    key,
    iv,
  };
}

export interface UrsResponseEnvelope {
  enc?: boolean;
  data?: unknown;
  key?: string;
  iv?: string;
}

/** 读 URS 响应：`enc=true` 时先用客户端私钥解出 key/iv，再 SM4 解 `data`。 */
export function decryptUrsResponse(
  response: UrsResponseEnvelope,
  clientPrivateKeyBase64: string,
): unknown {
  if (response.data === null || response.data === undefined) return {};
  if (response.enc !== true) {
    return typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
  }
  if (typeof response.key !== 'string' || typeof response.iv !== 'string') {
    throw new Error('响应声明加密但缺少 key/iv');
  }
  const privateKey = parseRsaPrivateKey(clientPrivateKeyBase64);
  const key = fromHex(decoder.decode(rsaPkcs1Decrypt(privateKey, fromBase64(response.key))));
  const iv = fromHex(decoder.decode(rsaPkcs1Decrypt(privateKey, fromBase64(response.iv))));
  const plain = sm4CbcDecrypt(key, iv, fromHex(String(response.data)));
  return JSON.parse(decoder.decode(plain));
}
