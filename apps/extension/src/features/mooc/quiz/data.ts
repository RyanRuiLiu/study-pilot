/*
 * 取数：填充用的答案、测验信息。
 *
 * 都经消息向后台取，不在内容脚本里建客户端（两个上下文各有一个节流器时
 * 互不知情，并发发请求会撞上平台的并发限制）；也不在这里加缓存层——
 * 节流与去重归 transport 一处管，本模块只在被调用时取。
 * 这两条都由用户点击驱动（填充、面板信息行），一次作答里各取一次。
 */

import type { QuizInfo } from '@study-pilot/platform-mooc';
import { sendToBackground } from '../../../messages.ts';

/** 面板填充要的答案：选项 id 查选择类，blanks 按显示顺序查填空类。 */
export interface FillAnswers {
  options: Map<string, boolean>;
  blanks: Array<string | null>;
}

/**
 * 答案来自后台的 buildFillIndex（与提交同一份 resolveAnswers）。
 *
 * 取数失败时把原因原样交回（例如平台限流）：由面板如实显示，
 * **不在这里吞成「空答案」**——那会把限流说成「没有答案」。
 */
export type FillAnswersOutcome =
  | { ok: true; value: FillAnswers }
  | { ok: false; message: string };

export async function loadFillAnswers(tid: number, termId: number): Promise<FillAnswersOutcome> {
  const outcome = await sendToBackground({ type: 'MOOC_QUIZ_FILL_INDEX', tid, termId });
  if (outcome.status !== 'ok') return { ok: false, message: outcome.message };
  return {
    ok: true,
    value: {
      options: new Map(Object.entries(outcome.value.options)),
      blanks: outcome.value.blanks,
    },
  };
}

/** 取测验信息（面板信息行用；只取一次，见 panel.ts 的 infoLoaded）。 */
export async function loadQuizInfo(tid: number): Promise<QuizInfo | null> {
  const outcome = await sendToBackground({ type: 'MOOC_QUIZ_INFO', tid });
  return outcome.status === 'ok' ? outcome.value : null;
}
