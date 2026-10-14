# 实测记录（改动前请读 QODER.md）

本文件只放**代码与测试推不出来的事实**：被推翻过的结论、调试环境的实测限制、
凭证与样本的处理规程。操作约束（写操作纪律、代码规则、命令）在
[../../QODER.md](../QODER.md)，架构决策在 [architecture.md](architecture.md)，
平台协议在 [platforms/mooc.md](platforms/mooc.md)。

这里刻意不放功能状态表与「已完成清单」：那种文档会腐烂成假结论——
先前那份状态表里就有四行与代码不符（中断续做、定时检查的验证方式、
弹窗自检项数、设置页分区数），而它们看起来比代码更可信。
现在的状态以 `pnpm -r test`、`node scripts/probe/checks/check-all.mjs` 与代码本身为准。

验证方式标注：`实测` 在真实账号上跑过；`自检` 由仓库内的脚本核对；`测试` 由单元测试覆盖。

---

## 1. 推翻过的结论

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
| 课程列表按学期自动勾选 | 「正在开课」只说明这门课现在可以学，不说明用户愿意让扩展在这门课上提交测验、给同学的作业打分。按学期时间替他勾上，等于让默认值决定了写入范围；又因为设置页每次打开都会重新读取课程列表，「恢复默认设置」清空课程之后正在开课的那几门又被勾了回来，用户看到的是「恢复默认没生效」 | 新出现的课程一律不勾，只沿用用户自己做过的选择。规则抽到 [course-selection.ts](../apps/extension/src/platforms/mooc/course-selection.ts)，由单测锁住 |
| 前台功能默认全开 | 当时给的理由是「只做展示与预填，不点提交就不写数据」。那个理由不成立：填充逐题点击页面选项，页面自己就会为此发起保存草稿 | 先改成按「会不会写平台」划线（做题助手默认关闭），又发现那条线把前台一起管了——前台的写动作都由人点，后台任务在检查时自己就动。决定要不要替用户做决定的是「是不是它自己动」，不是「写不写」。现在后台自动任务默认关闭，页面内两项默认开启 |
| 设置页把整份配置写回存储 | 后台读取课程列表时也在写配置，两边都基于自己读到的那份、都不订阅对方的改动，于是谁后写谁赢。用户拨过的开关过一会儿自己变回去，尤其在浏览器刚启动、后台正在跑的时候，而且不报任何错——看起来像「存储没生效」，实际是被人覆盖了 | 写入一律是「存储现值 + 我改的那条路径」，由 `updateSettings` 合并；课程勾选先读存储里的列表，再改那一门。读-改-写的窗口从数秒收窄到毫秒 |
| 弹窗自己判断「是否正在执行」 | 判据是 `runningSince !== null`，而那个字段在浏览器被强杀后会留着没人清，线程却早就不在了。弹窗于是一直显示「正在执行」，用户等一件永远不会发生的事；总开关一关，它又被 `enabled &&` 掩盖成空白 | 后台加心跳，并由后台给出 `liveRunState`（正在执行 / 上次未结束 / 等待登录 / 空闲）。界面只显示，不推断——判据只有一处 |
| 通知复用固定 id 就能避免堆积 | 在已有 id 上调 `create` 是「更新」而不是「新建」：那条通知还在系统通知中心里时，它只替换内容、不会再弹一次横幅。表现是「通知只能收到一次」，而用户分不清是扩展没发还是系统没弹。先 `clear` 再 `create` 只绕过一部分情况，系统仍记着那个 tag | 每次发送用「前缀 + 时间戳」的唯一 id；发送前按前缀清掉旧条目，通知中心里始终只留最近一条。点击判断用前缀匹配而不是等值比较——`onClicked` 里已经因为写死 id 失效过一次 |

## 2. 凭证与样本处理

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

## 3. 改动代码前的检查清单

- [ ] 已阅读本文件
- [ ] 已按 [../QODER.md](../QODER.md) 的写操作边界核对目标单元的过期与提交状态
- [ ] 确认本次改动不会调用任何写接口
- [ ] 如需复现提交流程，选择的是已过期单元而非未过期单元
- [ ] 抓下来的原始响应没有留在工作区（`.probe/` 与 `fixtures/` 都已在 .gitignore 里）

---

---

## 4. 调试环境的四条实测限制

以下四条都是实测出来的，不是推断。它们的共同点是**表现隐蔽**，
不写下来会重复踩。

## 5. Origin：后台请求会被平台拒绝

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

实现见 [`apps/extension/src/browser/net-rules.ts`](../apps/extension/src/browser/net-rules.ts)，在后台注册时幂等安装。

## 6. 调试宿主必须用 Chrome for Testing

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

## 7. profile 里的家长控制残留会禁用扩展权限

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

## 8. MV3 worker 会被回收

service worker 空闲后被 Chrome 回收属于正常行为。此时 CDP 仍能看到
worker target，但它是空壳：`hasListeners()` 返回 false，消息也送不到。

判断方法：先打开扩展页面唤醒 worker，再检查监听器状态。
不要用「worker target 存在」推断它正在运行。
