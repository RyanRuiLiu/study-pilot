EDU(
  'a225fd9e6aba8ca4ae39f96771726601',
  function () {
    var e = {},
      t = (function () {
        return this;
      })();
    e._$encode = function (e, t) {
      t = '' + t;
      if (!e || !t) return t || '';
      else
        return t.replace(e.r, function (t) {
          var n = e[!e.i ? t.toLowerCase() : t];
          return null != n ? n : t;
        });
    };
    e._$str2utf8hex = function (e) {
      var t = this._$writeUTF(e, !0);
      var n = '';
      for (var i = 0; i < t.length; i++) {
        var o = (255 & t[i]).toString(16);
        if (1 === o.length) o = '0' + o;
        n += o;
      }
      return n;
    };
    e._$writeUTF = function (e, t) {
      var n = [];
      var i = 0;
      for (var o = 0; o < e.length; o++) {
        var a = e.charCodeAt(o);
        if (0 <= a && a <= 127) {
          i += 1;
          n.push(a);
        } else if (128 <= a && a <= 2047) {
          i += 2;
          n.push(192 | (31 & (a >> 6)));
          n.push(128 | (63 & a));
        } else if ((2048 <= a && a <= 55295) || (57344 <= a && a <= 65535)) {
          i += 3;
          n.push(224 | (15 & (a >> 12)));
          n.push(128 | (63 & (a >> 6)));
          n.push(128 | (63 & a));
        }
      }
      for (o = 0; o < n.length; o++) n[o] &= 255;
      if (t) return n;
      if (i <= 255) return [0, i].concat(n);
      else return [i >> 8, 255 & i].concat(n);
    };
    return e;
  },
  'a7d1128d22219f1def1727e67cfa7d44',
);
