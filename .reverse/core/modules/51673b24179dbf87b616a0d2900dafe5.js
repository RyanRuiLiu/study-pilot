EDU('51673b24179dbf87b616a0d2900dafe5', function () {
  var e,
    t = window;
  var n = t.crypto || t.msCrypto;
  if (n && n.getRandomValues) {
    var i = new Uint8Array(16);
    e = function a() {
      n.getRandomValues(i);
      return i;
    };
  }
  if (!e) {
    var o = new Array(16);
    e = function () {
      for (var e = 0, t; e < 16; e++) {
        if (0 === (3 & e)) t = 4294967296 * Math.random();
        o[e] = (t >>> ((3 & e) << 3)) & 255;
      }
      return o;
    };
  }
  return e;
});
