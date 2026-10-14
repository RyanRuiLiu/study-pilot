EDU(
  'b7b9ef3729a2fd81a911dcfcc87b7590',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('edu.m'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r = NEJ.P('edu.d'),
      c,
      d;
    a._$$LearnCustom = NEJ.C();
    c = a._$$LearnCustom._$extend(a._$$Module, !0);
    d = a._$$LearnCustom._$supro;
    c.__getXhtml = function () {
      return n._$getHtmlTemplate('jst-edu-learnCustom', {
        lang: (window.moocConfig || {}).lang || {},
      });
    };
    c.__getParent = function () {
      return n._$get('courseLearn-inner-box');
    };
    c.__buildFuncPoints = function () {
      d.__buildFuncPoints.apply(this, arguments);
      this.__moduleNameNode = n._$getByClassName(this.__body, 'j-moduleName')[0];
      this.__contentNode = n._$getByClassName(this.__body, 'j-content')[0];
      this.__courseContentCache = new r._$$COM_Cache_CourseCtCache();
      this.__courseContentCache._$addEvent('onGetMenuItem', this.__getMenuItemCb._$bind(this));
    };
    c.__getMenuItemCb = function (t) {
      var i = o._$$CommonContentUI._$allocate({
        parent: this.__body,
        emptyTips: window.moocConfig.lang.KEY_LEARN_WAIT_WITH_PATIENT,
        content: t ? t.htmlContent : null,
      });
      this.__contentUIs.push(i);
      if (o._$isSpocSync() && !this.__splitUI) {
        this.__splitUI = o._$$SpocMoocSplit._$allocate({ parent: this.__body });
        this.__courseContentCache._$getMenuItem(
          e.moocCourseDto.id,
          e.moocTermDto.id,
          this.__itemId,
          !!e.isPreview,
        );
      }
    };
    c.__onShow = function (e) {
      d.__onShow.apply(this, arguments);
      this.__onRefresh(e);
    };
    c.__onRefresh = function (t) {
      d.__onRefresh.apply(this, arguments);
      this.__itemId = t.param.id;
      if (this.__itemId) {
        this.__clearUIs();
        this.__moduleNameNode.innerText =
          e.learnBigTabNames && e.learnBigTabNames[t.target + '?id=' + this.__itemId];
        this.__courseContentCache._$getMenuItem(
          e.courseDto.id,
          e.termDto.id,
          this.__itemId,
          !!e.isPreview,
        );
      }
    };
    c.__clearUIs = function () {
      s._$forEach(
        this.__contentUIs,
        function (e, t) {
          e = o._$$CommonContentUI._$recycle(e);
        }._$bind(this),
      );
      this.__contentUIs = [];
      if (this.__splitUI) this.__splitUI = o._$$SpocMoocSplit._$recycle(this.__splitUI);
    };
    c.__onHide = function () {
      this.__clearUIs();
      d.__onHide.apply(this, arguments);
      n._$removeByEC(this.__body);
    };
    e.dispatcher._$loaded(o.umi('learnCustom'), a._$$LearnCustom);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '6b5528963cf6513589ed63ca5804f990',
  '5c9eda50f7f7141a9b6f8da41978e2cd',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'ad72e09e8978dc83423b503971b6294c',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  'bf8d09e46d2369efd6e41b29fe211330',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
