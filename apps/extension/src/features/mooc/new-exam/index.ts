/*
 * 新版考试答卷页（/mooc/main/newExam）的页内功能：评分标准展示 + 客观题填充。
 *
 * 与旧做题助手（features/mooc/quiz/）同一套判据，只换 DOM 映射：
 *   答案   走移动端接口的填充索引（MOOC_QUIZ_FILL_INDEX，与单元测验同一份实现）；
 *   映射   按位次——getPaper 的题目顺序与页面 questionBody 块逐位一致（实测 14/14），
 *          选项序与 optionDtos 序一致；不读 React 内部状态；
 *   评分标准 judgeDtos 随卷下发（实测主观题带、客观题为 null），复用旧渲染块；
 *   提交   不做——只走页面自己的按钮，扩展在这条链上零写行为。
 *
 * 注入是加法（插块、挂面板），不改动页面自己的任何节点。
 */

import type { NewExamPaper } from '@study-pilot/platform-mooc';
import { buildAnswerBlock } from '../guidance/block.ts';
import { WRITE_GAP_MS } from '../quiz/actions.ts';
import { createPanelShell, panelButton, type PanelHandle } from '../quiz/panel.ts';
import { sendToBackground } from '../../../messages.ts';
import { buildFillPlan } from './plan.ts';

export const NEW_EXAM_PANEL_ID = 'study-pilot-new-exam-panel';

/** 题目块与选项块的选择子。类名的哈希后缀随平台构建变化，按语义前缀匹配。 */
const QUESTION_BODY_SELECTOR = '[class*="index-module__questionBody"]';
// 点击目标 = 隐藏的原生 radio input：直接命中控件（checked + change 事件），
// antd onChange → 表单收集 → 心跳保存的完整链才会走（实测：input.click() 的
// 选中跨浏览器重启持久；optionBody 的合成点击只改视觉、不进表单、不落库）。
const OPTION_SELECTOR = 'input[type=radio]';

const sleep = (ms: number): Promise<void> => new Promise((resolve) => window.setTimeout(resolve, ms));

/** 面板与状态行。busy 防双击；填充只由人点按钮触发。 */
let busy = false;

export async function mountNewExamHelper(examId: number, termId: number): Promise<void> {
  const panel: PanelHandle = createPanelShell(NEW_EXAM_PANEL_ID, '做题助手（新版考试）');
  panel.setStatus('正在读取答卷…');

  let outcome: Awaited<ReturnType<typeof sendToBackground<'MOOC_NEW_EXAM_PAPER'>>>;
  try {
    outcome = await sendToBackground({ type: 'MOOC_NEW_EXAM_PAPER', examId });
  } catch (error) {
    panel.setStatus(`读取失败：${error instanceof Error ? error.message : String(error)}`);
    return;
  }
  if (outcome.status !== 'ok') {
    panel.setStatus(outcome.message);
    return;
  }
  const paper: NewExamPaper = outcome.value;

  const rubrics = injectRubrics(paper);

  const fillButton = panelButton(
    '填充客观题',
    'fill',
    () => {
      void fill(panel, paper, termId, fillButton);
    },
  );
  fillButton.style.width = '100%';
  panel.body.append(fillButton);
  panel.setStatus(
    `已读卷：${paper.questions.length} 题` +
      (rubrics > 0 ? `，评分标准已注入 ${rubrics} 题` : '') +
      '（客观题答案走移动端接口）',
  );
}

/** 主观题的评分点渲染进对应的题目块（复用旧「得分指导」渲染，判定同构）。返回注入的题数。 */
function injectRubrics(paper: NewExamPaper): number {
  const blocks = document.querySelectorAll(QUESTION_BODY_SELECTOR);
  if (blocks.length !== paper.questions.length) return 0; // 结构对不上就不硬插（不猜位次）

  let injected = 0;
  for (const [index, question] of paper.questions.entries()) {
    if (question.judgeDtos === null) continue;
    const block = buildAnswerBlock(
      { score: question.score, judgeDtos: question.judgeDtos },
      `new-exam-${paper.aid}`,
    );
    if (block === null) continue;
    blocks[index]?.append(block);
    injected++;
  }
  return injected;
}

/** 填充客观题：答案来自移动端接口的填充索引，点击按位次映射，间隔与旧版一致。 */
async function fill(
  panel: PanelHandle,
  paper: NewExamPaper,
  termId: number,
  button: HTMLButtonElement,
): Promise<void> {
  if (busy) return;
  busy = true;
  button.disabled = true;
  panel.setStatus('正在获取答案（移动端接口）…');

  try {
    const index = await sendToBackground({
      type: 'MOOC_QUIZ_FILL_INDEX',
      tid: paper.testId,
      termId,
    });
    if (index.status !== 'ok') {
      panel.setStatus(index.message);
      return;
    }

    const blocks = document.querySelectorAll(QUESTION_BODY_SELECTOR);
    if (blocks.length !== paper.questions.length) {
      panel.setStatus(`页面题目块 ${blocks.length} 个与卷面 ${paper.questions.length} 题不一致，未填充`);
      return;
    }

    const plan = buildFillPlan(paper.questions, index.value.options);
    if (plan.covered === 0) {
      panel.setStatus('填充索引里没有本题的答案，未填充');
      return;
    }

    let clicked = 0;
    for (const [n, step] of plan.steps.entries()) {
      panel.setStatus(`正在填充：第 ${n + 1} / ${plan.steps.length} 项`);
      const option = blocks[step.questionIndex]?.querySelectorAll(OPTION_SELECTOR)[step.optionIndex];
      if (option === undefined) {
        panel.setStatus(`第 ${step.questionIndex + 1} 题第 ${step.optionIndex + 1} 个选项在页面上找不到，中止`);
        return;
      }
      (option as HTMLElement).click();
      clicked++;
      await sleep(WRITE_GAP_MS);
    }

    panel.setStatus(
      `已填充 ${clicked} 项（覆盖 ${plan.covered}/${plan.objective} 道客观题）。核对后自行提交`,
    );
  } catch (error) {
    panel.setStatus(`填充失败：${error instanceof Error ? error.message : String(error)}`);
  } finally {
    busy = false;
    button.disabled = false;
  }
}
