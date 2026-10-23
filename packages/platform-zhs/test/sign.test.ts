/*
 * 签名的机械核对。
 *
 * 测试策略（与仓库「不把采集物入库」的边界一致）：
 *   - 这里断言的都是**自造输入**与**手工推导的期望值**——可循环的东西证明不了协议；
 *   - 与真实平台的逐字节对拍在真机侧：`.probe` 里的采集脚本（sl→cKey→解密 9/9）
 *     与 node-live 测试（拿今天的会话现取现验）。
 *
 * 期望值的推导过程写在各自的断言旁，改协议时按注释重新推。
 */

import { describe, expect, it } from 'vitest';
import {
  formatPosition,
  meetParamSecret,
  rsaPublicEncrypt,
  buildSeries,
  wrapSignedBody,
  xorHexEncode,
  ZHS_SIGNING_PUBLIC_KEY,
} from '../src/sign.ts';

/** 测试内的反解：xorHexEncode 的逆（生产代码只用正向）。 */
function xorHexDecode(hex: string): string[] {
  let text = '';
  for (let i = 0; i < hex.length; i += 2) {
    text += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16) ^ 'zzpttjd'.charCodeAt((i / 2) % 7));
  }
  return text.split(';');
}

describe('内置 RSA 公钥', () => {
  it('是 1024 位、指数 65537——与客户端两处脚本内嵌的同一把', async () => {
    // 经由 rsaPublicEncrypt 走一遍 DER 解析路径：分组长度必须正好 128 字节
    const cipher = await rsaPublicEncrypt(new Uint8Array([1, 2, 3]));
    expect(atob(cipher)).toHaveLength(128);
  });

  it('公钥常量没有被换成别的形状（SPKI DER，base64）', () => {
    const der = atob(ZHS_SIGNING_PUBLIC_KEY);
    expect(der.charCodeAt(0)).toBe(0x30); // SEQUENCE
    expect(der.length).toBeGreaterThan(128);
  });
});

describe('rsaPublicEncrypt', () => {
  it('同一明文两次加密的密文不同（type-2 填充是随机的，不是确定性变身）', async () => {
    const plain = new TextEncoder().encode('{"module":11}');
    const [a, b] = await Promise.all([rsaPublicEncrypt(plain), rsaPublicEncrypt(plain)]);
    expect(a).not.toBe(b);
    expect(atob(a)).toHaveLength(128);
    expect(atob(b)).toHaveLength(128);
  });

  it('超过分组长度的明文直接抛，不静默截断', async () => {
    await expect(rsaPublicEncrypt(new Uint8Array(118))).rejects.toThrow();
  });
});

describe('xorHexEncode', () => {
  it('手工推导的小向量逐字节吻合', () => {
    /*
     * ['1','2'] → "1;2" → 字符码 0x31 0x3B 0x32 与键 "zzpttjd"
     * （0x7a 0x7a 0x70）循环异或：
     *   0x31^0x7a=0x4b、0x3B^0x7a=0x41、0x32^0x70=0x42 → "4b4142"
     */
    expect(xorHexEncode(['1', '2'])).toBe('4b4142');
  });

  it('往返自洽：编码→反解得到原数组（键循环覆盖超过一轮长度）', () => {
    const values = ['470001', 1000050001, 0, 66000001, 1000050002, 0, 175, 175, '00:02:55'];
    expect(xorHexDecode(xorHexEncode(values))).toEqual(values.map(String));
  });
});

describe('buildSeries 时间证明序列', () => {
  /*
   * 期望值来自 2026-10-16 对真实会话的推导（base=408、本次 109 秒、共 55 拍）：
   * 首拍读到的 ke 是 base+1（1 秒计秒先于 2 秒序列拍），
   * 头段 parseInt 落在 83 起、尾段落在 105 止——head/tail 与真实采集全段吻合。
   */
  it('起手恒为 "0,1"', () => {
    expect(buildSeries(0, 10).startsWith('0,1,')).toBe(true);
  });

  it('base=408、total=109 时与真实会话的 head/tail/长度吻合', () => {
    const series = buildSeries(408, 109).split(',');
    expect(series.slice(0, 8).join(',')).toBe('0,1,83,84,84,85,85,85');
    expect(series.slice(-6).join(',')).toBe('103,103,104,104,105,105');
    expect(series).toHaveLength(2 + 55); // "0,1" + ceil(109/2) 拍
  });

  it('总秒为奇数时拍数向上取整，偶数时正好一半', () => {
    expect(buildSeries(0, 5).split(',')).toHaveLength(2 + 3);
    expect(buildSeries(0, 6).split(',')).toHaveLength(2 + 3);
  });
});

describe('formatPosition', () => {
  it('秒 → HH:MM:SS（含进位与补零）', () => {
    expect(formatPosition(2)).toBe('00:00:02');
    expect(formatPosition(175)).toBe('00:02:55');
    expect(formatPosition(501)).toBe('00:08:21');
    expect(formatPosition(3600)).toBe('01:00:00');
  });
});

describe('wrapSignedBody', () => {
  it('形态为 secretStr=…&<时间戳字段>=…，字段名由网关族决定', async () => {
    const cKey = new Uint8Array(16).fill(7);
    const payload = { a: 1, dateFormate: 123 };
    const learning = await wrapSignedBody(payload, cKey, { field: 'dateFormate', value: 123 });
    const home = await wrapSignedBody({ status: 0 }, cKey, { field: 'date', value: 456 });
    expect(learning.startsWith('secretStr=')).toBe(true);
    expect(learning.endsWith('&dateFormate=123')).toBe(true);
    expect(home.endsWith('&date=456')).toBe(true);
  });

  it('省略 stamp 时只输出 secretStr——考试族的外层形态（时间戳只在密文里）', async () => {
    const cKey = new Uint8Array(16).fill(7);
    const body = await wrapSignedBody({ recruitId: 470001, dateFormate: 123 }, cKey);
    expect(body.startsWith('secretStr=')).toBe(true);
    // 外层没有第二个字段，也没有 & 分隔符
    expect(body).not.toContain('&');
  });

  it('固定密钥与 IV 下加密是确定性的（CBC，无额外随机）', async () => {
    const cKey = new Uint8Array(16).fill(7);
    const [a, b] = await Promise.all([
      wrapSignedBody({ x: 1 }, cKey, { field: 'date', value: 1 }),
      wrapSignedBody({ x: 1 }, cKey, { field: 'date', value: 1 }),
    ]);
    expect(a).toBe(b);
  });
});

describe('meetParamSecret', () => {
  /*
   * 见面课观看进度参数：`1;1001;2;60;2;2001` 逐字符与 `zhihuishu` 循环异或，
   * 两位小写 hex。期望值按这个定义手算并固定在这里——改 key 或分隔符都会让它红。
   */
  it('数组按分号拼接后与 zhihuishu 异或，输出两位小写十六进制', () => {
    expect(meetParamSecret([1, '1001', 2, 60, 2, '2001'])).toBe(
      '4b5358584558485a4e4c58525a4e5b435844',
    );
  });
});
