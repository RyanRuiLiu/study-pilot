/*
 * 前台功能自检。
 *
 * 检查三项注入到 MOOC 页面的功能是否出现、内容是否正确：
 *   做题助手      测验页与考试页的控制面板
 *   作业得分指导  作业页每题下方的得分说明
 *   截止信息      测验页与作业页顶部的截止时间与尝试次数
 *
 * 这些功能由 content script 注入，与后台接口是两条独立的链路，
 * 后台通了不代表前台也通，必须实际打开页面看 DOM。
 *
 * 用法：node scripts/probe/checks/selfcheck-ui.mjs
 */

import { Session, newPageTarget } from '../lib/cdp.mjs';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const results = [];
const record = (name, ok, detail) => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '通过' : '失败'}  ${name}${detail ? `  ${detail}` : ''}`);
};

/** 打开一个 MOOC 页面并等它加载完。 */
async function open(url) {
  const target = await newPageTarget();
  const session = await Session.open(target.webSocketDebuggerUrl);
  await session.send('Page.enable');
  await session.send('Page.navigate', { url });

  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    const r = await session
      .send('Runtime.evaluate', { expression: 'document.readyState', returnByValue: true })
      .catch(() => ({ result: { value: 'x' } }));
    if (r.result?.value === 'complete') break;
    await wait(400);
  }
  // 内容脚本与页面内异步渲染都需要一点时间
  await wait(6000);
  return session;
}

async function probe(session, expression) {
  const r = await session.send('Runtime.evaluate', {
    expression,
    returnByValue: true,
  });
  if (r.exceptionDetails) return { error: r.exceptionDetails.text };
  return r.result?.value;
}

// ---------- 测验页：做题助手 + 截止信息 ----------

const quiz = await open(
  'https://www.icourse163.org/spoc/learn/NTU-1467539170?tid=1488277459#/learn/quiz?id=1258705871',
);

const quizView = await probe(
  quiz,
  `(() => {
    const panel = document.querySelector('.sp-panel');
    const info = document.querySelector('.sp-panel-info');
    return JSON.stringify({
      hasPanel: !!panel,
      panelText: (panel?.textContent ?? '').slice(0, 220),
      infoRows: Array.from(document.querySelectorAll('.sp-panel-info-row')).map(r => r.textContent),
      buttons: Array.from(panel?.querySelectorAll('button') ?? []).map(b => b.textContent)
    });
  })()`,
);

const quizData = JSON.parse(quizView || '{}');
record('测验页出现控制面板', quizData.hasPanel === true, quizData.panelText?.slice(0, 100));
record(
  '测验页截止信息有内容',
  (quizData.infoRows ?? []).length > 0,
  JSON.stringify(quizData.infoRows),
);
record(
  '测验页面板有操作按钮',
  (quizData.buttons ?? []).length > 0,
  (quizData.buttons ?? []).join(' / '),
);
quiz.close();

// ---------- 作业页：得分指导 + 截止信息 ----------

const hw = await open(
  'https://www.icourse163.org/spoc/learn/NTU-1467539170?tid=1488277459#/learn/hw?id=1258704159',
);

const hwView = await probe(
  hw,
  `(() => {
    const panel = document.querySelector('.sp-panel');
    const guides = Array.from(document.querySelectorAll('.sp-score-guide, .sp-answer'));
    return JSON.stringify({
      hasPanel: !!panel,
      panelText: (panel?.textContent ?? '').slice(0, 220),
      infoRows: Array.from(document.querySelectorAll('.sp-panel-info-row')).map(r => r.textContent),
      guideCount: guides.length,
      guideSample: guides[0]?.textContent?.slice(0, 140) ?? null,
      images: document.querySelectorAll('.sp-score-guide img, .sp-answer img').length
    });
  })()`,
);

const hwData = JSON.parse(hwView || '{}');
record('作业页出现控制面板', hwData.hasPanel === true, hwData.panelText?.slice(0, 100));
record(
  '作业页截止信息有内容',
  (hwData.infoRows ?? []).length > 0,
  JSON.stringify(hwData.infoRows),
);
// 该作业此时处于互评期，题目下方应出现得分指导
record(
  '作业页注入得分指导',
  hwData.guideCount > 0,
  `${hwData.guideCount} 处${hwData.guideSample ? `：${hwData.guideSample}` : ''}`,
);
hw.close();

// ---------- 汇总 ----------

console.log('');
const failed = results.filter((r) => !r.ok);
console.log(`共 ${results.length} 项，通过 ${results.length - failed.length} 项，失败 ${failed.length} 项。`);
