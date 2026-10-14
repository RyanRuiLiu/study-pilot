EDU(
  '74f9cf4eae0cb03f66a18b5e6df66bdb',
  function (e, t, n, i, o, a, r, s, c) {
    var d,
      l = 'dat-' + +new Date();
    a._$$CacheAbstract = t._$klass();
    d = a._$$CacheAbstract._$extend(i._$$EventTarget);
    d.__init = function () {
      this.__super();
      this.__cache = this.constructor[l];
      if (!this.__cache) {
        this.__cache = {};
        this.__cache[l + '-l'] = {};
        this.constructor[l] = this.__cache;
      }
    };
    d.__destroy = function () {
      this.__doClearReqFromQueue();
      this.__super();
    };
    d.__getDataInCache = function (e) {
      return this.__cache[e];
    };
    d.__setDataInCache = function (e, t) {
      this.__cache[e] = t;
    };
    d.__getDataInCacheWithDefault = function (e, t) {
      var n = this.__getDataInCache(e);
      if (null == n) {
        n = t;
        this.__setDataInCache(e, n);
      }
      return n;
    };
    d.__delDataInCache = function (e) {
      if (null == e)
        n._$loop(
          this.__cache,
          function (e, t) {
            if (t != l + '-l') this.__delDataInCache(t);
          },
          this,
        );
      else delete this.__cache[e];
    };
    d.__delDataInStorage = function (e) {
      return o._$delDataInStorage(e);
    };
    d.__getDataInStorage = function (e) {
      return o._$getDataInStorage(e);
    };
    d.__setDataInStorage = function (e, t) {
      o._$setDataInStorage(e, t);
    };
    d.__getDataLocalWithDefault = function (e, t) {
      var n = this.__getDataLocal(e);
      if (null == n) {
        n = t;
        this.__setDataLocal(e, n);
      }
      return n;
    };
    d.__getDataLocal = function (e) {
      var t = this.__getDataInCache(e);
      if (null != t) return t;
      t = this.__getDataInStorage(e);
      if (null != t) this.__setDataInCache(e, t);
      return t;
    };
    d.__setDataLocal = function (e, t) {
      this.__setDataInStorage(e, t);
      this.__setDataInCache(e, t);
    };
    d.__delDataLocal = function (e) {
      if (null == e)
        n._$loop(
          this.__cache,
          function (e, t) {
            if (t != l + '-l') this.__delDataLocal(t);
          },
          this,
        );
      else {
        delete this.__cache[e];
        o._$delDataInStorage(e);
      }
    };
    d._$clearDataLocal = function () {
      this.__delDataLocal();
    };
    d.__doCallbackRequest = function (e) {
      var t = this.__cache[l + '-l'],
        i = c.slice.call(arguments, 1);
      n._$forEach(t[e], function (e) {
        try {
          e.apply(this, i);
        } catch (t) {
          if (!1) throw t;
          console.error(t.message);
          console.error(t.stack);
        }
      });
      delete t[e];
    };
    d.__doQueueRequest = function (e, t) {
      if (!this.__qtmp) this.__qtmp = [];
      this.__qtmp.push({ key: e, callback: t });
      t = t || s;
      var n = this.__cache[l + '-l'][e];
      if (!n) {
        n = [t];
        this.__cache[l + '-l'][e] = n;
        return !1;
      }
      n.push(t);
      return !0;
    };
    d.__doClearReqFromQueue = function () {
      n._$forEach(
        this.__qtmp,
        function (e) {
          var t = this.__cache[l + '-l'][e.key];
          n._$reverseEach(t, function (t, n, i) {
            if (t === e.callback) i.splice(n);
          });
          if (!t || !t.length) this.__doClearReqQueue(e.key);
        },
        this,
      );
      delete this.__qtmp;
    };
    d.__doClearReqQueue = function (e) {
      delete this.__cache[l + '-l'][e];
    };
    d.__isItemUndefined = function (e) {
      return void 0 === e;
    };
    d.__hasFragment = function (e, t, n) {
      if (!e) return !1;
      t = parseInt(t) || 0;
      n = parseInt(n) || 0;
      if (!n) {
        if (!e.loaded) return !1;
        n = e.length;
      }
      if (e.loaded) n = Math.min(n, e.length - t);
      for (var i = 0; i < n; i++) if (this.__isItemUndefined(e[t + i])) return !1;
      return !0;
    };
    d._$isFragmentFilled = function (e, t, n) {
      return this.__hasFragment(this._$getListInCache(e), t, n);
    };
    if (!0) e.P('nej.ut')._$$Cache = a._$$CacheAbstract;
    return a;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  'fe86216ed59e3103a56c42c850d389f0',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '4ccef5b7cea7a30d6665502843c779ec',
);
