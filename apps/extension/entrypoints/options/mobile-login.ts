/*
 * 移动端登录（独立卡）：官网手机号 + 密码，保存并立即换发一次移动端会话。
 *
 * 走的是官方 UNS 账密登录 → `ursCellphoneLogin` 换发，和后台取答案同一条
 * 平台函数（`loginMobileSession`），不在这里重写一份请求。登录以网页/PC
 * 设备身份进行，不与手机、平板的移动端会话共槽。
 */

import { sendToBackground } from '../../src/messages.ts';
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

const randomHex = (length: number): string => {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
};

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
        const current = await getSettings();
        let aId = current.mooc.mobileAId;
        let uniqueId = current.mooc.mobileUniqueId;
        if (aId === '' || uniqueId === '') {
          aId = randomHex(8);
          uniqueId = randomHex(20);
        }
        const settings = await updateSettings({
          mooc: {
            mobileAccount: sentAccount,
            mobilePassword: sentPassword,
            mobileAId: aId,
            mobileUniqueId: uniqueId,
          },
        });
        if (account.value.trim() === sentAccount) account.value = settings.mooc.mobileAccount;
        if (password.value === sentPassword) password.value = settings.mooc.mobilePassword;

        // 交给后台发：扩展页直接发会带 chrome-extension:// 的 Origin 和浏览器 UA
        const result = await sendToBackground({
          type: 'MOOC_MOBILE_LOGIN',
          account: sentAccount,
          password: sentPassword,
          aId,
          uniqueId,
        });
        if (result.ok) {
          setStatus('登录成功，已换发移动端会话（不占用手机/平板）', false);
          toast('移动端登录成功');
        } else {
          setStatus(result.message, true);
        }
      } catch (error) {
        setStatus(`保存失败：${errorText(error)}`, true);
      } finally {
        save.disabled = false;
      }
    })();
  });
}
