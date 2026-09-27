/*
 * 生成商店列表用的图像。
 *
 * 产出与登录状态无关的商店材料：
 *   logo-300.png              300x300   列表页的方形徽标
 *   tile-small-440x280.png    440x280   列表页的一格
 *   tile-large-1400x560.png   1400x560  精选位
 *
 * 页面截图不在这里做，见 make-store-shots.mjs：那几张依赖登录状态，
 * 会话过期时截出来是「需要重新登录」的提示，而且每次都要等页面渲染。
 *
 * 用法：node scripts/probe/run/make-store-assets.mjs
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Session, newPageTarget, closeTarget } from '../lib/cdp.mjs';

const OUT = resolve(import.meta.dirname, '../../../dist/store');
mkdirSync(OUT, { recursive: true });

/** 与 src/ui/tokens.css 一致的取值。 */
const ACCENT = '#0f766e';
const INK = '#101828';
const INK_SOFT = '#475467';
const PAPER = '#f7f9fb';
const LINE = '#ccd2d9';

const FONT = "'Microsoft YaHei', 'PingFang SC', system-ui, sans-serif";

/** 供 canvas 表达式内联使用。拼字符串时会漏掉这里的引号，所以取 JSON 形式。 */
const FONT_JS = JSON.stringify(FONT);

/**
 * 画一个居中的圆角方块加白色字母，用作徽标图形。
 *
 * 字母的垂直位置按实际墨迹范围算，不用 textBaseline: 'middle' 加经验偏移。
 * 后者对齐的是字体度量线，而字母的墨迹上下并不对称——实测 128px 的图标里
 * 会偏上 6px，尺寸越大越明显。
 */
const MARK = (size) => `
  const m = ${size}, mo = (W - m) / 2, mr = m * 0.22;
  ctx.fillStyle = '${ACCENT}';
  ctx.beginPath(); ctx.roundRect(mo, mo, m, m, mr); ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '600 ' + Math.round(m * 0.62) + 'px ' + ${FONT_JS}
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  const met = ctx.measureText('S');
  const baseline = H / 2 + (met.actualBoundingBoxAscent - met.actualBoundingBoxDescent) / 2;
  ctx.fillText('S', W / 2, baseline);
`;

/**
 * 促销磁贴：底色 + 居中排布的图形与文字。
 *
 * 字号不能只按高度算。小磁贴高 280，按高度推出的标题字号会让
 * 「Study Pilot」折成两行，因此额外按宽度收一次，取两者中较小的。
 */
const TILE = (title, subtitle) => `
  ctx.fillStyle = '${PAPER}';
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '${LINE}';
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, W - 1, H - 1);

  const markSize = Math.round(H * 0.42);
  const gap = Math.round(H * 0.13);
  const titleByHeight = Math.round(H * 0.15);
  const titleByWidth = Math.round(((W - markSize - gap) * 0.92) / (${title.length} * 0.56));
  const titleSize = Math.min(titleByHeight, titleByWidth);
  const subSize = Math.round(titleSize * 0.56);

  // 先量出文字块宽度，好让「图形 + 文字」作为一组居中
  ctx.font = '600 ' + titleSize + 'px ' + ${FONT_JS}
  const titleW = ctx.measureText(${JSON.stringify(title)}).width;
  ctx.font = subSize + 'px ' + ${FONT_JS}
  const subW = ctx.measureText(${JSON.stringify(subtitle)}).width;
  const textW = Math.max(titleW, subW);
  const groupW = markSize + gap + textW;
  const startX = (W - groupW) / 2;

  // 图形
  const mo = startX, mr = markSize * 0.22;
  ctx.fillStyle = '${ACCENT}';
  ctx.beginPath(); ctx.roundRect(mo, H / 2 - markSize / 2, markSize, markSize, mr); ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '600 ' + Math.round(markSize * 0.62) + 'px ' + ${FONT_JS}
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  const markMet = ctx.measureText('S');
  const markBase =
    H / 2 + (markMet.actualBoundingBoxAscent - markMet.actualBoundingBoxDescent) / 2;
  ctx.fillText('S', mo + markSize / 2, markBase);

  // 文字
  const textX = startX + markSize + gap;
  ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '${INK}';
  ctx.font = '600 ' + titleSize + 'px ' + ${FONT_JS}
  const titleY = H / 2 - Math.round(H * 0.02);
  ctx.fillText(${JSON.stringify(title)}, textX, titleY);
  ctx.fillStyle = '${INK_SOFT}';
  ctx.font = subSize + 'px ' + ${FONT_JS}
  ctx.fillText(${JSON.stringify(subtitle)}, textX, titleY + Math.round(subSize * 1.6));
`;

const JOBS = [
  { name: 'logo-300.png', width: 300, height: 300, draw: MARK(220) },
  {
    name: 'tile-small-440x280.png',
    width: 440,
    height: 280,
    draw: TILE('Study Pilot', '课程待办与截止提醒'),
  },
  {
    name: 'tile-large-1400x560.png',
    width: 1400,
    height: 560,
    draw: TILE('Study Pilot', '课程待办与截止提醒'),
  },
];

const target = await newPageTarget();
const session = await Session.open(target.webSocketDebuggerUrl);
await session.send('Page.enable');
await session.send('Page.navigate', { url: 'about:blank' });

/** 用 canvas 画一张图并取回 PNG 的 base64。 */
async function drawPng(width, height, body) {
  const r = await session.send('Runtime.evaluate', {
    expression: `(() => {
      const W = ${width}, H = ${height};
      const c = document.createElement('canvas');
      c.width = W; c.height = H;
      const ctx = c.getContext('2d');
      ${body}
      return c.toDataURL('image/png');
    })()`,
    returnByValue: true,
  });
  return (r.result?.value ?? '').replace(/^data:image\/png;base64,/, '');
}

for (const job of JOBS) {
  const base64 = await drawPng(job.width, job.height, job.draw);
  if (!base64) {
    console.error(`  ${job.name} 生成失败`);
    continue;
  }
  writeFileSync(`${OUT}/${job.name}`, Buffer.from(base64, 'base64'));
  console.log(`  ${job.name}  ${job.width}x${job.height}`);
}

session.close();
await closeTarget(target.id);
console.log(`\n已写入 ${OUT}`);
console.log('（页面截图不在这里生成，见 make-store-shots.mjs）');
