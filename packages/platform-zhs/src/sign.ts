/*
 * 智慧树请求签名。
 *
 * 协议来自客户端源码逆向（base2.zhihuishu.com/js/2.js、4.js 去混淆版），
 * 2026-10-16 全部经真机验证（9/9 解密对上；离线签名真发请求返回 200）：
 *
 *   1. 取钥：GET `appcomm-user…/c/has?uid=` ＋ RSA 公钥加密（`{"module":N}`）→ `rt.sl`；
 *   2. 还原：对 sl 做 RSA 公钥运算（c^e mod n）并按 PKCS#1 解垫 → `JSON.cKey`（16 字节）；
 *   3. 加密：AES-128-CBC/Pkcs7（明文 JSON，key=cKey，iv 固定表）→ base64，即 `secretStr`。
 *
 * 平台的 JSEncrypt 是改过的：它的 `decrypt` 实为 doPublic（公钥运算）——
 * 服务端拿私钥签一个随机 AES 钥，客户端拿公钥还原。因此两个方向都能只靠
 * 一把内置于客户端的 RSA 公钥完成，这里照此实现。
 *
 * 实现选择（与「不引第三方密码库」的取舍）：
 *   - RSA 两个方向都是 BigInt 模幂 + 手工填充：WebCrypto 不支持 PKCS#1 v1.5 加密，
 *     而这两个运算各只有十来行，自己写比引库更可控（填充行为逐行对齐客户端，见下）；
 *   - AES 走 WebCrypto（`crypto.subtle`），浏览器与 Node 通用，PKCS#7 由它处理；
 *   - 随机填充字节用 `crypto.getRandomValues`。
 */

/** 内置于客户端的 RSA 公钥（SPKI DER，base64）。两处 base2 脚本里是同一把。 */
export const ZHS_SIGNING_PUBLIC_KEY =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCgfZmpLpPEpEFRKBe+ZjWJUjPe+7qg7pGqcfN3j2egJ8H2mrKwaEqZEnPnpi2O3hN8HRyaFozDOp8gwZiYfiIZjWy0Jr/FNAiiKYh5bq0GsEn+ieMmRyJg/+i1rqizhvCXvFdrdGhFTw5EBwTpsGdwe1utdlrvIJUAFWj9Yh4qbQIDAQAB';

/** AES 的固定 IV（源码里的字面量，两端一样）。 */
const AES_IV_UTF8 = '1g3qqdh4jvbskb9x';

/** 请求时间戳的字段名。学习端网关用 `dateFormate`，首页端网关用 `date`。 */
export type StampField = 'dateFormate' | 'date';

// ---------------------------------------------------------------- 基础编解码

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToBytes(text: string): Uint8Array {
  const binary = atob(text);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function textToBytes(text: string): Uint8Array<ArrayBuffer> {
  return new TextEncoder().encode(text);
}

// ---------------------------------------------------------------- RSA

/**
 * 从 SPKI DER 里取出模数 n 与指数 e。
 *
 * 只认 RSA 公钥这一种形状：
 *   SEQUENCE { SEQUENCE(算法标识) BIT STRING { SEQUENCE { n, e } } }
 * 出格的输入直接抛——这里不是通用 DER 解析器，也没有兜底的必要。
 */
function parsePublicKey(der: Uint8Array): { n: bigint; e: bigint } {
  let offset = 0;

  function readLength(): number {
    const first = der[offset++] ?? -1;
    if (first < 0) throw new Error('公钥格式不符（DER 截断）');
    if ((first & 0x80) === 0) return first;
    const count = first & 0x7f;
    let value = 0;
    for (let i = 0; i < count; i++) value = value * 256 + (der[offset++] ?? -1);
    return value;
  }

  function expect(tag: number): void {
    if (der[offset] !== tag) throw new Error('公钥格式不符（DER 标签）');
    offset += 1;
  }

  function readInteger(): bigint {
    expect(0x02);
    const length = readLength();
    let value = 0n;
    for (let i = 0; i < length; i++) value = (value << 8n) | BigInt(der[offset + i] ?? 0);
    offset += length;
    return value;
  }

  expect(0x30);
  readLength(); // 外层 SEQUENCE
  expect(0x30);
  // 注意：`offset += readLength()` 是错的——复合赋值的左值先求值，
  // 算出来是「进入前的 offset + 长度」，比正确位置少 1。先取再跳。
  const algorithmLength = readLength();
  offset += algorithmLength; // 算法标识整段跳过
  expect(0x03);
  const bitStringLength = readLength(); // 位串总长（含未用位数字节）
  void bitStringLength;
  offset += 1; // 跳过未用位数字节
  expect(0x30);
  readLength(); // 内层 RSAPublicKey SEQUENCE
  const n = readInteger();
  const e = readInteger();
  return { n, e };
}

/** 模幂：base^exp mod m。 */
function modPow(base: bigint, exp: bigint, m: bigint): bigint {
  let result = 1n;
  let b = base % m;
  let e = exp;
  while (e > 0n) {
    if (e & 1n) result = (result * b) % m;
    b = (b * b) % m;
    e >>= 1n;
  }
  return result;
}

/** bigint → 定长大端字节（按模数长度左填充 0）。 */
function bigintToBytes(value: bigint, length: number): Uint8Array {
  const bytes = new Uint8Array(length);
  let v = value;
  for (let i = length - 1; i >= 0; i--) {
    bytes[i] = Number(v & 0xffn);
    v >>= 8n;
  }
  return bytes;
}

function bytesToBigint(bytes: Uint8Array): bigint {
  let value = 0n;
  for (const byte of bytes) value = (value << 8n) | BigInt(byte);
  return value;
}

let keyPromise: Promise<{ n: bigint; e: bigint }> | null = null;

function publicKey(): Promise<{ n: bigint; e: bigint }> {
  keyPromise ??= Promise.resolve(parsePublicKey(base64ToBytes(ZHS_SIGNING_PUBLIC_KEY)));
  return keyPromise;
}

/**
 * RSA 公钥加密（PKCS#1 v1.5 type-2 填充），返回 base64。
 * 与 JSEncrypt 的 `encrypt` 行为一致：填充随机不可含 0。
 */
export async function rsaPublicEncrypt(plain: Uint8Array): Promise<string> {
  const { n, e } = await publicKey();
  const keyLength = 128; // 1024 位模数的字节数
  if (plain.length > keyLength - 11) throw new Error('待加密内容超出 RSA 分组长度');

  const bytes = new Uint8Array(keyLength - 3 - plain.length);
  crypto.getRandomValues(bytes);
  const padding = new Uint8Array(bytes.length);
  for (const [index, byte] of bytes.entries()) {
    // 填充字节不能为 0（0 是分隔符）
    padding[index] = byte === 0 ? 1 : byte;
  }

  const message = new Uint8Array(keyLength);
  message[0] = 0;
  message[1] = 2;
  message.set(padding, 2);
  message[2 + padding.length] = 0;
  message.set(plain, 3 + padding.length);

  const cipher = modPow(bytesToBigint(message), e, n);
  return bytesToBase64(bigintToBytes(cipher, keyLength));
}

/**
 * 从服务端签名钥 sl 还原 AES 密钥 cKey。
 *
 * 公钥运算（c^e mod n）后按客户端同款循环解垫：跳过前导 0，跳一位填充类型，
 * 再跳到 0x00 分隔符之后——类型 1/2 都能过（服务端用哪种都不影响）。
 */
export async function recoverCKey(sl: string): Promise<Uint8Array<ArrayBuffer>> {
  const { n, e } = await publicKey();
  const cipher = bytesToBigint(base64ToBytes(sl));
  const recovered = bigintToBytes(modPow(cipher, e, n), 128);

  let i = 0;
  while (i < recovered.length && recovered[i] === 0) i++;
  i += 1; // 填充类型字节
  while (i < recovered.length && recovered[i] !== 0) i++;
  i += 1; // 0x00 分隔符
  if (i >= recovered.length) throw new Error('sl 解垫失败');

  const parsed: unknown = JSON.parse(new TextDecoder().decode(recovered.subarray(i)));
  const cKey = (parsed as { cKey?: unknown }).cKey;
  if (typeof cKey !== 'string' || cKey.length === 0) throw new Error('sl 里没有 cKey');
  return textToBytes(cKey);
}

// ---------------------------------------------------------------- AES

/** AES-CBC/Pkcs7 加密（明文 JSON），返回 base64。密钥长度由 cKey 决定（16/24/32）。 */
export async function aesEncrypt(payload: unknown, cKey: Uint8Array<ArrayBuffer>): Promise<string> {
  const algorithm = { 16: 'AES-CBC', 24: 'AES-CBC', 32: 'AES-CBC' }[cKey.length];
  if (algorithm === undefined) throw new Error(`cKey 长度不支持：${cKey.length}`);
  const key = await crypto.subtle.importKey('raw', cKey, algorithm, false, ['encrypt']);
  const iv = textToBytes(AES_IV_UTF8);
  const cipher = await crypto.subtle.encrypt({ name: 'AES-CBC', iv }, key, textToBytes(JSON.stringify(payload)));
  return bytesToBase64(new Uint8Array(cipher));
}

// ---------------------------------------------------------------- 上报编码

/**
 * sdsew 的编码：数组 `join(';')` 后逐字符与循环键异或，输出两位小写十六进制。
 * 这把「加密」没有任何密码学含义，是客户端的混淆式编码；服务端按同法还原。
 */
export function xorHexEncode(values: ReadonlyArray<string | number>): string {
  const XOR_KEY = 'zzpttjd';
  const text = values.join(';');
  let out = '';
  for (let i = 0; i < text.length; i++) {
    out += (text.charCodeAt(i) ^ XOR_KEY.charCodeAt(i % XOR_KEY.length)).toString(16).padStart(2, '0');
  }
  return out;
}

/**
 * ewssw 时间证明序列：起手 `"0,1"`，此后每 2 秒追加一个 `parseInt(ke/5)+2`，
 * ke 为追加那一刻的累计观看秒。
 *
 * 逐字节对齐 2026-10-16 金样本得到的两条边界（head/tail 全段实测吻合）：
 *   - 首拍读到的 ke 是「base + 1」——1 秒的计秒先于 2 秒的序列拍发生；
 *   - 追加次数为 ceil(total/2)（total 为本次增量秒）。
 */
export function buildSeries(baseSec: number, totalSec: number): string {
  const parts = ['0', '1'];
  const ticks = Math.ceil(totalSec / 2);
  for (let i = 1; i <= ticks; i++) {
    parts.push(String(Math.floor((baseSec + i * 2 - 1) / 5) + 2));
  }
  return parts.join(',');
}

/** 播放位置文案：秒 → `HH:MM:SS`。 */
export function formatPosition(seconds: number): string {
  const hh = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

/**
 * 组装签名后的表单请求体：`secretStr=…&<时间戳字段>=…`。
 * 时间戳字段名由网关族决定（学习端 `dateFormate`、首页端 `date`），
 * 值由调用方给出（它同时会放进被加密的载荷里，两处必须同一个数）。
 */
export async function wrapSignedBody(
  payload: Record<string, unknown>,
  cKey: Uint8Array<ArrayBuffer>,
  stamp: { field: StampField; value: number },
): Promise<string> {
  const secretStr = await aesEncrypt(payload, cKey);
  return `secretStr=${encodeURIComponent(secretStr)}&${stamp.field}=${stamp.value}`;
}
