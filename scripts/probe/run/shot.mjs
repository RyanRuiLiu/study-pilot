// 给扩展页面截图，用于目视检查排版。
//
// 用法：node scripts/probe/run/shot.mjs <页面路径> <输出文件> [宽度]
// 例：  node scripts/probe/run/shot.mjs popup.html .probe/popup.png 360

import { writeFileSync } from 'node:fs';
import { Session, newPageTarget } from '../lib/cdp.mjs';
import { requireExtensionId } from '../lib/ext-id.mjs';

// 扩展 id 由加载路径决定，不同机器不同，因此从浏览器读取而不是写死
const EXT_ID = await requireExtensionId();
const page = process.argv[2] ?? 'popup.html';
const out = process.argv[3] ?? '.probe/shot.png';
const width = Number(process.argv[4] ?? '360');

const target = await newPageTarget();
const session = await Session.open(target.webSocketDebuggerUrl);
await session.send('Page.enable');

// 页面尺寸决定截图范围；扩展页面不会自动撑开
await session.send('Emulation.setDeviceMetricsOverride', {
  width,
  height: 900,
  deviceScaleFactor: 2,
  mobile: false,
});

await session.send('Page.navigate', { url: `chrome-extension://${EXT_ID}/${page}` });

const deadline = Date.now() + 15000;
while (Date.now() < deadline) {
  const ready = await session
    .send('Runtime.evaluate', {
      expression:
        '(typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.id) ? "ready" : "wait"',
      returnByValue: true,
    })
    .catch(() => ({ result: { value: 'wait' } }));
  if (ready.result?.value === 'ready') break;
}

// 等数据渲染完
await new Promise((resolve) => setTimeout(resolve, 6000));

// 按内容高度裁切，避免大片空白
const height = await session.send('Runtime.evaluate', {
  expression: 'Math.ceil(document.body.scrollHeight)',
  returnByValue: true,
});
await session.send('Emulation.setDeviceMetricsOverride', {
  width,
  height: Math.max(200, Number(height.result?.value ?? 600)),
  deviceScaleFactor: 2,
  mobile: false,
});

// 不传参数：默认就是 png，而显式传 { format: 'png' } 在 Chrome 154 上会被拒
const shot = await session.send('Page.captureScreenshot', {});
writeFileSync(out, Buffer.from(shot.data, 'base64'));
console.log(`已保存 ${out}`);

session.close();
