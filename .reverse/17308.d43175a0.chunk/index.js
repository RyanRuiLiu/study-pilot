/*! For license information please see 17308.d43175a0.chunk.js.LICENSE.txt */
'use strict';
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [17308],
  {
    498966: (t, e, r) => {
      function n(t) {
        return (
          (n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    'function' == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? 'symbol'
                    : typeof t;
                }),
          n(t)
        );
      }
      (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
      var o,
        i,
        u = (function (t) {
          if ('function' == typeof WeakMap) {
            var e = new WeakMap();
            new WeakMap();
          }
          return (function (t) {
            if (t && t.__esModule) return t;
            var r,
              o,
              i = { __proto__: null, default: t };
            if (null === t || ('object' != n(t) && 'function' != typeof t)) return i;
            if ((r = e)) {
              if (r.has(t)) return r.get(t);
              r.set(t, i);
            }
            for (var u in t)
              'default' !== u &&
                {}.hasOwnProperty.call(t, u) &&
                ((o = (r = Object.defineProperty) && Object.getOwnPropertyDescriptor(t, u)) &&
                (o.get || o.set)
                  ? r(i, u, o)
                  : (i[u] = t[u]));
            return i;
          })(t);
        })(r(296540)),
        c = (o = r(742740)) && o.__esModule ? o : { default: o };
      function a() {
        return (
          (a = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var r = arguments[e];
                  for (var n in r) ({}).hasOwnProperty.call(r, n) && (t[n] = r[n]);
                }
                return t;
              }),
          a.apply(null, arguments)
        );
      }
      function f(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
        return n;
      }
      function l(t, e) {
        for (var r = 0; r < e.length; r++) {
          var n = e[r];
          ((n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            'value' in n && (n.writable = !0),
            Object.defineProperty(t, s(n.key), n));
        }
      }
      function s(t) {
        var e = (function (t) {
          if ('object' != n(t) || !t) return t;
          var e = t[Symbol.toPrimitive];
          if (void 0 !== e) {
            var r = e.call(t, 'string');
            if ('object' != n(r)) return r;
            throw new TypeError('@@toPrimitive must return a primitive value.');
          }
          return String(t);
        })(t);
        return 'symbol' == n(e) ? e : e + '';
      }
      function p() {
        try {
          var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (t) {}
        return (p = function () {
          return !!t;
        })();
      }
      function y(t) {
        return (
          (y = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              }),
          y(t)
        );
      }
      function d(t, e) {
        return (
          (d = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return ((t.__proto__ = e), t);
              }),
          d(t, e)
        );
      }
      e.default = function (t) {
        return function (e) {
          return (function (r) {
            function o() {
              return (
                (function (t, e) {
                  if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
                })(this, o),
                (function (t, e, r) {
                  return (
                    (e = y(e)),
                    (function (t, e) {
                      if (e && ('object' == n(e) || 'function' == typeof e)) return e;
                      if (void 0 !== e)
                        throw new TypeError(
                          'Derived constructors may only return object or undefined',
                        );
                      return (function (t) {
                        if (void 0 === t)
                          throw new ReferenceError(
                            "this hasn't been initialised - super() hasn't been called",
                          );
                        return t;
                      })(t);
                    })(t, p() ? Reflect.construct(e, r || [], y(t).constructor) : e.apply(t, r))
                  );
                })(this, o, arguments)
              );
            }
            return (
              (function (t, e) {
                if ('function' != typeof e && null !== e)
                  throw new TypeError('Super expression must either be null or a function');
                ((t.prototype = Object.create(e && e.prototype, {
                  constructor: { value: t, writable: !0, configurable: !0 },
                })),
                  Object.defineProperty(t, 'prototype', { writable: !1 }),
                  e && d(t, e));
              })(o, r),
              (function (t, e) {
                return (
                  e && l(t.prototype, e),
                  Object.defineProperty(t, 'prototype', { writable: !1 }),
                  t
                );
              })(o, [
                {
                  key: 'render',
                  value: function () {
                    var r = this;
                    return (function (t, e, r, n) {
                      i ||
                        (i =
                          ('function' == typeof Symbol &&
                            Symbol.for &&
                            Symbol.for('react.element')) ||
                          60103);
                      var o = t && t.defaultProps,
                        u = arguments.length - 3;
                      if ((e || 0 === u || (e = { children: void 0 }), 1 === u)) e.children = n;
                      else if (u > 1) {
                        for (var c = Array(u), a = 0; a < u; a++) c[a] = arguments[a + 3];
                        e.children = c;
                      }
                      if (e && o) for (var f in o) void 0 === e[f] && (e[f] = o[f]);
                      else e || (e = o || {});
                      return {
                        $$typeof: i,
                        type: t,
                        key: void 0 === r ? null : '' + r,
                        ref: null,
                        props: e,
                        _owner: null,
                      };
                    })(c.default.Consumer, {}, void 0, function (n) {
                      for (
                        var o = n.fetch,
                          i = t(o),
                          c = function () {
                            var t = (function (t, e) {
                                return (
                                  (function (t) {
                                    if (Array.isArray(t)) return t;
                                  })(t) ||
                                  (function (t, e) {
                                    var r =
                                      null == t
                                        ? null
                                        : ('undefined' != typeof Symbol && t[Symbol.iterator]) ||
                                          t['@@iterator'];
                                    if (null != r) {
                                      var n,
                                        o,
                                        i,
                                        u,
                                        c = [],
                                        a = !0,
                                        f = !1;
                                      try {
                                        if (((i = (r = r.call(t)).next), 0 === e)) {
                                          if (Object(r) !== r) return;
                                          a = !1;
                                        } else
                                          for (
                                            ;
                                            !(a = (n = i.call(r)).done) &&
                                            (c.push(n.value), c.length !== e);
                                            a = !0
                                          );
                                      } catch (t) {
                                        ((f = !0), (o = t));
                                      } finally {
                                        try {
                                          if (
                                            !a &&
                                            null != r.return &&
                                            ((u = r.return()), Object(u) !== u)
                                          )
                                            return;
                                        } finally {
                                          if (f) throw o;
                                        }
                                      }
                                      return c;
                                    }
                                  })(t, e) ||
                                  (function (t, e) {
                                    if (t) {
                                      if ('string' == typeof t) return f(t, e);
                                      var r = {}.toString.call(t).slice(8, -1);
                                      return (
                                        'Object' === r && t.constructor && (r = t.constructor.name),
                                        'Map' === r || 'Set' === r
                                          ? Array.from(t)
                                          : 'Arguments' === r ||
                                              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                                            ? f(t, e)
                                            : void 0
                                      );
                                    }
                                  })(t, e) ||
                                  (function () {
                                    throw new TypeError(
                                      'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                                    );
                                  })()
                                );
                              })(s[l], 2),
                              e = t[0],
                              r = t[1];
                            i[''.concat(e, 'Async')] = function () {
                              for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
                                e[n] = arguments[n];
                              return new Promise(function (t, n) {
                                r.apply(void 0, e).subscribe(function (e) {
                                  return t(e);
                                });
                              });
                            };
                          },
                          l = 0,
                          s = Object.entries(i);
                        l < s.length;
                        l++
                      )
                        c();
                      return u.default.createElement(e, a({}, r.props, i));
                    });
                  },
                },
              ])
            );
          })(u.Component);
        };
      };
    },
    416100: (t, e, r) => {
      (Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.listCertifiedRightsVo =
          e.getRightsPrompt =
          e.getCertificationPromotionConfig =
          e.checkHasPayForProduct =
            void 0));
      var n,
        o,
        i = r(477593);
      function u() {
        var t,
          e,
          r = 'function' == typeof Symbol ? Symbol : {},
          n = r.iterator || '@@iterator',
          o = r.toStringTag || '@@toStringTag';
        function i(r, n, o, i) {
          var u = n && n.prototype instanceof f ? n : f,
            l = Object.create(u.prototype);
          return (
            c(
              l,
              '_invoke',
              (function (r, n, o) {
                var i,
                  u,
                  c,
                  f = 0,
                  l = o || [],
                  s = !1,
                  p = {
                    p: 0,
                    n: 0,
                    v: t,
                    a: y,
                    f: y.bind(t, 4),
                    d: function (e, r) {
                      return ((i = e), (u = 0), (c = t), (p.n = r), a);
                    },
                  };
                function y(r, n) {
                  for (u = r, c = n, e = 0; !s && f && !o && e < l.length; e++) {
                    var o,
                      i = l[e],
                      y = p.p,
                      d = i[2];
                    r > 3
                      ? (o = d === n) && ((c = i[(u = i[4]) ? 5 : ((u = 3), 3)]), (i[4] = i[5] = t))
                      : i[0] <= y &&
                        ((o = r < 2 && y < i[1])
                          ? ((u = 0), (p.v = n), (p.n = i[1]))
                          : y < d &&
                            (o = r < 3 || i[0] > n || n > d) &&
                            ((i[4] = r), (i[5] = n), (p.n = d), (u = 0)));
                  }
                  if (o || r > 1) return a;
                  throw ((s = !0), n);
                }
                return function (o, l, d) {
                  if (f > 1) throw TypeError('Generator is already running');
                  for (s && 1 === l && y(l, d), u = l, c = d; (e = u < 2 ? t : c) || !s;) {
                    i || (u ? (u < 3 ? (u > 1 && (p.n = -1), y(u, c)) : (p.n = c)) : (p.v = c));
                    try {
                      if (((f = 2), i)) {
                        if ((u || (o = 'next'), (e = i[o]))) {
                          if (!(e = e.call(i, c)))
                            throw TypeError('iterator result is not an object');
                          if (!e.done) return e;
                          ((c = e.value), u < 2 && (u = 0));
                        } else
                          (1 === u && (e = i.return) && e.call(i),
                            u < 2 &&
                              ((c = TypeError(
                                "The iterator does not provide a '" + o + "' method",
                              )),
                              (u = 1)));
                        i = t;
                      } else if ((e = (s = p.n < 0) ? c : r.call(n, p)) !== a) break;
                    } catch (e) {
                      ((i = t), (u = 1), (c = e));
                    } finally {
                      f = 1;
                    }
                  }
                  return { value: e, done: s };
                };
              })(r, o, i),
              !0,
            ),
            l
          );
        }
        var a = {};
        function f() {}
        function l() {}
        function s() {}
        e = Object.getPrototypeOf;
        var p = [][n]
            ? e(e([][n]()))
            : (c((e = {}), n, function () {
                return this;
              }),
              e),
          y = (s.prototype = f.prototype = Object.create(p));
        function d(t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, s)
              : ((t.__proto__ = s), c(t, o, 'GeneratorFunction')),
            (t.prototype = Object.create(y)),
            t
          );
        }
        return (
          (l.prototype = s),
          c(y, 'constructor', s),
          c(s, 'constructor', l),
          (l.displayName = 'GeneratorFunction'),
          c(s, o, 'GeneratorFunction'),
          c(y),
          c(y, o, 'Generator'),
          c(y, n, function () {
            return this;
          }),
          c(y, 'toString', function () {
            return '[object Generator]';
          }),
          (u = function () {
            return { w: i, m: d };
          })()
        );
      }
      function c(t, e, r, n) {
        var o = Object.defineProperty;
        try {
          o({}, '', {});
        } catch (t) {
          o = 0;
        }
        ((c = function (t, e, r, n) {
          function i(e, r) {
            c(t, e, function (t) {
              return this._invoke(e, r, t);
            });
          }
          e
            ? o
              ? o(t, e, { value: r, enumerable: !n, configurable: !n, writable: !n })
              : (t[e] = r)
            : (i('next', 0), i('throw', 1), i('return', 2));
        }),
          c(t, e, r, n));
      }
      function a(t, e, r, n, o, i, u) {
        try {
          var c = t[i](u),
            a = c.value;
        } catch (t) {
          return void r(t);
        }
        c.done ? e(a) : Promise.resolve(a).then(n, o);
      }
      function f(t) {
        return (
          (f =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    'function' == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? 'symbol'
                    : typeof t;
                }),
          f(t)
        );
      }
      var l =
        ('object' === ('undefined' == typeof window ? 'undefined' : f(window)) &&
          (null === (n = window) || void 0 === n || null === (o = n.location) || void 0 === o
            ? void 0
            : o.protocol)) ||
        'https:';
      ((e.listCertifiedRightsVo = function (t) {
        return (0, i.request)({
          url: ''.concat(
            l,
            '//www.icourse163.org/web/j/mocPostGradeOrderRPCBean.listCertifiedRightsVo.rpc',
          ),
          method: 'post',
          data: t,
        });
      }),
        (e.checkHasPayForProduct = function (t) {
          return (0, i.request)({
            url: ''.concat(
              l,
              '//kaoyan.icourse163.org/web/j/kaoyanCourseBean.checkHasPayForProduct.rpc',
            ),
            method: 'post',
            data: t,
          });
        }),
        (e.getRightsPrompt = function (t) {
          return (0, i.request)({
            url: ''.concat(l, '//www.icourse163.org/web/j/memberRightsBean.getRightsPrompt.rpc'),
            method: 'post',
            data: t,
          });
        }),
        (e.getCertificationPromotionConfig = (function () {
          var t,
            e =
              ((t = u().m(function t() {
                return u().w(function (t) {
                  for (;;)
                    if (0 === t.n)
                      return t.a(
                        2,
                        (0, i.request)({
                          url: ''.concat(l, '//www.icourse163.org/web/j/commonBean.obtain.rpc'),
                          method: 'post',
                          data: {
                            key: 'web_config_key_certification_promotion_presented_activities_config',
                          },
                        }),
                      );
                }, t);
              })),
              function () {
                var e = this,
                  r = arguments;
                return new Promise(function (n, o) {
                  var i = t.apply(e, r);
                  function u(t) {
                    a(i, n, o, u, c, 'next', t);
                  }
                  function c(t) {
                    a(i, n, o, u, c, 'throw', t);
                  }
                  u(void 0);
                });
              });
          return function () {
            return e.apply(this, arguments);
          };
        })()));
    },
    219314: (t, e, r) => {
      (Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.default = void 0),
        Object.defineProperty(e, 'fetchCertifiedRights', {
          enumerable: !0,
          get: function () {
            return n.fetchCertifiedRights;
          },
        }),
        Object.defineProperty(e, 'hasCertifiedAIRights', {
          enumerable: !0,
          get: function () {
            return o.hasCertifiedAIRights;
          },
        }),
        Object.defineProperty(e, 'hasCertifiedRights', {
          enumerable: !0,
          get: function () {
            return n.hasCertifiedRights;
          },
        }),
        Object.defineProperty(e, 'isEnrollClassroom', {
          enumerable: !0,
          get: function () {
            return o.isEnrollClassroom;
          },
        }),
        Object.defineProperty(e, 'isSmartTeachTerm', {
          enumerable: !0,
          get: function () {
            return o.isSmartTeachTerm;
          },
        }),
        Object.defineProperty(e, 'useCertifiedRights', {
          enumerable: !0,
          get: function () {
            return n.useCertifiedRights;
          },
        }));
      var n = r(994511),
        o = r(151216);
      e.default = n.useCertifiedRights;
    },
    23907: (t, e) => {
      (Object.defineProperty(e, '__esModule', { value: !0 }), (e.RightsType = void 0));
      var r = (e.RightsType = (function (t) {
        return ((t[(t.DISCOUNT = 2)] = 'DISCOUNT'), (t[(t.FULL_VALUE = 1)] = 'FULL_VALUE'), t);
      })(r || {}));
    },
    994511: (t, e, r) => {
      (Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.fetchCertifiedRights = e.default = void 0),
        Object.defineProperty(e, 'hasCertifiedRights', {
          enumerable: !0,
          get: function () {
            return i.hasCertifiedRights;
          },
        }),
        (e.useCertifiedRights = void 0));
      var n = r(296540),
        o = r(477593),
        i = r(151216);
      function u() {
        var t,
          e,
          r = 'function' == typeof Symbol ? Symbol : {},
          n = r.iterator || '@@iterator',
          o = r.toStringTag || '@@toStringTag';
        function i(r, n, o, i) {
          var u = n && n.prototype instanceof f ? n : f,
            l = Object.create(u.prototype);
          return (
            c(
              l,
              '_invoke',
              (function (r, n, o) {
                var i,
                  u,
                  c,
                  f = 0,
                  l = o || [],
                  s = !1,
                  p = {
                    p: 0,
                    n: 0,
                    v: t,
                    a: y,
                    f: y.bind(t, 4),
                    d: function (e, r) {
                      return ((i = e), (u = 0), (c = t), (p.n = r), a);
                    },
                  };
                function y(r, n) {
                  for (u = r, c = n, e = 0; !s && f && !o && e < l.length; e++) {
                    var o,
                      i = l[e],
                      y = p.p,
                      d = i[2];
                    r > 3
                      ? (o = d === n) && ((c = i[(u = i[4]) ? 5 : ((u = 3), 3)]), (i[4] = i[5] = t))
                      : i[0] <= y &&
                        ((o = r < 2 && y < i[1])
                          ? ((u = 0), (p.v = n), (p.n = i[1]))
                          : y < d &&
                            (o = r < 3 || i[0] > n || n > d) &&
                            ((i[4] = r), (i[5] = n), (p.n = d), (u = 0)));
                  }
                  if (o || r > 1) return a;
                  throw ((s = !0), n);
                }
                return function (o, l, d) {
                  if (f > 1) throw TypeError('Generator is already running');
                  for (s && 1 === l && y(l, d), u = l, c = d; (e = u < 2 ? t : c) || !s;) {
                    i || (u ? (u < 3 ? (u > 1 && (p.n = -1), y(u, c)) : (p.n = c)) : (p.v = c));
                    try {
                      if (((f = 2), i)) {
                        if ((u || (o = 'next'), (e = i[o]))) {
                          if (!(e = e.call(i, c)))
                            throw TypeError('iterator result is not an object');
                          if (!e.done) return e;
                          ((c = e.value), u < 2 && (u = 0));
                        } else
                          (1 === u && (e = i.return) && e.call(i),
                            u < 2 &&
                              ((c = TypeError(
                                "The iterator does not provide a '" + o + "' method",
                              )),
                              (u = 1)));
                        i = t;
                      } else if ((e = (s = p.n < 0) ? c : r.call(n, p)) !== a) break;
                    } catch (e) {
                      ((i = t), (u = 1), (c = e));
                    } finally {
                      f = 1;
                    }
                  }
                  return { value: e, done: s };
                };
              })(r, o, i),
              !0,
            ),
            l
          );
        }
        var a = {};
        function f() {}
        function l() {}
        function s() {}
        e = Object.getPrototypeOf;
        var p = [][n]
            ? e(e([][n]()))
            : (c((e = {}), n, function () {
                return this;
              }),
              e),
          y = (s.prototype = f.prototype = Object.create(p));
        function d(t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, s)
              : ((t.__proto__ = s), c(t, o, 'GeneratorFunction')),
            (t.prototype = Object.create(y)),
            t
          );
        }
        return (
          (l.prototype = s),
          c(y, 'constructor', s),
          c(s, 'constructor', l),
          (l.displayName = 'GeneratorFunction'),
          c(s, o, 'GeneratorFunction'),
          c(y),
          c(y, o, 'Generator'),
          c(y, n, function () {
            return this;
          }),
          c(y, 'toString', function () {
            return '[object Generator]';
          }),
          (u = function () {
            return { w: i, m: d };
          })()
        );
      }
      function c(t, e, r, n) {
        var o = Object.defineProperty;
        try {
          o({}, '', {});
        } catch (t) {
          o = 0;
        }
        ((c = function (t, e, r, n) {
          function i(e, r) {
            c(t, e, function (t) {
              return this._invoke(e, r, t);
            });
          }
          e
            ? o
              ? o(t, e, { value: r, enumerable: !n, configurable: !n, writable: !n })
              : (t[e] = r)
            : (i('next', 0), i('throw', 1), i('return', 2));
        }),
          c(t, e, r, n));
      }
      function a(t, e, r, n, o, i, u) {
        try {
          var c = t[i](u),
            a = c.value;
        } catch (t) {
          return void r(t);
        }
        c.done ? e(a) : Promise.resolve(a).then(n, o);
      }
      function f(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var r = 0, n = Array(e); r < e; r++) n[r] = t[r];
        return n;
      }
      var l = (e.fetchCertifiedRights = function (t) {
          return (0, o.request)({
            url: ''.concat(o.origin, '/web/j/memberRightsBean.getLearnModeRightsDto.rpc'),
            method: 'post',
            data: t,
            notShowErr: !0,
          });
        }),
        s = (e.useCertifiedRights = function (t) {
          var e,
            r,
            o =
              ((e = (0, n.useState)(null)),
              (r = 2),
              (function (t) {
                if (Array.isArray(t)) return t;
              })(e) ||
                (function (t, e) {
                  var r =
                    null == t
                      ? null
                      : ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator'];
                  if (null != r) {
                    var n,
                      o,
                      i,
                      u,
                      c = [],
                      a = !0,
                      f = !1;
                    try {
                      if (((i = (r = r.call(t)).next), 0 === e)) {
                        if (Object(r) !== r) return;
                        a = !1;
                      } else
                        for (
                          ;
                          !(a = (n = i.call(r)).done) && (c.push(n.value), c.length !== e);
                          a = !0
                        );
                    } catch (t) {
                      ((f = !0), (o = t));
                    } finally {
                      try {
                        if (!a && null != r.return && ((u = r.return()), Object(u) !== u)) return;
                      } finally {
                        if (f) throw o;
                      }
                    }
                    return c;
                  }
                })(e, r) ||
                (function (t, e) {
                  if (t) {
                    if ('string' == typeof t) return f(t, e);
                    var r = {}.toString.call(t).slice(8, -1);
                    return (
                      'Object' === r && t.constructor && (r = t.constructor.name),
                      'Map' === r || 'Set' === r
                        ? Array.from(t)
                        : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                          ? f(t, e)
                          : void 0
                    );
                  }
                })(e, r) ||
                (function () {
                  throw new TypeError(
                    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                  );
                })()),
            c = o[0],
            s = o[1],
            p = (function () {
              var e,
                r =
                  ((e = u().m(function e() {
                    var r, n, o, i, c, a;
                    return u().w(
                      function (e) {
                        for (;;)
                          switch ((e.p = e.n)) {
                            case 0:
                              if (((r = 'certifiedRights_'.concat(t)), !(n = window[r]))) {
                                e.n = 3;
                                break;
                              }
                              return ((e.p = 1), (o = JSON.parse(n)), s(o), e.a(2));
                            case 2:
                              ((e.p = 2),
                                (c = e.v),
                                console.error('session data parse error：', c));
                            case 3:
                              if (!(a = t)) {
                                e.n = 5;
                                break;
                              }
                              return ((e.n = 4), l({ termId: t }));
                            case 4:
                              a = e.v;
                            case 5:
                              (i = a) && (s(i), (window[r] = JSON.stringify(i)));
                            case 6:
                              return e.a(2);
                          }
                      },
                      e,
                      null,
                      [[1, 2]],
                    );
                  })),
                  function () {
                    var t = this,
                      r = arguments;
                    return new Promise(function (n, o) {
                      var i = e.apply(t, r);
                      function u(t) {
                        a(i, n, o, u, c, 'next', t);
                      }
                      function c(t) {
                        a(i, n, o, u, c, 'throw', t);
                      }
                      u(void 0);
                    });
                  });
              return function () {
                return r.apply(this, arguments);
              };
            })();
          return (
            (0, n.useEffect)(
              function () {
                p();
              },
              [t],
            ),
            [c, (0, i.hasCertifiedRights)(c), (0, i.hasCertifiedAIRights)(c)]
          );
        });
      e.default = s;
    },
    151216: (t, e, r) => {
      (Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.isSmartTeachTerm =
          e.isMocAppCertifiedTerm =
          e.isEnrollClassroom =
          e.hasCertifiedRights =
          e.hasCertifiedAIRights =
            void 0));
      var n = r(23907),
        o = (e.hasCertifiedRights = function (t) {
          return (
            !(
              !t ||
              (Number(null == t ? void 0 : t.rightsType) !== n.RightsType.DISCOUNT &&
                Number(null == t ? void 0 : t.rightsType) !== n.RightsType.FULL_VALUE) ||
              null == t ||
              !t.rightsType
            ) &&
            1 === Number(null == t ? void 0 : t.certified) &&
            Number(t.rightsEndTime) > +new Date()
          );
        });
      ((e.hasCertifiedAIRights = function (t) {
        return !!t && o(t) && 1 === Number(t.supportAiLessonPlan);
      }),
        (e.isEnrollClassroom = function (t) {
          return !!t && 1 === Number(t.enrollClassroom);
        }),
        (e.isSmartTeachTerm = function (t) {
          return !!t && 1 === Number(t.zhiHuiGaoJiaoTerm);
        }),
        (e.isMocAppCertifiedTerm = function (t) {
          return !!t && 1 === Number(t.mocAppCertifiedTerm);
        }));
    },
  },
]);
