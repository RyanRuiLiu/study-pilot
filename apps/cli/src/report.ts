/*
 * 一轮结局的人话（只负责措辞，判断在用例层）。
 *
 * 与扩展共用同一个结局形状；命令行没有状态行，这一句就是用户看到的收尾。
 * 停止的一轮不能只说「完成 N 项」——那会让人以为整轮按计划做完了。
 */

import type { RoundResult } from '@study-pilot/application';

/** finished 结局的那一行；其它结局各有各的出口，不走这里。 */
export function finishedLine(result: Extract<RoundResult, { status: 'finished' }>): string {
  const base = `完成 ${result.done} 项，需手动处理 ${result.manual} 项`;
  return result.stopped ? `已停止：${base}` : base;
}
