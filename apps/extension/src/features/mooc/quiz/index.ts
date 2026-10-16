/*
 * 做题助手（前台）：单元测验与客观题考试共用的页内面板。
 *
 * 两者在服务端是同一种东西——取卷都走 `getOpenQuizPaperDto`、页面结构一致，
 * 因此不需要两套实现（0.3.1 起就是这么做的）。区别只在答案来源：单元测验在
 * 提交前只有题库有答案，随堂测验的卷面自带答案——后台的 buildFillIndex
 * 按「题库打底、当前卷覆盖」合并，助手两边都适用；取不到答案时如实说明，不提交空白。
 *
 * 前后台分工：前台在用户在场时工作，作答过程必须看得见、可核对（填充是页面点击）；
 * 后台无人值守、走纯接口。两者共用同一份「作答并提交」实现（平台包的
 * answerAndSubmitQuiz），判据不允许分叉。
 *
 * 分工：阶段判定见 `../quiz-stage.ts`，选项识别见 `options.ts`，取数与缓存见
 * `data.ts`，两个动作见 `actions.ts`，面板构造见 `panel.ts`；本文件只做装配与生命周期。
 */

import { detectQuizStage, probeQuizStage } from '../quiz-stage.ts';
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
