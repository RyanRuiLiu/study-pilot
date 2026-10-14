/*
 * 取一份作业卷的题目，供得分指导注入用。
 *
 * 为什么放在后台：内容脚本不持客户端。两个上下文各有一个节流器时互不知情，
 * 并发发请求会撞平台的并发限制；把取数集中到后台，节流也只有一处。
 *
 * 作业的取卷两步：getHomeworkInfo 拿到 aid 与互评阶段，getHomeworkPaper 取卷。
 * 分数依据在 `subjectiveQList[].judgeDtos[]`（实测）。
 */

import {
  currentEvaluatePhase,
  getHomeworkInfo,
  getHomeworkPaper,
} from '@study-pilot/platform-mooc';
import type { MessageHandler } from '../../../protocol.ts';
import type { MoocMessageDeps } from './deps.ts';
import type { MoocResponseMap } from './payload.ts';

export function homeworkPaperCommand(deps: MoocMessageDeps): MessageHandler {
  return async (request, sendResponse) => {
    const { tid } = request as { tid?: number };
    if (typeof tid !== 'number' || !Number.isFinite(tid)) {
      sendResponse({
        status: 'error',
        message: '请求缺少 tid',
      } satisfies MoocResponseMap['HOMEWORK_PAPER']);
      return;
    }

    const info = await getHomeworkInfo(deps.client, tid);
    if (!info.ok) {
      sendResponse({ status: 'error', message: info.error.message } satisfies MoocResponseMap['HOMEWORK_PAPER']);
      return;
    }

    const paper = await getHomeworkPaper(deps.client, tid, {
      aid: info.value.aid ?? undefined,
      phase: currentEvaluatePhase(info.value),
    });
    if (!paper.ok) {
      sendResponse({ status: 'error', message: paper.error.message } satisfies MoocResponseMap['HOMEWORK_PAPER']);
      return;
    }

    sendResponse({
      status: 'ok',
      value: paper.value.subjectiveQList ?? paper.value.objectiveQList ?? [],
    } satisfies MoocResponseMap['HOMEWORK_PAPER']);
  };
}
