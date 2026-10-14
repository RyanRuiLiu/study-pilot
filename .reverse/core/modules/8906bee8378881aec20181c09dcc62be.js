EDU(
  '8906bee8378881aec20181c09dcc62be',
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
    s._$$EditorLinkButton = NEJ.C();
    d = s._$$EditorLinkButton._$extend(s._$$EditorDialogButton);
    l = s._$$EditorLinkButton._$supro;
    d.__reset = function (e) {
      this.__supReset(e);
      this.__editor.addListener(
        'selectionchange',
        function (e, t, n) {
          var i = this.__editor.queryCommandState(this.__cmd);
          if (i == -1) this._$setDisabled(!0);
          else if (!n) this._$setDisabled(!1);
        }._$bind(this),
      );
    };
    d.__destroy = function () {
      this.__supDestroy();
    };
    d.__initNode = function () {
      this.__supInitNode();
      this.__cmd = 'link';
    };
    d.__onClick = function () {
      if (!this.__isDisabled) s._$$LinkCard._$allocate(this.__dialogOption)._$show();
    };
    d.__onchange = function (e) {
      this.__editor.execCommand(this.__cmd, { href: e.href, textValue: e.name, target: '_blank' });
    };
    return s._$$EditorLinkButton;
  },
  '2251224ef4bde318c45429fafdfcdd19',
  '74b0aa2cd36a05aa3d2263b4de234a9b',
  '9abd32dab31f96c9b41e9e4a976fc5c1',
);
