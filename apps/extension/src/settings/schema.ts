/**
 * 配置结构。
 *
 * 组织方式：平台在顶层，平台下分「前台」（页面内生效）与「后台」（与页面无关的任务）。
 * 新增平台时加一个同级的平台键即可，扩展侧功能代码通过 `Settings['mooc']` 这样的
 * 具体类型取用，不做通用抽象——只有一个平台时，通用抽象是负担不是资产。
 *
 * 安全默认：判据只有一条 —— 这个开关会不会让数据写到平台上。
 * 会写的一律默认关闭，包括后台的 `autoQuiz` / `autoReview` / `autoSelfEvaluate`
 * 与前台的 `foreground.quizHelper`（填充会触发页面保存草稿）；只读的默认打开，
 * 装上就能用。用户显式打开之后，对应动作才会真正发生。
 */

/**
 * 参与后台任务的课程。
 *
 * 这里的字段在写入时就归一化好了，读取侧不需要再判空：
 * 接口返回 null 的数值字段（课时数、选课人数、学期时间）在写入时转为 0，
 * 展示时按「大于 0 才显示」处理。
 *
 * 契约：
 *   - shortName 是课程地址的路径段，没有它拼不出可用的链接；
 *   - mode 决定学习页前缀（/learn/ 或 /spoc/learn/）；
 *   - 时间与计数为 0 表示平台未提供该数据。
 */
type Json = unknown;

export interface SelectedCourse {
  /** 课程 id */
  courseId: number;
  /** 学期 id。后台任务全部以它为单位 */
  termId: number;
  name: string;
  /** 课程简称，课程地址的路径段 */
  shortName: string;
  /** 课程模式：0 MOOC、10/15/20 SPOC、30 ROOC。缺失时为 -1，表示平台未提供 */
  mode: number;
  /** 开课学校 */
  schoolName: string;
  /** 学校简称，课程页地址的路径段前缀（如 NTU） */
  schoolShortName: string;
  /** 封面图 */
  coverUrl: string;
  /** 学期开始时间，0 表示未提供 */
  startTime: number;
  /** 学期结束时间，0 表示未提供 */
  endTime: number;
  /** 课时数，0 表示未提供 */
  lessonsCount: number;
  /** 已选人数，0 表示未提供 */
  enrollCount: number;
  /** 是否参与后台任务 */
  enabled: boolean;
}

/** 自动互评。 */
export interface AutoReviewSettings {
  enabled: boolean;
  /** 统一使用的评语 */
  comment: string;
}

/**
 * 自动自评。
 *
 * 与互评并列但独立：互评给同学的作业打分，自评给自己的。
 * 两者都在互评期内开放，配额各自计算，因此分开开关、分开计数。
 */
export interface AutoSelfEvaluateSettings {
  enabled: boolean;
}

/** 自动答题（单元测验）。 */
export interface AutoQuizSettings {
  enabled: boolean;
}

/**
 * 作业截止提醒。
 *
 * 只覆盖「临近截止但还没完成」的事项。已经完成的不再提醒——
 * 提醒的作用是催人去处理，而完成的事没什么可催的。
 *
 * 已过截止的也不在这里：那类不是提醒，是告知，且它与完成情况无关，
 * 因此不随这个开关开关，见 notificationOverdue 的说明。
 */
export interface DeadlineReminderSettings {
  enabled: boolean;
  /** 距截止不足该天数时开始提醒 */
  advanceDays: number;
}

/**
 * 自动完成提醒。
 *
 * 后台替你做了事之后告知一声。做成的事会改动你的学习记录，
 * 静默地改是不可接受的——哪怕改对了，用户也需要知道发生了什么。
 *
 * 它与截止提醒是不同的两件事，因此各有一个开关：
 * 有人只想知道有什么要做，不关心后台做了没做；也有人反过来。
 */
export interface CompletionNoticeSettings {
  enabled: boolean;
}

/**
 * 通知总设置。
 *
 * 关闭的类别不再发出，而不是发一条空的——空通知比不通知更打扰人。
 */
export interface NotificationSettings {
  deadline: DeadlineReminderSettings;
  completion: CompletionNoticeSettings;
}

/**
 * 后台任务的运行时机。
 *
 * 模型是「每次检查先看本地快照，再决定值不值得拉最新数据」：
 * 检查由浏览器启动与一个 30 分钟的定时器触发，而检查本身不发请求——
 * 快照说没事且今天已经拉过就直接结束。拉取只发生在两种情况下：
 * 快照里有能自动完成的事项，或者今天还没完整拉过（保证每天至少一次）。
 *
 * 手动打开弹窗或设置页不受这个节流限制，总是读最新的。
 *
 * 早先还有「只在指定星期几执行」的配置，已经去掉：新作业按天出现，
 * 一天一次足够，而挑星期几会让用户在其余几天什么都等不到，且无从判断原因。
 */
export interface ScheduleSettings {
  /**
   * 启动后延迟多久开始检查，单位分钟。
   *
   * 平台在收到带凭据的请求时就会恢复会话，因此不需要靠延迟来等登录状态。
   * 留着这一项是为了让用户能在机器较慢时错开启动高峰。
   */
  startupDelayMinutes: number;

  /**
   * 运行期间的检查间隔，单位分钟。
   *
   * 这只是「多久去看一眼本地数据」，不是「多久发一次请求」——
   * 检查本身不发请求，是否拉取由另一套判据决定。因此调小它不会让
   * 请求变多，只会让「有新作业了」这件事被发现得更早。
   *
   * 默认 30 分钟：作业按周发布，这个频率已经远高于需要；
   * 而浏览器可能一连开很久不关，没有它就只能等下次启动。
   * 用户嫌吵可以调大，嫌慢可以调小。
   */
  checkIntervalMinutes: number;

  /**
   * 已过截止的事项在待办里保留几天。
   *
   * 过期项的作用是让用户知道自己漏了什么，说一次就够。挂太久会攒出
   * 几十条不会被查看的记录，把真正要做的事挤下去。
   *
   * 默认 3 天：比截止提醒的提前量宽，保证至少有一次机会看到；
   * 又短到不会累积——一周最多几条。想看更早的可以去单元明细，
   * 那里列全部单元且带得分，不受这个设置影响。
   */
  keepOverdueDays: number;
}

/** 前台功能的开关。三项都只有开与关，但形状与后台保持一致。 */
export interface ToggleSettings {
  enabled: boolean;
}

/** 慕课平台。当前接入的是 icourse163.org。 */
export interface MoocSettings {
  /*
   * 前后台的开关一律是 { enabled } 的形状。
   *
   * 前台三个功能本来只有开与关，写成裸布尔更省事，但那样同一个设置文件里
   * 会出现两种形状：前台是 true，后台是 { enabled: true }。
   * 读的人要记住哪一组是哪一种，写的人要判断该用哪种，加字段时还得改形状。
   * 统一之后这条规则只有一句：开关都是 { enabled }。
   */
  foreground: {
    /** 做题页助手：填充答案与提交 */
    quizHelper: ToggleSettings;
    /** 作业页参考答案注入 */
    homeworkAnswers: ToggleSettings;
  };
  background: {
    autoReview: AutoReviewSettings;
    autoSelfEvaluate: AutoSelfEvaluateSettings;
    autoQuiz: AutoQuizSettings;
    deadlineReminder: DeadlineReminderSettings;
    completionNotice: CompletionNoticeSettings;
    schedule: ScheduleSettings;
    courses: SelectedCourse[];
  };
}

export interface Settings {
  version: number;
  /** 总开关。关闭后前台增强与后台任务都停止 */
  enabled: boolean;
  mooc: MoocSettings;
}

/**
 * 配置结构版本。
 *
 * 首个发布的结构记作 1。结构发生不兼容变化时递增，届时在 `normalize` 里
 * 补一段迁移——存储里存的是值，没有「用户改过」与「默认填的」之分，
 * 因此默认值的语义变了也要递增。
 *
 * 现在只有 1，所以没有迁移分支：不为还没发生的事写一个永不执行的判断。
 * 早先这里写的是 2 而从来没有过 1——那是开发过程中的临时痕迹，
 * 不是真实存在过的历史版本，不该留在发布版本里。
 */
export const SETTINGS_VERSION = 1;

export const DEFAULT_SETTINGS: Settings = {
  version: SETTINGS_VERSION,
  /**
   * 总开关默认打开。
   *
   * 装上之后什么都不做会让人以为没生效。而它下面每个写操作各自默认关闭，
   * 所以开着也不会替用户做任何事 —— 打开它只是让只读的提醒开始工作。
   */
  enabled: true,
  mooc: {
    /*
     * 前台功能分开对待，判据与后台一致：会不会写平台。
     *
     * 做题助手带填充与提交两个动作——填充逐题点击页面的选项，页面自己就会
     * 为此发起保存草稿；提交把答卷直接写回服务端。两者都改动账号上的真实
     * 记录，因此默认关闭，与后台那三个写操作同级。
     *
     * 得分指导只把评分依据插到题目下方，不产生任何写入，默认打开。
     *
     * 更早的版本两项都默认打开，理由是「只做展示与预填，不点提交就不写数据」。
     * 那个理由不成立：填充本身就会触发写。默认值按「会不会写平台」划线，
     * 不能按「用户会不会再点一下」划线。
     */
    foreground: {
      quizHelper: { enabled: false },
      homeworkAnswers: { enabled: true },
    },
    background: {
      /*
       * 以下三个都是写操作，默认全部关闭。
       *
       * 它们会代替用户提交测验、给同学的作业打分、给自己的作业打分 ——
       * 这些都是账号上的真实记录，且无法撤销。替用户做这种决定需要
       * 他自己明确打开开关，而不是靠一个默认值替他决定。
       */
      autoQuiz: {
        enabled: false,
      },
      autoReview: {
        enabled: false,
        /*
         * 互评与自评提交时填写的评语。平台要求这项非空。
         *
         * 这句话是用户指定的措辞，不是随手填的模板。它是一句鼓励，没有对
         * 作业质量下事实判断——被评的同学不会从中读到一个扩展替人得出的结论，
         * 这也是它比「完成认真、格式规范」那类话更站得住的理由：
         * 扩展没读过那份作业，本来就没有资格评价它做到什么程度。
         *
         * 改这里要连带改设置页的标注，以及 normalize 的兜底（留空退回这一句）。
         */
        comment: '非常棒，继续努力！',
      },
      autoSelfEvaluate: {
        enabled: false,
      },
      /*
       * 截止提醒默认打开。它只读不写，多提醒一次不会造成任何损失，
       * 而漏提醒的代价是错过截止时间。
       */
      deadlineReminder: {
        enabled: true,
        /*
         * 提前 1 天。
         *
         * 这一项做的就是「距截止还剩 1 天时，打开浏览器发桌面通知」。
         * 提前量再大反而会连着几天反复提醒同一件事。
         */
        advanceDays: 1,
      },
      /*
       * 完成提醒默认打开。
       *
       * 它报告的是后台已经做成的事，而那些事改动了用户的学习记录。
       * 默认关掉意味着改动是静默发生的，用户要到打开界面才发现——
       * 这比多看一条通知糟糕得多。
       *
       * 它不增加任何写操作，只是告知，因此默认开启不构成风险。
       */
      completionNotice: {
        enabled: true,
      },
      schedule: {
        /*
         * 默认不延迟。
         *
         * 平台在收到一次带凭据的请求时就会恢复会话，因此启动后立即执行
         * 不会因为没有登录凭证而失败。等到用户手动打开一次网页才开始，
         * 只会让人以为扩展没工作。
         */
        startupDelayMinutes: 0,
        /*
         * 运行期间的检查间隔，默认 30 分钟。
         *
         * 作业按周发布，这个频率远高于需要；它存在的意义只是让浏览器
         * 长时间不关闭时也有触发点。因为检查不发请求，调小它不会增加
         * 网络负担，因此这个默认值不需要保守。
         *
         * 可调范围见设置页，最低 5 分钟——浏览器对定时任务本身有
         * 30 秒的下限，而这个值远在其上。
         */
        checkIntervalMinutes: 30,
        /*
         * 过期项在待办里保留的天数，默认 3 天。
         *
         * 比截止提醒的提前量宽，保证用户至少有一次机会看到自己漏了什么；
         * 又短到不会累积——一周最多几条，不会把真正要做的事挤下去。
         */
        keepOverdueDays: 3,
      },
      courses: [],
    },
  },
};

/**
 * 以 `base` 为骨架合并 `patch`。
 *
 * - 对象：逐键递归，只保留 `base` 里存在的键
 * - 数组：整体替换（课程列表是用户数据，不做逐项合并）
 * - 原始值：类型一致才采纳
 *
 * 放在这里而不是 storage.ts：这是纯逻辑，测试要能直接调它。
 * storage.ts 顶层会建立存储项，导入即读 browser.runtime，
 * 测试环境里会直接抛错，纯逻辑跟着一起就不可测了。
 */
export function mergeWithBase<T>(base: T, patch: Json): T {
  if (patch === null || patch === undefined) return base;

  if (Array.isArray(base)) {
    return (Array.isArray(patch) ? patch : base) as T;
  }

  if (typeof base === 'object' && base !== null) {
    if (typeof patch !== 'object' || patch === null || Array.isArray(patch)) return base;
    const source = patch as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(base as Record<string, unknown>)) {
      out[key] = mergeWithBase(value, source[key]);
    }
    return out as T;
  }

  return (typeof patch === typeof base ? patch : base) as T;
}

/**
 * 把任意来源的数据规范成合法配置。
 *
 * 除逐键合并之外，还有一处按语义兜底：互评评语不能为空。
 * 合并只做类型检查，而空串是合法的 string，会被原样采纳——平台在校验时
 * 会拒掉空评语，返回的错误却不指明是哪个字段，用户清空输入框之后就只看到
 * 一句「提交失败」。这里留空退回默认评语，设置页也标注了这一条。
 */
export function normalize(raw: Json): Settings {
  const merged = mergeWithBase(DEFAULT_SETTINGS, raw);
  const review = merged.mooc.background.autoReview;

  return {
    ...merged,
    version: SETTINGS_VERSION,
    mooc: {
      ...merged.mooc,
      background: {
        ...merged.mooc.background,
        autoReview: {
          ...review,
          comment:
            review.comment.trim() || DEFAULT_SETTINGS.mooc.background.autoReview.comment,
        },
      },
    },
  };
}
