/*
 * 答案键与作答计划（纯函数，无 IO）。
 *
 * 平台事实（2026-10-16／17 首测，2026-11-04 补全，证据见 .probe/api/ 留痕）：
 *  1. 开卷题面 `student/doHomework` 只给 题干 + 选项 id + eid：题号（数字 id）恒为 null。
 *     数字题号只在交卷之后由 `student/lookHomework` 下发。eid 是 16 字节题目标识，
 *     同一道题在首答卷与重做卷里逐字节相同（沙箱课 50/50 实测）。
 *  2. 正解只有一个出口：弹题族 `popupAnswer/lessonPopupExam`，按数字题号查；
 *     数字题号只在交卷之后由 `student/lookHomework` 下发。
 *  3. **对齐键在响应里本来就带着**（2026-11-04 实测，数字信号处理 19/19）：
 *     弹题回包每条 `testQuestion.questionId` 就是回顾卷面的数字题号；
 *     选项 id 在 开卷 ↔ 回顾 ↔ 弹题 三端同源（同一道题集合逐 id 相同，
 *     每次尝试只重排顺序——「选项顺序为随机排列」是平台自己页面上的提示）。
 *  4. 题干**不能**当对齐键：图片题的题干是 `<img>`（弹题侧连题干都不带），
 *     归一后是空串，全部挤进同一个键位互相污染——2026-11-04 真机事故
 *     （数字信号处理 7 张卷覆盖率 16-27%）的根因。文本匹配整个退场。
 *
 * 推论（本模块的立足点）：键 = **题号 → 该题正解选项集**，对齐与作答全走 id：
 *  · 覆盖率（回顾卷面）：按题号直取；
 *  · 作答（开卷卷面，只有 eid 没有题号）：**选项 id 集合的精确包含**——一道题的
 *    正解 id 全部出现在唯一一道卷面题的选项里（选项 id 全局唯一、每题各自一行），
 *    这是确定性关联，不是兜底。
 * 键不存在时，开卷前取不到正解：所以流程的第一步是建键（收割任意一次已交卷），
 * 键一旦在手，后续任何一次开卷都能一次作答、只交一次。
 */

/** 卷面一道题（来自 student/doHomework 或交卷后的 student/lookHomework）。 */
export interface PaperQuestion {
  /** 题目稳定标识：开卷前就有，交卷前后一致（开卷侧） */
  eid: string;
  /** 数字题号：回顾侧才有，开卷侧恒为 null（平台锁到交卷后） */
  questionId: number | null;
  options: PaperOption[];
}

export interface PaperOption {
  /** 选项 id：三端同源、全局唯一（每题各自一行），仅顺序每次尝试重排 */
  id: string;
}

/** 按数字题号的键条目（弹题通道按 `testQuestion.questionId` 对齐）。 */
export interface AnswerKeyEntry {
  questionId: number;
  /** 该题的正解选项 id 集（弹题侧 `result === '1'` 的选项） */
  correct: string[];
}

export interface AnswerKey {
  version: 2;
  entries: AnswerKeyEntry[];
}

/** 卷面一题的作答：eid 定位、optionIds 是**卷面侧**的选项 id。 */
export interface PlannedAnswer {
  eid: string;
  optionIds: string[];
}

export interface KeyMatch {
  answers: PlannedAnswer[];
  /** 键里没有的题（缺键） */
  missing: PaperQuestion[];
}

/** 覆盖率 = 有键的题数 ÷ 总题数；1 表示可以一次作答、只交一次。 */
export function coverageOf(paper: readonly PaperQuestion[], match: KeyMatch): number {
  if (paper.length === 0) return 1;
  return match.answers.length / paper.length;
}

/** 弹题通道一条响应里本模块要用的字段（`popupAnswer/lessonPopupExam`）。 */
export interface PopupExamQuestion {
  testQuestion?: {
    /** 数字题号——与回顾卷面的 `id` 同源，键的对齐键（2026-11-04 实测） */
    questionId?: unknown;
    questionOptions?: Array<{ id?: unknown; result?: unknown } | null> | null;
  } | null;
}

/**
 * 从弹题通道的响应条目建键：**按 `testQuestion.questionId` 对齐**。
 *
 * 通道语义（真机实测）：每个选项带 `result`，`"1"` 就是正解；选项 id 三端同源。
 * 拿不到题号或正解的条目不进键——宁可缺键如实报覆盖率，也不塞错答案。
 */
export function answerKeyFromPopupExam(questions: readonly PopupExamQuestion[]): AnswerKey {
  const entries: AnswerKeyEntry[] = [];
  for (const dto of questions) {
    const question = dto?.testQuestion;
    const questionId = Number(question?.questionId);
    if (!Number.isInteger(questionId) || questionId <= 0) continue;

    const correct = (question?.questionOptions ?? [])
      .filter((option): option is { id: unknown; result: unknown } => Boolean(option))
      .filter((option) => String(option.result) === '1')
      .map((option) => String(option.id))
      .filter((id) => id !== '' && id !== 'undefined' && id !== 'null');
    if (correct.length === 0) continue;
    entries.push({ questionId, correct });
  }
  return { version: 2, entries };
}

/**
 * 把键套到已开卷的卷面上。全 id、无文本——对齐的两条路都是确定性关联：
 *
 *  1. 卷面带数字题号（回顾卷面）→ 按题号直取该题的正解 id 集；
 *  2. 卷面只有 eid（开卷卷面）→ **选项 id 集合的精确包含**：某条键目的正解 id
 *     **全部**落在唯一一道卷面题的选项里，那道题就是它（选项 id 全局唯一、
 *     每题各自一行；三端同源已实测）。命中后按**本卷**的选项序作答
 *     （每次尝试顺序重排，键里的序不可照搬）。
 *
 * 正解 id 缺任何一个（多选只中一半、本卷选项缺 id）就是不确定的，进 missing，
 * 由策略层按剩余作答机会决定怎么办，绝不硬造答案。
 */
export function matchPaper(paper: readonly PaperQuestion[], key: AnswerKey): KeyMatch {
  /** 正解选项 id → 拥有它的键条目（选项 id 全局唯一，一个选项只属于一道题） */
  const questionOfOption = new Map<string, AnswerKeyEntry>();
  for (const entry of key.entries) {
    for (const id of entry.correct) questionOfOption.set(id, entry);
  }
  const byQuestionId = new Map(key.entries.map((entry) => [entry.questionId, entry]));

  const answers: PlannedAnswer[] = [];
  const missing: PaperQuestion[] = [];

  for (const question of paper) {
    // 作答一律按**本卷**的选项序：键条目里的序是收割那一卷的，照搬过去会换序
    const optionIds = question.options.map((option) => option.id);

    // ① 回顾卷面：题号直取
    const direct =
      question.questionId !== null ? byQuestionId.get(question.questionId) : undefined;
    if (direct !== undefined) {
      if (direct.correct.length > 0 && direct.correct.every((id) => optionIds.includes(id))) {
        answers.push({ eid: question.eid, optionIds: optionIds.filter((id) => direct.correct.includes(id)) });
        continue;
      }
      missing.push(question);
      continue;
    }

    // ② 开卷卷面：正解 id 集合的精确包含（所有正解 id 都在这道题的选项里）
    const owners = new Set<AnswerKeyEntry>();
    for (const id of optionIds) {
      const owner = questionOfOption.get(id);
      if (owner !== undefined) owners.add(owner);
    }
    const owner = owners.size === 1 ? owners.values().next().value : undefined;
    if (owner !== undefined && owner.correct.every((id) => optionIds.includes(id))) {
      answers.push({ eid: question.eid, optionIds: optionIds.filter((id) => owner.correct.includes(id)) });
      continue;
    }

    missing.push(question);
  }

  return { answers, missing };
}

/** 一次开卷的作答计划：键全覆盖就直接作答；缺键才谈得上"先探路"。 */
export type AnswerPlan =
  | { kind: 'answer'; answers: PlannedAnswer[]; coverage: number }
  | { kind: 'probe-then-redo'; coverage: number; missing: PaperQuestion[] }
  | { kind: 'report-only'; coverage: number; missing: PaperQuestion[] };

/** 缺键时允许"首答探路 + 重做定分"的最低剩余作答机会数（平台语义：redoNum 给 3 次，分数覆盖）。 */
export const MIN_ATTEMPTS_FOR_PROBE = 2;

/** 平台给的重做总次数（源码 `3 - t.rt` 里的 3）。 */
const TOTAL_REDOS = 3;

/**
 * 剩余重做次数 = `3 − redoNum().rt`。
 *
 * 算式照抄平台界面（`9.c58d6fa5a5050724a831.js:11814` 的 `var a = 3 - t.rt;`），
 * 不自己发明——它的语义（`rt` 到底记的是已用还是别的）不必我们解释，
 * 照用平台的算式就不会错。
 *
 * 2026-10-17 真机抽样核对：**未交卷的卷 `rt=0` ⇒ 剩余 3**；已交过一次（含一次重做）
 * 的卷 `rt=1` ⇒ 剩余 2。（先前一份二手报告称未交卷 `rt=2`，与真机不符——
 * 若照它写，门槛会把「从没交过」的卷全部挡住，而探路重做恰恰是为它们准备的。）
 */
export function remainingAttempts(rt: unknown): number {
  return TOTAL_REDOS - (typeof rt === 'number' && Number.isFinite(rt) ? rt : 0);
}

/**
 * 作答计划。
 *
 * - 键全覆盖 → `answer`：直接按键作答，交卷就是终局（这一轮里的**唯一**一次提交）。
 * - 缺键且剩余机会 ≥ 2 → `probe-then-redo`：先首答探路交卷解锁题号，收割后申请重做再定分
 *   （现行闭环；此时"先交一次"是被缺口逼出来的，不是流程的默认姿势）。
 * - 缺键且只剩 1 次机会（如部分期末）→ `report-only`：不自动作答，如实呈现缺口。
 */
export function planAnswering(input: {
  paper: readonly PaperQuestion[];
  key: AnswerKey | null;
  /** 这门课这份卷还剩下的作答机会（含本次） */
  remainingAttempts: number;
}): AnswerPlan {
  const { paper, key, remainingAttempts } = input;

  if (key === null) {
    return remainingAttempts >= MIN_ATTEMPTS_FOR_PROBE
      ? { kind: 'probe-then-redo', coverage: 0, missing: [...paper] }
      : { kind: 'report-only', coverage: 0, missing: [...paper] };
  }

  const match = matchPaper(paper, key);
  const coverage = coverageOf(paper, match);
  if (match.missing.length === 0) {
    return { kind: 'answer', answers: match.answers, coverage };
  }
  return remainingAttempts >= MIN_ATTEMPTS_FOR_PROBE
    ? { kind: 'probe-then-redo', coverage, missing: match.missing }
    : { kind: 'report-only', coverage, missing: match.missing };
}
