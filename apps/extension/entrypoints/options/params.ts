/*
 * 任务与参数：互评评语与 AI 连接。
 *
 * 这两样都是「执行时要用的东西」——评语在互评提交时填给平台，
 * AI 给讨论单元的留言生成文本。设置里没有「允许做什么」的开关：
 * 授权在点击那一刻，这里只有参数。
 *
 * AI 的接口地址不在设置里：固定智谱（见 application 的 AI_BASE_URL），
 * 主机权限在清单里静态声明（安装即授权），因此这里没有「申请权限」一步；
 * 只做一件事——若用户在浏览器中撤回了访问权限，如实说出来。
 */

import { testAiConnection } from '../../src/ai/index.ts';
import { hasAiHostPermission } from '../../src/ai/permission.ts';
import { getSettings, updateSettings } from '../../src/ui-bridge.ts';
import { sendToBackground } from '../../src/messages.ts';
import { errorText } from '../../src/ui/format.ts';
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

/** 权限被撤回时的说法。扩展自己无法重新申请静态声明的权限，只能指明去处。 */
const REVOKED_HINT =
  '智谱访问许可已撤回：在扩展详情页开启「网站访问权限」后重试';

export async function renderParams(): Promise<void> {
  let settings: Awaited<ReturnType<typeof getSettings>>;
  try {
    settings = await getSettings();
  } catch (error) {
    // 读配置失败（后台重启、端口失效）：说在 AI 状态位，不让页面静默空白
    setStatus(`读取设置失败：${errorText(error)}`, true);
    return;
  }

  const comment = input('review-comment');
  const loginUser = input('mooc-login-user');
  const loginPassword = input('mooc-login-password');
  const loginButton = document.getElementById('mooc-login-button');
  const enabled = input('ai-enabled');
  const model = input('ai-model');
  const apiKey = input('ai-api-key');
  if (
    comment === null ||
    loginUser === null ||
    loginPassword === null ||
    loginButton === null ||
    enabled === null ||
    model === null ||
    apiKey === null
  ) {
    return;
  }

  comment.value = settings.mooc.reviewComment;
  enabled.checked = settings.ai.enabled;
  model.value = settings.ai.model;
  apiKey.value = settings.ai.apiKey;

  /*
   * 改动立即保存。评语在 change（失焦或回车）时写：摸到一半的半句话
   * 不该进存储——那是每次互评都会提交出去的措辞。
   */
  comment.addEventListener('change', () => {
    const sent = comment.value;
    void updateSettings({ mooc: { reviewComment: sent } })
      .then((next) => {
        /*
         * 留空会退回默认评语（normalize 的兜底），把兜底后的值写回输入框。
         * 只在这期间用户没再改过时回写——否则会把刚输入的新字擦掉。
         */
        if (comment.value === sent) comment.value = next.mooc.reviewComment;
        toast('评语已保存');
      })
      .catch((error: unknown) => {
        // 写不进去就说一句：输入框里的字不等于已保存
        toast(`未能保存评语：${errorText(error)}`);
      });
  });

  const setLoginStatus = (text: string, isError: boolean): void => {
    const el = document.getElementById('mooc-login-status');
    if (el === null) return;
    el.textContent = text;
    el.classList.toggle('is-error', isError);
  };

  loginButton.addEventListener('click', () => {
    void (async () => {
      const username = loginUser.value.trim();
      const password = loginPassword.value;
      if (username === '' || password === '') {
        setLoginStatus('请输入手机号/邮箱和密码', true);
        return;
      }
      setLoginStatus('正在登录…', false);
      try {
        const result = await sendToBackground({ type: 'MOOC_WEB_LOGIN', username, password });
        if (result.status !== 'ok') {
          setLoginStatus(`登录失败：${result.message}`, true);
          return;
        }
        const next = await updateSettings({ mooc: { mobileToken: result.value.token } });
        loginPassword.value = '';
        setLoginStatus(`已登录，移动端答案已启用（token ${next.mooc.mobileToken.length} 位）`, false);
        toast('登录成功');
      } catch (error) {
        setLoginStatus(`登录失败：${errorText(error)}`, true);
      }
    })();
  });

  /** 保存 AI 三项；失败写进状态位并返回 null（调用方据此中止后续动作）。 */
  let saveErrorShown = false;
  const saveAi = async () => {
    const sent = {
      enabled: enabled.checked,
      model: model.value.trim(),
      apiKey: apiKey.value.trim(),
    };
    try {
      const next = await updateSettings({ ai: sent });
      /*
       * 写回落库后的值：normalize 会 trim、空模型退回默认。不回写的话输入框
       * 显示的是「空」，而实际存的是默认模型——下次打开设置页又变回来，
       * 中间这段界面与存储说的不是一件事。
       *
       * 逐格只在用户没改过时才回写：请求期间他可能已经在另一个框里输入了
       * 下一笔，整份覆盖会把它擦掉。
       */
      if (enabled.checked === sent.enabled) enabled.checked = next.ai.enabled;
      if (model.value.trim() === sent.model) model.value = next.ai.model;
      if (apiKey.value.trim() === sent.apiKey) apiKey.value = next.ai.apiKey;
      // 上一次没存上的提示不能继续挂着——这次已经存上了
      if (saveErrorShown) {
        saveErrorShown = false;
        setStatus('', false);
      }
      return next;
    } catch (error) {
      saveErrorShown = true;
      setStatus(`未能保存 AI 设置：${errorText(error)}`, true);
      return null;
    }
  };
  enabled.addEventListener('change', () => void saveAi());
  model.addEventListener('change', () => void saveAi());
  apiKey.addEventListener('change', () => void saveAi());

  document.getElementById('ai-test')?.addEventListener('click', () => {
    void (async () => {
      const next = await saveAi();
      // 保存失败已在状态位说明，不再拿着旧配置去发测试请求
      if (next === null) return;

      // 权限是清单静态声明的，正常装好就有；被撤回时先说清楚，
      // 否则测试请求只会报销一句网络错误，线索指不回「网站访问权限」
      if (!(await hasAiHostPermission())) {
        setStatus(REVOKED_HINT, true);
        return;
      }

      setStatus('正在测试…', false);
      const result = await testAiConnection(next);
      setStatus(result.ok ? `连接可用：${result.text}` : `连接失败：${result.reason}`, !result.ok);
    })();
  });

  /*
   * 配置填齐了但权限不在（用户在浏览器中收回过）：打开设置页就直接说清楚。
   * 没有这句，界面看起来「配好了」，而执行时讨论单元会一个个失败——
   * 失败发生在浏览器的权限层，用户没有任何线索指回这里。
   */
  if (settings.ai.enabled && !(await hasAiHostPermission())) {
    setStatus(REVOKED_HINT, true);
  }
}
