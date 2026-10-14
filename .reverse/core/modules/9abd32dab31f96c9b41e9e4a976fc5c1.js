EDU(
  '9abd32dab31f96c9b41e9e4a976fc5c1',
  function (e, t) {
    var n = window,
      i = NEJ.P,
      o = NEJ.O,
      a = NEJ.F,
      r = i('nej.c'),
      s = i('nej.e'),
      c = i('nej.u'),
      d = i('nej.ut'),
      l = i('nej.ui'),
      u = i('nej.v'),
      _,
      f;
    var h = e;
    var p = s._$pushCSSText('');
    l._$$LinkCard = NEJ.C();
    _ = l._$$LinkCard._$extend(l._$$WindowWrapper);
    f = l._$$LinkCard._$supro;
    _.__initXGui = function () {
      this.__seed_css = p;
      this.__seed_html = s._$addNodeTemplate(this.__getHtmlStr());
    };
    _.__getHtmlStr = function () {
      var e = 'en' === window.currentLanguage ? 'Confirm' : '确定';
      var t = 'en' === window.currentLanguage ? 'Cancel' : '取消';
      var n = 'en' === window.currentLanguage ? 'title' : '标题';
      var i = 'en' === window.currentLanguage ? 'link' : '链接';
      var o =
        '<a class="f-fr u-btn u-btn-default j-btn">' +
        e +
        '</a><a class="f-fr u-btn-gh u-btn-primary j-btn">' +
        t +
        '</a>';
      return h.replace('$btn_html_str', o).replace('$title', n).replace('$link', i);
    };
    _.__initNode = function () {
      this.__supInitNode();
      this.__btns = s._$getByClassName(this.__body, 'j-btn');
      this.__inputs = s._$getByClassName(this.__body, 'j-ipt');
      this.__errorMsg = s._$getByClassName(this.__body, 'j-error')[0];
    };
    _.__onCancel = function () {
      this._$hide();
    };
    _.__onOK = function () {
      var e = {};
      e.name = c._$escape(this.__inputs[0].value);
      e.href = this.__inputs[1].value;
      var t = /^(?:http(s)?:\/\/)[^\s].?/,
        n = /^(?:http(s)?:\/\/).*/;
      var i = e.href.search(t),
        o = e.href.search(n);
      if (!(o < 0))
        if (!(i < 0)) {
          this._$dispatchEvent('onchange', e);
          this._$hide();
        } else this.__onErrorLink(1);
      else this.__onErrorLink(0);
    };
    _.__onErrorLink = function (e) {
      var t =
        'en' === window.currentLanguage ? 'Please enter a valid link' : '请输入合法的链接地址';
      var n = 'en' === window.currentLanguage ? 'or' : '或';
      if (0 == e) this.__showErrorTips(t + '（http://' + n + 'https://）');
      else this.__showErrorTips(t);
    };
    _.__reset = function (e) {
      e = e || {};
      var t = 'en' === window.currentLanguage;
      e.clazz = 'u-eduEditorDialog';
      e.parent = e.parent || document.body;
      e.draggable = e.draggable || !1;
      e.title = e.title || (t ? 'Hyperlink' : '超链接');
      e.mask = e.mask || !0;
      this.__supReset(e);
      this.__doInitDomEvent([
        [this.__btns[0], 'click', this.__onOK._$bind(this)],
        [this.__btns[1], 'click', this.__onCancel._$bind(this)],
        [this.__inputs[0], 'focus', this.__showErrorTips._$bind(this, '')],
        [this.__inputs[1], 'focus', this.__showErrorTips._$bind(this, '')],
      ]);
      this.__inputs[0].value = e.name || '';
      this.__inputs[1].value = '';
    };
    _._$doFocus = function () {
      this.__inputs[1].focus();
      this.__inputs[1].value = '';
    };
    _.__showErrorTips = function (e) {
      this.__errorMsg.innerText = e;
    };
    _.__destroy = function () {
      this.__supDestroy();
    };
    return l._$$LinkCard;
  },
  '86fa2c29b48847e90306ac2a61deff33',
  '5e23a17a4345e0de7b9e3ec78706c924',
);
