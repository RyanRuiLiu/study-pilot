EDU(
  '40afa2e0d560068c0496bec063bb0d2b',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    o._$$ExamListItem = NEJ.C();
    r = o._$$ExamListItem._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate('jst-examListItem', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__titleBox = n._$getByClassName(this.__body, 'j-titleBox')[0];
      this.__upNode = n._$getByClassName(this.__body, 'j-up')[0];
      this.__downNode = n._$getByClassName(this.__body, 'j-down')[0];
      this.__noContent = n._$getByClassName(this.__body, 'j-noContent')[0];
      this.__nameNode = n._$getByClassName(this.__body, 'j-name')[0];
      this.__totalScoreNode = n._$getByClassName(this.__body, 'j-totalScore')[0];
      this.__validScoreNode = n._$getByClassName(this.__body, 'j-validScore')[0];
      this.__detailBox = n._$getByClassName(this.__body, 'j-detail')[0];
      this.__descriptionNode = n._$getByClassName(this.__body, 'j-description')[0];
      this.__submitTimeNode = n._$getByClassName(this.__body, 'j-submitTime')[0];
      this.__publishTimeNode = n._$getByClassName(this.__body, 'j-publishTime')[0];
      this.__previewStatusNode = n._$getByClassName(this.__body, 'j-previewStatus')[0];
      a._$addEvent(
        this.__titleBox,
        'click',
        function (e) {
          this.__showUpDownMode(!this.__downStatus, e);
        }._$bind(this),
      );
    };
    r.__handleTriagleStatus = function (e) {
      o._$hiddenNode(this.__upNode);
      o._$hiddenNode(this.__downNode);
      o._$hiddenNode(this.__noContent);
      this.__downStatus = !!e;
      if (this.__downStatus) {
        o._$showNode(this.__downNode);
        n._$addClassName(this.__body, 'down');
        if (this.__examVo.objectTest)
          this.__examObjInfoUI = o._$$ExamObjectiveInfoItem._$allocate({
            parent: this.__detailBox,
            examVo: this.__examVo,
            testVo: this.__examVo.objectTest,
          });
        if (this.__examVo.subjectTest)
          this.__examSbjInfoUI = o._$$ExamSubjectiveInfoItem._$allocate({
            parent: this.__detailBox,
            examVo: this.__examVo,
            testVo: this.__examVo.subjectTest,
          });
      } else {
        o._$showNode(this.__upNode);
        n._$delClassName(this.__body, 'down');
        this.__clearUIs();
      }
    };
    r.__showUpDownMode = function (t, i) {
      o._$hiddenNode(this.__upNode);
      o._$hiddenNode(this.__downNode);
      o._$showNode(this.__noContent);
      var n = !!e.isPreview && this.__examVo.draftStatus == o.CONST.CHAPTERSTATUS_DELETED;
      if (!n && this.__examVo.id)
        if (t) this.__handleTriagleStatus(!0);
        else this.__handleTriagleStatus(!1);
      else if (i) {
        var a = window.moocConfig.lang.KEY_LEARN_EXAMINATION;
        var s = n
          ? a + window.moocConfig.lang.KEY_LEARN_CONTENT_DELETED
          : window.moocConfig.lang.KEY_LEARN_NOT_ADDED_YET +
            a +
            window.moocConfig.lang.KEY_LEARN_CONTENT;
        o._$$CommonDialog._$showDialog({ type: 1, message: s, modal: !0 });
      }
    };
    r._$showUpDownMode = function (e) {
      this.__showUpDownMode(e, null);
    };
    r.__reset = function (t) {
      this.__supReset(t);
      this.__examVo = t.examVo || {};
      this.__nameNode.innerText = this.__examVo.name;
      this.__totalScoreNode.innerText =
        window.moocConfig.lang.KEY_LEARN_TOTAL_SCORE1 +
        (this.__examVo.totalScore || 0) +
        window.moocConfig.lang.KEY_LEARN_SCORE_SCORE2;
      this.__validScoreNode.innerText = '';
      this.__body.setAttribute('id', this.__examVo.chapterId);
      var i = 1 == window.shouldHiddenScore;
      if (
        null != this.__examVo.userScore &&
        o._$getCurServerTime() >= this.__examVo.scoreReleaseTime &&
        this.__examVo.scorePubStatus == o.CONST.SCORE_PUB_STATUS_CONFIRMED
      )
        if (i)
          this.__validScoreNode.innerHTML =
            window.moocConfig.lang.KEY_LEARN_EXAM_GRADE +
            '<span class="j-triggerLockScore"></span>';
        else
          this.__validScoreNode.innerText =
            window.moocConfig.lang.KEY_LEARN_EXAM_GRADE +
            (this.__examVo.userScore + (this.__examVo.bonusScore || 0)).toFixed(2) +
            window.moocConfig.lang.KEY_LEARN_SCORE_SCORE2;
      if (this.__examVo.description) {
        if (this.__descriptionNode) {
          o._$showNode(this.__descriptionNode.parentNode);
          this.__descriptionNode.innerText = this.__examVo.description;
        }
      } else this.__descriptionNode && o._$hiddenNode(this.__descriptionNode.parentNode);
      this.__submitTimeNode.innerText = o._$formatCommonTime(this.__examVo.deadline);
      this.__publishTimeNode.innerText = o._$formatCommonTime(this.__examVo.scoreReleaseTime);
      this.__showUpDownMode(!1);
      if (e.isPreview && !e.isReview) {
        var n =
          this.__examVo.draftStatus == o.CONST.CHAPTERSTATUS_PUBLISHED ||
          this.__examVo.draftStatus == o.CONST.CHAPTERSTATUS_MODIFIED;
        var a = window.webUser.roles || [];
        this.__previewStatusUI = o._$$PreviewStatus._$allocate({
          parent: this.__previewStatusNode,
          vo: this.__examVo,
          type: this.__examVo.contentType,
          hidePublish: n || !!t.syncMooc || a.includes(o.CONST.ROLE_REGION_ADMIN),
        });
      }
    };
    r.__clearUIs = function () {
      if (this.__examObjInfoUI)
        this.__examObjInfoUI = o._$$ExamObjectiveInfoItem._$recycle(this.__examObjInfoUI);
      if (this.__examSbjInfoUI)
        this.__examSbjInfoUI = o._$$ExamSubjectiveInfoItem._$recycle(this.__examSbjInfoUI);
    };
    r.__destroy = function () {
      this.__clearUIs();
      if (this.__previewStatusUI)
        this.__previewStatusUI = o._$$PreviewStatus._$recycle(this.__previewStatusUI);
      this.__supDestroy();
    };
  },
  '7ae1049f52447f73129209d74071c691',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'bce468214ca2360a1236a20393444ef6',
  '83bcbe1b3294c87f82b06a50ede6bd63',
  '94ec8a8dfa596967c090fc2c92487692',
  '342ad7ae4eea50c3cad860686650a915',
  '93828627ddb358ed890cb65967a0c1de',
  'ab6af9f7e26b55b8c5a875bba5679347',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
