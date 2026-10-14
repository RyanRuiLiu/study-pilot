EDU('4167bc1c47e1faf0eed519d2839fc531', function () {
  function e(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  }
  function t(e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      i.enumerable = i.enumerable || !1;
      i.configurable = !0;
      if ('value' in i) i.writable = !0;
      Object.defineProperty(e, i.key, i);
    }
  }
  function n(e, n, i) {
    if (n) t(e.prototype, n);
    if (i) t(e, i);
    return e;
  }
  var i = window,
    o = i.rxjs,
    a = o.timer,
    r = o.fromEvent,
    s = o.operators,
    c = s.tap,
    d = s.map,
    l = s.throttle,
    u = s.throttleTime;
  var _ = (function () {
    function t() {
      e(this, t);
    }
    n(t, [
      {
        key: 'throttleEvent',
        value: function i(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'click';
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 200;
          return r(e, t).pipe(
            l(function () {
              return a(n);
            }),
          );
        },
      },
      {
        key: 'throttleKeyup',
        value: function o(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 200;
          return r(e, 'keyup').pipe(
            d(function (e) {
              return e.target.value;
            }),
          );
        },
      },
    ]);
    return t;
  })();
  var f = new _();
  return f;
});
