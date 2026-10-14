EDU(
  '7c8815458b04a869151e2d4bd9012394',
  function (e) {
    return {
      'user-answer-sheet-submit-answer-sheet': {
        rest: !0,
        method: 'POST',
        url: '//mozart.study.163.com/api/v1/live/{liveId}/student/quiz/{quizId}/question/{questionId}/submit',
        post: function (e) {
          if (e.res.code === -2) {
            e.req.hideError = !0;
            this._$dispatchEvent('onSubmitError', e.res.message);
          }
        },
      },
      'user-answer-sheet-submit-answer-sheet-by-quiz': {
        rest: !0,
        method: 'POST',
        url: '//mozart.study.163.com/api/v1/live/{liveId}/student/quiz/{quizId}/submit',
        post: function (e) {
          if (e.res.code === -2) {
            e.req.hideError = !0;
            this._$dispatchEvent('onSubmitError', e.res.message);
          }
        },
      },
      'user-answer-sheet-get-answer-sheet': {
        rest: !0,
        method: 'GET',
        url: '//mozart.study.163.com/api/v1/live/{liveId}/student/quiz/get',
        format: function (t) {
          var n = (t.res || {}).result || null;
          e.setAnswerSheetInCache(n);
        },
      },
      'user-answer-sheet-get-answer-result': {
        rest: !0,
        method: 'GET',
        url: '//mozart.study.163.com/api/v1/live/{liveId}/student/quiz/{quizId}/answerform/get',
      },
      'user-answer-sheet-create': { url: '/api/user-answer-sheet/create' },
      'user-answer-sheet-delete': { url: '/api/user-answer-sheet/delete' },
      'user-answer-sheet-update': { url: '/api/user-answer-sheet/update' },
      'user-answer-sheet-sort': { url: '/api/user-answer-sheet/sort' },
    };
  },
  'd3667e60d03e1c733f8017a0deb4b1ba',
);
