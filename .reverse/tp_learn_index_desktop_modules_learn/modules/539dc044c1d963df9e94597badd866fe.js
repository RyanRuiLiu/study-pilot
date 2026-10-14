EDU(
  '539dc044c1d963df9e94597badd866fe',
  function (e) {
    var t = window,
      i = NEJ.O,
      n = NEJ.F,
      a = NEJ.P('nej.e'),
      o = NEJ.P('edu.m'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      c = NEJ.P('edu.d'),
      d,
      _;
    o._$$LearnAIKnowledgeTermGraph = NEJ.C();
    d = o._$$LearnAIKnowledgeTermGraph._$extend(o._$$Module, !0);
    _ = o._$$LearnAIKnowledgeTermGraph._$supro;
    d.__getXhtml = function () {
      return a._$getHtmlTemplate('jst-edu-learnAIKnowledgeTermGraph', {});
    };
    d.__getParent = function () {
      return a._$get('courseLearn-inner-box');
    };
    d.__buildFuncPoints = function () {
      _.__buildFuncPoints.apply(this, arguments);
    };
    d.__initReactTab = function () {
      String.prototype.replace = window.moocTempReplace
        ? window.moocTempReplace
        : String.prototype.replace;
      String.prototype.match = window.moocTempMatch ? window.moocTempMatch : String.prototype.match;
      var i = 'CourseGraphLearnView';
      var n = this.__body;
      var a = e._$parseUrlParams(location.search) || {};
      var o = t.termDto && 1 == t.termDto.supportAiLessonPlan;
      window.reactComponentLoadBootstrap.setFtlData({
        graphId: t.termDto && t.termDto.graphId,
        termId: (termDto || {}).id,
        courseId: (courseDto || {}).id,
        questionGraphId: t.termDto && t.termDto.questionGraphId,
        skillGraphId: t.termDto && t.termDto.skillGraphId,
        schoolId: t.courseCardDto && t.courseCardDto.schoolId,
        courseName: t.courseCardDto && t.courseCardDto.name,
        isTeacherPreview: window.isPreview,
        isCourseIntroduce: !1,
        questionNodeId: a.questionNodeId,
        supportIdeologyGraph: o,
        ideologyBizType: 2,
      });
      if (window.renderReactComponent && window.renderReactComponent[i]) {
        var s = window.renderReactComponent[i];
        window.renderReactComponent.ReactDOM.unmountComponentAtNode(n);
        window.renderReactComponent.render(s.component, s.initialState, n);
      } else window.reactComponentLoadBootstrap.init({ name: i, container: n });
    };
    d.__onShow = function (e) {
      _.__onShow.apply(this, arguments);
      this.__onRefresh();
    };
    d.__onRefresh = function (e) {
      _.__onRefresh.apply(this, arguments);
      this.__initReactTab();
    };
    d.__clearUIs = function () {
      window.renderReactComponent.ReactDOM.unmountComponentAtNode(this.__body);
    };
    d.__onHide = function () {
      this.__clearUIs();
      _.__onHide.apply(this, arguments);
      a._$removeByEC(this.__body);
    };
    t.dispatcher._$loaded(s.umi('learnAIKnowledgeTermGraph'), o._$$LearnAIKnowledgeTermGraph);
  },
  'fb061c769bfc74628a81f422f590544c',
  '137fe4d0d7d3d080cf2a5b00547f9347',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  'bf8d09e46d2369efd6e41b29fe211330',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
