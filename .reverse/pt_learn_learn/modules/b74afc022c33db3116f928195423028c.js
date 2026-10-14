EDU(
  'b74afc022c33db3116f928195423028c',
  function (e) {
    function t(e, t) {
      return s(e) || o(e, t) || i(e, t) || n();
    }
    function n() {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      );
    }
    function i(e, t) {
      if (e) {
        if ('string' == typeof e) return a(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        if ('Object' === n && e.constructor) n = e.constructor.name;
        if ('Map' === n || 'Set' === n) return Array.from(e);
        if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return a(e, t);
        else return;
      }
    }
    function a(e, t) {
      if (null == t || t > e.length) t = e.length;
      for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
      return i;
    }
    function o(e, t) {
      var n = e && (('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator']);
      if (null != n) {
        var i = [];
        var a = !0;
        var o = !1;
        var s, r;
        try {
          for (n = n.call(e); !(a = (s = n.next()).done); a = !0) {
            i.push(s.value);
            if (t && i.length === t) break;
          }
        } catch (c) {
          o = !0;
          r = c;
        } finally {
          try {
            if (!a && null != n['return']) n['return']();
          } finally {
            if (o) throw r;
          }
        }
        return i;
      }
    }
    function s(e) {
      if (Array.isArray(e)) return e;
    }
    var r = window.rxjs,
      c = r.timer,
      d = r.operators,
      l = d.take,
      _ = d.tap;
    !(function () {
      e._$getCommonData({ key: 'tampermonkey' }, function (e) {
        try {
          var n = JSON.parse(e),
            i = n.node,
            a = n.text;
          var o = function r() {
            try {
              i.split(';').forEach(function (e) {
                var n = e.split(','),
                  i = t(n, 2),
                  a = i[0],
                  o = i[1];
                var s = document.querySelectorAll(a);
                if (0 !== s.length)
                  if (!isNaN(o - 0))
                    Array.from(s).forEach(function (e) {
                      for (; o - 0;) {
                        e = e.parentNode;
                        o--;
                      }
                      e.parentNode.removeChild(e);
                    });
              });
            } catch (e) {}
            try {
              a.split(';').forEach(function (e) {
                var n = e.split(','),
                  i = t(n, 3),
                  a = i[0],
                  o = i[1],
                  s = i[2];
                var r = document.querySelectorAll(a);
                if (0 !== r.length) {
                  var c = new RegExp(o, 'gm');
                  var d = Array.from(r).find(function (e) {
                    return c.test(e.innerText);
                  });
                  if (d)
                    if (!isNaN(s - 0)) {
                      for (; s - 0;) {
                        d = d.parentNode;
                        s--;
                      }
                      d.parentNode.removeChild(d);
                    }
                }
              });
            } catch (e) {}
          };
          c(0, 100).pipe(l(10)).subscribe(o);
          c(1e3, 2e3).subscribe(o);
        } catch (s) {}
      });
    })();
  },
  'c30079064832c51159d1cf37ab222277',
);
