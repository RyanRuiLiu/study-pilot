/*
 * 登录状态行与上次运行提示。
 *
 * 从 unit-details.ts 再分出：两者没有共用状态，唯一的关系是都显示在设置页顶部。
 * syncSessionBadge 随之留在这里——它由渲染登录行时赋值。
 */
import { workPageUrl } from '@study-pilot/platform-mooc';
import { getSettings } from '../../src/settings';
import { sendToBackground, type UnitDetail, WORK_STATUS } from '../../src/platform/messaging';
import { describeRunState } from '../../src/background/runtime/scheduler';
import { formatDateTime } from '../../src/features/format';

export function sessionBadge(): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = 'session';

  const el = document.createElement('span');
  el.id = 'session-badge';
  el.textContent = '读取中';

  const login = document.createElement('a');
  login.className = 'login-link quiet f-dn';
  login.href = 'https://www.icourse163.org/';
  login.target = '_blank';
  login.rel = 'noreferrer';
  login.textContent = '前往登录';

  const refresh = document.createElement('button');
  refresh.className = 'quiet';
  refresh.type = 'button';
  refresh.textContent = '刷新';
  refresh.title = '重新向平台核对登录状态，会话可疑时自动尝试恢复';
  refresh.addEventListener('click', () => {
    refresh.disabled = true;
    el.textContent = '读取中';
    void readSessionInto(el, login).finally(() => {
      refresh.disabled = false;
    });
  });

  wrap.append(el, refresh, login);
  void readSessionInto(el, login);

  // 课程列表等别的动作报出「未登录」时，让这一行同步重读，
  // 两处不能各说各话——那是本次修复之前最误导人的样子
  syncSessionBadge = () => {
    el.textContent = '读取中';
    void readSessionInto(el, login);
  };

  return wrap;
}

/** 让登录状态行重读一次。渲染登录行时被赋值，其余动作按需触发。 */
export let syncSessionBadge: (() => void) | null = null;

/**
 * 读一次登录状态并更新这一行。
 *
 * 后台的 SESSION 不只读本地 cookie：它会探问一次平台，服务端不认时先
 * 尝试用持久凭证自动恢复，恢复成功则直接显示「已登录」——
 * 这正是刷新按钮通常一下就好的原因。
 *
 * 只显示「已登录」不显示用户 id：那一行是给用户确认状态用的，
 * 而 id 是账号内部标识，对他没有用处，露在界面上也没有必要。
 */
export async function readSessionInto(el: HTMLElement, login: HTMLElement): Promise<void> {
  try {
    const session = await sendToBackground({ type: 'SESSION' });
    el.textContent = session.loggedIn ? '已登录' : '未登录';
    // 已登录时不需要跳转入口
    login.classList.toggle('f-dn', session.loggedIn);
  } catch {
    el.textContent = '读取失败';
    login.classList.remove('f-dn');
  }
}

/**
 * 上次运行时间。
 *
 * 显示的是最近一次检查完成的时刻，不是「下次什么时候执行」——
 * 后者取决于用户何时打开浏览器以及 30 分钟的定时器，给不出确切时间。
 * 而「上次什么时候跑过」是可回答的，也正是用户想确认的：
 * 它到底有没有在工作。
 */
export function lastRunHint(): HTMLElement {
  const el = document.createElement('span');
  el.className = 'hint';
  el.id = 'last-run-hint';
  el.textContent = '读取中';

  void Promise.all([getSettings(), sendToBackground({ type: 'TASK_STATE' })])
    .then(([settings, status]) => {
      el.textContent = settings.enabled
        ? describeRunState(status.state)
        : 'Study Pilot 已停用';
    })
    .catch(() => {
      el.textContent = '读取失败';
    });

  return el;
}

