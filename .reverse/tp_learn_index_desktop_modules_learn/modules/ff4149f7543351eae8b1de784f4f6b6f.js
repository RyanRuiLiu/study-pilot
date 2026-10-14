EDU(
  'ff4149f7543351eae8b1de784f4f6b6f',
  function () {
    var e = window,
      t = NEJ.P('nej.e'),
      i = NEJ.P('nej.u'),
      n = NEJ.P('edu.m'),
      a = NEJ.P('edu.d'),
      o = NEJ.P('edu.u'),
      s,
      r;
    n._$$LearnTestList = NEJ.C();
    s = n._$$LearnTestList._$extend(n._$$Module, !0);
    r = n._$$LearnTestList._$supro;
    s.__init = function (e) {
      console.log('__proLearnTestList __init', e);
      this.__parentNode = e.parent;
      r.__supInit.apply(this, arguments);
    };
    s.__getXhtml = function () {
      return t._$getHtmlTemplate('jst-edu-learnTest', {
        lang: (window.moocConfig || {}).lang || {},
      });
    };
    s.__getParent = function () {
      return this.__parentNode ? this.__parentNode : t._$get('courseLearn-inner-box');
    };
    s.__buildFuncPoints = function () {
      r.__buildFuncPoints.apply(this, arguments);
      this.__moduleNameNode = t._$getByClassName(this.__body, 'j-moduleName')[0];
      this.__googleNode = t._$getByClassName(this.__body, 'j-google-course-cert')[0];
      this.__moduleTitle = t._$getByClassName(this.__body, 'u-learn-moduletitle')[0];
      this.__contentCache = new a._$$COM_Cache_CourseCtCache();
      this.__courseCache = new a._$$COM_Cache_CourseCache();
      this.__contentCache._$addEvent('onGetChapterList', this.__onGetChapterList._$bind(this));
      this.__courseCache._$addEvent('onCheckTermLearn', this.__onCheckTermLearnCb._$bind(this));
      this.__chapterQuizHwListUIs = [];
    };
    s.__onCheckTermLearnCb = function (t) {
      if (t >= 0) {
        r.__onShow.apply(this, arguments);
        this.__onRefresh(this.__onShowOptions);
      } else if (!e.isNeedOpenCloseTerm)
        e.dispatcher._$redirect(o.umi('notEnroll') + '?from=homework');
    };
    s.__onGetChapterList = function (t) {
      this.__termInfoData = t || {};
      if (this._chapterQuizHwListUI && !this.__splitUI)
        o._$$ChapterQuizHwList._$recycle(this._chapterQuizHwListUI);
      var i;
      this._chapterQuizHwListUI = i = o._$$ChapterQuizHwList._$allocate({
        parent: this.__body,
        termVo: this.__termInfoData.mocTermDto,
        syncMooc: !!this.__splitUI,
      });
      this.__chapterQuizHwListUIs.push(i);
      if (e.isNeedOpenCloseTerm) r.__onShow.apply(this, arguments);
      if (o._$isSpocSync() && !this.__splitUI) {
        this.__splitUI = o._$$SpocMoocSplit._$allocate({ parent: this.__body });
        this.__getChapterList(e.moocTermDto.id);
      }
    };
    s.__onShow = function (i) {
      if (e.isPreview) {
        this.__onShowOptions = i;
        r.__onShow.apply(this, arguments);
        this.__moduleNameNode.innerText = e.learnBigTabNames && e.learnBigTabNames[i.target];
        this.__onRefresh(this.__onShowOptions);
      } else {
        if (!e.isNeedOpenCloseTerm)
          if (!e.webUser) {
            e.dispatcher._$redirect(o.umi('notEnroll') + '?from=homework');
            return;
          }
        this.__onShowOptions = i;
        if (e.webUser) this.__courseCache._$CheckTermLearn(e.termDto.id);
        if (!i.parent)
          this.__moduleNameNode.innerText = e.learnBigTabNames && e.learnBigTabNames[i.target];
        if (i.parent) t._$addClassName(this.__moduleTitle, 'f-dn');
        if (e.isNeedOpenCloseTerm) this.__onRefresh(this.__onShowOptions);
      }
    };
    s.__onRefresh = function () {
      r.__onRefresh.apply(this, arguments);
      if (window.googleCourse) {
        var t = { termId: e.termDto.id, googleCourseLink: e.googleCourseLink };
        var i = window.renderReactComponent && window.renderReactComponent['GoogleCourseBtn'];
        if (i) i.render(t);
        else
          window.reactComponentLoadBootstrap.init(
            { name: 'GoogleCourseBtn', container: this.__googleNode },
            t,
          );
      }
      this.__clearUI();
      this.__getChapterList(e.termDto.id);
    };
    s.__getChapterList = function (t) {
      if (e.isPreview) {
        var i = e.isReview ? 0 : 1;
        this.__contentCache._$getChapterList(t, i, !e.isPreview);
      } else if (e.webUser && 1 == e.isEnroll) this.__contentCache.getLastLearnedMocTermDto(t);
      else {
        i = e.isReview ? 0 : 1;
        this.__contentCache._$getChapterList(t, i, !e.isPreview);
      }
    };
    s.__clearUI = function () {
      i._$forEach(
        this.__chapterQuizHwListUIs,
        function (e) {
          o._$$ChapterQuizHwList._$recycle(e);
        }._$bind(this),
      );
      this.__chapterQuizHwListUIs = [];
      if (this.__splitUI) this.__splitUI = o._$$SpocMoocSplit._$recycle(this.__splitUI);
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
    e.dispatcher._$loaded(o.umi('learnTestList'), n._$$LearnTestList);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  '5467e62f9605c8141f35bd317120d5c3',
  'ad72e09e8978dc83423b503971b6294c',
  'adec563fba581ac0f5bf79fb5e990240',
  '5c9eda50f7f7141a9b6f8da41978e2cd',
  'bf8d09e46d2369efd6e41b29fe211330',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
