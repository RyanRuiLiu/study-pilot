/*! For license information please see 47771.2dd3e22c.chunk.js.LICENSE.txt */
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [47771],
  {
    622811: (e, t, r) => {
      ((t = e.exports = r(576314)(!1)).push([
        e.id,
        '._2pjW1 {\n  position: relative;\n  display: inline-block;\n  -ms-flex: 0 0 auto;\n      flex: 0 0 auto;\n  line-height: 0;\n  vertical-align: middle;\n}\n\n._3lssP {\n  display: block;\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  border-radius: 50%;\n}\n\n._3x0PA {\n  position: absolute;\n  top: -16%;\n  left: -16%;\n  z-index: 1;\n  width: 134%;\n  height: 134%;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: contain;\n  pointer-events: none;\n}',
        '',
      ]),
        (t.locals = { avatar: '_2pjW1', image: '_3lssP', memberFrame: '_3x0PA' }));
    },
    443973: (e, t, r) => {
      'use strict';
      var n = r(296540),
        o = r(146166);
      e.exports = function () {
        for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
        var i = n.useContext(o).insertCss;
        if (!i) throw new Error('Please provide "insertCss" function by StyleContext.Provider');
        i.apply(void 0, t);
      };
    },
    338962: (e, t, r) => {
      var n = r(785072),
        o = r(622811);
      'string' == typeof (o = o.__esModule ? o.default : o) && (o = [[e.id, o, '']]);
      (n(o, { insert: 'head', singleton: !1 }), (e.exports = o.locals || {}));
    },
    205300: (e, t) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.MEMBER_AVATAR_FRAME_URL = void 0),
        (t.MEMBER_AVATAR_FRAME_URL =
          '//mooc-image.nosdn.127.net/d0c637e4e2f74ddc9be5c2ec4d566236.png?imageView&quality=100'));
    },
    964708: (e, t, r) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n,
        o = a(r(246942)),
        i = (a(r(605556)), a(r(296540)), a(r(338962))),
        u = r(205300);
      function a(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function c(e, t, r, o) {
        n ||
          (n = ('function' == typeof Symbol && Symbol.for && Symbol.for('react.element')) || 60103);
        var i = e && e.defaultProps,
          u = arguments.length - 3;
        if ((t || 0 === u || (t = { children: void 0 }), 1 === u)) t.children = o;
        else if (u > 1) {
          for (var a = Array(u), c = 0; c < u; c++) a[c] = arguments[c + 3];
          t.children = a;
        }
        if (t && i) for (var l in i) void 0 === t[l] && (t[l] = i[l]);
        else t || (t = i || {});
        return {
          $$typeof: n,
          type: e,
          key: void 0 === r ? null : '' + r,
          ref: null,
          props: t,
          _owner: null,
        };
      }
      var l = function (e) {
        var t = e.avatarUrl,
          r = e.alt,
          n = e.size,
          a = e.isValidCertifiedMember,
          l = e.className;
        return c(
          'span',
          { className: (0, o.default)(i.default.avatar, l), style: { width: n, height: n } },
          void 0,
          c('img', { className: i.default.image, src: t, alt: r }),
          a &&
            c('span', {
              className: i.default.memberFrame,
              style: { backgroundImage: 'url('.concat(u.MEMBER_AVATAR_FRAME_URL, ')') },
              'aria-hidden': 'true',
            }),
        );
      };
      ((l.defaultProps = {
        avatarUrl: '',
        alt: '用户头像',
        size: 40,
        isValidCertifiedMember: !1,
        className: '',
      }),
        (t.default = l));
    },
    148584: (e, t, r) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        Object.defineProperty(t, 'useMemberCertifiedRights', {
          enumerable: !0,
          get: function () {
            return i.default;
          },
        }),
        Object.defineProperty(t, 'useSchoolInfo', {
          enumerable: !0,
          get: function () {
            return o.default;
          },
        }),
        Object.defineProperty(t, 'useUserInfo', {
          enumerable: !0,
          get: function () {
            return n.default;
          },
        }));
      var n = u(r(838372)),
        o = u(r(23877)),
        i = u(r(107311));
      function u(e) {
        return e && e.__esModule ? e : { default: e };
      }
    },
    107311: (e, t, r) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.hasCertifiedMemberRights =
          t.getValidCertifiedMember =
          t.default =
          t.clearMemberCertifiedRightsCache =
          t.MEMBER_CERTIFIED_RIGHTS_CACHE_KEY =
            void 0));
      var n = r(296540),
        o = r(477593);
      function i(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
      var u = (t.MEMBER_CERTIFIED_RIGHTS_CACHE_KEY = 'icourse163.member.certifiedRights'),
        a = ''.concat(
          o.origin,
          '/mm-course/web/j/mocTermCertifiedBean.getMemberCertifiedRights.rpc',
        ),
        c = null,
        l = function () {
          try {
            return 'undefined' == typeof window ? null : window.sessionStorage;
          } catch (e) {
            return null;
          }
        },
        f = function (e) {
          if (null == e || '' === e) return null;
          var t = Number(e);
          return Number.isFinite(t) ? t : null;
        },
        s = function (e) {
          return e || ('undefined' == typeof window ? null : window.webUser) || {};
        },
        d = function (e) {
          return f(s(e).id);
        },
        v = function (e) {
          return f(s(e).rightsTime);
        },
        p = (t.hasCertifiedMemberRights = function (e) {
          return (
            !!e &&
            ('boolean' == typeof e.validCertifiedMember
              ? e.validCertifiedMember
              : 1 === Number(e.rightsType))
          );
        }),
        y = function (e, t) {
          var r = l();
          if (!r) return null;
          try {
            var n = r.getItem(u);
            if (!n) return null;
            var o = JSON.parse(n),
              i = o.memberId,
              a = o.rightsTime,
              c = o.valid,
              f = o.ts;
            if ('boolean' != typeof c || !f || Date.now() - f > 3e5) return null;
            if (null !== e && null !== i && e !== i) return null;
            var s = v(t);
            return null !== s && null !== a && s !== a ? null : c;
          } catch (e) {
            return null;
          }
        },
        b =
          ((t.clearMemberCertifiedRightsCache = function () {
            var e = l();
            if (e)
              try {
                e.removeItem(u);
              } catch (e) {}
          }),
          (t.getValidCertifiedMember = function (e) {
            var t = d(e),
              r = y(t, e);
            if (null !== r) return Promise.resolve(r);
            if (c && c.memberId === t) return c.promise;
            var n = (0, o.request)({ url: a, method: 'post', notShowErr: !0 }).then(function (r) {
                var n = p(r);
                return (
                  (function (e, t, r) {
                    var n = l();
                    if (n)
                      try {
                        var o = { memberId: t, rightsTime: v(r), valid: e, ts: Date.now() };
                        n.setItem(u, JSON.stringify(o));
                      } catch (e) {}
                  })(n, t, e),
                  n
                );
              }),
              i = function () {
                c && c.promise === n && (c = null);
              };
            return ((c = { memberId: t, promise: n }), n.then(i, i), n);
          }));
      t.default = function (e) {
        var t,
          r,
          o = d(e),
          u = v(e),
          a =
            ((t = (0, n.useState)(function () {
              return !0 === y(o, e);
            })),
            (r = 2),
            (function (e) {
              if (Array.isArray(e)) return e;
            })(t) ||
              (function (e, t) {
                var r =
                  null == e
                    ? null
                    : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
                if (null != r) {
                  var n,
                    o,
                    i,
                    u,
                    a = [],
                    c = !0,
                    l = !1;
                  try {
                    if (((i = (r = r.call(e)).next), 0 === t)) {
                      if (Object(r) !== r) return;
                      c = !1;
                    } else
                      for (
                        ;
                        !(c = (n = i.call(r)).done) && (a.push(n.value), a.length !== t);
                        c = !0
                      );
                  } catch (e) {
                    ((l = !0), (o = e));
                  } finally {
                    try {
                      if (!c && null != r.return && ((u = r.return()), Object(u) !== u)) return;
                    } finally {
                      if (l) throw o;
                    }
                  }
                  return a;
                }
              })(t, r) ||
              (function (e, t) {
                if (e) {
                  if ('string' == typeof e) return i(e, t);
                  var r = {}.toString.call(e).slice(8, -1);
                  return (
                    'Object' === r && e.constructor && (r = e.constructor.name),
                    'Map' === r || 'Set' === r
                      ? Array.from(e)
                      : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                        ? i(e, t)
                        : void 0
                  );
                }
              })(t, r) ||
              (function () {
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                );
              })()),
          c = a[0],
          l = a[1];
        return (
          (0, n.useEffect)(
            function () {
              if (o) {
                var t = y(o, e);
                if (null === t) {
                  var r = !1;
                  return (
                    l(!1),
                    b(e)
                      .then(function (e) {
                        r || l(e);
                      })
                      .catch(function () {
                        r || l(!1);
                      }),
                    function () {
                      r = !0;
                    }
                  );
                }
                l(t);
              } else l(!1);
            },
            [o, u],
          ),
          { isValidCertifiedMember: c }
        );
      };
    },
    23877: (e, t, r) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = void 0));
      var n = r(296540),
        o = r(477593);
      function i() {
        var e,
          t,
          r = 'function' == typeof Symbol ? Symbol : {},
          n = r.iterator || '@@iterator',
          o = r.toStringTag || '@@toStringTag';
        function a(r, n, o, i) {
          var a = n && n.prototype instanceof l ? n : l,
            f = Object.create(a.prototype);
          return (
            u(
              f,
              '_invoke',
              (function (r, n, o) {
                var i,
                  u,
                  a,
                  l = 0,
                  f = o || [],
                  s = !1,
                  d = {
                    p: 0,
                    n: 0,
                    v: e,
                    a: v,
                    f: v.bind(e, 4),
                    d: function (t, r) {
                      return ((i = t), (u = 0), (a = e), (d.n = r), c);
                    },
                  };
                function v(r, n) {
                  for (u = r, a = n, t = 0; !s && l && !o && t < f.length; t++) {
                    var o,
                      i = f[t],
                      v = d.p,
                      p = i[2];
                    r > 3
                      ? (o = p === n) && ((a = i[(u = i[4]) ? 5 : ((u = 3), 3)]), (i[4] = i[5] = e))
                      : i[0] <= v &&
                        ((o = r < 2 && v < i[1])
                          ? ((u = 0), (d.v = n), (d.n = i[1]))
                          : v < p &&
                            (o = r < 3 || i[0] > n || n > p) &&
                            ((i[4] = r), (i[5] = n), (d.n = p), (u = 0)));
                  }
                  if (o || r > 1) return c;
                  throw ((s = !0), n);
                }
                return function (o, f, p) {
                  if (l > 1) throw TypeError('Generator is already running');
                  for (s && 1 === f && v(f, p), u = f, a = p; (t = u < 2 ? e : a) || !s;) {
                    i || (u ? (u < 3 ? (u > 1 && (d.n = -1), v(u, a)) : (d.n = a)) : (d.v = a));
                    try {
                      if (((l = 2), i)) {
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
                      } else if ((t = (s = d.n < 0) ? a : r.call(n, d)) !== c) break;
                    } catch (t) {
                      ((i = e), (u = 1), (a = t));
                    } finally {
                      l = 1;
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
        function l() {}
        function f() {}
        function s() {}
        t = Object.getPrototypeOf;
        var d = [][n]
            ? t(t([][n]()))
            : (u((t = {}), n, function () {
                return this;
              }),
              t),
          v = (s.prototype = l.prototype = Object.create(d));
        function p(e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, s)
              : ((e.__proto__ = s), u(e, o, 'GeneratorFunction')),
            (e.prototype = Object.create(v)),
            e
          );
        }
        return (
          (f.prototype = s),
          u(v, 'constructor', s),
          u(s, 'constructor', f),
          (f.displayName = 'GeneratorFunction'),
          u(s, o, 'GeneratorFunction'),
          u(v),
          u(v, o, 'Generator'),
          u(v, n, function () {
            return this;
          }),
          u(v, 'toString', function () {
            return '[object Generator]';
          }),
          (i = function () {
            return { w: a, m: p };
          })()
        );
      }
      function u(e, t, r, n) {
        var o = Object.defineProperty;
        try {
          o({}, '', {});
        } catch (e) {
          o = 0;
        }
        ((u = function (e, t, r, n) {
          function i(t, r) {
            u(e, t, function (e) {
              return this._invoke(t, r, e);
            });
          }
          t
            ? o
              ? o(e, t, { value: r, enumerable: !n, configurable: !n, writable: !n })
              : (e[t] = r)
            : (i('next', 0), i('throw', 1), i('return', 2));
        }),
          u(e, t, r, n));
      }
      function a(e, t, r, n, o, i, u) {
        try {
          var a = e[i](u),
            c = a.value;
        } catch (e) {
          return void r(e);
        }
        a.done ? t(c) : Promise.resolve(c).then(n, o);
      }
      function c(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
      var l = function (e) {
        return (0, o.request)({
          url: ''.concat(o.origin, '/mm-school/web/j/schoolBean.getSchoolById.rpc'),
          method: 'post',
          data: e,
        });
      };
      t.default = function (e) {
        var t,
          r,
          o =
            ((t = (0, n.useState)({})),
            (r = 2),
            (function (e) {
              if (Array.isArray(e)) return e;
            })(t) ||
              (function (e, t) {
                var r =
                  null == e
                    ? null
                    : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
                if (null != r) {
                  var n,
                    o,
                    i,
                    u,
                    a = [],
                    c = !0,
                    l = !1;
                  try {
                    if (((i = (r = r.call(e)).next), 0 === t)) {
                      if (Object(r) !== r) return;
                      c = !1;
                    } else
                      for (
                        ;
                        !(c = (n = i.call(r)).done) && (a.push(n.value), a.length !== t);
                        c = !0
                      );
                  } catch (e) {
                    ((l = !0), (o = e));
                  } finally {
                    try {
                      if (!c && null != r.return && ((u = r.return()), Object(u) !== u)) return;
                    } finally {
                      if (l) throw o;
                    }
                  }
                  return a;
                }
              })(t, r) ||
              (function (e, t) {
                if (e) {
                  if ('string' == typeof e) return c(e, t);
                  var r = {}.toString.call(e).slice(8, -1);
                  return (
                    'Object' === r && e.constructor && (r = e.constructor.name),
                    'Map' === r || 'Set' === r
                      ? Array.from(e)
                      : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                        ? c(e, t)
                        : void 0
                  );
                }
              })(t, r) ||
              (function () {
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                );
              })()),
          u = o[0],
          f = o[1],
          s = (function () {
            var e,
              t =
                ((e = i().m(function e(t) {
                  var r;
                  return i().w(function (e) {
                    for (;;)
                      switch (e.n) {
                        case 0:
                          if (t) {
                            e.n = 1;
                            break;
                          }
                          return e.a(2);
                        case 1:
                          return ((e.n = 2), l({ schoolId: t }));
                        case 2:
                          (r = e.v) && f(r);
                        case 3:
                          return e.a(2);
                      }
                  }, e);
                })),
                function () {
                  var t = this,
                    r = arguments;
                  return new Promise(function (n, o) {
                    var i = e.apply(t, r);
                    function u(e) {
                      a(i, n, o, u, c, 'next', e);
                    }
                    function c(e) {
                      a(i, n, o, u, c, 'throw', e);
                    }
                    u(void 0);
                  });
                });
            return function (e) {
              return t.apply(this, arguments);
            };
          })();
        return (
          (0, n.useEffect)(
            function () {
              s(e);
            },
            [e],
          ),
          u
        );
      };
    },
    838372: (e, t, r) => {
      'use strict';
      (Object.defineProperty(t, '__esModule', { value: !0 }), (t.getUserInfo = t.default = void 0));
      var n = r(296540),
        o = r(477593);
      function i() {
        var e,
          t,
          r = 'function' == typeof Symbol ? Symbol : {},
          n = r.iterator || '@@iterator',
          o = r.toStringTag || '@@toStringTag';
        function a(r, n, o, i) {
          var a = n && n.prototype instanceof l ? n : l,
            f = Object.create(a.prototype);
          return (
            u(
              f,
              '_invoke',
              (function (r, n, o) {
                var i,
                  u,
                  a,
                  l = 0,
                  f = o || [],
                  s = !1,
                  d = {
                    p: 0,
                    n: 0,
                    v: e,
                    a: v,
                    f: v.bind(e, 4),
                    d: function (t, r) {
                      return ((i = t), (u = 0), (a = e), (d.n = r), c);
                    },
                  };
                function v(r, n) {
                  for (u = r, a = n, t = 0; !s && l && !o && t < f.length; t++) {
                    var o,
                      i = f[t],
                      v = d.p,
                      p = i[2];
                    r > 3
                      ? (o = p === n) && ((a = i[(u = i[4]) ? 5 : ((u = 3), 3)]), (i[4] = i[5] = e))
                      : i[0] <= v &&
                        ((o = r < 2 && v < i[1])
                          ? ((u = 0), (d.v = n), (d.n = i[1]))
                          : v < p &&
                            (o = r < 3 || i[0] > n || n > p) &&
                            ((i[4] = r), (i[5] = n), (d.n = p), (u = 0)));
                  }
                  if (o || r > 1) return c;
                  throw ((s = !0), n);
                }
                return function (o, f, p) {
                  if (l > 1) throw TypeError('Generator is already running');
                  for (s && 1 === f && v(f, p), u = f, a = p; (t = u < 2 ? e : a) || !s;) {
                    i || (u ? (u < 3 ? (u > 1 && (d.n = -1), v(u, a)) : (d.n = a)) : (d.v = a));
                    try {
                      if (((l = 2), i)) {
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
                      } else if ((t = (s = d.n < 0) ? a : r.call(n, d)) !== c) break;
                    } catch (t) {
                      ((i = e), (u = 1), (a = t));
                    } finally {
                      l = 1;
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
        function l() {}
        function f() {}
        function s() {}
        t = Object.getPrototypeOf;
        var d = [][n]
            ? t(t([][n]()))
            : (u((t = {}), n, function () {
                return this;
              }),
              t),
          v = (s.prototype = l.prototype = Object.create(d));
        function p(e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, s)
              : ((e.__proto__ = s), u(e, o, 'GeneratorFunction')),
            (e.prototype = Object.create(v)),
            e
          );
        }
        return (
          (f.prototype = s),
          u(v, 'constructor', s),
          u(s, 'constructor', f),
          (f.displayName = 'GeneratorFunction'),
          u(s, o, 'GeneratorFunction'),
          u(v),
          u(v, o, 'Generator'),
          u(v, n, function () {
            return this;
          }),
          u(v, 'toString', function () {
            return '[object Generator]';
          }),
          (i = function () {
            return { w: a, m: p };
          })()
        );
      }
      function u(e, t, r, n) {
        var o = Object.defineProperty;
        try {
          o({}, '', {});
        } catch (e) {
          o = 0;
        }
        ((u = function (e, t, r, n) {
          function i(t, r) {
            u(e, t, function (e) {
              return this._invoke(t, r, e);
            });
          }
          t
            ? o
              ? o(e, t, { value: r, enumerable: !n, configurable: !n, writable: !n })
              : (e[t] = r)
            : (i('next', 0), i('throw', 1), i('return', 2));
        }),
          u(e, t, r, n));
      }
      function a(e, t, r, n, o, i, u) {
        try {
          var a = e[i](u),
            c = a.value;
        } catch (e) {
          return void r(e);
        }
        a.done ? t(c) : Promise.resolve(c).then(n, o);
      }
      function c(e) {
        return function () {
          var t = this,
            r = arguments;
          return new Promise(function (n, o) {
            var i = e.apply(t, r);
            function u(e) {
              a(i, n, o, u, c, 'next', e);
            }
            function c(e) {
              a(i, n, o, u, c, 'throw', e);
            }
            u(void 0);
          });
        };
      }
      function l(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
      var f = function (e, t, r) {
          return (e && e[t]) || r;
        },
        s = function (e) {
          return (0, o.request)({
            url: f(e, 'userInfo', ''.concat(o.origin, '/web/j/mocMemberFollowBean.userInfo.rpc')),
            method: 'post',
          });
        };
      ((t.getUserInfo = (function () {
        var e = c(
          i().m(function e(t) {
            var r, n;
            return i().w(function (e) {
              for (;;)
                switch (e.n) {
                  case 0:
                    if ((n = null === (r = window) || void 0 === r ? void 0 : r.webUser)) {
                      e.n = 2;
                      break;
                    }
                    return ((e.n = 1), s(t));
                  case 1:
                    n = e.v;
                  case 2:
                    return e.a(2, n);
                }
            }, e);
          }),
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })()),
        (t.default = function (e, t) {
          var r,
            o,
            u,
            a =
              ((o = (0, n.useState)(
                e || (null === (r = window) || void 0 === r ? void 0 : r.webUser),
              )),
              (u = 2),
              (function (e) {
                if (Array.isArray(e)) return e;
              })(o) ||
                (function (e, t) {
                  var r =
                    null == e
                      ? null
                      : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
                  if (null != r) {
                    var n,
                      o,
                      i,
                      u,
                      a = [],
                      c = !0,
                      l = !1;
                    try {
                      if (((i = (r = r.call(e)).next), 0 === t)) {
                        if (Object(r) !== r) return;
                        c = !1;
                      } else
                        for (
                          ;
                          !(c = (n = i.call(r)).done) && (a.push(n.value), a.length !== t);
                          c = !0
                        );
                    } catch (e) {
                      ((l = !0), (o = e));
                    } finally {
                      try {
                        if (!c && null != r.return && ((u = r.return()), Object(u) !== u)) return;
                      } finally {
                        if (l) throw o;
                      }
                    }
                    return a;
                  }
                })(o, u) ||
                (function (e, t) {
                  if (e) {
                    if ('string' == typeof e) return l(e, t);
                    var r = {}.toString.call(e).slice(8, -1);
                    return (
                      'Object' === r && e.constructor && (r = e.constructor.name),
                      'Map' === r || 'Set' === r
                        ? Array.from(e)
                        : 'Arguments' === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                          ? l(e, t)
                          : void 0
                    );
                  }
                })(o, u) ||
                (function () {
                  throw new TypeError(
                    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                  );
                })()),
            f = a[0],
            d = a[1],
            v = (function () {
              var e = c(
                i().m(function e() {
                  var r, n;
                  return i().w(function (e) {
                    for (;;)
                      switch (e.n) {
                        case 0:
                          if (!(n = !(null != f && f.id))) {
                            e.n = 2;
                            break;
                          }
                          return ((e.n = 1), s(t));
                        case 1:
                          n = e.v;
                        case 2:
                          (r = n) && (d(r), r && (window.webUser = r));
                        case 3:
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
            (0, n.useEffect)(function () {
              v();
            }, []),
            f
          );
        }));
    },
  },
]);
