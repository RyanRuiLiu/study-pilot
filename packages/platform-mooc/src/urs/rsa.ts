/*
 * RSA PKCS#1 v1.5 与最小的 DER 解析。
 *
 * UNS 的 p2 是「{smkey, smIv} 的 JSON → RSA/PKCS#1 → base64 → 十六进制」，
 * 服务端用同一对密钥加密响应里的 key/iv；客户端用内置私钥解开。
 *
 * 只用 BigInt，不依赖 Node 的 crypto：扩展的 service worker 里没有它。
 */

interface Tlv {
  tag: number;
  /** 整个 TLV（含 tag/length）的起止 */
  start: number;
  end: number;
  /** 值部分的起止 */
  valueStart: number;
  valueEnd: number;
}

function readTlv(bytes: Uint8Array, offset: number): Tlv {
  if (offset + 2 > bytes.length) throw new Error('DER truncated');
  const tag = bytes[offset]!;
  let cursor = offset + 1;
  let length = bytes[cursor]!;
  cursor += 1;
  if ((length & 0x80) !== 0) {
    const lengthBytes = length & 0x7f;
    if (lengthBytes === 0 || lengthBytes > 4) throw new Error('DER length is unsupported');
    length = 0;
    for (let i = 0; i < lengthBytes; i += 1) {
      length = (length << 8) | bytes[cursor]!;
      cursor += 1;
    }
  }
  const valueStart = cursor;
  const valueEnd = valueStart + length;
  if (valueEnd > bytes.length) throw new Error('DER length exceeds buffer');
  return { tag, start: offset, end: valueEnd, valueStart, valueEnd };
}

const expectTag = (tlv: Tlv, tag: number): void => {
  if (tlv.tag !== tag) throw new Error(`DER tag 0x${tlv.tag.toString(16)} does not match 0x${tag.toString(16)}`);
};

const bigintFromBytes = (bytes: Uint8Array): bigint => {
  let value = 0n;
  for (const byte of bytes) value = (value << 8n) | BigInt(byte);
  return value;
};

const bytesFromBigint = (value: bigint, length: number): Uint8Array => {
  const out = new Uint8Array(length);
  let v = value;
  for (let i = length - 1; i >= 0; i -= 1) {
    out[i] = Number(v & 0xffn);
    v >>= 8n;
  }
  if (v !== 0n) throw new Error('integer does not fit requested length');
  return out;
};

const bitLength = (value: bigint): number => value.toString(2).length;

export interface RsaPublicKey {
  n: bigint;
  e: bigint;
  /** 模长（字节） */
  size: number;
}

export interface RsaPrivateKey {
  n: bigint;
  d: bigint;
  e: bigint;
  size: number;
}

function readInteger(bytes: Uint8Array, tlv: Tlv): bigint {
  expectTag(tlv, 0x02);
  let start = tlv.valueStart;
  if (start < tlv.valueEnd && bytes[start] === 0) start += 1;
  return bigintFromBytes(bytes.subarray(start, tlv.valueEnd));
}

/** 解析 SPKI DER（`MIIBIjAN...`）。 */
export function parseRsaPublicKey(der: Uint8Array): RsaPublicKey {
  const spki = readTlv(der, 0);
  expectTag(spki, 0x30);
  const algorithm = readTlv(der, spki.valueStart);
  expectTag(algorithm, 0x30);
  const bitString = readTlv(der, algorithm.end);
  expectTag(bitString, 0x03);
  if (bitString.valueEnd - bitString.valueStart < 2 || der[bitString.valueStart] !== 0) {
    throw new Error('DER bit string has unsupported padding');
  }
  const rsa = readTlv(der, bitString.valueStart + 1);
  expectTag(rsa, 0x30);
  const nTlv = readTlv(der, rsa.valueStart);
  const eTlv = readTlv(der, nTlv.end);
  const n = readInteger(der, nTlv);
  const e = readInteger(der, eTlv);
  return { n, e, size: Math.ceil(bitLength(n) / 8) };
}

/** 解析 PKCS#8 DER（`MIIEvAIBADAN...`）。 */
export function parseRsaPrivateKey(der: Uint8Array): RsaPrivateKey {
  const pki = readTlv(der, 0);
  expectTag(pki, 0x30);
  const version = readTlv(der, pki.valueStart);
  expectTag(version, 0x02);
  const algorithm = readTlv(der, version.end);
  expectTag(algorithm, 0x30);
  const octet = readTlv(der, algorithm.end);
  expectTag(octet, 0x04);
  const rsa = readTlv(der, octet.valueStart);
  expectTag(rsa, 0x30);
  const versionTlv = readTlv(der, rsa.valueStart);
  const nTlv = readTlv(der, versionTlv.end);
  const eTlv = readTlv(der, nTlv.end);
  const dTlv = readTlv(der, eTlv.end);
  const n = readInteger(der, nTlv);
  const e = readInteger(der, eTlv);
  const d = readInteger(der, dTlv);
  return { n, d, e, size: Math.ceil(bitLength(n) / 8) };
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

function randomNonZero(length: number): Uint8Array {
  const out = new Uint8Array(length);
  const buffer = new Uint8Array(64);
  let cursor = 0;
  while (cursor < length) {
    globalThis.crypto.getRandomValues(buffer);
    for (const byte of buffer) {
      if (byte === 0) continue;
      out[cursor] = byte;
      cursor += 1;
      if (cursor === length) break;
    }
  }
  return out;
}

/** RSA/PKCS#1 v1.5 加密（公钥）。 */
export function rsaPkcs1Encrypt(key: RsaPublicKey, message: Uint8Array): Uint8Array {
  if (message.length > key.size - 11) throw new Error('message too long for RSA key');
  const ps = randomNonZero(key.size - message.length - 3);
  const encoded = new Uint8Array(key.size);
  encoded[0] = 0x00;
  encoded[1] = 0x02;
  encoded.set(ps, 2);
  encoded[2 + ps.length] = 0x00;
  encoded.set(message, 3 + ps.length);
  const cipher = modPow(bigintFromBytes(encoded), key.e, key.n);
  return bytesFromBigint(cipher, key.size);
}

/** RSA/PKCS#1 v1.5 解密（私钥）。 */
export function rsaPkcs1Decrypt(key: RsaPrivateKey, ciphertext: Uint8Array): Uint8Array {
  if (ciphertext.length !== key.size) throw new Error('ciphertext length does not match RSA key');
  const message = modPow(bigintFromBytes(ciphertext), key.d, key.n);
  const encoded = bytesFromBigint(message, key.size);
  if (encoded[0] !== 0x00 || encoded[1] !== 0x02) throw new Error('RSA padding is invalid');
  let separator = 2;
  while (separator < encoded.length && encoded[separator] !== 0) separator += 1;
  if (separator === encoded.length || separator < 10) throw new Error('RSA padding is invalid');
  return encoded.subarray(separator + 1);
}

export const base64ToBytes = (value: string): Uint8Array => {
  const normalized = value.replace(/\s+/g, '');
  const binary = atob(normalized);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i);
  return out;
};

export const bytesToBase64 = (bytes: Uint8Array): string => {
  let binary = '';
  const step = 0x8000;
  for (let i = 0; i < bytes.length; i += step) {
    binary += String.fromCharCode(...bytes.subarray(i, i + step));
  }
  return btoa(binary);
};
