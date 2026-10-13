/*
 * 课程快照。
 *
 * 三块分开，各自一件事：
 *   types.ts    结构（决定拉什么）
 *   inspect.ts  从平台拉取填充
 *   storage.ts  读写到本地
 *
 * 原先把三者放在一个文件里，理由是「加一个字段要改三个文件，而漏改任何一个
 * 都不会有编译错误」。那个理由不成立：填充时的结构体字面量是带类型的，
 * 少一个字段就是编译错误，改一个字段至少要动 types 与 inspect 两处，
 * 存储层原样存取不受影响。
 */

export * from './types.ts';
export * from './storage.ts';
export * from './inspect.ts';
