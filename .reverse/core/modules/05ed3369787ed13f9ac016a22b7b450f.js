EDU(
  '05ed3369787ed13f9ac016a22b7b450f',
  function () {
    var e = {},
      t = (function () {
        return this;
      })();
    e._$arrContains = function (e, t) {
      if (e) for (var n = 0; n < e.length; n++) if (e[n] === t) return !0;
      return !1;
    };
    e._$arrContainsByKey = function (e, t, n) {
      if (e) for (var i = 0; i < e.length; i++) if (e[i][n || 0] == t) return !0;
      return !1;
    };
    e._$arrCross = function (t, n) {
      for (var i = 0; i < t.length; i++) if (e._$arrContains(n, t[i])) return !0;
      return !1;
    };
    e._$arrShuffle = function (e) {
      return e.sort(function () {
        return Math.random() > 0.5;
      });
    };
    return e;
  },
  'a7d1128d22219f1def1727e67cfa7d44',
);
