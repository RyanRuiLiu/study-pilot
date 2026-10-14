EDU(
  'b5a950f651fa0961e0eaec9b66523521',
  function (e, t) {
    var n = window,
      i = NEJ.O,
      o = NEJ.F,
      a = NEJ.P('nej.e'),
      s = NEJ.P('nej.v'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.u'),
      d;
    r._$$ChapterExam = NEJ.C();
    d = r._$$ChapterExam._$extend(r._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_html = a._$addNodeTemplate(a._$getHtmlTemplate('jst-learnChapterExam'));
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__titleBox = a._$getByClassName(this.__body, 'j-titleBox')[0];
      this.__nameNode = a._$getByClassName(this.__body, 'j-titleName')[0];
      this.__noContent = a._$getByClassName(this.__body, 'j-noContent')[0];
      this.__phraseNode = a._$getByClassName(this.__body, 'j-phase')[0];
      this.__previewStatusNode = a._$getByClassName(this.__body, 'j-previewStatus')[0];
      s._$addEvent(this.__titleBox, 'click', this.__examClickHandle._$bind(this));
    };
    d.__examClickHandle = function (i) {
      var o = window.courseDto && window.courseDto.id;
      var a = window.termDto && window.termDto.id;
      var s = this.__examVo.exam && this.__examVo.exam.id;
      var c = window.schoolDto && window.schoolDto.shortName;
      if (o) t._$userActionLog('learn', o);
      if (r._$isWap()) {
        console.log('__examClickHandle', this.__examVo);
        var d = this.__isNewExam
          ? 'https://www.icourse163.org/mooc/main/newExamCard?eid=' +
            s +
            '&tid=' +
            a +
            '&cid=' +
            o +
            '&sn=' +
            c +
            (window.isSpoc ? '&isSpoc=1' : '')
          : !1;
        console.log('redirectUrl', d);
        e.interceptUnitClick(void 0, d);
      } else {
        var l = !!n.isPreview && this.__examVo.draftStatus == r.CONST.CHAPTERSTATUS_DELETED;
        if (l || !this.__examVo.id) {
          if (i) {
            var _ = window.moocConfig.lang.KEY_LEARN_EXAMINATION;
            var u = l
              ? _ + window.moocConfig.lang.KEY_LEARN_CONTENT_DELETED
              : window.moocConfig.lang.KEY_LEARN_NOT_ADDED_YET +
                _ +
                window.moocConfig.lang.KEY_LEARN_CONTENT;
            r._$$CommonDialog._$showDialog({ type: 1, message: u, modal: !0 });
          }
          return;
        }
        console.log('this.examvo', this.__examVo);
        n.dispatcher._$redirect(r.umi('learnExamList') + '?id=' + this.__examVo.id);
      }
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__examVo = e.examVo || {};
      this.__nameNode.innerText = this.__examVo.name || '';
      this.__isNewExam = 3 == this.__examVo.contentType;
      if (this.__isNewExam) a._$addClassName(this.__titleBox, 'new-exam');
      if (n.isPreview && !n.isReview) {
        if (this.__examVo.exam) this.__examVo.draftStatus = this.__examVo.exam.draftStatus;
        var t = window.webUser.roles || [];
        var i =
          this.__examVo.draftStatus == r.CONST.CHAPTERSTATUS_PUBLISHED ||
          this.__examVo.draftStatus == r.CONST.CHAPTERSTATUS_MODIFIED;
        this.__previewStatusUI = r._$$PreviewStatus._$allocate({
          parent: this.__previewStatusNode,
          vo: this.__examVo,
          type: r.CONST.CHAPTER_TYPE_EXAM,
          hidePublish: i || !!e.syncMooc || t.includes(r.CONST.ROLE_REGION_ADMIN),
        });
      }
      this.__genTextPhrase();
    };
    d.__genTextPhrase = function () {
      var e = '',
        t = r._$getCurServerTime();
      a._$delClassName(this.__phraseNode, 'phrase3');
      r._$showNode(this.__phraseNode);
      if (this.__examVo.subjectTest) {
        e = r._$getHwPhaseStrByTest(this.__examVo.subjectTest);
        a._$delClassName(this.__phraseNode, 'phrase1 phrase2 phrase3 phrase4');
        a._$addClassName(
          this.__phraseNode,
          'phrase' + r._$currentEvaluatePhase(this.__examVo.subjectTest),
        );
        if (!this.__examVo.subjectTest.deadline) r._$hiddenNode(this.__phraseNode);
      } else if (this.__examVo.objectTest) {
        if (t < this.__examVo.objectTest.deadline)
          e = window.moocConfig.lang.KEY_LEARN_SUBMISSION_STAGE;
        else {
          e = window.moocConfig.lang.KEY_LEARN_RESULTS_ANNOUNCED;
          a._$addClassName(this.__phraseNode, 'phrase3');
        }
        if (!this.__examVo.objectTest.deadline) r._$hiddenNode(this.__phraseNode);
      } else r._$hiddenNode(this.__phraseNode);
      this.__phraseNode.innerText = e;
    };
    d.__destroy = function () {
      if (this.__previewStatusUI)
        this.__previewStatusUI = r._$$PreviewStatus._$recycle(this.__previewStatusUI);
      this.__supDestroy();
    };
  },
  '72082ce7fa131d8e62eb43521a683cd9',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '94ec8a8dfa596967c090fc2c92487692',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '342ad7ae4eea50c3cad860686650a915',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '93828627ddb358ed890cb65967a0c1de',
  'bf8d09e46d2369efd6e41b29fe211330',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '08d2f36062baca2c8eb8327afd74d88c',
);
