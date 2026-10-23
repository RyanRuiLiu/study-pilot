/*
 * 做题助手（页内面板）要用的三条调用。
 *
 *   填充索引  buildFillIndex{tid, termId}——选项 id 是否为正确答案，只读，
 *             绝不新开卷（aid = 0 在平台上等价于点「开始测验」）
 *   测验信息  getQuizInfo{tid}——面板信息行（总分）
 *   提交      answerAndSubmitQuiz{tid, termId}——与一键执行**同一份**实现：
 *             主观题守卫、取不到答案一道都不交，两处判据不允许分叉
 *
 * 放在后台的理由同其他取数：内容脚本不持客户端，节流只有一处；写请求也只从
 * 后台发出（两边各写会撞平台的并发限制）。
 */

import {
  answerAndSubmitQuiz,
  buildFillIndex,
  exchangeUrsTokenForMobToken,
  getQuizInfo,
  fetchMobToken,
} from '@study-pilot/platform-mooc';
import type { MessageHandler } from '../../../protocol.ts';
import type { MoocMessageDeps } from './deps.ts';
import type { MoocResponseMap } from './payload.ts';

function readNumbers(request: unknown): { tid: number | null; termId: number | null } {
  const { tid, termId } = request as { tid?: unknown; termId?: unknown };
  return {
    tid: typeof tid === 'number' && Number.isFinite(tid) ? tid : null,
    termId: typeof termId === 'number' && Number.isFinite(termId) ? termId : null,
  };
}

export function quizFillIndexCommand(deps: MoocMessageDeps): MessageHandler {
  return async (request, sendResponse) => {
    const { tid, termId } = readNumbers(request);
    if (tid === null || termId === null) {
      sendResponse({ status: 'error', message: '请求缺少 tid 或 termId' } satisfies MoocResponseMap['MOOC_QUIZ_FILL_INDEX']);
      return;
    }

    const index = await buildFillIndex(deps.client, tid, termId);
    if (!index.ok) {
      sendResponse({ status: 'error', message: index.error.message } satisfies MoocResponseMap['MOOC_QUIZ_FILL_INDEX']);
      return;
    }

    // Map 过不了消息通道，转成普通对象交回
    sendResponse({
      status: 'ok',
      value: { options: Object.fromEntries(index.value.options), blanks: index.value.blanks },
    } satisfies MoocResponseMap['MOOC_QUIZ_FILL_INDEX']);
  };
}

export function quizInfoCommand(deps: MoocMessageDeps): MessageHandler {
  return async (request, sendResponse) => {
    const { tid } = readNumbers(request);
    if (tid === null) {
      sendResponse({ status: 'error', message: '请求缺少 tid' } satisfies MoocResponseMap['MOOC_QUIZ_INFO']);
      return;
    }

    const info = await getQuizInfo(deps.client, tid);
    if (!info.ok) {
      sendResponse({ status: 'error', message: info.error.message } satisfies MoocResponseMap['MOOC_QUIZ_INFO']);
      return;
    }

    sendResponse({ status: 'ok', value: info.value } satisfies MoocResponseMap['MOOC_QUIZ_INFO']);
  };
}

export function quizSubmitCommand(deps: MoocMessageDeps): MessageHandler {
  return async (request, sendResponse) => {
    const { tid, termId } = readNumbers(request);
    if (tid === null || termId === null) {
      sendResponse({ status: 'error', message: '请求缺少 tid 或 termId' } satisfies MoocResponseMap['MOOC_QUIZ_SUBMIT']);
      return;
    }

    const outcome = await answerAndSubmitQuiz(deps.client, tid, termId);
    if (outcome.status !== 'submitted') {
      // 没有客观题 / 停止 / 失败：把说法原样交给面板
      const message = outcome.status === 'failed' ? outcome.message : '这份测验现在不适合提交';
      sendResponse({ status: 'error', message } satisfies MoocResponseMap['MOOC_QUIZ_SUBMIT']);
      return;
    }

    sendResponse({
      status: 'ok',
      value: { matched: outcome.matched, total: outcome.total },
    } satisfies MoocResponseMap['MOOC_QUIZ_SUBMIT']);
  };
}

export function mobileRefreshCommand(deps: MoocMessageDeps): MessageHandler {
  return async (request, sendResponse) => {
    const { ursToken } = request as { ursToken?: unknown };
    if (typeof ursToken !== 'string' || ursToken.trim() === '') {
      sendResponse({ status: 'error', message: '请求缺少 ursToken' } satisfies MoocResponseMap['MOOC_MOBILE_REFRESH']);
      return;
    }

    const result = await exchangeUrsTokenForMobToken(deps.client, ursToken);
    if (!result.ok) {
      sendResponse({
        status: 'error',
        message: `换取 mob-token 失败：${result.error.message}`,
      } satisfies MoocResponseMap['MOOC_MOBILE_REFRESH']);
      return;
    }

    sendResponse({ status: 'ok', value: { token: result.value } } satisfies MoocResponseMap['MOOC_MOBILE_REFRESH']);
  };
}

export function fetchMobTokenCommand(deps: MoocMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    const result = await fetchMobToken(deps.client);
    if (!result.ok) {
      sendResponse({ status: 'error', message: result.error.message } satisfies MoocResponseMap['MOOC_FETCH_MOB_TOKEN']);
      return;
    }
    sendResponse({ status: 'ok', value: { token: result.value } } satisfies MoocResponseMap['MOOC_FETCH_MOB_TOKEN']);
  };
}
