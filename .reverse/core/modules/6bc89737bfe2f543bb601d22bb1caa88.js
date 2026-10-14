EDU(
  '6bc89737bfe2f543bb601d22bb1caa88',
  function (e, t, n, i, o, a, r, s, c, d) {
    r._$request = (function () {
      var e = {},
        a = /\{(.*?)\}/gi,
        r = /\/:([\w]+?)(?=\/|$)/gi,
        l = /^get|delete|head$/i,
        u = /json/i,
        _ = /xml/i;
      var f = function (t) {
        var n = e[t];
        if (n) {
          delete n.s;
          delete n.f;
          delete e[t];
        }
      };
      var h = function (t, n) {
        var i = e[t];
        if (i) {
          var o = i[n],
            a = d.slice.call(arguments, 2);
          try {
            (o || c).apply(null, a);
          } catch (r) {
            if (!1) throw r;
            console.error(r.message);
            console.error(r);
          }
          f(t);
        }
      };
      var p = function (e, t) {
        h(e, 's', t);
      };
      var m = function (e, n) {
        n = n || {};
        if (n.code != i._$CODE_ERRSERV || 204 != n.data) {
          t._$dispatchEvent(window, 'resterror', n);
          if (!n.stopped) h(e, 'f', n);
          else f(e);
        } else p(e, null);
      };
      var g = function (e, t, n) {
        var i = e[t] || e[t.toLowerCase()];
        if (!i) {
          i = n;
          e[t] = i;
        }
        return i;
      };
      var b = function (e, t, i) {
        if (n._$isArray(e)) i[t] = JSON.stringify(e);
      };
      var v = function (e, t, n, i) {
        var o = function (e) {
          var o = t[e];
          if (null != o) i[e] = !0;
          else o = n[e];
          return encodeURIComponent(o || '');
        };
        var s = e.replace(a, function (e, t) {
            return o(t) || e;
          }),
          s = s.replace(r, function (e, t) {
            var n = o(t);
            return !n ? e : '/' + n;
          });
        return s;
      };
      return function (t, i) {
        i = n._$merge({}, i);
        var a = {},
          r = i.param || s,
          d = i.data || {};
        t = v(t, r, d, a);
        n._$loop(r, function (e, t) {
          if (!a[t]) d[t] = e;
        });
        var f = 'text',
          h = i.headers || {},
          E = g(h, 'Accept', 'application/json'),
          x = g(h, 'Content-Type', 'application/json');
        if (u.test(E)) f = 'json';
        else if (_.test(E)) f = 'xml';
        var w = n._$uniqueID();
        e[w] = { s: i.onload || c, f: i.onerror || c };
        i.method = i.method || 'GET';
        if (l.test(i.method.trim())) {
          n._$forIn(d, b);
          i.query = d;
          d = null;
        } else if (u.test(x)) d = JSON.stringify(d);
        i.type = f;
        i.data = d;
        i.headers = h;
        i.onload = p._$bind(null, w);
        i.onerror = m._$bind(null, w);
        return o._$request(t, i);
      };
    })();
    r._$abort = function (e) {
      o._$abort(e);
    };
    a._$$CustomEvent._$allocate({ element: window, event: 'resterror' });
    if (!0) e.P('nej.j')._$requestByREST = r._$request;
    return r;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  '8b5c7ec5f50504fcb779ea6190a77347',
  '8a864b627c302d7d1c56bd928b515d1b',
  'accb3fb8e644fc0d22ad33c978dcd3b3',
);
