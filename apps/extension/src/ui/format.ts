/*
 * 展示用的格式化。界面共用，纯函数，没有依赖。
 *
 * 参数是非空数字：课程记录里的数值字段在写入存储时就已归一化，
 * 缺失的用 0 表示。因此这里不需要处理 null 或 undefined——
 * 若在使用处还要判空，说明数据契约没有被遵守，应该去修写入侧。
 *
 * 日期格式集中在这里，不散到各个界面里
 * --------------------------------------
 * 弹窗、设置页都要显示时间，各写一份的话：同一个截止时间在两个页面
 * 会是两种写法。格式不同本身不是大问题，问题是改一处漏一处——
 * 调整措辞时很难找全。
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

const DAY_MS = 24 * 60 * 60 * 1000;

/** 平台没给时间：约定用 0；非有限值（NaN/Infinity）同样按没给处理，不让它们渲染成 NaN。 */
function missingTime(timestamp: number): boolean {
  return !Number.isFinite(timestamp) || timestamp <= 0;
}

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
  if (missingTime(timestamp)) return '';
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
 * 用于需要精确到时刻的场合。
 */
export function formatDateTime(timestamp: number): string {
  if (missingTime(timestamp)) return '';
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
  if (missingTime(timestamp)) return '';
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
  if (missingTime(timestamp)) return '';
  const date = new Date(timestamp);
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

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
 * 相对说法。它是待办那一屏的主信息。
 *
 * 学生看到日期要先做一次心算（今天几号、还剩几天），看到「明天」不用。
 * 所以主行放相对说法，确切日期退到副行。
 */
export function relativeDay(deadline: number): string {
  if (missingTime(deadline)) return '无截止时间';
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
 * 只给这两类上色，不给「三天内」。一开始用的是三天阈值，但实际数据里
 * 作业常常集中在同一两天，结果一屏四条全红，红色退化成背景色，反而
 * 看不出哪条真的晚了。明天与后天已经很醒目（相对说法本身就显眼），
 * 不需要再上色。
 *
 * 判据同样是自然日：今天 22:00 看明天 20:00 的截止不算紧急（还有一整天），
 * 而按 24 小时周期算会被误标成紧急。
 */
export function isUrgent(deadline: number): boolean {
  if (missingTime(deadline)) return false;
  return daysBetween(deadline, Date.now()) <= 0;
}

/**
 * 从任意捕获物里取出可显示的错误说明——界面把 catch 到的东西变成文字，
 * 只有这一处实现（弹窗、设置页、执行全用它）：Error 取 message，其余原样转字符串。
 */
export function errorText(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
