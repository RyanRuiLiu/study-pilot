/*! For license information please see 4648.df76d8ea.chunk.js.LICENSE.txt */
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [4648],
  {
    631302: (n, e, t) => {
      ((e = n.exports = t(576314)(!1)).push([
        n.id,
        ".LWibY {\n  position: relative;\n}\n\n.LWibY ._2cZcE {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  overflow: visible;\n  cursor: pointer;\n}\n\n.LWibY ._2GxLt {\n  display: block;\n  width: 30px;\n  height: 30px;\n  margin-right: 5px;\n  border-radius: 30px;\n}\n\n.LWibY .-_uMc {\n  color: #666;\n}\n\n.LWibY ._3fmWl {\n  position: absolute;\n  right: 0;\n  display: none;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  width: 188px;\n  padding-top: 10px;\n}\n\n.LWibY ._1pdLD {\n  position: absolute;\n  top: -10;\n  right: 0;\n  z-index: 9;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  width: 188px;\n  padding: 5px 10px;\n  line-height: 30px;\n  background-color: #fff;\n  border: 1px solid #ddd;\n}\n\n.LWibY ._1pdLD::before {\n  position: absolute;\n  top: -5px;\n  left: 144px;\n  z-index: 1;\n  display: block;\n  width: 9px;\n  height: 9px;\n  background-color: #fff;\n  border-top: 1px solid #ddd;\n  border-left: 1px solid #ddd;\n  -webkit-transform: rotate(45deg);\n      -ms-transform: rotate(45deg);\n          transform: rotate(45deg);\n  content: ' ';\n}\n\n.LWibY ._3mmTw {\n  color: #999;\n  font-size: 12px;\n  border-bottom: 1px solid #eaeaea;\n}\n\n.LWibY ._3NB8e {\n  margin: 0;\n  padding: 0;\n  color: #999;\n  text-align: left;\n  list-style: none;\n}\n\n.LWibY .dXYrT {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.LWibY .dXYrT:last-child {\n  border-top: 1px solid #eaeaea;\n}\n\n.LWibY ._1Q6Mw {\n  color: #666;\n  font-size: 12px;\n}\n\n.LWibY ._1Q6Mw:hover {\n  color: #00cc7e;\n}\n\n.LWibY:hover ._3fmWl {\n  display: block;\n}\n\n.LWibY:hover .-_uMc {\n  -webkit-transform: rotate(180deg);\n      -ms-transform: rotate(180deg);\n          transform: rotate(180deg);\n  -webkit-transition: all 0.3s;\n  transition: all 0.3s;\n}",
        '',
      ]),
        (e.locals = {
          user: 'LWibY',
          avatar: '_2cZcE',
          avatarImg: '_2GxLt',
          arrow: '-_uMc',
          dropdown: '_3fmWl',
          content: '_1pdLD',
          loginType: '_3mmTw',
          navs: '_3NB8e',
          nav: 'dXYrT',
          link: '_1Q6Mw',
        }));
    },
    164839: (n, e, t) => {
      var r = t(785072),
        o = t(631302);
      'string' == typeof (o = o.__esModule ? o.default : o) && (o = [[n.id, o, '']]);
      (r(o, { insert: 'head', singleton: !1 }), (n.exports = o.locals || {}));
    },
    184281: (n, e) => {
      'use strict';
      (Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.hasBoundSchoolCloud = void 0),
        (e.hasBoundSchoolCloud = function (n) {
          var e = Number(n);
          return Number.isFinite(e) && e > 0;
        }));
    },
    77133: (n, e, t) => {
      'use strict';
      function r(n) {
        return (
          (r =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (n) {
                  return typeof n;
                }
              : function (n) {
                  return n &&
                    'function' == typeof Symbol &&
                    n.constructor === Symbol &&
                    n !== Symbol.prototype
                    ? 'symbol'
                    : typeof n;
                }),
          r(n)
        );
      }
      (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
      var o,
        i,
        a = t(263228),
        u =
          (O(t(605556)),
          (function (n) {
            if ('function' == typeof WeakMap) {
              var e = new WeakMap();
              new WeakMap();
            }
            return (function (n) {
              if (n && n.__esModule) return n;
              var t,
                o,
                i = { __proto__: null, default: n };
              if (null === n || ('object' != r(n) && 'function' != typeof n)) return i;
              if ((t = e)) {
                if (t.has(n)) return t.get(n);
                t.set(n, i);
              }
              for (var a in n)
                'default' !== a &&
                  {}.hasOwnProperty.call(n, a) &&
                  ((o = (t = Object.defineProperty) && Object.getOwnPropertyDescriptor(n, a)) &&
                  (o.get || o.set)
                    ? t(i, a, o)
                    : (i[a] = n[a]));
              return i;
            })(n);
          })(t(296540))),
        l = t(148584),
        c = O(t(200891)),
        s = O(t(164839)),
        d = O(t(603154)),
        f = t(690212),
        _ = t(184281),
        E = O(t(964708));
      function O(n) {
        return n && n.__esModule ? n : { default: n };
      }
      function m(n, e, t, r) {
        i ||
          (i = ('function' == typeof Symbol && Symbol.for && Symbol.for('react.element')) || 60103);
        var o = n && n.defaultProps,
          a = arguments.length - 3;
        if ((e || 0 === a || (e = { children: void 0 }), 1 === a)) e.children = r;
        else if (a > 1) {
          for (var u = Array(a), l = 0; l < a; l++) u[l] = arguments[l + 3];
          e.children = u;
        }
        if (e && o) for (var c in o) void 0 === e[c] && (e[c] = o[c]);
        else e || (e = o || {});
        return {
          $$typeof: i,
          type: n,
          key: void 0 === t ? null : '' + t,
          ref: null,
          props: e,
          _owner: null,
        };
      }
      function p() {
        var n,
          e,
          t = 'function' == typeof Symbol ? Symbol : {},
          r = t.iterator || '@@iterator',
          o = t.toStringTag || '@@toStringTag';
        function i(t, r, o, i) {
          var l = r && r.prototype instanceof u ? r : u,
            c = Object.create(l.prototype);
          return (
            h(
              c,
              '_invoke',
              (function (t, r, o) {
                var i,
                  u,
                  l,
                  c = 0,
                  s = o || [],
                  d = !1,
                  f = {
                    p: 0,
                    n: 0,
                    v: n,
                    a: _,
                    f: _.bind(n, 4),
                    d: function (e, t) {
                      return ((i = e), (u = 0), (l = n), (f.n = t), a);
                    },
                  };
                function _(t, r) {
                  for (u = t, l = r, e = 0; !d && c && !o && e < s.length; e++) {
                    var o,
                      i = s[e],
                      _ = f.p,
                      E = i[2];
                    t > 3
                      ? (o = E === r) && ((l = i[(u = i[4]) ? 5 : ((u = 3), 3)]), (i[4] = i[5] = n))
                      : i[0] <= _ &&
                        ((o = t < 2 && _ < i[1])
                          ? ((u = 0), (f.v = r), (f.n = i[1]))
                          : _ < E &&
                            (o = t < 3 || i[0] > r || r > E) &&
                            ((i[4] = t), (i[5] = r), (f.n = E), (u = 0)));
                  }
                  if (o || t > 1) return a;
                  throw ((d = !0), r);
                }
                return function (o, s, E) {
                  if (c > 1) throw TypeError('Generator is already running');
                  for (d && 1 === s && _(s, E), u = s, l = E; (e = u < 2 ? n : l) || !d;) {
                    i || (u ? (u < 3 ? (u > 1 && (f.n = -1), _(u, l)) : (f.n = l)) : (f.v = l));
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
                        i = n;
                      } else if ((e = (d = f.n < 0) ? l : t.call(r, f)) !== a) break;
                    } catch (e) {
                      ((i = n), (u = 1), (l = e));
                    } finally {
                      c = 1;
                    }
                  }
                  return { value: e, done: d };
                };
              })(t, o, i),
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
        var s = [][r]
            ? e(e([][r]()))
            : (h((e = {}), r, function () {
                return this;
              }),
              e),
          d = (c.prototype = u.prototype = Object.create(s));
        function f(n) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(n, c)
              : ((n.__proto__ = c), h(n, o, 'GeneratorFunction')),
            (n.prototype = Object.create(d)),
            n
          );
        }
        return (
          (l.prototype = c),
          h(d, 'constructor', c),
          h(c, 'constructor', l),
          (l.displayName = 'GeneratorFunction'),
          h(c, o, 'GeneratorFunction'),
          h(d),
          h(d, o, 'Generator'),
          h(d, r, function () {
            return this;
          }),
          h(d, 'toString', function () {
            return '[object Generator]';
          }),
          (p = function () {
            return { w: i, m: f };
          })()
        );
      }
      function h(n, e, t, r) {
        var o = Object.defineProperty;
        try {
          o({}, '', {});
        } catch (n) {
          o = 0;
        }
        ((h = function (n, e, t, r) {
          function i(e, t) {
            h(n, e, function (n) {
              return this._invoke(e, t, n);
            });
          }
          e
            ? o
              ? o(n, e, { value: t, enumerable: !r, configurable: !r, writable: !r })
              : (n[e] = t)
            : (i('next', 0), i('throw', 1), i('return', 2));
        }),
          h(n, e, t, r));
      }
      function L(n, e, t, r, o, i, a) {
        try {
          var u = n[i](a),
            l = u.value;
        } catch (n) {
          return void t(n);
        }
        u.done ? e(l) : Promise.resolve(l).then(r, o);
      }
      function A(n, e) {
        (null == e || e > n.length) && (e = n.length);
        for (var t = 0, r = Array(e); t < e; t++) r[t] = n[t];
        return r;
      }
      var S = c.default.image.formateImagePrefix;
      e.default = function (n) {
        var e,
          t,
          r = n.webUser,
          i = r.smallFaceUrl,
          c = r.largeFaceUrl,
          O = r.loginType,
          h = r.id,
          R = (0, l.useMemberCertifiedRights)(r).isValidCertifiedMember,
          b = d.default.getLoginTypeDesc,
          y = d.default.getLinkEntries,
          N =
            ((e = (0, u.useState)([])),
            (t = 2),
            (function (n) {
              if (Array.isArray(n)) return n;
            })(e) ||
              (function (n, e) {
                var t =
                  null == n
                    ? null
                    : ('undefined' != typeof Symbol && n[Symbol.iterator]) || n['@@iterator'];
                if (null != t) {
                  var r,
                    o,
                    i,
                    a,
                    u = [],
                    l = !0,
                    c = !1;
                  try {
                    if (((i = (t = t.call(n)).next), 0 === e)) {
                      if (Object(t) !== t) return;
                      l = !1;
                    } else
                      for (
                        ;
                        !(l = (r = i.call(t)).done) && (u.push(r.value), u.length !== e);
                        l = !0
                      );
                  } catch (n) {
                    ((c = !0), (o = n));
                  } finally {
                    try {
                      if (!l && null != t.return && ((a = t.return()), Object(a) !== a)) return;
                    } finally {
                      if (c) throw o;
                    }
                  }
                  return u;
                }
              })(e, t) ||
              (function (n, e) {
                if (n) {
                  if ('string' == typeof n) return A(n, e);
                  var t = {}.toString.call(n).slice(8, -1);
                  return (
                    'Object' === t && n.constructor && (t = n.constructor.name),
                    'Map' === t || 'Set' === t
                      ? Array.from(n)
                      : 'Arguments' === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
                        ? A(n, e)
                        : void 0
                  );
                }
              })(e, t) ||
              (function () {
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                );
              })()),
          v = N[0],
          M = N[1],
          g = b(O),
          T = y(r, v),
          w = 'https://www.icourse163.org/home.htm?userId='.concat(h, '#/home/course'),
          I = S(
            i ||
              c ||
              'https://edu-image.nosdn.127.net/457BE69DFFF1A6157EAF6D44EA2D8662.png?imageView&thumbnail=128y128&quality=100',
          ),
          C = (function () {
            var n,
              e =
                ((n = p().m(function n() {
                  var e,
                    t,
                    r,
                    o = arguments;
                  return p().w(function (n) {
                    for (;;)
                      switch (n.n) {
                        case 0:
                          return (
                            (e = o.length > 0 && void 0 !== o[0] ? o[0] : 0),
                            (t = o.length > 1 ? o[1] : void 0),
                            (n.n = 1),
                            (0, f.queryMajorListApi)({ filterPublishStatus: e, schoolId: t })
                          );
                        case 1:
                          (r = n.v) && M(r);
                        case 2:
                          return n.a(2);
                      }
                  }, n);
                })),
                function () {
                  var e = this,
                    t = arguments;
                  return new Promise(function (r, o) {
                    var i = n.apply(e, t);
                    function a(n) {
                      L(i, r, o, a, u, 'next', n);
                    }
                    function u(n) {
                      L(i, r, o, a, u, 'throw', n);
                    }
                    a(void 0);
                  });
                });
            return function () {
              return e.apply(this, arguments);
            };
          })();
        return (
          (0, u.useEffect)(
            function () {
              (0, _.hasBoundSchoolCloud)(r.schoolId) && C(0, r.schoolId);
            },
            [r],
          ),
          m(
            'div',
            { className: s.default.user },
            void 0,
            m(
              'a',
              { href: w, className: s.default.avatar },
              void 0,
              m(E.default, {
                avatarUrl: I,
                size: 30,
                className: s.default.avatarImg,
                isValidCertifiedMember: R,
              }),
              m(
                'div',
                { className: s.default.arrow },
                void 0,
                o || (o = m(a.CaretDownOutlined, {})),
              ),
            ),
            m(
              'div',
              { className: s.default.dropdown },
              void 0,
              m(
                'div',
                { className: s.default.content },
                void 0,
                m('div', { className: s.default.loginType }, void 0, '正在使用"', g, '"账号登录'),
                null != T && T.length
                  ? m(
                      'ul',
                      { className: s.default.navs },
                      void 0,
                      T.map(function (n) {
                        return m(
                          'li',
                          { className: s.default.nav },
                          n.name,
                          m(
                            'a',
                            {
                              className: s.default.link,
                              href: n.url,
                              target: n.currentPage ? '_self' : '_blank',
                            },
                            void 0,
                            n.name,
                          ),
                        );
                      }),
                    )
                  : '',
              ),
            ),
          )
        );
      };
    },
    690212: (n, e, t) => {
      'use strict';
      (Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.queryMajorListApi = e.getSchoolInfoById = void 0));
      var r,
        o,
        i = t(477593);
      function a(n) {
        return (
          (a =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (n) {
                  return typeof n;
                }
              : function (n) {
                  return n &&
                    'function' == typeof Symbol &&
                    n.constructor === Symbol &&
                    n !== Symbol.prototype
                    ? 'symbol'
                    : typeof n;
                }),
          a(n)
        );
      }
      var u =
        ('object' === ('undefined' == typeof window ? 'undefined' : a(window)) &&
          (null === (r = window) || void 0 === r || null === (o = r.location) || void 0 === o
            ? void 0
            : o.protocol)) ||
        'https:';
      ((e.queryMajorListApi = function (n) {
        return (0, i.request)({
          url: ''.concat(u, '//www.icourse163.org/mm-school/web/j/majorBean.getMajorList.rpc'),
          method: 'post',
          data: { filterPublishStatus: n.filterPublishStatus, schoolId: n.schoolId },
          throwError: !1,
        });
      }),
        (e.getSchoolInfoById = function (n) {
          return (0, i.request)({
            url: ''.concat(u, '//www.icourse163.org/mm-school/web/j/schoolBean.getSchoolById.rpc'),
            method: 'post',
            data: { schoolId: n },
            throwError: !1,
          });
        }));
    },
    104648: (n, e, t) => {
      'use strict';
      (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
      var r,
        o = (r = t(77133)) && r.__esModule ? r : { default: r };
      e.default = o.default;
    },
    397783: (n, e) => {
      'use strict';
      (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
      var t = {
          ROLE_LEARNER: 'learner',
          ROLE_PLATFORM_ADMIN: 'platformAdmin',
          ROLE_SCHOOLSUPER_ADMIN: 'schoolSuperAdmin',
          ROLE_ASSISTANT: 'assistant',
          ROLE_LECTOR: 'lector',
          ROLE_OUT_SUPER_ADMIN: 'outSuperAdmin',
          ROLE_OUT_BUSINESS_EDITOR: 'outBusinessEditor',
          ROLE_OUT_COURSE_EDITOR: 'outCourseEditor',
          ROLE_OUT_ORDINARY_EDITOR: 'ordinaryEditor',
          ROLE_OUT_COURSE_REVIEWER: 'outCourseReviewer',
          ROLE_SCHOOLNORMAL_ADMIN: 'schoolNormalAdmin',
          ROLE_REGION_ADMIN: 'regionAdmin',
          ROLE_FORUM_MANAGER: 'forumManager',
          ROLE_SCHOOLPOSTGRADEXAM_ADMIN: 'schoolPostgradexamAdmin',
          ROLE_SCHOOLPOSTGRADEXAM_LECTOR: 'schoolPostgradexamLector',
          ROLE_SCHOOLNORMAL_ADMIN_SELF: 'schoolNormalAdminSelf',
          ROLE_BSITE_ADMIN: 'bSiteAdmin',
          ROLE_COLUMNIST: 'columnist',
          ROLE_COLUMN_ASSISTANT: 'columnistAssistant',
          ROLE_OFFLINE_LECTOR: 'offlineLector',
          ROLE_AI_CLASSROOM_TEACHER: 'aiClassroomTeacher',
        },
        r = function (n, e) {
          return !(!n || !n.length) && -1 !== n.indexOf(e);
        },
        o = {
          ROLES: t,
          hasRole: r,
          hasLectorOrAdminRole: function (n) {
            return (
              r(n, t.ROLE_LECTOR) ||
              r(n, t.ROLE_OUT_SUPER_ADMIN) ||
              r(n, t.ROLE_SCHOOLNORMAL_ADMIN) ||
              r(n, t.ROLE_SCHOOLNORMAL_ADMIN_SELF) ||
              r(n, t.ROLE_ASSISTANT) ||
              r(n, t.ROLE_COLUMNIST) ||
              r(n, t.ROLE_COLUMN_ASSISTANT)
            );
          },
          hasOfflineLectorRole: function (n) {
            return r(n, t.ROLE_OFFLINE_LECTOR);
          },
        };
      e.default = o;
    },
    603154: (n, e, t) => {
      'use strict';
      (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
      var r,
        o = (r = t(397783)) && r.__esModule ? r : { default: r },
        i = t(434639),
        a = o.default.ROLES,
        u = o.default.hasRole,
        l = {
          getLoginTypeDesc: function (n) {
            return (
              {
                11: '爱课程网',
                1: '有道笔记',
                2: '新浪微博',
                3: '人人网',
                4: '腾讯QQ',
                6: '微信',
                20: '企业',
                7: '教务系统',
                8: '手机',
                90: 'Google',
              }[n] || '网易邮箱'
            );
          },
          getLinkEntries: function (n, e) {
            var t = (0, i.getLang)(),
              r = (0, i.getLocal)();
            if (n && n.id) {
              var o,
                l = 'https://www.icourse163.org',
                c = n.id,
                s = n.roles,
                d = '';
              u(s, a.ROLE_LECTOR) &&
                Array.isArray(e) &&
                (d = (null === (o = e[0]) || void 0 === o ? void 0 : o.shortName) || '');
              var f = [
                {
                  url: ''.concat(l, '/live/liveRoom.htm'),
                  name: t.KEY_NAV_MENU_MY_LIVE_STREAM,
                  isShow: function () {
                    return !0;
                  },
                },
                {
                  url: ''.concat(l, '/home.htm?userId=').concat(c, '#/home/mycert'),
                  name: t.KEY_NAV_MENU_MY_CERT,
                  isShow: function () {
                    return !0;
                  },
                },
                {
                  url: ''.concat(l, '/user/myCoupons.htm'),
                  name: t.KEY_NAV_MENU_MY_COUPON,
                  isShow: function () {
                    return !(0, i.isIntel)();
                  },
                },
                {
                  url: ''.concat(l, '/user/myOrder.htm'),
                  name: t.KEY_NAV_MY_ORDER,
                  isShow: function () {
                    return !0;
                  },
                },
                {
                  url: ''.concat(l, '/partnerAdmin/superAdmin.htm'),
                  name: t.KEY_NAV_MENU_GJS_MANAGE,
                  isShow: function () {
                    return u(s, a.ROLE_OUT_SUPER_ADMIN);
                  },
                },
                {
                  url: ''.concat(l, '/partnerAdmin/editorAdmin.htm'),
                  name: t.KEY_NAV_MENU_GJS_MARKET_EDITOR,
                  isShow: function () {
                    return u(s, a.ROLE_OUT_BUSINESS_EDITOR);
                  },
                },
                {
                  url: ''.concat(l, '/partnerAdmin/editorAdmin.htm'),
                  name: t.KEY_NAV_MENU_GJS_COURSE_EDITOR,
                  isShow: function () {
                    return u(s, a.ROLE_OUT_COURSE_EDITOR) || u(s, a.ROLE_OUT_ORDINARY_EDITOR);
                  },
                },
                {
                  url: ''
                    .concat(l, '/mooc/teach/college/')
                    .concat(d, '/majorPortalManage?isTeacherPage=1'),
                  name: t.KEY_NAV_MENU_MAJOR_MANAGE,
                  isShow: function () {
                    return (
                      u(s, a.ROLE_LECTOR) &&
                      (null == e ? void 0 : e.length) > 0 &&
                      (function (n, e) {
                        if (!Array.isArray(n) || !e) return !1;
                        var t = Number(e);
                        return n.some(function (n) {
                          return (
                            Array.isArray(n.memberList) &&
                            n.memberList.some(function (n) {
                              return n.id === t;
                            })
                          );
                        });
                      })(e, n.id)
                    );
                  },
                },
                {
                  url: ''.concat(l, '/partnerAdmin/editorAdmin.htm'),
                  name: t.KEY_NAV_MENU_GJS_COURSE_CHECK,
                  isShow: function () {
                    return u(s, a.ROLE_OUT_COURSE_REVIEWER);
                  },
                },
                {
                  url: ''.concat(l, '/collegeAdmin/schoolPanel.htm'),
                  name: t.KEY_NAV_MENU_SCHOOL_ADMIN_MANAGE,
                  isShow: function () {
                    return (
                      u(s, a.ROLE_SCHOOLSUPER_ADMIN) ||
                      u(s, a.ROLE_SCHOOLNORMAL_ADMIN) ||
                      u(s, a.ROLE_SCHOOLNORMAL_ADMIN_SELF)
                    );
                  },
                },
                {
                  url: ''.concat(l, '/regionAdmin.htm'),
                  name: t.KEY_NAV_MENU_ROOC_ADMIN_MANAGE,
                  isShow: function () {
                    return u(s, a.ROLE_REGION_ADMIN);
                  },
                },
                {
                  url: ''.concat(l, '/bsite/list.htm'),
                  name: t.KEY_NAV_MENU_WEBSITE_MANAGE,
                  isShow: function () {
                    return u(s, a.ROLE_BSITE_ADMIN);
                  },
                },
                {
                  url: ''.concat(l, '/collegeAdmin/postgradExamSchoolPanel.htm'),
                  name: t.KEY_NAV_MENU_KY_SCHOOL_MANAGE,
                  isShow: function () {
                    return u(s, a.ROLE_SCHOOLPOSTGRADEXAM_ADMIN);
                  },
                },
                {
                  url: ''.concat(l, '/collegeAdmin/teacherPanel.htm'),
                  name: t.KEY_NAV_MENU_MKT_MANAGE,
                  isShow: function () {
                    return !(0, i.isIntel)() && u(s, a.ROLE_OFFLINE_LECTOR);
                  },
                },
                {
                  url: ''.concat(l, '/collegeAdmin/teacherPanel.htm'),
                  name: t.KEY_NAV_MENU_COURSE_MANAGE,
                  isShow: function () {
                    return (
                      u(s, a.ROLE_LECTOR) ||
                      u(s, a.ROLE_SCHOOLPOSTGRADEXAM_LECTOR) ||
                      u(s, a.ROLE_ASSISTANT) ||
                      u(s, a.ROLE_COLUMNIST) ||
                      u(s, a.ROLE_COLUMN_ASSISTANT)
                    );
                  },
                },
                {
                  url: ''.concat(l, '/order/service.htm'),
                  name: t.KEY_NAV_MENU_ORDER_MANAGE,
                  isShow: function () {
                    return u(s, a.ROLE_SCHOOLPOSTGRADEXAM_LECTOR) || u(s, a.ROLE_COLUMNIST);
                  },
                },
                {
                  url: ''.concat(l, '/u/').concat(n.personalUrlSuffix, '?userId=').concat(n.id),
                  name: t.KEY_NAV_MENU_TEACHER_INDEX,
                  isShow: function () {
                    return u(s, a.ROLE_LECTOR) || u(s, a.ROLE_SCHOOLPOSTGRADEXAM_LECTOR);
                  },
                },
                {
                  url: ''.concat(l, '/user/setting/personInfoEdit.htm'),
                  name: t.KEY_NAV_MENU_SETTING,
                  isShow: function () {
                    return !0;
                  },
                },
                {
                  url: (0, i.isIntel)()
                    ? ''.concat(l, '/').concat(r, '/imooc/member/logout.htm')
                    : ''.concat(l, '/member/logout.htm'),
                  name: t.KEY_NAV_MENU_LOGOUT,
                  isShow: function () {
                    return !0;
                  },
                  currentPage: !0,
                },
              ];
              return f.filter(function (n) {
                return n.isShow();
              });
            }
          },
        };
      e.default = l;
    },
  },
]);
