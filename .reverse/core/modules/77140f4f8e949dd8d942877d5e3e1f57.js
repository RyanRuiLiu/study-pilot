EDU(
  '77140f4f8e949dd8d942877d5e3e1f57',
  function () {
    var e = {},
      t = (function () {
        return this;
      })();
    e._$versionCompare = function (e, t, n) {
      function i(e) {
        return (o ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(e);
      }
      var o = n && n.lexicographical,
        a = n && n.zeroExtend,
        r = e.split('.'),
        s = t.split('.');
      if (!r.every(i) || !s.every(i)) return NaN;
      if (a) {
        for (; r.length < s.length;) r.push('0');
        for (; s.length < r.length;) s.push('0');
      }
      if (!o) {
        r = r.map(Number);
        s = s.map(Number);
      }
      for (var c = 0; c < r.length; ++c) {
        if (s.length == c) return 1;
        if (r[c] != s[c])
          if (r[c] > s[c]) return 1;
          else return -1;
        else;
      }
      if (r.length != s.length) return -1;
      else return 0;
    };
    return e;
  },
  'a7d1128d22219f1def1727e67cfa7d44',
);
