/*
 * 设置区：foreground。
 *
 * 前台功能只在打开的页面上生效；控件自带 label 与 help-text，外面不套自画的行。
 */

import { toggle } from '../../../ui/form.ts';
import { bindSetting } from '../../../settings/page-write.ts';
import { current } from '../../../settings/page-state.ts';
import type { SettingsSection } from '../../types.ts';

export function foregroundSection(): SettingsSection {
  const mooc = current.mooc;
  return {
    id: 'foreground',
    title: '前台功能',
    description: '打开对应页面时生效，不影响后台任务。做题助手需要你自己点提交，扩展不代点。',
    controls: [
      toggle({
        label: '做题助手',
        help: '在单元测验与客观题考试页展示面板，可按题库填充，也可以由你点提交。填充会触发页面保存草稿',
        value: mooc.foreground.quizHelper.enabled,
        onChange: bindSetting<boolean>('mooc.foreground.quizHelper.enabled'),
      }),
      toggle({
        label: '作业得分指导',
        help: '在单元作业页把每题的得分说明插到题目下方，不显示面板',
        value: mooc.foreground.guidance.enabled,
        onChange: bindSetting<boolean>('mooc.foreground.guidance.enabled'),
      }),
    ],
  };
}
