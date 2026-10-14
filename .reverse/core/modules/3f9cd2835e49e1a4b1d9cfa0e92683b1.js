EDU(
  '3f9cd2835e49e1a4b1d9cfa0e92683b1',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.u'),
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      r = NEJ.P('edu.m'),
      s = NEJ.P('edu.u'),
      c;
    s._$$BaseType = NEJ.C();
    c = s._$$BaseType._$extend(s._$$UIBase, !0);
    c.__initNode = function () {
      this.__supInitNode();
    };
    c._$setAnswerRecord = n;
    c.__buildQuestionInfo = n;
    c.__goToAnalysisMode = n;
    c.__goToExamMode = n;
    c._$getAnswerDto = function () {
      return this.__answerDto;
    };
    c.__reset = function (e) {
      this.__supReset(e);
      this.__recordDto = e.recordDto;
      this.__mode = e.mode || 0;
      this.__position = e.position;
      this.__indexNum = e.indexNum || 0;
      this.__noScore = e.noScore || !1;
      this.__showAnalysis = e.showAnalysis;
      if (this.__recordDto) {
        this.__answerDto = this.__recordDto.qAnswerDto;
        this.__questionDto = this.__recordDto.questionDto;
      }
      this.__buildQuestionInfo();
      if (1 === this.__mode) {
        o._$replaceClassName(this.__body, 'examMode', 'analysisMode');
        this.__goToAnalysisMode();
      } else {
        o._$replaceClassName(this.__body, 'analysisMode', 'examMode');
        this.__goToExamMode();
      }
    };
    c.__destroy = function () {
      this.__supDestroy();
    };
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
