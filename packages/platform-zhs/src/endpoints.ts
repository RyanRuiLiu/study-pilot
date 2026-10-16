/*
 * 智慧树接口清单（签名接口的路径都写在这里；不带签名的页面域在各自用到的地方，
 * 如 session.ts 的会话锚点、policy/execute.ts 的验证页域）。
 *
 * 组织单位是「网关族」：族 = 取钥的模块号。模块号来自客户端源码并逐族实测校准
 * （2026-10-16，见 .probe/zhs-src/FINDINGS.md §八）：
 *
 *   studyservice-api   = 11  学习页全族（videolist / queryStuyInfo / 上报 …）
 *   onlineservice-api  = 13  首页族（课程卡等；实测 3 会报「aes解密异常」，13 通过）
 *   studentexam-api    = 3   考试族（二期）
 *   taurusexam-api     = 5   考试族（二期）
 *
 * 三族的封装差异（均来自抓包解密，逐条核对过）：
 *   - 外层时间戳字段名不同：学习族 `dateFormate`、首页族 `date`、**考试族没有外层时间戳**；
 *   - 时间戳是否在密文里也放一份：学习族在、首页族不在、**考试族在**（`fixeParam()` 进密文）。
 *
 * 免签端点（gf 白名单，源码 qf 列表）：`getLoginUserInfo` 等 gateway/f 接口
 * 与取钥接口 c/has——它们没有 module/stamp 字段。**移动端（appstudent）那一族
 * 整族免签**，是明文表单 POST。
 */

import type { StampField } from './sign.ts';

/** 接口域。key 域只用于取钥。 */
export const ZHS_HOSTS = {
  study: 'https://studyservice-api.zhihuishu.com',
  online: 'https://onlineservice-api.zhihuishu.com',
  exam: 'https://studentexam-api.zhihuishu.com',
  /** 移动端业务域：神谕（草稿判分）在这里，整族免签明文表单 */
  app: 'https://appstudent.zhihuishu.com',
  key: 'https://appcomm-user.zhihuishu.com',
} as const;
export type ZhsHost = keyof typeof ZHS_HOSTS;

/** 模块号（逐族校准过的实测值）。 */
export const ZHS_MODULE = {
  study: 11,
  online: 13,
  exam: 3,
  taurus: 5,
} as const;

export interface ZhsEndpoint {
  host: ZhsHost;
  path: string;
  method: 'GET' | 'POST';
  /** 有值 = 签名调用（该族的取钥模块号）；免签端点没有它 */
  module?: number;
  /**
   * 外层时间戳字段名（仅签名端点）。**缺省 = 外层不带时间戳**——考试族的形态，
   * 它的时间戳只在密文里；不要把它当成「用默认字段名」，那会把考试族的报文写错。
   */
  stampField?: StampField;
  /** 时间戳是否也进密文载荷（仅签名端点；学习族 true、首页族 false） */
  stampInside?: boolean;
}

const ENDPOINT_TABLE = {
  /** 取钥（uid = RSA 公钥加密的 {"module":N}，由 client 构造） */
  keyFetch: {
    host: 'key',
    path: '/app-commserv-user/c/has',
    method: 'GET',
  },
  /**
   * 登录用户信息（免签）。**遗留端点**：站点现版前端已无任何调用点，
   * 2026-10-17 起对工具链固定 403「未登录」——会话与设备号已改由 CASLOGC
   * cookie 读取（见 session.ts）。条目保留，作为该族免签形态的样板
   * （client 测试用它核对免签路径）。
   */
  loginUserInfo: {
    host: 'online',
    path: '/gateway/f/v1/login/getLoginUserInfo',
    method: 'GET',
  },
  /** 共享课列表（首页族：外层 date、密文里不含时间戳） */
  shareCourses: {
    host: 'online',
    path: '/gateway/t/v1/student/course/share/queryShareCourseInfo',
    method: 'POST',
    module: ZHS_MODULE.online,
    stampField: 'date',
    stampInside: false,
  },
  /** 课程任务树 */
  videoList: {
    host: 'study',
    path: '/gateway/t/v1/learning/videolist',
    method: 'POST',
    module: ZHS_MODULE.study,
    stampField: 'dateFormate',
    stampInside: true,
  },
  /** 学情（两表：lesson 无子节课时 + lv 子节视频） */
  studyInfo: {
    host: 'study',
    path: '/gateway/t/v1/learning/queryStuyInfo',
    method: 'POST',
    module: ZHS_MODULE.study,
    stampField: 'dateFormate',
    stampInside: true,
  },
  /**
   * 课程入口数据（开课要用它的 isApply；学习页加载时读的第一批之一）。
   * 载荷 `{recruitAndCourseId}` + 内藏时间戳——与真实浏览器逐字段核对过
   * （2026-10-16 金样本解密：`data.isApply`、`data.courseInfo.courseId`）。
   */
  queryCourse: {
    host: 'study',
    path: '/gateway/t/v1/learning/queryCourse',
    method: 'POST',
    module: ZHS_MODULE.study,
    stampField: 'dateFormate',
    stampInside: true,
  },
  /** 打开课时（取学习记录 studiedLessonDto.id——上报的 zwsds 用料） */
  prelearningNote: {
    host: 'study',
    path: '/gateway/t/v1/learning/prelearningNote',
    method: 'POST',
    module: ZHS_MODULE.study,
    stampField: 'dateFormate',
    stampInside: true,
  },
  /** 进度上报（落库通道；缓存通道 saveCacheIntervalTimeV2 本工具不用，不发） */
  saveStudyInterval: {
    host: 'study',
    path: '/gateway/t/v1/learning/saveDatabaseIntervalTimeV2',
    method: 'POST',
    module: ZHS_MODULE.study,
    stampField: 'dateFormate',
    stampInside: true,
  },

  /*
   * ---- 考试族（studentexam-api，module 3；外层只有 secretStr）----
   *
   * 全部 POST。路径前缀是 `/studentExam/gateway/t/v1/`（学习族没有那段 `studentExam`）。
   * 逐条实测：清单/开卷/作答/交卷/重做的报文形态见 `.probe/zhs-sbx-submit/`
   * 的 net-ch2.jsonl（真实交卷全序列）与 eval-close-loop.js（作答报文逐字段）。
   */

  /** 答案通道：喂数字题号，换回题面与**正解**（`options[].result == 1`）。
   *  属**学习族**（module 11）——它不是考试应用的接口，是学习页弹题的接口，
   *  因随堂练习由客户端本地判分才带着正解下发（见 exam-answers.ts 的平台事实）。 */
  popupExam: {
    host: 'study',
    path: '/gateway/t/v1/popupAnswer/lessonPopupExam',
    method: 'POST',
    module: ZHS_MODULE.study,
    stampField: 'dateFormate',
    stampInside: true,
  },

  /** 作业清单（作业列表：单元测试 + 见面课测验，两页签由 flag 分） */
  examHomeworkList: {
    host: 'exam',
    path: '/studentExam/gateway/t/v1/student/getStudentHomework',
    method: 'POST',
    module: ZHS_MODULE.exam,
    stampInside: true,
  },
  /** 开卷：**调用即建答卷，无二次确认**——只在执行动作里发，绝不探测性打开 */
  examDoHomework: {
    host: 'exam',
    path: '/studentExam/gateway/t/v1/student/doHomework',
    method: 'POST',
    module: ZHS_MODULE.exam,
    stampInside: true,
  },
  /** 交卷后的回顾：下发**数字题号**（答案通道与神谕的入口参数） */
  examLookHomework: {
    host: 'exam',
    path: '/studentExam/gateway/t/v1/student/lookHomework',
    method: 'POST',
    module: ZHS_MODULE.exam,
    stampInside: true,
  },
  /** 逐题作答（一题一次，真实客户端也是逐题保存） */
  examSaveAnswer: {
    host: 'exam',
    path: '/studentExam/gateway/t/v1/answer/saveStudentAnswer',
    method: 'POST',
    module: ZHS_MODULE.exam,
    stampInside: true,
  },
  /** 交卷（不可逆：即刻计分） */
  examSubmit: {
    host: 'exam',
    path: '/studentExam/gateway/t/v1/answer/submit',
    method: 'POST',
    module: ZHS_MODULE.exam,
    stampInside: true,
  },
  /** 重做次数（剩余 = 3 − rt，算式取自平台界面源码） */
  examRedoNum: {
    host: 'exam',
    path: '/studentExam/gateway/t/v1/student/redoNum',
    method: 'POST',
    module: ZHS_MODULE.exam,
    stampInside: true,
  },
  /** 申请重做（分数覆盖原分数；平台自己会先弹确认框） */
  examApplyRedo: {
    host: 'exam',
    path: '/studentExam/gateway/t/v1/student/saveCourseTran',
    method: 'POST',
    module: ZHS_MODULE.exam,
    stampInside: true,
  },
  /** 是否客观题（重做门槛：非客观题平台弹二维码，走不了这条路） */
  examIsObject: {
    host: 'exam',
    path: '/studentExam/gateway/t/v1/exam/getIsObject',
    method: 'POST',
    module: ZHS_MODULE.exam,
    stampInside: true,
  },

  /*
   * ---- 移动端（appstudent，整族免签明文）----
   */

  /**
   * 神谕：草稿判分。喂**数字题号**，回逐题得分 `{rt:{"<题号>":{score,done}}}`。
   * 契约（2026-10-17 逐条真机探得）：`questionIds` 必填（缺 → HTTP 400）、
   * 只认数字题号（喂 eid 报 `parseInt error`）、`userId` 必填（缺 → 500）。
   * 判分是**草稿实况**（存错解 0、存正解满分），所以能在交卷前当验证器用。
   */
  examQuestionDoneState: {
    host: 'app',
    path: '/appstudent/student/exam/getQuestionDoneState',
    method: 'POST',
  },
} as const satisfies Record<string, ZhsEndpoint>;

export type ZhsEndpointName = keyof typeof ENDPOINT_TABLE;

/**
 * 对外的一张表：键名保留（ZhsEndpointName 由此而来），值类型规范成
 * {@link ZhsEndpoint}——可选字段（module/stampField/stampInside）在免签端点上
 * 不存在，直接用 `as const` 的表会让读取方对着联合类型报「属性不存在」。
 */
export const ZHS_ENDPOINTS: Record<ZhsEndpointName, ZhsEndpoint> = ENDPOINT_TABLE;
