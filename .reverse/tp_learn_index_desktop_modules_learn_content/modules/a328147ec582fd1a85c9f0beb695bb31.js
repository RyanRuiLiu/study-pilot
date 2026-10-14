EDU(
  'a328147ec582fd1a85c9f0beb695bb31',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('edu.d'),
      s = NEJ.P('edu.m'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.u'),
      d,
      l;
    r._$$Quiz_Question_Pool = NEJ.C();
    d = r._$$Quiz_Question_Pool._$extend(s._$$BasePool, !0);
    l = r._$$Quiz_Question_Pool._$supro;
    d.__initNode = function () {
      this.__showPager = !1;
      this.__supInitNode();
    };
    d._$showPool = function () {
      r._$showNode(this.__body);
    };
    d._$hidePool = function () {
      r._$hiddenNode(this.__body);
    };
    d.__changeQuestionMapData = function (e) {
      var t = null,
        n = e.objectiveQList;
      t = { totlePageCount: 1, currentPageNo: 1, list: n };
      this.__idsArr = [];
      c._$forEach(
        n,
        function (e) {
          this.__idsArr.push(e.id);
        }._$bind(this),
      );
      return t;
    };
    d.__itemGen = function (e) {
      var t = c._$indexOf(this.__idsArr, e.id);
      var n = r._$$QuestionItem
        ._$allocate({
          parent: this.__body,
          recordDto: this.__recordDtos['_' + e.id],
          mode: this.__mode,
          showAnalysis: this.__showAnalysis,
          position: t,
          noScore: this.__noScore,
          onSelect: function (e) {
            this._$dispatchEvent('onSelect', e);
          }._$bind(this),
        })
        ._$getItem();
      return n;
    };
    d.__itemDestroy = function (e) {
      if (e) e = r._$$QuestionItem._$recycle(e);
      return e;
    };
    d.__reset = function (e) {
      if (e.data) e.dataMaps = this.__changeQuestionMapData(e.data);
      this.__showAnalysis = e.data.showAnalysis;
      this.__mode = e.mode || 0;
      this.__recordDtos = e.recordDtos;
      this.__noScore = e.noScore || !1;
      this.__supReset(e);
    };
    d._$getAnswerDtos = function () {
      var e = [];
      for (var t in this.__uiPools)
        if (this.__uiPools.hasOwnProperty(t)) {
          var n = this.__uiPools[t];
          if (n) e.push(n._$getAnswerDto());
        }
      return e;
    };
  },
  'fb689a88a2915cc7060dce11733a426e',
  '69e1c387d1f075b36fd909b21836f8b2',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fe86216ed59e3103a56c42c850d389f0',
);
