EDU(
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  function (e, t, n, i, o, a) {
    n._$cookie = (function () {
      var e = new Date(),
        n = +e,
        o = 864e5;
      var a = function (e) {
        var t = document.cookie,
          n = '\\b' + e + '=',
          i = t.search(n);
        if (i < 0) return '';
        i += n.length - 2;
        var o = t.indexOf(';', i);
        if (o < 0) o = t.length;
        return t.substring(i, o) || '';
      };
      return function (r, s) {
        if (void 0 === s) return a(r);
        if (t._$isString(s)) {
          if (s) {
            document.cookie = r + '=' + s + ';';
            return s;
          }
          s = { expires: -100 };
        }
        s = s || i;
        var c = r + '=' + (s.value || '') + ';';
        delete s.value;
        if (void 0 !== s.expires) {
          e.setTime(n + s.expires * o);
          s.expires = e.toGMTString();
        }
        c += t._$object2string(s, ';');
        document.cookie = c;
      };
    })();
    if (!0) e.copy(e.P('nej.j'), n);
    return n;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'fe86216ed59e3103a56c42c850d389f0',
);
