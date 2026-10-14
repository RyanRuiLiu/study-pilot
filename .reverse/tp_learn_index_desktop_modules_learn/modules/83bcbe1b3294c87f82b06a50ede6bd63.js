EDU(
  '83bcbe1b3294c87f82b06a50ede6bd63',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    o._$$ExamSubjectiveInfoItem = NEJ.C();
    r = o._$$ExamSubjectiveInfoItem._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate('jst-examSbjInfoItem', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__nameNode = n._$getByClassName(this.__body, 'j-name')[0];
      this.__statusNode = n._$getByClassName(this.__body, 'j-status')[0];
      this.__scoreNode = n._$getByClassName(this.__body, 'j-score')[0];
      this.__timeNode = n._$getByClassName(this.__body, 'j-time')[0];
      this.__judgeTypeNode = n._$getByClassName(this.__body, 'j-judgeType')[0];
      this.__evalStartTimeNode = n._$getByClassName(this.__body, 'j-evalStart')[0];
      this.__evalEndTimeNode = n._$getByClassName(this.__body, 'j-evalEnd')[0];
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
        (this.__testVo.sbjTotalScore || 0) + window.moocConfig.lang.KEY_LEARN_SCORE_SCORE2;
      this.__timeNode.innerText =
        this.__testVo.testTime >= 0
          ? this.__testVo.testTime / 60 + window.moocConfig.lang.KEY_LEARN_MINUTE
          : window.moocConfig.lang.KEY_LEARN_UNLIMITED;
      if (this.__testVo.type == o.CONST.TYPE_SUBJECTIVE_OJ) {
        this.__judgeTypeNode.innerText = 'Online Judge批改';
        this.__umi =
          o.umi('learnExamOJ') +
          '?eid=' +
          this.__testVo.examId +
          '&id=' +
          this.__testVo.id +
          '&examType=' +
          this.__examVo.type;
      } else {
        this.__judgeTypeNode.innerText = o._$getEvJudgeStr(this.__testVo.evaluateJudgeType);
        this.__evalStartTimeNode.innerText =
          window.moocConfig.lang.KEY_LEARN_STARTS +
          o._$formatCommonTime(this.__testVo.evaluateStart);
        this.__evalEndTimeNode.innerText =
          window.moocConfig.lang.KEY_LEARN_DEADLINE1 +
          o._$formatCommonTime(this.__testVo.evaluateEnd);
        if (o.CONST.JUDGE_TYPE_EVALUATE == this.__testVo.evaluateJudgeType)
          n._$addClassName(this.__judgeTypeNode.parentNode.parentNode, 'titem1');
        else n._$delClassName(this.__judgeTypeNode.parentNode.parentNode, 'titem1');
        this.__umi =
          o.umi('learnExamSubjective') + '?eid=' + this.__testVo.examId + '&id=' + this.__testVo.id;
      }
      var t = o._$currentEvaluatePhase(this.__testVo);
      var i = '',
        a = o._$getCurServerTime();
      n._$delClassName(this.__statusNode, 'warn');
      this.__examBtn.innerText = window.moocConfig.lang.KEY_LEARN_ENTER_EXAM;
      n._$delClassName(this.__examBtn, 'u-btn-disabled');
      var s = 1 == window.shouldHiddenScore;
      if (this.__testVo.userSubmitStatus == o.CONST.HW_STATUS_SUBMITTED)
        if (
          a >= this.__examVo.scoreReleaseTime &&
          this.__examVo.scorePubStatus == o.CONST.SCORE_PUB_STATUS_CONFIRMED
        )
          if (s)
            i =
              window.moocConfig.lang.KEY_LEARN_EXAM_GRADE +
              '<span class="j-triggerLockScore"></span>';
          else
            i =
              window.moocConfig.lang.KEY_LEARN_EXAM_GRADE +
              (this.__testVo.userScore || 0).toFixed(2) +
              window.moocConfig.lang.KEY_LEARN_SCORE_SCORE2;
        else {
          if (this.__testVo.evaluateJudgeType == o.CONST.JUDGE_TYPE_LECTOR)
            i = window.moocConfig.lang.KEY_LEARN_THE_ANNOUCEMENT;
          else if (this.__testVo.evaluateJudgeType == o.CONST.JUDGE_TYPE_EVALUATE)
            if (a < this.__testVo.evaluateStart)
              i = window.moocConfig.lang.KEY_LEARN_ANSWER_SUBMITTER;
            else if (this.__testVo.evaluateStart <= a && a <= this.__testVo.evaluateEnd)
              i = window.moocConfig.lang.KEY_LEARN_PEER_EVALUATION_START;
            else if (this.__testVo.evaluateEnd <= a && a <= this.__testVo.evaluateScoreReleaseTime)
              i = window.moocConfig.lang.KEY_LEARN_PEER_EVALUATION_OVER;
          if (this.__testVo.type == o.CONST.TYPE_SUBJECTIVE_OJ) {
            this.__umi = null;
            n._$addClassName(this.__examBtn, 'u-btn-disabled');
          }
        }
      else if (this.__examVo.deadline && a >= this.__examVo.deadline) {
        i = window.moocConfig.lang.KEY_LEARN_SUBMISSION_EXAM;
        n._$addClassName(this.__statusNode, 'warn');
        if (
          a >= this.__examVo.scoreReleaseTime &&
          this.__examVo.scorePubStatus == o.CONST.SCORE_PUB_STATUS_CONFIRMED
        )
          if (this.__testVo.type != o.CONST.TYPE_SUBJECTIVE_OJ) {
            this.__umi =
              o.umi('learnExamSubjective') +
              '?eid=' +
              this.__testVo.examId +
              '&id=' +
              this.__testVo.id +
              '&examType=' +
              this.__examVo.type;
            n._$delClassName(this.__examBtn, 'u-btn-disabled');
          } else if (this.__testVo.type == o.CONST.TYPE_SUBJECTIVE_OJ) {
            this.__umi =
              o.umi('learnExamOJ') + '?eid=' + this.__testVo.examId + '&id=' + this.__testVo.id;
            n._$delClassName(this.__examBtn, 'u-btn-disabled');
          } else {
            this.__umi = null;
            n._$addClassName(this.__examBtn, 'u-btn-disabled');
          }
        else {
          this.__umi = null;
          n._$addClassName(this.__examBtn, 'u-btn-disabled');
        }
      }
      this.__statusNode.innerHTML = i;
    };
    r.__destroy = function () {
      this.__supDestroy();
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '7ae1049f52447f73129209d74071c691',
  '93828627ddb358ed890cb65967a0c1de',
  'bf8d09e46d2369efd6e41b29fe211330',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
