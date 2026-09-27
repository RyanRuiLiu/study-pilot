/*
 * 页面选择器。
 *
 * 只保留作业页答案注入用到的选择器。做题页助手走接口，不依赖页面结构，
 * 因此这里不再记录任何选项相关的选择器。
 *
 * 全部取自线上 bundle 的模板取证与真实页面采集，来源见
 * docs/platforms/mooc.md 第 6 节。平台改版后先重跑探测工具核对，再改本文件。
 */

export const SELECTORS = {
  /** 题目容器。作业页与做题页共用此基类 */
  questionItem: '.u-questionItem',

  /** 题干富文本。题干不在 .j-title 的直接文本里 */
  richText: '.j-richTxt',

  /** 作业题的作答区 */
  answerArea: '.j-answer',

  /** 互评模块。出现在已提交的作业页与互评页 */
  evaluateModule: '.j-evaluate',
} as const;

/** 批改模式的标记类。带有它的题目说明该卷已批改，页面上已展示答案 */
export const CLASS_ANALYSIS_MODE = 'analysisMode';
