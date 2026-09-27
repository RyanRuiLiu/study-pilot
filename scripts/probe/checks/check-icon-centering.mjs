/*
 * 检查图标里的字母是否居中。
 *
 * 不看代码推断，直接解出像素、量白色区域的包围盒，再与圆角方块的包围盒
 * 对比。文字排版靠 textBaseline 只能定到字体度量线，而字母的实际墨迹
 * 上下留白并不对称——S 的上弧与下弧形状不同，度量居中不等于视觉居中。
 *
 * 用法：node scripts/probe/check-icon-centering.mjs [文件...]
 */

import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { inflateSync } from 'node:zlib';

const DIR = resolve(import.meta.dirname, '../../../apps/extension/public/icon');

/** 解一张非隔行 PNG，返回取像素的函数。 */
function decodePng(path) {
  const b = readFileSync(path);
  const width = b.readUInt32BE(16);
  const height = b.readUInt32BE(20);
  const bitDepth = b[24];
  const colorType = b[25];
  if (bitDepth !== 8 || (colorType !== 6 && colorType !== 2)) {
    throw new Error(`不支持的格式：位深 ${bitDepth}，颜色类型 ${colorType}`);
  }

  const channels = colorType === 6 ? 4 : 3;

  // 收集所有 IDAT
  const parts = [];
  let off = 8;
  while (off < b.length) {
    const len = b.readUInt32BE(off);
    const type = b.toString('ascii', off + 4, off + 8);
    if (type === 'IDAT') parts.push(b.subarray(off + 8, off + 8 + len));
    off += 12 + len;
  }
  const raw = inflateSync(Buffer.concat(parts));

  // 逐行反过滤
  const stride = width * channels;
  const out = Buffer.alloc(height * stride);
  let pos = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[pos++];
    const line = raw.subarray(pos, pos + stride);
    pos += stride;
    const cur = out.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : Buffer.alloc(stride);

    for (let x = 0; x < stride; x++) {
      const a = x >= channels ? cur[x - channels] : 0;
      const bb = prev[x];
      const c = x >= channels ? prev[x - channels] : 0;
      let v = line[x];
      if (filter === 1) v += a;
      else if (filter === 2) v += bb;
      else if (filter === 3) v += (a + bb) >> 1;
      else if (filter === 4) {
        const p = a + bb - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - bb);
        const pc = Math.abs(p - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? bb : c;
      }
      cur[x] = v & 0xff;
    }
  }

  const at = (x, y) => {
    const i = y * stride + x * channels;
    return {
      r: out[i],
      g: out[i + 1],
      b: out[i + 2],
      a: channels === 4 ? out[i + 3] : 255,
    };
  };
  return { width, height, at };
}

/** 量出满足条件的像素的包围盒。 */
function bbox(width, height, at, match) {
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!match(at(x, y))) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  return maxX < 0 ? null : { minX, minY, maxX, maxY, w: maxX - minX + 1, h: maxY - minY + 1 };
}

const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readdirSync(DIR)
      .filter((f) => f.endsWith('.png'))
      .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

for (const f of files) {
  const path = f.includes('/') || f.includes('\\') ? f : `${DIR}/${f}`;
  const { width, height, at } = decodePng(path);

  // 圆形方块：接近品牌绿的像素
  const isBlock = (p) => p.r < 90 && p.g > 80 && p.g < 150 && p.b > 80 && p.b < 150;
  // 字母：接近纯白
  const isLetter = (p) => p.r > 230 && p.g > 230 && p.b > 230;

  const block = bbox(width, height, at, isBlock);
  const letter = bbox(width, height, at, isLetter);

  const name = path.split(/[\\/]/).pop();
  if (!block || !letter) {
    console.log(`  ${name}  未识别出方块或字母`);
    continue;
  }

  // 字母中心相对方块中心的偏移，正数表示偏右下
  const dx = (letter.minX + letter.maxX) / 2 - (block.minX + block.maxX) / 2;
  const dy = (letter.minY + letter.maxY) / 2 - (block.minY + block.maxY) / 2;

  // 上下留白各是多少，用来判断视觉重量
  const padTop = letter.minY - block.minY;
  const padBottom = block.maxY - letter.maxY;

  const ok = Math.abs(dx) <= 1 && Math.abs(dy) <= 1;
  console.log(
    `  ${name.padEnd(9)} 方块 ${block.w}x${block.h}  字母 ${letter.w}x${letter.h}  ` +
      `偏移(${dx >= 0 ? '+' : ''}${dx.toFixed(1)}, ${dy >= 0 ? '+' : ''}${dy.toFixed(1)})  ` +
      `上留白 ${padTop} 下留白 ${padBottom}  ${ok ? '居中' : '偏移'}`,
  );
}
