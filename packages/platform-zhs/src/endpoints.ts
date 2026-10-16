/*
 * 智慧树接口清单（全包唯一写接口路径的地方）。
 *
 * 组织单位是「网关族」：族 = 取钥的模块号。模块号来自客户端源码并逐族实测校准
 * （2026-10-16，见 .probe/zhs-src/FINDINGS.md §八）：
 *
 *   studyservice-api   = 11  学习页全族（videolist / queryStuyInfo / 上报 …）
 *   onlineservice-api  = 13  首页族（课程卡等；实测 3 会报「aes解密异常」，13 通过）
 *   studentexam-api    = 3   考试族（二期）
 *   taurusexam-api     = 5   考试族（二期）
 *
 * 两族的封装差异（均来自抓包解密，逐条核对过）：
 *   - 外层时间戳字段名不同：学习族 `dateFormate`、首页族 `date`；
 *   - 时间戳是否在密文里也放一份：学习族在、首页族不在。
 *
 * 免签端点（gf 白名单，源码 qf 列表）：`getLoginUserInfo` 等 gateway/f 接口
 * 与取钥接口 c/has——它们没有 module/stamp 字段。
 */

import type { StampField } from './sign.ts';

/** 接口域。key 域只用于取钥。 */
export const ZHS_HOSTS = {
  study: 'https://studyservice-api.zhihuishu.com',
  online: 'https://onlineservice-api.zhihuishu.com',
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
  /** 外层时间戳字段名（仅签名端点） */
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
} as const satisfies Record<string, ZhsEndpoint>;

export type ZhsEndpointName = keyof typeof ENDPOINT_TABLE;

/**
 * 对外的一张表：键名保留（ZhsEndpointName 由此而来），值类型规范成
 * {@link ZhsEndpoint}——可选字段（module/stampField/stampInside）在免签端点上
 * 不存在，直接用 `as const` 的表会让读取方对着联合类型报「属性不存在」。
 */
export const ZHS_ENDPOINTS: Record<ZhsEndpointName, ZhsEndpoint> = ENDPOINT_TABLE;
