# 平台事实

本文件记录平台**实际如何运作**，不是设计意图。每条结论都标注取证位置，
可随时复核。凡是未经取证的推断，一律显式标注为「未验证」。

- 记录时间：2026-09-26
- 取证对象：
  - `https://mc.stu.126.net/pub/s/core_210ab52d6feda6bfdd39c5f6c8b03fb4.js`（2.27 MB）
  - `https://mc.stu.126.net/pub/s/tp_learn_index_desktop_modules_learn_3dcbc5398de9b2095438a16.b999d28c.js`（347 KB，学习页）
- 取证方式见 [探测工具](../../scripts/probe/README.md)，可完整复现

---

## 1. 请求签名

取证位置：`core.js` 偏移 166060；学习页 bundle 内存在同构副本。
两处实现逐字一致，说明这是公共组件被复制进不同 bundle。

原始代码：

```js
c.geneAuthHeaders = function (e) {
  if (!window.md5) i._$md5js();
  var t = function (e, t, n) {                  // e=data, t=timestamp, n=nonce
    var i = t || +new Date;
    var o = n || Math.floor(9e3 * Math.random()) + 1e3;
    var a = "[Object Object]" === Object.prototype.toString.call(e) ? JSON.stringify(e) : e || "";
    var r = a + o + i + "fu2s2kxcswgn5hqanx7asmlogyr5wu29";
    var s = "";
    try { s = (window.md5(r) || "").toLocaleUpperCase() } catch (c) { console.error("md5计算错误") }
    return s
  };
  var n = +new Date, o = Math.floor(9e3 * Math.random()) + 1e3, a = "v1";
  var r = e.data;
  var s = t(r, n, o);
  return {
    Timestamp: "" + n,
    "Auth-Signature": s,
    Nonce: "" + o,
    System: a,
    "Content-Type": "application/json;charset=UTF-8"
  }
};
```

规格：

| 项 | 值 |
|---|---|
| 拼接顺序 | `body + nonce + timestamp + SALT` |
| SALT | `fu2s2kxcswgn5hqanx7asmlogyr5wu29` |
| nonce | `Math.floor(9000 * Math.random()) + 1000`，区间 1000 至 9999 |
| timestamp | 毫秒 |
| 摘要 | MD5 十六进制转大写 |
| 请求头 | `Timestamp`、`Auth-Signature`、`Nonce`、`System: v1`、`Content-Type` |

实现位置：`packages/transport/src/sign.ts`，测试见 `packages/transport/test/sign.test.ts`。

### 1.1 空请求体的边界

页面使用的是 `typeof e === 'object' ? JSON.stringify(e) : (e || '')`。
当 data 为 `undefined`、`null`、`0` 或空串时，参与签名的是**空串**，而不是 `"{}"`。
上一代实现无条件 `JSON.stringify(body ?? {})`，在这种输入下会算出不同的签名。
当前所有调用都传了对象，所以该差异尚未暴露。

### 1.2 请求头中没有 edu-script-token

`geneAuthHeaders` 的返回对象只有上表五个字段。
`edu-script-token` 在源码中的位置是一个日志模块的配置（`index.web.js` 偏移 308308）：

```js
"base-logger": {
  product: "ykt",
  cookie: "STUDY_UUID",
  sessionKey: "EDU-LOG-UTM",
  domainRegex: /study\.163\.com/,
  csrf_cookie: "edu-script-token",
  targets: [{ url: "//log.study.163.com/__utm.gif", method: "get" }]
}
```

它的域名匹配规则指向 `study.163.com`，与 `icourse163.org` 的 `.rpc` 请求无关。
上一代实现把它当请求头附加，没有源码依据。

## 2. csrfKey 与条件签名

取证位置：`index.web.js` 偏移 195839

```js
if (/\.rpc$/.test(t)) {
  var r = document.cookie.split(";").reduce(function (e, t, n) {
    t = t.trim();
    if (t) { var i = t.split("="); e[i[0]] = i[1] }
    return e
  }, {});
  t += "?csrfKey=" + r["NTESSTUDYSI"]
}
n.url = t;
try {
  if (n.isNeedAuth) n.headers = Object.assign({}, n.headers, this.geneAuthHeaders(n))
} catch (d) { console.error(e, "接口签名出错") }
```

两点结论：

1. `csrfKey` 仅在 URL 以 `.rpc` 结尾时追加，取 `NTESSTUDYSI` 的原始值（页面未做 URL 编码）。
2. **签名是条件性的**，由各接口配置中的 `isNeedAuth` 决定。
   当前实现对全部请求签名。已实测带签名的只读请求均返回 `code: 0`，
   服务端不会因多签名而拒绝；但「哪些接口必须签名」尚未逐接口核对。

## 3. 凭证

| cookie | 域名 | 下发时机 | httpOnly | 有效期 |
|---|---|---|---|---|
| `NTESSTUDYSI` | `.icourse163.org` | **未登录时即下发**（32 位匿名会话） | false | 会话级（`expires: -1`） |
| `EDUWEBDEVICE` | `.icourse163.org` | 首次访问 | false | 长期 |
| `STUDY_INFO` | `.icourse163.org` | 登录后 | 未核对 | 未核对（格式为 `邮箱\|8\|userId\|时间戳`） |
| `STUDY_SESS` | `.icourse163.org` | 登录后 | 未核对 | 未核对 |

三条需要注意的事实：

1. **`NTESSTUDYSI` 不能用于判断登录状态。** 访客状态下它同样存在。
   实测以匿名会话调用 `indexBeanV3.getTopAndLowerRightCornerBar` 返回 HTTP 200。
2. **它不是 httpOnly。** 上一代架构文档称「内容脚本无法读取 httpOnly 令牌，
   必须经 background 中转」，该前提不成立。
   登录后同样不是 httpOnly，内容脚本可直接读取 `document.cookie`。
3. `STUDY_INFO` 的值是管道分隔的 `邮箱|8|userId|时间戳`，第三段是用户 id。
   该格式已由 `getQuizInfo` 响应中的 `answererId` 交叉验证（两处一致）。

## 4. DWR（互评通道）

互评接口不走 `.rpc`，走 DWR 的纯文本调用：

```
POST {origin}/dwr/call/plaincall/{Bean}.{method}.dwr
Content-Type: text/plain

callCount=1
scriptSessionId=${scriptSessionId}190
httpSessionId={NTESSTUDYSI}
c0-scriptName={Bean}
c0-methodName={method}
c0-id=0
c0-e1=string:123
c0-param0=Object_Object:{evaluateId:reference:c0-e1}
batchId={毫秒时间戳}
```

可信度说明：报文骨架、`scriptSessionId` 使用字面量模板、`httpSessionId` 取
`NTESSTUDYSI`、以及参数编码形式，均来自上一代实现所依据的真实抓包，
该实现曾跑通完整互评流程。这些细节沿用当时的抓包结论，未再次复现。

成功判据不是 HTTP 状态码（DWR 业务失败同样返回 200），而是响应文本中是否出现：

```
dwr.engine._remoteHandleCallback('<batchId>','0',true)
```

实现位置：`packages/transport/src/dwr.ts`。

涉及的两个端点：

| 端点 | 作用 | 副作用 |
|---|---|---|
| `MocEvaluateBean.startOneSubmissionEvaluate` | 取下一份待评答卷 | **有**。服务端会把某份答卷分配给当前用户 |
| `MocEvaluateBean.submitSubmissionEvaluate` | 提交评分 | 写操作 |

## 5. 保存与提交

请求体的形态以页面源码为准。出处是 `core.js` 里的 `COM_Cache_TestBaseCache` 模块，
用 `pnpm probe:decompile` 还原后可读到：

```js
r._$saveDraftAnswers = function (t, n, i) {
  e._$request({
    url: '/web/j/mocQuizRpcBean.saveDraftAnswers.rpc',
    method: 'post',
    data: JSON.stringify({ paperDto: t, preview: n }),
    isNeedAuth: !0,
    notShowLoading: !i,
  });
};

r._$submitAnswers = function (t, n) {
  try {
    t.answers.forEach(function (e) {
      e.content.content = e.content.content.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
    });
  } catch (i) {}
  e._$request({
    url: '/web/j/mocQuizRpcBean.submitAnswers.rpc',
    method: 'post',
    data: JSON.stringify({ paperDto: t, preview: n }),
    isNeedAuth: !0,
  });
};
```

由此确定两件事：

1. **请求体形如 `{paperDto, preview}`，`preview` 字段不可省略。** 只传 `paperDto` 时服务端返回
   `code: 0` 却不落库，这个现象曾被误判为「服务端保存机制有问题」。
2. **提交时 `answers` 原样保留**，页面只做了一次 emoji 清理，并不清空它。

提交前页面会把 `submitType` 置为 `NORMAL`，其值为 1
（同一 bundle 内 `var u = { NORMAL: 1, AUTO: 2, CHEAT: 3 }`）。

早期文档依据旧样本得出「提交请求不携带答案、`answers` 为 null」，该结论与源码冲突，已作废。

## 6. 答卷 id（aid）

读写一份作答都要求正确的 aid，取错会写到另一份答卷上。三个候选来源的实测结果：

| 来源 | 结果 |
|---|---|
| `getOpenQuizInfo` 响应顶层的 `aid` | **正确**。页面就是这么取的 |
| `targetAnswerform.aid` | 错误。它是最近一次**已提交**的记录 |
| `getOpenQuizPaperDto` 传 `aid = 0` | 错误。服务端返回的未必是页面正在用的那一份 |

页面源码（学习页 bundle 的 `QuizDoingUI`）取 aid 的方式：

```js
_.__onToggleDoing = function () {
  var t = !e.isPreview ? this.__quizInfo.aid : null;
  this.__quizCache._$getOpenQuizPaperList(this.__testId, t, !1, e.appId);
};
```

其中 `__quizInfo` 就是 `getOpenQuizInfo` 的响应，因此顶层 `aid` 才是当前答卷。

答卷结束后 `aid` 变为 `0`。此时再调用取卷接口会返回「找不到对应的答题记录【-1】」，
且无法重新开始——过期测验一旦结束就不能再作答。

### 6.1 草稿保存的适用边界

`saveDraftAnswers` 的行为取决于该测验所处状态，这一点很容易被误判成「接口不可用」。

| 测验状态 | 页面点击触发的草稿保存 | 说明 |
|---|---|---|
| 未过期，尚未提交 | **生效**。刷新页面后作答仍在 | 第 4 章实测：12 题全部保留 |
| 已过期 | **不生效**。返回 `code: 0`、`result: true`，但草稿条数不变 | 第 1 章实测：新增的判断题始终进不去，已有答案仍可修改 |

因此**任何依赖草稿的实现都不可靠**，包括「保存草稿后刷新页面显示作答」这条路径。

可靠的路径是让**提交本身携带答案**：`submitAnswers` 的请求体形如
`{paperDto, preview}`，其中 `paperDto.answers` 就是完整作答（见第 5 节源码）。
实测在第 3 章与第 4 章各提交一次，分别得到 26/26 与 24/24。

由此确定前后台的分工：

- **前台**（src/features/quiz-helper.ts）在用户在场时工作，填充走**页面点击**，
  用户能看见并核对；提交走接口，且在提交前**当场从题库重新构造答案**，不读草稿。
- **后台**（src/background/auto-quiz.ts）无人值守，填充与提交都走接口，
  两种方式都会写入草稿，也都在提交体里携带答案。

### 6.2 提交不需要二次确认

页面自己在提交时会弹出 `CommonDialog`（源码中 `QuizDoingUI.__onSubmitHandle`
调用 `_$showCommonDialog`）。那是页面交互层的确认，后台直接构造请求时不存在这一步，
前台面板也不需要复制它：提交按钮本身即用户的确认动作。

## 7. 页面结构契约

提取自学习页 bundle 中的 9 处 `_$addHtmlTemplate(...)` 调用。

### 7.1 课程列表与课程类型

课程列表走 `learnerCourseRpcBean.getMyLearnedCoursePanelList`，请求参数：

```json
{ "type": 30, "p": 1, "psize": 100, "courseType": 1 }
```

`courseType` 决定取哪一类课程，取值实测如下：

| courseType | 含义 | 该账号实测结果 |
|---|---|---|
| 1 | MOOC | 2 门 |
| 2 | SPOC | 4 门 |

响应是两层结构：外层 `{result, pagination}`，内层 `result` 才是课程数组。
只取一层会得到空列表且不报错。

课程对象的字段：

| 字段 | 说明 |
|---|---|
| `id` | courseId |
| `name` | 课程名 |
| `termPanel.id` | termId，后续所有接口都以它为单位 |
| `mode` | 0 MOOC、10 SPOC 同步、15 SPOC 异步、20 SPOC 独立 |
| `schoolPanel.name` | 学校名 |

`mode` 决定学习页地址前缀：MOOC 走 `/learn/`，SPOC 走 `/spoc/learn/`。
两种页面结构一致，但地址不同，后台任务需要按 `mode` 拼地址。

### 7.2 单元作业的得分指导

作业题的评分依据是 `getOpenHomeworkPaperDto` 响应中的
`subjectiveQList[].judgeDtos[]`：

| 字段 | 说明 |
|---|---|
| `msg` | 得分指导正文，富文本，可能含图片 |
| `maxScore` | 该评分点的满分 |
| `details` | 分档选项，形如 `[{msg, score}]`，互评打分时使用 |

作业题没有 `stdAnswer`（实测恒为 null）。`withStdAnswerAndAnalyse` 取 true
或 false 都不影响 `judgeDtos` 的返回，该参数与作业答案无关。

界面文案取自页面语言包，实现时沿用这些原词，不自创：

| key | 文案 |
|---|---|
| `KEY_LEARN_SCORING_GUIDANCE` | 得分指导： |
| `KEY_LEARN_PLEASE_RATE` | 请给予评分： |
| `KEY_LEARN_FULL_MARKS` | 满分 |
| `KEY_LEARN_SCORE_POINTS` | 分 |
| `KEY_LEARN_SCORE_QUESTION` | 该题得分： |
| `KEY_LEARN_ANSWER` | 回答： |
| `KEY_LEARN_CORRECT_ANSWER` | 正确答案： |
| `KEY_LEARN_PEER_MODULE` | 互评模块 |

网站的互评界面（learn_homework bundle 的 `EvaluateItemUI`）用
`.u-point > .breif > p.f-fc3` 承载标题、`.f-richEditorText` 承载 `msg`，
`.detail > .s` 承载分档单选。

### 7.3 互评数据

进入作业页时页面会调 `MocEvaluateBean.getEvaluateStatus` 与
`MocEvaluateBean.getEvaluateDetail`，后者返回当前用户的互评进度：

```js
{
  mocTest: { id, name, termId, deadline, evaluateStart, evaluateEnd, evaluateScoreReleaseTime },
  completedEvaluates: [ { answerformId, evaluateId, evaluateJudgeType, origScore, status } ],
  startedEvaluate:    { answerformId, evaluateId, evaluateJudgeType, origScore, status },
  selfEvaluate:       { answerformId, evaluateId, evaluateJudgeType, status },
  maxEvaluateCount: 30,  totalEvaluateCount: 5,  enoughAnswer: true,  trained: false
}
```

`status`：1 进行中，2 已完成。`evaluateJudgeType`：1 教师评，2 学生互评，3 自评。

取待评答卷与提交评分走 DWR（`MocEvaluateBean.startOneSubmissionEvaluate` 与
`MocEvaluateBean.submitSubmissionEvaluate`），协议细节见第 4 节。

作业所处阶段由 `edu.u._$currentEvaluatePhase` 计算，实现位于
`packages/platform-mooc/src/review.ts`：

```js
if (now < deadline) return 1;                        // 提交期
if (releaseTime > 0 && now >= releaseTime) return 3; // 成绩期
return 2;                                            // 互评期
```

### 7.4 做题容器（偏移 249616）

```html
<div class="m-quizDoing">
  <div class="j-warnTip warnTip f-dn"></div>
  <div class="j-description"></div>
  <div class="timeBox f-pf u-btn u-btn-orange j-timeNode">
    <span class="f-icon u-icon-clock"></span><span class="j-timeTxt"></span>
  </div>
  <div class="j-quizPool quizPool"></div>
  <a class="u-btn u-btn-default j-submitBtn">提交答案</a>
</div>
```

提交按钮是 `<a>` 元素，不是 `<button>`。

### 7.5 选择题（偏移 230493）

```html
<div class="m-choiceQuestion u-questionItem">
  <div class="j-title title f-cb">
    <div class="position f-fl"></div>
    <div class="qaDescription f-fl f-cb">
      <div class="qaIndex j-qaindex f-fl f-dn"></div>
      <div class="qaCate j-qacate f-fl"></div>
      <div class="f-richEditorText j-richTxt"></div>
      <div class="qaMark j-qamark f-fr f-dn"></div>
      <div class="j-aiQuery aiQuery f-dn"></div>
    </div>
    <label class="scoreLabel f-fr f-dn j-scoreLabel"></label>
  </div>
  <div class="j-choicebox"></div>
</div>
```

题干文本位于 `.j-richTxt`，不是 `.j-title` 的直接文本。
选项容器是 `.j-choicebox`，其内容由脚本填充。渲染后的真实结构如下
（在已进入做题状态的测验页实测取得）：

```html
<ul class="choices f-cb">
  <li class="f-cb">
    <input class="u-tbi"
           id="op_3388085475_1134548875896911790361689154"
           type="radio"
           name="op_33880854751790361689154">
    <label class="u-tbl f-pr f-cb" for="op_3388085475_1134548875896911790361689154">
      <div class="f-fl optionPos">A.</div>
      <div class="f-fl f-richEditorText optionCnt f-thide">
        <p><span style="font-size:16px">输入信号为零时，输出处于零电位</span></p>
      </div>
    </label>
  </li>
  <!-- 其余选项同构 -->
</ul>
```

要点：

1. **选项文本在 `.optionCnt` 里**。取 `label.textContent` 会带上 `.optionPos` 的
   「A.」前缀，不能直接使用。
2. **选项 id 是 id 匹配的唯一依据**，格式为 `op_<题id>_<选项id><后缀>`，
   详见第 8 节。
3. **判断题的选项没有文本**。页面上只渲染「A.」「B.」两项，`.optionCnt` 为空，
   而题库里的选项是「正确」「错误」。任何基于文本的匹配对判断题都会失效。
4. 直接调用 `input.click()` 即可让页面接受选择。实测点击之后页面会自行发起
   `mocQuizRpcBean.saveDraftAnswers.rpc`，说明内部状态已更新。
   上一代文档中「脚本 click 不会更新页面内部状态」的说法不成立。

### 7.6 填空题（偏移 237559）

根节点 `div.m-FillBlank.examMode.u-questionItem`，
输入区 `.j-input`，得分 `.j-score`，解析 `.j-analysis`。

### 7.7 开考前页面（偏移 220524、310596）

`.m-beforeTest`，包含 `.j-agree`（同意复选框）与 `.j-startBtn`（开始按钮）。
点击开始按钮之后才会加载包含选项组件的懒加载 chunk。

### 7.8 作业页

实测采集（已提交的作业页）得到：

```html
<div class="u-questionItem u-analysisQuestion analysisMode">
  <div class="j-title f-cb title questionDes">
    <div class="position f-fl">1</div>
    <div class="qaDescription f-fl f-cb">
      <div class="qaIndex j-qaindex f-fl f-dn"></div>
      <div class="qaCate j-qacate f-fl"> ( 30分 ) </div>
      <div class="f-richEditorText j-richTxt f-fl ql-editor">…题干富文本…</div>
      <div class="qaMark j-qamark f-fr f-dn"></div>
    </div>
  </div>
  <div class="j-answer answer">
    <div class="j-richOrText text f-f0 f-richEditorText"><span class="tit">回答：</span>…</div>
    <div class="j-attachment attachment f-cb">…</div>
    <div class="j-evaluate">
      <div class="u-evaluateItem resultMode">…</div>
    </div>
  </div>
</div>
```

即：已提交的作业页带有 `analysisMode` 类，且每题下方已有 `.j-evaluate` 互评模块。

## 8. 三个 id 空间的关系

这一组事实决定匹配方案能否成立，是本项目最需要先搞清楚的部分。

| 标识 | 全局唯一 | 跨空间可比 | 实测依据 |
|---|---|---|---|
| 题库选项 id | 是 | 与试卷选项 id 同一空间 | 题库 1040 个选项无重复；试卷 36 个选项全部能在题库中找到 |
| 试卷选项 id | 是 | 同上 | 同上 |
| 页面 input id | 是 | 内含试卷选项 id | 格式为 `op_<题id>_<选项id><后缀>` |
| 题目 id | 否 | **不同空间** | 同一道题在试卷里是 `3388085475`，在题库里是 `1388158249` |

由此得到三条结论：

1. **匹配必须建立在选项 id 上，不能建立在题目 id 上。**
2. **不需要按题干匹配题目。** 选项 id 全局唯一，直接从题库建立
   「选项 id 到是否正确」的全局索引即可，题目匹配这一步是多余的。
3. 页面 input id 中 <选项id> 之后的尾串是**页面加载时的时间戳**，每次刷新都会变。
   实测同一道题的同一个选项，两次加载得到的 id 分别是
   `op_3388098941_3227274084055711790364535529` 与
   `op_3388098941_3227274084055711790364778644`，
   差值与两次加载的时间间隔一致。它不参与答案的标识，提取选项 id 时
   通过同题选项的 `name` 与 `id` 的差异把它剥掉即可，不必假设它的长度。

### 8.1 标准答案的来源

两个来源，适用条件不同：

| 来源 | 接口 | 何时返回标准答案 |
|---|---|---|
| 试卷 | `getOpenQuizPaperDto` | 仅在测验**已提交**时返回 |
| 题库 | `getQuestionListByTermId` | 任何状态下都返回，与提交状态无关 |

实测：对已提交的测验传 `withStdAnswerAndAnalyse: true`，试卷的
`optionDtos[].answer` 有值；对未提交的测验（`submitStatus` 为 1）
同样传 true，`answer` 全部为 `null`。

因此扩展以**题库**作为答案来源，它不依赖提交状态；试卷答案可用于人工核对。

### 8.2 为什么不用文本匹配

选项 id 已经能唯一确定选项，文本匹配没有存在价值，而且会直接失效：

- **判断题在页面上没有任何选项文本**，只有 A、B 两项，题库里却是「正确」「错误」；
- 富文本带来标签、实体、零宽字符等噪声；
- 选项顺序可能被打乱。

本项目曾实现过一版文本匹配，在真实数据上对判断题全部失败，
随后被整体替换为 id 匹配。

## 9. 已被证伪的旧假设

| 旧假设 | 实际情况 |
|---|---|
| 选项 input 的 id 形如 `op_<题id>_<选项id>`，该前缀不存在 | 前缀**存在**，格式为 `op_<题id>_<选项id><后缀>`。首次检索时只查了首页 bundle，而做题页的代码位于懒加载 chunk，因此误判为不存在 |
| `.j-submitBtn` 不存在 | 该选择器**存在**，位于学习页 bundle 偏移 250103。同上，误判源于只检查了首页 bundle |
| 内容脚本无法读取令牌 | `NTESSTUDYSI` 的 httpOnly 为 false，登录后同样如此，内容脚本可直接读 `document.cookie` |
| 静态提取即可得到完整接口清单 | `getMyLearnedCoursePanelList` 不在静态提取的 168 个端点中，但真实可用。存在动态拼接的接口名 |
| 脚本点击选项不会更新页面内部状态 | 直接 `input.click()` 即可生效，页面随后会发起 `saveDraftAnswers` |
| 题库题目的 id 与试卷题目的 id 可以对应 | 两者属于**不同空间**，无法对应。可对应的是**选项 id** |

前两条的更正过程值得记录：**只检查单个 bundle 就得出「某标识不存在」的结论并不成立。**
这个错误结论污染了基于它写下的代码，也导致后续一轮工作方向错误。
改动平台相关代码前，务必用探测工具在真实页面上确认。

## 10. 尚未取证的部分

| 项目 | 说明 |
|---|---|
| 互评页面的 DOM 结构 | 需要进入互评流程采集 |
| 作业页答案注入的实际渲染效果 | 选择器已取证，注入结果尚未在浏览器中目视确认 |
| `isNeedAuth` 的逐接口归属 | 决定签名范围，目前对全部请求签名 |
| 全局限流的确切阈值 | 当前取 1000ms，来源为早期实测笔记，未再次复现 |

已取证并因此从本表移除的部分：选项节点结构（第 6.2 节）、
登录后 `NTESSTUDYSI` 的 httpOnly 状态（第 3 节）、
标准答案来源的适用条件（第 7.1 节）。

## 11. 取证纪律

1. 任何结论都要写明取证位置：文件偏移、请求 URL 或样本文件名。
2. 静态提取与运行时观测冲突时，以运行时为准，并把这个冲突写进本文件。
3. 只检查单一来源不足以否定某个事实，参见第 9 节。
4. 先摸清数据之间的关系，再选择方案。选项 id 与题目 id 的关系就是一个例子：
   在没搞清之前用了文本匹配，方向从一开始就是错的。
5. 抓下来的样本不入库，用完即清。仓库里只保留结论，见本文各节的取证等级标注。
6. 平台改版后先重跑探测，再修改代码。
