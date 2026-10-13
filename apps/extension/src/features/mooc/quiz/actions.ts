/*
 * 两个动作：填充与提交。
 *
 * 一、填充走页面点击，不调写接口。
 *     页面对每次点击都会立即保存草稿，写得进就写，写不进也不影响结果，
 *     因为提交体自带答案。点击的价值在于用户能亲眼看到选项被选中。
 *     点击之间必须留出间隔：连续点击会触发服务端的并发限制。
 *
 * 二、提交走接口，并且当场从题库重新构造答案，不从草稿读。
 *     这是本流程成立的关键。实测 saveDraftAnswers 返回 {code:0, result:true}
 *     之后草稿依然是空的（用页面自己的点击也是如此），因此任何依赖草稿的
 *     提交都不可靠。而提交体携带的 answers 是有效的：实测一次提交
 *     把 13 道题全部答对并计入成绩（26/26）。
 *
 * 安全说明：填充会通过页面触发保存草稿，提交会直接改变服务端状态。
 * 两者都必须由用户主动点击触发，扩展不做任何自动执行。约束见 docs/development.md。
 */

import { sendToBackground } from '../../../platform/messaging';
import { loadAnswerIndex } from './data.ts';
import { collectQuestions, optionIdOf } from './options.ts';
import { setBusy, type ActivePanel } from './panel.ts';

/**
 * 两次写请求之间的安全间隔，单位为毫秒。
 *
 * 数值来自实测而非估计。对同一接口连续发起写请求的成功率：
 *   间隔 0ms    2 / 5 成功
 *   间隔 100ms  3 / 5 成功
 *   间隔 200ms  5 / 5 成功
 * 取 300ms 留余量。注意「等上一个请求返回」并不够：串行无间隔仍会被拒，
 * 说明服务端判定并发时包含时间窗口。
 */
const WRITE_GAP_MS = 300;

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

/** 按题库答案逐题点击页面选项，每次点击之间留出安全间隔。 */
export async function fill(panel: ActivePanel): Promise<void> {
  if (panel.busy) return;
  const { termId } = panel.options;
  if (termId === null) {
    panel.handle.setStatus('未取得课程信息，无法读取题库');
    return;
  }

  const questions = collectQuestions();
  if (questions.length === 0) {
    panel.handle.setStatus('当前页面没有可作答的题目');
    return;
  }

  setBusy(panel, true);
  panel.handle.setStatus('正在读取题库');

  try {
    const index = await loadAnswerIndex(termId);

    let clicked = 0;
    let unrecognized = 0;
    const unresolved: number[] = [];
    const total = questions.length;

    for (let i = 0; i < questions.length; i++) {
      const inputs = questions[i].inputs;

      const correct: HTMLInputElement[] = [];
      let recognized = false;
      for (const input of inputs) {
        const optionId = optionIdOf(input);
        if (optionId === null) continue;
        recognized = true;
        if (index.get(optionId) === true) correct.push(input);
      }

      if (!recognized) {
        unrecognized++;
        continue;
      }
      if (correct.length === 0) {
        unresolved.push(i + 1);
        continue;
      }

      panel.handle.setStatus(`正在作答：第 ${i + 1} / ${total} 题`);

      for (const input of correct) {
        if (input.checked) continue;
        input.click();
        clicked++;
        // 页面会为这次点击发起一次保存，间隔足够才能避开服务端的时间窗口
        await sleep(WRITE_GAP_MS);
      }
    }

    const parts = [`题目 ${total} 道`, `已选中 ${clicked} 项`];
    if (unresolved.length > 0) parts.push(`题库缺答案的题号 ${unresolved.join('、')}`);
    if (unrecognized > 0) parts.push(`无法识别选项格式的题 ${unrecognized} 道`);
    parts.push('请核对后提交');
    panel.handle.setStatus(parts.join('，'));
  } catch (error) {
    panel.handle.setStatus(`执行失败：${error instanceof Error ? error.message : String(error)}`);
  } finally {
    setBusy(panel, false);
  }
}

/**
 * 提交答卷。
 *
 * 提交前当场从题库重新构造答案，不读草稿。原因见文件头说明：
 * 草稿写入在当前环境下不生效，而提交体携带的 answers 是有效的。
 *
 * 不做二次确认：提交按钮本身就是用户的确认动作。
 */
export async function submit(panel: ActivePanel): Promise<void> {
  if (panel.busy) return;

  const { termId, quizId } = panel.options;
  if (termId === null) {
    panel.handle.setStatus('未取得课程信息，无法读取题库');
    return;
  }

  setBusy(panel, true);
  panel.handle.setStatus('正在构造答案');

  try {
    /*
     * 提交由后台执行：写入只从后台发出（内容脚本与后台各有节流器，
     * 写散到两边就可能并发触发平台的并发限制）。答案也在后台当场构造。
     */
    const result = await sendToBackground({ type: 'SUBMIT_QUIZ', quizId, termId });
    if (!result.ok) {
      panel.handle.setStatus(result.message);
      return;
    }

    panel.handle.setStatus(`已提交 ${result.matched} 道题，正在刷新页面查看结果`);
    window.location.reload();
  } catch (error) {
    panel.handle.setStatus(`提交失败：${error instanceof Error ? error.message : String(error)}`);
  } finally {
    setBusy(panel, false);
  }
}
