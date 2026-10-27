/**
 * SM4（GB/T 32907-2016）的 CBC + PKCS#7 实现。
 *
 * 为什么自己写：网易 URS 的登录信封（`p1`）用 SM4/CBC/PKCS7 加密，而
 * WebCrypto 没有 SM4；平台相关能力只能落在平台包里。
 *
 * 字节序与轮函数按国标原文；`sm4.test.ts` 用 OpenSSL 生成的标准向量钉住
 * （key=iv 全零/标准样例，密文 `681edf34…` 两段），不做任何自创变体。
 */

const SBOX = new Uint8Array([
  0xd6, 0x90, 0xe9, 0xfe, 0xcc, 0xe1, 0x3d, 0xb7, 0x16, 0xb6, 0x14, 0xc2, 0x28, 0xfb, 0x2c, 0x05,
  0x2b, 0x67, 0x9a, 0x76, 0x2a, 0xbe, 0x04, 0xc3, 0xaa, 0x44, 0x13, 0x26, 0x49, 0x86, 0x06, 0x99,
  0x9c, 0x42, 0x50, 0xf4, 0x91, 0xef, 0x98, 0x7a, 0x33, 0x54, 0x0b, 0x43, 0xed, 0xcf, 0xac, 0x62,
  0xe4, 0xb3, 0x1c, 0xa9, 0xc9, 0x08, 0xe8, 0x95, 0x80, 0xdf, 0x94, 0xfa, 0x75, 0x8f, 0x3f, 0xa6,
  0x47, 0x07, 0xa7, 0xfc, 0xf3, 0x73, 0x17, 0xba, 0x83, 0x59, 0x3c, 0x19, 0xe6, 0x85, 0x4f, 0xa8,
  0x68, 0x6b, 0x81, 0xb2, 0x71, 0x64, 0xda, 0x8b, 0xf8, 0xeb, 0x0f, 0x4b, 0x70, 0x56, 0x9d, 0x35,
  0x1e, 0x24, 0x0e, 0x5e, 0x63, 0x58, 0xd1, 0xa2, 0x25, 0x22, 0x7c, 0x3b, 0x01, 0x21, 0x78, 0x87,
  0xd4, 0x00, 0x46, 0x57, 0x9f, 0xd3, 0x27, 0x52, 0x4c, 0x36, 0x02, 0xe7, 0xa0, 0xc4, 0xc8, 0x9e,
  0xea, 0xbf, 0x8a, 0xd2, 0x40, 0xc7, 0x38, 0xb5, 0xa3, 0xf7, 0xf2, 0xce, 0xf9, 0x61, 0x15, 0xa1,
  0xe0, 0xae, 0x5d, 0xa4, 0x9b, 0x34, 0x1a, 0x55, 0xad, 0x93, 0x32, 0x30, 0xf5, 0x8c, 0xb1, 0xe3,
  0x1d, 0xf6, 0xe2, 0x2e, 0x82, 0x66, 0xca, 0x60, 0xc0, 0x29, 0x23, 0xab, 0x0d, 0x53, 0x4e, 0x6f,
  0xd5, 0xdb, 0x37, 0x45, 0xde, 0xfd, 0x8e, 0x2f, 0x03, 0xff, 0x6a, 0x72, 0x6d, 0x6c, 0x5b, 0x51,
  0x8d, 0x1b, 0xaf, 0x92, 0xbb, 0xdd, 0xbc, 0x7f, 0x11, 0xd9, 0x5c, 0x41, 0x1f, 0x10, 0x5a, 0xd8,
  0x0a, 0xc1, 0x31, 0x88, 0xa5, 0xcd, 0x7b, 0xbd, 0x2d, 0x74, 0xd0, 0x12, 0xb8, 0xe5, 0xb4, 0xb0,
  0x89, 0x69, 0x97, 0x4a, 0x0c, 0x96, 0x77, 0x7e, 0x65, 0xb9, 0xf1, 0x09, 0xc5, 0x6e, 0xc6, 0x84,
  0x18, 0xf0, 0x7d, 0xec, 0x3a, 0xdc, 0x4d, 0x20, 0x79, 0xee, 0x5f, 0x3e, 0xd7, 0xcb, 0x39, 0x48,
]);

const FK = new Uint32Array([0xa3b1bac6, 0x56aa3350, 0x677d9197, 0xb27022dc]);

const CK = new Uint32Array([
  0x00070e15, 0x1c232a31, 0x383f464d, 0x545b6269, 0x70777e85, 0x8c939aa1, 0xa8afb6bd, 0xc4cbd2d9,
  0xe0e7eef5, 0xfc030a11, 0x181f262d, 0x343b4249, 0x50575e65, 0x6c737a81, 0x888f969d, 0xa4abb2b9,
  0xc0c7ced5, 0xdce3eaf1, 0xf8ff060d, 0x141b2229, 0x30373e45, 0x4c535a61, 0x686f767d, 0x848b9299,
  0xa0a7aeb5, 0xbcc3cad1, 0xd8dfe6ed, 0xf4fb0209, 0x10171e25, 0x2c333a41, 0x484f565d, 0x646b7279,
]);

const rotl = (x: number, n: number): number => (x << n) | (x >>> (32 - n));

/** 非线性变换 τ：逐字节过 S 盒。 */
function tau(a: number): number {
  return (
    ((SBOX[(a >>> 24) & 0xff]! << 24) |
      (SBOX[(a >>> 16) & 0xff]! << 16) |
      (SBOX[(a >>> 8) & 0xff]! << 8) |
      SBOX[a & 0xff]!) >>>
    0
  );
}

/** 线性变换 L（轮函数用）。 */
const lRound = (b: number): number => b ^ rotl(b, 2) ^ rotl(b, 10) ^ rotl(b, 18) ^ rotl(b, 24);

/** 线性变换 L'（密钥扩展用）。 */
const lKey = (b: number): number => b ^ rotl(b, 13) ^ rotl(b, 23);

function roundKeys(key: Uint8Array): Uint32Array {
  if (key.length !== 16) throw new Error('SM4 密钥必须是 16 字节');
  const k = new Uint32Array(4);
  for (let i = 0; i < 4; i += 1) {
    k[i] =
      (((key[i * 4]! << 24) | (key[i * 4 + 1]! << 16) | (key[i * 4 + 2]! << 8) | key[i * 4 + 3]!) ^ FK[i]!) >>>
      0;
  }
  const rk = new Uint32Array(32);
  for (let i = 0; i < 32; i += 1) {
    const t = (k[1]! ^ k[2]! ^ k[3]! ^ CK[i]!) >>> 0;
    const next = (k[0]! ^ lKey(tau(t))) >>> 0;
    rk[i] = next;
    k[0] = k[1]!;
    k[1] = k[2]!;
    k[2] = k[3]!;
    k[3] = next;
  }
  return rk;
}

/** 单块加/解密（16 字节）；解密用逆序轮密钥，与加密同一轮函数。 */
function cryptBlock(block: Uint8Array, rk: Uint32Array, decrypt: boolean): Uint8Array {
  if (block.length !== 16) throw new Error('SM4 分组必须是 16 字节');
  const x = new Uint32Array(4);
  for (let i = 0; i < 4; i += 1) {
    x[i] = ((block[i * 4]! << 24) | (block[i * 4 + 1]! << 16) | (block[i * 4 + 2]! << 8) | block[i * 4 + 3]!) >>> 0;
  }
  const [x0, x1, x2, x3] = x as unknown as [number, number, number, number];
  const a = x0;
  const b = x1;
  const c = x2;
  const d = x3;
  const words = [a, b, c, d];
  for (let i = 0; i < 32; i += 1) {
    const key = rk[decrypt ? 31 - i : i]!;
    const t = (words[1]! ^ words[2]! ^ words[3]! ^ key) >>> 0;
    const next = (words[0]! ^ lRound(tau(t))) >>> 0;
    words[0] = words[1]!;
    words[1] = words[2]!;
    words[2] = words[3]!;
    words[3] = next;
  }
  const out = new Uint8Array(16);
  for (let i = 0; i < 4; i += 1) {
    const word = words[3 - i]!;
    out[i * 4] = (word >>> 24) & 0xff;
    out[i * 4 + 1] = (word >>> 16) & 0xff;
    out[i * 4 + 2] = (word >>> 8) & 0xff;
    out[i * 4 + 3] = word & 0xff;
  }
  return out;
}

/** PKCS#7 填充：块对齐时补整块。 */
function pad(data: Uint8Array, blockSize = 16): Uint8Array {
  const remainder = data.length % blockSize;
  const count = blockSize - remainder;
  const out = new Uint8Array(data.length + count);
  out.set(data);
  out.fill(count, data.length);
  return out;
}

function unpad(data: Uint8Array, blockSize = 16): Uint8Array {
  const count = data[data.length - 1] ?? 0;
  if (count < 1 || count > blockSize) throw new Error('SM4 填充非法');
  for (let i = data.length - count; i < data.length; i += 1) {
    if (data[i] !== count) throw new Error('SM4 填充非法');
  }
  return data.subarray(0, data.length - count);
}

/** CBC 加密（PKCS#7 填充），用于 `p1`。 */
export function sm4CbcEncrypt(key: Uint8Array, iv: Uint8Array, plain: Uint8Array): Uint8Array {
  if (iv.length !== 16) throw new Error('SM4 IV 必须是 16 字节');
  const rk = roundKeys(key);
  const data = pad(plain);
  const out = new Uint8Array(data.length);
  let previous = iv;
  for (let offset = 0; offset < data.length; offset += 16) {
    const block = new Uint8Array(16);
    for (let i = 0; i < 16; i += 1) block[i] = data[offset + i]! ^ previous[i]!;
    const encrypted = cryptBlock(block, rk, false);
    out.set(encrypted, offset);
    previous = encrypted;
  }
  return out;
}

/** CBC 解密（校验 PKCS#7 填充），用于读响应 `data`。 */
export function sm4CbcDecrypt(key: Uint8Array, iv: Uint8Array, cipher: Uint8Array): Uint8Array {
  if (iv.length !== 16) throw new Error('SM4 IV 必须是 16 字节');
  if (cipher.length === 0 || cipher.length % 16 !== 0) throw new Error('SM4 密文长度不是分组整数倍');
  const rk = roundKeys(key);
  const out = new Uint8Array(cipher.length);
  let previous = iv;
  for (let offset = 0; offset < cipher.length; offset += 16) {
    const block = cipher.subarray(offset, offset + 16);
    const decrypted = cryptBlock(block, rk, true);
    for (let i = 0; i < 16; i += 1) out[offset + i] = decrypted[i]! ^ previous[i]!;
    previous = block;
  }
  return unpad(out);
}
