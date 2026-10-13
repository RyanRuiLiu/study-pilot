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
export function learnPagePrefix(mode: number): string {
  return mode === COURSE_MODE.MOOC ? '/learn/' : '/spoc/learn/';
}

/**
 * 拼课程页地址。
 *
 * 路径段是 **学校简称 + '-' + 课程 id**，不是课程自己的 shortName。
 * 实测对照：
 *
 *   模拟电子技术  course.shortName=NTU021  course.id=1001753142
 *                 实际地址 /learn/NTU-1001753142?tid=1487834456
 *   电路          course.shortName=202004  course.id=1459925161
 *                 实际地址 /learn/NTU-1459925161?tid=1476486462
 *
 * 学校简称取自 schoolPanel.shortName（该账号为 NTU）。
 * 用课程 shortName 会拼出打不开的地址。
 */
export function coursePageUrl(course: {
  courseId: number;
  schoolShortName: string;
  mode: number;
  termId: number;
}): string {
  const prefix = learnPagePrefix(course.mode);
  return `https://www.icourse163.org${prefix}${course.schoolShortName}-${course.courseId}?tid=${course.termId}`;
}

/**
 * 拼具体测验、作业或考试的地址。
 *
 * 课程页内部用 hash 路由，实测页面上的链接形如：
 *
 *   <a href="#/learn/quiz?id=1258534384">   测验
 *   <a href="#/learn/hw?id=1258531391">     作业
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
  kind: 'quiz' | 'homework' | 'exam-objective' | 'exam-subjective',
  testId: number,
  examId?: number,
): string {
  const base = coursePageUrl(course);

  if (kind === 'exam-objective' || kind === 'exam-subjective') {
    if (!examId) return `${base}#/learn/examlist`;
    const route = kind === 'exam-objective' ? 'examObject' : 'examSubjective';
    const type = kind === 'exam-objective' ? '&examType=0' : '';
    return `${base}#/learn/${route}?eid=${examId}&id=${testId}${type}`;
  }

  const section = kind === 'quiz' ? 'quiz' : 'hw';
  return `${base}#/learn/${section}?id=${testId}`;
}

/**
 * 课程模式的展示名。
 *
 * 文案沿用平台的分类叫法，不自创。
 * 未提供模式时返回空串——调用方据此省略这一项，而不是显示一个占位词。
 */
export function describeCourseMode(mode: number): string {
  switch (mode) {
    case COURSE_MODE.MOOC:
      return 'MOOC';
    case COURSE_MODE.SPOC_SYNC:
      return 'SPOC 同步';
    case COURSE_MODE.SPOC_ASYNC:
      return 'SPOC 异步';
    case COURSE_MODE.SPOC_ONLY:
      return 'SPOC 独立';
    case COURSE_MODE.ROOC:
      return 'ROOC';
    default:
      return '';
  }
}
