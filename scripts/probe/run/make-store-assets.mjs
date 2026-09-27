/*
 * 生成商店列表用的图像。
 *
 * 一次产出全部材料：
 *   logo-300.png              300x300   列表页的方形图标
 *   tile-small-440x280.png    440x280   列表页的一格
 *   tile-large-1400x560.png   1400x560  精选位
 *   shot-1-options.png        1280x800  设置页
 *   shot-2-details.png        1280x800  单元明细
 *   shot-3-popup.png          1280x800  待办弹窗
 *
 * 前三个用 HTML 绘制再截图，颜色与字体取自界面同一套令牌，改版时不容易
 * 与扩展本身脱节；后三个是扩展页面的实际渲染。
 *
 * 全部写进 dist/store/，与上传包放在一起——交付物都该在同一个地方，
 * 散在探测工作区里会被当成临时文件清掉。
 *
 * 用法：node scripts/probe/run/make-store-assets.mjs
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Session, newPageTarget, closeTarget } from '../lib/cdp.mjs';
import { requireExtensionId } from '../lib/ext-id.mjs';

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

/*
 * 扩展自身的页面截图。
 *
 * 商店要求 1280x800 或 640x400，取前者。分辨率倍数设为 1，
 * 截出来就是商店要的像素尺寸——用 2 倍会得到 2560x1600，上传时被判为过大。
 *
 * 弹窗要另外处理：它本身只有 370px 宽，直接放进 1280x800 的画布会
 * 在右侧和下方留下大片空白。做法是先按原尺寸截下来，再居中合成到
 * 画布上。宽页面（设置页）占满整个宽度，不需要这一步。
 */
const extId = await requireExtensionId();

/** 把一张图居中放到 1280x800 的画布上。 */
async function composeOnCanvas(pngBase64, name) {
  const page = await newPageTarget();
  const s = await Session.open(page.webSocketDebuggerUrl);
  await s.send('Page.enable');
  await s.send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 800,
    deviceScaleFactor: 1,
    mobile: false,
  });
  const html = `<!doctype html><meta charset="utf-8">
    <style>html,body{margin:0;padding:0;overflow:hidden}</style>
    <div style="width:1280px;height:800px;background:${TOKENS.paper};
      display:flex;align-items:center;justify-content:center">
      <img src="data:image/png;base64,${pngBase64}" style="
        border-radius:12px;border:1px solid ${TOKENS.line};
        box-shadow:0 8px 32px rgba(16,24,40,0.10);
      ">
    </div>`;
  await s.send('Page.navigate', {
    url: `data:text/html;charset=utf-8,${encodeURIComponent(html)}`,
  });
  await new Promise((r) => setTimeout(r, 500));
  const shot = await s.send('Page.captureScreenshot', {});
  writeFileSync(`${OUT}/${name}`, Buffer.from(shot.data, 'base64'));
  console.log(`  ${name}  1280x800`);
  s.close();
  await closeTarget(page.id);
}

/** 打开扩展页面并截下可视区域。高度传 null 表示按内容自适应。 */
async function capturePage(pagePath, width, height, settle) {
  const t = await newPageTarget();
  const s = await Session.open(t.webSocketDebuggerUrl);
  await s.send('Page.enable');
  await s.send('Emulation.setDeviceMetricsOverride', {
    width,
    height: height ?? 800,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await s.send('Page.navigate', { url: `chrome-extension://${extId}/${pagePath}` });
  await new Promise((r) => setTimeout(r, settle));

  /*
   * 按内容量一遍高度再截。
   *
   * 弹窗的高度由浏览器决定，模拟视口给多少它就用多少，因此固定给一个
   * 高度会在下方留出空白。先量出真实高度再重设视口，截出来才是紧密的。
   */
  let finalHeight = height;
  if (height === null) {
    const measured = await s.send('Runtime.evaluate', {
      expression: 'document.body.scrollHeight',
      returnByValue: true,
    });
    finalHeight = Math.max(200, Math.min(800, measured.result?.value ?? 400));
    await s.send('Emulation.setDeviceMetricsOverride', {
      width,
      height: finalHeight,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await new Promise((r) => setTimeout(r, 400));
  }

  const shot = await s.send('Page.captureScreenshot', {});
  s.close();
  await closeTarget(t.id);
  return { data: shot.data, height: finalHeight };
}

const wideShots = [
  { page: 'options.html', name: 'shot-1-options.png', settle: 6000 },
  { page: 'options.html#details', name: 'shot-2-details.png', settle: 8000 },
];

for (const job of wideShots) {
  const { data } = await capturePage(job.page, 1280, 800, job.settle);
  writeFileSync(`${OUT}/${job.name}`, Buffer.from(data, 'base64'));
  console.log(`  ${job.name}  1280x800`);
}

// 弹窗按内容高度截，再居中合成
const popup = await capturePage('popup.html', 380, null, 5000);
console.log(`  （弹窗内容高度 ${popup.height}px）`);
await composeOnCanvas(popup.data, 'shot-3-popup.png');

session.close();
await closeTarget(target.id);
console.log(`\n已写入 ${OUT}`);
