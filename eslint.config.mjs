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
import globals from 'globals';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

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
    // 工具脚本跑在 Node 上
    files: ['scripts/**/*.mjs', '*.mjs'],
    extends: [js.configs.recommended],
    languageOptions: { globals: { ...globals.node } },
    rules: { 'no-console': 'off' },
  },
);
