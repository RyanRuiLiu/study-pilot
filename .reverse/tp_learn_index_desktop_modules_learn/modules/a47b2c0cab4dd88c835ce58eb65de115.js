EDU(
  'a47b2c0cab4dd88c835ce58eb65de115',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('edu.m'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r = NEJ.P('nej.v'),
      c = NEJ.P('edu.d'),
      d,
      _;
    a._$$LearnQuizScore = NEJ.C();
    d = a._$$LearnQuizScore._$extend(a._$$ObjectiveScoreBase, !0);
    _ = a._$$LearnQuizScore._$supro;
    d.__getXhtml = function () {
      return n._$getHtmlTemplate(
        'jst-edu-learnQuizScore',
        s._$merge(
          { backTxt: window.moocConfig.lang.KEY_LEARN_RETURN, showDoAgain: !0 },
          { lang: (window.moocConfig || {}).lang || {} },
        ),
      );
    };
    d.__buildFuncPoints = function () {
      _.__buildFuncPoints.apply(this, arguments);
      this.__doAgainNode = n._$getByClassName(this.__body, 'j-doAgain')[0];
      this.__qaForumNode = n._$getByClassName(this.__body, 'j-qaFormLink')[0];
      this.__scoreAppealHolder = n._$getByClassName(this.__body, 'j-scoreAppealHolder')[0];
      if (this.__scoreAppealHolder)
        this.__scoreAppealUI = o._$$ScoreAppealUI._$allocate({ parent: this.__scoreAppealHolder });
      if (this.__qaForumNode)
        this.__qaForumNode.href = '#' + o.umi('learnForumTopic') + '?fid=' + e.quizForumId;
      r._$addEvent(
        this.__backNode,
        'click',
        function () {
          o._$goBack(o.umi('learnTestList'));
        }._$bind(this),
      );
      r._$addEvent(
        this.__doAgainNode,
        'click',
        function () {
          e.dispatcher._$redirect(o.umi('learnQuiz') + '?id=' + this.__testId);
        }._$bind(this),
      );
    };
    d.__buildBaseData = function (e) {
      _.__buildBaseData.apply(this, arguments);
      if (this.__invalidScore)
        this.__warnTip.innerHTML = window.moocConfig.lang.KEY_LEARN_YOU_SUBMISSION_SELFEARNING;
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
      if (this.__scoreAppealUI) {
        var t = o._$getWebUser();
        this.__scoreAppealUI._$reset({
          bizType: 2,
          bizId: e.param.id,
          userId: t ? t.id : '',
          hasSubjective: !1,
        });
      }
    };
    e.dispatcher._$loaded(o.umi('learnQuizScore'), a._$$LearnQuizScore);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  'ea133e51ffbd943e2a04b21cb3716cd7',
  'bf8d09e46d2369efd6e41b29fe211330',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'e529c28cec1f23f81b7d9f013fb674ee',
);
