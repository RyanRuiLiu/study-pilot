/*
 * 执行范围的分类：哪些类别归「待办」，哪些归「课件」。界面共用这一处。
 *
 * 类别字符串由平台定义（慕课是 quiz / review / self / homework / exam /
 * courseware），核心只做字符串比较（见 application 的 round.ts）。
 * 界面这一侧需要回答的问题是「待办页发哪些、课件页发哪些」——
 * 新增一个计划类别时，必须在这里表态它属于哪边；不说的话它会两边都不进，
 * 点执行时静默消失。全项目只有这一处做这个分派。
 */

/**
 * 待办那几类：能提交或能评分的工作项。
 * 弹窗的「全部执行」按它发范围；「需你处理」的计数也只数这些。
 */
export const PENDING_KINDS: string[] = ['quiz', 'review', 'self', 'homework', 'exam'];

/** 课件那几类：设置页课件区的「快速完成」按它发范围。 */
export const COURSEWARE_KINDS: string[] = ['courseware'];
