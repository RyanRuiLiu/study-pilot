EDU(
  '5f6786e7896f2a86bf128de299871305',
  function (e) {
    var t = e.isEn();
    var n = e.getLang();
    var i = NEJ.O,
      o = window,
      a = NEJ.P('nej.e'),
      r = NEJ.P('nej.v'),
      s = NEJ.P('nej.u'),
      c = NEJ.P('edu.m'),
      d = NEJ.P('edu.u'),
      l,
      u;
    var _ = a._$pushCSSText(
      '        .#<uispace>.u-tipinput-error{border-color:red;}        .#<uispace> {position:relative;z-index:102;}        .#<uispace> .u-cmtedtip{position:absolute;}        .#<uispace> .u-cmtedtip.right{top:-23px;right:0;}        .#<uispace> .u-cmtedtip.left{bottom:-25px;left:0;}        .#<uispace> .s-fc9{color:red;}        .#<uispace> .tip{position:absolute;left:100%;top:0;padding-left:14px;width:200px;}        .#<uispace> .tip .ct{background:#ffffcc;font-size:12px;line-height:16px;color:#333;padding:5px 6px;border:1px solid #c2b06b;}        ',
    );
    var f = a._$addNodeTemplate(
      '<div class="u-tipinput">    \t\t<div class="u-cmtedtip">    \t\t\t<div class="f-fs0 f-fc9 j-ic f-fl">' +
        (t ? n.KEY_LEARN_ALSO_INPUT : '还可以输入') +
        '<b class="f-fs0 f-fc0">100</b>' +
        (t ? n.KEY_LEARN_WORDS : '字') +
        '</div>    \t\t</div>    \t\t<div class="f-cb j-editArea" style="z-index:102;">    \t\t</div>    \t\t<div class="tip j-tip" style="display:none">    \t\t\t<div class="trian"></div>    \t\t\t<div class="ct j-ct f-f1"></div>    \t\t</div>    \t </div>',
    );
    d._$$TipInputUI = NEJ.C();
    l = d._$$TipInputUI._$extend(d._$$UIBase, !0);
    u = d._$$TipInputUI._$supro;
    l.__initXGui = function () {
      this.__seed_html = f;
      this.__seed_css = _;
    };
    l.__initNode = function () {
      this.__supInitNode();
      this.__count = a._$getByClassName(this.__body, 'j-ic')[0];
      this.__cmtTip = a._$getByClassName(this.__body, 'u-cmtedtip')[0];
      this.__tips = a._$getByClassName(this.__body, 'j-tip')[0];
      this.__tipct = a._$getByClassName(this.__body, 'j-ct')[0];
      this.__editArea = a._$getByClassName(this.__body, 'j-editArea')[0];
      this.__charUtil = new c._$$CharasetUtil();
    };
    l.__reset = function (t) {
      var n = e.isEn();
      var i = e.getLang();
      this.__supReset(t);
      this.__baseInput = d._$$BaseInputUI._$allocate({
        parent: this.__editArea,
        width: t.width,
        height: t.height,
        filterEnter: t.filterEnter,
        labelText: t.labelText,
        type: t.type,
        onInputFocus: this.__onBaseFocus._$bind(this),
        onInputBlur: this.__onBaseBlur._$bind(this),
        onInputChange: this.__onBaseInput._$bind(this),
      });
      this.__input = this.__baseInput._$getTextArea();
      this.__autoShowCount = void 0 == t.autoShowCount ? !0 : t.autoShowCount;
      this.__counttmp0 =
        '<div>' +
        (n ? i.KEY_LEARN_ALSO_INPUT : '还可以输入') +
        '<b class="s-fc1"></b>' +
        (n ? i.KEY_LEARN_WORDS : '字') +
        '</div>';
      this.__counttmp1 =
        '<div class="s-fc9">' +
        (n ? i.KEY_LEARN_OVER : '还可以输入') +
        '<b></b>' +
        (n ? i.KEY_LEARN_WORDS : '还可以输入') +
        '</div>';
      this.__critical = t.critical || 100;
      this.__filterLine = !!t.filterLine;
      this.__tipPos = t.tipPos || 'right';
      a._$replaceClassName(this.__cmtTip, 'left right', this.__tipPos);
      this.__count.innerHTML =
        '<div>' +
        (n ? i.KEY_LEARN_ALSO_INPUT : '还可以输入') +
        '<b class="s-fc1">' +
        t.critical +
        '</b>' +
        (n ? i.KEY_LEARN_WORDS : '字') +
        '</div>';
      d._$hiddenNode(this.__count);
      if (t.cnt) {
        this.__tipct.innerHTML = t.cnt;
        this.__tipCnt = t.cnt;
      }
      if (t.width) this.__editArea.style.width = t.width + 'px';
      if (t.height) this.__editArea.style.height = t.height + 'px';
    };
    l._$getContent = function () {
      return this.__baseInput._$getContent();
    };
    l._$setInitContent = function (e) {
      this.__baseInput._$setInitContent(e);
      this.__onBaseInput();
    };
    l._$disableNoInitInput = function () {
      this.__baseInput._$disableNoInitInput();
    };
    l._$setInit = function () {
      this.__baseInput._$setInitContent('');
      var e = this.__parseCount(this.__counttmp0, 100);
      this.__count.innerHTML = '';
      this.__count.appendChild(e);
    };
    l._$getCount = function () {
      return this.__charUtil._$getCharsL(this.__baseInput._$getContent());
    };
    l._$erringInput = function () {
      this.__baseInput._$erringInput();
    };
    l._$removeErringInput = function () {
      this.__baseInput._$removeErringInput();
    };
    l._$disableInput = function () {
      this.__baseInput._$disableInput();
    };
    l._$enableInput = function () {
      this.__baseInput._$enableInput();
    };
    l.__onBaseFocus = function () {
      if (this.__count && this.__autoShowCount) d._$showNode(this.__count);
      if (this.__tipCnt) d._$showNode(this.__tips);
      this._$dispatchEvent('onInputFocus');
    };
    l.__onBaseBlur = function (e) {
      if (this.__count && this.__autoShowCount) d._$hiddenNode(this.__count);
      if (this.__tipCnt) d._$hiddenNode(this.__tips);
      this._$dispatchEvent('onInputBlur');
    };
    l.__onBaseInput = function (e) {
      if (!this.__count) return !1;
      var t = this.__input.value;
      if (this.__filterLine) {
        var n = t.replace(/[\r\n]+/g, '');
        if (n != t) {
          this.__input.value = n;
          t = n;
        }
      }
      t = d._$trim(t);
      var i = this.__charUtil._$getCharsL(t);
      var o = Math.ceil(i / 2);
      var a;
      var r = this.__critical - o;
      if (r >= 0) a = this.__parseCount(this.__counttmp0, r);
      else {
        var s = Math.abs(r);
        if (s >= 1e3) {
          this.__limitLock = s = 1e3;
          if (this.__limitLock) {
            var c = 2 * (this.__limitLock + this.__critical);
            if (i > c) this.__input.value = this.__charUtil._$sliceCnAndEns(t, c);
          }
        }
        a = this.__parseCount(this.__counttmp1, s);
      }
      this.__count.innerHTML = '';
      this.__count.appendChild(a);
      this._$dispatchEvent('onInputChange', e);
    };
    l.__parseCount = function (e, t) {
      if (s._$isString(e)) e = a._$html2node(e);
      var n = a._$getChildren(e)[0];
      n.innerText = t || 0;
      return e;
    };
    l.__destroy = function () {
      if (this.__baseInput) this.__baseInput = d._$$BaseInputUI._$recycle(this.__baseInput);
      this.__supDestroy();
    };
  },
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '02c14b544f21e379de73ba82b326d2a9',
  'af2a7901f01e5083a1fb1f6d4a673974',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  'fe86216ed59e3103a56c42c850d389f0',
);
