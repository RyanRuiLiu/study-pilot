import { createPublicKey, createPrivateKey } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { base64ToBytes, parseRsaPrivateKey, parseRsaPublicKey } from '../src/urs/rsa.ts';

const source = readFileSync(new URL('../src/urs/uns.ts', import.meta.url), 'utf8');
const PUB = source.match(/const UNS_SERVER_PUBLIC_KEY =\s*'([^']+)'/)[1];
const PRIV = source.match(/const UNS_CLIENT_PRIVATE_KEY =\s*'([^']+)'/)[1];

const b64url = (hex) => Buffer.from(hex.padStart(512, '0'), 'hex').toString('base64url');

describe('生产密钥 DER 解析', () => {
  it('公钥 n/e 与 OpenSSL 一致', () => {
    const ours = parseRsaPublicKey(base64ToBytes(PUB));
    const jwk = createPublicKey({ key: Buffer.from(PUB, 'base64'), format: 'der', type: 'spki' }).export({ format: 'jwk' });
    expect(b64url(ours.n.toString(16))).toBe(jwk.n);
    expect(ours.e).toBe(BigInt('0x' + Buffer.from(jwk.e, 'base64url').toString('hex')));
  });
  it('私钥 n/e/d 与 OpenSSL 一致', () => {
    const ours = parseRsaPrivateKey(base64ToBytes(PRIV));
    const jwk = createPrivateKey({ key: Buffer.from(PRIV, 'base64'), format: 'der', type: 'pkcs8' }).export({ format: 'jwk' });
    expect(b64url(ours.n.toString(16))).toBe(jwk.n);
    expect(b64url(ours.d.toString(16))).toBe(jwk.d);
    expect(ours.e).toBe(BigInt('0x' + Buffer.from(jwk.e, 'base64url').toString('hex')));
  });
});
