EDU('c6ac68abc784a45c1aa600db388ebcc3', function () {
  var e = {};
  e.getOutputScale = function (e) {
    var t = window.devicePixelRatio || 1;
    var n =
      e.webkitBackingStorePixelRatio ||
      e.mozBackingStorePixelRatio ||
      e.msBackingStorePixelRatio ||
      e.oBackingStorePixelRatio ||
      e.backingStorePixelRatio ||
      1;
    var i = t / n;
    return { sx: i, sy: i, scaled: 1 !== i };
  };
  e.approximateFraction = function (e) {
    if (Math.floor(e) === e) return [e, 1];
    var t = 1 / e;
    var n = 8;
    if (t > n) return [1, n];
    else if (Math.floor(t) === t) return [1, t];
    var i = e > 1 ? t : e;
    var o = 0,
      a = 1,
      s = 1,
      r = 1;
    for (;;) {
      var c = o + s,
        d = a + r;
      if (d > n) break;
      if (i <= c / d) {
        s = c;
        r = d;
      } else {
        o = c;
        a = d;
      }
    }
    var l;
    if (i - o / a < s / r - i) l = i === e ? [o, a] : [a, o];
    else l = i === e ? [s, r] : [r, s];
    return l;
  };
  e.roundToDivide = function (e, t) {
    var n = e % t;
    return 0 === n ? e : Math.round(e - n + t);
  };
  e.watchResize = function (e, t) {
    var n = e.offsetWidth,
      i = e.offsetHeight,
      o;
    var a = setInterval(function () {
      if (!o) {
        var a = e.offsetWidth;
        var s = e.offsetHeight;
        if (a !== n || s !== i)
          o = setTimeout(function () {
            if (e.offsetWidth == a && e.offsetHeight == s) {
              n = a;
              i = s;
              t(a, s);
            }
            o = null;
          }, 200);
      }
    }, 100);
    return a;
  };
  return e;
});
