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

import { err, ok } from '@study-pilot/core';
import { apiError } from '@study-pilot/transport';
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
  async run(client, unit, context) {
    const paper = await getQuizPaper(client, unit.contentId, 0);
    if (!paper.ok) return paper;

    /*
     * 答案索引来自题库：优先用调用方给的整轮缓存（同一门课的随堂测验与
     * 单元测验共用一份），没有就现读一次。
     */
    let index: Map<string, boolean> | null;
    if (context.bank !== undefined) {
      index = await context.bank.get(client, unit.termId);
    } else {
      const bank = await getQuizBank(client, unit.termId);
      index = bank.ok ? buildAnswerIndex(bank.value) : null;
    }
    if (index === null) return err(apiError(-1, '题库读取失败，无法核对答案'));

    /*
     * 只有一条路径：取卷 → 组答案 → 交卷 → 报完成。
     *
     * 因此答案组不齐时**返回失败**，不退化成「只标完成」——那样会留下
     * 一条没有作答记录的「已学」，与真人的痕迹对不上，而界面上看不出来。
     * 失败会在下一轮重试，仍不齐就交人工。
     */
    const built = buildAnswers(paper.value, index);
    if (built.total === 0) {
      return err(apiError(-1, '这份随堂测验没有客观题，无法按唯一路径作答'));
    }
    if (built.unresolved.length > 0) {
      return err(
        apiError(-1, `${built.unresolved.length} 道题在题库中找不到答案，未作答以免留下残缺记录`),
      );
    }

    const submitted = await submitQuiz(client, paper.value);
    if (!submitted.ok) return submitted;

    const result = await postLearnInfo(client, completionDto(unit));
    return result.ok ? ok('reported') : result;
  },
};
