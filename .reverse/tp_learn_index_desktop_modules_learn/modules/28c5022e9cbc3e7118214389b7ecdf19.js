EDU(
  '28c5022e9cbc3e7118214389b7ecdf19',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    var c = n._$pushCSSText(
      '        .#<uispace> {margin-bottom:20px;}        .#<uispace> .ansul{margin-top:10px;border:1px solid #DDD;border-bottom:none;overflow:hidden;border-radius:8px;}        .#<uispace> .ansul li{border-bottom:1px solid #DDD;height:48px;}        .#<uispace> .ansul li.hd{background-color:#F8F8F8;color:#333333;font-weight:600;font-size:14px}        .#<uispace> .ansul li.max{background-color:#FEFFD1; color:#FF9200; }        .#<uispace> .ansul li .col{height:100%;line-height:48px;margin-left:16px;}        .#<uispace> .ansul li .col1{width:14%;}        .#<uispace> .ansul li .col2{width:45%;}        .#<uispace> .ansul li .col3{width:14%;}        .#<uispace> .ansul li .col4{width:14%;border-right:none;}        ',
    );
    var d = n._$addHtmlTemplate(
      '<div>       \t  <div>${lang.KEY_LEARN_VAILD_SCORES}</div>       \t <ul class="ansul j-ansul"></ul>       </div>',
    );
    o._$$UserQuizDoneList = NEJ.C();
    r = o._$$UserQuizDoneList._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate(d, { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = c;
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__ansulNode = n._$getByClassName(this.__body, 'j-ansul')[0];
    };
    r.__initScoreLock = function () {
      this.__validLockScoreContainer = n._$getByClassName(
        this.__body,
        'j-validLockScore-container',
      )[0];
      String.prototype.replace = window.moocTempReplace
        ? window.moocTempReplace
        : String.prototype.replace;
      String.prototype.match = window.moocTempMatch ? window.moocTempMatch : String.prototype.match;
      if (window.renderReactComponent && window.renderReactComponent['LearnScoreLockBtn']) {
        window.renderReactComponent.ReactDOM.unmountComponentAtNode(this.__validLockScoreContainer);
        var e = window.renderReactComponent['LearnScoreLockBtn'];
        window.renderReactComponent.render(
          e.component,
          e.initialState,
          this.__validLockScoreContainer,
        );
      } else
        window.reactComponentLoadBootstrap.init(
          { name: 'LearnScoreLockBtn', container: this.__validLockScoreContainer },
          { termId: window.termDto && window.termDto.termId, showFreeLearnBtn: !1 },
        );
    };
    r.__reset = function (e) {
      this.__supReset(e);
      var t =
          '<li class="f-cb hd"><div class="f-fl col col1">' +
          window.moocConfig.lang.KEY_LEARN_TIMES_TIMES +
          '</div><div class="f-fl col col2">' +
          window.moocConfig.lang.KEY_LEARN_TEST_TIME +
          '</div><div class="f-fl col col3">' +
          window.moocConfig.lang.KEY_LEARN_SCORE +
          '</div><div class="f-fl col col4">' +
          window.moocConfig.lang.KEY_LEARN_OPERATING +
          '</div></li>',
        i = -1,
        n = 0,
        a = (e.ansformInfoList && e.ansformInfoList.length && e.ansformInfoList.length - 1) || 0,
        r = '（' + window.moocConfig.lang.KEY_LEARN_FINALLY + '）',
        c = -1,
        d =
          e.quizInfo && 'undefined' != typeof e.quizInfo.effectScoreRule
            ? e.quizInfo.effectScoreRule
            : o.CONST.QUIZ_SCORE_TYPE_AVG;
      switch (d) {
        case o.CONST.QUIZ_SCORE_TYPE_LAST:
          c = a;
          break;
        case o.CONST.QUIZ_SCORE_TYPE_BEST:
          s._$forEach(e.ansformInfoList, function (e, t) {
            if (e.score > n) {
              n = e.score;
              i = t;
            }
          });
          c = i;
          break;
        default:
          c = -1;
      }
      s._$forEach(
        e.ansformInfoList,
        function (e, i) {
          t +=
            '<li class="f-cb' +
            (c == i ? ' max' : '') +
            '"><div class="f-fl col col1">' +
            (i + 1) +
            '</div><div class="f-fl col col2">' +
            o._$formatCommonTime(e.submitTime) +
            '</div><div class="f-fl col col3">' +
            (1 == window.shouldHiddenScore
              ? '<span class="j-triggerLockScore"></span>'
              : (e.score || 0).toFixed(2)) +
            (0 == window.shouldHiddenScore && c == i ? r : '') +
            '</div><div class="f-fl col col4"><a target="_blank" href="#' +
            o.umi('learnQuizScore') +
            '?id=' +
            e.tid +
            '&aid=' +
            e.aid +
            '">' +
            window.moocConfig.lang.KEY_LEARN_VIEW +
            '</a></div></li>';
        }._$bind(this),
      );
      this.__ansulNode.innerHTML = t;
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '7ae1049f52447f73129209d74071c691',
  'bf8d09e46d2369efd6e41b29fe211330',
  '93828627ddb358ed890cb65967a0c1de',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  'fe86216ed59e3103a56c42c850d389f0',
);
