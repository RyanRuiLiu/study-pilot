/*
 * 消息路由（外壳）。
 *
 * 只做三件事：等前台的消息、按 type 分发、把响应交回去。处理器由**平台**提供
 * （见各平台自己的 `messages/handlers.ts`），装配层把它们合并成一张表——
 * 因此新增平台不需要改这个文件。
 *
 * 唯一留在这里的业务是 RUN_SCHEDULED_TASKS（手动执行一轮）：那是**调度**，
 * 与自动执行走同一个 PlatformTasks 契约，不重复写一遍平台流程。
 *
 * 分发约定：请求对象的 `type` 即分支名，响应形状由 messaging 的 ResponseMap
 * 定义；未识别的请求回 undefined，前台据此报「后台无响应」。
 */

import type { AnySendResponse, AppRequest, MessageHandlers, SendResponse } from '../../messages.ts';
import type { PlatformTasks } from '../../platforms/types.ts';
import { beginRun, canStartRun, claimRun, finishRun, getTaskState, releaseRun, touchRun } from '../runtime/scheduler';
import { getRunState, requestStop } from '../runtime/run-state';

/** 装配层给出的东西：各平台的处理器表与要跑的平台。 */
export interface RouterDeps {
  /** 各平台的处理器表（装配层合并后给出；`*` 是兜底） */
  handlers: MessageHandlers;
  /** 手动执行一轮要跑的平台 */
  platforms: () => PlatformTasks[];
}

/**
 * 手动执行一轮。
 *
 * 与自动执行同一条契约，只是不受「今天拉过没有」约束——用户点这个按钮的
 * 意图就是「现在去做」。中断标志先清干净，但「正在执行」的判定要保留：
 * 并发起两轮会重复写平台。
 */
async function runOnce(deps: RouterDeps, sendResponse: SendResponse<'RUN_SCHEDULED_TASKS'>): Promise<void> {
  const now = Date.now();
  const state = await getTaskState();
  if (!canStartRun(state, now) || !claimRun()) {
    sendResponse({ ok: false, reason: 'ALREADY_RUNNING' });
    return;
  }

  await beginRun(now);
  try {
    let done = 0;
    let manual = 0;
    let blocked = false;
    const failed: Array<{ name: string; detail: string }> = [];

    for (const platform of deps.platforms()) {
      if (!(await platform.isReady())) {
        sendResponse({ ok: false, reason: 'NOT_LOGGED_IN' });
        return;
      }

      // 与自动执行同一套：每一步之前刷心跳，理由见 autoRun 里的说明
      await touchRun();
      const plan = await platform.plan(now, { force: true });
      if (plan.needsLogin === true) {
        sendResponse({ ok: false, reason: 'NOT_LOGGED_IN' });
        return;
      }
      if (plan.blocked === 'no-course') {
        blocked = true;
        continue;
      }

      manual += plan.items.filter((item) => item.mode !== 'auto').length;
      for (const item of plan.items) {
        if (item.mode !== 'auto') continue;
        const outcome = await platform.run(item, touchRun);
        if (outcome.status === 'done') done += 1;
        if (outcome.status === 'failed') {
          failed.push({ name: item.title, detail: outcome.message ?? '平台拒绝了这次操作' });
        }
        await touchRun();
      }
    }

    if (done === 0 && failed.length === 0 && manual === 0) {
      if (blocked) {
        sendResponse({ ok: false, reason: 'NO_SELECTED_COURSE' });
        return;
      }
      sendResponse({ ok: true, done: 0, manual: 0, message: '没有可自动完成的事项' });
      return;
    }

    sendResponse({ ok: true, done, manual, ...(failed.length > 0 ? { failed } : {}) });
  } finally {
    await finishRun();
    releaseRun();
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
      if (request?.type === 'STOP_PLATFORM_RUN') {
        await requestStop(request.platformId);
        sendResponse({ ok: true });
        return;
      }
      if (request?.type === 'RUN_SCHEDULED_TASKS') {
        await runOnce(deps, sendResponse);
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
