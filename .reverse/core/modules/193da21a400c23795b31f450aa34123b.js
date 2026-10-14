EDU(
  '193da21a400c23795b31f450aa34123b',
  function () {
    function e(e) {
      return function (t) {
        return Object.prototype.toString.call(t) === '[object ' + e + ']';
      };
    }
    function t(e) {
      return window === e;
    }
    function n(e) {
      if (!a(e) || e.nodeType || t(e)) return !1;
      if (e.constructor && !e.constructor.prototype.hasOwnProperty('isPrototypeOf')) return !1;
      else return !0;
    }
    function i() {
      var e = arguments,
        t = 1,
        a = !1,
        c = e[0],
        d = e.length,
        l,
        u,
        _,
        f,
        h,
        p;
      if (r(e[0])) {
        a = e[0];
        c = e[1];
        t++;
      }
      if (t === d) return e[0];
      if ('object' != typeof c && !o(c)) c = {};
      for (; t < d; t++)
        if (null != (_ = e[t]))
          for (l in _) {
            f = c[l];
            p = _[l];
            if (f !== p)
              if (a && p && (n(p) || (h = s(p)))) {
                if (h) {
                  h = !1;
                  u = f && s(f) ? f : [];
                } else u = f && n(f) ? f : {};
                c[l] = i(a, u, p);
              } else c[l] = p;
            else;
          }
      return c;
    }
    var o = e('Function');
    var a = e('Object');
    var r = e('Boolean');
    var s = e('Array');
    return i;
  },
  'a7d1128d22219f1def1727e67cfa7d44',
);
