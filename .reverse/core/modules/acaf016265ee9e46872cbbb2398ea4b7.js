EDU(
  'acaf016265ee9e46872cbbb2398ea4b7',
  function () {
    function e(n, o) {
      var a = n;
      if (o instanceof i) return o.then(e, t);
      setTimeout(function () {
        if ('pending' === a.status) {
          a.status = 'resolved';
          a.data = o;
          for (var e = 0; e < a.onResolvedCallback.length; e++) a.onResolvedCallback[e](o);
        }
      });
    }
    function t(e, t) {
      var n = e;
      setTimeout(function () {
        if ('pending' === n.status) {
          n.status = 'rejected';
          n.data = t;
          for (var e = 0; e < n.onRejectedCallback.length; e++) n.onRejectedCallback[e](t);
        }
      });
    }
    function n(e, t, o, a) {
      var r;
      var s = !1;
      if (e === t) return a(new TypeError('Chaining cycle detected for promise!'));
      if (!(t instanceof i))
        if (null !== t && ('object' == typeof t || 'function' == typeof t))
          try {
            r = t.then;
            if ('function' == typeof r)
              r.call(
                t,
                function d(t) {
                  if (!s) {
                    s = !0;
                    return n(e, t, o, a);
                  }
                },
                function l(e) {
                  if (!s) {
                    s = !0;
                    return a(e);
                  }
                },
              );
            else o(t);
          } catch (c) {
            if (s) return;
            s = !0;
            return a(c);
          }
        else o(t);
      else if ('pending' === t.status)
        t.then(function (t) {
          n(e, t, o, a);
        }, a);
      else t.then(o, a);
    }
    if ('function' == typeof window.Promise) return window.Promise;
    var i = function (n) {
      var i = this;
      i.status = 'pending';
      i.onResolvedCallback = [];
      i.onRejectedCallback = [];
      n = n || function () {};
      try {
        n(
          function (t) {
            e(i, t);
          },
          function (e) {
            t(i, e);
          },
        );
      } catch (o) {
        t(o);
      }
    };
    i.prototype.then = function (e, t) {
      var o = this;
      var a;
      e =
        'function' == typeof e
          ? e
          : function (e) {
              return e;
            };
      t =
        'function' == typeof t
          ? t
          : function (e) {
              throw e;
            };
      if ('resolved' === o.status)
        return (a = new i(function (t, i) {
          setTimeout(function () {
            try {
              var r = e(o.data);
              n(a, r, t, i);
            } catch (s) {
              i(s);
            }
          });
        }));
      if ('rejected' === o.status)
        return (a = new i(function (e, i) {
          setTimeout(function () {
            try {
              var r = t(o.data);
              n(a, r, e, i);
            } catch (s) {
              i(s);
            }
          });
        }));
      if ('pending' === o.status)
        return (a = new i(function (i, r) {
          o.onResolvedCallback.push(function (t) {
            try {
              var o = e(t);
              n(a, o, i, r);
            } catch (s) {
              r(s);
            }
          });
          o.onRejectedCallback.push(function (e) {
            try {
              var o = t(e);
              n(a, o, i, r);
            } catch (s) {
              r(s);
            }
          });
        }));
      else;
    };
    i.prototype['catch'] = function (e) {
      return this.then(null, e);
    };
    i.deferred = i.defer = function () {
      var e = {};
      e.promise = new i(function (t, n) {
        e.resolve = t;
        e.reject = n;
      });
      return e;
    };
    i.all = function (n) {
      function o(n, i, o) {
        return function (n) {
          if ('reject' !== o) {
            d[i] = n;
            if (++l === a) e(r, d);
          } else t(r, n);
        };
      }
      var a = n.length;
      var r = new i();
      for (var s = 0; s < a; s++) {
        var c = n[s];
        if ((!c) instanceof i) c = i.resolve(c);
        c.then(o(c, s, 'resolve'), o(c, s, 'reject'));
      }
      var d = [];
      var l = 0;
      return r;
    };
    i.race = function (n) {
      function o(t) {
        if (!c) {
          c = !0;
          e(s, t);
        }
      }
      function a(e) {
        if (!c) {
          c = !0;
          t(s, e);
        }
      }
      var r = n.length;
      var s = new i();
      var c = !1;
      for (var d = 0; d < r; d++) {
        var l = n[d];
        if ((!l) instanceof i) l = i.resolve(l);
        l.then(o, a);
      }
      return s;
    };
    i.resolve = function (e) {
      return new i(function (t, n) {
        t(e);
      });
    };
    i.reject = function (e) {
      return new i(function (t, n) {
        n(e);
      });
    };
    return i;
  },
  'a7d1128d22219f1def1727e67cfa7d44',
);
