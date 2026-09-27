# 架构

## 1. 分层

```
apps/extension          浏览器扩展：装配、页面内的功能、后台任务
        |
        v
packages/platform-mooc  平台领域层：接口、类型、业务规则
        |
        v
packages/transport      HTTP 协议层：签名、csrfKey、节流、DWR、错误分类
        |
        v
packages/core           纯函数：MD5、Result 类型
```

依赖方向严格单向，下层不感知上层。

### core

只放与平台、环境都无关的纯函数：MD5 与 Result 类型。

不允许出现浏览器 API、`fetch`、任何具体平台的字段名。

### transport

知道「请求如何发出去」，不知道「请求的业务含义是什么」。
包含签名算法、csrfKey 拼接、出站节流、DWR 协议、错误分类与重试策略。

不认识课程、测验、作业、互评这些概念。运行环境只要求 `fetch`，
不读取 cookie —— 凭证通过 `getToken` 由调用方注入。

### platform-mooc

知道「MOOC 的接口长什么样、业务规则是什么」。
包含端点清单、领域类型、状态判定、答案构造、评分项构造。

不含任何 DOM 操作。页面结构契约记录在
[docs/platforms/mooc.md](platforms/mooc.md)，由 app 层的功能代码使用。

### apps/extension

装配层。入口文件只做接线。

## 2. 后台的运行模型

### 2.1 三个阶段，边界分明

```
浏览器启动
  ├── 判断   读本地快照，决定值不值得拉最新数据
  │          多数启动到此结束，一个请求都不发
  │
  ├── 拉取   发请求。判断「该做什么」必须基于刚拉回的数据
  │
  ├── 执行   计划里有能自动完成的事才做。唯一会写平台的地方
  │
  └── 提醒   报「做完之后还剩什么」
```

**读取与执行分开**是这套设计的核心。两者的代价与风险完全不同：

| | 读取（检查有什么要做） | 执行（真去写平台） |
|---|---|---|
| 请求 | 每门课一个 | 每项一至三个 |
| 风险 | 无 | 不可逆 |
| 频率 | 每次启动 | 只在确实有可做时 |

混在一个函数里会让频率调节无从下手：为了保护写入而限制整体频率，
读取也跟着变慢；而读取慢了，发现新作业就晚。

### 2.2 本地快照的作用

`src/background/snapshot.ts` 存上一次读到的状态。它只用于一件事：
**在不发请求的前提下判断「值不值得去拉」**。

- 它说「没事」→ 可以不去拉（省请求）
- 它说「有事」→ 必须拉回来确认
- 它从不直接用于通知，通知只报确认过的事实

原因是它记录的是过去某一刻：你可能在别处做过、老师改过截止、配额变了。
尤其执行是不可逆的，不能拿过期数据去写平台。

**每天至少拉一次**，这是发现新作业的唯一手段 —— 本地快照永远不知道
今天多了什么。

### 2.3 手动与自动走同一条路径

打开弹窗、打开设置页、点「执行」都是用户主动表达「现在要看/要做」，
因此无条件拉最新；浏览器启动时的自动执行才受「今天拉过没有」约束。

两条路径共用同一个 `loadSnapshot`，所以快照永远反映最近一次读取，
不会出现「弹窗看到的是新数据、启动判断用的是旧数据」。

### 2.4 功能开关参与计划派生

`derivePlan(snapshot, settings, now)` 必须结合开关：把某件事排进「自动」
意味着扩展会去做，而这只有在对应开关打开时才成立。

关掉的项移入「人工」而不是被丢掉 —— 那件事仍然没做，只是从
「扩展代劳」变成「自己动手」。这一点若处理错，用户既收不到提醒
（因为它被当作自动项），也不会去动手。

## 3. 关键设计决策

### 3.1 拆出独立的 transport 包

上一代实现把签名、节流、接口调用、业务判定放在一个包里，
结果是「改签名会影响业务逻辑的改动范围」。

拆开之后有一条清晰的分界：**协议可以脱离平台测试**。
`transport` 的测试里没有一个真实网络请求，全部用假 `fetch` 完成。

### 3.2 用 Result 而不是异常表达失败

平台接口的失败是常态：未登录、课程不存在、测验已过期、被限流。
这些都是预期内的分支。

把失败放进返回值之后，调用方不会因为漏写 `try/catch` 而把
「业务失败」和「代码崩溃」混为一谈。异常只保留给真正的编程错误。

### 3.3 凭证由调用方注入

`transport` 不读取 cookie。原因有二：

1. 同一套协议层要能同时跑在浏览器（读 cookie）与 Node（读测试夹具）里；
2. 凭证来源是宿主环境的知识，不是协议的知识。

`apps/extension/src/platform/mooc-session.ts` 负责读取，
`createMoocClient` 通过 `getToken` 注入。

它还负责**会话恢复**：平台的会话凭证是会话级 cookie，关闭浏览器即失效，
而服务端在收到带凭据的请求时会用持久凭证换回会话。
因此 `ensureSession` 在发现没有会话时先发一次请求尝试恢复，
用户不必手动打开一次网页。

### 3.4 RPC 与 DWR 共享同一个节流器

平台的频率限制是全站统一的，`.rpc` 与 `.dwr` 共用一条配额。
若两个客户端各自持有节流器，实际出站速率会翻倍并触发限流。

`createMoocClient` 内部创建一个节流器实例，同时传给两个客户端。
这是一条容易被后续改动破坏的约束，改 `client.ts` 时需要留意。

### 3.5 不改写 Origin 就发不出请求

平台的 `.rpc` 按 `Origin` 判别来源，扩展来源一律拒绝。
因此扩展用官方 API `declarativeNetRequest` 的 `modifyHeaders`
在请求发出前改写 `Origin` 与 `Referer`。

两点容易踩：

- 需要 `declarativeNetRequestWithHostAccess` 权限，基础权限不能改请求头；
- 规则**不能限定资源类型**。后台 service worker 发起的 `fetch` 常被归为
  `other`，而限定 `xmlhttprequest` 的规则不匹配它，规则装上了却不生效，
  表现为平台回「非法跨域请求」。细节见
  [development.md](development.md)。

### 3.6 不做平台抽象层

当前只有一个平台。为假想中的第二个平台预先设计 `PlatformAdapter`
这类通用接口，只会得到一层没有真实用例检验的抽象。

多平台扩展的做法是新增 `packages/platform-<name>`，
`apps/extension` 按 URL 决定注入哪个内容脚本。等第二个平台真正出现时，
再从两个实现里提炼共性。

### 3.7 自实现 MD5

Web Crypto 不提供 MD5，而签名需要它。因此 `core` 里有一份自实现。

正确性由交叉验证保证：`sign.test.ts` 对 13 组输入
（含多字节字符、跨 64 字节分块边界、超长输入）比对 `node:crypto` 的结果。

### 3.8 节流器首请求不等待

节流器内部用 `null` 而不是 `0` 表示「尚未发出过请求」。
用 `0` 作初值会导致首个请求平白等待一整个间隔。
这个缺陷是测试发现的，而非人工复查发现的。

## 4. 目录结构

```
apps/extension/
  entrypoints/
    background.ts              后台装配：消息路由、启动流程
    mooc.content.ts            MOOC 内容脚本装配
    options/                   设置页
    popup/                     弹窗
  src/
    background/
      scheduler.ts             运行状态：中断标记、挂起标记
      snapshot.ts              本地快照的结构与存取
      inspect.ts               读取：拉最新数据生成快照
      task-plan.ts             派生：由快照算出该做什么（纯函数）
      execute.ts               执行：只写不判断
      reminder.ts              通知：组织内容与发出
      work-status.ts           由快照字段推出展示状态
      to-messages.ts           内部结构转消息格式
      net-rules.ts             出站请求头规则
    features/                  页面内功能
      panel.ts                 浮动面板
      quiz-helper.ts           做题助手
      homework-panel.ts        作业面板
      homework-answers.ts      得分指导注入
      deadline.ts              截止时间文案
      quiz-stage.ts            作答页阶段判定
      format.ts                格式化
    platform/
      mooc-session.ts          凭证读取与会话恢复
      mooc-url.ts              路由解析
      messaging.ts             消息类型
    settings/                  配置结构与存储
  public/icon/                 扩展图标

packages/core/
  src/md5.ts                   MD5 实现
  src/result.ts                Result 类型

packages/transport/
  src/sign.ts                  签名算法
  src/throttle.ts              出站节流
  src/rpc.ts                   .rpc 客户端
  src/dwr.ts                   DWR 协议与参数编码器
  src/errors.ts                错误分类

packages/platform-mooc/
  src/endpoints.ts             端点清单（标注证据等级）
  src/types.ts                 领域类型
  src/client.ts                领域客户端装配
  src/courses.ts               课程列表
  src/structure.ts             课程结构与状态判定
  src/quiz.ts                  测验：取卷、题库、答案构造
  src/review.ts                作业与互评

scripts/probe/                 探测与自检工具链，见其 README
```

## 5. 测试策略

### 5.1 三个层次

| 层次 | 方式 | 覆盖 |
|---|---|---|
| 协议层 | 假 `fetch`，断言请求构造与响应分类 | transport 全部模块 |
| 算法层 | 交叉验证与边界断言 | MD5、签名、节流 |
| 领域层 | 真实样本回放 | 答案匹配、课程结构判定 |
| 计划层 | 纯函数断言 | 什么该自动做、什么该交给用户 |

### 5.2 样本回放

领域测试用合成的结构样本（见 `packages/*/test/`），验的是「按 id 能否匹配上」
这类结构性质。抓取的真实接口数据不入库——它不属于本项目，也可能带着账号痕迹。
平台改版导致数据形状变化时测试会变红，而不是等到用户发现功能失效。

典型例子：`buildAnswers` 的测试断言「试卷上的每一道客观题都能在题库中命中」。
这个断言建立在真实试卷与真实题库之上，一旦题干格式变化就会失败。

样本已脱敏：身份字段替换为固定占位值，保留结构 id。

### 5.3 界面自检

`scripts/probe/` 下有若干自检脚本，验证的是**实际渲染结果**而非源码：

| 脚本 | 验证 |
|---|---|
| `check-classes.mjs` | 用到的类名是否都有样式 |
| `check-copy.mjs` | 文案是否与功能一致 |
| `check-toc.mjs` | 左侧导航与分区是否对应 |
| `check-control-styles.mjs` | 同类控件的实际尺寸是否一致 |
| `check-detail-links.mjs` | 明细链接的每一段是否正确 |
| `selfcheck.mjs` | 后台接口返回与界面渲染是否一致 |

这类问题（两份 CSS 规则各自都"对"、但渲染出来不一致）靠读源码发现不了。
