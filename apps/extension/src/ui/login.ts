/*
 * 「去登录」的去处（设置页 loginNote 与弹窗的待办登录行共用这一处导入）。
 *
 * 两个地址都是**平台事实**，因此值定义在各自平台包里，这里只做一次转出：
 * 界面上六个调用点各写一遍就是六处可能改漏，而改漏的表现不是报错，是带去错误的页面。
 *
 * 语义差别照旧：慕课给首页（带尾斜杠，给人点）；智慧树直接复用站点源
 * （同一串已经承担「去登录」用途，见 pages.ts 的注释），不再造第二个。
 */

export { MOOC_LOGIN_URL } from '@study-pilot/platform-mooc';
export { ZHS_SITE_ORIGIN as ZHS_LOGIN_URL } from '@study-pilot/platform-zhs';
