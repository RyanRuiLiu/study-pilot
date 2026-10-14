/*
 * 组件层：设置项的控件。
 *
 * 分工：`index.ts` 是「看状态与做事」，这边是「改配置」。
 * 两份都不认识业务：值由调用方给，改动经回调交回。
 *
 * **不发明外观，也不发明结构**：
 * - 每个控件用它自己的 `label` 与 `help-text`（官方属性）。开关与勾选框的标签
 *   写在组件的默认插槽里，这是它们文档里的用法。
 * - 没有「左边标题说明 + 右边控件」那种自画的行——先前那套（`row()`）已经删掉，
 *   它把组件自带的能力重做了一遍，还多出一套自己的样式类。
 * - 控件排布由调用方决定（分区是 `sl-details`，一列往下排），这一层不画容器。
 *
 * sl-input 的类型里有一个与 DOM 声明冲突的 autocorrect 字段，因此两个输入框
 * 交回时收成 HTMLElement（对外只承诺「一个元素」）。
 */

import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';

import { button } from './index';

export { button };

/** 官方控件的两个通用属性：标题与补充说明。 */
export interface Field {
  label: string;
  help?: string;
}

/** 开关。标签走默认插槽，说明走 help-text——都是官方用法。 */
export function toggle(field: Field & { value: boolean; onChange: (next: boolean) => void }): HTMLElement {
  const element = document.createElement('sl-switch');
  element.checked = field.value;
  element.textContent = field.label;
  if (field.help !== undefined) element.setAttribute('help-text', field.help);
  element.addEventListener('sl-change', () => field.onChange(element.checked));
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
  field: Field & {
    value: number;
    min: number;
    max: number;
    unit: string;
    onChange: (next: number) => void;
  },
): HTMLElement {
  const element = document.createElement('sl-input');
  element.setAttribute('type', 'number');
  element.setAttribute('min', String(field.min));
  element.setAttribute('max', String(field.max));
  element.setAttribute('label', field.label);
  if (field.help !== undefined) element.setAttribute('help-text', field.help);
  element.value = String(field.value);

  const suffix = document.createElement('span');
  suffix.setAttribute('slot', 'suffix');
  suffix.textContent = field.unit;
  element.append(suffix);

  element.addEventListener('sl-change', () => {
    const next = Math.min(field.max, Math.max(field.min, Number(element.value) || field.min));
    element.value = String(next);
    field.onChange(next);
  });

  return element as unknown as HTMLElement;
}

/** 文本输入框。 */
export function textInput(field: Field & { value: string; onChange: (next: string) => void }): HTMLElement {
  const element = document.createElement('sl-input');
  element.setAttribute('label', field.label);
  if (field.help !== undefined) element.setAttribute('help-text', field.help);
  element.value = field.value;
  element.addEventListener('sl-change', () => field.onChange(element.value));
  return element as unknown as HTMLElement;
}

/**
 * 密钥一类需要默认遮住的输入。
 *
 * 用 `sl-input` 自带的 `password-toggle`（眼睛图标与可访问名称都由组件给），
 * 不自写显隐按钮：那等于把组件已经做好的事再做一遍，还容易漏掉焦点与标签。
 * 关闭自动填充：这是扩展自己的密钥，不该被密码管理器填进别的东西。
 */
export function secretInput(field: Field & { value: string; onChange: (next: string) => void }): HTMLElement {
  const element = document.createElement('sl-input');
  element.type = 'password';
  element.setAttribute('password-toggle', '');
  element.setAttribute('autocomplete', 'off');
  element.setAttribute('label', field.label);
  if (field.help !== undefined) element.setAttribute('help-text', field.help);
  element.value = field.value;
  element.addEventListener('sl-change', () => field.onChange(element.value));
  return element as unknown as HTMLElement;
}

/** 勾选框。标签走默认插槽，说明走 help-text。 */
export function checkbox(field: Field & { value: boolean; onChange: (next: boolean) => void }): HTMLElement {
  const element = document.createElement('sl-checkbox');
  element.checked = field.value;
  element.textContent = field.label;
  if (field.help !== undefined) element.setAttribute('help-text', field.help);
  element.addEventListener('sl-change', () => field.onChange(element.checked));
  return element;
}

/**
 * 一段说明文字，逐条给出。
 *
 * 用于「运作方式」这类只讲事实、没有可调项的地方。用 dt/dd 而不是段落：
 * 每一条都是「一个名目 + 一段说明」，读屏软件也能正确念出配对关系。
 */
export function prose(items: Array<{ term: string; text: string }>): HTMLElement {
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
