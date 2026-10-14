EDU('bfe5ed62679ffcea351a355c70be92ca', function (e, t, n, i) {
  var o = Function.prototype;
  o._$aop = function (e, t) {
    var t = t || n,
      e = e || n,
      o = this;
    return function () {
      var n = { args: i.slice.call(arguments, 0) };
      e(n);
      if (!n.stopped) {
        n.value = o.apply(this, n.args);
        t(n);
      }
      return n.value;
    };
  };
  o._$bind = function () {
    var e = arguments,
      t = arguments[0],
      n = this;
    return function () {
      var o = i.slice.call(e, 1);
      i.push.apply(o, arguments);
      return n.apply(t || null, o);
    };
  };
  o._$bind2 = function () {
    var e = arguments,
      t = i.shift.call(e),
      n = this;
    return function () {
      i.push.apply(arguments, e);
      return n.apply(t || null, arguments);
    };
  };
  var o = String.prototype;
  if (!o.trim)
    o.trim = (function () {
      var e = /(?:^\s+)|(?:\s+$)/g;
      return function () {
        return this.replace(e, '');
      };
    })();
  if (!this.console) this.console = { log: n, error: n };
  if (!0) {
    NEJ = this.NEJ || {};
    NEJ.copy = function (e, n) {
      e = e || {};
      n = n || t;
      for (var i in n) if (n.hasOwnProperty(i)) e[i] = n[i];
      return e;
    };
    NEJ = NEJ.copy(NEJ, {
      O: t,
      R: i,
      F: n,
      P: function (e) {
        if (!e || !e.length) return null;
        var t = window;
        for (
          var n = e.split('.'), i = n.length, o = 'window' == n[0] ? 1 : 0;
          o < i;
          t = t[n[o]] = t[n[o]] || {}, o++
        );
        return t;
      },
    });
    return NEJ;
  }
  return e;
});
