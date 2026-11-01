/*
 * 文档页数：平台没给的时候，从文档本身数出来。
 *
 * 为什么要有这一步（2026-11-01 实测，大物——电磁学 / 电路实验A）：
 * `getLessonUnitLearnVo` 的 `textPages` 只对一部分文档有值。早先上传的档
 * （`edu-lesson-pdfsrc.nosdn.127.net`）都带页数；后上传的水印档
 * （`eds-doc.nos-jd.163yun.com`）一律回 `textPages:null`——页数只存在阅读器里：
 * bundle 的 `PdfUnit` 用 pdf.js 读出 `numPages` 才知道末页是哪一页
 * （`finished: 当前页 == numPages`）。服务端那份 DTO 里根本没有这个数，
 * 于是「按页上报」在那边无从下手。
 *
 * 数法的依据：PDF 里每一页是一个 `/Type /Page` 对象，页树根是 `/Type /Pages`，
 * 所以正则必须用 `\b` 锚住 Page——数到 Pages 上去会多算一个根节点。
 * 拿平台自己给过页数的 20 余份文档当标尺核对（PPT 与课堂笔记各半）：
 * 12 页的 PPT 数出 12、8 页的数出 8、3 页的课堂笔记数出 3，逐份一致。
 * `/Count` 只在数不到页对象时兜底：页树嵌套时它给的是**子树**页数
 * （实测 12 页那份里有一段 `/Count 10`），单看它会少算。
 *
 * 下载的是用户本来就能在阅读器里打开的同一份文档，字节只在内存里数一遍，
 * 不落盘、不外发（扩展侧为此声明了两个文档域名的 host_permissions，见 wxt.config.ts）。
 */

import { err, ok, type Result } from '@study-pilot/core';
import { apiError, type TransportError } from '@study-pilot/transport';
import type { MoocClient } from '../client.ts';

/**
 * 数页数。`url` 为空表示平台既没给页数也没给地址——那只能如实失败。
 *
 * 走 `client.send` 而不是全局 fetch：出站环境由载体决定（扩展那边是规则生效后的
 * fetch，命令行那边带 UA），本包不自己造一份。
 */
export async function countPdfPages(
  client: MoocClient,
  url: string | null,
): Promise<Result<number, TransportError>> {
  if (url === null || url === '') {
    return err(apiError(-1, '平台没有给出这份文档的总页数，也没有文档地址，无法按页上报'));
  }

  let response: Response;
  try {
    response = await client.send(url);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    return err(apiError(-1, `文档下载失败，数不出页数：${detail}`));
  }
  if (!response.ok) {
    return err(apiError(response.status, `文档下载失败（HTTP ${response.status}），数不出页数`));
  }

  const pages = count(await response.arrayBuffer());
  if (pages === null) {
    return err(apiError(-1, '这份文档里数不出页数，无法按页上报'));
  }
  return ok(pages);
}

/**
 * 从 PDF 字节里数页数。数不出来给 `null`，由调用方决定是失败还是换路子。
 *
 * 按 latin1 解码：PDF 是二进制，但页对象标记是 ASCII，逐字节扫描不受
 * 内容流压缩影响（压缩只影响流，对象字典仍是明文）。
 */
function count(buffer: ArrayBuffer): number | null {
  const text = new TextDecoder('latin1').decode(buffer);
  const pageObjects = text.match(/\/Type\s*\/Page\b/g)?.length ?? 0;
  if (pageObjects > 0) return pageObjects;

  const counts = [...text.matchAll(/\/Count\s+(\d+)/g)].map((match) => Number(match[1]));
  return counts.length > 0 ? Math.max(...counts) : null;
}
