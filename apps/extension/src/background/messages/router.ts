/*
 * 消息路由（外壳）。
 *
 * 只做三件事：等前台的消息、按 type 分发、把响应交回去。处理器由**平台**提供
 * （见各平台自己的 `messages/handlers.ts`），装配层把它们合并成一张表——
 * 因此新增平台不需要改这个文件。
 *
 * 唯一留在这里的业务是 RUN_SCHEDULED_TASKS（手动执行一轮）：流程不在这里——它和自动
 * 执行是同一个用例（@study-pilot/application 的 runRound），这里只把结局翻成消息响应。
 *
 * 分发约定：请求对象的 `type` 即分支名，响应形状由 messaging 的 ResponseMap
 * 定义；未识别的请求回 undefined，前台据此报「后台无响应」。
 */

import type {
  AnySendResponse,
  AppRequest,
  MessageHandlers,
  RunScheduledTasksResponse,
} from '../../messages.ts';
import type { RoundResult, Runner } from '@study-pilot/application';
import { getRunState } from '../runtime/run-state';

/** 装配层给出的东西：各平台的处理器表，以及接好端口的 runner。 */
export interface RouterDeps {
  /** 各平台的处理器表（装配层合并后给出；`*` 是兜底） */
  handlers: MessageHandlers;
  /** 「跑一轮」用例。手动与自动走同一个 runner，只是 mode 不同 */
  runner: Runner;
}

/**
 * 一行结局 → 一条消息响应。
 *
 * 只翻译、不判断：什么算「正在执行」、什么算「没有可做的事」，都是 runRound 的
 * 返回值说了算，这里不许重新推一遍。
 */
function respondToRound(result: RoundResult): RunScheduledTasksResponse {
  switch (result.status) {
    case 'rejected':
      return { ok: false, reason: 'ALREADY_RUNNING' };
    case 'not-logged-in':
      return { ok: false, reason: 'NOT_LOGGED_IN' };
    case 'no-course':
      return { ok: false, reason: 'NO_SELECTED_COURSE' };
    case 'nothing-to-do':
      return { ok: true, done: 0, manual: 0, message: '没有可自动完成的事项' };
    case 'finished':
      return {
        ok: true,
        done: result.done,
        manual: result.manual,
        ...(result.failed.length > 0 ? { failed: result.failed } : {}),
      };
    case 'failed':
      return { ok: false, reason: 'FETCH_FAILED', message: result.message };
    case 'disabled':
      // 手动执行不看总开关（用户明确要求），因此这条分支不该出现
      return { ok: false, reason: 'FETCH_FAILED', message: '这一轮没有执行' };
  }
}

export function registerMessageHandler(deps: RouterDeps): void {
  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    const request = message as AppRequest | undefined;

    void (async () => {
      if (request?.type === 'RUN_STATE') {
        sendResponse(await getRunState());
        return;
      }
      if (request?.type === 'RUN_SCHEDULED_TASKS') {
        sendResponse(respondToRound(await deps.runner.runRound('manual')));
        return;
      }

      // 处理器表里没有这个 type 就用兜底；兜底也说处理不了就回 undefined
      const fallback = deps.handlers['*'];
      const handler = request === undefined ? fallback : (deps.handlers[request.type] ?? fallback);
      await handler(request as AppRequest, sendResponse as AnySendResponse);
    })().catch((error: unknown) => {
      /*
       * 兜底响应只能报「失败」，不能报「未登录」。
       *
       * 曾经这里把任何异常都包成 NOT_LOGGED_IN：一个与登录毫无关系的存储异常
       * 会让界面显示「尚未登录」，用户于是去重复登录——症状被替换成了另一个
       * 错误答案。未登录只能由明确判定它的分支返回。
       */
      sendResponse({ ok: false, reason: 'FETCH_FAILED', message: String(error) });
    });

    // 异步响应，保持消息通道打开
    return true;
  });
}
