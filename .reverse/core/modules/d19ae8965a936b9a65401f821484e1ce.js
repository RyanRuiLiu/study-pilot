EDU('d19ae8965a936b9a65401f821484e1ce', function () {
  function e(e, n) {
    var i = n || 0;
    var o = t;
    return (
      o[e[i++]] +
      o[e[i++]] +
      o[e[i++]] +
      o[e[i++]] +
      '-' +
      o[e[i++]] +
      o[e[i++]] +
      '-' +
      o[e[i++]] +
      o[e[i++]] +
      '-' +
      o[e[i++]] +
      o[e[i++]] +
      '-' +
      o[e[i++]] +
      o[e[i++]] +
      o[e[i++]] +
      o[e[i++]] +
      o[e[i++]] +
      o[e[i++]]
    );
  }
  var t = [];
  for (var n = 0; n < 256; ++n) t[n] = (n + 256).toString(16).substr(1);
  return e;
});
