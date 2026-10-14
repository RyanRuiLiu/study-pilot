/*! For license information please see LearnPageInvokeModal-entry.547e36de.chunk.js.LICENSE.txt */
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [3042],
  {
    822063: (t, e, n) => {
      ((e = t.exports = n(576314)(!1)).push([
        t.id,
        '._10YHd .ant-modal-content {\n  overflow: hidden;\n  border-radius: 12px;\n}\n\n._10YHd ._3QXy5 {\n  font-size: 15px;\n  margin-bottom: 12px;\n  color: #333333;\n  font-weight: 600;\n}\n\n._10YHd ._3IOXv {\n  position: relative;\n  width: 100%;\n  height: 100px;\n  margin-bottom: 12px;\n}\n\n._10YHd ._3IOXv img {\n  -o-object-fit: cover;\n     object-fit: cover;\n  -o-object-position: center;\n     object-position: center;\n  height: 100%;\n  margin: auto;\n  display: block;\n}\n\n._10YHd ._6Aimo {\n  text-align: right;\n  font-size: 12px;\n  font-weight: 500;\n}\n\n._10YHd ._6Aimo ._1zh1U {\n  top: -1px;\n  margin-left: 8px;\n}',
        '',
      ]),
        (e.locals = {
          FollowMoocModal: '_10YHd',
          rowTip: '_3QXy5',
          qrcode: '_3IOXv',
          switchBox: '_6Aimo',
          switch: '_1zh1U',
        }));
    },
    530869: (t, e, n) => {
      var r = n(822063),
        o = n(461352),
        i = 'string' == typeof r ? [[t.id, r, '']] : r;
      (((e = t.exports = r.locals || {})._getContent = function () {
        return i;
      }),
        (e._getCss = function () {
          return '' + r;
        }),
        (e._insertCss = function (t) {
          return o(i, t);
        }));
    },
    443973: (t, e, n) => {
      'use strict';
      var r = n(296540),
        o = n(146166);
      t.exports = function () {
        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
        var i = r.useContext(o).insertCss;
        if (!i) throw new Error('Please provide "insertCss" function by StyleContext.Provider');
        i.apply(void 0, e);
      };
    },
    262422: (t, e, n) => {
      'use strict';
      (Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.getUserIdAlreadyBindedStatus = void 0));
      var r,
        o,
        i = n(477593);
      function a(t) {
        return (
          (a =
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
          a(t)
        );
      }
      var u =
        ('object' === ('undefined' == typeof window ? 'undefined' : a(window)) &&
          (null === (r = window) || void 0 === r || null === (o = r.location) || void 0 === o
            ? void 0
            : o.protocol)) ||
        'https:';
      e.getUserIdAlreadyBindedStatus = function () {
        return (0, i.request)({
          url: ''.concat(
            u,
            '//www.icourse163.org/web/j/weChatMessageRpcBean.getUserIdAlreadyBindedStatus.rpc',
          ),
          method: 'post',
        });
      };
    },
    143414: (t, e, n) => {
      'use strict';
      function r(t) {
        return (
          (r =
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
          r(t)
        );
      }
      (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
      var o,
        i,
        a,
        u = (function (t) {
          if ('function' == typeof WeakMap) {
            var e = new WeakMap();
            new WeakMap();
          }
          return (function (t) {
            if (t && t.__esModule) return t;
            var n,
              o,
              i = { __proto__: null, default: t };
            if (null === t || ('object' != r(t) && 'function' != typeof t)) return i;
            if ((n = e)) {
              if (n.has(t)) return n.get(t);
              n.set(t, i);
            }
            for (var a in t)
              'default' !== a &&
                {}.hasOwnProperty.call(t, a) &&
                ((o = (n = Object.defineProperty) && Object.getOwnPropertyDescriptor(t, a)) &&
                (o.get || o.set)
                  ? n(i, a, o)
                  : (i[a] = t[a]));
            return i;
          })(t);
        })(n(296540)),
        l = n(397338),
        c = p(n(742740)),
        f = p(n(443973)),
        d = p(n(530869)),
        s = n(262422);
      function p(t) {
        return t && t.__esModule ? t : { default: t };
      }
      function y(t, e, n, r) {
        a ||
          (a = ('function' == typeof Symbol && Symbol.for && Symbol.for('react.element')) || 60103);
        var o = t && t.defaultProps,
          i = arguments.length - 3;
        if ((e || 0 === i || (e = { children: void 0 }), 1 === i)) e.children = r;
        else if (i > 1) {
          for (var u = Array(i), l = 0; l < i; l++) u[l] = arguments[l + 3];
          e.children = u;
        }
        if (e && o) for (var c in o) void 0 === e[c] && (e[c] = o[c]);
        else e || (e = o || {});
        return {
          $$typeof: a,
          type: t,
          key: void 0 === n ? null : '' + n,
          ref: null,
          props: e,
          _owner: null,
        };
      }
      function v() {
        var t,
          e,
          n = 'function' == typeof Symbol ? Symbol : {},
          r = n.iterator || '@@iterator',
          o = n.toStringTag || '@@toStringTag';
        function i(n, r, o, i) {
          var l = r && r.prototype instanceof u ? r : u,
            c = Object.create(l.prototype);
          return (
            b(
              c,
              '_invoke',
              (function (n, r, o) {
                var i,
                  u,
                  l,
                  c = 0,
                  f = o || [],
                  d = !1,
                  s = {
                    p: 0,
                    n: 0,
                    v: t,
                    a: p,
                    f: p.bind(t, 4),
                    d: function (e, n) {
                      return ((i = e), (u = 0), (l = t), (s.n = n), a);
                    },
                  };
                function p(n, r) {
                  for (u = n, l = r, e = 0; !d && c && !o && e < f.length; e++) {
                    var o,
                      i = f[e],
                      p = s.p,
                      y = i[2];
                    n > 3
                      ? (o = y === r) && ((l = i[(u = i[4]) ? 5 : ((u = 3), 3)]), (i[4] = i[5] = t))
                      : i[0] <= p &&
                        ((o = n < 2 && p < i[1])
                          ? ((u = 0), (s.v = r), (s.n = i[1]))
                          : p < y &&
                            (o = n < 3 || i[0] > r || r > y) &&
                            ((i[4] = n), (i[5] = r), (s.n = y), (u = 0)));
                  }
                  if (o || n > 1) return a;
                  throw ((d = !0), r);
                }
                return function (o, f, y) {
                  if (c > 1) throw TypeError('Generator is already running');
                  for (d && 1 === f && p(f, y), u = f, l = y; (e = u < 2 ? t : l) || !d;) {
                    i || (u ? (u < 3 ? (u > 1 && (s.n = -1), p(u, l)) : (s.n = l)) : (s.v = l));
                    try {
                      if (((c = 2), i)) {
                        if ((u || (o = 'next'), (e = i[o]))) {
                          if (!(e = e.call(i, l)))
                            throw TypeError('iterator result is not an object');
                          if (!e.done) return e;
                          ((l = e.value), u < 2 && (u = 0));
                        } else
                          (1 === u && (e = i.return) && e.call(i),
                            u < 2 &&
                              ((l = TypeError(
                                "The iterator does not provide a '" + o + "' method",
                              )),
                              (u = 1)));
                        i = t;
                      } else if ((e = (d = s.n < 0) ? l : n.call(r, s)) !== a) break;
                    } catch (e) {
                      ((i = t), (u = 1), (l = e));
                    } finally {
                      c = 1;
                    }
                  }
                  return { value: e, done: d };
                };
              })(n, o, i),
              !0,
            ),
            c
          );
        }
        var a = {};
        function u() {}
        function l() {}
        function c() {}
        e = Object.getPrototypeOf;
        var f = [][r]
            ? e(e([][r]()))
            : (b((e = {}), r, function () {
                return this;
              }),
              e),
          d = (c.prototype = u.prototype = Object.create(f));
        function s(t) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(t, c)
              : ((t.__proto__ = c), b(t, o, 'GeneratorFunction')),
            (t.prototype = Object.create(d)),
            t
          );
        }
        return (
          (l.prototype = c),
          b(d, 'constructor', c),
          b(c, 'constructor', l),
          (l.displayName = 'GeneratorFunction'),
          b(c, o, 'GeneratorFunction'),
          b(d),
          b(d, o, 'Generator'),
          b(d, r, function () {
            return this;
          }),
          b(d, 'toString', function () {
            return '[object Generator]';
          }),
          (v = function () {
            return { w: i, m: s };
          })()
        );
      }
      function b(t, e, n, r) {
        var o = Object.defineProperty;
        try {
          o({}, '', {});
        } catch (t) {
          o = 0;
        }
        ((b = function (t, e, n, r) {
          function i(e, n) {
            b(t, e, function (t) {
              return this._invoke(e, n, t);
            });
          }
          e
            ? o
              ? o(t, e, { value: n, enumerable: !r, configurable: !r, writable: !r })
              : (t[e] = n)
            : (i('next', 0), i('throw', 1), i('return', 2));
        }),
          b(t, e, n, r));
      }
      function m(t, e, n, r, o, i, a) {
        try {
          var u = t[i](a),
            l = u.value;
        } catch (t) {
          return void n(t);
        }
        u.done ? e(l) : Promise.resolve(l).then(r, o);
      }
      function h(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
        return r;
      }
      var g = 'FOLLOW_MOOC_MODAL';
      e.default = function (t) {
        ((0, f.default)(d.default), t.open);
        var e,
          n,
          r = (0, u.useContext)(c.default).g,
          a =
            ((e = (0, u.useState)(!1)),
            (n = 2),
            (function (t) {
              if (Array.isArray(t)) return t;
            })(e) ||
              (function (t, e) {
                var n =
                  null == t
                    ? null
                    : ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator'];
                if (null != n) {
                  var r,
                    o,
                    i,
                    a,
                    u = [],
                    l = !0,
                    c = !1;
                  try {
                    if (((i = (n = n.call(t)).next), 0 === e)) {
                      if (Object(n) !== n) return;
                      l = !1;
                    } else
                      for (
                        ;
                        !(l = (r = i.call(n)).done) && (u.push(r.value), u.length !== e);
                        l = !0
                      );
                  } catch (t) {
                    ((c = !0), (o = t));
                  } finally {
                    try {
                      if (!l && null != n.return && ((a = n.return()), Object(a) !== a)) return;
                    } finally {
                      if (c) throw o;
                    }
                  }
                  return u;
                }
              })(e, n) ||
              (function (t, e) {
                if (t) {
                  if ('string' == typeof t) return h(t, e);
                  var n = {}.toString.call(t).slice(8, -1);
                  return (
                    'Object' === n && t.constructor && (n = t.constructor.name),
                    'Map' === n || 'Set' === n
                      ? Array.from(t)
                      : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                        ? h(t, e)
                        : void 0
                  );
                }
              })(e, n) ||
              (function () {
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                );
              })()),
          p = a[0],
          b = a[1],
          _ = (function () {
            var t,
              e =
                ((t = v().m(function t() {
                  var e, n, o;
                  return v().w(function (t) {
                    for (;;)
                      switch (t.n) {
                        case 0:
                          if ((e = r.webUser && String(r.webUser.id))) {
                            t.n = 1;
                            break;
                          }
                          return t.a(2);
                        case 1:
                          if (
                            ((n = JSON.parse(localStorage.getItem(g) || '{}')),
                            !(document.referrer.indexOf('/course/') > -1) || n[e])
                          ) {
                            t.n = 3;
                            break;
                          }
                          return (
                            (t.n = 2),
                            (0, s.getUserIdAlreadyBindedStatus)().catch(function () {
                              o = void 0;
                            })
                          );
                        case 2:
                          ((o = t.v), Object.is(o, void 0) || o || b(!0));
                        case 3:
                          return t.a(2);
                      }
                  }, t);
                })),
                function () {
                  var e = this,
                    n = arguments;
                  return new Promise(function (r, o) {
                    var i = t.apply(e, n);
                    function a(t) {
                      m(i, r, o, a, u, 'next', t);
                    }
                    function u(t) {
                      m(i, r, o, a, u, 'throw', t);
                    }
                    a(void 0);
                  });
                });
            return function () {
              return e.apply(this, arguments);
            };
          })();
        return (
          (0, u.useEffect)(function () {
            _();
          }, []),
          y(
            l.Modal,
            {
              className: d.default.FollowMoocModal,
              open: p,
              visible: p,
              footer: null,
              onCancel: function () {
                return b(!1);
              },
              closable: !0,
              destroyOnClose: !0,
            },
            void 0,
            y(
              'div',
              { className: d.default.rowTip },
              void 0,
              '扫码关注微信公众号 ',
              o || (o = y('br', {})),
              '获取课程测验、作业、考试时间的提醒， 不错过课程进度的信息。',
            ),
            y(
              'div',
              { className: d.default.qrcode },
              void 0,
              i ||
                (i = y('img', {
                  src: '//edu-image.nosdn.127.net/f4f3efe84b2c41068ee57d7eb2731312.jpg?imageView&quality=100',
                })),
            ),
            y(
              'div',
              { className: d.default.rowTip },
              void 0,
              y(
                'div',
                { className: d.default.switchBox },
                void 0,
                '不再提示',
                y(l.Switch, {
                  size: 'small',
                  className: d.default.switch,
                  onChange: function (t) {
                    return (function (t) {
                      try {
                        var e = JSON.parse(localStorage.getItem(g) || '{}') || {};
                        ((e[String(r.webUser.id)] = 1),
                          t && localStorage.setItem(g, JSON.stringify(e)));
                      } catch (t) {
                        console.log('input错误');
                      }
                    })(t);
                  },
                }),
              ),
            ),
          )
        );
      };
    },
    848605: (t, e, n) => {
      'use strict';
      (Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.default = function () {
          var t,
            e,
            n,
            r,
            u,
            l = (0, o.useContext)(i.default).g;
          return {
            urlParams:
              ((r = {}),
              (u =
                -1 !== (null == l ? void 0 : l.location.href.indexOf('?'))
                  ? null == l
                    ? void 0
                    : l.location.href.match(/\?([^#.]*)([^#]?|[#(.*)])/)[1]
                  : void 0),
              u &&
                (r = u.split('&').reduce(function (t, e) {
                  if (-1 !== e.indexOf('=')) {
                    var n =
                        (function (t) {
                          if (Array.isArray(t)) return t;
                        })((i = e.split('='))) ||
                        (function (t) {
                          var e =
                            null == t
                              ? null
                              : ('undefined' != typeof Symbol && t[Symbol.iterator]) ||
                                t['@@iterator'];
                          if (null != e) {
                            var n,
                              r,
                              o,
                              i,
                              a = [],
                              u = !0,
                              l = !1;
                            try {
                              for (
                                o = (e = e.call(t)).next, !2;
                                !(u = (n = o.call(e)).done) && (a.push(n.value), 2 !== a.length);
                                u = !0
                              );
                            } catch (t) {
                              ((l = !0), (r = t));
                            } finally {
                              try {
                                if (!u && null != e.return && ((i = e.return()), Object(i) !== i))
                                  return;
                              } finally {
                                if (l) throw r;
                              }
                            }
                            return a;
                          }
                        })(i) ||
                        (function (t) {
                          if (t) {
                            if ('string' == typeof t) return a(t, 2);
                            var e = {}.toString.call(t).slice(8, -1);
                            return (
                              'Object' === e && t.constructor && (e = t.constructor.name),
                              'Map' === e || 'Set' === e
                                ? Array.from(t)
                                : 'Arguments' === e ||
                                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)
                                  ? a(t, 2)
                                  : void 0
                            );
                          }
                        })(i) ||
                        (function () {
                          throw new TypeError(
                            'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                          );
                        })(),
                      r = n[0],
                      o = n[1];
                    t[r] = o;
                  }
                  var i;
                  return t;
                }, {})),
              r),
            userInfo: null !== (t = null == l ? void 0 : l.webUser) && void 0 !== t ? t : {},
            ftlData:
              null !==
                (e =
                  null == l || null === (n = l.reactComponentLoadBootstrap) || void 0 === n
                    ? void 0
                    : n.reactComponentLoadGet()) && void 0 !== e
                ? e
                : {},
            g: l,
            d: null == l ? void 0 : l.document,
          };
        }));
      var r,
        o = n(296540),
        i = (r = n(742740)) && r.__esModule ? r : { default: r };
      function a(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
        return r;
      }
    },
    245455: (t, e) => {
      'use strict';
      (Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.default = void 0),
        (e.default = { INVOKE_MODAL_TYPE: { FOLLOW_MOOC_MODAL: 'FollowMoocModal' } }));
    },
    911440: (t, e, n) => {
      'use strict';
      (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
      var r,
        o,
        i = f(n(296540)),
        a = f(n(143414)),
        u = f(n(848605)),
        l = f(n(245455)),
        c = ['type'];
      function f(t) {
        return t && t.__esModule ? t : { default: t };
      }
      e.default = function () {
        var t,
          e,
          n = (0, u.default)().ftlData,
          f = n.type,
          d = void 0 === f ? 'batchModifyPromotion' : f,
          s = (function (t, e) {
            if (null == t) return {};
            var n,
              r,
              o = (function (t, e) {
                if (null == t) return {};
                var n = {};
                for (var r in t)
                  if ({}.hasOwnProperty.call(t, r)) {
                    if (-1 !== e.indexOf(r)) continue;
                    n[r] = t[r];
                  }
                return n;
              })(t, e);
            if (Object.getOwnPropertySymbols) {
              var i = Object.getOwnPropertySymbols(t);
              for (r = 0; r < i.length; r++)
                ((n = i[r]),
                  -1 === e.indexOf(n) && {}.propertyIsEnumerable.call(t, n) && (o[n] = t[n]));
            }
            return o;
          })(n, c);
        return d == l.default.INVOKE_MODAL_TYPE.FOLLOW_MOOC_MODAL
          ? JSON.parse(window.localStorage.getItem('LEARN_PAGE_GLOBAL_CERTIFIED_MODAL') || '{}')[
              null === (t = window) || void 0 === t || null === (e = t.termDto) || void 0 === e
                ? void 0
                : e.id
            ]
            ? i.default.createElement(a.default, s)
            : r || (r = i.default.createElement(i.default.Fragment, null))
          : o || (o = i.default.createElement(i.default.Fragment, null));
      };
    },
  },
]);
