/**
 * AES-128/ECB/PKCS5Padding：传统 URS 登录接口的报文加密。
 *
 * 为什么自己写：WebCrypto 不提供 ECB 模式，而 URS 的 `params`/`msg` 就是
 * AES/ECB/PKCS5Padding（2026-10-27 由 4.12.0 的 `util.a` 与
 * `libursandroidcore.so` 的 `AES/ECB/PKCS5Padding` 常量确认）。只实现
 * 128 位、单块 ECB，不做通用库。
 */

const SBOX = new Uint8Array([
  0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
  0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
  0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
  0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
  0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
  0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
  0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
  0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
  0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
  0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
  0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
  0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
  0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
  0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
  0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
  0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16,
]);

const INV_SBOX = new Uint8Array(256);
for (let i = 0; i < 256; i += 1) INV_SBOX[SBOX[i]!] = i;

const RCON = new Uint8Array([0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36]);

function xtime(value: number): number {
  return ((value << 1) ^ ((value & 0x80) !== 0 ? 0x1b : 0)) & 0xff;
}

function mul(a: number, b: number): number {
  let result = 0;
  let left = a;
  let right = b;
  while (right !== 0) {
    if ((right & 1) !== 0) result ^= left;
    left = xtime(left);
    right >>>= 1;
  }
  return result & 0xff;
}

function expandKey(key: Uint8Array): Uint8Array {
  if (key.length !== 16) throw new Error('AES-128 需要 16 字节密钥');
  const roundKeys = new Uint8Array(176);
  roundKeys.set(key);
  for (let index = 16; index < 176; index += 4) {
    let word0 = roundKeys[index - 4]!;
    let word1 = roundKeys[index - 3]!;
    let word2 = roundKeys[index - 2]!;
    let word3 = roundKeys[index - 1]!;
    if (index % 16 === 0) {
      const rotated = word0;
      word0 = SBOX[word1]! ^ RCON[index / 16]!;
      word1 = SBOX[word2]!;
      word2 = SBOX[word3]!;
      word3 = SBOX[rotated]!;
    }
    roundKeys[index] = roundKeys[index - 16]! ^ word0;
    roundKeys[index + 1] = roundKeys[index - 15]! ^ word1;
    roundKeys[index + 2] = roundKeys[index - 14]! ^ word2;
    roundKeys[index + 3] = roundKeys[index - 13]! ^ word3;
  }
  return roundKeys;
}

function addRoundKey(state: Uint8Array, roundKeys: Uint8Array, round: number): void {
  for (let i = 0; i < 16; i += 1) state[i] = state[i]! ^ roundKeys[round * 16 + i]!;
}

function shiftRows(state: Uint8Array): void {
  let value = state[1]!;
  state[1] = state[5]!;
  state[5] = state[9]!;
  state[9] = state[13]!;
  state[13] = value;
  value = state[2]!;
  state[2] = state[10]!;
  state[10] = value;
  value = state[6]!;
  state[6] = state[14]!;
  state[14] = value;
  value = state[15]!;
  state[15] = state[11]!;
  state[11] = state[7]!;
  state[7] = state[3]!;
  state[3] = value;
}

function invShiftRows(state: Uint8Array): void {
  let value = state[13]!;
  state[13] = state[9]!;
  state[9] = state[5]!;
  state[5] = state[1]!;
  state[1] = value;
  value = state[2]!;
  state[2] = state[10]!;
  state[10] = value;
  value = state[6]!;
  state[6] = state[14]!;
  state[14] = value;
  value = state[3]!;
  state[3] = state[7]!;
  state[7] = state[11]!;
  state[11] = state[15]!;
  state[15] = value;
}

function mixColumns(state: Uint8Array): void {
  for (let column = 0; column < 4; column += 1) {
    const offset = column * 4;
    const a0 = state[offset]!;
    const a1 = state[offset + 1]!;
    const a2 = state[offset + 2]!;
    const a3 = state[offset + 3]!;
    state[offset] = xtime(a0) ^ (xtime(a1) ^ a1) ^ a2 ^ a3;
    state[offset + 1] = a0 ^ xtime(a1) ^ (xtime(a2) ^ a2) ^ a3;
    state[offset + 2] = a0 ^ a1 ^ xtime(a2) ^ (xtime(a3) ^ a3);
    state[offset + 3] = (xtime(a0) ^ a0) ^ a1 ^ a2 ^ xtime(a3);
  }
}

function invMixColumns(state: Uint8Array): void {
  for (let column = 0; column < 4; column += 1) {
    const offset = column * 4;
    const a0 = state[offset]!;
    const a1 = state[offset + 1]!;
    const a2 = state[offset + 2]!;
    const a3 = state[offset + 3]!;
    state[offset] = mul(a0, 14) ^ mul(a1, 11) ^ mul(a2, 13) ^ mul(a3, 9);
    state[offset + 1] = mul(a0, 9) ^ mul(a1, 14) ^ mul(a2, 11) ^ mul(a3, 13);
    state[offset + 2] = mul(a0, 13) ^ mul(a1, 9) ^ mul(a2, 14) ^ mul(a3, 11);
    state[offset + 3] = mul(a0, 11) ^ mul(a1, 13) ^ mul(a2, 9) ^ mul(a3, 14);
  }
}

function encryptBlock(block: Uint8Array, roundKeys: Uint8Array): Uint8Array {
  const state = block.slice();
  addRoundKey(state, roundKeys, 0);
  for (let round = 1; round < 10; round += 1) {
    for (let i = 0; i < 16; i += 1) state[i] = SBOX[state[i]!]!;
    shiftRows(state);
    mixColumns(state);
    addRoundKey(state, roundKeys, round);
  }
  for (let i = 0; i < 16; i += 1) state[i] = SBOX[state[i]!]!;
  shiftRows(state);
  addRoundKey(state, roundKeys, 10);
  return state;
}

function decryptBlock(block: Uint8Array, roundKeys: Uint8Array): Uint8Array {
  const state = block.slice();
  addRoundKey(state, roundKeys, 10);
  for (let round = 9; round > 0; round -= 1) {
    invShiftRows(state);
    for (let i = 0; i < 16; i += 1) state[i] = INV_SBOX[state[i]!]!;
    addRoundKey(state, roundKeys, round);
    invMixColumns(state);
  }
  invShiftRows(state);
  for (let i = 0; i < 16; i += 1) state[i] = INV_SBOX[state[i]!]!;
  addRoundKey(state, roundKeys, 0);
  return state;
}

/** AES-128/ECB/PKCS7 加密，输出小写十六进制。 */
export function aes128EcbEncryptHex(plain: Uint8Array, key: Uint8Array): string {
  const roundKeys = expandKey(key);
  const padded = new Uint8Array(Math.ceil((plain.length + 1) / 16) * 16);
  padded.set(plain);
  padded.fill(16 - (plain.length % 16), plain.length);
  const out = new Uint8Array(padded.length);
  for (let offset = 0; offset < padded.length; offset += 16) {
    out.set(encryptBlock(padded.subarray(offset, offset + 16), roundKeys), offset);
  }
  return Array.from(out, (b) => b.toString(16).padStart(2, '0')).join('');
}

/** AES-128/ECB/PKCS7 解密十六进制。 */
export function aes128EcbDecryptHex(cipherHex: string, key: Uint8Array): Uint8Array {
  if (cipherHex.length === 0 || cipherHex.length % 32 !== 0 || /[^0-9a-fA-F]/.test(cipherHex)) {
    throw new Error('AES 密文必须是 16 字节整数倍的小写/大写十六进制');
  }
  const roundKeys = expandKey(key);
  const cipher = Uint8Array.from(cipherHex.match(/../g) ?? [], (pair) => Number.parseInt(pair, 16));
  const out = new Uint8Array(cipher.length);
  for (let offset = 0; offset < cipher.length; offset += 16) {
    out.set(decryptBlock(cipher.subarray(offset, offset + 16), roundKeys), offset);
  }
  const padding = out[out.length - 1]!;
  if (padding < 1 || padding > 16 || padding > out.length) throw new Error('AES 填充非法');
  for (let i = out.length - padding; i < out.length; i += 1) {
    if (out[i] !== padding) throw new Error('AES 填充非法');
  }
  return out.slice(0, out.length - padding);
}

/** 十六进制文本 ↔ AES 密钥（URS 密钥是 32 位十六进制文本）。 */
export function aesKeyFromHex(hex: string): Uint8Array {
  if (hex.length !== 32 || /[^0-9a-fA-F]/.test(hex)) throw new Error('AES-128 密钥必须是 32 位十六进制');
  return Uint8Array.from(hex.match(/../g) ?? [], (pair) => Number.parseInt(pair, 16));
}
