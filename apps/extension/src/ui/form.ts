/*
 * 组件层：设置项的控件与区块。
 *
 * 与 index.ts 的分工：那边是「看状态与做事」（状态行、计数、待办行、按钮排），
 * 这边是「改配置」（开关、输入框、设置项一行、分区与卡片）。两份都在组件层，
 * 同样不认识业务：值由调用方给，改动经回调交回。
 *
 * 控件一律用 Shoelace 的自定义元素（开关、输入框、折叠、勾选框），
 * 成品外观由它自带；这里的类只定布局与间距，取色在 tokens.css。
 * shadow root 里没有我们文档上的全局样式，因此每个类自带所需，不依赖宿主。
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

  const text = document.createElement('div');
  text.className = 'sp-row-text';

  const nameEl = document.createElement('div');
  nameEl.className = 'sp-row-name';
  nameEl.textContent = name;

  const noteEl = document.createElement('div');
  noteEl.className = 'sp-row-note';
  noteEl.textContent = note;

  text.append(nameEl, noteEl);

  const control = document.createElement('div');
  control.className = 'sp-row-control';
  control.append(...controls);

  element.append(text, control);
  return element;
}

/** 开关。 */
export function toggle(value: boolean, onChange: (next: boolean) => void): HTMLElement {
  const element = document.createElement('sl-switch');
  element.className = 'sp-switch';
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
  element.className = 'sp-field sp-field-num';
  element.setAttribute('type', 'number');
  element.setAttribute('min', String(min));
  element.setAttribute('max', String(max));
  element.value = String(value);

  const suffix = document.createElement('span');
  suffix.setAttribute('slot', 'suffix');
  suffix.className = 'sp-field-unit';
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
  element.className = 'sp-field';
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
  element.className = 'sp-checkbox';
  element.checked = value;
  element.setAttribute('title', title);
  element.addEventListener('sl-change', () => onChange(element.checked));
  return element;
}

/** 折叠区。标题本身就是概要，展开后是内容。 */
export function disclosure(summary: string, children: HTMLElement[]): HTMLElement {
  const element = document.createElement('sl-details');
  element.className = 'sp-disclosure';
  element.setAttribute('summary', summary);
  element.append(...children);
  return element;
}

/**
 * 一段静态说明，用作没有控件的设置项右侧。
 *
 * 有的设置项本身没有可调的东西，只是告诉用户背后怎么运作的。
 * 这时右侧不该留空，也不该硬塞一个假控件。
 */
export function note(text: string): HTMLElement {
  const element = document.createElement('span');
  element.className = 'sp-hint';
  element.textContent = text;
  return element;
}

/**
 * 一个平台分组：标题在左，来源标签在右，下面是内容。
 *
 * 标签只放静态的归属或性质说明（平台域名、「按需触发」这类）。
 * 不放随设置变化的数字：值该由控件自己说，两处同时显示两个数字反而要猜哪个生效。
 */
export function platform(title: string, origin: string, rows: HTMLElement[]): HTMLElement {
  const element = document.createElement('div');
  element.className = 'sp-card';

  const head = document.createElement('div');
  head.className = 'sp-card-head';

  const name = document.createElement('h3');
  name.className = 'sp-card-title';
  name.textContent = title;
  head.append(name);

  // 传空串表示这张卡片不需要标签，不给占位符凑数
  if (origin) {
    const tag = document.createElement('span');
    tag.className = 'sp-card-tag';
    tag.textContent = origin;
    head.append(tag);
  }

  element.append(head, ...rows);
  return element;
}

/**
 * 一段说明文字，逐条给出。
 *
 * 用于「运作方式」这类只讲事实、没有可调项的分区。用 dt/dd 而不是段落：
 * 每一条都是「一个名目 + 一段说明」，读屏软件也能正确念出配对关系。
 */
export function prose(items: Array<{ term: string; text: string }>): HTMLElement {
  const list = document.createElement('dl');
  list.className = 'sp-prose';

  for (const { term, text } of items) {
    const dt = document.createElement('dt');
    dt.className = 'sp-prose-term';
    dt.textContent = term;
    const dd = document.createElement('dd');
    dd.className = 'sp-prose-text';
    dd.textContent = text;
    list.append(dt, dd);
  }

  return list;
}

/**
 * 一个设置分区。
 *
 * 不加编号：编号只在内容本身是序列时才有意义，而设置分区之间没有先后顺序。
 * 层次由标题字号与分区之间的留白给出。id 用于左侧导航的跳转与当前位置判定。
 */
export function section(
  id: string,
  title: string,
  desc: string,
  blocks: HTMLElement[],
): HTMLElement {
  const element = document.createElement('section');
  element.className = 'sp-section';
  element.id = id;

  const heading = document.createElement('h2');
  heading.className = 'sp-section-title';
  heading.textContent = title;

  const lede = document.createElement('p');
  lede.className = 'sp-section-desc';
  lede.textContent = desc;

  element.append(heading, lede, ...blocks);
  return element;
}
