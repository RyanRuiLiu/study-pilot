EDU(
  'e388634ee3841d4f33d839ae4b7dde75',
  function () {
    var e = window.moocConfig.lang;
    var t = window,
      i = NEJ.O,
      n = NEJ.F,
      a = NEJ.P('nej.e'),
      o = NEJ.P('edu.m'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      c = NEJ.P('nej.v'),
      d = NEJ.P('edu.d'),
      _,
      l;
    o._$$ExamObjective = NEJ.C();
    _ = o._$$ExamObjective._$extend(o._$$Module, !0);
    l = o._$$ExamObjective._$supro;
    _.__getXhtml = function () {
      return a._$getHtmlTemplate(
        'jst-edu-learnQuiz',
        r._$merge({ showHelp: !1, backTxt: window.moocConfig.lang.KEY_LEARN_RETURN }),
      );
    };
    _.__getParent = function () {
      return a._$get('courseLearn-inner-box');
    };
    _.__buildFuncPoints = function () {
      l.__buildFuncPoints.apply(this, arguments);
      this.__titleNode = a._$getByClassName(this.__body, 'j-title')[0];
      this.__prepareNode = a._$getByClassName(this.__body, 'j-prepare')[0];
      this.__doingNode = a._$getByClassName(this.__body, 'j-doing')[0];
      this.__backNode = a._$getByClassName(this.__body, 'j-backList')[0];
      this.__waitNode = a._$getByClassName(this.__body, 'j-waitForScore')[0];
      c._$addEvent(
        this.__backNode,
        'click',
        function () {
          if (200 === window.learnMode || 300 === window.learnMode)
            window.dispatcher._$redirect(s.umi('efficientExamine'));
          else window.dispatcher._$redirect(s.umi('learnExamList'));
        }._$bind(this),
      );
      this.__quizCache = new d._$$COM_Cache_QuizCache();
      this.__quizCache._$addEvent('onGetOpenQuizInfo', this.__onGetQuizInfoCB._$bind(this));
      this.__quizCache._$addEvent('onGetPreviewQuizList', this.__onGetQuizListCB._$bind(this));
      this.__quizCache._$addEvent('onGetQuizPaperList', this.__onGetQuizListCB._$bind(this));
    };
    _.__onGetQuizInfoCB = function (e) {
      console.log('__ongetquizInfo', e);
      if (e) {
        this.__examInfo = e;
        this.__titleNode.innerHTML = r._$escape(e.name);
        if (e.aid > 0) this.__onToggleDoing();
        else {
          var i = function () {
            this.__examInfo.startTime = 0;
            this.__beforeExam = s._$$ExamProtocolUI._$allocate({
              parent: this.__prepareNode,
              type: 'object',
              data: e,
              onDoingAble: this.__onToggleDoing._$bind(this),
            });
          }._$bind(this);
          if (!t.isPreview && e.targetAnswerform) {
            if (
              e.targetAnswerform.effectStatus == s.CONST.QUIZ_SUBMIT_VALID &&
              s._$getCurServerTime() < e.deadline
            ) {
              i();
              return;
            }
            if (
              e.targetAnswerform.effectStatus == s.CONST.QUIZ_SUBMIT_VALID ||
              (e.evaluateScoreReleaseTime <= s._$getCurServerTime() &&
                e.scorePubStatus == s.CONST.SCORE_PUB_STATUS_CONFIRMED)
            )
              t.dispatcher._$redirect(
                s.umi('learnExamObjectScore') +
                  '?id=' +
                  this.__testId +
                  '&aid=' +
                  e.targetAnswerform.aid +
                  '&eid=' +
                  this.__examId +
                  '&examType=' +
                  this.__examType,
              );
            else this.__onToggleWaitForScore();
          } else i();
        }
      }
    };
    _.__onGetQuizListCB = function (e) {
      console.log('exam object _data', e, this.__examInfo, this.__preventCheatingData);
      if (e) {
        a._$addClassName(this.__prepareNode, 'f-dn');
        a._$delClassName(this.__doingNode, 'f-dn');
        console.log('quizDoingUI data', e, this.__examInfo, this.__preventCheatingData);
        this.__quizDoingUI = s._$$QuizDoingUI._$allocate({
          parent: this.__doingNode,
          quizDto: e,
          testId: this.__testId,
          examId: this.__examId,
          examType: this.__examType,
          baseInfo: this.__examInfo,
          type: 'exam',
          onSubmit: function () {
            this.__onToggleWaitForScore();
          }._$bind(this),
        });
      }
    };
    _.__onToggleDoing = function () {
      var e = !t.isPreview ? this.__examInfo.aid : null;
      if (1 == t.isPreview) this.__quizCache._$getPreviewQuizList(this.__testId);
      else this.__quizCache._$getOpenQuizPaperList(this.__testId, e, !1, t.appId);
    };
    _.__onToggleWaitForScore = function () {
      a._$addClassName(this.__prepareNode, 'f-dn');
      a._$addClassName(this.__doingNode, 'f-dn');
      a._$delClassName(this.__waitNode, 'f-dn');
      this.__waitNode.innerHTML =
        '<div class="f-fl icn"></div><div class="f-fl tip f-f0">' +
        e.KEY_LEARN_SUBMITTED_IN +
        s._$formatCommonTime(this.__examInfo.evaluateScoreReleaseTime) +
        e.KEY_LEARN_ANNOUNCE +
        '</div>';
    };
    _.__onShow = function (e) {
      if (!window.isNeedOpenCloseTerm)
        if (!((t.webUser && 0 != t.isEnroll) || t.isNeedOpenCloseTerm)) {
          t.dispatcher._$redirect(s.umi('notEnroll') + '?from=exam');
          return;
        }
      l.__onShow.apply(this, arguments);
      this.__onRefresh(e);
    };
    _.__onRefresh = function (e) {
      l.__onRefresh.apply(this, arguments);
      console.log('examObjective onrefresh', e);
      this.__clearUI();
      this.__examInfo = [];
      this.__examId = e.param.eid || '';
      this.__examType = e.param.examType;
      this.__testId = e.param.id || '';
      this.__quizCache._$getOpenQuizInfo(this.__testId, null, !!t.isPreview, t.appId);
      if (!t.isPreview) {
        var i = {
          userId: s._$getWebUser().id,
          courseId: t.courseDto.id,
          termId: t.termDto.id,
          quizId: this.__testId,
          examId: this.__examId,
        };
        s._$trackEvent('exam', 'view', s._$convertToJSONHex(i));
        s._$log2Study('exam', 'view', i);
      }
    };
    _.__clearUI = function (e) {
      if (this.__beforeExam) this.__beforeExam = s._$$ExamProtocolUI._$recycle(this.__beforeExam);
      if (this.__quizDoingUI) this.__quizDoingUI = s._$$QuizDoingUI._$recycle(this.__quizDoingUI);
      a._$delClassName(this.__prepareNode, 'f-dn');
      a._$addClassName(this.__doingNode, 'f-dn');
      a._$addClassName(this.__waitNode, 'f-dn');
    };
    _.__onHide = function () {
      this.__clearUI();
      l.__onHide.apply(this, arguments);
      a._$removeByEC(this.__body);
    };
    t.dispatcher._$loaded(s.umi('learnExamObjective'), o._$$ExamObjective);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '8a6e1591b595a108dc0d7c3ecef76bb9',
  'a01f33fc4c73dd5578f3439696dfd8bc',
  '2c666a1ceb412082b906b11b0948dedf',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'bf8d09e46d2369efd6e41b29fe211330',
  '93828627ddb358ed890cb65967a0c1de',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '08d2f36062baca2c8eb8327afd74d88c',
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
