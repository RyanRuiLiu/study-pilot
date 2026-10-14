EDU(
  'f6224c30f6817fcd2b8c45779bf407f2',
  function () {
    function e(e) {
      return function (t) {
        return Object.prototype.toString.call(t) === '[object ' + e + ']';
      };
    }
    function t(e) {
      if (!o(e) || e.nodeType || s(e)) return !1;
      if (e.constructor && !e.constructor.prototype.hasOwnProperty('isPrototypeOf')) return !1;
      else return !0;
    }
    function n() {
      var e = arguments,
        o = 1,
        s = !1,
        c = e[0],
        d = e.length,
        l,
        u,
        _,
        f,
        h,
        p;
      if (a(e[0])) {
        s = e[0];
        c = e[1];
        o++;
      }
      if (o === d) return e[0];
      if ('object' != typeof c && !i(c)) c = {};
      for (; o < d; o++)
        if (null != (_ = e[o]))
          for (l in _) {
            f = c[l];
            p = _[l];
            if (f !== p)
              if (s && p && (t(p) || (h = r(p)))) {
                if (h) {
                  h = !1;
                  u = f && r(f) ? f : [];
                } else u = f && t(f) ? f : {};
                c[l] = n(s, u, p);
              } else c[l] = p;
            else;
          }
      return c;
    }
    var i = e('Function');
    var o = e('Object');
    var a = e('Boolean');
    var r = e('Array');
    var s = e('global');
    return n;
  },
  'f0752d0e70cdd7ce8e6e9961465bc63f',
);
