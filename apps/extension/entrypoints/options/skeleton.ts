/*
 * 与首帧完全一致的列表骨架（唯一实现）。
 *
 * 首帧的骨架写在 index.html 的静态标记里；读取/重读期间要用同一套形状
 * 把列表区顶替成骨架（课程列表的读取、课件区的重读都用它），
 * 类名取自 components.css 的形状定义——一处定义，两处使用。
 */

/** 一块列表骨架（列表区的等待语言与首次打开统一）。 */
export function skeletonBlock(): HTMLElement {
  const el = document.createElement('span');
  el.className = 'skeleton skeleton-block';
  el.setAttribute('aria-hidden', 'true');
  return el;
}
