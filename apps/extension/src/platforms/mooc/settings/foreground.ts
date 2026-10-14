/*
 * 设置区：foreground。
 *
 * 从 options/main.ts 的 render() 搬出；表达式原样，只在开头取一次配置。
 */

import { row, toggle, platform, section } from '../../../ui/form.ts';
import { bindSetting } from '../../../settings/page-write.ts';
import { current } from '../../../settings/page-state.ts';

export function foregroundSection(): HTMLElement {
  const mooc = current.mooc;
  return section('foreground', '前台功能', '打开对应页面时生效，不影响后台任务。做题助手需要你自己点提交，扩展不代点。', [
      platform('慕课平台', 'icourse163.org', [
        row(
          '做题助手',
          '在单元测验与客观题考试页展示面板，可按题库填充，也可以由你点提交。填充会触发页面保存草稿',
          toggle(mooc.foreground.quizHelper.enabled, bindSetting<boolean>('mooc.foreground.quizHelper.enabled')),
        ),
        row(
          '作业得分指导',
          '在单元作业页把每题的得分说明插到题目下方，不显示面板',
          toggle(mooc.foreground.guidance.enabled, bindSetting<boolean>('mooc.foreground.guidance.enabled')),
        ),
      ]),
    ]);
}