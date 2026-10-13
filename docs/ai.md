# AI 能力

需要 AI 的功能由模型生成内容。本文说明它怎么接、怎么失败、边界在哪。

**当前只有一个 AI 用途：讨论区留言。** 其它地方要用 AI，按第 5 节加一个任务即可。

## 1. 分层

```
apps/extension ──► packages/ai ──► packages/core
        └────────► packages/platform-mooc ──► packages/transport ──► packages/core
```

| 层 | 知道什么 | 不知道什么 |
|---|---|---|
| `packages/ai` | 怎么把一段对话发出去（OpenAI 兼容 `/chat/completions`）、超时、失败分类 | 业务：不认识课件、讨论、题目；不读设置 |
| `apps/extension/src/ai` | 任务表（提示词、输出解析）、重试策略、权限、把设置变成端口 | 平台协议 |
| `packages/platform-mooc` | 「讨论单元要有一条回复」这一事实，依赖注入的 `TextGenerator` 端口 | 任何厂商、任何提示词、任何密钥 |

`packages/ai` 与 `transport` 平级、只依赖 `core`。**平台那份请求节流不适用于模型调用**：两者是不同服务，互不影响。

## 2. 设置

顶层 `ai`，与 `mooc` 并列，默认关闭且**不预填任何厂商**：

```ts
ai: { enabled, baseUrl, model, apiKey }
```

- 四个字段就是全部。超时（30 秒）、最大 token（600）、温度（0.6）是 `packages/ai` 里的常量，不做成旋钮
- 地址归一化：`https://api.x.com`、`https://api.x.com/v1`、`https://api.x.com/v1/chat/completions` 都落到同一端点
- **密钥只存本机**（`chrome.storage.local`），不参与同步、不进日志、不进导出与错误消息

## 3. 权限

地址由用户填写，事先不知道域名，因此清单里把主机权限声明为**可选通配**
（`optional_host_permissions`）。声明不等于拥有：

- 实际申请只针对用户填写的那个源（设置页「申请权限」按钮，用户手势里调用 `permissions.request`）
- 不开启 AI，则一个第三方域名都没有
- 换地址后需要重新申请

## 4. 唯一路径与失败语义

**没有兜底文案。** 讨论留言必须由模型写出：

| 环节 | 行为 |
|---|---|
| 未配置 AI | 讨论单元**不进计划**（`UnitBehavior.needs = 'text'`），显示为需要自己处理 |
| 模型输出格式 | 只有一个：`{"reply":"…"}`（允许去掉代码块围栏与首尾空白，属解析卫生） |
| 格式不符 / 网络 / 超时 / 5xx / 429 | 重试，共 3 次尝试，退避 600ms×n |
| 配置错误（缺地址/密钥/模型） | **不重试**，直接失败 |
| 仍失败 | 记为失败：**不留言、不报完成**，由用户处理。绝不用固定文案顶替 |
| 内容校验 | 去代码块与链接、长度 2~200 字，不合规视为失败 |

失败会出现在通知与运行结果里，不会静默。

## 5. 怎么加一个 AI 用途

1. `apps/extension/src/ai/tasks/<name>.ts`：写 `messages(input)` 与 `parse(content)`，**格式只有一种**
2. 在 `apps/extension/src/ai/index.ts` 的 `AI_TASKS` 登记一行
3. 需要 AI 的行为在 `platform-mooc` 里声明 `needs: 'text'`，并只依赖注入的 `generateText`
4. 补测试：提示词构造、合法输出、非法输出、失败路径

## 6. 隐私

发出去的内容只有任务需要的材料（讨论：讨论题名）。不含账号、学号、cookie、课程列表、他人作答。
用户可在设置页随时关闭；关闭后相关功能不再自动执行。详见 [PRIVACY.md](../PRIVACY.md) 的「可选 AI」。
