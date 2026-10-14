/*! For license information please see TextbookRecommendTextbookSideBox-entry.50bf315b.chunk.js.LICENSE.txt */
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [82294],
  {
    84345: (e, t, n) => {
      ((t = e.exports = n(576314)(!1)).push([
        e.id,
        '._2wWmJ {\n  position: relative;\n  width: 100%;\n  min-width: 280px;\n  padding: 20px;\n  border-radius: 8px;\n  background: #FFF;\n}\n\n._2wWmJ .bCwUT {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  gap: 24px;\n}\n\n._2wWmJ,\n._2wWmJ * {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n._2wWmJ ._3fLYX {\n  color: #333;\n  font-family: "PingFang SC";\n  font-size: 18px;\n  font-style: normal;\n  font-weight: 600;\n  margin-bottom: 20px;\n}\n\n._2wWmJ ._17D3j {\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  gap: 16px;\n  width: 240px;\n  cursor: pointer;\n}\n\n._2wWmJ ._17D3j ._3EcUf {\n  -ms-flex: 0 0 80px;\n      flex: 0 0 80px;\n  -o-object-fit: contain;\n     object-fit: contain;\n  -o-object-position: center;\n     object-position: center;\n  height: 111px;\n  width: 80px;\n}\n\n._2wWmJ ._17D3j ._36T9J {\n  -ms-flex: 1 1 auto;\n      flex: 1 1 auto;\n  position: relative;\n  color: #999;\n  font-size: 12px;\n  overflow: hidden;\n}\n\n._2wWmJ ._17D3j ._36T9J>* {\n  margin-bottom: 6px;\n}\n\n._2wWmJ ._17D3j ._36T9J .DJZId {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  color: #333;\n  font-family: "PingFang SC";\n  font-size: 16px;\n  font-weight: 600;\n}\n\n._2wWmJ ._17D3j ._36T9J ._3kxXL>div:first-child,\n._2wWmJ ._17D3j ._36T9J .n7THE>div:first-child {\n  letter-spacing: 7px;\n}\n\n._2wWmJ ._17D3j ._36T9J ._3GwtD {\n  display: -ms-flexbox;\n  display: flex;\n}\n\n._2wWmJ ._17D3j ._36T9J ._3GwtD>div:first-child {\n  -ms-flex: 0 0 38px;\n      flex: 0 0 38px;\n}\n\n._2wWmJ ._17D3j ._36T9J ._3GwtD>div:last-child {\n  -ms-flex: 1 1 auto;\n      flex: 1 1 auto;\n}',
        '',
      ]),
        (t.locals = {
          RecommendTextbookSideBox: '_2wWmJ',
          showBox: 'bCwUT',
          title: '_3fLYX',
          textbookCard: '_17D3j',
          bookImg: '_3EcUf',
          info: '_36T9J',
          name: 'DJZId',
          editor: '_3kxXL',
          chiefEditor: 'n7THE',
          editorRow: '_3GwtD',
        }));
    },
    590931: (e, t, n) => {
      var o = n(84345),
        r = n(461352),
        i = 'string' == typeof o ? [[e.id, o, '']] : o;
      (((t = e.exports = o.locals || {})._getContent = function () {
        return i;
      }),
        (t._getCss = function () {
          return '' + o;
        }),
        (t._insertCss = function (e) {
          return r(i, e);
        }));
    },
    443973: (e, t, n) => {
      'use strict';
      var o = n(296540),
        r = n(146166);
      e.exports = function () {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        var i = o.useContext(r).insertCss;
        if (!i) throw new Error('Please provide "insertCss" function by StyleContext.Provider');
        i.apply(void 0, t);
      };
    },
    149528: (e, t, n) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.$hasEnrollTextbook = t.$getRelatedTextbooks = void 0));
      var o = n(477593);
      ((t.$getRelatedTextbooks = function (e) {
        return (0, o.request)({
          url: ''.concat(o.origin, '/web/j/textbookBean.getRelatedTextbooks.rpc'),
          method: 'POST',
          data: e,
          notShowErr: !0,
        });
      }),
        (t.$hasEnrollTextbook = function (e) {
          return (0, o.request)({
            url: ''.concat(o.origin, '/web/j/textbookBean.hasEnrollTextbook.rpc'),
            method: 'POST',
            data: e,
            notShowErr: !0,
          });
        }));
    },
    604983: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.REFERENCE = void 0),
        (t.REFERENCE = { COURSE_INTRO: 'course_intro', COURSE_LEARN: 'course_learn' }));
    },
    526536: (e, t, n) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var o,
        r,
        i,
        a,
        l = s(n(296540)),
        u = s(n(443973)),
        c = s(n(590931)),
        d = n(149528),
        f = n(604983);
      function s(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function v(e, t, n, o) {
        a ||
          (a = ('function' == typeof Symbol && Symbol.for && Symbol.for('react.element')) || 60103);
        var r = e && e.defaultProps,
          i = arguments.length - 3;
        if ((t || 0 === i || (t = { children: void 0 }), 1 === i)) t.children = o;
        else if (i > 1) {
          for (var l = Array(i), u = 0; u < i; u++) l[u] = arguments[u + 3];
          t.children = l;
        }
        if (t && r) for (var c in r) void 0 === t[c] && (t[c] = r[c]);
        else t || (t = r || {});
        return {
          $$typeof: a,
          type: e,
          key: void 0 === n ? null : '' + n,
          ref: null,
          props: t,
          _owner: null,
        };
      }
      function p() {
        var e,
          t,
          n = 'function' == typeof Symbol ? Symbol : {},
          o = n.iterator || '@@iterator',
          r = n.toStringTag || '@@toStringTag';
        function i(n, o, r, i) {
          var u = o && o.prototype instanceof l ? o : l,
            c = Object.create(u.prototype);
          return (
            w(
              c,
              '_invoke',
              (function (n, o, r) {
                var i,
                  l,
                  u,
                  c = 0,
                  d = r || [],
                  f = !1,
                  s = {
                    p: 0,
                    n: 0,
                    v: e,
                    a: v,
                    f: v.bind(e, 4),
                    d: function (t, n) {
                      return ((i = t), (l = 0), (u = e), (s.n = n), a);
                    },
                  };
                function v(n, o) {
                  for (l = n, u = o, t = 0; !f && c && !r && t < d.length; t++) {
                    var r,
                      i = d[t],
                      v = s.p,
                      p = i[2];
                    n > 3
                      ? (r = p === o) && ((u = i[(l = i[4]) ? 5 : ((l = 3), 3)]), (i[4] = i[5] = e))
                      : i[0] <= v &&
                        ((r = n < 2 && v < i[1])
                          ? ((l = 0), (s.v = o), (s.n = i[1]))
                          : v < p &&
                            (r = n < 3 || i[0] > o || o > p) &&
                            ((i[4] = n), (i[5] = o), (s.n = p), (l = 0)));
                  }
                  if (r || n > 1) return a;
                  throw ((f = !0), o);
                }
                return function (r, d, p) {
                  if (c > 1) throw TypeError('Generator is already running');
                  for (f && 1 === d && v(d, p), l = d, u = p; (t = l < 2 ? e : u) || !f;) {
                    i || (l ? (l < 3 ? (l > 1 && (s.n = -1), v(l, u)) : (s.n = u)) : (s.v = u));
                    try {
                      if (((c = 2), i)) {
                        if ((l || (r = 'next'), (t = i[r]))) {
                          if (!(t = t.call(i, u)))
                            throw TypeError('iterator result is not an object');
                          if (!t.done) return t;
                          ((u = t.value), l < 2 && (l = 0));
                        } else
                          (1 === l && (t = i.return) && t.call(i),
                            l < 2 &&
                              ((u = TypeError(
                                "The iterator does not provide a '" + r + "' method",
                              )),
                              (l = 1)));
                        i = e;
                      } else if ((t = (f = s.n < 0) ? u : n.call(o, s)) !== a) break;
                    } catch (t) {
                      ((i = e), (l = 1), (u = t));
                    } finally {
                      c = 1;
                    }
                  }
                  return { value: t, done: f };
                };
              })(n, r, i),
              !0,
            ),
            c
          );
        }
        var a = {};
        function l() {}
        function u() {}
        function c() {}
        t = Object.getPrototypeOf;
        var d = [][o]
            ? t(t([][o]()))
            : (w((t = {}), o, function () {
                return this;
              }),
              t),
          f = (c.prototype = l.prototype = Object.create(d));
        function s(e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, c)
              : ((e.__proto__ = c), w(e, r, 'GeneratorFunction')),
            (e.prototype = Object.create(f)),
            e
          );
        }
        return (
          (u.prototype = c),
          w(f, 'constructor', c),
          w(c, 'constructor', u),
          (u.displayName = 'GeneratorFunction'),
          w(c, r, 'GeneratorFunction'),
          w(f),
          w(f, r, 'Generator'),
          w(f, o, function () {
            return this;
          }),
          w(f, 'toString', function () {
            return '[object Generator]';
          }),
          (p = function () {
            return { w: i, m: s };
          })()
        );
      }
      function w(e, t, n, o) {
        var r = Object.defineProperty;
        try {
          r({}, '', {});
        } catch (e) {
          r = 0;
        }
        ((w = function (e, t, n, o) {
          function i(t, n) {
            w(e, t, function (e) {
              return this._invoke(t, n, e);
            });
          }
          t
            ? r
              ? r(e, t, { value: n, enumerable: !o, configurable: !o, writable: !o })
              : (e[t] = n)
            : (i('next', 0), i('throw', 1), i('return', 2));
        }),
          w(e, t, n, o));
      }
      function m(e, t, n, o, r, i, a) {
        try {
          var l = e[i](a),
            u = l.value;
        } catch (e) {
          return void n(e);
        }
        l.done ? t(u) : Promise.resolve(u).then(o, r);
      }
      function b(e) {
        return function () {
          var t = this,
            n = arguments;
          return new Promise(function (o, r) {
            var i = e.apply(t, n);
            function a(e) {
              m(i, o, r, a, l, 'next', e);
            }
            function l(e) {
              m(i, o, r, a, l, 'throw', e);
            }
            a(void 0);
          });
        };
      }
      function _(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, o = Array(t); n < t; n++) o[n] = e[n];
        return o;
      }
      var x = l.default.useState,
        h = l.default.useEffect;
      t.default = function (e) {
        var t = e.courseId,
          n = e.reference;
        (0, u.default)(c.default);
        var a,
          s,
          w =
            ((a = x([])),
            (s = 2),
            (function (e) {
              if (Array.isArray(e)) return e;
            })(a) ||
              (function (e, t) {
                var n =
                  null == e
                    ? null
                    : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
                if (null != n) {
                  var o,
                    r,
                    i,
                    a,
                    l = [],
                    u = !0,
                    c = !1;
                  try {
                    if (((i = (n = n.call(e)).next), 0 === t)) {
                      if (Object(n) !== n) return;
                      u = !1;
                    } else
                      for (
                        ;
                        !(u = (o = i.call(n)).done) && (l.push(o.value), l.length !== t);
                        u = !0
                      );
                  } catch (e) {
                    ((c = !0), (r = e));
                  } finally {
                    try {
                      if (!u && null != n.return && ((a = n.return()), Object(a) !== a)) return;
                    } finally {
                      if (c) throw r;
                    }
                  }
                  return l;
                }
              })(a, s) ||
              (function (e, t) {
                if (e) {
                  if ('string' == typeof e) return _(e, t);
                  var n = {}.toString.call(e).slice(8, -1);
                  return (
                    'Object' === n && e.constructor && (n = e.constructor.name),
                    'Map' === n || 'Set' === n
                      ? Array.from(e)
                      : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                        ? _(e, t)
                        : void 0
                  );
                }
              })(a, s) ||
              (function () {
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                );
              })()),
          m = w[0],
          y = w[1],
          E = (function () {
            var e = b(
              p().m(function e(t) {
                var o, r, i, a, l;
                return p().w(function (e) {
                  for (;;)
                    switch (e.n) {
                      case 0:
                        return (
                          (e.n = 1),
                          (0, d.$hasEnrollTextbook)({ textbookId: t }).catch(function () {
                            return !1;
                          })
                        );
                      case 1:
                        (e.v
                          ? window.open('//www.icourse163.org/textbook/learn/'.concat(t, '.htm'))
                          : window.open('//www.icourse163.org/textbook/'.concat(t, '.htm')),
                          f.REFERENCE.COURSE_INTRO,
                          (l =
                            n === f.REFERENCE.COURSE_LEARN ? '课程学习页-数字教材卡片-点击' : ''),
                          null === (o = window) ||
                            void 0 === o ||
                            null === (r = o.DATracker) ||
                            void 0 === r ||
                            r.track(l, {
                              pagename: 'course',
                              user_id:
                                null === (i = window) ||
                                void 0 === i ||
                                null === (a = i.webUser) ||
                                void 0 === a
                                  ? void 0
                                  : a.id,
                              textbook_id: t,
                            }));
                      case 2:
                        return e.a(2);
                    }
                }, e);
              }),
            );
            return function (t) {
              return e.apply(this, arguments);
            };
          })(),
          g = (function () {
            var e = b(
              p().m(function e() {
                var o, r, i, a, l, u;
                return p().w(function (e) {
                  for (;;)
                    switch (e.n) {
                      case 0:
                        return ((e.n = 1), (0, d.$getRelatedTextbooks)({ courseId: t }));
                      case 1:
                        ((o = e.v),
                          Array.isArray(o) &&
                            (y(o),
                            o.length &&
                              (f.REFERENCE.COURSE_INTRO,
                              (u =
                                n === f.REFERENCE.COURSE_LEARN
                                  ? '课程学习页-数字教材卡片-展示'
                                  : ''),
                              null === (r = window) ||
                                void 0 === r ||
                                null === (i = r.DATracker) ||
                                void 0 === i ||
                                i.track(u, {
                                  pagename: 'course',
                                  user_id:
                                    null === (a = window) ||
                                    void 0 === a ||
                                    null === (l = a.webUser) ||
                                    void 0 === l
                                      ? void 0
                                      : l.id,
                                  textbook_id:
                                    null == o
                                      ? void 0
                                      : o.map(function (e) {
                                          return e.textbookId;
                                        }),
                                }))));
                      case 2:
                        return e.a(2);
                    }
                }, e);
              }),
            );
            return function () {
              return e.apply(this, arguments);
            };
          })();
        return (
          h(
            function () {
              t && g();
            },
            [t],
          ),
          l.default.createElement(
            l.default.Fragment,
            null,
            (null == m ? void 0 : m.length) > 0 &&
              v(
                'div',
                { className: c.default.RecommendTextbookSideBox },
                void 0,
                v('div', { className: c.default.title }, void 0, '数字教材'),
                v(
                  'div',
                  { className: c.default.showBox },
                  void 0,
                  m.map(function (e) {
                    var t, n, a;
                    return v(
                      'div',
                      {
                        className: c.default.textbookCard,
                        onClick: function () {
                          E(e.textbookId);
                        },
                      },
                      e.textbookId,
                      v('img', { src: e.cover, alt: e.textbookName, className: c.default.bookImg }),
                      v(
                        'div',
                        { className: c.default.info },
                        void 0,
                        v('div', { className: c.default.name }, void 0, e.textbookName),
                        (null == e || null === (t = e.editorInChief) || void 0 === t
                          ? void 0
                          : t.length) > 0 &&
                          v(
                            'div',
                            {
                              className: ''
                                .concat(c.default.chiefEditor, ' ')
                                .concat(c.default.editorRow),
                            },
                            void 0,
                            o || (o = v('div', {}, void 0, '主编')),
                            '：',
                            v('div', {}, void 0, e.editorInChief),
                          ),
                        (null == e || null === (n = e.deputyEditorInChief) || void 0 === n
                          ? void 0
                          : n.length) > 0 &&
                          v(
                            'div',
                            {
                              className: ''
                                .concat(c.default.deputyEditor, ' ')
                                .concat(c.default.editorRow),
                            },
                            void 0,
                            r || (r = v('div', {}, void 0, '副主编')),
                            '：',
                            v('div', {}, void 0, e.deputyEditorInChief),
                          ),
                        (null == e || null === (a = e.editor) || void 0 === a ? void 0 : a.length) >
                          0 &&
                          v(
                            'div',
                            {
                              className: ''
                                .concat(c.default.editor, ' ')
                                .concat(c.default.editorRow),
                            },
                            void 0,
                            i || (i = v('div', {}, void 0, '编者')),
                            '：',
                            v('div', {}, void 0, e.editor),
                          ),
                      ),
                    );
                  }),
                ),
              ),
          )
        );
      };
    },
    768887: (e, t, n) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var o = i(n(526536)),
        r = i(n(296540));
      function i(e) {
        return e && e.__esModule ? e : { default: e };
      }
      t.default = function (e) {
        var t = Object.assign(
          {},
          ((function (e) {
            if (null == e) throw new TypeError('Cannot destructure ' + e);
          })(e),
          e),
        );
        return r.default.createElement(o.default, t);
      };
    },
  },
]);
