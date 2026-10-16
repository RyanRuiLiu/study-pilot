/*
 * ZHS_PENDING_SUMMARY：待办 = 全部未完成的视频单元（按课程归拢、章节自然序）。
 *
 * 智慧树的单元没有截止时间概念（学习窗口由课程整体规定），因此这里不做
 * 任何时间过滤——列出来的就是「这门课还剩哪些没看」，一条不落。
 */

import type { MessageHandler, QueryOutcome } from '../../../protocol.ts';
import { quizItemId, readSession, selectedCourses, unitItemId } from '@study-pilot/platform-zhs';
import type { ZhsMessageDeps } from './deps.ts';
import type { ZhsPendingEntry, ZhsPendingSummary, ZhsResponseMap, ZhsUnreadCourse } from './payload.ts';
import { collectQuizzes, collectUnits } from './reads.ts';

/*
 * 落点 URL 拼装（两个地址都是摸底记下来的真实页面，不自造）：
 *   学习页    wisdom-mooc 的 study/index?recruitAndCourseId=——执行侧的门也用这个地址
 *   作业考试  考试入口的列表页，**不是某一卷**：dohomework 地址一打开就建答卷，
 *             绝不能做整行点击的落点（设计文档 §5）
 */
function studyPageUrl(recruitAndCourseId: string): string {
  return `https://wisdom-mooc.zhihuishu.com/study/index?recruitAndCourseId=${encodeURIComponent(recruitAndCourseId)}`;
}

function examListUrl(recruitId: number): string {
  return `https://exam.zhihuishu.com/onlineExam/studentExam/stuExam?recruitId=${recruitId}`;
}

export function zhsPendingCommand(deps: ZhsMessageDeps): MessageHandler {
  return async (_request, sendResponse) => {
    const respond = (outcome: QueryOutcome<ZhsPendingSummary>): void => {
      sendResponse(outcome satisfies ZhsResponseMap['ZHS_PENDING_SUMMARY']);
    };

    const session = await readSession(deps.readCookie);
    if (!session.loggedIn) {
      respond({ status: 'error', message: '未登录', reason: 'NOT_LOGGED_IN' });
      return;
    }

    try {
      const settings = await deps.config.read();
      const enabled = selectedCourses(settings);

      /*
       * 两类待办：教程视频走结构读取（含学情），单元测试走考试族清单。
       * **结构读取只做一次**——测验要的章节表由 `collectUnits` 交出复用
       * （每门课一次结构读取）。都读成之后按课程合并，所以待办里出现的
       * 就是**执行会动的那些**。类别由 `kind` 标出，次序与措辞在弹窗侧。
       */
      const collected = await collectUnits(deps.client, enabled);
      const quizzes = await collectQuizzes(deps.client, collected);
      const quizByCourse = new Map(quizzes.map((entry) => [entry.course.courseId, entry]));

      const entries: ZhsPendingEntry[] = [];
      const unreadCourses: ZhsUnreadCourse[] = [];
      for (const { course, units, unreadReason } of collected) {
        /*
         * 读不到的课必须被看见：它们的单元进不了 entries，若这里不记一笔，
         * 界面就会得出「这门课没有要看的」这个错误结论（课件卡对同一份读取
         * 结果报「未读取到内容」，待办这边曾经静默吞掉）。
         */
        if (unreadReason !== null) {
          unreadCourses.push({ courseName: course.name, reason: unreadReason });
          continue;
        }
        for (const unit of units) {
          if (unit.done) continue;
          entries.push({
            itemId: unitItemId(unit),
            kind: 'courseware',
            courseName: course.name,
            chapterName: unit.chapterName,
            name: unit.name,
            status: '未学习',
            href: studyPageUrl(course.secret),
            deadline: null, // 课程学习窗口尚未接入；界面上两格如实留空
            sec: unit.sec,
          });
        }

        // 单元测试单独报自己的读取失败：视频读得到、测验读不到是可能的，
        // 那时只有这里知道，不能因为视频那一遍成功就把它盖过去
        const quiz = quizByCourse.get(course.courseId);
        if (quiz !== undefined && quiz.unreadReason !== null) {
          unreadCourses.push({ courseName: course.name, reason: `单元测试读取失败：${quiz.unreadReason}` });
        }
        for (const item of quiz?.items ?? []) {
          entries.push({
            itemId: quizItemId(item),
            kind: 'quiz',
            courseName: course.name,
            chapterName: item.chapterName ?? '',
            name: item.examName,
            // 平台页签的原文就是「未提交」（FINDINGS §二十一）
            status: '未提交',
            href: examListUrl(course.recruitId),
            deadline: item.deadline,
            sec: 0, // 单元测试没有时长；渲染侧据此不显示时长位
          });
        }
      }
      respond({
        status: 'ok',
        value: { fetchedAt: Date.now(), total: entries.length, entries, unreadCourses },
      });
    } catch (error) {
      respond({ status: 'error', message: error instanceof Error ? error.message : String(error) });
    }
  };
}
