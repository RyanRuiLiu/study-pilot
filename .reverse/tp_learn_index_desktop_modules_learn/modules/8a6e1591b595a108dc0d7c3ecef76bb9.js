EDU(
  '8a6e1591b595a108dc0d7c3ecef76bb9',
  function (e) {
    var t = (window.moocConfig || {}).lang || {};
    var i = window,
      n = NEJ.O,
      a = NEJ.F,
      o = NEJ.P('nej.e'),
      s = NEJ.P('nej.v'),
      r = NEJ.P('edu.u'),
      c = NEJ.P('nej.u'),
      d = NEJ.P('edu.d'),
      _,
      l = { object: 4, subject: 5, oj: 7 };
    var h = o._$addHtmlTemplate(
      '<div class="m-beforeTest">            <div class="j-baseInfo baseInfo f-f0"></div>            <div class="details">                <p class="important f-f0">${lang.KEY_LEARN_WE_QUESTIONS}</p>                <p>${lang.KEY_LEARN_ON_COMPUTER}<span style="color: #ff3f04">${lang.KEY_LEARN_ON_CHROME}</span>${lang.KEY_LEARN_PUNCTUATION}</p>                <p>${lang.KEY_LEARN_IN_OFF}</p>                <p>${lang.KEY_LEARN_EXAM_CONFIRM}</p>                <p>${lang.KEY_LEARN_REFRESH_EXIT}</p>                <p>${lang.KEY_LEARN_EXAM_NOTIFICATION}</p>                <p style="color: #ff3f04">${lang.KEY_LEARN_ACCORDING_START}</p>                <p style="color: #ff3f04">${lang.KEY_LEARN_NOT_OVER_LINIT}</p>            </div>            <div class="agreeBox f-cb">                <input type="checkbox" id="agreeCheck" class="j-agree f-fl">                <label for="agreeCheck" class="j-agreeCt"></label>            </div>            <a class="u-btn u-btn-primary u-btn-disabled j-startBtn">${lang.KEY_LEARN_START_EXAM}</a>        </div>',
    );
    r._$$ExamProtocolUI = NEJ.C();
    _ = r._$$ExamProtocolUI._$extend(r._$$UIBase, !0);
    _.__initXGui = function () {
      this.__seed_html = o._$addNodeTemplate(
        o._$getHtmlTemplate(h, { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    _.__initNode = function () {
      this.__supInitNode();
      this.__baseInfo = o._$getByClassName(this.__body, 'j-baseInfo')[0];
      this.__startBtn = o._$getByClassName(this.__body, 'j-startBtn')[0];
      this.__agreeInput = o._$getByClassName(this.__body, 'j-agree')[0];
      this.__cxTxtNode = o._$getByClassName(this.__body, 'j-agreeCt')[0];
      s._$addEvent(this.__startBtn, 'click', this.__startTestHandleModal._$bind(this));
      s._$addEvent(this.__agreeInput, 'click', this.__checkProtocolHandle._$bind(this));
      this.__tutorialCache = new d._$$COM_Cache_QuizCache();
      this.__tutorialCache._$addEvent(
        'onGetMocMemberTutorialInfo',
        this.__cbGetHonestData._$bind(this),
      );
      this.__courseCache = new d._$$COM_Cache_CourseCache();
      this.__courseCache._$addEvent('onGetAggreement', this.__cbGetAggreement._$bind(this));
    };
    _.__cbGetAggreement = function (e) {
      this.__cxTxtNode.innerHTML = e;
    };
    _.__cbGetHonestData = function (e) {
      this.__agreeInput.checked = !!e[this.__tutorialValue];
      this.__checkProtocolHandle();
    };
    _.__checkProtocolHandle = function () {
      switch (this.__type) {
        case 'object':
          r._$trackEvent(
            'examObjectHonest',
            'click',
            t.KEY_EAXM_AGREEMENT_KGT + !this.__agreeInput.checked,
          );
          break;
        case 'subject':
          r._$trackEvent(
            'examSubjectHonest',
            'click',
            t.KEY_EAXM_AGREEMENT_ZGT + !this.__agreeInput.checked,
          );
          break;
        case 'oj':
          r._$trackEvent(
            'examOjHonest',
            'click',
            t.KEY_EAXM_AGREEMENT_OJ + !this.__agreeInput.checked,
          );
      }
      r._$toggleClassName(!this.__agreeInput.checked, this.__startBtn, 'u-btn-disabled');
    };
    _.__startTestHandleModal = function () {
      console.log('option __isPreventCheating', this.__isPreventCheating);
      if (!o._$hasClassName(this.__startBtn, 'u-btn-disabled'))
        if (this.__isPreventCheating)
          e.alert(
            t.KEY_EAXM_TIP_SWITCH_FD +
              (this.__allowSwitchPageCount || 0) +
              t.KEY_EAXM_TIP_AUTO_SUBMIT,
            t.KEY_EAXM_NOTICE,
          ).$on('ok', this.__startTestHandle._$bind(this));
        else this.__startTestHandle();
    };
    _.__startTestHandle = function () {
      if (!o._$hasClassName(this.__startBtn, 'u-btn-disabled')) {
        if (!i.isPreview && this.__isPreventCheating) {
          var e = [
            'requestFullscreen',
            'mozRequestFullScreen',
            'msRequestFullscreen',
            'webkitRequestFullscreen',
          ];
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            if (document.body && document.body[n]) {
              document.body[n]();
              break;
            }
          }
        }
        this._$dispatchEvent('onDoingAble');
        this.__tutorialCache._$setTutorialinfo(this.__tutorialValue, 1);
        switch (this.__type) {
          case 'object':
            var a = 'examObjectBegin';
            break;
          case 'subject':
            var a = 'examSubjectBegin';
            break;
          case 'oj':
            var a = 'examOJBegin';
        }
        r._$trackEvent(a, 'click', window.moocConfig.lang.KEY_LEARN_CLICK_EXAM);
      }
    };
    _.__buildBaseInfo = function () {
      var e =
        '<p>' +
        t.KEY_LEARN_THERE_EXAM +
        ' <span><em>' +
        (this.__detailVo.questionCount || 0) +
        '</em></span> ' +
        t.KEY_LEARN_QUESTIONS_SCORE +
        ' <span><em>' +
        (this.__detailVo.totalScore || 0) +
        '</em> </span></p>';
      if (this.__detailVo.duration > 0)
        e +=
          t.KEY_LEARN_TOTAL_DURATION +
          '<span> <em>' +
          this.__detailVo.duration / 60 +
          '</em>' +
          t.KEY_LEARN_MINUTE +
          '</span>';
      this.__baseInfo.innerHTML = e;
    };
    _.__reset = function (e) {
      this.__supReset(e);
      console.log('options', e);
      this.__detailVo = e.data || {};
      this.__type = e.type;
      this.__allowSwitchPageCount = this.__detailVo.allowSwitchPageCount;
      this.__isPreventCheating = !i.isPreview && this.__detailVo.allowSwitchPageCount > 0 ? !0 : !1;
      switch (this.__type) {
        case 'object':
          this.__tutorialValue = r.CONST.MOOC_EXAM_OBJECT_PROTOCAL;
          break;
        case 'subject':
          this.__tutorialValue = r.CONST.MOOC_EXAM_SUBJECT_PROTOCAL;
          break;
        case 'oj':
          this.__tutorialValue = r.CONST.OJ_EXAM_PROTOCAL;
      }
      this.__buildBaseInfo();
      this.__agreeInput.checked = !1;
      this.__courseCache._$getAggreement(l[this.__type]);
      this.__tutorialCache._$getTutorialinfo();
    };
    _.__destroy = function () {
      this.__supDestroy();
    };
  },
  'd414623f7407e577cd6c05efff08e96f',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '2c666a1ceb412082b906b11b0948dedf',
  'adec563fba581ac0f5bf79fb5e990240',
  '93828627ddb358ed890cb65967a0c1de',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
