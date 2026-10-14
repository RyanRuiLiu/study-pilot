/*
 * 互评评语的兜底。
 *
 * 平台拒绝空评语，而返回的错误不指明是哪个字段——留空退回默认，
 * 用户才不会只看到一句「提交失败」。判据在 normalize：空串是合法 string，
 * 逐键合并会原样采纳，因此这一条必须单独兜。
 */

import { describe, expect, it } from 'vitest';
import { normalize } from '../src/index.ts';

describe('评语兜底', () => {
  it('留空时退回默认值', () => {
    const s = normalize({ mooc: { reviewComment: '' } });
    expect(s.mooc.reviewComment.length).toBeGreaterThan(0);
  });

  it('只有空白字符也退回默认值', () => {
    const s = normalize({ mooc: { reviewComment: '   ' } });
    expect(s.mooc.reviewComment.trim().length).toBeGreaterThan(0);
  });

  it('用户填的内容原样保留', () => {
    const s = normalize({ mooc: { reviewComment: '完成得不错' } });
    expect(s.mooc.reviewComment).toBe('完成得不错');
  });

  it('旧键里的评语走迁移，一样活着', () => {
    const s = normalize({ mooc: { background: { autoReview: { comment: '旧的措辞' } } } });
    expect(s.mooc.reviewComment).toBe('旧的措辞');
  });
});
