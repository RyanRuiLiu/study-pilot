/*
 * URS 信封与 SM4 的机器核对。
 *
 * 明文、密钥与 RSA 密钥对全部是合成值；唯一的外部向量是公开实现附带的
 * OpenSSL SM4/CBC 向量，用来钉住算法实现本身，与任何账号数据无关。
 */

import { describe, expect, it } from 'vitest';
import { buildUrsHeaders, decryptUrsResponse } from '../src/urs/envelope.ts';
import { parseRsaPrivateKey, parseRsaPublicKey, rsaPkcs1Decrypt, rsaPkcs1Encrypt } from '../src/urs/pkcs1.ts';
import { sm4CbcDecrypt, sm4CbcEncrypt } from '../src/urs/sm4.ts';

const hex = (value: string): Uint8Array =>
  Uint8Array.from(value.match(/../g) ?? [], (pair) => Number.parseInt(pair, 16));
const toHex = (bytes: Uint8Array): string =>
  Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
const toBase64 = (bytes: Uint8Array): string => btoa(String.fromCharCode(...bytes));

/** 合成 RSA-2048 测试密钥对（SPKI / PKCS#8 的 base64 DER），只用于机器核对。 */
const TEST_PUBLIC =
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoQ1NqCIPy1EmL/fEwUT9iyrPdcyB72iSYrRTEmVIwAHAMBkDadLcqRjh6hdeHLno7hZw+ieMd+XxOIVkxSMQd2/2rwcOsnodo6mX7RFj4K2MRtgXJ7OCd5edwcKdv8ErhMUqKY/9j3F/MYL5Lo6LfU3tyna8rjgsDXtDtcrmg36DwhL9VB3lcaIhDBYKqOOIOqtlmtIpxMaBSUILMxjIYDPV109u6kabjdhdvKTT+UB8LeZHrz4NpvegAmezqoYVH1dP5Gz/df0lq9edUNqcK3sAsAf5Ft2mdJlvQa98Vb8UEfkQLqzFQfZ+iAO3lJZ//werXtcRiVRRvf0DsIgyvQIDAQAB';
const TEST_PRIVATE =
  'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChDU2oIg/LUSYv98TBRP2LKs91zIHvaJJitFMSZUjAAcAwGQNp0typGOHqF14cuejuFnD6J4x35fE4hWTFIxB3b/avBw6yeh2jqZftEWPgrYxG2Bcns4J3l53Bwp2/wSuExSopj/2PcX8xgvkujot9Te3KdryuOCwNe0O1yuaDfoPCEv1UHeVxoiEMFgqo44g6q2Wa0inExoFJQgszGMhgM9XXT27qRpuN2F28pNP5QHwt5kevPg2m96ACZ7OqhhUfV0/kbP91/SWr151Q2pwrewCwB/kW3aZ0mW9Br3xVvxQR+RAurMVB9n6IA7eUln//B6te1xGJVFG9/QOwiDK9AgMBAAECggEAQJpmiUhIj6VYrSs1iNWU4ytkFvvXL2MCPYfaPunUGflZz7Fo9h04mLg7fzyqatmEf2UPIrmUlk/tyF9yAcZEB7Uo/iLVmXB0zT7ti5JLP0g+mfh6qVlPv4tZI+1efBoPy+2PMSbqboz3mbPRIwTZHYWSGoIww64StcG5coYWm64UYziFYw+NwjNHoGnwTpXhQhtHJY9g3fwoIccQVyCbt1iFy3a8LbtoiquMQOaetFJ9TSm3tRresHk79icPUxsTexR0mlzRigjiHHzFfjfIpx3Xc0qr4DbXRN/5HUtoiaH8j90ofAX51KhL3qN8O3/FMsPQNND2fbseQQapBz9UfQKBgQDLlYWxyB00/BH9/y/LiCkr8AcTt3FXjnjWugwEK/4I9Q4STFu+dpw1X4qFjvcvZpHbbLgtMIKkyMM87IHOdq17pN01Vgih3cvzOlShF7JfBL1atgHqITe1+gU+YAl/RAAkHPrL5vba3QpwfpbSAgQra3TTpy4Cg0JRG/76vp/uswKBgQDKhG//XwsXVTuYEulz/WggF4g2uxFgBZWZXOcwKyec7+H3lRL9itYNMe95nnHOpqwUjTBun2MtKVfWq7mwtqvKKB/CKr1o+EWlLn8ZmkfKfQYNz4uzLkvg4ab+tYfSdy465EalLingR7UFT/GisVVptlZ8wlnY9jiGmwfSLgkQzwKBgCcJwfxISkl5uJ2DDJAzyOlS+phuSb6nZEaQoHNAWFMxYoRhvgn0xpl5e5+GvaGKQpfX7i1EKxkcIkwRcga8PSIDiCONHtSjKlO2sLm/SIXt6710P0O9IOi1S8IdOlT8HibOo8zruhRX5IOT0qnslw4YaeuYGDuFHfddrfQ5D4P/AoGALrHgvQomHYgqiIL7zyHDy3qBjtUNSY2gE8+HAuVAagApoxN9YHaNqlc0N1+gMBzgGpD/dNJNZNFejoHj++nyrFcaE4QVTknIjTCuX7HiEb9IEREkzfjDyCNfhOVIXu/Z+fw+icGeKDeAdqwbM/8diZVgVb3eR5dmKys932l776MCgYEAmyJ3iMkHERgjcFVHiqkGstKoz+7b1RTxlMM6vspqFHCqiXV4sB9+BfVaQ3zT6aKmDpx0Nk+6/Rj5dmgkSRgAmYyX+0xQkgk8lPrgtUUjGr8gjt0vfXlIycvlN3RnUtDplMf/f2LPtDdoVvJLfb36DAKXfu3uOill/KAqyTd3ceY=';

describe('SM4/CBC/PKCS7', () => {
  // OpenSSL 生成的标准向量（key=明文，IV 全零）
  const key = hex('0123456789abcdeffedcba9876543210');
  const iv = new Uint8Array(16);
  const cipher = '681edf34d206965e86b3e94f536e4246677d307e844d7aa24579d556490dc7aa';

  it('加密结果与公开向量逐字节一致', () => {
    expect(toHex(sm4CbcEncrypt(key, iv, key))).toBe(cipher);
  });

  it('解密还原明文', () => {
    expect(toHex(sm4CbcDecrypt(key, iv, hex(cipher)))).toBe(toHex(key));
  });

  it('填充被篡改时拒绝，不返回残缺明文', () => {
    const damaged = hex(cipher);
    damaged[damaged.length - 1] = (damaged[damaged.length - 1]! ^ 1) & 0xff;
    expect(() => sm4CbcDecrypt(key, iv, damaged)).toThrow();
  });
});

describe('RSA PKCS#1 v1.5（URS 用）', () => {
  it('单块往返', () => {
    const message = new TextEncoder().encode('{"smkey":"synthetic"}');
    const cipher = rsaPkcs1Encrypt(parseRsaPublicKey(TEST_PUBLIC), message);
    expect(cipher).toHaveLength(256);
    expect(new TextDecoder().decode(rsaPkcs1Decrypt(parseRsaPrivateKey(TEST_PRIVATE), cipher))).toBe(
      '{"smkey":"synthetic"}',
    );
  });

  it('超过一个模长的数据按块加密、按块还原', () => {
    const message = new Uint8Array(600).fill(0x41);
    const cipher = rsaPkcs1Encrypt(parseRsaPublicKey(TEST_PUBLIC), message);
    expect(cipher).toHaveLength(256 * 3);
    expect(rsaPkcs1Decrypt(parseRsaPrivateKey(TEST_PRIVATE), cipher)).toEqual(message);
  });

  it('密文长度不是模长整数倍时拒绝', () => {
    expect(() => rsaPkcs1Decrypt(parseRsaPrivateKey(TEST_PRIVATE), new Uint8Array(100))).toThrow();
  });
});

describe('URS 信封', () => {
  const params = { username: 'synthetic-user', appId: 'synthetic-app' };
  const random = (length: number): Uint8Array => new Uint8Array(length).fill(0x2a);

  it('p1 用会话密钥 SM4 加密参数，p2 用服务端公钥包裹会话密钥', () => {
    const headers = buildUrsHeaders(params, TEST_PUBLIC, { random });

    // p1：同一 key/iv 能解回参数
    const plain = new TextDecoder().decode(sm4CbcDecrypt(headers.key, headers.iv, hex(headers.p1)));
    expect(JSON.parse(plain)).toEqual(params);

    // p2：十六进制 → base64 文本 → 客户端私钥解出 {smkey, smIv}
    const wrapped = Uint8Array.from(atob(new TextDecoder().decode(hex(headers.p2))), (c) => c.charCodeAt(0));
    const keys = JSON.parse(new TextDecoder().decode(rsaPkcs1Decrypt(parseRsaPrivateKey(TEST_PRIVATE), wrapped)));
    expect(keys).toEqual({ smkey: toHex(headers.key), smIv: toHex(headers.iv) });
  });

  it('响应解密：enc=true 时用私钥解出 key/iv 再解 data', () => {
    const key = new Uint8Array(16).fill(0x11);
    const iv = new Uint8Array(16).fill(0x22);
    const payload = { token: 'yd_' + '0'.repeat(40) };
    const data = sm4CbcEncrypt(key, iv, new TextEncoder().encode(JSON.stringify(payload)));
    const response = {
      enc: true,
      data: toHex(data),
      key: toBase64(rsaPkcs1Encrypt(parseRsaPublicKey(TEST_PUBLIC), new TextEncoder().encode(toHex(key)))),
      iv: toBase64(rsaPkcs1Encrypt(parseRsaPublicKey(TEST_PUBLIC), new TextEncoder().encode(toHex(iv)))),
    };

    expect(decryptUrsResponse(response, TEST_PRIVATE)).toEqual(payload);
  });

  it('enc=false 时按明文对象读', () => {
    expect(decryptUrsResponse({ enc: false, data: { appId: 'synthetic' } }, TEST_PRIVATE)).toEqual({
      appId: 'synthetic',
    });
  });
});
