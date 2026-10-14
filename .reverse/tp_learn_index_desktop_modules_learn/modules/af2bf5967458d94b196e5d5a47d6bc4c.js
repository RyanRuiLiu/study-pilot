EDU(
  'af2bf5967458d94b196e5d5a47d6bc4c',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    o._$$HwInfoItem = NEJ.C();
    r = o._$$HwInfoItem._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate('jst-hwInfoItem', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__phaseNodes = n._$getByClassName(this.__body, 'j-phase');
      this.__submitTimeNode = n._$getByClassName(this.__body, 'j-submitTime')[0];
      this.__judgeTypeNode = n._$getByClassName(this.__body, 'j-judgeType')[0];
      this.__judgeTipNode = n._$getByClassName(this.__body, 'j-judgetip')[0];
      this.__evalStartTimeNode = n._$getByClassName(this.__body, 'j-evalStart')[0];
      this.__evalEndTimeNode = n._$getByClassName(this.__body, 'j-evalEnd')[0];
      this.__publishTimeNode = n._$getByClassName(this.__body, 'j-publishTime')[0];
      this.__descriptionNode = n._$getByClassName(this.__body, 'j-description')[0];
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__hwInfoVo = e.hwInfoVo || {};
      this.__submitTimeNode.innerText =
        window.moocConfig.lang.KEY_LEARN_DEADLINE1 + o._$formatCommonTime(this.__hwInfoVo.deadline);
      this.__publishTimeNode.innerText =
        window.moocConfig.lang.KEY_LEARN_PUBLISH_TIME +
        o._$formatCommonTime(this.__hwInfoVo.evaluateScoreReleaseTime);
      this.__judgeTypeNode.innerText = o._$getEvJudgeStr(this.__hwInfoVo.evaluateJudgeType);
      this.__descriptionNode.innerText = this.__hwInfoVo.description;
      if (o.CONST.JUDGE_TYPE_EVALUATE == this.__hwInfoVo.evaluateJudgeType) {
        o._$showNode(this.__evalStartTimeNode);
        o._$showNode(this.__evalEndTimeNode);
        o._$showNode(this.__judgeTipNode);
        this.__evalStartTimeNode.innerText =
          window.moocConfig.lang.KEY_LEARN_STARTS +
          o._$formatCommonTime(this.__hwInfoVo.evaluateStart);
        this.__evalEndTimeNode.innerText =
          window.moocConfig.lang.KEY_LEARN_DEADLINE1 +
          o._$formatCommonTime(this.__hwInfoVo.evaluateEnd);
      } else {
        o._$hiddenNode(this.__judgeTipNode);
        o._$hiddenNode(this.__evalStartTimeNode);
        o._$hiddenNode(this.__evalEndTimeNode);
      }
      this.__handleCurrentPhase();
    };
    r.__handleCurrentPhase = function () {
      s._$forEach(this.__phaseNodes, function (e, t) {
        n._$delClassName(e, 'current');
      });
      var e = o._$currentEvaluatePhase(this.__hwInfoVo);
      switch (e) {
        case o.CONST.HW_PHASE_SUBMIT:
          n._$addClassName(this.__phaseNodes[0], 'current');
          break;
        case o.CONST.HW_PHASE_EVALUATION:
          n._$addClassName(this.__phaseNodes[1], 'current');
          break;
        case o.CONST.HW_PHASE_SCORE:
          n._$addClassName(this.__phaseNodes[2], 'current');
      }
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '7ae1049f52447f73129209d74071c691',
  '93828627ddb358ed890cb65967a0c1de',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
