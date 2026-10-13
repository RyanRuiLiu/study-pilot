/*
 * 登录状态行、单元明细表。
 *
 * 从 options/main.ts 整块搬出（原本是同一节）。
 */

import { workPageUrl } from '@study-pilot/platform-mooc';
import { getSettings } from '../../src/settings';
import { sendToBackground, type UnitDetail, WORK_STATUS } from '../../src/platform/messaging';
import { describeRunState } from '../../src/background/runtime/scheduler';
import { formatDateTime } from '../../src/features/format';


/**
 * 登录状态。
 *
 * 平台的登录凭证是会话级 cookie。浏览器长期驻留（启动加速、后台运行）
 * 会让 cookie 活过服务端会话的寿命，所以「cookie 还在」不代表还能用——
 * 状态由后台向服务端核对（见 SESSION 的处理），可疑时还会先尝试用
 * 持久凭证自动恢复，救不回来才显示未登录。这里只如实展示，未登录时
 * 给一个跳转入口。
 *
 * 状态用文字表达，不套色块：色块会让这一行的分量超过它实际的重要程度。
 *//**
 * 登录状态。
 *
 * 状态用文字表达，不套色块：色块会让这一行的分量超过它实际的重要程度。
 *
 * 两个按钮各有分工，不能合并：
 *   刷新   重读登录状态。后台会先向服务端核对，会话可疑时自动用持久
 *          凭证恢复一次，通常刷新一次即可恢复，不必真的去登录页。
 *          用户在别处登录过之后也用这个确认。
 *   前往登录  真的要去登录页。它是刷新之后的下一步，不是同一个动作。

/** 状态标签的样式类别。 */
/**
 * 状态的配色分类。
 *
 *   未提交 / 已过截止未提交   需要注意
 *   互评阶段                  仍要用户动手
 *   成绩已公布 / 等待成绩公布  已完成，无需行动
 */
export function statusClass(detail: UnitDetail): string {
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
export function unitDetailsView(): HTMLElement {
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
export function reloadUnitDetails(): void {
  const box = document.getElementById('unit-details');
  if (box) loadUnitDetails(box);
}

/**
 * 往容器里填单元明细。
 *
 * 抽出来是为了能被重复调用，见 reloadUnitDetails。
 */
export function loadUnitDetails(box: HTMLElement): void {
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
export function signalContentReady(): void {
  document.dispatchEvent(new CustomEvent('sp:content-ready'));
}


/**
 * 一个设置分区。
 *
 * 不加编号：编号只在内容本身是序列时才有意义，而设置分区之间
 * 没有先后顺序，编号只是装饰。层次由标题字号与分区之间的留白给出。
 */