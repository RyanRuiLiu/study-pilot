/*
 * 设置区：ai（外壳级）。
 *
 * 控件自带 label 与 help-text；带按钮的两项把说明写到按钮标题里，
 * 因为按钮这类控件没有 help-text。
 */

import { button, prose, secretInput, textInput, toggle } from '../../../src/ui/form.ts';
import { bindSetting } from '../../../src/settings/page-write.ts';
import { requestAiPermission, checkAiConnection } from '../actions.ts';
import { current } from '../../../src/settings/page-state.ts';
import type { SettingsSection } from '../../../src/platforms/types.ts';

export function aiSection(): SettingsSection {
  const ai = current.ai;
  return {
    id: 'ai',
    title: 'AI 能力',
    description:
      '需要 AI 的功能（目前是讨论区留言）由你提供接口地址、模型与密钥。密钥只存在本机，不参与同步、不上报。',
    controls: [
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
      toggle({
        label: '启用 AI',
        help: '关闭时依赖 AI 的功能不会自动执行，会显示为需要你自己处理',
        value: ai.enabled,
        onChange: bindSetting<boolean>('ai.enabled'),
      }),
      textInput({
        label: '接口地址',
        help: 'OpenAI 兼容的接口，例如 https://open.bigmodel.cn/api/paas/v4（带或不带 /v1 都可以）',
        value: ai.baseUrl,
        onChange: bindSetting<string>('ai.baseUrl'),
      }),
      textInput({
        label: '模型',
        help: '例如 glm-4-flash',
        value: ai.model,
        onChange: bindSetting<string>('ai.model'),
      }),
      secretInput({
        label: '密钥',
        help: '只存本机，不进日志、不进导出',
        value: ai.apiKey,
        onChange: bindSetting<string>('ai.apiKey'),
      }),
      button({
        label: '申请权限',
        variant: 'primary',
        title: '只申请上面填写的那个域名的主机权限',
        onClick: () => {
          void requestAiPermission();
        },
      }),
      button({
        label: '测试连接',
        variant: 'primary',
        title: '用当前配置发一次最小请求，确认地址、模型与密钥可用',
        onClick: () => {
          void checkAiConnection();
        },
      }),
    ],
  };
}
