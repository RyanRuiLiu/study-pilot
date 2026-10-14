EDU(
  '90f346889e20579d29ccd3fc01873f10',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.d'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      c;
    s._$$QuizHwListItem = NEJ.C();
    c = s._$$QuizHwListItem._$extend(s._$$UIBase, !0);
    c.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate('jst-quizHwListItem', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__titleBox = n._$getByClassName(this.__body, 'j-titleBox')[0];
      this.__upNode = n._$getByClassName(this.__body, 'j-up')[0];
      this.__downNode = n._$getByClassName(this.__body, 'j-down')[0];
      this.__noContent = n._$getByClassName(this.__body, 'j-noContent')[0];
      this.__nameNode = n._$getByClassName(this.__body, 'j-name')[0];
      this.__submitTimeNode = n._$getByClassName(this.__body, 'j-submitTime')[0];
      this.__validScoreNode = n._$getByClassName(this.__body, 'j-validScore')[0];
      this.__validLockScoreNode = n._$getByClassName(this.__body, 'j-validLockScore')[0];
      this.__validLockScoreContainer = n._$getByClassName(
        this.__body,
        'j-validLockScore-container',
      )[0];
      this.__quizBtn = n._$getByClassName(this.__body, 'j-quizBtn')[0];
      this.__detailBox = n._$getByClassName(this.__body, 'j-detail')[0];
      this.__previewStatusNode = n._$getByClassName(this.__body, 'j-previewStatus')[0];
      a._$addEvent(this.__quizBtn, 'click', this.__quizHwClickHandle._$bind(this));
      a._$addEvent(
        this.__titleBox,
        'click',
        function (e) {
          this.__showUpDownMode(!this.__downStatus, e);
        }._$bind(this),
      );
      this.__quizCache = new o._$$COM_Cache_QuizCache();
      this.__quizCache._$addEvent('onGetOpenQuizInfo', this.__onGetQuizInfo._$bind(this));
      this.__homeworkCache = new o._$$COM_Cache_HomeworkCache();
      this.__homeworkCache._$addEvent(
        'onGetOpenHomeworkInfo',
        this.__onGetHomeworkInfo._$bind(this),
      );
      this.__ojCache = new o._$$COM_Cache_OJCache();
      this.__ojCache._$addEvent('ongetOJPaperInfo', this.__ongetOJPaperInfo._$bind(this));
    };
    c.__onGetQuizInfo = function (e) {
      if (this.__quizInfoUI) this.__quizInfoUI = s._$$QuizInfoItem._$recycle(this.__quizInfoUI);
      this.__quizInfoUI = s._$$QuizInfoItem._$allocate({ parent: this.__detailBox, quizInfoVo: e });
      this.__handleTriagleStatus(!0);
    };
    c.__onGetHomeworkInfo = function (e) {
      this.__hwInfoUI = s._$$HwInfoItem._$allocate({ parent: this.__detailBox, hwInfoVo: e });
      this.__handleTriagleStatus(!0);
    };
    c.__ongetOJPaperInfo = function (e) {
      this.__ojInfoUI = s._$$OjInfoItem._$allocate({ parent: this.__detailBox, ojInfoVo: e });
      this.__handleTriagleStatus(!0);
    };
    c.__handleTriagleStatus = function (e) {
      s._$hiddenNode(this.__upNode);
      s._$hiddenNode(this.__downNode);
      s._$hiddenNode(this.__noContent);
      this.__downStatus = !!e;
      if (this.__downStatus) {
        s._$showNode(this.__downNode);
        n._$addClassName(this.__body, 'down');
      } else {
        s._$showNode(this.__upNode);
        n._$delClassName(this.__body, 'down');
        this.__clearUIs();
      }
    };
    c.__showUpDownMode = function (t, i) {
      s._$hiddenNode(this.__upNode);
      s._$hiddenNode(this.__downNode);
      s._$showNode(this.__noContent);
      var n = !!e.isPreview && this.__lessonVo.testDraftStatus == s.CONST.CHAPTERSTATUS_DELETED;
      if (!n && this.__lessonVo.test.id) {
        s._$showNode(this.__quizBtn);
        if (t)
          switch (this.__lessonVo.contentType) {
            case s.CONST.LESSON_TYPE_QUIZ:
              this.__quizCache._$getOpenQuizInfo(
                this.__lessonVo.test.id,
                null,
                !!e.isPreview,
                e.appId,
              );
              break;
            case s.CONST.LESSON_TYPE_HOMEWORK:
              if (this.__lessonVo.test.type == s.CONST.TYPE_SUBJECTIVE_OJ)
                this.__ojCache._$getOJPaperInfo(this.__lessonVo.test.id, null, !!e.isPreview);
              else
                this.__homeworkCache._$getOpenHomeworkInfo(
                  this.__lessonVo.test.id,
                  null,
                  !!e.isPreview,
                  e.appId,
                );
          }
        else this.__handleTriagleStatus(!1);
      } else {
        s._$hiddenNode(this.__quizBtn);
        if (i) {
          var a =
            this.__lessonVo.contentType == s.CONST.LESSON_TYPE_QUIZ
              ? window.moocConfig.lang.KEY_LEARN_TEST
              : window.moocConfig.lang.KEY_LEARN_ASSIGNMENT;
          var o = n
            ? a + window.moocConfig.lang.KEY_LEARN_CONTENT_DELETED
            : window.moocConfig.lang.KEY_LEARN_NOT_ADDED_YET +
              a +
              window.moocConfig.lang.KEY_LEARN_CONTENT;
          s._$$CommonDialog._$showDialog({ type: 1, message: o, modal: !0 });
        }
      }
    };
    c.__quizHwClickHandle = function (t) {
      a._$stop(t);
      var i = '';
      switch (this.__lessonVo.contentType) {
        case s.CONST.LESSON_TYPE_QUIZ:
          s._$trackEvent(
            'quizItem',
            'click',
            window.moocConfig.lang.KEY_LEARN_CLICK_ENTER_QUIZ + 'id:' + this.__lessonVo.test.id,
          );
          i = s.umi('learnQuiz') + '?id=' + this.__lessonVo.test.id;
          break;
        case s.CONST.LESSON_TYPE_HOMEWORK:
          s._$trackEvent(
            'homeItem',
            'click',
            window.moocConfig.lang.KEY_LEARN_CLICK_ASSIGNMENT + 'id:' + this.__lessonVo.test.id,
          );
          if (this.__lessonVo.test.type == s.CONST.TYPE_SUBJECTIVE_OJ)
            i = s.umi('learnOJHomework') + '?id=' + this.__lessonVo.test.id;
          else i = s.umi('learnHomework') + '?id=' + this.__lessonVo.test.id;
      }
      e.dispatcher._$redirect(i);
    };
    c.__reset = function (t) {
      this.__supReset(t);
      this.__lessonVo = t.lessonVo;
      this.__fouceNotDown = t.fouceNotDown || !1;
      this.__lessonVo.test = this.__lessonVo.test || {};
      this.__nameNode.innerText = this.__lessonVo.test.name || this.__lessonVo.name;
      this.__submitTimeNode.innerText =
        window.moocConfig.lang.KEY_LEARN_DEADLINE1 +
        s._$formatCommonTime(this.__lessonVo.test.deadline);
      this.__validScoreNode.innerText = '';
      var i = 1 == window.shouldHiddenScore;
      switch (this.__lessonVo.contentType) {
        case s.CONST.LESSON_TYPE_QUIZ:
          this.__quizBtn.innerText = window.moocConfig.lang.KEY_LEARN_GO_QUIZ;
          if (null != this.__lessonVo.test.userScore)
            if (i)
              this.__validScoreNode.innerHTML =
                window.moocConfig.lang.KEY_LEARN_QUIZ_SCORE +
                '<span class="j-triggerLockScore"></span>';
            else
              this.__validScoreNode.innerText =
                window.moocConfig.lang.KEY_LEARN_QUIZ_SCORE +
                (this.__lessonVo.test.userScore + this.__lessonVo.test.bonusScore).toFixed(2) +
                window.moocConfig.lang.KEY_LEARN_SCORE_SCORE2;
          break;
        case s.CONST.LESSON_TYPE_HOMEWORK:
          this.__quizBtn.innerText = window.moocConfig.lang.KEY_LEARN_GO_ASSIGNMENT;
          if (
            null != this.__lessonVo.test.userScore &&
            s._$getCurServerTime() >= this.__lessonVo.test.evaluateScoreReleaseTime &&
            this.__lessonVo.test.scorePubStatus == s.CONST.SCORE_PUB_STATUS_CONFIRMED
          )
            if (i)
              this.__validScoreNode.innerHTML =
                window.moocConfig.lang.KEY_LEARN_ASSIGNMENT_SCORE +
                '<span class="j-triggerLockScore"></span>';
            else
              this.__validScoreNode.innerText =
                window.moocConfig.lang.KEY_LEARN_ASSIGNMENT_SCORE +
                this.__lessonVo.test.userScore.toFixed(2) +
                window.moocConfig.lang.KEY_LEARN_SCORE_SCORE2;
      }
      var n = s._$getCurServerTime();
      if (this.__fouceNotDown) this.__showUpDownMode(!1);
      else
        this.__showUpDownMode(
          n >= this.__lessonVo.test.releaseTime &&
            (n <= this.__lessonVo.test.evaluateScoreReleaseTime ||
              n <= this.__lessonVo.test.deadline),
        );
      if (e.isPreview && !e.isReview) {
        var a =
          this.__lessonVo.testDraftStatus == s.CONST.CHAPTERSTATUS_PUBLISHED ||
          this.__lessonVo.testDraftStatus == s.CONST.CHAPTERSTATUS_MODIFIED;
        var o = window.webUser.roles || [];
        this.__previewStatusUI = s._$$PreviewStatus._$allocate({
          parent: this.__previewStatusNode,
          vo: this.__lessonVo,
          type: this.__lessonVo.contentType,
          hidePublish: a || !!t.syncMooc || o.includes(s.CONST.ROLE_REGION_ADMIN),
        });
      }
    };
    c.__clearUIs = function () {
      if (this.__quizInfoUI) this.__quizInfoUI = s._$$QuizInfoItem._$recycle(this.__quizInfoUI);
      if (this.__hwInfoUI) this.__hwInfoUI = s._$$HwInfoItem._$recycle(this.__hwInfoUI);
      if (this.__ojInfoUI) this.__ojInfoUI = s._$$OjInfoItem._$recycle(this.__ojInfoUI);
    };
    c.__destroy = function () {
      this.__clearUIs();
      if (this.__previewStatusUI)
        this.__previewStatusUI = s._$$PreviewStatus._$recycle(this.__previewStatusUI);
      this.__supDestroy();
    };
  },
  'af2bf5967458d94b196e5d5a47d6bc4c',
  '048cfc2ff2fa4df108e4e4829cd229b2',
  'dc6c0250afa4505abbbce9d9f504c577',
  '7ae1049f52447f73129209d74071c691',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '2c666a1ceb412082b906b11b0948dedf',
  '9404c0406a53242cb88cc30ecf858b38',
  '1159ecd0d791cfc03337b9f9188abac0',
  '94ec8a8dfa596967c090fc2c92487692',
  '342ad7ae4eea50c3cad860686650a915',
  '93828627ddb358ed890cb65967a0c1de',
  'ab6af9f7e26b55b8c5a875bba5679347',
  'bf8d09e46d2369efd6e41b29fe211330',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
