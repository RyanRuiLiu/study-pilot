/*
 * 端口：应用层与载体之间的唯一接口。
 *
 * 分两类，名字沿用 Cockburn 的说法（他称 driving / driven，也叫 primary / secondary）：
 *
 *   驱动端口（载体 → 应用）  载体调用的用例入口。
 *                            现在只有一个：`StudyApp`，见 app.ts。
 *                            扩展的消息路由、命令行的参数解析、服务端的 HTTP 路由
 *                            都只是它的适配器，因此应用层里没有一行消息代码。
 *
 *   被驱动端口（应用 → 载体）  应用需要外界提供的能力。每一个都只有一件事，
 *                            且**定义成什么取决于应用需要什么**，不是取决于
 *                            某个载体碰巧有什么 API。
 *
 * 一条判据：端口的实现方（载体、厂商适配器）可以依赖这里，这里不许依赖它们。
 */

import type { PlanItem, PlanResult, RunOutcome, RunState, TaskState } from './model.ts';

// ---------- 厂商适配器要实现的端口 ----------

/**
 * 一个平台要做的事。
 *
 * 应用层只通过它认识平台：能不能做、该做什么、怎么做。厂商字段一律装在
 * `PlanItem.payload` 里原样交回，应用层不解释。
 */
export interface PlatformTasks {
  id: string;
  name: string;
  /** 前置条件（登录/会话）。调度据此决定"等登录"还是继续 */
  isReady(): Promise<boolean>;
  /**
   * 该做什么。调度只执行 mode 为 auto 的项。
   *
   * 没有「要不要重新拉」的选项：每次调用都拿最新数据，不做任何缓存。
   */
  plan(now: number): Promise<PlanResult>;
  /** 做一件。失败如实返回，调度不重试、不解释 */
  run(item: PlanItem, heartbeat: () => Promise<void>): Promise<RunOutcome>;
}

/**
 * 外壳要观察的平台信号。
 *
 * 外壳不认识任何平台的名字：cookie 叫什么都是平台自己的事。
 * 装配层把各平台的这一份交给外壳，外壳只按清单遍历。
 */
export interface PlatformWiring {
  id: string;
  /**
   * 登录凭证 cookie：它出现即表示登录成功，用于「挂起等登录」之后补跑一轮。
   * 缺省表示该平台没有这种信号，外壳便不观察 cookie。
   *
   * **必须是登录后才下发的那个**：匿名会话 cookie 在访客状态下也有，
   * 拿它当信号会在没人登录时误触发（慕课就踩过这个坑）。
   */
  loginCookie?: { name: string; domain: string };
  /**
   * 需要改写请求头的规则；没有就传空数组。
   *
   * 刻意不是可选字段：可选意味着调用方要写 `?? []`，而规则安装是**全量替换**——
   * 一个忘了声明的平台会把别人的规则一起清掉。必填让这件事在编译期就要表态。
   */
  requestRules: NetRuleSet[];
}

/** 一条请求头改写规则：把这些路径前缀的请求头指向该平台自己的源。 */
export interface NetRuleSet {
  /** 平台源，改写后的 Origin 与 Referer 都指向它 */
  origin: string;
  /**
   * 要覆盖的路径前缀（拼在域名之后的片段）。
   *
   * 用精确前缀而不是整站：放宽到整个域名会把图片、脚本等静态资源的 Origin
   * 一并改掉，没有必要。
   */
  paths: string[];
}

// ---------- 载体要实现的端口 ----------

/**
 * 宿主能力：应用要运行环境提供的那几件事。
 *
 * 定义在端口里而不是载体里：载体实现它、应用使用它，两边都只认这一份定义。
 * 应用与厂商适配器内部因此不出现 `browser.*`，换宿主（命令行、测试替身）
 * 时只换实现。
 */
export interface HostCapabilities {
  /** 等请求头改写规则生效（规则由载体安装） */
  whenRequestRulesReady: (rules: NetRuleSet[]) => Promise<void>;
  /** 读某个域名下的 cookie；没有或读失败都返回空串 */
  readCookie: (origin: string, name: string) => Promise<string>;
}

/**
 * 配置端口。
 *
 * 只有应用真正要用的两个动作。没有 `watch`、没有 `reset`：那两件是载体自己的
 * 事（前者用来重挂定时器，后者是设置页的按钮），应用层从不调用它们，
 * 放进端口只会变成没人实现的假接口。
 *
 * 形状由应用决定，不由存储决定：`update` 收的是局部补丁，怎么深合并由
 * 配置的规范化规则说了算（见 config/）。
 */
export interface ConfigPort {
  read(): Promise<Settings>;
  update(patch: unknown): Promise<Settings>;
}

/**
 * 跨次运行状态的存取。
 *
 * 只有读写两种动作：**状态的迁移规则在应用层**（什么时候落 runningSince、
 * 什么时候清心跳、挂起标记怎么收尾），载体只负责把这一份整体存下来、
 * 整体读回来。把它做成「载体提供 begin/finish 等方法」是反的——那等于
 * 让载体决定状态机的规则。
 */
export interface TaskStorePort {
  read(): Promise<TaskState>;
  write(state: TaskState): Promise<void>;
}

/**
 * 执行进度：给用户看的那一份。
 *
 * 同样是「读一份、写一份」：每一步该记什么由应用层决定（见 model.ts 的
 * RunState 形状），载体只决定这份东西**送到哪**——扩展送进存储并推给已打开
 * 的页面，命令行打到标准输出。
 */
export interface ProgressPort {
  snapshot(): Promise<RunState>;
  publish(state: RunState): Promise<void>;
}

/*
 * 配置的形状从 config/ 引入，与 `Settings` 的唯一定义放在一起。
 * 放在文件末尾是因为上面几个端口都要提到它，读起来更顺。
 */
import type { Settings } from './config/index.ts';
