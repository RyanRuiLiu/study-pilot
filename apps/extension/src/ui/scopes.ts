/*
 * 执行范围的分类：待办页发哪些类别。界面共用这一处。
 *
 * 类别字符串由平台定义（慕课是 quiz / review / self / homework / exam），
 * 核心只做字符串比较（见 application 的 round.ts）。新增一个待办类别时，
 * 必须在这里表态它归「待办」；不说的话它会不进弹窗的「全部执行」，
 * 点执行时静默消失。
 *
 * 课件页不在这里：它的「执行」按这门课的**条目 id** 收窄（见 options/courseware.ts）——
 * 同名课程（重选后的另一个学期）不能靠类别名或课程名分开。
 */

/**
 * 待办那几类：能提交或能评分的工作项。
 * 弹窗的「全部执行」按它发范围；「需手动完成」的计数也只数这些。
 */
export const PENDING_KINDS: string[] = ['quiz', 'review', 'self', 'homework', 'exam'];
