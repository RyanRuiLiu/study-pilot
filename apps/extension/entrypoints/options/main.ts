/*
 * 设置页（入口）。
 *
 * 平台 tab（通用/慕课/智慧树）由 src/ui/tabs.ts 装配：
 *   通用＝配置即时读（AI 连接，随页面初始化）；
 *   慕课＝平台数据，只在它第一次成为当前 tab 时读一次；
 *   智慧树＝平台数据，同样只在它第一次成为当前 tab 时读一次。
 * 「一次打开最多读一家」见规格第 13 节。
 *
 * 数据只从 src/ui-bridge.ts（以及平台包的纯地址工具）取。
 * 样式分三层引入：tokens（取值）、本页布局、共享组件；import 而不是 <link>（理由见 popup）。
 *
 * 装配在这里，各块实现见同级模块。
 */

import '../../src/ui/tokens.css';
import './style.css';

import { getCourseware } from '../../src/ui-bridge.ts';
import { initTabs } from '../../src/ui/tabs.ts';
import { initCourseActions, renderCourses } from './courses.ts';
import { renderCourseware } from './courseware.ts';
import { renderParams } from './params.ts';
import { watchRunHint } from './run-hint.ts';
import { renderStatusLine } from './status-line.ts';
import { initToast } from './toast.ts';
import { initZhsCourseActions, renderZhsCourses } from './zhihuishu-courses.ts';
import { refreshZhsTaskViews } from './zhihuishu-course-tasks.ts';


function init(): void {
  const toastEl = document.getElementById('toast');
  if (toastEl !== null) initToast(toastEl);

  const versionEl = document.getElementById('version');
  if (versionEl !== null) versionEl.textContent = `v${browser.runtime.getManifest().version}`;

  /*
   * 配置类的块（评语、AI 连接）不依赖平台网络：始终初始化——
   * 两个 tab 面板都在 DOM 里（隐藏的那个也填好），切过去就是现成的。
   */
  void renderParams();

  // 运行提示不依赖任何 tab 的取数：订阅常在（见 run-hint.ts）
  watchRunHint();

  void initTabs({
    onFirstActivate: (id) => {
      if (id === 'mooc') {
        /*
         * 课件进度只读一次，状态行与课件区共用：各读各的会让这一 tab
         * 一打开就发两遍同样的请求，而两处显示的是同一件事。
         */
        const courseware = getCourseware();
        initCourseActions();
        void renderCourses();
        void renderStatusLine(courseware);
        void renderCourseware(courseware);
        return;
      }
      if (id === 'zhihuishu') {
        /*
         * 同一条装配规则：智慧树的课程任务只读一次，状态行与四张卡共用；
         * 会话判定与骨架、以及那次读取都收在 refreshZhsTaskViews 一处。
         */
        initZhsCourseActions();
        void renderZhsCourses();
        void refreshZhsTaskViews();
      }
    },
  });
}

init();
