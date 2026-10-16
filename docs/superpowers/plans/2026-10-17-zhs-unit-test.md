# 智慧树单元测试实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让本工具在智慧树上自动完成「单元测试」——开卷、按官方正解作答、神谕验证、交卷、回读分数；缺键时走探路重做闭环；任何一枪没把握就不交。

**Architecture:** 全部业务逻辑落在 `packages/platform-zhs`（纯 Node 可测：`fetch` 与 cookie 由调用方注入，不含 DOM）。答卷会话是一条线性状态机（开卷 → 题面 → 作答 → 验证 → 交卷 → 回读），两种路径由「有没有答案键」分派。答案键第一期只有一个来源——该卷历史已交（只读收割），活在内存里、用完即弃。外壳只做接线，不加平台知识。

**Tech Stack:** TypeScript（Node ≥22）、vitest、智慧树考试族 API（签名，module 3）、appstudent 神谕（免签明文表单）。

**Spec:** `docs/zhs-task-modules-design.md`（§1.4 神谕契约、§3 模块 1/2/3 是本次实现的直接依据）

## Global Constraints

- **平台事实写在它约束的代码旁**，每条注明来源（「实测」或「源码」）——这是本仓的注释纪律，改动协议细节前先读那一段。
- **禁止的行为**（`CONTRIBUTING.md`）：兜底、吞错、猜匹配、注释欺诈。失败如实返回，不重试、不解释。
- **写操作前必过安全闸**；停止语义 = 「不再有新的写」，正在飞的请求不掐断、已完成的写不回退（`@study-pilot/application` 的 `RunControl`）。
- **缩进 2 空格、单引号、分号**；测试与被测文件同目录的 `test/` 下，命名 `<模块>.test.ts`。
- **课程红线**：沙箱《示例课程己》（courseId 9000000002 / recruitId 900004）与《人工智能引论》可自由测；《示例课程甲》《示例课程乙》《示例课程丙》只读。
- **绝不打开测验链接做探测**：`student/doHomework` 一调即开卷（建答卷、无二次确认）。开卷只发生在执行动作里，且一次一份。
- **平台原文照抄，不自造文案**（如「重做次数已用完，不能申请重做」）。
- 测试命令：`pnpm --filter @study-pilot/platform-zhs test`；类型检查：`pnpm --filter @study-pilot/platform-zhs typecheck`。

## Review Focus

以下五类输入/失败模式，规格暗示了但任何任务的测试都不会自然覆盖；每一条都要落到**拥有该代码的那个任务**的测试里：

1. **会话失效**：考试族遇 SSO 过期会 302→passport（表现为非 JSON 响应或跨域失败）。必须抛类型化错误并停轮 + 给「打开智慧树登录」的动作位——**不能被当成业务失败吞掉**（Task 11）。
2. **神谕返回缺题**：喂了 N 个题号、`rt` 里只有 M 个（M<N）。**既不能当 0 分，也不能当满分**——必须判为「验证不通过」并如实说明缺了哪几题（Task 9）。
3. **`totalScore` 缺失**：清单条目 `totalScore` 为 null 时「Σ得分 == totalScore」这个判据失效。**判据失效 = 不通过**（不许默认放行，那一枪会花掉机会）（Task 9）。
4. **卷面与键对不上**：重做卷换了副本，导致键命中率不足 100%。必须按覆盖率如实报告，**不硬造答案、不提交**（Task 8）。
5. **停止信号落在交卷前**：安全点上发现已要求停止时，**必须不交卷**——保住那次机会是这条路径唯一的不可逆风险点（Task 8）。

---

### Task 1: 考试族端点表 + 无外层时间戳的签名变体 + 免签 POST

**Files:**
- Modify: `packages/platform-zhs/src/endpoints.ts`
- Modify: `packages/platform-zhs/src/sign.ts:252-259`（`wrapSignedBody`）
- Modify: `packages/platform-zhs/src/client.ts:130-162`（`call` 的两条分支）
- Test: `packages/platform-zhs/test/sign.test.ts`、`test/client.test.ts`

**Interfaces:**
- Produces:
  - `ZHS_HOSTS.exam = 'https://studentexam-api.zhihuishu.com'`、`ZHS_HOSTS.app = 'https://appstudent.zhihuishu.com'`
  - 端点名（`ZhsEndpointName` 的成员）：`examHomeworkList`、`examDoHomework`、`examLookHomework`、`examSaveAnswer`、`examSubmit`、`examRedoNum`、`examApplyRedo`、`examIsObject`、`popupExam`、`examQuestionDoneState`
  - `wrapSignedBody(payload, cKey, stamp?)`——`stamp` 省略时**只**返回 `secretStr=…`

**平台事实（写进注释）：**
- 考试族（`studentexam-api`，module 3）的**外层请求体只有 `secretStr` 一个字段**，时间戳在密文里（源码 `fixeParam()={dateFormate}` 进密文）。这与学习族（外层带 `dateFormate`）和首页族（外层带 `date`）都不同。来源：`.probe/zhs-sbx-submit/net-ch2.jsonl` 实测 + 考试应用源码。
- 路径前缀是 `/studentExam/gateway/t/v1/…`（学习族是 `/gateway/t/v1/…`）。
- `popupExam` 属**学习族**（`studyservice-api`，module 11）——它是答案通道，不是考试族。
- 神谕 `examQuestionDoneState` 在 `appstudent` 宿主，**免签明文表单**，路径 `/appstudent/student/exam/getQuestionDoneState`，POST。

- [ ] **Step 1: 写失败的测试（签名变体）**

在 `test/sign.test.ts` 末尾追加：

```ts
test('省略 stamp 时只输出 secretStr（考试族的外层形态）', async () => {
  const cKey = new TextEncoder().encode('0123456789abcdef');
  const body = await wrapSignedBody({ recruitId: 900004 }, cKey);
  const parts = body.split('&');
  expect(parts).toHaveLength(1);
  expect(parts[0]!.startsWith('secretStr=')).toBe(true);
});
```

- [ ] **Step 2: 跑测试确认失败**

Run: `pnpm --filter @study-pilot/platform-zhs test test/sign.test.ts`
Expected: FAIL —— `wrapSignedBody` 要求第三个参数（TS 报参数缺失 / 运行时报 `stamp.field` 读取失败）

- [ ] **Step 3: 实现**

`sign.ts`：把 `stamp` 改成可选，省略时不拼外层字段：

```ts
export async function wrapSignedBody(
  payload: Record<string, unknown>,
  cKey: Uint8Array<ArrayBuffer>,
  stamp?: { field: StampField; value: number },
): Promise<string> {
  const secretStr = await aesEncrypt(payload, cKey);
  if (stamp === undefined) return `secretStr=${encodeURIComponent(secretStr)}`;
  return `secretStr=${encodeURIComponent(secretStr)}&${stamp.field}=${stamp.value}`;
}
```

`endpoints.ts`：`ZhsEndpoint` 增加注释说明「签名端点可以没有 `stampField`（考试族：时间戳只在密文里）」，并在 `ZHS_HOSTS` 加 `exam` / `app` 两个宿主，按上面的清单补齐端点条目（考试族全部 `module: ZHS_MODULE.exam`、`stampField` **不写**、`stampInside: true`；神谕条目**不写 module**）。

`client.ts` 的签名分支：`stampField` 缺省时不再回退到 `'dateFormate'`，而是不传 stamp：

```ts
const stamp = now();
const inner = endpoint.stampInside === true ? { ...payload, dateFormate: stamp } : { ...payload };
const body = await wrapSignedBody(
  inner,
  await keyFor(endpoint.module),
  endpoint.stampField === undefined ? undefined : { field: endpoint.stampField, value: stamp },
);
```

`client.ts` 的免签分支：`POST` 时把 payload 编成表单体（神谕要 `application/x-www-form-urlencoded`）：

```ts
init = {
  method: endpoint.method,
  headers: { accept: 'application/json', 'user-agent': BROWSER_USER_AGENT },
  credentials: 'include',
};
if (endpoint.method === 'POST') {
  init.headers = { ...init.headers, 'content-type': 'application/x-www-form-urlencoded' };
  init.body = new URLSearchParams(
    Object.entries(payload).map(([k, v]) => [k, String(v)]),
  ).toString();
}
```

- [ ] **Step 4: 写失败的测试（客户端两条分支）**

在 `test/client.test.ts` 末尾追加（沿用该文件已有的替身 `fetch` 与 `recoverKey` 注入先例）：

```ts
test('考试族请求体只有 secretStr，没有外层时间戳', async () => {
  const seen: RequestInit[] = [];
  const client = createZhsClient({
    fetch: async (_url, init = {}) => {
      seen.push(init);
      return offlineKeyResponse(seen.length); // 该文件已有：第一次 c/has 回 sl，之后回业务体
    },
    recoverKey: async () => new TextEncoder().encode('0123456789abcdef'),
  });
  await client.call('examHomeworkList', { recruitId: 900004, courseId: 9000000002, flag: 1 });
  const body = String(seen.at(-1)!.body);
  expect(body.startsWith('secretStr=')).toBe(true);
  expect(body).not.toContain('dateFormate=');
  expect(body).not.toContain('&date=');
});

test('免签 POST 端点用表单体发出参数', async () => {
  const seen: Array<{ url: string; init: RequestInit }> = [];
  const client = createZhsClient({
    fetch: async (url, init = {}) => {
      seen.push({ url: String(url), init });
      return new Response(JSON.stringify({ status: '200', rt: {} }), { status: 200 });
    },
  });
  await client.call('examQuestionDoneState', { recruitId: 900004, questionIds: '[1]' });
  const last = seen.at(-1)!;
  expect(last.init.method).toBe('POST');
  expect(String(last.init.body)).toBe('recruitId=900004&questionIds=%5B1%5D');
});
```

- [ ] **Step 5: 跑测试确认失败，然后实现到通过**

Run: `pnpm --filter @study-pilot/platform-zhs test test/client.test.ts`
Expected: 先 FAIL（未知端点名 / 无 body），实现后 PASS

- [ ] **Step 6: 跑全量测试并提交**

Run: `pnpm --filter @study-pilot/platform-zhs test`
Expected: 全绿

```bash
git add packages/platform-zhs/src/endpoints.ts packages/platform-zhs/src/sign.ts packages/platform-zhs/src/client.ts packages/platform-zhs/test/sign.test.ts packages/platform-zhs/test/client.test.ts
git commit -m "feat(zhs): 考试族端点（外层只有 secretStr）+ 免签 POST 支持"
```

---

### Task 2: 会话带 userId（神谕要）

**Files:**
- Modify: `packages/platform-zhs/src/session.ts`
- Test: `packages/platform-zhs/test/session.test.ts`

**Interfaces:**
- Produces: `ZhsSession` 增加 `userId: number`（未登录为 0）

**平台事实：** `CASLOGC` cookie 的 JSON 里本来就有 `userId`（实测样本：`{"realName":"示例学生",…,"userId":900000009,"uuid":"DEMO0001",…}`）。神谕必须带它，缺了报 500 `NumberFormatException`（2026-10-17 实测）。

- [ ] **Step 1: 写失败的测试**

在 `test/session.test.ts` 追加（沿用该文件已有的 cookie 替身写法）：

```ts
test('从 CASLOGC 读出 userId（神谕入参）', async () => {
  const cookie = encodeURIComponent(JSON.stringify({ uuid: 'DEMO0001', userId: 900000009 }));
  const session = await readSession(async () => cookie);
  expect(session).toEqual({ loggedIn: true, uuid: 'DEMO0001', userId: 900000009 });
});

test('userId 缺失时按未登录处理，不拿 0 凑数', async () => {
  const cookie = encodeURIComponent(JSON.stringify({ uuid: 'DEMO0001' }));
  const session = await readSession(async () => cookie);
  expect(session.loggedIn).toBe(false);
});
```

- [ ] **Step 2: 跑测试确认失败**

Run: `pnpm --filter @study-pilot/platform-zhs test test/session.test.ts`
Expected: FAIL —— `userId` 不存在于返回对象

- [ ] **Step 3: 实现**

`readSession` 的判据同时要求 `uuid` 与 `userId` 为非空字符串/有限数字；任一缺失按未登录处理（**不拿 0 凑数**——神谕拿 0 会静默查不到东西）。未登录分支返回 `{ loggedIn: false, uuid: '', userId: 0 }`。

- [ ] **Step 4: 跑测试确认通过，然后提交**

Run: `pnpm --filter @study-pilot/platform-zhs test test/session.test.ts`
Expected: PASS

```bash
git add packages/platform-zhs/src/session.ts packages/platform-zhs/test/session.test.ts
git commit -m "feat(zhs): 会话补 userId（神谕入参，取自 CASLOGC）"
```

---

### Task 3: 章节测验条目进结构读取

**Files:**
- Modify: `packages/platform-zhs/src/structure.ts`
- Test: `packages/platform-zhs/test/structure.test.ts`

**Interfaces:**
- Produces: `getCourseExams(client, course): Promise<ZhsChapterExam[]>`，其中

```ts
export interface ZhsChapterExam {
  /** 章节名（清单里对应 cpOrderNumber） */
  chapterName: string;
  /** dohomework 路由用的 8 字符串（examBase.id） */
  examKey: string;
  /** 清单条目 id（getStudentHomework 的 id，lookHomework 的 studentExamId 用料） */
  listId: string;
  /** 数字 examId（神谕要） */
  examId: number;
  /** 数字 stuExamId（神谕要） */
  stuExamId: number;
}
```

**平台事实：** `learning/videolist` 的每个章节带 `studentExamDto`，实测形状（`.probe/zhs-ctm-videolist.json`）：

```json
{"id":9000000037,"state":1,"exam":{"id":90000006,"type":1},
 "examUrl":"//onlineexamh5new.zhihuishu.com/stuExamWeb.html#/webExamList/dohomework/900004/DEMOc003/DEMOd004/9000000002/9001/0"}
```

`studentExamDto.id` = **数字 stuExamId**、`studentExamDto.exam.id` = **数字 examId**；`examUrl` 里第 6/7 段是 8 字符串的 `t1`（清单 `id`）与 `t2`（`examId`）。**数字那对只在这里有**——考试族 PC 清单给的是 8 字符串形态，神谕要数字形态。

- [ ] **Step 1: 写失败的测试**

在 `test/structure.test.ts` 追加（沿用该文件已有的假 client 写法）：

```ts
test('章节测验条目：从 studentExamDto 取数字 examId / stuExamId 与两枚 8 字符串', async () => {
  const exams = await getCourseExams(fakeClientWithVideolist(), {
    recruitAndCourseId: 'recruit-secret',
    recruitId: 900004,
  });
  expect(exams).toEqual([
    {
      chapterName: '第一章',
      examKey: 'DEMOd004',
      listId: 'DEMOc003',
      examId: 90000006,
      stuExamId: 9000000037,
    },
  ]);
});

test('没有测验的章节不进表（不拿空对象占位）', async () => {
  const exams = await getCourseExams(fakeClientWithoutExamDto(), {
    recruitAndCourseId: 'recruit-secret',
    recruitId: 900004,
  });
  expect(exams).toEqual([]);
});
```

- [ ] **Step 2: 跑测试确认失败**

Run: `pnpm --filter @study-pilot/platform-zhs test test/structure.test.ts`
Expected: FAIL —— `getCourseExams` 未导出

- [ ] **Step 3: 实现**

在 `structure.ts` 里加 `getCourseExams`：复用同一份 `videoList` 调用（**不新增请求**），逐章取 `studentExamDto`；`examUrl` 按 `#/webExamList/dohomework/<recruitId>/<t1>/<t2>/<courseId>/<schoolId>/<N>` 的**段位**取——从末尾数：`N` 是 `[-1]`、`schoolId` `[-2]`、`courseId` `[-3]`、**`t2` `[-4]`、`t1` `[-5]`**（实测串：`…/dohomework/900004/DEMOc003/DEMOd004/9000000002/9001/0`）。**按段位取，不在整串里正则找**。解析不出必需字段的章节**跳过**（视为该章无测验），不猜。

- [ ] **Step 4: 跑测试确认通过，然后提交**

Run: `pnpm --filter @study-pilot/platform-zhs test test/structure.test.ts`
Expected: PASS

```bash
git add packages/platform-zhs/src/structure.ts packages/platform-zhs/test/structure.test.ts
git commit -m "feat(zhs): 章节测验条目（数字 examId/stuExamId 的唯一合法来源）"
```

---

### Task 4: 考试清单（模块 1）

**Files:**
- Create: `packages/platform-zhs/src/exam-list.ts`
- Test: `packages/platform-zhs/test/exam-list.test.ts`

**Interfaces:**
- Consumes: Task 1 的 `examHomeworkList` 端点
- Produces:

```ts
export interface ZhsExamListItem {
  /** 清单条目 id（lookHomework 的 studentExamId 用料） */
  id: string;
  /** 8 字符串 examId（dohomework 路由的 t2） */
  examId: string;
  examName: string;
  /** 0 = 单元测试；1 = 见面课测验（实测唯二值） */
  meetCourseType: number;
  /** 1 = 未提交；4 = 已提交（实测唯二值） */
  state: number;
  score: number | null;
  totalScore: number | null;
  /** 章节名（单元测试有；见面课测验为 null） */
  chapterName: string | null;
}

export function normalizeHomeworkList(rt: unknown): ZhsExamListItem[];
export async function getExamList(
  client: ZhsClient,
  input: { recruitId: number; courseId: number; submitted: boolean },
): Promise<ZhsExamListItem[]>;
```

**平台事实：** 两页签官方名 **未提交（flag=1）/ 已提交（flag=2）**；请求
`{recruitId, courseId, flag, pageSize:100, pageNum:1, dateFormate}`，`pageSize:100` 一页取全（实测）。响应 `rt.studentHomeworkList[]`。

- [ ] **Step 1: 写失败的测试**

```ts
// test/exam-list.test.ts
test('归一：state 与 meetCourseType 原样透出，score/totalScore 缺失为 null', () => {
  const items = normalizeHomeworkList({
    studentHomeworkList: [
      { id: 'ymVxX7lb', examId: 'DEMOd004', examName: '绪论单元测试', meetCourseType: 0, state: 1, cpOrderNumber: '绪论' },
      { id: 'ab12cd34', examId: 'zz99yy88', examName: '10-13 见面课', meetCourseType: 1, state: 4, score: 9, totalScore: 10, cpOrderNumber: null },
    ],
  });
  expect(items).toHaveLength(2);
  expect(items[0]).toMatchObject({ meetCourseType: 0, state: 1, score: null, totalScore: null, chapterName: '绪论' });
  expect(items[1]).toMatchObject({ meetCourseType: 1, state: 4, score: 9, totalScore: 10, chapterName: null });
});

test('响应形状不对时返回空表，不抛也不猜', () => {
  expect(normalizeHomeworkList({ studentHomeworkList: null })).toEqual([]);
  expect(normalizeHomeworkList(null)).toEqual([]);
});
```

- [ ] **Step 2: 跑测试确认失败**

Run: `pnpm --filter @study-pilot/platform-zhs test test/exam-list.test.ts`
Expected: FAIL —— 模块不存在

- [ ] **Step 3: 实现**

`normalizeHomeworkList` 是纯函数（逐字段按实测类型取，取不到就是 null/0，**不猜**）；`getExamList` 按 `submitted` 映射成 `flag`，只发一次请求（`pageSize: 100`）。

- [ ] **Step 4: 跑测试确认通过，然后提交**

Run: `pnpm --filter @study-pilot/platform-zhs test test/exam-list.test.ts`
Expected: PASS

```bash
git add packages/platform-zhs/src/exam-list.ts packages/platform-zhs/test/exam-list.test.ts
git commit -m "feat(zhs): 考试清单读取（未提交/已提交两页签归一）"
```

---

### Task 5: 题面解析与作答报文（模块 2 的结构层）

**Files:**
- Create: `packages/platform-zhs/src/exam-paper.ts`
- Test: `packages/platform-zhs/test/exam-paper.test.ts`

**Interfaces:**
- Consumes: `exam-answers.ts` 的 `PaperQuestion` / `PaperOption` / `PlannedAnswer`
- Produces:

```ts
/** doHomework 响应 → 卷面（复用 exam-answers 的 PaperQuestion 形状） */
export function parsePaper(rt: unknown): PaperQuestion[];
/** 卷面一道题携带的 eid（作答报文用料） */
export function eidsOf(paper: readonly PaperQuestion[]): string[];
/** 一次作答的报文元素（saveStudentAnswer 外层 stuExamAnswer 数组的一项） */
export interface AnswerPayload {
  eid: string;
  optionIds: string[];
  questionType: number;
}
export function buildAnswerBody(input: {
  answers: readonly AnswerPayload[];
  examId: string;
  recruitId: number;
  stuExamId: string;
  schoolId: number;
  courseId: number;
}): string; // JSON 字符串
```

**平台事实：** `saveStudentAnswer` 用 **`eid` 定位题目**（不是数字题号）——逐字段真机形态见 `.probe/zhs-sbx-submit/eval-close-loop.js`：

```js
[{ examId, recruitId, stuExamId, eid, schoolId, deviceId: '', examType: '', fromType: 3,
   answer: '<选项 id 逗号分隔>', dataIds: '', questionType }]
```

外层：`{ stuExamAnswer: <上面的 JSON 字符串>, recruitId }`。**`fromType: 3` 是实测值，照抄。**

- [ ] **Step 1: 写失败的测试**

```ts
test('parsePaper 从 workExamParts 摊平出题目，eid 与选项 id 都取到', () => {
  const paper = parsePaper({
    examBase: {
      workExamParts: [
        { questionDtos: [{ eid: 'ZGVtby10b2tlbi0wMDAwMg==', name: '创新就是（ ）', questionType: { id: 1 },
            questionOptions: [{ id: 900000006, content: '示例选项戊' }, { id: 900000007, content: '示例选项丁' }] }] },
      ],
    },
  });
  expect(paper).toHaveLength(1);
  expect(paper[0]!.eid).toBe('ZGVtby10b2tlbi0wMDAwMg==');
  expect(paper[0]!.options.map((o) => o.id)).toEqual(['900000006', '900000007']);
});

test('buildAnswerBody 逐字段对齐真机形态', () => {
  const body = buildAnswerBody({
    answers: [{ eid: 'eid-1', optionIds: ['900000006'], questionType: 1 }],
    examId: 'DEMOb002', recruitId: 900004, stuExamId: 'DEMOa001', schoolId: 9001, courseId: 9000000002,
  });
  expect(JSON.parse(body)).toEqual([
    { examId: 'DEMOb002', recruitId: 900004, stuExamId: 'DEMOa001', eid: 'eid-1', schoolId: 9001,
      deviceId: '', examType: '', fromType: 3, answer: '900000006', dataIds: '', questionType: 1 },
  ]);
});

test('没有 eid 或没有选项的题不进报文（不造空作答）', () => {
  const body = buildAnswerBody({
    answers: [{ eid: '', optionIds: [], questionType: 1 }],
    examId: 'x', recruitId: 1, stuExamId: 'y', schoolId: 1, courseId: 1,
  });
  expect(JSON.parse(body)).toEqual([]);
});
```

- [ ] **Step 2: 跑测试确认失败**

Run: `pnpm --filter @study-pilot/platform-zhs test test/exam-paper.test.ts`
Expected: FAIL —— 模块不存在

- [ ] **Step 3: 实现**

`parsePaper` 逐层取 `rt.examBase.workExamParts[].questionDtos[]`，选项 id 统一 `String(...)`（卷面给的是数字，`exam-answers.ts` 的键口径是字符串）。`questionType` 从 `questionDtos[].questionType.id` 取（作答报文要它）。取不到的字段按空处理并跳过该题。

- [ ] **Step 4: 跑测试确认通过，然后提交**

Run: `pnpm --filter @study-pilot/platform-zhs test test/exam-paper.test.ts`
Expected: PASS

```bash
git add packages/platform-zhs/src/exam-paper.ts packages/platform-zhs/test/exam-paper.test.ts
git commit -m "feat(zhs): 卷面解析与作答报文（eid 定位，fromType=3）"
```

---

### Task 6: 神谕（交卷前的官方确认）

**Files:**
- Create: `packages/platform-zhs/src/oracle.ts`
- Test: `packages/platform-zhs/test/oracle.test.ts`

**Interfaces:**
- Consumes: Task 1 的 `examQuestionDoneState` 端点
- Produces:

```ts
export interface OracleVerdict {
  /** 每一题都答对且都判了分 */
  pass: boolean;
  /** 神谕给出的逐题得分之和 */
  scoreSum: number;
  /** 本次问的题数 */
  asked: number;
  /** 神谕没回的题号（缺题 → 不算通过） */
  missing: string[];
  /** 得了 0 分的题号 */
  zeroScored: string[];
}
/** 纯函数：把神谕响应与卷面总分比出结论 */
export function judge(input: {
  rt: unknown;
  questionIds: readonly string[];
  totalScore: number | null;
}): OracleVerdict;
export async function askOracle(
  client: ZhsClient,
  input: { recruitId: number; userId: number; examId: number; stuExamId: number; questionIds: readonly string[] },
): Promise<unknown>;
```

**平台事实（2026-10-17 真机探得，全部写进注释）：** `appstudent` 宿主、免签明文表单；`questionIds` 必填（缺 → HTTP 400）；**只认数字题号**（喂 eid 报 `parseInt error`）；响应 `{rt:{"<题号>":{"score":"2","done":"true"}}}`；判分是**草稿实况**（存错解 0、存正解满分）。

- [ ] **Step 1: 写失败的测试**

```ts
test('判据：Σ得分 == totalScore 且每题都有分 → 通过', () => {
  const verdict = judge({
    rt: { '1': { score: '2', done: 'true' }, '2': { score: '2', done: 'true' } },
    questionIds: ['1', '2'],
    totalScore: 4,
  });
  expect(verdict).toMatchObject({ pass: true, scoreSum: 4, asked: 2, missing: [], zeroScored: [] });
});

test('神谕缺题 → 不通过，并列出缺了哪几题', () => {
  const verdict = judge({
    rt: { '1': { score: '2', done: 'true' } },
    questionIds: ['1', '2'],
    totalScore: 4,
  });
  expect(verdict.pass).toBe(false);
  expect(verdict.missing).toEqual(['2']);
});

test('totalScore 缺失 → 判据失效，一律不通过', () => {
  const verdict = judge({
    rt: { '1': { score: '2', done: 'true' } },
    questionIds: ['1'],
    totalScore: null,
  });
  expect(verdict.pass).toBe(false);
});

test('得了 0 分的题被列出来', () => {
  const verdict = judge({
    rt: { '1': { score: '0', done: 'true' }, '2': { score: '2', done: 'true' } },
    questionIds: ['1', '2'],
    totalScore: 4,
  });
  expect(verdict.pass).toBe(false);
  expect(verdict.zeroScored).toEqual(['1']);
  expect(verdict.scoreSum).toBe(2);
});
```

- [ ] **Step 2: 跑测试确认失败**

Run: `pnpm --filter @study-pilot/platform-zhs test test/oracle.test.ts`
Expected: FAIL —— 模块不存在

- [ ] **Step 3: 实现**

`judge` 是纯函数：`score` 用 `Number(...)` 解析（神谕给的是字符串），解析不出算缺失；`pass` 要求 `totalScore !== null && missing.length === 0 && zeroScored.length === 0 && scoreSum === totalScore`。`askOracle` 只做一次调用并原样返回响应体（HTTP 400「缺少必要的参数」会由 client 抛 `ZhsHttpError`——**不吞**）。

- [ ] **Step 4: 跑测试确认通过，然后提交**

Run: `pnpm --filter @study-pilot/platform-zhs test test/oracle.test.ts`
Expected: PASS

```bash
git add packages/platform-zhs/src/oracle.ts packages/platform-zhs/test/oracle.test.ts
git commit -m "feat(zhs): 神谕——交卷前的官方确认（草稿判分）"
```

---

### Task 7: 答卷会话（有键路径）

**Files:**
- Create: `packages/platform-zhs/src/policy/execute-exam.ts`
- Test: `packages/platform-zhs/test/execute-exam.test.ts`

**Interfaces:**
- Consumes: Task 1/5/6 的端点、`parsePaper`、`buildAnswerBody`、`judge`/`askOracle`、`exam-answers.ts` 的 `matchPaper`/`planAnswering`
- Produces:

```ts
export interface ExecuteExamInput {
  recruitAndCourseId: string;
  recruitId: number;
  courseId: number;
  /** 清单条目 id 与 8 字符串 examId（dohomework/作答/交卷用料） */
  listId: string;
  examKey: string;
  /** 数字 形态（神谕用料）；拿不到时为 0（跳过验证） */
  examIdNum: number;
  stuExamIdNum: number;
  userId: number;
  /** 该卷已解锁的数字题号（来自 lookHomework）；没有就跳过验证 */
  questionIds: readonly string[];
  /** 答案键；null = 缺键（Task 8 处理） */
  key: AnswerKey | null;
  /** 该卷总分（清单的 totalScore）；拿不到为 null */
  totalScore: number | null;
  schoolId: number;
}

export interface ExamOutcome {
  status: 'done' | 'failed' | 'skipped';
  message: string;
}

export async function openPaper(client: ZhsClient, input: ExecuteExamInput): Promise<PaperQuestion[]>;
export async function submitPaper(client: ZhsClient, input: ExecuteExamInput, achieveCount: number): Promise<void>;
```

**平台事实：**
- 开卷 = `student/doHomework`，参数 `{recruitId, examId: examKey, studentExamId: listId, schoolId, courseId}`（真机形态，`.probe/zhs-sbx-submit/eval-close-loop.js`）。**调用即建答卷，无二次确认**。
- 作答 = `answer/saveStudentAnswer`，**一次一题**（真实客户端逐题保存；50 题的卷子就是 50 次调用，见 `.probe/zhs-sbx-submit/net-ch2.jsonl`）。
- 交卷 = `answer/submit`，参数 `{recruitId, examId, stuExamId, achieveCount}`。
- SSO 失效的表现是 302→passport：client 会看到非 JSON 响应。**需要在这里转成类型化错误 + 动作位**（见 Review Focus 1）。

- [ ] **Step 1: 写失败的测试**

```ts
test('开卷后按键作答、神谕通过才交卷', async () => {
  const calls = recordingClient({
    examDoHomework: { rt: oneQuestionPaper() },
    examSaveAnswer: { rt: { statu: '1' } },
    examQuestionDoneState: { status: '200', rt: { '9000000015': { score: '2', done: 'true' } } },
    examSubmit: { rt: { statu: '1' } },
  });
  const outcome = await executeExam(calls.client, {
    ...baseInput,
    questionIds: ['9000000015'],
    totalScore: 2,
    key: keyWith(['900000006']),
  }, NEVER_STOPPED);
  expect(outcome.status).toBe('done');
  expect(calls.names).toEqual(['examDoHomework', 'examSaveAnswer', 'examQuestionDoneState', 'examSubmit']);
});

test('神谕不通过 → 不交卷，如实报告', async () => {
  const calls = recordingClient({
    examDoHomework: { rt: oneQuestionPaper() },
    examSaveAnswer: { rt: { statu: '1' } },
    examQuestionDoneState: { status: '200', rt: { '9000000015': { score: '0', done: 'true' } } },
  });
  const outcome = await executeExam(calls.client, {
    ...baseInput, questionIds: ['9000000015'], totalScore: 2, key: keyWith(['900000007']),
  }, NEVER_STOPPED);
  expect(outcome.status).toBe('failed');
  expect(outcome.message).toContain('未通过验证');
  expect(calls.names).not.toContain('examSubmit');
});

test('停止信号落在交卷前 → 不交卷', async () => {
  const calls = recordingClient({ /* 同上，神谕通过 */ });
  const outcome = await executeExam(calls.client, { ...verifiedInput }, { stopped: () => true });
  expect(outcome.status).toBe('skipped');
  expect(calls.names).not.toContain('examSubmit');
});

test('键覆盖率不足 100% → 不开卷、不交卷，如实报覆盖率', async () => {
  const calls = recordingClient({});
  const outcome = await executeExam(calls.client, {
    ...baseInput,
    key: keyWith(['900000006']),          // 只覆盖得上一题
    paperHasTwoQuestions: true,           // 卷面两题（见该文件卷面工厂）
  }, NEVER_STOPPED);
  expect(outcome.status).toBe('failed');
  expect(outcome.message).toContain('50%');
  expect(calls.names).not.toContain('examSaveAnswer');
  expect(calls.names).not.toContain('examSubmit');
});

test('会话失效（非 JSON 响应）→ 类型化停轮错误 + 打开登录的动作位', async () => {
  const calls = failingClient('examHomeworkList', new SyntaxError('Unexpected token <'));
  await expect(executeExam(calls.client, baseInput, NEVER_STOPPED)).rejects.toMatchObject({
    name: 'ZhsRoundHalt',
    action: { platformId: 'zhihuishu', label: '打开智慧树登录' },
  });
});
```

- [ ] **Step 2: 跑测试确认失败**

Run: `pnpm --filter @study-pilot/platform-zhs test test/execute-exam.test.ts`
Expected: FAIL —— 模块不存在

- [ ] **Step 3: 实现**

顺序（每个安全点先问 `control.stopped()`）：
1. 开卷 → `parsePaper`
2. `planAnswering({ paper, key, remainingAttempts: 2 })`——**有键路径只有 `answer` 与 `report-only` 两种结果**；不是 `answer` 就 `failed` 并如实说覆盖率
3. 逐题 `saveStudentAnswer`（一题一次，逐题之间**不设人工间隔**：作答节奏是「像真人」，但平台的判据是答案本身，不是壁钟——**这一条与期末的限时口径无关，本期不引入等待**）
4. 有 `questionIds` 且拿得到数字 id → `askOracle` + `judge`；不通过 → `failed`（**不交卷**）
5. 交卷 → `done`

SSO 失效：`client.call` 抛出的非 JSON 解析错误转成 `ZhsRoundHalt('需重新登录智慧树', { platformId: 'zhihuishu', label: '打开智慧树登录', url: 'https://www.zhihuishu.com' })`（复用 `execute.ts:37` 的 `ZhsRoundHalt`）。

- [ ] **Step 4: 跑测试确认通过，然后提交**

Run: `pnpm --filter @study-pilot/platform-zhs test test/execute-exam.test.ts`
Expected: PASS

```bash
git add packages/platform-zhs/src/policy/execute-exam.ts packages/platform-zhs/test/execute-exam.test.ts
git commit -m "feat(zhs): 答卷会话（开卷→作答→神谕把关→交卷）"
```

---

### Task 8: 探路重做闭环（缺键路径）

**Files:**
- Modify: `packages/platform-zhs/src/policy/execute-exam.ts`
- Modify: `packages/platform-zhs/src/exam-answers.ts`（新增建键编排的纯函数）
- Test: `packages/platform-zhs/test/execute-exam.test.ts`、`test/exam-answers.test.ts`

**Interfaces:**
- Produces:
  - `packages/platform-zhs/src/exam-answers.ts`: `remainingAttempts(rt: unknown): number`（`3 − rt`，平台算式）
  - `execute-exam.ts`: `executeExamWithProbe(...)`，或在 `executeExam` 内部按 `key === null` 分派

**平台事实（关系不可逆写，逐条写进注释）：**
- 剩余重做次数 = `3 − redoNum().rt`（平台界面源码 `9.c58d6fa5a5050724a831.js:11814`）。
- 重做前平台自己会问 `exam/getIsObject({examId})`：`rt == 1` 才走 `saveCourseTran`，否则弹二维码（人工通道）——**我们照样先问，非客观题只提醒**。
- 申请重做 = `student/saveCourseTran({recruitId, examId, description: '', courseId})`，成功判据 `rt == 1`，文案「申请成功!」。
- **「留最后一次」**：`key === null` 且剩余 < 2 → 不动，只提醒（`MIN_ATTEMPTS_FOR_PROBE` 已是这个数，`exam-answers.ts:196`）。

- [ ] **Step 1: 写失败的测试**

```ts
test('剩余次数取自平台算式 3 − rt', () => {
  expect(remainingAttempts({ rt: 0 })).toBe(3);
  expect(remainingAttempts({ rt: 2 })).toBe(1);
  expect(remainingAttempts({ rt: 3 })).toBe(0);
});

test('缺键且只剩 1 次 → 不开卷、不交卷，只提醒', async () => {
  const calls = recordingClient({ examRedoNum: { rt: 2 }, examIsObject: { rt: 1 } });
  const outcome = await executeExam(calls.client, { ...baseInput, key: null, questionIds: [] }, NEVER_STOPPED);
  expect(outcome.status).toBe('skipped');
  expect(outcome.message).toContain('1 次');
  expect(calls.names).not.toContain('examDoHomework');
});

test('缺键且剩余 ≥2 → 首答 → 交卷 → 收割建键 → 申请重做 → 套键定分', async () => {
  const calls = recordingClient({
    examRedoNum: { rt: 0 },
    examIsObject: { rt: 1 },
    examDoHomework: { rt: oneQuestionPaper() },
    examSaveAnswer: { rt: { statu: '1' } },
    examSubmit: { rt: { statu: '1' } },
    examLookHomework: { rt: ['9000000015'] },
    popupExam: { data: { lessonTestQuestionUseInterfaceDtos: [popupQuestion()] } },
    examApplyRedo: { rt: 1 },
    examQuestionDoneState: { status: '200', rt: { '9000000015': { score: '2', done: 'true' } } },
  });
  const outcome = await executeExam(calls.client, { ...baseInput, key: null }, NEVER_STOPPED);
  expect(outcome.status).toBe('done');
  // 两次开卷：探路一枪 + 重做一枪
  expect(calls.names.filter((n) => n === 'examDoHomework')).toHaveLength(2);
  expect(calls.names).toContain('examApplyRedo');
});

test('非客观题 → 不申请重做，只提醒', async () => {
  const calls = recordingClient({ examRedoNum: { rt: 0 }, examIsObject: { rt: 0 } });
  const outcome = await executeExam(calls.client, { ...baseInput, key: null }, NEVER_STOPPED);
  expect(outcome.status).toBe('skipped');
  expect(calls.names).not.toContain('examApplyRedo');
});
```

- [ ] **Step 2: 跑测试确认失败**

Run: `pnpm --filter @study-pilot/platform-zhs test test/execute-exam.test.ts`
Expected: FAIL —— 分支不存在

- [ ] **Step 3: 实现**

`key === null` 时的顺序（每个写动作前问停止）：
1. `examRedoNum` → 剩余；`examIsObject` → 是否客观题
2. 剩余 < 2 或非客观题 → `skipped` + 提醒（**不动任何写**）
3. 开卷 → 首答（**不套键，如实留空/随便选**：这一枪的作用只是解锁题号）→ 交卷
4. `examLookHomework({recruitId, studentExamId: listId, examId: examKey, schoolId, courseId})` → 数字题号
5. `popupExam({lessonId, recruitId, courseId, questionIds})` → `answerKeyFromPopupExam` 建键（`lessonId` 用该章第一个课时的 id——**从 Task 3 的章节数据带过来**）
6. `examApplyRedo` → 成功则重开卷
7. 回到 Task 7 的作答→神谕→交卷

**首答的答案怎么给**：不套键时每题至少要有一次作答才能交卷；用**卷面第一个选项**（确定、可见、不隐藏意图），并在结果文案里如实说明「首答为探路」。

- [ ] **Step 4: 跑测试确认通过，然后提交**

Run: `pnpm --filter @study-pilot/platform-zhs test test/execute-exam.test.ts test/exam-answers.test.ts`
Expected: PASS

```bash
git add packages/platform-zhs/src/policy/execute-exam.ts packages/platform-zhs/src/exam-answers.ts packages/platform-zhs/test/
git commit -m "feat(zhs): 探路重做闭环（缺键时首答解锁题号→收割→重做定分）"
```

---

### Task 9: 任务接线（plan / run）

**Files:**
- Modify: `packages/platform-zhs/src/policy/tasks.ts`
- Modify: `packages/platform-zhs/src/index.ts`
- Test: `packages/platform-zhs/test/tasks.test.ts`

**Interfaces:**
- Produces: `PlanItem.kind = 'quiz'`、`itemId = 'zhs-quiz-<listId>'`；`ZhsRunDeps` 不变

- [ ] **Step 1: 写失败的测试**

```ts
test('计划里每个未提交的单元测试成一项，kind=quiz，按课程分组', async () => {
  const tasks = createZhsTasks(depsWith({ homework: [{ id: 'ymVxX7lb', state: 1, meetCourseType: 0 }] }));
  const plan = await tasks.plan(Date.now(), { platformId: 'zhihuishu', group: '示例课程己' });
  expect(plan.items).toHaveLength(1);
  expect(plan.items[0]).toMatchObject({ kind: 'quiz', group: '示例课程己' });
  expect(plan.items[0]!.id).toBe('zhs-quiz-ymVxX7lb');
});

test('已提交的条目不进计划', async () => {
  const tasks = createZhsTasks(depsWith({ homework: [{ id: 'a', state: 4, meetCourseType: 0 }] }));
  const plan = await tasks.plan(Date.now(), { platformId: 'zhihuishu' });
  expect(plan.items).toEqual([]);
});
```

- [ ] **Step 2: 跑测试确认失败**

Run: `pnpm --filter @study-pilot/platform-zhs test test/tasks.test.ts`
Expected: FAIL —— 计划里没有 quiz 项

- [ ] **Step 3: 实现**

`plan` 里：每门勾选课程除视频单元外，再读一次清单（`getExamList` 两次：未提交 + 已提交，后者用于建键时确认题号来源）与章节测验条目（Task 3），产出 `kind: 'quiz'` 的项。`run` 里按 `kind` 分派到 `executeExam`。`payload` 装 `{course, item, chapterExam, questionIds, totalScore}`。

**注意**：`plan` 是只读的——`getExamList` 与 `getCourseExams` 都是读接口，**绝不能在计划阶段开卷**。

- [ ] **Step 4: 跑测试确认通过，然后提交**

Run: `pnpm --filter @study-pilot/platform-zhs test`
Expected: 全绿

```bash
git add packages/platform-zhs/src/policy/tasks.ts packages/platform-zhs/src/index.ts packages/platform-zhs/test/tasks.test.ts
git commit -m "feat(zhs): 单元测试进计划与执行分派（kind=quiz）"
```

---

### Task 10: 导出收口与全量校验

**Files:**
- Modify: `packages/platform-zhs/src/index.ts`
- Test: 全量

- [ ] **Step 1: 补齐导出**

新增导出：`getExamList` / `normalizeHomeworkList` / `ZhsExamListItem`、`parsePaper` / `buildAnswerBody` / `AnswerPayload`、`judge` / `askOracle` / `OracleVerdict`、`remainingAttempts`、`getCourseExams` / `ZhsChapterExam`。

- [ ] **Step 2: 全量测试与类型检查**

Run: `pnpm --filter @study-pilot/platform-zhs test && pnpm --filter @study-pilot/platform-zhs typecheck`
Expected: 全绿、无类型错误

- [ ] **Step 3: 提交**

```bash
git add packages/platform-zhs/src/index.ts
git commit -m "feat(zhs): 单元测试相关导出收口"
```

---

### Task 11: 真机验收（沙箱课，全部 18 章）

**Files:** 无代码改动（除非真机暴露问题——那时回到对应任务补测试）

- [ ] **Step 1: 先验会话**

在扩展里打开智慧树设置页，确认会话在（考试族要 CAS SSO；过期时按 Review Focus 1 的路径应给出「打开智慧树登录」）。

- [ ] **Step 2: 单章闭环**

对《示例课程己》**第三章**（已是草稿、未交）跑一次「只做这一条」。验收点：
- 神谕调用发生在 `submit` **之前**（抓包确认）；
- 交卷后清单回读 `state=4`，分数为满分；
- **神谕在重做卷草稿上判分**——这是设计里唯一的推断项（§1.4 末），本次跑通即转为实证。

- [ ] **Step 3: 全量 18 章**

按 Ryan 口径**统一实现、不分散**：把该课全部未完成的单元测试跑完，逐项核对分数回读。

- [ ] **Step 4: 把真机结论写回文档**

FINDINGS 补一节（神谕在重做卷上的实证、首次全量运行的实际批次数与风控表现）；设计文档 §7 把那处「推断」改成「已实证」。

---

## 不在本计划内（下一步）

- **展示架构**（设计文档 §2）：设置页按成绩构成组织、待办里出现测验项、弹窗组件——设计文档已写明「细案等 Ryan 的界面设计（另文）」。
- **见面课测验 / 期末考试 / 见面课 / 成绩报告**（模块 4/6 与模块 2 的其余入口）：本计划把答卷会话做成了通用形状，它们各自只差入口参数与时间窗校验。
- **答案键来源②（同课副本）与落盘**：有了才需要定「键存哪一层」（设计文档 §7-5）。
