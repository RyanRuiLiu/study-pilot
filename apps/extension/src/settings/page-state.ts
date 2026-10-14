/*
 * 设置页的共享状态：当前配置、重渲染、提示条、登录行刷新。
 *
 * 单独成模块是为了避免循环依赖：动作、落盘、单元明细都要用它们，
 * 而它们由入口创建与维护。若各自从入口导入，入口又要导入动作，
 * 就成环了。这里只放「谁都需要、但谁都不拥有」的四个东西。
 */

import type { Settings } from '.';

/** 当前配置。由入口与落盘处更新；各处只读。 */
export let current: Settings;

export function setCurrent(next: Settings): void {
  current = next;
}

/** 重渲染整个设置页。由入口注册。 */
export let render: () => void = () => {};

export function setRender(fn: () => void): void {
  render = fn;
}

/** 顶部提示条。由入口注册。 */
export let toast: (text: string) => void = () => {};

export function setToast(fn: (text: string) => void): void {
  toast = fn;
}
