EDU(
  '8dc6fc34d3885aa740822e6f40f67cbb',
  function (e, t, n, i, o, a, r, s) {
    var c;
    o._$$AnimBezier = t._$klass();
    c = o._$$AnimBezier._$extend(i._$$Animation);
    c.__reset = function (e) {
      this.__super(e);
      this.__duration = e.duration || 200;
      this.__epsilon = 1 / (200 * this.__duration);
      this.__doParseTiming(e.timing);
      this.__doCalPolynomialCoefficients();
    };
    c.__destroy = function () {
      this.__super();
      delete this.__pointer;
      delete this.__coefficient;
    };
    c.__doParseTiming = (function () {
      var e = /^cubic\-bezier\((.*?)\)$/i,
        t = /\s*,\s*/i,
        i = {
          linear: [0, 0, 1, 1],
          ease: [0.25, 0.1, 0.25, 1],
          easein: [0.42, 0, 1, 1],
          easeout: [0, 0, 0.58, 1],
          easeinout: [0, 0, 0.58, 1],
        };
      var o = function (e, t, n) {
        n[t] = parseFloat(e);
      };
      return function (a) {
        a = (a || '').toLowerCase();
        this.__pointer = i[a];
        if (e.test(a)) {
          this.__pointer = RegExp.$1.split(t);
          n._$forEach(this.__pointer, o);
        }
        if (!this.__pointer) this.__pointer = i.ease;
      };
    })();
    c.__doCalPolynomialCoefficients = function () {
      var e = this.__pointer,
        t = 3 * e[0],
        n = 3 * (e[2] - e[0]) - t,
        i = 1 - t - n,
        o = 3 * e[1],
        a = 3 * (e[3] - e[1]) - o,
        r = 1 - o - a;
      this.__coefficient = { ax: i, ay: r, bx: n, by: a, cx: t, cy: o };
    };
    c.__doCalCubicBezierAtTime = (function () {
      var e = function (e, t) {
        return ((t.ax * e + t.bx) * e + t.cx) * e;
      };
      var t = function (e, t) {
        return ((t.ay * e + t.by) * e + t.cy) * e;
      };
      var n = function (e, t) {
        return (3 * t.ax * e + 2 * t.bx) * e + t.cx;
      };
      var i = function (t, i, o) {
        var a, r, s, c, d, l;
        for (s = t, l = 0; l < 8; l++) {
          c = e(s, o) - t;
          if (Math.abs(c) < i) return s;
          d = n(s, o);
          if (Math.abs(d) < 1e-6) break;
          s -= c / d;
        }
        a = 0;
        r = 1;
        s = t;
        if (s < a) return a;
        if (s > r) return r;
        for (; a < r;) {
          c = e(s, o);
          if (Math.abs(c - t) < i) return s;
          if (t > c) a = s;
          else r = s;
          s = 0.5 * (r - a) + a;
        }
        return s;
      };
      return function (e) {
        return t(i(e / this.__duration, this.__epsilon, this.__coefficient), this.__coefficient);
      };
    })();
    c.__doAnimationFrame = function (e) {
      var t = e - this.__begin.time,
        i = this.__doCalCubicBezierAtTime(t),
        o = n._$fixed(this.__begin.offset * (1 - i) + this.__end.offset * i, 2),
        a = !1;
      if (t >= this.__duration) {
        o = this.__end.offset;
        a = !0;
      }
      this._$dispatchEvent('onupdate', { offset: 1 * o });
      return a;
    };
    c._$stop = function () {
      this._$dispatchEvent('onupdate', { offset: this.__end.offset });
      this.__super();
    };
    if (!0) e.copy(e.P('nej.ut'), o);
    return o;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  'fe86216ed59e3103a56c42c850d389f0',
  'bdd09c3449ddcecf9043ccd822a2b16f',
);
