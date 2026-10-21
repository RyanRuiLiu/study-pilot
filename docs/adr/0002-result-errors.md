# ADR 0002：可判别的失败用 Result，控制流用抛出

- 状态：已采纳｜2026-10-21
- 关联：`packages/core/src/result.ts`、`packages/transport/src/errors.ts`、
  `packages/platform-zhs/src/client.ts`、`packages/application/src/round.ts`

## 背景

平台失败分两类：一类是调用方**需要分支处理**的（网络、HTTP、业务码、超时、未登录），
另一类是**必须打断当前流程**的（会话失效需要整轮停止、撞人机验证需要停轮并给动作位）。
混成一种会让调用方到处 try/catch，或把该停的轮次吞成一条日志。

## 决定

- 协议层（transport/ai）用 `Result<T, TransportError|AiError>`，错误带 `kind`，不抛。
- 领域客户端的**业务拒绝**抛类型化错误（`ZhsApiError`/`ZhsHttpError`/`ZhsTimeoutError`），
  由策略层翻译成结果或停止信号。
- 控制流错误（`ZhsRoundHalt`、`SessionExpiredError`）用抛出，因为它们要穿透多层循环。
- 错误文案进 `message`，结构化的「下一步」进 `action`，界面只渲染两者。

## 后果

- 好处：调用方按 `kind`/类型分支，不解析字符串；停轮的处置集中在一处。
- 代价：同一层内「返回还是抛」需要判断；本 ADR 就是判据：需要分支→Result，需要打断→抛。
