'use strict';
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [2777],
  {
    848605: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = function () {
          var e,
            t,
            r,
            n,
            u,
            i = (0, l.useContext)(o.default).g;
          return {
            urlParams:
              ((n = {}),
              (u =
                -1 !== (null == i ? void 0 : i.location.href.indexOf('?'))
                  ? null == i
                    ? void 0
                    : i.location.href.match(/\?([^#.]*)([^#]?|[#(.*)])/)[1]
                  : void 0),
              u &&
                (n = u.split('&').reduce(function (e, t) {
                  if (-1 !== t.indexOf('=')) {
                    var r =
                        (function (e) {
                          if (Array.isArray(e)) return e;
                        })((o = t.split('='))) ||
                        (function (e) {
                          var t =
                            null == e
                              ? null
                              : ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
                                e['@@iterator'];
                          if (null != t) {
                            var r,
                              n,
                              l,
                              o,
                              a = [],
                              u = !0,
                              i = !1;
                            try {
                              for (
                                l = (t = t.call(e)).next, !2;
                                !(u = (r = l.call(t)).done) && (a.push(r.value), 2 !== a.length);
                                u = !0
                              );
                            } catch (e) {
                              ((i = !0), (n = e));
                            } finally {
                              try {
                                if (!u && null != t.return && ((o = t.return()), Object(o) !== o))
                                  return;
                              } finally {
                                if (i) throw n;
                              }
                            }
                            return a;
                          }
                        })(o) ||
                        (function (e) {
                          if (e) {
                            if ('string' == typeof e) return a(e, 2);
                            var t = {}.toString.call(e).slice(8, -1);
                            return (
                              'Object' === t && e.constructor && (t = e.constructor.name),
                              'Map' === t || 'Set' === t
                                ? Array.from(e)
                                : 'Arguments' === t ||
                                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
                                  ? a(e, 2)
                                  : void 0
                            );
                          }
                        })(o) ||
                        (function () {
                          throw new TypeError(
                            'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                          );
                        })(),
                      n = r[0],
                      l = r[1];
                    e[n] = l;
                  }
                  var o;
                  return e;
                }, {})),
              n),
            userInfo: null !== (e = null == i ? void 0 : i.webUser) && void 0 !== e ? e : {},
            ftlData:
              null !==
                (t =
                  null == i || null === (r = i.reactComponentLoadBootstrap) || void 0 === r
                    ? void 0
                    : r.reactComponentLoadGet()) && void 0 !== t
                ? t
                : {},
            g: i,
            d: null == i ? void 0 : i.document,
          };
        }));
      var n,
        l = r(296540),
        o = (n = r(742740)) && n.__esModule ? n : { default: n };
      function a(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
    },
    210324: (e, t, r) => {
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = a(r(296540)),
        l = a(r(907229)),
        o = a(r(848605));
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.default = function () {
        var e = (0, o.default)().ftlData,
          t = void 0 === e ? {} : e;
        return n.default.createElement(l.default, t);
      };
    },
  },
]);
