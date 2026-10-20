/*
 * MD5 的已知向量测试。
 *
 * 为什么在这个包里有这么一份：md5hex 是本包风险最高的文件（签名全靠它），
 * 而它过去只在 packages/transport 的签名测试里被 node:crypto 交叉验证过。
 * 那意味着「跑 core 自己的测试通过」与「core 的 md5 是对的」无关——
 * 有人改坏一个 T 常量，本包的套件一个字都不会说。
 *
 * 期望值是标准 MD5 摘要（与 node:crypto 一致），硬编码在这里：
 * 本包不依赖 node:crypto，测试也就不引入它（transport 那边已经做了对照）。
 */

import { describe, expect, it } from 'vitest';
import { md5hex } from '../src/md5.ts';

describe('MD5 已知向量（RFC 1321 附录那一组）', () => {
  const vectors: Array<[string, string]> = [
    ['', 'd41d8cd98f00b204e9800998ecf8427e'],
    ['a', '0cc175b9c0f1b6a831c399e269772661'],
    ['abc', '900150983cd24fb0d6963f7d28e17f72'],
    ['123456', 'e10adc3949ba59abbe56e057f20f883e'],
    ['hello', '5d41402abc4b2a76b9719d911017c592'],
    ['hello world', '5eb63bbbe01eeed093cb22bb8f5acdc3'],
  ];

  for (const [input, expected] of vectors) {
    it(`md5(${JSON.stringify(input)}) = ${expected}`, () => {
      expect(md5hex(input)).toBe(expected);
    });
  }
});

/*
 * 分块边界。MD5 的补位规则在这里最容易写错：长度字段要落进当前块还是要新开一块
 * （`i > 55` 那一支），差一个字节就整串摘要全变。
 */
describe('分块与补位边界', () => {
  const boundaries: Array<[number, string]> = [
    [55, 'ef1772b6dff9a122358552954ad0df65'],
    [56, '3b0c8ac703f828b04c6c197006d17218'],
    [63, 'b06521f39153d618550606be297466d5'],
    [64, '014842d480b571495a4a0363793f7367'],
    [65, 'c743a45e0d2e6a95cb859adae0248435'],
    [119, '8a7bd0732ed6a28ce75f6dabc90e1613'],
    [120, '5f61c0ccad4cac44c75ff505e1f1e537'],
    [127, '020406e1d05cdc2aa287641f7ae2cc39'],
    [128, 'e510683b3f5ffe4093d021808bc6ff70'],
  ];

  for (const [length, expected] of boundaries) {
    it(`${length} 字节的输入走通补位（56 与 64 是两块的分界）`, () => {
      expect(md5hex('a'.repeat(length))).toBe(expected);
    });
  }
});

describe('UTF-8 编码', () => {
  it('中文按 UTF-8 字节参与摘要，不是按字符数', () => {
    expect(md5hex('单元测验')).toBe('24060355fc906de7bf99ad98be243ab3');
  });

  it('星外平面字符（emoji，UTF-16 里是代理对）不破坏长度计算', () => {
    expect(md5hex('🎓 测验')).toBe('4a9291245fc10a6f89bc06af1880d3cd');
  });
});

describe('摘要的输出形状', () => {
  it('输出 32 位小写十六进制', () => {
    const digest = md5hex('任何输入');
    expect(digest).toMatch(/^[0-9a-f]{32}$/);
  });

  it('同样的输入两次结果一致（没有内部状态残留）', () => {
    expect(md5hex('重复调用')).toBe(md5hex('重复调用'));
  });

  it('输入相差一个字符，摘要彻底不同（雪崩）', () => {
    expect(md5hex('same')).not.toBe(md5hex('samd'));
  });
});
