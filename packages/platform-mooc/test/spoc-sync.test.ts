/*
 * SPOC 同步课的内容学期解析。
 *
 * 骨架形态取自真机页面（2026-11-08，某 SPOC 同步课的 examlist 页内联脚本，
 * 留痕 .probe/mooc-spoc-examlist/page.html），值已换成合成样例：
 *   window.moocTermDto = { id:1400000001 };
 * 源码依据：s_core.js `_$isSpocSync() = !!window.moocTermDto`。
 * 解析不出就报错——页面改版或内容未发布时宁可单门失败，不猜。
 */

import { describe, expect, it } from 'vitest';
import type { MoocClient } from '../src/client.ts';
import { resolveContentTermId } from '../src/spoc-sync.ts';

function clientWith(html: string | Error): MoocClient {
  return {
    send: async () => {
      if (html instanceof Error) throw html;
      return new Response(html, { status: 200 });
    },
  } as unknown as MoocClient;
}

const SPOC_COURSE = { termId: 1400000002, courseId: 1000000002, schoolShortName: 'DEMO', mode: 10 };
const MOOC_COURSE = { termId: 1400000001, courseId: 1000000001, schoolShortName: 'DEMO', mode: 0 };

describe('resolveContentTermId', () => {
  it('普通课（mode=0）就是自己的 termId，不发页面请求', async () => {
    const client = clientWith(new Error('不该发请求'));
    const result = await resolveContentTermId(client, MOOC_COURSE);
    expect(result).toEqual({ ok: true, value: 1400000001 });
  });

  it('SPOC 同步课解析骨架里的源学期 id', async () => {
    const html = `
      <script>
        window.moocTermDto = { id:1400000001 };
        window.moocCourseDto = { id:1000000001, name:"示例课程甲" };
      </script>`;
    const result = await resolveContentTermId(clientWith(html), SPOC_COURSE);
    expect(result).toEqual({ ok: true, value: 1400000001 });
  });

  it('骨架缺失（改版/未发布）→ 如实报错，不拿壳子 termId 冒充', async () => {
    const result = await resolveContentTermId(clientWith('<html><body>空</body></html>'), SPOC_COURSE);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.message).toContain('moocTermDto');
  });

  it('页面请求失败 → 如实报错', async () => {
    const result = await resolveContentTermId(clientWith(new Error('断网')), SPOC_COURSE);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.message).toContain('页面读取失败');
  });
});
