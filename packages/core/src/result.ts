/**
 * 显式结果类型。
 *
 * 平台接口的失败是**常态**而不是异常：未登录、课程不存在、测验已过期、
 * 服务端限流……这些都是预期内的分支。用返回值表达失败，调用方就不会
 * 因为忘记 try/catch 而把"业务失败"和"代码崩溃"混在一起。
 */

export interface Ok<T> {
  ok: true;
  value: T;
}

export interface Err<E> {
  ok: false;
  error: E;
}

export type Result<T, E> = Ok<T> | Err<E>;

export function ok<T>(value: T): Ok<T> {
  return { ok: true, value };
}

export function err<E>(error: E): Err<E> {
  return { ok: false, error };
}

/** 取出值，失败时抛出。只应在已经判定过 `ok` 的分支里使用。 */
export function unwrap<T, E>(result: Result<T, E>): T {
  if (result.ok) return result.value;
  throw new Error(`unwrap 了一个失败结果：${JSON.stringify(result.error)}`);
}
