/*
 * 取一份**既有答卷**的题目与答案，供页面内「查看答案」注入用（测验与考试统一）。
 *
 * 取数与平台自己的成绩查看页逐步一致（实测 2026-10-17，示例课程寅单元测试查看页）：
 *   mocQuizRpcBean.getQuizInfo {tid}                      ① 拿既有答卷的 aid
 *   mocQuizRpcBean.getOpenQuizPaperDto {tid, aid, withStd…true}  ② 纯读取答案
 * 实现在包内 `loadSubmittedPaper`（对已存在的答卷是只读；绝不 aid=0 新开一份——
 * 那在考试上等价于点「开始考试」）。
 *
 * 放在后台的理由同作业取卷：内容脚本不持客户端，节流只有一处。
 */

import { loadSubmittedPaper } from '@study-pilot/platform-mooc';
import type { MessageHandler } from '../../../protocol.ts';
import type { MoocMessageDeps } from './deps.ts';
import type { MoocResponseMap } from './payload.ts';

export function paperAnswersCommand(deps: MoocMessageDeps): MessageHandler {
  return async (request, sendResponse) => {
    const { tid, aid } = request as { tid?: number; aid?: number };
    if (typeof tid !== 'number' || !Number.isFinite(tid)) {
      sendResponse({ status: 'error', message: '请求缺少 tid' } satisfies MoocResponseMap['MOOC_PAPER_ANSWERS']);
      return;
    }

    const loaded = await loadSubmittedPaper(deps.client, tid, typeof aid === 'number' ? aid : undefined);
    if (!loaded.ok) {
      sendResponse({ status: 'error', message: loaded.message } satisfies MoocResponseMap['MOOC_PAPER_ANSWERS']);
      return;
    }

    // 客观题连同答案（选项标记 / stdAnswer / analyse）原样交回注入端；
    // 主观题的标准答案在作业管线的评分点里（得分指导），不走这条。
    sendResponse({
      status: 'ok',
      value: loaded.paper.objectiveQList ?? [],
    } satisfies MoocResponseMap['MOOC_PAPER_ANSWERS']);
  };
}
