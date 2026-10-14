EDU('d8d435c3ccfb4fe05b0699a528b3d3e2', function () {
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
        for (var c in i) if (i.hasOwnProperty && i.hasOwnProperty(c)) e(i, c, i[c], o, a);
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
