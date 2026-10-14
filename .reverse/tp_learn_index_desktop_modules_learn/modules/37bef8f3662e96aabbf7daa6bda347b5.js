EDU(
  '37bef8f3662e96aabbf7daa6bda347b5',
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
    a._$$LearnScore = NEJ.C();
    c = a._$$LearnScore._$extend(a._$$Module, !0);
    d = a._$$LearnScore._$supro;
    c.__getXhtml = function () {
      return n._$getHtmlTemplate('jst-edu-myNote', { lang: (window.moocConfig || {}).lang || {} });
    };
    c.__getParent = function () {
      return n._$get('courseLearn-inner-box');
    };
    c.__initReactTab = function () {
      String.prototype.replace = window.moocTempReplace
        ? window.moocTempReplace
        : String.prototype.replace;
      String.prototype.match = window.moocTempMatch ? window.moocTempMatch : String.prototype.match;
      if (window.renderReactComponent && window.renderReactComponent['LearnAIMyNotes']) {
        window.reactComponentLoadBootstrap.setFtlData({
          termId: window.termDto && window.termDto.id,
          type: 'MY_NOTE',
        });
        window.renderReactComponent.ReactDOM.unmountComponentAtNode(this.__body);
        var e = window.renderReactComponent['LearnAIMyNotes'];
        window.renderReactComponent.render(e.component, e.initialState, this.__body);
      } else
        window.reactComponentLoadBootstrap.init(
          { name: 'LearnAIMyNotes', container: this.__body },
          { termId: window.termDto && window.termDto.id, type: 'MY_NOTE' },
        );
    };
    c.__buildFuncPoints = function () {
      d.__buildFuncPoints.apply(this, arguments);
    };
    c.__onShow = function (e) {
      d.__onShow.apply(this, arguments);
      this.__onRefresh(e);
      this.__initReactTab();
    };
    c.__onRefresh = function (e) {
      d.__onRefresh.apply(this, arguments);
      this.__clearUIs();
    };
    c.__clearUIs = function () {
      s._$forEach(
        this.__contentUIs,
        function (e, t) {
          e = o._$$CommonContentUI._$recycle(e);
        }._$bind(this),
      );
      this.__contentUIs = [];
    };
    c.__onHide = function () {
      this.__clearUIs();
      d.__onHide.apply(this, arguments);
      n._$removeByEC(this.__body);
    };
    e.dispatcher._$loaded(o.umi('myNote'), a._$$LearnScore);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '6b5528963cf6513589ed63ca5804f990',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  'bf8d09e46d2369efd6e41b29fe211330',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
