EDU(
  'f7742deea4ceef0567d5c5917d8e591a',
  function (e, t, n, i, o, a, r) {
    function s(e) {
      var t = encodeURI(e);
      var n = btoa(t);
      return n;
    }
    function c(e) {
      var t = e.trim();
      var n = '0x' === t.substr(0, 2).toLowerCase() ? t.substr(2) : t;
      var i = n.length;
      if (i % 2 !== 0) {
        alert('Illegal Format ASCII Code!');
        return '';
      }
      var o;
      var a = [];
      for (var r = 0; r < i; r += 2) {
        o = parseInt(n.substr(r, 2), 16);
        a.push(String.fromCharCode(o));
      }
      return a.join('');
    }
    function d(e) {
      var t = new Uint8Array(
        e.match(/[\da-f]{2}/gi).map(function (e) {
          return parseInt(e, 16);
        }),
      );
      var n = t.buffer;
      return n;
    }
    function l(e, t) {
      return u(t)[e];
    }
    function u(e) {
      return i['charEnlist' + e];
    }
    function _(e) {
      return i.charListMap['v_' + e];
    }
    function f(e) {
      var t = i.charListMap['v_' + e],
        n = '';
      for (var o = 0; o < t.length; o++) n += l(t[o].i, t[o].t);
      return n;
    }
    function h(e) {
      var t = '',
        n = [];
      for (var o = 0, a = e.length; o < a; o++) {
        t = e[o];
        var r = {};
        if (/[a-z]/.test(t)) {
          r.t = 1;
          r.i = i.charEnlist1.indexOf(t);
        } else if (/[A-Z]/.test(t)) {
          r.t = 2;
          r.i = i.charEnlist2.indexOf(t);
        } else if (/[0-9]/.test(t)) {
          r.t = 3;
          r.i = i.charEnlist3.indexOf(t);
        }
        n.push(r);
      }
      return n;
    }
    function p(e) {
      var t = '';
      var n = 8192;
      var i;
      for (i = 0; i < e.length / n; i++)
        t += String.fromCharCode.apply(null, e.slice(i * n, (i + 1) * n));
      t += String.fromCharCode.apply(null, e.slice(i * n));
      return t;
    }
    function m(e) {
      var t = [],
        n,
        i,
        o;
      for (i = 0; i < e.length; ++i) {
        n = e[i];
        for (o = 3; o >= 0; --o) t.push((n >> (8 * o)) & 255);
      }
      return t;
    }
    function g(e) {
      var t = new ArrayBuffer(e.length);
      var n = new Uint8Array(t);
      for (var i = 0, o = e.length; i < o; i++) n[i] = e.charCodeAt(i);
      return n;
    }
    function b(e) {
      var t = atob(e);
      var n = new Uint8Array(t.length);
      Array.prototype.forEach.call(t, function (e, t) {
        n[t] = e.charCodeAt(0);
      });
      return n;
    }
    function v(e) {
      var t = Array.prototype.map
        .call(e, function (e) {
          return String.fromCharCode(e);
        })
        .join('');
      return btoa(t);
    }
    function E(e, t) {
      if (e) {
        var n = window.location.protocol;
        t = t.replace(/(^\/\/)|(^http:\/\/)|(^https:\/\/)/, n + '//');
        if (e.indexOf('?') != -1)
          return e + '&token=' + encodeURIComponent(t) + '&t=' + new Date().getTime();
        else return e + '?token=' + encodeURIComponent(t) + '&t=' + new Date().getTime();
      }
    }
    var x = window;
    i.charListMap = {
      v_0: [
        { t: 1, i: 2 },
        { t: 3, i: 9 },
        { t: 3, i: 7 },
        { t: 3, i: 2 },
        { t: 1, i: 0 },
        { t: 1, i: 4 },
        { t: 1, i: 2 },
        { t: 3, i: 1 },
        { t: 3, i: 1 },
        { t: 3, i: 8 },
        { t: 1, i: 5 },
        { t: 1, i: 4 },
        { t: 1, i: 4 },
        { t: 3, i: 6 },
        { t: 3, i: 9 },
        { t: 1, i: 5 },
      ],
      v_1: [
        { t: 3, i: 3 },
        { t: 1, i: 5 },
        { t: 1, i: 15 },
        { t: 3, i: 4 },
        { t: 1, i: 23 },
        { t: 1, i: 18 },
        { t: 3, i: 9 },
        { t: 3, i: 2 },
        { t: 3, i: 2 },
        { t: 1, i: 14 },
        { t: 1, i: 20 },
        { t: 1, i: 22 },
        { t: 3, i: 5 },
        { t: 1, i: 16 },
        { t: 3, i: 7 },
        { t: 3, i: 2 },
      ],
      v_2: [
        { t: 2, i: 16 },
        { t: 2, i: 7 },
        { t: 1, i: 7 },
        { t: 2, i: 24 },
        { t: 1, i: 17 },
        { t: 2, i: 4 },
        { t: 1, i: 4 },
        { t: 2, i: 18 },
        { t: 2, i: 12 },
        { t: 2, i: 5 },
        { t: 2, i: 18 },
        { t: 2, i: 4 },
        { t: 1, i: 0 },
        { t: 2, i: 22 },
        { t: 1, i: 11 },
        { t: 2, i: 6 },
      ],
      v_3: [
        { t: 2, i: 18 },
        { t: 1, i: 4 },
        { t: 1, i: 7 },
        { t: 2, i: 24 },
        { t: 1, i: 17 },
        { t: 2, i: 15 },
        { t: 1, i: 4 },
        { t: 2, i: 18 },
        { t: 1, i: 11 },
        { t: 2, i: 5 },
        { t: 2, i: 18 },
        { t: 1, i: 14 },
        { t: 1, i: 0 },
        { t: 2, i: 22 },
        { t: 1, i: 11 },
        { t: 3, i: 5 },
      ],
    };
    i.charEnlist1 = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ];
    i.charEnlist2 = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    i.charEnlist3 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    i.decryptAES = function (e, t) {
      var i = f(t);
      if (!i || void 0 === n) return !1;
      var o = b(e);
      var a = new Uint8Array(o.buffer, 0, 16);
      i = n.enc.Base64.parse(v(g(i)));
      a = n.enc.Base64.parse(v(a));
      e = new Uint8Array(o.buffer, 16, o.length - 16);
      e = n.enc.Base64.parse(v(e));
      try {
        var r = n.AES.decrypt({ ciphertext: e }, i, {
          iv: a,
          mode: n.mode.CBC,
          padding: n.pad.Pkcs7,
        });
        var s = m(r.words);
        var c = p(s);
        var d = c.indexOf('}');
        if (d != -1) {
          var l = JSON.parse(c.substring(0, d + 1));
          return l;
        } else return !1;
      } catch (u) {
        return !1;
      }
    };
    i.supportLocalUrl = function () {
      return void 0 !== URL && URL.createObjectURL && void 0 !== Blob && void 0 !== Uint8Array;
    };
    i.createLocalUrl = function (e) {
      var t = b(e);
      var n = new Blob([t], { type: 'application/pgp-keys' });
      return URL.createObjectURL(n);
    };
    i.formatM3u8EncryptUrl = function (e) {
      var t = e.k;
      if (!t || !e.videoUrl) return e;
      if (t) {
        var n = i.decryptAES(t, e.v);
        if (!n) throw new Error('decryptAES fail');
        var o = '';
        o = n.k || n.videoDecryptionKey;
        e.videoUrl = E(e.videoUrl, o);
      }
      return e;
    };
    i.secondaryDecrypt = function (e, t, i) {
      e = c(e);
      var o = new Date();
      var a;
      if (i)
        a =
          t.toString().slice(-7) +
          '66' +
          (+o).toString().substr(0, 4) +
          o.getFullYear().toString().slice(-3);
      else a = t.toString().slice(-6) + '66' + (+o).toString().substr(0, 4) + o.getFullYear();
      var r = b(e);
      var s = new Uint8Array(r.buffer, 0, 16);
      a = n.enc.Base64.parse(v(g(a)));
      s = n.enc.Base64.parse(v(s));
      e = new Uint8Array(r.buffer, 16, r.length - 16);
      e = n.enc.Base64.parse(v(e));
      try {
        var l = n.AES.decrypt({ ciphertext: e }, a, {
          iv: s,
          mode: n.mode.CBC,
          padding: n.pad.Pkcs7,
        });
        var u = m(l.words);
        var _ = p(u);
        if (i) {
          var f = _.substr(0, 32);
          return d(f);
        } else return _;
      } catch (h) {
        return !1;
      }
    };
    i.canUseLocalKey = function () {
      return !1;
    };
    return i;
  },
  'beec6201069596ecb83a09e5fc3eb415',
  'fb061c769bfc74628a81f422f590544c',
  '41fccf8c9dca5af1c69f5ef8ac268ce1',
);
