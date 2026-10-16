/*
 * 「查看答案」的取数（测验与考试统一）：页面在看哪一份卷，答案就从哪来。
 *
 * 取数与平台自己的页面逐步一致（实测 2026-10-17）：
 *   作答页  getQuizInfo{tid} 顶层 aid        → 取该卷（页面显示的就是这份）
 *   查看页  getQuizInfo{tid} targetAnswerform.aid → 取该卷（已提交的那份）
 * 答案只对**已提交**的卷下发（进行中的卷 submitStatus=1，withStdAnswerAndAnalyse
 * 也只回 null，实测），因此作答页的答案按题目 id 取自最近一份已提交的卷；
 * 抽不到的题如实没有答案。实现在包内 `loadViewAnswers`——全程只读，
 * 绝不 aid=0 新开一份（那在考试上等价于点「开始考试」）。
 */

import { loadViewAnswers } from '@study-pilot/platform-mooc';
import type { AnswersView } from '@study-pilot/platform-mooc';
import type { MessageHandler } from '../../../protocol.ts';
import type { MoocMessageDeps } from './deps.ts';
import type { MoocResponseMap } from './payload.ts';

function isView(value: unknown): value is AnswersView {
  return value === 'answering' || value === 'review';
}

export function paperAnswersCommand(deps: MoocMessageDeps): MessageHandler {
  return async (request, sendResponse) => {
    const { tid, view } = request as { tid?: number; view?: unknown };
    if (typeof tid !== 'number' || !Number.isFinite(tid) || !isView(view)) {
      sendResponse({ status: 'error', message: '请求缺少 tid 或 view' } satisfies MoocResponseMap['MOOC_PAPER_ANSWERS']);
      return;
    }

    const loaded = await loadViewAnswers(deps.client, tid, view);
    if (!loaded.ok) {
      sendResponse({ status: 'error', message: loaded.error.message } satisfies MoocResponseMap['MOOC_PAPER_ANSWERS']);
      return;
    }

    // 题面 + 该题的答案（没有答案的行 answer 为 null）原样交回注入端；
    // 主观题的标准答案在作业管线的评分点里（得分指导），不走这条。
    sendResponse({ status: 'ok', value: loaded.value } satisfies MoocResponseMap['MOOC_PAPER_ANSWERS']);
  };
}
