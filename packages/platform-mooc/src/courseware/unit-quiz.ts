/*
 * 随堂测验单元。
 *
 * 真人的行为（`TestUnit`，modules/e7089a68…js）：
 *   1. 打开单元即标记完成（`__buildAndTrack('view')`）；
 *   2. 点「提交」时把答案填进 `paperVo.answers`，调
 *      `mocQuizRpcBean.submitAnswers.rpc`（body `{paperDto, preview}`）——
 *      **作答记录由此产生**，我们此前只做了第 1 步。
 *
 * 答案来自卷面自身（2026-10-17 换接口）：取卷带 `withStdAnswerAndAnalyse: true`，
 * 选项类看 `optionDtos[].answer`、填空类看 `stdAnswer`，见 quiz.ts 的 buildAnswers。
 *
 * 取不到答案的题**不提交**：只写一半就交不是真人的行为，而平台会据此留下
 * 一条低分记录。此时整体失败（哪道题取不到在文案里说清），不猜、不用
 * 题干文本做匹配（Ryan：禁止不确定的匹配）。
 */

import { err, ok } from '@study-pilot/core';
import { apiError } from '@study-pilot/transport';
import { answerAndSubmitQuiz } from '../quiz.ts';
import type { MoocClient } from '../client.ts';
import { UNIT_TYPE } from '../types.ts';
import type { UnitBehavior } from './behavior.ts';
import { completionDto, postLearnInfo } from './reports.ts';

export const unitQuizBehavior: UnitBehavior = {
  type: UNIT_TYPE.QUESTION,
  ready: (unit) => unit.contentId > 0,
  async run(client, unit) {
    /*
     * 只有一条路径：作答并提交（唯一实现见 quiz.ts 的 answerAndSubmitQuiz，
     * 做题助手的提交按钮走同一个函数）→ 报完成。
     *
     * 因此答案组不齐、含主观题等情况一律返回失败，不退化成「只标完成」——
     * 那样会留下一条没有作答记录的「已学」，与真人的痕迹对不上。
     * 失败会在下一轮重试，仍不齐就交人工。
     */
    const outcome = await answerAndSubmitQuiz(client, unit.contentId, unit.termId);

    if (outcome.status === 'failed') return err(apiError(-1, outcome.message));
    if (outcome.status === 'no-objective') {
      return err(apiError(-1, '这份随堂测验没有客观题，无法按唯一路径作答'));
    }

    const result = await postLearnInfo(client, completionDto(unit));
    return result.ok ? ok('reported') : result;
  },
};
