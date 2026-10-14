EDU('e1290f4839c53e63bc4fc2f89198e390', function () {
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
  var i = window.rxjs.of;
  var o = (function () {
    function t(n) {
      e(this, t);
      this.params = n || void 0;
    }
    n(t, [
      {
        key: 'genObservable',
        value: function o(e) {
          return i(e ? e(this.params) : this.params);
        },
      },
    ]);
    return t;
  })();
  o.of = function (e) {
    return new o(e);
  };
  o.key = 'AJAX_PARAMS';
  return o;
});
