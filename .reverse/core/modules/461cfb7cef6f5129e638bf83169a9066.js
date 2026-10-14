EDU('461cfb7cef6f5129e638bf83169a9066', function (e, t, n, i) {
  e.__forIn = function (e, t, n) {
    if (!e || !t) return null;
    var i = Object.keys(e);
    for (var o = 0, a = i.length, r, s; o < a; o++) {
      r = i[o];
      s = t.call(n || null, e[r], r, e);
      if (s) return r;
    }
    return null;
  };
  e.__forEach = function (e, t, n) {
    e.forEach(t, n);
  };
  e.__col2array = function (e) {
    return i.slice.call(e, 0);
  };
  e.__str2time = function (e) {
    return Date.parse(e);
  };
  return e;
});
