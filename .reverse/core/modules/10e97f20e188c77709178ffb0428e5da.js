EDU('10e97f20e188c77709178ffb0428e5da', function () {
  function e(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  }
  function t(e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      i.enumerable = i.enumerable || !1;
      i.configurable = !0;
      if ('value' in i) i.writable = !0;
      Object.defineProperty(e, i.key, i);
    }
  }
  function n(e, n, i) {
    if (n) t(e.prototype, n);
    if (i) t(e, i);
    return e;
  }
  var i = 'MOOC_DEV';
  var o = window,
    a = o.rxjs,
    r = a.timer,
    s = a.Observable.create,
    c = a.operators,
    d = c.tap,
    l = c.takeUntil;
  var u = { MOBILE: 'mobile', TABLET: 'tablet', DESKTOP: 'desktop', UNKNOWN: 'unknown' };
  var _ = {
    IOS: 'ios',
    IPHONE: 'iphone',
    IPAD: 'ipad',
    IPOD: 'ipod',
    ANDROID: 'android',
    BLACKBERRY: 'blackberry',
    WINDOWS: 'windows',
    FXOS: 'fxos',
    MEEGO: 'meego',
    TELEVISION: 'television',
    UNKNOWN: 'unknown',
  };
  var f = { LANDSCAPE: 'landscape', PORTRAIT: 'portrait', UNKNOW: 'unknown' };
  var h = function b() {
    !(function (e, t) {
      function n() {
        var t = o.getBoundingClientRect().width;
        if (t / s > u) t = u * s;
        var n = t / 10;
        o.style.fontSize = n + 'px';
        l.rem = e.rem = n;
      }
      var i = e.document;
      var o = i.documentElement;
      var a = i.querySelector('meta[name="viewport"]');
      var r = i.querySelector('meta[name="flexible"]');
      var s = 0;
      var c = 0;
      var d;
      var l = t.flexible || (t.flexible = {});
      var u = 1024;
      if (a) {
        console.warn('将根据已有的meta标签来设置缩放比例');
        var _ = a.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
        if (_) {
          c = parseFloat(_[1]);
          s = parseInt(1 / c);
        }
      } else if (r) {
        var f = r.getAttribute('content');
        if (f) {
          var h = f.match(/initial\-dpr=([\d\.]+)/);
          var p = f.match(/maximum\-dpr=([\d\.]+)/);
          if (h) {
            s = parseFloat(h[1]);
            c = parseFloat((1 / s).toFixed(2));
          }
          if (p) {
            s = parseFloat(p[1]);
            c = parseFloat((1 / s).toFixed(2));
          }
        }
      }
      if (!s && !c) {
        var m = e.navigator.appVersion.match(/android/gi);
        var g = e.navigator.appVersion.match(/iphone/gi);
        var b = e.devicePixelRatio;
        if (g)
          if (b >= 3 && (!s || s >= 3)) s = 3;
          else if (b >= 2 && (!s || s >= 2)) s = 2;
          else s = 1;
        else s = 1;
        c = 1 / s;
      }
      o.setAttribute('data-dpr', s);
      if (!a) {
        a = i.createElement('meta');
        a.setAttribute('name', 'viewport');
        a.setAttribute(
          'content',
          'initial-scale=' +
            c +
            ', maximum-scale=' +
            c +
            ', minimum-scale=' +
            c +
            ', user-scalable=no',
        );
        if (o.firstElementChild) o.firstElementChild.appendChild(a);
        else {
          var v = i.createElement('div');
          v.appendChild(a);
          i.write(v.innerHTML);
        }
      }
      e.addEventListener(
        'resize',
        function () {
          clearTimeout(d);
          d = setTimeout(n, 300);
        },
        !1,
      );
      e.addEventListener(
        'pageshow',
        function (e) {
          if (e.persisted) {
            clearTimeout(d);
            d = setTimeout(n, 300);
          }
        },
        !1,
      );
      if ('complete' === i.readyState) i.body.style.fontSize = 12 * s + 'px';
      else
        i.addEventListener(
          'DOMContentLoaded',
          function (e) {
            i.body.style.fontSize = 12 * s + 'px';
          },
          !1,
        );
      n();
      l.dpr = e.dpr = s;
      l.refreshRem = n;
      l.rem2px = function (e) {
        var t = parseFloat(e) * this.rem;
        if ('string' == typeof e && e.match(/rem$/)) t += 'px';
        return t;
      };
      l.px2rem = function (e) {
        var t = parseFloat(e) / this.rem;
        if ('string' == typeof e && e.match(/px$/)) t += 'rem';
        return t;
      };
    })(window, window['lib'] || (window['lib'] = {}));
  };
  var p = function v(e) {
    var t = e.shift();
    if ('unknown' === t) return t;
    if (window.device[t]()) return t;
    else return v(e);
  };
  var m = (function () {
    function t() {
      e(this, t);
    }
    n(t, [
      {
        key: 'check',
        value: function o() {
          var e = this;
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function () {};
          if (!this.type)
            r(0, 1e3)
              .pipe(
                l(
                  s(function (e) {
                    if (window.device) e.next(window.device);
                  }).pipe(
                    d(function (n) {
                      e.type = p(Object.values(u));
                      e.os = p(Object.values(_));
                      e.orientation = p(Object.values(f));
                      t(n);
                    }),
                  ),
                ),
              )
              .subscribe();
        },
      },
      {
        key: 'getFromLocalStorage',
        value: function a(e) {
          return localStorage.getItem(e);
        },
      },
      {
        key: 'isDev',
        value: function c() {
          return 'true' === g.getFromLocalStorage(i);
        },
      },
      {
        key: 'getDeviceInfo',
        value: function m() {
          return {
            type: this.type || device.type,
            os: this.os || device.os,
            orientation: this.orientation || device.orientation,
          };
        },
      },
      {
        key: 'setDeviceType',
        value: function b(e) {
          this.type = e;
          this.type === u.MOBILE && h();
          this.type === u.TABLET && h();
        },
      },
      {
        key: 'setDeviceOs',
        value: function v(e) {
          this.os = e;
        },
      },
      {
        key: 'setDeviceOrientation',
        value: function E(e) {
          this.orientation = e;
        },
      },
      {
        key: 'setDevice',
        value: function x(e) {
          var t = e.type,
            n = e.os,
            i = e.orientation;
          this.type = t;
          this.os = n;
          this.orientation = i;
        },
      },
      {
        key: 'getStaticByDeviceType',
        value: function w(e) {
          var t = this.getDeviceInfo(),
            n = t.type;
          return e[n] || e['desktop'] || { template: '', css: '' };
        },
      },
      {
        key: 'getHost',
        value: function C() {
          return 'https://www.icourse163.org';
        },
      },
    ]);
    return t;
  })();
  var g = new m();
  g.check(function () {
    g.type === u.MOBILE && h();
    g.type === u.TABLET && h();
  });
  g.DEVICE_TYPE = u;
  g.DEVICE_OS = _;
  g.DEVICE_ORIENTATION = f;
  return g;
});
