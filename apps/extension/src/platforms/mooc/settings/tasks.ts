/*
 * 设置区：tasks。
 *
 * 从 options/main.ts 的 render() 搬出；表达式原样，只在开头取一次配置。
 */

import { sendToBackground } from '../../../platform/messaging';

import { row, toggle, numberInput, textInput, button, platform, section } from '../../../ui/form.ts';
import { bindSetting } from '../../../settings/page-write.ts';
import { toast } from '../../../settings/page-state.ts';
import { current } from '../../../settings/page-state.ts';

export function tasksSection(): HTMLElement {
  const mooc = current.mooc;
  return section('tasks', '自动任务', '开启后这些事会在检查时自动完成。做不了的仍然需要你自己处理，并在有结果时收到桌面通知。', [
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
          button({
            label: '发送示例通知',
            variant: 'primary',
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
        ),
      ]),
    ]);
}