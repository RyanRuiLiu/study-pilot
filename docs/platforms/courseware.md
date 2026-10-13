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

## 3. 各类型的行为

目标不是「把标记刷成完成」，而是**留下与真人一致的记录**。认证成绩页上每种类型
显示的东西不同（视频「观看时长」、文档「浏览时长」、随堂测验作答、讨论「回复数」），
因此每种类型的做法也不同：

| 类型 | 真人在页面上做的事（源码） | 我们做的事 | 平台记录 | 状态 |
|---|---|---|---|---|
| 视频 1 | 播放；每 60 秒上报一次（位置＋本次学时）；播完报 `finished`（`index.js:10485/10835/10878`） | 一条上报：位置＝时长，本次学时＝时长 | 观看时长、完成 | [实测] 立即完成，观看时长＝整段时长 |
| 文档 3 | 阅读器逐页翻；每次翻页上报页码＋停留秒数（`__recordTextPage`） | 逐页上报，每页声明 `SECONDS_PER_PAGE` 秒 | 浏览时长、进度＝页码/页数 | [实测] 7 页 PPT：pct 1/7→7/7，浏览时长 4 分钟（真实仅 20 秒） |
| 文本 4 | 打开即完成（`RichTextUnit.__reset`） | 一条完成上报 | 仅完成 | [实测] 立即完成 |
| 随堂测验 5 | 打开即完成；点「提交」把答案填进 `paperDto` 调 `mocQuizRpcBean.submitAnswers` （`TestUnit`） | 取卷＋题库组答案→提交答卷→补完成上报 | 完成＋作答记录 | [已接线，待实测] |
| 讨论 6 | 打开即完成；发一条回复（`AddReply` → DWR `MocForumBean.addReply`） | 发一条回复（固定文案）→完成上报 | 完成＋回复数 | [实测] `replyCount` 0→1，单元同时完成 |

**没有前奏。** 曾经以为必须先调 DWR `CourseBean.getLessonUnitLearnVo` 建立会话——
[实测] 不必要：不做任何前奏、只发一条上报，全新视频单元在 4 秒内 `completePercent` 变 1。
该 DWR 只在**文档**里用于取总页数（`textPages`，`.rpc` 侧没有等价字段）。

### 3.1 讨论回复的报文

第二个参数不能省：只发 `c0-param0` 时服务端回
`java.lang.IllegalArgumentException: Missing method or missing parameter converters`。

```
c0-e1=number:<postId>
c0-e2=string:<p>回复内容</p>
c0-e3=number:0
c0-param0=Object_Object:{postId:reference:c0-e1,content:reference:c0-e2,anonymous:reference:c0-e3}
c0-param1=Array:[]        ← 编辑器图片附件，无图时为空数组（源码 `_$formatEditorUrlsGids`）
```

### 3.2 文档每页的报文

```
{unitId, contentType:3, finished: 当前页==总页数, index: 页序-1, pageNum, lastLearnTime, learnedVideoTimeCount: 每页声明秒数}
```

时长字段是**平台信任的声明值**，不是真实间隔（第 6 节）。

## 4. 复核

写平台之后必须复核，不能只信 `code`：

```
重读 ① 的结构 → 该单元 completePercent === 1 且 viewStatus 为 5 才算完成
```

[实测] `code: 0` 且 `result: true` 不保证状态已变（讨论单元就会先返回 0、稍后才记账）。

## 5. 限流

平台的限制是**全站统一**的（读写共享一条配额），因此所有出站请求都走同一个
节流器：`transport/throttle.ts`，串行 + 默认 200 ms 间隔（实测：0 ms → 5 次成功 2 次，
200 ms → 5/5）。命中并发限制时 RPC 层自动退避重试：

```json
{"code": -2, "result": null, "message": "并发限制，请稍后再试"}
```

**业务代码里不写等待。** 课件行为一律经 `client.rpc.call` / `client.dwr.call`，
节流与重试都在那一层。绕开客户端直接发请求（例如用裸 `fetch` 做验证）时才会撞 `-2`。

## 6. 已知边界（都写下来，不留猜）

| 事项 | 现状 |
|---|---|
| 时长是否需要真实等待 | [实测] 不需要。平台记的是**上报声明的秒数**：7 页各报 30 秒、真实只花 20 秒，平台记 4 分钟。真实需要的只是请求间隔，而间隔由共享节流器负责 |
| 时长可否重复叠加 | [实测] 可以，平台是累加式的（真人重看也一样）。同一单元多次上报会让观看时长超过视频本身长度，属平台自身口径 |
| 讨论单元 | [实测] 发回复后 `replyCount` 0→1 且单元完成；另有两条只上报的案例是延迟入账（约 12 分钟／20 分钟后仍未入账）。**延迟时长与是否稳定未知** |
| 视频单条上限 | [实测] 无上限：1141 秒的视频一条 `learnedVideoTimeCount = 1141` 直接记满。更长的未测 |
| `duration` 字段语义 | [实测] 按接口给的 60 秒发送时被接受；其它取值未测 |
| 随堂测验作答 | [源码] 与单元测验同一套提交接口；本实现已接线并有测试，**尚未在真实账号上跑过** |
| 类型 2、7、8、9、10、11、12、15 | 账号 6 门课中均未出现，**无实测，协议未知**（不在行为清单里，遇到会跳过） |
| 课程模式 | [实测] mode 15（SPOC）与 mode 0（MOOC）行为一致；其余模式未测 |

## 7. 与「不信客户端」的区别

平台把学习进度当一等公民指标（课程里带 `totalLearnedTime`、单元带 `learnTime`），
但**完成判定完全由这一条上报驱动**（[源码] 客户端只有这一处进度写入点，
`core/modules/ad72e09e….js` 的串行队列，队列里唯一的方法就是它）。

因此这里的做法不是伪造数据，而是**用接口做客户端做的事**：所有取值来自接口或平台常量，
浏览器外壳（播放器、阅读器、埋点）不参与，也不需要参与。
