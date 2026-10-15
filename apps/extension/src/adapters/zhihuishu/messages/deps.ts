/*
 * 智慧树消息处理器需要的外界能力。
 *
 * 比慕课那份薄：没有 cookie 读取（请求凭 credentials 自带凭证）、
 * 没有文本生成器、没有外壳注入面——现在就是配置 + 客户端两样。
 * 用到再加，不放用不上的参数。
 */

import type { ConfigPort } from '@study-pilot/application';
import type { ZhsClient } from '@study-pilot/platform-zhs';

export interface ZhsMessageDeps {
  /** 配置端口：课程列表的读写都经过它 */
  config: ConfigPort;
  client: ZhsClient;
}
