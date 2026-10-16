/*
 * 智慧树（zhihuishu.com）的设置。
 *
 * 与慕课同样的组织：平台的事只在平台自己的文件里，根类型不动。
 *
 * 这一份比慕课薄得多，因为平台的数据形态不同：共享课报名在「读取课程列表」
 * 时由平台下发（课程 id、报名 id、入口参数、进度文案都是那一刻的事实），
 * 用户在这里只需要决定**哪些课参与任务**。
 */

/**
 * 参与任务的智慧树共享课。
 *
 * 字段是「读取课程列表」写入时的原样：接口给什么存什么，展示按需取用——
 * 不在写入时臆造平台没给的数据（与慕课把 null 数值收敛为 0 的处理不同，
 * 那边是平台明确以 null 表达「未提供」，这边是字符串字段直接透传）。
 *
 * 契约：
 *   - secret 是学习页入口参数（平台下发的十六进制串），执行与读取都要它，
 *     没有它这门课进不了任务范围；
 *   - startTime/endTime 是平台给的开课区间，"账号与课程"那一列按慕课同一形状展示（学校 · 学期）。
 */
export interface ZhihuishuCourse {
  /** 课程 id */
  courseId: number;
  /** 报名（学期）id——任务以它为单位 */
  recruitId: number;
  /** 学习页入口参数；读取课程列表时由平台下发 */
  secret: string;
  name: string;
  /** 开课学校；多校共建时是一串校名 */
  schoolName: string;
  /** 开课区间（毫秒）；平台没给则为 0。"账号与课程"那一列与慕课同一形状：学校 · 学期 */
  startTime: number;
  endTime: number;
  /** 是否参与任务 */
  enabled: boolean;
}

/** 智慧树平台。当前接入的是共享课学生端。 */
export interface ZhihuishuSettings {
  /** 参与任务的课程 */
  courses: ZhihuishuCourse[];
}

export const DEFAULT_ZHIHUISHU: ZhihuishuSettings = {
  courses: [],
};
