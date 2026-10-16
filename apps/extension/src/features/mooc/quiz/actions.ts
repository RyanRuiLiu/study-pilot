/*
 * 两个动作：填充与提交。
 *
 * 一、填充走页面点击，不调写接口。
 *     页面对每次点击都会立即保存草稿；写得进就写，写不进也不影响结果，
 *     因为提交体自带答案。点击的价值在于用户能亲眼看到选项被选中。
 *     点击之间必须留出间隔：连续点击会触发服务端的并发限制。
 *
 * 二、提交走接口，并且当场重新构造答案，不读草稿。
 *     这是本流程成立的关键：实测 saveDraftAnswers 返回成功之后草稿依然是空的
 *     （用页面自己的点击也是如此），因此任何依赖草稿的提交都不可靠；而提交体
 *     携带的 answers 是有效的（实测一次提交把 13 道题全部答对并计入成绩）。
 *     作答与提交的唯一实现在平台的 answerAndSubmitQuiz（与一键执行同一份判据）。
 *
 * 安全：填充经页面触发保存草稿，提交直接改变服务端状态——两者都必须由用户
 * 主动点击触发，扩展在作答页上不做任何自动执行。
 */

import { sendToBackground } from '../../../messages.ts';
import { loadAnswerIndex } from './data.ts';
import { collectQuestions, optionIdOf } from './options.ts';
import { setBusy, type ActivePanel } from './panel.ts';

/**
 * 两次点击之间的安全间隔，单位为毫秒。
 *
 * 数值来自实测而非估计。对同一接口连续发起写请求的成功率：
 *   间隔 0ms    2 / 5 成功
 *   间隔 100ms  3 / 5 成功
 *   间隔 200ms  5 / 5 成功
 * 取 300ms 留余量。「等上一个请求返回」并不够：串行无间隔仍会被拒，
 * 说明服务端判定并发时包含时间窗口。
 */
const WRITE_GAP_MS = 300;

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

/** 按答案索引逐题点击页面选项，每次点击之间留出安全间隔。 */
export async function fill(panel: ActivePanel): Promise<void> {
  if (panel.busy) return;

  const { termId, quizId } = panel.options;
  if (termId === null) {
    panel.handle.setStatus('未取得课程信息，无法读取答案');
    return;
  }

  const questions = collectQuestions();
  if (questions.length === 0) {
    panel.handle.setStatus('当前页面没有可作答的题目');
    return;
  }

  setBusy(panel, true);
  panel.handle.setStatus('正在读取答案');

  try {
    const index = await loadAnswerIndex(quizId, termId);

    let clicked = 0;
    let unrecognized = 0;
    const missing: number[] = [];
    const total = questions.length;

    for (const [i, question] of questions.entries()) {
      const correct: HTMLInputElement[] = [];
      let recognized = false;
      for (const input of question.inputs) {
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
        missing.push(i + 1);
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

    const parts = [`共 ${total} 题，已选中 ${clicked} 项`];
    if (missing.length > 0) parts.push(`第 ${missing.join('、')} 题没有答案`);
    if (unrecognized > 0) parts.push(`${unrecognized} 道题的选项识别不了`);
    parts.push('核对后提交');
    panel.handle.setStatus(parts.join('；'));
  } catch (error) {
    panel.handle.setStatus(`填充失败：${error instanceof Error ? error.message : String(error)}`);
  } finally {
    setBusy(panel, false);
  }
}

/**
 * 提交答卷。
 *
 * 提交由后台执行（写入只从后台发出：内容脚本与后台各有节流器，写散到两边
 * 就可能并发触发平台的并发限制）；答案也在后台当场构造，不读草稿（原因见文件头）。
 *
 * 不做二次确认：提交按钮本身就是用户的确认动作。
 */
export async function submit(panel: ActivePanel): Promise<void> {
  if (panel.busy) return;

  const { termId, quizId } = panel.options;
  if (termId === null) {
    panel.handle.setStatus('未取得课程信息，无法提交');
    return;
  }

  setBusy(panel, true);
  panel.handle.setStatus('正在提交');

  try {
    const outcome = await sendToBackground({ type: 'MOOC_QUIZ_SUBMIT', tid: quizId, termId });
    if (outcome.status !== 'ok') {
      panel.handle.setStatus(outcome.message);
      return;
    }

    panel.handle.setStatus(`已提交 ${outcome.value.matched} 道题，正在刷新页面`);
    window.location.reload();
  } catch (error) {
    panel.handle.setStatus(`提交失败：${error instanceof Error ? error.message : String(error)}`);
  } finally {
    setBusy(panel, false);
  }
}
