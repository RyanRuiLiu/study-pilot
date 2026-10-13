# 架构

本文只写**为什么这样分层**。目录树、文件清单、调用流程不写在这里——它们是代码本身，
写一遍就多一份会过期的复述（规则由门禁守，见第 4 节）。

## 1. 分层

```
apps/extension          浏览器扩展：装配、页面内的功能、后台任务
packages/platform-mooc  平台领域层：接口、类型、业务规则
packages/transport      HTTP 协议层：签名、csrfKey、节流、DWR、错误分类
packages/core           纯函数：MD5、Result、FetchLike
```

依赖方向严格单向，下层不感知上层。`ai` 与 `transport` 平级、互不依赖：前者只认模型接口，
后者只认平台接口，两者都只依赖 `core`。**平台那份请求节流不适用于模型调用**——两个不同
服务，互不影响。详见 [ai.md](ai.md)。

| 层 | 知道什么 | 不知道什么 |
|---|---|---|
| `core` | 与平台、环境都无关的纯函数：MD5、Result、FetchLike | 浏览器 API、`fetch`、任何平台的字段名 |
| `transport` | 请求如何发出去：签名、csrfKey、出站节流、DWR、错误分类与重试 | 请求的业务含义；不读 cookie，凭证由调用方经 `getToken` 注入 |
| `platform-mooc` | MOOC 接口长什么样、业务规则是什么：端点、类型、状态判定、答案构造 | 任何 DOM。页面结构契约记在 [platforms/mooc.md](platforms/mooc.md)，由 app 层使用 |
| `apps/extension` | 装配。入口文件只做接线 | — |

**凭证由调用方注入**（而不是 transport 读 cookie）有两个理由：同一套协议层要能同时跑在浏览器
（读 cookie）与 Node（读测试夹具）里；凭证来源是宿主环境的知识，不是协议的知识。承载这件事的
[session.ts](../apps/extension/src/platform/mooc/session.ts) 还负责会话恢复：平台的会话凭证是
会话级 cookie，关闭浏览器即失效，而服务端在收到带凭据的请求时会用持久凭证换回会话，因此
`ensureSession` 在发现没有会话时先发一次请求尝试恢复，用户不必手动打开一次网页。

## 2. 后台的运行模型

### 2.1 三个阶段，边界分明

```
判断（读本地快照，多数启动到此结束，一个请求都不发）
  → 拉取（发请求。判断「该做什么」必须基于刚拉回的数据）
  → 执行（计划里有能自动完成的事才做。唯一会写平台的地方）
  → 提醒（报「做完之后还剩什么」）
```

**读取与执行分开**是这套设计的核心，因为两者的代价与风险完全不同：读取每门课一个请求、无风险、
每次启动都做；执行每项一到三个请求、不可逆、只在确实有事可做时做。混在一个函数里会让频率调节
无从下手——为了保护写入而限制整体频率，读取也跟着变慢；而读取慢了，发现新作业就晚。

### 2.2 本地快照只用于判断「值不值得去拉」

本地快照记录上一次读到的状态。它说「没事」可以不去拉（省请求），说「有事」必须拉回来确认；
它**从不直接用于通知**，通知只报确认过的事实。原因是它记录的是过去某一刻：你可能在别处做过、
老师改过截止、配额变了。尤其执行不可逆，不能拿过期数据去写平台。**每天至少拉一次**——本地
快照永远不知道今天多了什么，这是发现新作业的唯一手段。

### 2.3 手动与自动走同一条路径

打开弹窗、打开设置页、点「执行」都是用户主动表达「现在要看/要做」，因此无条件拉最新；浏览器
启动时的自动执行才受「今天拉过没有」约束。两条路径共用同一个加载入口，快照永远反映最近一次
读取，不会出现「弹窗看到的是新数据、启动判断用的是旧数据」。

### 2.4 功能开关参与计划派生

计划派生必须结合开关：把某件事排进「自动」意味着扩展会去做，而这只有在对应开关打开时才成立。
关掉的项移入「人工」而不是被丢掉——那件事仍然没做，只是从「扩展代劳」变成「自己动手」。这一点
若处理错，用户既收不到提醒（因为它被当作自动项），也不会去动手。

## 3. 关键设计决策

### 3.1 拆出独立的 transport 包

上一代把签名、节流、接口调用、业务判定放在一个包里，结果是「改签名会影响业务逻辑的改动范围」。
拆开之后有一条清晰分界：**协议可以脱离平台测试**，测试里没有一个真实网络请求，全部用假 `fetch`
完成。

### 3.2 用 Result 而不是异常表达失败

平台接口的失败是常态：未登录、课程不存在、测验已过期、被限流，都是预期内的分支。把失败放进
返回值之后，调用方不会因为漏写 `try/catch` 而把「业务失败」和「代码崩溃」混为一谈；异常只保留给
真正的编程错误。本规则有一个显式例外：`SessionExpiredError`（会话在服务端已失效）用异常穿越
「inspect → 各读取路径」的 Result 通道。原因：会话失效需要**按类型路由**到统一的续期重读编排，
而中途每一层都只把它当普通业务失败透传——逐层改签名让每层都认识这个失败，成本远高于一次被立即
捕获的类型化异常。它不能成为给其他失败改用异常的先例。

### 3.3 RPC 与 DWR 共享同一个节流器

平台的频率限制是全站统一的，`.rpc` 与 `.dwr` 共用一条配额。若两个客户端各自持有节流器，实际
出站速率会翻倍并触发限流。`createMoocClient` 内部创建一个节流器实例，同时传给两个客户端——这
是一条容易被后续改动破坏的约束。

### 3.4 不改写 Origin 就发不出请求

平台的 `.rpc` 按 `Origin` 判别来源，扩展来源一律拒绝。因此扩展用官方 API `declarativeNetRequest`
的 `modifyHeaders` 在请求发出前改写 `Origin` 与 `Referer`。两点容易踩：需要
`declarativeNetRequestWithHostAccess` 权限（基础权限不能改请求头）；规则**不能限定资源类型**
（后台 service worker 发起的 `fetch` 常被归为 `other`，限定 `xmlhttprequest` 的规则不匹配它，表现
为平台回「非法跨域请求」）。实测过程见 [development.md](development.md)。

### 3.5 不做平台抽象层，但先定命名与归属

当前只有一个平台。为假想中的第二个平台预先设计 `PlatformAdapter` 这类通用接口，只会得到一层没有
真实用例检验的抽象。多平台扩展的做法是新增 `packages/platform-<name>`，`apps/extension` 按 URL
决定注入哪个内容脚本；等第二个平台真正出现时，再从两个实现里提炼共性。抽象可以晚，**命名与归属
必须先定**，否则后加的代码会顺手放进通用目录，等第二个平台到来时已经分不开：

| 位置 | 约定 |
|---|---|
| `packages/platform-<name>/` | 一个平台一个包。包内只放该平台的端点、类型、规则 |
| `apps/extension/entrypoints/<name>.content.ts` | 一个平台一个内容脚本入口，按 URL 匹配注入 |
| `apps/extension/src/platform/<name>/` | 该平台的宿主适配（凭证、地址解析）。与平台无关的放上一级 |
| `apps/extension/src/features/<name>/` | 该平台的页面内功能。通用件留在 `features/` 顶层 |
| 配置 | 平台作为顶层键（`settings.<name>`），平台内再分前台与后台 |

判据很简单：**一处代码里出现第二个平台的名字，它就该待在 `<name>` 目录里。**

### 3.6 自实现 MD5

Web Crypto 不提供 MD5，而签名需要它，因此 `core` 里有一份自实现。正确性由交叉验证保证：
[sign.test.ts](../packages/transport/test/sign.test.ts) 对 13 组输入（含多字节字符、跨 64 字节分块
边界、超长输入）比对 `node:crypto` 的结果。

### 3.7 节流器首请求不等待

节流器内部用 `null` 而不是 `0` 表示「尚未发出过请求」。用 `0` 作初值会导致首个请求平白等待一整个
间隔。这个缺陷是测试发现的，而非人工复查发现的。

## 4. 规则放在哪里

**不靠文档记规则。**写在这里的每条规则都要能被机器判定，否则它会在下一次重构后过期，而过期的
规则比没有规则更坏事——照着它做会做错。

| 规则 | 由谁保证 |
|---|---|
| 一个文件一个职责，超过 300 行必须拆 | ESLint `max-lines`（[eslint.config.mjs](../eslint.config.mjs)） |
| 代码卫生：any、类型检查豁免、调试输出、非空断言 | typescript-eslint 官方规则（同上） |
| 术语只用一种写法 | ESLint `id-denylist`（同上） |
| 包与包之间的依赖方向 | `eslint-plugin-boundaries`（同上） |
| 界面文案、身份信息、遗留标记、代做类默认值 | [check-release.mjs](../scripts/probe/checks/check-release.mjs) |
| 文档链接与文档里引用的路径 | remark + remark-validate-links（[check-remark.mjs](../scripts/verify/check-remark.mjs)） |
| 版本号只有一个来源、跨包依赖版本一致 | syncpack + 结构断言（[check-syncpack.mjs](../scripts/verify/check-syncpack.mjs)、[check-version-literal.mjs](../scripts/verify/check-version-literal.mjs)） |
| 没有多余的 export、文件与依赖 | knip（[check-knip.mjs](../scripts/verify/check-knip.mjs)） |
| 权限与隐私口径 | [check-privacy.mjs](../scripts/probe/checks/check-privacy.mjs) |
| 注释里引用的文档与节号真实存在 | [check-doc-refs.mjs](../scripts/verify/check-doc-refs.mjs) |
| 源码里跳转用的锚点在目标页面里存在 | [check-anchors.mjs](../scripts/verify/check-anchors.mjs) |
| 唯一来源、端口注入、不兜底、测试即契约 | 代码结构本身 + 类型检查 + 测试 |

规则本身写在配置或标准工具里，不自写正则；标准工具的报告由 [scripts/verify/](../scripts/verify/)
下的薄适配脚本转成「通过/失败 名称」两行。全部门禁与其项数快照见
[check-all.mjs](../scripts/probe/checks/check-all.mjs) 与
[expected-checks.json](../scripts/probe/checks/expected-checks.json)——删门禁必须同时改快照，这一步在
diff 里看得见。文档只保留「为什么」，「怎么做」写在代码与门禁里；凡是两处都写的内容，以代码与
门禁为准。

## 5. 测试策略

三个层次：协议层用假 `fetch` 断言请求构造与响应分类（transport 全部模块）；算法层做交叉验证与
边界断言（MD5、签名、节流）；领域层用合成的结构样本回放（答案匹配、课程结构判定）；计划层是纯
函数断言（什么该自动做、什么该交给用户）。

领域测试验的是「按 id 能否匹配上」这类结构性质，抓取的真实接口数据不入库——它不属于本项目，也
可能带着账号痕迹。典型例子：`buildAnswers` 的测试断言「试卷上的每一道客观题都能在题库中命中」，
这个断言建立在真实试卷与真实题库之上，一旦题干格式变化就会失败。平台改版导致数据形状变化时测试
会变红，而不是等到用户发现功能失效。样本已脱敏：身份字段替换为固定占位值，保留结构 id。

界面与打包方面，[scripts/probe/](../scripts/probe/) 下的自检脚本验证的是**实际渲染结果与打包产物**
而非源码；完整清单与用法见 [scripts/probe/README.md](../scripts/probe/README.md)。这类问题（两份
CSS 规则各自都「对」、渲染出来却不一致）靠读源码发现不了，自检脚本是唯一能发现它们的手段。
