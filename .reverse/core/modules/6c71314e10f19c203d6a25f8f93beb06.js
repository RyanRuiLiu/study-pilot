EDU(
  '6c71314e10f19c203d6a25f8f93beb06',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _) {
    var f = {},
      h = n._$uniqueID();
    var p = function (e, t) {
      t = t || {};
      n._$forEach(
        f[e + '-' + h],
        function (e) {
          e.call(this, t);
          if (t.stopped) return !0;
        },
        this,
      );
    };
    c._$$CacheListAbstract = t._$klass();
    _ = c._$$CacheListAbstract._$extend(s._$$CacheList);
    _.__doSendRequest = function (e, t) {
      var i = f[e];
      if (i) {
        var s = function (o) {
          var a = { key: e, cnf: i, req: t, error: o || {} };
          p.call(this, 'error', a);
          if (!a.stopped) {
            var r = t.onerror || i.onerror || 'onerror';
            if (n._$isFunction(r)) r.call(this, a);
            else if (n._$isString(r)) this._$dispatchEvent(r, a);
          }
        };
        var c = function (o) {
          var a = { req: t, res: o, cnf: i, key: e };
          if (n._$isFunction(i.post)) i.post.call(this, a);
          p.call(this, 'post', a);
          if (!a.error) {
            if (n._$isFunction(i.format)) i.format.call(this, a);
            p.call(this, 'format', a);
            var r = t.onload || i.onload;
            if (null != a.result) o = a.result;
            if (n._$isFunction(r)) r.call(this, o);
            else if (n._$isString(r)) this._$dispatchEvent(r, o);
            if (n._$isFunction(i.finaly)) i.finaly.call(this, a);
          } else s.call(this, a.error);
        };
        var d = { url: i.url || t.url, req: t, cnf: i, key: e };
        p.call(this, 'filter', d);
        if (n._$isFunction(i.filter)) {
          i.filter.call(this, d);
          if (d.result) {
            c.call(this, d.result);
            return;
          }
        }
        var l = n._$merge({}, t, {
          type: i.type || 'json',
          method: i.method || 'POST',
          onload: c._$bind(this),
          onerror: s._$bind(this),
        });
        var u = o;
        if (i.rest) u = a;
        if (i.jsonp) u = r;
        u._$request(d.url, l);
      } else console.error('not found request config for ' + e);
    };
    _.__reset = function (e) {
      this.__super(e);
      this._$batEvent({
        doloadlist: this.__doLoadList._$bind(this),
        doloaditem: this.__doLoadItem._$bind(this),
        doadditem: this.__doAddItem._$bind(this),
        dodeleteitem: this.__doDeleteItem._$bind(this),
        doupdateitem: this.__doUpdateItem._$bind(this),
        dopullrefresh: this.__doPullRefresh._$bind(this),
      });
    };
    _.__doLoadList = l;
    _.__doPullRefresh = l;
    _.__doLoadItem = l;
    _.__doAddItem = l;
    _.__doDeleteItem = l;
    _.__doUpdateItem = l;
    c._$on = (function () {
      var e = function (e, t) {
        if (n._$isFunction(t)) {
          var i = e + '-' + h,
            o = f[i] || [];
          o.push(t);
          f[i] = o;
        }
      };
      return function (t) {
        if (!n._$isString(t))
          n._$loop(t, function (t, n) {
            e(n, t);
          });
        else e.apply(null, arguments);
      };
    })();
    c._$do = function (e, t) {
      if (n._$isFunction(t)) {
        var i = e._$allocate(),
          o = t.call(null, i);
        i._$recycle();
        return o;
      }
    };
    c._$config = function (e) {
      n._$forIn(e, function (e, t) {
        if ('string' == typeof e) e = { url: e };
        f[t] = e;
      });
    };
    c._$merge = function (e, t) {
      var i = f[e];
      if (!i) f[e] = t;
      else f[e] = n._$merge(i, t);
    };
    c._$dump = function () {
      return f;
    };
    if (!0) e.P('nej.ut')._$$AbstractListCache = c._$$CacheListAbstract;
    return c;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '8a864b627c302d7d1c56bd928b515d1b',
  '6bc89737bfe2f543bb601d22bb1caa88',
  '06fd65927611e25c8b5ce3f72c6ce481',
  '60a015078e2231535f2049bf53e17c2a',
);
