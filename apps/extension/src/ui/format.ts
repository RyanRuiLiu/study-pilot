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
 * 时刻，形如「20:00」。只被 dueLine 用，因此不导出：
 * 单独显示一个时刻的地方（注入面板那种）要的是「明天 20:00」整句，不是这一半。
 */
function formatClock(timestamp: number): string {
  if (timestamp <= 0) return '';
  const date = new Date(timestamp);
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/**
 * 截止那一行的说法：「还剩几天」加「几点」，形如「明天 20:00」。
 *
 * 这一条以前在弹窗与看板上各拼一遍，两处各自决定顺序与分隔。
 * 拼法收在这里之后，改措辞只有一处要动。没有截止时间时返回空串，
 * 调用方据此把这一格留空——「无截止时间」写进表格里只是占地方。
 */
export function dueLine(timestamp: number): string {
  if (timestamp <= 0) return '';
  return `${relativeDay(timestamp)} ${formatClock(timestamp)}`;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * 两个时刻相隔几个自然日。
 *
 * 不能拿 (a - b) / 一天 再取整：那是 24 小时周期，不是日历上的日子。
 * 今天 22:00 距明天 20:00 只有 22 小时，按 24 小时周期算是「今天」，
 * 而用户看的是日子——那分明是明天的截止。
 * 反过来，凌晨 00:30 看昨晚 23:00 的截止，算出来是「已过期 1 天」，
 * 实际只过了半小时。
 *
 * 因此先把两个时刻各自归到当天零点，再相减。
 */
export function daysBetween(from: number, to: number): number {
  const a = new Date(from);
  const b = new Date(to);
  const startOfA = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  const startOfB = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
  return Math.round((startOfA - startOfB) / DAY_MS);
}

/**
 * 相对说法。它是待办那一屏的主信息，给出「还剩几天」的直观判断。
 *
 * 学生看到日期要先做一次心算（今天几号、还剩几天），看到「明天」不用。
 * 因此待办那一行的说法由 dueLine 给出：相对说法在前，时刻在后。
 */
export function relativeDay(deadline: number): string {
  if (deadline <= 0) return '无截止时间';
  const days = daysBetween(deadline, Date.now());
  if (days < 0) return `已过期 ${-days} 天`;
  if (days === 0) return '今天';
  if (days === 1) return '明天';
  if (days === 2) return '后天';
  return `${days} 天后`;
}

/**
 * 是否紧急：今天到期或已经过期。
 *
 * 判据同样是自然日：今天 22:00 看明天 20:00 的截止不算紧急（还有一整天），
 * 而按 24 小时周期算会被误标成紧急。
 *
 * 只给这两种上色，不给「三天内」：实际数据里作业常常集中在同一两天，
 * 三天阈值会让一屏四条全红，红色退化成背景色，反而看不出哪条真的晚了。
 */
export function isUrgent(deadline: number): boolean {
  if (deadline <= 0) return false;
  return daysBetween(deadline, Date.now()) <= 0;
}

/** 本地日期键，格式 YYYY-MM-DD。按本地时区计算，跨时区不适用。 */
export function dateKey(now: number = Date.now()): string {
  const date = new Date(now);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
