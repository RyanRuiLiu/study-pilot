EDU(
  '3d1ac02edd7d63e4c8ca110cbfa57bc8',
  function (e, t, n) {
    function i(e) {
      return a(e) || s(e) || l(e) || o();
    }
    function o() {
      throw new TypeError(
        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      );
    }
    function a(e) {
      if (Array.isArray(e)) return u(e);
    }
    function r(e) {
      return f(e) || s(e) || l(e) || d();
    }
    function s(e) {
      if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator'])
        return Array.from(e);
    }
    function c(e, t) {
      return f(e) || _(e, t) || l(e, t) || d();
    }
    function d() {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      );
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
      var n = e && (('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator']);
      if (null != n) {
        var i = [];
        var o = !0;
        var a = !1;
        var r, s;
        try {
          for (n = n.call(e); !(o = (r = n.next()).done); o = !0) {
            i.push(r.value);
            if (t && i.length === t) break;
          }
        } catch (c) {
          a = !0;
          s = c;
        } finally {
          try {
            if (!o && null != n['return']) n['return']();
          } finally {
            if (a) throw s;
          }
        }
        return i;
      }
    }
    function f(e) {
      if (Array.isArray(e)) return e;
    }
    var h = 0;
    var p = window,
      m = p.rxjs,
      g = m.timer,
      b = m.operators,
      v = b.tap,
      E = b.switchMap,
      x = b.debounce;
    var w = e.getDeviceInfo(),
      C = w.type;
    var y = function L(e) {
      return function (t, n, i) {
        if (e !== C) i.value = function () {};
      };
    };
    var $ = function D(e, n) {
      return function (i) {
        return function () {
          var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '';
          var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function () {};
          var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !0;
          return function (s, c, d) {
            if (o.constructor === Function) {
              a = o;
              o = '';
              r = !1;
            }
            var l = s[c] || c;
            d.configurable = !0;
            d.initializer = function () {
              return {
                value: o,
                registToComponentData: r,
                subscribe: function d(u) {
                  t.of({ type: n, key: e })
                    .setSubscribeCallback(
                      function (e) {
                        var t = {};
                        if (e && e.constructor.toString().indexOf('Object') != -1)
                          if (void 0 == s[c] && !e[c]) t[c] = e;
                          else
                            t[c] = l.split('.').reduce(function (e, t) {
                              return e[t];
                            }, e);
                        else t[c] = e || o;
                        r && u.$update(t);
                        a.call(u, t, u.data);
                      },
                      function (t) {
                        return (
                          isDev &&
                          console.log(
                            '\n\n=================='
                              .concat(
                                new Date(),
                                '==================\nerror happends on MapStateToComponent with message:\n                            type: ',
                              )
                              .concat(n || 'GLOBAL_TYPE', ' key: ')
                              .concat(e, ' actionName: ')
                              .concat(i, '\n                            error: ')
                              .concat(t),
                          )
                        );
                      },
                    )
                    .subscribe(i);
                },
              };
            };
          };
        };
      };
    };
    var I = function R(e, n) {
      return function () {
        var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '';
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function () {};
        var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !0;
        return function (r, s, c) {
          if (i.constructor === Function) {
            o = i;
            i = '';
            a = !1;
          }
          var d = r[s] || s;
          c.configurable = !0;
          c.initializer = function () {
            return {
              value: i,
              registToComponentData: a,
              subscribe: function c(l) {
                t.of({ type: n, key: e })
                  .setSubscribeCallback(
                    function (e) {
                      var t = {};
                      if (e && e.constructor.toString().indexOf('Object') != -1)
                        if (void 0 == r[s] && !e[s]) t[s] = e;
                        else
                          t[s] = d.split('.').reduce(function (e, t) {
                            return e[t];
                          }, e);
                      else t[s] = e || i;
                      a && l.$update(t);
                      o.call(l, t, l.data);
                    },
                    function (t) {
                      return (
                        isDev &&
                        console.log(
                          '\n\n=================='
                            .concat(
                              new Date(),
                              '==================\nerror happends on MapStateToComponent with message:\n                            type: ',
                            )
                            .concat(n || 'GLOBAL_TYPE', ' key: ')
                            .concat(e, ' componentName: ')
                            .concat(l.name, '\n                            error: ')
                            .concat(t),
                        )
                      );
                    },
                  )
                  .subscribe(l.name);
              },
            };
          };
        };
      };
    };
    var T = function k(n, i) {
      return function (o) {
        return function (a, r) {
          var s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function () {};
          var c = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0;
          return function (d, l, u) {
            var _;
            if ((null === (_ = a) || void 0 === _ ? void 0 : _.constructor) === Function) {
              s = r;
              r = a;
              a = '';
              c = !1;
            }
            var f = d[l] || l;
            u.configurable = !0;
            u.initializer = function () {
              return {
                value: a,
                registToComponentData: c,
                subscribe: function u(_) {
                  t.of({ type: i, key: n })
                    .setPipe(
                      v(function (t) {
                        return (
                          e.isDev() &&
                          console.log(
                            '\n\n=================='
                              .concat(
                                new Date(),
                                '==================\nbefore pipe switchMap: \nkey: ',
                              )
                              .concat(n, ' actionName: ')
                              .concat(o, ' \n')
                              .concat(JSON.stringify(t, null, 2)),
                          )
                        );
                      }),
                      E(function (e) {
                        return r(e);
                      }),
                      v(function (t) {
                        return (
                          e.isDev() &&
                          console.log(
                            '\n\n=================='
                              .concat(
                                new Date(),
                                '==================\nafter pipe switchMap: \nkey: ',
                              )
                              .concat(n, ' actionName: ')
                              .concat(o, ' \n')
                              .concat(JSON.stringify(t, null, 2)),
                          )
                        );
                      }),
                    )
                    .setSubscribeCallback(
                      function (e) {
                        var t = {};
                        if (e && e.constructor.toString().indexOf('Object') != -1)
                          if (void 0 == d[l] && !e[l]) t[l] = e;
                          else
                            t[l] = f.split('.').reduce(function (e, t) {
                              return e[t];
                            }, e);
                        else t[l] = e || a;
                        c && _.$update(t);
                        s.call(_, t, _.data);
                      },
                      function (t) {
                        return (
                          e.isDev() &&
                          console.log(
                            '\n\n=================='
                              .concat(
                                new Date(),
                                '==================\nerror happends on MapStateToComponent with message:\n                            type: ',
                              )
                              .concat(i || 'GLOBAL_TYPE', ' key: ')
                              .concat(n, ' actionName: ')
                              .concat(o, '\n                            error: ')
                              .concat(t),
                          )
                        );
                      },
                    )
                    .subscribe(o);
                },
              };
            };
          };
        };
      };
    };
    var S = function U(n, i) {
      return function (o, a) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function () {};
        var s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0;
        return function (c, d, l) {
          var u;
          if ((null === (u = o) || void 0 === u ? void 0 : u.constructor) === Function) {
            r = a;
            a = o;
            o = '';
            s = !1;
          }
          var _ = c[d] || d;
          l.configurable = !0;
          l.initializer = function () {
            return {
              value: o,
              registToComponentData: s,
              subscribe: function l(u) {
                t.of({ type: i, key: n })
                  .setPipe(
                    v(function (t) {
                      return (
                        e.isDev() &&
                        console.log(
                          '\n\n=================='
                            .concat(
                              new Date(),
                              '==================\nbefore pipe switchMap: \nkey: ',
                            )
                            .concat(n, ' componentName: ')
                            .concat(u.name, ' \n')
                            .concat(JSON.stringify(t, null, 2)),
                        )
                      );
                    }),
                    E(function (e) {
                      return a(e);
                    }),
                    v(function (t) {
                      return (
                        e.isDev() &&
                        console.log(
                          '\n\n=================='
                            .concat(new Date(), '==================\nafter pipe switchMap: \nkey: ')
                            .concat(n, ' componentName: ')
                            .concat(u.name, ' \n')
                            .concat(JSON.stringify(t, null, 2)),
                        )
                      );
                    }),
                  )
                  .setSubscribeCallback(
                    function (e) {
                      var t = {};
                      if (e && e.constructor.toString().indexOf('Object') != -1)
                        if (void 0 == c[d] && !e[d]) t[d] = e;
                        else
                          t[d] = _.split('.').reduce(function (e, t) {
                            return e[t];
                          }, e);
                      else t[d] = e || o;
                      s && u.$update(t);
                      r.call(u, t, u.data);
                    },
                    function (t) {
                      return (
                        e.isDev() &&
                        console.log(
                          '\n\n=================='
                            .concat(
                              new Date(),
                              '==================\nerror happends on MapStateToComponent with message:\n                            type: ',
                            )
                            .concat(i || 'GLOBAL_TYPE', ' key: ')
                            .concat(n, ' componentName: ')
                            .concat(u.name, '\n                            error: ')
                            .concat(t),
                        )
                      );
                    },
                  )
                  .subscribe(u.name);
              },
            };
          };
        };
      };
    };
    var A = function P(n, i) {
      return function (o, a, r) {
        var s = r.value;
        r.value = function () {
          var o = s.apply(void 0, arguments);
          var a = [];
          if (o && o.constructor.toString().indexOf('Object') != -1)
            if (o.hasErr) a.push(o);
            else
              a = Object.values(o).filter(function (e) {
                return e && e.hasErr;
              });
          if (a.length && 0 !== a.length) {
            var r = {};
            a.forEach(function (e) {
              var t = e.errType,
                n = e.errKey,
                i = e.value,
                o = e.errList,
                a = e.valiCallback;
              if (!r[t]) r[t] = {};
              if (!r[t][n]) r[t][n] = [];
              r[t][n].push({ value: i, errList: o, valiCallback: a });
            });
            e.isDev() &&
              console.log(
                '\n\n=================='
                  .concat(
                    new Date(),
                    '==================\ndispatch validation has not passed error happends: \nkey: ',
                  )
                  .concat(n, '  \n')
                  .concat(JSON.stringify(r, null, 2)),
              );
            for (var d = 0, l = Object.entries(r); d < l.length; d++) {
              var u = c(l[d], 2),
                _ = u[0],
                f = u[1];
              for (var h = 0, p = Object.entries(f); h < p.length; h++) {
                var m = c(p[h], 2),
                  g = m[0],
                  b = m[1];
                b.valiCallback
                  ? b.valiCallback(b.errList, value)
                  : t
                      .of({ type: 'undefined' === _ ? void 0 : _, key: g })
                      .setData({ list: b })
                      .launch();
              }
            }
          } else {
            e.isDev() &&
              console.log(
                '\n\n=================='
                  .concat(new Date(), '==================\nstart dispatch: \nkey: ')
                  .concat(n, '  \n')
                  .concat(JSON.stringify(o, null, 2)),
              );
            t.of({ type: i, key: n }).setData(o).launch();
          }
        };
      };
    };
    var N = function M(t, o) {
      return function () {
        for (var a = arguments.length, s = new Array(a), c = 0; c < a; c++) s[c] = arguments[c];
        return function (a) {
          var c = null;
          if ('function' == typeof s[s.length - 1]) c = s.pop();
          var d = s
            .reduce(
              function (e, t) {
                var n = r(t),
                  o = n[0],
                  a = n.slice(1);
                return e[o].apply(e, i(a));
              },
              n.of({ value: a }),
            )
            .validate()
            .collectErrObjs();
          if (0 !== d.length) {
            e.isDev() &&
              console.log(
                '\n\n=================='
                  .concat(new Date(), '==================\nvalidation error happends: \nkey: ')
                  .concat(t, '  \n')
                  .concat(JSON.stringify(d, null, 2)),
              );
            return { hasErr: !0, value: a, errType: o, errKey: t, errList: d, valiCallback: c };
          } else return a;
        };
      };
    };
    var O = {
      DeviceJudge: y,
      MapStateToComponent: $,
      MapPipeStateToComponent: T,
      MapStateToComponentWithCN: I,
      MapPipeStateToComponentWithCN: S,
      MapDispatchToComponent: A,
      Validate: N,
    };
    return O;
  },
  '10e97f20e188c77709178ffb0428e5da',
  '7b82975a3c650c9c725794242d058df0',
  'b7c6eb662291122d15e63335217dbb6e',
);
