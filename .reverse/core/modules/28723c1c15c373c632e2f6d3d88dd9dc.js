EDU(
  '28723c1c15c373c632e2f6d3d88dd9dc',
  function () {
    function e() {
      for (var e = 0; e < l.length; e++) {
        var t = l[e];
        if (t.__hidePop) t.__hidePop();
      }
    }
    var t = NEJ.P,
      n = NEJ.O,
      i = NEJ.F,
      o = t('nej.c'),
      a = t('nej.e'),
      r = t('nej.u'),
      s = t('nej.ut'),
      c = t('nej.ui'),
      d = t('nej.v');
    var l = [];
    d._$addEvent(document, 'mousedown', e);
    var u, _;
    c._$$Popup = NEJ.C();
    u = c._$$Popup._$extend(c._$$Abstract);
    _ = c._$$Popup._$supro;
    u.__init = function () {
      this.__supInit();
      l.push(this);
    };
    u.__hidePop = function () {};
    return c._$$Popup;
  },
  '2251224ef4bde318c45429fafdfcdd19',
);
