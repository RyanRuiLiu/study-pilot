/*
 * 设计令牌的 TS 镜像（只给注入块用）。
 *
 * 为什么需要它：得分指导块注入在**别人的页面**里，扩展的样式表在那里
 * 不可用，样式只能写成内联——这是它的隔离手段，不是将就。但内联不等于
 * 可以把色值手抄进代码：先前这些值散在 block.ts 里靠注释「与 tokens.css
 * 同一批」人工同步，正是这类手抄迟早对不上的地方。
 *
 * 约定：键与 tokens.css 的变量名一一对应（camelCase ⇄ --kebab-case，
 * 数字后缀加连字符：space4 ⇄ --space-4）。test/tokens-parity.test.ts
 * 会读 tokens.css 逐条比对——改一边必须改另一边，测试拦下不一致。
 *
 * 只镜像注入块真正用到的值；CSS 侧的完整标尺以 tokens.css 为准。
 */

export const TOKENS = {
  accent: '#2b4acb',
  accentWash: '#eef1fc',
  ink: '#111214',
  inkSoft: '#52525b',
  inkFaint: '#71717a',
  lineOnWash: '#c7d0f2',
  line: '#f2f2f4',
  paper2: '#ffffff',
  shadowPanel: '0 6px 24px rgba(17, 18, 20, 0.14)',
  onAccent: '#ffffff',
  radiusMd: '10px',
  radiusLg: '12px',
  space4: '4px',
  space8: '8px',
  space12: '12px',
  space16: '16px',
  space20: '20px',
  textMd: '13px',
  textLg: '14px',
} as const;
