/*
 * 会话失效后的恢复编排。
 *
 * 数据读取路径见到未登录形态（SessionExpiredError）时的统一处置：
 * 先用持久凭证续期一次，续期成功就重读；续不了才把「需要重新登录」
 * 如实交出去。续期动作以依赖注入进来，本模块保持纯逻辑可测。
 */

import { SessionExpiredError } from './session';

/** 恢复之后一次读取的三种结局。 */
export type RecoveryOutcome<T> =
  | { ok: true; value: T }
  /** 服务端不认这个登录，且持久凭证也救不回来——用户需要重新登录 */
  | { ok: false; kind: 'login'; message: string }
  /** 其他失败：网络、平台异常，或「续期成功但数据仍是未登录形态」 */
  | { ok: false; kind: 'error'; message: string };

/** 读一次；若因会话失效而败，续期后重读一次。renew 返回「是否换到了新会话」。 */
export async function withSessionRecovery<T>(
  read: () => Promise<T>,
  renew: () => Promise<boolean>,
): Promise<RecoveryOutcome<T>> {
  let first: T;
  try {
    first = await read();
  } catch (error) {
    if (!(error instanceof SessionExpiredError)) {
      return { ok: false, kind: 'error', message: describe(error) };
    }

    if (!(await renew())) {
      return {
        ok: false,
        kind: 'login',
        message: '登录已失效，且自动恢复没有成功',
      };
    }

    try {
      return { ok: true, value: await read() };
    } catch (retry) {
      /*
       * 续期成功却仍是未登录形态：会话已被服务端接受，读不到就不再是
       * 登录的问题（比如课程全部结束、termId 全部失效）。按普通失败
       * 上报，不要引导用户去重复登录——那解决不了他的问题。
       */
      if (retry instanceof SessionExpiredError) {
        return {
          ok: false,
          kind: 'error',
          message: '会话已恢复，但课程数据仍读不到（课程可能已结束或移除）',
        };
      }
      return { ok: false, kind: 'error', message: describe(retry) };
    }
  }
  return { ok: true, value: first };
}

function describe(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/** 确认救不回来时给用户的统一说法。四个调用点共用，不许各写一份。 */
const LOGIN_RECOVERY_FAILED_MESSAGE = '登录已失效，且自动恢复没有成功，请重新登录慕课平台';

/** 恢复失败时前台消息的失败形状。 */
export interface RecoveryFailure {
  /** 仅在确认登录失效时给出；普通失败只带 message，界面据此区分入口与错误说明 */
  reason?: 'NOT_LOGGED_IN';
  message: string;
}

/** 把恢复失败的结局归一到前台的失败形状。调用方只在 outcome.ok === false 时用它。 */
export function recoveryFailure(
  outcome: Extract<RecoveryOutcome<unknown>, { ok: false }>,
): RecoveryFailure {
  return outcome.kind === 'login'
    ? { reason: 'NOT_LOGGED_IN', message: LOGIN_RECOVERY_FAILED_MESSAGE }
    : { message: outcome.message };
}
