/*
 * 渲染的「最后一次说了算」（唯一实现）。
 *
 * 一块区域可能被多个入口同时触发渲染：首帧、点「读取」、勾选变化后的重读、
 * 运行状态推送。两次渲染交叠时，**先发后到**的那次会把已经落定的内容重新
 * 打回骨架，或者用旧结论（比如请求失败时的「未登录」）覆盖新结论——
 * 界面上就是「闪一下又变回来」。
 *
 * 做法：每次渲染领一个序号；结果回来时若已有更新的渲染在跑，就丢弃这次结果。
 * 只丢结果，不取消请求（请求本身可能有副作用之外的用途，也便于排错）。
 */

/** 领一个渲染序号；配合 {@link isLatest} 使用。 */
export function nextRenderToken(scope: { token: number }): number {
  scope.token += 1;
  return scope.token;
}

/** 这个序号还是最新的吗？不是就丢弃本次结果，别让它再动 DOM。 */
export function isLatest(scope: { token: number }, token: number): boolean {
  return token === scope.token;
}

/** 每块区域一个的序号持有者。 */
export interface RenderScope {
  token: number;
}

export function createRenderScope(): RenderScope {
  return { token: 0 };
}
