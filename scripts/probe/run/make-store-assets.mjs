/*
 * 生成商店列表用的图像。
 *
 * 需要三种尺寸，各自用途不同：
 *   徽标        300x300   列表页的方形图标
 *   小促销磁贴  440x280   列表页的一格
 *   大促销磁贴  1400x560  精选位
 *
 * 做法是用 HTML 画好再截图：与界面共用同一套颜色与字体，改版时不容易
 * 与扩展本身脱节。尺寸靠 deviceScaleFactor 精确控制，不依赖缩放。
 *
 * 用法：node scripts/probe/run/make-store-assets.mjs
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Session, newPageTarget, closeTarget } from '../lib/cdp.mjs';

const OUT = resolve(import.meta.dirname, '../../../dist/store');
mkdirSync(OUT, { recursive: true });

/** 与 src/ui/tokens.css 一致的取值。 */
const TOKENS = {
  accent: '#0f766e',
  ink: '#101828',
  inkSoft: '#475467',
  paper: '#f7f9fb',
  paper2: '#ffffff',
  line: '#ccd2d9',
};

const FONT =
  "'Microsoft YaHei', 'PingFang SC', system-ui, -apple-system, 'Segoe UI', sans-serif";

/** 方形图标：品牌色底 + 白色字母。 */
function mark(size) {
  const radius = Math.round(size * 0.22);
  const letter = Math.round(size * 0.62);
  return `
    <div style="
      width:${size}px;height:${size}px;border-radius:${radius}px;
      background:${TOKENS.accent};
      display:flex;align-items:center;justify-content:center;
      color:#fff;font:600 ${letter}px/1 ${FONT};
      letter-spacing:-0.02em;
    ">S</div>`;
}

/**
 * 一张促销磁贴。
 *
 * 图标与文字作为一组居中摆放。早先靠左对齐、内边距按高度取，结果
 * 宽磁贴（1400x560）右侧空出一大片，而窄磁贴（440x280）又刚好占满，
 * 同一套参数在两种比例下都不好看。居中之后与宽高比无关。
 *
 * 字号不能只按高度算：小磁贴高 280，按高度推出的标题字号会让
 * 「Study Pilot」折成两行。这里额外按宽度收一次，取两者中较小的。
 */
function tile(width, height, title, subtitle) {
  const markSize = Math.round(height * 0.42);
  const gap = Math.round(height * 0.13);

  // 标题按宽度估：一个字符约占字号的 0.56 倍
  const titleByWidth = Math.round(((width - markSize - gap) * 0.92) / (title.length * 0.56));
  const titleSize = Math.min(Math.round(height * 0.15), titleByWidth);
  const subSize = Math.round(titleSize * 0.56);
  const textMax = Math.round(width - markSize - gap - height * 0.16);

  return `
    <div style="
      width:${width}px;height:${height}px;box-sizing:border-box;
      background:${TOKENS.paper};
      display:flex;align-items:center;justify-content:center;
      gap:${gap}px;
      font-family:${FONT};
      border:1px solid ${TOKENS.line};
    ">
      ${mark(markSize)}
      <div style="max-width:${textMax}px">
        <div style="
          font-size:${titleSize}px;font-weight:600;letter-spacing:-0.01em;
          color:${TOKENS.ink};line-height:1.2;white-space:nowrap;
        ">${title}</div>
        <div style="
          margin-top:${Math.round(height * 0.05)}px;
          font-size:${subSize}px;color:${TOKENS.inkSoft};line-height:1.45;
        ">${subtitle}</div>
      </div>
    </div>`;
}

const JOBS = [
  {
    name: 'logo-300.png',
    width: 300,
    height: 300,
    html: `<div style="width:300px;height:300px;background:${TOKENS.paper};display:flex;align-items:center;justify-content:center;font-family:${FONT}">${mark(220)}</div>`,
  },
  {
    name: 'tile-small-440x280.png',
    width: 440,
    height: 280,
    html: tile(440, 280, 'Study Pilot', '课程待办与截止提醒'),
  },
  {
    name: 'tile-large-1400x560.png',
    width: 1400,
    height: 560,
    html: tile(1400, 560, 'Study Pilot', '课程待办与截止提醒'),
  },
];

const target = await newPageTarget();
const session = await Session.open(target.webSocketDebuggerUrl);
await session.send('Page.enable');

for (const job of JOBS) {
  await session.send('Emulation.setDeviceMetricsOverride', {
    width: job.width,
    height: job.height,
    deviceScaleFactor: 1,
    mobile: false,
  });

  // 用 data: 承载，不落临时文件
  const page = `<!doctype html><meta charset="utf-8"><style>html,body{margin:0;padding:0;overflow:hidden}</style>${job.html}`;
  await session.send('Page.navigate', {
    url: `data:text/html;charset=utf-8,${encodeURIComponent(page)}`,
  });
  await new Promise((r) => setTimeout(r, 400));

  const shot = await session.send('Page.captureScreenshot', {});
  const path = `${OUT}/${job.name}`;
  writeFileSync(path, Buffer.from(shot.data, 'base64'));
  console.log(`  ${job.name}  ${job.width}x${job.height}`);
}

session.close();
await closeTarget(target.id);
console.log(`\n已写入 ${OUT}`);
