EDU(
  '8e9c53b98e22fa9419ebaabd0dd2b334',
  function (e) {
    var t = window,
      n = NEJ.O,
      i = NEJ.F,
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      c;
    s._$$ChapterNormal = NEJ.C();
    c = s._$$ChapterNormal._$extend(s._$$UIBase, !0);
    c.__initXGui = function () {
      this.__seed_html = o._$addNodeTemplate(o._$getHtmlTemplate('jst-learnChapterNormal'));
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__titleBox = o._$getByClassName(this.__body, 'j-titleBox')[0];
      this.__nameNode = o._$getByClassName(this.__body, 'j-titleName')[0];
      this.__lessoBox = o._$getByClassName(this.__body, 'j-lessoBox')[0];
      this.__upNode = o._$getByClassName(this.__body, 'j-up')[0];
      this.__downNode = o._$getByClassName(this.__body, 'j-down')[0];
      this.__noContent = o._$getByClassName(this.__body, 'j-noContent')[0];
      this.__previewStatusNode = o._$getByClassName(this.__body, 'j-previewStatus')[0];
      this.__line = o._$getByClassName(this.__body, 'j-line')[0];
      a._$addEvent(
        this.__titleBox,
        'click',
        function (e) {
          this.__showUpDownMode(!this.__downStatus, e);
        }._$bind(this),
      );
    };
    c.__showUpDownMode = function (n, i) {
      s._$hiddenNode(this.__upNode);
      s._$hiddenNode(this.__downNode);
      s._$showNode(this.__noContent);
      var o = this.__chapterVo.mergeLessons.length;
      var a = !!t.isPreview && this.__chapterVo.draftStatus == s.CONST.CHAPTERSTATUS_DELETED;
      if (!a && o) {
        this.__downStatus = !!n;
        s._$hiddenNode(this.__noContent);
        if (this.__downStatus) {
          s._$showNode(this.__downNode);
          this.__lessonNormalUIs = [];
          this.__lessonQuizUIs = [];
          this.__lessonHwUIs = [];
          r._$forEach(
            this.__chapterVo.mergeLessons,
            function (e, n) {
              var i = null;
              switch (e.contentType) {
                case s.CONST.LESSON_TYPE_QUIZ:
                  i = s._$$LessonQuiz._$allocate({
                    parent: this.__lessoBox,
                    lessonVo: e,
                    clazz: n == o - 1 ? 'last' : '',
                    syncMooc: this.__syncMooc,
                  });
                  this.__lessonQuizUIs.push(i);
                  break;
                case s.CONST.LESSON_TYPE_HOMEWORK:
                  i = s._$$LessonHomework._$allocate({
                    parent: this.__lessoBox,
                    lessonVo: e,
                    clazz: n == o - 1 ? 'last' : '',
                    syncMooc: this.__syncMooc,
                  });
                  this.__lessonHwUIs.push(i);
                  break;
                case s.CONST.LESSON_TYPE_NORMAL:
                default:
                  i = s._$$LessonNormal._$allocate({
                    parent: this.__lessoBox,
                    lessonVo: e,
                    clazz: n == o - 1 ? 'last' : '',
                    notPreview: !t.isPreview,
                    syncMooc: this.__syncMooc,
                  });
                  this.__lessonNormalUIs.push(i);
              }
            }._$bind(this),
          );
        } else {
          s._$showNode(this.__upNode);
          this.__clearUIs();
        }
      } else if (i) {
        var c = e.KEY_TEACH_UNIT;
        var d = a
          ? c + e.KEY_LEARN_CONTENT_DELETED
          : e.KEY_LEARN_NOT_ADDED_YET + c + e.KEY_LEARN_CONTENT;
        s._$$CommonDialog._$showDialog({ type: 1, message: d, modal: !0 });
      }
    };
    c.__mergeLsnQuizHW = function (e) {
      this.__chapterVo = e;
      this.__chapterVo.lessons = this.__chapterVo.lessons || [];
      var n = !t.isPreview
        ? this.__chapterVo.lessons
            .concat(this.__chapterVo.quizs || [])
            .concat(this.__chapterVo.homeworks || [])
        : this.__chapterVo.lessons;
      this.__chapterVo.mergeLessons = n.sort(function (e, t) {
        return e.position - t.position;
      });
    };
    c.__reset = function (e) {
      this.__supReset(e);
      this.__syncMooc = e.syncMooc;
      this.__mergeLsnQuizHW(e.chapterVo);
      this.__nameNode.innerText = this.__chapterVo.name || '';
      this.__showUpDownMode(!!e.initDownStatus);
      if (t.isPreview && !t.isReview) {
        var n =
          this.__chapterVo.draftStatus == s.CONST.CHAPTERSTATUS_PUBLISHED ||
          this.__chapterVo.draftStatus == s.CONST.CHAPTERSTATUS_DELETED;
        var i = window.webUser.roles || [];
        this.__previewStatusUI = s._$$PreviewStatus._$allocate({
          parent: this.__previewStatusNode,
          vo: this.__chapterVo,
          type: s.CONST.CHAPTER_TYPE_NORMAL,
          hidePublish: n || !!e.syncMooc || i.includes(s.CONST.ROLE_REGION_ADMIN),
        });
      }
    };
    c.__clearUIs = function () {
      r._$forEach(
        this.__lessonNormalUIs,
        function (e, t) {
          e = s._$$LessonNormal._$recycle(e);
        }._$bind(this),
      );
      this.__lessonNormalUIs = null;
      r._$forEach(
        this.__lessonQuizUIs,
        function (e, t) {
          e = s._$$LessonQuiz._$recycle(e);
        }._$bind(this),
      );
      this.__lessonQuizUIs = null;
      r._$forEach(
        this.__lessonHwUIs,
        function (e, t) {
          e = s._$$LessonHomework._$recycle(e);
        }._$bind(this),
      );
      this.__lessonHwUIs = null;
    };
    c.__destroy = function () {
      this.__clearUIs();
      if (this.__previewStatusUI)
        this.__previewStatusUI = s._$$PreviewStatus._$recycle(this.__previewStatusUI);
      this.__supDestroy();
    };
  },
  '05914c6f767170cf483bb9df9a899f1e',
  'a1e9192d3b72c40040dedd10cf047fc7',
  'aa604eee72c30e4ab47131b0e65592a7',
  '1787c38a11a8e8184385e7783942c142',
  '94ec8a8dfa596967c090fc2c92487692',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '93828627ddb358ed890cb65967a0c1de',
  'ab6af9f7e26b55b8c5a875bba5679347',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
