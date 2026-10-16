# 智慧树任务模块设计（二期：单元测试 · 见面课测验 · 期末考试 · 见面课 · 成绩报告）

> 状态：**待审** ｜ 2026-10-16 ｜ 前置：v1《智慧树平台适配器设计》（视频线，已实现并 81/81 真机实证）
>
> 依据：真机全量探测（`.probe/zhs-src/FINDINGS.md` §六、§十九~§二十二；含 Ryan 登录后的当面实测）
> ＋ 考试应用源码（`.probe/zhs-exam-src`，API 全图与界面文案）＋ 见面课/报告应用实测。
>
> **Ryan 口径（2026-10-16）**：
> ① 智慧树上所有板块都是成绩构成、**全部要完成**——展示按平台「成绩分析」页的构成组织，
> **不套 mooc 的课件/待办二分**（mooc 课件是选择性内容，不参照）；
> ② **答案必须从官方接口请求回来**（不用 AI 解题）；
> ③ **期末考试也自动**，与平时测试同一条流程（实测一般课程不采人脸）；
> ④ 见面课**签到不自动**（真人现场行为），我们只提醒＋做测验；
> ⑤ 写范围：沙箱《示例课程己》＋《人工智能引论》；《示例课程甲》《示例课程乙》《示例课程丙》**只读**；
> ⑥ 考试行为与用时**要像真人**——提交动作本身可以快，但作答过程必须按真实时间推进、
> 总时长落在合理区间（见 §3 模块 2「答卷节奏」），不做"秒交"。

---

## 0. 范围

- 本设计：三套系统（学习页 / 作业考试 / 见面课）上的五项能力——**单元测试、见面课测验、期末考试、
  见面课场次、成绩报告**——与他们的展示架构（设置页按成绩构成组织）。
- 非目标：签到自动化、回放观看、机房/线下考试形态的**执行**（只列状态）、平台侧观测项
  （学习习惯 / 互动 / 掌握度 / 学习达成度 / PBL / 笔记）。

## 1. 已验证的平台事实（逐条带证据）

### 1.1 三套系统与登录态

| 系统 | 域与签名 | 登录要求 | 证据 |
|---|---|---|---|
| 学习页（已有） | `studyservice-api`，module 11 | **CASLOGC cookie 即可** | v1 起一直可用；SSO 过期期间照常读 |
| 作业考试 | `studentexam-api`，module 号 3（FINDINGS §八 校准） | **需 CAS SSO** | 登录前实测 302→passport；登录后全通 |
| 见面课 + 成绩报告 | `stuonline.zhihuishu.com`，接口**免签明文** | **需 CAS SSO** | 同上 |

- 登录态：**一次 CAS 登录（passport.zhihuishu.com）全站共用**；过期时各应用静默 302→passport
  （应用内**不弹**登录框）——这是"看起来没登录/没弹窗"的真实机制。
- 考试族线格式与学习族**不同**：外层请求体**只有 `secretStr` 一个字段**（时间戳在密文里），
  没有外层的 `dateFormate`（源码 `fixeParam()={dateFormate}` 进密文；§六）。

### 1.2 数据模型（全部实测字段）

**作业条目**（`getStudentHomework` → `rt.studentHomeworkList[]`）：

| 字段 | 值/含义（实测） |
|---|---|
| `id` | 8 位 token（如 `ymVxX7lb`），不是数字 id |
| `examName` | 「绪论单元测试」「吃下去的药物是怎么进入血液的？」 |
| `meetCourseType` | **0 = 单元测试；1 = 见面课测验**（唯二实测值） |
| `state` | **1 = 未提交；4 = 已提交** |
| `cpOrderNumber` | 章节名（单元测试）；见面课测验为 null |
| 其他 | `examId / achieve / achieveCount / score / totalScore / backStatus / isMarking / isCheckAnswer / startTime / endDate / chapterRank` |

- 页签官方名：**未提交（flag=1）/ 已提交（flag=2）**；请求
  `{recruitId, courseId, flag, pageSize, pageNum, dateFormate}`（`pageSize:100` 一页取全）。
- 空态文案（页面原文）：「你的所有作业/考试都已完成啦」。

**期末考试**（`getStudentFinalExam` → `rt[]`）：`id / examName（如「…教程考试」）/ examId / state /
startTime / endDate / limitTime（分钟）/ problemNum / totalScore / faStudentExamRemainCount（剩余机会）`。
考试形态 `getExamType`：**1=在线 / 2=机房 / 3=线下**（页面文案分支）。补考 `hasMakeupExam`。

**见面课场次**（`listTeachMeetingStu`，明文免签，body `recruitId=&page.pageNo=&page.pageSize=`）：

| 字段 | 含义 |
|---|---|
| `meetCourseId / taskName / taskType` | 场次 id / 主题 / 类型 |
| `taskStatus` | **3 = 已结束；1 = 未开始**（实测值） |
| `startTime / endTime / courseEndTime` | 场次时间；`courseEndTime` 即测验截止（官方文案：测验截止=课程结束时间） |
| `liveCourseUrl / replayCourseUrl / liveCourseId / videoId` | 直播房间 / 回放房间 / 直播 id / 视频 id |
| `examH5Url` | **见面课测验入口**（dohomework 路由，t1/t2 服务端下发，尾参 `/1`） |
| `examId / meetCourseExamStatus / examScore` | 测验卷 id / 状态 / 得分 |
| `signOpenStatus / askLeaveStatus / speakerJson / taskAddr` | 签到开关 / 请假 / 主讲 / 地点 |

**成绩构成**（`stuLearnReportNew` 页，示例课程乙实况原文）：

```
最终成绩 = 平时成绩(学习进度+学习习惯+互动+知识点掌握度) + 平时测试成绩 + 见面课成绩
          + 学习达成度 + 期末考试成绩
```

- 组件数随课不同（示例课程甲四项、示例课程乙五项）。
- 官方口径：**「学习进度 = 教程进度 + 测试进度」**（进度表逐章两列：视频观看程度 / 测试进度）；
  **「平时测试成绩 = 所有平时测试得分之和 / 所有平时测试总分 × 权重」**；
  **「见面课成绩 = 签到 + 表现 + 随堂测验的总和」**（逐场次三列：考勤 / 现场 / 测验）。
- 报告接口族（免签+SSO）：`loadStuLearnReport / loadStulearnReportTab / loadStuLearingTab /
  loadExamAndScore / findImportScoreModel（权重） / loadStudentExceptionInfo / loadStudyCertify`。

### 1.3 答卷流程与接口面（考试应用源码 + 实测）

- 路由：`/webExamList/dohomework/<recruitId>/<t1>/<t2>/<courseId>/<schoolId>/<N>`，
  **N=0 单元测试 / N=1 见面课测验**；考试页路由为 `/doexamination`（答题另带 `source:"1"`）。
- **打开即开卷**（实测：打开该 URL 自动建答卷，无二次确认）——有副作用，绝不能"预打开"。
- 接口全表（`studentexam-api` + `/studentExam/gateway/t/v1/` 前缀）：

| 接口 | 用途 |
|---|---|
| `student/doHomework` | 开卷 / 取卷 |
| `answer/saveStudentAnswer` | 逐题作答（每次作答即存） |
| `answer/temporarySave` | 暂存（答题页 ~500ms 去抖自动） |
| `answer/submit` | 交卷 `{recruitId, examId, stuExamId, achieveCount}` |
| `answer/getStuAnswerInfoNew` | 答卷回顾（我的作答） |
| `student/checkAnswers` + `exam/getAllQuesitonAnalysis` | **官方答案与解析**（交卷后可取） |
| `student/applyRedo` / `redoNum` / `residualTimes` | 重做 / 剩余次数 |
| `student/getExamToken` | 考试令牌（header `ev` = XOR-hex([uuid, recruitId])） |
| `student/getStuProgressRule` / `getStuLimitTime` / `getExamType` / `hasMakeupExam` | 资格 / 限时 / 形态 / 补考 |

- **答案唯一出口 = 交卷之后**（`checkAnswers` / `getAllQuesitonAnalysis`）；未交卷调用被服务端拒绝
  （实测：未开卷章 aes 异常、已开卷未交卷章 NPE）。
- **待补的一次实测**：`submit` 终形与解析响应字段——沙箱第一章答卷已开（50 题，未交），
  等 Ryan 点头做一次真实交卷抓包后定稿（§7 未决 1）。

## 2. 展示架构（Ryan 定案：按成绩构成组织）

**每门课 = 成绩构成组件清单**（官方名与官方数，数据同源于成绩分析页）：

```
智慧树 tab（设置页）
├─ 账号与课程     [✓] 示例课程乙   示例大学      （勾选 = 读 + 写范围；不勾 = 不读）
├─ 课程任务
│   示例课程乙                      [执行]
│     学习进度（教程+测试）   视频 64/64 · 单元测试 11/11
│     平时测试成绩            9/15 分
│     见面课                  场次 4 · 测验 2/3 · 得分 7/15
│     期末考试                11-23 开考 · 未开始
│   示例课程己                  [执行]
│     学习进度（教程+测试）   视频 81/81 · 单元测试 20/20
│     …
```

- 「执行」= 把这门课所有可写组件做完（单元测试 → 见面课测验 → 期末按其时间窗），一把授权。
- 平台侧观测项（学习习惯/互动/掌握度/达成度/PBL）不进任务范围。
- 弹窗沿用同一组件模型，细案等 Ryan 的界面设计（另文）。
- **组件 ↔ 模块映射**：

| 成绩组件 | 数据来源 | 可写动作 |
|---|---|---|
| 学习进度·教程（视频） | v1：videolist + queryStuyInfo | ✅ 视频执行（已有） |
| 学习进度·测试 / 平时测试 | 模块 1（单元测试清单） | ✅ 模块 2 |
| 见面课 | 模块 4（场次）+ 模块 6（逐场三列得分） | ✅ 见面课测验（模块 2）；签到只提醒 |
| 期末考试 | 模块 1（期末条目） | ✅ 模块 2（按开考窗） |
| 分数 / 权重 / 逐章进度 | 模块 6（报告族） | 只读 |

## 3. 模块划分（6 块）

### 模块 1：考试清单（只读）

- 职责：作业列表（未提交/已提交两页签，`meetCourseType` 归一为两类）、期末考试、考试形态、
  补考——每门课一次读全。
- 落点：`packages/platform-zhs/src/exam-list.ts`；端点入 `endpoints.ts` 新族
  `exam: studentexam-api`（**外层仅 secretStr**——端点表加此形态选项，`sign.ts` 的
  `wrapSignedBody` 相应支持无外层时间戳变体）。
- 依赖：SSO（见 §5 的失效处置）。

### 模块 2：答卷执行（写）

- 职责：**单元测试 / 见面课测验 / 期末考试共用一条答卷会话**——
  开卷 → 取题面 → 逐题作答（`saveStudentAnswer`）→ 交卷（`submit`）→ 回读确认（清单 state=4）。
- 入口参数来自两处：课程目录的 `studentExamDto`（v1 videolist 已含）与见面课场次的 `examH5Url`。
- 落点：`packages/platform-zhs/src/policy/execute-exam.ts`；题面/答卷结构归
  `src/exam-paper.ts`（会话状态机：题目序列、作答缓冲、暂存节奏、交卷确认）。
- **答卷节奏（真人化，Ryan 定，2026-10-16）**：起卷 → 逐题作答 → 交卷按**真实时间**推进——
  每题之间留出真人量级的间隔（按题量估算总时长，落在合理区间），不做"秒交"；
  等待期间照走心跳、可停止（沿用 v1 壁钟等待的设计模式，等待函数按需重建）。
  时间花在"作答过程"上，而不是交卷前的空等。
- 安全闸：**开卷是一次显式动作**（绝不探测性打开）；一份答卷未交卷前不开第二份；
  停止语义 = 不开始新答卷，正在飞的请求落地即止（沿用 v1）。

### 模块 3：答案策略（官方回取）

- 职责：把"正确答案"从官方接口拿回来。链路：交卷 → `getStuAnswerInfoNew`（我的作答）+
  `checkAnswers` / `getAllQuesitonAnalysis`（官方答案与解析）→ 若该卷可重做
  （`applyRedo` / `residualTimes`）→ 用官方答案重做并提交。
- 落点：`packages/platform-zhs/src/exam-answers.ts`。
- **物理隔离的原因**：它是唯一还需要一次真实交卷抓包才能定稿的部分；隔离后模块 1/2/4/6 不被它卡住。
- 未决（§7-1）：首次交卷的答案从哪来（官方解析只能交卷后取；可重做的卷用"先交后重做"闭环，
  一次性机会的卷（如期末 `faStudentExamRemainCount=1`）如何取得答案——交卷抓包后定）。

### 模块 4：见面课（只读 + 提醒）

- 职责：场次列表归一（时间 / 主讲 / 直播/回放 / 签到状态 / 测验入口与截止）；
  产出「见面课测验」的答卷入口参数（喂给模块 2）；签到**只提醒不自动**。
- 落点：`packages/platform-zhs/src/meeting.ts`。

### 模块 5：外壳接线

- 职责：extension 新消息（成绩组件视图 / 清单 / 场次）、执行范围、失败动作位（SSO 失效→去登录）。
- **不走 mooc 的 kinds 二分**（Ryan 定案）：zhs 的执行范围用
  `{platformId:'zhihuishu', group:课名}` 收窄；`scopes.ts` 的「待办/课件」表态是 mooc 的
  界面分派机制，zhs 不套用、不新增表态。
- 计划项的 kind 仍逐项标注（`courseware` / `quiz` / `meeting-quiz` / `final-exam`），
  它是**执行分派与结果措辞**的单位（round.ts 只做字符串比较，与界面分派无关）。
- 落点：`apps/extension/src/adapters/zhihuishu/**` + `entrypoints/options/zhihuishu-*`。

### 模块 6：成绩报告（只读）

- 职责：报告族接口 → 官方分数 / 权重 / 逐章（视频观看程度 + 测试进度）/ 逐场见面课三列得分。
- 落点：`packages/platform-zhs/src/score-report.ts`。
- 意义：展示与平台成绩分析页**同源同数**，不自己算百分比。

## 4. 执行流程（逐类）

1. **单元测试**：清单（模块 1）→ 取未提交项 → 开卷（模块 2）→ 收集题面 → 答案（模块 3 的当前策略）
   → 逐题作答 → 交卷 → 回读 state=4。
2. **见面课测验**：场次（模块 4）→ `examH5Url` 解出入口 → 同 1 的答卷会话；截止=课程结束时间。
3. **期末考试**：清单（模块 1）→ 校验开考窗（startTime/endDate）与机会数 → 同一套答卷会话
   （期末走 `doexamination` 路由，与 `dohomework` 的差异——限时、可能的令牌/核验——按交卷
   抓包后的终形处理，§7-1/2）。
4. **见面课**：只展示与提醒（无写动作）。
5. **节奏**：三类答卷的作答过程一律按真人节奏推进（§3 模块 2「答卷节奏」）；
   提交动作即时——用时体现在作答上（Ryan 口径：提交可以快，效果要像真人）。
6. 门与停止：`-12/-10`、旗标、SSO 失效 → 停轮 + 失败留痕 + 「下一步」动作位（沿用 v1 机制）。

## 5. 安全与范围

- **读写范围**：课程勾选 = 读 + 写（现状机制不动）；《示例课程甲》《示例课程乙》《示例课程丙》不勾 → 不读不写。
- **开卷副作用防护**：任何读取路径不得"顺手打开"答卷；开卷只发生在执行动作里，且一次一份。
- **不可逆写**：交卷即刻计分。沙箱课先行；每类测试首次上线都在沙箱验证后再放开其他可写课。
- **SSO 失效处置**：考试族/见面课调用遇 302→passport（表现为非 JSON 响应/跨域失败）时，
  抛类型化错误 → 停轮、失败留痕，动作位 = 「打开智慧树登录」（复用 `RunFailureAction` 机制，
  与验证桥的「打开验证页」同一形态）。

## 6. 测试与验收

- 单测（fake client + 真假样本）：清单归一（state/meetCourseType 映射、两页签分页）、
  场次归一、题面解析、答卷状态机（作答缓冲/交卷/回读）、载荷形态逐字段（金样本口径）。
- 真机验收矩阵：

| 能力 | 验收课 | 状态 |
|---|---|---|
| 单元测试（全流程） | 沙箱《示例课程己》（第一章答卷已开待交） | 就绪，等点头交卷 |
| 单元测试（常规） | 《人工智能引论》13 单元测试 | 可写，随时 |
| 见面课测验 | **需要一门"可写且带见面课"的课** | **缺口**：沙箱与 AI 引论均无见面课；见 §7-3 |
| 期末考试 | **需要可写课的期末开考** | 缺口：同上；见 §7-3 |
| 成绩报告（只读） | 示例课程乙 / 示例课程丙 / 示例课程甲 | 已打通，随时 |

## 7. 未决与风险

1. **答案策略终形**：等一次真实交卷抓包（沙箱第一章已开卷未交）——`submit` 终形、
   解析/对答案响应字段、重做次数语义；之后模块 3 定稿。
2. **期末的答案获取**：一次性机会的卷"先交后重做"不成立——需确认是否存在官方考前答案出口，
   或该场景的执行策略（列提醒/单次直答）。
3. **验收课程供给**：见面课测验与期末的自动执行需要一门可写、且带见面课/期末的测试课
   （Ryan 的公开课自由添加口径内）。否则这两项只有单测与只读证据，无法真机闭环。
4. **只读课的只读展示**（待定）：未勾课程现在完全不读；若要让《示例课程甲》《示例课程乙》《示例课程丙》
   "看得见进度但永不写"，需把读范围与写范围拆开——待 Ryan 决定要不要做。
5. 风险：期末的严肃性（Ryan 已定自动）——保留时间窗/机会数校验，异常即停轮如实报告。

## 8. 证据索引

- FINDINGS §六（测验/考试架构）、§十九（板块全貌）、§二十（官方名与关系）、
  §二十一（Ryan 登录后全量实测）、§二十二（成绩分析页结构）。
- 捕获：`zhs-meet-psy / zhs-meet-yao`（见面课）、`zhs-exam-yao3 / zhs-exam-psy`（作业考试列表）、
  `zhs-report-psy`（成绩分析）、`zhs-ai-study`（AI 课结构）。
- 源码：`.probe/zhs-exam-src`（考试应用全量可读）、`.probe/zhs-src/home|study`（首页/学习页）。
