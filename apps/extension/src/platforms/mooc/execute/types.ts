/*
 * 一次执行的结果。
 *
 * 形状与 `AutoAction['kind']` 绑定：结果要能回指是哪一类事项，
 * 通知与设置页按它决定说法。
 */

import type { AutoAction } from '../plan';

/**
 * done    已自动完成
 * skipped 时机变了，这次不用做（比如自评已被完成）
 * failed  出错，需要人工看一眼
 */
export interface ExecResult {
  tid: number;
  name: string;
  kind: AutoAction['kind'];
  status: 'done' | 'skipped' | 'failed';
  /** 结果说明，会出现在通知里 */
  detail: string;
}
