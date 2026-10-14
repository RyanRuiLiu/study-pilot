/*
 * 注入到别人页面里的元素如何取得隔离。
 *
 * 面板与得分指导都要塞进慕课的页面。两边都不该污染宿主，也不该被宿主的样式表影响
 * ——站点的 CSS 里有大量 `.title`、`.info` 这类通用类名，撞上就是无声的样式错乱。
 * 标准做法是 shadow DOM：选择器进不来，也出不去。
 *
 * 代价是样式必须自己带。设计令牌由官方主题 light.css 定义在文档的 `:root` 上，
 * 自定义属性会一路继承进 shadow 树，因此注入件里不需要再带一份主题，
 * 只需要带这一件自己的布局样式——组件外观完全由主题给。
 */

import shoelaceTheme from '@shoelace-style/shoelace/dist/themes/light.css?inline';

/**
 * 把官方主题交给文档。
 *
 * 只在 `:root` 上定义 `--sl-*` 这批自定义属性，不碰任何选择器与元素样式，
 * 因此不会改变宿主页面的外观——站点自己的 CSS 读不到这些名字。
 * 有了它，组件在 shadow 树里也能按官方方式靠继承拿到基础色板。
 */
let themeInstalled = false;

function ensureDocumentTheme(): void {
  // 一个内容脚本 bundle 一个模块实例，因此这个标记足够：不需要回文档里找那个 style 元素
  if (themeInstalled) return;
  const style = document.createElement('style');
  style.textContent = shoelaceTheme;
  document.head.append(style);
  themeInstalled = true;
}

/**
 * 在 host 上开一个隔离的 shadow root，装进这份组件自己的样式。
 */
export function attachIsolated(host: HTMLElement, styles: string): ShadowRoot {
  ensureDocumentTheme();
  const root = host.attachShadow({ mode: 'open' });
  const style = document.createElement('style');
  style.textContent = styles;
  root.append(style);
  return root;
}
