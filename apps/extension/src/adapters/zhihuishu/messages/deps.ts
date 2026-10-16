/*
 * 智慧树消息处理器需要的外界能力。
 *
 * 比慕课那份薄：没有文本生成器、没有外壳注入面——现在就是配置、客户端、
 * cookie 读取与课程刷新四样。cookie 只做一件事：读 CASLOGC 判会话与取设备号
 * （判据在平台包 session.ts）；请求本身的凭证仍由 credentials:'include' 自带。
 */

import type { ConfigPort } from '@study-pilot/application';
import type { CookieReader, ZhsClient, ZhsRuntime } from '@study-pilot/platform-zhs';

export interface ZhsMessageDeps {
  /** 配置端口：课程列表的读写都经过它 */
  config: ConfigPort;
  client: ZhsClient;
  /** 读 cookie 的宿主能力（browserCapabilities；会话判定的唯一来源） */
  readCookie: CookieReader;
  /**
   * 去平台重拉课程列表并写回配置（`runtime.refreshCourses`）。
   *
   * 读取与合并在平台包里，处理器只翻失败原因——与慕课处理器收 `refreshCourses`
   * 闭包同一分法（那边的写法见 mooc/messages/deps.ts 的 refreshCourses 字段）。
   */
  refreshCourses: () => ReturnType<ZhsRuntime['refreshCourses']>;
}
