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
  updateSettings,
  type Settings,
} from '../../src/settings';
import { chatOrigin } from '@study-pilot/ai';
import { testAiConnection } from '../../src/ai';
import { ensureHostPermission } from '../../src/ai/permission';
import {
  REJECTION_MESSAGES,
  sendToBackground,
  WORK_STATUS,
  type JobRejection,
  type UnitDetail,
} from '../../src/platform/messaging';
import { describeRunState } from '../../src/background/runtime/scheduler';
import { coursePageUrl, describeCourseMode, workPageUrl } from '@study-pilot/platform-mooc';
import type { SelectedCourse } from '../../src/settings';
import { formatDateTime, formatTermRange } from '../../src/features/format';

const app = document.getElementById('app')!;
const toc = document.getElementById('toc');
const toastEl = document.getElementById('toast')!;

function toast(text: string): void {
  toastEl.textContent = text;
  toastEl.classList.add('on');
  window.setTimeout(() => toastEl.classList.remove('on'), 3200);
}

/*
 * 版本号显示在左栏底部，与「恢复默认设置」并列。
 *
 * 取运行时清单里的版本，不写死字面量：它就是浏览器里实际装着的这一版。
 * 排查「改动有没有生效」时看这一个数就够，比翻扩展管理页快。
 */
const versionEl = document.getElementById('version');
if (versionEl) versionEl.textContent = `v${browser.runtime.getManifest().version}`;


import { current, setCurrent, setRender, setToast } from './state.ts';
import { row, toggle, numberInput, textInput, note, button, platform, prose, section } from './ui.ts';
import { lastRunHint, readSessionInto, sessionBadge } from './session-row.ts';
import { loadUnitDetails, reloadUnitDetails, statusClass, unitDetailsView, signalContentReady } from './unit-details.ts';
import { writePatch, setPath, patchAt, bindSetting, toggleCourse } from './settings-write.ts';
import { requestAiPermission, checkAiConnection, describeRejection, refreshCourses } from './actions.ts';

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

      // 落盘以存储里的课程列表为基准（见 toggleCourse），界面上的改动是即时的
      void toggleCourse(course.termId, check.checked).then(() => reloadUnitDetails());
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
  const ai = current.ai;

  app.append(
    section('account', '账号与课程', '先确认登录状态，再选择参与任务的课程。', [
      platform('慕课平台', 'icourse163.org', [
        row(
          '启用 Study Pilot',
          '关闭后不再执行后台任务，页面里的辅助面板也不再显示',
          toggle(current.enabled, bindSetting<boolean>('enabled')),
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
          numberInput(mooc.background.schedule.checkIntervalMinutes, 5, 360, '分钟', bindSetting<number>('mooc.background.schedule.checkIntervalMinutes')),
        ),
        row(
          '启动延迟',
          '启动后等待多少分钟再开始检查，0 表示立即开始，可设 0 到 30 分钟。运行期间的定时检查不受它影响',
          numberInput(mooc.background.schedule.startupDelayMinutes, 0, 30, '分钟', bindSetting<number>('mooc.background.schedule.startupDelayMinutes')),
        ),
        row('上次运行', '最近一次运行的时间。这一轮无事可做时也计入', lastRunHint()),
      ]),
      platform('过期事项', '', [
        row(
          '保留天数',
          '已过截止的事项在待办里再显示几天，可设 0 到 90 天，0 表示立刻不再显示。它们不影响完成，列在这里是让你知道自己漏了什么',
          numberInput(mooc.background.schedule.keepOverdueDays, 0, 90, '天', bindSetting<number>('mooc.background.schedule.keepOverdueDays')),
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
          '自动完成课件',
          '对尚未完成的课件单元（视频、文档、文本、随堂测验、讨论）上报为已学。视频按平台给的时长记满',
          toggle(mooc.background.autoCourseware.enabled, bindSetting<boolean>('mooc.background.autoCourseware.enabled')),
        ),
        row(
          '自动完成测验',
          '对尚未提交的单元测验生成答案并提交。只处理客观题',
          toggle(mooc.background.autoQuiz.enabled, bindSetting<boolean>('mooc.background.autoQuiz.enabled')),
        ),
        row(
          '自动完成互评',
          '对处于互评期的单元作业提交评分，按平台要求的份数评够为止',
          toggle(mooc.background.autoReview.enabled, bindSetting<boolean>('mooc.background.autoReview.enabled')),
        ),

        row(
          '自动完成自评',
          '对自己的单元作业提交评分，分数按满分给出',
          toggle(mooc.background.autoSelfEvaluate.enabled, bindSetting<boolean>('mooc.background.autoSelfEvaluate.enabled')),
        ),
        row(
          '互评评语',
          '提交互评与自评时统一使用的评语。平台要求非空，留空时会退回默认值',
          textInput(mooc.background.autoReview.comment, bindSetting<string>('mooc.background.autoReview.comment')),
        ),
        row(
          '截止提醒',
          '每次检查后，对临近截止且未完成的单元发出桌面通知',
          toggle(mooc.background.deadlineReminder.enabled, bindSetting<boolean>('mooc.background.deadlineReminder.enabled')),
        ),
        row(
          '提前提醒天数',
          '距截止不足该天数时开始提醒，可设 1 到 30 天',
          numberInput(mooc.background.deadlineReminder.advanceDays, 1, 30, '天', bindSetting<number>('mooc.background.deadlineReminder.advanceDays')),
        ),
        row(
          '完成提醒',
          '每次检查后，对后台替你完成的事项发出桌面通知',
          toggle(mooc.background.completionNotice.enabled, bindSetting<boolean>('mooc.background.completionNotice.enabled')),
        ),
        row(
          '示例通知',
          '按当前账号的待办发一条示例，内容与开启提醒后实际收到的相同。系统可能把浏览器的通知静音或挡住，若收不到请检查系统的通知设置',
          button('发送示例通知', () => {
            /*
             * 必须有反馈。这条通知收不到的原因通常不在扩展里——系统静音、
             * 专注模式、通知权限——而「点了没反应」与「发了但系统没弹」
             * 在界面上完全一样。没有回执时，用户会以为扩展只肯发一次。
             */
            void sendToBackground({ type: 'NOTIFY_SAMPLE' })
              .then((response) => {
                toast(
                  response.hasContent
                    ? '已发送示例通知，内容取自当前待办'
                    : '已发送示例通知：当前没有待办，内容为说明文本',
                );
              })
              .catch(() => toast('示例通知发送失败，请重试'));
          }),
        ),
      ]),
    ]),

    section('ai', 'AI 能力', '需要 AI 的功能（目前是讨论区留言）由你提供接口地址、模型与密钥。密钥只存在本机，不参与同步、不上报。', [
      prose([
        {
          term: '什么时候联网',
          text: '只有开启并授权之后，扩展才会向你填写的地址发请求。发出去的内容只有该功能需要的材料（例如讨论题名），不含账号、学号与其它课程数据。',
        },
        {
          term: '权限怎么来',
          text: '主机权限按需申请：点「申请权限」时只申请你填的那个域名。不开启 AI 就一个第三方域名都不申请。',
        },
        {
          term: '失败会怎样',
          text: '生成失败会重试，仍失败就记为失败、不写任何内容到平台，留给人工处理——不会用固定文案顶替。',
        },
      ]),
      row(
        '启用 AI',
        '关闭时依赖 AI 的功能不会自动执行，会显示为需要你自己处理',
        toggle(ai.enabled, bindSetting<boolean>('ai.enabled')),
      ),
      row(
        '接口地址',
        'OpenAI 兼容的接口，例如 https://open.bigmodel.cn/api/paas/v4（带或不带 /v1 都可以）',
        textInput(ai.baseUrl, bindSetting<string>('ai.baseUrl')),
      ),
      row('模型', '例如 glm-4-flash', textInput(ai.model, bindSetting<string>('ai.model'))),
      row(
        '密钥',
        '只存本机，不进日志、不进导出',
        textInput(ai.apiKey, bindSetting<string>('ai.apiKey')),
      ),
      row(
        '主机权限',
        '只申请上面填写的那个域名',
        button('申请权限', () => {
          void requestAiPermission();
        }),
      ),
      row(
        '连通性',
        '用当前配置发一次最小请求，确认地址、模型与密钥可用',
        button('测试连接', () => {
          void checkAiConnection();
        }),
      ),
    ]),

    section('foreground', '前台功能', '打开对应页面时生效，不影响后台任务。做题助手需要你自己点提交，扩展不代点。', [
      platform('慕课平台', 'icourse163.org', [
        row(
          '做题助手',
          '在单元测验与客观题考试页展示面板，可按题库填充，也可以由你点提交。填充会触发页面保存草稿',
          toggle(mooc.foreground.quizHelper.enabled, bindSetting<boolean>('mooc.foreground.quizHelper.enabled')),
        ),
        row(
          '作业得分指导',
          '在单元作业页把每题的得分说明插到题目下方，不显示面板',
          toggle(mooc.foreground.homeworkAnswers.enabled, bindSetting<boolean>('mooc.foreground.homeworkAnswers.enabled')),
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
    .then((status) => {
      box.textContent = describeRunState(status.state);
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
  setCurrent(await getSettings());
  app.className = '';
  render();

  void loadCourses().then(async () => {
    setCurrent(await getSettings());
    render();
  });

  document.getElementById('reset')?.addEventListener('click', () => {
    if (!window.confirm('确定恢复默认设置？所有开关回到默认，课程列表与勾选一并清空。')) return;
    void resetSettings().then((next) => {
      setCurrent(next);
      render();
      toast('已恢复默认设置');
    });
  });
}

setToast(toast);
setRender(render);

void init();