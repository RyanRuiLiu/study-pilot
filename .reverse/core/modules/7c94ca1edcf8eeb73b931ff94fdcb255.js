EDU(
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f, h) {
    function p(e) {
      var t = [],
        n = '0123456789abcdef';
      for (var i = 0; i < e; i++) t[i] = n.substr(Math.floor(16 * Math.random()), 1);
      return t.join('');
    }
    var m = 'true' === window.isMobilePhone ? o : i;
    var g = 'en' === window.currentLanguage ? !0 : !1;
    h = {};
    var b = NEJ.P('edu.u');
    var v = NEJ.P('nej.j');
    h.__getRequestOption = function (e) {
      return c._$deepCopy(e);
    };
    h.__getPageCacheOptions = function (e) {
      if (window.cacheOptions) return d._$merge(e, window.cacheOptions);
      else return e;
    };
    h._$request = function (e) {
      var n;
      if (!e.notShowLoading) r.show();
      e.data = c._$deepCleanObj(e.data);
      n = this.__getRequestOption(e);
      n.headers = n.headers || {};
      if (!n.notScriptToken) n.headers['edu-script-token'] = s._$cookie('NTESSTUDYSI') || '';
      if (g) n.headers['Accept-Language'] = 'en';
      if (location.search.indexOf('debug=trace') > -1) {
        var i = p(16);
        n.headers['x-b3-flags'] = 1;
        n.headers['x-b3-sampled'] = 1;
        n.headers['x-b3-spanid'] = i;
        n.headers['x-b3-traceid'] = i;
        n.headers['x-zipkin-extension'] = 1;
      }
      n.sync = e.sync || !1;
      n.type = e.type || 'json';
      n.method = e.method || 'post';
      n.data = this.__getPageCacheOptions(e.data);
      if (e.url.match('/j/') || e.url.indexOf('cps.icourse163.org/p') > -1)
        if ('get' == n.method.toLowerCase()) {
          n.query = e.data;
          n.query = n.query || {};
          n.query['_t'] = new Date().getTime();
          n.data = {};
        } else n.data = e.data;
      else if ((e.url.match('/p/') || e.json) && !(e.url.indexOf('cps.icourse163') > -1)) {
        n.data = JSON.stringify(e.data || '');
        n.headers = e.headers || { 'Content-Type': 'application/json;charset=UTF-8' };
      }
      n.onload = this.__onloadHandler._$bind(this, e.onload || function () {}, e.notShowLoading, e);
      n.onerror = this.__errorHandler._$bind(
        this,
        e.onerror,
        e.notShowLoading,
        e.hideError,
        void 0,
        e,
      );
      n.onbeforerequest = e.onbeforerequest;
      t._$request(l._$getUrlWithCsrfKey(e.url, e.notScriptToken), n);
    };
    h.__onloadHandler = function (e, t, n, i) {
      if (r && 'function' == typeof r.hide) r.hide();
      if (null !== i && void 0 !== i) {
        console.log('needCodeCallback成功后的回调' + JSON.stringify(n));
        if (!n.needCodeCallback) {
          !!i && !!i.code && (i.code = +i.code);
          if ('undefined' == typeof i.code) {
            i.code = -2;
            i.message = g
              ? 'Network request failed, please try again later'
              : '网络请求失败，请稍后再试';
          }
          if (n.url && n.url.indexOf('mam.netease.com') > -1) {
            e && e(i.result);
            return !0;
          }
          if (i.code < 0) {
            this.__errorHandler(n.onerror, n.notShowLoading, n.hideError, i, n);
            return !1;
          } else if (i.code > 0) {
            switch (i.code) {
              case 1:
                b._$$LoginDialog._$showLogin({ from: 'otherauth' });
                break;
              case 2:
                window.open('/accessDenied', '_self');
                break;
              default:
                if (n.onerror) n.onerror(i.message, i.code);
                else a.show(i.message, 'error');
            }
            return !1;
          } else {
            if (i && void 0 !== i.result) i && e && e(i.result);
            else i && e && e(i.data);
            return !0;
          }
        } else e && e(i);
      }
    };
    h.__errorHandler = function (e, t, n, i, o) {
      if (r && 'function' == typeof r.hide) r.hide();
      var s = f.KEY_DIALOG_PROMPT;
      var c = f.KEY_DIALOG_CONFIRM;
      var d = f.KEY_DIALOG_CACHE_ERROR_TIP;
      if (i) {
        var l = i.message;
        var u = i.code;
        var _ = [];
        var h = new Date();
        var p = window.performance.getEntries();
        var g = function (e) {
          return +new Date(h.getTime() + e);
        };
        var b = {};
        var v = o.url;
        if (e) {
          e(l, u);
          return !1;
        }
        if (!n)
          switch (u) {
            case -2:
              if (v && v.indexOf('study.163.com') > -1) e && e(l, u);
              else m.alert(l, s, c);
              break;
            case -3:
              a.show(l, 'warning');
              break;
            case -1:
              break;
            default:
              a.show(d, 'warning');
          }
      }
    };
    return h;
  },
  '74f9cf4eae0cb03f66a18b5e6df66bdb',
  '8a864b627c302d7d1c56bd928b515d1b',
  '9a830f6a308feb17fe43372af2d6e799',
  'd414623f7407e577cd6c05efff08e96f',
  'd02f606099112f5cede2764ed0c329fb',
  'ff399209d4b47c4c8d7e061e5944c2fb',
  '5476798e6efaeff80dde5af9b41f8609',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  '2c94f4a525e970341087318fd0b94823',
  'fe86216ed59e3103a56c42c850d389f0',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '61a3a3a5a602c34a33d876f6138c6ede',
);
