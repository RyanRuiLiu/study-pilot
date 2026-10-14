EDU(
  '80419355935cef882bd9c8c7a92dd741',
  function (e, t, n, i, o, a, r, s, c, d, l) {
    var u,
      _ = i._$pushCSSText(r, { blankimage: n._$BLANK_IMAGE });
    s._$$Mask = t._$klass();
    u = s._$$Mask._$extend(a._$$Abstract);
    u.__reset = function (e) {
      this.__super(e);
      var t = e.content || '&nbsp;';
      o._$isString(t) ? (this.__body.innerHTML = t) : this.__body.appendChild(t);
    };
    u.__destroy = function () {
      this.__super();
      this.__body.innerHTML = '&nbsp;';
    };
    u.__initXGui = function () {
      this.__seed_css = _;
    };
    u._$show = function () {
      i._$fullScreen(this.__body);
      this.__super();
    };
    if (!0) e.copy(e.P('nej.ui'), s);
    return s;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '8b5c7ec5f50504fcb779ea6190a77347',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
  '2251224ef4bde318c45429fafdfcdd19',
  '0be63eb164875d316def24806929b361',
);
