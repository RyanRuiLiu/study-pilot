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
import { readFinalExam, collectQuizzes, collectUnits } from './reads.ts';

// 落点 URL 都在 ../pages.ts（一处拼、界面各处共用；理由见那个文件）
import { examListUrl, studyPageUrl } from '../pages.ts';

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
         * 界面就会得出「这门课没有要看的」这个错误结论（课程任务卡对同一份
         * 读取结果会明说「未读取到内容」，待办这边曾经静默吞掉）。
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
            opensAt: null,
          });
        }

        /*
         * 期末考试（板块四）。判据就是设计文档 §2.1 的那条：**有这个考试就显**，
         * 不看开考窗口——它是待办（用户要去做），只是我们不做（只读展示 + 可点）。
         * 形态是机房/线下时读不到细节，但「有考试」这件事是确定的，也如实列一行；
         * 没有期末、或形态读不到，则什么都不列（不是待办）。
         * 真失败（请求抛错）走 unreadCourses 那条既有通道，不静默。
         */
        try {
          const reading = await readFinalExam(deps.client, course);
          if (reading.exam !== null) {
            const exam = reading.exam;
            const notOpen = exam.startAt !== null && Date.now() < exam.startAt;
            entries.push({
              itemId: `final:${course.courseId}`,
              kind: 'finalExam',
              courseName: course.name,
              chapterName: '',
              name: exam.examName,
              status: notOpen ? '未开始' : '未提交',
              href: await examListUrl(course.recruitId, studyPageUrl(course.secret)),
              deadline: exam.endAt,
              sec: 0,
              opensAt: exam.startAt,
            });
          } else if (reading.form === 2 || reading.form === 3) {
            entries.push({
              itemId: `final:${course.courseId}`,
              kind: 'finalExam',
              courseName: course.name,
              chapterName: '',
              name: '期末考试',
              status: reading.form === 2 ? '机房考试' : '线下考试',
              href: await examListUrl(course.recruitId, studyPageUrl(course.secret)),
              deadline: null,
              sec: 0,
              opensAt: null,
            });
          }
        } catch (error) {
          unreadCourses.push({
            courseName: course.name,
            reason: `期末读取失败：${error instanceof Error ? error.message : String(error)}`,
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
            kind: item.meetCourseType === 1 ? 'meetQuiz' : 'quiz',
            courseName: course.name,
            chapterName: item.chapterName ?? '',
            name: item.examName,
            // 平台页签的原文就是「未提交」（FINDINGS §二十一）
            status: '未提交',
            href: await examListUrl(course.recruitId, studyPageUrl(course.secret)),
            deadline: item.deadline,
            sec: 0, // 单元测试没有时长；渲染侧据此不显示时长位
            opensAt: null,
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
