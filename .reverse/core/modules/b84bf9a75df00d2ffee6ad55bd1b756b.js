EDU(
  'b84bf9a75df00d2ffee6ad55bd1b756b',
  function () {
    var e = NEJ.P,
      t = NEJ.F,
      n = e('nej.c'),
      i = e('nej.e'),
      o = e('nej.u'),
      a = e('nej.ut'),
      r = e('nej.ui'),
      s = e('nej.v'),
      c,
      d;
    if (!r._$$MathButton) {
      r._$$MathButton = NEJ.C();
      c = r._$$MathButton._$extend(r._$$EditorDialogButton);
      d = r._$$MathButton._$supro;
      c.__reset = function (e) {
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
      c.__initNode = function () {
        this.__supInitNode();
        this.__cmd = 'insertimage';
      };
      c.__onchange = function (e) {
        if (e) if (e.href) this.__editor.execCommand(this.__cmd, { src: e.href });
      };
      c.__onClick = function () {
        if (!this.__isDisabled) {
          this.__editor.focus();
          this.__mathCardUI = r._$$MathCard._$allocate(this.__dialogOption);
          this.__mathCardUI._$show();
        }
      };
      c.__destroy = function () {
        if (this.__mathCardUI) this.__mathCardUI = r._$$MathCard._$recycle(this.__mathCardUI);
        this.__supDestroy();
      };
      return r._$$MathButton;
    }
  },
  '3b4542f6c69db6c4ad7d25311949d774',
  '74b0aa2cd36a05aa3d2263b4de234a9b',
  'e0fc9cc93c41d60b2a16d1516e59129c',
);
