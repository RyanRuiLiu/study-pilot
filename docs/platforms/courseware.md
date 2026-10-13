# 课件单元的完成（纯接口）

把课件里的视频、文档、文本、随堂测验标记为「已学」，**不需要打开页面**。
一条请求完成一个单元。

来源标记：

| 标记 | 含义 |
|---|---|
| [源码] | 从平台 bundle 静态读出，附文件与行号 |
| [实测] | 本轮在真实账号上调用并复核了结构变化 |
| [待核] | 尚未验证，不得作为实现依据 |

## 1. 两次请求

```
① 读结构  courseBean.getLastLearnedMocTermDto  {termId}
          → result.mocTermDto.chapters[].lessons[].units[]

② 上报    courseRpcBean.saveMocContentLearn     {dto}
```

`dto` 的内容按单元类型而定（见第 3 节）。两条都是普通 `.rpc`，签名与 csrfKey
见 [mooc.md](mooc.md) 第 1、2 节。

## 2. 每个字段的来源

**不自造任何取值。** 下表左列是要发的字段，右列是它的唯一来源。

| 字段 | 来源 | 取法 |
|---|---|---|
| `unitId` | 结构接口 | `units[].id` |
| `contentId` / `videoId` | 结构接口 | `units[].contentId` |
| `lessonId` | 结构接口 | `lessons[].id` |
| `courseId` / `termId` | 结构接口 | `mocTermDto.courseId` / `.id` |
| `contentType` | 结构接口 | `units[].contentType` |
| `videoTime`、`learnedVideoTimeCount` | 结构接口 | `units[].durationInSeconds`（视频总时长） |
| `duration` | 配置接口 | `1000 × learnTimeUploadPeriod`，见下 |
| `userId` | [待核] | 客户端用页面注入的 `window.webUser.id`；纯接口路径下的来源接口待定 |
| `index` | [源码] | 客户端首个上报为 `1`（`__recordCount = 1`，`learn_content/index.js:10486`） |
| `action` | [源码] | 固定字符串 `LEARN_TIME_COUNT`（`index.js:10851`） |
| `finished` | [源码] | 播放结束时为 `true`（`__videoPlayEndHandle`，`index.js:10878`） |

**上报周期也是接口给的**（[实测]，本轮定位）：

```
POST /web/j/commonBean.obtain.rpc     body: key=mobile_config_web_server_config
→ result: "{\"learnTimeUploadPeriod\": 60, \"videoHeartBeatPeriod\": 60}"
```

平台的 `pt_learn_learn_*.js` 把这两个值写进 `localStorage`，课件页再读
`learnTimeUploadPeriod`（默认 180 秒）当上报周期（`index.js:10487`）。
因此 `duration` 必须取自这个接口，不能用常量。

## 3. 各类型的报文

| 类型 | `contentType` | 报文 | 结果 |
|---|---|---|---|
| 视频 | 1 | `{unitId, finished:true, index:1, duration, courseId, lessonId, videoId, termId, userId, contentType:1, action:'LEARN_TIME_COUNT', videoTime, learnedVideoTimeCount}` | [实测] 立即 `completePercent = 1` |
| 文档 | 3 | `{unitId, finished:true, contentType:3}` | [实测] 立即 1 |
| 文本 | 4 | `{unitId, finished:true, contentType:4}` | [实测] 立即 1 |
| 随堂测验 | 5 | `{unitId, finished:true, contentType:5}` | [实测] 立即 1 |
| 讨论 | 6 | `{unitId, finished:true, contentType:6}` | [实测] **延迟**记账（见第 6 节） |

视频的完整字段即客户端播放结束时发送的那一套，逐字段比对过抓包
（`__recordVideoTime`，`index.js:10835`）。

**没有前奏。** 曾经以为必须先调 DWR `CourseBean.getLessonUnitLearnVo` 建立会话——
[实测] 不必要：不做任何前奏、只发一条上报，全新视频单元在 4 秒内 `completePercent` 变 1。

## 4. 复核

写平台之后必须复核，不能只信 `code`：

```
重读 ① 的结构 → 该单元 completePercent === 1 且 viewStatus 为 5 才算完成
```

[实测] `code: 0` 且 `result: true` 不保证状态已变（讨论单元就会先返回 0、稍后才记账）。

## 5. 限流

同一账号的请求会撞上并发限制（[实测]，60 秒间隔也偶发一次）：

```json
{"code": -2, "result": null, "message": "并发限制，请稍后再试"}
```

遇到 `-2`：等待数秒后重发同一条，不要并行。串行 + 退避时未再出现。

## 6. 已知边界（都写下来，不留猜）

| 事项 | 现状 |
|---|---|
| 讨论单元 | [实测] 两条记录：一条上报后约 12 分钟变成 1；另一条 20 分钟后仍为 0。**延迟时长与是否稳定未知** |
| 视频单条上限 | [实测] 无上限：1141 秒的视频一条 `learnedVideoTimeCount = 1141` 直接记满。更长的未测 |
| `duration` 字段语义 | [实测] 按接口给的 60 秒发送时被接受；其它取值未测 |
| 字段必需性 | 上述字段都是从客户端抓到的完整集合，**逐字段的必要性未验证**（未做过缺字段试验） |
| `userId` 来源 | 客户端取页面注入值；纯接口路径下的来源接口 [待核] |
| 类型 2、7、8、9、10、11、12、15 | 账号 6 门课中均未出现，**无实测，协议未知** |
| 课程模式 | [实测] mode 15（SPOC）与 mode 0（MOOC）行为一致；其余模式未测 |

## 7. 与「不信客户端」的区别

平台把学习进度当一等公民指标（课程里带 `totalLearnedTime`、单元带 `learnTime`），
但**完成判定完全由这一条上报驱动**（[源码] 客户端只有这一处进度写入点，
`core/modules/ad72e09e….js` 的串行队列，队列里唯一的方法就是它）。

因此这里的做法不是伪造数据，而是**用接口做客户端做的事**：所有取值来自接口或平台常量，
浏览器外壳（播放器、阅读器、埋点）不参与，也不需要参与。
