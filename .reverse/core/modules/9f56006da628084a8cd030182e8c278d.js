EDU('9f56006da628084a8cd030182e8c278d', function () {
  var e = function (t, n, i, o, a) {
    if (a(i, n))
      if ('object' != typeof i || null === i) {
        var r = o(i, n);
        if ('undefined' != typeof r) t[n] = r;
      } else if (null !== i) {
        try {
          JSON.stringify(i);
        } catch (s) {
          if (/circular/.test(s.message)) return;
        }
        for (var c in i) if (i.hasOwnProperty(c)) e(i, c, i[c], o, a);
      }
  };
  var t = function (t, n, i) {
    i =
      i ||
      function () {
        return !0;
      };
    if ('object' == typeof t && null !== t && 'function' == typeof n) {
      var o = { obj: t };
      e(o, 'obj', o.obj, n, i);
    }
  };
  return t;
});
