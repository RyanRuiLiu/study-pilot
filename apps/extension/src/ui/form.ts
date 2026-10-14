/*
 * 组件层：设置项的控件与区块。
 *
 * 与 index.ts 的分工：那边是「看状态与做事」（状态行、计数、待办行、按钮排），
 * 这边是「改配置」（开关、输入框、设置项一行、分区与卡片）。两份都在组件层，
 * 同样不认识业务：值由调用方给，改动经回调交回。
 *
 * 控件一律用 Shoelace 的自定义元素（开关、输入框、折叠、勾选框、卡片、标签），
 * 成品外观由官方主题给；这里剩下的类只管把组件摆成一行、给出官方间距。
 * 文字层级用原生语义（strong / small / h2 / dl），不再自写一套字号。
 *
 * sl-input 的类型里有一个与 DOM 声明冲突的 autocorrect 字段，因此两个输入框
 * 交回时收成 HTMLElement（这一层对外只承诺「一个元素」，页面拿到的就是它）。
 */

import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import '@shoelace-style/shoelace/dist/components/details/details.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';

import { button } from './index';

export { button };

/** 一行设置项：左侧名称与说明，右侧控件。 */
export function row(name: string, note: string, ...controls: HTMLElement[]): HTMLElement {
  const element = document.createElement('div');
  element.className = 'sp-row';

  /*
   * 名称与说明不写自己的类：`<strong>` 与 `<small>` 的粗细与字号由浏览器给。
   * 这一层只负责把「文字 + 控件」摆成一行。
   */
  const text = document.createElement('div');
  text.className = 'sp-fill';

  const nameEl = document.createElement('strong');
  nameEl.textContent = name;

  const noteEl = document.createElement('small');
  noteEl.textContent = note;

  text.append(nameEl, document.createElement('br'), noteEl);

  const control = document.createElement('div');
  control.className = 'sp-row-control';
  control.append(...controls);

  element.append(text, control);
  return element;
}

/** 开关。 */
export function toggle(value: boolean, onChange: (next: boolean) => void): HTMLElement {
  const element = document.createElement('sl-switch');
  element.checked = value;
  element.addEventListener('sl-change', () => onChange(element.checked));
  return element;
}

/**
 * 数字输入框，带单位。
 *
 * 带单位是因为光一个数字看不出量的是什么——「30」既可能是分钟也可能是天。
 * 越界时夹到范围内并写回：用户能立刻看到被改成了什么，
 * 而不是填了 999 却生效了 360 而无从发现。
 */
export function numberInput(
  value: number,
  min: number,
  max: number,
  unit: string,
  onChange: (next: number) => void,
): HTMLElement {
  const element = document.createElement('sl-input');
  element.setAttribute('type', 'number');
  element.setAttribute('min', String(min));
  element.setAttribute('max', String(max));
  element.value = String(value);

  const suffix = document.createElement('span');
  suffix.setAttribute('slot', 'suffix');
  suffix.textContent = unit;
  element.append(suffix);

  element.addEventListener('sl-change', () => {
    const next = Math.min(max, Math.max(min, Number(element.value) || min));
    element.value = String(next);
    onChange(next);
  });

  return element as unknown as HTMLElement;
}

/** 文本输入框。 */
export function textInput(value: string, onChange: (next: string) => void): HTMLElement {
  const element = document.createElement('sl-input');
  element.value = value;
  element.addEventListener('sl-change', () => onChange(element.value));
  return element as unknown as HTMLElement;
}

/**
 * 密钥一类需要默认遮住的输入。
 *
 * 用 `sl-input` 自带的 `password-toggle`（眼睛图标与可访问名称都由组件给），
 * 不自写显隐按钮：那等于把组件已经做好的事再做一遍，还容易漏掉焦点与标签。
 * 关闭自动填充：这是扩展自己的密钥，不该被密码管理器填进别的东西。
 */
export function secretInput(value: string, onChange: (next: string) => void): HTMLElement {
  const element = document.createElement('sl-input');
  element.type = 'password';
  element.setAttribute('password-toggle', '');
  element.setAttribute('autocomplete', 'off');
  element.value = value;
  element.addEventListener('sl-change', () => onChange(element.value));
  return element as unknown as HTMLElement;
}

/** 勾选框。 */
export function checkbox(
  value: boolean,
  title: string,
  onChange: (next: boolean) => void,
): HTMLElement {
  const element = document.createElement('sl-checkbox');
  element.checked = value;
  element.setAttribute('title', title);
  element.addEventListener('sl-change', () => onChange(element.checked));
  return element;
}

/** 折叠区。标题本身就是概要，展开后是内容。 */
export function disclosure(summary: string, children: HTMLElement[]): HTMLElement {
  const element = document.createElement('sl-details');
  element.setAttribute('summary', summary);
  element.append(...children);
  return element;
}

/**
 * 一个平台分组：标题在左，来源标签在右，下面是内容。
 *
 * 标签只放静态的归属或性质说明（平台域名、「按需触发」这类）。
 * 不放随设置变化的数字：值该由控件自己说，两处同时显示两个数字反而要猜哪个生效。
 */
export function platform(title: string, origin: string, rows: HTMLElement[]): HTMLElement {
  const card = document.createElement('sl-card');

  const head = document.createElement('div');
  head.slot = 'header';
  head.className = 'sp-line';

  const name = document.createElement('h3');
  name.className = 'sp-fill'
  name.textContent = title;
  head.append(name);

  // 传空串表示这张卡片不需要标签，不给占位符凑数
  if (origin !== '') {
    const tag = document.createElement('sl-tag');
    tag.size = 'small';
    tag.variant = 'neutral';
    tag.textContent = origin;
    head.append(tag);
  }

  const body = document.createElement('div');
  body.append(...rows);
  card.append(head, body);
  return card;
}

/**
 * 一段说明文字，逐条给出。
 *
 * 用于「运作方式」这类只讲事实、没有可调项的分区。用 dt/dd 而不是段落：
 * 每一条都是「一个名目 + 一段说明」，读屏软件也能正确念出配对关系。
 */
export function prose(items: Array<{ term: string; text: string }>): HTMLElement {
  // 名目与说明的配对由 dl/dt/dd 表达，外观交给浏览器默认与官方主题的字体
  const list = document.createElement('dl');

  for (const { term, text } of items) {
    const dt = document.createElement('dt');
    dt.textContent = term;
    const dd = document.createElement('dd');
    dd.textContent = text;
    list.append(dt, dd);
  }

  return list;
}

/**
 * 一个设置分区。
 *
 * 不加编号：编号只在内容本身是序列时才有意义，而设置分区之间没有先后顺序。
 * 层次由标题字号与分区之间的留白给出。
 */
export function section(
  id: string,
  title: string,
  desc: string,
  blocks: HTMLElement[],
): HTMLElement {
  const element = document.createElement('section');
  element.id = id;

  const heading = document.createElement('h2');
  heading.textContent = title;

  const lede = document.createElement('p');
  lede.textContent = desc;

  element.append(heading, lede, ...blocks);
  parts.set(element, { title, heading });
  return element;
}

/**
 * 分区生成时记住的两样东西：标题文字与标题元素。
 *
 * 标题元素要记下来是因为标签导航会把分区里的标题摘掉（标签上已经写着这一类叫什么），
 * 摘掉之后仍然要能说出这一类叫什么。用 WeakMap 而不是回 DOM 里查：
 * 那样等于把「标题在哪」这件事绑到一个 class 名上，改了样式就断。
 */
const parts = new WeakMap<HTMLElement, { title: string; heading: HTMLElement }>();

function ofSection(element: HTMLElement): { title: string; heading: HTMLElement } {
  const found = parts.get(element);
  if (found === undefined) throw new Error('这个元素不是 section() 生成的分区');
  return found;
}

/** 分区标题文字。设置页的二级标签用它当标签名，因此不存在第二份标题清单。 */
export function sectionTitle(element: HTMLElement): string {
  return ofSection(element).title;
}

/**
 * 把分区改成「放在标签面板里的样子」：摘掉它自己的标题。
 *
 * 标题与标签重复出现在同一屏里，是两句话抢着说同一件事。留白由 `.sp-section`
 * 自己给，不再分两种形态。
 */
export function inlineSection(element: HTMLElement): HTMLElement {
  ofSection(element).heading.remove();
  return element;
}
