/*
 * 两个动作：填充与提交。
 *
 * 一、填充走页面操作，不调写接口。
 *     选择类是点击选项（radio/checkbox），填空题是把答案插进平台的填空控件
 *     （contenteditable，与真人输入同一条路径：选区 + insertText，平台据此收到
 *     自己的 input 事件并保存草稿）。写得进就写，写不进也不影响结果，因为提交体
 *     自带答案。动作之间必须留出间隔：连续写会触发服务端的并发限制。
 *
 * 二、提交走接口，并且当场重新构造答案，不读草稿。
 *     这是本流程成立的关键：实测 saveDraftAnswers 返回成功之后草稿依然是空的
 *     （用页面自己的点击也是如此），因此任何依赖草稿的提交都不可靠；而提交体
 *     携带的 answers 是有效的。作答与提交的唯一实现在平台的 answerAndSubmitQuiz。
 *
 * 安全：填充经页面触发保存草稿，提交直接改变服务端状态——两者都必须由用户
 * 主动点击触发，扩展在作答页上不做任何自动执行。
 */

import { sendToBackground } from '../../../messages.ts';
import { loadFillAnswers } from './data.ts';
import { collectQuestions, optionIdOf } from './options.ts';
import { setBusy, type ActivePanel } from './panel.ts';

/**
 * 两次写之间的安全间隔，单位为毫秒。
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

/**
 * 把答案写进填空题的 textarea，返回是否真的写进去了。
 *
 * 写的是 `value` 并按输入控件的常规派发 input/change（页面与框架据此感知修改），
 * 最后失焦收起编辑态。**写完当场核实**：写不进就返回 false，
 * 由调用方如实报失败——不核实就报「已填」是假成功（2026-10-17 踩过：
 * 当时按 contenteditable 的路径写 textarea，一个字没进去却报了「已填 3 个」）。
 */
function typeIntoBlank(control: HTMLTextAreaElement, text: string): boolean {
  control.focus();
  control.value = text;
  control.dispatchEvent(new Event('input', { bubbles: true }));
  control.dispatchEvent(new Event('change', { bubbles: true }));
  control.blur();

  return control.value.trim() === text.trim() && control.value.trim() !== '';
}

/** 按答案逐题作答：选择类点击选项，填空题填入文本；每次动作之间留出安全间隔。 */
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
    const loaded = await loadFillAnswers(quizId, termId);
    if (!loaded.ok) {
      // 取数失败如实说（例如平台限流）：不吞错、不伪装成「没有答案」
      panel.handle.setStatus(`读取答案失败：${loaded.message}`);
      return;
    }
    const { options, blanks } = loaded.value;

    let clicked = 0;
    let typed = 0;
    let unrecognized = 0;
    let blankCursor = 0;
    const missing: number[] = [];
    const failed: number[] = [];
    const total = questions.length;

    for (const [i, question] of questions.entries()) {
      // 填空题：答案按显示顺序对（页面是 textarea，没有 id 可查）
      if (question.inputs.length === 0 && question.blank !== null) {
        const answer = blanks[blankCursor] ?? null;
        blankCursor++;
        if (answer === null) {
          missing.push(i + 1);
          continue;
        }
        panel.handle.setStatus(`正在作答：第 ${i + 1} / ${total} 题`);
        if (typeIntoBlank(question.blank, answer)) typed++;
        else failed.push(i + 1);
        await sleep(WRITE_GAP_MS);
        continue;
      }

      const correct: HTMLInputElement[] = [];
      let recognized = false;
      for (const input of question.inputs) {
        const optionId = optionIdOf(input);
        if (optionId === null) continue;
        recognized = true;
        if (options.get(optionId) === true) correct.push(input);
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

    const parts = [`共 ${total} 题`, `已选中 ${clicked} 项`];
    if (typed > 0) parts.push(`已填 ${typed} 个填空`);
    if (failed.length > 0) parts.push(`第 ${failed.join('、')} 题填空没写进去`);
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
