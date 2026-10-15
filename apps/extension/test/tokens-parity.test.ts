/*
 * 设计令牌的 CSS ⇄ TS 一致性。
 *
 * 背景：注入块（得分指导）在别人的页面里只能用内联样式，色值必须来自
 * src/ui/tokens.ts 这份 TS 镜像；而样式表的常量源是 src/ui/tokens.css。
 * 这组镜像曾经靠注释「与 tokens.css 同一批」人工同步——手抄迟早对不上，
 * 这里把它变成机械核对：镜像里的每一条都必须与 CSS 里的同名变量等值。
 *
 * 键名约定：camelCase ⇄ --kebab-case，数字后缀加连字符（space4 ⇄ --space-4，
 * radiusMd ⇄ --radius-md，accentWash ⇄ --accent-wash）。
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { TOKENS } from '../src/ui/tokens.ts';

/** tokens.css 的绝对路径（按本文件位置解析，跟跑测试时的 cwd 无关）。 */
const CSS_PATH = fileURLToPath(new URL('../src/ui/tokens.css', import.meta.url));

/** camelCase 键名 → CSS 变量名。 */
function toCssVariable(key: string): string {
  return (
    '--' +
    key
      .replace(/([a-z])([A-Z])/g, '$1-$2') // accentWash → accent-Wash
      .replace(/([a-zA-Z])(\d)/g, '$1-$2') // space4 → space-4
      .toLowerCase()
  );
}

/** 读 tokens.css，抽出 :root 里的全部变量。 */
function readCssTokens(): Map<string, string> {
  const css = readFileSync(CSS_PATH, 'utf8');
  const map = new Map<string, string>();
  const re = /(--[\w-]+):\s*([^;]+);/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(css)) !== null) {
    map.set(m[1] ?? '', (m[2] ?? '').trim());
  }
  return map;
}

describe('设计令牌：TS 镜像与 tokens.css 一致', () => {
  const css = readCssTokens();

  it('镜像里的每一条都能在 CSS 里找到同名变量且等值', () => {
    for (const [key, value] of Object.entries(TOKENS)) {
      const variable = toCssVariable(key);
      expect(css.get(variable), `${key} ⇄ ${variable} 在 tokens.css 里不存在`).toBeDefined();
      expect(css.get(variable), `${variable} 不一致：css=${css.get(variable)} ts=${value}`).toBe(
        value,
      );
    }
  });

  it('tokens.css 里没有重复定义的变量（后者静默覆盖前者，属于典型的抄错现场）', () => {
    const text = readFileSync(CSS_PATH, 'utf8');
    const names = [...text.matchAll(/(--[\w-]+):/g)].map((m) => m[1] ?? '');
    const dup = names.filter((name, i) => names.indexOf(name) !== i);
    expect(dup).toEqual([]);
  });
});
