EDU(
  '8a864b627c302d7d1c56bd928b515d1b',
  function (t, n, i, o, a, r, s, c, d, l, u) {
    function _(e) {
      var t = [],
        n = '0123456789abcdef';
      for (var i = 0; i < e; i++) t[i] = n.substr(Math.floor(16 * Math.random()), 1);
      return t.join('');
    }
    var f = {},
      h = l;
    c._$abort = function (e) {
      var t = f[e];
      if (t) t.req._$abort();
    };
    c._$filter = function (e) {
      h = e || l;
    };
    c.geneAuthHeaders = function (e) {
      if (!window.md5) i._$md5js();
      var t = function (e, t, n) {
        var i = t || +new Date();
        var o = n || Math.floor(9e3 * Math.random()) + 1e3;
        var a =
          '[Object Object]' === Object.prototype.toString.call(e) ? JSON.stringify(e) : e || '';
        var r = a + o + i + 'fu2s2kxcswgn5hqanx7asmlogyr5wu29';
        var s = '';
        try {
          s = (window.md5(r) || '').toLocaleUpperCase();
        } catch (c) {
          console.error('md5计算错误');
        }
        return s;
      };
      var n = +new Date(),
        o = Math.floor(9e3 * Math.random()) + 1e3,
        a = 'v1';
      var r = e.data;
      var s = t(r, n, o);
      return {
        Timestamp: '' + n,
        'Auth-Signature': s,
        Nonce: '' + o,
        System: a,
        'Content-Type': 'application/json;charset=UTF-8',
      };
    };
    c._$request = (function () {
      var t = (location.protocol + '//' + location.host).toLowerCase();
      var i = function (e) {
        var n = o._$url2origin(e);
        return !!n && n != t;
      };
      var a = function (e) {
        return (e || d)[n._$HEAD_CT] == n._$HEAD_CT_FILE;
      };
      var c = function (e) {
        var t = a(e.headers);
        if (!i(e.url) && !t) return r._$$ProxyXHR._$allocate(e);
        else return s.__getProxyByMode(e.mode, t, e);
      };
      var u = function (e, t) {
        var n = { data: t };
        var i = e.result.headers;
        if (i) n.headers = e.req._$header(i);
        return n;
      };
      var p = function (e) {
        var t = f[e];
        if (t) {
          if (t.req) t.req._$recycle();
          delete f[e];
        }
      };
      var m = function (e, t) {
        var n = f[e];
        if (n) {
          var i = arguments[2];
          if ('onload' == t && n.result) i = u(n, i);
          p(e);
          var o = { type: t, result: i };
          h(o);
          if (!o.stopped) (n[t] || l)(o.result);
        }
      };
      var g = function (e, t) {
        m(e, 'onload', t);
      };
      var b = function (e, t) {
        m(e, 'onerror', t);
      };
      var v = function (e, t) {
        var n = e.indexOf('?') < 0 ? '?' : '&',
          t = t || '';
        if (o._$isObject(t)) t = o._$object2query(t);
        if (t) e += n + t;
        return e;
      };
      return function (t, n) {
        n = n || {};
        var i = o._$uniqueID(),
          a = { result: n.result, onload: n.onload || l, onerror: n.onerror || l };
        f[i] = a;
        n.onload = g._$bind(null, i);
        n.onerror = b._$bind(null, i);
        if (n.query) t = v(t, n.query);
        var r = n.method || '';
        if ((!r || /get/i.test(r)) && n.data) {
          t = v(t, n.data);
          n.data = null;
        }
        if (/\.rpc$/.test(t)) {
          var s = document.cookie.split(';').reduce(function (e, t, n) {
            t = t.trim();
            if (t) {
              var i = t.split('=');
              e[i[0]] = i[1];
            }
            return e;
          }, {});
          t += '?csrfKey=' + s['NTESSTUDYSI'];
        }
        n.url = t;
        try {
          if (n.isNeedAuth) n.headers = Object.assign({}, n.headers, this.geneAuthHeaders(n));
          if (location.search.indexOf('debug=trace') > -1) {
            var d = _(16);
            n.headers['x-b3-flags'] = 1;
            n.headers['x-b3-sampled'] = 1;
            n.headers['x-b3-spanid'] = d;
            n.headers['x-b3-traceid'] = d;
            n.headers['x-zipkin-extension'] = 1;
          }
        } catch (u) {
          console.error(e, '接口签名出错');
        }
        a.req = c(n);
        a.req._$send(n.data);
        return i;
      };
    })();
    c._$upload = function (e, t) {
      e = a._$get(e);
      if (!e) return '';
      var i = o._$fetch(
        {
          mode: 0,
          type: 'json',
          query: null,
          cookie: !1,
          headers: {},
          onload: null,
          onerror: null,
          onuploading: null,
          onbeforerequest: null,
        },
        t,
      );
      i.data = e;
      i.method = 'POST';
      i.timeout = 0;
      i.headers[n._$HEAD_CT] = n._$HEAD_CT_FILE;
      return c._$request(e.action, i);
    };
    if (!0) t.copy(t.P('nej.j'), c);
    return c;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  '8b5c7ec5f50504fcb779ea6190a77347',
  'af8805404cc0bd2b95d3d3c9573484b1',
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'f64e6bc894b18edb4568a9fb34e912da',
  'd8d93f97f229c867d2a07422bb96efb4',
);
