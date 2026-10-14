EDU(
  '5d00fb7eeccb186d225225499f450adb',
  function () {
    var e = window,
      t = NEJ.P('nej.e'),
      i = NEJ.P('edu.m'),
      n = NEJ.P('edu.d'),
      a = NEJ.P('edu.u'),
      o = NEJ.P('nej.u'),
      s,
      r;
    i._$$LearnExamList = NEJ.C();
    s = i._$$LearnExamList._$extend(i._$$Module, !0);
    r = i._$$LearnExamList._$supro;
    s.__init = function (e) {
      this.__parentNode = e.parent;
      r.__supInit.apply(this, arguments);
    };
    s.__getXhtml = function () {
      return t._$getHtmlTemplate('jst-edu-learnExam', {
        lang: (window.moocConfig || {}).lang || {},
      });
    };
    s.__getParent = function () {
      return this.__parentNode ? this.__parentNode : t._$get('courseLearn-inner-box');
    };
    s.__buildFuncPoints = function () {
      r.__buildFuncPoints.apply(this, arguments);
      this.__moduleNameNode = t._$getByClassName(this.__body, 'j-moduleName')[0];
      this.__moduleTitle = t._$getByClassName(this.__body, 'u-learn-moduletitle')[0];
      this.__contentCache = new n._$$COM_Cache_CourseCtCache();
      this.__courseCache = new n._$$COM_Cache_CourseCache();
      this.__contentCache._$addEvent('onGetChapterList', this.__onGetChapterList._$bind(this));
      this.__courseCache._$addEvent('onCheckTermLearn', this.__onCheckTermLearnCb._$bind(this));
      this.__examListUI = [];
    };
    s.__onGetChapterList = function (t) {
      this.__termInfoData = t || {};
      this.__releaseTimeExamId = null;
      this.__releaseTimeMin = 0;
      if (!this.__examId);
      var i =
        null === this.__termInfoData.mocTermDto
          ? []
          : this.__termInfoData.mocTermDto.chapters.reduce(
              function (e, t) {
                if (t.exam && 1 !== t.contentType) {
                  var i = Math.abs(a._$getCurServerTime() - t.releaseTime);
                  if (!this.__releaseTimeMin) this.__releaseTimeMin = i;
                  if (i < this.__releaseTimeMin) {
                    this.__releaseTimeExamId = t.id;
                    this.__releaseTimeMin = i;
                  }
                  if (3 !== t.contentType) e.push(t.exam);
                }
                return e;
              }._$bind(this),
              [],
            );
      if (this._examListUI && !this.__splitUI) a._$$CommonExamListUI._$recycle(this._examListUI);
      var n;
      this._examListUI = n = a._$$CommonExamListUI._$allocate({
        parent: this.__body,
        exams: i,
        examId: this.__examId || this.__releaseTimeExamId,
        syncMooc: !!this.__splitUI,
      });
      this.__examListUI.push(n);
      if (e.isNeedOpenCloseTerm) r.__onShow.apply(this, arguments);
      if (a._$isSpocSync() && !this.__splitUI) {
        this.__splitUI = a._$$SpocMoocSplit._$allocate({ parent: this.__body });
        this.__getChapterList(e.moocTermDto.id);
      }
    };
    s.__onShow = function (i) {
      if (e.isPreview) {
        this.__onShowOptions = i;
        r.__onShow.apply(this, arguments);
        this.__moduleNameNode.innerText =
          (e.learnBigTabNames && e.learnBigTabNames[i.target]) ||
          window.moocConfig.lang.KEY_LEARN_EXAMINATION;
        this.__onRefresh(this.__onShowOptions);
      } else {
        if (!e.webUser && !e.isNeedOpenCloseTerm && !e.isNeedOpenCloseTerm) {
          e.dispatcher._$redirect(a.umi('notEnroll') + '?from=exam');
          return;
        }
        this.__onShowOptions = i;
        if (e.webUser) this.__courseCache._$CheckTermLearn(e.termDto.id);
        if (!i.parent)
          this.__moduleNameNode.innerText =
            (e.learnBigTabNames && e.learnBigTabNames[i.target]) ||
            window.moocConfig.lang.KEY_LEARN_EXAMINATION;
        if (i.parent) t._$addClassName(this.__moduleTitle, 'f-dn');
        if (e.isNeedOpenCloseTerm) this.__onRefresh(this.__onShowOptions);
      }
    };
    s.__onCheckTermLearnCb = function (t) {
      if (t >= 0) {
        r.__onShow.apply(this, arguments);
        this.__onRefresh(this.__onShowOptions);
      } else if (!e.isNeedOpenCloseTerm) e.dispatcher._$redirect(a.umi('notEnroll') + '?from=exam');
    };
    s.__onRefresh = function (t) {
      r.__onRefresh.apply(this, arguments);
      this.__examId = t.param && t.param.id;
      this.__clearUI();
      this.__getChapterList(e.termDto.id);
    };
    s.__getChapterList = function (t) {
      if (e.isPreview) {
        var i = e.isReview ? 0 : 1;
        this.__contentCache.getMocTermDto(t, i, !e.isPreview);
      } else if (e.webUser && 1 == e.isEnroll) this.__contentCache.getLastLearnedMocTermDto(t);
      else {
        i = e.isReview ? 0 : 1;
        this.__contentCache.getMocTermDto(t, i, !e.isPreview);
      }
    };
    s.__clearUI = function () {
      o._$forEach(
        this.__examListUI,
        function (e) {
          a._$$CommonExamListUI._$recycle(e);
        }._$bind(this),
      );
      this.__examListUI = [];
      if (this.__splitUI) this.__splitUI = a._$$SpocMoocSplit._$recycle(this.__splitUI);
    };
    s.__onHide = function () {
      this.__clearUI();
      this.__termInfoData = null;
      r.__onHide.apply(this, arguments);
      t._$removeByEC(this.__body);
    };
    s.__reset = function (e) {
      if (e.parent) {
        e.parent.appendChild(this.__body);
        s.__onShow.apply(this, arguments);
      } else r.__supReset.apply(this, arguments);
    };
    e.dispatcher._$loaded(a.umi('learnExamList'), i._$$LearnExamList);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '7ae1049f52447f73129209d74071c691',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  '0420fecbfe618803d5371cc64a44090f',
  'ad72e09e8978dc83423b503971b6294c',
  '5c9eda50f7f7141a9b6f8da41978e2cd',
  'a936afb5ecab0e9286c3c9d05341571d',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'bf8d09e46d2369efd6e41b29fe211330',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
