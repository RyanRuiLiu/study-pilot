import { describe, expect, it } from 'vitest';
import { md5hex } from '@study-pilot/core';
import { aes128EcbDecryptHex, aes128EcbEncryptHex, aesKeyFromHex } from '../src/urs/aes.ts';
import { buildUrsPasswordParams, loginUrsByPassword, URS_CLIENT_ID } from '../src/urs/password-login.ts';

/** 与 password-login.ts 相同的官方产品 AES key（客户端常量）。 */
const URS_KEY = '4cf8b82d04d0ca838fe0db6bf03488db';

const hex = (bytes: Uint8Array): string => Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');

describe('AES-128/ECB/PKCS7', () => {
  it('NIST 单块向量', () => {
    const key = aesKeyFromHex('000102030405060708090a0b0c0d0e0f');
    const plain = Uint8Array.from({ length: 16 }, (_, i) => i * 0x11);
    const encrypted = aes128EcbEncryptHex(plain, key);
    // 单块密文与 NIST 一致；PKCS7 对整块明文再补一整块 0x10
    expect(encrypted.slice(0, 32)).toBe('69c4e0d86a7b0430d8cdb78070b4c55a');
    expect(encrypted.length).toBe(64);
    expect(hex(aes128EcbDecryptHex(encrypted, key))).toBe(hex(plain));
  });

  it('多块往返并校验 PKCS7', () => {
    const key = aesKeyFromHex(URS_KEY);
    const plain = new TextEncoder().encode('mobile=13800138000&password=md5');
    const encrypted = aes128EcbEncryptHex(plain, key);
    expect(new TextDecoder().decode(aes128EcbDecryptHex(encrypted, key))).toBe('mobile=13800138000&password=md5');
    expect(() => aes128EcbDecryptHex('00', key)).toThrow();
  });
});

describe('URS 账密登录', () => {
  it('参数顺序与官网一致，密码只出现 MD5', () => {
    const plain = buildUrsPasswordParams({ account: '13800138000', password: 'secret' }, 'u'.repeat(32), 'r'.repeat(32));
    const keys = plain.split('&').map((pair) => pair.split('=')[0]);
    expect(keys).toEqual([
      'rtid', 'androidID', 'carrier', 'network', 'pdtVersion', 'mac', 'resolution',
      'uniqueID', 'uniqueID_cf', 'imei', 'product', 'deviceType', 'systemName',
      'systemVersion', 'isEmulator', 'loginException', 'needLeakInfo', 'ignorelock',
      'mobile', 'password', 'isMd5',
    ]);
    expect(plain).toContain(`password=${md5hex('secret')}`);
    expect(plain).not.toContain('secret');
  });

  it('解出 token/ssn/手机账号', async () => {
    const key = aesKeyFromHex(URS_KEY);
    const message = aes128EcbEncryptHex(
      new TextEncoder().encode(
        'ssn=yd.0123456789abcdef@163.com&token=yd_' +
          'a'.repeat(40) +
          '&ydAccount=13800138000@mobile.163.com&verify_time=1',
      ),
      key,
    );
    let captured = '';
    const result = await loginUrsByPassword(
      (async (_url: string, init?: RequestInit) => {
        captured = String(init?.body ?? '');
        return new Response(JSON.stringify({ result: '201', msg: message }), { status: 200 });
      }) as never,
      { account: '13800138000', password: 'secret' },
      { randomHex: () => 'ab'.repeat(16) },
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.token).toBe('yd_' + 'a'.repeat(40));
      expect(result.value.ssn).toBe('yd.0123456789abcdef@163.com');
      expect(result.value.mobileAccount).toBe('13800138000@mobile.163.com');
    }
    expect(captured).toContain(`id=${URS_CLIENT_ID}`);
    const params = new URLSearchParams(captured).get('params') ?? '';
    const plain = new TextDecoder().decode(aes128EcbDecryptHex(params, key));
    expect(plain).toContain('mobile=13800138000');
    expect(plain).not.toContain('secret');
  });

  it('平台拒绝时透出平台原话', async () => {
    const result = await loginUrsByPassword(
      (async () => new Response(JSON.stringify({ result: '460', msg: 'password error' }), { status: 200 })) as never,
      { account: '13800138000', password: 'wrong' },
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.message).toBe('password error');
      expect(result.error.code).toBe(460);
    }
  });

  it('手机号格式与空密码在本地拒绝，不发请求', async () => {
    const send = (async () => {
      throw new Error('不应发请求');
    }) as never;
    const badAccount = await loginUrsByPassword(send, { account: '123', password: 'x' });
    const emptyPassword = await loginUrsByPassword(send, { account: '13800138000', password: '' });
    expect(badAccount.ok).toBe(false);
    expect(emptyPassword.ok).toBe(false);
  });
});
