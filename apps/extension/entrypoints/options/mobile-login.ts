/*
 * 移动端登录（独立卡）：官网手机号 + 密码，保存并立即换发一次移动端会话。
 *
 * 走的是官方 URS 账密登录 → `ursCellphoneLogin` 换发，和后台取答案同一条
 * 平台函数（`loginMobileSession`），不在这里重写一份请求。
 */

import { loginMobileSession } from '@study-pilot/platform-mooc';
import { getSettings, updateSettings } from '../../src/ui-bridge.ts';
import { errorText } from '../../src/ui/format.ts';
import { toast } from './toast.ts';

function field(id: string): HTMLInputElement | null {
  const element = document.getElementById(id);
  return element instanceof HTMLInputElement ? element : null;
}

function setStatus(text: string, isError: boolean): void {
  const element = document.getElementById('mobile-login-status');
  if (element === null) return;
  element.textContent = text;
  element.classList.toggle('is-error', isError);
}

export async function renderMobileLogin(): Promise<void> {
  const account = field('mobile-account');
  const password = field('mobile-password');
  const save = document.getElementById('mobile-login-save');
  if (account === null || password === null || !(save instanceof HTMLButtonElement)) return;

  try {
    const settings = await getSettings();
    account.value = settings.mooc.mobileAccount;
    password.value = settings.mooc.mobilePassword;
    if (settings.mooc.mobileAccount !== '' && settings.mooc.mobilePassword !== '') {
      setStatus('已配置，取答案时将自动登录', false);
    }
  } catch (error) {
    setStatus(`读取设置失败：${errorText(error)}`, true);
    return;
  }

  save.addEventListener('click', () => {
    void (async () => {
      const sentAccount = account.value.trim();
      const sentPassword = password.value;
      if (!/^1\d{10}$/.test(sentAccount)) {
        setStatus('手机号需要 11 位大陆手机号', true);
        return;
      }
      if (sentPassword === '') {
        setStatus('密码不能为空', true);
        return;
      }

      save.disabled = true;
      setStatus('正在保存并登录…', false);
      try {
        const settings = await updateSettings({
          mooc: { mobileAccount: sentAccount, mobilePassword: sentPassword },
        });
        if (account.value.trim() === sentAccount) account.value = settings.mooc.mobileAccount;
        if (password.value === sentPassword) password.value = settings.mooc.mobilePassword;

        const result = await loginMobileSession(
          { send: (input, init) => fetch(input, init), origin: 'https://www.icourse163.org' },
          { account: sentAccount, password: sentPassword },
        );
        if (result.ok) {
          setStatus('登录成功，已换发移动端会话', false);
          toast('移动端登录成功');
        } else {
          setStatus(`登录失败：${result.error.message}`, true);
        }
      } catch (error) {
        setStatus(`保存失败：${errorText(error)}`, true);
      } finally {
        save.disabled = false;
      }
    })();
  });
}
