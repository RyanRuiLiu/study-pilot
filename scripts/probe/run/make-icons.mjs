/*
 * 生成扩展图标。
 *
 * 尺寸规范来自 Chrome Web Store 的图标指南：128x128 的图里，实际图形应为
 * 96x96，四周各留 16 像素透明留白。理由是浏览器界面会自己在图标周围加
 * 边框与阴影，图形贴边时那些效果会与图形挤在一起。
 *
 * 同一条规范还要求：
 *   - PNG 格式
 *   - 明暗两种背景上都要看得清
 *   - 不要在图片最外框加边框（UI 会自己加）
 *   - 避免大片投影（UI 会自己加）
 *
 * 用 canvas 绘制而不是截 HTML：截图管线不保留透明，输出会是 RGB，
 * 留白变成白底——那样在深色主题的工具栏上就是一块白方块。
 *
 * 用法：node scripts/probe/run/make-icons.mjs
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Session, newPageTarget, closeTarget } from '../lib/cdp.mjs';

const OUT = resolve(import.meta.dirname, '../../../apps/extension/public/icon');
mkdirSync(OUT, { recursive: true });

/** 品牌色。与 src/ui/tokens.css 的 --accent 一致。 */
const ACCENT = '#0f766e';

/** 图形占整幅的比例。规范里 96/128 即 0.75。 */
const CONTENT_RATIO = 0.75;

const SIZES = [16, 32, 48, 96, 128];

const target = await newPageTarget();
const session = await Session.open(target.webSocketDebuggerUrl);
await session.send('Page.enable');
await session.send('Page.navigate', { url: 'about:blank' });

for (const size of SIZES) {
  // 这两个值在浏览器表达式里也算一遍，这里算的是给日志用的
  const content = Math.round(size * CONTENT_RATIO);
  const offset = Math.round((size - content) / 2);

  const result = await session.send('Runtime.evaluate', {
    expression: `(() => {
      const size = ${size};
      const content = Math.round(size * ${CONTENT_RATIO});
      const offset = (size - content) / 2;
      const radius = content * 0.22;

      const c = document.createElement('canvas');
      c.width = size;
      c.height = size;
      const ctx = c.getContext('2d');

      // 圆角方块
      ctx.fillStyle = '${ACCENT}';
      ctx.beginPath();
      ctx.roundRect(offset, offset, content, content, radius);
      ctx.fill();

      /*
       * 白色字母 S。
       *
       * 垂直位置按实际墨迹范围算，不用 textBaseline: 'middle' 加经验偏移。
       * 后者对齐的是字体度量线，而字母的墨迹上下并不对称——实测 128px 的
       * 图标里会偏上 6px，尺寸越大越明显。
       *
       * actualBoundingBoxAscent / Descent 给的是墨迹相对基线的上下距离，
       * 用它把墨迹中心对齐到方块中心。
       */
      ctx.fillStyle = '#ffffff';
      ctx.font = '600 ' + Math.round(content * 0.62) + 'px "Segoe UI", system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      const met = ctx.measureText('S');
      const ascent = met.actualBoundingBoxAscent;
      const descent = met.actualBoundingBoxDescent;
      const baseline = size / 2 + (ascent - descent) / 2;
      ctx.fillText('S', size / 2, baseline);

      return c.toDataURL('image/png');
    })()`,
    returnByValue: true,
  });

  const dataUrl = result.result?.value ?? '';
  const base64 = dataUrl.replace(/^data:image\/png;base64,/, '');
  if (!base64) {
    console.error(`  ${size}.png 生成失败`);
    continue;
  }
  writeFileSync(`${OUT}/${size}.png`, Buffer.from(base64, 'base64'));
  console.log(`  ${size}.png  图形 ${content}x${content}，四周留白 ${offset}px`);
}

session.close();
await closeTarget(target.id);
console.log(`\n已写入 ${OUT}`);
