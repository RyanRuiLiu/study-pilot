/**
 * 设置页。
 *
 * 职责：把 {@link Settings} 渲染成可编辑表单，改动即时落盘；
 * 并提供课程列表读取与任务的手动触发入口。
 *
 * 表单改动直接写存储，后台任务在每次执行时重新读取配置，因此不需要显式的保存按钮。
 * 手动触发只是「立即执行一次」，是否真的执行由后台的门禁决定——
 * 这里的开关检查只用于提前给出提示。
 *
 * 样式分三层引入：tokens（取值）、base（通用元素）、本页布局。
 * 必须通过 import 引入，不能用 HTML 的 <link>——构建后源路径不会被改写，
 * 会变成死链，页面于是回退到浏览器默认样式。
 * 弹窗用的是同一组 tokens 与 base，两页的字体、纸墨与控件因此完全一致。
 */

import '../../src/ui/tokens.css';
import './style.css';

import {
  getSettings,
  resetSettings,
  saveSettings,
  type Settings,
} from '../../src/settings';
import {
  REJECTION_MESSAGES,
  sendToBackground,
  WORK_STATUS,
  type JobRejection,
  type UnitDetail,
} from '../../src/platform/messaging';
import { describeRunState } from '../../src/background/scheduler';
import { coursePageUrl, describeCourseMode, workPageUrl } from '@study-pilot/platform-mooc';
import type { SelectedCourse } from '../../src/settings';
import { formatDateTime, formatTermRange } from '../../src/features/format';

let current: Settings;
const app = document.getElementById('app')!;
const toc = document.getElementById('toc');
const toastEl = document.getElementById('toast')!;

function toast(text: string): void {
  toastEl.textContent = text;
  toastEl.classList.add('on');
  window.setTimeout(() => toastEl.classList.remove('on'), 3200);
}

// ---------- 基础控件 ----------

function row(name: string, note: string, ...controls: HTMLElement[]): HTMLElement {
  const el = document.createElement('div');
  el.className = 'opt';

  const text = document.createElement('div');
  text.className = 'text';
  const nameEl = document.createElement('div');
  nameEl.className = 'name';
  nameEl.textContent = name;
  const noteEl = document.createElement('div');
  noteEl.className = 'note';
  noteEl.textContent = note;
  text.append(nameEl, noteEl);

  const ctrl = document.createElement('div');
  ctrl.className = 'ctrl';
  ctrl.append(...controls);

  el.append(text, ctrl);
  return el;
}

/**
 * 开关。
 *
 * 用 base.css 的 .switch 结构：轨道与滑块是元素而不是伪元素，
 * 这样整块轨道都可点，点击区域不留死区。
 * 弹窗的总开关用的是同一套结构，两处外观因此必然一致。
 */
function toggle(value: boolean, onChange: (next: boolean) => void): HTMLElement {
  const label = document.createElement('label');
  label.className = 'switch';

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = value;

  const track = document.createElement('span');
  track.className = 'track';
  const knob = document.createElement('span');
  knob.className = 'knob';
  track.append(knob);

  input.addEventListener('change', () => onChange(input.checked));

  label.append(input, track);
  return label;
}

/**
 * 数字输入框。
 *
 * 带单位。光一个数字看不出量的是什么——「30」既可能是分钟也可能是天，
 * 而这两者差了四十八倍。先前靠行名暗示单位（「启动延迟」后面跟个数字），
 * 那是要用户自己推断，不是说明。
 *
 * 越界时夹到范围内并写回输入框，用户能立刻看到被改成了什么，
 * 而不是填了 999 却生效了 360 而无从发现。
 */
function numberInput(
  value: number,
  min: number,
  max: number,
  unit: string,
  onChange: (next: number) => void,
): HTMLElement {
  const box = document.createElement('span');
  box.className = 'num-box';

  const input = document.createElement('input');
  input.type = 'number';
  input.className = 'num';
  input.min = String(min);
  input.max = String(max);
  input.value = String(value);
  input.addEventListener('change', () => {
    const next = Math.min(max, Math.max(min, Number(input.value) || min));
    input.value = String(next);
    onChange(next);
  });

  const suffix = document.createElement('span');
  suffix.className = 'num-unit';
  suffix.textContent = unit;

  box.append(input, suffix);
  return box;
}

function textInput(value: string, onChange: (next: string) => void): HTMLInputElement {
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'txt';
  input.value = value;
  input.addEventListener('change', () => onChange(input.value));
  return input;
}

/**
 * 次要按钮。用 base.css 的 button.quiet，与弹窗的次要按钮同款。
 */
function quietButton(text: string, onClick: () => void): HTMLButtonElement {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = 'quiet';
  el.textContent = text;
  el.addEventListener('click', onClick);
  return el;
}

/** 主按钮。用 base.css 的 button 默认样式。 */
/**
 * 一段静态说明，用作没有控件的设置项右侧。
 *
 * 有的设置项本身没有可调的东西，只是告诉用户背后怎么运作的。
 * 这时右侧不该留空，也不该硬塞一个假控件。
 */
function note(text: string): HTMLElement {
  const el = document.createElement('span');
  el.className = 'hint';
  el.textContent = text;
  return el;
}

function button(text: string, onClick: () => void): HTMLButtonElement {
  const el = document.createElement('button');
  el.type = 'button';
  el.textContent = text;
  el.addEventListener('click', onClick);
  return el;
}

/** 星期的显示名。索引与 Date.getDay() 一致，0 是周日。 */
const WEEKDAY_LABELS = ['日', '一', '二', '三', '四', '五', '六'];

/** 星期多选。返回一组复选框，与后台调度用的 weekdays 数组对应。 */
function weekdayPicker(value: number[], onChange: (next: number[]) => void): HTMLElement {
  const box = document.createElement('div');
  box.className = 'weekdays';

  for (let day = 0; day < 7; day++) {
    const label = document.createElement('label');
    label.className = 'weekday';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = value.includes(day);

    const text = document.createElement('span');
    text.textContent = WEEKDAY_LABELS[day];

    input.addEventListener('change', () => {
      const next = new Set(value);
      if (input.checked) next.add(day);
      else next.delete(day);
      onChange([...next].sort((a, b) => a - b));
    });

    label.append(input, text);
    box.append(label);
  }

  return box;
}

/**
 * 一个平台分组。
 *
 * 分组头只用一行：名称在左、域名在右，下面一条细线。
 * 不套卡片背景——五个分区如果都套圆角灰底，看起来会一样重，
 * 而它们的重要程度并不相同。
 */
/*
 * 一张卡片：标题在左，标签在右，下面是内容。
 *
 * 标签只放静态的归属或性质说明（平台域名、「按需触发」这类）。
 * 不放随设置变化的数字——早先在「检查频率」的标签上显示「每 30 分钟」，
 * 而下面就是改这个值的输入框：用户改成 15 之后，标签与输入框同时显示
 * 两个不同的数字，反而要猜哪个生效。值该由输入框自己说。
 */
function platform(title: string, origin: string, rows: HTMLElement[]): HTMLElement {
  const el = document.createElement('div');
  el.className = 'platform';

  const head = document.createElement('div');
  head.className = 'platform-head';

  const h = document.createElement('h3');
  h.textContent = title;
  head.append(h);

  /*
   * 标签是可选的，而且只该放短标记：域名、状态这类不随设置变化的词。
   *
   * 传空串表示这个卡片不需要标签。给一个占位符凑数是更糟的选择：
   * 用户会以为那两个字有什么含义。
   *
   * 不放随设置变化的数字。早先在「检查频率」的标签上显示「每 30 分钟」，
   * 而下面就是改这个值的输入框：用户改成 15 之后，标签与输入框同时显示
   * 两个不同的数字，反而要猜哪个生效。值该由输入框自己说。
   */
  if (origin) {
    const badge = document.createElement('span');
    badge.className = 'origin';
    badge.textContent = origin;
    head.append(badge);
  }

  el.append(head, ...rows);
  return el;
}

/**
 * 一段说明文字。
 *
 * 用于「运作方式」这类只讲事实、没有可调项的分区。
 * 逐条给出，条与条之间留出间距——挤成一段长文没人读。
 */
function prose(items: Array<{ term: string; text: string }>): HTMLElement {
  const box = document.createElement('dl');
  box.className = 'prose';

  for (const { term, text } of items) {
    const dt = document.createElement('dt');
    dt.textContent = term;
    const dd = document.createElement('dd');
    dd.textContent = text;
    box.append(dt, dd);
  }

  return box;
}

/**
 * 登录状态。
 *
 * 平台的登录凭证是会话级 cookie，关闭浏览器即失效，因此每次启动后都需要
 * 重新登录。扩展不代为输入账号密码——那需要保存用户凭据，既无必要也不该做。
 * 这里只如实展示状态，未登录时给一个跳转入口。
 *
 * 状态用文字表达，不套色块：色块会让这一行的分量超过它实际的重要程度。
 *//**
 * 登录状态。
 *
 * 状态用文字表达，不套色块：色块会让这一行的分量超过它实际的重要程度。
 *
 * 两个按钮各有分工，不能合并：
 *   刷新   重读登录状态。会话 cookie 关浏览器几天就失效，而平台在收到
 *          一次带凭据的请求时会用持久凭证换回会话，因此点击刷新通常即可恢复。
 *          用户在别处登录过之后也用这个确认。
 *   前往登录  真的要去登录页。它是刷新之后的下一步，不是同一个动作。
 */
function sessionBadge(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'session';

  const el = document.createElement('span');
  el.id = 'session-badge';
  el.textContent = '读取中';

  const login = document.createElement('a');
  login.className = 'login-link quiet f-dn';
  login.href = 'https://www.icourse163.org/';
  login.target = '_blank';
  login.rel = 'noreferrer';
  login.textContent = '前往登录';

  const refresh = document.createElement('button');
  refresh.className = 'quiet';
  refresh.type = 'button';
  refresh.textContent = '刷新';
  refresh.title = '重新读取登录状态。会话过期时会先尝试用持久凭证恢复';
  refresh.addEventListener('click', () => {
    refresh.disabled = true;
    el.textContent = '读取中';
    void readSessionInto(el, login).finally(() => {
      refresh.disabled = false;
    });
  });

  wrap.append(el, refresh, login);
  void readSessionInto(el, login);

  return wrap;
}

/**
 * 读一次登录状态并更新这一行。
 *
 * 后台的 SESSION 走 ensureSession：没有会话时会先发一次请求尝试恢复，
 * 因此「刷新」在会话过期后往往能直接恢复，不必真的去登录页。
 *
 * 只显示「已登录」不显示用户 id：那一行是给用户确认状态用的，
 * 而 id 是账号内部标识，对他没有用处，露在界面上也没有必要。
 */
async function readSessionInto(el: HTMLElement, login: HTMLElement): Promise<void> {
  try {
    const session = await sendToBackground({ type: 'SESSION' });
    el.textContent = session.loggedIn ? '已登录' : '未登录';
    // 已登录时不需要跳转入口
    login.classList.toggle('f-dn', session.loggedIn);
  } catch {
    el.textContent = '读取失败';
    login.classList.remove('f-dn');
  }
}

/**
 * 上次运行时间。
 *
 * 显示的是最近一次检查完成的时刻，不是「下次什么时候执行」——
 * 后者取决于用户何时打开浏览器以及 30 分钟的定时器，给不出确切时间。
 * 而「上次什么时候跑过」是可回答的，也正是用户想确认的：
 * 它到底有没有在工作。
 */
function lastRunHint(): HTMLElement {
  const el = document.createElement('span');
  el.className = 'hint';
  el.id = 'last-run-hint';
  el.textContent = '读取中';

  void Promise.all([getSettings(), sendToBackground({ type: 'TASK_STATE' })])
    .then(([settings, state]) => {
      el.textContent = settings.enabled
        ? describeRunState(state)
        : 'Study Pilot 已停用';
    })
    .catch(() => {
      el.textContent = '读取失败';
    });

  return el;
}

/** 状态标签的样式类别。 */
/**
 * 状态的配色分类。
 *
 *   未提交 / 已过截止未提交   需要注意
 *   互评阶段                  仍要用户动手
 *   成绩已公布 / 等待成绩公布  已完成，无需行动
 */
function statusClass(detail: UnitDetail): string {
  if (!detail.submitted) return 'warn';
  if (detail.status === WORK_STATUS.REVIEWING) return 'active';
  // 互评已完成仍需等待成绩，但不需用户动手，归入完成态
  return 'ok';
}

/**
 * 逐单元明细表。列出已勾选课程下每个测验与作业的状态。
 *
 * 三种情况分别呈现，不混为一谈：
 *   失败         显示失败原因，便于判断是网络、登录还是平台侧的问题
 *   成功但没有单元 说明确实没有可列出的内容（通常是尚未勾选课程）
 *   成功且有单元   正常列表
 */
function unitDetailsView(): HTMLElement {
  const box = document.createElement('div');
  box.className = 'details';
  box.id = 'unit-details';
  void loadUnitDetails(box);
  return box;
}

/**
 * 重新读取单元明细。
 *
 * 课程勾选变化后调用。明细按勾选的课程过滤，取消勾选后那一门的内容
 * 就该从表里消失——不重读的话它会一直列着，用户以为取消没生效。
 *
 * 找不到容器时什么也不做：那说明明细分区还没渲染或已被移除，
 * 下次重建时会自己读一遍。
 */
function reloadUnitDetails(): void {
  const box = document.getElementById('unit-details');
  if (box) loadUnitDetails(box);
}

/**
 * 往容器里填单元明细。
 *
 * 抽出来是为了能被重复调用，见 reloadUnitDetails。
 */
function loadUnitDetails(box: HTMLElement): void {
  box.textContent = '正在读取…';
  box.classList.remove('is-error');

  void sendToBackground({ type: 'UNIT_DETAILS' })
    .then((outcome) => {
      if (outcome.status === 'error') {
        /*
         * 未登录与读取失败分开说。
         * 会话 cookie 关浏览器几天就过期，用户没做错什么，
         * 只是需要重新登录一次，所以给的是去处而不是错误。
         */
        if (outcome.reason === 'NOT_LOGGED_IN') {
          box.replaceChildren();

          const text = document.createElement('p');
          text.className = 'hint';
          text.textContent = '登录状态已失效，需要重新登录慕课平台后才能读取单元明细。';

          const link = document.createElement('a');
          link.className = 'login-link';
          link.href = 'https://www.icourse163.org/';
          link.target = '_blank';
          link.rel = 'noreferrer';
          link.textContent = '前往登录';

          box.append(text, link);
          return;
        }

        box.textContent = `读取失败：${outcome.message}`;
        box.classList.add('is-error');
        return;
      }

      const details = outcome.value;
      if (details.length === 0) {
        box.textContent = '没有可列出的单元。请先在上方的「课程列表」里读取并勾选课程。';
        return;
      }

      box.replaceChildren();

      /*
       * 四列：名称、状态、截止、得分。
       *
       * 列的含义不标注的话，「等待互评完成」与「互评阶段」的区别、
       * 「— / 100」与「85 / 100」的差别都只能靠猜。所以有表头。
       *
       * 截止时间这一列是这次补上的。先前没有它，而这个页面的用途正是
       * 「这门课我做到哪了」——不知道截止就没法安排先后。
       * 明细只给绝对时间，不给「还有几天」：那是弹窗要回答的问题
       * （我现在先做哪个），这里要回答的是「这件事什么时候到期」。
       */
      const head = document.createElement('div');
      head.className = 'details-head';
      for (const [cls, label] of [
        ['details-name', '测验与作业'],
        ['details-status', '状态'],
        ['details-when', '截止'],
        ['details-score', '得分 / 满分'],
      ] as const) {
        const cell = document.createElement('span');
        cell.className = cls;
        cell.textContent = label;
        head.append(cell);
      }
      box.append(head);

      let lastCourse = '';

      for (const detail of details) {
        if (detail.courseName !== lastCourse) {
          lastCourse = detail.courseName;
          const group = document.createElement('div');
          group.className = 'details-course';
          group.textContent = detail.courseName;
          box.append(group);
        }

        /*
         * 整行做成链接，点进那一项的页面。
         *
         * 明细的用途是「这门课我做到哪了」，看到之后下一步往往是去处理它。
         * 考试也一样——它有专门的答卷页，地址需要 examId 与题型，
         * 两者都随详情传了过来。
         */
        const line = document.createElement('a');
        line.className = 'details-row';

        /*
         * 每行带一个可定位的 id。
         *
         * 通知点进来时要落到具体那一项，而不是把用户丢在页面顶部让他自己
         * 在几十行里找。tid 在同一份快照里唯一，正好当锚点。
         */
        line.id = `unit-${detail.tid}`;

        /*
         * 视图名与详情里的类型一一对应：
         *   quiz             → 单元测验
         *   homework         → 单元作业
         *   exam-objective   → 客观题考试
         *   exam-subjective  → 主观题考试
         * 直接把类型传给拼地址的函数，不做映射转换——多一层映射就多一处
         * 会漏掉新类型的地方。
         */
        line.href = workPageUrl(
          {
            courseId: detail.courseId,
            schoolShortName: detail.schoolShortName,
            mode: detail.mode,
            termId: detail.termId,
          },
          detail.type,
          detail.tid,
          detail.examId ?? undefined,
        );
        line.target = '_blank';
        line.rel = 'noreferrer';
        line.title = `打开「${detail.name}」`;

        const name = document.createElement('span');
        name.className = 'details-name';
        name.textContent = detail.chapterName
          ? `${detail.chapterName} · ${detail.name}`
          : detail.name;

        const status = document.createElement('span');
        status.className = `details-status ${statusClass(detail)}`;
        /*
         * 互评进度附在状态后面，不单占一列。
         *
         * 「互评阶段」这个状态本身不说明做到哪一步——一份未评与已经评够，
         * 字面完全相同。附上「2 / 5」把两者分开，而它与状态是同一件事的
         * 两个方面，拆成两列会让表格多出一列只为填一个数字。
         */
        if (detail.status === WORK_STATUS.REVIEWING && detail.evaluateTotal !== null) {
          status.textContent = `互评 ${detail.evaluateDone} / ${detail.evaluateTotal}`;
          status.title = `已为 ${detail.evaluateDone} 份作业评分，配额 ${detail.evaluateTotal} 份`;
        } else {
          status.textContent = detail.status;
          // 状态的含义写进 title，不必在正文里解释五个说法的区别
          status.title = detail.statusDetail;
        }

        const when = document.createElement('span');
        when.className = 'details-when';
        when.textContent = detail.deadline !== null ? formatDateTime(detail.deadline) : '无';
        if (detail.deadline !== null) {
          when.title =
            detail.status === WORK_STATUS.OVERDUE
              ? `已于 ${formatDateTime(detail.deadline)} 截止`
              : `截止 ${formatDateTime(detail.deadline)}`;
        }

        const score = document.createElement('span');
        score.className = 'details-score';
        /*
         * 统一成「得分 / 满分」。
         *
         * 未作答时原先写「满分 100」，读起来像「我得了满分」——
         * totalScore 的语义是这份作业的总分值，不是我的得分。
         * 用短横占位表示「还没有得分」，与已作答行的格式一致，
         * 两列对齐后一眼能看出哪些空着。
         */
        if (detail.totalScore != null) {
          const got = detail.score ?? '—';
          score.textContent = `${got} / ${detail.totalScore}`;
          score.title =
            detail.score != null
              ? `得分 ${detail.score}，满分 ${detail.totalScore}`
              : `尚未作答，满分 ${detail.totalScore}`;
        }

        line.append(name, status, when, score);
        box.append(line);
      }

      signalContentReady();
    })
    .catch((error: unknown) => {
      box.textContent = `读取失败：${error instanceof Error ? error.message : String(error)}`;
      box.classList.add('is-error');
      signalContentReady();
    });
}

/**
 * 通知一次「异步内容已渲染」。
 *
 * 单元明细与运行状态的数据都是异步取的，取到之前它们只是占位文字。
 * 锚点跳转若发生在数据到达之前，会滚到一个之后会变短的位置上，
 * 等内容填进去就偏了。渲染完成后再定位一次。
 */
function signalContentReady(): void {
  document.dispatchEvent(new CustomEvent('sp:content-ready'));
}


/**
 * 一个设置分区。
 *
 * 不加编号：编号只在内容本身是序列时才有意义，而设置分区之间
 * 没有先后顺序，编号只是装饰。层次由标题字号与分区之间的留白给出。
 */
/**
 * 一个设置分区。
 *
 * 不加编号：编号只在内容本身是序列时才有意义，而设置分区之间
 * 没有先后顺序，编号只是装饰。层次由标题字号与分区之间的留白给出。
 *
 * id 用于左侧导航的跳转与当前位置判定。
 */
function section(
  id: string,
  title: string,
  desc: string,
  blocks: HTMLElement[],
): HTMLElement {
  const el = document.createElement('section');
  el.className = 'section';
  el.id = id;

  const h = document.createElement('h2');
  h.className = 'section-title';
  h.textContent = title;

  const p = document.createElement('p');
  p.className = 'section-desc';
  p.textContent = desc;

  el.append(h, p, ...blocks);
  return el;
}

// ---------- 落盘 ----------

async function persist(): Promise<void> {
  current = await saveSettings(current);
}

/**
 * 包装一个赋值动作：先执行赋值，再落盘。
 *
 * 表单改动没有独立的保存按钮，所有改动都经此落盘，保证界面状态与存储一致。
 * 类型参数由调用处的赋值函数推导，因此布尔、数字、文本控件共用同一个包装。
 */
function persistAfter<T>(assign: (value: T) => void): (value: T) => void {
  return (value: T) => {
    assign(value);
    void persist();
  };
}

// ---------- 动作 ----------

/** 已勾选课程的 termId 列表。 */
function selectedTermIds(): number[] {
  return current.mooc.background.courses
    .filter((course) => course.enabled)
    .map((course) => course.termId);
}

function describeRejection(reason: string): string {
  return REJECTION_MESSAGES[reason as keyof typeof REJECTION_MESSAGES] ?? `执行失败：${reason}`;
}

/**
 * 主动读取课程列表。
 *
 * 这是用户按下按钮触发的，因此总是真的去平台拉一次，不用缓存——
 * 他想看到的是此刻的状态，不是昨天存下来的。
 * 后台的按天缓存只服务于自动任务，两处互不影响。
 */
async function refreshCourses(): Promise<void> {
  toast('正在读取课程列表');
  const response = await sendToBackground({ type: 'REFRESH_COURSES' });
  if (!response.ok) {
    toast(describeRejection(response.reason));
    return;
  }
  current = await getSettings();
  render();
  toast(`已读取 ${response.courses.length} 门课程`);
}

// ---------- 渲染 ----------



/**
 * 课程列表。
 *
 * 每门课呈现为一张卡片：课程名、类型、学校、学期区间、规模，
 * 以及是否参与后台任务的勾选框。点击卡片主体会打开该课程的学习页。
 *
 * 不显示 termId 之类的内部标识——它们对用户没有意义，
 * 需要时由后台自己按课程索引。
 */
function courseList(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'courses';
  const courses = current.mooc.background.courses;

  if (courses.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.textContent = '尚未读取课程。请先点击上方的「读取课程列表」。';
    wrap.append(empty);
    return wrap;
  }

  /*
   * 默认收起，只留一行概要。
   *
   * 六门课展开后每门三行，占掉大半屏，把后面的内容全推到下面去；
   * 而经过首次勾选之后，用户多数时候只是想知道"选了几门"，
   * 不再需要逐门看。概要里给出这个数字，想看细节再展开。
   */
  const selected = courses.filter((course) => course.enabled).length;

  const bar = document.createElement('button');
  bar.type = 'button';
  bar.className = 'courses-toggle';
  bar.setAttribute('aria-expanded', 'false');

  const summary = document.createElement('span');
  summary.className = 'courses-summary';
  summary.textContent = `已选 ${selected} 门，共 ${courses.length} 门`;

  const disclosure = document.createElement('span');
  disclosure.className = 'courses-disclosure';
  disclosure.textContent = '展开';

  bar.append(summary, disclosure);

  const list = document.createElement('div');
  list.className = 'courses-list f-dn';

  bar.addEventListener('click', () => {
    const expanded = list.classList.toggle('f-dn') === false;
    bar.setAttribute('aria-expanded', String(expanded));
    disclosure.textContent = expanded ? '收起' : '展开';
  });

  for (const course of courses) {
    const item = document.createElement('div');
    item.className = 'course';
    if (course.enabled) item.classList.add('is-on');

    // 勾选框与「打开课程」是两个独立动作，因此不用 label 包住整张卡片
    const check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'course-check';
    check.checked = course.enabled;
    check.title = '参与后台任务';
    check.addEventListener('change', () => {
      course.enabled = check.checked;
      item.classList.toggle('is-on', check.checked);

      /*
       * 勾选变化要连带更新三处，光存盘不够。
       *
       * 概要条上的「已选 N 门」是该数字最容易过时的地方——用户勾掉一门，
       * 它仍显示旧数目，看起来像没生效。而单元明细按勾选的课程过滤，
       * 取消勾选后那一门仍列在那里，用户会以为取消没成功。
       */
      summary.textContent = `已选 ${
        courses.filter((c) => c.enabled).length
      } 门，共 ${courses.length} 门`;

      void persist().then(() => reloadUnitDetails());
    });

    const link = document.createElement('a');
    link.className = 'course-main';
    // MOOC 走 /learn/，SPOC 与 ROOC 走 /spoc/learn/，两种前缀不可混用
    link.href = coursePageUrl(course);
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.title = '打开课程页面';

    const head = document.createElement('div');
    head.className = 'course-head';

    const name = document.createElement('span');
    name.className = 'course-name';
    name.textContent = course.name;

    head.append(name);

    // 平台未提供模式时省略这一项，而不是显示占位词
    const modeText = describeCourseMode(course.mode);
    if (modeText) {
      const mode = document.createElement('span');
      mode.className = 'course-mode';
      mode.textContent = modeText;
      head.append(mode);
    }

    const meta = document.createElement('div');
    meta.className = 'course-meta';
    meta.textContent = `${course.schoolName} · ${formatTermRange(course.startTime, course.endTime)}`;

    const stats = document.createElement('div');
    stats.className = 'course-stats';
    const parts: string[] = [];
    if (course.lessonsCount > 0) parts.push(`${course.lessonsCount} 课时`);
    if (course.enrollCount > 0) parts.push(`${course.enrollCount} 人选课`);
    stats.textContent = parts.join(' · ');

    link.append(head, meta, stats);
    item.append(check, link);
    list.append(item);
  }

  wrap.append(bar, list);
  return wrap;
}

function render(): void {
  app.replaceChildren();
  const mooc = current.mooc;

  app.append(
    section('account', '账号与课程', '先确认登录状态，再选择参与任务的课程。', [
      platform('慕课平台', 'icourse163.org', [
        row(
          '启用 Study Pilot',
          '关闭后不再执行后台任务，页面里的辅助面板也不再显示',
          toggle(current.enabled, persistAfter((value: boolean) => {
            current.enabled = value;
          })),
        ),
        row(
          '登录状态',
          '需要登录才能读取你在平台上的课程与作业',
          sessionBadge(),
        ),
        row(
          '课程列表',
          '读取当前账号的课程，之后手动勾选参与任务的课程',
          button('读取课程列表', () => {
            void refreshCourses();
          }),
        ),
        courseList(),
      ]),
    ]),

    /*
     * 单元明细紧跟课程之后。
     *
     * 它依赖上面已勾选的课程，位置顺；同时这一份清单是「我还剩什么没做」
     * 的答案，是打开设置页最常想看的东西，放在前面比埋在执行与诊断里省事。
     */
    /*
     * 明细也套一层卡片，与其余分区一致。
     *
     * 先前它直接放在页面底色上，于是这一段的背景与其他板块不同——
     * 而底色本来就比卡片浅，视觉上会显得这一块「没有边界」。
     */
    section('details', '单元明细', '已勾选课程下的全部单元。状态取自平台，截止列为该单元的截止时间，得分列为你已得的分数。', [
      platform('已勾选课程', '当前课程', [unitDetailsView()]),
    ]),

    section('schedule', '运行时机', '决定后台什么时候检查，以及检查之后什么时候真的去拉取。', [
      platform('检查', '', [
        row(
          '运行期间检查间隔',
          '浏览器开着时每隔多少分钟检查一次。检查只读本地数据、不发请求，调小它不会增加网络负担。可设 5 到 360 分钟',
          numberInput(mooc.background.schedule.checkIntervalMinutes, 5, 360, '分钟', persistAfter((value: number) => {
            mooc.background.schedule.checkIntervalMinutes = value;
          })),
        ),
        row(
          '启动延迟',
          '启动后等待多少分钟再开始检查，0 表示立即开始，可设 0 到 30 分钟。运行期间的定时检查不受它影响',
          numberInput(mooc.background.schedule.startupDelayMinutes, 0, 30, '分钟', persistAfter((value: number) => {
            mooc.background.schedule.startupDelayMinutes = value;
          })),
        ),
        row('上次运行', '最近一次运行的时间。这一轮无事可做时也计入', lastRunHint()),
      ]),
      platform('过期事项', '', [
        row(
          '保留天数',
          '已过截止的事项在待办里再显示几天，可设 0 到 90 天，0 表示立刻不再显示。它们不影响完成，列在这里是让你知道自己漏了什么',
          numberInput(mooc.background.schedule.keepOverdueDays, 0, 90, '天', persistAfter((value: number) => {
            mooc.background.schedule.keepOverdueDays = value;
          })),
        ),
      ]),
    ]),

    /*
     * 运作方式。
     *
     * 这一节没有可调的东西，只有事实：扩展什么时候动、动什么、不动什么、
     * 出了边界会怎样。用户从界面上只能看到「未提交」这类结果，看不到背后
     * 的规则，而这几条规则决定了他能否放心把提交交给它。
     *
     * 写法上先定义动作，再讲时机。原因是有四个动作容易被混为一谈——
     * 检查不发请求、拉取只读、执行写平台、通知是给用户看的——
     * 而它们的差别正是用户最关心的：会不会频繁请求、会不会动我的数据。
     * 不先分清，后面每句话都会含糊。
     *
     * 每一条都对应代码里的一个实际分支，不是泛泛的承诺。
     */
    section('behavior', '运作方式', '扩展做哪些动作、什么时候做。', [
      platform('动作', '', [
        prose([
          {
            term: '检查',
            text: '读本地保存的课程与截止时间，判断有没有需要处理的事。不发任何请求。',
          },
          {
            term: '拉取',
            text: '从平台获取最新的课程与单元数据。发请求，但只读，不修改平台上的任何内容。',
          },
          {
            term: '执行',
            text: '向平台提交测验答案或作业评分。发请求，会修改你的学习记录。',
          },
          {
            term: '通知',
            text: '在系统通知区提示结果。分两类：作业临近截止、后台替你完成了事项。两类各自可以在「自动任务」里关掉。',
          },
        ]),
      ]),

      platform('触发时机', '', [
        prose([
          {
            term: '浏览器启动',
            text: '检查 → 按需拉取 → 按需执行 → 有内容时通知。',
          },
          {
            term: '运行期间',
            text: '按「运行时机」里设的间隔重复上述过程，用于覆盖浏览器长时间不关闭的情况。它只是多给一次检查机会，不改变拉取与执行的判断。',
          },
          {
            term: '打开弹窗或设置页',
            text: '检查 → 总是拉取 → 不执行、不通知。你主动查看时看到的一定是最新数据。',
          },
          {
            term: '点「立即执行」',
            text: '检查 → 总是拉取 → 按需执行。结果直接显示在按钮旁边，不再发桌面通知——你就在界面前，通知是多余的。',
          },
        ]),
      ]),

      platform('拉取的判据', '不是每次都发请求', [
        prose([
          {
            term: '何时会拉取',
            text: '出现下列任一情况时才发请求：本地还没有数据；上次拉取不是今天；本地数据里有能自动完成但还没做的事。其余情况下检查结束，一个请求都不发。',
          },
          {
            term: '因此的实际请求量',
            text: '一天一次是常态——「上次拉取不是今天」这条保证了它。只有当你刚发布作业或有评分要做时，才会在当天多拉几次。',
          },
        ]),
      ]),

      platform('执行', '', [
        prose([
          {
            term: '会执行',
            text: '单元测验的客观题，按题库作答并提交。单元作业的互评，在互评期内提交评分直到评够平台要求的份数。单元作业的自评，在互评期内提交评分。三者各自有开关，默认关闭。',
          },
          {
            term: '不会执行',
            text: '单元作业的正文，主观题没有可协助填写的答案，需要你自己作答。考试通常只有一次作答机会，不由后台代点——作答页上仍提供填充与评分依据。已过截止的事项，平台不接受提交。',
          },
          {
            term: '过了截止会怎样',
            text: '测验与作业过了提交截止，平台上交不上去，无法补做。互评与自评过了互评截止，不再计分，会影响成绩。这些事项单独列在待办末尾，保留天数在「运行时机」里设置，之后可在「单元明细」里查看。',
          },
          {
            term: '中断处理',
            text: '执行过程中关闭浏览器不会丢失进度。已完成的记在本地，下次检查时接着做未完成的部分。',
          },
        ]),
      ]),

      platform('数据', '', [
        prose([
          {
            term: '存放位置',
            text: '课程数据与你的设置都保存在浏览器本地，不发送到任何服务器。卸载扩展即全部删除。',
          },
          {
            term: '登录凭证',
            text: '扩展不保存账号密码，也不代为登录。它只使用浏览器里已有的登录状态。',
          },
        ]),
      ]),
    ]),

    section('tasks', '自动任务', '开启后这些事会在检查时自动完成。做不了的仍然需要你自己处理，并在有结果时收到桌面通知。', [
      platform('慕课平台', 'icourse163.org', [
        row(
          '自动完成测验',
          '对尚未提交的单元测验生成答案并提交。只处理客观题',
          toggle(mooc.background.autoQuiz.enabled, persistAfter((value: boolean) => {
            mooc.background.autoQuiz.enabled = value;
          })),
        ),
        row(
          '自动完成互评',
          '对处于互评期的单元作业提交评分，按平台要求的份数评够为止',
          toggle(mooc.background.autoReview.enabled, persistAfter((value: boolean) => {
            mooc.background.autoReview.enabled = value;
          })),
        ),

        row(
          '自动完成自评',
          '对自己的单元作业提交评分，分数按满分给出',
          toggle(mooc.background.autoSelfEvaluate.enabled, persistAfter((value: boolean) => {
            mooc.background.autoSelfEvaluate.enabled = value;
          })),
        ),
        row(
          '互评评语',
          '提交互评与自评时统一使用的评语。平台要求非空，留空时会退回默认值',
          textInput(mooc.background.autoReview.comment, persistAfter((value: string) => {
            mooc.background.autoReview.comment = value;
          })),
        ),
        row(
          '截止提醒',
          '每次检查后，对临近截止且未完成的单元发出桌面通知',
          toggle(mooc.background.deadlineReminder.enabled, persistAfter((value: boolean) => {
            mooc.background.deadlineReminder.enabled = value;
          })),
        ),
        row(
          '提前提醒天数',
          '距截止不足该天数时开始提醒，可设 1 到 30 天',
          numberInput(mooc.background.deadlineReminder.advanceDays, 1, 30, '天', persistAfter((value: number) => {
            mooc.background.deadlineReminder.advanceDays = value;
          })),
        ),
        row(
          '完成提醒',
          '每次检查后，对后台替你完成的事项发出桌面通知',
          toggle(mooc.background.completionNotice.enabled, persistAfter((value: boolean) => {
            mooc.background.completionNotice.enabled = value;
          })),
        ),
        row(
          '示例通知',
          '按当前账号的待办发一条示例，内容与开启提醒后实际收到的相同。系统可能把浏览器的通知静音或挡住，若收不到请检查系统的通知设置',
          button('发送示例通知', () => {
            void sendToBackground({ type: 'NOTIFY_SAMPLE' });
          }),
        ),
      ]),
    ]),

    section('foreground', '前台功能', '打开对应页面时生效，不做任何提交，也不影响后台任务。', [
      platform('慕课平台', 'icourse163.org', [
        row(
          '做题助手',
          '在单元测验作答页展示面板，可一次填充全部客观题',
          toggle(mooc.foreground.quizHelper.enabled, persistAfter((value: boolean) => {
            mooc.foreground.quizHelper.enabled = value;
          })),
        ),
        row(
          '作业得分指导',
          '在单元作业页把每题的得分说明插到题目下方，不显示面板',
          toggle(mooc.foreground.homeworkAnswers.enabled, persistAfter((value: boolean) => {
            mooc.foreground.homeworkAnswers.enabled = value;
          })),
        ),
      ]),
    ]),


    section('execution', '执行与诊断', '手动运行一次，并查看运行状态。', [
      platform('手动执行', '按需触发', [
        row(
          '立即执行',
          '拉取最新数据，把能自动完成的做完。与自动检查走同一流程，只是不等时机',
          button('开始执行', () => {
            void runAll();
          }),
        ),
        row(
          '重置状态',
          '清除执行中断的标记，让下一轮当作全新开始。不会改动平台上的任何数据',
          button('重置状态', () => {
            void resetProgress();
          }),
        ),
      ]),
      platform('运行状态', '中断可续', [
        progressView(),
      ]),
    ]),
  );

  renderToc();
  applyAnchor();
}

/**
 * 跳到地址里指定的锚点。
 *
 * 通知点击后打开的是 options.html#details。这一页有几个异步视图
 * （运行状态、单元明细），数据到达前后文档高度相差上千像素，
 * 因此不能在渲染完成时只定位一次就完事。
 *
 * 这里观察文档高度，每次变化都重新对准目标；用户自己一开始滚动就停止跟随，
 * 免得把人拽回去。跟随最多持续几秒，之后即便还有零星变化也不再干预。
 */
function applyAnchor(): void {
  const id = window.location.hash.replace(/^#/, '');
  if (!id) return;

  const scroll = (): void => {
    const target = document.getElementById(id);
    if (!target) return;
    window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY);
  };

  scroll();

  const observer = new ResizeObserver(scroll);
  observer.observe(document.body);

  let stopped = false;
  const stop = (): void => {
    if (stopped) return;
    stopped = true;
    observer.disconnect();
    window.removeEventListener('wheel', stop);
    window.removeEventListener('touchstart', stop);
    window.clearTimeout(timer);
  };

  // 用户一动手就不再跟随
  window.addEventListener('wheel', stop, { passive: true });
  window.addEventListener('touchstart', stop, { passive: true });
  const timer = window.setTimeout(stop, 6000);
}

/**
 * 生成左侧分区导航，并让它跟着滚动高亮当前分区。
 *
 * 导航项从实际渲染出的分区读取标题，不手写一份列表：
 * 手写的话，改了分区标题而忘了改导航，两边就会对不上。
 *
 * 高亮用滚动位置判断而不是 IntersectionObserver：
 * 分区高度差异很大（列表能上千像素，设置项只有一百像素），
 * 用可见比例判定会跳来跳去，按「最后一个已越过顶部的分区」最稳。
 */
function renderToc(): void {
  if (!toc) return;

  const sections = Array.from(app.querySelectorAll<HTMLElement>('.section'));
  toc.replaceChildren();

  const links = sections.map((el) => {
    const link = document.createElement('a');
    link.href = `#${el.id}`;
    link.textContent = el.querySelector('.section-title')?.textContent ?? el.id;
    toc.append(link);
    return link;
  });

  /*
   * 导航吸顶的位置要避开页头，页头高度随字号与换行变化，
   * 因此实测一次写进变量，而不是写死一个数字。
   */
  const masthead = document.querySelector('.masthead');
  const offset = (masthead?.getBoundingClientRect().height ?? 110) + 24;
  document.documentElement.style.setProperty('--toc-top', `${offset}px`);

  const highlight = (): void => {
    // 已经越过分区顶部、且离顶部最近的那个就是当前分区
    let currentIndex = 0;
    sections.forEach((el, index) => {
      if (el.getBoundingClientRect().top <= offset + 8) currentIndex = index;
    });
    // 滚到底时最后一个分区必须点亮，否则末尾几个短分区永远选不中
    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (atBottom) currentIndex = sections.length - 1;

    links.forEach((link, index) => {
      link.classList.toggle('is-current', index === currentIndex);
    });
  };

  highlight();
  window.addEventListener('scroll', highlight, { passive: true });
  window.addEventListener('resize', highlight, { passive: true });
}

/**
 * 运行状态视图。
 *
 * 只回答「上次什么时候检查的、现在是不是正在跑」。
 * 不再列出「已完成多少项」「待处理什么」——那两样在待办与单元明细里
 * 各有更准确的呈现，而它们是按当下重新算出来的；
 * 状态里那份是上一轮的快照，两者并列会让用户看到不一致的两套说法。
 */
function progressView(): HTMLElement {
  const box = document.createElement('div');
  box.className = 'progress';
  box.id = 'progress-view';
  box.textContent = '正在读取…';

  void sendToBackground({ type: 'TASK_STATE' })
    .then((state) => {
      box.textContent = describeRunState(state);
      signalContentReady();
    })
    .catch(() => {
      box.textContent = '读取状态失败';
      signalContentReady();
    });

  return box;
}

/**
 * 手动执行一轮。
 *
 * 与定时检查执行的是同一套流程，只是不等时机。
 * 后台会先拉最新状态再决定做什么，因此这里不需要预先判断
 * 「有没有可做的」——那需要一份同样新鲜的数据，而拉取本身就在后台做。
 */
async function runAll(): Promise<void> {
  toast('正在执行');

  const result = (await sendToBackground({ type: 'RUN_SCHEDULED_TASKS' })) as
    | {
        ok?: boolean;
        reason?: JobRejection;
        done?: number;
        manual?: number;
        message?: string;
        failed?: Array<{ name: string; detail: string }>;
      }
    | undefined;

  if (!result || result.ok === false) {
    toast(result?.reason ? REJECTION_MESSAGES[result.reason] : '执行失败');
    return;
  }

  if (result.message) {
    toast(result.message);
    render();
    return;
  }

  const failed = result.failed ?? [];
  const parts = [`完成 ${result.done ?? 0} 项`];
  if (failed.length > 0) parts.push(`${failed.length} 项失败`);
  if ((result.manual ?? 0) > 0) parts.push(`${result.manual} 项待你处理`);
  toast(parts.join('，'));

  render();
}

async function resetProgress(): Promise<void> {
  await sendToBackground({ type: 'RESET_TASK_STATE' });
  toast('已重置执行状态');
  render();
}

/**
 * 读取课程列表。
 *
 * 主动打开设置页，或按下「读取课程列表」，都走这条路：
 * 直接去平台拉一次，不用按天缓存。用户此刻想看的是最新状态。
 * 按天缓存只给后台自动任务用——那种场景一天拉一次足够，
 * 反复开关浏览器不该重复请求。
 *
 * 失败不弹提示：页面本身会显示课程区的空状态与错误说明，
 * 再弹一条只会重复。
 */
async function loadCourses(): Promise<void> {
  try {
    await sendToBackground({ type: 'REFRESH_COURSES' });
  } catch {
    // 拉取失败时沿用已有的课程列表
  }
}

async function init(): Promise<void> {
  // 读取配置期间先给出占位，避免 #app 从零高度被内容突然撑开，
  // 那会让页头与底部按钮先排一遍、再被顶走，看起来像"加载时定了一下"。
  app.textContent = '正在读取配置…';
  app.className = 'loading';

  /*
   * 先读配置画出界面，再在后台刷新课程。
   *
   * 不 await 刷新的原因：拉课程是两次网络往返，放在渲染之前会让
   * 「正在读取配置」多停一两秒。先用存储里的数据把界面画出来，
   * 刷新完成后再重画——用户很快看到内容，随后自动更新到最新。
   */
  current = await getSettings();
  app.className = '';
  render();

  void loadCourses().then(async () => {
    current = await getSettings();
    render();
  });

  document.getElementById('reset')?.addEventListener('click', () => {
    if (!window.confirm('确定恢复默认设置？课程列表也会被清空。')) return;
    void resetSettings().then((next) => {
      current = next;
      render();
      toast('已恢复默认设置');
    });
  });
}

void init();