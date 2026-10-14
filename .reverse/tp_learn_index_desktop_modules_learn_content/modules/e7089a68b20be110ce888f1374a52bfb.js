EDU(
  'e7089a68b20be110ce888f1374a52bfb',
  function (e) {
    var t = window,
      n = NEJ.O,
      i = NEJ.F,
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.u'),
      d;
    var l = o._$pushCSSText(
      '        .#<uispace> {border:1px solid #ccc;padding:20px;}        .#<uispace> .unitctBox{border:none;}        .#<uispace> .u-questionItem.first{padding-top:0;}        .#<uispace> .submit{margin-top:20px;}        ',
    );
    r._$$TestUnit = NEJ.C();
    d = r._$$TestUnit._$extend(r._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_html = o._$addNodeTemplate(
        o._$getHtmlTemplate(
          'jst-lessonTestUI',
          c._$merge(
            { showTest: !(!t.webUser || 0 == t.isEnroll) },
            { lang: (window.moocConfig || {}).lang || {} },
          ),
        ),
      );
      this.__seed_css = l;
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__unitctBoxNode = o._$getByClassName(this.__body, 'j-unitctBox')[0];
      this.__submitBtn = o._$getByClassName(this.__body, 'j-submit')[0];
      this.__replayBtn = o._$getByClassName(this.__body, 'j-replay')[0];
      this.__enrollBtnNode = o._$getByClassName(this.__body, 'j-enroll')[0];
      this.cache = new s._$$COM_Cache_CourseCache();
      this.memberCache = new s._$$COM_Cache_MemberCache();
      this.cache._$addEvent('onStartTermLearn', this.__onStartLearnCourseCb._$bind(this));
      this.memberCache._$addEvent('onCheckEmailStatus', this.__onCheckEmailStatus._$bind(this));
      a._$addEvent(this.__enrollBtnNode, 'click', this.__attendCourse._$bind(this));
      a._$addEvent(this.__submitBtn, 'click', this.__submitAnswer._$bind(this));
      a._$addEvent(this.__replayBtn, 'click', this.__replayAnswer._$bind(this));
      this.__quizCache = new s._$$COM_Cache_QuizCache();
      this.__contentCache = new s._$$COM_Cache_CourseCtCache();
      this.__quizCache._$addEvent('onSubmitAnswers', this.__submitAnswerCb._$bind(this));
    };
    d.__attendCourse = function () {
      if (!r._$isUserLogin()) r._$$LoginDialog._$showLogin({ from: 'learn' });
      else this.memberCache._$checkEmailStatus();
    };
    d.__onCheckEmailStatus = function (e) {
      if (e && e.emailStatus == r.CONST.EMAIL_ACTIVE_INIT)
        r._$$CommonMailDialog._$showDialog({
          start: -1,
          onGotoLearn: function () {
            this.__gotoLearn();
          }._$bind(this),
          enrollnotGotoLearn: function () {
            this.__enrollnotGotoLearn = !0;
            this.__gotoLearn();
          }._$bind(this),
        });
      else this.cache._$StartTermLearn(t.termDto.id, null);
    };
    d.__onStartLearnCourseCb = function () {
      t.isEnroll = !0;
      if (this.__enrollnotGotoLearn) window.location.reload();
      else {
        r.showToastTips({
          content:
            window.moocConfig.lang.KEY_LEARN_HAVE_COURSE +
            t.courseDto.name +
            window.moocConfig.lang.KEY_LEARN_SYMBOL3,
          type: 1,
        });
        if (this.__noticeNode) r._$hiddenNode(this.__noticeNode);
        setTimeout(function () {
          window.location.reload();
        }, 1e3);
      }
    };
    d.__gotoLearn = function () {
      this.cache._$StartTermLearn(t.termDto.id, null);
    };
    d.__submitAnswer = function () {
      if (r._$isUserLogin()) {
        if (0 == t.isEnroll) {
          this.__attendCourseModal = new e({ data: { discusFlag: !1 } });
          return;
        }
        this.__paperVo.answers = this.__questionPool._$getAnswerDtos();
        this.__quizCache._$submitAnswers(this.__paperVo, !!t.isPreview);
      } else r._$$LoginDialog._$showLogin({ from: 'learn' });
    };
    d.__replayAnswer = function () {
      if (r._$isUserLogin()) {
        if (0 == t.isEnroll) {
          this.__attendCourseModal = new e();
          return;
        }
        this.__showAnsOrAnalysis(!0);
      } else r._$$LoginDialog._$showLogin({ from: 'learn' });
    };
    d.__submitAnswerCb = function () {
      this.__showAnsOrAnalysis(!1);
      this.__buildAndTrack('submit');
    };
    d.__buildAndTrack = function (e) {
      if (!t.isPreview) {
        var n = {
          userId: r._$getWebUser().id,
          courseId: t.courseDto.id,
          termId: this.__unitVo.termId,
          lessonId: this.__unitVo.lessonId,
          unitId: this.__unitVo.id,
          testId: this.__unitVo.contentId,
        };
        r._$trackEvent('testUnit', e, r._$convertToJSONHex(n));
        r._$log2Study('testUnit', e, n);
        this.__contentCache._$saveLearnInfo({
          unitId: this.__unitVo.id,
          finished: !0,
          contentType: 5,
        });
      }
    };
    d.__reset = function (e) {
      this.__supReset(e);
      if (t.webUser && 0 != t.isEnroll) {
        this.__unitVo = e.unitVo;
        this.__resourceVo = e.resourceVo;
        if (this.__resourceVo) {
          this.__paperVo = e.resourceVo.paper;
          this.__showAnsOrAnalysis(!(this.__paperVo.answers && this.__paperVo.answers.length));
        }
        this.__buildAndTrack('view');
      }
    };
    d.__showAnsOrAnalysis = function (e) {
      var t = {
        parent: this.__unitctBoxNode,
        data: this.__paperVo,
        recordDtos: r._$convertPaperQustionObj(
          this.__paperVo.objectiveQList,
          this.__paperVo.answers,
        ),
        mode: null,
        noScore: !0,
      };
      if (e) {
        r._$showNode(this.__submitBtn);
        r._$hiddenNode(this.__replayBtn);
        t.mode = 0;
        t.recordDtos = r._$convertPaperQustionObj(this.__paperVo.objectiveQList, null);
      } else {
        r._$hiddenNode(this.__submitBtn);
        r._$showNode(this.__replayBtn);
        t.mode = 1;
      }
      this.__clearQuestionPool();
      this.__questionPool = r._$$Quiz_Question_Pool._$allocate(t);
    };
    d.__clearQuestionPool = function () {
      if (this.__questionPool)
        this.__questionPool = r._$$Quiz_Question_Pool._$recycle(this.__questionPool);
    };
    d.__destroy = function () {
      this.__clearQuestionPool();
      this.__supDestroy();
    };
  },
  '1c23b43dfd9c054559909485b4169fa4',
  '342ad7ae4eea50c3cad860686650a915',
  'a328147ec582fd1a85c9f0beb695bb31',
  '2c666a1ceb412082b906b11b0948dedf',
  'ad72e09e8978dc83423b503971b6294c',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '126d23b5ac6aef1dd83e84a4a70524a3',
  'a936afb5ecab0e9286c3c9d05341571d',
  '891a76809ded82c88f5536f4458ae1ad',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  '93828627ddb358ed890cb65967a0c1de',
  'cc26d5920093e9742f0feca3855e8e68',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
