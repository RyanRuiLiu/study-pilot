/*
 * 随堂测验单元。
 *
 * 真人的行为（`TestUnit`，modules/e7089a68…js）：
 *   1. 打开单元即标记完成（`__buildAndTrack('view')`）；
 *   2. 点「提交」时把答案填进 `paperVo.answers`，调
 *      `mocQuizRpcBean.submitAnswers.rpc`（body `{paperDto, preview}`）——
 *      **作答记录由此产生**，我们此前只做了第 1 步。
 *
 * 答案来自课程题库，与单元测验同一套（`buildAnswerIndex` + `buildAnswers`）：
 * 题库里每道题的选项带 `answer` 标记，试卷选项与题库选项是同一套 id。
 *
 * 有题在题库里找不到答案时**不提交**：只写一半就交不是真人的行为，
 * 而平台会据此留下一条低分记录。此时仍照常标记完成（完成本就与作答无关）。
 */

import { ok } from '@study-pilot/core';
import {
  buildAnswerIndex,
  buildAnswers,
  getQuizBank,
  getQuizPaper,
  submitQuiz,
} from '../quiz.ts';
import { UNIT_TYPE } from '../types.ts';
import type { UnitBehavior } from './behavior.ts';
import { completionDto, postLearnInfo } from './reports.ts';

export const unitQuizBehavior: UnitBehavior = {
  type: UNIT_TYPE.QUESTION,
  ready: (unit) => unit.contentId > 0,
  async run(client, unit) {
    const paper = await getQuizPaper(client, unit.contentId, 0);
    if (!paper.ok) return paper;

    const bank = await getQuizBank(client, unit.termId);
    if (!bank.ok) return bank;

    const built = buildAnswers(paper.value, buildAnswerIndex(bank.value));
    if (built.total > 0 && built.unresolved.length === 0) {
      const submitted = await submitQuiz(client, paper.value);
      if (!submitted.ok) return submitted;
    }

    const result = await postLearnInfo(client, completionDto(unit));
    return result.ok ? ok('reported') : result;
  },
};
