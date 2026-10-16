/*
 * 慕课的消息载荷与命令形状。
 *
 * 这些类型与慕课的字段与叫法绑定（状态说法、考试 id、跳转前缀），因此归平台所有，
 * 不放在外壳里——外壳只该知道"有个平台"，不该知道某一条命令的载荷长什么样。
 *
 * 外壳的通用部分（查询结果、拒绝原因、运行状态形状、处理器签名）在 src/protocol.ts；
 * 把两边合起来的唯一装配点是 src/messages.ts。
 */

import type { QueryOutcome, JobRejection } from '../../../protocol.ts';
import type { CoursewareProgress, MoocSession, OpenQuizInfo, PaperQuestion } from '@study-pilot/platform-mooc';

/**
 * 单元状态。平台的叫法，不自创。
 *
 * 它是消息里 status 字段的取值集合，前后台必须按同一套说法来。放在这里而不是
 * 判断逻辑那一侧：界面要用就得跨层导入，或者——更容易发生的事——直接在界面上写死
 * 字符串，那样平台改说法时界面会静默失效。
 */
export const WORK_STATUS = {
  /** 还没做，截止还没到 */
  UNSUBMITTED: '未提交',
  /** 还没做，但截止已过，平台上没法再做了 */
  OVERDUE: '已过截止未提交',
  /** 交了，互评期中且还没评够份数 */
  REVIEWING: '互评阶段',
  /** 交了，互评期中且已评够份数。分数此时已确定，只等公布 */
  REVIEWED: '互评已完成',
  /** 交了，互评期已过，成绩还没出 */
  WAITING: '等待成绩公布',
  /** 成绩已出 */
  SCORED: '成绩已公布',
} as const;

export type WorkStatus = (typeof WORK_STATUS)[keyof typeof WORK_STATUS];

/**
 * 待办类别。
 *
 * 互评与自评分开：前者是给同学的作业打分，后者是给自己的作业打分。
 * 两者虽然都在互评期开放、走同一套接口，但对用户是两件事。
 */
export type PendingKind =
  | 'submit-quiz'
  | 'submit-homework'
  | 'evaluate-homework'
  | 'self-evaluate'
  | 'submit-exam';

/**
 * 待办事项。
 *
 * 一条待办要能回答两个问题：这件事是什么（kind）、它会被怎么处理（handling）。
 * overdue 与 handling 是两个维度，不合并：一件已过截止的测验既不能自动处理，
 * 也不能由用户补做——平台就是不接受了。
 */
export interface PendingEntry {
  kind: PendingKind;
  /**
   * 计划项 id（执行侧的唯一凭据，取名规则在平台包里）。
   * 一个条目可以带多条：同一份作业的互评与自评合成一行，
   * 点「执行」时一起发回——界面不自己拼 id。
   */
  itemIds: string[];
  /** auto：点一下就能替你完成；manual：只能用户自己来 */
  handling: 'auto' | 'manual';
  /** 是否已过截止（过期的不接受补做，列出来只是让用户知道漏了什么） */
  overdue: boolean;
  /** 跳转地址；由平台拼好，外壳不拼 URL */
  href: string;
  testId: number;
  courseName: string;
  chapterName: string;
  name: string;
  /** 考试自身的 id，仅考试有；拼答卷页地址用 */
  examId: number | null;
  /** 该单元当前状态，取值与单元明细完全相同（同一件事只有一种说法） */
  status: string;
  /** 该状态的含义，用于悬停提示，与明细同源 */
  statusDetail: string;
  /** 该看哪个截止时间（待提交看提交截止，待互评看互评截止）；0 表示平台未提供 */
  deadline: number;
  /** 互评已完成份数；非互评类为 null */
  evaluateDone: number | null;
  /** 互评配额；非互评类为 null */
  evaluateTotal: number | null;
  /** 跳转所需的课程定位信息 */
  course: {
    courseId: number;
    schoolShortName: string;
    mode: number;
    termId: number;
  };
}

/** 待办汇总：计数用于概览，明细用于列表。 */
export interface PendingSummary {
  /** 读取时刻（毫秒） */
  fetchedAt: number;
  auto: number;
  manual: number;
  overdue: number;
  /** 明细，按截止时间升序 */
  entries: PendingEntry[];
}


// ---------- 本平台的命令 ----------

/** 慕课自己的请求。外壳的命令（跑一轮、运行状态等）不在这里。 */
export type MoocRequest =
  /** 查询当前登录态 */
  | { type: 'MOOC_SESSION' }
  /** 读取已保存的课程列表（只读本地配置） */
  | { type: 'MOOC_COURSES' }
  /** 去平台重新拉一次课程列表并写回配置 */
  | { type: 'MOOC_REFRESH_COURSES' }
  /** 要交的东西（测验/作业/互评/自评/考试） */
  | { type: 'MOOC_PENDING_SUMMARY' }
  /** 课件进度：每门课的完成计数（只读） */
  | { type: 'MOOC_COURSEWARE_SUMMARY' }
  /** 一份作业卷的题目（得分指导注入用） */
  | { type: 'MOOC_HOMEWORK_PAPER'; tid: number }
  /**
   * 做题助手的三条调用（面板在作答页上）。
   *
   * 填充索引只读、绝不新开卷；提交与一键执行共用平台包的 answerAndSubmitQuiz。
   */
  | { type: 'MOOC_QUIZ_FILL_INDEX'; tid: number; termId: number }
  | { type: 'MOOC_QUIZ_INFO'; tid: number }
  | { type: 'MOOC_QUIZ_SUBMIT'; tid: number; termId: number }
;

/** 课程列表里的一条：界面只需要名字与 termId 用来显示与勾选。 */
export interface CourseBrief {
  courseId: number;
  name: string;
  termId: number;
  startTime: number | null;
  endTime: number | null;
  publishStatus: number | null;
}

/**
 * 设置页一次读取的产物：课件计数 + 待交计数。
 *
 * 两者由同一份快照现算（同一次读取、同一套判据），因此合成一个响应——
 * 账号与课程卡里的状态行同时要这两个数，页面发一条消息就够。先前它们是
 * 两条消息各读一遍快照，又在同一条串行节流上排队，设置页一开要等 4 秒多
 * （实测 2026-10-15，两个读取各 2 秒、14 个请求排成一队）。
 */
export interface CoursewareSummary {
  /** 每门课一行的课件完成计数（与课件区显示的是同一份） */
  courses: CoursewareProgress[];
  /** 待交计数：待办列表（PENDING_SUMMARY）的同一套判据，取两项计数 */
  pending: { auto: number; manual: number };
}

/** 每条请求对应的响应。请求的 type 同时是这里的键，改一半会被类型检查拦下。 */
export interface MoocResponseMap {
  MOOC_SESSION: MoocSession;
  MOOC_COURSES: CourseBrief[];
  MOOC_REFRESH_COURSES:
    | { ok: true; courses: CourseBrief[] }
    | { ok: false; reason: JobRejection; message?: string };
  MOOC_PENDING_SUMMARY: QueryOutcome<PendingSummary>;
  MOOC_COURSEWARE_SUMMARY: QueryOutcome<CoursewareSummary>;
  MOOC_HOMEWORK_PAPER: QueryOutcome<PaperQuestion[]>;
  MOOC_QUIZ_FILL_INDEX: QueryOutcome<Record<string, boolean>>;
  MOOC_QUIZ_INFO: QueryOutcome<OpenQuizInfo>;
  MOOC_QUIZ_SUBMIT: QueryOutcome<{ matched: number; total: number }>;
}
