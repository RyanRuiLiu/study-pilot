/*
 * 取数：填充用的选项索引、测验信息。
 *
 * 都经消息向后台取，不在内容脚本里建客户端（两个上下文各有一个节流器时
 * 互不知情，并发发请求会撞上平台的并发限制）；也不在这里加缓存层——
 * 节流与去重归 transport 一处管，本模块只在被调用时取。
 * 这两条都由用户点击驱动（填充、面板信息行），一次作答里各取一次。
 */

import type { AnswerIndex, QuizInfo } from '@study-pilot/platform-mooc';
import { sendToBackground } from '../../../messages.ts';

/**
 * 选项 id → 是否为正确答案（后台合并：题库打底、页面当前这份卷覆盖。
 * 详见平台的 buildFillIndex）。
 */
export async function loadAnswerIndex(tid: number, termId: number): Promise<AnswerIndex> {
  const outcome = await sendToBackground({ type: 'MOOC_QUIZ_FILL_INDEX', tid, termId });
  // 取不到就按空索引走：填充会如实报「没有答案」，而不是假装成功
  return new Map<string, boolean>(outcome.status === 'ok' ? Object.entries(outcome.value) : []);
}

/** 取测验信息（面板信息行用；只取一次，见 panel.ts 的 infoLoaded）。 */
export async function loadQuizInfo(tid: number): Promise<QuizInfo | null> {
  const outcome = await sendToBackground({ type: 'MOOC_QUIZ_INFO', tid });
  return outcome.status === 'ok' ? outcome.value : null;
}
