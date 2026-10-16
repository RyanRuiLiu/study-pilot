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
import { buildAnswersWithBank, getQuizPaper, submitQuiz } from '../quiz.ts';
import { UNIT_TYPE } from '../types.ts';
import type { UnitBehavior } from './behavior.ts';
import { completionDto, postLearnInfo } from './reports.ts';

export const unitQuizBehavior: UnitBehavior = {
  type: UNIT_TYPE.QUESTION,
  ready: (unit) => unit.contentId > 0,
  async run(client, unit) {
    const paper = await getQuizPaper(client, unit.contentId, 0);
    if (!paper.ok) return paper;

    /*
     * 只有一条路径：取卷（答案随卷面）→ 组答案 → 交卷 → 报完成。
     *
     * 因此答案组不齐时**返回失败**，不退化成「只标完成」——那样会留下
     * 一条没有作答记录的「已学」，与真人的痕迹对不上，而界面上看不出来。
     * 失败会在下一轮重试，仍不齐就交人工。
     */
    /*
     * 含主观题的卷不自动交：主观题平台不给标准答案（评分标准也要人工判），
     * 只交客观部分等于留下一份残缺答卷——与「只写一半就交」同罪。
     */
    const subjective = (paper.value.subjectiveQList ?? []).length;
    if (subjective > 0) {
      return err(apiError(-1, `这份随堂测验含 ${subjective} 道主观题，需人工作答，不自动提交`));
    }

    // 卷面自带答案直接用；没带（未提交的单元测验）按 termId 用题库补
    const builtResult = await buildAnswersWithBank(client, unit.termId, paper.value);
    if (!builtResult.ok) return builtResult;
    const built = builtResult.value;
    if (built.total === 0) {
      return err(apiError(-1, '这份随堂测验没有客观题，无法按唯一路径作答'));
    }
    if (built.unresolved.length > 0) {
      return err(
        apiError(-1, `${built.unresolved.length} 道题取不到答案（卷面既无正确选项标记、也无标准答案），未作答以免留下残缺记录`),
      );
    }

    const submitted = await submitQuiz(client, paper.value);
    if (!submitted.ok) return submitted;

    const result = await postLearnInfo(client, completionDto(unit));
    return result.ok ? ok('reported') : result;
  },
};
