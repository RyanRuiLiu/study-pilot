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
  accent: '#0f766e',
  accentWash: '#f0fdfa',
  ink: '#101828',
  inkSoft: '#475467',
  inkFaint: '#667085',
  line: '#ccd2d9',
  onAccent: '#ffffff',
  radiusMd: '10px',
  space4: '4px',
  space8: '8px',
  space12: '12px',
  space16: '16px',
  textMd: '13px',
} as const;
