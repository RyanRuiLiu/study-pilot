/*
 * 智慧树页面的判据接管：MAIN world、document_start。
 *
 * 必须早于页面 <head> 里冻结 originFunction 的内联脚本——这是根除
 * 「检测到异常脚本」的唯一时机。实现与理由见 src/features/zhs/script-guard.ts。
 */

import { installZhsScriptGuard } from '../src/features/zhs/script-guard.ts';

export default defineContentScript({
  matches: ['*://*.zhihuishu.com/*'],
  runAt: 'document_start',
  world: 'MAIN',
  allFrames: true,

  main() {
    installZhsScriptGuard(window);
  },
});
