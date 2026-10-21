/*
 * 智慧树「课程任务」：**四张板块卡**（设计文档 §2.1，2026-10-17 Ryan 定）。
 *
 *   教程视频 → 单元测试 → 见面课 → 期末考试          （平台自己的顺序）
 *
 * 一张卡一个板块（`.panel`），卡里一行一门课（行模板 `.ct-row`：课名 | 数据 | 动作）。
 * **四个板块恒在**——数据还没接入的那块由卡里的如实一句承担，不摆空行占位。
 * 板块的定义与顺序在 adapters/zhihuishu/boards.ts（弹窗用的是同一份）。
 *
 * 点击落点（Ryan 反复强调过，勿改）：
 *   视频那一行   → 学习页（studyUrl）
 *   测试/期末那行 → **作业考试列表页**（examListUrl），**不是开考那一卷**：
 *                  dohomework 路由一打开就在服务端建答卷（设计文档 §5）
 * 行内只有两个落点：整行 ＋「执行」——课名是纯文本（与慕课课件行同一形状）。
 * 成绩分析页只在「账号与课程」那一块由课名进入。
 *
 * 「执行」是**按板块**的授权（教程视频 → kind=courseware；单元测试 → kind=quiz），
 * 一条待办一条授权，范围由点击的那一行说清。期末考试**不自动**（只读展示 + 可点），
 * 因此那一行没有「执行」。
 *
 * 没有「课件」一说（设计文档 §2 定案）：智慧树的任务不套慕课那套「课件/待办」二分。
 * 执行期间进度与「停止」都在这门课那个板块那一行上；结果用底部浮层提示。
 * 运行状态的读取按平台收窄（platformRunningItem('zhihuishu')）。
 */

import { getTaskState, getZhsCourseTasks, runNow, stopRun, subscribeRunState } from '../../src/ui-bridge.ts';
import type { ZhsCourseTask, ZhsCourseTaskSummary, QueryOutcome } from '../../src/ui-bridge.ts';
import { errorText, formatDate } from '../../src/ui/format.ts';
import { ZHS_BOARDS, boardOfKind, type ZhsBoardId } from '../../src/adapters/zhihuishu/boards.ts';
import { meetPageUrl } from '../../src/adapters/zhihuishu/pages.ts';
import { platformRunningItem, progressLine, stoppedLine, STOPPING_TEXT } from '../../src/ui/run-view.ts';
import { loginNote, note, ZHS_LOGIN_URL } from './note.ts';
import { skeletonBlock } from './skeleton.ts';
import { renderZhsStatusLine } from './zhihuishu-status-line.ts';
import { toast } from './toast.ts';

/** 未运行时的按钮标题；禁用时换成 dataset.emptyTitle 里的原因。 */
const EXEC_TITLE = '执行：完成这门课余下的待办';

/** 运行期间的按钮集合：跑的时候全部禁掉（后台也会拒并发，这里只是别让人白点）。 */
const buttons: HTMLButtonElement[] = [];

/**
 * 每门课 × 板块那一行里的「正在执行」小字与按钮，按 `courseId:board` 索引；重画时整体换新。
 *
 * 不用课程名：同名课程（同一门课的不同学期）会让后一行覆盖前一行。
 * 运行快照里只有课程名，匹配时仍按名字 + 板块（同名课程都在这一轮的范围里）。
 */
const currents = new Map<string, { courseName: string; board: string; el: HTMLElement }>();
const buttonsOfCourse = new Map<string, { courseName: string; board: string; button: HTMLButtonElement }>();

function rowKey(courseId: number, board: string): string {
  return `${courseId}:${board}`;
}

function setStatus(text: string, tone: 'idle' | 'busy' | 'error'): void {
  if (tone === 'busy' || text === '') return;
  toast(text);
}

function setEnabled(enabled: boolean): void {
  for (const button of buttons) {
    button.disabled = !enabled || button.dataset.empty === 'yes';
  }
  if (enabled) {
    // 收尾已由发起方写（runNow 的 setStatus）：本页的标记在这里复位
    localRun = false;
    stopping = false;
    stoppedHere = false;
  }
}

/**
 * 重读课程任务区。跑完一轮之后、课程勾选变动之后、以及读取课程列表之后都用它。
 *
 * 重读即是等待：四张卡换成同样的四张、卡里先立骨架（同时把旧范围算出的旧数字
 * 撤下）。卡头状态行自带骨架，见 zhihuishu-status-line.ts。
 */
export async function refreshZhsTaskViews(): Promise<void> {
  markZhsTasksLoading();
  const fresh = getZhsCourseTasks();
  await Promise.all([renderZhsStatusLine(fresh), renderZhsCourseTasks(fresh)]);
}

let watching = false;
/** 这一轮是本页发起的（与弹窗的 localRun 同一含义）：收尾文案归 runNow */
let localRun = false;
/** 按过停止、那一轮还没收尾：卡里显示「正在停止」，不再被进度盖掉 */
let stopping = false;
/** 本页按过停止、并确认停到了一轮：若不归本页报结果，收尾时补一句「已停止」 */
let stoppedHere = false;
/** 最后一次「还在跑」快照里的完成数（智慧树平台自己的）。收尾文案从这里数 */
let lastFinished = 0;
/** 订阅里见过「正在跑」：用来识别「刚刚跑完」这一瞬（开通时的空闲快照不算） */
let sawRun = false;

/**
 * 课程任务这一块的状态行（四张板块卡之上）：「上次执行失败」。
 *
 * 失败留痕按平台独立（见 application 的 TaskState.platforms），这里只呈现智慧树
 * 自己那条；平台给了「下一步」动作时右侧给一个跳转钮——形状与课件卡头那条逐字
 * 同构（courseware.ts 的 renderFailure），两处的「一句说明 ＋ 一个去处」只有这一种长相。
 * 它不落在任何一张板块卡的卡头：失败是按平台记的，四张卡里没有哪一张独占它。
 * 跑动中不呈现——那一路的状态是板块行里的运行明细。
 */
async function renderZhsFailure(): Promise<void> {
  const headEl = document.getElementById('zhs-tasks-head');
  const statusEl = document.getElementById('zhs-tasks-status');
  const actionEl = document.getElementById('zhs-tasks-action');
  if (statusEl === null || !(actionEl instanceof HTMLAnchorElement)) return;

  let status: Awaited<ReturnType<typeof getTaskState>>;
  try {
    status = await getTaskState('zhihuishu');
  } catch {
    // 与课件卡同一条：读不到执行状态就收干净，不拿上一次的留痕冒充现状
    if (headEl !== null) headEl.hidden = true;
    statusEl.textContent = '';
    actionEl.hidden = true;
    return;
  }
  const failure =
    status.live === 'running' ? null : (status.state.platforms['zhihuishu']?.failure ?? null);

  if (headEl !== null) headEl.hidden = failure === null;
  statusEl.textContent = failure !== null ? `上次执行失败：${failure.message}` : '';

  actionEl.hidden = failure?.action == null;
  if (failure !== null && failure.action !== null) {
    actionEl.textContent = failure.action.label;
    actionEl.href = failure.action.url;
  }
}

function watchRun(): void {
  if (watching) return;
  watching = true;
  subscribeRunState((state) => {
    const zhihuishu = state.platforms.find((platform) => platform.id === 'zhihuishu');
    const running = zhihuishu !== undefined && zhihuishu.state === 'running';
    if (!running) stopping = false;
    if (running) {
      // 刚起跑：卡头的失败行让位（renderZhsFailure 读到 running 会自行清空；
      // 收尾后由 refreshZhsTaskViews 重画回来）
      if (!sawRun) void renderZhsFailure();
      sawRun = true;
      lastFinished = zhihuishu.finished;
    }

    // 正在跑的那一项（读取与措辞与弹窗共用同一份；按平台收窄）
    const step = platformRunningItem(state, 'zhihuishu');
    const runningBoard = step !== null ? boardOfKind(step.kind) : null;

    const isRunningRow = (courseName: string, board: string): boolean =>
      running && step !== null && runningBoard !== null && step.course === courseName && runningBoard === board;

    // 卡内小字：只有跑的那一行有；停止收尾中冻结（「正在停止…」由点击处写）
    for (const entry of currents.values()) {
      if (running && stopping) continue;
      const onThisRow = isRunningRow(entry.courseName, entry.board);
      entry.el.hidden = !onThisRow;
      entry.el.closest('.ct-row')?.classList.toggle('is-running', onThisRow);
      if (onThisRow && step !== null) entry.el.textContent = progressLine(step);
    }

    /*
     * 按钮：跑的那门课把「执行」换成「停止」；一轮在跑期间其余按钮一律禁用
     * （不论这一轮在哪里发起——后台拒并发，别让人白点）；跑完了整区还原。
     */
    for (const entry of buttonsOfCourse.values()) {
      const button = entry.button;
      if (isRunningRow(entry.courseName, entry.board)) {
        button.dataset.mode = 'stop';
        button.textContent = '停止';
        button.title = '停止：不再发出新的写入请求';
        if (!stopping) button.disabled = false;
        continue;
      }
      if (running) {
        button.disabled = true;
        continue;
      }
      if (button.dataset.mode === 'stop') {
        delete button.dataset.mode;
        button.textContent = '执行';
        button.title = button.dataset.emptyTitle ?? EXEC_TITLE;
      }
      button.disabled = button.dataset.empty === 'yes';
    }

    if (running) return;
    // 收尾了：本页发起的那轮由 runNow 报结果；旁观者（别处发起、用户在这里停的）补一句
    const stopped = stoppedHere;
    stoppedHere = false;
    if (stopped && !localRun) toast(stoppedLine(lastFinished));

    /*
     * 收尾重读只归一个人：别处发起的轮次（比如弹窗的执行）没有人等结果，
     * 本页在这里补一次重读——否则「可代为完成」计数留在旧值。
     * sawRun 门闩：订阅建立时会先回一份空闲快照，那一下不该触发重读。
     */
    if (sawRun && !localRun) void refreshZhsTaskViews();
    sawRun = false;
  });
}

/**
 * 一行：课名 + 运行小字 + 数据 + 动作；**整行点去这一块在平台上的页面**。
 *
 * 行里只有两个落点：垫底的长链接（`.todo-open`，与弹窗同一手法）与「执行」。
 * 课名是**纯文本**——与慕课课件行同一形状（courseware.ts 的 `.cw-name`）：
 * 一行里挂第二个去处，点击语义就得分岔，两页也就长成了两套。
 */
function buildRow(
  entry: ZhsCourseTask,
  input: { board: ZhsBoardId; value: string; valueTitle?: string; href: string; action?: HTMLButtonElement },
): HTMLElement {
  const row = document.createElement('div');
  row.className = 'ct-row';

  const open = document.createElement('a');
  open.className = 'todo-open';
  open.href = input.href;
  open.target = '_blank';
  open.rel = 'noreferrer';
  open.setAttribute('aria-label', `打开${entry.courseName}这块任务在平台的页面`);
  row.append(open);

  const group = document.createElement('span');
  group.className = 'cw-group';

  const name = document.createElement('span');
  name.className = 'cw-name';
  name.textContent = entry.courseName;
  group.append(name);

  const current = document.createElement('span');
  current.className = 'cw-current';
  current.hidden = true;
  currents.set(rowKey(entry.courseId, input.board), {
    courseName: entry.courseName,
    board: input.board,
    el: current,
  });
  group.append(current);

  const text = document.createElement('span');
  text.className = 'cw-progress';
  text.textContent = input.value;
  if (input.valueTitle !== undefined) text.title = input.valueTitle;

  row.append(group, text);
  if (input.action !== undefined) {
    buttonsOfCourse.set(rowKey(entry.courseId, input.board), {
      courseName: entry.courseName,
      board: input.board,
      button: input.action,
    });
    row.append(input.action);
  }
  return row;
}

/**
 * 「执行」按钮。同一个课程同一时刻只有一个板块能跑（后台拒并发），
 * 但按钮各归各行：谁被点了谁变「停止」，其余行在跑动期间禁用。
 */
function buildRunButton(
  entry: ZhsCourseTask,
  board: (typeof ZHS_BOARDS)[number],
  options: { empty: boolean; emptyTitle: string; title: string },
): HTMLButtonElement {
  const button = document.createElement('button');
  button.className = 'btn ghost';
  button.type = 'button';
  button.textContent = '执行';
  button.title = options.title;
  button.dataset.board = board.id;
  button.dataset.empty = options.empty ? 'yes' : 'no';
  if (options.empty) {
    button.disabled = true;
    // 禁用时悬停要回答「为什么不能点」，而不是继续念可执行时的标题
    button.title = options.emptyTitle;
  }

  buttons.push(button);

  button.addEventListener('click', () => {
    const current = currents.get(rowKey(entry.courseId, board.id))?.el;
    // 同一枚按钮两种身份：跑着的时候它是「停止」
    if (button.dataset.mode === 'stop') {
      button.disabled = true;
      stopping = true;
      if (current) {
        current.hidden = false;
        current.textContent = STOPPING_TEXT;
      }
      void stopRun('zhihuishu')
        .then((result) => {
          if (result.stopped) {
            stoppedHere = true;
            return;
          }
          stopping = false;
          delete button.dataset.mode;
          button.textContent = '执行';
          button.disabled = button.dataset.empty === 'yes';
          button.title = button.dataset.empty === 'yes' ? options.emptyTitle : options.title;
          if (current) current.hidden = true;
        })
        .catch((error: unknown) => {
          // 与课件行同一处置：停止请求失败时把这一行还原，并说出原因
          stopping = false;
          delete button.dataset.mode;
          button.textContent = '执行';
          button.disabled = button.dataset.empty === 'yes';
          button.title = button.dataset.empty === 'yes' ? options.emptyTitle : options.title;
          if (current) current.hidden = true;
          toast(`停止失败：${errorText(error)}`);
        });
      return;
    }
    stopping = false;
    localRun = true;
    void runNow(
      {
        setStatus,
        setEnabled,
        refresh: refreshZhsTaskViews,
      },
      /*
       * 按板块授权：只做这一类的待办（教程视频 = courseware、单元测试 = quiz）。
       * 类别取值由平台包定义，这里原样传，不解释。
       */
      { platformId: 'zhihuishu', group: entry.courseName, kinds: [...board.kinds] },
    );
  });

  return button;
}

/**
 * 一张板块卡：一张 `.panel`，卡头是板块名；卡里装什么由调用方给
 * （行、等待的骨架、或一句如实的说明）。
 */
function buildBoardCard(board: (typeof ZHS_BOARDS)[number], body: Node[]): HTMLElement {
  const card = document.createElement('section');
  card.className = 'panel';

  const head = document.createElement('div');
  head.className = 'panel-head';
  const title = document.createElement('h2');
  title.className = 'panel-title';
  title.textContent = board.title;
  head.append(title);
  card.append(head, ...body);
  return card;
}

/**
 * 一块板块卡的内容：一行一门课，没读到结构的逐课写清，一行都没有时给一句说明
 * （不摆空行占位——空行会被读成零）。
 */
function boardRows(
  board: (typeof ZHS_BOARDS)[number],
  courses: ZhsCourseTask[],
  rows: (entry: ZhsCourseTask) => HTMLElement | null,
  emptyLine: string,
): Node[] {
  const body: Node[] = [];
  for (const entry of courses) {
    if (entry.unread === true) {
      // 结构没读到：不拿全 0 冒充，逐课写清（与课件行同一表现）
      body.push(rowOfUnread(entry, board));
      continue;
    }
    const row = rows(entry);
    if (row !== null) body.push(row);
  }
  if (body.length === 0) body.push(note(emptyLine));
  return body;
}

/**
 * 等待平台读取：**四个板块恒在**，各自卡里一块骨架守位。
 *
 * 不在列表区摆一块大骨架顶替四张卡——那是「这一整块还没东西」的说法，
 * 而四张卡的形状与落定后一致，读回来时只有卡里的内容换，版面不跳。
 */
export function markZhsTasksLoading(): void {
  const listEl = document.getElementById('zhs-tasks-list');
  if (listEl === null) return;
  listEl.replaceChildren(...ZHS_BOARDS.map((board) => buildBoardCard(board, [skeletonBlock()])));
}

/** 结构没读到的一行：只说事实，数字不显示。 */
function rowOfUnread(entry: ZhsCourseTask, board: (typeof ZHS_BOARDS)[number]): HTMLElement {
  return buildRow(entry, {
    board: board.id,
    value: '未读取到内容',
    valueTitle: '未读取到这门课的结构，点击上方「读取课程列表」刷新。',
    href: board.id === 'video' ? entry.studyUrl : entry.examListUrl,
  });
}

export async function renderZhsCourseTasks(
  read?: Promise<QueryOutcome<ZhsCourseTaskSummary>>,
): Promise<void> {
  const listEl = document.getElementById('zhs-tasks-list');
  if (listEl === null) return;

  // 等待：四张卡先在（读回来只换卡里的内容，版面不跳）
  markZhsTasksLoading();

  // 失败留痕与列表走同一条渲染路径（首帧、重读、跑完都会到这里）
  void renderZhsFailure();

  watchRun();

  buttons.length = 0;
  currents.clear();
  buttonsOfCourse.clear();

  let outcome: QueryOutcome<ZhsCourseTaskSummary>;
  try {
    outcome = await (read ?? getZhsCourseTasks());
  } catch (error) {
    listEl.replaceChildren(note(errorText(error), true));
    return;
  }

  if (outcome.status === 'error') {
    listEl.replaceChildren();
    if (outcome.reason === 'NOT_LOGGED_IN') {
      // 未登录不是「出错」，是少做了一步：给按钮把人送去登录，而不是只留一句话
      listEl.append(loginNote('未登录，在浏览器登录智慧树后执行。', ZHS_LOGIN_URL));
      return;
    }
    listEl.append(note(`读取失败：${outcome.message}`, true));
    return;
  }

  if (outcome.value.courses.length === 0) {
    listEl.replaceChildren(note('尚未选择参与任务的课程，见上方「账号与课程」。'));
    return;
  }

  const courses = outcome.value.courses;
  const [video, quiz, meet, final] = ZHS_BOARDS;

  /*
   * 四张卡按平台顺序排出，**恒在**（数据没接入的那块由卡里的如实一句承担）。
   * 每张卡里的行是「这门课在这个板块上的样子」。
   */
  listEl.replaceChildren(
    buildBoardCard(video, boardRows(video, courses, videoRow, '没有需要看的视频。')),
    buildBoardCard(quiz, boardRows(quiz, courses, quizRow, '没有单元测试。')),
    buildBoardCard(meet, boardRows(meet, courses, meetRow, '这门课没有见面课测验。')),
    buildBoardCard(final, boardRows(final, courses, finalRow, '未读取到期末考试。')),
  );
}

/** 教程视频那一行：进度 + 执行（kind=courseware）。 */
function videoRow(entry: ZhsCourseTask): HTMLElement | null {
  const none = entry.video.total === 0;
  const done = !none && entry.video.done === entry.video.total;
  return buildRow(entry, {
    value: none ? '没有视频单元' : `视频 ${entry.video.done}/${entry.video.total}`,
    valueTitle: none
      ? '平台结构里这门课没有视频单元'
      : '已完成 / 全部视频单元，口径同平台的成绩分析页',
    board: ZHS_BOARDS[0].id,
    href: entry.studyUrl,
    action: buildRunButton(entry, ZHS_BOARDS[0], {
      empty: none || done,
      emptyTitle: none ? '这门课没有视频单元' : '这门课的视频都看完了',
      title: '执行：完成这门课没看完的视频',
    }),
  });
}

/**
 * 单元测试那一行：设计文档 §2.1 的两个口径一起给——
 * 「已交 x/y」问交没交，「其中 N 卷未满分」问还剩多少可做。
 * 读不到那两页签时整行如实降级（不拿 0/0 冒充）。
 */
function quizRow(entry: ZhsCourseTask): HTMLElement | null {
  const unread = entry.quizUnreadReason !== null;
  const none = !unread && entry.quiz.total === 0;
  const value = unread
    ? '单元测试未读取到'
    : none
      ? '没有单元测试'
      : `已交 ${entry.quiz.done}/${entry.quiz.total} · 其中 ${entry.quizNotFull} 卷未满分`;
  return buildRow(entry, {
    value,
    valueTitle: unread
      ? `单元测试读取失败：${entry.quizUnreadReason ?? ''}`
      : none
        ? '平台的作业清单里这门课没有单元测试'
        : '前一个数是已交的卷数（进度），后一个数是其中还没拿满分的卷数（还能不能做）',
    board: ZHS_BOARDS[1].id,
    href: entry.examListUrl,
    action: buildRunButton(entry, ZHS_BOARDS[1], {
      // 「还有没有可做的」执行侧现读现算（未满分的卷还要看剩余重做次数），这里只在能确定全齐时禁用
      empty: !unread && (none || (entry.quiz.done === entry.quiz.total && entry.quizNotFull === 0)),
      emptyTitle: none ? '这门课没有单元测试' : '这门课的单元测试都交了，且都是满分',
      title: '执行：完成这门课没交的单元测试',
    }),
  });
}

/**
 * 见面课那一行：见面课测验的「已交 / 全部」。与单元测试**同一份清单**里的另一类
 * 条目（`meetCourseType=1`，名字就是场次名），所以这一格是真的，不是估的。
 *
 * **没有「执行」**：这条路要先接场次（`examH5Url` 才是它的答卷入口，与单元测试
 * 的入口参数不同），执行侧没验过之前不摆按钮——按钮在那儿就等于许诺能做掉。
 * 场次与测验计数已经接上**只读**（`meetSessions` 来自见面课页自己的接口，
 * 测验与单元测试同一份作业清单）；还没接的是考勤分（看直播/回放满 80% 那一路）
 * 与执行入口，属于模块 4 的剩余部分。
 */
function meetRow(entry: ZhsCourseTask): HTMLElement {
  const unread = entry.quizUnreadReason !== null;
  if (entry.meetSessionsNote !== null) {
    return buildRow(entry, {
      board: ZHS_BOARDS[2].id,
      value: '见面课未读取到',
      valueTitle: entry.meetSessionsNote,
      href: meetPageUrl(entry.recruitId),
    });
  }

  const parts: string[] = [];
  const sessions = entry.meetSessions;
  if (sessions !== null) {
    // 考勤按学校口径是「看直播/回放满 80%」——这一格要说的是「还有几场得去看」
    parts.push(sessions.total === 0 ? '无场次' : `场次 ${sessions.total}`);
    if (sessions.upcoming > 0) parts.push(`未开始 ${sessions.upcoming}`);
  }
  if (unread) parts.push('测验未读取到');
  else if (entry.meet.total > 0) parts.push(`测验 ${entry.meet.done}/${entry.meet.total}`);

  return buildRow(entry, {
    board: ZHS_BOARDS[2].id,
    value: parts.length === 0 ? '没有见面课' : parts.join(' · '),
    valueTitle: unread
      ? `作业清单读取失败：${entry.quizUnreadReason ?? ''}`
      : '场次来自见面课页自己的接口；测验与单元测试同一份作业清单。考勤＝看直播或回放满 80%（学校口径）',
    href: meetPageUrl(entry.recruitId),
  });
}

/**
 * 期末考试那一行：只读展示 + 可点（整行去作业考试列表页），**没有执行**——
 * 期末不自动（设计文档 §2.1）。读不到/不适用时把这门课的实情写在这一行里。
 *
 * 两个口径都只由**时间与次数**说：开考了没有看 `startAt`，还能不能做看
 * `remainCount`。`state` 那个数是平台的原始字段（取值含义属模块 1 的实况），
 * 这一行不拿它猜措辞。
 */
function finalRow(entry: ZhsCourseTask): HTMLElement | null {
  if (entry.finalExam === null) {
    if (entry.finalExamNote === null) return null;
    return buildRow(entry, { board: ZHS_BOARDS[3].id, value: entry.finalExamNote, href: entry.examListUrl });
  }
  const exam = entry.finalExam;
  const parts: string[] = [];
  if (exam.startAt !== null) {
    parts.push(Date.now() < exam.startAt ? `${formatDate(exam.startAt)} 开考` : '已开考');
  }
  parts.push(exam.remainCount > 0 ? `剩余 ${exam.remainCount} 次` : '已无剩余机会');
  return buildRow(entry, {
    board: ZHS_BOARDS[3].id,
    value: parts.join(' · '),
    valueTitle: exam.examName,
    href: entry.examListUrl,
  });
}
