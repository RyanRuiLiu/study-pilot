/*
 * 构建工具的类型引用。
 *
 * `?inline` 用来把样式表当字符串取进来（注入到 shadow root 里的样式需要文本，
 * 而不是一个副作用式的 `<link>`）。Vite 的 client 类型声明了 `*.module.css`
 * 与裸 `*.css`，没有声明 `*.css?inline`，这里补上——标准做法，
 * 不是给自己开后门：除此之外不声明任何通配模块。
 *
 * 没有引 `/// <reference types="vite/client" />`：vite 不是这个包直接声明的依赖
 * （它由 vitest / wxt 带进来），引用一个没声明的包会让类型检查依赖一份意外的间接依赖。
 * 这里只需要 `?inline` 这一条，其余资源类型本项目没有用到。
 */

declare module '*.css?inline' {
  const css: string;
  export default css;
}
