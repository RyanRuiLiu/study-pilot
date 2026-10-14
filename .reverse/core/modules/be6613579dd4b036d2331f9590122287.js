EDU(
  'be6613579dd4b036d2331f9590122287',
  function () {
    var e = NEJ.P,
      t = NEJ.O,
      n = NEJ.F,
      i = e('nej.c'),
      o = e('nej.e'),
      a = e('nej.u'),
      r = e('nej.ut'),
      s = e('nej.ui'),
      c = e('nej.v'),
      d,
      l;
    var u = '<div class="zitm zbg" title=""><div class="zicn zbg"></div></div>';
    s._$$EditorButton = NEJ.C();
    d = s._$$EditorButton._$extend(s._$$Abstract);
    l = s._$$EditorButton._$supro;
    d.__init = function () {
      this.__supInit();
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__title = e.title || '';
      this.__clickFn = e.onclick || n;
      this.__config = e.config;
      this.__body.title = this.__title;
      this._$setChecked(!1);
      this._$setDisabled(!1);
    };
    d.__destroy = function () {
      this.__supDestroy();
    };
    d.__initXGui = function () {
      this.__seed_html = o._$addNodeTemplate(u);
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__isDisabled = !1;
      this.__isChecked = !1;
      c._$addEvent(this.__body, 'click', this.__onClick._$bind(this));
    };
    d._$setDisabled = function (e) {
      this.__isDisabled = e;
      if (e) o._$addClassName(this.__body, 'js-disabled');
      else o._$delClassName(this.__body, 'js-disabled');
    };
    d._$isDisabled = function () {
      return this.__isDisabled;
    };
    d._$setChecked = function (e) {
      this.__isChecked = e;
      if (e) o._$addClassName(this.__body, 'js-checked');
      else o._$delClassName(this.__body, 'js-checked');
    };
    d._$isChecked = function () {
      return this.__isChecked;
    };
    d.__onClick = function () {
      if (!this.__isDisabled) this.__clickFn();
    };
    return s._$$EditorButton;
  },
  '2251224ef4bde318c45429fafdfcdd19',
);
