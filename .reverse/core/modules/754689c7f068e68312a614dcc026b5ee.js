EDU('754689c7f068e68312a614dcc026b5ee', function () {
  function e(e) {
    this.mode = l.MODE_8BIT_BYTE;
    this.data = e;
    this.parsedData = [];
    for (var t = 0, n = this.data.length; t < n; t++) {
      var i = [];
      var o = this.data.charCodeAt(t);
      if (o > 65536) {
        i[0] = 240 | ((1835008 & o) >>> 18);
        i[1] = 128 | ((258048 & o) >>> 12);
        i[2] = 128 | ((4032 & o) >>> 6);
        i[3] = 128 | (63 & o);
      } else if (o > 2048) {
        i[0] = 224 | ((61440 & o) >>> 12);
        i[1] = 128 | ((4032 & o) >>> 6);
        i[2] = 128 | (63 & o);
      } else if (o > 128) {
        i[0] = 192 | ((1984 & o) >>> 6);
        i[1] = 128 | (63 & o);
      } else i[0] = o;
      this.parsedData.push(i);
    }
    this.parsedData = Array.prototype.concat.apply([], this.parsedData);
    if (this.parsedData.length != this.data.length) {
      this.parsedData.unshift(191);
      this.parsedData.unshift(187);
      this.parsedData.unshift(239);
    }
  }
  function t(e, t) {
    this.typeNumber = e;
    this.errorCorrectLevel = t;
    this.modules = null;
    this.moduleCount = 0;
    this.dataCache = null;
    this.dataList = [];
  }
  function n(e, t) {
    if (void 0 == e.length) throw new Error(e.length + '/' + t);
    var n = 0;
    for (; n < e.length && 0 == e[n];) n++;
    this.num = new Array(e.length - n + t);
    for (var i = 0; i < e.length - n; i++) this.num[i] = e[i + n];
  }
  function i(e, t) {
    this.totalCount = e;
    this.dataCount = t;
  }
  function o() {
    this.buffer = [];
    this.length = 0;
  }
  function a() {
    return 'undefined' != typeof CanvasRenderingContext2D;
  }
  function r() {
    var e = !1;
    var t = navigator.userAgent;
    if (/android/i.test(t)) {
      e = !0;
      var n = t.toString().match(/android ([0-9]\.[0-9])/i);
      if (n && n[1]) e = parseFloat(n[1]);
    }
    return e;
  }
  function s(e, t) {
    var n = 1;
    var i = c(e);
    for (var o = 0, a = m.length; o <= a; o++) {
      var r = 0;
      switch (t) {
        case u.L:
          r = m[o][0];
          break;
        case u.M:
          r = m[o][1];
          break;
        case u.Q:
          r = m[o][2];
          break;
        case u.H:
          r = m[o][3];
      }
      if (i <= r) break;
      else n++;
    }
    if (n > m.length) throw new Error('Too long data');
    return n;
  }
  function c(e) {
    var t = encodeURI(e)
      .toString()
      .replace(/\%[0-9a-fA-F]{2}/g, 'a');
    return t.length + (t.length != e ? 3 : 0);
  }
  var d;
  e.prototype = {
    getLength: function (e) {
      return this.parsedData.length;
    },
    write: function (e) {
      for (var t = 0, n = this.parsedData.length; t < n; t++) e.put(this.parsedData[t], 8);
    },
  };
  t.prototype = {
    addData: function (t) {
      var n = new e(t);
      this.dataList.push(n);
      this.dataCache = null;
    },
    isDark: function (e, t) {
      if (e < 0 || this.moduleCount <= e || t < 0 || this.moduleCount <= t)
        throw new Error(e + ',' + t);
      return this.modules[e][t];
    },
    getModuleCount: function () {
      return this.moduleCount;
    },
    make: function () {
      this.makeImpl(!1, this.getBestMaskPattern());
    },
    makeImpl: function (e, n) {
      this.moduleCount = 4 * this.typeNumber + 17;
      this.modules = new Array(this.moduleCount);
      for (var i = 0; i < this.moduleCount; i++) {
        this.modules[i] = new Array(this.moduleCount);
        for (var o = 0; o < this.moduleCount; o++) this.modules[i][o] = null;
      }
      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(e, n);
      if (this.typeNumber >= 7) this.setupTypeNumber(e);
      if (null == this.dataCache)
        this.dataCache = t.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
      this.mapData(this.dataCache, n);
    },
    setupPositionProbePattern: function (e, t) {
      for (var n = -1; n <= 7; n++)
        if (!(e + n <= -1 || this.moduleCount <= e + n))
          for (var i = -1; i <= 7; i++)
            if (!(t + i <= -1 || this.moduleCount <= t + i))
              if (
                (0 <= n && n <= 6 && (0 == i || 6 == i)) ||
                (0 <= i && i <= 6 && (0 == n || 6 == n)) ||
                (2 <= n && n <= 4 && 2 <= i && i <= 4)
              )
                this.modules[e + n][t + i] = !0;
              else this.modules[e + n][t + i] = !1;
            else;
        else;
    },
    getBestMaskPattern: function () {
      var e = 0;
      var t = 0;
      for (var n = 0; n < 8; n++) {
        this.makeImpl(!0, n);
        var i = f.getLostPoint(this);
        if (0 == n || e > i) {
          e = i;
          t = n;
        }
      }
      return t;
    },
    createMovieClip: function (e, t, n) {
      var i = e.createEmptyMovieClip(t, n);
      var o = 1;
      this.make();
      for (var a = 0; a < this.modules.length; a++) {
        var r = a * o;
        for (var s = 0; s < this.modules[a].length; s++) {
          var c = s * o;
          var d = this.modules[a][s];
          if (d) {
            i.beginFill(0, 100);
            i.moveTo(c, r);
            i.lineTo(c + o, r);
            i.lineTo(c + o, r + o);
            i.lineTo(c, r + o);
            i.endFill();
          }
        }
      }
      return i;
    },
    setupTimingPattern: function () {
      for (var e = 8; e < this.moduleCount - 8; e++)
        if (null == this.modules[e][6]) this.modules[e][6] = e % 2 == 0;
        else;
      for (var t = 8; t < this.moduleCount - 8; t++)
        if (null == this.modules[6][t]) this.modules[6][t] = t % 2 == 0;
        else;
    },
    setupPositionAdjustPattern: function () {
      var e = f.getPatternPosition(this.typeNumber);
      for (var t = 0; t < e.length; t++)
        for (var n = 0; n < e.length; n++) {
          var i = e[t];
          var o = e[n];
          if (null == this.modules[i][o])
            for (var a = -2; a <= 2; a++)
              for (var r = -2; r <= 2; r++)
                if (a == -2 || 2 == a || r == -2 || 2 == r || (0 == a && 0 == r))
                  this.modules[i + a][o + r] = !0;
                else this.modules[i + a][o + r] = !1;
          else;
        }
    },
    setupTypeNumber: function (e) {
      var t = f.getBCHTypeNumber(this.typeNumber);
      for (var n = 0; n < 18; n++) {
        var i = !e && 1 == ((t >> n) & 1);
        this.modules[Math.floor(n / 3)][(n % 3) + this.moduleCount - 8 - 3] = i;
      }
      for (var n = 0; n < 18; n++) {
        var i = !e && 1 == ((t >> n) & 1);
        this.modules[(n % 3) + this.moduleCount - 8 - 3][Math.floor(n / 3)] = i;
      }
    },
    setupTypeInfo: function (e, t) {
      var n = (this.errorCorrectLevel << 3) | t;
      var i = f.getBCHTypeInfo(n);
      for (var o = 0; o < 15; o++) {
        var a = !e && 1 == ((i >> o) & 1);
        if (o < 6) this.modules[o][8] = a;
        else if (o < 8) this.modules[o + 1][8] = a;
        else this.modules[this.moduleCount - 15 + o][8] = a;
      }
      for (var o = 0; o < 15; o++) {
        var a = !e && 1 == ((i >> o) & 1);
        if (o < 8) this.modules[8][this.moduleCount - o - 1] = a;
        else if (o < 9) this.modules[8][15 - o - 1 + 1] = a;
        else this.modules[8][15 - o - 1] = a;
      }
      this.modules[this.moduleCount - 8][8] = !e;
    },
    mapData: function (e, t) {
      var n = -1;
      var i = this.moduleCount - 1;
      var o = 7;
      var a = 0;
      for (var r = this.moduleCount - 1; r > 0; r -= 2) {
        if (6 == r) r--;
        for (;;) {
          for (var s = 0; s < 2; s++)
            if (null == this.modules[i][r - s]) {
              var c = !1;
              if (a < e.length) c = 1 == ((e[a] >>> o) & 1);
              var d = f.getMask(t, i, r - s);
              if (d) c = !c;
              this.modules[i][r - s] = c;
              o--;
              if (o == -1) {
                a++;
                o = 7;
              }
            }
          i += n;
          if (i < 0 || this.moduleCount <= i) {
            i -= n;
            n = -n;
            break;
          }
        }
      }
    },
  };
  t.PAD0 = 236;
  t.PAD1 = 17;
  t.createData = function (e, n, a) {
    var r = i.getRSBlocks(e, n);
    var s = new o();
    for (var c = 0; c < a.length; c++) {
      var d = a[c];
      s.put(d.mode, 4);
      s.put(d.getLength(), f.getLengthInBits(d.mode, e));
      d.write(s);
    }
    var l = 0;
    for (var c = 0; c < r.length; c++) l += r[c].dataCount;
    if (s.getLengthInBits() > 8 * l)
      throw new Error('code length overflow. (' + s.getLengthInBits() + '>' + 8 * l + ')');
    if (s.getLengthInBits() + 4 <= 8 * l) s.put(0, 4);
    for (; s.getLengthInBits() % 8 != 0;) s.putBit(!1);
    for (;;) {
      if (s.getLengthInBits() >= 8 * l) break;
      s.put(t.PAD0, 8);
      if (s.getLengthInBits() >= 8 * l) break;
      s.put(t.PAD1, 8);
    }
    return t.createBytes(s, r);
  };
  t.createBytes = function (e, t) {
    var i = 0;
    var o = 0;
    var a = 0;
    var r = new Array(t.length);
    var s = new Array(t.length);
    for (var c = 0; c < t.length; c++) {
      var d = t[c].dataCount;
      var l = t[c].totalCount - d;
      o = Math.max(o, d);
      a = Math.max(a, l);
      r[c] = new Array(d);
      for (var u = 0; u < r[c].length; u++) r[c][u] = 255 & e.buffer[u + i];
      i += d;
      var _ = f.getErrorCorrectPolynomial(l);
      var h = new n(r[c], _.getLength() - 1);
      var p = h.mod(_);
      s[c] = new Array(_.getLength() - 1);
      for (var u = 0; u < s[c].length; u++) {
        var m = u + p.getLength() - s[c].length;
        s[c][u] = m >= 0 ? p.get(m) : 0;
      }
    }
    var g = 0;
    for (var u = 0; u < t.length; u++) g += t[u].totalCount;
    var b = new Array(g);
    var v = 0;
    for (var u = 0; u < o; u++)
      for (var c = 0; c < t.length; c++) if (u < r[c].length) b[v++] = r[c][u];
    for (var u = 0; u < a; u++)
      for (var c = 0; c < t.length; c++) if (u < s[c].length) b[v++] = s[c][u];
    return b;
  };
  var l = { MODE_NUMBER: 1, MODE_ALPHA_NUM: 2, MODE_8BIT_BYTE: 4, MODE_KANJI: 8 };
  var u = { L: 1, M: 0, Q: 3, H: 2 };
  var _ = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7,
  };
  var f = {
    PATTERN_POSITION_TABLE: [
      [],
      [6, 18],
      [6, 22],
      [6, 26],
      [6, 30],
      [6, 34],
      [6, 22, 38],
      [6, 24, 42],
      [6, 26, 46],
      [6, 28, 50],
      [6, 30, 54],
      [6, 32, 58],
      [6, 34, 62],
      [6, 26, 46, 66],
      [6, 26, 48, 70],
      [6, 26, 50, 74],
      [6, 30, 54, 78],
      [6, 30, 56, 82],
      [6, 30, 58, 86],
      [6, 34, 62, 90],
      [6, 28, 50, 72, 94],
      [6, 26, 50, 74, 98],
      [6, 30, 54, 78, 102],
      [6, 28, 54, 80, 106],
      [6, 32, 58, 84, 110],
      [6, 30, 58, 86, 114],
      [6, 34, 62, 90, 118],
      [6, 26, 50, 74, 98, 122],
      [6, 30, 54, 78, 102, 126],
      [6, 26, 52, 78, 104, 130],
      [6, 30, 56, 82, 108, 134],
      [6, 34, 60, 86, 112, 138],
      [6, 30, 58, 86, 114, 142],
      [6, 34, 62, 90, 118, 146],
      [6, 30, 54, 78, 102, 126, 150],
      [6, 24, 50, 76, 102, 128, 154],
      [6, 28, 54, 80, 106, 132, 158],
      [6, 32, 58, 84, 110, 136, 162],
      [6, 26, 54, 82, 110, 138, 166],
      [6, 30, 58, 86, 114, 142, 170],
    ],
    G15: 1335,
    G18: 7973,
    G15_MASK: 21522,
    getBCHTypeInfo: function (e) {
      var t = e << 10;
      for (; f.getBCHDigit(t) - f.getBCHDigit(f.G15) >= 0;)
        t ^= f.G15 << (f.getBCHDigit(t) - f.getBCHDigit(f.G15));
      return ((e << 10) | t) ^ f.G15_MASK;
    },
    getBCHTypeNumber: function (e) {
      var t = e << 12;
      for (; f.getBCHDigit(t) - f.getBCHDigit(f.G18) >= 0;)
        t ^= f.G18 << (f.getBCHDigit(t) - f.getBCHDigit(f.G18));
      return (e << 12) | t;
    },
    getBCHDigit: function (e) {
      var t = 0;
      for (; 0 != e;) {
        t++;
        e >>>= 1;
      }
      return t;
    },
    getPatternPosition: function (e) {
      return f.PATTERN_POSITION_TABLE[e - 1];
    },
    getMask: function (e, t, n) {
      switch (e) {
        case _.PATTERN000:
          return (t + n) % 2 == 0;
        case _.PATTERN001:
          return t % 2 == 0;
        case _.PATTERN010:
          return n % 3 == 0;
        case _.PATTERN011:
          return (t + n) % 3 == 0;
        case _.PATTERN100:
          return (Math.floor(t / 2) + Math.floor(n / 3)) % 2 == 0;
        case _.PATTERN101:
          return ((t * n) % 2) + ((t * n) % 3) == 0;
        case _.PATTERN110:
          return (((t * n) % 2) + ((t * n) % 3)) % 2 == 0;
        case _.PATTERN111:
          return (((t * n) % 3) + ((t + n) % 2)) % 2 == 0;
        default:
          throw new Error('bad maskPattern:' + e);
      }
    },
    getErrorCorrectPolynomial: function (e) {
      var t = new n([1], 0);
      for (var i = 0; i < e; i++) t = t.multiply(new n([1, h.gexp(i)], 0));
      return t;
    },
    getLengthInBits: function (e, t) {
      if (1 <= t && t < 10)
        switch (e) {
          case l.MODE_NUMBER:
            return 10;
          case l.MODE_ALPHA_NUM:
            return 9;
          case l.MODE_8BIT_BYTE:
            return 8;
          case l.MODE_KANJI:
            return 8;
          default:
            throw new Error('mode:' + e);
        }
      else if (t < 27)
        switch (e) {
          case l.MODE_NUMBER:
            return 12;
          case l.MODE_ALPHA_NUM:
            return 11;
          case l.MODE_8BIT_BYTE:
            return 16;
          case l.MODE_KANJI:
            return 10;
          default:
            throw new Error('mode:' + e);
        }
      else if (t < 41)
        switch (e) {
          case l.MODE_NUMBER:
            return 14;
          case l.MODE_ALPHA_NUM:
            return 13;
          case l.MODE_8BIT_BYTE:
            return 16;
          case l.MODE_KANJI:
            return 12;
          default:
            throw new Error('mode:' + e);
        }
      else throw new Error('type:' + t);
    },
    getLostPoint: function (e) {
      var t = e.getModuleCount();
      var n = 0;
      for (var i = 0; i < t; i++)
        for (var o = 0; o < t; o++) {
          var a = 0;
          var r = e.isDark(i, o);
          for (var s = -1; s <= 1; s++)
            if (!(i + s < 0 || t <= i + s))
              for (var c = -1; c <= 1; c++)
                if (!(o + c < 0 || t <= o + c))
                  if (0 != s || 0 != c) {
                    if (r == e.isDark(i + s, o + c)) a++;
                  } else;
                else;
            else;
          if (a > 5) n += 3 + a - 5;
        }
      for (var i = 0; i < t - 1; i++)
        for (var o = 0; o < t - 1; o++) {
          var d = 0;
          if (e.isDark(i, o)) d++;
          if (e.isDark(i + 1, o)) d++;
          if (e.isDark(i, o + 1)) d++;
          if (e.isDark(i + 1, o + 1)) d++;
          if (0 == d || 4 == d) n += 3;
        }
      for (var i = 0; i < t; i++)
        for (var o = 0; o < t - 6; o++)
          if (
            e.isDark(i, o) &&
            !e.isDark(i, o + 1) &&
            e.isDark(i, o + 2) &&
            e.isDark(i, o + 3) &&
            e.isDark(i, o + 4) &&
            !e.isDark(i, o + 5) &&
            e.isDark(i, o + 6)
          )
            n += 40;
      for (var o = 0; o < t; o++)
        for (var i = 0; i < t - 6; i++)
          if (
            e.isDark(i, o) &&
            !e.isDark(i + 1, o) &&
            e.isDark(i + 2, o) &&
            e.isDark(i + 3, o) &&
            e.isDark(i + 4, o) &&
            !e.isDark(i + 5, o) &&
            e.isDark(i + 6, o)
          )
            n += 40;
      var l = 0;
      for (var o = 0; o < t; o++) for (var i = 0; i < t; i++) if (e.isDark(i, o)) l++;
      var u = Math.abs((100 * l) / t / t - 50) / 5;
      n += 10 * u;
      return n;
    },
  };
  var h = {
    glog: function (e) {
      if (e < 1) throw new Error('glog(' + e + ')');
      return h.LOG_TABLE[e];
    },
    gexp: function (e) {
      for (; e < 0;) e += 255;
      for (; e >= 256;) e -= 255;
      return h.EXP_TABLE[e];
    },
    EXP_TABLE: new Array(256),
    LOG_TABLE: new Array(256),
  };
  for (var p = 0; p < 8; p++) h.EXP_TABLE[p] = 1 << p;
  for (var p = 8; p < 256; p++)
    h.EXP_TABLE[p] =
      h.EXP_TABLE[p - 4] ^ h.EXP_TABLE[p - 5] ^ h.EXP_TABLE[p - 6] ^ h.EXP_TABLE[p - 8];
  for (var p = 0; p < 255; p++) h.LOG_TABLE[h.EXP_TABLE[p]] = p;
  n.prototype = {
    get: function (e) {
      return this.num[e];
    },
    getLength: function () {
      return this.num.length;
    },
    multiply: function (e) {
      var t = new Array(this.getLength() + e.getLength() - 1);
      for (var i = 0; i < this.getLength(); i++)
        for (var o = 0; o < e.getLength(); o++)
          t[i + o] ^= h.gexp(h.glog(this.get(i)) + h.glog(e.get(o)));
      return new n(t, 0);
    },
    mod: function (e) {
      if (this.getLength() - e.getLength() < 0) return this;
      var t = h.glog(this.get(0)) - h.glog(e.get(0));
      var i = new Array(this.getLength());
      for (var o = 0; o < this.getLength(); o++) i[o] = this.get(o);
      for (var o = 0; o < e.getLength(); o++) i[o] ^= h.gexp(h.glog(e.get(o)) + t);
      return new n(i, 0).mod(e);
    },
  };
  i.RS_BLOCK_TABLE = [
    [1, 26, 19],
    [1, 26, 16],
    [1, 26, 13],
    [1, 26, 9],
    [1, 44, 34],
    [1, 44, 28],
    [1, 44, 22],
    [1, 44, 16],
    [1, 70, 55],
    [1, 70, 44],
    [2, 35, 17],
    [2, 35, 13],
    [1, 100, 80],
    [2, 50, 32],
    [2, 50, 24],
    [4, 25, 9],
    [1, 134, 108],
    [2, 67, 43],
    [2, 33, 15, 2, 34, 16],
    [2, 33, 11, 2, 34, 12],
    [2, 86, 68],
    [4, 43, 27],
    [4, 43, 19],
    [4, 43, 15],
    [2, 98, 78],
    [4, 49, 31],
    [2, 32, 14, 4, 33, 15],
    [4, 39, 13, 1, 40, 14],
    [2, 121, 97],
    [2, 60, 38, 2, 61, 39],
    [4, 40, 18, 2, 41, 19],
    [4, 40, 14, 2, 41, 15],
    [2, 146, 116],
    [3, 58, 36, 2, 59, 37],
    [4, 36, 16, 4, 37, 17],
    [4, 36, 12, 4, 37, 13],
    [2, 86, 68, 2, 87, 69],
    [4, 69, 43, 1, 70, 44],
    [6, 43, 19, 2, 44, 20],
    [6, 43, 15, 2, 44, 16],
    [4, 101, 81],
    [1, 80, 50, 4, 81, 51],
    [4, 50, 22, 4, 51, 23],
    [3, 36, 12, 8, 37, 13],
    [2, 116, 92, 2, 117, 93],
    [6, 58, 36, 2, 59, 37],
    [4, 46, 20, 6, 47, 21],
    [7, 42, 14, 4, 43, 15],
    [4, 133, 107],
    [8, 59, 37, 1, 60, 38],
    [8, 44, 20, 4, 45, 21],
    [12, 33, 11, 4, 34, 12],
    [3, 145, 115, 1, 146, 116],
    [4, 64, 40, 5, 65, 41],
    [11, 36, 16, 5, 37, 17],
    [11, 36, 12, 5, 37, 13],
    [5, 109, 87, 1, 110, 88],
    [5, 65, 41, 5, 66, 42],
    [5, 54, 24, 7, 55, 25],
    [11, 36, 12],
    [5, 122, 98, 1, 123, 99],
    [7, 73, 45, 3, 74, 46],
    [15, 43, 19, 2, 44, 20],
    [3, 45, 15, 13, 46, 16],
    [1, 135, 107, 5, 136, 108],
    [10, 74, 46, 1, 75, 47],
    [1, 50, 22, 15, 51, 23],
    [2, 42, 14, 17, 43, 15],
    [5, 150, 120, 1, 151, 121],
    [9, 69, 43, 4, 70, 44],
    [17, 50, 22, 1, 51, 23],
    [2, 42, 14, 19, 43, 15],
    [3, 141, 113, 4, 142, 114],
    [3, 70, 44, 11, 71, 45],
    [17, 47, 21, 4, 48, 22],
    [9, 39, 13, 16, 40, 14],
    [3, 135, 107, 5, 136, 108],
    [3, 67, 41, 13, 68, 42],
    [15, 54, 24, 5, 55, 25],
    [15, 43, 15, 10, 44, 16],
    [4, 144, 116, 4, 145, 117],
    [17, 68, 42],
    [17, 50, 22, 6, 51, 23],
    [19, 46, 16, 6, 47, 17],
    [2, 139, 111, 7, 140, 112],
    [17, 74, 46],
    [7, 54, 24, 16, 55, 25],
    [34, 37, 13],
    [4, 151, 121, 5, 152, 122],
    [4, 75, 47, 14, 76, 48],
    [11, 54, 24, 14, 55, 25],
    [16, 45, 15, 14, 46, 16],
    [6, 147, 117, 4, 148, 118],
    [6, 73, 45, 14, 74, 46],
    [11, 54, 24, 16, 55, 25],
    [30, 46, 16, 2, 47, 17],
    [8, 132, 106, 4, 133, 107],
    [8, 75, 47, 13, 76, 48],
    [7, 54, 24, 22, 55, 25],
    [22, 45, 15, 13, 46, 16],
    [10, 142, 114, 2, 143, 115],
    [19, 74, 46, 4, 75, 47],
    [28, 50, 22, 6, 51, 23],
    [33, 46, 16, 4, 47, 17],
    [8, 152, 122, 4, 153, 123],
    [22, 73, 45, 3, 74, 46],
    [8, 53, 23, 26, 54, 24],
    [12, 45, 15, 28, 46, 16],
    [3, 147, 117, 10, 148, 118],
    [3, 73, 45, 23, 74, 46],
    [4, 54, 24, 31, 55, 25],
    [11, 45, 15, 31, 46, 16],
    [7, 146, 116, 7, 147, 117],
    [21, 73, 45, 7, 74, 46],
    [1, 53, 23, 37, 54, 24],
    [19, 45, 15, 26, 46, 16],
    [5, 145, 115, 10, 146, 116],
    [19, 75, 47, 10, 76, 48],
    [15, 54, 24, 25, 55, 25],
    [23, 45, 15, 25, 46, 16],
    [13, 145, 115, 3, 146, 116],
    [2, 74, 46, 29, 75, 47],
    [42, 54, 24, 1, 55, 25],
    [23, 45, 15, 28, 46, 16],
    [17, 145, 115],
    [10, 74, 46, 23, 75, 47],
    [10, 54, 24, 35, 55, 25],
    [19, 45, 15, 35, 46, 16],
    [17, 145, 115, 1, 146, 116],
    [14, 74, 46, 21, 75, 47],
    [29, 54, 24, 19, 55, 25],
    [11, 45, 15, 46, 46, 16],
    [13, 145, 115, 6, 146, 116],
    [14, 74, 46, 23, 75, 47],
    [44, 54, 24, 7, 55, 25],
    [59, 46, 16, 1, 47, 17],
    [12, 151, 121, 7, 152, 122],
    [12, 75, 47, 26, 76, 48],
    [39, 54, 24, 14, 55, 25],
    [22, 45, 15, 41, 46, 16],
    [6, 151, 121, 14, 152, 122],
    [6, 75, 47, 34, 76, 48],
    [46, 54, 24, 10, 55, 25],
    [2, 45, 15, 64, 46, 16],
    [17, 152, 122, 4, 153, 123],
    [29, 74, 46, 14, 75, 47],
    [49, 54, 24, 10, 55, 25],
    [24, 45, 15, 46, 46, 16],
    [4, 152, 122, 18, 153, 123],
    [13, 74, 46, 32, 75, 47],
    [48, 54, 24, 14, 55, 25],
    [42, 45, 15, 32, 46, 16],
    [20, 147, 117, 4, 148, 118],
    [40, 75, 47, 7, 76, 48],
    [43, 54, 24, 22, 55, 25],
    [10, 45, 15, 67, 46, 16],
    [19, 148, 118, 6, 149, 119],
    [18, 75, 47, 31, 76, 48],
    [34, 54, 24, 34, 55, 25],
    [20, 45, 15, 61, 46, 16],
  ];
  i.getRSBlocks = function (e, t) {
    var n = i.getRsBlockTable(e, t);
    if (void 0 == n) throw new Error('bad rs block @ typeNumber:' + e + '/errorCorrectLevel:' + t);
    var o = n.length / 3;
    var a = [];
    for (var r = 0; r < o; r++) {
      var s = n[3 * r + 0];
      var c = n[3 * r + 1];
      var d = n[3 * r + 2];
      for (var l = 0; l < s; l++) a.push(new i(c, d));
    }
    return a;
  };
  i.getRsBlockTable = function (e, t) {
    switch (t) {
      case u.L:
        return i.RS_BLOCK_TABLE[4 * (e - 1) + 0];
      case u.M:
        return i.RS_BLOCK_TABLE[4 * (e - 1) + 1];
      case u.Q:
        return i.RS_BLOCK_TABLE[4 * (e - 1) + 2];
      case u.H:
        return i.RS_BLOCK_TABLE[4 * (e - 1) + 3];
      default:
        return;
    }
  };
  o.prototype = {
    get: function (e) {
      var t = Math.floor(e / 8);
      return 1 == ((this.buffer[t] >>> (7 - (e % 8))) & 1);
    },
    put: function (e, t) {
      for (var n = 0; n < t; n++) this.putBit(1 == ((e >>> (t - n - 1)) & 1));
    },
    getLengthInBits: function () {
      return this.length;
    },
    putBit: function (e) {
      var t = Math.floor(this.length / 8);
      if (this.buffer.length <= t) this.buffer.push(0);
      if (e) this.buffer[t] |= 128 >>> (this.length % 8);
      this.length++;
    },
  };
  var m = [
    [17, 14, 11, 7],
    [32, 26, 20, 14],
    [53, 42, 32, 24],
    [78, 62, 46, 34],
    [106, 84, 60, 44],
    [134, 106, 74, 58],
    [154, 122, 86, 64],
    [192, 152, 108, 84],
    [230, 180, 130, 98],
    [271, 213, 151, 119],
    [321, 251, 177, 137],
    [367, 287, 203, 155],
    [425, 331, 241, 177],
    [458, 362, 258, 194],
    [520, 412, 292, 220],
    [586, 450, 322, 250],
    [644, 504, 364, 280],
    [718, 560, 394, 310],
    [792, 624, 442, 338],
    [858, 666, 482, 382],
    [929, 711, 509, 403],
    [1003, 779, 565, 439],
    [1091, 857, 611, 461],
    [1171, 911, 661, 511],
    [1273, 997, 715, 535],
    [1367, 1059, 751, 593],
    [1465, 1125, 805, 625],
    [1528, 1190, 868, 658],
    [1628, 1264, 908, 698],
    [1732, 1370, 982, 742],
    [1840, 1452, 1030, 790],
    [1952, 1538, 1112, 842],
    [2068, 1628, 1168, 898],
    [2188, 1722, 1228, 958],
    [2303, 1809, 1283, 983],
    [2431, 1911, 1351, 1051],
    [2563, 1989, 1423, 1093],
    [2699, 2099, 1499, 1139],
    [2809, 2213, 1579, 1219],
    [2953, 2331, 1663, 1273],
  ];
  var g = (function () {
    var e = function (e, t) {
      this._el = e;
      this._htOption = t;
    };
    e.prototype.draw = function (e) {
      function t(e, t) {
        var n = document.createElementNS('http://www.w3.org/2000/svg', e);
        for (var i in t) if (t.hasOwnProperty(i)) n.setAttribute(i, t[i]);
        return n;
      }
      var n = this._htOption;
      var i = this._el;
      var o = e.getModuleCount();
      var a = Math.floor(n.width / o);
      var r = Math.floor(n.height / o);
      this.clear();
      var s = t('svg', {
        viewBox: '0 0 ' + String(o) + ' ' + String(o),
        width: '100%',
        height: '100%',
        fill: n.colorLight,
      });
      s.setAttributeNS(
        'http://www.w3.org/2000/xmlns/',
        'xmlns:xlink',
        'http://www.w3.org/1999/xlink',
      );
      i.appendChild(s);
      s.appendChild(t('rect', { fill: n.colorLight, width: '100%', height: '100%' }));
      s.appendChild(t('rect', { fill: n.colorDark, width: '1', height: '1', id: 'template' }));
      for (var c = 0; c < o; c++)
        for (var d = 0; d < o; d++)
          if (e.isDark(c, d)) {
            var l = t('use', { x: String(d), y: String(c) });
            l.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#template');
            s.appendChild(l);
          }
    };
    e.prototype.clear = function () {
      for (; this._el.hasChildNodes();) this._el.removeChild(this._el.lastChild);
    };
    return e;
  })();
  var b = 'svg' === document.documentElement.tagName.toLowerCase();
  var v = b
    ? g
    : !a()
      ? (function () {
          var e = function (e, t) {
            this._el = e;
            this._htOption = t;
          };
          e.prototype.draw = function (e) {
            var t = this._htOption;
            var n = this._el;
            var i = e.getModuleCount();
            var o = Math.floor(t.width / i);
            var a = Math.floor(t.height / i);
            var r = ['<table style="border:0;border-collapse:collapse;">'];
            for (var s = 0; s < i; s++) {
              r.push('<tr>');
              for (var c = 0; c < i; c++)
                r.push(
                  '<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' +
                    o +
                    'px;height:' +
                    a +
                    'px;background-color:' +
                    (e.isDark(s, c) ? t.colorDark : t.colorLight) +
                    ';"></td>',
                );
              r.push('</tr>');
            }
            r.push('</table>');
            n.innerHTML = r.join('');
            var d = n.childNodes[0];
            var l = (t.width - d.offsetWidth) / 2;
            var u = (t.height - d.offsetHeight) / 2;
            if (l > 0 && u > 0) d.style.margin = u + 'px ' + l + 'px';
          };
          e.prototype.clear = function () {
            this._el.innerHTML = '';
          };
          return e;
        })()
      : (function () {
          function e() {
            this._elImage.src = this._elCanvas.toDataURL('image/png');
            this._elImage.style.display = 'block';
            this._elCanvas.style.display = 'none';
          }
          function t(e, t) {
            var n = this;
            n._fFail = t;
            n._fSuccess = e;
            if (null !== n._bSupportDataURI) {
              if (n._bSupportDataURI === !0 && n._fSuccess) n._fSuccess.call(n);
              else if (n._bSupportDataURI === !1 && n._fFail) n._fFail.call(n);
            } else {
              var i = document.createElement('img');
              var o = function () {
                n._bSupportDataURI = !1;
                if (n._fFail) n._fFail.call(n);
              };
              var a = function () {
                n._bSupportDataURI = !0;
                if (n._fSuccess) n._fSuccess.call(n);
              };
              i.onabort = o;
              i.onerror = o;
              i.onload = a;
              i.src =
                'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
            }
          }
          if (this._android && this._android <= 2.1) {
            var n = 1 / window.devicePixelRatio;
            var i = CanvasRenderingContext2D.prototype.drawImage;
            CanvasRenderingContext2D.prototype.drawImage = function (e, t, o, a, r, s, c, d, l) {
              if ('nodeName' in e && /img/i.test(e.nodeName))
                for (var u = arguments.length - 1; u >= 1; u--) arguments[u] = arguments[u] * n;
              else if ('undefined' == typeof d) {
                arguments[1] *= n;
                arguments[2] *= n;
                arguments[3] *= n;
                arguments[4] *= n;
              }
              i.apply(this, arguments);
            };
          }
          var o = function (e, t) {
            this._bIsPainted = !1;
            this._android = r();
            this._htOption = t;
            this._elCanvas = document.createElement('canvas');
            this._elCanvas.width = t.width;
            this._elCanvas.height = t.height;
            e.appendChild(this._elCanvas);
            this._el = e;
            this._oContext = this._elCanvas.getContext('2d');
            this._bIsPainted = !1;
            this._elImage = document.createElement('img');
            this._elImage.alt = 'Scan me!';
            this._elImage.style.display = 'none';
            this._el.appendChild(this._elImage);
            this._bSupportDataURI = null;
          };
          o.prototype.draw = function (e) {
            var t = this._elImage;
            var n = this._oContext;
            var i = this._htOption;
            var o = e.getModuleCount();
            var a = i.width / o;
            var r = i.height / o;
            var s = Math.round(a);
            var c = Math.round(r);
            t.style.display = 'none';
            this.clear();
            for (var d = 0; d < o; d++)
              for (var l = 0; l < o; l++) {
                var u = e.isDark(d, l);
                var _ = l * a;
                var f = d * r;
                n.strokeStyle = u ? i.colorDark : i.colorLight;
                n.lineWidth = 1;
                n.fillStyle = u ? i.colorDark : i.colorLight;
                n.fillRect(_, f, a, r);
                n.strokeRect(Math.floor(_) + 0.5, Math.floor(f) + 0.5, s, c);
                n.strokeRect(Math.ceil(_) - 0.5, Math.ceil(f) - 0.5, s, c);
              }
            this._bIsPainted = !0;
          };
          o.prototype.makeImage = function () {
            if (this._bIsPainted) t.call(this, e);
          };
          o.prototype.isPainted = function () {
            return this._bIsPainted;
          };
          o.prototype.clear = function () {
            this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height);
            this._bIsPainted = !1;
          };
          o.prototype.round = function (e) {
            if (!e) return e;
            else return Math.floor(1e3 * e) / 1e3;
          };
          return o;
        })();
  d = function (e, t) {
    this._htOption = {
      width: 256,
      height: 256,
      typeNumber: 4,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: u.H,
    };
    if ('string' == typeof t) t = { text: t };
    if (t) for (var n in t) this._htOption[n] = t[n];
    if ('string' == typeof e) e = document.getElementById(e);
    if (this._htOption.useSVG) v = g;
    this._android = r();
    this._el = e;
    this._oQRCode = null;
    this._oDrawing = new v(this._el, this._htOption);
    if (this._htOption.text) this.makeCode(this._htOption.text);
  };
  d.prototype.makeCode = function (e) {
    this._oQRCode = new t(s(e, this._htOption.correctLevel), this._htOption.correctLevel);
    this._oQRCode.addData(e);
    this._oQRCode.make();
    this._el.title = e;
    this._oDrawing.draw(this._oQRCode);
    this.makeImage();
  };
  d.prototype.makeImage = function () {
    if ('function' == typeof this._oDrawing.makeImage && (!this._android || this._android >= 3))
      this._oDrawing.makeImage();
  };
  d.prototype.clear = function () {
    this._oDrawing.clear();
  };
  d.CorrectLevel = u;
  return d;
});
