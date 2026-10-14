EDU(
  '69e1c387d1f075b36fd909b21836f8b2',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('nej.u'),
      s = NEJ.P('nej.ut'),
      r = NEJ.P('edu.u'),
      c;
    r._$$QuestionItem = NEJ.C();
    c = r._$$QuestionItem._$extend(s._$$Event, !0);
    c._$getItem = function () {
      return this.__itemUI;
    };
    c.__reset = function (e) {
      this.__supReset(e);
      this.__recordDto = e.recordDto;
      if (this.__recordDto) {
        this.__mode = e.mode;
        var t = {
          parent: e.parent,
          recordDto: this.__recordDto,
          mode: this.__mode,
          showAnalysis: e.showAnalysis,
          position: e.position,
          noScore: e.noScore,
          indexNum: e.indexNum,
          type: e.type,
          onSelect: function (e) {
            this._$dispatchEvent('onSelect', e);
          }._$bind(this),
        };
        var i = document.querySelector('#j-anchorContainer');
        if (i) {
          i.classList.remove('f-pop');
          i.classList.remove('f-pop-width');
        }
        switch (this.__recordDto.questionDto.type) {
          case r.CONST.TYPE_OBJECTIVE_SINGLE:
          case r.CONST.TYPE_OBJECTIVE_MULTI:
          case r.CONST.TYPE_OBJECTIVE_JUDGE:
            this.__itemUI = r._$$ChoiceQuestionUI._$allocate(t);
            break;
          case r.CONST.TYPE_SUBJECTIVE_NORMAL:
            this.__itemUI = r._$$AnalysisQuestionUI._$allocate(t);
            break;
          case r.CONST.TYPE_OBJECTIVE_FILLBLANK:
            this.__itemUI = r._$$FillBlankUI._$allocate(t);
            break;
          case 5:
        }
      }
    };
    c._$getAnswerDto = function () {
      return this.__itemUI._$getAnswerDto();
    };
    c.__destroy = function () {
      if (this.__itemUI)
        switch (this.__recordDto.questionDto.type) {
          case r.CONST.TYPE_OBJECTIVE_SINGLE:
          case r.CONST.TYPE_OBJECTIVE_MULTI:
          case r.CONST.TYPE_OBJECTIVE_JUDGE:
            this.__itemUI = r._$$ChoiceQuestionUI._$recycle(this.__itemUI);
            break;
          case r.CONST.TYPE_SUBJECTIVE_NORMAL:
            this.__itemUI = r._$$AnalysisQuestionUI._$recycle(this.__itemUI);
            break;
          case r.CONST.TYPE_OBJECTIVE_FILLBLANK:
            this.__itemUI = r._$$FillBlankUI._$recycle(this.__itemUI);
            break;
          case 5:
            this.__itemUI.destroy();
        }
      this.__supDestroy();
    };
  },
  'dc23abdd9ec77b6ec770cfabbd77283f',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '1085a79200eae1cc393e9fb1c5b9ac45',
  'f31031c2cc1deb44691c723fd75b2bd3',
  '0f188659b8c10dc2a8793ba1f7b9322d',
  '93828627ddb358ed890cb65967a0c1de',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
