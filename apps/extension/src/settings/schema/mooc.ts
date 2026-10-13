/*
 * 慕课平台（icourse163.org）的设置。
 *
 * 与 AI 设置分文件：这一份随平台走，换平台时新增一个同级的平台文件，
 * 不动 `index.ts` 里的根类型。
 *
 * 前后台的开关一律是 `{ enabled }` 的形状。前台功能本来只有开与关，
 * 写成裸布尔更省事，但那样同一个设置文件里会出现两种形状：前台是 true、
 * 后台是 { enabled: true }。读的人要记住哪一组是哪一种，写的人要判断该用哪种，
 * 加字段时还得改形状。统一之后这条规则只有一句：开关都是 { enabled }。
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
interface AutoReviewSettings {
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
interface AutoSelfEvaluateSettings {
  enabled: boolean;
}

/** 自动答题（单元测验）。 */
interface AutoQuizSettings {
  enabled: boolean;
}

/**
 * 自动完成课件。
 *
 * 把尚未完成的课件单元（视频、文档、文本、随堂测验、讨论）按类型留下与真人
 * 一致的记录。它不产生对错、也不改变分数，但同样改动了账号上的学习记录，
 * 因此与另外三个后台写操作一样默认关闭。
 */
interface AutoCoursewareSettings {
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
interface DeadlineReminderSettings {
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
interface CompletionNoticeSettings {
  enabled: boolean;
}

/**
 * 后台任务的运行时机。
 *
 * 模型是「每次检查先看本地快照，再决定值不值得拉最新数据」：
 * 检查由浏览器启动与一个定时器触发，而检查本身不发请求——
 * 快照说没事且今天已经拉过就直接结束。拉取只发生在两种情况下：
 * 快照里有能自动完成的事项，或者今天还没完整拉过（保证每天至少一次）。
 *
 * 手动打开弹窗或设置页不受这个节流限制，总是读最新的。
 *
 * 早先还有「只在指定星期几执行」的配置，已经去掉：新作业按天出现，
 * 一天一次足够，而挑星期几会让用户在其余几天什么都等不到，且无从判断原因。
 */
interface ScheduleSettings {
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

/** 前台功能的开关。几项都只有开与关，但形状与后台保持一致。 */
interface ToggleSettings {
  enabled: boolean;
}

/** 慕课平台。当前接入的是 icourse163.org。 */
export interface MoocSettings {
  foreground: {
    /** 做题页助手：填充答案与提交 */
    quizHelper: ToggleSettings;
    /** 作业页得分指导注入 */
    guidance: ToggleSettings;
  };
  background: {
    autoCourseware: AutoCoursewareSettings;
    autoReview: AutoReviewSettings;
    autoSelfEvaluate: AutoSelfEvaluateSettings;
    autoQuiz: AutoQuizSettings;
    deadlineReminder: DeadlineReminderSettings;
    completionNotice: CompletionNoticeSettings;
    schedule: ScheduleSettings;
    courses: SelectedCourse[];
  };
}

export const DEFAULT_MOOC: MoocSettings = {
  /*
   * 前台功能默认全开。
   *
   * 它们只在用户打开对应页面时才挂上去，而真正会改动平台的动作都由用户
   * 自己点：做题助手的面板要人点了才会填充，提交也是人点；得分指导只是
   * 往题目下面插一段说明，不产生任何写入。
   *
   * 与后台开关的分界线是「自动」——后台任务在检查时自己就动了，
   * 前台不会。所以前台默认开不构成替用户做决定，后台默认关才是。
   */
  foreground: {
    quizHelper: { enabled: true },
    guidance: { enabled: true },
  },
  background: {
    /*
     * 以下四个都是写操作，默认全部关闭。
     *
     * 它们会代替用户提交测验、给同学的作业打分、给自己的作业打分、
     * 把课件标记为已学 —— 这些都是账号上的真实记录，且无法撤销。
     * 替用户做这种决定需要他自己明确打开开关，而不是靠一个默认值替他决定。
     */
    autoCourseware: {
      enabled: false,
    },
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
};
