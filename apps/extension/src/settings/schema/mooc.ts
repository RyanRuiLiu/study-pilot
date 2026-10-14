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

/** 慕课平台。当前接入的是 icourse163.org。 */
export interface MoocSettings {
  background: {
    autoCourseware: AutoCoursewareSettings;
    autoReview: AutoReviewSettings;
    autoSelfEvaluate: AutoSelfEvaluateSettings;
    autoQuiz: AutoQuizSettings;
    courses: SelectedCourse[];
  };
}

export const DEFAULT_MOOC: MoocSettings = {
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
    courses: [],
  },
};
