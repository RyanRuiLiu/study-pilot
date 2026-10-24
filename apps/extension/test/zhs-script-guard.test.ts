/*
 * 智慧树判据接管测试。
 *
 * 复现站点的判据：从 window.originFunction 取 FunctionToString / RegExpTest，
 * 用 hasOwnProperty 的原生源码拼出「原生函数」正则，再判断一个被改写的函数。
 * 断言的是根：判据被接管之后，不论哪个函数被换过，结果都是「原生」。
 *
 * 用最小 window 替身而不是 linkedom：linkedom 的 window 是 globalThis 的代理，
 * 测试之间会共享 originFunction 与安装标记；本模块只需要三个全局构造器。
 */

import { describe, expect, it } from 'vitest';
import { installZhsScriptGuard } from '../src/features/zhs/script-guard.ts';

type OriginFunction = {
  FunctionToString: (this: Function) => string;
  RegExpTest: (this: RegExp, value: string) => boolean;
  AttachShadow?: unknown;
};

type Realm = {
  Function: typeof Function;
  RegExp: typeof RegExp;
  Object: typeof Object;
};

type TestWindow = Window & {
  originFunction?: OriginFunction;
  OCS?: unknown;
};

function makeWindow(): TestWindow {
  return { Function, RegExp, Object } as unknown as TestWindow;
}

function realmOf(win: TestWindow): Realm {
  return win as unknown as Realm;
}

function snapshotOf(win: TestWindow): OriginFunction {
  const realm = realmOf(win);
  return {
    RegExpTest: realm.RegExp.prototype.test,
    FunctionToString: realm.Function.prototype.toString,
  };
}

/** 站点 bundle 里的原生判据。 */
function isNative(win: TestWindow, value: unknown): boolean {
  const origin = win.originFunction;
  if (!origin) throw new Error('originFunction 未被接管');
  const realm = realmOf(win);
  const nativeSource = origin.FunctionToString.call(realm.Object.prototype.hasOwnProperty);
  const pattern = new realm.RegExp(
    '^' +
      nativeSource
        .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
        .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
      '$',
  );
  return origin.RegExpTest.call(pattern, origin.FunctionToString.call(value as Function));
}

describe('智慧树判据接管', () => {
  it('页面赋值并冻结快照后，被改写的函数仍通过原生判据', () => {
    const win = makeWindow();
    installZhsScriptGuard(win);

    // 站点内联脚本：先赋值，再 freeze（freeze 读到的是访问器返回的包装对象）
    win.originFunction = snapshotOf(win);
    Object.freeze(win.originFunction);

    function patchedOpen(): void {
      // 模拟被插件改写过的 XMLHttpRequest.prototype.open
    }

    expect(Object.isFrozen(win.originFunction)).toBe(true);
    expect(isNative(win, patchedOpen)).toBe(true);
  });

  it('本来就是原生的函数，源码原样返回', () => {
    const win = makeWindow();
    installZhsScriptGuard(win);
    win.originFunction = snapshotOf(win);

    const realm = realmOf(win);
    const native = realm.Object.prototype.hasOwnProperty;
    expect(win.originFunction.FunctionToString.call(native)).toBe(
      realm.Function.prototype.toString.call(native),
    );
    expect(win.originFunction.FunctionToString.call(native)).toContain('[native code]');
  });

  it('考试页快照里的 AttachShadow 保持原值', () => {
    const win = makeWindow();
    installZhsScriptGuard(win);

    const attachShadow = (): string => 'shadow';
    win.originFunction = {
      ...snapshotOf(win),
      AttachShadow: attachShadow,
    };
    Object.freeze(win.originFunction);

    expect(win.originFunction.AttachShadow).toBe(attachShadow);
  });

  it('window.OCS 恒为假', () => {
    const win = makeWindow();
    installZhsScriptGuard(win);

    win.OCS = true;
    expect(win.OCS).toBe(false);
  });

  it('originFunction 已被固定住时显式失败', () => {
    const win = makeWindow();
    Object.defineProperty(win, 'originFunction', {
      configurable: false,
      value: snapshotOf(win),
    });

    expect(() => installZhsScriptGuard(win)).toThrow('originFunction 已存在且不可重定义');
  });

  it('重复安装不会清空已经接管的快照', () => {
    const win = makeWindow();
    installZhsScriptGuard(win);
    win.originFunction = snapshotOf(win);
    const guarded = win.originFunction;

    installZhsScriptGuard(win);
    expect(win.originFunction).toBe(guarded);
  });
});
