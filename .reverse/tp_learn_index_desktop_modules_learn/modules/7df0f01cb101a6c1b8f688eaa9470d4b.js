EDU(
  '7df0f01cb101a6c1b8f688eaa9470d4b',
  function () {
    var e = (window.moocConfig || {}).lang || {};
    var t = window,
      i = NEJ.O,
      n = NEJ.F,
      a = NEJ.P('nej.e'),
      o = NEJ.P('edu.m'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      c = NEJ.P('nej.v'),
      d,
      _;
    o._$$ExamObjectScore = NEJ.C();
    d = o._$$ExamObjectScore._$extend(o._$$ObjectiveScoreBase, !0);
    _ = o._$$ExamObjectScore._$supro;
    d.__getXhtml = function () {
      return a._$getHtmlTemplate(
        'jst-edu-learnQuizScore',
        r._$merge(
          { backTxt: window.moocConfig.lang.KEY_LEARN_RETURN, showDoAgain: !1 },
          { lang: (window.moocConfig || {}).lang || {} },
        ),
      );
    };
    d.__buildFuncPoints = function () {
      _.__buildFuncPoints.apply(this, arguments);
      this.__scoreAppealHolder = a._$getByClassName(this.__body, 'j-scoreAppealHolder')[0];
      if (this.__scoreAppealHolder)
        this.__scoreAppealUI = s._$$ScoreAppealUI._$allocate({ parent: this.__scoreAppealHolder });
      c._$addEvent(
        this.__backNode,
        'click',
        function () {
          window.dispatcher._$redirect(s.umi('learnExamList'));
        }._$bind(this),
      );
    };
    d.__buildBaseData = function (t) {
      _.__buildBaseData.apply(this, arguments);
      if (this.__invalidScore) this.__warnTip.innerHTML = e.KEY_LEARN_YOU_SUBMISSION_SELFEARNING;
    };
    d.__onBuildQuizAnalysis = function (e) {
      _.__onBuildQuizAnalysis.apply(this, arguments);
      if (this.__scoreAppealUI)
        this.__scoreAppealUI._$setHasSubjective(
          !!(e && e.subjectiveQList && e.subjectiveQList.length),
        );
    };
    d.__onRefresh = function (e) {
      this.__supOnRefresh(e);
      this.__examId = e.param.eid || null;
      this.__examType = e.param.examType;
      if (this.__scoreAppealUI) {
        var t = s._$getWebUser();
        this.__scoreAppealUI._$reset({
          bizType: 1,
          bizId: this.__examId,
          examType: this.__examType,
          userId: t ? t.id : '',
          hasSubjective: !1,
        });
      }
    };
    t.dispatcher._$loaded(s.umi('learnExamObjectScore'), o._$$ExamObjectScore);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  'ea133e51ffbd943e2a04b21cb3716cd7',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'bf8d09e46d2369efd6e41b29fe211330',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'e529c28cec1f23f81b7d9f013fb674ee',
);
