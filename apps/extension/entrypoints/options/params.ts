/*
 * 任务与参数：互评评语与 AI 连接。
 *
 * 这两样都是「执行时要用的东西」——评语在互评提交时填给平台，
 * AI 给讨论单元的留言生成文本。设置里没有「允许做什么」的开关：
 * 授权在点击那一刻，这里只有参数。
 *
 * AI 的接口地址事先不知道是哪个域名，主机权限只能按需申请，且必须
 * 在用户手势里（这个按钮）——见 src/ai/permission.ts。
 */

import { chatOrigin } from '@study-pilot/ai';
import { testAiConnection } from '../../src/ai';
import { ensureHostPermission } from '../../src/ai/permission';
import { getSettings, updateSettings } from '../../src/ui-bridge';
import { toast } from './toast.ts';

function input(id: string): HTMLInputElement | null {
  const el = document.getElementById(id);
  return el instanceof HTMLInputElement ? el : null;
}

function setStatus(text: string, isError: boolean): void {
  const el = document.getElementById('ai-status');
  if (el === null) return;
  el.textContent = text;
  el.classList.toggle('is-error', isError);
}

export async function renderParams(): Promise<void> {
  const settings = await getSettings();

  const comment = input('review-comment');
  const enabled = input('ai-enabled');
  const baseUrl = input('ai-base-url');
  const model = input('ai-model');
  const apiKey = input('ai-api-key');
  if (comment === null || enabled === null || baseUrl === null || model === null || apiKey === null) {
    return;
  }

  comment.value = settings.mooc.reviewComment;
  enabled.checked = settings.ai.enabled;
  baseUrl.value = settings.ai.baseUrl;
  model.value = settings.ai.model;
  apiKey.value = settings.ai.apiKey;

  /*
   * 改动立即保存。评语在 change（失焦或回车）时写：摸到一半的半句话
   * 不该进存储——那是每次互评都会提交出去的措辞。
   */
  comment.addEventListener('change', () => {
    void updateSettings({ mooc: { reviewComment: comment.value } }).then((next) => {
      // 留空会退回默认那句（normalize 的兜底），把兜底后的值写回输入框
      comment.value = next.mooc.reviewComment;
      toast('评语已保存');
    });
  });

  const saveAi = async () => {
    return updateSettings({
      ai: {
        enabled: enabled.checked,
        baseUrl: baseUrl.value.trim(),
        model: model.value.trim(),
        apiKey: apiKey.value.trim(),
      },
    });
  };
  enabled.addEventListener('change', () => void saveAi());
  baseUrl.addEventListener('change', () => void saveAi());
  model.addEventListener('change', () => void saveAi());
  apiKey.addEventListener('change', () => void saveAi());

  document.getElementById('ai-test')?.addEventListener('click', () => {
    void (async () => {
      const next = await saveAi();

      const origin = chatOrigin(next.ai.baseUrl);
      if (origin === null) {
        setStatus('接口地址填得不对：需要一个完整的 https 地址', true);
        return;
      }

      const permission = await ensureHostPermission(origin);
      if (permission !== 'granted') {
        setStatus(permission === 'denied' ? '没有获得访问该地址的权限' : '这个环境无法申请权限', true);
        return;
      }

      setStatus('正在测试…', false);
      const result = await testAiConnection(next);
      setStatus(result.ok ? `连接可用：${result.text}` : `连接失败：${result.reason}`, !result.ok);
    })();
  });
}
