# 开发须知

本文件是改动代码前的必读材料，分两部分：

- **项目现状** —— 做到哪一步了、哪些结论被推翻过、还差什么
- **改动纪律** —— 对平台账号的写操作边界，硬约束

平台协议细节见 [platforms/](platforms/)，架构与分层见 [architecture.md](architecture.md)。

---

# 第一部分：项目现状

验证方式标注：`实测` 在真实账号上跑过；`自检` 由仓库内的脚本核对；
`测试` 由单元测试覆盖。

## 1. 功能状态

### 前台

| 功能 | 状态 | 验证方式 |
|---|---|---|
| 做题助手（填充与提交） | 完成 | 实测两次满分：26/26、24/24 |
| 面板只出现在作答页 | 完成 | 实测列表态无面板、作答态有面板；作业页不再建面板 |
| 得分指导注入 | 完成 | 实测作业 4 道题、主观题考试 6 道题，图文完整 |
| 客观题考试复用做题助手 | 完成 | 实测考试页挂上面板，题目 20 道 |
| 互评评分页不显示助手 | 完成 | 实测评分态无面板与注入 |

### 后台

| 功能 | 状态 | 验证方式 |
|---|---|---|
| 后台发请求（Origin 改写） | 完成 | 实测 service worker 直连返回 200 与完整数据 |
| 定时检查 | 完成 | 自检确认 alarm 已建立；间隔可配，改设置后立即重建 |
| 拉取判据 | 完成 | 测试覆盖三种触发情况与兜底 |
| 计划派生 | 完成 | 测试覆盖各阶段与三个开关的八种组合 |
| 中断续做 | 完成 | 实测真实执行，进度正确落盘 |
| 作答辅助 | 完成 | 实测两个测验，`done 2` |
| 自动互评 | 完成 | 实测互评配额 2/5 → 5/5 |
| 自动自评 | 完成 | 实测 `status` 1→2、`origScore` 0→100 |
| 桌面通知 | 完成 | 测试覆盖两类内容与四种过期判据 |

### 界面

| 功能 | 状态 | 验证方式 |
|---|---|---|
| 弹窗待办列表 | 完成 | 自检 20 项，界面条数与接口一致 |
| 待办的状态与处置 | 完成 | 自检确认每条都有名称、时间与跳转地址 |
| 已过截止单独成段 | 完成 | 自检确认分组标题的项数与实际条数一致 |
| 设置页七个分区 | 完成 | 自检确认分区名与顺序；导航项数与分区数一致 |
| 单元明细 | 完成 | 自检确认条数与接口一致 |
| 考试在待办与明细里 | 完成 | 实测两个考试的字段与接口一致，明细行可跳转 |
| 课程列表不自动勾选 | 完成 | 测试覆盖：新课程不勾、勾过的保持、取消过的不被重新勾上 |
| 通知点击定位 | 完成 | 实测锚点滚到单元明细，左侧高亮跟随 |

## 2. 推翻过的结论

改动相关代码前需要知道这些，否则会按错误的前提去改。
每一条都记了**为什么错**，而不只是"现在改了"。

| 曾经的结论 | 错在哪 | 现在怎么做 |
|---|---|---|
| 待办用 `TermBean.getNewestItems` | 该接口返回的对象里**没有 `submitted`**，实测把已提交的测验也列在 `needSubmitQuiz` 下，因此分不出做没做 | 改由 `courseBean.getLastLearnedMocTermDto` 派生 |
| `aid` 取 `getOpenQuizInfo` 的顶层字段 | 该字段在未开始作答时为 0，而 0 恰恰表示"还没开始"，直接用它会取不到卷子 | 调取卷接口时传 `aid = 0`，服务端据此新建答卷，等价于页面上的「开始测验」 |
| 互评的完成条件是「评过就行」 | 平台按配额判断。评一份与评够五份对成绩的影响不同 | 看 `getEvaluateDetail` 的 `totalEvaluateCount`，对应页面「请至少为 N 份作业进行评分」 |
| 「互评中」是一个状态 | 它不说明做到哪一步，一份未评与已经评够在界面上字面相同 | 带进度显示：`互评 2 / 5` |
| 成绩是否公布看阶段 `phase` | `phase` 对测验永远为空，导致测验拿到分数后仍显示「已提交」 | 改看 `userScore` |
| 课程列表需要按天缓存字段 | 节流依据由调用方持有，数据层不必再记一遍日期 | 只在调用方记 `lastFetchedDate` |
| 把「检查」与「拉取」当成一件事 | 两者性质不同：检查读本地不发请求，拉取才发请求。混为一谈会让用户以为扩展在频繁请求 | 四个动作分开定义，各自标明是否发请求、是否写平台 |
| 计划派生不看功能开关 | 把某件事排进「自动」意味着扩展会去做，而这只在对应开关打开时成立。不看开关会让界面显示「将自动完成」而实际永远不会发生 | `derivePlan` 接收设置，关掉的项移入人工并标明原因 |
| 过期项长期留在待办里 | 说一次就够。挂一学期会攒出几十条不会被查看的记录，把真正要做的事挤下去 | 保留三天（可配），之后不再显示 |
| 过期只有测验与作业两种 | 互评与自评过了互评截止同样不再计分、影响成绩，而它们当时完全静默 | 五种过期原因统一判据，单独成段列出 |
| 考试没有接口，只能读页面 | 判据来自一次不可靠的抓包。用项目内的采集工具重抓后发现，考试数据一直在课程结构接口的 `exams` 字段里，取卷走的是与测验相同的 `getOpenQuizPaperDto` | 考试与作业同等处理：进待办、有前台功能 |
| 课程列表按学期自动勾选 | 「正在开课」只说明这门课现在可以学，不说明用户愿意让扩展在这门课上提交测验、给同学的作业打分。按学期时间替他勾上，等于让默认值决定了写入范围；又因为设置页每次打开都会重新读取课程列表，「恢复默认设置」清空课程之后正在开课的那几门又被勾了回来，用户看到的是「恢复默认没生效」 | 新出现的课程一律不勾，只沿用用户自己做过的选择。规则抽到 `src/background/course-selection.ts`，由单测锁住 |
| 前台功能默认全开 | 当时的理由是「只做展示与预填，不点提交就不写数据」。这个理由不成立：填充逐题点击页面选项，页面自己就会为此发起保存草稿。把「用户会不会再点一下」当成判据，等于让默认值替用户决定要不要写平台 | 判据统一成「会不会写平台」：做题助手默认关闭，得分指导（只读）默认打开 |

## 3. 已知限制

| 限制 | 说明 |
|---|---|
| 只支持一个学习平台 | 架构上留了多平台的位，但只实现了这一个 |
| 作答辅助只覆盖客观题 | 主观题没有可协助填写的答案，这类事项会进待办并发出通知 |
| 考试不自动作答 | 接口已通，技术上可以支持。但考试通常只有一次作答机会，不由后台代点。填充与得分指导仍然可用 |
| 无法程序化打开弹窗 | 浏览器不提供该能力，因此通知点击只能送到设置页或平台页面 |
| 调试宿主必须是 Chrome for Testing | 品牌版 Chrome 从 137 起移除了 `--load-extension`，见第三部分 |
| 设置页窄屏未适配 | 两栏布局在 720px 以下会挤，未做响应式 |

## 4. 下一步可以做

按价值排序，都不是必须的。

1. **多平台**：`MoocClient` 的接口边界是清晰的，加平台主要是加一层 `platform-*`，并补上对应权限与内容脚本匹配。
2. **设置页窄屏**：两栏布局在窄窗口下挤，需要一档单栏断点。

---

# 第二部分：改动纪律

本部分规定对平台账号的写操作边界。它不是建议，是硬约束；
工具已在代码层面执行其中大部分，不要绕过。

## 5. 为什么需要纪律

本项目操作的账号记录真实学习成绩。一次误调用 `submitAnswers` 或
`submitSubmissionEvaluate`，可能覆盖一次真实作答、消耗一次尝试机会，
或直接改变最终成绩，且无法撤销。

## 6. 三条铁律

### 6.1 写操作的前提

平台的成绩规则是**取最高分**，因此判定的核心是「这次操作会不会拉低最终成绩」。

允许执行写操作的情形，满足其一即可：

**情形一：该单元已取得满分。**

`userScore` 或 `finalScore` 等于 `totalScore`（即满分）时，无论后续提交得到多少分，
最终成绩都保持满分不变。这类单元可以自由测试，也不必受过期与否的限制。

**情形二：该单元已过期，且已有提交记录。**

过期之后平台不再接受新的作答，已有提交记录说明这次操作属于查看或补充，
不改变最终成绩。

两个条件都不满足时不执行写操作。判定所需字段与查询方法见第 8 节。

### 6.2 探测必须有窗口，使用者可见

`pnpm probe:launch` 默认启动带窗口的浏览器。
`--headless` 只允许用于纯静态采集（读取公开页面、下载脚本），
不允许在已登录状态下使用。

### 6.3 未过期且未满分的单元是禁区

既没有过期、也没有拿到满分的单元，不打开、不进入、不调用其写接口。
这类单元的一次提交会真实影响最终成绩，且无法撤销。

## 7. 工具层面的防护

`scripts/probe/inspect/call.mjs` 默认只放行只读方法，前缀白名单如下：

```
get / list / search / query / has / is / can / check / page / find
```

其余方法（`submit*`、`save*`、`start*`、`evaluate*`、`mark*`、
`add*`、`update*`、`delete*` 等）在发出请求**之前**即被拦截，退出码为 3，
不会到达服务端。

确有需要时必须显式放行，此时会打印告警：

```bash
# 仅在确认目标单元已过期、已提交、成绩不受影响时使用
pnpm probe:call -- --bean <Bean> --method <写方法> --body '<JSON>' --allow-write
```

`collect.mjs` 只执行导航、读取与显式给出的页面操作，不含任何写操作。

## 8. 判断单元是否可以操作

### 8.1 取课程结构

```bash
pnpm probe:call -- --bean courseBean --method getLastLearnedMocTermDto --body '{"termId":<termId>}'
```

在返回的 `result.mocTermDto` 里，判定所需字段在两处：

- `chapters[].{quizs,homeworks}[].test` —— 单元测验与作业
- `exams[].{objectTest,subjectTest}` —— 考试。不在章节下，直接挂在学期上

| 字段 | 含义 |
|---|---|
| `deadline` | 截止时间（毫秒）。小于当前时间即已过期 |
| `usedTryCount` | 已用尝试次数。大于 0 表示做过 |
| `userSubmitStatus` | 考试用这个表示做没做，1 为已提交 |
| `userScore` | 用户得分。非 null 表示已判分 |
| `enableEvaluation` | 是否支持互评 |

### 8.2 取单元状态

```bash
pnpm probe:call -- --bean mocQuizRpcBean --method getQuizInfo \
  --body '{"tid":<tid>,"targetAid":null,"isDraft":false}'
```

判定依据是 `result.targetAnswerform`：

- `submitTime > 0` 表示已提交，重新进入属于查看模式；
- `score` 或 `finalScore` 有值说明已判分；
- `totalTryCount` 与 `usedTryCount` 相等时，该单元已无剩余尝试机会，
  可作为最安全的测试对象。

### 8.3 判定规则

按第 6.1 节，满足下列任一条件即可作为操作目标：

| 条件 | 判据 |
|---|---|
| 已取得满分 | `userScore`（或 `finalScore`）等于 `totalScore`，且 `totalScore` 不为空 |
| 已过期且有提交记录 | `deadline < 当前时间` 且 `submitTime > 0` |

有一件实测出来的事：**答卷结束后 `aid` 会变成 0，该单元就无法再进入作答状态**。
已经做完的单元都处于这个状态，虽然可以操作，但无法用来复现提交流程。

需要复现时用一个还没做的单元，不要拿已完成的试。

## 9. 凭证与样本处理

- 会话快照保存在 `.probe/session/cookies.json`，已被 `.gitignore` 忽略，不进入版本控制。
- 采集脚本落盘的 `cookies.json` 只记录 cookie 的名称、域名、有效期、
  httpOnly 等元信息与值长度，**不记录值本身**。
- 抓下来的样本不入库，用完即清。若确实需要临时保留，先脱敏：

  ```bash
  node scripts/probe/inspect/redact.mjs --check <抓取目录>
  node scripts/probe/inspect/redact.mjs <抓取目录>
  ```

  脱敏只处理工作区。若某个值曾经提交过，它仍在 git 历史里——那种情况
  需要重写历史，不能靠再提交一次覆盖。
- 身份信息的历史清理已经做过（用户 id、手机号、邮箱、早期样本里的
  真实姓名与成绩）。新增提交时不要再把这些值写进代码、文档或测试数据。

## 10. 改动代码前的检查清单

- [ ] 已阅读本文件
- [ ] 已按第 8 节的方法核对目标单元的过期与提交状态
- [ ] 确认本次改动不会调用任何写接口
- [ ] 如需复现提交流程，选择的是已过期单元而非未过期单元
- [ ] 抓下来的原始响应没有留在工作区（`.probe/` 与 `fixtures/` 都已在 .gitignore 里）

---

# 第三部分：调试环境限制

以下四条都是实测出来的，不是推断。它们的共同点是**表现隐蔽**，
不写下来会重复踩。

## 11. Origin：后台请求会被平台拒绝

平台的 `.rpc` 接口按 `Origin` 判别请求来源。同一个接口、同一套签名、
同一份请求体，仅因发起位置不同而结果不同：

| 发起位置 | Origin | 结果 |
|---|---|---|
| service worker | `chrome-extension://<id>` | **403**，响应体只有一个空格 |
| 页面上下文 | `https://www.icourse163.org` | 200，正常返回数据 |

实测方式：用 CDP 的 `Network.requestWillBeSentExtraInfo` 抓两个上下文发出的
同一请求，比对实际出站请求头。页面上下文的 `Referer` 为平台根地址，
而 service worker 的 `Referer` 为空，`Origin` 是扩展来源。

**处理方式**：用 `declarativeNetRequest` 的 `modifyHeaders` 改写请求头。

官方文档说明 `modifyHeaders` 作用于 "Before Chrome sends request headers to
the server" 阶段，因此改写对服务端可见。实测改写后 service worker 直接
请求返回 200 并带回完整数据，**无需打开任何标签页**。

要点：

- 权限必须是 `declarativeNetRequestWithHostAccess`。基础权限
  `declarativeNetRequest` 不能修改请求头，调用 `updateDynamicRules` 时
  该 API 甚至不会出现在 `chrome` 对象上。
- 规则装在**动态规则集**而不是 session 规则集。session 规则在浏览器重启后
  失效，而后台任务恰恰在浏览器启动时执行。
- 规则只匹配 `icourse163.org/web/j/`，避免影响其它请求。
- `modifyHeaders` 不能限定 `resourceTypes`。指定后就匹配不上了，
  因为 service worker 发出的请求被归类为 `other`。

实现见 `apps/extension/src/background/net-rules.ts`，在后台注册时幂等安装。

## 12. 调试宿主必须用 Chrome for Testing

Chrome 官方发布说明：

> **Remove --load-extension command line switch**
> 官方品牌版自 Chrome 137 起移除 `--load-extension`；未打包扩展改用
> `chrome://extensions` 的「加载已解压的扩展程序」按钮。
> 开发者仍可在 **Chromium 与 Chrome For Testing** 中使用该开关。

https://support.google.com/chrome/a/answer/10314655

另有两点实测：

- 品牌版 Chrome 153 的 CDP **不再提供 `Extensions` 域**。
  `Extensions.loadUnpacked` 会返回一个 id，但扩展并未加载，
  扩展页面打开后是 `ERR_BLOCKED_BY_CLIENT`。这个「假成功」极具误导性。
- `launch.mjs` 与 `wxt.config.ts` 因此强制使用 Chrome for Testing，
  找不到时直接报错并给出安装命令，不静默退回品牌版。

安装：

```bash
npx @puppeteer/browsers install chrome@stable --path ~/.cache/chrome-for-testing
```

## 13. profile 里的家长控制残留会禁用扩展权限

`.probe/profile` 的 `Preferences` 中若存在

```
managed = { locally_parent_approved_extensions=…, locally_parent_approved_extensions_migration_state=1 }
```

Chrome 会认为扩展权限被家长停用，`chrome://extensions` 显示
「您的家长已停用扩展程序权限」（该字符串出自 Chromium 源码
`google_chrome_strings_zh-CN.xtb`，属于受监督用户功能）。

表现极其隐蔽：**worker 正常启动、监听器注册成功（`hasListeners()` 返回 true），
但消息发不进去**。手动注册一个监听器再发消息同样收不到，
据此可以排除代码问题。

处理方式：删除该字段或重建 profile。

## 14. MV3 worker 会被回收

service worker 空闲后被 Chrome 回收属于正常行为。此时 CDP 仍能看到
worker target，但它是空壳：`hasListeners()` 返回 false，消息也送不到。

判断方法：先打开扩展页面唤醒 worker，再检查监听器状态。
不要用「worker target 存在」推断它正在运行。
