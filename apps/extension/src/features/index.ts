/*
 * 前台功能。
 *
 * 每个模块导出幂等的「挂载」与「卸载」函数，由内容脚本按路由与配置反复调用。
 * 模块内部不读取配置，配置判断集中在内容脚本，便于一眼看清各功能何时生效。
 *
 * 幂等是硬性要求：内容脚本用 MutationObserver 观察页面，页面每次变化都会重新
 * 评估一遍，因此任何挂载动作都必须能安全地重复执行。
 */

export { showQuizHelper, removeQuizHelper, type QuizHelperOptions } from './quiz-helper';
export { injectHomeworkAnswers, removeHomeworkAnswers, isReviewMode } from './homework-answers';
export {
  detectQuizStage,
  probeQuizStage,
  STAGE_DESCRIPTIONS,
  type QuizStage,
  type QuizStageProbe,
} from './quiz-stage';
export { SELECTORS, CLASS_ANALYSIS_MODE } from './selectors';
