
import { describe, expect, it } from "vitest";
import { normalize } from "../src/settings/schema";

describe("评语兜底", () => {
  it("留空时退回默认值", () => {
    const s = normalize({ mooc: { background: { autoReview: { enabled: true, comment: "" } } } });
    expect(s.mooc.background.autoReview.comment.length).toBeGreaterThan(0);
  });

  it("只有空白字符也退回默认值", () => {
    const s = normalize({ mooc: { background: { autoReview: { enabled: true, comment: "   " } } } });
    expect(s.mooc.background.autoReview.comment.trim().length).toBeGreaterThan(0);
  });

  it("用户填的内容原样保留", () => {
    const s = normalize({ mooc: { background: { autoReview: { enabled: true, comment: "完成得不错" } } } });
    expect(s.mooc.background.autoReview.comment).toBe("完成得不错");
  });
});
