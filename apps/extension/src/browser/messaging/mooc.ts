/*
 * 慕课平台专属的消息载荷。
 *
 * 这些类型与平台的字段与叫法绑定（状态说法、考试 id、跳转前缀）。
 * 换平台时新增一个同级的载荷文件，不动 `envelope.ts`。
 */

/**
 * 单元状态。平台的叫法，不自创。
 *
 * 定义在这里而不是判断逻辑那一侧：它是消息里 status 字段的取值集合，
 * 前后台都得按同一套说法来。放在后台模块里的话，前台要用就得跨层导入，
 * 或者——更容易发生的事——直接在界面上写死字符串，
 * 那样后台改说法时界面会静默失效。
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
 * 两者虽然都在互评期开放、走同一套接口，但对用户是两件事，
 * 混成一类会让他点进去才发现评的是自己。
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
 * 一条待办要能回答两个问题，用户才不会困惑：
 *   这件事是什么         → kind
 *   它会被怎么处理       → handling
 *
 * handling 说明这一条会被怎么处理：自动完成，还是需要用户自己动手。
 * 只说「未提交」是不够的——用户看到那句话无从判断要不要管它。
 *
 * overdue 与 handling 是两个维度，不合并：一件已过截止的测验既不能自动处理，
 * 也不能由用户补做，平台就是不接受了。这种要说清楚，否则用户会一直等它被处理。
 *
 * 带上课程定位信息是为了能直接跳到对应页面：平台用
 * `#/learn/quiz?id=` 与 `#/learn/hw?id=` 定位具体测验与作业。
 */
export interface PendingEntry {
  /** 事项类别 */
  kind: PendingKind;
  /**
   * 这件事会被怎么处理。
   *   auto   扩展会在下次自动执行时完成，用户不必动手
   *   manual 只能由用户自己完成，扩展做不了
   */
  handling: 'auto' | 'manual';
  /**
   * 是否已经过了截止时间。
   *
   * 过期的测验平台不接受补做，因此它既不在 auto 里也不真的在 manual 里——
   * 保留在列表中是为了让用户知道漏了什么，而不是让他去点。
   */
  overdue: boolean;
  /** 跳转地址；由平台在产出这条汇总时自己拼好，外壳不拼 URL */
  href: string;

  /** 测验或作业的 id */
  testId: number;
  /** 课程名 */
  courseName: string;
  /** 所属章节 */
  chapterName: string;
  /** 名称 */
  name: string;
  /**
   * 考试自身的 id，仅考试有；拼答卷页地址用。
   *
   * 与详情里同名，理由相同：考试的两部分共用它，而它不属于任何单元。
   */
  examId: number | null;
  /**
   * 该单元当前的状态。
   *
   * 取值与设置页的单元明细**完全相同**：未提交 / 已过截止未提交 /
   * 互评阶段 / 等待互评完成 / 成绩已公布。两处由同一个函数算出。
   *
   * 先前这里是另一套说法（提交阶段 / 互评阶段 / 成绩公布阶段），
   * 与明细对不上：同一份作业在弹窗里写「提交阶段」、在明细里写「未提交」，
   * 用户会以为是两件不同的事。同一件事只能有一种说法。
   */
  status: string;
  /** 该状态的含义，用于悬停提示。与明细同源 */
  statusDetail: string;
  /**
   * 该看哪个截止时间。
   *
   * 由后台按这件事的性质算好：待提交的看提交截止，待互评的看互评截止。
   * 界面不再自己判断——先前两边各判一次，于是显示的时间与排序依据不一致。
   * 0 表示平台未提供。
   */
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
  /** 这份汇总的读取时刻（毫秒）；弹窗用它回答「上次读取」 */
  fetchedAt: number;
  /** 能自动完成的条数 */
  auto: number;
  /** 只能人工完成的条数 */
  manual: number;
  /** 已过截止、平台不再接受的条数 */
  overdue: number;
  /** 明细列表，按截止时间升序 */
  entries: PendingEntry[];
}

/** 单个单元的明细，用于设置页的诊断视图。 */
export interface UnitDetail {
  termId: number;
  courseName: string;
  chapterName: string;
  tid: number;
  name: string;
  type: 'quiz' | 'homework' | 'exam-objective' | 'exam-subjective';
  /**
   * 考试自身的 id，仅考试有；拼答卷页地址用。
   *
   * 考试的两部分（客观题与主观题）共用这一个 id，而它不属于任何单元，
   * 只能随详情一起传过来。
   */
  examId: number | null;
  /** 状态描述，取自平台的说法 */
  status: string;
  /** 该状态的含义，用于悬停提示。四个说法之间的差别不是自明的 */
  statusDetail: string;
  submitted: boolean;
  score: number | null;
  totalScore: number | null;
  deadline: number | null;
  /**
   * 互评已完成的份数。只在处于互评阶段的作业上有值，其余为 null。
   *
   * 「互评阶段」这个状态本身不说明用户做到哪一步——一份未评与已评够，
   * 字面完全相同。带上进度才能把两者分开。
   */
  evaluateDone: number | null;
  /** 互评配额。与 evaluateDone 同时出现 */
  evaluateTotal: number | null;
  /**
   * 拼跳转地址用的课程前缀。
   *
   * 课程页地址形如 /learn/{schoolShortName}-{courseId}，MOOC 走 /learn/、
   * SPOC 走 /spoc/learn/。前台要能点进具体某一项作业，就必须带上这几个字段，
   * 否则只能显示一个不能点的名字。
   */
  courseId: number;
  schoolShortName: string;
  mode: number;
}
