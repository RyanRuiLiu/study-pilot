/**
 * 端点清单。
 *
 * 每个端点标注证据等级，因为它们的可信度并不相同：
 *
 * | 标记 | 含义 |
 * |---|---|
 * | [已实测] | 本轮通过 pnpm probe call 真实调用，返回 code: 0 |
 * | [有样本] | 曾抓到过真实响应，但未再次复现（样本不入库） |
 * | [仅静态] | 仅从 bundle 静态提取，没有运行验证 |
 * | [写操作] | 会改变服务端状态，受安全约束限制 |
 *
 * 一个值得记录的教训：getMyLearnedCoursePanelList 在静态提取得到的 168 个端点中
 * 并不存在，但它是真实可用的接口。这说明 bundle 中存在动态拼接的接口名，
 * 仅凭 grep 得出「某接口不存在」的结论并不可靠，必须实际调用验证。
 */

export interface Endpoint {
  bean: string;
  method: string;
  /**
   * 出站节奏的类别（缺省 read）：读用「50ms / 并发 4」，写用「200ms / 串行」。
   * 依据（2026-10-23 实测）：只读端点 0ms 连续 20 次、并发 8 全部成功；
   * 写侧没有新实测，沿用历史上写爆发触发 -12 对应的保守值。
   */
  pace?: 'read' | 'write';
}

export const ENDPOINTS = {
  /** 当前账号的课程列表。参数 {type:30, p:1, psize:N, courseType:1|2} */
  courseList: { bean: 'learnerCourseRpcBean', method: 'getMyLearnedCoursePanelList' }, // [已实测]

  /** 课程结构：章节，以及挂在章节下的测验、作业、考试。参数 {termId} */
  courseStructure: { bean: 'courseBean', method: 'getLastLearnedMocTermDto' }, // [已实测]

  /** 单元测验状态。参数 {tid, targetAid:null, isDraft:false} */
  quizInfo: { bean: 'mocQuizRpcBean', method: 'getQuizInfo' }, // [已实测]

  /**
   * 测验的开考信息。参数 {tid, targetAid:null, isDraft:false}。
   * 页面进入做题页时调用的就是这个接口，响应顶层的 aid 才是当前活跃答卷。
   */
  openQuizInfo: { bean: 'mocQuizRpcBean', method: 'getOpenQuizInfo' }, // [已实测]

  /** 取测验试卷。参数 {tid, aid, withStdAnswerAndAnalyse} */
  quizPaper: { bean: 'mocQuizRpcBean', method: 'getOpenQuizPaperDto' }, // [有样本]

  /** 作业基础信息（含 aid）。参数 {tid, isDraft:false} */
  homeworkInfo: { bean: 'mocQuizRpcBean', method: 'getOpenHomeworkInfo' }, // [仅静态]

  /**
   * 学习相关配置。参数 {key:'mobile_config_web_server_config'}。
   * 返回的 `result` 是一个 JSON 字符串，含 `learnTimeUploadPeriod`
   * （上报周期，秒）与 `videoHeartBeatPeriod`。
   */
  commonConfig: { bean: 'commonBean', method: 'obtain' }, // [实测]

  /**
   * [写操作] 把一个课件单元标记为已学。参数 {dto}，dto 的形状按单元类型而定。
   * 报文与取值来源均取自实测
   */
  completeUnit: { bean: 'courseRpcBean', method: 'saveMocContentLearn', pace: 'write' }, // [实测]

  /** 取作业答卷（含参考答案）。参数 {tid, aid, evaluateId, withStdAnswerAndAnalyse, phase} */
  homeworkPaper: { bean: 'mocQuizRpcBean', method: 'getOpenHomeworkPaperDto' }, // [有样本]

  /** [写操作] 保存测验草稿。参数 {paperDto, preview}。实测草稿写入在真实账号上不生效，提交不依赖它 */
  saveDraft: { bean: 'mocQuizRpcBean', method: 'saveDraftAnswers', pace: 'write' },

  /** [写操作] 提交测验。参数 {paperDto, preview}，其中 answers 原样保留、submitType 为 1 */
  submitQuiz: { bean: 'mocQuizRpcBean', method: 'submitAnswers', pace: 'write' },
} as const satisfies Record<string, Endpoint>;

/**
 * DWR 端点（互评）。与 .rpc 不同，走 /dwr/call/plaincall/{Bean}.{method}.dwr。
 *
 * nextSubmission 虽名为「取下一份」，但**带有副作用**：它会让服务端把某一份答卷
 * 分配给当前用户（status 为 1 表示未评）。只有互评窗口已关闭的单元才可以安全调用。
 */
export const DWR_ENDPOINTS = {
  /** 取下一份待评答卷。参数 (testId, evaluatorId) */
  nextSubmission: { bean: 'MocEvaluateBean', method: 'startOneSubmissionEvaluate' },

  /** 互评进度。参数 (testId, evaluatorId) */
  evaluateDetail: { bean: 'MocEvaluateBean', method: 'getEvaluateDetail' },

  /**
   * 单元的资源信息。参数 (contentId, contentType, isPreview, unitId)。
   * 文档的总页数 `textPages` 只在这里，`.rpc` 侧没有等价字段
   */
  unitResource: { bean: 'CourseBean', method: 'getLessonUnitLearnVo' }, // [实测]

  /** [写操作] 在讨论帖下发表回复。参数 (回复体, 编辑器附件)。页面点「发表回复」走的就是它 */
  addReply: { bean: 'MocForumBean', method: 'addReply' }, // [实测]

  /*
   * TermBean.getNewestItems 曾经在这里，现已移除。
   *
   * 它的名字像「待办」，但返回的对象里没有 submitted 字段，
   * 实测会把已提交的测验也列在 needSubmitQuiz 下。照着它做待办
   * 会得出「已经交过的还在待交」这种结论。
   *
   * 待办改由 courseBean.getLastLearnedMocTermDto 派生：
   * 那里每个单元都带 usedTryCount、userScore 与各截止时间，
   * 「做没做、还能不能做」都能直接判定，不需要第二个人口。
   * 留着这个端点只会让人再一次照它写错。
   */

  /** [写操作] 提交一份互评。参数 (评测对象, false) */
  submitEvaluate: { bean: 'MocEvaluateBean', method: 'submitSubmissionEvaluate' },
} as const satisfies Record<string, Endpoint>;

/** 移动端接口（不是 `.rpc`，走 App 的 `/mob/course/*` 路径）。 */
export const MOBILE_ENDPOINTS = {
  /** 移动端取卷。参数走查询串：testId / isExercise / aId / withStdAnswerAndAnalyse / mob-token */
  paper: { path: '/mob/course/paperDetail/v1' },

  /**
   * 移动端登录：用 URS 的 `ursToken` 注册一个移动端会话，换出 384 位 `mobToken`。
   *
   * 报文形状来自真实抓包（2026-10-23），2026-10-27 复测仍然可用：
   * `POST` 表单 `ursToken=<yd_+40hex>&mob-token=&appId=<URS 客户端 id>`
   * → `{code:0, results:{mobToken:384, mobPToken:384}}`。
   *
   * 扩展的 UNS 登录按网页/PC 画像建立独立会话，与手机、平板分属不同槽；
   * 换发本身不会顶掉它们。仍只在取答案当下做，不轮询。
   */
  ursLogin: { path: '/mob/ucmooc/0/0/passport/ursCellphoneLogin/v1' },
} as const;


/** 课程类型。getMyLearnedCoursePanelList 的 courseType 取值。 */
export const COURSE_TYPE = {
  MOOC: 1,
  SPOC: 2,
} as const;

export type CourseType = (typeof COURSE_TYPE)[keyof typeof COURSE_TYPE];
