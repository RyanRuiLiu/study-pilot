/*
 * 做题页助手（前台）。
 *
 * 前后台分工：前台在用户在场时工作，作答过程必须看得见、可核对；
 * 后台无人值守，走纯接口（见 platforms/mooc/execute/）。
 *
 * 面板按页面阶段呈现内容，阶段判定见 `../quiz-stage.ts`。
 *
 * 分工：页面选项识别见 `options.ts`，取数与缓存见 `data.ts`，
 * 两个动作见 `actions.ts`，面板构造见 `panel.ts`；本文件只做装配与生命周期。
 */

import { detectQuizStage, probeQuizStage } from '../quiz-stage';
import { fill, submit } from './actions.ts';
import {
  PANEL_ID,
  applyStage,
  createActivePanel,
  loadPanelInfo,
  type ActivePanel,
  type QuizHelperOptions,
} from './panel.ts';

export type { QuizHelperOptions } from './panel.ts';

let active: ActivePanel | null = null;

/**
 * 展示或更新做题助手面板。
 *
 * 幂等：内容脚本会在每次 DOM 变化时调用它。面板仍在页面上时只更新内容，
 * 被页面重建后移除时则重新创建。
 */
export function showQuizHelper(options: QuizHelperOptions): void {
  if (active && !document.getElementById(PANEL_ID)) active = null;

  if (!active) {
    active = createActivePanel(options, {
      onFill: () => {
        if (active) void fill(active);
      },
      onSubmit: () => {
        if (active) void submit(active);
      },
    });
  } else {
    active.options = options;
  }

  const stage = detectQuizStage(probeQuizStage());
  if (active.stage !== stage) applyStage(active, stage);

  void loadPanelInfo(active);
}

export function removeQuizHelper(): void {
  document.getElementById(PANEL_ID)?.remove();
  active = null;
}
