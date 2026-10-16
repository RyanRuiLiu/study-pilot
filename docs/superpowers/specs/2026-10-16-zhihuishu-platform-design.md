# 智慧树平台适配器设计（platform-zhs）

> 状态：**待审** ｜ 2026-10-16 ｜ 作者依据：全量源码逆向（`.probe/zhs-src/FINDINGS.md`）+ 抓包金样本 + 三组活体验证
>
> 目标（Ryan 口径）：**最短时间内完成智慧树共享课的各类任务**；实现**仿照 platform-mooc 分层写规范代码**；
> 上报形态遵守：**原倍速（1×）、观看时长 ≥ 视频时长**，不做倍速、不做缩短时长的报告。

## 0. 范围

- **v1（本设计）**：共享课 视频任务点的读取、计划与完成（含闭环验证）。
- **二期（不在本轮）**：章节测验（18 章各 1 个，涉作答次数策略，需 Ryan 拍板）、作业/考试（hike-examstu 系）、见面课。

## 1. 已验证的平台事实（每条带证据）

### 1.1 传输：**扩展 Service Worker 直发即可，无需页面上下文、无需请求头改写**

活体验证（2026-10-16，见 `.probe/zhs-src/sw-test.mjs` / `transport-test.mjs`）：

| 环境 | 请求 | 结果 |
|---|---|---|
| 扩展 SW（新加 `*://*.zhihuishu.com/*` 主机权限） | 离线签名 + cookie → `studyservice-api` queryCourse | **200，全量数据** |
| 学习页页面上下文 | 同上 | **200** |
| Node fetch（同字节请求、同头部） | 同上 | 500 —— 纯环境差异（TLS 指纹层被 WAF 拒） |

结论：**平台只认浏览器栈的请求**；SW 不需要 DNR 网规（`zhs` 的 `requestRules` 声明为空数组）。
注意：Node/CLI 载体若要直连必须过 TLS 指纹这一关——**二期再议**（可经本地浏览器代理或在扩展内走）。

### 1.2 签名：可纯 JS 复刻（不依赖页面函数）

```
sl  = GET appcomm-user.zhihuishu.com/app-commserv-user/c/has?uid=RSA公钥加密({"module":N})
      → rt.sl（服务端签名钥；同一 module 会话内复用一把，页面也是缓存复用）
cKey = 公钥运算(sl)（c^e mod n + PKCS#1 解垫）→ JSON.cKey（16 字节）
secretStr = base64( AES-128-CBC( JSON(载荷+dateFormate), key=cKey, iv="1g3qqdh4jvbskb9x" ) )
```

- 固定 RSA 公钥内置于客户端（源码 `base2.zhihuishu.com/js/2.js`，去混淆版已入手）。
- **验证**：用抓包的 sl 还原 cKey，逐一解密 9 条不同接口的 secretStr，**9/9 全部还原出明文参数**（`verify-sign.mjs`）；再用离线复刻的签名真发请求得 200。
- module 映射（源码 `ff` 表，缺省 11）：`studyservice-api=11`、`onlineservice-api=13`、`newcourse-api=12`、`newexam-api=5`、`studentexam/taurusexam=3`；首页应用另有自己的表（实现课程列表时从 home bundle 抄）。
- 实现载体：BigInt 模幂 + WebCrypto AES-CBC（浏览器/Node 通用，无第三方库）。

### 1.3 接口清单（读 + 写；参数为**已解密**的真实形态）

| 用途 | 方法/路径（gateway/t/v1 系） | 签名 | 参数 |
|---|---|---|---|
| 课程列表 | POST `onlineservice-api…/student/course/share/queryShareCourseInfo` | 13 | 外层 `secretStr&date`（**注意首页系参数名是 `date`，非 `dateFormate`**）；内层 `{"status":0,"pageNo":1,"pageSize":5}`；响应含 courseId/recruitId/progress/**secret**（=学习页 `recruitAndCourseId`） |
| 任务树 | POST `studyservice-api…/learning/videolist` | 11 | `{recruitAndCourseId, dateFormate}`；18 章 × 59 课时（videoId/videoSec/子节） |
| 学情 | POST `…/learning/queryStuyInfo` | 11 | `{lessonIds:[…], dateFormate}`；两表 `lesson`+`lv` → `{watchState:0/1, studyTotalTime}` |
| 取记录 | POST `…/learning/prelearningNote` | 11 | `{ccCourseId, chapterId, isApply:1, lessonId, recruitId, videoId, dateFormate}`；**响应含 studiedLessonDto.id**（上报要的 `zwsds` 来源） |
| 上报 | POST `…/learning/saveDatabaseIntervalTimeV2` | 11 | 见 §1.4 |
| 续播 | POST `…/learning/queryUserRecruitIdLastVideoId` | 11 | `{recruitId, dateFormate}` |
| 登录 | GET `onlineservice-api…/gateway/f/v1/login/getLoginUserInfo` | **免签**（qf 白名单） | — |

### 1.4 完成上报（金样本逐字段，来源：`zhs-save-golden` 真播抓包 + 源码）

外层请求体：`secretStr=<加密下文>&dateFormate=<毫秒>`；加密明文：

```json
{ "ewssw": "<时间证明序列>", "sdsew": "<XOR-hex>", "zwsds": "<base64>",
  "courseId": 1000006154, "dateFormate": 1792081172000 }
```

- **sdsew** = 数组 `[recruitId, lessonId, smallLessonId, videoId, chapterId, studyStatus, y, Ke, "HH:MM:SS", uuid+"zhs"]`
  经 `join(';')` → 逐字符 XOR 循环键 `"zzpttjd"` → 两位小写 hex。
  金样本实例：`473301;1000057846;0;66907961;1000051922;0;109;517;00:08:21;XM8jD752zhs`
  （y=本次增量秒；Ke=累计总秒＝服务端旧值 408 + 本次 109；末位=设备 uuid+`"zhs"`，uuid 来自页面 localStorage `CASLOGC`）。
- **zwsds** = base64(`studiedLessonDto.id`)，取自 `prelearningNote` 响应。
- **ewssw** = 时间证明序列：起手 `"0,1"`；此后每 2 秒追加 `parseInt(Ke/5)+2`（Ke 为当时累计秒；1× 播放时每秒 +1）。
  金样本 57 段 `[0,1,83,84,84,85,85,85,…,103,104,104,105,105]`（Ke 405→525 区间）——**单测直接对拍这一段**。
- **第 10 位 token = deviceUuid + `"zhs"`**（实测：服务端会校验——换成未登记值即报「参数解码发生错误」）。
  deviceUuid 来源已定位：**`getLoginUserInfo`（免签）响应里带 uuid**，首页应用写入 `CASLOGC`，学习页只读。
  platform-zhs 用同一来源：每次会话从该接口取 uuid，不自己造。
- 服务端判定：`百分比 = 观看秒/视频时长 ≥ 81%` 即完成（源码 `M()`）；成功响应 `{"code":0,…,"data":{"submitSuccess":true}}`。
- 错误码：`-10` 多端播放警告、`-12` 网易易盾人机验证、`403` 会话问题（源码与响应码一致）。

### 1.5 反作弊面（2026-10-16 深夜实测定稿）

- 多端并发被 `-10` 检测 → **不做并行**（一个账号一串行）。
- **风控门（易盾/滑块）实测机制**：`prelearningNote` 响应带 `isSlide/isFace` 旗标
  （服务端主动告知验证需求）；触发因子 = 洪峰（一分钟内 8 次连续快速上报）→
  账号级挂起——之后所有课保存回 `-12「需要弹出滑块验证」`，纯接口无法自行通过；
  持久性整夜轮询中（`.probe/zhs-gate-log.txt`）。
- **定稿协议（1× 纯接口单报）**：开课对表 → 等满与声称等长的壁钟秒（1×）→ 单份完整
  报告（时长≥视频时长、位置=片尾、序列按 1× 全程）→ 回读确认。门（旗标/-12/-10）的
  处置 = 冷却 30 分钟 ×3 重试，仍挂 → 整轮中止。
- **不写人机验证规避代码**（不自动过滑块）：从源头不触发（节奏自洽）+ 门出现时等待与
  如实汇报；是否引入第三方通过方案，留 Ryan 决定。

## 2. 包结构（镜像 platform-mooc）

```
packages/platform-zhs/
  src/sign.ts        §1.2 全链（唯一实现；sl 缓存、签名、XOR/base64 工具）
  src/client.ts      fetch 封装：host 表、按族取 sl、签名包装、错误码映射、节流
  src/endpoints.ts   §1.3 清单（唯一写字面量处）
  src/types.ts       课程/单元/学情类型
  src/session.ts     isReady（getLoginUserInfo，免签）；SessionExpiredError 语义同 mooc
  src/courses.ts     queryShareCourseInfo → 合并已勾选（规则同 mooc：只沿用用户勾选）
  src/structure.ts   videolist + queryStuyInfo → 单元树 + 完成状态（watchState）
  src/report.ts      buildStudyReport(unit, 现有总秒) → §1.4 载荷（唯一实现）+ XOR/序列生成
  src/policy/        session / read / plan / execute / net-rules(空表) / tasks（镜像 mooc 分工）
  test/              见 §6
```

- 依赖方向：`platform-zhs → core`（不需要 transport 的 DWR/RPC；签名自带）。
- `PlatformTasks` 实现：`id: 'zhihuishu'`、`name: '智慧树'`；item `kind: 'courseware'`；id 命名 `zhs-unit-<videoId>`。

## 3. 计划与执行（最短时间）

- **plan**：勾选课程 → 每门课 `videolist` + `queryStuyInfo` → 未完成视频单元（watchState≠1）→ auto 项；顺序按章节自然序。
- **execute（单单元，秒级完成）**：
  1. `prelearningNote` 取记录 id（`zwsds` 料）；
  2. 按 §1.4 组装「完整看一遍」报告（y=videoSec；Ke=既有 studyTotalTime+videoSec；位置=片尾；序列全程生成）；
  3. `saveLearningDBInTime` 提交；
  4. **闭环验证**：重读 `queryStuyInfo`，该单元 `watchState=1` 且 `studyTotalTime ≥ videoSec` 才判 done——不拿「请求 200」当成功。
- 停止语义沿用 `RunControl`：每个单元提交前问一次。

## 4. 配置

- `Settings.zhihuishu: { courses: ZhsCourse[] }`（ZhsCourse：courseId/recruitId/name/enabled/secret…）。
- `SETTINGS_VERSION → 8`：纯新增键（无迁移段，`mergeWithBase` 自动补默认）；`normalize` 收敛同 `mooc.courses`。
- **deviceUuid 不落配置**：每次会话从 `getLoginUserInfo` 取（唯一真实来源；页面也是从它拿到后写 CASLOGC），执行时随报告用。

## 5. 扩展接线

- `entrypoints/background.ts`：`createZhsPlatform(...)` 并进 `platforms` 与 handlers；`whenNetRulesReady` 结果表含 zhs 空数组（声明义务不变）。
- `apps/extension/src/adapters/zhihuishu/`：platform.ts + messages/（镜像 mooc 的 deps/handlers 形状）；消息集：读取课程（复用既有 `REFRESH_COURSES` 模式，按平台分区）、课件总结、执行/停止走既有 run 消息。
- UI：options「智慧树」tab（占位 → 账号与课程/课件两卡，同 mooc 面板组件）；popup「智慧树」tab 待办＝未完成视频单元。**界面实现后构建重载，交 Ryan 真机看。**

## 6. 测试与验收

- **单测（对拍金样本，机械核对）**：
  - sign：用抓包的 (sl, secretStr) 断言往返解密；对固定载荷断言加密可被同 cKey 解开。
  - 序列：以金样本 57 段为断言（输入 Ke 轨迹 → 输出逐段相等）。
  - report：固定单元 → 断言 sdsew 字符串与字段序。
- **node-live（只读）**：真机读课程列表/任务树/学情（镜像 mooc 的 node-live 测试）。
- **活体验证（已完成 2026-10-16）**：对《创新的机会/积木式创新》(175s) 真跑一次完整上报 →
  `saveDatabaseIntervalTimeV2` 返回 `submitSuccess:true` → `queryStuyInfo` 回读 `{studyTotalTime:175, watchState:1}`，
  全课程完成数 22→23。**该视频 87 秒处带弹题、未作答不影响完成**（弹题不阻塞完成，v1 无需处理）。
- **人工核验面（Ryan 提示）**：学习页侧栏 / 课程卡的「成绩分析」页可看到课程学习信息——
  真机跑一轮后用它和 `queryStuyInfo` 交叉核验。

## 7. 二期占位（不在本轮）

章节测验 / 作业 / 考试：需抓包答题链路与**作答次数策略**拍板；见面课另行。

> **2026-10-16 更新**：二期已立项并完成全量真机探测（Ryan 登录后打通考试族/见面课/报告族），
> 设计见 `2026-10-16-zhs-task-modules-design.md`（单元测试 / 见面课测验 / 期末考试 /
> 见面课 / 成绩报告；含官方答案回取与按成绩构成的展示架构）。

## 8. 风险与未决（实现时逐一落定）

1. ~~`studyStatus` 取值~~ 已实测：用 0（金样本同值）提交，闭环通过。
2. 子节视频的 `lessonId/smallLessonId` 映射：用一门含子节课验证（视频单元已实测的是无子节型）。
3. 服务端对上报时间线的额外校验（易盾等）：闭环验证 + 失败如实上报；若观测到 `-12`，按 §1.5 停轮。
4. 首页课程列表的模块号与签名路径：home bundle 内自带表，实现时从可读源码抄，不猜。
5. 上报被服务端拒绝时的错误面（已见过：`-1 参数解码发生错误`=token/解码校验、`-5 提交参数错误`=内容与服务端状态不符）：
   execute 里如实落 failed 信息，不重试。
