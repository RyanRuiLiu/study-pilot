EDU(
  'ea133e51ffbd943e2a04b21cb3716cd7',
  function (e) {
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
    o._$$ObjectiveScoreBase = NEJ.C();
    _ = o._$$ObjectiveScoreBase._$extend(o._$$Module, !0);
    l = o._$$ObjectiveScoreBase._$supro;
    _.__getParent = function () {
      return a._$get('courseLearn-inner-box');
    };
    _.__buildFuncPoints = function () {
      l.__buildFuncPoints.apply(this, arguments);
      this.__titleNode = a._$getByClassName(this.__body, 'j-title')[0];
      this.__quizPoolNode = a._$getByClassName(this.__body, 'j-quizPool')[0];
      this.__backNode = a._$getByClassName(this.__body, 'j-backList')[0];
      this.__totalScore = a._$getByClassName(this.__body, 'j-totalScore')[0];
      this.__submitTime = a._$getByClassName(this.__body, 'j-submitTime')[0];
      this.__scoreInfo = a._$getByClassName(this.__body, 'j-scoreInfo')[0];
      this.__warnTip = a._$getByClassName(this.__body, 'j-warnTip')[0];
      this.__quizCache = new d._$$COM_Cache_QuizCache();
      this.__quizCache._$addEvent('onGetQuizInfo', this.__onGetQuizInfoCB._$bind(this));
      this.__quizCache._$addEvent('onGetPreviewQuizList', this.__onBuildQuizAnalysis._$bind(this));
      this.__quizCache._$addEvent('onGetQuizPaperList', this.__onBuildQuizAnalysis._$bind(this));
    };
    _.__onGetQuizInfoCB = function (e) {
      if (e && e.targetAnswerform) {
        this.__quizInfo = e;
        this.__titleNode.innerText = e.name;
        this.__buildBaseData(e.targetAnswerform);
        if (1 == t.isPreview) this.__quizCache._$getPreviewQuizList(this.__testId);
        else
          this.__quizCache._$getOpenQuizPaperList(
            this.__testId,
            e.targetAnswerform.aid,
            !0,
            t.appId,
          );
      }
    };
    _.__buildBaseData = function (e) {
      if (e) {
        this.__invalidScore = !1;
        if (!s._$isUserOwner(e.answererId)) {
          a._$addClassName(this.__warnTip, 'f-dn');
          a._$addClassName(this.__scoreInfo, 'f-dn');
        } else if (e.effectStatus != s.CONST.QUIZ_SUBMIT_EFFECT && 1 == !t.isPreview) {
          a._$delClassName(this.__warnTip, 'f-dn');
          a._$addClassName(this.__scoreInfo, 'f-dn');
          this.__invalidScore = !0;
        } else {
          a._$addClassName(this.__warnTip, 'f-dn');
          a._$delClassName(this.__scoreInfo, 'f-dn');
          if (1 == window.shouldHiddenScore)
            this.__totalScore.innerHTML =
              '<span class="j-triggerLockScore"></span>/' + this.__quizInfo.totalScore.toFixed(2);
          else
            this.__totalScore.innerText =
              e.score.toFixed(2) + '/' + this.__quizInfo.totalScore.toFixed(2);
          this.__submitTime.innerText = s._$formatShortTime(e.submitTime);
        }
      }
    };
    _.__onBuildQuizAnalysis = function (e) {
      console.log(e);
      if (e) {
        this.__recordDtos = s._$convertPaperQustionObj(e.objectiveQList, e.answers);
        this.__buildQuizPool(e);
      }
    };
    _.__buildQuizPool = function (e) {
      if (this.__quizPool) this.__quizPool = s._$$Quiz_Question_Pool._$recycle(this.__quizPool);
      this.__quizPool = s._$$Quiz_Question_Pool._$allocate({
        parent: this.__quizPoolNode,
        mode: 1,
        data: e,
        recordDtos: this.__recordDtos,
      });
      if (
        (e.deadline && s._$getCurServerTime() > e.deadline) ||
        (e.tryTime && e.usedTryCount >= e.tryTime)
      )
        this.__renderGLobalAIButton(e);
      else {
        var t = document.querySelector('#j-global-ai-robot');
        t && t.classList.add('f-dn');
      }
    };
    _.__renderGLobalAIButton = function (t) {
      var i = document.querySelector('#j-global-ai-robot');
      i && i.classList.remove('f-dn');
      window.learnUtilQuestionList = e._$getQuestionList(t);
      e._$renderGLobalAIButton(
        {
          pageType: location.hash.indexOf('/learn/exam') > -1 ? e.PAGE_TYPE.EXAM : e.PAGE_TYPE.QUIZ,
          sceneType: e.SCENE_TYPE.QUIZ,
          termId: window.termDto && window.termDto.id,
          courseId: window.courseDto && window.courseDto.id,
          courseName: window.courseDto && window.courseDto.name,
          qid: t.tid,
          questions: e._$getQuestionList(t),
        },
        document.querySelector('#j-global-ai-robot'),
      );
    };
    _.__onShow = function (e) {
      l.__onShow.apply(this, arguments);
      this.__onRefresh(e);
    };
    _.__onRefresh = function (e) {
      l.__onRefresh.apply(this, arguments);
      this.__testId = e.param.id || null;
      this.__aid = e.param.aid || null;
      this.__quizCache._$getQuizInfo(this.__testId, this.__aid, !!t.isPreview);
      if (1 == t.isPreview) s._$hiddenNode(this.__scoreInfo);
      else s._$showNode(this.__scoreInfo);
    };
    _.__onHide = function () {
      if (this.__quizPool) this.__quizPool = s._$$Quiz_Question_Pool._$recycle(this.__quizPool);
      l.__onHide.apply(this, arguments);
      a._$removeByEC(this.__body);
    };
  },
  '98bc2de85bcb11bb7f77ad5d5ee77c5a',
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  'a328147ec582fd1a85c9f0beb695bb31',
  '2c666a1ceb412082b906b11b0948dedf',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '93828627ddb358ed890cb65967a0c1de',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '7ae1049f52447f73129209d74071c691',
);
