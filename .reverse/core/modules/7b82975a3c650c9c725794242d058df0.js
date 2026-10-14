EDU(
  '7b82975a3c650c9c725794242d058df0',
  function (e) {
    function t(e) {
      return o(e) || i(e) || s(e) || n();
    }
    function n() {
      throw new TypeError(
        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      );
    }
    function i(e) {
      if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator'])
        return Array.from(e);
    }
    function o(e) {
      if (Array.isArray(e)) return c(e);
    }
    function a(e, t) {
      return l(e) || d(e, t) || s(e, t) || r();
    }
    function r() {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      );
    }
    function s(e, t) {
      if (e) {
        if ('string' == typeof e) return c(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        if ('Object' === n && e.constructor) n = e.constructor.name;
        if ('Map' === n || 'Set' === n) return Array.from(e);
        if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return c(e, t);
        else return;
      }
    }
    function c(e, t) {
      if (null == t || t > e.length) t = e.length;
      for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
      return i;
    }
    function d(e, t) {
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
    function l(e) {
      if (Array.isArray(e)) return e;
    }
    function u(e, t) {
      if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
    }
    function _(e, t) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n];
        i.enumerable = i.enumerable || !1;
        i.configurable = !0;
        if ('value' in i) i.writable = !0;
        Object.defineProperty(e, i.key, i);
      }
    }
    function f(e, t, n) {
      if (t) _(e.prototype, t);
      if (n) _(e, n);
      return e;
    }
    var h = {};
    var p = {};
    var m = window,
      g = m.rxjs,
      b = g.of,
      v = g.Subject,
      E = g.Observable.create;
    var x = 'GLOBAL_OBSERVABLE';
    var w = 'GLOBAL_SUBJECT';
    var C = (function () {
      function n(e) {
        u(this, n);
        this.opts = e || {};
      }
      f(n, [
        {
          key: 'setKey',
          value: function i() {
            return n.of(Object.assign({}, this.opts, { key: key }));
          },
        },
        {
          key: 'setType',
          value: function o() {
            return n.of(Object.assign({}, this.opts, { type: type }));
          },
        },
        {
          key: 'setPipe',
          value: function r() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            return n.of(Object.assign({}, this.opts, { pipe: t }));
          },
        },
        {
          key: 'setSubscribeCallback',
          value: function s() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            return n.of(Object.assign({}, this.opts, { callback: t }));
          },
        },
        {
          key: 'setData',
          value: function c(e) {
            return n.of(Object.assign({}, this.opts, { data: e }));
          },
        },
        {
          key: 'addObservable',
          value: function d(e) {
            var t = this.opts.type || x;
            var i = this.opts.key;
            h[t] || (h[t] = {});
            h[t][i] = { observable: e, type: t, unsubscribe: {} };
            return n.of(this.opts);
          },
        },
        {
          key: 'addSubject',
          value: function l(e) {
            var t = this.opts.type || w;
            var i = this.opts.key;
            p[t] || (p[t] = {});
            p[t][i] = { subject: e, type: t, unsubscribe: {} };
            return n.of(this.opts);
          },
        },
        {
          key: 'remove',
          value: function _() {
            var e = this.opts.type;
            var t = this.opts.key;
            var i, o, r;
            if (h[x][t]) {
              r = h;
              i = h[x][t];
              o = x;
            } else if (p[w][t]) {
              r = p;
              i = p[w][t];
              o = w;
            } else {
              if (h[e] && h[e][t]) {
                r = h;
                i = h[e][t];
              } else if (p[e] && p[e][t]) {
                r = p;
                i = p[e][t];
              }
              o = e;
            }
            for (var s = 0, c = Object.entries(i.unsubscribe); s < c.length; s++) {
              var d = a(c[s], 2),
                l = d[0],
                u = d[1];
              u();
              delete i.unsubscribe[l];
            }
            delete r[o][t];
            if (o != x && o != w && 0 === Object.keys(i).length) delete r[o];
            return n.of(this.opts);
          },
        },
        {
          key: 'unsubscribe',
          value: function m(t) {
            var n = this.opts.type;
            var i = this.opts.key;
            var o;
            if (h[x][i]) o = h[x][i];
            else if (p[w][i]) o = p[w][i];
            else if (h[n] && h[n][i]) o = h[n][i];
            else if (p[n] && p[n][i]) o = p[n][i];
            if (o.unsubscribe[t]) {
              o.unsubscribe[t]();
              delete o.unsubscribe[t];
            } else
              e.isDev() && console.log('cannot find related actionName of observable and subject');
          },
        },
        {
          key: 'subscribe',
          value: function g(n) {
            var i, o;
            var a = this.opts.type;
            var r = this.opts.key;
            var s, c;
            if (h[x] && h[x][r]) {
              s = h[x][r].observable;
              c = h[x][r];
            } else if (p[w] && p[w][r]) {
              s = p[w][r].subject;
              c = p[w][r];
            } else if (void 0 == a) {
              e.isDev() &&
                console.log(
                  'cannot find related type of observable and subject or the argument type passed into subscribe should not be undefined',
                );
              return;
            } else if (h[a] && h[a][r]) {
              s = h[a][r].observable;
              c = h[a][r];
            } else {
              s = p[a][r].subject;
              c = p[a][r];
            }
            var d = this.opts.callback || [function () {}, function () {}, function () {}];
            var l = this.opts.pipe || [];
            if (c.unsubscribe[n]) {
              c.unsubscribe[n].unsubscribe();
              delete c.unsubscribe[n];
            }
            c.unsubscribe[n] = (i = (o = s).pipe.apply(o, t(l))).subscribe.apply(i, t(d));
          },
        },
        {
          key: 'launch',
          value: function b(e) {
            var t =
              'function' == typeof e
                ? function (t) {
                    return e(t);
                  }
                : function (e) {
                    return e;
                  };
            var n = this.opts.type || w;
            var i = this.opts.key;
            p[n][i].subject.next(t(this.opts.data));
          },
        },
        {
          key: 'convert2Observable',
          value: function v(e) {
            var t = this.opts.type;
            var i = this.opts.key;
            return E(function (o) {
              return n
                .of({ key: i, type: t })
                .setSubscribeCallback(
                  function (e) {
                    return o.next(e);
                  },
                  function (e) {
                    return o.error(e);
                  },
                  function () {
                    return o.complete();
                  },
                )
                .subscribe(e);
            });
          },
        },
      ]);
      return n;
    })();
    C.of = function (e) {
      return new C(e);
    };
    C.registSubjects = function (e) {
      return e.forEach(C.registSubject);
    };
    C.registSubject = function (e) {
      return C.of(e).addSubject(new v());
    };
    C.registObservables = function (e) {
      return e.forEach(C.registObservable);
    };
    C.registObservable = function (e) {
      var t = e.data,
        n = e.observable;
      return C.of(n).addObservable(b(t));
    };
    C.regist = function (e) {
      Object.values(e)
        .map(function (e) {
          return { key: e };
        })
        .forEach(C.registSubject);
    };
    C.GLOBAL_OBSERVABLE = x;
    C.GLOBAL_SUBJECT = w;
    C.PERSON_INFO = 'PERSON_INFO';
    C.URL_STUB = 'URL_STUB';
    return C;
  },
  '10e97f20e188c77709178ffb0428e5da',
);
