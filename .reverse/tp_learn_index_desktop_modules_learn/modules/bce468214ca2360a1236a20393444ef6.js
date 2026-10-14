EDU(
  'bce468214ca2360a1236a20393444ef6',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    o._$$ExamObjectiveInfoItem = NEJ.C();
    r = o._$$ExamObjectiveInfoItem._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate('jst-examObjInfoItem', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__nameNode = n._$getByClassName(this.__body, 'j-name')[0];
      this.__statusNode = n._$getByClassName(this.__body, 'j-status')[0];
      this.__scoreNode = n._$getByClassName(this.__body, 'j-score')[0];
      this.__timeNode = n._$getByClassName(this.__body, 'j-time')[0];
      this.__examBtn = n._$getByClassName(this.__body, 'j-examBtn')[0];
      a._$addEvent(
        this.__examBtn,
        'click',
        function (t) {
          if (this.__umi) e.dispatcher._$redirect(this.__umi);
        }._$bind(this),
      );
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__examVo = e.examVo || {};
      this.__testVo = e.testVo || {};
      this.__nameNode.innerText = this.__testVo.name || '';
      this.__scoreNode.innerText =
        (this.__testVo.objTotalScore || 0) + window.moocConfig.lang.KEY_LEARN_SCORE_SCORE2;
      this.__timeNode.innerText =
        this.__testVo.testTime / 60 + ' ' + window.moocConfig.lang.KEY_LEARN_MINUTE;
      this.__statusNode.innerText = '';
      n._$delClassName(this.__statusNode, 'warn');
      this.__examBtn.innerText = window.moocConfig.lang.KEY_LEARN_ENTER_EXAM;
      this.__umi = null;
      n._$delClassName(this.__examBtn, 'u-btn-disabled');
      var t = 1 == window.shouldHiddenScore;
      if (
        this.__testVo.userSubmitStatus == o.CONST.HW_STATUS_SUBMITTED &&
        this.__testVo.userEffectStatus !== o.CONST.QUIZ_SUBMIT_VALID
      )
        if (
          o._$getCurServerTime() >= this.__examVo.scoreReleaseTime &&
          this.__examVo.scorePubStatus == o.CONST.SCORE_PUB_STATUS_CONFIRMED
        ) {
          if (t)
            this.__statusNode.innerHTML =
              window.moocConfig.lang.KEY_LEARN_EXAM_GRADE +
              '<span class="j-triggerLockScore"></span>';
          else
            this.__statusNode.innerText =
              window.moocConfig.lang.KEY_LEARN_EXAM_GRADE +
              ((this.__testVo.userScore + this.__examVo.bonusScore).toFixed(2) || 0) +
              window.moocConfig.lang.KEY_LEARN_SCORE_SCORE2;
          this.__examBtn.innerText = window.moocConfig.lang.KEY_LEARN_VIEW_RESOLUTION;
          this.__umi =
            o.umi('learnExamObjectScore') +
            '?eid=' +
            this.__testVo.examId +
            '&id=' +
            this.__testVo.id +
            '&examType=' +
            this.__examVo.type;
        } else {
          if (this.__testVo.userEffectStatus == o.CONST.QUIZ_SUBMIT_VALID)
            this.__statusNode.innerText = window.moocConfig.lang.KEY_LEARN_SUBMITTED_RESULTS;
          else this.__statusNode.innerText = window.moocConfig.lang.KEY_LEARN_THE_ANNOUCEMENT;
          n._$addClassName(this.__examBtn, 'u-btn-disabled');
        }
      else {
        if (this.__examVo.deadline && o._$getCurServerTime() >= this.__examVo.deadline) {
          this.__statusNode.innerText = window.moocConfig.lang.KEY_LEARN_TIME_IS_OUT;
          n._$addClassName(this.__statusNode, 'warn');
        }
        this.__umi =
          o.umi('learnExamObjective') +
          '?eid=' +
          this.__testVo.examId +
          '&id=' +
          this.__testVo.id +
          '&examType=' +
          this.__examVo.type;
      }
    };
    r.__destroy = function () {
      this.__supDestroy();
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '7ae1049f52447f73129209d74071c691',
  '93828627ddb358ed890cb65967a0c1de',
  'bf8d09e46d2369efd6e41b29fe211330',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
