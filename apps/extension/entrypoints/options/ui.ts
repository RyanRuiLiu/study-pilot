/*
 * 设置页的基础控件与区块。
 *
 * 从 options/main.ts 按原有分节整块搬出；控件只接收回调，不碰存储。
 */

import type { UnitDetail } from '../../src/platform/messaging';


// ---------- 基础控件 ----------

export function row(name: string, note: string, ...controls: HTMLElement[]): HTMLElement {
  const el = document.createElement('div');
  el.className = 'opt';

  const text = document.createElement('div');
  text.className = 'text';
  const nameEl = document.createElement('div');
  nameEl.className = 'name';
  nameEl.textContent = name;
  const noteEl = document.createElement('div');
  noteEl.className = 'note';
  noteEl.textContent = note;
  text.append(nameEl, noteEl);

  const ctrl = document.createElement('div');
  ctrl.className = 'ctrl';
  ctrl.append(...controls);

  el.append(text, ctrl);
  return el;
}

/**
 * 开关。
 *
 * 用 base.css 的 .switch 结构：轨道与滑块是元素而不是伪元素，
 * 这样整块轨道都可点，点击区域不留死区。
 * 弹窗的总开关用的是同一套结构，两处外观因此必然一致。
 */
export function toggle(value: boolean, onChange: (next: boolean) => void): HTMLElement {
  const label = document.createElement('label');
  label.className = 'switch';

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = value;

  const track = document.createElement('span');
  track.className = 'track';
  const knob = document.createElement('span');
  knob.className = 'knob';
  track.append(knob);

  input.addEventListener('change', () => onChange(input.checked));

  label.append(input, track);
  return label;
}

/**
 * 数字输入框。
 *
 * 带单位。光一个数字看不出量的是什么——「30」既可能是分钟也可能是天，
 * 而这两者差了四十八倍。先前靠行名暗示单位（「启动延迟」后面跟个数字），
 * 那是要用户自己推断，不是说明。
 *
 * 越界时夹到范围内并写回输入框，用户能立刻看到被改成了什么，
 * 而不是填了 999 却生效了 360 而无从发现。
 */
export function numberInput(
  value: number,
  min: number,
  max: number,
  unit: string,
  onChange: (next: number) => void,
): HTMLElement {
  const box = document.createElement('span');
  box.className = 'num-box';

  const input = document.createElement('input');
  input.type = 'number';
  input.className = 'num';
  input.min = String(min);
  input.max = String(max);
  input.value = String(value);
  input.addEventListener('change', () => {
    const next = Math.min(max, Math.max(min, Number(input.value) || min));
    input.value = String(next);
    onChange(next);
  });

  const suffix = document.createElement('span');
  suffix.className = 'num-unit';
  suffix.textContent = unit;

  box.append(input, suffix);
  return box;
}

export function textInput(value: string, onChange: (next: string) => void): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'txt';
  input.value = value;
  input.addEventListener('change', () => onChange(input.value));
  return input;
}

/** 主按钮。用 base.css 的 button 默认样式。 */
/**
 * 一段静态说明，用作没有控件的设置项右侧。
 *
 * 有的设置项本身没有可调的东西，只是告诉用户背后怎么运作的。
 * 这时右侧不该留空，也不该硬塞一个假控件。
 */
export function note(text: string): HTMLElement {
  const el = document.createElement('span');
  el.className = 'hint';
  el.textContent = text;
  return el;
}

export function button(text: string, onClick: () => void): HTMLButtonElement {
  const el = document.createElement('button');
  el.type = 'button';
  el.textContent = text;
  el.addEventListener('click', onClick);
  return el;
}

/**
 * 一个平台分组。
 *
 * 分组头只用一行：名称在左、域名在右，下面一条细线。
 * 不套卡片背景——五个分区如果都套圆角灰底，看起来会一样重，
 * 而它们的重要程度并不相同。
 */
/*
 * 一张卡片：标题在左，标签在右，下面是内容。
 *
 * 标签只放静态的归属或性质说明（平台域名、「按需触发」这类）。
 * 不放随设置变化的数字——早先在「检查频率」的标签上显示「每 30 分钟」，
 * 而下面就是改这个值的输入框：用户改成 15 之后，标签与输入框同时显示
 * 两个不同的数字，反而要猜哪个生效。值该由输入框自己说。
 */
export function platform(title: string, origin: string, rows: HTMLElement[]): HTMLElement {
  const el = document.createElement('div');
  el.className = 'platform';

  const head = document.createElement('div');
  head.className = 'platform-head';

  const h = document.createElement('h3');
  h.textContent = title;
  head.append(h);

  /*
   * 标签是可选的，而且只该放短标记：域名、状态这类不随设置变化的词。
   *
   * 传空串表示这个卡片不需要标签。给一个占位符凑数是更糟的选择：
   * 用户会以为那两个字有什么含义。
   *
   * 不放随设置变化的数字。早先在「检查频率」的标签上显示「每 30 分钟」，
   * 而下面就是改这个值的输入框：用户改成 15 之后，标签与输入框同时显示
   * 两个不同的数字，反而要猜哪个生效。值该由输入框自己说。
   */
  if (origin) {
    const badge = document.createElement('span');
    badge.className = 'origin';
    badge.textContent = origin;
    head.append(badge);
  }

  el.append(head, ...rows);
  return el;
}

/**
 * 一段说明文字。
 *
 * 用于「运作方式」这类只讲事实、没有可调项的分区。
 * 逐条给出，条与条之间留出间距——挤成一段长文没人读。
 */
export function prose(items: Array<{ term: string; text: string }>): HTMLElement {
  const box = document.createElement('dl');
  box.className = 'prose';

  for (const { term, text } of items) {
    const dt = document.createElement('dt');
    dt.textContent = term;
    const dd = document.createElement('dd');
    dd.textContent = text;
    box.append(dt, dd);
  }

  return box;
}

/**
 * 一个设置分区。
 *
 * 不加编号：编号只在内容本身是序列时才有意义，而设置分区之间
 * 没有先后顺序，编号只是装饰。层次由标题字号与分区之间的留白给出。
 *
 * id 用于左侧导航的跳转与当前位置判定。
 */
export function section(
  id: string,
  title: string,
  desc: string,
  blocks: HTMLElement[],
): HTMLElement {
  const el = document.createElement('section');
  el.className = 'section';
  el.id = id;

  const h = document.createElement('h2');
  h.className = 'section-title';
  h.textContent = title;

  const p = document.createElement('p');
  p.className = 'section-desc';
  p.textContent = desc;

  el.append(h, p, ...blocks);
  return el;
}