/*
 * 设置页（入口）。
 *
 * 一页四块的顺序就是使用顺序：
 *   账号与课程（参与什么）→ 课件（刷进度）→ 互评评语 → AI 连接；
 *   页头只有名字（状态行在账号与课程卡里），页脚是版本与出处。
 *
 * 数据只从 src/ui-bridge.ts（以及平台包的纯地址工具）取。
 * 样式分两层引入：tokens（取值）、本页布局；import 而不是 <link>（理由见 popup）。
 *
 * 装配在这里，各块实现见同级模块。
 */

import '../../src/ui/tokens.css';
import './style.css';

import { getCourseware } from '../../src/ui-bridge';
import { initCourseActions, renderCourses } from './courses.ts';
import { renderCourseware } from './courseware.ts';
import { renderParams } from './params.ts';
import { renderStatusLine } from './status-line.ts';
import { initToast } from './toast.ts';

function init(): void {
  const toastEl = document.getElementById('toast');
  if (toastEl !== null) initToast(toastEl);

  const versionEl = document.getElementById('version');
  if (versionEl !== null) versionEl.textContent = `v${browser.runtime.getManifest().version}`;

  /*
   * 课件进度只读一次，状态行与课件区共用：各读各的会让页面一开就发两遍
   * 同样的请求，而两处显示的是同一件事——不一致时还说不清以哪边为准。
   */
  const courseware = getCourseware();

  initCourseActions();
  void renderCourses();
  void renderStatusLine(courseware);
  void renderCourseware(courseware);
  void renderParams();
}

init();
