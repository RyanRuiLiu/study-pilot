/*! For license information please see 95211.a5239f9f.chunk.js.LICENSE.txt */
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [95211],
  {
    959192: (n, e, t) => {
      ((e = n.exports = t(576314)(!1)).push([
        n.id,
        "._1U391 {\n  text-align: center;\n}\n\n._1U391 i {\n  color: #ff7a3e;\n  font-style: normal;\n}\n\n._1U391 p {\n  font-size: 20px;\n  margin: 0;\n  font-weight: bold;\n  line-height: 20px;\n  padding-bottom: 14px;\n  color: #000;\n}\n\n._1U391 span {\n  font-size: 12px;\n  color: #666;\n}\n\n._1U391 a {\n  color: #468fe0;\n}\n\n._2wk15 .ant-modal-body,\n._2s5DW .ant-modal-body,\n._29gch .ant-modal-body,\n._1fF2k .ant-modal-body {\n  padding: 40px;\n}\n\n._2wk15 .ant-modal-content,\n._2s5DW .ant-modal-content,\n._29gch .ant-modal-content,\n._1fF2k .ant-modal-content {\n  border-radius: 8px;\n}\n\n._2wk15 .ant-modal-close-x,\n._2s5DW .ant-modal-close-x,\n._29gch .ant-modal-close-x,\n._1fF2k .ant-modal-close-x {\n  width: auto;\n  height: auto;\n  line-height: normal;\n}\n\n._2wk15 .ant-modal-close-x i,\n._2s5DW .ant-modal-close-x i,\n._29gch .ant-modal-close-x i,\n._1fF2k .ant-modal-close-x i {\n  margin: 16px 16px 0 0;\n}\n\n._2wk15 .ant-btn,\n._2s5DW .ant-btn,\n._29gch .ant-btn,\n._1fF2k .ant-btn {\n  width: 176px;\n  height: 36px;\n  background: rgba(0, 208, 92, 1);\n  border-radius: 18px;\n  color: #fff;\n  border: none;\n  font-size: 14px;\n  margin-top: 40px;\n  margin-left: 132px;\n}\n\n._2wk15 .ant-btn:hover,\n._2s5DW .ant-btn:hover,\n._29gch .ant-btn:hover,\n._1fF2k .ant-btn:hover {\n  color: #fff;\n  background: #00a84a;\n}\n\n._2NUxf {\n  display: -ms-flexbox;\n  display: flex;\n  padding-top: 40px;\n}\n\n._2NUxf > img {\n  height: 48px;\n  width: 48px;\n  border-radius: 50%;\n  margin-right: 12px;\n}\n\n._2NUxf ._1Rx4X {\n  background: #fcf6e8;\n  padding: 16px;\n  color: #333;\n  position: relative;\n  font-size: 14px;\n  border-radius: 0 8px 8px 8px;\n}\n\n._2NUxf ._1Rx4X i {\n  color: #ff7a3e;\n  font-style: normal;\n}\n\n._2NUxf ._1Rx4X::before {\n  content: '';\n  position: absolute;\n  right: 100%;\n  top: 0;\n  width: 0;\n  height: 0;\n  border-top: 0 solid transparent;\n  border-right: 8px solid #fcf6e8;\n  border-bottom: 12px solid transparent;\n}\n\n._2NUxf._2VDX- ._1Rx4X {\n  background: #f0faff;\n}\n\n._2NUxf._2VDX- ._1Rx4X::before {\n  border-right: 8px solid #f0faff;\n}\n\n._2NUxf._2afRF ._1Rx4X {\n  background: #fcf6e8;\n}\n\n._2NUxf._2afRF ._1Rx4X::before {\n  border-right: 8px solid #fcf6e8;\n}\n\n._29gch ._3J4sV ._1Rx4X {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n}\n\n._29gch ._3J4sV ._1Rx4X img {\n  margin-right: 20px;\n}\n\n._29gch ._3J4sV ._1Rx4X article {\n  font-size: 14px;\n  color: #666;\n  line-height: 28px;\n}\n\n._2GeSA {\n  width: 16px;\n  height: 16px;\n  margin: 16px;\n}",
        '',
      ]),
        (e.locals = {
          title: '_1U391',
          applyEnd: '_2wk15',
          hasOpenApply: '_2s5DW',
          unableApply: '_29gch',
          hasApplyed: '_1fF2k',
          teachText: '_2NUxf',
          block: '_1Rx4X',
          blue: '_2VDX-',
          gold: '_2afRF',
          text: '_3J4sV',
          closeIcon: '_2GeSA',
        }));
    },
    934254: (n, e, t) => {
      var o = t(959192),
        r = t(461352),
        a = 'string' == typeof o ? [[n.id, o, '']] : o;
      (((e = n.exports = o.locals || {})._getContent = function () {
        return a;
      }),
        (e._getCss = function () {
          return '' + o;
        }),
        (e._insertCss = function (n) {
          return r(a, n);
        }));
    },
    362367: (n, e) => {
      'use strict';
      (Object.defineProperty(e, '__esModule', { value: !0 }),
        (e.default = void 0),
        (e.default = function (n) {
          return {
            getCouldApplyCertInfo: function (e) {
              return n({
                url: '/web/j/mocCertRpcBean.getCouldApplyCertInfo.rpc',
                method: 'POST',
                raw: !0,
                body: { termId: e },
              });
            },
            getTermCertInfo: function (e) {
              return n({
                url: '/web/j/mocCertRpcBean.getTermCertInfo.rpc',
                method: 'POST',
                raw: !0,
                body: { termId: e },
              });
            },
            setReadForApplyCert: function (e) {
              return n({
                url: '/web/j/mocCertRpcBean.setReadForApplyCert.rpc',
                method: 'POST',
                body: { termId: e },
              });
            },
          };
        }));
    },
    895211: (n, e, t) => {
      'use strict';
      function o(n) {
        return (
          (o =
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
          o(n)
        );
      }
      (Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = void 0));
      var r,
        a,
        i,
        l,
        c,
        d,
        u,
        f,
        s,
        p,
        m,
        b,
        h,
        v,
        y,
        g = (function (n) {
          if ('function' == typeof WeakMap) {
            var e = new WeakMap();
            new WeakMap();
          }
          return (function (n) {
            if (n && n.__esModule) return n;
            var t,
              r,
              a = { __proto__: null, default: n };
            if (null === n || ('object' != o(n) && 'function' != typeof n)) return a;
            if ((t = e)) {
              if (t.has(n)) return t.get(n);
              t.set(n, a);
            }
            for (var i in n)
              'default' !== i &&
                {}.hasOwnProperty.call(n, i) &&
                ((r = (t = Object.defineProperty) && Object.getOwnPropertyDescriptor(n, i)) &&
                (r.get || r.set)
                  ? t(a, i, r)
                  : (a[i] = n[i]));
            return a;
          })(n);
        })(t(296540)),
        _ = S(t(443973)),
        x = (S(t(605556)), t(397338)),
        w = S(t(795093)),
        k = S(t(934254)),
        C = S(t(498966)),
        O = S(t(362367));
      function S(n) {
        return n && n.__esModule ? n : { default: n };
      }
      function N() {
        var n,
          e,
          t = 'function' == typeof Symbol ? Symbol : {},
          o = t.iterator || '@@iterator',
          r = t.toStringTag || '@@toStringTag';
        function a(t, o, r, a) {
          var c = o && o.prototype instanceof l ? o : l,
            d = Object.create(c.prototype);
          return (
            A(
              d,
              '_invoke',
              (function (t, o, r) {
                var a,
                  l,
                  c,
                  d = 0,
                  u = r || [],
                  f = !1,
                  s = {
                    p: 0,
                    n: 0,
                    v: n,
                    a: p,
                    f: p.bind(n, 4),
                    d: function (e, t) {
                      return ((a = e), (l = 0), (c = n), (s.n = t), i);
                    },
                  };
                function p(t, o) {
                  for (l = t, c = o, e = 0; !f && d && !r && e < u.length; e++) {
                    var r,
                      a = u[e],
                      p = s.p,
                      m = a[2];
                    t > 3
                      ? (r = m === o) && ((c = a[(l = a[4]) ? 5 : ((l = 3), 3)]), (a[4] = a[5] = n))
                      : a[0] <= p &&
                        ((r = t < 2 && p < a[1])
                          ? ((l = 0), (s.v = o), (s.n = a[1]))
                          : p < m &&
                            (r = t < 3 || a[0] > o || o > m) &&
                            ((a[4] = t), (a[5] = o), (s.n = m), (l = 0)));
                  }
                  if (r || t > 1) return i;
                  throw ((f = !0), o);
                }
                return function (r, u, m) {
                  if (d > 1) throw TypeError('Generator is already running');
                  for (f && 1 === u && p(u, m), l = u, c = m; (e = l < 2 ? n : c) || !f;) {
                    a || (l ? (l < 3 ? (l > 1 && (s.n = -1), p(l, c)) : (s.n = c)) : (s.v = c));
                    try {
                      if (((d = 2), a)) {
                        if ((l || (r = 'next'), (e = a[r]))) {
                          if (!(e = e.call(a, c)))
                            throw TypeError('iterator result is not an object');
                          if (!e.done) return e;
                          ((c = e.value), l < 2 && (l = 0));
                        } else
                          (1 === l && (e = a.return) && e.call(a),
                            l < 2 &&
                              ((c = TypeError(
                                "The iterator does not provide a '" + r + "' method",
                              )),
                              (l = 1)));
                        a = n;
                      } else if ((e = (f = s.n < 0) ? c : t.call(o, s)) !== i) break;
                    } catch (e) {
                      ((a = n), (l = 1), (c = e));
                    } finally {
                      d = 1;
                    }
                  }
                  return { value: e, done: f };
                };
              })(t, r, a),
              !0,
            ),
            d
          );
        }
        var i = {};
        function l() {}
        function c() {}
        function d() {}
        e = Object.getPrototypeOf;
        var u = [][o]
            ? e(e([][o]()))
            : (A((e = {}), o, function () {
                return this;
              }),
              e),
          f = (d.prototype = l.prototype = Object.create(u));
        function s(n) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(n, d)
              : ((n.__proto__ = d), A(n, r, 'GeneratorFunction')),
            (n.prototype = Object.create(f)),
            n
          );
        }
        return (
          (c.prototype = d),
          A(f, 'constructor', d),
          A(d, 'constructor', c),
          (c.displayName = 'GeneratorFunction'),
          A(d, r, 'GeneratorFunction'),
          A(f),
          A(f, r, 'Generator'),
          A(f, o, function () {
            return this;
          }),
          A(f, 'toString', function () {
            return '[object Generator]';
          }),
          (N = function () {
            return { w: a, m: s };
          })()
        );
      }
      function A(n, e, t, o) {
        var r = Object.defineProperty;
        try {
          r({}, '', {});
        } catch (n) {
          r = 0;
        }
        ((A = function (n, e, t, o) {
          function a(e, t) {
            A(n, e, function (n) {
              return this._invoke(e, t, n);
            });
          }
          e
            ? r
              ? r(n, e, { value: t, enumerable: !o, configurable: !o, writable: !o })
              : (n[e] = t)
            : (a('next', 0), a('throw', 1), a('return', 2));
        }),
          A(n, e, t, o));
      }
      function I(n, e, t, o, r, a, i) {
        try {
          var l = n[a](i),
            c = l.value;
        } catch (n) {
          return void t(n);
        }
        l.done ? e(c) : Promise.resolve(c).then(o, r);
      }
      function M(n) {
        return function () {
          var e = this,
            t = arguments;
          return new Promise(function (o, r) {
            var a = n.apply(e, t);
            function i(n) {
              I(a, o, r, i, l, 'next', n);
            }
            function l(n) {
              I(a, o, r, i, l, 'throw', n);
            }
            i(void 0);
          });
        };
      }
      function T(n, e) {
        return (
          (function (n) {
            if (Array.isArray(n)) return n;
          })(n) ||
          (function (n, e) {
            var t =
              null == n
                ? null
                : ('undefined' != typeof Symbol && n[Symbol.iterator]) || n['@@iterator'];
            if (null != t) {
              var o,
                r,
                a,
                i,
                l = [],
                c = !0,
                d = !1;
              try {
                if (((a = (t = t.call(n)).next), 0 === e)) {
                  if (Object(t) !== t) return;
                  c = !1;
                } else
                  for (; !(c = (o = a.call(t)).done) && (l.push(o.value), l.length !== e); c = !0);
              } catch (n) {
                ((d = !0), (r = n));
              } finally {
                try {
                  if (!c && null != t.return && ((i = t.return()), Object(i) !== i)) return;
                } finally {
                  if (d) throw r;
                }
              }
              return l;
            }
          })(n, e) ||
          (function (n, e) {
            if (n) {
              if ('string' == typeof n) return Y(n, e);
              var t = {}.toString.call(n).slice(8, -1);
              return (
                'Object' === t && n.constructor && (t = n.constructor.name),
                'Map' === t || 'Set' === t
                  ? Array.from(n)
                  : 'Arguments' === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
                    ? Y(n, e)
                    : void 0
              );
            }
          })(n, e) ||
          (function () {
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
            );
          })()
        );
      }
      function Y(n, e) {
        (null == e || e > n.length) && (e = n.length);
        for (var t = 0, o = Array(e); t < e; t++) o[t] = n[t];
        return o;
      }
      function D(n, e, t, o) {
        y ||
          (y = ('function' == typeof Symbol && Symbol.for && Symbol.for('react.element')) || 60103);
        var r = n && n.defaultProps,
          a = arguments.length - 3;
        if ((e || 0 === a || (e = { children: void 0 }), 1 === a)) e.children = o;
        else if (a > 1) {
          for (var i = Array(a), l = 0; l < a; l++) i[l] = arguments[l + 3];
          e.children = i;
        }
        if (e && r) for (var c in r) void 0 === e[c] && (e[c] = r[c]);
        else e || (e = r || {});
        return {
          $$typeof: y,
          type: n,
          key: void 0 === t ? null : '' + t,
          ref: null,
          props: e,
          _owner: null,
        };
      }
      var U = function (n) {
          var e = n.data,
            t = n.handleOk,
            o = n.handleCancel,
            a = n.visible,
            i = e.applyStartTime,
            l = e.applyEndTime,
            c = e.chiefPhoto;
          return D(
            x.Modal,
            {
              className: k.default.hasApplyed,
              footer: null,
              visible: a,
              onOk: t,
              onCancel: o,
              closeIcon: D('img', {
                className: k.default.closeIcon,
                src: '//edu-image.nosdn.127.net/15d2fd2dddf948299c8f458c3499d3cb.png?imageView&quality=100',
              }),
            },
            void 0,
            D(
              'div',
              { className: k.default.title },
              void 0,
              r || (r = D('p', {}, void 0, '已申请认证证书')),
              D(
                'span',
                {},
                void 0,
                (0, w.default)(i).format('YYYY-MM-DD HH:mm:ss'),
                '至',
                (0, w.default)(l).format('YYYY-MM-DD HH:mm:ss'),
              ),
            ),
            D(
              'div',
              { className: ''.concat(k.default.teachText, ' ').concat(k.default.blue) },
              void 0,
              D('img', { width: '120', src: c }),
              D(
                'div',
                { className: k.default.block },
                void 0,
                '你已经申请了认证证书，证书的相关状态在个人中心-证书可查看详细信息。',
              ),
            ),
            D(x.Button, { onClick: t }, void 0, '前往我的证书'),
          );
        },
        j = function (n) {
          var e = n.data,
            t = n.handleOk,
            o = n.handleCancel,
            r = n.visible,
            i = e.applyStartTime,
            l = e.applyEndTime,
            c = e.chiefPhoto;
          return D(
            x.Modal,
            {
              className: k.default.applyEnd,
              footer: null,
              visible: r,
              onOk: t,
              onCancel: o,
              closeIcon: D('img', {
                className: k.default.closeIcon,
                src: '//edu-image.nosdn.127.net/15d2fd2dddf948299c8f458c3499d3cb.png?imageView&quality=100',
              }),
            },
            void 0,
            D(
              'div',
              { className: k.default.title },
              void 0,
              a || (a = D('p', {}, void 0, '证书申请已结束')),
              D(
                'span',
                {},
                void 0,
                '申请开放时间：',
                D(
                  'i',
                  {},
                  void 0,
                  (0, w.default)(i).format('YYYY-MM-DD HH:mm:ss'),
                  '至',
                  (0, w.default)(l).format('YYYY-MM-DD HH:mm:ss'),
                ),
              ),
            ),
            D(
              'div',
              { className: ''.concat(k.default.teachText, ' ').concat(k.default.blue) },
              void 0,
              D('img', { width: '120', src: c }),
              D(
                'div',
                { className: k.default.block },
                void 0,
                '证书申请已经结束。感谢一路以来的辛苦付出，你的努力一定不会白费。',
              ),
            ),
            D(x.Button, { onClick: t }, void 0, '知道了'),
          );
        },
        P = function (n) {
          var e = n.data,
            t = n.handleOk,
            o = n.handleCancel,
            r = n.webUser,
            a = n.visible,
            u = e.certApplyStatus,
            f = e.applyStartTime,
            s = e.applyEndTime,
            p = e.couleApplyCertType,
            m = e.courseName,
            b = e.chiefPhoto,
            h = (e.totalScorePlusBonus, e.certPrice),
            v = '';
          switch (p) {
            case 5:
              v = '合格';
              break;
            case 6:
              v = '优秀';
              break;
            case 7:
              v = '不合格';
          }
          return D(
            x.Modal,
            {
              className: k.default.hasOpenApply,
              footer: null,
              visible: a,
              onOk: t,
              onCancel: o,
              closeIcon: D('img', {
                className: k.default.closeIcon,
                src: '//edu-image.nosdn.127.net/15d2fd2dddf948299c8f458c3499d3cb.png?imageView&quality=100',
              }),
            },
            void 0,
            D(
              'div',
              { className: k.default.title },
              void 0,
              i || (i = D('p', {}, void 0, '证书已开放申请')),
              D(
                'span',
                {},
                void 0,
                '申请开放时间：',
                D(
                  'i',
                  {},
                  void 0,
                  (0, w.default)(f).format('YYYY-MM-DD HH:mm:ss'),
                  '至',
                  (0, w.default)(s).format('YYYY-MM-DD HH:mm:ss'),
                ),
                l || (l = D('br', {})),
                '(本课程认证证书申请费用为¥',
                h,
                ')',
              ),
            ),
            D(
              'div',
              {
                className: ''
                  .concat(k.default.teachText, ' ')
                  .concat(0 === u ? k.default.gold : k.default.blue),
              },
              void 0,
              D('img', { width: '120', src: b }),
              D(
                'div',
                { className: k.default.block },
                void 0,
                '你好，',
                r.nickName,
                '，你在《',
                m,
                '》中的学习成绩为',
                D('i', {}, void 0, v),
                '，',
                0 === u
                  ? '可申请认证'.concat(v, '证书。')
                  : c || (c = D('i', {}, void 0, '不符合申请资格哈。')),
                d || (d = D('br', {})),
                0 === u
                  ? '感谢一路以来的辛苦付出，你的努力一定不会白费。'
                  : '你可以报名下一学期，重新学习',
              ),
            ),
            D(x.Button, { onClick: t }, void 0, 0 === u ? '立即申请' : '报名下一学期'),
          );
        },
        R = function (n) {
          var e = n.handleOk,
            t = n.handleCancel,
            o = n.visible;
          return D(
            x.Modal,
            {
              className: k.default.unableApply,
              footer: null,
              visible: o,
              onOk: e,
              onCancel: t,
              closeIcon: D('img', {
                className: k.default.closeIcon,
                src: '//edu-image.nosdn.127.net/15d2fd2dddf948299c8f458c3499d3cb.png?imageView&quality=100',
              }),
            },
            void 0,
            D(
              'div',
              { className: k.default.title },
              void 0,
              u || (u = D('p', {}, void 0, '证书还未开放申请')),
              f ||
                (f = D(
                  'span',
                  {},
                  void 0,
                  '完成该课程学习，并且达到证书要求。老师开放证书申请后，即可申请认证证书。',
                )),
            ),
            D(
              'div',
              { className: k.default.text },
              void 0,
              D(
                'div',
                { className: k.default.block },
                void 0,
                s ||
                  (s = D('img', {
                    width: '120',
                    src: 'http://edu-image.nosdn.127.net/c670312f164e4f3e958af5dc645d932d.png?imageView&quality=100',
                  })),
                p ||
                  (p = D(
                    'article',
                    {},
                    void 0,
                    '· 中国大学MOOC官方认证',
                    D('br', {}),
                    '· 授课老师电子签名，显示学校LOGO',
                    D('br', {}),
                    '· 无可替代的权威性和纪念性。',
                  )),
              ),
              D(
                'div',
                { className: k.default.block },
                void 0,
                m ||
                  (m = D('img', {
                    width: '120',
                    src: 'http://edu-image.nosdn.127.net/7265ac5a369f4d838d8048fcd5048506.png?imageView&quality=100',
                  })),
                b ||
                  (b = D(
                    'article',
                    {},
                    void 0,
                    '· 关联你的实名信息，支持二维码永久验证',
                    D('br', {}),
                    '· 为你的终身教育留下可信的学习凭证',
                    D('br', {}),
                    '· 成为教育经历和求职的有力筹码',
                  )),
              ),
              D(
                'div',
                { className: k.default.block },
                void 0,
                h ||
                  (h = D('img', {
                    width: '120',
                    src: 'http://edu-image.nosdn.127.net/ba2c48608e54452398f46b8ef631e58d.png?imageView&quality=100',
                  })),
                v ||
                  (v = D(
                    'article',
                    {},
                    void 0,
                    '· 支持查看学习记录，获得认证证书后',
                    D('br', {}),
                    '· 铭刻每一分付出和成就。',
                  )),
              ),
            ),
            D(x.Button, { onClick: e }, void 0, '知道了'),
          );
        };
      function V(n) {
        var e = n.auto,
          t = n.termId,
          o = n.courseUrl,
          r = n.getCouldApplyCertInfoAsync,
          a = n.getTermCertInfoAsync,
          i = n.setReadForApplyCertAsync,
          l = n.onChangeVisible,
          c = n.modalVisible,
          d = n.webUser;
        (0, _.default)(k.default);
        var u = T((0, g.useState)({}), 2),
          f = u[0],
          s = u[1],
          p = T((0, g.useState)(c), 2),
          m = p[0],
          b = p[1],
          h = function () {
            (b(function () {
              return !1;
            }),
              l(!1));
          },
          v = function () {
            var n = f.certApplyStatus;
            (-2 === n && h(),
              -1 === n && (location.href = 'https://www.icourse163.org/course/'.concat(o)),
              0 === n &&
                (location.href = 'https://www.icourse163.org/mooc/main/cert/apply?termId='.concat(
                  t,
                )),
              1 === n && h(),
              3 === n &&
                (location.href = 'https://www.icourse163.org/home.htm?userId='.concat(
                  d.id,
                  '#/home/mycert',
                )));
          };
        return (
          (0, g.useEffect)(
            function () {
              var n = (function () {
                var n = M(
                  N().m(function n() {
                    var e, o, r, i;
                    return N().w(function (n) {
                      for (;;)
                        switch (n.n) {
                          case 0:
                            return ((n.n = 1), a(t));
                          case 1:
                            if (
                              ((e = n.v),
                              (o = e.code),
                              (r = e.result),
                              (i = void 0 === r ? {} : r),
                              0 === o)
                            ) {
                              n.n = 2;
                              break;
                            }
                            return (h(), n.a(2));
                          case 2:
                            (s(function () {
                              return i;
                            }),
                              b(function () {
                                return !0;
                              }));
                          case 3:
                            return n.a(2);
                        }
                    }, n);
                  }),
                );
                return function () {
                  return n.apply(this, arguments);
                };
              })();
              c && d && d.id && n();
            },
            [c],
          ),
          (0, g.useEffect)(function () {
            var n = (function () {
              var n = M(
                N().m(function n() {
                  var e, o, a;
                  return N().w(function (n) {
                    for (;;)
                      switch (n.n) {
                        case 0:
                          return ((n.n = 1), r(t));
                        case 1:
                          if (((e = n.v), (o = e.code), (a = e.result), 0 === o)) {
                            n.n = 2;
                            break;
                          }
                          return n.a(2);
                        case 2:
                          0 === o &&
                            a &&
                            (s(function () {
                              return a;
                            }),
                            l(!0),
                            i(t));
                        case 3:
                          return n.a(2);
                      }
                  }, n);
                }),
              );
              return function () {
                return n.apply(this, arguments);
              };
            })();
            (console.warn('biz-cert-modal', d), e && d && d.id && n());
          }, []),
          f && void 0 !== f.certApplyStatus
            ? D(
                'div',
                { className: k.default.container },
                void 0,
                -2 === f.certApplyStatus &&
                  D(j, { visible: m, data: f, handleOk: v, handleCancel: h }),
                (0 === f.certApplyStatus || -1 === f.certApplyStatus) &&
                  D(P, { visible: m, data: f, webUser: d, handleOk: v, handleCancel: h }),
                1 === f.certApplyStatus && D(R, { visible: m, handleOk: v, handleCancel: h }),
                3 === f.certApplyStatus &&
                  D(U, { visible: m, data: f, handleOk: v, handleCancel: h }),
              )
            : null
        );
      }
      ((e.default = (0, C.default)(O.default)(V)),
        (V.defaultProps = {
          webUser: {},
          auto: !1,
          onChangeVisible: function () {},
          termId: '',
          courseUrl: '',
        }));
    },
  },
]);
