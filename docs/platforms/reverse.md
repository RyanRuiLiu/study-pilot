# 逆向工作流

本项目的所有平台结论都必须来自可复现的取证，禁止凭印象推断。这份文档说明如何取证。

## 1. 先知道两件事

### sourcemap 是空的

站点在 bundle 末尾声明了 sourcemap：

```
core_210ab52d....js   -> ./s/core.js.map
```

但取回来是空占位，无法还原原始工程：

```json
{"version":3,"sources":[],"names":[],"mappings":"","file":"core.js","sourcesContent":[]}
```

不要再尝试从 sourcemap 还原源码，那条路是死的。

### 压缩没有混淆

好消息是压缩只去掉了空白并缩短了局部变量名，**模块内的函数名、属性名、接口名、DOM 类名全部保留原样**。
因此格式化之后足以支撑阅读与开发，`pnpm probe:decompile` 做的就是这件事。

## 2. 工具链

| 命令 | 用途 |
|---|---|
| `pnpm probe:launch` | 启动受控 Chrome（默认有界面） |
| `pnpm probe:session -- save/restore` | 保存与恢复 icourse163 的登录态 |
| `pnpm probe:collect --url <地址>` | 采集一个页面：网络、控制台、脚本、响应体、Cookie |
| `pnpm probe:watch --match <正则>` | 实时监听页面发出的请求，可拿到完整请求体 |
| `pnpm probe:call --bean <x> --method <y>` | 在页面上下文调用接口，带写方法白名单 |
| `pnpm probe:decompile --capture <采集目录>` | 把 bundle 格式化成可读源码并按模块切分 |
| `pnpm probe:redact <目录>` | 把样本里的身份字段替换为占位符 |

`probe:watch` 是排查看不见的请求时最有用的工具。`probe:collect` 是快照式的，
覆盖不到「操作页面之后才发出的请求」，那类场景必须用 `probe:watch`。

## 3. 定位一段功能的完整流程

**第一步，拿到接口名。** 从网络记录里找：

```bash
rg "mocQuizRpcBean" .probe/raw/<采集名>/network.jsonl
```

**第二步，逆向 bundle。**

```bash
pnpm probe:decompile --capture .probe/raw/<采集名> --out .reverse
```

产物结构：

```
.reverse/
  INDEX.md                    总览
  <bundle>/index.js           格式化后的完整文件
  <bundle>/modules.json       模块索引（hash、偏移、符号）
  <bundle>/modules/<hash>.js  按 EDU 模块切出的单独文件
```

**第三步，从接口名找到实现模块。**

```bash
rg -l "saveDraftAnswers" .reverse/*/modules/
```

或者查模块索引里的符号，它可以一次列出某个模块涉及的全部接口与 DOM 类名：

```bash
rg -A 6 "COM_Cache_QuizCache" .reverse/*/modules.json
```

**第四步，读模块。** 每个模块都是独立文件，直接读即可。

## 4. 已定位的关键模块

这些是从 `core` bundle 中确认过的，可直接查阅：

| 模块 hash | 内容 |
|---|---|
| `acced775bc5869338f7c0bac9a90ba4a` | `COM_Cache_TestBaseCache`：`saveDraftAnswers` 与 `submitAnswers` 的请求构造 |
| `2c666a1ceb412082b906b11b0948dedf` | `COM_Cache_QuizCache`：`getQuizInfo`、`getOpenQuizInfo`、`getOpenQuizPaperDto` |
| `9404c0406a53242cb88cc30ecf858b38` | `COM_Cache_HomeworkCache`：作业相关的四个接口 |
| `a01f33fc4c73dd5578f3439696dfd8bc` | `QuizDoingUI`：做题页交互、保存与提交入口 |

学习页交互（题目渲染、选项、倒计时）位于 `tp_learn_index_desktop_modules_learn` 这个 bundle 里，
它同样被按模块切分，共 89 个模块。

## 5. 读 NEJ 代码的要点

站点用 NEJ 框架，形态与常见前端框架不同：

- 模块声明是 `EDU("<hash>", function(e, t, i){ ... }, "<依赖 hash>", ...)`。
- 类通过 `NEJ.C()` 创建、`_$extend` 继承，原型方法写作 `d.__method = function(){}`。
- 私有方法前缀 `__`，公开方法前缀 `_$`。索引里的符号就是按 `_$` 前缀抓的。
- 请求统一走 `t._$request({url, method, data, isNeedAuth, onload})`，
  `isNeedAuth: !0` 表示该请求需要签名头。
- DOM 模板以字符串形式存在 `_$addHtmlTemplate` 里，选择器可直接从模板读出。

## 6. 纪律

1. 结论必须能指到具体位置：文件、模块 hash 或请求样本。
2. 运行时行为与静态代码冲突时，以运行时为准，并把冲突写进 [mooc.md](./mooc.md)。
3. 单个来源不足以否定某个事实。曾经因为只翻了一个 bundle 就断言某选择器不存在，
   导致基于错误结论写下了一批代码。
4. 连续调用同一个接口会被并发限制挡回（返回 `code: -2` 且响应不含数据），
   这很容易被误读成「接口不返回该字段」。看到可疑的空结果先确认响应码。
