/*
 * 答案键与作答计划（纯函数，无 IO）。
 *
 * 平台事实（2026-10-16／17 真机实证，证据见 .probe/zhs-src/FINDINGS.md §二十六）：
 *  1. 开卷题面 `student/doHomework` 只给 题干 + 选项 id + eid：题号（数字 id）恒为 null。
 *     eid 是 16 字节题目标识，同一道题在首答卷与重做卷里**逐字节相同**（沙箱课 50/50 实测）；
 *     它与数字题号之间没有客户端能算出来的关系（md5 / sha1 截断 / 流式异或三类假设全 0/50）。
 *  2. 正解只有一个出口：弹题族 `popupAnswer/lessonPopupExam`，**按数字题号查**；
 *     数字题号只在交卷之后由 `student/lookHomework` 下发。
 *  3. 弹题池（`popupAnswer/loadVideoPointerInfo` → `lessonPopupExam`）只覆盖**视频弹题**那一份题：
 *     同一门沙箱课全量 82 题，与这门课单元测试的真题面按题干、按选项 id 双口径比对均 **0/50**。
 *     ——拿弹题池去答单元测试不成立，别指望它。
 *
 * 推论（本模块的立足点）：**键不存在时，开卷前取不到正解**。所以答案流程的第一步不是解题，
 * 而是建键：把任意一次已交卷的答卷（该卷历史提交、重做卷、同课副本）收割成键；
 * 键一旦落库，后续任何一次开卷都能一次作答、只交一次——不需要先交一次探路。
 *
 * 键的两个口径（都用真机数据定过）：
 *  · 正解选项 id 集合：同一道题的选项 id 在多次开卷之间稳定（重做换序不换 id，12 分 → 100 分实证）；
 *  · 按题干的条目：换副本换 id 时的后备口径，题干归一后比对，命中后再要求正解 id 落在卷面选项里。
 */

/** 卷面一道题（来自 student/doHomework 或交卷后的 student/lookHomework）。 */
export interface PaperQuestion {
  /** 题目稳定标识：开卷前就有，交卷前后一致 */
  eid: string;
  /** 题干原文（可能含 HTML） */
  text: string;
  options: PaperOption[];
}

export interface PaperOption {
  id: string;
  text: string;
}

/** 按题干的键条目。 */
export interface AnswerKeyEntry {
  /** 归一后的题干（normalizeQuestionText 的输出） */
  question: string;
  /** 正解选项 id（同一份题内稳定） */
  correct: string[];
  /** 正解选项文本（归一后；换副本换 id 时的后备口径） */
  correctTexts: string[];
}

export interface AnswerKey {
  version: 1;
  /** 正解选项 id 集合（本课同一份题的多次开卷之间稳定） */
  correctOptionIds: string[];
  /** 题干条目（后备口径） */
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

/**
 * 题干归一：去标签、去空白与标点。
 *
 * 两侧都来自平台（键来自弹题通道的题干、卷面来自取卷响应），但一边可能带 `<p>` 之类的标签，
 * 一边带全角括号，所以比对前统一：先剥标签，再删空白与中英标点。
 */
export function normalizeQuestionText(text: string): string {
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/[\s\u3000（）()。，,、？?！!：:；;－\-.…“”"'']/g, '');
}

/** 弹题通道一条响应里本模块要用的字段（`popupAnswer/lessonPopupExam`）。 */
export interface PopupExamQuestion {
  testQuestion?: {
    name?: unknown;
    questionOptions?: Array<{ id?: unknown; result?: unknown } | null> | null;
  } | null;
}

/**
 * 从弹题通道的响应条目建键。
 *
 * 通道语义（真机实测）：每个选项带 `result`，`"1"` 就是正解；选项 id 与卷面同源，
 * 所以收割到的 id 可以直接用于以后的开卷（这就是"重做换序不换 id"的根）。
 * 没有正解的条目（`result` 全空）不进键——宁可缺键，也不塞错答案。
 */
export function answerKeyFromPopupExam(questions: readonly PopupExamQuestion[]): AnswerKey {
  const correctOptionIds = new Set<string>();
  const entries = new Map<string, { correct: Set<string>; correctTexts: Set<string> }>();

  for (const dto of questions) {
    const question = dto?.testQuestion;
    if (!question) continue;
    const correctOptions = (question.questionOptions ?? [])
      .filter((option): option is { id: unknown; result: unknown; content?: unknown } => Boolean(option))
      .filter((option) => String(option.result) === '1');
    const correct = correctOptions
      .map((option) => String(option.id))
      .filter((id) => id !== 'undefined' && id !== 'null' && id !== '');
    if (correct.length === 0) continue;

    for (const id of correct) correctOptionIds.add(id);

    const name = typeof question.name === 'string' ? question.name : '';
    if (name === '') continue;
    const key = normalizeQuestionText(name);
    const bucket = entries.get(key) ?? { correct: new Set<string>(), correctTexts: new Set<string>() };
    for (const id of correct) bucket.correct.add(id);
    for (const option of correctOptions) {
      if (typeof option.content === 'string' && option.content !== '') {
        bucket.correctTexts.add(normalizeQuestionText(option.content));
      }
    }
    entries.set(key, bucket);
  }

  return {
    version: 1,
    correctOptionIds: [...correctOptionIds],
    entries: [...entries.entries()].map(([question, bucket]) => ({
      question,
      correct: [...bucket.correct],
      correctTexts: [...bucket.correctTexts],
    })),
  };
}

/**
 * 把键套到已开卷的卷面上。
 *
 * 命中规则，两级，都要求正解落在**这道题自己的选项**里（选项 id 是按行分配的，不会跨题撞车）：
 *  1. 选项 id 口径：题目选项里直接命中正解 id 集合——同一份题的多次开卷走这条（重做实证：换序不换 id）；
 *  2. 题干口径：题干归一后逐字相等，再用**正解选项文本**在本题选项里定位（换副本、选项 id 重发时走这条）；
 *     若题干命中而正解 id 也正好落在本卷选项里，也走这条。
 * 两条都不中的题进 missing，由策略层按剩余作答机会决定怎么办，绝不硬造答案。
 */
export function matchPaper(paper: readonly PaperQuestion[], key: AnswerKey): KeyMatch {
  const correctIds = new Set(key.correctOptionIds);
  const byText = new Map(key.entries.map((entry) => [entry.question, entry]));

  const answers: PlannedAnswer[] = [];
  const missing: PaperQuestion[] = [];

  for (const question of paper) {
    const optionIds = question.options.map((option) => option.id);

    const hitByIds = optionIds.filter((id) => correctIds.has(id));
    if (hitByIds.length > 0) {
      answers.push({ eid: question.eid, optionIds: hitByIds });
      continue;
    }

    const entry = byText.get(normalizeQuestionText(question.text));
    if (entry) {
      const byIds = entry.correct.filter((id) => optionIds.includes(id));
      if (entry.correct.length > 0 && byIds.length === entry.correct.length) {
        answers.push({ eid: question.eid, optionIds: byIds });
        continue;
      }
      const wantedTexts = new Set(entry.correctTexts);
      const byTexts = question.options
        .filter((option) => wantedTexts.has(normalizeQuestionText(option.text)))
        .map((option) => option.id);
      if (entry.correctTexts.length > 0 && byTexts.length === entry.correctTexts.length) {
        answers.push({ eid: question.eid, optionIds: byTexts });
        continue;
      }
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
