# 全方面检查清单

一次完整检查覆盖下面 12 个域。每项只有三种合法结论：**已过**（给出证据：命令输出、测试名、文件与判据）、
**已修**（提交号 + 断言 + 变异核对结果）、**不适用**（写明为什么）。"看起来没问题"不算结论。

改代码时若发现某项的判据变了，回来改这一行；清单与代码不一致就是缺陷。

| # | 域 | 要回答的问题（每项都要有证据） |
|---|---|---|
| A | 业务正确性 | 判据与状态机是否与平台事实一致；每条闸的顺序与门槛是否有出处；空/缺/畸形输入是否显式失败而不是兜底；时间相关（截止、心跳、开考窗、分段）是否用同一口径 |
| B | 并发与重入 | 同平台两轮并发、跨平台并行、停止语义、迟到回调、重试与幂等；存储读改写是否串行 |
| C | 错误与资源上限 | 每个 `catch` 的处置是否有理由；错误分类是否收口在一处；出站是否有超时；节流是否覆盖所有请求；失败是否有「下一步」动作位 |
| D | 架构与边界 | 依赖方向、包内不出现宿主全局、文件级循环为 0；新端/新平台是否只需装配；每个抽象是否有第二个消费者 |
| E | 单一事实源 | 同一事实（端点、路由、文案、常量、令牌）是否只有一处；类型是否由表推导；同一句话是否在多个文件各写一遍 |
| F | 测试 | 分层测试不重复别层；断言强度（无同义反复、无空集合上的遍历）；关键判据有变异可红；测试离线、无顺序依赖、无时序依赖 |
| G | 隐私与安全 | 凭证不落盘、不进日志、不进错误消息；写操作只在人点按钮或 `--yes` 时发生；消息来源校验；URL/HTML 注入面；权限最小化与 PRIVACY 承诺逐条对得上 |
| H | 数据与状态 | 配置迁移对存量与脏数据的处置；运行状态的心跳/中断/失败留痕按平台独立；平台数据不落盘；落点唯一 |
| I | 界面与文案 | 语体（无人称、无「请」、无破折号、失败/无法/未）；术语唯一；空态给下一步；状态行两页两家一致；长文本溢出与悬停全文；可访问性（按钮语义、键盘、对比度） |
| J | 平台事实 | 每个端点/字段/错误码有来源（日期、命令、金样本）；形态不符抛错；会话与风控处置按本平台事实；不借用别家结论 |
| K | 构建与发布 | 产物唯一落点与命名；manifest 与配置一致；单文件与源码直跑行为一致；版本与变更记录；锁文件与 Node/pnpm 版本钉死；`pnpm install --frozen-lockfile` 可复现 |
| L | 工程流程与多端 | CI 每次提交全绿；提交信息写为什么与验证；文档路径/命令与代码一致；新人接手路径有效；多端装配只写装配、判据不复制 |

## 执行方式

1. 按 A→L 逐域做，一域一批：先取证（读代码/跑命令/写断言），再决定修或不修。
2. 任何"修"都必须配断言，关键判据做变异核对；一批一提交，`git push` 后看 CI 全绿。
3. 每域结束时更新本文件对应行的结论与证据位置（提交号或测试文件）。
4. 不允许用"工作流报告"替代取证：多人审查的输出一律回到代码核对后才算数。

## 进度

| 域 | 结论 | 证据 |
|---|---|---|
| A 业务正确性 | 已修一处，其余已过 | 神谕判据原缺「每题 `done`」这一半（设计文档 §1.4/§3 写明，代码只看得分）；补齐后 `done` 缺失或不真一律记 missing，绝不放行。断言 `oracle.test.ts`「分数已出但 done 不为真 → 不算通过」；变异核对：去掉 `\|\| !done` 该条即红。其余：闸的顺序与门槛在 `execute-exam.ts` 各闸注释；剩余次数算式出自平台源码；`SEGMENT_SEC`/`HEARTBEAT_TIMEOUT_MS` 有实测注释；空/畸形响应在 `parsePaper`、`exam-list`、`final-exam`、`meet`、`structure` 一律抛错 |
| B 并发与重入 | 已过（补一条跨平台并发断言） | 认领按平台（round.ts 的 claimed；新断言「两家平台的一轮可以同时在飞」；变异核对：把 claimed.has(id) 改成 claimed.size>0 该条即红）；跨进程防重入与迟到心跳（state.test.ts 心跳只对进行中的一轮有效）；状态读改写串行（runner 的 serialize 队列，同一断言里两家 lastFinishedAt 都落盘）；停止按平台且只在安全点生效（round.test.ts 停止用例、两家平台一组、zhs/mooc 交卷前停止用例） |
| C 错误与资源上限 | 已过 | 空 catch 共 10 处，逐条读过，全部是「解析失败＝未登录/非本形态」的显式判定并带注释；出站上界统一走 transport 的 startOutboundTimeout（rpc、dwr、智慧树客户端、AI 对话四处都接了，含读体）；节流覆盖 rpc/dwr/智慧树全部请求；重试只在平台并发限制码上发生（rpc.ts 的 callEnvelope），网络/HTTP 失败不重试，写不会被悄悄重发；失败的动作位经 ZhsRoundHalt.action 与 RunFailure.action 落到状态与界面；除注入适配器与 transport 客户端外无裸 fetch |
| D 架构与边界 | 已修一处，其余已过 | 六条边界机械核对全绿；依赖边逐条核对只有向内：platform-* → application / transport → core，ai → transport → core，载体 → 包；application 不依赖任何平台包；新端装配面：智慧树 3 项（config、fetch、readCookie）、慕课 5 项（host、config、recordFailure、fetch?、textGenerator?）+ runner 3 个端口，全是装配不含逻辑。已修：两个「去登录」地址原先是扩展载体里的平台事实（ui/login.ts），移到平台包（MOOC_LOGIN_URL、ZHS_SITE_ORIGIN），载体只转出，六个界面调用点不动 |
| E 单一事实源 | 已修一处，其余已过 | 值级事实各只有一处：端点/宿主在 endpoints.ts（ZHS_HOSTS）、页面地址在 pages.ts、登录去处各在平台包、tokens 在 tokens.css、超时句子在 transport、未登录句子在 round.ts、state/kind 枚举各一处。已修：两张消息处理器表原先与响应映射无类型关联（漏登记只在运行期表现成「处理不了」），现在用 satisfies 绑定（zhs 的 ZhsResponseMap、mooc 的 MoocResponseMap）；变异核对：删掉一条 handler 立刻 TS2741。顺带修掉 handlers.ts 里「`*` 兜底由慕课表提供」这句过期注释（兜底早已归外壳路由） |
| F 测试 | 已修（收紧五处弱断言） | 全天 707 通过 / 1 显式跳过；无 .only/describe.skip，唯一的跳过是 node-live 的 it.skipIf(!live)。收紧：client 的 status 信封断言具体字段；meet 直接断言开始时刻；tasks 的「计划不开卷」断言产出类别；file-ports 断言坏文件回默认配置的具体形状；options 的 blank 断言控件类型（原先只判非空，收紧后发现 blank 存的是元素不是值，说明这条本来就该写具体）。tokens-parity 的 toBeDefined 保留：它是「每个令牌都能在 CSS 里找到」的存在性判定且带失败说明。变异核对见各批提交 |
| G 隐私与安全 | 已过 | 无定时触发（全仓无 alarms/setInterval），写只由按钮或 --yes 发起；消息只处理 sender.id === 本扩展 的来源；富文本走白名单净化（允许标签/属性、img 只放行 https、script/iframe/表单类整体丢弃），innerHTML 后同一同步块内净化；密钥只进 Authorization 头；扩展的生产包内零 console（构建替换为空函数），命令行的标准输出与探测脚本的日志是它们本身的产品输出，不打印凭证；manifest 权限与 host_permissions 与用途逐条对应；PRIVACY 的写清单（课件/单元测验客观题/互评自评/智慧树重做与探路）与代码里五个 zh写了端点 + 慕课四个写路径一一对上 |
| H 数据与状态 | 已过 | 落盘只有三类：用户配置（settings/cli-config）、运行状态（task-state/run-state/cli-state）、以及本地工具产物（.output、.probe 均不入库）；平台数据不落盘（课程结构、待办、成绩每次现读，配置里的课程条目只是用户的选择与平台元数据，读取时由平台刷新）。配置迁移 2→9 每段一段、按版本串行，settings-migration 覆盖 v2/v4/v6/v7/v8/v9 与脏元素（NaN、非数组、enabled 只认 true）。状态键名各一处（keys.ts），CLI 只写 config/state 两个文件 |
| I 界面与文案 | 已修（界面排查修 10 处，其余已过） | 语体：全仓界面串无「您/你」、无「请」（平台原话除外）、失败统一叫失败（本轮把三处「出错」注释改齐）；术语按轴（执行/完成/停止/读取），同一句在弹窗与设置页走同一常量或同一措辞源；空态均给下一步（尚未读取到课程、尚未选择参与任务的课程）。溢出：待办标题单行省略并挂 title（elements.ts）。可访问性：tab 有 role/aria-controls/aria-selected 与左右方向键，aria-live 提示执行中；多处 :focus-visible；tokens.css 记录实测对比度（19:1 / 7.7:1 / 4.8:1）。唯一风险点：富文本 innerHTML 后同块净化，已注释来源与为何不用 DOMParser。2026-10-21 界面专项：停止结果按点击时平台归属并在请求失败时复位、状态读取乱序守卫、别家跑完的脏标记、勾选写盘锁、换卷后旧答案不落新页、同名课程行按学期/课程 id 索引、课件/视频/测验的执行范围按条目 id 收窄（同名学期不再一起做）、指导题号混配等已修；断言见 popup-stop / courseware-rows / zhs-task-rows / quiz-fill / course-toggle / guidance 各测试。未登录的指引只在「账号与课程」卡里出现一次，课程任务区不再在卡片外重复；命令行独立排查：--select 与设置页统一为逐门切换（慕课原先是单选）、进度去重键补上课程、停止的一轮在收尾句里明说、跨进程执行加 PID 锁；断言见 CLI 的 select / progress / report / run-lock 测试 |
| J 平台事实 | 已过 | 智慧树端点表 23 条全部带注释（模块号、签名形态、读/写），慕课端点表 17 条；平台源码里 65 处带日期的实测标记（2026-10-03 起）；形态不符一律抛错（parsePaper、exam-list、final-exam、meet、structure）；课程列表按分页取全、日期溢出（2 月 30 日之类）给 null、存储里的畸形平台状态与原型键不落成半条记录；两家的会话/签名/风控事实各自成文（慕课 module 11 + DWR、智慧树 module 3 + 免签族），互不借用 |
| K 构建与发布 | 已过 | 产物落点唯一（apps/extension/.output/chrome-mv3 与 study-pilot-extension-0.3.9-chrome.zip、apps/cli/.output/main.mjs），zip 名钉在 wxt.config；构建出的 manifest 与 wxt.config 逐项一致（权限、host、内容脚本匹配、options、action）；pnpm install --frozen-lockfile 可复现（锁文件即最新）；Node >=22 与 pnpm@12.4.2 由 engines/packageManager 钉死；changesets 骨架已入库（private 包只抬版本）；CI 上传扩展 zip 与 CLI 单文件（隐藏目录需要 include-hidden-files，已修） |
| L 工程流程与多端 | 已过 | CI 每次 push 全量跑（lint→typecheck→test→build→zip→产物）；连推时被新提交取消的跑次属并发设置（cancel-in-progress），每次都验整棵树，最新成功覆盖先前提交；提交信息中文、写为什么与验证方式（本轮各条均附变异核对）；文档路径与命令由脚本核对过（probe 帮助与 README 一致，文档引用的文件均存在）；接手路径在 README「新人从哪读起」+ CONTRIBUTING + 本清单；多端装配面 3～5 个端口且不含逻辑（见 D） |
