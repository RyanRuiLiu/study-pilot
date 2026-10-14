/*
 * 页面选择器。
 *
 * 只保留作业页得分指导注入用到的选择器。全部取自线上 bundle 的模板取证与
 * 真实页面采集；平台改版后先重跑探测工具核对，再改本文件。
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
