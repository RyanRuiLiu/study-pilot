/*
 * SM4-CBC/PKCS7。
 *
 * UNS 的 p1 是「明文 JSON → SM4-CBC/PKCS7 → 十六进制」，响应里的 `data`
 * 也是同一套（key/iv 由 RSA 单独下发）。这里只实现分组算法本身，
 * 不发请求、不碰密钥。
 *
 * 纯 TypeScript：扩展的 service worker 里没有 Node 的 crypto。
 */

const SBOX = Uint8Array.from([
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

const FK = [0xa3b1bac6, 0x56aa3350, 0x677d9197, 0xb27022dc];

const rotl = (x: number, n: number): number => ((x << n) | (x >>> (32 - n))) >>> 0;

const CK = Array.from({ length: 32 }, (_, i) => {
  const b0 = (4 * i * 7) & 0xff;
  const b1 = (4 * i * 7 + 7) & 0xff;
  const b2 = (4 * i * 7 + 14) & 0xff;
  const b3 = (4 * i * 7 + 21) & 0xff;
  return ((b0 << 24) | (b1 << 16) | (b2 << 8) | b3) >>> 0;
});

function tau(x: number): number {
  return (
    (SBOX[(x >>> 24) & 0xff]! << 24) |
    (SBOX[(x >>> 16) & 0xff]! << 16) |
    (SBOX[(x >>> 8) & 0xff]! << 8) |
    SBOX[x & 0xff]!
  ) >>> 0;
}

const t = (x: number): number => {
  const y = tau(x);
  return (y ^ rotl(y, 2) ^ rotl(y, 10) ^ rotl(y, 18) ^ rotl(y, 24)) >>> 0;
};

const tPrime = (x: number): number => {
  const y = tau(x);
  return (y ^ rotl(y, 13) ^ rotl(y, 23)) >>> 0;
};

function keySchedule(key: Uint8Array): Uint32Array {
  if (key.length !== 16) throw new Error('SM4 key must be 16 bytes');
  const k = new Uint32Array(36);
  k[0] = ((key[0]! << 24) | (key[1]! << 16) | (key[2]! << 8) | key[3]!) ^ FK[0]!;
  k[1] = ((key[4]! << 24) | (key[5]! << 16) | (key[6]! << 8) | key[7]!) ^ FK[1]!;
  k[2] = ((key[8]! << 24) | (key[9]! << 16) | (key[10]! << 8) | key[11]!) ^ FK[2]!;
  k[3] = ((key[12]! << 24) | (key[13]! << 16) | (key[14]! << 8) | key[15]!) ^ FK[3]!;
  for (let i = 0; i < 32; i += 1) {
    k[i + 4] = (k[i]! ^ tPrime(k[i + 1]! ^ k[i + 2]! ^ k[i + 3]! ^ CK[i]!)) >>> 0;
  }
  return k.subarray(4);
}

function cryptBlock(block: Uint8Array, roundKeys: Uint32Array, decrypt: boolean): Uint8Array {
  const x = new Uint32Array(36);
  x[0] = (block[0]! << 24) | (block[1]! << 16) | (block[2]! << 8) | block[3]!;
  x[1] = (block[4]! << 24) | (block[5]! << 16) | (block[6]! << 8) | block[7]!;
  x[2] = (block[8]! << 24) | (block[9]! << 16) | (block[10]! << 8) | block[11]!;
  x[3] = (block[12]! << 24) | (block[13]! << 16) | (block[14]! << 8) | block[15]!;
  for (let i = 0; i < 32; i += 1) {
    const rk = roundKeys[decrypt ? 31 - i : i]!;
    x[i + 4] = (x[i]! ^ t(x[i + 1]! ^ x[i + 2]! ^ x[i + 3]! ^ rk)) >>> 0;
  }
  const out = new Uint8Array(16);
  const words = [x[35]!, x[34]!, x[33]!, x[32]!];
  for (let i = 0; i < 4; i += 1) {
    const w = words[i]!;
    out[i * 4] = (w >>> 24) & 0xff;
    out[i * 4 + 1] = (w >>> 16) & 0xff;
    out[i * 4 + 2] = (w >>> 8) & 0xff;
    out[i * 4 + 3] = w & 0xff;
  }
  return out;
}

function pkcs7Pad(data: Uint8Array): Uint8Array {
  const pad = 16 - (data.length % 16);
  const out = new Uint8Array(data.length + pad);
  out.set(data);
  out.fill(pad, data.length);
  return out;
}

function pkcs7Unpad(data: Uint8Array): Uint8Array {
  if (data.length === 0 || data.length % 16 !== 0) throw new Error('SM4 ciphertext is not block aligned');
  const pad = data[data.length - 1]!;
  if (pad < 1 || pad > 16 || pad > data.length) throw new Error('SM4 padding is invalid');
  for (let i = data.length - pad; i < data.length; i += 1) {
    if (data[i] !== pad) throw new Error('SM4 padding is invalid');
  }
  return data.subarray(0, data.length - pad);
}

export function sm4CbcEncrypt(plain: Uint8Array, key: Uint8Array, iv: Uint8Array): Uint8Array {
  if (iv.length !== 16) throw new Error('SM4 IV must be 16 bytes');
  const roundKeys = keySchedule(key);
  const padded = pkcs7Pad(plain);
  const out = new Uint8Array(padded.length);
  let prev = iv;
  for (let offset = 0; offset < padded.length; offset += 16) {
    const block = new Uint8Array(16);
    for (let i = 0; i < 16; i += 1) block[i] = padded[offset + i]! ^ prev[i]!;
    const encrypted = cryptBlock(block, roundKeys, false);
    out.set(encrypted, offset);
    prev = encrypted;
  }
  return out;
}

export function sm4CbcDecrypt(cipher: Uint8Array, key: Uint8Array, iv: Uint8Array): Uint8Array {
  if (iv.length !== 16) throw new Error('SM4 IV must be 16 bytes');
  if (cipher.length === 0 || cipher.length % 16 !== 0) throw new Error('SM4 ciphertext is not block aligned');
  const roundKeys = keySchedule(key);
  const out = new Uint8Array(cipher.length);
  let prev = iv;
  for (let offset = 0; offset < cipher.length; offset += 16) {
    const block = cipher.subarray(offset, offset + 16);
    const decrypted = cryptBlock(block, roundKeys, true);
    for (let i = 0; i < 16; i += 1) out[offset + i] = decrypted[i]! ^ prev[i]!;
    prev = block;
  }
  return pkcs7Unpad(out);
}

export const bytesToHex = (bytes: Uint8Array): string =>
  Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');

export const hexToBytes = (hex: string): Uint8Array => {
  if (hex.length % 2 !== 0) throw new Error('hex string has odd length');
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i += 1) {
    const byte = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    if (!Number.isFinite(byte)) throw new Error('hex string contains non-hex characters');
    out[i] = byte;
  }
  return out;
};
