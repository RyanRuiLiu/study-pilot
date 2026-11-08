/*
 * SPOC 同步课的内容学期解析。
 *
 * 平台事实（2026-11-08，源码镜像 .probe/mooc-src/ + 真机页面骨架）：
 *
 *  - 学校 SPOC 同步课（mode=10，`COURSE_MODE.SPOC_SYNC`）自己**不带学习内容**：
 *    它的 term DTO chapters 为空、exams 为空（真机：某 SPOC 同步课，termId 见 .probe 留痕），
 *    页面上是「老师还没有发布任何学习内容」加一个「源课程内容」区
 *    （源码 `_$$SpocMoocSplit` 组件，`KEY_LEARN_SOURCE_CONTENT`）。
 *  - 学习内容来自**被引用的 MOOC 学期**：页面骨架内联
 *    `window.moocTermDto = { id: 源学期id }`，站点核心以
 *    `_$isSpocSync() = !!window.moocTermDto` 判定同步课。官方前端所有内容
 *    读取（含 getNewExamList）都拿这个 id 去发——考试列表页同一刻发了两个
 *    termId 的请求（壳子 → null，源学期 → 考试）即此机制。
 *  - **RPC 侧没有任何关联字段**：term DTO 的 fromTermId / originCopyRightTermId /
 *    previousCourseDtos 全 null（逐字段核对）。源学期 id 只活在页面骨架里，
 *    所以解析页面骨架就是官方客户端的同一做法，不是猜测。
 */

import { err, ok, type Result } from '@study-pilot/core';
import { apiError, type TransportError } from '@study-pilot/transport';
import type { MoocClient } from './client.ts';
import { COURSE_MODE, coursePageUrl } from './course-url.ts';

/** 页面骨架里的内联赋值（真机样本 2026-11-08，值已换成合成样例）：
 *  `window.moocTermDto = { id:1400000001 };`——id 是实测形状里的首键，
 *  正则按首键锚定（不加宽到任意位置的 `id`，避免 `paid:` 之类误抓）。 */
const SKELETON_TERM = /window\.moocTermDto\s*=\s*\{\s*id\s*:\s*(\d+)/;

/**
 * 取一门课**实际承载学习内容的学期 id**。
 *
 * 普通课（mode=0）就是自己的 termId；SPOC 同步课（mode=10）读页面骨架里
 * 引用的源学期。其它模式不做特判——异步/独立 SPOC 的内容机制未实测，
 * 不猜，读不到就是读不到。
 *
 * 解析不出（页面改版、未发布、无权限）如实报错：调用方按单门失败处理，
 * 其余课程照常进快照。
 */
export async function resolveContentTermId(
  client: MoocClient,
  course: { termId: number; courseId: number; schoolShortName: string; mode: number },
): Promise<Result<number, TransportError>> {
  if (course.mode !== COURSE_MODE.SPOC_SYNC) return ok(course.termId);

  const url = coursePageUrl(course);
  let html: string;
  try {
    // send 是载体的 fetch（带 cookie 与请求头规则）；页面骨架就在这份 HTML 里
    const response = await client.send(url, { headers: { accept: 'text/html' } });
    html = await response.text();
  } catch (error) {
    return err(apiError(-1, `SPOC 同步课页面读取失败：${error instanceof Error ? error.message : String(error)}`));
  }

  const matched = SKELETON_TERM.exec(html);
  const termId = matched === null ? 0 : Number(matched[1]);
  if (!Number.isFinite(termId) || termId <= 0) {
    return err(apiError(-1, 'SPOC 同步课：页面骨架里没有 window.moocTermDto（平台改版或内容未发布）'));
  }
  return ok(termId);
}
