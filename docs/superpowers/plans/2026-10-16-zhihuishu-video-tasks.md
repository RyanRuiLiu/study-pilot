# 智慧树视频任务实现计划（platform-zhs v1）

> **执行方式：Native**（本会话直接实现；设计已由活体验证完全去风险，任务间接口由本文件锁定）。
> **Spec：** `docs/superpowers/specs/2026-10-16-zhihuishu-platform-design.md`（执行时同时读）
> 目标：最短时间完成共享课视频任务——读课程 → 拉任务树 → 逐单元「取记录 → 全时长 1× 报告上报 → 回读闭环」；
> 接线到扩展（后台 + options/popup 智慧树 tab），全部仿照 platform-mooc 的分层与规范。

## Global Constraints（沿用仓库既有规范）

- 类型严格（无 `?? ''` 类兜底；失败如实落区域/结果，不静默）；唯一实现（编码/文案/取名各一处）。
- 界面文案遵守 README「文案」规范（书面语、无第二人称）；界面完成后构建重载**交 Ryan 真机看**。
- 真机验证一律 `pnpm probe`；构建前先 `pnpm probe kill`；捕获类操作不长等待（Ryan 2026-10-16）。
- 依赖方向：`platform-zhs → core/transport(节流) → 无自研网络层`；扩展侧厂商事实在 `packages/platform-zhs`，载体只在 `adapters/zhihuishu` 装配。

## Review Focus（spec 未逐条覆盖、最容易咬人的五类）

1. **未登录/会话失效**：getLoginUserInfo 回未登录形态 → plan 返回 needsLogin，不做任何写。
2. **无 CASLOGC 环境**：deviceUuid 一律来自 getLoginUserInfo（不读页面 localStorage）——任何环境下都拿得到。
3. **子节视频**（`videoSmallLessons`）：lessonId=父、smallLessonId=子，报文字段按此映射；含子节课的完成上报按同一模板。
4. **易盾 -12 / 多端 -10**：execute 收到即整轮停止、结果如实落 failed，不重试不绕过。
5. **课程列表为空 / 未勾选**：plan 返回 blocked:'no-course'（与 mooc 同语义），界面有说法。

---

### Task 1: 配置新增 `zhihuishu` 段

**Files:** Modify `packages/application/src/config/{index.ts,zhihuishu.ts(新)}`；Test `packages/application/test/…`（沿用既有配置测试文件）

- 新增 `ZhsCourse { courseId: number; recruitId: number; name: string; schoolName: string; enabled: boolean; secret: string }`、`ZhsSettings { courses: ZhsCourse[] }`、`DEFAULT_ZHS`。
- `Settings` 加 `zhihuishu`；`SETTINGS_VERSION → 8`（纯新增，无迁移段——与 v7 加 activeTab 同例，注释里说明）。
- `normalize`：courses 数组整体替换语义由 mergeWithBase 保证（同 mooc），无需额外收敛。
- **验收**：`pnpm --filter @study-pilot/application test` 全绿；旧配置（version 7）normalize 后补出 `zhihuishu.courses = []`。

### Task 2: `packages/platform-zhs` 包骨架

**Files:** Create `packages/platform-zhs/{package.json,tsconfig.json,src/index.ts}`（照抄 platform-mooc 的两份配置，改名）

- 依赖：`@study-pilot/core`、`@study-pilot/application`、`@study-pilot/transport`（只用 createThrottle/FetchLike/DEFAULT_MIN_GAP_MS）。
- `src/index.ts` 门面：分批导出（先 sign/client/endpoints/session，随任务推进补缺）。
- **验收**：`pnpm install` 后 `pnpm --filter @study-pilot/platform-zhs typecheck` 通过。

### Task 3: `sign.ts`——签名全链（唯一实现）

**Files:** Create `src/sign.ts`；Test `test/sign.test.ts`

接口（执行者按此实现，勿改名）：
```ts
export const ZHS_PUBLIC_KEY_DER_B64 = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCg...'; // 源码摘录
export function rsaPublicEncrypt(plain: Uint8Array): Promise<string>; // base64；PKCS#1 v1.5
export function recoverCKey(sl: string): Promise<Uint8Array>; // 公钥运算（BigInt 模幂）+ 解垫 → JSON.cKey
export function aesEncrypt(payload: object, cKey: Uint8Array): Promise<string>; // AES-CBC/Pkcs7, iv 固定
export function xorHexEncode(values: Array<string | number>): string; // join(';') → XOR 'zzpttjd' → 2 位 hex
export function buildSeries(baseSec: number, totalSec: number): string; // "0,1" + 每 2 秒 parseInt(ke/5)+2
export function formatPosition(sec: number): string; // "HH:MM:SS"
export function buildSignedBody(payload: Record<string, unknown>, cKey: Uint8Array, dateField?: 'dateFormate' | 'date'): Promise<string>;
```
- RSA 加密用 WebCrypto（`crypto.subtle.importKey('spki', …)` + `encrypt` 不允许 PKCS1——**用 BigInt 自实现两种运算**：加密 = `m^e` + type-2 随机垫；解密恢复 = `c^e` + type-1/2 解垫，逐行镜像源码 unpad 循环）。
- AES-CBC 用 `crypto.subtle`（浏览器/Node 通用）；iv 常量 `1g3qqdh4jvbskb9x`。
- **测试（对拍金样本，机械核对）**：
  - `recoverCKey(金样本 sl)` → `aesDecrypt(金样本 secretStr…)` 得出抓包明文（把一个金样本 (sl, secretStr, 明文) 三元组内联进测试当 fixture）。
  - `xorHexEncode(金样本数组)` 与金样本 sdsew 字符串**逐字节相等**。
  - `buildSeries(408, 517-408…)` 复现金样本 57 段（fixture 断言全序列）。
  - `formatPosition(501) === '00:08:21'`。
- **验收**：`pnpm --filter @study-pilot/platform-zhs test` 全绿；测试文件里不出现任何活凭据（fixture 是历史快照、已失效，注释注明）。

### Task 4: `client.ts` + `endpoints.ts`

**Files:** Create `src/client.ts`、`src/endpoints.ts`；Test `test/client.test.ts`

- `endpoints.ts`：按 **族**（module）组织的清单：`studyservice=11`、`onlineservice=13`（首页实测再校准，见 T6）＋路径/方法/签名与否（`getLoginUserInfo` 免签）。
- `client.ts`：
  ```ts
  export interface ZhsClientOptions { fetch: FetchLike; minGapMs?: number }
  export interface ZhsClient {
    call(module: number, path: string, payload: object, method?: 'GET' | 'POST'): Promise<unknown>;
    unsignedGet(path: string): Promise<unknown>; // getLoginUserInfo 等
  }
  ```
  - sl 按模块缓存（`Map<number, Promise<string>>`，镜像页面 `q = q || labc(module)`）。
  - 取 sl：`GET appcomm-user…/c/has?uid=RSA({module:N})`，含 UA 头（用 BROWSER_USER_AGENT 同款常量）。
  - 节流用 `createThrottle`（与 mooc 同一条规范）。
  - 响应处理：HTTP 非 200 抛错；body `code` 语义保留在错误里（`ZhsError{code,message}`），**-12/-10/403 由 policy 层识别**，client 不解释。
- **验收**：假 fetch 测试：调用序列、sl 只取一次（缓存）、签名体形态（`secretStr=…&dateFormate=…`）。

### Task 5: `session.ts`

**Files:** Create `src/session.ts`；Test `test/session.test.ts`

```ts
export interface ZhsSession { loggedIn: boolean; userId: number; uuid: string }
export function readSession(client): Promise<ZhsSession>; // getLoginUserInfo：userId>0 即登录；uuid 原样
export class SessionExpiredError extends Error {…}
```
- **验收**：假响应测试：未登录形态（userId 0/缺）→ loggedIn false；有 uuid 时原样带出。

### Task 6: `courses.ts`（module 号实测校准）

**Files:** Create `src/courses.ts`；Test `test/courses.test.ts` + `test/node-live.test.ts`（只读真机，沿用 mooc node-live 的骨架：无 session 文件则 skip）

- `getShareCourses(client)`：POST `student/course/share/queryShareCourseInfo`，内层 `{status:0,pageNo:1,pageSize:50}`；响应 → `ZhsCourseBrief { courseId, recruitId, name, schoolName, secret, progressText }`。
- 合并规则与 mooc `course-selection` 同例：只沿用用户已勾选，新课程不自动勾。
- **module 校准步骤**：node-live 分别用 3 与 13 调一次，取都通过者（源码线索：首页 `labc(0x3)` vs 学习端 `ff` 表 `13`），把结论写进 `endpoints.ts` 注释（实测日期）。
- **验收**：单测走假 fetch；node-live 真读到《创践》《心理学》两门。

### Task 7: `structure.ts`

**Files:** Create `src/structure.ts`；Test `test/structure.test.ts`

```ts
export interface ZhsUnit { videoId; lessonId; smallLessonId; chapterId; name; chapterName; sec; done: boolean; studyTotalTime: number }
export function getCourseUnits(client, course): Promise<ZhsUnit[]>; // videolist + queryStuyInfo(完整载荷) 合并
```
- videolist（module 11）→ 章节/课时/子节**拍平**（子节：lessonId=父 id、smallLessonId=子 id）。
- queryStuyInfo 载荷 = `{lessonIds: 无子节课时 ids, recruitId, lessonVideoIds: 子节 ids, dateFormate}`；两表 `lesson`/`lv` 合并 → done = watchState===1。
- **验收**：用已捕获的 videolist/stuyinfo fixture 单测（内联裁剪版）：单元数 63、拍平映射正确、merged done 数正确。

### Task 8: `report.ts`

**Files:** Create `src/report.ts`；Test `test/report.test.ts`

```ts
export function buildStudyReport(unit: ZhsUnit, opts: { courseId; recruitId; baseSec: number; deviceUuid: string }): { ewssw; sdsew; zwsds; courseId; dateFormate };
```
- y=unit.sec、Ke=baseSec+unit.sec、位置=formatPosition(unit.sec)、studyStatus=0、token=deviceUuid+'zhs'、zwsds=base64(String(recordId))——recordId 由 execute 传入（不在本函数取）。
- **验收**：金样本对拍（用金样本数组断言 sdsew 逐字节；序列断言全段）。

### Task 9: policy 五件套

**Files:** Create `src/policy/{session,read,plan,execute,net-rules,tasks}.ts`；Test `test/tasks.test.ts`、`test/execute.test.ts`

- `net-rules.ts`：`ZHS_REQUEST_RULES: NetRuleSet[] = []`（实测不需要；注释说明 SW 直发已验证）。
- `tasks.ts`：`createZhsTasks(deps)` 镜像 mooc：`id 'zhihuishu'`、`name '智慧树'`；item：`{id: 'zhs-unit-<videoId>', group: 课程名, title: '单元名', mode:'auto', kind:'courseware', payload: unit}`。
- `execute.ts`：单单元流程 = `prelearningNote`（取 studiedLessonDto.id）→ `buildStudyReport` → `saveDatabaseIntervalTimeV2` → 回读 `queryStuyInfo` 验证（watchState=1 且 ≥sec）；`RunControl` 在写请求前问一次；错误映射：`code:-12`/异常 → failed（'触发人机验证，本轮停止'），其余错误如实带 message。
- `plan()`：scope.group 收窄同 mooc；无勾选 → blocked:'no-course'；未登录 → needsLogin。
- **验收**：假 client 全流程测试（含 -12 路径、验证不过=失败路径）；items 形状断言。

### Task 10: 扩展接线（后台 + 两个界面）

**Files:** Create `apps/extension/src/adapters/zhihuishu/{platform.ts,messages/*}`；Modify `entrypoints/background.ts`、`entrypoints/options/*`、`entrypoints/popup/*`、`src/messages.ts`（新消息类型）

- 镜像 mooc：`ZhsMessageDeps`（runtime+shell）、消息：`REFRESH_ZHS_COURSES`、`ZHS_COURSEWARE_SUMMARY`；执行走既有 runner（platforms 数组加 zhs）。
- options 智慧树 tab：账号与课程卡（读取/勾选/状态行）+ 课件卡（每课 已学 x/y、执行按钮）——**复用既有 row/badge/骨架/状态行样式模板**（对齐 UI 规范 13.6：各 tab 同构）。
- popup 智慧树 tab：单元待办（未完成课时列表，处置句与 mooc 同规范）+ 单独执行。
- **验收**：typecheck/test/build 全绿 → `pnpm probe kill && pnpm build && probe open && probe ext reload` → 截图/数值交给 Ryan 看（不自审审美）。

### Task 11: 真机端到端 + 交付

- probe 打开扩展 options 智慧树 tab → 读取课程 → 勾选《创践》→ 弹窗执行一个单元 → `queryStuyInfo` 回读 + 「成绩分析」页交叉核验（Ryan 提示的验证面）。
- 收尾：README 真机调试段补智慧树一条；推送；汇报（含界面截图指路，让 Ryan 看）。

---

## 自审记录

- **spec 覆盖**：§1 事实→T3/T4；§1.3 接口→T4/T6/T7；§1.4 上报→T8；§2 结构→T2~T9；§3 计划执行→T9；§4 配置→T1；§5 接线→T10；§6 验证→T6/T9/T11。无缺口。
- **类型一致性**：`ZhsUnit`（T7）字段被 T8/T9 引用；`ZhsCourse.secret`（T1）与 T6 brief 对接处字段名一致（brief 存 secret，ZhsCourse 同名）。
- **Review Focus 落点**：1→T9 plan；2→T5；3→T7/T8；4→T9 execute；5→T9 plan。
