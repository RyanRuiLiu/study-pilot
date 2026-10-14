EDU(
  '3b3fe92b0126d95f68a49675a08f8120',
  function (e, t, n, i, o, a) {
    function r(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var i = Object.getOwnPropertySymbols(e);
        if (t)
          i = i.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          });
        n.push.apply(n, i);
      }
      return n;
    }
    function s(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        if (t % 2)
          r(Object(n), !0).forEach(function (t) {
            c(e, t, n[t]);
          });
        else if (Object.getOwnPropertyDescriptors)
          Object.defineProperties(e, Object.getOwnPropertyDescriptors(n));
        else
          r(Object(n)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
          });
      }
      return e;
    }
    function c(e, t, n) {
      if (t in e)
        Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 });
      else e[t] = n;
      return e;
    }
    function d(e, t) {
      var n = ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
      if (!n) {
        if (Array.isArray(e) || (n = l(e)) || (t && e && 'number' == typeof e.length)) {
          if (n) e = n;
          var i = 0;
          var o = function c() {};
          return {
            s: o,
            n: function d() {
              if (i >= e.length) return { done: !0 };
              else return { done: !1, value: e[i++] };
            },
            e: function u(e) {
              throw e;
            },
            f: o,
          };
        }
        throw new TypeError(
          'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
        );
      }
      var a = !0,
        r = !1,
        s;
      return {
        s: function _() {
          n = n.call(e);
        },
        n: function f() {
          var e = n.next();
          a = e.done;
          return e;
        },
        e: function h(e) {
          r = !0;
          s = e;
        },
        f: function p() {
          try {
            if (!a && null != n['return']) n['return']();
          } finally {
            if (r) throw s;
          }
        },
      };
    }
    function l(e, t) {
      if (e) {
        if ('string' == typeof e) return u(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        if ('Object' === n && e.constructor) n = e.constructor.name;
        if ('Map' === n || 'Set' === n) return Array.from(e);
        if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return u(e, t);
        else return;
      }
    }
    function u(e, t) {
      if (null == t || t > e.length) t = e.length;
      for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
      return i;
    }
    function _(e, t) {
      if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
    }
    function f(e, t) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n];
        i.enumerable = i.enumerable || !1;
        i.configurable = !0;
        if ('value' in i) i.writable = !0;
        Object.defineProperty(e, i.key, i);
      }
    }
    function h(e, t, n) {
      if (t) f(e.prototype, t);
      if (n) f(e, n);
      return e;
    }
    var p = (function () {
      function i(e) {
        _(this, i);
        this.opts = e || {};
      }
      h(i, [
        {
          key: 'connect',
          value: function r() {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : (function () {
                    function e() {
                      _(this, e);
                    }
                    return e;
                  })();
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : (function () {
                    function e() {
                      _(this, e);
                    }
                    return e;
                  })();
            var n, o, a;
            n = new e();
            var r = { data: {}, subscribes: [] };
            o = Object.getOwnPropertyNames(n).filter(function (e) {
              return 'constructor' !== e;
            });
            var s = d(o),
              c;
            try {
              for (s.s(); !(c = s.n()).done;) {
                a = c.value;
                n[a].registToComponentData && (r.data[a] = n[a].value);
                r.subscribes.push(n[a].subscribe);
              }
            } catch (l) {
              s.e(l);
            } finally {
              s.f();
            }
            n = new t();
            var u = {};
            o = Object.getOwnPropertyNames(t.prototype).filter(function (e) {
              return 'constructor' !== e;
            });
            var f = d(o),
              h;
            try {
              for (f.s(); !(h = f.n()).done;) {
                a = h.value;
                u[a] = n[a];
                u[a].isDispatcher = !0;
              }
            } catch (l) {
              f.e(l);
            } finally {
              f.f();
            }
            return i.of(Object.assign({}, this.opts, { connect: { state: r, methods: u } }));
          },
        },
        {
          key: 'setName',
          value: function c(e) {
            return i.of(Object.assign({}, this.opts, { name: e }));
          },
        },
        {
          key: 'setStatics',
          value: function l(e) {
            return i.of(Object.assign({}, this.opts, { statics: e }));
          },
        },
        {
          key: 'setData',
          value: function u(e) {
            return i.of(Object.assign({}, this.opts, { data: e }));
          },
        },
        {
          key: 'setEvents',
          value: function f(e) {
            return i.of(Object.assign({}, this.opts, { events: e }));
          },
        },
        {
          key: 'setComputed',
          value: function p(e) {
            return i.of(Object.assign({}, this.opts, { computed: e }));
          },
        },
        {
          key: 'setConfig',
          value: function m(e) {
            return i.of(
              Object.assign({}, this.opts, {
                config: function t(n) {
                  e.call(this, n);
                },
              }),
            );
          },
        },
        {
          key: 'init',
          value: function g(e) {
            return i.of(
              Object.assign({}, this.opts, {
                init: function t(n) {
                  e.call(this, n);
                },
              }),
            );
          },
        },
        {
          key: 'destroy',
          value: function b(e) {
            return i.of(
              Object.assign({}, this.opts, {
                destroy: function t() {
                  e.call(this);
                },
              }),
            );
          },
        },
        {
          key: 'setMethods',
          value: function v() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return i.of(Object.assign({}, this.opts, { methods: e }));
          },
        },
        {
          key: 'setAdvancedMethods',
          value: function E() {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : (function () {
                    function e() {
                      _(this, e);
                    }
                    return e;
                  })();
            var t = new e();
            var n = {};
            var o = Object.getOwnPropertyNames(e.prototype).filter(function (e) {
              return 'constructor' !== e;
            });
            var a = d(o),
              r;
            try {
              var s = function l() {
                var e = r.value;
                n[e] = function () {
                  var n;
                  (n = t[e]).call.apply(n, [this].concat(Array.prototype.slice.call(arguments)));
                };
              };
              for (a.s(); !(r = a.n()).done;) s();
            } catch (c) {
              a.e(c);
            } finally {
              a.f();
            }
            return i.of(
              Object.assign({}, this.opts, {
                advancedMethods: n,
              }),
            );
          },
        },
        {
          key: 'launch',
          value: function x() {
            var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              r = i.filterNames,
              c = void 0 === r ? [] : r,
              d = i.directiveNames,
              l = void 0 === d ? [] : d,
              u = i.eventNames,
              _ = void 0 === u ? [] : u,
              f = i.animationNames,
              h = void 0 === f ? [] : f;
            this.opts.connect = this.opts.connect || {
              state: { data: {}, subscribes: [] },
              methods: {},
            };
            var p = this.opts,
              m = p.name,
              g = p.statics,
              b = p.data,
              v = p.events,
              E = p.computed,
              x = p.config,
              w = p.init,
              C = p.destroy,
              y = p.methods,
              $ = p.advancedMethods,
              I = p.connect,
              T = I.state,
              S = T.data,
              A = T.subscribes,
              N = I.methods;
            var O = s(
              s(s(s(s({}, y), N), $), e.getStaticByDeviceType(g)),
              {},
              {
                name: m,
                data: Object.assign({}, b || {}, S),
                events: v || {},
                computed: E || {},
                config: x
                  ? function (e) {
                      this.supr(e);
                      x.call(this, e);
                    }
                  : function (e) {
                      this.supr(e);
                    },
                init: w
                  ? function (e) {
                      var t = this;
                      this.supr(e);
                      A.forEach(function (e) {
                        return e(t);
                      });
                      setTimeout(function () {
                        w.call(t, e);
                      }, 0);
                    }
                  : function (e) {
                      var t = this;
                      this.supr(e);
                      A.forEach(function (e) {
                        return e(t);
                      });
                      setTimeout(function () {}, 0);
                    },
                destroy: C
                  ? function () {
                      this.supr();
                      C.call(this);
                    }
                  : function () {
                      this.supr();
                    },
              },
            );
            var L = t.$extends(O);
            c.map(function (e) {
              return L.filter(e, o[e]);
            });
            l.map(function (e) {
              return L.directive(e, a[e]);
            });
            _.map(function (e) {
              return L.event(e, v[e]);
            });
            h.map(function (e) {
              return L.animation(e, n[e]);
            });
            return L;
          },
        },
      ]);
      return i;
    })();
    p.of = function (e) {
      return new p(e);
    };
    return p;
  },
  '10e97f20e188c77709178ffb0428e5da',
  '235c21779ec98ac90606962a862dadc9',
  '6913dbd502327f850ed5bfbbac2f4ab4',
  '60da23c9e33b9522b32cb8e25a186a96',
  'f818f4a9d2aab8b4da0c55cbf636216a',
  'd4bb0d8adcff29268bc56fadc00c7488',
);
