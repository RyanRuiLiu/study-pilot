import { describe, expect, it } from 'vitest';
import {
  base64ToBytes,
  bytesToBase64,
  parseRsaPrivateKey,
  parseRsaPublicKey,
  rsaPkcs1Decrypt,
  rsaPkcs1Encrypt,
  type RsaPrivateKey,
  type RsaPublicKey,
} from '../src/urs/rsa.ts';
import { bytesToHex, hexToBytes, sm4CbcDecrypt, sm4CbcEncrypt } from '../src/urs/sm4.ts';
import {
  buildUnsCommonPayload,
  buildUnsHeaders,
  decryptUnsResponse,
  URS_CLIENT_ID,
  UNS_ACCESS_ID,
  UNS_PACKAGE_SIGN,
  type UnsHeaders,
  type UnsKeyPair,
} from '../src/urs/uns.ts';
import { buildUnsLoginPayload, loginUnsByPassword } from '../src/urs/password-login.ts';

const utf8 = (value: string): Uint8Array => new TextEncoder().encode(value);
const text = (value: Uint8Array): string => new TextDecoder().decode(value);

/*
 * 测试专用 RSA 密钥（2026-10-27 由一次性的 `generateKeyPairSync` 生成，
 * 与生产内置密钥无关）。用固定夹具而不是运行时生成，测试不依赖 Node 类型。
 */
const TEST_SERVER_PUBLIC =
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwQ4Lxc1R9rc08ISx6nEJFgV5nXHqkQsnicXaLAK7n/5msnyP6kZR9IxNMs6d3YXcg60Orv6efcZrtZjDASKL/YEwixTUtuFMLkWM1YJ7Luv2H9Z+S5TW7/WtG7RLpsCQoAwaxAwq3FtFgVjCSgcmc/ZjYD/ZFX0Od3L4o498RCF3sl3NZ617NacCukeiu4qo6qeO8J/9+6sXizzeHwbOib8F+EkMZyglvVVnwfl7Dkl+VQb1HAoBLq2OR9t89PseZ3JKwPwMcnm5UfENAhACG+G0Kmu4zv1mqFJB03W47RdD+Gsd6WW9H3PxrP8QwkccrMyUqcYwdPSEZVLigY4UhwIDAQAB';
const TEST_SERVER_PRIVATE =
  'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDBDgvFzVH2tzTwhLHqcQkWBXmdceqRCyeJxdosAruf/mayfI/qRlH0jE0yzp3dhdyDrQ6u/p59xmu1mMMBIov9gTCLFNS24UwuRYzVgnsu6/Yf1n5LlNbv9a0btEumwJCgDBrEDCrcW0WBWMJKByZz9mNgP9kVfQ53cvijj3xEIXeyXc1nrXs1pwK6R6K7iqjqp47wn/37qxeLPN4fBs6JvwX4SQxnKCW9VWfB+XsOSX5VBvUcCgEurY5H23z0+x5nckrA/AxyeblR8Q0CEAIb4bQqa7jO/WaoUkHTdbjtF0P4ax3pZb0fc/Gs/xDCRxyszJSpxjB09IRlUuKBjhSHAgMBAAECggEAKuSVBwi8WkWQVJQW95DPxP3IbIvf4wQIb9ruw3KD/2NFrAhy7UlcciouCMjRWGOif/sWVRkrW6SXT8y2Hu1vDw8CGxSwwkVCaNF5HgMUnXM9xwsgGmjibIQ4RvyDBnSobXbjB4Xwi+8XfUqcOFhoWcF3iO4GrHiRm0aHKcf6gyRNm9Eve/NeorUqnIy2UtdiHAM3Y7+mWomVeVg86mDVGfYxsaqgxDCXBKsYndyDjwRelicAWIIe2VrLMFhIbWNgjmmQAOD5vfOqje8qhvczJ0FbxgT8EaCHZQipEDegTJpyQOGWnFiFkkdLJBUSqJLUZK77DvfwmJpYuTPXDcNY0QKBgQDmPK1ZVRQSjDf1Pf8sEcKiUeM7AbQwjGFNOnBu7zY7Ic6CnkTyi3uiIMfxYX249NyUK9ircRNo0eGmKwUM1N/0IQ/XGUCgS0xbzgtcRrIVn/Xc+Oz2C+BahDovvnVOMusJjciaLDeTA5WmDHn8WYm0mHhWEwmghQhNqn6HW5zKGQKBgQDWqEGmvUM7pxBWS1TOyb/H8qvmhqnxBAtA9HMVAH2VhPX8pZeMCJ9uFmxsHDaamkMGkBvEGCtnIHJNpEZmLiOs6DMvqTEVJRhvS/5vxFsOUeSmPZhkhCCHMxb/GLL67J4jraO8lIe+AWk2+uatdbTK13TTtqoBEA/qXW2f4VDnnwKBgD1iVhFoNobPbafsFJlqTss6K+wygxkihFqzxwA8tOfFFqsKiXVlLNxIAybfCEcEub6jhgwHhNZAhvnnpFwMcX1ER1Xg/LMAAGbFo4/BpX9Qe5ujnoHnHrTjZiQOknX762BLtf0s5tBCd2ajEu7t7GIC+KpyPvHWJiWW3E84ZLAZAoGBAIsNV+oBdIoyAP1Fs1x5iMinxP+CgJfmfLvJHrueI7w183uEcZV/CHgyAm5OIHkqMP0RYUs4NPWLKUBuiEQs42Ngz7eyLF98NkXyvpH8atft6OZfxFZo2QF78QuzHk459X87PnQs63oEQ/ofskrvkvxLchyrmZkypHy3pQoK1XQVAoGAayaQ/sdCqw+vutZFaffPVAqz6U3nBuEAt24gtdPvkEj57g+G6fl5Tj88aQ+8SRRzdpEjIF7YVwXKIEI7QsJ9VaVHN+IsKg+MZgq3K878SVo7beKEWa1zhd+goS2CdLg5eWl+mntH+/k/gYCRNN5I9GfA4C2vycsDBMMZXDK1zNw=';

const TEST_CLIENT_PUBLIC =
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0uY2d277N/7g5cy0wfGIImIbgDNCa/c7hWNV7h0CU0ZQW0HUsP+VRlJWuNll5TX2aO1uyylt9kZyIIw6mW4h/iwQiTMyhqGBSs76wvhQIXR9NTl/t57TPY3MyO+MEoYb64oNUWdwcHjQSm1Tn6ZNeZJ5Uhza/kLKfWi3swuAjoVJY+JsLCBXJGBXEPUPc/EmTBQO/ikFl95GFmDz2QPYJnCl0witIfuFczglP7QA65aaH5xxOYdw1dcClhkshRstvad4HmpjUFFLIaN6/VefzVXN5bQ0IZ+/VNf4ZTmeDwsgidgNnTmJocTGF3gdWZgsplktqijxewSDVw6D+wNTvwIDAQAB';
const TEST_CLIENT_PRIVATE =
  'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDS5jZ3bvs3/uDlzLTB8YgiYhuAM0Jr9zuFY1XuHQJTRlBbQdSw/5VGUla42WXlNfZo7W7LKW32RnIgjDqZbiH+LBCJMzKGoYFKzvrC+FAhdH01OX+3ntM9jczI74wShhvrig1RZ3BweNBKbVOfpk15knlSHNr+Qsp9aLezC4COhUlj4mwsIFckYFcQ9Q9z8SZMFA7+KQWX3kYWYPPZA9gmcKXTCK0h+4VzOCU/tADrlpofnHE5h3DV1wKWGSyFGy29p3geamNQUUsho3r9V5/NVc3ltDQhn79U1/hlOZ4PCyCJ2A2dOYmhxMYXeB1ZmCymWS2qKPF7BINXDoP7A1O/AgMBAAECggEAS6shu7RsGmkulATgjf11FLESoOrDWC16g59ig26RGQPPbQ6vm1n4WyTLzMLjllvIL1mROP+CXqxj4l2t4MLtG18AB9oAtOFZnFerDS0+wuIi0mfw9RbdP+aSpT2dij/n4JjFsoFkjFYslaeoK03l2kq9kMKdqECammhqEKl91KRCirHpEClkx8yfGVPbNKSx8p/ybMVVokpNY66ArNIZU3u1nQnD33lqcMwWjRcZl5JOhm1Lix/cV0rlh8zvFFT9OrcoWmTG0DLMxocvVdvfNrk/g5UHANdisSVcLEEpXsZq+YU7PXfGaCsdd8Wg8+M1QVTkLJzf5DGEuZfQviH6oQKBgQD+HopwqYKJij39baMjxBDF/fPpjAA+HwRsmNWqo2EIc3e+2VF8aznVx24ssluDKntKEKj9BYjr/Y/RMcdtZS+8aZWpz+sP1GsnMlV9yE8kTT+gJL9O87PnXbCucHjIHGRwTsjbSWrBnbVEkLY+PlMW4gTiFuqpj5B7exVLpw242QKBgQDUdclXhwgYRlpz4GLrqOjnv506XPm+DENvu6U8rMa8vP+6OKDRdbPtAb97mTz7n7/nQDplEL+IJFgJiZHtclAQ+wI0MXtUChxkJ4a2aF0beCfg7NNr/DppBREQlcf7Vb+Dh2A7a+EHjcQmMgsiTqIze5+Ykwkwln8akrJ+WsRSVwKBgEwag2VoLpLYVuZN7lyovEk/W8vmxK/WBDItt1eqJEYupn7+gFvdlO2EE2fJZoSqtU+iG6ni/XWHc4m3+by2YAxyJoM7pG8SM6ECfv3zflgl1lc0iiKv84Hn2iDzyAhOEHpd7eNWYmVnwMCvAhUz/xhMSiAXsuFjAGcqnl8QwZhJAoGANLPXMygi4Oqqy23Q/AZVaA+HMBAaP4OJQvE4RvnQ/safZRFhCzR4YoV5e26CyyRQlUvAcIucB2iEkjEXCuC9bcjmPg48OpebfVi0uRDgb8z5j3kP5QyXbK++EPAmwHj/3d+6BmN3WclX6+WkD2mUINM8vrtSn0Pl2bCkKGXZp1cCgYBcQa2Y6rDMNbetBYVKVYTFJTAdmzgxspbc438d83MWmzRTBP9vqAt2NVXCqbTawN1u6TYrBQOMoIYLUZ34ihkR9SrsUkyOihtdlEBpth82hviGSsh6jtTCMrhkm9DYS3Fmioi0MeSKdoJIvJj82cg+iwuFXAaDlmMtyK/6EHJ6Eg==';

function testKeys(): { serverPriv: RsaPrivateKey; clientPub: RsaPublicKey; keys: UnsKeyPair } {
  const serverPub = parseRsaPublicKey(base64ToBytes(TEST_SERVER_PUBLIC));
  const serverPriv = parseRsaPrivateKey(base64ToBytes(TEST_SERVER_PRIVATE));
  const clientPub = parseRsaPublicKey(base64ToBytes(TEST_CLIENT_PUBLIC));
  const clientPriv = parseRsaPrivateKey(base64ToBytes(TEST_CLIENT_PRIVATE));
  return { serverPriv, clientPub, keys: { serverPublic: serverPub, clientPrivate: clientPriv } };
}

function openHeaders(headers: Pick<UnsHeaders, 'p1' | 'p2'>, priv: RsaPrivateKey): Record<string, unknown> {
  const wrappedBase64 = text(hexToBytes(headers.p2));
  const wrapped = JSON.parse(text(rsaPkcs1Decrypt(priv, base64ToBytes(wrappedBase64)))) as {
    smkey: string;
    smIv: string;
  };
  return JSON.parse(
    text(sm4CbcDecrypt(hexToBytes(headers.p1), hexToBytes(wrapped.smkey), hexToBytes(wrapped.smIv))),
  ) as Record<string, unknown>;
}

function encryptResponse(value: unknown, pub: RsaPublicKey): Record<string, unknown> {
  const key = Uint8Array.from({ length: 16 }, (_, i) => i + 1);
  const iv = Uint8Array.from({ length: 16 }, (_, i) => 0xf0 - i);
  const data = bytesToHex(sm4CbcEncrypt(utf8(JSON.stringify(value)), key, iv));
  return {
    result: 200,
    msg: '成功',
    enc: true,
    key: bytesToBase64(rsaPkcs1Encrypt(pub, utf8(bytesToHex(key)))),
    iv: bytesToBase64(rsaPkcs1Encrypt(pub, utf8(bytesToHex(iv)))),
    data,
  };
}

const json = (value: unknown): Response =>
  new Response(JSON.stringify(value), { status: 200, headers: { 'content-type': 'application/json' } });

describe('SM4-CBC/PKCS7', () => {
  it('单块与国标向量一致，往返还原', () => {
    const key = hexToBytes('0123456789abcdeffedcba9876543210');
    const plain = hexToBytes('0123456789abcdeffedcba9876543210');
    const iv = new Uint8Array(16);
    const encrypted = sm4CbcEncrypt(plain, key, iv);
    // 国标 ECB 单块向量；CBC 的 IV 全零时第一块相同
    expect(bytesToHex(encrypted).slice(0, 32)).toBe('681edf34d206965e86b3e94f536e4246');
    // PKCS7 对整块明文再补一整块
    expect(encrypted.length).toBe(32);
    expect(bytesToHex(sm4CbcDecrypt(encrypted, key, iv))).toBe(bytesToHex(plain));
  });

  it('多块往返，坏密文拒绝', () => {
    const key = hexToBytes('0123456789abcdeffedcba9876543210');
    const iv = hexToBytes('000102030405060708090a0b0c0d0e0f');
    const plain = utf8('{"appId":"x","product":"edumooc_client"}');
    const encrypted = sm4CbcEncrypt(plain, key, iv);
    expect(text(sm4CbcDecrypt(encrypted, key, iv))).toBe(text(plain));
    expect(() => sm4CbcDecrypt(encrypted.subarray(0, 8), key, iv)).toThrow();
  });
});

describe('RSA/PKCS#1 v1.5', () => {
  it('DER 解析与加解密往返', () => {
    const { keys, clientPub } = testKeys();
    expect(keys.clientPrivate).toBeDefined();
    const message = utf8('{"smkey":"0123456789abcdef0123456789abcdef","smIv":"fedcba9876543210fedcba9876543210"}');
    const cipher = rsaPkcs1Encrypt(clientPub, message);
    expect(cipher.length).toBe(256);
    if (keys.clientPrivate) expect(text(rsaPkcs1Decrypt(keys.clientPrivate, cipher))).toBe(text(message));
  });
});

describe('UNS p1/p2 信封', () => {
  it('p1 能还原明文，p2 能解出 smkey/smIv，响应能解密', () => {
    const { serverPriv, clientPub, keys } = testKeys();
    const payload = { appId: URS_CLIENT_ID, pwd: 'secret', isMd5: 0, username: '13800138000' };
    const headers = buildUnsHeaders(payload, (length) => Uint8Array.from({ length }, (_, i) => i + 1), keys);
    expect(headers.p3).toBe(UNS_ACCESS_ID);
    // p2 = hex(ASCII(base64(RSA 密文)))，2048 位密钥固定 688 个字符
    expect(headers.p2).toHaveLength(688);
    expect(openHeaders(headers, serverPriv)).toEqual(payload);

    const encrypted = encryptResponse({ token: 'yd_' + 'a'.repeat(40) }, clientPub);
    expect(decryptUnsResponse(encrypted, keys)).toEqual({ token: 'yd_' + 'a'.repeat(40) });
    expect(decryptUnsResponse({ enc: false }, keys)).toBeNull();
  });
});

describe('UNS 账密登录', () => {
  it('公共字段与官方 p1 一致，登录 p1 用明文 pwd、isMd5=0', () => {
    const payload = buildUnsCommonPayload(
      { aId: '0123456789abcdef', uniqueId: 'f'.repeat(40) },
      1793103341418,
      'a'.repeat(32),
    );
    expect(payload.appId).toBe(URS_CLIENT_ID);
    expect(payload.product).toBe('edumooc_client');
    expect(payload.version).toBe('1.6.3');
    expect(payload.appVersion).toBe('5.6.1');
    expect(payload.model).toBe('MatePad Pro');
    expect(payload.resolution).toBe('2560*1600');
    expect(payload.packageSign).toBe(UNS_PACKAGE_SIGN);
    expect(payload.ydUniqueId).toBe('');
    expect(payload.aId).toBe('0123456789abcdef');
    expect(payload.uniqueId).toBe('f'.repeat(40));

    const login = buildUnsLoginPayload(
      { account: '13800138000', password: 'secret' },
      { aId: '0123456789abcdef', uniqueId: 'f'.repeat(40) },
      1793103341418,
      'a'.repeat(32),
    );
    expect(login.username).toBe('13800138000');
    expect(login.isMd5).toBe(0);
    expect(login.pwd).toBe('secret');
    expect(login).not.toHaveProperty('password');
  });

  it('init → 登录 → 解出 token/ssn/手机账号', async () => {
    const { serverPriv, clientPub, keys } = testKeys();
    const seen: Array<{ path: string; payload: Record<string, unknown>; body: Record<string, unknown> }> = [];
    const send = (async (url: string, init?: RequestInit) => {
      const parsed = new URL(url);
      const headers = init?.headers as unknown as UnsHeaders;
      const payload = openHeaders(headers, serverPriv);
      const body = JSON.parse(String(init?.body ?? '{}')) as Record<string, unknown>;
      seen.push({ path: parsed.pathname, payload, body });
      if (parsed.pathname === '/uns/sdk/app/v1/ini') {
        expect(body.utid).toBe('');
        expect(payload).not.toHaveProperty('pwd');
        return json(encryptResponse({ appId: 'A'.repeat(224) }, clientPub));
      }
      if (parsed.pathname === '/uns/sdk/login/mob/pwd/v1/login') {
        expect(body.utid).toBe('A'.repeat(224));
        expect(payload.username).toBe('13800138000');
        expect(payload.pwd).toBe('secret');
        expect(payload.isMd5).toBe(0);
        return json(
          encryptResponse(
            {
              token: 'yd_' + 'b'.repeat(40),
              ssn: 'yd.0123456789abcdef@163.com',
              aliasuser: '13800138000@mobile.163.com',
            },
            clientPub,
          ),
        );
      }
      throw new Error(`unexpected ${parsed.pathname}`);
    }) as never;

    const result = await loginUnsByPassword(
      send,
      {
        account: '13800138000',
        password: 'secret',
        aId: '0123456789abcdef',
        uniqueId: 'f'.repeat(40),
      },
      {
        randomHex: (length) => 'ab'.repeat(length),
        randomBytes: (length) => Uint8Array.from({ length }, () => 0x42),
        keys,
      },
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.token).toBe('yd_' + 'b'.repeat(40));
      expect(result.value.ssn).toBe('yd.0123456789abcdef@163.com');
      expect(result.value.mobileAccount).toBe('13800138000@mobile.163.com');
    }
    expect(seen.map((entry) => entry.path)).toEqual([
      '/uns/sdk/app/v1/ini',
      '/uns/sdk/login/mob/pwd/v1/login',
    ]);
    expect(seen[1]?.payload.aId).toBe('0123456789abcdef');
    expect(seen[1]?.payload.uniqueId).toBe('f'.repeat(40));
    expect(seen[1]?.payload.ydUniqueId).toBe('');
  });

  it('平台拒绝时透出平台原话', async () => {
    const { serverPriv, clientPub, keys } = testKeys();
    const send = (async (url: string, init?: RequestInit) => {
      const parsed = new URL(url);
      const payload = openHeaders(init?.headers as unknown as UnsHeaders, serverPriv);
      if (parsed.pathname === '/uns/sdk/app/v1/ini') {
        return json(encryptResponse({ appId: 'A'.repeat(224) }, clientPub));
      }
      expect(payload.pwd).toBe('wrong');
      return json({ success: false, result: 12019, msg: '账号或密码错误', enc: false });
    }) as never;

    const result = await loginUnsByPassword(send, { account: '13800138000', password: 'wrong' }, { keys });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe(12019);
      expect(result.error.message).toBe('UNS 登录：账号或密码错误');
    }
  });

  it('手机号格式与空密码在本地拒绝，不发请求', async () => {
    const send = (async () => {
      throw new Error('不应发请求');
    }) as never;
    const badAccount = await loginUnsByPassword(send, { account: '123', password: 'x' });
    const emptyPassword = await loginUnsByPassword(send, { account: '13800138000', password: '' });
    expect(badAccount.ok).toBe(false);
    expect(emptyPassword.ok).toBe(false);
  });
});
