/**
 * DWR 响应的解析。
 *
 * DWR 没有结构化响应：结果是一段 JS，字段以 `sN.field=value;` 的形式出现。
 * 这几个函数把那段文本读成对象，供调用方按自己的结构取用。
 *
 * 从 `review.ts` 移出。对外仍从 `review.ts` 导出，导入方不必改。
 */

/** 从 DWR 响应文本中解析 `s0.field=value;` 形式的对象。 */

export function parseDwrObjectVariables(raw: string): Record<string, string> {
  const fields: Record<string, string> = {};

  for (const match of raw.matchAll(/s\d+\.([A-Za-z_]\w*)\s*=\s*([^;\r\n]*)/g)) {
    fields[match[1]] = match[2].trim();
  }

  return fields;
}

/**
 * 按对象名分组解析 `sN.field=value`。
 *
 * 与上面的压平版本不同：这里保留「哪些字段属于同一个对象」。
 * 互评详情里每个待评答卷各是一个对象，需要逐个看它们的
 * evaluateJudgeType 才能分清自评与互评——压平之后就分不出来了。
 */
export function groupDwrObjects(raw: string): Map<string, Record<string, string>> {
  const out = new Map<string, Record<string, string>>();

  for (const match of raw.matchAll(/\b(s\d+)\.([A-Za-z_]\w*)=([^;\r\n]*)/g)) {
    const [, name, field, value] = match;
    const fields = out.get(name) ?? {};
    fields[field] = value.trim();
    out.set(name, fields);
  }

  return out;
}

/**
 * 评测类型。取自接口的 evaluateJudgeType 字段。
 *
 * 实测（第三单元 单元作业，6 个评测对象）：
 *   互评 5 个  evaluateJudgeType=2
 *   自评 1 个  evaluateJudgeType=3
 * 自评那个的 origScore 为 0（自己还没得分），互评那些为 100。
 */
export const EVALUATE_JUDGE_TYPE = {
  /** 互评：为其他同学的作业评分 */
  PEER: 2,
  /** 自评：为自己的作业评分 */
  SELF: 3,
} as const;
