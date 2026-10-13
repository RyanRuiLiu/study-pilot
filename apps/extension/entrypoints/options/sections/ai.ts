/*
 * 设置区：ai。
 *
 * 从 options/main.ts 的 render() 搬出；表达式原样，只在开头取一次配置。
 */

import { row, toggle, textInput, button, prose, section } from '../ui.ts';
import { bindSetting } from '../settings-write.ts';
import { requestAiPermission, checkAiConnection } from '../actions.ts';
import { current } from '../state.ts';

export function aiSection(): HTMLElement {
  const mooc = current.mooc;
  const ai = current.ai;
  return section('ai', 'AI 能力', '需要 AI 的功能（目前是讨论区留言）由你提供接口地址、模型与密钥。密钥只存在本机，不参与同步、不上报。', [
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
    ]);
}
