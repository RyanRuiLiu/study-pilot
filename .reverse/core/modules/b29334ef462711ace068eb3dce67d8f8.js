EDU('b29334ef462711ace068eb3dce67d8f8', function () {
  var e = {},
    t = (function () {
      return this;
    })();
  e._$throttle = function n(e, t, i) {
    function o() {
      e.apply(this, c);
      r = d;
      clearTimeout(a);
      a = null;
    }
    if ('number' == typeof arguments[1]) i = t;
    if (void 0 === t || null === t) t = !0;
    if (void 0 === i) i = 300;
    var a;
    var r;
    var s = this,
      c,
      d;
    return function () {
      c = arguments;
      d = +new Date();
      if (!t) {
        r = r || +new Date();
        if (!(2 * i > d - r >= i)) {
          if (!a)
            a = setTimeout(function () {
              o();
            }, i);
        } else o();
      } else {
        t = !1;
        e.apply(this, c);
      }
    };
  };
  return e;
});
