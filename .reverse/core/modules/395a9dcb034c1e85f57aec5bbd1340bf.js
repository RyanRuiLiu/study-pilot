EDU(
  '395a9dcb034c1e85f57aec5bbd1340bf',
  function (e, t, n, i, o, a, r, s, c, d, l) {
    var u = 'cache-base',
      _ = 2e3;
    var f = e._$klass();
    l = f._$extend(o._$$CacheListAbstract);
    l.__init = function () {
      this._doFlushSetting(u, c);
      if (s.getAuth()) this._auth = s.getAuth();
      this.__super();
    };
    l.__reset = function (e) {
      this.__super(e);
      if (null != e.scope) this._scope = e.scope;
      this._times = {};
    };
    l.__destory = function () {
      delete this._scope;
      var e = this._times;
      if (e) for (key in e) if (e.hasOwnProperty(key)) window.clearTimeout(e[key]);
      this.__super();
    };
    l.__doSendRequest = function (e, n) {
      if (null != this._scope || null != n.scope) {
        var i = t._$merge({}, this._scope, n.scope);
        if (!n.headers) n.headers = {};
        n.headers['eds-scope'] = r._$str2b64(a.stringify({ scope: i }));
      }
      if (null != this._auth) {
        if (!n.headers) n.headers = {};
        n.headers['eds-authorization'] = this._auth;
      }
      this.__super(e, n);
    };
    l.checkImport = function (e, t) {
      this._doRequestWithProgress({ polling: { key: e, data: t, event: 'onimportprogress' } });
    };
    l._import = function (e, t, n, i) {
      this._doRequestWithProgress({
        task: { key: e, data: n, event: 'import' },
        polling: { key: t, data: i || n, event: 'onimportprogress' },
      });
    };
    l.$import = function (e, t, n, i) {
      this._import(e, t, n, i);
    };
    l._download = function (e, n) {
      e += (e.indexOf('?') < 0 ? '?' : '&') + '_t=' + +new Date();
      if (n) e += '&' + t._$object2query(n);
      i._$loadHtml(e);
    };
    l.download = function (e, t) {
      this._download(o.get(e).url, t);
    };
    l._doEmitEvent = function (e, t) {
      var i = typeof e;
      if ('function' === i) e.call(this, t);
      else if ('string' === i) {
        var o = e,
          a = e.indexOf('on') < 0;
        if (a) o = 'on' + e;
        this._$dispatchEvent(o, t);
        if (a && o in this.constructor) n._$dispatchEvent(this.constructor, e, t);
      }
    };
    l._doEmitListChange = function (e) {
      e = e || {};
      if ('onlistchange' in this.constructor) n._$dispatchEvent(this.constructor, 'listchange', e);
    };
    l.updateSort = function (e) {
      e.onload = this._cbUpdateSort._$bind(this, e);
      this._doUpdateSort(e);
    };
    l._doUpdateSort = function (e) {};
    l._cbUpdateSort = function (e, t) {
      var n = e.key;
      if (t) {
        var i = this._$getListInCache(n);
        this._doSortByOrder(i, t.sort || e.data.orderList || e.data);
      }
      var o = { key: n, action: 'refresh', ext: e.ext };
      this._$dispatchEvent('onsortupdate', o);
      this._doEmitListChange(o);
    };
    l._doFormatPager = function (e) {
      var t = 1,
        n = e.data || {};
      if (e.limit && void 0 != e.offset) {
        n.pageSize = e.limit;
        n.pageIndex = e.offset / e.limit + t;
      }
    };
    l._doFormatPagerRet = function (e, t, n) {
      var i = e[t],
        o = e[n] || e.pagination || {};
      return { list: i, total: o.totleCount };
    };
    l.getOptPageOffset = function (e, t) {
      var n = { offset: t };
      var i = this._$getListInCache(e);
      if (!i || !i.length) return n;
      var o = 0,
        a,
        r;
      for (var s = o, c; ; s++) {
        c = t - s;
        a = i[c];
        if (a) {
          r = s;
          break;
        }
        if (c <= 0) break;
        a = i[t + s];
        if (a) {
          r = -s;
          break;
        }
      }
      if (a) return { item: a, offset: r, id: a[this.__key] };
      else return n;
    };
    l._doSortByOrder = (function () {
      var e = 1;
      return function (n, i) {
        if (!i || !n || !n.length) return n;
        var o = {},
          a = t._$isArray(i) ? i : i.split(',');
        t._$forEach(a, function (t, n) {
          o[t] = n + e;
        });
        var r = this.__key;
        n.sort(function (e, t) {
          var n = o[e[r]] || Number.MAX_VALUE,
            i = o[t[r]] || Number.MAX_VALUE;
          return n - i;
        });
        return n;
      };
    })();
    l._doSrotByField = (function () {
      var e = 0,
        t = 1,
        n = -1,
        i = 1;
      return function (o, a, r) {
        if (!a || !o || !o.length) return o;
        o.sort(function (o, s) {
          var c = o[a],
            d = s[a];
          if (c === d) return e;
          var l = o > s ? t : n;
          return (!r ? i : -i) * l;
        });
        return o;
      };
    })();
    l._doRequestWithCacheCheck = function (e) {
      var n = this;
      var i = function (i, o) {
        if (t._$isFunction(e.callback)) e.callback.call(n);
        else n._$dispatchEvent(i, o);
      };
      if (e.cacheKey) {
        var o = this.__getDataInCache(e.cacheKey);
        if (null != o) {
          i(e.eventName, e.eventOpt);
          return;
        }
      }
      var a = function (t) {
        var i = function (i) {
          if (e.cacheKey) n.__setDataInCache(e.cacheKey, i);
          t.call(n);
        };
        var o = function (e) {
          t.call(n, e);
        };
        n.__doSendRequest(e.reqKey, {
          cookie: e.cookie,
          data: e.data,
          param: e.param,
          scope: e.scope,
          onload: i,
          onerror: o,
        });
      };
      var r = e.queKey;
      if (!r)
        a(function () {
          i(e.eventName, e.eventOpt);
        });
      else if (!this.__doQueueRequest(r, i))
        a(function (t) {
          var i = e.eventName,
            o = e.eventOpt;
          if (t) {
            i = 'onerror';
            o = t;
          }
          n.__doCallbackRequest(r, i, o);
        });
    };
    l._doRequestWithProgress = function (e) {
      var n = 0,
        i = 1,
        o = 2,
        a = 1,
        r = this,
        s = e.task || {},
        c = e.polling || {},
        l = d.get(s.key) || {};
      var u = function (e) {
        e = t._$merge(e, s.data);
        if ('function' == typeof l.done) l.done.call(r, e);
        r._doEmitEvent(s.event, e);
      };
      var f = function () {
        var i = function () {
          r._times[c.key] = window.setTimeout(f, c.timeInterval || _);
        };
        r.__doSendRequest(c.key, {
          data: c.data,
          scope: e.scope,
          onload: function (e) {
            if (e.flag !== n && e.retCode !== a) {
              if (e.loaded >= e.total) u({ result: !0 });
              else i();
              var o = t._$merge(e, c.data);
              if ('function' == typeof c.event) c.event.call(r, o);
              else r._$dispatchEvent(c.event, o);
            } else u({ result: !1, message: e.message });
          },
          onerror: function (e) {
            i();
          },
        });
      };
      if (s.key)
        this.__doSendRequest(s.key, {
          data: s.data,
          scope: e.scope,
          onload: function (e) {
            if (e) {
              setTimeout(f, 500);
              r._doEmitEvent(s.load, e);
            } else u({ result: !1 });
          },
          onerror: function (e) {
            e.result = !1;
            u(e);
          },
        });
      else f();
    };
    l._stopRequestWithProgress = function (e) {
      window.clearTimeout(this._times[e]);
    };
    l._doExportWithProgress = function (e) {
      var n = 100,
        i = 0;
      var o = this,
        a = e.task || {},
        r = e.polling || {};
      var s = function (e) {
        o._doEmitEvent(r.event || 'onexportprogress', t._$merge(e, r.data));
      };
      var c = function () {
        var t = function () {
          window.setTimeout(c, _);
        };
        o.__doSendRequest(r.key, {
          data: r.data,
          scope: e.scope,
          onload: function (e) {
            if (e.retCode == i) {
              var o = e.loaded >= e.total;
              if (!o) t();
              s(e);
              if (o) d();
            } else s({ loaded: n, total: n });
          },
          onerror: function (e) {
            t();
          },
        });
      };
      var d = function () {
        o.__doSendRequest(a.key, {
          data: a.data,
          scope: e.scope,
          onload: function (e) {
            if (!e || !e.url) c();
            else {
              s({ loaded: n, total: n });
              o._download(e.url);
            }
          },
          onerror: function (e) {
            s({ loaded: n, total: n });
          },
        });
      };
      d.call(this);
    };
    l.$export = function (e, t, n, i) {
      this._doExportWithProgress({
        task: { key: e, data: t },
        polling: { key: i || 'base-export-progress-polling', data: n || t },
      });
    };
    l._doFlushSetting = (function () {
      var e = {},
        t = !1;
      return function (n, i) {
        var a = n + '-flushed';
        if (!e[a]) {
          e[a] = !0;
          d.config(i);
          d.config(s.get(n));
        }
        if (!t) {
          t = !0;
          o._$on('post', function (e) {
            var t = e.res || {},
              n = d.get('base-setting');
            if (t.code == n.CODE_OK) e.result = t.result;
          });
        }
      };
    })();
    l.__doLoadList = function (e) {
      this.__super(e);
      this._doLoadList(e);
    };
    l.__doLoadItem = function (e) {
      this.__super(e);
      this._doLoadItem(e);
    };
    l.__doAddItem = function (e) {
      this.__super(e);
      this._doAddItem(e);
    };
    l.__addItem = function (e, t) {
      this._doEmitListChange(this.__super(e, t));
    };
    l.__doDeleteItem = function (e) {
      this.__super(e);
      this._doDeleteItem(e);
    };
    l.__deleteItem = function (e, t) {
      this._doEmitListChange(this.__super(e, t));
    };
    l.__doUpdateItem = function (e) {
      this.__super(e);
      this._doUpdateItem(e);
    };
    l.__updateItem = function (e, t) {
      this._doEmitListChange(this.__super(e, t));
    };
    l._doLoadList = function (e) {};
    l._doLoadItem = function (e) {};
    l.saveItemToCache = function (e) {
      return this.__doSaveItemToCache(e);
    };
    l._doAddItem = function (e) {};
    l._doDeleteItem = function (e) {};
    l._doUpdateItem = function (e) {};
    l.getRoot = function (e, n) {
      var i = d.get('base-setting');
      var o = { webroot: i.WEBROOT, orgroot: i.ORGROOT };
      n = t._$merge(o, n);
      return (i[e] || '').replace(/\$\{(.*?)\}/gi, function (e, t) {
        return n[t.toLowerCase()] || e;
      });
    };
    l.getResponse = function (e) {
      var n = { code: d.get('base-setting').CODE_OK, message: 'OK', result: null };
      return t._$merge(n, e);
    };
    l.getQRCodeURLInCache = function (e) {
      return this.__getDataInCache('qrcode-' + e);
    };
    l._getQRCodeURL = function (e, t) {
      this._doRequestWithCacheCheck({
        data: t,
        reqKey: 'base-qrcode-url-get',
        queKey: 'req-qrcode-' + e,
        cacheKey: 'qrcode-' + e,
        eventName: 'onqrurlload',
        eventOpt: { id: e },
      });
    };
    d.on = o._$on;
    d.$do = o._$do;
    d.merge = o._$merge;
    d.config = function (e) {
      t._$forIn(e, function (e, t) {
        if ('string' == typeof e) e = { url: e };
        o._$merge(t, e);
      });
    };
    d.get = function (e) {
      return o._$dump()[e] || {};
    };
    d.Cache = f;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '9a830f6a308feb17fe43372af2d6e799',
  '6c71314e10f19c203d6a25f8f93beb06',
  '4a1eebd4a6f73a95ccf8ecf0a547fa18',
  'c23a9d4e237326dadfa12366ae1b6e48',
  '8f34a99b20d362b3542aebd517390fc1',
  'a7cfe71991bf6093075c3dc5487cbf41',
);
