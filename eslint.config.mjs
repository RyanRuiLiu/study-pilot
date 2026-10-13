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

      // ---- 替代手写的「文件长度」检查（测试豁免见下） ----
      'max-lines': ['error', { max: 300 }],

      // ---- 替代手写的「术语表」检查 ----
      'id-denylist': [
        'error',
        'selfReview',
        'selfEvaluation',
        'selfJudge',
        'learnUnit',
        'lessonUnit',
        'workItem',
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
    // 工具脚本跑在 Node 上
    files: ['scripts/**/*.mjs', '*.mjs'],
    extends: [js.configs.recommended],
    languageOptions: { globals: { ...globals.node } },
    rules: { 'no-console': 'off' },
  },
);
