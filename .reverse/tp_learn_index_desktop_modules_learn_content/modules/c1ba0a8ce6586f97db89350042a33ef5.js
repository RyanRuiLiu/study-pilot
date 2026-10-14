EDU(
  'c1ba0a8ce6586f97db89350042a33ef5',
  function (e) {
    var t = window,
      n = NEJ.O,
      i = NEJ.F,
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      c;
    s._$$ChapterList = NEJ.C();
    c = s._$$ChapterList._$extend(s._$$UIBase, !0);
    c.__initXGui = function () {
      this.__seed_html = o._$addNodeTemplate(
        o._$getHtmlTemplate('jst-learnChapterList', {
          lang: (window.moocConfig || {}).lang || {},
          isEn: 'en' === window.currentLanguage,
        }),
      );
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__titleNode = o._$getByClassName(this.__body, 'j-moduletitle')[0];
      this.__moduleNameNode = o._$getByClassName(this.__body, 'j-moduleName')[0];
      this.__emptyNode = o._$getByClassName(this.__body, 'j-empty')[0];
    };
    c.__mergeChapExams = function (e) {
      this.__termVo = e || {};
      this.__termVo.chapters = this.__termVo.chapters || [];
      var t = this.__termVo.chapters;
      this.__termVo.mergeChapters = t;
    };
    c.__mergeAiStatus = function (n, i) {
      if (isPreview) {
        var o = [];
        if (n.chapters && n.chapters.length)
          r._$forEach(n.chapters, function (e, t) {
            if (e.lessons && e.lessons.length)
              r._$forEach(e.lessons, function (e, t) {
                if (e.units && e.units.length)
                  r._$forEach(e.units, function (e, t) {
                    if (e.contentType == s.CONST.LESSONUNIT_VIDEO) o.push(e.id);
                  });
              });
          });
        e._$listUnitAIStatus({ termId: t.termDto.id, unitIds: JSON.stringify(o) }, function (e) {
          var t = {};
          r._$forEach(e, function (e, n) {
            t[e.unitId] = { unitAiStatus: e.unitAiStatus, contentId: e.contentId };
          });
          i(t);
        });
      } else i();
    };
    c.__reset = function (e) {
      this.__supReset(e);
      this.__mergeChapExams(e.termVo);
      this.__mergeAiStatus(
        e.termVo,
        function (t) {
          this.__moduleNameNode.innerText = e.moduleName || '';
          s._$toggleNodeDisplay(this.__titleNode, !e.syncMooc);
          if (!this.__termVo.mergeChapters.length) s._$showNode(this.__emptyNode);
          else {
            s._$hiddenNode(this.__emptyNode);
            var n = this.__termVo.mergeChapters[0];
            r._$forEach(this.__termVo.mergeChapters, function (i, o) {
              r._$forEach(i.lessons, function (o, a) {
                r._$forEach(o.units, function (o, a) {
                  if (e.lastLearnUnitId && o.id == e.lastLearnUnitId) n = i;
                  if (t && void 0 != t[o.id] && t[o.id].contentId == o.contentId)
                    o.aiStatus = t[o.id].unitAiStatus;
                });
              });
            });
            this.__chapterUIs = [];
            r._$forEach(
              this.__termVo.mergeChapters,
              function (t, i) {
                var o = null;
                var a = null;
                var r = null;
                switch (t.contentType) {
                  case s.CONST.CHAPTER_TYPE_NORMAL:
                    o = s._$$ChapterNormal._$allocate({
                      parent: this.__body,
                      chapterVo: t,
                      initDownStatus: n == t,
                      syncMooc: e.syncMooc,
                    });
                    this.__chapterUIs.push({ type: 'chapter', ui: o });
                    break;
                  case s.CONST.CHAPTER_QUIZ:
                    a = s._$$ChapterExam._$allocate({
                      parent: this.__body,
                      examVo: t,
                      syncMooc: e.syncMooc,
                    });
                    this.__chapterUIs.push({ type: 'exam', ui: a });
                    break;
                  case 3:
                    r = s._$$ChapterExam._$allocate({
                      parent: this.__body,
                      examVo: t,
                      isNewExam: !0,
                      syncMooc: e.syncMooc,
                    });
                    this.__chapterUIs.push({ type: 'newExam', ui: r });
                }
              }._$bind(this),
            );
          }
        }._$bind(this),
      );
    };
    c.__destroy = function () {
      r._$forEach(
        this.__chapterUIs,
        function (e, t) {
          if ('chapter' === e.type) _chapterUI = s._$$ChapterNormal._$recycle(e.ui);
          else if ('exam' === e.type) _examUI = s._$$ChapterExam._$recycle(e.ui);
          else if ('newExam' === e.type) _newExamUI = s._$$ChapterExam._$recycle(e.ui);
        }._$bind(this),
      );
      this.__chapterUIs = null;
      this.__supDestroy();
    };
  },
  '8e2e477f7b9e6e134cfe14f830c66a52',
  '8e9c53b98e22fa9419ebaabd0dd2b334',
  'b5a950f651fa0961e0eaec9b66523521',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '93828627ddb358ed890cb65967a0c1de',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
