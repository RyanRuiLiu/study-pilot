EDU(
  'cdf25b5b7ebe60e2b3e1f74f71d61de8',
  function () {
    var e = NEJ.O,
      t = window,
      i = NEJ.P('nej.e'),
      n = NEJ.P('nej.v'),
      a = NEJ.P('edu.d'),
      o = NEJ.P('edu.m'),
      s = NEJ.P('edu.u'),
      r;
    var c = i._$pushCSSText(
      '        .#<uispace> div{text-align:left;}        .#<uispace>.m-AccountUI .inputtxt{padding: 5px;font-size: 12px;background: #fafafa;border: none;overflow-y: auto;overflow-x: hidden;resize: none;}        .#<uispace>.m-AccountUI .area{border: 1px solid #ddd;}        .#<uispace> .infobox{float:left;}        .#<uispace> .label{top: 7px;left: 8px;position: absolute;color:#999;}        .#<uispace> .yuan{height:35px;line-height:35px;padding-left:10px;}        .#<uispace>.m-AccountUI .tit{height:35px;line-height:35px;}       ',
    );
    var d = i._$addNodeTemplate(
      '<div class="m-AccountUI u-insug f-cb">    \t   <div class="f-cb">    \t   \t\t<label for="forPrice" class="f-fl tit">学期报名价格：</label>\t       \t\t<div class="area j-inputArea f-fl f-pr">\t\t\t\t\t<input type="text" class="j-input inputtxt"/>\t\t\t\t\t<label class="j-label label"></label>\t\t\t   \t</div>\t       \t\t<div class="yuan f-fl j-yuan">元</div>\t       </div>\t       <p class="tipinfo f-fc9">请输入阿拉伯数字，最低0.01，最高99999.99。最多保留小数点后两位。</p>\t       <div class="j-infobox">\t       </div>\t\t</div>',
    );
    s._$$AccountUI = NEJ.C();
    r = s._$$AccountUI._$extend(s._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = d;
      this.__seed_css = c;
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__inputNode = i._$getByClassName(this.__body, 'j-inputArea')[0];
      this.__infobox = i._$getByClassName(this.__body, 'j-infobox')[0];
      this.__inputtxt = i._$getByClassName(this.__body, 'j-input')[0];
      this.__yuantxt = i._$getByClassName(this.__body, 'j-yuan')[0];
    };
    r.__onAccountValid = function (e) {
      if ('hidden' == e) {
        this.__feedbackUI._$hideFeedback();
        this.__isValid = !0;
      } else if ('valid' == e) {
        if (void 0 === this.__orginPrice);
        else;
        this.__isValid = !0;
      } else {
        this.__isValid = !1;
        var t = '';
        if (2 == e) t = window.moocConfig.lang.KEY_LEARN_INVALID;
        else if ('empty' == e) t = window.moocConfig.lang.KEY_LEARN_PRICE_EMPTY;
        else if ('long' == e) t = window.moocConfig.lang.KEY_LEARN_DECIMAL_POINT;
        else if ('fushu' == e) t = window.moocConfig.lang.KEY_LEARN_PRICE_NEGATIVE;
        else if ('zero' == e) t = window.moocConfig.lang.KEY_LEARN_PRICE_CANNOT + '0';
        else if ('large' == e) t = window.moocConfig.lang.KEY_LEARN_OVERPRICED;
        else if ('quanjiao' == e) t = window.moocConfig.lang.KEY_LEARN_SWITCH_FULLWIDTH;
        else if ('big' == e) t = window.moocConfig.lang.KEY_LEARN_PRICE_GREATER + '99999.99';
        this.__feedbackUI._$showWarnTips(t);
      }
      if (this.__blurFunc) {
        this.__blurFunc();
        this.__blurFunc = null;
      }
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__orginPrice = e.priceValue;
      if (void 0 !== this.__orginPrice) this.__orginPrice = Number(this.__orginPrice);
      this.__inputUI = s._$$BaseInputUI._$allocate({
        inputArea: this.__inputNode,
        labelText: window.moocConfig.lang.KEY_LEARN_ENTER_NUMBER,
        type: 'input',
      });
      this.__noOp = !0;
      this.__isValid = !1;
      this.__inputUI._$addEvent('onInputFocus', this.__onInputFocus._$bind(this));
      this.__inputUI._$addEvent('onInputBlur', this.__onInputBlur._$bind(this));
      this.__inputUI._$addEvent('onInputChange', this.__onInputChange._$bind(this));
      this.__feedbackUI = s._$$FeedBackUI._$allocate({ parent: this.__infobox });
      this.__onAccountValid('hidden');
      if (e.inputWidth) {
        this.__inputNode.style.width = e.inputWidth + 'px';
        this.__inputtxt.style.width = e.inputWidth - 10 + 'px';
      }
      if (e.inputHeight) {
        this.__inputNode.style.height = e.inputHeight + 'px';
        this.__inputtxt.style.height = e.inputHeight - 10 + 'px';
      }
    };
    r.__onInputFocus = function () {
      this.__onAccountValid('hidden');
      this.__isFocus = !0;
    };
    r.__onInputChange = function () {
      this.__noOp = !1;
      if (this.__inputUI._$isMatchExp(/[^\x00-\xff]/)) {
        this.__onAccountValid('quanjiao');
        this.__inputUI._$setInitContent('');
      } else if (this.__inputUI._$isMatchExp(/^\d{0,}\.{0,1}(\d{1,2})?$/)) {
        this.__value = this.__inputUI._$getContent();
        if (this.__value > 99999.99) {
          this.__value = '99999.99';
          this.__onAccountValid('big');
          this.__inputUI._$setInitContent('99999.99');
        } else this.__inputUI._$setInitContent(this.__value);
      } else if (this.__inputUI._$isMatchExp(/^\d{0,}\.{0,1}(\d{3,})?$/))
        if (this.__value > 99999.99) {
          this.__onAccountValid('big');
          this.__inputUI._$setInitContent('99999.99');
        } else this.__inputUI._$setInitContent(this.__value);
      else if (!this.__inputUI._$isMatchExp(/^\d{0,}\.{0,1}(\d{0,})?$/)) this.__onAccountValid(2);
      else this.__value = this.__inputUI._$getContent();
    };
    r.__onInputBlur = function (e) {
      this.__noOp = !1;
      var t = this.__inputUI._$getContent();
      if ('' == t) this.__onAccountValid('empty');
      else if (this.__inputUI._$isMatchExp(/^\d{0,}\.{0,1}(\d{0,})?$/))
        if (!this.__inputUI._$isMatchExp(/[1-9]+/)) {
          this.__onAccountValid('zero');
          this.__inputUI._$setInitContent('');
        } else {
          var i = this.__value;
          if (void 0 === this.__orginPrice) {
            var n = i.split('.')[0];
            var a = i.split('.')[1];
            if ('undefined' == typeof a) a = '00';
            else if (a.length <= 1) a += '0';
            var o = n + '.' + a;
            this.__inputUI._$setInitContent(o);
            this.__onAccountValid('valid');
          } else if (0 === this.__orginPrice) this.__onAccountValid('nooriginprice');
          else this.__onAccountValid('valid');
        }
      else if (this.__inputUI._$isMatchExp(/[^\x00-\xff]/)) this.__onAccountValid('quanjiao');
      else this.__onAccountValid(2);
      this.__isFocus = !1;
    };
    r.__addBlurCallback = function (e) {
      this.__blurFunc = e;
    };
    r.__destroy = function () {
      if (this.__inputUI) this.__inputUI = s._$$BaseInputUI._$recycle(this.__inputUI);
      if (this.__feedbackUI) this.__feedbackUI = s._$$FeedBackUI._$recycle(this.__feedbackUI);
      this.__supDestroy();
    };
    r._$isFocused = function () {
      return this.__isFocus;
    };
    r._$isValid = function () {
      return this.__isValid;
    };
    r._$getContent = function () {
      return this.__inputUI._$getContent();
    };
    r._$setContent = function (e) {
      this.__inputUI._$setInitContent(e);
      this.__value = e;
    };
    r._$disableInput = function () {
      this.__inputUI._$setInitContent(' ');
      this.__inputtxt.setAttribute('disabled', 'disabled');
      i._$addClassName(this.__yuantxt, 's-fc2');
    };
    r._$enableInput = function () {
      this.__inputtxt.removeAttribute('disabled');
      i._$delClassName(this.__yuantxt, 's-fc2');
    };
    r._$getInputUI = function () {
      return this.__inputUI;
    };
    r._$hideFeedback = function () {
      this.__feedbackUI._$hideFeedback();
    };
    r._$showFeedback = function (e) {
      if (e) this.__feedbackUI._$showWarnTips(window.moocConfig.lang.KEY_LEARN_ENTER_PRICE);
      else if (this.__noOp)
        this.__feedbackUI._$showWarnTips(window.moocConfig.lang.KEY_LEARN_ENTER_PRICE);
    };
    r._$setOriginPrice = function (e, t) {
      this.__orginPrice = Number(e);
      if (t) this.__onInputBlur(null);
    };
  },
  '02c14b544f21e379de73ba82b326d2a9',
  '0a68b0a7fcd63cf38a45f9f6e71b1c34',
  '342ad7ae4eea50c3cad860686650a915',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
);
