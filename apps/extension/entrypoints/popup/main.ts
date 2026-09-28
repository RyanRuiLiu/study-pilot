/*
 * 扩展弹窗。
 *
 * 布局依据：用户打开弹窗的动作是「看有什么要交，然后点进去做」。
 * 因此待办是主体，且按截止时间分档——回答的是「我先做什么」，
 * 而不是「这门课有什么」。左侧色条编码类型、右侧文字编码紧迫度，
 * 两个维度各占一个视觉通道。
 *
 * 样式分三层引入：tokens（取值）、base（通用元素）、本页布局。
 * 必须通过 import 引入，不能用 HTML 的 <link>——构建后源路径不会被
 * 改写，会变成死链，页面于是回退到浏览器默认样式。
 *
 * 数据来源：
 *   调度状态   后台的 TASK_STATE（本地持久化）
 *   待办明细   后台按当前状态派生：能自动做的标出来，其余交给用户
 *   总开关     settings.enabled
 */

import '../../src/ui/tokens.css';
import './style.css';
import { getSettings, watchSettings, type Settings } from '../../src/settings';
import {
  REJECTION_MESSAGES,
  sendToBackground,
  type JobRejection,
  type PendingEntry,
  type PendingSummary,
} from '../../src/platform/messaging';
import { workPageUrl } from '@study-pilot/platform-mooc';
import { formatClock, formatDate } from '../../src/features/format';

const stateEl = document.getElementById('state-text');
// 这几个元素由同一个 popup/index.html 提供，必然存在。
const todoEl = document.getElementById('todo-text') as HTMLElement;
const runBtn = document.getElementById('run-now') as HTMLButtonElement | null;
const settingsBtn = document.getElementById('open-settings');
const versionEl = document.getElementById('version');

// 版本号取自 manifest，避免两处各写一份而不同步
if (versionEl) versionEl.textContent = `v${browser.runtime.getManifest().version}`;

function setText(el: HTMLElement | null, text: string): void {
  if (!el) return;
  el.textContent = text;
  // 状态行空着时不占位：它是一行独立元素，占着会多出一条空白带
  if (el === stateEl) el.classList.toggle('f-dn', text === '');
}

let current: Settings | null = null;

/*
 * 执行状态的跟随。
 *
 * 后台的执行可能正在进行中——浏览器刚启动时的自动执行，或用户几秒前点了
 * 「执行」。弹窗只在打开那一刻读一次状态的话，这两种情况都会显示成
 * 「什么都没有」，几秒后待办才突然变样，用户不知道中间发生了什么。
 *
 * 所以执行期间持续跟随，结束后停下。只在需要时轮询：
 * 无事发生时不发任何请求，这一点与后台「不做无用请求」的原则一致。
 */
let followTimer: number | null = null;

/** 是否需要跟随：只有正在执行时才轮询。 */
function stopFollowing(): void {
  if (followTimer !== null) {
    window.clearInterval(followTimer);
    followTimer = null;
  }
}

function startFollowing(): void {
  if (followTimer !== null) return;
  followTimer = window.setInterval(() => {
    void renderState().then((running) => {
      if (!running) {
        stopFollowing();
        // 执行刚结束：待办与状态都可能变了，重读一次
        void renderTodo();
      }
    });
  }, 1000);
}

/**
 * 渲染总开关与执行状态。返回此刻是否正在执行。
 *
 * 「当前状态」这一格只在有事情正在发生时有内容——空着自然收起，不占一行。
 * 总开关的状态由它自己的开关位置表达，不必再用文字说一遍。
 *
 * 按钮的可按性也由这里决定：正在执行时点击只会被后台拒绝，
 * 与其让用户点了才发现，不如直接禁掉。
 *
 * 「下次执行」不在弹窗显示：它是排程信息，而这里最需要回答的是
 * 「现在要做什么」，何时自动执行属于配置，放设置页更合适。
 */
/**
 * 渲染总开关与执行状态。返回「此刻后台是否真的在跑」。
 *
 * 状态一律取自后台（TASK_STATE 的 live），弹窗不自己推断：
 *   running         正在跑——跟着轮询，跑完自动重读待办
 *   interrupted     上次运行没结束，是浏览器被强杀留下的标记，不会自己恢复
 *   awaiting-login  因未登录挂起，登录后会自动补做
 *
 * 早期这里是 `settings.enabled && state.runningSince !== null`，两处都错：
 * 总开关一关，真实状态就被掩盖；而那个字段在强杀之后仍留着，于是弹窗
 * 一直显示「正在执行」，用户等的是一件永远不会发生的事。
 *
 * 按钮的可按性也由这里决定：正在跑时点击只会被后台拒绝。
 */
async function renderState(): Promise<boolean> {
  const settings = await getSettings();
  current = settings;

  /*
   * 刚点下「执行」的那一两秒里，后台可能还没落下心跳。这时保留点击那一刻
   * 写好的文案（下面 idle 分支不覆盖它），但状态本身仍以后台为准——
   * 下一秒的轮询就会把它纠正过来。
   */
  const justClicked = manualRunning;

  try {
    const status = await sendToBackground({ type: 'TASK_STATE' });
    const running = status.live === 'running';

    stateEl?.classList.remove('is-busy', 'is-error');

    if (running) {
      setText(stateEl, '正在执行');
      stateEl?.classList.add('is-busy');
    } else if (status.live === 'interrupted') {
      setText(stateEl, '上次运行未结束，下次检查时接着做');
    } else if (status.live === 'awaiting-login') {
      setText(stateEl, '等待登录，登录后接着完成');
    } else if (!justClicked) {
      // 没有正在发生的事就收起这一行；刚点过执行时留着结果显示
      setText(stateEl, '');
    }

    if (runBtn) runBtn.disabled = !settings.enabled || running;

    if (running) startFollowing();
    else stopFollowing();

    return running;
  } catch (error) {
    setText(stateEl, error instanceof Error ? error.message : '读取失败');
    stateEl?.classList.add('is-error');
    if (runBtn) runBtn.disabled = !settings.enabled;
    return false;
  }
}

/** 手动执行是否正在进行。它优先于轮询读到的状态。 */
let manualRunning = false;

/** 统计已勾选课程的待办。取不到时显示为无。 */
const DAY_MS = 24 * 60 * 60 * 1000;


/**
 * 相对说法。它是这一屏的主信息。
 *
 * 学生看到日期要先做一次心算（今天几号、还剩几天），看到「明天」不用。
 * 所以主行放相对说法，确切日期退到副行。
 */
/**
 * 两个时刻相隔几个自然日。
 *
 * 不能拿 (a - b) / 一天 再取整：那是 24 小时周期，不是日历上的日子。
 * 今天 22:00 距明天 20:00 只有 22 小时，按 24 小时周期算是「今天」，
 * 而用户看的是日子——那分明是明天的截止。
 * 反过来，凌晨 00:30 看昨晚 23:00 的截止，算出来是「已过期 1 天」，
 * 实际只过了半小时。
 *
 * 因此先把两个时刻各自归到当天零点，再相减。
 */
function daysBetween(from: number, to: number): number {
  const a = new Date(from);
  const b = new Date(to);
  const startOfA = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  const startOfB = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
  return Math.round((startOfA - startOfB) / DAY_MS);
}

/** 相对说法。它是这一屏的主信息，给出「还剩几天」的直观判断。 */
function relativeDay(deadline: number): string {
  if (deadline <= 0) return '无截止时间';
  const days = daysBetween(deadline, Date.now());
  if (days < 0) return `已过期 ${-days} 天`;
  if (days === 0) return '今天';
  if (days === 1) return '明天';
  if (days === 2) return '后天';
  return `${days} 天后`;
}

/**
 * 紧迫程度，决定主行是否用红色。
 *
 * 只给「今天截止」与「已过期」上色，不给「三天内」。
 * 一开始用的是三天阈值，但实际数据里作业常常集中在同一两天，
 * 结果一屏四条全红，红色退化成背景色，反而看不出哪条真的晚了。
 * 明天与后天已经很醒目（字号最大且加粗），不需要再上色。
 */
/**
 * 是否紧急。
 *
 * 今天到期或已经过期的标出来。判据同样是自然日：今天 22:00 看明天 20:00
 * 的截止不算紧急（还有一整天），而按 24 小时周期算会被误标成紧急。
 */
function isUrgent(deadline: number): boolean {
  if (deadline <= 0) return false;
  return daysBetween(deadline, Date.now()) <= 0;
}


/**
 * 渲染待办。
 *
 * 按课程分组：用户的注意力单位是「这门课我还要交什么」，按课程归拢
 * 比按时间平铺更贴近他做完一门再换下一门的方式。课程内部再按截止时间
 * 升序，最紧的排在前面。
 *
 * 课程标题右侧标出这门课最紧的剩余时间，并用颜色提示紧迫度；
 * 条目右侧标出各自的剩余时间与类型。
 *
 * 三种情况分别呈现，不混为一谈：
 *   失败           显示失败原因
 *   成功但无事可办  显示「暂无待办」——这是确切结论，不是读取不出
 *   成功且有事项    逐条列出
 */
async function renderTodo(): Promise<void> {
  if (!current) return;

  const courses = current.mooc.background.courses.filter((course) => course.enabled);
  if (courses.length === 0) {
    writeTodo([]);
    const note = document.createElement('p');
    note.className = 'todo-empty';
    note.textContent = '尚未选择参与任务的课程。请到设置页读取课程列表并勾选。';
    todoEl.append(note);
    return;
  }

  try {
    /*
     * 不传课程列表：后台从配置里自己取。
     * 前台传过去的那份可能比存储里的旧（比如刚在设置页改过），
     * 而「读哪些课」这种事以配置为准才不会两边不一致。
     */
    const outcome = (await browser.runtime.sendMessage({
      type: 'PENDING_SUMMARY',
    })) as
      | { status: 'ok'; value: PendingSummary; running?: boolean }
      | { status: 'error'; message: string; reason?: 'NOT_LOGGED_IN' }
      | undefined;

    if (!outcome) {
      setTodoError('后台无响应');
      return;
    }
    if (outcome.status === 'error') {
      /*
       * 未登录与读取失败要分开说。
       *
       * 未登录不是出错，是少做了一步：待办读不到是因为平台不知道该给谁读。
       * 尤其它发生在会话过期之后——用户什么都没做错，只是浏览器关了几天。
       * 所以这里给的是去处（一个能点开的登录页），不是一句错误提示。
       */
      if (outcome.reason === 'NOT_LOGGED_IN') {
        showLoginPrompt();
        return;
      }
      setTodoError(outcome.message);
      return;
    }

    const { entries } = outcome.value;

    /*
     * 后台正在执行时，这一份取自执行前的快照（后台刻意不再重新拉取，
     * 免得与执行互相覆盖）。说明来源与后续，否则用户看到清单迟迟不变，
     * 会以为扩展没有反应。
     */
    const pending = outcome.running ? runningNote() : null;
    writeTodo(pending ? [pending] : []);

    /*
     * 过期项单独一段，不参与课程分组。
     *
     * 它们已经做不了了，混在待办里会占住第一屏——而用户打开弹窗是要看
     * 「现在做什么」。分开之后主列表只剩能做的事，过期项放在最后，
     * 既不挡住要紧的，也没被藏起来（他该知道自己漏了什么）。
     *
     * 后台已经滤掉三天以上前的过期项，所以这一段不会累积。
     */
    const live = entries.filter((entry) => !entry.overdue);
    const overdue = entries.filter((entry) => entry.overdue);

    if (live.length === 0 && overdue.length === 0) {
      const note = document.createElement('p');
      note.className = 'todo-empty';
      note.textContent = '暂无待办。';
      todoEl.append(note);
      return;
    }

    // 按课程归拢，课程内保持后台给出的截止时间升序
    const grouped = new Map<string, PendingEntry[]>();
    for (const entry of live) {
      const bucket = grouped.get(entry.courseName);
      if (bucket) bucket.push(entry);
      else grouped.set(entry.courseName, [entry]);
    }

    for (const [courseName, list] of grouped) {
      const group = document.createElement('section');
      group.className = 'todo-group';

      const head = document.createElement('p');
      head.className = 'todo-course';

      const name = document.createElement('span');
      name.textContent = courseName;

      const count = document.createElement('span');
      count.className = 'todo-count';
      count.textContent = `${list.length} 项`;

      head.append(name, count);
      group.append(head);

      for (const entry of list) {
        group.append(buildRow(entry));
      }

      todoEl.append(group);
    }

    if (overdue.length > 0) {
      const group = document.createElement('section');
      group.className = 'todo-group is-overdue';

      const head = document.createElement('p');
      head.className = 'todo-course';

      const name = document.createElement('span');
      name.textContent = '已过截止';

      const count = document.createElement('span');
      count.className = 'todo-count';
      count.textContent = `${overdue.length} 项`;

      head.append(name, count);
      group.append(head);

      for (const entry of overdue) {
        group.append(buildRow(entry));
      }

      todoEl.append(group);
    }
  } catch (error) {
    setTodoError(error instanceof Error ? error.message : String(error));
  }
}

/**
 * 一条待办要做什么。
 *
 * 取自平台语言包，不自创：
 *   KEY_LEARN_UNSUBMITTED       未提交
 *   KEY_LEARN_EVALUATION_STAGE  互评阶段
 *   KEY_LEARN_RESULTS_ANNOUNCED 成绩已公布
 */
/**
 * 每类待办对应什么，以及点进去打开哪个页面。
 *
 * 互评与自评分开：两者都在互评期开放、点进去也是同一个页面，
 * 但一个是给同学打分、一个是给自己打分。合并成「互评作业」
 * 会让人点进去才发现评的是自己。
 *
 * view 是拼地址用的页面类型，与平台的路由一一对应。考试的两种题型
 * 各自有答卷页，而它们的 id 需要 eid 才拼得出来，因此考试还带 examId。
 * 考试的待办不区分题型时按客观题处理——它至少能打开答卷页，
 * 而主观题页少一个参数打不开。
 */
const KIND_TEXT: Record<
  PendingEntry['kind'],
  { label: string; view: 'quiz' | 'homework' | 'exam-objective' | 'exam-subjective' }
> = {
  'submit-quiz': { label: '单元测验', view: 'quiz' },
  'submit-homework': { label: '单元作业', view: 'homework' },
  'evaluate-homework': { label: '互评作业', view: 'homework' },
  'self-evaluate': { label: '自评作业', view: 'homework' },
  'submit-exam': { label: '考试', view: 'exam-objective' },
};

/**
 * 处置说法。这一格要回答的是「这条我要不要管」。
 *
 * 每个说法都要说清两件事：**要不要你动手、会不会自己发生**。
 * 只说「未提交」是不够的——用户无从判断这一条要不要管。
 *
 * 「将自动处理」不再承诺具体时刻。先前写「下次启动浏览器时处理」，
 * 是因为那时触发点只有浏览器启动；现在运行期间每 30 分钟检查一次，
 * 再说「下次启动」就与实际行为不符了。而具体到第几分钟无法预知，
 * 因此只说明它会发生，想提前做的人可以点「立即执行」。
 *
 * 措辞按正式文案处理：
 *   - 不用「扩展」作主语。那是开发者的说法，用户看不出它指什么
 *   - 「评分」不简作「评」。简称在固定搭配里才成立，这里不是
 */
function handlingText(entry: PendingEntry): string {
  if (entry.overdue) {
    /*
     * 已过截止的要说清后果。「已过截止」听起来只是个状态，
     * 用户可能仍去点它、然后发现做不了。补上「无法补做」省掉这一步。
     *
     * 界面上按「有截止时间的事过了期」统一处理，不分是测验还是作业：
     * 对用户来说后果一样，都是交不上去。平台层面的差别（测验不让开卷、
     * 作业不收）写在这里只会让人多读一句而不多知道什么。
     */
    return '已过截止，无法补做';
  }

  if (entry.handling === 'auto') {
    /*
     * 互评类带进度：还差几份直接关系到会不会影响成绩，
     * 而「会自动处理」这句话本身不说明差多少。
     */
    if (entry.kind === 'evaluate-homework' && entry.evaluateTotal !== null && entry.evaluateDone !== null) {
      const left = entry.evaluateTotal - entry.evaluateDone;
      return `将自动评分，还需 ${left} 份`;
    }
    return '将自动处理';
  }

  /*
   * 人工项要说明只有用户能做，否则他会以为等着就会被处理。
   */
  return '需要你完成';
}

/**
 * 构造一条待办。两行：
 *   上行  任务名        还剩多久
 *   下行  处置          具体日期
 *
 * 时间拆成相对与绝对两处，是为了不把一行撑成三行：
 * 相对说法要让人一眼判断远近，绝对日期用来核对。
 *
 * 截止时间写进 dataset，供排序与测试使用。
 */
/**
 * 构造一条待办。两行：
 *   上行  任务名  [阶段]        还剩多久
 *   下行  处置                  具体日期
 *
 * 阶段与处置是两个独立的信息，都要给出：
 *   阶段   这份作业走到哪一步了（互评阶段）
 *   处置   这一条要不要你动手（需要你完成 / 将自动处理）
 * 只给其中一个，用户都得自己再判断一次。测验没有互评流程，
 * 其阶段为空串，那一格自动隐藏。
 *
 * 相对时间与具体日期分列两行，是为了不把一行撑成三行：
 * 相对说法让人一眼判断远近，具体日期用来核对。
 *
 * 截止时间写进 dataset，供排序与测试使用。
 */
function buildRow(entry: PendingEntry): HTMLElement {
  const text = KIND_TEXT[entry.kind];
  const deadline = entry.deadline;

  /*
   * 过期项不做成链接。
   *
   * 点进去也做不了——平台不接受逾期提交。给一个能点的东西等于邀请用户
   * 点进去也无法处理，而这一行要传达的正是「这件事已经结束」。
   */
  const link = entry.overdue
    ? document.createElement('div')
    : document.createElement('a');
  link.className = 'todo-row';
  link.dataset.deadline = String(deadline);
  link.dataset.handling = entry.overdue ? 'overdue' : entry.handling;

  if (link instanceof HTMLAnchorElement) {
    link.href = workPageUrl(entry.course, text.view, entry.testId, entry.examId ?? undefined);
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.title = `打开${text.label}页面`;
  } else {
    link.title = entry.statusDetail;
  }

  // 上行：任务名、阶段、相对时间
  const line = document.createElement('span');
  line.className = 'todo-line';

  const name = document.createElement('span');
  name.className = 'todo-name';
  name.textContent = entry.name;

  const phase = document.createElement('span');
  phase.className = 'todo-phase';
  phase.textContent = entry.status;
  // 测验没有阶段之分，状态仍是「未提交」这类通用说法，因此始终显示

  const when = document.createElement('span');
  when.className = 'todo-when';
  if (isUrgent(deadline)) when.classList.add('is-urgent');
  when.textContent = `${relativeDay(deadline)} ${formatClock(deadline)}`.trim();

  line.append(name, phase, when);

  // 下行：处置与具体日期
  const sub = document.createElement('span');
  sub.className = 'todo-sub';

  const handling = document.createElement('span');
  handling.className = 'todo-handling';
  if (entry.overdue) handling.classList.add('is-overdue');
  else if (entry.handling === 'auto') handling.classList.add('is-auto');
  handling.textContent = handlingText(entry);

  const date = document.createElement('span');
  date.className = 'todo-date';
  date.textContent = formatDate(deadline);

  sub.append(handling, date);

  link.append(line, sub);
  return link;
}

/**
 * 覆盖待办区的内容。
 *
 * 统一走这里，是为了不遗漏加载态：待办区在数据到达前先显示一句
 * 「正在获取最新数据」，而弹窗每次打开都要拉一次，约两秒。
 * 若某个分支直接 replaceChildren，那句提示会一直留在页面上，
 * 与真正的内容并存。
 */
function writeTodo(children: Node[]): void {
  todoEl.classList.remove('is-loading');
  todoEl.replaceChildren(...children);
}

/**
 * 后台正在执行时，待办顶部的一行说明。
 *
 * 它解释的是「为什么这份清单看起来没变」，并给出后续会自己刷新——
 * 不说明的话，用户没法区分「后台在做」与「扩展没反应」。
 */
function runningNote(): HTMLElement {
  const note = document.createElement('p');
  note.className = 'todo-running';
  note.textContent = '正在执行，下面是执行前的清单，结束后会自动刷新';
  return note;
}

/** 待办区呈现失败状态。 */
function setTodoError(message: string): void {
  writeTodo([]);
  const box = document.createElement('div');
  box.className = 'todo-error';
  box.textContent = `读取失败：${message}`;
  todoEl.append(box);
}

/**
 * 待办区呈现「需要登录」。
 *
 * 与失败状态在样式与措辞上都分开：失败是一句解释，这里是给一个去处。
 * 会话 cookie 是会话级的，关浏览器几天再打开就会过期，
 * 用户遇到的多半是这种情况——他并没有做错什么，只是需要重新登录一次。
 */
function showLoginPrompt(): void {
  writeTodo([]);

  const box = document.createElement('div');
  box.className = 'todo-login';

  const text = document.createElement('p');
  text.className = 'todo-login-text';
  text.textContent = '登录状态已失效，需要重新登录慕课平台后才能读取待办。';

  const link = document.createElement('a');
  link.className = 'todo-login-link';
  link.href = 'https://www.icourse163.org/';
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.textContent = '前往登录';

  box.append(text, link);
  todoEl.append(box);
}


async function init(): Promise<void> {
  /*
   * 先渲染状态与现有待办，再去后台拉最新。
   *
   * 不 await 拉取的原因：弹窗是点开就走的界面，用户常在数据回来之前
   * 就把它关掉，那时这个 await 永远等不到结果，界面反而一直空着。
   * 先把已有的画出来，拉回来再重画一次——短暂看到旧数据，好过白屏。
   */
  await renderState();
  await renderTodo();

  /*
   * 三种触发路径都让待办重新读一次：
   *   打开弹窗   用户明确要看，后台会无条件拉最新并更新快照
   *   刷新课程   课程勾选可能刚变过
   *   执行结束   由 renderState 的跟随在结束时触发
   * 这里只负责前两者。
   */
  void renderTodo();

  watchSettings((next) => {
    current = next;
    void renderState();
    void renderTodo();
  });

  runBtn?.addEventListener('click', () => {
    /*
     * 按钮文字始终是「执行」，不随状态变化。
     *
     * 先前点下去改成「执行中」、结束后又改成「立即执行」，
     * 字数从 2 变 3 再变 4，而旁边按钮与开关宽度固定，
     * 于是整排按钮在点击过程中被推着左右移动。
     * 执行中的信息交给状态位表达，按钮只负责「可以点」与「不能点」。
     */
    manualRunning = true;
    runBtn.disabled = true;
    setText(stateEl, '正在执行');
    stateEl?.classList.add('is-busy');

    void browser.runtime
      .sendMessage({ type: 'RUN_SCHEDULED_TASKS' })
      .then((result) => {
        // 结果写在顶栏的状态位置
        const summary = result as
          | {
              ok?: boolean;
              reason?: string;
              done?: number;
              manual?: number;
              message?: string;
              failed?: Array<{ name: string; detail: string }>;
            }
          | undefined;

        stateEl?.classList.remove('is-busy');

        if (summary && summary.ok === false) {
          /*
           * 被拒绝的原因要具体。「正在执行」这类由并发导致的拒绝
           * 不必报错色——它不是出错，只是时机不对。
           */
          const reason = summary.reason as JobRejection | undefined;
          setText(stateEl, reason ? REJECTION_MESSAGES[reason] : '未执行');
          if (reason !== 'ALREADY_RUNNING') stateEl?.classList.add('is-error');
          return;
        }

        if (summary) {
          if (summary.message) {
            // 「没有可自动完成的事项」属于正常结果，不用错误色
            setText(stateEl, summary.message);
            return;
          }
          const failed = summary.failed ?? [];
          const parts = [`完成 ${summary.done ?? 0} 项`];
          if (failed.length > 0) parts.push(`${failed.length} 项失败`);
          if ((summary.manual ?? 0) > 0) parts.push(`${summary.manual} 项待你处理`);
          setText(stateEl, parts.join('，'));
          if (failed.length > 0) stateEl?.classList.add('is-error');
        }

        return renderTodo();
      })
      .catch((error: unknown) => {
        stateEl?.classList.remove('is-busy');
        setText(stateEl, error instanceof Error ? error.message : '执行失败');
        stateEl?.classList.add('is-error');
      })
      .finally(() => {
        manualRunning = false;
        if (runBtn) runBtn.disabled = !(current?.enabled ?? false);
      });
  });

  settingsBtn?.addEventListener('click', () => {
    void browser.runtime.openOptionsPage();
    window.close();
  });
}

void init();
