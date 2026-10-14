EDU(
  '2f0d90ee16c9f7791ed2368f46a5afd0',
  function (e) {
    !(function () {
      var t = e;
      var n = t.lib;
      var i = n.WordArray;
      var o = n.Hasher;
      var a = t.algo;
      var r = [];
      var s = (a.SHA1 = o.extend({
        _doReset: function () {
          this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
        },
        _doProcessBlock: function (e, t) {
          var n = this._hash.words;
          var i = n[0];
          var o = n[1];
          var a = n[2];
          var s = n[3];
          var c = n[4];
          for (var d = 0; d < 80; d++) {
            if (d < 16) r[d] = 0 | e[t + d];
            else {
              var l = r[d - 3] ^ r[d - 8] ^ r[d - 14] ^ r[d - 16];
              r[d] = (l << 1) | (l >>> 31);
            }
            var u = ((i << 5) | (i >>> 27)) + c + r[d];
            if (d < 20) u += ((o & a) | (~o & s)) + 1518500249;
            else if (d < 40) u += (o ^ a ^ s) + 1859775393;
            else if (d < 60) u += ((o & a) | (o & s) | (a & s)) - 1894007588;
            else u += (o ^ a ^ s) - 899497514;
            c = s;
            s = a;
            a = (o << 30) | (o >>> 2);
            o = i;
            i = u;
          }
          n[0] = (n[0] + i) | 0;
          n[1] = (n[1] + o) | 0;
          n[2] = (n[2] + a) | 0;
          n[3] = (n[3] + s) | 0;
          n[4] = (n[4] + c) | 0;
        },
        _doFinalize: function () {
          var e = this._data;
          var t = e.words;
          var n = 8 * this._nDataBytes;
          var i = 8 * e.sigBytes;
          t[i >>> 5] |= 128 << (24 - (i % 32));
          t[(((i + 64) >>> 9) << 4) + 14] = Math.floor(n / 4294967296);
          t[(((i + 64) >>> 9) << 4) + 15] = n;
          e.sigBytes = 4 * t.length;
          this._process();
          return this._hash;
        },
        clone: function () {
          var e = o.clone.call(this);
          e._hash = this._hash.clone();
          return e;
        },
      }));
      t.SHA1 = o._createHelper(s);
      t.HmacSHA1 = o._createHmacHelper(s);
    })();
    return e.SHA1;
  },
  '45e5d1458815a61a6a2e55fc79eeac61',
);
