EDU(
  '08f327ae93b28fab771fe2260af697ec',
  function (e, t, n, i, o, a) {
    function r(e) {
      return l(e) || d(e) || c(e) || s();
    }
    function s() {
      throw new TypeError(
        'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      );
    }
    function c(e, t) {
      if (e) {
        if ('string' == typeof e) return u(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        if ('Object' === n && e.constructor) n = e.constructor.name;
        if ('Map' === n || 'Set' === n) return Array.from(e);
        if ('Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return u(e, t);
        else return;
      }
    }
    function d(e) {
      if (('undefined' != typeof Symbol && null != e[Symbol.iterator]) || null != e['@@iterator'])
        return Array.from(e);
    }
    function l(e) {
      if (Array.isArray(e)) return u(e);
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
    function p(e) {
      if (e) {
        if (!t._$cookie('NTESSTUDYSI'));
        var n = e.split('#')[0];
        if (/\?/g.test(n)) n += '&csrfKey=' + t._$cookie('NTESSTUDYSI');
        else n += '?csrfKey=' + t._$cookie('NTESSTUDYSI');
        if (e.split('#')[1]) n += e.split('#')[1];
        return n;
      }
    }
    var m = window,
      g = m.rxjs,
      b = g.of,
      v = g.timer,
      E = g.combineLatest,
      x = g.Subject,
      w = g.Observable.create,
      C = g.operators,
      y = C.map,
      $ = C.filter,
      I = C.pluck,
      T = C.tap,
      S = C.takeWhile,
      A = C.switchMap,
      N = C.mergeMap;
    var O = function k() {};
    var L = 2e3;
    var D = {
      urlTransfer: function U(e, t) {
        switch (t) {
          case void 0:
          default:
            return '//www.icourse163.org'.concat(e);
        }
      },
      requestParams: function P(e) {
        var n = e.url,
          i = e.method,
          o = e.data,
          r = e.headers;
        var s = { headers: {} };
        if (n.match('/j/') || n.match('/mm-tiku/'))
          if ('get' == i.toLowerCase()) {
            s.query = o || {};
            s.query['_t'] = new Date().getTime();
            s.data = {};
          } else s.data = o;
        else if (n.match('/p/')) {
          s.data = JSON.stringify(o || '');
          s.headers['Content-Type'] = 'application/json';
        }
        if ('post' == i.toLowerCase()) {
          if (o) {
            var c = [];
            for (var d in o) c.push(d + '=' + o[d]);
            s.data = c.join('&');
          }
          s.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        }
        if (!e.nocsrf) s.headers['edu-script-token'] = t._$cookie('NTESSTUDYSI');
        if (e.scope) s.headers['eds-scope'] = a._$str2b64(JSON.stringify({ scope: e.scope }));
        return s;
      },
      errorCallback: function M(e, t, n, i) {
        if (n);
        switch (e) {
          case -3:
            break;
          case -2:
            break;
          case -1:
            break;
          case 1:
            break;
          case 2:
            window.open('/accessDenied', '_self');
            break;
          default:
            i(e, t);
        }
      },
      completeCallback: function B() {},
    };
    var R = (function () {
      function t(e) {
        _(this, t);
        this.opts = e || {};
      }
      h(t, [
        {
          key: 'setHeader',
          value: function a(e) {
            return t.of(Object.assign({}, this.opts, { headers: e }));
          },
        },
        {
          key: 'setUrl',
          value: function s(e) {
            return t.of(Object.assign({}, this.opts, { url: e }));
          },
        },
        {
          key: 'setSync',
          value: function c(e) {
            return t.of(Object.assign({}, this.opts, { sync: e }));
          },
        },
        {
          key: 'setType',
          value: function d(e) {
            return t.of(Object.assign({}, this.opts, { type: e }));
          },
        },
        {
          key: 'setMethod',
          value: function l(e) {
            return t.of(Object.assign({}, this.opts, { method: e }));
          },
        },
        {
          key: 'setCookie',
          value: function u(e) {
            return t.of(Object.assign({}, this.opts, { cookie: e }));
          },
        },
        {
          key: 'setMode',
          value: function f(e) {
            return t.of(Object.assign({}, this.opts, { mode: e }));
          },
        },
        {
          key: 'setBeforeRequest',
          value: function m(e) {
            return t.of(Object.assign({}, this.opts, { onbeforerequest: e }));
          },
        },
        {
          key: 'setError',
          value: function g(e) {
            return t.of(Object.assign({}, this.opts, { onerror: e }));
          },
        },
        {
          key: 'setShowLoading',
          value: function v(e) {
            return t.of(Object.assign({}, this.opts, { showLoading: e }));
          },
        },
        {
          key: 'setShowLoadingFunc',
          value: function E(e) {
            return t.of(Object.assign({}, this.opts, { showLoadingFunc: e }));
          },
        },
        {
          key: 'setHideLoadingFunc',
          value: function x(e) {
            return t.of(Object.assign({}, this.opts, { hideLoadingFunc: e }));
          },
        },
        {
          key: 'setPipe',
          value: function C() {
            for (var e = arguments.length, n = new Array(e), i = 0; i < e; i++) n[i] = arguments[i];
            return t.of(Object.assign({}, this.opts, { pipe: n }));
          },
        },
        {
          key: 'setPolling',
          value: function T(e) {
            return t.of(Object.assign({}, this.opts, { polling: e }));
          },
        },
        {
          key: 'setPollingInterval',
          value: function S(e) {
            return t.of(Object.assign({}, this.opts, { interval: e }));
          },
        },
        {
          key: 'launch',
          value: function A() {
            var t = this,
              a;
            var s = this;
            var c = {};
            c.type = this.opts.type || 'json';
            c.sync = this.opts.sync || !1;
            c.cookie = this.opts.cookie || !0;
            c.method = this.opts.method || 'post';
            c.mode = this.opts.mode || 0;
            this.opts.polling || (this.opts.polling = !1);
            this.opts.inteval || (this.opts.inteval = L);
            this.opts.showLoading || (this.opts.showLoading = !0);
            this.opts.showLoadingFunc || (this.opts.showLoadingFunc = O);
            this.opts.hideLoadingFunc || (this.opts.hideLoadingFunc = O);
            this.opts.onbeforerequest || (this.opts.onbeforerequest = O);
            b(this.opts)
              .pipe(
                I('data'),
                $(function (e) {
                  return void 0 != e;
                }),
                N(function (e) {
                  return i
                    .of({ key: n.key })
                    .convert2Observable('base_ajax')
                    .pipe(
                      y(function (t) {
                        return Object.assign({}, e, t);
                      }),
                    );
                }),
              )
              .subscribe(function (e) {
                return (c.data = e);
              });
            c = Object.assign({}, c, D.requestParams(this.opts));
            var d = this.opts.pipe || [I('result')];
            c.onbeforerequest = function () {
              if (t.opts.showLoading);
              t.opts.onbeforerequest();
            };
            var l = p(D.urlTransfer(this.opts.url, this.opts.urlTransferName));
            return (a = w(function (t) {
              e._$request(
                l,
                Object.assign({}, c, {
                  onload: function n(e) {
                    o.isDev() &&
                      console.log(
                        '\n=================='
                          .concat(new Date(), '==================\najax original data: ')
                          .concat(JSON.stringify(e, null, 2)),
                      );
                    if (s.showLoading);
                    if (null !== e && 'undefined' != typeof e) {
                      !!e && !!e.code && (e.code = +e.code);
                      if ('undefined' == typeof e.code) {
                        e.code = -2;
                        e.message = '网络请求失败，请稍后再试';
                      }
                      if (0 === e.code) t.next(e);
                      else {
                        e.result = e.message;
                        t.next(e);
                      }
                    } else t.next(void 0);
                  },
                }),
              );
            })).pipe.apply(a, r(d));
          },
        },
      ]);
      return t;
    })();
    R.of = function (e) {
      return new R(e);
    };
    return R;
  },
  '8a864b627c302d7d1c56bd928b515d1b',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  'e1290f4839c53e63bc4fc2f89198e390',
  '7b82975a3c650c9c725794242d058df0',
  '10e97f20e188c77709178ffb0428e5da',
  'c23a9d4e237326dadfa12366ae1b6e48',
);
