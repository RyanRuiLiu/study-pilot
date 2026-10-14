EDU(
  '472fb1aba526fad6383f79b0f9c5009d',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('edu.m'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r = NEJ.P('nej.v'),
      c = NEJ.P('nej.ut'),
      d = NEJ.P('edu.d'),
      _,
      l;
    a._$$LearnQuiz = NEJ.C();
    _ = a._$$LearnQuiz._$extend(a._$$Module, !0);
    l = a._$$LearnQuiz._$supro;
    _.__getXhtml = function () {
      return n._$getHtmlTemplate(
        'jst-edu-learnQuiz',
        s._$merge(
          { showHelp: !0, backTxt: window.moocConfig.lang.KEY_LEARN_RETURN },
          { lang: (window.moocConfig || {}).lang || {} },
        ),
      );
    };
    _.__getParent = function () {
      return n._$get('courseLearn-inner-box');
    };
    _.__buildFuncPoints = function () {
      l.__buildFuncPoints.apply(this, arguments);
      this.__titleNode = n._$getByClassName(this.__body, 'j-title')[0];
      this.__prepareNode = n._$getByClassName(this.__body, 'j-prepare')[0];
      this.__doingNode = n._$getByClassName(this.__body, 'j-doing')[0];
      this.__quizPoolNode = n._$getByClassName(this.__body, 'j-quizPool')[0];
      this.__backNode = n._$getByClassName(this.__body, 'j-backList')[0];
      r._$addEvent(
        this.__backNode,
        'click',
        function () {
          if (200 === window.learnMode || 300 === window.learnMode)
            window.dispatcher._$redirect(o.umi('efficientExamine'));
          else window.dispatcher._$redirect(o.umi('learnTestList'));
        }._$bind(this),
      );
      this.__quizCache = new d._$$COM_Cache_QuizCache();
      this.__quizCache._$addEvent('onGetOpenQuizInfo', this.__onGetQuizInfoCB._$bind(this));
      this.__quizCache._$addEvent('onGetPreviewQuizList', this.__onGetQuizListCB._$bind(this));
      this.__quizCache._$addEvent('onGetQuizPaperList', this.__onGetQuizListCB._$bind(this));
    };
    _.__onGetQuizInfoCB = function (e) {
      if (e) {
        this.__quizInfo = e;
        this.__titleNode.innerHTML = s._$escape(e.name);
        if (this.__beforeTest) this.__beforeTest = o._$$BeforeTestUI._$recycle(this.__beforeTest);
        if (e.aid <= 0 || !e.aid)
          this.__beforeTest = o._$$BeforeTestUI._$allocate({
            parent: this.__prepareNode,
            data: e,
            onDoingAble: this.__onToggleDoing._$bind(this),
          });
        else this.__onToggleDoing();
      }
    };
    _.__onGetQuizListCB = function (e) {
      if (e) {
        n._$addClassName(this.__prepareNode, 'f-dn');
        n._$delClassName(this.__doingNode, 'f-dn');
        this.__quizDoingUI = o._$$QuizDoingUI._$allocate({
          parent: this.__doingNode,
          quizDto: e,
          baseInfo: this.__quizInfo,
          type: 'quiz',
        });
      }
    };
    _.__onToggleDoing = function () {
      var t = !e.isPreview ? this.__quizInfo.aid : null;
      if (1 == e.isPreview) this.__quizCache._$getPreviewQuizList(this.__testId);
      else this.__quizCache._$getOpenQuizPaperList(this.__testId, t, !1, e.appId);
    };
    _.__onRefresh = function (t) {
      l.__onRefresh.apply(this, arguments);
      this.__quizInfo = [];
      this.__testId = t.param.id || '';
      this.__quizCache._$getOpenQuizInfo(this.__testId, null, !!e.isPreview, e.appId);
      if (!e.isPreview) {
        var i = {
          userId: o._$getWebUser().id,
          courseId: e.courseDto.id,
          termId: e.termDto.id,
          quizId: this.__testId,
        };
        o._$trackEvent('quiz', 'view', o._$convertToJSONHex(i));
        o._$log2Study('quiz', 'view', i);
      }
    };
    _.__onShow = function (t) {
      if ((e.webUser && 0 != e.isEnroll) || e.isNeedOpenCloseTerm) {
        l.__onShow.apply(this, arguments);
        this.__onRefresh(t);
      } else e.dispatcher._$redirect(o.umi('notEnroll') + '?from=homework');
    };
    _.__onHide = function () {
      if (this.__beforeTest) this.__beforeTest = o._$$BeforeTestUI._$recycle(this.__beforeTest);
      if (this.__quizDoingUI) this.__quizDoingUI = o._$$QuizDoingUI._$recycle(this.__quizDoingUI);
      n._$delClassName(this.__prepareNode, 'f-dn');
      n._$addClassName(this.__doingNode, 'f-dn');
      if (this.__timer) this.__timer = e.clearInterval(this.__timer);
      l.__onHide.apply(this, arguments);
      n._$removeByEC(this.__body);
    };
    e.dispatcher._$loaded(o.umi('learnQuiz'), a._$$LearnQuiz);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  'e6b30e2908e7f3ecffc2b8d52a873ad2',
  'a01f33fc4c73dd5578f3439696dfd8bc',
  '2c666a1ceb412082b906b11b0948dedf',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'bf8d09e46d2369efd6e41b29fe211330',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
