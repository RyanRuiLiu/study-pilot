# 课程模型

课程的类型、层级与状态。扩展的所有判断都建立在这些取值之上，因此每条都标注来源。

| 标记 | 含义 |
|---|---|
| [源码] | 从平台 bundle 静态读出，附行号（`core/index.js` 指反编译产物） |
| [实测] | 本轮在真实账号上读过或调用过 |
| [待核] | 尚未验证，不得作为实现依据 |

## 1. 课程模式（mode）

[源码] `core/index.js:20171-20175`（`edu.u.CONST`）：

```js
MODE_MOOC: 0, MODE_SPOC_SYNC: 10, MODE_SPOC_ASYNC: 15, MODE_SPOC_ONLY: 20, MODE_ROOC: 30
```

`mode` 决定学习页地址前缀：

| mode | 前缀 | [实测] |
|---|---|---|
| 0 | `/learn/{school}-{courseId}` | 示例课程丁（9000000014） |
| 10 / 15 / 20 / 30 | `/spoc/learn/{school}-{courseId}` | 示例课程子（9000000027，mode 15） |

后台拼地址必须读 `mode`，不能假定 `/learn/`。

## 2. 层级

数据来自 `courseBean.getLastLearnedMocTermDto {termId}`，一次请求拿到整门课。

```
result.mocTermDto
├── chapters[]                    章节
│   ├── lessons[]                 课时
│   │   └── units[]               课件单元（视频/文档/文本/随堂测验/讨论…）
│   ├── quizs[]                   章节下的单元测验
│   ├── homeworks[]               章节下的单元作业
│   └── exam                      章节内的考试。实测恒为 null
├── exams[]                       考试。真正的位置在顶层
└── courseId / id / courseName / mode / startTime / endTime …
```

[源码] 与 [实测] 一致：[`packages/platform-mooc/src/structure.ts`](../../packages/platform-mooc/src/structure.ts) 的注释给出了同样的位置；
本轮遍历 `chapters[].lessons[].units[]` 读到了全部课件单元。

**课件单元挂在 lesson 下，不在 chapter 下**——这是最容易被写错的一处。
考试在顶层 `exams[]`，每场考试拆成 `objectTest`（客观，`type: 2`）与
`subjectTest`（主观，`type: 3`）两部分，各自有独立的 tid。

## 3. 两套类型常量

**它们不是一套。** 工作项的 `type` 与课件单元的 `contentType` 取值重叠而含义不同，
混用会得出「PDF 是作业」这类结论。

### 3.1 工作项类型 [源码] `core/index.js:20200-20202`

```js
LESSON_TYPE_NORMAL: 1, LESSON_TYPE_QUIZ: 2, LESSON_TYPE_HOMEWORK: 3
```

扩展把它们归一化为 `quiz` / `homework` / `exam-objective` / `exam-subjective`。

### 3.2 课件单元类型 [源码] `core/index.js:20203-20215`

```js
LESSONUNIT_VIDEO: 1,                    LESSONUNIT_VIDEO_SRT: 2,
LESSONUNIT_PDF: 3,                      LESSONUNIT_TEXT: 4,
LESSONUNIT_QUESTION: 5,                 LESSONUNIT_DISCUSS: 6,
LESSONUNIT_LIVE: 7,                     LESSONUNIT_COLUMN_CONTENT: 8,
LESSONUNIT_RELATED_LIVE: 9,             LESSONUNIT_MUSIC_VIDEO: 10,
LESSONUNIT_MUSIC_EXERCISE: 11,          LESSONUNIT_MUSIC_HOMEWORK: 12,
LESSONUNIT_INTERACTIVE_COURSEWARE: 15
```

[实测] 账号 6 门课中只出现过 1、3、4、5、6；其余值 [待核]。

## 4. 课件单元的完成度

单元对象上的三个字段（[实测]）：

| 字段 | 含义 |
|---|---|
| `completePercent` | 精确小数。视频 = 已学秒数 / 总时长；其余类型为 0 或 1 |
| `viewStatus` | 0 未学；5 已学（部分学习也是 5） |
| `learnTime` | 视频为已计入学时的「上报周期数」（565 秒 → 10）；文本/文档/讨论为 null |
| `durationInSeconds` | 视频总时长（秒），上报时用作 `videoTime` |

课时圆点的判据 [源码] `index.js:1610-1617`：

```js
learned = units.filter(u => !!u.viewStatus).length;
learned === units.length ? 'circle checked' : learned > 0 ? 'circle semichecked' : ''
```

课时的 `viewStatus` [源码] `index.js:1799-1803`：0 未开始、3 部分完成、其它为已完成。

课程进度用另一个接口 [实测] `mocCourseV2RpcBean.getMemberLearningRate {termId}`
→ `{lessonLearned, lessonsCount}`，按**课时**计数。

## 5. 工作项（作业/测验/考试）的判定

由 `test` 对象直接判定，不需要额外请求：

| 字段 | 用途 |
|---|---|
| `id` / `name` | 标识与显示 |
| `deadline` | 提交截止 |
| `evaluateStart` / `evaluateEnd` | 互评窗口 |
| `evaluateScoreReleaseTime` | 成绩发布时间 |
| `usedTryCount` | 做没做（大于 0 即已提交） |
| `userScore` / `totalScore` | 有没有分、满分多少 |
| `enableEvaluation` / `evaluateJudgeType` | 是否带互评（2 互评、3 自评） |

状态判定：

| 状态 | 判据 |
|---|---|
| 未提交 | `usedTryCount === 0` 且 `userScore == null` |
| 已过截止未提交 | 同上，且 `deadline < now` |
| 互评阶段 | 已提交，且 `evaluateStart <= now <= evaluateEnd` |
| 等待互评完成 | 已提交，互评窗口已过，尚无分数 |
| 成绩已公布 | `userScore != null` |

**成绩看 `userScore`，不看阶段**：测验没有互评流程，其阶段字段永远为空。

作业所处阶段由 `$currentEvaluatePhase` 按时间算（[源码] `review.ts` 的 `currentEvaluatePhase`）：

```
now < deadline                   -> 1 提交期
now >= evaluateScoreReleaseTime  -> 3 成绩期
否则                              -> 2 互评期
```

互评配额（还差几份）需要单独查询，见 [mooc.md](mooc.md) 第 7.3 节。

### 为什么不用 `TermBean.getNewestItems`

它名字像「待办」，但返回项没有完成标记（实测把已提交的测验也列在 `needSubmitQuiz` 下），
且每类只返回最近一项。待办一律从课程结构派生。

## 6. 对扩展的含义

| 功能 | 适用类型 | 依据 |
|---|---|---|
| 课件自动完成 | 单元 1 / 3 / 4 / 5（6 见 [courseware.md](courseware.md)） | `completePercent`、`viewStatus` |
| 自动作答 | 仅单元测验 | 作业题为主观题，无可自动填写的答案 |
| 自动互评 / 自评 | 单元作业 | 互评期 + 未完成的配额 |
| 截止提醒 | 测验、作业、考试 | 提交截止与互评截止 |
| 得分指导展示 | 单元作业与主观题考试 | `subjectiveQList[].judgeDtos[].msg` |

## 7. 待核

- 6 门课里只复核了 2 门（示例课程丁 mode 0、示例课程子 mode 15），其余 4 门的模式与单元类型分布未确认
- 单元对象是否自带 `lessonId` 字段未确认；本轮的 `lessonId` 取自 `lessons[].id`
- 类型 2、7、8、9、10、11、12、15 无实测
