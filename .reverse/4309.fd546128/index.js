(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [4309],
  {
    201583: (e, t, o) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var r,
        n = o(585102),
        s = o(397338),
        a = h(o(892156)),
        i = h(o(108182)),
        l = h(o(33306)),
        c = h(o(290176)),
        u = o(744499),
        d = h(o(686663)),
        p = h(o(296540)),
        f = h(o(440961)),
        b = h(o(348282)),
        E = h(o(375439)),
        A = h(o(615010)),
        y = h(o(320551)),
        m = h(o(891482)),
        O = h(o(282262)),
        v = o(935852),
        g = o(434639);
      function h(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function P(e, t, o, n) {
        r ||
          (r = ('function' == typeof Symbol && Symbol.for && Symbol.for('react.element')) || 60103);
        var s = e && e.defaultProps,
          a = arguments.length - 3;
        if ((t || 0 === a || (t = { children: void 0 }), 1 === a)) t.children = n;
        else if (a > 1) {
          for (var i = Array(a), l = 0; l < a; l++) i[l] = arguments[l + 3];
          t.children = i;
        }
        if (t && s) for (var c in s) void 0 === t[c] && (t[c] = s[c]);
        else t || (t = s || {});
        return {
          $$typeof: r,
          type: e,
          key: void 0 === o ? null : '' + o,
          ref: null,
          props: t,
          _owner: null,
        };
      }
      t.default = function (e) {
        var t,
          o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          r =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : document.getElementById('app'),
          h = arguments.length > 3 ? arguments[3] : void 0;
        ((0, v.setLocal)((0, v.getLocalFromUrl)(window.location.pathname)),
          (0, g.setLocal)((0, v.getLocal)()),
          !c.default.desktop() && A.default.flexible());
        var R = (0, u.createBrowserHistory)(),
          C = {
            insertCss: function () {
              for (var e = arguments.length, t = new Array(e), o = 0; o < e; o++)
                t[o] = arguments[o];
              var r = t.map(function (e) {
                var t;
                return null === (t = e._insertCss) || void 0 === t ? void 0 : t.call(e);
              });
              return function () {
                return r.forEach(function (e) {
                  return e();
                });
              };
            },
            store: (0, y.default)(o, { doc: document }),
            storeSubscription: null,
            g: window,
          };
        ((C.pathname = window.location.pathname),
          (C.query = d.default.parse(window.location.search)),
          (C.lang = Object.assign({}, (0, O.default)(), (0, m.default)(), (0, g.getLang)())),
          (C.langType = (0, v.getLocal)()));
        var _ = null !== (t = o.locale) && void 0 !== t ? t : a.default,
          N = { ch: a.default, en: i.default, ja: l.default };
        ((0, v.isImoocUrl)(C.pathname) && (_ = N[C.langType]),
          f.default.render(
            P(
              n.ThemeProvider,
              { theme: E.default },
              void 0,
              P(
                s.ConfigProvider,
                { locale: _ },
                void 0,
                P(b.default, { hsitory: R, context: C }, void 0, p.default.createElement(e, h)),
              ),
            ),
            r,
          ));
      };
    },
    742740: (e, t, o) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var r,
        n = (r = o(296540)) && r.__esModule ? r : { default: r };
      t.default = n.default.createContext({});
    },
    348282: (e, t, o) => {
      'use strict';
      function r(e) {
        return (
          (r =
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
          r(e)
        );
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = d(o(296540)),
        s = (d(o(605556)), o(961225)),
        a = d(o(146166));
      o(286603);
      var i,
        l = d(o(742740)),
        c = o(601884),
        u = o(196574);
      function d(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function p(e, t, o, r) {
        i ||
          (i = ('function' == typeof Symbol && Symbol.for && Symbol.for('react.element')) || 60103);
        var n = e && e.defaultProps,
          s = arguments.length - 3;
        if ((t || 0 === s || (t = { children: void 0 }), 1 === s)) t.children = r;
        else if (s > 1) {
          for (var a = Array(s), l = 0; l < s; l++) a[l] = arguments[l + 3];
          t.children = a;
        }
        if (t && n) for (var c in n) void 0 === t[c] && (t[c] = n[c]);
        else t || (t = n || {});
        return {
          $$typeof: i,
          type: e,
          key: void 0 === o ? null : '' + o,
          ref: null,
          props: t,
          _owner: null,
        };
      }
      function f(e, t) {
        var o = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          (t &&
            (r = r.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            o.push.apply(o, r));
        }
        return o;
      }
      function b(e) {
        for (var t = 1; t < arguments.length; t++) {
          var o = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? f(Object(o), !0).forEach(function (t) {
                E(e, t, o[t]);
              })
            : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
              : f(Object(o)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t));
                });
        }
        return e;
      }
      function E(e, t, o) {
        return (
          (t = y(t)) in e
            ? Object.defineProperty(e, t, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = o),
          e
        );
      }
      function A(e, t) {
        for (var o = 0; o < t.length; o++) {
          var r = t[o];
          ((r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(e, y(r.key), r));
        }
      }
      function y(e) {
        var t = (function (e) {
          if ('object' != r(e) || !e) return e;
          var t = e[Symbol.toPrimitive];
          if (void 0 !== t) {
            var o = t.call(e, 'string');
            if ('object' != r(o)) return o;
            throw new TypeError('@@toPrimitive must return a primitive value.');
          }
          return String(e);
        })(e);
        return 'symbol' == r(t) ? t : t + '';
      }
      function m() {
        try {
          var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (e) {}
        return (m = function () {
          return !!e;
        })();
      }
      function O(e) {
        return (
          (O = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e);
              }),
          O(e)
        );
      }
      function v(e, t) {
        return (
          (v = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (e, t) {
                return ((e.__proto__ = t), e);
              }),
          v(e, t)
        );
      }
      var g = (function (e) {
        function t() {
          return (
            (function (e, t) {
              if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
            })(this, t),
            (function (e, t, o) {
              return (
                (t = O(t)),
                (function (e, t) {
                  if (t && ('object' == r(t) || 'function' == typeof t)) return t;
                  if (void 0 !== t)
                    throw new TypeError('Derived constructors may only return object or undefined');
                  return (function (e) {
                    if (void 0 === e)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called",
                      );
                    return e;
                  })(e);
                })(e, m() ? Reflect.construct(t, o || [], O(e).constructor) : t.apply(e, o))
              );
            })(this, t, arguments)
          );
        }
        return (
          (function (e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError('Super expression must either be null or a function');
            ((e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 },
            })),
              Object.defineProperty(e, 'prototype', { writable: !1 }),
              t && v(e, t));
          })(t, e),
          (o = t),
          (i = [
            {
              key: 'componentDidMount',
              value: function () {
                this.props.context.g;
                var e = document.querySelector('#uicss-server-side');
                (e && e.parentNode.removeChild(e),
                  document.addEventListener('click', u.handleGlobalClick),
                  setTimeout(function () {
                    (0, u.initTrackPV)();
                  }, 500));
              },
            },
            {
              key: 'componentWillUnmount',
              value: function () {
                document.removeEventListener('click', u.handleGlobalClick);
              },
            },
            {
              key: 'render',
              value: function () {
                var e,
                  t = this.props.context,
                  o = t.store,
                  r = t.insertCss;
                return p(
                  s.Provider,
                  { store: o },
                  void 0,
                  p(
                    a.default.Provider,
                    { value: { insertCss: r } },
                    void 0,
                    p(
                      l.default.Provider,
                      {
                        value: b(
                          b({}, this.props.context),
                          {},
                          {
                            fetch: (0, c.fetch)({
                              doc:
                                null === (e = this.props.context.g) || void 0 === e
                                  ? void 0
                                  : e.document,
                            }),
                            store: this.props.context.store,
                          },
                        ),
                      },
                      void 0,
                      n.default.Children.only(this.props.children),
                    ),
                  ),
                );
              },
            },
          ]) && A(o.prototype, i),
          Object.defineProperty(o, 'prototype', { writable: !1 }),
          o
        );
        var o, i;
      })(n.default.PureComponent);
      t.default = g;
    },
    68192: (e, t, o) => {
      'use strict';
      function r(e) {
        return (
          (r =
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
          r(e)
        );
      }
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n,
        s,
        a = (function (e) {
          if ('function' == typeof WeakMap) {
            var t = new WeakMap();
            new WeakMap();
          }
          return (function (e) {
            if (e && e.__esModule) return e;
            var o,
              n,
              s = { __proto__: null, default: e };
            if (null === e || ('object' != r(e) && 'function' != typeof e)) return s;
            if ((o = t)) {
              if (o.has(e)) return o.get(e);
              o.set(e, s);
            }
            for (var a in e)
              'default' !== a &&
                {}.hasOwnProperty.call(e, a) &&
                ((n = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, a)) &&
                (n.get || n.set)
                  ? o(s, a, n)
                  : (s[a] = e[a]));
            return s;
          })(e);
        })(o(296540)),
        i = o(397338),
        l = (n = o(245752)) && n.__esModule ? n : { default: n };
      t.default = (0, l.default)(function (e) {
        var t = e.err,
          o = e.clear;
        return (
          (0, a.useEffect)(
            function () {
              t && i.message.error(t, 3, o);
            },
            [t],
          ),
          s || (s = a.default.createElement(a.default.Fragment, null))
        );
      });
    },
    245752: (e, t, o) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.s$ = t.default = void 0));
      var r,
        n = (function (e) {
          if ('function' == typeof WeakMap) {
            var t = new WeakMap();
            new WeakMap();
          }
          return (function (e) {
            if (e && e.__esModule) return e;
            var o,
              r,
              n = { __proto__: null, default: e };
            if (null === e || ('object' != a(e) && 'function' != typeof e)) return n;
            if ((o = t)) {
              if (o.has(e)) return o.get(e);
              o.set(e, n);
            }
            for (var s in e)
              'default' !== s &&
                {}.hasOwnProperty.call(e, s) &&
                ((r = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, s)) &&
                (r.get || r.set)
                  ? o(n, s, r)
                  : (n[s] = e[s]));
            return n;
          })(e);
        })(o(296540)),
        s = o(764046);
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
      function i(e, t) {
        for (var o = 0; o < t.length; o++) {
          var r = t[o];
          ((r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(e, p(r.key), r));
        }
      }
      function l() {
        try {
          var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
        } catch (e) {}
        return (l = function () {
          return !!e;
        })();
      }
      function c(e) {
        return (
          (c = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e);
              }),
          c(e)
        );
      }
      function u(e, t) {
        return (
          (u = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (e, t) {
                return ((e.__proto__ = t), e);
              }),
          u(e, t)
        );
      }
      function d(e, t, o) {
        return (
          (t = p(t)) in e
            ? Object.defineProperty(e, t, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = o),
          e
        );
      }
      function p(e) {
        var t = (function (e) {
          if ('object' != a(e) || !e) return e;
          var t = e[Symbol.toPrimitive];
          if (void 0 !== t) {
            var o = t.call(e, 'string');
            if ('object' != a(o)) return o;
            throw new TypeError('@@toPrimitive must return a primitive value.');
          }
          return String(e);
        })(e);
        return 'symbol' == a(t) ? t : t + '';
      }
      var f = (t.s$ = new s.Subject());
      t.default = function (e) {
        return (function (t) {
          function o() {
            var e;
            !(function (e, t) {
              if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
            })(this, o);
            for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
            return (
              d(
                (e = (function (e, t, o) {
                  return (
                    (t = c(t)),
                    (function (e, t) {
                      if (t && ('object' == a(t) || 'function' == typeof t)) return t;
                      if (void 0 !== t)
                        throw new TypeError(
                          'Derived constructors may only return object or undefined',
                        );
                      return (function (e) {
                        if (void 0 === e)
                          throw new ReferenceError(
                            "this hasn't been initialised - super() hasn't been called",
                          );
                        return e;
                      })(e);
                    })(e, l() ? Reflect.construct(t, o || [], c(e).constructor) : t.apply(e, o))
                  );
                })(this, o, [].concat(r))),
                'state',
                { err: null },
              ),
              d(e, 'clear', function () {
                return e.setState({ err: null });
              }),
              e
            );
          }
          return (
            (function (e, t) {
              if ('function' != typeof t && null !== t)
                throw new TypeError('Super expression must either be null or a function');
              ((e.prototype = Object.create(t && t.prototype, {
                constructor: { value: e, writable: !0, configurable: !0 },
              })),
                Object.defineProperty(e, 'prototype', { writable: !1 }),
                t && u(e, t));
            })(o, t),
            (n = o),
            (s = [
              {
                key: 'componentDidMount',
                value: function () {
                  var e = this;
                  f.subscribe(function (t) {
                    var o;
                    e.setState({
                      err: null !== (o = null == t ? void 0 : t.message) && void 0 !== o ? o : null,
                    });
                  });
                },
              },
              {
                key: 'render',
                value: function () {
                  var t = this.state.err;
                  return (function (e, t, o, n) {
                    r ||
                      (r =
                        ('function' == typeof Symbol &&
                          Symbol.for &&
                          Symbol.for('react.element')) ||
                        60103);
                    var s = e && e.defaultProps,
                      a = arguments.length - 3;
                    if ((t || 0 === a || (t = { children: void 0 }), 1 === a)) t.children = n;
                    else if (a > 1) {
                      for (var i = Array(a), l = 0; l < a; l++) i[l] = arguments[l + 3];
                      t.children = i;
                    }
                    if (t && s) for (var c in s) void 0 === t[c] && (t[c] = s[c]);
                    else t || (t = s || {});
                    return {
                      $$typeof: r,
                      type: e,
                      key: void 0 === o ? null : '' + o,
                      ref: null,
                      props: t,
                      _owner: null,
                    };
                  })(e, { err: t, clear: this.clear });
                },
              },
            ]),
            s && i(n.prototype, s),
            Object.defineProperty(n, 'prototype', { writable: !1 }),
            n
          );
          var n, s;
        })(n.PureComponent);
      };
    },
    688346: (e, t, o) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var r,
        n = o(245752),
        s = (r = o(68192)) && r.__esModule ? r : { default: r };
      t.default = { Error: s.default, s$: n.s$ };
    },
    297691: (e, t, o) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'error', {
          enumerable: !0,
          get: function () {
            return n.default;
          },
        }));
      var r,
        n = (r = o(688346)) && r.__esModule ? r : { default: r };
    },
    274776: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = {
          COURSE_LEARNING_PROGRESS: { ALL: 30, FINISH: 0, GOING: 10, NOT_START: 20 },
          PRODUCT_TYPE: { MOOC: 1, KAOYAN: 2, COLUMN: 3 },
          COURSE_CARD_TYPE: { KAOYAN: 301, PACKAGES: 302, COLUMN: 304, MOOC: 306, ADULT: 401 },
          COURSE_TYPE: { COURSE: 301, COURSE_PACKAGE: 302, PROMOTION: 303, COLUMN: 304, MOOC: 306 },
          MODE_TYPE: { MOOC: 0, SPOC_SYNC: 10, SPOC_ASYNC: 15, SPOC_ONLY: 20 },
          DEFAULT_COURSE_COVER:
            '//edu-image.nosdn.127.net/65d6907b-b4ff-4409-bbcc-e4dcc285e00b.jpg?imageView&quality=100',
          UNDETERMINDED_STARTTIME: 32503651201e3,
          UNDETERMINDED_ENDTIME: 32535187201e3,
          TERM_LEARNING_PROGRESS_STATUS: {
            FINISH: 0,
            FINISH_VISIBLE_CONTENT: 5,
            GOING: 10,
            NOT_START: 20,
            UNDETERMINDED_START: 21,
          },
          ORDER_TYPE: { SUM_UP: 0, NEW: 10, HOT: 20 },
        }));
    },
    789961: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = {
          DEFAULT_AVATOR: 'https://edu-image.nosdn.127.net/49E89BEA3F1B3F1AC788F5F94C4A457F.png',
          ChevronRightIcon:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAB1UlEQVR4Xu3csU0EQQwFUK9oA6rYaYKMAImAGmiInACJgEJmtwlog1000gUI6U4nzY39/z9PumPJ++zJLE+Wp0tg6orOYEvAziZIQFTAdV3vt217PeT3Ukr57MwVMnxYB9Zav8zs9vDXP9M0Pc/z/A6p0JGUF2BLURJxJOCDmX2Y2c2fAsshDgNsaMuyPO37/qaMOBTwGhCHA6ojugAqI7oBqiK6AioiugOqIYYAKiGGAaoghgIqIIYDsiNCADIjwgCyIkIBMiLCAbIhQgIyIcICsiBCAzIgwgOiI1IAIiPSAKIiUgEiItIBoiFSAiIh0gKiIFIDIiDSA0YjSgBGIsoARiFKAUYgygGeQjSzx0tPykoCnkD8LqXcte+XOgnYKSkJeGywM5/wGd3iPRUr1YHeeK2eMoAReDKAUXgSgJF49IDReNSACHi0gCh4lIBIeHSAaHhUgIh4NICoeBSAyHjwgOh40IAMeLCALHiQgEx4cIBseFCAjHgwgKx4EIDMeOGA7HihgAp4YYAqeCGASnjugGp4roCKeG6AqngugMp4wwHV8YYC1lpzAeMZ02RHr/zbodruyW2vHN2BuYS2pwNzDXKP3hXFygxYRtUsATvlE7AT8BeHaXJv1YnIEgAAAABJRU5ErkJggg==',
          ChevronRightHoverIcon:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAB1klEQVR4Xu3cMU7EQAwF0FhcYzkQHcVKW1AnqThQJjUFEgV3gmsgoyAh0RCtNDv2/z+TNrE0ef7TWbahP1UCVlXdi4cOWBmCDogKWEp5GIahbOdz9+d5nt8rzwpZ3iyBpZQPdz9tf21mX2b2NI7jK6RCxaFCAJURmwEuy/JoZm/ufvfbYMUkNgPc0NZ1vbj7izJiU8AjIDYHVEcMAVRGDANURQwFVEQMB1RDTAFUQkwDVEFMBVRATAdkR4QAZEaEAWRFhAJkRIQDZEOEBGRChAVkQYQGZECEB0RHpABERqQBREWkAkREpANEQ6QEREKkBURBpAZEQKQHzEaUAMxElAHMQpQCzECUA9xDdPfzrSdlJQF3ED+nabrf3t/q6YCVkpKA/w129it8RVqip2KlEhiNt/VTBjADTwYwC08CMBOPHjAbjxoQAY8WEAWPEhAJjw4QDY8KEBGPBhAVjwIQGQ8eEB0PGpABDxaQBQ8SkAkPDpANDwqQEQ8GkBUPApAZLx2QHS8VUAEvDVAFLwVQCS8cUA0vFFARLwxQFS8EUBmvOaA6XlPAvoDxilGyvU/+7lD96ZToHtVm01l9CW19Avsa5ErDQ5Q3u8KH0FOaUM1qWE9gpfw3L3FKfrW9wL4AAAAASUVORK5CYII=',
          ChevronLeftIcon:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAB6UlEQVR4Xu3cvU3HMBAF8EtYA5ZIPAgFEgU9CzEDBRIFHUs4U8AafwVZSpEiQY4c+967XNrc5eOns9w8uRO/igS6om5vFgcsHAIHdMBtgRjjo4i8pbt9378Ow/BdaLXZbnICp2l6nuf5XUTulr/+DSE8OGCGwAZe6nLADDvZwbuJyFMI4SvnGUdrzCzhPbyu617Gcfw4CpNbbwJQCy8h0wNq4tEDauNRAyLg0QKi4FECIuHRAaLhUQEi4tEAouJRACLjwQOi40EDMuDBArLgQQIy4cEBsuFBATLiwQCy4kEAMuOpA7LjqQJawFMDtIKnAmgJrzmgNbymgBbxmgFaxWsCaBmvOqB1vKqAV8CrBngVvCqASzL0cxVuTO+51U5J5aapzq47PVwUY/wRkfvVh5rFqzWBDlgy5r6ES/SWXt9EHDFb4PRNZP3mK0xiVcCEaR2xOqB1xCaAlhGbAVpFbApoEbE5oDVEFUBLiGqAVhBVAS0gqgOyI0IAMiPCALIiQgEyIsIBsiFCAjIhwgKyIEIDMiDCA6IjUgAiI9IAoiJSASIi0gGiIVICIiHSAqIgUgMiINIDaiOaANRENAP4H6IfwJidldrN4vgRoAcMtwJNDngEMNX6MchHxZTqTW0iGoYOWKjugIWAf7DYcG8/3yvXAAAAAElFTkSuQmCC',
          ChevronLeftHoverIcon:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAB7ElEQVR4Xu3csU7EMAwG4LN4DXgnBiQG5qYPxNTrzIDEwMYDwWucjO7USui4opRc4v933bV2o3yym8WK7OIpEpCi7EjeBWBhEQRgAF4WGIbhXkSep7cppfRRaHUx3WUFjuP4qKovqnpz3LWIfKWU7gIwQ+AcLwAz0OaQBbyDqj70ff++4lPZoW5aeAlPRJ66rnvNFlkZ6ALQCu/0e1gJDhduiUcPaI1HDYiARwuIgkcJiIRHB4iGRwWIiEcDiIpHAYiMBw+IjgcNyIAHC8iCBwnIhAcHyIYHBciIBwPIigcByIxnDsiOZwroAc8M0AueCaAnvOaA3vCaAnrEawboFa8JoGe86oDe8aoCbgGvGuBW8KoATpOhb/Nw42kRkUPtKSmroZ2rDxft9/tPVb2dN+QZr0oFBmBhL0QLFwIe0+MQCcRsgasfIj9X3kIlVgXcQjtXB/SO2ATQM2IzQK+ITQE9IjYH9IZoAugJ0QzQC6IpoAdEc0B2RAhAZkQYQFZEKEBGRDhANkRIQCZEWEAWRGhABkR4QHRECkBkRBpAVEQqQEREOkA0REpAJERaQBREakAERHpAa0QXgJaIbgD/QowLGLNnpRZH6+IO1RWGv+YT4xLaNXpTbFyD/A80ixRXh0gAWggUrhkVWAj4DRkcSH5AOWK1AAAAAElFTkSuQmCC',
          DEFAULT_CH: 'ch',
        }));
    },
    398461: (e, t, o) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var r = l(o(274776)),
        n = l(o(555860)),
        s = l(o(312280)),
        a = l(o(784052)),
        i = l(o(789961));
      function l(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.default = {
        COURSE: r.default,
        TIME: n.default,
        URL_PREFIX: s.default,
        PROMOTION: a.default,
        DEFAULT_CONST: i.default,
      };
    },
    784052: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = {
          PURCHASE_STATUS: {
            NOT_HAVE_PROMOTION: 0,
            PROMOTION_NOT_START: 1,
            PROMOTING: 2,
            PROMOTION_END: 3,
          },
          PURCHASE_TARGET_TYPE: { PURCHASE_LIMIT: 0, PURCHASE_PROMOTION: 2 },
          PROMOTION_TYPE: { NORMAL: 0, GROUP_BUY: 1, LIMIT: 2, PROMOTION: 3, BARGAIN: 4 },
          PURCHASE_OPEN: 2,
        }));
    },
    555860: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = { DAY: 864e5, WEEK: 6048e5 }));
    },
    312280: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0),
        (t.default = { COURSE_INFO_PREFIX: '/course/', SPOC_COURSE_INFO_PREFIX: '/spoc/course/' }));
    },
    242634: () => {},
    508330: (e) => {
      'use strict';
      e.exports = JSON.parse(
        '{"name":"react-mooc","version":"1.0.0","main":"index.js","license":"MIT","engines":{"node":">=6.13.1","npm":">=3.10.10"},"sideEffects":false,"browserslist":[">1%","last 4 versions","Firefox ESR","not ie < 9"],"devDependencies":{"@babel/cli":"^7.26.4","@babel/core":"^7.26.9","@babel/node":"^7.26.0","@babel/plugin-proposal-class-properties":"^7.18.6","@babel/plugin-proposal-decorators":"^7.25.9","@babel/plugin-proposal-do-expressions":"^7.25.9","@babel/plugin-proposal-nullish-coalescing-operator":"^7.18.6","@babel/plugin-proposal-optional-chaining":"^7.21.0","@babel/plugin-syntax-dynamic-import":"^7.8.3","@babel/plugin-transform-react-constant-elements":"^7.2.0","@babel/plugin-transform-react-inline-elements":"~7.2.0","@babel/preset-env":"^7.26.9","@babel/preset-react":"^7.26.3","@babel/preset-typescript":"^7.26.0","@loadable/babel-plugin":"^5.16.1","@loadable/webpack-plugin":"5.7.1","@types/moment":"^2.13.0","@types/react":"^16.9.41","@types/react-dom":"^16.9.8","@types/react-redux":"^7.1.9","autoprefixer":"^9.6.0","babel-loader":"^8.0.5","babel-plugin-transform-es2015-modules-nej":"^1.1.10","babel-plugin-transform-react-pure-class-to-function":"^1.0.1","babel-plugin-transform-react-remove-prop-types":"^0.4.24","browser-sync":"^2.26.3","chalk":"^2.4.2","cross-env":"^5.2.0","css-loader":"^2.1.1","eslint":"^5.16.0","eslint-config-airbnb":"^17.1.0","eslint-config-prettier":"^4.2.0","eslint-import-resolver-node":"^0.3.2","eslint-loader":"^2.1.2","eslint-plugin-css-modules":"^2.11.0","eslint-plugin-flowtype":"^3.6.1","eslint-plugin-import":"^2.17.2","eslint-plugin-jsx-a11y":"^6.2.1","eslint-plugin-prettier":"^3.0.1","eslint-plugin-react":"^7.12.4","eslint-plugin-react-hooks":"^4.0.2","express":"^4.17.1","http-proxy-middleware":"^0.19.1","isomorphic-style-loader":"^5.0.1","lint-staged":"^8.1.5","marquee-ora":"^1.0.3","nos-node-sdk":"^0.0.5","null-loader":"^1.0.0","ora":"^5.1.0","pixrem":"^5.0.0","pleeease-filters":"^4.0.0","postcss":"^7.0.14","postcss-adaptive":"^0.5.0","postcss-apply":"^0.12.0","postcss-calc":"^7.0.1","postcss-color-function":"^4.1.0","postcss-custom-media":"^7.0.8","postcss-custom-properties":"^8.0.10","postcss-custom-selectors":"^5.1.2","postcss-define-function":"^0.1.2","postcss-extend":"^1.0.5","postcss-flexbugs-fixes":"^4.1.0","postcss-import":"^12.0.1","postcss-loader":"^3.0.0","postcss-media-minmax":"^4.0.0","postcss-mixins":"^6.2.2","postcss-nested":"^4.1.2","postcss-nesting":"^7.0.0","postcss-preset-env":"^6.6.0","postcss-pseudoelements":"^5.0.0","postcss-selector-matches":"^4.0.0","postcss-selector-not":"^4.0.0","postcss-utilities":"^0.8.4","prettier":"^1.17.0","source-map-support":"^0.5.19","style-loader":"^1.3.0","stylelint":"^10.0.1","stylelint-config-standard":"^18.3.0","stylelint-order":"^3.0.0","svg-sprite-loader":"^5.0.0","thread-loader":"^4.0.4","typescript":"^3.9.3","typings-for-css-modules-loader":"^1.7.0","webpack":"5.97.1","webpack-assets-manifest":"^5.2.1","webpack-bundle-analyzer":"^4.10.2","webpack-cli":"6.0.1"},"dependencies":{"@ant-design/icons":"^4.2.1","@edu-common/mooc-chat":"^0.1.40","@edu-common/mooc-package":"^2.2.11","@loadable/component":"5.10.1","@loadable/server":"5.9.0","@material-ui/core":"^4.0.1","@material-ui/icons":"^4.0.1","antd":"^4.16.3","antd-mobile":"^2.3.3","axios":"^0.18.0","babel-eslint":"^10.0.2","babel-plugin-dynamic-import-node":"^2.3.3","babel-plugin-import":"^1.12.2","body-parser":"^1.18.3","braft-editor":"^2.3.9","classnames":"^2.2.6","connect-history-api-fallback":"^1.6.0","cookie-parser":"^1.4.4","copy-to-clipboard":"^3.3.1","core-js":"3.41.0","current-device":"^0.8.2","echarts":"^5.5.1","fastclick":"^1.0.6","glob":"^7.1.4","history":"^4.9.0","js-base64":"^2.5.1","mkdirp":"^0.5.1","moment":"^2.24.0","mooc-bussiness-components":"git+ssh://git@g.hz.netease.com:22222/edu-mooc-frontend/mooc-bussiness-components.git#publish","mooc-packaged-components":"git+https://oauth2:pCwD5yBPooPxccd5m42b@g.hz.netease.com/edu-mooc-frontend/mooc-packaged-components.git#publish","normalize.css":"^8.0.1","number-precision":"^1.5.0","pretty-error":"^2.1.1","prop-types":"^15.7.2","qrcode.react":"^1.0.1","qs":"^6.7.0","query-string":"^6.8.1","react":"16.14.0","react-content-loader":"^4.3.3","react-deep-force-update":"^2.1.3","react-dev-utils":"^8.0.0","react-dom":"16.13.1","react-lazyload":"^2.6.5","react-load-script":"^0.0.6","react-loadable":"5.5.0","react-quill":"^1.3.5","react-redux":"^7.0.2","react-router":"^5.1.0","react-router-dom":"^5.0.0","react-weui":"^1.2.1","redux":"^4.0.1","redux-devtools-extension":"^2.13.8","redux-logger":"^3.0.6","redux-observable":"^1.1.0","reduxsauce":"^1.1.0","request":"^2.88.0","request-promise":"^4.2.4","reselect":"^4.0.0","rimraf":"^2.6.3","rxjs":"^6.5.1","serialize-javascript":"^1.7.0","tslib":"2.4.1","typeface-roboto":"^0.0.54","webpack-dev-middleware":"^3.6.2","webpack-hot-middleware":"^2.24.3","weui":"1.1.0"},"lint-staged":{"ignore":["package.json"],"linters":{"*.{js,jsx}":["eslint --no-ignore --fix","git add --force"],"*.{json,md,graphql}":["prettier --write","git add --force"],"*.{css,less,styl,scss,sass,sss}":["stylelint --fix","git add --force"]}},"resolutions":{"react":"16.13.1","react-dom":"16.13.1","@edu-common/mooc-package":"2.2.11","@antv/g6":"4.8.25","**/color":"3.2.1","@winman-f2e/nos-js":"1.0.2","@winman-f2e/nos-js-web":"1.0.1","prosemirror-state":"1.4.3","prosemirror-history":"1.4.1","prosemirror-inputrules":"1.5.0","prosemirror-model":"1.25.3","prosemirror-keymap":"1.2.3","prosemirror-transform":"1.10.4","prosemirror-view":"1.41.0"},"overrides":{"@edu-common/mooc-package":"$@edu-common/mooc-package","@antv/g6":"4.8.25","@antv/matrix-util":"3.1.0-beta.3","size-sensor":"1.0.2"},"scripts":{"precommit":"lint-staged","lint-js":"eslint --ignore-path .gitignore --ignore-pattern \\"!**/.*\\" .","lint-css":"stylelint \\"src/**/*.{css,less,styl,scss,sass,sss}\\"","lint":"yarn run lint-js && yarn run lint-css","fix-js":"yarn run lint-js --fix","fix-css":"yarn run lint-css --fix","fix":"yarn run fix-js && yarn run fix-css","type-check":"tsc --noEmit","type-check:watch":"yarn type-check -- --watch","dev":"cross-env NODE_ENV=development babel-node ./tools/run start --inspect --max_old_space_size=4096","start":"cross-env NODE_ENV=development babel-node ./tools/run start --inspect","dev-teach":"cross-env NODE_ENV=development PROJECT=teach babel-node ./tools/run start --inspect","dev-admin":"cross-env NODE_ENV=development PROJECT=admin babel-node ./tools/run start --inspect","dev-main":"cross-env NODE_ENV=development PROJECT=main babel-node ./tools/run start --inspect","build-stats":"yarn run build --release --analyse","bundle":"yarn bundle-main && yarn bundle-kaoyan && yarn bundle-teach && yarn bundle-h5","bundle-main":"cross-env NODE_ENV=production PROJECT=main PROJECT_EVN=test babel-node ./tools/run bundle","bundle-main-remote":"cross-env NODE_ENV=production PROJECT=main PROJECT_EVN=test BUILD_ENV=remote babel-node ./tools/run bundle","bundle-main:analyze":"cross-env NODE_ENV=production PROJECT=main ANALYZE=analyze PROJECT_EVN=test babel-node ./tools/run bundle","bundle-kaoyan":"cross-env NODE_ENV=production PROJECT=kaoyan babel-node ./tools/run bundle","bundle-kaoyan-remote":"cross-env NODE_ENV=production PROJECT=kaoyan PROJECT_EVN=test BUILD_ENV=remote babel-node ./tools/run bundle","bundle-teach":"cross-env NODE_ENV=production PROJECT=teach PROJECT_EVN=test babel-node ./tools/run bundle","bundle-teach-remote":"cross-env NODE_ENV=production PROJECT=teach PROJECT_EVN=test BUILD_ENV=remote babel-node ./tools/run bundle","bundle-teach:analyze":"cross-env NODE_ENV=production PROJECT=teach ANALYZE=analyze PROJECT_EVN=test babel-node ./tools/run bundle","bundle-h5":"cross-env NODE_ENV=production PROJECT=h5 PROJECT_EVN=test babel-node ./tools/run bundle","bundle-h5-remote":"cross-env NODE_ENV=production PROJECT=h5 PROJECT_EVN=test BUILD_ENV=remote babel-node ./tools/run bundle","bundle-h5:analyze":"cross-env NODE_ENV=production PROJECT=h5 ANALYZE=analyze PROJECT_EVN=test babel-node ./tools/run bundle","bundle-cms":"cross-env NODE_ENV=production PROJECT=cms PROJECT_EVN=test babel-node ./tools/run bundle","bundle-cms-pre":"cross-env NODE_ENV=production PROJECT=cms PROJECT_EVN=pre babel-node ./tools/run bundle","bundle-cms-online":"cross-env NODE_ENV=production PROJECT=cms PROJECT_EVN=online babel-node ./tools/run bundle","fb:teach":"cross-env PROJECT=teach babel-node ./tools/run fetchBootstrap","fb:main":"cross-env PROJECT=main babel-node ./tools/run fetchBootstrap","fb:h5":"cross-env PROJECT=h5 babel-node ./tools/run fetchBootstrap","cp:teach":"cross-env PROJECT=teach babel-node ./tools/run cpBootstrap","cp:main":"cross-env PROJECT=main babel-node ./tools/run cpBootstrap","cp:h5":"cross-env PROJECT=h5 babel-node ./tools/run cpBootstrap","cp:cms":"cross-env PROJECT=cms babel-node ./tools/run cpBootstrap","projector":"cross-env NODE_ENV=production babel-node ./tools/projector","transform":"cross-env NODE_ENV=production babel-node ./tools/transform","transport":"babel-node ./tools/transport","nosUpload":"babel-node ./tools/nosUpload","nosUploadNode":"babel-node ./tools/nosUploadWithNodePkg","socket":"babel-node ./tools/startWithDevSocket","transverter":"yarn transform && yarn transport","test":"cross-env NODE_ENV=production PROJECT=h5 PROJECT_EVN=test babel-node ./tools/test","git":"cross-env NODE_ENV=production babel-node ./tools/run gitCommit","deploy:overmind":"cross-env DEPLOY_ENV=overmind babel-node ./tools/run deploy","deploy:ndp":"cross-env  DEPLOY_ENV=ndp babel-node ./tools/run deploy","cmstest":"cross-env  babel-node ./tools/run cms"},"packageManager":"yarn@1.22.22+sha512.a6b2f7906b721bba3d67d4aff083df04dad64c399707841b7acf00f6b133b7ac24255f2652fa22ae3534329dc6180534e98d17432037ff6fd140556e2bb3137e"}',
      );
    },
  },
]);
