/*
 * 学习页地址解析。
 *
 * 页面形态（实测）：
 *   /learn/{course}?tid={termId}#/learn/{view}?id={id}
 *   /spoc/learn/{course}?tid={termId}#/learn/{view}?id={id}
 * 课程学期 id 在查询串里，视图与内容 id 在 hash 里。
 *
 * 考试的两种形态
 * --------------
 * 考试分客观题与主观题两种，路由不同：
 *   #/learn/examObject?eid={examId}&id={tid}&examType=0   客观题
 *   #/learn/examSubjective?eid={examId}&id={tid}          主观题
 *
 * 两者都能用 id 当 tid 走测验那套接口取卷——考试在服务端就是测验的一种，
 * 实测主观题考试返回 subjectiveQList（含 judgeDtos 得分指导），
 * 客观题考试返回 objectiveQList。因此这里把 eid 之外的 id 当作 contentId，
 * eid 不解析：取卷不需要它。
 */

export type MoocView = 'quiz' | 'homework' | 'exam-objective' | 'exam-subjective' | 'other';

export interface MoocLocation {
  /** 课程学期 id，来自查询串的 tid */
  termId: number | null;
  view: MoocView;
  /** 测验、作业或考试 id，来自 hash 查询串的 id */
  contentId: number | null;
}

function toPositiveNumber(value: string | null): number | null {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

/** 解析页面地址。接受字符串参数以便测试。 */
export function parseMoocLocation(href: string): MoocLocation {
  const url = new URL(href);
  const termId = toPositiveNumber(url.searchParams.get('tid'));

  const hash = url.hash.replace(/^#\/?/, '');
  const [path, query] = hash.split('?');
  const contentId = toPositiveNumber(new URLSearchParams(query ?? '').get('id'));

  let view: MoocView = 'other';
  if (path === 'learn/quiz') view = 'quiz';
  else if (path === 'learn/hw') view = 'homework';
  else if (path === 'learn/examObject') view = 'exam-objective';
  else if (path === 'learn/examSubjective') view = 'exam-subjective';

  return { termId, view, contentId };
}
