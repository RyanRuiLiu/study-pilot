# 课程模型

这份文档整理课程的类型、层级与状态。扩展的所有判断都建立在这些取值之上，
因此每一条都标注来源，便于平台改版后复核。

## 1. 课程类型（mode）

取自 `core` bundle 的 `edu.u.CONST`：

```js
MODE_MOOC: 0,        // 普通 MOOC
MODE_SPOC_SYNC: 10,  // SPOC 同步
MODE_SPOC_ASYNC: 15, // SPOC 异步
MODE_SPOC_ONLY: 20,  // SPOC 独立
MODE_ROOC: 30,       // ROOC
```

`mode` 决定学习页地址前缀，两种前缀的页面结构一致但地址不同：

| mode | 学习页前缀 |
|---|---|
| 0 | `/learn/{course}` |
| 10 / 15 / 20 / 30 | `/spoc/learn/{course}` |

实测该账号 6 门课的 mode 分布：MOOC 2 门（mode 0），SPOC 4 门（mode 10、15、15、20）。
因此后台任务拼地址时必须读 `mode`，不能假定是 `/learn/`。

## 2. 课程层级

```
课程（termId）
└── 章节 chapters[]
    ├── units[]          视频、文档等学习单元
    ├── quizs[]          单元测验
    ├── homeworks[]      单元作业
    └── exam             考试
```

三种子节点的结构一致，都带 `id`、`contentId`、`contentType`、`test`：

| 字段 | 说明 |
|---|---|
| `contentType` | 1 视频、2 测验、3 作业 |
| `contentId` | 对应测验或作业的 tid |
| `test` | 该节点的业务信息，含 `id`、`name`、`type`、`deadline` 等 |

取 tid 用 `test.id`，它等于 `contentId`。

## 3. 节点类型常量

```js
LESSON_TYPE_QUIZ: 2,       // 测验
LESSON_TYPE_HOMEWORK: 3,   // 作业

LESSONUNIT_VIDEO: 1,
LESSONUNIT_VIDEO_SRT: 2,
LESSONUNIT_PDF: 3,
LESSONUNIT_TEXT: 4,
LESSONUNIT_QUESTION: 5,
LESSONUNIT_DISCUSS: 6,
LESSONUNIT_LIVE: 7,
LESSONUNIT_COLUMN_CONTENT: 8,
LESSONUNIT_RELATED_LIVE: 9,
```

## 4. 发布状态（教师视角）

```js
CHAPTERSTATUS_CREATE: 0,     // 未发布
CHAPTERSTATUS_PUBLISHED: 1,  // 已发布
CHAPTERSTATUS_MODIFIED: 2,   // 已修改
CHAPTERSTATUS_DELETED: -1,   // 已删除
```

节点上的 `testDraftStatus` / `draftStatus` 取这些值。这是**教师端**的发布状态，
与学生的完成情况无关，不要用它判断学生做没做。

## 5. 学生待办（扩展判断的依据）

**待办由课程结构派生，不另取接口。**

`courseBean.getLastLearnedMocTermDto(termId)` 一次返回该课程的全部章节，
每章挂 `quizs` / `homeworks` / `exam`。每个单元项里的 `test` 对象带齐了
判断所需的一切：

| 字段 | 用途 |
|---|---|
| `id` / `name` | 标识与显示 |
| `deadline` | 提交截止 |
| `evaluateStart` / `evaluateEnd` | 互评窗口 |
| `evaluateScoreReleaseTime` | 成绩发布时间 |
| `usedTryCount` | 做没做（大于 0 即已提交） |
| `userScore` / `totalScore` | 有没有分、满分多少 |
| `enableEvaluation` / `evaluateJudgeType` | 是否带互评（2 互评、3 自评） |

因此「该做什么、能不能自动做」只需每门课一个请求，不需要逐项去查。

### 为什么不用 TermBean.getNewestItems

平台上确实存在一个名字更像「待办」的接口：

```js
s._$getNewestItems = function (e) {
  this._$postDWR({ url: 'TermBean.getNewestItems', param: [e] });
};
```

它返回的 `upcoming` 以待办类型为键（`needSubmitQuiz` / `needSubmitHomework` /
`needEvaluateHomework` / `needSubmitExam` / `needEvaluateExam`），
每类最多一项，字段只有 `testId`、`name`、`chapterName` 与两个截止时间。

**问题在于它没有 `submitted` 之类的完成标记。** 实测把已经提交过的测验
也列在 `needSubmitQuiz` 下——照着它做待办，会得出「已经交过的还在待交」
这种结论，而用户无从判断。

它还有个更隐蔽的限制：每类只给最近一项。同一门课里有两个待提交作业时，
只会返回截止更早的那个，另一个不会出现。

**结论**：待办从课程结构派生。多花一个请求，换来的是判据完整。

## 6. 单个单元的状态

由 `test` 对象的字段直接判定，不需要额外请求：

| 状态 | 判据 |
|---|---|
| 未提交 | `usedTryCount === 0` 且 `userScore == null` |
| 已过截止未提交 | 同上，且 `deadline < now` |
| 互评阶段 | 已提交，且 `evaluateStart <= now <= evaluateEnd` |
| 等待互评完成 | 已提交，互评窗口已过，尚无分数 |
| 成绩已公布 | `userScore != null` |

**成绩是否公布看 `userScore`，不看阶段。** 测验没有互评流程，其阶段字段
永远为空；若用阶段判断，测验拿到分数后仍会被显示成「已提交」，
与作业的口径不一致。

作业所处阶段由 `$currentEvaluatePhase` 按时间计算，见 [mooc.md](mooc.md) 第 7.3 节：

```js
now < deadline                     -> 1 提交期
now >= evaluateScoreReleaseTime    -> 3 成绩期
否则                                -> 2 互评期
```

互评配额（还差几份）需要单独查询，见 [mooc.md](mooc.md) 的互评一节。


## 7. 对扩展的含义

| 功能 | 适用类型 | 依据 |
|---|---|---|
| 自动作答 | 仅单元测验 | 作业题为主观题，无可自动填写的答案 |
| 自动互评 | 单元作业 | 处于互评期且本人未评完配额 |
| 自动自评 | 单元作业 | 处于互评期且自评未提交 |
| 截止提醒 | 测验、作业、考试 | 提交截止与互评截止 |
| 得分指导展示 | 单元作业 | `subjectiveQList[].judgeDtos[]` |

课程结构给出「有没有事要做、能不能自动做」，互评配额给出「还差几份」。
两者合起来足以排出一轮要执行的全部事项，不需要第三处判断。
