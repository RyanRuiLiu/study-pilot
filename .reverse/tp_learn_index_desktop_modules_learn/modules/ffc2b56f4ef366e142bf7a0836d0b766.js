EDU(
  'ffc2b56f4ef366e142bf7a0836d0b766',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('edu.m'),
      o = NEJ.P('nej.v'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.u'),
      d,
      _;
    a._$$knowledgeShare = NEJ.C();
    d = a._$$knowledgeShare._$extend(a._$$Module, !0);
    _ = a._$$knowledgeShare._$supro;
    d.__getXhtml = function () {
      return n._$getHtmlTemplate('jst-knowledge-share', {
        lang: (window.moocConfig || {}).lang || {},
      });
    };
    d.__getParent = function () {
      return n._$get('courseLearn-inner-box');
    };
    d.__buildFuncPoints = function () {
      _.__buildFuncPoints.apply(this, arguments);
    };
    d.__onShow = function (e) {
      _.__onShow.apply(this, arguments);
      this.__onRefresh(e);
    };
    d.__onRefresh = function (e) {
      _.__onRefresh.apply(this, arguments);
      String.prototype.replace = window.moocTempReplace;
      String.prototype.match = window.moocTempMatch;
      console.log('KnowledgeShare', {
        isPreview: window.isPreview,
        courseId: window.courseDto.id,
        schoolSN:
          window.courseDto && window.courseDto.schoolPanel
            ? window.courseDto.schoolPanel.shortName
            : null,
        termId: window.termDto ? window.termDto.id : null,
      });
      var t = {
        isPreview: window.isPreview,
        courseId: window.courseDto.id,
        schoolSN:
          window.courseDto && window.courseDto.schoolPanel
            ? window.courseDto.schoolPanel.shortName
            : null,
        termId: window.termDto ? window.termDto.id : null,
        isSpoc: window.isSpoc,
      };
      if (window.reactComponentLoadBootstrap) window.reactComponentLoadBootstrap.setFtlData(t);
      console.log(
        'window.reactComponentLoadBootstrap',
        document.getElementById('j-knowledge-share'),
      );
      if (window.renderReactComponent && window.renderReactComponent['KnowledgeShareWeb']) {
        console.log('已经有');
        window.renderReactComponent.ReactDOM.unmountComponentAtNode(
          document.getElementById('j-knowledge-share'),
        );
        var i = window.renderReactComponent['KnowledgeShareWeb'];
        window.renderReactComponent.render(
          i.component,
          i.initialState,
          document.getElementById('j-knowledge-share'),
        );
      } else
        window.reactComponentLoadBootstrap.init(
          { name: 'KnowledgeShareWeb', container: document.getElementById('j-knowledge-share') },
          t,
        );
    };
    d.__onHide = function () {
      _.__onHide.apply(this, arguments);
      n._$removeByEC(this.__body);
    };
    e.dispatcher._$loaded(r.umi('learnKnowledgeShare'), a._$$knowledgeShare);
  },
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'bf8d09e46d2369efd6e41b29fe211330',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
