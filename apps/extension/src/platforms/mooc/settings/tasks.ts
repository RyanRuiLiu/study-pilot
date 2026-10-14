/*
 * 设置区：tasks。
 *
 * 每一项都是官方控件，label 与 help-text 写在控件自己身上。
 * 说明里提到的系统层面提示（收不到通知多半不在扩展里）放在分区说明中，
 * 因为按钮这类控件没有 help-text。
 */

import { sendToBackground } from '../../../browser/messaging';

import { button, numberInput, textInput, toggle } from '../../../ui/form.ts';
import { bindSetting } from '../../../settings/page-write.ts';
import { toast } from '../../../settings/page-state.ts';
import { current } from '../../../settings/page-state.ts';
import type { SettingsSection } from '../../types.ts';

export function tasksSection(): SettingsSection {
  const mooc = current.mooc;
  return {
    id: 'tasks',
    title: '自动任务',
    description:
      '开启后这些事会在检查时自动完成。做不了的仍然需要你自己处理，并在有结果时收到桌面通知。示例通知的内容与开启提醒后实际收到的相同；若收不到，请检查系统的通知设置。',
    controls: [
      toggle({
        label: '自动完成课件',
        help: '对尚未完成的课件单元（视频、文档、文本、随堂测验、讨论）上报为已学。视频按平台给的时长记满',
        value: mooc.background.autoCourseware.enabled,
        onChange: bindSetting<boolean>('mooc.background.autoCourseware.enabled'),
      }),
      toggle({
        label: '自动完成测验',
        help: '对尚未提交的单元测验生成答案并提交。只处理客观题',
        value: mooc.background.autoQuiz.enabled,
        onChange: bindSetting<boolean>('mooc.background.autoQuiz.enabled'),
      }),
      toggle({
        label: '自动完成互评',
        help: '对处于互评期的单元作业提交评分，按平台要求的份数评够为止',
        value: mooc.background.autoReview.enabled,
        onChange: bindSetting<boolean>('mooc.background.autoReview.enabled'),
      }),
      toggle({
        label: '自动完成自评',
        help: '对自己的单元作业提交评分，分数按满分给出',
        value: mooc.background.autoSelfEvaluate.enabled,
        onChange: bindSetting<boolean>('mooc.background.autoSelfEvaluate.enabled'),
      }),
      textInput({
        label: '互评评语',
        help: '提交互评与自评时统一使用的评语。平台要求非空，留空时会退回默认值',
        value: mooc.background.autoReview.comment,
        onChange: bindSetting<string>('mooc.background.autoReview.comment'),
      }),
      toggle({
        label: '截止提醒',
        help: '每次检查后，对临近截止且未完成的单元发出桌面通知',
        value: mooc.background.deadlineReminder.enabled,
        onChange: bindSetting<boolean>('mooc.background.deadlineReminder.enabled'),
      }),
      numberInput({
        label: '提前提醒天数',
        help: '距截止不足该天数时开始提醒，可设 1 到 30 天',
        value: mooc.background.deadlineReminder.advanceDays,
        min: 1,
        max: 30,
        unit: '天',
        onChange: bindSetting<number>('mooc.background.deadlineReminder.advanceDays'),
      }),
      toggle({
        label: '完成提醒',
        help: '每次检查后，对后台替你完成的事项发出桌面通知',
        value: mooc.background.completionNotice.enabled,
        onChange: bindSetting<boolean>('mooc.background.completionNotice.enabled'),
      }),
      button({
        label: '发送示例通知',
        variant: 'primary',
        title: '按当前账号的待办发一条示例，内容与开启提醒后实际收到的相同',
        onClick: () => {
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
        },
      }),
    ],
  };
}
