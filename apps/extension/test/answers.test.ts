/*
 * 「查看答案」注入测试（测验成绩页、作答页与考试查看页统一走这条）。
 *
 * 盯住五件事：
 *   1. 卷面里的答案（正确选项标记 / stdAnswer / analyse）如实进块；
 *   2. **按显示顺序对齐**：卷面的 position 是题库序号（实测 3,4,8,10,11），
 *      页面题号是渲染序（1..5），按 position 对齐会把答案插到别的题上；
 *   3. 这道题没有答案（已提交的那份里抽不到）时不注入空块；
 *   4. 页面自己已展示答案的题不重复注入（「参考答案」与「正确答案」都算）；
 *   5. 换卷与迟到：旧卷的结果不能占住新卷的题目。
 *
 * 结构照真实页面采集：题干在 .j-title 的 .j-richTxt 里，题号在 .position。
 */

import { parseHTML } from 'linkedom';
import { beforeEach, describe, expect, it } from 'vitest';
import type { AnswerRow, PaperQuestion } from '@study-pilot/platform-mooc';
import { injectAnswers, removeAnswers, type AnswerLoader } from '../src/features/mooc/guidance/answers.ts';
import { ANSWER_MARK_ATTRIBUTE } from '../src/features/mooc/guidance/markers.ts';

const ANSWER_BLOCK = `[${ANSWER_MARK_ATTRIBUTE}]`;

/** 选择题：一个错项、一个正确项；可选带解析。 */
function choiceQuestion(id: number, correct: string, analyse?: string): PaperQuestion {
  return {
    id,
    type: 1,
    position: id,
    score: 5,
    optionDtos: [
      { id: id * 10, content: '<p>错误项</p>', answer: null },
      { id: id * 10 + 1, content: `<p>${correct}</p>`, answer: true },
    ],
    stdAnswer: null,
    analyse: analyse ?? null,
  };
}

/** 填空题：答案在 stdAnswer 上。 */
function fillQuestion(id: number, stdAnswer: string): PaperQuestion {
  return { id, type: 3, position: id, score: 5, optionDtos: null, stdAnswer, analyse: null };
}

/** 有答案的行。 */
function answered(id: number, correct: string, analyse?: string): AnswerRow {
  const question = choiceQuestion(id, correct, analyse);
  return { question, answer: question };
}

/** 平台扣着答案的行（作答页上没有抽到这道题）：题面在，答案没有。 */
function unanswered(id: number): AnswerRow {
  return { question: choiceQuestion(id, '（未提交的卷里没有这道题）'), answer: null };
}

/** 挂一份答卷查看页。 */
function mountQuizPage(questionCount = 1): void {
  const items = Array.from(
    { length: questionCount },
    (_, index) => `
      <div class="u-questionItem">
        <div class="j-title title">
          <div class="position f-fl">${index + 1}</div>
          <div class="qaDescription f-fl f-cb">
            <div class="f-richEditorText j-richTxt">题干 ${index + 1}</div>
          </div>
        </div>
        <div class="j-answer answer"></div>
      </div>`,
  ).join('');

  const { document } = parseHTML(`<!doctype html><html><body>${items}</body></html>`);
  (globalThis as unknown as { document: Document }).document = document as unknown as Document;
}

function currentDocument(): Document {
  return (globalThis as unknown as { document: Document }).document;
}

function blockCount(): number {
  return currentDocument().querySelectorAll(ANSWER_BLOCK).length;
}

function injectedTexts(): string[] {
  return Array.from(currentDocument().querySelectorAll(ANSWER_BLOCK)).map(
    (block) => (block.textContent ?? '').replace(/\s+/g, ' '),
  );
}

/** 站点自己渲染的作答区（查看页里显示「参考答案：」「正确答案：」的地方）。 */
function setSiteAnswer(html: string): void {
  const answer = currentDocument().querySelector('.j-answer');
  if (!answer) throw new Error('页面结构里没有 .j-answer');
  answer.innerHTML = html;
}

/** 让测试可以决定取数何时回来。 */
function deferred<T>(): { promise: Promise<T>; resolve: (value: T) => void } {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((settle) => {
    resolve = settle;
  });
  return { promise, resolve };
}

beforeEach(() => {
  mountQuizPage();
  // 每个用例从干净状态开始：清掉上一个用例留下的块，并让在途取数作废
  removeAnswers();
});

describe('答案进块', () => {
  it('选择题：正确选项的文本进块，解析同块给出', async () => {
    const load: AnswerLoader = async () => [answered(1, '特许连锁经营', '<p>教材第 3 章</p>')];
    await injectAnswers(load, 100);

    expect(blockCount()).toBe(1);
    expect(injectedTexts()[0]).toContain('参考答案');
    expect(injectedTexts()[0]).toContain('特许连锁经营');
    expect(injectedTexts()[0]).toContain('答案解析');
    expect(injectedTexts()[0]).toContain('教材第 3 章');
  });

  it('填空题：stdAnswer 作为参考答案', async () => {
    const question = fillQuestion(1, '特许经营');
    const load: AnswerLoader = async () => [{ question, answer: question }];
    await injectAnswers(load, 100);

    expect(blockCount()).toBe(1);
    expect(injectedTexts()[0]).toContain('特许经营');
  });

  it('正确选项是图片（没有文字）时给出选项字母，与平台自己的展示一致', async () => {
    const question: PaperQuestion = {
      id: 7,
      type: 1,
      position: 0,
      optionDtos: [
        { id: 70, content: '<p>甲</p>', answer: false },
        { id: 71, content: '<p><img src="https://x/a.png"></p>', answer: true },
      ],
      stdAnswer: null,
      analyse: null,
    };
    const load: AnswerLoader = async () => [{ question, answer: question }];
    await injectAnswers(load, 100);

    expect(blockCount()).toBe(1);
    // 标签与值是两个段落，拼起来就是「参考答案B」
    expect(injectedTexts()[0]).toBe('参考答案B');
  });

  it('解析里的脚本不落进页面（白名单净化）', async () => {
    const load: AnswerLoader = async () => [answered(1, '甲', '<p>正文</p><script>window.x=1</script>')];
    await injectAnswers(load, 100);

    const block = currentDocument().querySelector(ANSWER_BLOCK);
    expect(block?.querySelector('script')).toBeNull();
    expect(block?.textContent).toContain('正文');
  });
});

describe('按显示顺序对齐', () => {
  it('卷面 position 与页面题号不是一个空间时，按显示顺序对', async () => {
    // 真实形态：卷面 position 是 3,4,8,10,11，页面题号是 1..5
    mountQuizPage(3);
    const rows: AnswerRow[] = [
      { question: { ...choiceQuestion(100, '甲'), position: 3 }, answer: choiceQuestion(100, '甲答案') },
      { question: { ...choiceQuestion(101, '乙'), position: 4 }, answer: choiceQuestion(101, '乙答案') },
      { question: { ...choiceQuestion(102, '丙'), position: 8 }, answer: choiceQuestion(102, '丙答案') },
    ];
    const load: AnswerLoader = async () => rows;
    await injectAnswers(load, 100);

    const items = [...currentDocument().querySelectorAll('.u-questionItem')];
    expect(items).toHaveLength(3);
    expect(items[0]?.textContent).toContain('甲答案');
    expect(items[1]?.textContent).toContain('乙答案');
    expect(items[2]?.textContent).toContain('丙答案');
  });

  it('数据比页面短时，多出来的题目这一轮不注入', async () => {
    mountQuizPage(3);
    const load: AnswerLoader = async () => [answered(1, '甲答案')];
    await injectAnswers(load, 100);

    expect(blockCount()).toBe(1);
  });
});

describe('不注入的情形', () => {
  it('这道题没有答案（已提交的卷里抽不到）时不注入空块', async () => {
    const load: AnswerLoader = async () => [unanswered(1)];
    await injectAnswers(load, 100);

    expect(blockCount()).toBe(0);
  });

  it('页面自己展示了「参考答案」的题不重复注入', async () => {
    setSiteAnswer('<p>参考答案：特许连锁经营</p>');
    const load: AnswerLoader = async () => [answered(1, '特许连锁经营')];
    await injectAnswers(load, 100);

    expect(blockCount()).toBe(0);
  });

  it('页面自己展示了「正确答案」的题不重复注入（考试查看页）', async () => {
    setSiteAnswer('<p>正确答案：B你选对了</p>');
    const load: AnswerLoader = async () => [answered(1, '特许连锁经营')];
    await injectAnswers(load, 100);

    expect(blockCount()).toBe(0);
  });

  it('取不到答卷时不注入', async () => {
    const load: AnswerLoader = async () => null;
    await injectAnswers(load, 100);

    expect(blockCount()).toBe(0);
  });
});

describe('换卷与迟到', () => {
  it('换卷后，上一份卷的块被换掉', async () => {
    const first: AnswerLoader = async () => [answered(1, 'A 卷答案')];
    await injectAnswers(first, 100);
    expect(injectedTexts()[0]).toContain('A 卷答案');

    const second: AnswerLoader = async () => [answered(1, 'B 卷答案')];
    await injectAnswers(second, 200);

    expect(blockCount()).toBe(1);
    expect(injectedTexts()[0]).toContain('B 卷答案');
    expect(currentDocument().body.textContent).not.toContain('A 卷答案');
  });

  it('旧卷的取数结果迟到时，不能占住新卷的题目', async () => {
    const first = deferred<AnswerRow[] | null>();
    const second = deferred<AnswerRow[] | null>();
    const load: AnswerLoader = (tid) => (tid === 100 ? first.promise : second.promise);

    const pendingA = injectAnswers(load, 100);
    const pendingB = injectAnswers(load, 200);

    first.resolve([answered(1, 'A 卷答案')]);
    await pendingA;

    second.resolve([answered(1, 'B 卷答案')]);
    await pendingB;

    expect(blockCount()).toBe(1);
    expect(injectedTexts()[0]).toContain('B 卷答案');
  });

  it('别的族的块不受影响（得分指导与查看答案同页共存）', async () => {
    // 主观考试页上一题同时有得分指导块与答案块：注入答案不许碰那一族
    const item = currentDocument().querySelector('.u-questionItem') as HTMLElement;
    const guidance = currentDocument().createElement('div');
    guidance.setAttribute(ANSWER_MARK_ATTRIBUTE, '1');
    guidance.setAttribute('data-study-pilot-answer-source', 'homework:100');
    guidance.textContent = '得分指导：满分 5 分';
    item.append(guidance);

    const load: AnswerLoader = async () => [answered(1, '甲')];
    await injectAnswers(load, 100);

    expect(blockCount()).toBe(2);
    expect(injectedTexts().join(' ')).toContain('得分指导：满分 5 分');
    expect(injectedTexts().join(' ')).toContain('参考答案');
  });

  it('同一份卷反复评估不重复注入（幂等）', async () => {
    const load: AnswerLoader = async () => [answered(1, '甲')];
    await injectAnswers(load, 100);
    await injectAnswers(load, 100);

    expect(blockCount()).toBe(1);
  });

  it('卸载后在途结果回来时不插回', async () => {
    const pending = deferred<AnswerRow[] | null>();
    const load: AnswerLoader = () => pending.promise;

    const running = injectAnswers(load, 100);
    removeAnswers();
    pending.resolve([answered(1, '甲')]);
    await running;

    expect(blockCount()).toBe(0);
  });
});
