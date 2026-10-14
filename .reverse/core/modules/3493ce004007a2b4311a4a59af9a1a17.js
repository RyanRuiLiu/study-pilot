EDU(
  '3493ce004007a2b4311a4a59af9a1a17',
  function (e) {
    if ('undefined' != typeof module && module.exports) e = require('bowser');
    if (!Object.keys)
      Object.keys = (function () {
        var e = Object.prototype.hasOwnProperty,
          t = !{ toString: null }.propertyIsEnumerable('toString'),
          n = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor',
          ],
          i = n.length;
        return function (o) {
          if ('object' != typeof o && ('function' != typeof o || null === o))
            throw new TypeError('Object.keys called on non-object');
          var a = [],
            r,
            s;
          for (r in o) if (e.call(o, r)) a.push(r);
          if (t) for (s = 0; s < i; s++) if (e.call(o, n[s])) a.push(n[s]);
          return a;
        };
      })();
    if ('function' != typeof Object.create)
      Object.create = (function () {
        function e() {}
        var t = Object.prototype.hasOwnProperty;
        return function (n) {
          if ('object' != typeof n)
            throw TypeError('Object prototype may only be an Object or null');
          e.prototype = n;
          var i = new e();
          e.prototype = null;
          if (arguments.length > 1) {
            var o = Object(arguments[1]);
            for (var a in o) if (t.call(o, a)) i[a] = o[a];
          }
          return i;
        };
      })();
    if (!Array.prototype.map)
      Array.prototype.map = function (e, t) {
        var n, i, o;
        if (null == this) throw new TypeError('This is null or not defined');
        var a = Object(this);
        var r = a.length >>> 0;
        if ('function' != typeof e) throw new TypeError(e + ' is not a function');
        if (arguments.length > 1) n = t;
        i = new Array(r);
        o = 0;
        for (; o < r;) {
          var s, c;
          if (o in a) {
            s = a[o];
            c = e.call(n, s, o, a);
            i[o] = c;
          }
          o++;
        }
        return i;
      };
    if (!Array.prototype.find)
      Array.prototype.find = function (e) {
        if (null === this) throw new TypeError('Array.prototype.find called on null or undefined');
        if ('function' != typeof e) throw new TypeError('predicate must be a function');
        var t = Object(this);
        var n = t.length >>> 0;
        var i = arguments[1];
        var o;
        for (var a = 0; a < n; a++) {
          o = t[a];
          if (e.call(i, o, a, t)) return o;
        }
      };
    if (e.msie && e.version <= 8) {
      var t;
      t =
        t ||
        (function (e) {
          var t = String.prototype.split,
            n = /()??/.exec('')[1] === e,
            i;
          i = function (i, o, a) {
            if ('[object RegExp]' !== Object.prototype.toString.call(o)) return t.call(i, o, a);
            var r = [],
              s =
                (o.ignoreCase ? 'i' : '') +
                (o.multiline ? 'm' : '') +
                (o.extended ? 'x' : '') +
                (o.sticky ? 'y' : ''),
              c = 0,
              o = new RegExp(o.source, s + 'g'),
              d,
              l,
              u,
              _;
            i += '';
            if (!n) d = new RegExp('^' + o.source + '$(?!\\s)', s);
            a = a === e ? -1 >>> 0 : a >>> 0;
            for (; (l = o.exec(i));) {
              u = l.index + l[0].length;
              if (u > c) {
                r.push(i.slice(c, l.index));
                if (!n && l.length > 1)
                  l[0].replace(d, function () {
                    for (var t = 1; t < arguments.length - 2; t++) if (arguments[t] === e) l[t] = e;
                  });
                if (l.length > 1 && l.index < i.length) Array.prototype.push.apply(r, l.slice(1));
                _ = l[0].length;
                c = u;
                if (r.length >= a) break;
              }
              if (o.lastIndex === l.index) o.lastIndex++;
            }
            if (c === i.length) {
              if (_ || !o.test('')) r.push('');
            } else r.push(i.slice(c));
            return r.length > a ? r.slice(0, a) : r;
          };
          String.prototype.split = function (e, t) {
            return i(this, e, t);
          };
          return i;
        })();
    }
    var n = function (e) {
      e = e.split(' ');
      var t = e[0].split('-');
      var n = e[1] ? e[1].split(':') : [];
      var i = new Date();
      i.setFullYear(t[0]);
      i.setMonth(t[1] - 1);
      i.setDate(t[2]);
      i.setHours(n[0] || 0);
      i.setMinutes(n[1] || 0);
      i.setSeconds(n[2] || 0);
      return i;
    };
    return n;
  },
  '70dc37c0ea9dd2b3688f2eac79178cd8',
);
