/*
 * 页面底部的一行提示。
 *
 * 改动本身就是「立即保存」，因此提示只用来确认发生了结果的动作：
 * 读取课程成功或失败、连接测试的结果。普通输入不做提示——保存是常态，
 * 每敲一次字弹一下只会变成噪音。
 */

let el: HTMLElement | null = null;
let timer: number | null = null;

export function initToast(element: HTMLElement): void {
  el = element;
}

export function toast(text: string): void {
  if (el === null) return;
  el.textContent = text;
  el.classList.add('on');
  if (timer !== null) window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    el?.classList.remove('on');
    timer = null;
  }, 3200);
}
