EDU(
  '74b0aa2cd36a05aa3d2263b4de234a9b',
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
    s._$$EditorDialogButton = NEJ.C();
    d = s._$$EditorDialogButton._$extend(s._$$Abstract);
    l = s._$$EditorDialogButton._$supro;
    d.__init = function () {
      this.__supInit();
    };
    d.__reset = function (e) {
      this.__supReset(e);
      this.__title = e.title || '';
      this.__editor = e.editor;
      this.__config = e.config;
      this.__dialogOption = { onchange: this.__onchange._$bind(this), config: this.__config };
      this.__body.title = this.__title;
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
    d.__onClick = function () {};
    d.__onchange = function (e) {};
    return s._$$EditorDialogButton;
  },
  '2251224ef4bde318c45429fafdfcdd19',
);
