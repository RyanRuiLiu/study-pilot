/**
 * RSA PKCS#1 v1.5 的最小实现（加密/解密），供网易 URS 信封使用。
 *
 * 为什么不用 WebCrypto：扩展所在的环境只对 RSAES-PKCS1-v1_5 提供**加密**，
 * 不提供私钥解密；而 URS 的响应必须用客户端私钥做 PKCS#1 v1.5 解密。
 * 为了两个载体（扩展 / CLI）行为一致，这里用 BigInt 直接实现两侧。
 *
 * 报文形状来自公开实现 NEORUAA/MeiloX 的 NeteaseUrsCrypto（2026-10-26 取）：
 *   · 加密按「模长 - 11」切块后逐块 RSA，拼接；
 *   · 解密按模长切块，逐块去 PKCS#1 填充后拼接；
 *   · 密钥是 DER（PKCS#8 私钥 / SPKI 公钥）的 base64，App 侧由 libnedat 解出。
 *
 * 只接受 RSA 密钥；不是通用密码库。
 */

interface RsaPublic {
  n: bigint;
  e: bigint;
  /** 模长（字节） */
  size: number;
}

interface RsaPrivate extends RsaPublic {
  d: bigint;
}

function bytesToBigInt(bytes: Uint8Array): bigint {
  let value = 0n;
  for (const b of bytes) value = (value << 8n) | BigInt(b);
  return value;
}

function bigIntToBytes(value: bigint, length: number): Uint8Array {
  const out = new Uint8Array(length);
  let rest = value;
  for (let i = length - 1; i >= 0; i -= 1) {
    out[i] = Number(rest & 0xffn);
    rest >>= 8n;
  }
  if (rest !== 0n) throw new Error('RSA 数值超出模长');
  return out;
}

function modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
  let result = 1n;
  let b = base % modulus;
  let e = exponent;
  while (e > 0n) {
    if ((e & 1n) === 1n) result = (result * b) % modulus;
    b = (b * b) % modulus;
    e >>= 1n;
  }
  return result;
}

/** 极简 DER：返回 [tag, value] 序列。 */
function derChildren(bytes: Uint8Array): Array<{ tag: number; value: Uint8Array }> {
  const out: Array<{ tag: number; value: Uint8Array }> = [];
  let offset = 0;
  while (offset < bytes.length) {
    const tag = bytes[offset]!;
    offset += 1;
    let length = bytes[offset]!;
    offset += 1;
    if ((length & 0x80) !== 0) {
      const count = length & 0x7f;
      if (count === 0 || count > 4) throw new Error('DER 长度非法');
      length = 0;
      for (let i = 0; i < count; i += 1) length = (length << 8) | bytes[offset + i]!;
      offset += count;
    }
    out.push({ tag, value: bytes.subarray(offset, offset + length) });
    offset += length;
  }
  return out;
}

function base64ToBytes(value: string): Uint8Array {
  const clean = value.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '');
  const binary = atob(clean);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
  return out;
}

function stripLeadingZero(bytes: Uint8Array): Uint8Array {
  return bytes[0] === 0x00 ? bytes.subarray(1) : bytes;
}

/** 解析 SPKI（公钥）：SEQUENCE { AlgorithmIdentifier, BIT STRING { INTEGER n, INTEGER e } }。 */
export function parseRsaPublicKey(base64Der: string): RsaPublic {
  const der = base64ToBytes(base64Der);
  const top = derChildren(der);
  if (top.length !== 1 || top[0]!.tag !== 0x30) throw new Error('不是 SPKI 结构');
  const parts = derChildren(top[0]!.value);
  const bitString = parts[1];
  if (bitString === undefined || bitString.tag !== 0x03) throw new Error('SPKI 缺少 BIT STRING');
  // BIT STRING 首字节是未用位数，其后是 SEQUENCE { INTEGER n, INTEGER e }
  const wrapper = derChildren(bitString.value.subarray(1))[0];
  if (wrapper === undefined || wrapper.tag !== 0x30) throw new Error('SPKI 公钥结构非法');
  const inner = derChildren(wrapper.value);
  const n = bytesToBigInt(stripLeadingZero(inner[0]!.value));
  const e = bytesToBigInt(stripLeadingZero(inner[1]!.value));
  return { n, e, size: Math.ceil(n.toString(16).length / 2) };
}

/** 解析 PKCS#8（私钥）：SEQUENCE { INTEGER 0, AlgorithmIdentifier, OCTET STRING { RSAPrivateKey } }。 */
export function parseRsaPrivateKey(base64Der: string): RsaPrivate {
  const der = base64ToBytes(base64Der);
  const top = derChildren(der);
  if (top.length !== 1 || top[0]!.tag !== 0x30) throw new Error('不是 PKCS#8 结构');
  const parts = derChildren(top[0]!.value);
  const octet = parts[2];
  if (octet === undefined || octet.tag !== 0x04) throw new Error('PKCS#8 缺少 OCTET STRING');
  // OCTET STRING 里是 RSAPrivateKey SEQUENCE
  const wrapper = derChildren(octet.value)[0];
  if (wrapper === undefined || wrapper.tag !== 0x30) throw new Error('PKCS#8 私钥结构非法');
  const inner = derChildren(wrapper.value);
  const n = bytesToBigInt(stripLeadingZero(inner[1]!.value));
  const e = bytesToBigInt(stripLeadingZero(inner[2]!.value));
  const d = bytesToBigInt(stripLeadingZero(inner[3]!.value));
  return { n, e, d, size: Math.ceil(n.toString(16).length / 2) };
}

function randomNonZero(length: number): Uint8Array {
  const out = new Uint8Array(length);
  crypto.getRandomValues(out);
  for (let i = 0; i < out.length; i += 1) {
    // 填充串要求每字节非零
    while (out[i] === 0) out[i] = crypto.getRandomValues(new Uint8Array(1))[0]!;
  }
  return out;
}

/** RSAES-PKCS1-v1_5 加密；按「模长 - 11」切块，与 URS 客户端一致。 */
export function rsaPkcs1Encrypt(key: RsaPublic, data: Uint8Array): Uint8Array {
  const block = key.size - 11;
  if (data.length === 0) throw new Error('RSA 明文为空');
  const chunks: Uint8Array[] = [];
  for (let offset = 0; offset < data.length; offset += block) {
    const piece = data.subarray(offset, Math.min(offset + block, data.length));
    const padding = randomNonZero(key.size - piece.length - 3);
    const em = new Uint8Array(key.size);
    em[1] = 0x02;
    em.set(padding, 2);
    em.set(piece, 2 + padding.length + 1);
    const m = bytesToBigInt(em);
    chunks.push(bigIntToBytes(modPow(m, key.e, key.n), key.size));
  }
  const out = new Uint8Array(chunks.length * key.size);
  chunks.forEach((chunk, index) => out.set(chunk, index * key.size));
  return out;
}

/** RSAES-PKCS1-v1_5 解密；按模长切块，逐块去填充后拼接。 */
export function rsaPkcs1Decrypt(key: RsaPrivate, data: Uint8Array): Uint8Array {
  if (data.length === 0 || data.length % key.size !== 0) throw new Error('RSA 密文长度不是模长整数倍');
  const parts: Uint8Array[] = [];
  for (let offset = 0; offset < data.length; offset += key.size) {
    const c = bytesToBigInt(data.subarray(offset, offset + key.size));
    const em = bigIntToBytes(modPow(c, key.d, key.n), key.size);
    if (em[0] !== 0x00 || em[1] !== 0x02) throw new Error('RSA 填充非法');
    let separator = 2;
    while (separator < em.length && em[separator] !== 0x00) separator += 1;
    if (separator < 10) throw new Error('RSA 填充过短');
    parts.push(em.subarray(separator + 1));
  }
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}
