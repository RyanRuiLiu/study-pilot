/*
 * 智慧树的四个板块（设计文档 §2.1，2026-10-17 Ryan 定案）：
 *
 *     教程视频 → 单元测试 → 见面课 → 期末考试
 *
 * 顺序是**平台自己的顺序**；设置页与弹窗共用这一份（早先「弹窗按紧迫度、
 * 设置页按成绩构成」的分工已废，`2be49df` 那条「组内测试在前」随之作废）。
 *
 * 可见性：**设置页四板块恒在**（数据没接入的那块显示卡 + 如实一句）；
 * **弹窗只显有活的板块**——「活」的判据在数据层给（待办条目本身就是按活的
 * 条件收进来的，空的板块自然没有条目）。这里只定义板块本身与它收哪些类别。
 */

/** 类别字符串由平台包定义（`ZhsPendingKind`）；这里是板块与类别的唯一映射处。 */
export const ZHS_BOARDS = [
  { id: 'video', title: '教程视频', kinds: ['courseware'] },
  { id: 'quiz', title: '单元测试', kinds: ['quiz'] },
  { id: 'meet', title: '见面课', kinds: ['meetWatch', 'meetQuiz'] },
  { id: 'final', title: '期末考试', kinds: ['finalExam'] },
] as const;

export type ZhsBoardId = (typeof ZHS_BOARDS)[number]['id'];

/** 一个待办类别落在哪个板块。未知类别返回 null（如实不落，不硬塞进某块）。 */
export function boardOfKind(kind: string): ZhsBoardId | null {
  const board = ZHS_BOARDS.find((candidate) => (candidate.kinds as readonly string[]).includes(kind));
  return board?.id ?? null;
}

/**
 * 类别在板块序里的位置（弹窗组内排序用）。
 * 不属于任何板块的排在最后——排到已知板块前面会让人以为它也是一类任务。
 */
export function boardOrder(kind: string): number {
  const id = boardOfKind(kind);
  if (id === null) return ZHS_BOARDS.length;
  return ZHS_BOARDS.findIndex((board) => board.id === id);
}
