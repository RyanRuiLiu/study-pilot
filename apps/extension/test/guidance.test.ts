/*
 * 作业得分指导注入测试。
 *
 * 盯住的是单页应用里的「换单元」：学习页是 hash 路由，切换单元不重新加载文档，
 * 站点只更新自己那部分 DOM。注入块是插进题目节点里的外来节点，站点重渲染时
 * 未必带走它，而「已经注入过」的判断若只认「有没有块」（不认「是哪一份作业」），
 * 就会把上一单元的得分指导留在页面上，直到用户手动刷新。
 *
 * 这个场景在真实页面上由点击触发，这里用真实 DOM 实现（linkedom）把它复现成
 * 可反复运行的断言：站点复用题目节点、切换单元时只改自己的文本。
 *
 * 取卷接口整体 mock：本测试验的是注入的时序与归属，不是接口。
 * 注入模块本身不 import 消息通道（生产取卷在 loader.ts），因此这份测试
 * 不碰浏览器、不碰存储，直接跑。
 */

import { parseHTML } from 'linkedom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ok } from '@study-pilot/core';

vi.mock('@study-pilot/platform-mooc', () => ({
  currentEvaluatePhase: () => 1,
  getHomeworkInfo: vi.fn(),
  getHomeworkPaper: vi.fn(),
  getQuizPaper: vi.fn(),
}));

import { getHomeworkInfo, getHomeworkPaper } from '@study-pilot/platform-mooc';
import type { HomeworkInfo, HomeworkPaper, MoocClient } from '@study-pilot/platform-mooc';
import {
  ANSWER_MARK_ATTRIBUTE,
  injectGuidance,
  removeGuidance,
  type QuestionLoader,
} from '../src/features/mooc/guidance/index.ts';

const info = vi.mocked(getHomeworkInfo);
const paper = vi.mocked(getHomeworkPaper);

/** 取卷接口的替身：本测试不关心凭证与签名。 */
const client = {} as MoocClient;

/*
 * 注入用的取卷端口。
 *
 * 注入逻辑只依赖这个函数，取数在后台完成；因此测试把两个接口 mock 起来包一层，
 * 不必 mock 浏览器或消息通道——被验的是注入的时序与归属，与传输无关。
 */
const load: QuestionLoader = async (tid) => {
  const i = await info(client, tid);
  if (!i.ok) return null;
  const p = await paper(client, tid, { aid: i.value.aid ?? undefined, phase: 1 });
  return p.ok ? (p.value.subjectiveQList ?? p.value.objectiveQList ?? []) : null;
};

const ANSWER_BLOCK = `[${ANSWER_MARK_ATTRIBUTE}]`;

/** 作业信息，字段够 currentEvaluatePhase 用即可。 */
function homeworkInfo(tid: number): HomeworkInfo {
  return { tid, aid: 1, deadline: 0, evaluateScoreReleaseTime: 0 };
}

/** 一份只有一道主观题的作业卷，题干带一句可辨识的得分指导。 */
function homeworkPaper(tid: number, guidance: string): HomeworkPaper {
  return {
    tid,
    subjectiveQList: [
      {
        id: tid * 10,
        position: 0,
        score: 10,
        judgeDtos: [{ id: 1, msg: `<p>${guidance}</p>`, maxScore: 10 }],
      },
    ],
  };
}

/** 一个带多个评分点的作业卷，评分依据里混着行内公式小图。 */
function multiPointPaper(tid: number): HomeworkPaper {
  return {
    tid,
    subjectiveQList: [
      {
        id: tid * 10,
        position: 0,
        score: 15,
        judgeDtos: [
          { id: 1, msg: '<p>示例评分点甲</p>', maxScore: 6 },
          {
            id: 2,
            msg:
              '<p>示例评分点乙<img src="https://x/ri.png">前半，' +
              '<img src="https://x/c1.png">示例片段乙' +
              '<img src="https://x/fl.png">示例片段丙</p>',
            maxScore: 3,
          },
        ],
      },
    ],
  };
}

/**
 * 两个题目的作业卷，两题的评分依据文字可区分。
 * 用来盯「题号与题目对不上」：页面异步渲染时题号可能还没写进去。
 */
function twoQuestionPaper(tid: number): HomeworkPaper {
  return {
    tid,
    subjectiveQList: [
      {
        id: tid * 10,
        position: 0,
        score: 10,
        judgeDtos: [{ id: 1, msg: '<p>第一题依据</p>', maxScore: 10 }],
      },
      {
        id: tid * 10 + 1,
        position: 1,
        score: 10,
        judgeDtos: [{ id: 2, msg: '<p>第二题依据</p>', maxScore: 10 }],
      },
    ],
  };
}

/** 改掉某道题的题号，模拟页面还没渲染出题号。 */
function setPosition(index: number, text: string): void {
  const item = currentDocument().querySelectorAll('.u-questionItem')[index] as HTMLElement | undefined;
  if (!item) throw new Error(`没有第 ${index + 1} 个题目`);
  const node = item.querySelector('.position');
  if (!node) throw new Error('页面结构里没有 .position');
  node.textContent = text;
}

/** 去掉题干与作答区，模拟题目节点已插入、内容还没渲染。 */
function stripAnchor(index: number): void {
  const item = currentDocument().querySelectorAll('.u-questionItem')[index] as HTMLElement | undefined;
  if (!item) throw new Error(`没有第 ${index + 1} 个题目`);
  item.querySelector('.j-title')?.remove();
  item.querySelector('.j-answer')?.remove();
}

/** 某道题上的注入块数量。 */
function blockCountOf(item: Element): number {
  return item.querySelectorAll(ANSWER_BLOCK).length;
}

/** 某道题上的注入块文本。 */
function blockTextOf(item: Element): string {
  return (item.querySelector(ANSWER_BLOCK)?.textContent ?? '').replace(/\s+/g, ' ');
}

/**
 * 挂一份作业作答页。
 *
 * 结构与真实页面采集一致：题干在 .j-richTxt 里，作答区是 .j-answer。
 */
function mountHomeworkPage(questionCount = 1): void {
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

/** 页面上已注入的得分指导文本。 */
function injectedTexts(): string[] {
  return Array.from(currentDocument().querySelectorAll(ANSWER_BLOCK)).map(
    (block) => block.textContent ?? '',
  );
}

/** 站点自己渲染的作答区/互评模块。打分页里带评分标准，查看结果时只有分数与评语。 */
function setSiteEvaluateModule(html: string): void {
  const answer = currentDocument().querySelector('.j-answer');
  if (!answer) throw new Error('页面结构里没有 .j-answer');
  answer.innerHTML = html;
}

/** 让测试可以决定取卷响应何时回来。 */
function deferred<T>(): { promise: Promise<T>; resolve: (value: T) => void } {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((settle) => {
    resolve = settle;
  });
  return { promise, resolve };
}

beforeEach(() => {
  vi.clearAllMocks();
  mountHomeworkPage();
});

describe('换单元', () => {
  it('站点复用题目节点时，上一单元的得分指导必须被换掉', async () => {
    // 第一次进入：100 单元，正常注入
    info.mockResolvedValue(ok(homeworkInfo(100)));
    paper.mockResolvedValue(ok(homeworkPaper(100, 'A 单元评分标准')));
    await injectGuidance(load, 100);
    expect(injectedTexts().join('')).toContain('A 单元评分标准');

    // 切到 200 单元：站点只更新了自己渲染的那部分文本，注入块留在原地
    currentDocument().querySelector('.j-richTxt')!.textContent = '题干 B';
    info.mockResolvedValue(ok(homeworkInfo(200)));
    paper.mockResolvedValue(ok(homeworkPaper(200, 'B 单元评分标准')));
    await injectGuidance(load, 200);

    expect(injectedTexts()).toHaveLength(1);
    expect(injectedTexts()[0]).toContain('B 单元评分标准');
    expect(currentDocument().body.textContent).not.toContain('A 单元评分标准');
  });

  it('旧单元的取卷结果迟到时，不能占住新单元的题目', async () => {
    const first = deferred<Awaited<ReturnType<typeof getHomeworkPaper>>>();
    const second = deferred<Awaited<ReturnType<typeof getHomeworkPaper>>>();
    info.mockResolvedValue(ok(homeworkInfo(100)));
    paper.mockImplementation((_client, tid) => (tid === 100 ? first.promise : second.promise));

    const pendingA = injectGuidance(load, 100);
    const pendingB = injectGuidance(load, 200);

    // 旧单元的响应先回来——它晚于切换发生，但它带的仍是旧卷
    first.resolve(ok(homeworkPaper(100, 'A 单元评分标准')));
    await pendingA;

    second.resolve(ok(homeworkPaper(200, 'B 单元评分标准')));
    await pendingB;

    expect(injectedTexts()).toHaveLength(1);
    expect(injectedTexts()[0]).toContain('B 单元评分标准');
  });

  it('站点替换题目节点时，新单元照常注入', async () => {
    info.mockResolvedValue(ok(homeworkInfo(100)));
    paper.mockResolvedValue(ok(homeworkPaper(100, 'A 单元评分标准')));
    await injectGuidance(load, 100);
    expect(injectedTexts()).toHaveLength(1);

    // 站点重建了整个题目区，注入块随之消失
    mountHomeworkPage();
    info.mockResolvedValue(ok(homeworkInfo(200)));
    paper.mockResolvedValue(ok(homeworkPaper(200, 'B 单元评分标准')));
    await injectGuidance(load, 200);

    expect(injectedTexts()).toHaveLength(1);
    expect(injectedTexts()[0]).toContain('B 单元评分标准');
  });
});

describe('重复评估与卸载', () => {
  it('两次挂载对的是同一份卷时，先回来的那次照样算数', async () => {
    // 页面每次变动都会重新评估一遍；两次挂载对的是同一份卷时，先回来的那次照样算数，
    // 否则注入要等一个「没有下一次挂载」的安静窗口，可能一直轮不上。
    const first = deferred<Awaited<ReturnType<typeof getHomeworkPaper>>>();
    const second = deferred<Awaited<ReturnType<typeof getHomeworkPaper>>>();
    info.mockResolvedValue(ok(homeworkInfo(100)));
    paper.mockImplementationOnce(() => first.promise).mockImplementationOnce(() => second.promise);

    const pendingFirst = injectGuidance(load, 100);
    const pendingSecond = injectGuidance(load, 100);

    first.resolve(ok(homeworkPaper(100, 'A 单元评分标准')));
    await pendingFirst;
    expect(injectedTexts()).toHaveLength(1);

    second.resolve(ok(homeworkPaper(100, 'A 单元评分标准')));
    await pendingSecond;
    expect(injectedTexts()).toHaveLength(1);
  });

  it('卸载之后，在途的取卷结果不再把块插回来', async () => {
    const pending = deferred<Awaited<ReturnType<typeof getHomeworkPaper>>>();
    info.mockResolvedValue(ok(homeworkInfo(100)));
    paper.mockReturnValue(pending.promise);

    const injecting = injectGuidance(load, 100);
    // 页面切到不注入的状态，内容脚本会调卸载
    removeGuidance();

    pending.resolve(ok(homeworkPaper(100, 'A 单元评分标准')));
    await injecting;

    expect(injectedTexts()).toHaveLength(0);
  });
});

describe('评分依据的排版', () => {
  it('行内公式留在句子里，不被拆成独立一行', async () => {
    info.mockResolvedValue(ok(homeworkInfo(100)));
    paper.mockResolvedValue(ok(multiPointPaper(100)));

    await injectGuidance(load, 100);

    const block = currentDocument().querySelector(ANSWER_BLOCK)!;
    const images = Array.from(block.querySelectorAll('img'));
    expect(images).toHaveLength(3);

    // 三张公式图仍在原来那句话里，句子本身也没被掏空
    for (const image of images) {
      expect(image.closest('p')?.textContent ?? '').toContain('示例评分点乙');
    }

    const paragraph = Array.from(block.querySelectorAll('p')).find((p) => p.querySelector('img'));
    expect(paragraph?.textContent).toContain('示例评分点乙');
    expect(paragraph?.textContent).toContain('示例片段乙');
    expect(paragraph?.textContent).toContain('示例片段丙');
  });

  it('多个评分点各成一块，满分与依据不连成一片', async () => {
    info.mockResolvedValue(ok(homeworkInfo(100)));
    paper.mockResolvedValue(ok(multiPointPaper(100)));

    await injectGuidance(load, 100);

    const block = currentDocument().querySelector(ANSWER_BLOCK)!;
    const text = block.textContent ?? '';
    expect(text).toContain('满分 6 分');
    expect(text).toContain('满分 3 分');
    expect(text.indexOf('满分 6 分')).toBeLessThan(text.indexOf('满分 3 分'));

    // 第二个评分点带分隔线，第一个不带
    const points = Array.from(block.children).filter((child) => child.querySelector('img, p'));
    expect(points).toHaveLength(2);
    expect(points[1]?.getAttribute('style') ?? '').toContain('border-top');
    expect(points[0]?.getAttribute('style') ?? '').not.toContain('border-top');
  });
});

describe('净化（富文本当作不可信内容）', () => {
  /** 一份恶意卷：评分依据里塞进各种能执行或外发的东西。 */
  function hostilePaper(tid: number): HomeworkPaper {
    return {
      tid,
      subjectiveQList: [
        {
          id: tid * 10,
          position: 0,
          score: 10,
          judgeDtos: [
            {
              id: 1,
              maxScore: 10,
              msg:
                '<p>评分依据' +
                '<script>window.__pwned = 1</script>' +
                '<a href="javascript:window.__pwned=2">点我</a>' +
                '<img src="https://cdn.example.com/a.png" onerror="window.__pwned=3">' +
                '<img src="http://cdn.example.com/b.png">' +
                '<img src="javascript:window.__pwned=4">' +
                '<object data="https://evil.example.com/swf"></object>' +
                '<form action="https://evil.example.com"><button>提交</button></form>' +
                '<div onclick="window.__pwned=5" style="background:url(https://evil.example.com/beacon)">点图</div>' +
                '</p>',
            },
          ],
        },
      ],
    };
  }

  it('危险内容被拆掉或剥属性，剩下的文字仍读得通', async () => {
    info.mockResolvedValue(ok(homeworkInfo(100)));
    paper.mockResolvedValue(ok(hostilePaper(100)));

    await injectGuidance(load, 100);

    const block = currentDocument().querySelector(ANSWER_BLOCK)!;

    // 代码与控件类：整体消失
    expect(block.querySelector('script')).toBeNull();
    expect(block.querySelector('object')).toBeNull();
    expect(block.querySelector('form')).toBeNull();
    expect(block.textContent).not.toContain('__pwned');

    // 链接不在名单里：元素被拆掉，文字留着
    expect(block.querySelector('a')).toBeNull();
    expect(block.textContent).toContain('点我');

    // 事件属性与 style 全部剥掉（信标外发就走它）
    expect(block.querySelectorAll('[onclick], [onerror]')).toHaveLength(0);
    const styled = Array.from(block.querySelectorAll('div')).find((node) =>
      (node.textContent ?? '').includes('点图'),
    )!;
    expect(styled.getAttribute('style')).toBeNull();
    expect(styled.getAttribute('onclick')).toBeNull();

    // 图片：http(s) 留下（http 升为 https，避免混合内容）；javascript: 的 src 去掉
    const images = Array.from(block.querySelectorAll('img'));
    expect(images).toHaveLength(3);
    expect(images[0]?.getAttribute('src')).toBe('https://cdn.example.com/a.png');
    expect(images[1]?.getAttribute('src')).toBe('https://cdn.example.com/b.png');
    expect(images[2]?.hasAttribute('src')).toBe(false);
  });
});

describe('页面自己是否已在展示评分依据', () => {
  it('互评打分页自己列出了评分标准：不重复注入，并清掉已有注入', async () => {
    info.mockResolvedValue(ok(homeworkInfo(100)));
    paper.mockResolvedValue(ok(homeworkPaper(100, 'A 单元评分标准')));
    await injectGuidance(load, 100);
    expect(injectedTexts()).toHaveLength(1);

    // 页面切到给别人打分：站点自己在互评模块里列出了评分标准
    setSiteEvaluateModule(
      '<div class="j-evaluate"><div class="u-evaluateItem">' +
        '<div class="u-point"><div class="breif"><p class="f-fc3">得分指导：</p>' +
        '<div class="f-richEditorText">站点自己的评分标准</div></div></div>' +
        '</div></div>',
    );
    await injectGuidance(load, 100);

    expect(injectedTexts()).toHaveLength(0);
  });

  it('已提交与成绩公布页只给分数和评语：照常注入', async () => {
    // 实测结构：整卷带 analysisMode，每题下方挂 resultMode 的互评模块。
    // 这两样都只是「已提交」的标志，并不代表页面给出了评分依据。
    for (const item of currentDocument().querySelectorAll('.u-questionItem')) {
      item.classList.add('analysisMode');
    }
    setSiteEvaluateModule(
      '<div class="j-evaluate"><div class="u-evaluateItem resultMode">' +
        '互评得分 8 分，评语：思路清楚</div></div>',
    );
    info.mockResolvedValue(ok(homeworkInfo(100)));
    paper.mockResolvedValue(ok(homeworkPaper(100, 'A 单元评分标准')));

    await injectGuidance(load, 100);

    expect(injectedTexts()).toHaveLength(1);
    expect(injectedTexts()[0]).toContain('A 单元评分标准');
  });
});

describe('题号与题目的对应', () => {
  it('题号还没渲染出来的题目不按顺序硬配，题号出来后再补上', async () => {
    info.mockResolvedValue(ok(homeworkInfo(100)));
    paper.mockResolvedValue(ok(twoQuestionPaper(100)));
    mountHomeworkPage(2);

    // 第一个题目节点已经是第 2 题，第二个节点的题号还没渲染出来
    setPosition(0, '2');
    setPosition(1, '');

    await injectGuidance(load, 100);

    const items = Array.from(currentDocument().querySelectorAll('.u-questionItem'));
    // 有题号的那道按题号对上
    expect(blockTextOf(items[0] as Element)).toContain('第二题依据');
    // 题号未知的那道这一轮不猜——否则它会被安上第二题的依据
    expect(blockCountOf(items[1] as Element)).toBe(0);

    // 题号渲染出来（它其实是第 1 题）
    setPosition(1, '1');
    await injectGuidance(load, 100);

    expect(blockCountOf(items[1] as Element)).toBe(1);
    expect(blockTextOf(items[1] as Element)).toContain('第一题依据');
    expect(blockTextOf(items[1] as Element)).not.toContain('第二题依据');
  });

  it('接口个别题缺题号、页面有题号：不退回数组下标乱配', async () => {
    info.mockResolvedValue(ok(homeworkInfo(100)));
    paper.mockResolvedValue(
      ok({
        tid: 100,
        subjectiveQList: [
          { id: 1, position: 1, score: 10, judgeDtos: [{ id: 1, msg: '<p>第二题依据</p>', maxScore: 10 }] },
          // 这道没有 position：不知道它对应页面哪一题
          { id: 2, score: 10, judgeDtos: [{ id: 2, msg: '<p>无题号依据</p>', maxScore: 10 }] },
        ],
      }),
    );
    mountHomeworkPage(2);
    setPosition(0, '1');
    setPosition(1, '2');

    await injectGuidance(load, 100);

    const items = Array.from(currentDocument().querySelectorAll('.u-questionItem'));
    expect(blockCountOf(items[0] as Element)).toBe(0);
    expect(blockCountOf(items[1] as Element)).toBe(1);
    expect(blockTextOf(items[1] as Element)).toContain('第二题依据');
    expect(currentDocument().body.textContent).not.toContain('无题号依据');
  });

  it('题干还没渲染出来时不把块插到题目之外', async () => {
    info.mockResolvedValue(ok(homeworkInfo(100)));
    paper.mockResolvedValue(ok(homeworkPaper(100, 'A 单元评分标准')));
    mountHomeworkPage(1);
    stripAnchor(0);

    await injectGuidance(load, 100);

    // 没有锚点就这一轮不插：插在题目节点之后会看起来属于下一题
    expect(injectedTexts()).toHaveLength(0);

    // 题干随站点渲染出现，块落在题目内部、题干之后
    const item = currentDocument().querySelector('.u-questionItem') as HTMLElement;
    item.innerHTML =
      '<div class="j-title"><div class="position">1</div>' +
      '<div class="f-richEditorText j-richTxt">题干</div></div>' +
      '<div class="j-answer"></div>';

    await injectGuidance(load, 100);

    expect(blockCountOf(item)).toBe(1);
    expect(blockTextOf(item)).toContain('A 单元评分标准');
    expect(item.querySelector('.j-title')?.nextElementSibling).toBe(
      item.querySelector(ANSWER_BLOCK),
    );
  });
});
