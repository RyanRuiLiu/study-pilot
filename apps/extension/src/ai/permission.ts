/*
 * 主机权限按需申请。
 *
 * 接口地址由用户填写，事先不知道是哪个域名，因此清单里只能把主机权限声明为
 * 「可选通配」（声明而已，未授权时那些域名发不出去）。真正申请时**只申请用户
 * 填写的那个源**，不开启 AI 就一个第三方域名都没有。
 *
 * 这一层只有一处：设置页的「申请权限」按钮调它，别处不碰权限。
 */

export type HostPermissionResult =
  /** 已授权（本次申请通过或此前已授权） */
  | 'granted'
  | 'denied'
  /** 浏览器不支持或调用环境不允许（例如非扩展页面） */
  | 'unsupported';

/**
 * 确保对某个源拥有主机权限。
 *
 * 必须在用户手势里调用（点击按钮），否则浏览器会直接拒绝——
 * 因此它不接受自动调用。
 */
export async function ensureHostPermission(origin: string): Promise<HostPermissionResult> {
  const pattern = `${origin}/*`;
  if (typeof browser === 'undefined' || !browser.permissions) return 'unsupported';

  if (await browser.permissions.contains({ origins: [pattern] })) return 'granted';
  const granted = await browser.permissions.request({ origins: [pattern] });
  return granted ? 'granted' : 'denied';
}
