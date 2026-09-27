/*
 * 做题页助手（前台）。
 *
 * 前后台分工：前台在用户在场时工作，作答过程必须看得见、可核对；
 * 后台位于 background/run-tasks.ts，无人值守，走纯接口。
 *
 * 两个动作的取法不同。
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
 * 面板按页面阶段呈现内容，阶段判定见 quiz-stage.ts。
 *
 * 安全说明：填充会通过页面触发保存草稿，提交会直接改变服务端状态。
 * 两者都必须由用户主动点击触发，扩展不做任何自动执行。约束见 docs/development.md。
 */

import {
  buildAnswerIndex,
  buildAnswers,
  getOpenQuizInfo,
  getQuizBank,
  getQuizPaper,
  submitQuiz,
  type AnswerIndex,
  type MoocClient,
  type OpenQuizInfo,
} from '@study-pilot/platform-mooc';
import { createPanel, panelButton, panelInfo, type PanelHandle } from './panel';
import {
  STAGE_DESCRIPTIONS,
  detectQuizStage,
  probeQuizStage,
  type QuizStage,
} from './quiz-stage';

const PANEL_ID = 'study-pilot-quiz-panel';

/*
 * 总分。这里的词必须与平台显示的一致——平台语言包里就叫「总分：」，
 * 换个说法用户会以为是另一回事。
 *
 * 截止时间、尝试次数、当前阶段、提交状态都没有放在面板上：那些平台上
 * 本来就显示着，扩展再抄一遍是重复，用户在一屏里看到两处相同的信息
 * 只会怀疑哪一处是准的。
 */
const LABEL_TOTAL_SCORE = '总分：';

/** 选项输入框。用元素类型限定，不依赖类名。 */
const OPTION_SELECTOR = 'input[type=radio], input[type=checkbox]';

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

interface PageQuestion {
  inputs: HTMLInputElement[];
}

export interface QuizHelperOptions {
  client: MoocClient;
  /** 课程学期 id。为 null 时无法读取题库 */
  termId: number | null;
  /** 当前测验的 tid */
  quizId: number;
}

interface ActivePanel {
  handle: PanelHandle;
  hint: HTMLElement;
  /** 截止时间等信息行的容器，由接口数据填充 */
  infoSlot: HTMLElement;
  fillButton: HTMLButtonElement;
  submitButton: HTMLButtonElement;
  options: QuizHelperOptions;
  stage: QuizStage;
  busy: boolean;
  /** 是否已经填充过信息行，避免重复请求 */
  infoLoaded: boolean;
}

let active: ActivePanel | null = null;
let cachedBank: { termId: number; index: AnswerIndex } | null = null;

/** 收集页面上可作答的题目，保持 DOM 顺序。 */
function collectQuestions(): PageQuestion[] {
  const questions: PageQuestion[] = [];

  for (const item of document.querySelectorAll('.u-questionItem')) {
    const inputs = Array.from(item.querySelectorAll<HTMLInputElement>(OPTION_SELECTOR));
    if (inputs.length === 0) continue;
    questions.push({ inputs });
  }

  return questions;
}

/**
 * 从页面选项元素提取选项 id。
 *
 * input id 形如 `op_<题id>_<选项id><加载时间戳>`，尾串每次刷新都会变。
 * 通过同题选项的 `name`（等于 `op_<题id><尾串>`）与 `id` 的差异把它剥掉，
 * 因此不需要假设尾串的长度或内容。
 */
function optionIdOf(input: HTMLInputElement): string | null {
  const { id, name } = input;
  if (!id.startsWith('op_')) return null;

  const rest = id.slice(3);
  const separator = rest.indexOf('_');
  if (separator <= 0) return null;

  const questionId = rest.slice(0, separator);
  let optionPart = rest.slice(separator + 1);

  const namePrefix = `op_${questionId}`;
  const suffix = name.startsWith(namePrefix) ? name.slice(namePrefix.length) : '';
  if (suffix.length > 0 && optionPart.endsWith(suffix)) {
    optionPart = optionPart.slice(0, -suffix.length);
  }

  return optionPart.length > 0 ? optionPart : null;
}

async function loadAnswerIndex(client: MoocClient, termId: number): Promise<AnswerIndex> {
  if (cachedBank?.termId === termId) return cachedBank.index;

  const result = await getQuizBank(client, termId);
  const index = buildAnswerIndex(result.ok ? result.value : []);
  cachedBank = { termId, index };
  return index;
}

/**
 * 取当前活跃答卷的 id。
 *
 * 必须走 getOpenQuizInfo 的顶层 aid。getOpenQuizPaperDto 传 0 返回的未必是
 * 页面正在用的那一份，targetAnswerform.aid 则是最近一次已提交的记录。
 */
async function resolveActiveAid(client: MoocClient, quizId: number): Promise<number | null> {
  const info = await getOpenQuizInfo(client, quizId);
  if (!info.ok) return null;
  const aid = info.value.aid;
  return typeof aid === 'number' && aid > 0 ? aid : null;
}

/** 缓存的测验信息，用于展示截止时间与尝试次数。 */
let cachedInfo: { tid: number; fetchedAt: number; value: OpenQuizInfo } | null = null;

/** 测验信息的缓存时长。页面停留期间截止时间不会变化，取一分钟足够。 */
const INFO_TTL_MS = 60_000;

/** 取测验信息。命中缓存时不重复请求。 */
async function loadQuizInfo(client: MoocClient, tid: number): Promise<OpenQuizInfo | null> {
  const now = Date.now();
  if (cachedInfo && cachedInfo.tid === tid && now - cachedInfo.fetchedAt < INFO_TTL_MS) {
    return cachedInfo.value;
  }

  const info = await getOpenQuizInfo(client, tid);
  if (!info.ok) return null;

  cachedInfo = { tid, fetchedAt: now, value: info.value };
  return info.value;
}

/**
 * 由测验信息构造面板上的信息行。
 *
 * 只放总分。截止时间、尝试次数、当前阶段这些平台上本来就显示着，
 * 面板再抄一遍只是重复——用户在一屏里看到两处相同的信息，
 * 不会更清楚，只会怀疑哪一处是准的。
 *
 * 总分留着是因为它与面板的动作直接相关：面板要做的是按题库作答，
 * 而总分说明这值多少分。
 */
function buildInfoRow(info: OpenQuizInfo): HTMLElement | null {
  if (typeof info.totalScore !== 'number' || info.totalScore <= 0) return null;
  return panelInfo([{ label: LABEL_TOTAL_SCORE, value: `${info.totalScore} 分` }]);
}

function setBusy(panel: ActivePanel, next: boolean): void {
  panel.busy = next;
  const interactive = panel.stage === 'answering';
  panel.fillButton.disabled = next || !interactive;
  panel.submitButton.disabled = next || !interactive;
}

function applyStage(panel: ActivePanel, stage: QuizStage): void {
  panel.stage = stage;
  panel.hint.textContent = STAGE_DESCRIPTIONS[stage];
  if (!panel.busy) setBusy(panel, false);
}

/** 按题库答案逐题点击页面选项，每次点击之间留出安全间隔。 */
async function fill(panel: ActivePanel): Promise<void> {
  if (panel.busy) return;
  const { client, termId } = panel.options;

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
    const index = await loadAnswerIndex(client, termId);

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
async function submit(panel: ActivePanel): Promise<void> {
  if (panel.busy) return;

  const { client, termId, quizId } = panel.options;
  if (termId === null) {
    panel.handle.setStatus('未取得课程信息，无法读取题库');
    return;
  }

  setBusy(panel, true);
  panel.handle.setStatus('正在构造答案');

  try {
    const index = await loadAnswerIndex(client, termId);

    const aid = await resolveActiveAid(client, quizId);
    if (aid === null) {
      panel.handle.setStatus('未找到进行中的答卷');
      return;
    }

    const paper = await getQuizPaper(client, quizId, aid);
    if (!paper.ok) {
      panel.handle.setStatus(`取卷失败：${paper.error.message}`);
      return;
    }

    const built = buildAnswers(paper.value, index);
    if (built.total === 0) {
      panel.handle.setStatus('这份答卷没有客观题，无法自动作答');
      return;
    }
    if (built.unresolved.length > 0) {
      panel.handle.setStatus(
        `异常：${built.unresolved.length} 道题未能在题库中找到答案，已中止提交。请重跑探测核对`,
      );
      return;
    }

    panel.handle.setStatus(`正在提交 ${built.matched} 道题`);
    const result = await submitQuiz(client, paper.value);
    if (!result.ok) {
      panel.handle.setStatus(`提交失败：${result.error.message}`);
      return;
    }

    panel.handle.setStatus(`已提交 ${built.matched} 道题，正在刷新页面查看结果`);
    window.location.reload();
  } catch (error) {
    panel.handle.setStatus(`提交失败：${error instanceof Error ? error.message : String(error)}`);
  } finally {
    setBusy(panel, false);
  }
}

function createActivePanel(options: QuizHelperOptions): ActivePanel {
  const handle = createPanel({ id: PANEL_ID, title: '做题助手', width: 260 });

  const hint = document.createElement('div');
  hint.className = 'sp-panel-hint';

  // 信息行由接口数据异步填充，先占位，避免面板出现时发生位移
  const infoSlot = document.createElement('div');

  const panel = {
    handle,
    hint,
    infoSlot,
    fillButton: panelButton('填充答案', 'fill', () => {
      void fill(panel);
    }),
    submitButton: panelButton('提交答案', 'submit', () => {
      void submit(panel);
    }),
    options,
    stage: 'loading' as QuizStage,
    busy: false,
    infoLoaded: false,
  };

  handle.body.append(infoSlot, hint, panel.fillButton, panel.submitButton);
  return panel;
}

/** 用接口数据填充信息行。只执行一次，失败时保持占位为空。 */
async function loadPanelInfo(panel: ActivePanel): Promise<void> {
  if (panel.infoLoaded) return;
  const termId = panel.options.termId;
  if (termId === null) return;

  panel.infoLoaded = true;

  try {
    const info = await loadQuizInfo(panel.options.client, panel.options.quizId);
    if (!info) return;
    if (!document.getElementById(PANEL_ID)) return;

    const row = buildInfoRow(info);
    if (row) panel.infoSlot.replaceChildren(row);
  } catch {
    // 信息行是辅助内容，取不到时留空即可，不影响作答
  }
}

/**
 * 展示或更新做题助手面板。
 *
 * 幂等：内容脚本会在每次 DOM 变化时调用它。面板仍在页面上时只更新内容，
 * 被页面重建后移除时则重新创建。
 */
export function showQuizHelper(options: QuizHelperOptions): void {
  if (active && !document.getElementById(PANEL_ID)) active = null;

  if (!active) active = createActivePanel(options);
  else active.options = options;

  const stage = detectQuizStage(probeQuizStage());
  if (active.stage !== stage) applyStage(active, stage);

  void loadPanelInfo(active);
}

export function removeQuizHelper(): void {
  document.getElementById(PANEL_ID)?.remove();
  active = null;
}
