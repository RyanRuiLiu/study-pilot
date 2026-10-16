/*
 * 设置页列表区的一句说明（唯一实现）。
 *
 * courses 与 courseware 原先各写了一份逐字相同的 note()——同一件事
 * 两份实现，改一处漏一处只是时间问题；合成这一份，两处都从这里取。
 */

/** 一句说明；error 为真时用警示色（读取失败如实说）。 */
export function note(text: string, error = false): HTMLElement {
  const el = document.createElement('p');
  el.className = error ? 'note is-error' : 'note';
  el.textContent = text;
  return el;
}

/**
 * 两个平台的首页——登录入口都在导航里，与弹窗的「前往登录」同一个地址。
 *
 * 定义在这里而不是各调用文件：它是 `loginNote` 的入参，跟着它走才有唯一一份；
 * 四个调用点（两平台各两处）各抄一遍就是四处可能改漏的地方。
 */
export const MOOC_LOGIN_URL = 'https://www.icourse163.org/';
export const ZHS_LOGIN_URL = 'https://www.zhihuishu.com/';

/**
 * 「未登录」那一句 ＋ 去登录的去处。
 *
 * 去处做成**句内链接**，不另起一行——界面上「一句说明 ＋ 一个去处」的既有形状
 * 就是这个（见 index.html 的 AI 那条说明：「…前往 <a>智谱开放平台</a> 申请」）。
 * 单起一行的按钮会把一句本来连贯的话劈成两截，也把话说重了。
 *
 * 句子本身照抄常用句（CONTRIBUTING「界面语言与文案」），不为了塞链接去改它。
 */
export function loginNote(text: string, href: string): HTMLElement {
  const el = note(text);
  const link = document.createElement('a');
  link.href = href;
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.textContent = '前往登录';
  el.append(link);
  return el;
}
