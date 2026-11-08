/*
 * MOOC_NEW_EXAM_PAPER：新版考试答卷页取卷。
 *
 * 只读两步（getNewExam 查 draftAid → getPaper），绝不建卷；judgeDtos（评分点）
 * 与选项序都在响应里。与做题助手的填充索引（MOOC_QUIZ_FILL_INDEX，移动端
 * 答案通道）配合使用：paper 出选项序，索引出正确标记。
 */

import { getNewExamPaper } from '@study-pilot/platform-mooc';
import type { MessageHandler } from '../../../protocol.ts';
import type { MoocMessageDeps } from './deps.ts';
import type { MoocResponseMap } from './payload.ts';

export function newExamPaperCommand(deps: MoocMessageDeps): MessageHandler {
  return async (request, sendResponse) => {
    const { examId } = request as { examId?: unknown };
    if (typeof examId !== 'number' || !Number.isFinite(examId)) {
      sendResponse({
        status: 'error',
        message: '请求缺少 examId',
      } satisfies MoocResponseMap['MOOC_NEW_EXAM_PAPER']);
      return;
    }

    const paper = await getNewExamPaper(deps.client, examId);
    if (!paper.ok) {
      sendResponse({ status: 'error', message: paper.error.message } satisfies MoocResponseMap['MOOC_NEW_EXAM_PAPER']);
      return;
    }
    sendResponse({ status: 'ok', value: paper.value } satisfies MoocResponseMap['MOOC_NEW_EXAM_PAPER']);
  };
}
