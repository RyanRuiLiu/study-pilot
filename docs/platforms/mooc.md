# 平台实测记录（icourse163）
平台**实际如何运作**与每条结论的取证位置。设计见 [architecture.md](../architecture.md)，改动纪律见
[development.md](../development.md)；课程模型、课件完成、逆向取证三份记录已并入第 11～13 节。标记：
[源码] 从 bundle 静态读出（附偏移）；[实测] 真实账号上读过或调用过；[待核] 未验证，不得作为实现依据。
取证对象是 2026-09-26（2026-10-14 补播放器与课件单元）抓取的平台 bundle；复现方式见
[scripts/probe/README.md](../../scripts/probe/README.md)——bundle 摘录可用 `probe:decompile` 重新生成，
故下文只留结论与偏移。

## 1. 请求签名
[源码] `core/index.js` 偏移 166060（学习页 bundle 内有同构副本）：拼接顺序 `body + nonce + timestamp +
SALT`，SALT 为 `fu2s2kxcswgn5hqanx7asmlogyr5wu29`，nonce 取 `Math.floor(9000 * Math.random()) + 1000`
（1000～9999），timestamp 为毫秒，摘要取 MD5 十六进制转大写，请求头五个字段（`Timestamp`、
`Auth-Signature`、`Nonce`、`System: v1`、`Content-Type`）。实现见
[sign.ts](../../packages/transport/src/sign.ts)，正确性由
[sign.test.ts](../../packages/transport/test/sign.test.ts) 与 `node:crypto` 交叉验证。两处边界：页面按
`typeof data === 'object' ? JSON.stringify(data) : (data || '')` 取值，`undefined`、`null`、`0`、空串参与
签名的是**空串**而非 `"{}"`（上一代无条件 `JSON.stringify(body ?? {})`，这些输入下签名不同，当前调用都
传对象所以未暴露）；请求头里**没有 `edu-script-token`**——它在源码里是日志模块 `base-logger` 的
`csrf_cookie`，域名规则指向 `study.163.com`，与 `icourse163.org` 的 `.rpc` 无关，上一代把它当请求头附加
没有依据。

## 2. csrfKey 与条件签名
[源码] `index.web.js` 偏移 195839：`csrfKey` 仅在 URL 以 `.rpc` 结尾时追加，取 `NTESSTUDYSI` 的原始值，
页面未做 URL 编码。**签名是条件性的**，由各接口的 `isNeedAuth` 决定；当前实现对全部请求签名，实测带
签名的只读请求均返回 `code: 0`，但「哪些接口必须签名」尚未逐接口核对（第 10 节）。

## 3. 凭证
| cookie | 域名 | 下发时机 | httpOnly | 有效期 |
|---|---|---|---|---|
| `NTESSTUDYSI` | `.icourse163.org` | **未登录时即下发**（32 位匿名会话） | false | 会话级 |
| `EDUWEBDEVICE` | `.icourse163.org` | 首次访问 | false | 长期 |
| `STUDY_INFO` | `.icourse163.org` | 登录后 | 未核对 | 值形如 `邮箱\|8\|userId\|时间戳` |
| `STUDY_SESS` | `.icourse163.org` | 登录后 | 未核对 | 未核对 |

**`NTESSTUDYSI` 不能用于判断登录**（访客状态同样存在，实测匿名会话调只读接口仍 200）；**它不是
httpOnly**，登录后也不是，内容脚本可直接读 `document.cookie`——上一代「内容脚本读不到令牌、必须经
background 中转」的前提不成立；`STUDY_INFO` 第三段是用户 id，已由 `getQuizInfo` 的 `answererId` 交叉
验证。

### 3.1 未登录形态与会话续期（[实测] 2026-10-03）
匿名会话与伪造的失效会话（`STUDY_SESS` 为服务端不认识的随机值）各调一次只读接口，响应**完全一致**：
`courseBean.getLastLearnedMocTermDto` 与 `learnerCourseRpcBean.getMyLearnedCoursePanelList` 都是 HTTP
200、`code: 0`，`result` 为 `null`（列表外层仍有 `pagination`）。由此：平台**对失效会话不报错**，区别只在
「内层 result 是 `null` 还是数组/对象」——已登录账号即使没有课，列表内层也是空数组；失效会话与匿名会话
**不可区分**，代码里只能报「未登录」；**会话级 cookie 能活过服务端会话**（浏览器长期驻留、恢复上次页面
都会把它留在盘上），「本地有 cookie」不是「服务端还认得你」的证据；**带凭据 GET 首页即可续期**，服务端
接受持久凭证时三个 cookie 会被重新下发，看 `STUDY_SESS` 变没变即可判断——这就是官网「打开首页自动登录」
的机制，实现见 [session.ts](../../apps/extension/src/platform/mooc/session.ts)。官网前端判断登录不看
cookie（`_$isLogin` 读服务端渲染的 `window.webUser.loginId`），判断权在服务端。

## 4. DWR（互评通道）
互评不走 `.rpc`，走 DWR 纯文本调用：`POST {origin}/dwr/call/plaincall/{Bean}.{method}.dwr`，
`Content-Type: text/plain`，报文含 `scriptSessionId`（字面量模板 + `190`）、`httpSessionId`（取
`NTESSTUDYSI`）、`c0-scriptName` / `c0-methodName` / `c0-id=0` / `c0-param0`、`batchId`；成功判据不是
HTTP 状态码（业务失败同样 200），而是响应含
`dwr.engine._remoteHandleCallback('<batchId>','0',true)`。报文骨架与参数编码来自上一代实现依据的真实抓包
（曾跑通完整互评流程），未再次复现；实现见 [dwr.ts](../../packages/transport/src/dwr.ts)。端点：
`startOneSubmissionEvaluate`（取下一份待评答卷，**有副作用**）、`submitSubmissionEvaluate`（提交评分）。

## 5. 保存与提交
[源码] `core/index.js` 的 `COM_Cache_TestBaseCache`：**请求体形如 `{paperDto, preview}`，`preview` 不可
省略**——只传 `paperDto` 时服务端返回 `code: 0` 却不落库，这个现象曾被误判为「服务端保存机制有问题」；
**提交时 `answers` 原样保留**，页面只对 `content` 做一次 emoji 清理（早期文档「提交不携带答案、`answers`
为 null」与源码冲突，已作废）；提交前页面把 `submitType` 置为 `NORMAL`，值为 1。

## 6. 答卷 id（aid）
读写一份作答都要求正确的 aid，取错会写到另一份答卷上：`getOpenQuizInfo` 响应顶层的 `aid` **正确**（页面
就是这么取的）；`targetAnswerform.aid` 错误（它是最近一次**已提交**的记录）；`getOpenQuizPaperDto` 传
`aid = 0` 也错误（服务端返回的未必是页面正在用的那份）。答卷结束后 `aid` 变为 `0`，再取卷返回「找不到
对应的答题记录【-1】」且无法重新开始——过期测验一旦结束就不能再作答；复现提交流程要用还没做的单元。

### 6.1 草稿保存的适用边界
未过期、未提交时页面点击触发的草稿保存**生效**（实测刷新后 12 题作答仍在）；已过期时**不生效**——返回
`code: 0`、`result: true`，草稿条数不变。因此**任何依赖草稿的实现都不可靠**，可靠路径是提交本身携带
答案（第 5 节；实测两次提交得 26/26、24/24）。分工由此确定：前台在用户在场时工作，填充走页面点击、提交
前当场从题库重构答案；后台无人值守，填充与提交都走接口，两者都在提交体里带答案。

### 6.2 提交不需要二次确认
页面提交时弹的 `CommonDialog` 是交互层确认；后台构造请求时没有这一步，前台面板也不必复制：提交按钮
本身即用户的确认动作。

## 7. 页面结构契约
[源码] 提取自学习页 bundle 的 `_$addHtmlTemplate(...)`；[实测] 来自真实页面采集。选择器在代码里的落点见
[selectors.ts](../../apps/extension/src/features/mooc/selectors.ts) 与
[quiz-stage.ts](../../apps/extension/src/features/mooc/quiz-stage.ts)。

### 7.2 单元作业的得分指导
`getOpenHomeworkPaperDto` 响应的 `subjectiveQList[].judgeDtos[]`：`msg` 是得分指导正文（富文本，可能
含图）、`maxScore` 是该评分点满分、`details` 是分档 `[{msg, score}]`；作业题没有 `stdAnswer`（实测恒为
null），`withStdAnswerAndAnalyse` 取 true/false 都不影响 `judgeDtos`。[实测] `msg` 必须**整段渲染**
（保留行内图片）：评分依据里的公式就是行内小图（约 18×22），拆开取会把符号从句子中间抽走——示例课程丁第 5 章
作业曾渲染成「因为很大，示例片段乙示例片段丙」，五张小图单独堆成一列。文案取自页面语言包
（`KEY_LEARN_SCORING_GUIDANCE` 等），见
[markers.ts](../../apps/extension/src/features/mooc/guidance/markers.ts)。

### 7.3 互评数据
`getEvaluateDetail` 返回 `mocTest`（含截止与互评窗口、成绩发布时间）、`completedEvaluates[]`、
`startedEvaluate`、`selfEvaluate`、`maxEvaluateCount`、`totalEvaluateCount`、`enoughAnswer`、`trained`；
`status`：1 进行中、2 已完成；`evaluateJudgeType`：1 教师评、2 学生互评、3 自评。作业阶段由
`_$currentEvaluatePhase` 按时间算：`now < deadline` → 1 提交期；`evaluateScoreReleaseTime > 0 且
now >= 它` → 3 成绩期；否则 2 互评期（实现见
[review.ts](../../packages/platform-mooc/src/review.ts)）。

### 7.4 做题容器
提交按钮是 `<a ... j-submitBtn>`，**不是 `<button>`**。

### 7.5 选择题
题干文本在 `.j-richTxt`；选项容器 `.j-choicebox` 由脚本填充，**选项文本在 `.optionCnt` 里**（取
`label.textContent` 会带上 `.optionPos` 的「A.」前缀）；选项 input 的 id 形如
`op_<题id>_<选项id><后缀>`，是选项匹配的唯一依据（第 8 节）；**判断题的选项没有文本**（页面只有「A.」
「B.」，`.optionCnt` 为空，题库里却是「正确」「错误」）；直接 `input.click()` 即可让页面接受选择（上一代
「脚本 click 不会更新页面内部状态」的说法不成立）。

### 7.6 填空题
根节点 `div.m-FillBlank.examMode.u-questionItem`，输入区 `.j-input`，得分 `.j-score`。

### 7.7 开考前页面
`.m-beforeTest`（含 `.j-agree`、`.j-startBtn`）；点开始后才加载含选项组件的懒加载 chunk。

### 7.8 作业页
已提交的作业页整卷带 `analysisMode`、每题下方有 `.j-evaluate` 互评模块——两者都只是「这份作业已提交」的
标志，不代表页面给出了评分依据（见 7.9）。

### 7.9 得分指导在哪些状态下注入
判据是**站点自己的作答区或互评模块里有没有出现「得分指导」这句话**，逐题生效：未提交的作答页（站点
没有评分依据）注入；已提交（含成绩公布，站点只有进度、分数与评语）注入；给别人打分或自评的页面（站点
已逐点列出「得分指导：」与打分控件）不注入——重复，且评分时要专注。**不能按类名判断**：`analysisMode`
或 `.u-evaluateItem` 都只标志「已提交」，成绩公布页上站点并不给评分依据，按类名会把真正需要它的页面
一起挡掉。2026-10 在一门 SPOC 课程上逐状态核对（Chrome for Testing 151，真实账号）：已出分的三个单元
作业注入；互评期未开始评分的单元页只有列表态（页面上还没有题），不做任何事；未提交的作答页注入，评分
依据含图片；页面内连续切单元后，注入块来源始终等于当前单元，无残留。

### 7.10 题目与评分依据怎么对上
**只在两边都读得到题号时按题号对**：接口 `position` 从 0 开始、页面 `.position` 从 1 开始，相差 1。页面
异步渲染，题号可能还没写进去；此时拿数组下标顶替（`positionOf(item) ?? index + 1`）会变成一半按题号、
一半按顺序——物理第七单元（两题）出现过「得分指导的题号和题目对不上」，刷新后题号齐全才恢复。因此读
不到题号的题这一轮不注入，等题号渲染出来由下一次评估补上；只有两边都完全没有编号时才退回按顺序对，并
按接口的 `position` 排序。同理，题干（`.j-title`）与作答区（`.j-answer`）都没渲染出来时，找不到锚点就
等下一次，不插到题目之外。逐题核对（可复用）：页面第 N 题的题干图片与接口 `position = N-1` 那道题的
`title` 图片比对，每个评分点的图片与 `judgeDtos[].msg` 的图片逐张比对，再加上「题面分数 = 依据标题里的
本题分数 = 各评分点满分之和」；2026-10 用这套办法核过物理第七单元（2 题）与示例课程丁第 3、4、5、6 章
（4/5/6/3 题，每题 2～4 个评分点），全部对得上。仍未核对：点「开始评分」之后的打分界面——那一步会写
平台状态（取一份待评答卷），探测纪律不允许。

## 8. 三个 id 空间
| 标识 | 全局唯一 | 跨空间可比 | 实测依据 |
|---|---|---|---|
| 题库选项 id / 试卷选项 id | 是 | 两者同一空间 | 题库 1040 个选项无重复；试卷 36 个选项全部能在题库中找到 |
| 页面 input id | 是 | 内含试卷选项 id | 格式为 `op_<题id>_<选项id><后缀>` |
| 题目 id | 否 | **不同空间** | 同一道题在试卷里是 `3388085475`，在题库里是 `1388158249` |

**匹配必须建立在选项 id 上，不能建立在题目 id 上**，也不需要按题干匹配题目：选项 id 全局唯一，直接从
题库建「选项 id 到是否正确」的索引即可。页面 input id 中选项 id 之后的尾串是**页面加载时的时间戳**，每
次刷新都变（实测同一选项两次加载的 id 差值与加载间隔一致），用同题选项 `name` 与 `id` 的差异剥掉它。
试卷（`getOpenQuizPaperDto`）**仅在该测验已提交时**返回 `optionDtos[].answer`，题库
（`getQuestionListByTermId`）任何状态下都返回——实测未提交的测验传 `withStdAnswerAndAnalyse: true`，
`answer` 全部为 `null`，因此扩展以**题库**为答案来源，它不依赖提交状态。

### 8.1 为什么不用文本匹配
选项 id 已能唯一确定选项，文本匹配没有存在价值，而且会直接失效：判断题页面上没有选项文本；富文本带来
标签、实体、零宽字符等噪声；选项顺序可能被打乱。本项目曾实现过一版文本匹配，在真实数据上对判断题全部
失败，随后被整体替换为 id 匹配。

## 9. 已被证伪的旧假设
| 旧假设 | 实际情况 |
|---|---|
| 选项 input id 形如 `op_<题id>_<选项id>`，没有后缀 | 前缀**存在**，格式为 `op_<题id>_<选项id><后缀>`；首次只查了首页 bundle，而做题页代码在懒加载 chunk |
| `.j-submitBtn` 不存在 | 该选择器**存在**（学习页 bundle 偏移 250103）；同上，误判源于只查了首页 bundle |
| 内容脚本无法读取令牌 | `NTESSTUDYSI` 的 httpOnly 为 false，登录后同样如此 |
| 静态提取即可得到完整接口清单 | `getMyLearnedCoursePanelList` 不在静态提取的 168 个端点中，但真实可用——存在动态拼接的接口名 |
| 脚本点击选项不会更新页面内部状态 | 直接 `input.click()` 即生效，页面随后发起 `saveDraftAnswers` |
| 题库题目 id 与试卷题目 id 可以对应 | 两者属于**不同空间**，可对应的是**选项 id** |

**只检查单个 bundle 就得出「某标识不存在」的结论并不成立**——这个错误结论污染了后续代码与工作方向；改动平台相关代码前，务必用探测工具在真实页面上确认。

## 10. 尚未取证与取证纪律
未取证：互评页面的 DOM 结构（需进入互评流程采集）；`isNeedAuth` 的逐接口归属（目前对全部请求签名）；
全局限流的确切阈值（当前取 200ms 间隔，依据见 12.3）。已取证并从此处移除：选项节点结构（7.5）、登录后
`NTESSTUDYSI` 的 httpOnly 状态（第 3 节）、标准答案来源的适用条件（8）、作业页注入的实际渲染效果
（7.9）。纪律：结论要写明取证位置（文件偏移、请求 URL 或样本文件名）；静态提取与运行时观测冲突时以
运行时为准，并把冲突写进本文件；只检查单一来源不足以否定某个事实（第 9 节）；先摸清数据之间的关系再选
方案——选项 id 与题目 id 的关系就是例子，没搞清之前用了文本匹配，方向从一开始就是错的；抓下来的样本
不入库、用完即清；平台改版后先重跑探测，再改代码。

## 11. 课程模型
### 11.1 课程模式（mode）
[源码] `core/index.js:20171-20175`：`MODE_MOOC: 0`、`MODE_SPOC_SYNC: 10`、`MODE_SPOC_ASYNC: 15`、
`MODE_SPOC_ONLY: 20`、`MODE_ROOC: 30`。mode 0 的学习页前缀是 `/learn/{school}-{courseId}`（[实测] 示例课程丁
9000000014），10/15/20/30 是 `/spoc/learn/{school}-{courseId}`（[实测] 示例课程子 9000000027，mode 15）。
后台拼地址必须读 `mode`，不能假定 `/learn/`；两种页面结构一致，只有地址不同。

### 11.2 层级
`courseBean.getLastLearnedMocTermDto {termId}` 一次请求拿到整门课：`result.mocTermDto` → `chapters[]`
（下含 `lessons[].units[]` 课件单元、`quizs[]` 单元测验、`homeworks[]` 单元作业、`exam` 章节内考试
〔实测恒为 null〕）、`exams[]`（考试，真正的位置在顶层）。**课件单元挂在 lesson 下，不在 chapter 下**
——这是最容易被写错的一处。每场考试拆成 `objectTest`（客观，`type: 2`）与 `subjectTest`（主观，
`type: 3`），各自有独立的 tid。

### 11.3 两套类型常量
**它们不是一套**：工作项的 `type` 与课件单元的 `contentType` 取值重叠而含义不同，混用会得出「PDF 是作业」
这类结论。工作项类型是 1 普通、2 测验、3 作业，扩展归一化为 `quiz` / `homework` / `exam-objective` /
`exam-subjective`；课件单元类型是视频 1、字幕 2、PDF 3、文本 4、随堂测验 5、讨论 6、直播 7、专栏 8、相关
直播 9、音乐视频 10、音乐练习 11、音乐作业 12、互动课件 15（取值与来源见
[types.ts](../../packages/platform-mooc/src/types.ts)）。[实测] 账号 6 门课中只出现过 1、3、4、5、6。

### 11.4 课件单元的完成度
单元字段（[实测]）：`completePercent`（视频为已学秒数/总时长，其余类型 0 或 1）、`viewStatus`（0 未学、
5 已学，部分学习也是 5）、`learnTime`（视频为已计入的学习上报周期数，565 秒 → 10；文本/文档/讨论为
null）、`durationInSeconds`（视频总时长，上报时用作 `videoTime`）。[源码] 课时圆点判据
（`index.js:1610-1617`）是比较该课时下 `viewStatus` 非 0 的单元数与总数；课时自身的 `viewStatus`
（`index.js:1799-1803`）0 未开始、3 部分完成、其它已完成。课程进度走 [实测]
`mocCourseV2RpcBean.getMemberLearningRate {termId}` → `{lessonLearned, lessonsCount}`，按**课时**计数。

### 11.5 工作项（作业/测验/考试）的判定
由 `test` 对象直接判定，不需要额外请求：`id` / `name`（标识）、`deadline`（截止）、`evaluateStart` /
`evaluateEnd`（互评窗口）、`evaluateScoreReleaseTime`（成绩发布）、`usedTryCount`（大于 0 即已提交）、
`userScore` / `totalScore`（得分与满分）、`enableEvaluation` / `evaluateJudgeType`（2 互评、3 自评）。
状态：未提交 = `usedTryCount === 0` 且 `userScore == null`；已过截止未提交 = 同上且 `deadline < now`；
互评阶段 = 已提交且 `evaluateStart <= now <= evaluateEnd`；等待互评完成 = 已提交、窗口已过、尚无分数；
成绩已公布 = `userScore != null`。**成绩看 `userScore`，不看阶段**：测验没有互评流程，其阶段字段永远为
空。互评配额（还差几份）需单独查询，见 7.3。

### 11.6 待核与不用 `TermBean.getNewestItems`
`TermBean.getNewestItems` 名字像「待办」，但返回项没有完成标记——实测把已提交的测验也列在
`needSubmitQuiz` 下，且每类只返回最近一项，故待办一律从课程结构派生。其余待核：6 门课里只复核了 2 门
（示例课程丁 mode 0、示例课程子 mode 15）；单元对象是否自带 `lessonId` 未确认（本轮取自 `lessons[].id`）；类型
2、7、8、9、10、11、12、15 无实测。

## 12. 课件单元的完成（纯接口）
把课件里的视频、文档、文本、随堂测验标记为「已学」，**不需要打开页面**，一条请求完成一个单元。目标不是
「把标记刷成完成」，而是**留下与真人一致的记录**：认证成绩页上各类型显示的东西不同（视频「观看时长」、
文档「浏览时长」、随堂测验作答、讨论「回复数」），做法因此也不同。

### 12.1 两次请求与字段来源
① `courseBean.getLastLearnedMocTermDto {termId}` 读结构 → `chapters[].lessons[].units[]`；
② `courseRpcBean.saveMocContentLearn {dto}` 上报。**不自造任何取值**：

| 字段 | 来源 | 取法 |
|---|---|---|
| `unitId` / `contentId` / `videoId` / `contentType` | 结构接口 | `units[]` 的同名字段 |
| `lessonId` / `courseId` / `termId` | 结构接口 | `lessons[].id` / `mocTermDto.courseId` / `.id` |
| `videoTime`、`learnedVideoTimeCount` | 结构接口 | `units[].durationInSeconds` |
| `duration` | 配置接口 | `1000 × learnTimeUploadPeriod`，见下 |
| `userId` | [待核] | 客户端用页面注入的 `window.webUser.id`；纯接口路径下的来源待定 |
| `index` / `action` / `finished` | [源码] | 首个上报 `1`；`LEARN_TIME_COUNT`；播完 `true`（课件页 `index.js:10486/10851/10878`） |

**上报周期也是接口给的**（[实测]）：`POST /web/j/commonBean.obtain.rpc`（body
`key=mobile_config_web_server_config`）→ `{"learnTimeUploadPeriod": 60, "videoHeartBeatPeriod": 60}`；课件
页从 `localStorage` 读它（默认 180 秒）当上报周期，因此 `duration` 必须取自接口，不能用常量。

### 12.2 各类型的行为
| 类型 | 真人在页面上做的事（[源码]） | 我们做的事 | 平台记录 | 状态 |
|---|---|---|---|---|
| 视频 1 | 播放，每 60 秒上报位置＋本次学时，播完报 `finished` | 一条上报：位置＝时长，学时＝时长 | 观看时长、完成 | [实测] 立即完成，时长＝整段 |
| 文档 3 | 阅读器逐页翻，每次翻页上报页码＋停留秒数 | 逐页上报，每页声明 30 秒 | 浏览时长、进度＝页码/页数 | [实测] 7 页 PPT：pct 1/7→7/7，记 4 分钟（真实 20 秒） |
| 文本 4 | 打开即完成 | 一条完成上报 | 仅完成 | [实测] 立即完成 |
| 随堂测验 5 | 打开即完成；点提交把答案填进 `paperDto` 调 `submitAnswers` | 取卷＋题库组答案 → 提交 → 补完成上报 | 完成＋作答记录 | [已接线，待实测] |
| 讨论 6 | 打开即完成；发一条回复（DWR `MocForumBean.addReply`） | 发一条回复 → 完成上报 | 完成＋回复数 | [实测] `replyCount` 0→1，单元同时完成 |

**没有前奏**：曾经以为必须先调 DWR `CourseBean.getLessonUnitLearnVo` 建立会话，[实测] 不必要——不做任何
前奏、只发一条上报，全新视频单元在 4 秒内 `completePercent` 变 1；该 DWR 只在**文档**里用于取总页数
（`textPages`，`.rpc` 侧没有等价字段）。讨论回复的第二个参数不能省（只发 `c0-param0` 时服务端回
`IllegalArgumentException: Missing method or missing parameter converters`），`c0-param1=Array:[]` 是无图
时的编辑器图片附件；文档每页的报文含 `finished`（当前页==总页数）、`index`（页序-1）、`pageNum`、
`lastLearnTime`、`learnedVideoTimeCount`（每页声明秒数）——时长是**平台信任的声明值**，不是真实间隔。

### 12.3 复核与限流
写平台之后必须复核，不能只信 `code`：重读 ① 的结构，该单元 `completePercent === 1` 且 `viewStatus` 为 5
才算完成。[实测] `code: 0` 且 `result: true` 不保证状态已变——讨论单元会先返回 0、稍后才记账。平台限制
**全站统一**（读写共享一条配额），因此所有出站请求走同一个节流器
（[throttle.ts](../../packages/transport/src/throttle.ts)：串行 + 默认 200ms 间隔）；依据是本项目实测——
间隔 0ms 时 5 次成功 2 次，200ms 时 5/5，更早沿用的 1000ms 来自上一代笔记、没有实测依据。命中并发限制时
RPC 层自动退避重试（响应形如 `{"code": -2, "result": null, "message": "并发限制，请稍后再试"}`）。**业务
代码里不写等待**：课件行为一律经 `client.rpc.call` / `client.dwr.call`，节流与重试都在那一层。

### 12.4 已知边界
| 事项 | 现状 |
|---|---|
| 时长是否需要真实等待 | [实测] 不需要：平台记的是上报声明的秒数，真实需要的只是请求间隔，而间隔由共享节流器负责 |
| 时长可否重复叠加 | [实测] 可以，平台是累加式的（真人重看也一样），超过视频本身长度属平台自身口径 |
| 讨论单元 | [实测] 发回复后 `replyCount` 0→1 且单元完成；另有只上报的案例是延迟入账（约 12～20 分钟后仍未入账），**延迟时长与是否稳定未知** |
| 视频单条上限 | [实测] 无上限：1141 秒的视频一条 `learnedVideoTimeCount = 1141` 直接记满，更长的未测 |
| `duration` 字段语义 | [实测] 按接口给的 60 秒发送时被接受，其它取值未测 |
| 随堂测验作答 | [源码] 与单元测验同一套提交接口；已接线并有测试，**尚未在真实账号上跑过** |

## 13. 逆向取证工作流
**先知道两件事**：sourcemap 是空的（bundle 末尾声明 `./s/core.js.map`，取回来是空占位，`sources: []`、
`mappings: ""`，无法还原原始工程）；压缩没有混淆（只去掉空白并缩短局部变量名，模块内的函数名、属性名、
接口名、DOM 类名全部保留原样，格式化后足以支撑阅读与开发——`pnpm probe:decompile` 做的就是这件事）。
**定位一段功能**：从网络记录里找接口名（`probe:collect` 的 `network.jsonl`，或 `probe:watch` 实时看）；用
`pnpm probe:decompile --capture <采集目录> --out .reverse` 生成 `INDEX.md`、格式化后的 `<bundle>/index.js`、
模块索引 `modules.json`（hash、偏移、符号）与按 EDU 模块切开的 `modules/<hash>.js`；再从接口名或符号
（如 `COM_Cache_QuizCache`）定位模块直接读——模块 hash 随平台发版变化，不要记 hash，重新生成索引即可。
**读 NEJ 代码的要点**：模块声明是 `EDU("<hash>", function(e, t, i){...}, "<依赖 hash>", ...)`；类通过
`NEJ.C()` 创建、`_$extend` 继承，原型方法写作 `d.__method = function(){}`；私有方法前缀 `__`、公开方法
前缀 `_$`；请求统一走 `t._$request({url, method, data, isNeedAuth, onload})`；DOM 模板以字符串存在
`_$addHtmlTemplate` 里，选择器可直接从模板读出。**纪律**：连续调用同一接口会被并发限制挡回
（`code: -2` 且响应不含数据），这很容易被误读成「接口不返回该字段」，看到可疑的空结果先确认响应码；工具
链完整清单见 [scripts/probe/README.md](../../scripts/probe/README.md)。
