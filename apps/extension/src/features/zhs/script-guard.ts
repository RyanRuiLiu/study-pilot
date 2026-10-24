/*
 * 智慧树页面的原生函数判据接管（MAIN world，document_start）。
 *
 * 站点不直接检查原生函数，而是先在页面 <head> 的内联脚本里抓一份快照并冻结：
 *
 *   var originFunction = {
 *     RegExpTest: window.RegExp.prototype.test,
 *     FunctionToString: window.Function.prototype.toString,
 *     AttachShadow: window.Element.prototype.attachShadow,   // 考试页
 *   };
 *   Object.freeze(originFunction);
 *
 * 业务 bundle 在模块加载时把这份快照解构走（学习页与考试页都是这样），之后
 * 所有「是不是原生」的判断都走它。于是判据的根不是那些原生函数，而是 window
 * 上的这个全局对象——它必须在任何扩展脚本之前创建并冻结。
 *
 * 本模块在 document_start 抢先给 window.originFunction 装上访问器：站点赋值
 * 时换成包装对象，FunctionToString 对任何函数都返回原生形态（本来就是原生的
 * 原样返回），RegExpTest / AttachShadow 保持站点给的真值。站点随后 freeze
 * 的是包装对象，反而把判据锁死。
 *
 * 另一个判据项是 !window.OCS（考试页）：其他自动化脚本会拿它当标记，所以这里
 * 把 window.OCS 影子成恒假。
 *
 * 不碰 XMLHttpRequest / fetch / addEventListener / JSON——页面真实环境保持原样，
 * 失效的只是「验真」的那把尺子。这是根除，不是逐条拦截检测分支。
 *
 * 接管不了（window 上已经有不可重定义的 originFunction / OCS）就抛出，不假装
 * 成功：静默继续等于把「检测仍会发生」藏起来。
 *
 * 为什么必须在 MAIN world：默认的隔离世界改不到页面的 window；MAIN world +
 * document_start（Chrome 111 起）才能稳定早于页面内联脚本。
 */

type OriginSnapshot = {
  RegExpTest: (this: RegExp, value: string) => boolean;
  FunctionToString: (this: Function) => string;
  AttachShadow?: unknown;
};

const INSTALL_FLAG = Symbol.for('study-pilot.zhs-script-guard');

export function installZhsScriptGuard(win: Window): void {
  const globalObject = win as unknown as Record<PropertyKey, unknown>;
  if (globalObject[INSTALL_FLAG] === true) return;
  globalObject[INSTALL_FLAG] = true;

  // Window 类型不声明这些全局构造器，运行时它们挂在页面全局对象上
  const realm = win as unknown as {
    Function: typeof Function;
    RegExp: typeof RegExp;
  };
  const nativeFunctionToString = realm.Function.prototype.toString;
  const guardedSnapshots = new WeakSet<object>();

  function nativeLookingSource(value: Function): string {
    const name = /^[A-Za-z_$][\w$]*$/.test(value.name) ? value.name : '';
    return `function ${name}() { [native code] }`;
  }

  function guardedFunctionToString(this: Function): string {
    const source = Reflect.apply(nativeFunctionToString, this, []);
    return source.includes('[native code]') ? source : nativeLookingSource(this);
  }

  function guardSnapshot(snapshot: OriginSnapshot): OriginSnapshot {
    if (guardedSnapshots.has(snapshot)) return snapshot;

    const wrapper = Object.create(snapshot) as OriginSnapshot;
    Object.defineProperty(wrapper, 'FunctionToString', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: guardedFunctionToString,
    });
    Object.defineProperty(wrapper, 'RegExpTest', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: snapshot.RegExpTest,
    });
    if ('AttachShadow' in snapshot) {
      Object.defineProperty(wrapper, 'AttachShadow', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: snapshot.AttachShadow,
      });
    }

    guardedSnapshots.add(wrapper);
    return wrapper;
  }

  const originDescriptor = Object.getOwnPropertyDescriptor(win, 'originFunction');
  if (originDescriptor !== undefined && !originDescriptor.configurable) {
    throw new Error('originFunction 已存在且不可重定义，判据无法在页面脚本之前接管');
  }

  let currentSnapshot: OriginSnapshot | undefined;
  Object.defineProperty(win, 'originFunction', {
    configurable: true,
    enumerable: originDescriptor?.enumerable ?? true,
    get() {
      return currentSnapshot;
    },
    set(snapshot: OriginSnapshot) {
      currentSnapshot = guardSnapshot(snapshot);
    },
  });

  const ocsDescriptor = Object.getOwnPropertyDescriptor(win, 'OCS');
  if (ocsDescriptor !== undefined && !ocsDescriptor.configurable) {
    throw new Error('window.OCS 已存在且不可重定义，判据无法接管');
  }
  Object.defineProperty(win, 'OCS', {
    configurable: true,
    enumerable: false,
    get() {
      return false;
    },
    set() {
      // 其他脚本把它当标记置真时，页面读到的仍是假
    },
  });
}
