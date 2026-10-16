/*
 * 做题页的阶段判定。
 *
 * 同一份测验在不同阶段呈现完全不同的页面，可用的操作也不同：
 *
 *   开考前    停留在 .m-beforeTest，有 .j-startBtn，没有题目。
 *             此时不能填充，必须先开始测验（这一步会改变服务端状态）
 *   作答中    停留在 .m-quizDoing，有题目与 .j-submitBtn。可以填充与提交
 *   已批改    题目带 analysisMode 类，作答区已展示答案与得分。不应再作答
 *
 * 判定逻辑做成纯函数，接收一个描述页面事实的对象，
 * 因此可以在 Node 中直接测试，不依赖 DOM 实现。
 * 从真实页面提取这些事实的工作由 probeQuizStage 完成。
 */

export type QuizStage = 'before-start' | 'answering' | 'graded' | 'loading';

/** 判定所需的页面事实。 */
export interface QuizStageProbe {
  /** 是否存在开始测验按钮 */
  hasStartButton: boolean;
  /** 是否存在提交按钮 */
  hasSubmitButton: boolean;
  /** 题目数量 */
  questionCount: number;
  /** 其中已带批改标记的题目数量 */
  gradedQuestionCount: number;
}

export function detectQuizStage(probe: QuizStageProbe): QuizStage {
  // 开始按钮存在即说明还没进入作答，此时页面上不会有题目
  if (probe.hasStartButton) return 'before-start';

  // 有提交按钮说明处于作答中
  if (probe.hasSubmitButton) return 'answering';

  // 没有提交按钮但有题目，且题目全部带批改标记，说明已经批改过
  if (probe.questionCount > 0 && probe.gradedQuestionCount === probe.questionCount) {
    return 'graded';
  }

  // 其余情况视为页面尚未渲染完成
  return 'loading';
}

/**
 * 判断元素是否真的呈现给用户。
 *
 * 必须做这一步：做题页的两个阶段模板同时存在于 DOM 中，靠显示与隐藏切换。
 * 实测进入作答状态后，开始测验按钮仍在文档里，只是位于 display:none 的容器内。
 * 仅检查元素是否存在会把页面误判为「开考前」，进而禁用面板上的全部操作。
 *
 * 用 getClientRects 而不是 offsetParent：后者对 position:fixed 的元素恒为 null。
 */
function isVisible(element: Element | null): boolean {
  if (!element) return false;
  return element.getClientRects().length > 0;
}

/** 从真实文档中提取判定所需的事实。 */
export function probeQuizStage(root: ParentNode = document): QuizStageProbe {
  const questions = root.querySelectorAll('.u-questionItem');
  let graded = 0;
  for (const question of questions) {
    if (question.classList.contains('analysisMode')) graded++;
  }

  return {
    hasStartButton: isVisible(root.querySelector('.j-startBtn')),
    hasSubmitButton: isVisible(root.querySelector('.j-submitBtn')),
    questionCount: questions.length,
    gradedQuestionCount: graded,
  };
}

/** 阶段对应的界面说明。 */
export const STAGE_DESCRIPTIONS: Record<QuizStage, string> = {
  'before-start': '尚未开始测验。请在页面上点击开始测验后再使用本面板。',
  answering: '可以填充答案。逐题点击页面选项，每次点击之间留出间隔。',
  graded: '本单元测验已批改，答案已展示在页面上。',
  loading: '页面尚未加载完成。',
};
