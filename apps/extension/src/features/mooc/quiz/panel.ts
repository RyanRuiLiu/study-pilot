/*
 * 做题助手面板：构造 DOM、按阶段切换提示、管理忙碌与信息行。
 *
 * 样式写成内联，取值一律来自 src/ui/tokens.ts（与得分指导、「查看答案」块同一套
 * 令牌，test/tokens-parity.test.ts 逐条核对）。这块注入在别人页面里，扩展自己的
 * 样式表在那里不可用——内联是隔离手段，不是将就；但色值不许手抄。
 *
 * 只负责「怎么显示」，「点击后做什么」由入口以参数注入（否则与 actions 互相引用成环）。
 */

import type { OpenQuizInfo } from '@study-pilot/platform-mooc';
import { TOKENS } from '../../../ui/tokens.ts';
import { STAGE_DESCRIPTIONS, type QuizStage } from '../quiz-stage.ts';
import { loadQuizInfo } from './data.ts';

export const PANEL_ID = 'study-pilot-quiz-panel';

/*
 * 总分。词与平台显示的一致（平台语言包里就叫「总分：」）。
 * 截止时间、尝试次数、当前阶段、提交状态都不放面板上：平台上本来就显示着，
 * 抄一遍会让用户在一屏里看到两处相同信息，只会怀疑哪一处是准的。
 */
const LABEL_TOTAL_SCORE = '总分：';

export interface QuizHelperOptions {
  /** 课程学期 id。为 null 时无法读取题库 */
  termId: number | null;
  /** 当前测验的 tid */
  quizId: number;
}

export interface ActivePanel {
  handle: PanelHandle;
  hint: HTMLElement;
  infoSlot: HTMLElement;
  fillButton: HTMLButtonElement;
  submitButton: HTMLButtonElement;
  options: QuizHelperOptions;
  stage: QuizStage;
  busy: boolean;
  infoLoaded: boolean;
}

interface PanelActions {
  onFill: () => void;
  onSubmit: () => void;
}

interface PanelHandle {
  root: HTMLElement;
  body: HTMLElement;
  setStatus: (text: string) => void;
}

/** 面板容器：固定右下偏上，白底、圆角、投影，与页面内容分层。 */
function createPanelShell(id: string, title: string): PanelHandle {
  document.getElementById(id)?.remove();

  const root = document.createElement('div');
  root.id = id;
  root.style.cssText = [
    'position:fixed',
    'right:24px',
    'top:30%',
    'width:260px',
    'z-index:2147483000',
    `background:${TOKENS.paper2}`,
    `border:1px solid ${TOKENS.line}`,
    `border-radius:${TOKENS.radiusLg}`,
    `box-shadow:${TOKENS.shadowPanel}`,
    `font-size:${TOKENS.textMd}`,
    `color:${TOKENS.ink}`,
    'font-family:inherit',
  ].join(';');

  const head = document.createElement('div');
  head.style.cssText = [
    'display:flex',
    'align-items:center',
    'justify-content:space-between',
    `padding:${TOKENS.space8} ${TOKENS.space12}`,
    `border-bottom:1px solid ${TOKENS.line}`,
    'cursor:move',
    'user-select:none',
  ].join(';');

  const titleNode = document.createElement('span');
  titleNode.textContent = title;
  titleNode.style.cssText = `font-weight:600;font-size:${TOKENS.textLg};`;

  const collapse = document.createElement('button');
  collapse.type = 'button';
  collapse.textContent = '收起';
  collapse.style.cssText = [
    'border:0',
    'background:none',
    `color:${TOKENS.inkFaint}`,
    `font-size:${TOKENS.textMd}`,
    'cursor:pointer',
    'padding:0',
  ].join(';');

  head.append(titleNode, collapse);

  const body = document.createElement('div');
  body.style.cssText = `padding:${TOKENS.space12};display:grid;gap:${TOKENS.space8};`;

  const status = document.createElement('div');
  status.style.cssText = `color:${TOKENS.inkSoft};line-height:1.6;`;
  // 没有事要报时整条不占位：空着的提示条会让人以为还在等结果
  status.hidden = true;

  root.append(head, body);
  body.append(status);

  let minimized = false;
  collapse.addEventListener('click', (event) => {
    event.stopPropagation();
    minimized = !minimized;
    body.hidden = minimized;
    collapse.textContent = minimized ? '展开' : '收起';
  });

  // 拖动：按住标题条移动面板；位置不持久化，刷新后回默认位置
  head.addEventListener('pointerdown', (event) => {
    const rect = root.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const onMove = (move: PointerEvent): void => {
      root.style.left = `${Math.max(0, move.clientX - offsetX)}px`;
      root.style.top = `${Math.max(0, move.clientY - offsetY)}px`;
      root.style.right = 'auto';
    };
    const onUp = (): void => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  });

  document.body.append(root);

  return {
    root,
    body,
    setStatus(text: string): void {
      status.textContent = text;
      status.hidden = text === '';
    },
  };
}

/** 一个面板按钮。主按钮（提交）是强调色，次按钮（填充）是控件底色。 */
function panelButton(
  label: string,
  kind: 'fill' | 'submit',
  onClick: () => void,
): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = label;
  const primary = kind === 'submit';
  button.style.cssText = [
    'flex:1',
    'border-radius:' + TOKENS.radiusMd,
    'cursor:pointer',
    'padding:6px 0',
    `font-size:${TOKENS.textMd}`,
    primary ? 'border:1px solid ' + TOKENS.accent : 'border:1px solid ' + TOKENS.line,
    primary ? `background:${TOKENS.accent}` : 'background:#f2f2f3',
    primary ? `color:${TOKENS.onAccent}` : `color:${TOKENS.ink}`,
  ].join(';');
  button.addEventListener('click', onClick);
  return button;
}

export function createActivePanel(options: QuizHelperOptions, actions: PanelActions): ActivePanel {
  const handle = createPanelShell(PANEL_ID, '做题助手');

  const infoSlot = document.createElement('div');
  const hint = document.createElement('div');
  hint.style.cssText = `color:${TOKENS.inkSoft};line-height:1.6;`;

  const panel: ActivePanel = {
    handle,
    hint,
    infoSlot,
    fillButton: panelButton('填充答案', 'fill', actions.onFill),
    submitButton: panelButton('提交答案', 'submit', actions.onSubmit),
    options,
    stage: 'loading',
    busy: false,
    infoLoaded: false,
  };

  // 信息行由接口数据异步填充，先占位，避免面板出现时发生位移
  handle.body.insertBefore(infoSlot, handle.body.firstChild);
  handle.body.append(hint);

  // 两个动作并排等宽：填充与提交是同一层的两个选择，不该上下读成两步
  const buttonRow = document.createElement('div');
  buttonRow.style.cssText = 'display:flex;gap:8px;';
  buttonRow.append(panel.fillButton, panel.submitButton);
  handle.body.append(buttonRow);

  return panel;
}

export function setBusy(panel: ActivePanel, next: boolean): void {
  panel.busy = next;
  const interactive = panel.stage === 'answering';
  for (const button of [panel.fillButton, panel.submitButton]) {
    button.disabled = next || !interactive;
    button.style.opacity = button.disabled ? '0.5' : '1';
    button.style.cursor = button.disabled ? 'default' : 'pointer';
  }
}

export function applyStage(panel: ActivePanel, stage: QuizStage): void {
  panel.stage = stage;
  panel.hint.textContent = STAGE_DESCRIPTIONS[stage];
  if (!panel.busy) setBusy(panel, false);
}

/**
 * 由测验信息构造面板上的信息行。
 *
 * 只放总分：它与面板的动作直接相关——面板要做的是按答案作答，总分说明这值多少分。
 */
function buildInfoRow(info: OpenQuizInfo): HTMLElement | null {
  const total = info.totalScore;
  if (typeof total !== 'number' || total <= 0) return null;

  const row = document.createElement('div');
  row.style.cssText = `color:${TOKENS.inkSoft};`;
  const label = document.createElement('span');
  label.textContent = LABEL_TOTAL_SCORE;
  const value = document.createElement('span');
  value.style.cssText = `color:${TOKENS.ink};font-weight:600;`;
  value.textContent = `${total} 分`;
  row.append(label, value);
  return row;
}

/** 用接口数据填充信息行。只执行一次，失败时保持占位为空。 */
export async function loadPanelInfo(panel: ActivePanel): Promise<void> {
  if (panel.infoLoaded) return;
  panel.infoLoaded = true;

  const info = await loadQuizInfo(panel.options.quizId);
  if (info === null) return;
  if (!document.getElementById(PANEL_ID)) return;

  const row = buildInfoRow(info);
  if (row) panel.infoSlot.replaceChildren(row);
}
