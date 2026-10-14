EDU(
  'd8c4fef7bea5350977a86242cb988076',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f, h) {
    var p = window;
    var m = function () {
      var e = +new Date();
      if ('undefined' != typeof performance && 'function' == typeof performance.now)
        e += performance.now();
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (t) {
        var n = ((e + 16 * Math.random()) % 16) | 0;
        e = Math.floor(e / 16);
        return ('x' === t ? n : (3 & n) | 8).toString(16);
      });
    };
    var g = e._$klass();
    h = g._$extend(_.Cache);
    h.setUTM = function () {
      this._setUTM();
    };
    h.post2server = function (e, t) {
      return this._post2server(e, t);
    };
    h.__init = function () {};
    h._setUTM = function () {
      var e = i._$query2object(location.search.slice(1));
      var t = document.referrer;
      var n = u.get('cache-base')['base-logger'] || _.get('base-logger');
      this.lsname = n.sessionKey;
      var o = {};
      var a = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
      var r = 'utm_reffer';
      if (t) {
        if (!t.match(n.domainRegex)) {
          i._$forEach(a, function (t) {
            o[t] = e[t] || '';
          });
          o[r] = t;
          localStorage.setItem(this.lsname, d.stringify(o));
        }
      } else localStorage.setItem(this.lsname, '{}');
    };
    h.log2server = function (e) {
      var t = u.get('cache-base')['base-logger'] || _.get('base-logger');
      o._$cookie(t.cookie, { value: m(), path: '/' });
      var n = this;
      var a = {
        get: function (e, i) {
          e.product = t.product;
          e.csrf_cookie = t.csrf_cookie;
          n._get2server(e, i);
        },
        post: function (e, t) {
          n._post2server(e, t);
        },
        directpost: function (e, t) {
          n._directpost2server(e, t);
        },
      };
      i._$forEach(t.targets, function (t) {
        a[t.method.toLowerCase()](t, e);
      });
    };
    h._get2server = function (e, t) {
      var n = e.url;
      n += n.indexOf('?') < 0 ? '?' : '&';
      var a = {
        p: e.product,
        dt: e.format ? e.format(t.bizData) : t.bizData || {},
        csrfKey: o._$cookie(e.csrf_cookie),
      };
      a.dt.action = t.actionId;
      var r = d.stringify(a.dt);
      a.dt = this._str2utf8hex(r);
      n += i._$object2query(a);
      var s = new Image();
      s.src = n;
    };
    h._post2server = function (e, t) {
      console.log('newlogpost');
      var n = {},
        o = {},
        r = {};
      r = d.parse(localStorage.getItem(this.lsname)) || {};
      r.pageUrl = location.href || null;
      r.referUrl = document.referrer || null;
      if (e.url) {
        if (e.format) {
          o = e.format(t);
          t.nodeData = i._$merge(t.nodeData, o.nodeData);
        }
        if (p.webUser) o.userId = p.webUser.id;
        o.actionId = t.actionId;
        o.nodeData = t.nodeData;
        if (null != this._scope || null != n.scope) {
          var u = i._$merge({}, this._scope, n.scope);
          if (!n.headers) n.headers = {};
          n.headers['eds-scope'] = a._$str2b64(d.stringify({ scope: u }));
        }
        if (null != this._auth) {
          if (!n.headers) n.headers = {};
          n.headers['eds-authorization'] = this._auth;
        }
        if (e.product && o) {
          var _ = d.stringify(o);
          var f = (e.product + e.product.length + '0000000000000000').substring(0, 16);
          _ = _.replace(new RegExp(/(\"\")/g), 'null');
          _ = s._$aesEncrypt(_, f);
          o = _;
        }
        n.method = 'POST';
        n.data = { product: e.product || 'study', data: o, meta: r };
        return new c(function (t, i) {
          n.onload = function (e) {
            t(e);
          };
          n.onerror = function (e) {
            t(e);
          };
          l._$request(e.url, n);
        });
      }
    };
    h._directpost2server = function (e, t) {
      if (e.url) {
        if (e.format) t = e.format(t);
        if (t) l._$request(e.url, { method: 'POST', data: t });
      }
    };
    h.parseLog = function (e) {
      var t = '',
        o = [],
        a = {},
        r = {};
      var s = function (e) {
        t = n._$dataset(e, 'logAct');
        if (t) {
          d(e);
          l(e);
        }
      };
      var c = function (e) {
        var t = n._$dataset(e, 'logId');
        if (t) {
          o.unshift(t);
          d(e);
          l(e);
        }
      };
      var d = function (e) {
        var t = n._$dataset(e, 'logData');
        if (t) {
          var o = n._$text2type(t, 'json');
          if (o) a = i._$merge(o, a);
        }
      };
      var l = function (e) {
        var t = n._$dataset(e, 'logNode');
        if (t) {
          var o = n._$text2type(t, 'json');
          if (o) r = i._$merge(o, r);
        }
      };
      e = n._$get(e);
      for (; e;) {
        if (!t) s(e);
        else c(e);
        e = e.parentNode;
      }
      if (t) return { id: o, data: a, action: t, nodeData: r };
    };
    h.formatLog = function (e, t) {
      var n = t.id || [];
      n.push(t.action, e);
      t.data.path = n.join('_');
      var i = '';
      if ('click' == e) i = 'item_click';
      return { bizData: t.data, actionId: i, nodeData: t.nodeData };
    };
    h.delegate = function (e, n) {
      this._setUTM();
      t._$addEvent(
        e,
        n,
        function (e) {
          var i = t._$getElement(e);
          this.log(i, n);
        }._$bind(this),
        !0,
      );
    };
    h.log = function (e, t, i) {
      e = n._$get(e);
      var o = this.parseLog(e);
      if (o) {
        if (i) o.action += '_' + i;
        o = this.formatLog(t || 'click', o);
        if (o) this.log2server(o);
      }
    };
    h._str2utf8hex = function (e) {
      var t = this._writeUTF(e, !0);
      var n = '';
      for (var i = 0; i < t.length; i++) {
        var o = (255 & t[i]).toString(16);
        if (1 === o.length) o = '0' + o;
        n += o;
      }
      return n;
    };
    h._writeUTF = function (e, t) {
      var n = [];
      var i = 0;
      for (var o = 0; o < e.length; o++) {
        var a = e.charCodeAt(o);
        if (0 <= a && a <= 127) {
          i += 1;
          n.push(a);
        } else if (128 <= a && a <= 2047) {
          i += 2;
          n.push(192 | (31 & (a >> 6)));
          n.push(128 | (63 & a));
        } else if ((2048 <= a && a <= 55295) || (57344 <= a && a <= 65535)) {
          i += 3;
          n.push(224 | (15 & (a >> 12)));
          n.push(128 | (63 & (a >> 6)));
          n.push(128 | (63 & a));
        }
      }
      for (o = 0; o < n.length; o++) n[o] &= 255;
      if (t) return n;
      if (i <= 255) return [0, i].concat(n);
      else return [i >> 8, 255 & i].concat(n);
    };
    var b = new g();
    b.Logger = g;
    return b;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  'af8805404cc0bd2b95d3d3c9573484b1',
  'c23a9d4e237326dadfa12366ae1b6e48',
  '0ea984c838c93088638e615cbfbdbc4d',
  'acaf016265ee9e46872cbbb2398ea4b7',
  '4a1eebd4a6f73a95ccf8ecf0a547fa18',
  '6bc89737bfe2f543bb601d22bb1caa88',
  '8f34a99b20d362b3542aebd517390fc1',
  '395a9dcb034c1e85f57aec5bbd1340bf',
);
