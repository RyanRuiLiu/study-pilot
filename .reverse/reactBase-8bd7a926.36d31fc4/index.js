'use strict';
(self.webpackChunkreact_mooc = self.webpackChunkreact_mooc || []).push([
  [1639],
  {
    264039: (n, t, e) => {
      var o = 'undefined' != typeof Symbol && Symbol,
        r = e(241333);
      n.exports = function () {
        return (
          'function' == typeof o &&
          'function' == typeof Symbol &&
          'symbol' == typeof o('foo') &&
          'symbol' == typeof Symbol('bar') &&
          r()
        );
      };
    },
    241333: (n) => {
      n.exports = function () {
        if ('function' != typeof Symbol || 'function' != typeof Object.getOwnPropertySymbols)
          return !1;
        if ('symbol' == typeof Symbol.iterator) return !0;
        var n = {},
          t = Symbol('test'),
          e = Object(t);
        if ('string' == typeof t) return !1;
        if ('[object Symbol]' !== Object.prototype.toString.call(t)) return !1;
        if ('[object Symbol]' !== Object.prototype.toString.call(e)) return !1;
        for (var o in ((n[t] = 42), n)) return !1;
        if ('function' == typeof Object.keys && 0 !== Object.keys(n).length) return !1;
        if (
          'function' == typeof Object.getOwnPropertyNames &&
          0 !== Object.getOwnPropertyNames(n).length
        )
          return !1;
        var r = Object.getOwnPropertySymbols(n);
        if (1 !== r.length || r[0] !== t) return !1;
        if (!Object.prototype.propertyIsEnumerable.call(n, t)) return !1;
        if ('function' == typeof Object.getOwnPropertyDescriptor) {
          var i = Object.getOwnPropertyDescriptor(n, t);
          if (42 !== i.value || !0 !== i.enumerable) return !1;
        }
        return !0;
      };
    },
    9957: (n, t, e) => {
      var o = Function.prototype.call,
        r = Object.prototype.hasOwnProperty,
        i = e(566743);
      n.exports = i.call(o, r);
    },
    744499: (n, t, e) => {
      (e.r(t),
        e.d(t, {
          createBrowserHistory: () => O,
          createHashHistory: () => S,
          createLocation: () => d,
          createMemoryHistory: () => j,
          createPath: () => h,
          locationsAreEqual: () => p,
          parsePath: () => l,
        }));
      var o = e(58168),
        r = e(534307),
        i = e(278783),
        a = e(911561);
      function c(n) {
        return '/' === n.charAt(0) ? n : '/' + n;
      }
      function f(n) {
        return '/' === n.charAt(0) ? n.substr(1) : n;
      }
      function s(n, t) {
        return (function (n, t) {
          return (
            0 === n.toLowerCase().indexOf(t.toLowerCase()) &&
            -1 !== '/?#'.indexOf(n.charAt(t.length))
          );
        })(n, t)
          ? n.substr(t.length)
          : n;
      }
      function u(n) {
        return '/' === n.charAt(n.length - 1) ? n.slice(0, -1) : n;
      }
      function l(n) {
        var t = n || '/',
          e = '',
          o = '',
          r = t.indexOf('#');
        -1 !== r && ((o = t.substr(r)), (t = t.substr(0, r)));
        var i = t.indexOf('?');
        return (
          -1 !== i && ((e = t.substr(i)), (t = t.substr(0, i))),
          { pathname: t, search: '?' === e ? '' : e, hash: '#' === o ? '' : o }
        );
      }
      function h(n) {
        var t = n.pathname,
          e = n.search,
          o = n.hash,
          r = t || '/';
        return (
          e && '?' !== e && (r += '?' === e.charAt(0) ? e : '?' + e),
          o && '#' !== o && (r += '#' === o.charAt(0) ? o : '#' + o),
          r
        );
      }
      function d(n, t, e, i) {
        var a;
        'string' == typeof n
          ? ((a = l(n)).state = t)
          : (void 0 === (a = (0, o.A)({}, n)).pathname && (a.pathname = ''),
            a.search ? '?' !== a.search.charAt(0) && (a.search = '?' + a.search) : (a.search = ''),
            a.hash ? '#' !== a.hash.charAt(0) && (a.hash = '#' + a.hash) : (a.hash = ''),
            void 0 !== t && void 0 === a.state && (a.state = t));
        try {
          a.pathname = decodeURI(a.pathname);
        } catch (n) {
          throw n instanceof URIError
            ? new URIError(
                'Pathname "' +
                  a.pathname +
                  '" could not be decoded. This is likely caused by an invalid percent-encoding.',
              )
            : n;
        }
        return (
          e && (a.key = e),
          i
            ? a.pathname
              ? '/' !== a.pathname.charAt(0) && (a.pathname = (0, r.A)(a.pathname, i.pathname))
              : (a.pathname = i.pathname)
            : a.pathname || (a.pathname = '/'),
          a
        );
      }
      function p(n, t) {
        return (
          n.pathname === t.pathname &&
          n.search === t.search &&
          n.hash === t.hash &&
          n.key === t.key &&
          (0, i.A)(n.state, t.state)
        );
      }
      function v() {
        var n = null,
          t = [];
        return {
          setPrompt: function (t) {
            return (
              (n = t),
              function () {
                n === t && (n = null);
              }
            );
          },
          confirmTransitionTo: function (t, e, o, r) {
            if (null != n) {
              var i = 'function' == typeof n ? n(t, e) : n;
              'string' == typeof i ? ('function' == typeof o ? o(i, r) : r(!0)) : r(!1 !== i);
            } else r(!0);
          },
          appendListener: function (n) {
            var e = !0;
            function o() {
              e && n.apply(void 0, arguments);
            }
            return (
              t.push(o),
              function () {
                ((e = !1),
                  (t = t.filter(function (n) {
                    return n !== o;
                  })));
              }
            );
          },
          notifyListeners: function () {
            for (var n = arguments.length, e = new Array(n), o = 0; o < n; o++) e[o] = arguments[o];
            t.forEach(function (n) {
              return n.apply(void 0, e);
            });
          },
        };
      }
      var y = !('undefined' == typeof window || !window.document || !window.document.createElement);
      function m(n, t) {
        t(window.confirm(n));
      }
      var w = 'popstate',
        g = 'hashchange';
      function b() {
        try {
          return window.history.state || {};
        } catch (n) {
          return {};
        }
      }
      function O(n) {
        (void 0 === n && (n = {}), y || (0, a.A)(!1));
        var t,
          e = window.history,
          r =
            ((-1 === (t = window.navigator.userAgent).indexOf('Android 2.') &&
              -1 === t.indexOf('Android 4.0')) ||
              -1 === t.indexOf('Mobile Safari') ||
              -1 !== t.indexOf('Chrome') ||
              -1 !== t.indexOf('Windows Phone')) &&
            window.history &&
            'pushState' in window.history,
          i = !(-1 === window.navigator.userAgent.indexOf('Trident')),
          f = n,
          l = f.forceRefresh,
          p = void 0 !== l && l,
          O = f.getUserConfirmation,
          P = void 0 === O ? m : O,
          x = f.keyLength,
          A = void 0 === x ? 6 : x,
          k = n.basename ? u(c(n.basename)) : '';
        function T(n) {
          var t = n || {},
            e = t.key,
            o = t.state,
            r = window.location,
            i = r.pathname + r.search + r.hash;
          return (k && (i = s(i, k)), d(i, o, e));
        }
        function S() {
          return Math.random().toString(36).substr(2, A);
        }
        var L = v();
        function j(n) {
          ((0, o.A)(B, n), (B.length = e.length), L.notifyListeners(B.location, B.action));
        }
        function E(n) {
          (function (n) {
            return void 0 === n.state && -1 === navigator.userAgent.indexOf('CriOS');
          })(n) || U(T(n.state));
        }
        function C() {
          U(T(b()));
        }
        var H = !1;
        function U(n) {
          H
            ? ((H = !1), j())
            : L.confirmTransitionTo(n, 'POP', P, function (t) {
                t
                  ? j({ action: 'POP', location: n })
                  : (function (n) {
                      var t = B.location,
                        e = I.indexOf(t.key);
                      -1 === e && (e = 0);
                      var o = I.indexOf(n.key);
                      -1 === o && (o = 0);
                      var r = e - o;
                      r && ((H = !0), R(r));
                    })(n);
              });
        }
        var F = T(b()),
          I = [F.key];
        function M(n) {
          return k + h(n);
        }
        function R(n) {
          e.go(n);
        }
        var D = 0;
        function N(n) {
          1 === (D += n) && 1 === n
            ? (window.addEventListener(w, E), i && window.addEventListener(g, C))
            : 0 === D && (window.removeEventListener(w, E), i && window.removeEventListener(g, C));
        }
        var $ = !1,
          B = {
            length: e.length,
            action: 'POP',
            location: F,
            createHref: M,
            push: function (n, t) {
              var o = 'PUSH',
                i = d(n, t, S(), B.location);
              L.confirmTransitionTo(i, o, P, function (n) {
                if (n) {
                  var t = M(i),
                    a = i.key,
                    c = i.state;
                  if (r)
                    if ((e.pushState({ key: a, state: c }, null, t), p)) window.location.href = t;
                    else {
                      var f = I.indexOf(B.location.key),
                        s = I.slice(0, f + 1);
                      (s.push(i.key), (I = s), j({ action: o, location: i }));
                    }
                  else window.location.href = t;
                }
              });
            },
            replace: function (n, t) {
              var o = 'REPLACE',
                i = d(n, t, S(), B.location);
              L.confirmTransitionTo(i, o, P, function (n) {
                if (n) {
                  var t = M(i),
                    a = i.key,
                    c = i.state;
                  if (r)
                    if ((e.replaceState({ key: a, state: c }, null, t), p))
                      window.location.replace(t);
                    else {
                      var f = I.indexOf(B.location.key);
                      (-1 !== f && (I[f] = i.key), j({ action: o, location: i }));
                    }
                  else window.location.replace(t);
                }
              });
            },
            go: R,
            goBack: function () {
              R(-1);
            },
            goForward: function () {
              R(1);
            },
            block: function (n) {
              void 0 === n && (n = !1);
              var t = L.setPrompt(n);
              return (
                $ || (N(1), ($ = !0)),
                function () {
                  return ($ && (($ = !1), N(-1)), t());
                }
              );
            },
            listen: function (n) {
              var t = L.appendListener(n);
              return (
                N(1),
                function () {
                  (N(-1), t());
                }
              );
            },
          };
        return B;
      }
      var P = 'hashchange',
        x = {
          hashbang: {
            encodePath: function (n) {
              return '!' === n.charAt(0) ? n : '!/' + f(n);
            },
            decodePath: function (n) {
              return '!' === n.charAt(0) ? n.substr(1) : n;
            },
          },
          noslash: { encodePath: f, decodePath: c },
          slash: { encodePath: c, decodePath: c },
        };
      function A(n) {
        var t = n.indexOf('#');
        return -1 === t ? n : n.slice(0, t);
      }
      function k() {
        var n = window.location.href,
          t = n.indexOf('#');
        return -1 === t ? '' : n.substring(t + 1);
      }
      function T(n) {
        window.location.replace(A(window.location.href) + '#' + n);
      }
      function S(n) {
        (void 0 === n && (n = {}), y || (0, a.A)(!1));
        var t = window.history,
          e = (window.navigator.userAgent.indexOf('Firefox'), n),
          r = e.getUserConfirmation,
          i = void 0 === r ? m : r,
          f = e.hashType,
          l = void 0 === f ? 'slash' : f,
          p = n.basename ? u(c(n.basename)) : '',
          w = x[l],
          g = w.encodePath,
          b = w.decodePath;
        function O() {
          var n = b(k());
          return (p && (n = s(n, p)), d(n));
        }
        var S = v();
        function L(n) {
          ((0, o.A)($, n), ($.length = t.length), S.notifyListeners($.location, $.action));
        }
        var j = !1,
          E = null;
        function C() {
          var n,
            t,
            e = k(),
            o = g(e);
          if (e !== o) T(o);
          else {
            var r = O(),
              a = $.location;
            if (
              !j &&
              ((t = r),
              (n = a).pathname === t.pathname && n.search === t.search && n.hash === t.hash)
            )
              return;
            if (E === h(r)) return;
            ((E = null),
              (function (n) {
                if (j) ((j = !1), L());
                else {
                  S.confirmTransitionTo(n, 'POP', i, function (t) {
                    t
                      ? L({ action: 'POP', location: n })
                      : (function (n) {
                          var t = $.location,
                            e = I.lastIndexOf(h(t));
                          -1 === e && (e = 0);
                          var o = I.lastIndexOf(h(n));
                          -1 === o && (o = 0);
                          var r = e - o;
                          r && ((j = !0), M(r));
                        })(n);
                  });
                }
              })(r));
          }
        }
        var H = k(),
          U = g(H);
        H !== U && T(U);
        var F = O(),
          I = [h(F)];
        function M(n) {
          t.go(n);
        }
        var R = 0;
        function D(n) {
          1 === (R += n) && 1 === n
            ? window.addEventListener(P, C)
            : 0 === R && window.removeEventListener(P, C);
        }
        var N = !1,
          $ = {
            length: t.length,
            action: 'POP',
            location: F,
            createHref: function (n) {
              var t = document.querySelector('base'),
                e = '';
              return (
                t && t.getAttribute('href') && (e = A(window.location.href)),
                e + '#' + g(p + h(n))
              );
            },
            push: function (n, t) {
              var e = 'PUSH',
                o = d(n, void 0, void 0, $.location);
              S.confirmTransitionTo(o, e, i, function (n) {
                if (n) {
                  var t = h(o),
                    r = g(p + t);
                  if (k() !== r) {
                    ((E = t),
                      (function (n) {
                        window.location.hash = n;
                      })(r));
                    var i = I.lastIndexOf(h($.location)),
                      a = I.slice(0, i + 1);
                    (a.push(t), (I = a), L({ action: e, location: o }));
                  } else L();
                }
              });
            },
            replace: function (n, t) {
              var e = 'REPLACE',
                o = d(n, void 0, void 0, $.location);
              S.confirmTransitionTo(o, e, i, function (n) {
                if (n) {
                  var t = h(o),
                    r = g(p + t);
                  k() !== r && ((E = t), T(r));
                  var i = I.indexOf(h($.location));
                  (-1 !== i && (I[i] = t), L({ action: e, location: o }));
                }
              });
            },
            go: M,
            goBack: function () {
              M(-1);
            },
            goForward: function () {
              M(1);
            },
            block: function (n) {
              void 0 === n && (n = !1);
              var t = S.setPrompt(n);
              return (
                N || (D(1), (N = !0)),
                function () {
                  return (N && ((N = !1), D(-1)), t());
                }
              );
            },
            listen: function (n) {
              var t = S.appendListener(n);
              return (
                D(1),
                function () {
                  (D(-1), t());
                }
              );
            },
          };
        return $;
      }
      function L(n, t, e) {
        return Math.min(Math.max(n, t), e);
      }
      function j(n) {
        void 0 === n && (n = {});
        var t = n,
          e = t.getUserConfirmation,
          r = t.initialEntries,
          i = void 0 === r ? ['/'] : r,
          a = t.initialIndex,
          c = void 0 === a ? 0 : a,
          f = t.keyLength,
          s = void 0 === f ? 6 : f,
          u = v();
        function l(n) {
          ((0, o.A)(b, n), (b.length = b.entries.length), u.notifyListeners(b.location, b.action));
        }
        function p() {
          return Math.random().toString(36).substr(2, s);
        }
        var y = L(c, 0, i.length - 1),
          m = i.map(function (n) {
            return d(n, void 0, 'string' == typeof n ? p() : n.key || p());
          }),
          w = h;
        function g(n) {
          var t = L(b.index + n, 0, b.entries.length - 1),
            o = b.entries[t];
          u.confirmTransitionTo(o, 'POP', e, function (n) {
            n ? l({ action: 'POP', location: o, index: t }) : l();
          });
        }
        var b = {
          length: m.length,
          action: 'POP',
          location: m[y],
          index: y,
          entries: m,
          createHref: w,
          push: function (n, t) {
            var o = 'PUSH',
              r = d(n, t, p(), b.location);
            u.confirmTransitionTo(r, o, e, function (n) {
              if (n) {
                var t = b.index + 1,
                  e = b.entries.slice(0);
                (e.length > t ? e.splice(t, e.length - t, r) : e.push(r),
                  l({ action: o, location: r, index: t, entries: e }));
              }
            });
          },
          replace: function (n, t) {
            var o = 'REPLACE',
              r = d(n, t, p(), b.location);
            u.confirmTransitionTo(r, o, e, function (n) {
              n && ((b.entries[b.index] = r), l({ action: o, location: r }));
            });
          },
          go: g,
          goBack: function () {
            g(-1);
          },
          goForward: function () {
            g(1);
          },
          canGo: function (n) {
            var t = b.index + n;
            return t >= 0 && t < b.entries.length;
          },
          block: function (n) {
            return (void 0 === n && (n = !1), u.setPrompt(n));
          },
          listen: function (n) {
            return u.appendListener(n);
          },
        };
        return b;
      }
    },
    304146: (n, t, e) => {
      var o = e(44363),
        r = {
          childContextTypes: !0,
          contextType: !0,
          contextTypes: !0,
          defaultProps: !0,
          displayName: !0,
          getDefaultProps: !0,
          getDerivedStateFromError: !0,
          getDerivedStateFromProps: !0,
          mixins: !0,
          propTypes: !0,
          type: !0,
        },
        i = {
          name: !0,
          length: !0,
          prototype: !0,
          caller: !0,
          callee: !0,
          arguments: !0,
          arity: !0,
        },
        a = {
          $$typeof: !0,
          compare: !0,
          defaultProps: !0,
          displayName: !0,
          propTypes: !0,
          type: !0,
        },
        c = {};
      function f(n) {
        return o.isMemo(n) ? a : c[n.$$typeof] || r;
      }
      ((c[o.ForwardRef] = {
        $$typeof: !0,
        render: !0,
        defaultProps: !0,
        displayName: !0,
        propTypes: !0,
      }),
        (c[o.Memo] = a));
      var s = Object.defineProperty,
        u = Object.getOwnPropertyNames,
        l = Object.getOwnPropertySymbols,
        h = Object.getOwnPropertyDescriptor,
        d = Object.getPrototypeOf,
        p = Object.prototype;
      n.exports = function n(t, e, o) {
        if ('string' != typeof e) {
          if (p) {
            var r = d(e);
            r && r !== p && n(t, r, o);
          }
          var a = u(e);
          l && (a = a.concat(l(e)));
          for (var c = f(t), v = f(e), y = 0; y < a.length; ++y) {
            var m = a[y];
            if (!(i[m] || (o && o[m]) || (v && v[m]) || (c && c[m]))) {
              var w = h(e, m);
              try {
                s(t, m, w);
              } catch (n) {}
            }
          }
        }
        return t;
      };
    },
    745685: (n, t, e) => {
      e.d(t, { A: () => c });
      var o = /[A-Z]/g,
        r = /^ms-/,
        i = {};
      function a(n) {
        return '-' + n.toLowerCase();
      }
      const c = function (n) {
        if (i.hasOwnProperty(n)) return i[n];
        var t = n.replace(o, a);
        return (i[n] = r.test(t) ? '-' + t : t);
      };
    },
  },
]);
