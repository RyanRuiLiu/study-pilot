/*
 * ESLint 配置（flat config，标准格式）。
 *
 * 原则：能用生态标准规则的地方不自创。此前这些约束用手写正则实现，
 * 正则会漏（带空格的写法、模板里的用法），官方规则不会。
 *
 * 这一版只开**不需要类型信息**的规则：代码是边写边加的，先让基础规则全绿，
 * 再开 type-checked 那批（no-floating-promises 等），否则一次报出几百条没人看。
 */

import js from '@eslint/js';
import boundaries from 'eslint-plugin-boundaries';
import globals from 'globals';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

/*
 * ---- 替代手写的「依赖方向」检查 ----
 *
 * 原先是一张 LAYER_RULES 表 + 正则抓 `from '@study-pilot/x'`：只认静态 import/export
 * 这一种写法（dynamic import、require 全漏），也看不出包与包之间的方向。
 * 这里交给 eslint-plugin-boundaries：
 *   - 每个包是一个元素（element），元素之间按策略允许或禁止依赖；
 *   - 包之间的引用必须用 module.source 匹配。原因很实在：pnpm 只把「声明过的依赖」
 *     链接进每个包的 node_modules，非法引用（没声明就 import）恰恰解析不到文件，
 *     默认会被归类成 external 而跳过检查。因此用 flag-as-external 明确把
 *     @study-pilot/* 当外部模块，再按源串匹配；配合 checkAllOrigins 才会评估它们。
 *   - @study-pilot/* 之外的第三方与 Node 内置不在管辖范围（第一条策略放行）。
 *
 * 只判 packages/：apps 是组合层，按设计可以依赖任何包（原检查同样只看 packages）。
 * 同一个包内部的相对导入是「元素内部依赖」，规则默认不判。
 */
const WORKSPACE_IMPORTS = '@study-pilot/**';

/* 每个包允许依赖的工作区包。core 是空数组：它谁也不依赖。 */
const PACKAGE_DEPENDENCIES = {
  core: [],
  transport: ['@study-pilot/core'],
  ai: ['@study-pilot/core'],
  // platform-mooc 不认识 AI：模型能力由 app 侧以端口注入
  'platform-mooc': ['@study-pilot/core', '@study-pilot/transport'],
};

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/.output/**',
      '**/.wxt/**',
      '**/.probe/**',
      '**/dist/**',
      '**/coverage/**',
      // 调试与逆向产物：都在 .gitignore 里，且含有第三方压缩 bundle。
      // 不过滤它们会把「解压出来的库」的语法错误当成我们的问题。
      '**/.reverse/**',
      '**/.dev-profile/**',
      '**/.cdp-profile/**',
      '**/.tmp-profile/**',
      /*
       * 变异测试的沙箱（整份仓库副本，位置见 stryker.config.mjs 的 tempDirName）。
       * eslint 不看 .gitignore，沙箱存在期间它里面的 test 文件会被当成项目文件
       * 解析——门禁不能因为「另一个进程正在跑测试」变红。
       */
      '**/.stryker-tmp/**',
    ],
  },

  {
    files: ['apps/**/*.ts', 'packages/**/*.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      globals: { ...globals.browser, ...globals.webextensions },
    },
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: 'error',
    },
    plugins: { 'unused-imports': unusedImports },
    rules: {
      // TypeScript 已经负责「标识符是否定义」，这条在 TS 里重复且误报
      'no-undef': 'off',

      // ---- 替代手写的「代码卫生」正则 ----
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-ignore': true, 'ts-nocheck': true, 'ts-expect-error': 'allow-with-description' },
      ],
      'no-console': 'error',

      // ---- 替代手写的「文件长度」检查（豁免见下） ----
      'max-lines': ['error', { max: 300 }],

      /*
       * ---- 替代手写的「术语表」检查 ----
       *
       * 「同一概念只用一种写法」。AI 改动最容易在这里漂移：新加一个模块时顺手
       * 起个近义词（selfReview、learnUnit），于是同一件事出现两套词，之后每次
       * 改动都要先猜用哪个。下面的别名一旦回到源码里即失败。
       *
       * 与原先那组正则的差别：id-denylist 判的是**标识符**（含对象字面量的键、
       * 声明、赋值），不判字符串字面量，也不判只读的属性访问——外部对象上叫
       * 什么名字不由我们决定。要写死字符串里的旧键，靠的是有意的例外（见下）。
       *
       * 两处命名边界，不要照着禁词表去"修"：
       *   - 互评：平台接口层用它的叫法（MocEvaluateBean / getEvaluateDetail /
       *     submitEvaluation），我们自己的概念用 review（AutoReviewSettings /
       *     reviewable）。这是分层命名，不是分裂。
       *   - 得分指导统一到 guidance（模块、设置键、函数名都是）；设置键原为
       *     homeworkAnswers，改名时用 SETTINGS_VERSION 1 → 2 的迁移搬走了旧值，
       *     因此 normalize 里还留着一处旧键的字面量——那是有意的，不是漏改。
       */
      'id-denylist': [
        'error',
        'selfReview',
        'selfEvaluation',
        'selfJudge',
        'learnUnit',
        'lessonUnit',
        'workItem',
        'todoList',
        'pendingList',
        'referenceAnswer',
        'answerKey',
        'bankList',
        'questionBank',
      ],

      // 未使用的 import 用带 fixer 的插件规则清（官方规则没有 fixer）
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  {
    // 测试：非空断言与行长不管（测试按被测模块聚合，长是合理的）
    files: ['**/test/**', '**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      'max-lines': 'off',
    },
  },

  {
    /*
     * 构建配置与类型声明也不是「一个文件的职责」的载体：配置要按工具的
     * schema 写在一处，声明文件要么来自外部、要么由工具生成。
     * 原先自写的长度检查同样豁免这两类，这里对齐。
     */
    files: ['**/*.config.ts', '**/*.d.ts'],
    rules: { 'max-lines': 'off' },
  },

  {
    files: ['packages/**/*.ts'],
    plugins: { boundaries },
    settings: {
      'boundaries/root-path': import.meta.dirname,
      // 工作区包不由 node_modules 解析（见文件头的说明）
      'boundaries/flag-as-external': { customSourcePatterns: ['@study-pilot/*'] },
      'boundaries/elements': Object.keys(PACKAGE_DEPENDENCIES).map((name) => ({
        type: name,
        pattern: `packages/${name}`,
        partialMatch: false,
      })),
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          // external 目标默认不评估，而工作区包正是被当成 external 的
          checkAllOrigins: true,
          policies: [
            // 第三方与 Node 内置不归这条规则管
            { from: { element: { type: '*' } }, allow: { to: { module: { source: '**' } } } },
            ...Object.entries(PACKAGE_DEPENDENCIES).flatMap(([type, allowed]) => [
              // 先整体禁掉工作区包，再按表放行——策略按顺序取最后一条命中的
              { from: { element: { type } }, disallow: { to: { module: { source: WORKSPACE_IMPORTS } } } },
              ...(allowed.length === 0
                ? []
                : [{ from: { element: { type } }, allow: { to: { module: { source: allowed } } } }]),
            ]),
          ],
        },
      ],
    },
  },

  {
    /*
     * ---- app 内部分层（三个平面）----
     *
     * 上一版只判 packages/，注释里写的理由是「apps 是组合层，按设计可以依赖任何包」。
     * 那句话本身没错，但它把真正会漂的地方留在了外面：这个 app 里一万两千行
     * 代码的分层规则（视图面只读、写只从执行面出、外壳不认识平台）此前
     * 只存在于两份文档里，没有任何工具检查过。
     *
     * 判的是**运行时依赖**（`dependency.kind: 'value'`）。类型 import 放行：
     * 平台的处理器要按协议声明响应类型，那是编译期的事，不会造成加载环，
     * 也不需要为此在两个模块之间复制一份类型定义——那正是「同一知识两处写」。
     *
     * `import/resolver` 不是可选项：没有它，相对路径的 .ts import 在 boundaries
     * 眼里是 unknown，规则一条也不会报（静默空转）。
     */
    files: ['apps/extension/**/*.ts'],
    plugins: { boundaries },
    settings: {
      'boundaries/root-path': import.meta.dirname,
      'import/resolver': { node: { extensions: ['.ts', '.tsx', '.js', '.json'] } },
      'boundaries/elements': [
        { type: 'platform', pattern: 'apps/extension/src/platforms' },
        // 外壳与浏览器 API 之间的那一层：消息协议、请求头规则。
        // 平台专属的宿主适配（凭证 cookie）不在这里，它归各平台模块自己管。
        { type: 'browser', pattern: 'apps/extension/src/browser' },
        { type: 'execution', pattern: 'apps/extension/src/background' },
        { type: 'foreground', pattern: 'apps/extension/src/features' },
        { type: 'ui', pattern: 'apps/extension/src/ui' },
        { type: 'settings', pattern: 'apps/extension/src/settings' },
        { type: 'ai', pattern: 'apps/extension/src/ai' },
        // 入口是装配层：它可以认识各平台的公开模块，这是唯一允许「知道平台」的地方
        { type: 'entrypoint', pattern: 'apps/extension/entrypoints' },
      ],
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'allow',
          policies: [
            // 外壳（协议层与调度层）不认识平台：只经契约与工厂
            {
              from: { element: { types: ['browser', 'execution'] } },
              disallow: {
                to: { element: { type: 'platform' } },
                dependency: { kind: 'value' },
              },
            },
            // 平台模块不认识页面与呈现面：它只提供数据与契约实现
            {
              from: { element: { type: 'platform' } },
              disallow: {
                to: { element: { types: ['entrypoint', 'foreground', 'execution'] } },
                dependency: { kind: 'value' },
              },
            },
            // 呈现面只经协议向后台要数据：不建客户端、不碰执行面
            {
              from: { element: { type: 'foreground' } },
              disallow: {
                to: { element: { types: ['platform', 'execution', 'entrypoint'] } },
                dependency: { kind: 'value' },
              },
            },
            // 通用支撑层（组件、配置、AI 装配）不反向认识业务模块
            {
              from: { element: { types: ['ui', 'settings', 'ai'] } },
              disallow: {
                to: {
                  element: { types: ['platform', 'execution', 'foreground', 'entrypoint'] },
                },
                dependency: { kind: 'value' },
              },
            },
          ],
        },
      ],
    },
  },

  {
    // 工具脚本跑在 Node 上
    files: ['scripts/**/*.mjs', '*.mjs'],
    extends: [js.configs.recommended],
    languageOptions: { globals: { ...globals.node } },
    rules: { 'no-console': 'off' },
  },
);
