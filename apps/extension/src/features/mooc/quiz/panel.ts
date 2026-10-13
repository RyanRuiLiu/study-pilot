/*
 * 面板：构造 DOM、按阶段切换提示、管理忙碌状态、填充信息行。
 *
 * 只负责「怎么显示」，不负责「点击后做什么」——两个动作由入口以参数注入，
 * 否则本文件与 actions.ts 会互相引用成环。
 */

import type { OpenQuizInfo } from '@study-pilot/platform-mooc';
import { createPanel, panelButton, panelInfo, type PanelHandle } from '../../panel';
import { STAGE_DESCRIPTIONS, type QuizStage } from '../quiz-stage';
import { loadQuizInfo } from './data.ts';
import type { MoocClient } from '@study-pilot/platform-mooc';

export const PANEL_ID = 'study-pilot-quiz-panel';

/*
 * 总分。这里的词必须与平台显示的一致——平台语言包里就叫「总分：」，
 * 换个说法用户会以为是另一回事。
 *
 * 截止时间、尝试次数、当前阶段、提交状态都没有放在面板上：那些平台上
 * 本来就显示着，扩展再抄一遍是重复，用户在一屏里看到两处相同的信息
 * 只会怀疑哪一处是准的。
 */
const LABEL_TOTAL_SCORE = '总分：';

export interface QuizHelperOptions {
  client: MoocClient;
  /** 课程学期 id。为 null 时无法读取题库 */
  termId: number | null;
  /** 当前测验的 tid */
  quizId: number;
}

export interface ActivePanel {
  handle: PanelHandle;
  hint: HTMLElement;
  /** 信息行的容器，由接口数据填充 */
  infoSlot: HTMLElement;
  fillButton: HTMLButtonElement;
  submitButton: HTMLButtonElement;
  options: QuizHelperOptions;
  stage: QuizStage;
  busy: boolean;
  /** 是否已经填充过信息行，避免重复请求 */
  infoLoaded: boolean;
}

interface PanelActions {
  onFill: () => void;
  onSubmit: () => void;
}

export function createActivePanel(options: QuizHelperOptions, actions: PanelActions): ActivePanel {
  const handle = createPanel({ id: PANEL_ID, title: '做题助手', width: 260 });

  const hint = document.createElement('div');
  hint.className = 'sp-panel-hint';

  // 信息行由接口数据异步填充，先占位，避免面板出现时发生位移
  const infoSlot = document.createElement('div');

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

  handle.body.append(infoSlot, hint, panel.fillButton, panel.submitButton);
  return panel;
}

export function setBusy(panel: ActivePanel, next: boolean): void {
  panel.busy = next;
  const interactive = panel.stage === 'answering';
  panel.fillButton.disabled = next || !interactive;
  panel.submitButton.disabled = next || !interactive;
}

export function applyStage(panel: ActivePanel, stage: QuizStage): void {
  panel.stage = stage;
  panel.hint.textContent = STAGE_DESCRIPTIONS[stage];
  if (!panel.busy) setBusy(panel, false);
}

/**
 * 由测验信息构造面板上的信息行。
 *
 * 只放总分：它与面板的动作直接相关——面板要做的是按题库作答，
 * 而总分说明这值多少分。其余数据平台上本来就显示着。
 */
function buildInfoRow(info: OpenQuizInfo): HTMLElement | null {
  if (typeof info.totalScore !== 'number' || info.totalScore <= 0) return null;
  return panelInfo([{ label: LABEL_TOTAL_SCORE, value: `${info.totalScore} 分` }]);
}

/** 用接口数据填充信息行。只执行一次，失败时保持占位为空。 */
export async function loadPanelInfo(panel: ActivePanel): Promise<void> {
  if (panel.infoLoaded) return;
  const termId = panel.options.termId;
  if (termId === null) return;

  panel.infoLoaded = true;

  try {
    const info = await loadQuizInfo(panel.options.client, panel.options.quizId);
    if (!info) return;
    if (!document.getElementById(PANEL_ID)) return;

    const row = buildInfoRow(info);
    if (row) panel.infoSlot.replaceChildren(row);
  } catch {
    // 信息行是辅助内容，取不到时留空即可，不影响作答
  }
}
