/*
 * 交叉验证：自定义 SM4/RSA 与 Node OpenSSL 必须逐字节一致。
 *
 * 扩展里不能依赖 Node crypto，所以协议层是纯 TS 实现；单测如果只用自己的
 * encrypt 配自己的 decrypt，两个实现同时错也能通过。这里用 Node 的标准实现
 * 做对照——服务端认的是标准实现。
 */

import { createCipheriv, generateKeyPairSync, privateDecrypt, publicEncrypt, constants } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { bytesToHex, hexToBytes, sm4CbcEncrypt } from '../src/urs/sm4.ts';
import {
  parseRsaPrivateKey,
  parseRsaPublicKey,
  rsaPkcs1Decrypt,
  rsaPkcs1Encrypt,
} from '../src/urs/rsa.ts';

describe('SM4 与 OpenSSL 一致', () => {
  it('多块 CBC/PKCS7 密文逐字节相同', () => {
    const key = hexToBytes('0123456789abcdeffedcba9876543210');
    const iv = hexToBytes('000102030405060708090a0b0c0d0e0f');
    const plain = Buffer.from('{"username":"13800138000","isMd5":0,"pwd":"secret","appId":"5A62"}');
    const cipher = createCipheriv('sm4-cbc', key, iv);
    const expected = Buffer.concat([cipher.update(plain), cipher.final()]).toString('hex');
    expect(bytesToHex(sm4CbcEncrypt(plain, key, iv))).toBe(expected);
  });
});

describe('RSA/PKCS#1 与 OpenSSL 互通', () => {
  const generated = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'der' },
    privateKeyEncoding: { type: 'pkcs8', format: 'der' },
  });
  const publicDer = new Uint8Array(generated.publicKey);
  const privateDer = new Uint8Array(generated.privateKey);
  const message = Buffer.from('{"smkey":"0123456789abcdef0123456789abcdef","smIv":"fedcba9876543210fedcba9876543210"}');

  it('我方加密 → OpenSSL 解密', () => {
    const cipher = rsaPkcs1Encrypt(parseRsaPublicKey(publicDer), message);
    const decrypted = privateDecrypt(
      { key: Buffer.from(privateDer), format: 'der', type: 'pkcs8', padding: constants.RSA_PKCS1_PADDING },
      Buffer.from(cipher),
    );
    expect(decrypted.equals(message)).toBe(true);
  });

  it('OpenSSL 加密 → 我方解密', () => {
    const cipher = publicEncrypt(
      { key: Buffer.from(publicDer), format: 'der', type: 'spki', padding: constants.RSA_PKCS1_PADDING },
      message,
    );
    const decrypted = rsaPkcs1Decrypt(parseRsaPrivateKey(privateDer), new Uint8Array(cipher));
    expect(Buffer.from(decrypted).equals(message)).toBe(true);
  });
});
