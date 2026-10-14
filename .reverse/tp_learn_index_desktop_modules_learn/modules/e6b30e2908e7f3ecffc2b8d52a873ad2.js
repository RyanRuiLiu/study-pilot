EDU(
  'e6b30e2908e7f3ecffc2b8d52a873ad2',
  function (e) {
    var t = window,
      i = NEJ.O,
      n = NEJ.F,
      a = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      s = NEJ.P('edu.u'),
      r = NEJ.P('nej.u'),
      c = NEJ.P('edu.d'),
      d;
    var _ = a._$addHtmlTemplate(
      '<div class="m-beforeTest">            <div class="j-baseInfo baseInfo f-f0"></div>            <div class="j-detailInfo">            </div>            <div class="agreeBox f-cb">                <input type="checkbox" id="agreeCheck" class="f-fl j-agree">                <label for="agreeCheck" class="j-agreeCt"></label>            </div>            <a class="u-btn u-btn-primary u-btn-disabled j-startBtn">{if lang.KEY_LEARN_START_QUIZ}${lang.KEY_LEARN_START_QUIZ}{else}开始测验{/if}</a>        </div>',
    );
    s._$$BeforeTestUI = NEJ.C();
    d = s._$$BeforeTestUI._$extend(s._$$UIBase, !0);
    d.__initXGui = function () {
      this.__seed_html = a._$addNodeTemplate(
        a._$getHtmlTemplate(_, { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__baseInfo = a._$getByClassName(this.__body, 'j-baseInfo')[0];
      this.__detailInfo = a._$getByClassName(this.__body, 'j-detailInfo')[0];
      this.__startBtn = a._$getByClassName(this.__body, 'j-startBtn')[0];
      this.__agreeInput = a._$getByClassName(this.__body, 'j-agree')[0];
      this.__cxTxtNode = a._$getByClassName(this.__body, 'j-agreeCt')[0];
      o._$addEvent(this.__startBtn, 'click', this.__startTestHandle._$bind(this));
      o._$addEvent(this.__agreeInput, 'click', this.__checkProtocolHandle._$bind(this));
      this.__quizCache = new c._$$COM_Cache_QuizCache();
      this.__quizCache._$addEvent(
        'onGetMocMemberTutorialInfo',
        this.__cbGetHonestData._$bind(this),
      );
      this.__courseCache = new c._$$COM_Cache_CourseCache();
      this.__courseCache._$addEvent('onGetAggreement', this.__cbGetAggreement._$bind(this));
    };
    d.__cbGetAggreement = function (e) {
      this.__cxTxtNode.innerHTML = e;
    };
    d.__cbGetHonestData = function (e) {
      this.__agreeInput.checked = !!e[s.CONST.MOOC_TEST_PROTOCAL];
      this.__checkProtocolHandle();
    };
    d.__checkProtocolHandle = function () {
      s._$trackEvent(
        'quizHonest',
        'click',
        window.moocConfig.lang.KEY_LEARN_CLICK_AGREEMENT + !this.__agreeInput.checked,
      );
      s._$toggleClassName(!this.__agreeInput.checked, this.__startBtn, 'u-btn-disabled');
    };
    d.__startTestHandle = function () {
      if (!a._$hasClassName(this.__startBtn, 'u-btn-disabled'))
        if (this.__detailVo && 1236463554 == this.__detailVo.tid)
          new e({}).$inject(document.body).$on(
            'onSettingModalSave',
            function () {
              this._$dispatchEvent('onDoingAble');
              this.__quizCache._$setTutorialinfo(s.CONST.MOOC_TEST_PROTOCAL, 1);
              s._$trackEvent('quizBegin', 'click', window.moocConfig.lang.KEY_LEARN_CLICK_QUIZ);
            }._$bind(this),
          );
        else {
          this._$dispatchEvent('onDoingAble');
          this.__quizCache._$setTutorialinfo(s.CONST.MOOC_TEST_PROTOCAL, 1);
          s._$trackEvent('quizBegin', 'click', window.moocConfig.lang.KEY_LEARN_CLICK_QUIZ);
        }
    };
    d.__buildBaseInfo = function () {
      var e = '';
      e =
        '<p>1. ' +
        window.moocConfig.lang.KEY_LEARN_NUMBER_ATTEMPTS +
        '<span><em>' +
        this.__detailVo.totalTryCount +
        '</em> ' +
        window.moocConfig.lang.KEY_LEARN_TIMES1 +
        s._$getQuizValidScoreStr(this.__detailVo.effectScoreRule) +
        window.moocConfig.lang.KEY_LEARN_AS_GRADE +
        '</span></p>';
      if (this.__detailVo.duration > 0)
        e +=
          '<p>2. ' +
          window.moocConfig.lang.KEY_LEARN_QUIZ_LIMIT +
          '<span><em>' +
          this.__detailVo.duration / 60 +
          '</em> ' +
          window.moocConfig.lang.KEY_LEARN_MINUTE +
          '</span></p>';
      this.__baseInfo.innerHTML = e;
      this.__detailInfo.innerHTML = r._$escape(this.__detailVo.description);
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__detailVo = e.data;
      this.__buildBaseInfo();
      this.__agreeInput.checked = !1;
      this.__courseCache._$getAggreement(2);
      this.__quizCache._$getTutorialinfo();
    };
    d.__destroy = function () {
      this.__supDestroy();
    };
  },
  'bfe4d937668ceb5bf60071e20308537b',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '2c666a1ceb412082b906b11b0948dedf',
  'adec563fba581ac0f5bf79fb5e990240',
  '93828627ddb358ed890cb65967a0c1de',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
