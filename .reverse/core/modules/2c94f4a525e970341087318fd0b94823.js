EDU(
  '2c94f4a525e970341087318fd0b94823',
  function (e, t) {
    var n = {},
      i = (function () {
        return this;
      })();
    n._$deepCopy = function (e) {
      if (null == e) return null;
      if ('object' != typeof e) return e;
      var t = {};
      if (e instanceof Date) {
        t = new Date();
        t.setTime(e.getTime());
        return t;
      }
      if (e.constructor == Array) t = [];
      for (var n in e) t[n] = arguments.callee(e[n]);
      return t;
    };
    n._$deepCleanObj = function o(e) {
      if ('[object Object]' !== Object.prototype.toString.call(e)) return e;
      var t = {};
      for (var n in e) if (e.hasOwnProperty(n) && null != e[n]) t[n] = this._$deepCleanObj(e[n]);
      return t;
    };
    n._$convertToJSONHex = function (e) {
      return '###' + t._$str2hex(JSON.stringify(e || {}));
    };
    n._$isEmptyObject = function (e) {
      for (var t in e) if (e.hasOwnProperty(t)) return !1;
      return !0;
    };
    n._$pick = function (e, t) {
      var i = {};
      var o = ' as ';
      var a = '{';
      var r = /(\w+)\s*\{\s*([\w.]+)\s*}/g;
      var s, c, d, l, u;
      for (var _ = 0; _ < t.length; _++) {
        s = t[_];
        if (s.indexOf(o) > 0) u = s.split(o);
        else if (s.indexOf(a) > 0)
          s.replace(r, function (e, t, n) {
            u = [n, t];
          });
        if (u) {
          if (u.length < 2) throw new Error('Params Error:there is no attr-path or key here!');
          l = u[0].trim();
          s = u[1].trim();
          c = n._$deepGet(l, e);
          i[s] = c;
        } else if (e.hasOwnProperty(s)) i[s] = e[s];
      }
      return i;
    };
    n._$deepGet = (function () {
      var e = function (t, n) {
        var i = t.indexOf('.');
        var o = t.slice(0, i);
        var a = t.slice(i + 1);
        var r = n[o];
        if (i === -1) return n[t];
        else return e(a, r);
      };
      return e;
    })();
    n._$get = function a(e, t, n) {
      var i, o, r, s, c, d, l;
      if ('this' === t) return this && this.valueOf ? this.valueOf() : this;
      if (null == e) return n;
      s = t.indexOf('.');
      c = t.indexOf('[');
      if (s > -1 && (c <= -1 || (c > -1 && s < c))) {
        i = t.slice(0, s);
        o = t.slice(s + 1);
        r = 'this' === i ? this : e[i];
        return a.call(this, r, o, n);
      }
      if (c > -1 && (s <= -1 || (s > -1 && c < s))) {
        d = c;
        l = t.indexOf(']');
        if (0 === d) {
          i = t.substring(d + 1, l);
          o = t.slice(l + 2);
          r = 'this' === i ? this : e[i];
          return a.call(this, r, o, n);
        }
        if (d > 0) {
          i = t.slice(0, d);
          o = t.slice(d);
          r = 'this' === i ? this : e[i];
          return a.call(this, r, o, n);
        }
      }
      return e[t] || n;
    };
    return n;
  },
  'a7d1128d22219f1def1727e67cfa7d44',
  'af8805404cc0bd2b95d3d3c9573484b1',
);
