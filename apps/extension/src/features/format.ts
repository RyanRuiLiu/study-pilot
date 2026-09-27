/*
 * 展示用的格式化。
 *
 * 参数是非空数字：课程记录里的数值字段在写入存储时就已归一化，
 * 缺失的用 0 表示。因此这里不需要处理 null 或 undefined——
 * 若在使用处还要判空，说明数据契约没有被遵守，应该去修写入侧。
 *
 * 日期格式集中在这里，不散到各个界面里
 * --------------------------------------
 * 弹窗、设置页的单元明细、注入面板都要显示时间，先前各写一份：
 * 同一个截止时间在弹窗里是「9月30日 周三」、在明细里是另一种写法。
 * 格式不同本身不是大问题，问题是改一处漏一处——调整措辞时很难找全。
 */

const MONTH_LABEL = [
  '',
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月',
];

const WEEKDAY_LABEL = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

/** 补零到两位。 */
function pad(value: number): string {
  return String(value).padStart(2, '0');
}

/**
 * 把时间戳格式化成「YYYY-MM」。学期时间精确到天没有意义。
 *
 * 返回空串表示「平台未提供该时间」（约定用 0 表示）。
 */
export function formatMonth(timestamp: number): string {
  if (timestamp <= 0) return '';
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
}

/**
 * 学期区间的展示文本。
 *
 * 两端都未提供时返回空串，由调用方决定是否整段省略。
 */
export function formatTermRange(start: number, end: number): string {
  const from = formatMonth(start);
  const to = formatMonth(end);
  if (!from && !to) return '';
  if (!from) return `至 ${to}`;
  if (!to) return `${from} 起`;
  return `${from} 至 ${to}`;
}

/**
 * 日期时间，形如「9月30日 20:00」。
 *
 * 用于需要精确到时刻的场合（单元明细的截止列）。
 * 不带星期：列宽有限，而排期看日期加时刻就够了。
 */
export function formatDateTime(timestamp: number): string {
  if (timestamp <= 0) return '';
  const date = new Date(timestamp);
  return `${MONTH_LABEL[date.getMonth() + 1]}${date.getDate()}日 ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/**
 * 日期，形如「9月30日 周三」。
 *
 * 用于弹窗的待办：那里已经有一行给出「还有几天」，
 * 这一行用来核对具体是哪天，因此星期比时刻有用。
 */
export function formatDate(timestamp: number): string {
  if (timestamp <= 0) return '';
  const date = new Date(timestamp);
  return `${MONTH_LABEL[date.getMonth() + 1]}${date.getDate()}日 ${WEEKDAY_LABEL[date.getDay()]}`;
}

/**
 * 时刻，形如「20:00」。
 *
 * 单独给出是因为弹窗把它与相对说法拼在同一行（「3 天后 20:00」），
 * 而相对说法来自另一个函数。
 */
export function formatClock(timestamp: number): string {
  if (timestamp <= 0) return '';
  const date = new Date(timestamp);
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
