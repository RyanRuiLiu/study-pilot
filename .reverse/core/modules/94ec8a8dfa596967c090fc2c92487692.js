EDU(
  '94ec8a8dfa596967c090fc2c92487692',
  function (e) {
    var t = window,
      n = NEJ.O,
      i = NEJ.F,
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      r = NEJ.P('edu.d'),
      s = NEJ.P('edu.u'),
      c = NEJ.P('nej.u'),
      d;
    var l =
      '<div class="f-pa u-previewstatus">                    <a class="f-fl u-btn u-btn-primary publishbtn j-btn">' +
      e.KEY_LEARN_RELEASE +
      '</a>                    <span class="f-fl statustxt f-fc9 j-txt"></span>                </div>';
    var u = o._$pushCSSText(
      '.#<uispace>{ width:120px; top:6px; right:-120px; height:28px;}                                     .#<uispace> .publishbtn{ line-height:22px; margin-left:8px; padding:2px 9px; min-width:0px;}                                     .#<uispace> .statustxt{ line-height:28px; margin-left:8px;}',
    );
    s._$$PreviewStatus = NEJ.C();
    d = s._$$PreviewStatus._$extend(s._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_css = u;
      this.__seed_html = o._$addNodeTemplate(l);
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__btnNode = o._$getByClassName(this.__body, 'j-btn')[0];
      this.__txtNode = o._$getByClassName(this.__body, 'j-txt')[0];
      this.__courseCache = new r._$$COM_Cache_CourseCreateCache();
      this.__courseCache._$addEvent('onPublishChapter', this.__cbPublish._$bind(this));
      this.__courseCache._$addEvent('onPublishTest', this.__cbPublish._$bind(this));
      this.__examCache = new r._$$COM_Cache_ExamCreateCache();
      this.__examCache._$addEvent('onPublishExamDraft', this.__cbPublish._$bind(this));
      a._$addEvent(this.__btnNode, 'click', this.__clickPublish._$bind(this));
    };
    d.__clickPublish = function (e) {
      a._$stop(e);
      if (!this.__hidePublish)
        switch (this.__type) {
          case s.CONST.CHAPTER_QUIZ:
          case s.CONST.CHAPTER_HOMEWORK:
            this.__courseCache._$publishTest(this.__vo, this.__vo.test.type);
            break;
          case s.CONST.CHAPTER_TYPE_NORMAL:
            this.__courseCache._$publishChapter(this.__vo.termId, this.__vo.id);
            break;
          case s.CONST.CHAPTER_TYPE_EXAM:
            this.__examCache._$publishExamDraft(this.__vo.termId, this.__vo.id, null);
        }
    };
    d.__cbPublish = function (e) {
      if (e && 1 == Boolean(e.success)) {
        s.showToastTips({
          type: 1,
          content: window.moocConfig.lang.KEY_LEARN_PUBLISHED_SUCCESSFULLY,
        });
        this.__btnNode.style.display = 'none';
        this.__txtNode.innerHTML = window.moocConfig.lang.KEY_LEARN_PUBLISHED;
      } else {
        var t = '';
        if (e.message) t = e.message;
        else if (e.messages) for (var n = e.messages.length - 1; n >= 0; n--) t += e.messages[n];
        s._$$CommonDialog._$showDialog({ type: 1, message: t });
      }
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__vo = e.vo;
      this.__type = e.type;
      this.__hidePublish = e.hidePublish;
      this.__buildStatus();
    };
    d.__buildStatus = function () {
      this.__status =
        void 0 == this.__vo.testDraftStatus ? this.__vo.draftStatus : this.__vo.testDraftStatus;
      var t = '';
      var n = !0;
      switch (this.__status) {
        case s.CONST.CHAPTERSTATUS_CREATE:
          t = window.moocConfig.lang.KEY_LEARN_UNPUBLISHED;
          break;
        case s.CONST.CHAPTERSTATUS_PUBLISHED:
          t = '';
          n = !1;
          break;
        case s.CONST.CHAPTERSTATUS_MODIFIED:
          t = window.moocConfig.lang.KEY_LEARN_MODIFIED;
          break;
        case s.CONST.CHAPTERSTATUS_DELETED:
          t = e.KEY_LEARN_DELETED;
      }
      o._$delClassName(this.__body, 'leftin');
      if (this.__type == s.CONST.CHAPTER_TYPE_EXAM && 0 != n)
        o._$addClassName(this.__body, 'leftin');
      this.__txtNode.innerHTML = t;
      if (n && !this.__hidePublish) this.__btnNode.style.display = 'block';
      else this.__btnNode.style.display = 'none';
    };
    d.__destroy = function () {
      this.__supDestroy();
    };
  },
  '61a3a3a5a602c34a33d876f6138c6ede',
  '9bfebb51709abe7f692c4cae5fb9cb48',
  '054e11477ebcfe742d44b029e7994471',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '93828627ddb358ed890cb65967a0c1de',
  'cc26d5920093e9742f0feca3855e8e68',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
