/*
 * 两个平台的首页地址——「去登录」的去处。
 *
 * 登录入口都在站点首页的导航里，站点没有独立的登录页地址，所以去处就是首页。
 *
 * 定义在这一处而不是各界面文件：设置页的 `loginNote`（options/note.ts）与弹窗的
 * 待办登录行（popup/todo.ts、popup/zhihuishu-todo.ts）都要它，六个调用点各抄一遍
 * 就是六处可能改漏——而这类串改漏的表现不是报错，是把人带去一个错误的页面。
 *
 * 包内另有同源常量（慕课的 `MOOC_ORIGIN`、智慧树的 `ZHS_SITE_ORIGIN`），那两个
 * 表达的是「接口与 cookie 的锚点」（不带尾斜杠，用途是拼 URL 前缀），语义不同，
 * 不并成一个：改请求锚点不该顺手改掉界面去处，反之也一样。
 */

export const MOOC_LOGIN_URL = 'https://www.icourse163.org/';
export const ZHS_LOGIN_URL = 'https://www.zhihuishu.com/';
