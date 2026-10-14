/**
 * 课程地址与模式文案。
 *
 * 从 `types.ts` 移出：地址拼接有实测依据（学校简称而非课程 shortName），
 * 与类型声明不是一件事。对外仍从 `types.ts` 导出，导入方不必改。
 */

/** 课程模式。取值与源码 `edu.u.CONST` 一致。用于展示与拼接学习页地址。 */
export const COURSE_MODE = {
  MOOC: 0,
  SPOC_SYNC: 10,
  SPOC_ASYNC: 15,
  SPOC_ONLY: 20,
  ROOC: 30,
} as const;

/**
 * 学习页的地址前缀。
 *
 * MOOC 走 `/learn/`，其余（SPOC 与 ROOC）走 `/spoc/learn/`。
 * 两种前缀的页面结构一致，但地址不同，拼链接必须按 mode 区分。
 */
function learnPagePrefix(mode: number): string {
  return mode === COURSE_MODE.MOOC ? '/learn/' : '/spoc/learn/';
}

/**
 * 拼课程页地址。
 *
 * 路径段是 **学校简称 + '-' + 课程 id**，不是课程自己的 shortName。
 * 实测对照：
 *
 *   示例课程丁  course.shortName=DEMO001  course.id=9000000014
 *                 实际地址 /learn/NTU-9000000014?tid=9000000030
 *   示例课程戊          course.shortName=DEMO002  course.id=9000000025
 *                 实际地址 /learn/NTU-9000000025?tid=9000000028
 *
 * 学校简称取自 schoolPanel.shortName（该账号为 NTU）。
 * 用课程 shortName 会拼出打不开的地址。
 */
function coursePageUrl(course: {
  courseId: number;
  schoolShortName: string;
  mode: number;
  termId: number;
}): string {
  const prefix = learnPagePrefix(course.mode);
  return `https://www.icourse163.org${prefix}${course.schoolShortName}-${course.courseId}?tid=${course.termId}`;
}

/**
 * 学习页里的作答区。
 *
 * 与 `SnapshotWork['type']` 里的工作项类型同一套叫法，测验、作业与两种考试。
 */
export type WorkKind = 'quiz' | 'homework' | 'exam-objective' | 'exam-subjective';

/** 页面上认出来的位置：四类作答区之外统一算 `other`。 */
export type WorkView = WorkKind | 'other';

/**
 * 作答区的路由段。
 *
 * **一张表两处用**：拼地址（`workPageUrl`）与认地址（`parseWorkLocation`）。
 * 路由是平台的事实，出现一次就该只写一次——此前拼接与解析各有一份字面量，
 * 加考试路由时只有拼接那份跟着改了，解析靠人记得同步。
 */
const WORK_ROUTE: Record<WorkKind, string> = {
  quiz: 'learn/quiz',
  homework: 'learn/hw',
  'exam-objective': 'learn/examObject',
  'exam-subjective': 'learn/examSubjective',
};

/** 页面地址里认出来的位置。 */
export interface WorkLocation {
  /** 课程学期 id，来自查询串的 tid */
  termId: number | null;
  view: WorkView;
  /** 测验、作业或考试 id，来自 hash 查询串的 id */
  contentId: number | null;
}

function toPositiveNumber(value: string | null): number | null {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

/**
 * 解析学习页地址。接受字符串参数以便测试。
 *
 * 页面形态（实测）：
 *   /learn/{course}?tid={termId}#/learn/{view}?id={id}
 *   /spoc/learn/{course}?tid={termId}#/learn/{view}?id={id}
 * 课程学期 id 在查询串里，视图与内容 id 在 hash 里。
 *
 * 考试的两种形态都带 eid，但这里不解析它：取卷走的是与测验同一套接口，
 * 用 id 当 tid 就能拿到卷子（实测主观题考试返回 subjectiveQList 含 judgeDtos，
 * 客观题考试返回 objectiveQList），eid 只是页面导航用。
 */
export function parseWorkLocation(href: string): WorkLocation {
  const url = new URL(href);
  const termId = toPositiveNumber(url.searchParams.get('tid'));

  const hash = url.hash.replace(/^#\/?/, '');
  const [path, query] = hash.split('?');
  const contentId = toPositiveNumber(new URLSearchParams(query ?? '').get('id'));

  const entry = (Object.entries(WORK_ROUTE) as Array<[WorkKind, string]>).find(
    ([, route]) => route === path,
  );

  return { termId, view: entry?.[0] ?? 'other', contentId };
}

/**
 * 拼具体测验、作业或考试的地址。
 *
 * 课程页内部用 hash 路由，实测页面上的链接形如：
 *
 *   <a href="#/learn/quiz?id=9000000018">   测验
 *   <a href="#/learn/hw?id=9000000017">     作业
 *
 * 其中的 id 就是接口返回的 testId（作业的互评也在 hw 页面里进行）。
 *
 * 考试的地址多一个 eid
 * --------------------
 * 考试由两部分构成，各自的答卷页路由不同，两者都要带上考试自身（而非部分）
 * 的 id：
 *
 *   #/learn/examObject?eid={examId}&id={tid}&examType=0   客观题
 *   #/learn/examSubjective?eid={examId}&id={tid}          主观题
 *
 * examType 在客观题是 0，主观题实测为 null——字面量 "null" 拼进去反而
 * 打不开，所以只在有值时附加。eid 缺失时退回到考试列表页：那仍然能把
 * 用户送到正确的地方，比给一个打不开的地址好。
 */
export function workPageUrl(
  course: {
    courseId: number;
    schoolShortName: string;
    mode: number;
    termId: number;
  },
  kind: WorkKind,
  testId: number,
  examId?: number,
): string {
  const base = coursePageUrl(course);
  const route = WORK_ROUTE[kind];

  if (kind === 'exam-objective' || kind === 'exam-subjective') {
    if (!examId) return `${base}#/learn/examlist`;
    const type = kind === 'exam-objective' ? '&examType=0' : '';
    return `${base}#/${route}?eid=${examId}&id=${testId}${type}`;
  }

  return `${base}#/${route}?id=${testId}`;
}

