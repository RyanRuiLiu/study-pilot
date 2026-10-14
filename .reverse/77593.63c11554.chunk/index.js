/*! For license information please see 77593.63c11554.chunk.js.LICENSE.txt */
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [77593],
  {
    302733: function (e) {
      e.exports = (function () {
        'use strict';
        function e(e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) '__proto__' !== n && (e[n] = r[n]);
          }
          return e;
        }
        return (function t(r, n) {
          function o(t, o, i) {
            if ('undefined' != typeof document) {
              ('number' == typeof (i = e({}, n, i)).expires &&
                (i.expires = new Date(Date.now() + 864e5 * i.expires)),
                i.expires && (i.expires = i.expires.toUTCString()),
                (t = encodeURIComponent(t)
                  .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
                  .replace(/[()]/g, escape)));
              var c = '';
              for (var u in i)
                i[u] && ((c += '; ' + u), !0 !== i[u] && (c += '=' + i[u].split(';')[0]));
              return (document.cookie = t + '=' + r.write(o, t) + c);
            }
          }
          return Object.create(
            {
              set: o,
              get: function (e) {
                if ('undefined' != typeof document && (!arguments.length || e)) {
                  for (
                    var t = document.cookie ? document.cookie.split('; ') : [], n = {}, o = 0;
                    o < t.length;
                    o++
                  ) {
                    var i = t[o].split('='),
                      c = i.slice(1).join('=');
                    try {
                      var u = decodeURIComponent(i[0]);
                      if ((u in n || (n[u] = r.read(c, u)), e === u)) break;
                    } catch (e) {}
                  }
                  return e ? n[e] : n;
                }
              },
              remove: function (t, r) {
                o(t, '', e({}, r, { expires: -1 }));
              },
              withAttributes: function (r) {
                return t(this.converter, e({}, this.attributes, r));
              },
              withConverter: function (r) {
                return t(e({}, this.converter, r), this.attributes);
              },
            },
            { attributes: { value: Object.freeze(n) }, converter: { value: Object.freeze(r) } },
          );
        })(
          {
            read: function (e) {
              return (
                '"' === e[0] && (e = e.slice(1, -1)),
                e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
              );
            },
            write: function (e) {
              return encodeURIComponent(e).replace(
                /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
                decodeURIComponent,
              );
            },
          },
          { path: '/' },
        );
      })();
    },
    660849: (e, t, r) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = u(r(272505)),
        o = u(r(302733)),
        i = r(397338),
        c = r(808127);
      function u(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function a(e) {
        return (
          (a =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          a(e)
        );
      }
      function f() {
        var e,
          t,
          r = 'function' == typeof Symbol ? Symbol : {},
          n = r.iterator || '@@iterator',
          o = r.toStringTag || '@@toStringTag';
        function i(r, n, o, i) {
          var a = n && n.prototype instanceof u ? n : u,
            f = Object.create(a.prototype);
          return (
            l(
              f,
              '_invoke',
              (function (r, n, o) {
                var i,
                  u,
                  a,
                  f = 0,
                  l = o || [],
                  s = !1,
                  p = {
                    p: 0,
                    n: 0,
                    v: e,
                    a: d,
                    f: d.bind(e, 4),
                    d: function (t, r) {
                      return ((i = t), (u = 0), (a = e), (p.n = r), c);
                    },
                  };
                function d(r, n) {
                  for (u = r, a = n, t = 0; !s && f && !o && t < l.length; t++) {
                    var o,
                      i = l[t],
                      d = p.p,
                      y = i[2];
                    r > 3
                      ? (o = y === n) && ((a = i[(u = i[4]) ? 5 : ((u = 3), 3)]), (i[4] = i[5] = e))
                      : i[0] <= d &&
                        ((o = r < 2 && d < i[1])
                          ? ((u = 0), (p.v = n), (p.n = i[1]))
                          : d < y &&
                            (o = r < 3 || i[0] > n || n > y) &&
                            ((i[4] = r), (i[5] = n), (p.n = y), (u = 0)));
                  }
                  if (o || r > 1) return c;
                  throw ((s = !0), n);
                }
                return function (o, l, y) {
                  if (f > 1) throw TypeError('Generator is already running');
                  for (s && 1 === l && d(l, y), u = l, a = y; (t = u < 2 ? e : a) || !s;) {
                    i || (u ? (u < 3 ? (u > 1 && (p.n = -1), d(u, a)) : (p.n = a)) : (p.v = a));
                    try {
                      if (((f = 2), i)) {
                        if ((u || (o = 'next'), (t = i[o]))) {
                          if (!(t = t.call(i, a)))
                            throw TypeError('iterator result is not an object');
                          if (!t.done) return t;
                          ((a = t.value), u < 2 && (u = 0));
                        } else
                          (1 === u && (t = i.return) && t.call(i),
                            u < 2 &&
                              ((a = TypeError(
                                "The iterator does not provide a '" + o + "' method",
                              )),
                              (u = 1)));
                        i = e;
                      } else if ((t = (s = p.n < 0) ? a : r.call(n, p)) !== c) break;
                    } catch (t) {
                      ((i = e), (u = 1), (a = t));
                    } finally {
                      f = 1;
                    }
                  }
                  return { value: t, done: s };
                };
              })(r, o, i),
              !0,
            ),
            f
          );
        }
        var c = {};
        function u() {}
        function a() {}
        function s() {}
        t = Object.getPrototypeOf;
        var p = [][n]
            ? t(t([][n]()))
            : (l((t = {}), n, function () {
                return this;
              }),
              t),
          d = (s.prototype = u.prototype = Object.create(p));
        function y(e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, s)
              : ((e.__proto__ = s), l(e, o, 'GeneratorFunction')),
            (e.prototype = Object.create(d)),
            e
          );
        }
        return (
          (a.prototype = s),
          l(d, 'constructor', s),
          l(s, 'constructor', a),
          (a.displayName = 'GeneratorFunction'),
          l(s, o, 'GeneratorFunction'),
          l(d),
          l(d, o, 'Generator'),
          l(d, n, function () {
            return this;
          }),
          l(d, 'toString', function () {
            return '[object Generator]';
          }),
          (f = function () {
            return { w: i, m: y };
          })()
        );
      }
      function l(e, t, r, n) {
        var o = Object.defineProperty;
        try {
          o({}, '', {});
        } catch (e) {
          o = 0;
        }
        ((l = function (e, t, r, n) {
          function i(t, r) {
            l(e, t, function (e) {
              return this._invoke(t, r, e);
            });
          }
          t
            ? o
              ? o(e, t, { value: r, enumerable: !n, configurable: !n, writable: !n })
              : (e[t] = r)
            : (i('next', 0), i('throw', 1), i('return', 2));
        }),
          l(e, t, r, n));
      }
      function s(e, t, r, n, o, i, c) {
        try {
          var u = e[i](c),
            a = u.value;
        } catch (e) {
          return void r(e);
        }
        u.done ? t(a) : Promise.resolve(a).then(n, o);
      }
      function p(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function d(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? p(Object(r), !0).forEach(function (t) {
                y(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : p(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function y(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != a(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != a(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == a(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      u(r(755373));
      var b = function (e) {
          var t = JSON.stringify({ scope: e });
          return c.Base64.encode(t);
        },
        v = n.default.create({
          withCredentials: !0,
          timeout: 3e4,
          async: !0,
          crossDomain: !0,
          validateStatus: function () {
            return !0;
          },
        });
      (v.interceptors.request.use(function (e) {
        var t = o.default.get('NTESSTUDYSI'),
          r = e || {},
          n = r.url,
          i = r.method,
          c = void 0 === i ? 'post' : i,
          u = r.data,
          a = (r.withCredentials, r.isNeedCsrfKey),
          f = r.file,
          l = r.scope,
          s = r.params,
          p = r.headers;
        return (
          (e.url =
            !1 === a
              ? n
              : ''
                  .concat(n)
                  .concat(n.includes('?') ? '&' : '?', 'csrfKey=')
                  .concat(t)),
          'get' === c.toLowerCase()
            ? s || (e.params = u)
            : (null != e && e.requestType) || !e || (e.requestType = 'form'),
          /icourse163\.org\/backend/.test(location.href) && c.toUpperCase(),
          (e.headers = f
            ? {}
            : d(
                d(
                  d(
                    d(
                      d(
                        {},
                        ~e.url.indexOf('nei.hz.netease.com') || ~e.url.indexOf('wanproxy.127.net')
                          ? {}
                          : { 'edu-script-token': t },
                      ),
                      p,
                    ),
                    l ? { 'eds-scope': b(l) } : {},
                  ),
                  /icourse163\.com/.test(location.href) ? { 'Accept-Language': 'en' } : {},
                ),
                {},
              )),
          d({}, e)
        );
      }),
        v.interceptors.response.use(
          (function () {
            var e,
              t =
                ((e = f().m(function e(t) {
                  var r, n, o, c, u;
                  return f().w(function (e) {
                    for (;;)
                      switch (e.n) {
                        case 0:
                          if (
                            ((n = (null == t ? void 0 : t.data) || {}),
                            (o = n.code),
                            (c = n.message),
                            (u = t.config),
                            void 0 !== o)
                          ) {
                            e.n = 1;
                            break;
                          }
                          return e.a(2, null == t ? void 0 : t.data);
                        case 1:
                          if (200 === o) {
                            e.n = 4;
                            break;
                          }
                          if (401 !== o) {
                            e.n = 2;
                            break;
                          }
                          return (
                            i.Modal.error({ content: '未登录或登录失效，请登录后重试' }),
                            e.a(2)
                          );
                        case 2:
                          if (null == u || !u.throwError) {
                            e.n = 3;
                            break;
                          }
                          return e.a(2, d({}, null == t ? void 0 : t.data));
                        case 3:
                          if (u.notShowErr) {
                            e.n = 4;
                            break;
                          }
                          return (i.Modal.error({ content: c }), e.a(2));
                        case 4:
                          return e.a(
                            2,
                            null == t || null === (r = t.data) || void 0 === r ? void 0 : r.data,
                          );
                      }
                  }, e);
                })),
                function () {
                  var t = this,
                    r = arguments;
                  return new Promise(function (n, o) {
                    var i = e.apply(t, r);
                    function c(e) {
                      s(i, n, o, c, u, 'next', e);
                    }
                    function u(e) {
                      s(i, n, o, c, u, 'throw', e);
                    }
                    c(void 0);
                  });
                });
            return function (e) {
              return t.apply(this, arguments);
            };
          })(),
        ),
        (t.default = v));
    },
    477593: (e, t, r) => {
      'use strict';
      function n(e) {
        return (
          (n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          n(e)
        );
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'apolloRequest', {
          enumerable: !0,
          get: function () {
            return c.default;
          },
        }),
        Object.defineProperty(t, 'fetch', {
          enumerable: !0,
          get: function () {
            return o.default;
          },
        }),
        Object.defineProperty(t, 'origin', {
          enumerable: !0,
          get: function () {
            return u.default;
          },
        }),
        Object.defineProperty(t, 'protocol', {
          enumerable: !0,
          get: function () {
            return u.protocol;
          },
        }),
        Object.defineProperty(t, 'request', {
          enumerable: !0,
          get: function () {
            return i.default;
          },
        }));
      var o = a(r(11541)),
        i = a(r(310412)),
        c = a(r(660849)),
        u = (function (e) {
          if ('function' == typeof WeakMap) {
            var t = new WeakMap();
            new WeakMap();
          }
          return (function (e) {
            if (e && e.__esModule) return e;
            var r,
              o,
              i = { __proto__: null, default: e };
            if (null === e || ('object' != n(e) && 'function' != typeof e)) return i;
            if ((r = t)) {
              if (r.has(e)) return r.get(e);
              r.set(e, i);
            }
            for (var c in e)
              'default' !== c &&
                {}.hasOwnProperty.call(e, c) &&
                ((o = (r = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, c)) &&
                (o.get || o.set)
                  ? r(i, c, o)
                  : (i[c] = e[c]));
            return i;
          })(e);
        })(r(212619));
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
    },
    212619: (e, t) => {
      'use strict';
      var r, n;
      function o(e) {
        return (
          (o =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          o(e)
        );
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.protocol =
          t.orgHost =
          t.kyHost =
          t.getMoocOrigin =
          t.default =
          t.comHost =
          t.cnHost =
            void 0));
      var i = (t.protocol =
          ('object' === ('undefined' == typeof window ? 'undefined' : o(window)) &&
            (null === (r = window) || void 0 === r || null === (n = r.location) || void 0 === n
              ? void 0
              : n.protocol)) ||
          'https:'),
        c = (t.orgHost = 'www.icourse163.org'),
        u =
          ((t.comHost = 'www.icourse163.com'),
          (t.cnHost = 'www.icourse163.cn'),
          (t.kyHost = 'kaoyan.icourse163.org'),
          (t.getMoocOrigin = function () {
            return ''.concat(i, '//').concat(c);
          })());
      t.default = u;
    },
    310412: (e, t, r) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = f(r(272505)),
        o = f(r(302733)),
        i = r(397338),
        c = r(808127),
        u = f(r(755373)),
        a = f(r(783386));
      function f(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function l() {
        var e,
          t,
          r = 'function' == typeof Symbol ? Symbol : {},
          n = r.iterator || '@@iterator',
          o = r.toStringTag || '@@toStringTag';
        function i(r, n, o, i) {
          var a = n && n.prototype instanceof u ? n : u,
            f = Object.create(a.prototype);
          return (
            s(
              f,
              '_invoke',
              (function (r, n, o) {
                var i,
                  u,
                  a,
                  f = 0,
                  l = o || [],
                  s = !1,
                  p = {
                    p: 0,
                    n: 0,
                    v: e,
                    a: d,
                    f: d.bind(e, 4),
                    d: function (t, r) {
                      return ((i = t), (u = 0), (a = e), (p.n = r), c);
                    },
                  };
                function d(r, n) {
                  for (u = r, a = n, t = 0; !s && f && !o && t < l.length; t++) {
                    var o,
                      i = l[t],
                      d = p.p,
                      y = i[2];
                    r > 3
                      ? (o = y === n) && ((a = i[(u = i[4]) ? 5 : ((u = 3), 3)]), (i[4] = i[5] = e))
                      : i[0] <= d &&
                        ((o = r < 2 && d < i[1])
                          ? ((u = 0), (p.v = n), (p.n = i[1]))
                          : d < y &&
                            (o = r < 3 || i[0] > n || n > y) &&
                            ((i[4] = r), (i[5] = n), (p.n = y), (u = 0)));
                  }
                  if (o || r > 1) return c;
                  throw ((s = !0), n);
                }
                return function (o, l, y) {
                  if (f > 1) throw TypeError('Generator is already running');
                  for (s && 1 === l && d(l, y), u = l, a = y; (t = u < 2 ? e : a) || !s;) {
                    i || (u ? (u < 3 ? (u > 1 && (p.n = -1), d(u, a)) : (p.n = a)) : (p.v = a));
                    try {
                      if (((f = 2), i)) {
                        if ((u || (o = 'next'), (t = i[o]))) {
                          if (!(t = t.call(i, a)))
                            throw TypeError('iterator result is not an object');
                          if (!t.done) return t;
                          ((a = t.value), u < 2 && (u = 0));
                        } else
                          (1 === u && (t = i.return) && t.call(i),
                            u < 2 &&
                              ((a = TypeError(
                                "The iterator does not provide a '" + o + "' method",
                              )),
                              (u = 1)));
                        i = e;
                      } else if ((t = (s = p.n < 0) ? a : r.call(n, p)) !== c) break;
                    } catch (t) {
                      ((i = e), (u = 1), (a = t));
                    } finally {
                      f = 1;
                    }
                  }
                  return { value: t, done: s };
                };
              })(r, o, i),
              !0,
            ),
            f
          );
        }
        var c = {};
        function u() {}
        function a() {}
        function f() {}
        t = Object.getPrototypeOf;
        var p = [][n]
            ? t(t([][n]()))
            : (s((t = {}), n, function () {
                return this;
              }),
              t),
          d = (f.prototype = u.prototype = Object.create(p));
        function y(e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, f)
              : ((e.__proto__ = f), s(e, o, 'GeneratorFunction')),
            (e.prototype = Object.create(d)),
            e
          );
        }
        return (
          (a.prototype = f),
          s(d, 'constructor', f),
          s(f, 'constructor', a),
          (a.displayName = 'GeneratorFunction'),
          s(f, o, 'GeneratorFunction'),
          s(d),
          s(d, o, 'Generator'),
          s(d, n, function () {
            return this;
          }),
          s(d, 'toString', function () {
            return '[object Generator]';
          }),
          (l = function () {
            return { w: i, m: y };
          })()
        );
      }
      function s(e, t, r, n) {
        var o = Object.defineProperty;
        try {
          o({}, '', {});
        } catch (e) {
          o = 0;
        }
        ((s = function (e, t, r, n) {
          function i(t, r) {
            s(e, t, function (e) {
              return this._invoke(t, r, e);
            });
          }
          t
            ? o
              ? o(e, t, { value: r, enumerable: !n, configurable: !n, writable: !n })
              : (e[t] = r)
            : (i('next', 0), i('throw', 1), i('return', 2));
        }),
          s(e, t, r, n));
      }
      function p(e, t, r, n, o, i, c) {
        try {
          var u = e[i](c),
            a = u.value;
        } catch (e) {
          return void r(e);
        }
        u.done ? t(a) : Promise.resolve(a).then(n, o);
      }
      function d(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          (t &&
            (n = n.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            r.push.apply(r, n));
        }
        return r;
      }
      function y(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? d(Object(r), !0).forEach(function (t) {
                b(e, t, r[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : d(Object(r)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                });
        }
        return e;
      }
      function b(e, t, r) {
        return (
          (t = (function (e) {
            var t = (function (e) {
              if ('object' != v(e) || !e) return e;
              var t = e[Symbol.toPrimitive];
              if (void 0 !== t) {
                var r = t.call(e, 'string');
                if ('object' != v(r)) return r;
                throw new TypeError('@@toPrimitive must return a primitive value.');
              }
              return String(e);
            })(e);
            return 'symbol' == v(t) ? t : t + '';
          })(t)) in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      function v(e) {
        return (
          (v =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          v(e)
        );
      }
      var m = function (e) {
          var t = JSON.stringify({ scope: e });
          return c.Base64.encode(t);
        },
        h = n.default.create({
          withCredentials: !0,
          timeout: 3e4,
          async: !0,
          crossDomain: !0,
          validateStatus: function () {
            return !0;
          },
        });
      (h.interceptors.request.use(function (e) {
        var t,
          r,
          n,
          i,
          c = o.default.get('NTESSTUDYSI'),
          f = e || {},
          l = f.url,
          s = f.method,
          p = void 0 === s ? 'post' : s,
          d = f.data,
          b = f.isNeedCsrfKey,
          h = f.file,
          w = f.scope,
          O = f.params,
          g = (f.headers, f.isNeedAuth),
          j =
            'object' === ('undefined' == typeof window ? 'undefined' : v(window)) &&
            window.__MOOC_BUSINESS_API_PROXY_PREFIX__,
          S =
            ('object' === ('undefined' == typeof window ? 'undefined' : v(window)) &&
              window.__MOOC_BUSINESS_API_PROXY_PATHS__) ||
            [],
          _ = /^https?:\/\/www\.icourse163\.org\//.test(l) ? new URL(l) : null,
          P = j && _ && S.includes(_.pathname) ? ''.concat(j).concat(_.pathname) : l;
        return (
          (e.url =
            !1 === b
              ? P
              : ''
                  .concat(P)
                  .concat(P.includes('?') ? '&' : '?', 'csrfKey=')
                  .concat(c)),
          'get' === p.toLowerCase()
            ? O || (e.params = d)
            : (null != e && e.requestType) || !e || (e.requestType = 'form'),
          g &&
            (e.headers = y(
              y({}, e.headers),
              ((t = e),
              (r = +new Date()),
              (n = Math.floor(9e3 * Math.random()) + 1e3),
              (i = (function (e, t, r) {
                var n = t || +new Date(),
                  o = r || Math.floor(9e3 * Math.random()) + 1e3,
                  i =
                    '[Object Object]' === Object.prototype.toString.call(e)
                      ? JSON.stringify(e)
                      : e || '',
                  c = ''.concat(i + o + n, 'fu2s2kxcswgn5hqanx7asmlogyr5wu29'),
                  u = '';
                try {
                  u = ((0, a.default)(c) || '').toLocaleUpperCase();
                } catch (e) {
                  console.error('md5计算错误');
                }
                return u;
              })(t.data, r, n)),
              {
                Timestamp: ''.concat(r),
                'Auth-Signature': i,
                Nonce: ''.concat(n),
                System: 'v1',
                'content-type': 'application/json;charset=UTF-8',
              }),
            )),
          e.headers['content-type'] ||
            ((e.headers['content-type'] = 'application/x-www-form-urlencoded;charset=utf-8'),
            'post' === e.method && (e.data = u.default.stringify(e.data))),
          /icourse163\.org\/backend/.test(location.href) && p.toUpperCase(),
          (e.headers = h
            ? {}
            : y(
                y(
                  y(
                    y(
                      y(
                        {},
                        ~e.url.indexOf('nei.hz.netease.com') || ~e.url.indexOf('wanproxy.127.net')
                          ? {}
                          : { 'edu-script-token': c },
                      ),
                      e.headers,
                    ),
                    w ? { 'eds-scope': m(w) } : {},
                  ),
                  /icourse163\.com/.test(location.href) ? { 'Accept-Language': 'en' } : {},
                ),
                {},
              )),
          y({}, e)
        );
      }),
        h.interceptors.response.use(
          (function () {
            var e,
              t =
                ((e = l().m(function e(t) {
                  var r, n, o, c, u;
                  return l().w(function (e) {
                    for (;;)
                      switch (e.n) {
                        case 0:
                          if (
                            ((n = (null == t ? void 0 : t.data) || {}),
                            (o = n.code),
                            (c = n.message),
                            null == (u = t.config) || !u.returnRawResponse)
                          ) {
                            e.n = 1;
                            break;
                          }
                          return e.a(2, t);
                        case 1:
                          if (void 0 !== o) {
                            e.n = 2;
                            break;
                          }
                          return e.a(2, null == t ? void 0 : t.data);
                        case 2:
                          if (0 === o) {
                            e.n = 7;
                            break;
                          }
                          if (1 !== o) {
                            e.n = 3;
                            break;
                          }
                          return (
                            i.Modal.error({
                              content: '未登录或登录失效，请登录后重试',
                              onOk: function () {
                                location.reload();
                              },
                              onCancel: function () {
                                location.reload();
                              },
                            }),
                            e.a(2)
                          );
                        case 3:
                          if (2 !== o) {
                            e.n = 4;
                            break;
                          }
                          return (
                            i.Modal.error({
                              content: '账号权限不足',
                              onOk: function () {
                                location.href = '/';
                              },
                              onCancel: function () {
                                location.href = '/';
                              },
                              okText: '知道了',
                            }),
                            e.a(2)
                          );
                        case 4:
                          if (null == u || !u.throwError) {
                            e.n = 5;
                            break;
                          }
                          return e.a(2, y({}, null == t ? void 0 : t.data));
                        case 5:
                          if (u.notShowErr) {
                            e.n = 6;
                            break;
                          }
                          return (i.Modal.error({ content: c }), e.a(2));
                        case 6:
                          return e.a(2);
                        case 7:
                          return e.a(
                            2,
                            null == t || null === (r = t.data) || void 0 === r ? void 0 : r.result,
                          );
                      }
                  }, e);
                })),
                function () {
                  var t = this,
                    r = arguments;
                  return new Promise(function (n, o) {
                    var i = e.apply(t, r);
                    function c(e) {
                      p(i, n, o, c, u, 'next', e);
                    }
                    function u(e) {
                      p(i, n, o, c, u, 'throw', e);
                    }
                    c(void 0);
                  });
                });
            return function (e) {
              return t.apply(this, arguments);
            };
          })(),
        ),
        (t.default = h));
    },
  },
]);
