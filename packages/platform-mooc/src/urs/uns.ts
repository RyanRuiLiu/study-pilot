/*
 * 网易 UNS（新一代账号登录）的固定常量与信封。
 *
 * 与 legacy URS（`/interfaces/yd/pwdlogin.do`）的区别：UNS 先 `/uns/sdk/app/v1/ini`
 * 取一个安装级 `appId`（登录体的 `utid`），再用 p1/p2/p3 三件套提交账密。
 * p1 是 SM4-CBC/PKCS7 的明文 JSON，p2 是把本次随机 smkey/smIv 用服务端公钥
 * RSA/PKCS#1 包起来，p3 是产品固定的 access id。响应用客户端私钥解 key/iv，
 * 再解 data。
 *
 * 这些密钥来自官方 App 的 `key_public_urs.dat` / `key_private_urs.dat`
 * （DAT 容器用 `app_sign_private.dat` 解出）。它们是产品级常量，不是某个
 * 用户的凭证；App 的每一次登录都用同一对。客户端私钥只用于解开服务端
 * 回给客户端的 key/iv，不参与身份认证。
 *
 * 2026-10-27 实测补充：
 *   · `ydUniqueId` 传空串可以通过 init，说明服务端不强制 ZXID；
 *   · 设备画像用平板（model/resolution），登录后手机 App 的 mob-token
 *     仍然有效（`getMobDeviceLimtStatus` 回 code 0），不会占用手机槽。
 */

import {
  base64ToBytes,
  bytesToBase64,
  parseRsaPrivateKey,
  parseRsaPublicKey,
  rsaPkcs1Decrypt,
  rsaPkcs1Encrypt,
  type RsaPrivateKey,
  type RsaPublicKey,
} from './rsa.ts';
import { bytesToHex, hexToBytes, sm4CbcDecrypt, sm4CbcEncrypt } from './sm4.ts';

export const UNS_ORIGIN = 'https://sdk.reg.163.com';
export const UNS_INIT_PATH = '/uns/sdk/app/v1/ini';
export const UNS_PASSWORD_LOGIN_PATH = '/uns/sdk/login/mob/pwd/v1/login';

/** 产品固定的 access id（抓包与 `libursandroidunity` 的 getConsts 一致）。 */
export const UNS_ACCESS_ID = 'b86b0dde87b086504ddbdf31cef6c461';
export const UNS_PRODUCT = 'edumooc_client';
/** UNS SDK 的协议版本，不是 App 版本。 */
export const UNS_VERSION = '1.6.3';
export const UNS_APP_VERSION = '5.6.1';
/** 官方 App 的包签名 MD5（大写十六进制）。 */
export const UNS_PACKAGE_SIGN = 'FC69CE2D086F7A65C64B3CCAA54F1C87';

/**
 * 官方产品 `edumooc_client` 的客户端 id（URS initSdk 下发）。
 * 既是 UNS p1 里的 `appId`，也是 UNS token 换 mob-token 时的 `appId`。
 */
export const URS_CLIENT_ID =
  '5A628216489A6CF86F2890898ED620804859F7613325A31AA9FA58E1B5206CBF1357988F9BBF7444F8C4089965276261A907209E92AFDB94D9686F55C600B9A6';

const UNS_SERVER_PUBLIC_KEY =
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv/prXj2ZXCywbiOnE5NT9vTdDPFmjoWLFvcRNcWoXvPMsuivYXAlKrIRXIs0XoT7CsLN313xl7qks765akw3aUXliItmGCouS6ctCF7QdrsJNv+iflUFMQjjCuBKJE7Qks0nnPPEuNGeYiSq5p0LWxW29aAJJs/gouqwq5sHxScb8CPpc+/75BTON3qKgvU2469IrS2P4MIHloNawiOABhwQ1oeVY+OTALRR8Ma4q/2TpX99QUivRLxJzbpy7blBiwX1tldyKLK7XFzqDFWHMCEC1zJujFgdeZFu27EPsb9RpNYvWeEzfQvbW7ujSldGkzgjKgSkTomQExPi/vdUrwIDAQAB';

const UNS_CLIENT_PRIVATE_KEY =
  'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC4Dr5bNABE2N8nZ2d9m0/FybtksyL4lP2xvOns63jf7wyKdCC+euoEv7q1vFWCBGa2/+wQiqwsZlSpAjdVhIGv2dzPAmH0oQXFM3N8ns44LcDhDyecJNbNvTU5R8rVWfXLf8iC254hbcVyUoajXe9x7rsipTcfVHul25K+nuTUzTE+Jjsmmup8w8h3t6hGterXEMxk9eUL/pK9GD/TUfp43Wt54Kn50WV8w4x8vH3nrkBe1tl7WdKEm32X6+I3JFt0+GquPBgl6G1o1qHLv+c83Xtvr/M/Q7yUaU9nY+DgUj5GA9iPX8ges0Bh/VIJqnQqGBBEQGsohPHkympKsz4VAgMBAAECggEAVIr5Jv1ozjbrsbbOk6R+bPRvrh6WhqYxLa3/qUKz3/B2yzXyQGxHB+1lfsrGYBVTdOVy8lowIajTZFpPPmnCBBtHUJLgmbRI6T7r4iczxBxIB1ilshQ90n0BcJEoev16aIIGgQ0Nwn8gfZWooGuqa6Pjs1M+UZbFwPZtnj9wDsp0a1ve429Xkfrj9oO0KQED1prqlGFRI0n7cdEfCTk/3ScbIb8FLDOJBh4VA6A9P2GTHe1jRLNeFwbaPDgcFmxloXxHqxWTkhkx6t5x7mquvH68zY61vBvzrouGkQMOPdMVweHtm2BrIHDat1hq7mK9r4rqFv2BRWsiV8X2gpQK4QKBgQD5SG/CUgkWZ32hdihiZFvR5Kk7q+/2OnBQT+hLnH+Sl67HHVWZzAE8ewQs8yiFSQMwz8G1v41Xa/pmUJdN+agSzLMfmNfPbhm3EbdhjuKv5E5Fzeyhru0w/KFmdc93Pw2XtrynoEHeI/Jk8Ij/zLUF0ajAp1gqJ5r1RJPf2OpP/QKBgQC9BGFEVxkAa8HWRdv1IaNjLscKKMbjJ30tS6I5rEl/OFU0tBVgChb44oco5G8dhcCqYYWJfkqbgrgGPFk+xw+vf7K9fr9VD211djOcjSNQghbu10icJYmL3orDpgG20IOtpwQL/U9eqE5QS/voqTO/rTUaciS1JSwVPv/qlEGF+QKBgBYXhVADVSrXIRseDZYqrrh7O0Q+iJWZuDpl2oBY7jVfm+2pe9yVZ8akYEpbgkvNnKrGvrQMtcn5l8dZfQ88ANkpqvYx5W5Mo5rFxyquLwjHguhMx5vMlNiyits5tZkrzViUqUNxwGSfauvnJT0GN0S8v+fS7M1PlTwHR9OetaVBAoGADsrt9dQ/L6o/RE65VSjpyZRanW/tiM+JW2ck7hCOu/cjq/lABwEjJR1NaKTgEVZraqoxMj6BBkSntE06ys/3aUu8KFpoDPclIOE8Ts846U8VDmIo25eQeTLUd1VhovYUqB1/EpUjhgvz/RLFR0MeuqyKkGRIfSjIl20TyD8MFbkCgYAPNua44LOFFRe9YXXPd9pqGS1RaDYpiITqA+T/3YCfrRnHjIfJrvmK70gECA+qdekEslqf6P/kN/qR7nulXlK3HNe62/kqvk80ZK5tCkgPcDHiqQ83/AJmdOd9aAeQLm0axeZTmWPUZM44+9eQJP8zv/nMj3hosH9LUg19n4/aFw==';

let serverKey: RsaPublicKey | null = null;
let clientKey: RsaPrivateKey | null = null;

const getServerKey = (): RsaPublicKey => (serverKey ??= parseRsaPublicKey(base64ToBytes(UNS_SERVER_PUBLIC_KEY)));
const getClientKey = (): RsaPrivateKey => (clientKey ??= parseRsaPrivateKey(base64ToBytes(UNS_CLIENT_PRIVATE_KEY)));

/**
 * 平板设备画像。
 *
 * 服务端按设备类别切会话槽：两台手机互相顶掉，平板与手机并存（用户实测）。
 * 因此扩展固定以平板身份登录，避免占用手机槽。
 */
export const UNS_DEVICE = {
  platform: 'android',
  appVersion: UNS_APP_VERSION,
  systemVersion: 30,
  model: 'MatePad Pro',
  resolution: '2560*1600',
  carrier: '中国电信',
  network: 'WIFI',
  ua: 'Mozilla/5.0 (Linux; Android 11; MatePad Pro Build/RP1A.200720.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.106 Mobile Safari/537.36',
} as const;

export interface UnsDeviceInstall {
  /** Android ID，16 位十六进制；本机扩展安装级，首次登录生成后复用 */
  aId: string;
  /** 安装 id，40 位十六进制；同上 */
  uniqueId: string;
}

export interface UnsCommonPayload {
  appId: string;
  product: string;
  platform: string;
  version: string;
  appVersion: string;
  systemVersion: number;
  model: string;
  resolution: string;
  carrier: string;
  network: string;
  emulator: number;
  aId: string;
  uniqueId: string;
  packageSign: string;
  ydUniqueId: string;
  ua: string;
  time: number;
  reqId: string;
}

/**
 * 拼 p1 里的公共字段。字段名与 App 的 p1 明文逐字一致（2026-10-27 内存取证）：
 * 注意是 `pwd` 而不是 `password`，`isMd5: 0` 表示传明文。
 */
export function buildUnsCommonPayload(install: UnsDeviceInstall, now: number, reqId: string): UnsCommonPayload {
  return {
    appId: URS_CLIENT_ID,
    product: UNS_PRODUCT,
    platform: UNS_DEVICE.platform,
    version: UNS_VERSION,
    appVersion: UNS_DEVICE.appVersion,
    systemVersion: UNS_DEVICE.systemVersion,
    model: UNS_DEVICE.model,
    resolution: UNS_DEVICE.resolution,
    carrier: UNS_DEVICE.carrier,
    network: UNS_DEVICE.network,
    emulator: 0,
    aId: install.aId,
    uniqueId: install.uniqueId,
    packageSign: UNS_PACKAGE_SIGN,
    // App 会带 ZXID；实测空串服务端也接受，普通用户不必有手机 App
    ydUniqueId: '',
    ua: UNS_DEVICE.ua,
    time: now,
    reqId,
  };
}

export interface UnsHeaders {
  p1: string;
  p2: string;
  p3: string;
}

/** 测试注入用：生产环境一律用内置密钥。 */
export interface UnsKeyPair {
  serverPublic?: RsaPublicKey;
  clientPrivate?: RsaPrivateKey;
}

/** 把明文 JSON 封成 p1/p2/p3。`smkey`/`smIv` 每次请求随机。 */
export function buildUnsHeaders(
  payload: unknown,
  randomBytes: (length: number) => Uint8Array,
  keys: UnsKeyPair = {},
): UnsHeaders {
  const smkey = randomBytes(16);
  const smIv = randomBytes(16);
  const p1 = bytesToHex(sm4CbcEncrypt(new TextEncoder().encode(JSON.stringify(payload)), smkey, smIv));
  const wrapped = new TextEncoder().encode(JSON.stringify({ smkey: bytesToHex(smkey), smIv: bytesToHex(smIv) }));
  // p2 是「base64(RSA 密文)」的 ASCII，再按十六进制编码；不是裸密文的十六进制。
  const encrypted = bytesToBase64(rsaPkcs1Encrypt(keys.serverPublic ?? getServerKey(), wrapped));
  const p2 = bytesToHex(new TextEncoder().encode(encrypted)).toUpperCase();
  return { p1, p2, p3: UNS_ACCESS_ID };
}

interface UnsEncryptedResponse {
  enc?: unknown;
  key?: unknown;
  iv?: unknown;
  data?: unknown;
}

/**
 * 解服务端的 `{enc:true,key,iv,data}`。key/iv 是 base64 的 RSA 密文，
 * data 是十六进制 SM4 密文；明文是 JSON。非加密响应（错误码）返回 null。
 */
export function decryptUnsResponse<T>(response: UnsEncryptedResponse, keys: UnsKeyPair = {}): T | null {
  if (response.enc !== true) return null;
  if (typeof response.key !== 'string' || typeof response.iv !== 'string' || typeof response.data !== 'string') {
    throw new Error('UNS encrypted response is missing key/iv/data');
  }
  const privateKey = keys.clientPrivate ?? getClientKey();
  const key = new TextDecoder().decode(rsaPkcs1Decrypt(privateKey, base64ToBytes(response.key)));
  const iv = new TextDecoder().decode(rsaPkcs1Decrypt(privateKey, base64ToBytes(response.iv)));
  const plain = sm4CbcDecrypt(hexToBytes(response.data), hexToBytes(key), hexToBytes(iv));
  return JSON.parse(new TextDecoder().decode(plain)) as T;
}
