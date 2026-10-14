EDU(
  '60a015078e2231535f2049bf53e17c2a',
  function (e, t, n, i, o, a, r, s) {
    var c;
    o._$$CacheList = t._$klass();
    c = o._$$CacheList._$extend(i._$$CacheAbstract);
    c.__reset = function (e) {
      this.__super(e);
      this.__key = e.key || 'id';
      this.__data = e.data || a;
      this.__auto = !!e.autogc;
      this.__doSwapCache(e.id);
    };
    c.__destroy = function () {
      this.__super();
      if (this.__timer) this.__doGCAction();
    };
    c.__doSwapCache = function (e) {
      var t;
      if (e) {
        t = this.__cache[e];
        if (!t) {
          t = {};
          this.__cache[e] = t;
        }
      }
      t = t || this.__cache;
      t.hash = t.hash || {};
      this.__lspl = t;
    };
    c.__doGCAction = function () {
      this.__timer = window.clearTimeout(this.__timer);
      var e = {};
      n._$loop(
        this.__lspl,
        function (t, i) {
          if ('hash' != i)
            if (n._$isArray(t))
              n._$forEach(
                t,
                function (t) {
                  if (t) e[t[this.__key]] = !0;
                },
                this,
              );
        },
        this,
      );
      n._$loop(this.__getHash(), function (t, n, i) {
        if (!e[n]) delete i[n];
      });
    };
    c.__doGCSchedule = function () {
      if (this.__timer) this.__timer = window.clearTimeout(this.__timer);
      this.__timer = window.setTimeout(this.__doGCAction._$bind(this), 150);
    };
    c.__doSaveItemToCache = function (e, t) {
      if (!n._$isArray(e)) {
        e = this.__doFormatItem(e, t) || e;
        if (!e) return null;
        var i = e[this.__key];
        if (null != i) {
          var o = this.__getHash()[i];
          if (o) e = n._$merge(o, e);
          this.__getHash()[i] = e;
        }
        delete e.__dirty__;
        return e;
      }
      var a = [];
      n._$forEach(
        e,
        function (e) {
          a.push(this.__doSaveItemToCache(e, t));
        },
        this,
      );
      return a;
    };
    c.__doRemoveItemFromList = function (e, t) {
      var i = null,
        o = this.__key;
      if (!n._$isArray(t)) {
        var i = null,
          o = this.__key;
        t = t[o] || t;
        var a = this._$getListInCache(e),
          r = n._$indexOf(a, function (e) {
            return !!e && e[o] == t;
          });
        if (r >= 0) {
          i = a[r];
          a.splice(r, 1);
        }
        return i;
      }
      var i = [];
      n._$reverseEach(
        t,
        function (t) {
          i.unshift(this.__doRemoveItemFromList(e, t));
        },
        this,
      );
      return i;
    };
    c.__doFormatItem = r;
    c.__doUnshiftToList = function (e, t) {
      if (t)
        if (n._$isArray(t))
          n._$reverseEach(
            t,
            function (t) {
              this.__doUnshiftToList(e, t);
            },
            this,
          );
        else {
          var i = this._$getListInCache(e),
            t = this.__doSaveItemToCache(t, e);
          if (t) i.unshift(t);
        }
    };
    c._$setTotal = function (e, t) {
      var n = this._$getListInCache(e);
      n.length = Math.max(n.length, t);
      this._$setLoaded(e);
    };
    c._$getTotal = function (e) {
      return this._$getListInCache(e).length;
    };
    c._$setLoaded = function (e, t) {
      this._$getListInCache(e).loaded = t !== !1;
    };
    c._$isLoaded = function (e) {
      return !!this._$getListInCache(e).loaded;
    };
    c._$setListInCache = function (e, t) {
      this._$clearListInCache(e);
      this.__getList({ key: e, offset: 0, limit: t.length + 1 }, { list: t, total: t.length });
    };
    c._$getListInCache = (function () {
      var e = function (e) {
        return (e || '') + (!e ? '' : '-') + 'list';
      };
      return function (t) {
        var t = e(t),
          n = this.__lspl[t];
        if (!n) {
          n = [];
          this.__lspl[t] = n;
        }
        return n;
      };
    })();
    c.__getHash = function () {
      var e = this.__lspl.hash;
      if (!e) {
        e = {};
        this.__lspl.hash = e;
      }
      return e;
    };
    c._$pullRefresh = (function () {
      var e = function (e) {
        return 'r-' + e.key;
      };
      return function (t) {
        var i = n._$merge({}, t),
          o = e(i),
          a = this._$dispatchEvent._$bind(this);
        if (!this.__doQueueRequest(o, a)) {
          i.rkey = o;
          i.onload = this.__pullRefresh._$bind(this, i);
          this._$dispatchEvent('dopullrefresh', i);
        }
      };
    })();
    c.__pullRefresh = function (e, t) {
      var n = e.key,
        i = parseInt(t.total),
        o = t.list || t.result;
      this.__doUnshiftToList(n, o || t);
      if (!isNaN(i) && o) {
        this._$getListInCache(n).length = i;
        this._$setLoaded(n);
      }
      this.__doCallbackRequest(e.rkey, 'onpullrefresh', e);
    };
    c.__getListReqKey = function (e) {
      return 'r-' + e.key + '-' + e.offset + '-' + e.limit;
    };
    c._$getList = function (e) {
      e = e || a;
      var t = {
          key: '' + e.key || '',
          ext: e.ext || null,
          data: e.data || null,
          offset: parseInt(e.offset) || 0,
          limit: parseInt(e.limit) || 0,
        },
        n = this._$getListInCache(t.key),
        i = this.__hasFragment(n, t.offset, t.limit);
      if (!i) {
        var o = this,
          r = this.__getListReqKey(t),
          s = function (e, n) {
            o._$dispatchEvent(e, t);
          };
        if (!this.__doQueueRequest(r, s)) {
          t.rkey = r;
          t.onload = this.__getList._$bind(this, t);
          this._$dispatchEvent('doloadlist', t);
        }
      } else this._$dispatchEvent('onlistload', t);
    };
    c.__getList = (function () {
      var e = function (e, t, n) {
        if (e) return !0;
        n.splice(t, 1);
      };
      return function (t, i) {
        t = t || a;
        if (i) {
          var o = t.key,
            r = t.offset,
            s = this._$getListInCache(o);
          var c = i || [];
          if (!n._$isArray(c)) {
            c = i.result || i.list || [];
            var d = parseInt(i.total);
            if (!isNaN(d) || d > c.length) this._$setTotal(o, d);
          }
          n._$forEach(
            c,
            function (e, t) {
              s[r + t] = this.__doSaveItemToCache(e, o);
            },
            this,
          );
          if (c.length < t.limit) {
            this._$setLoaded(o);
            n._$reverseEach(s, e);
          }
          this.__doCallbackRequest(t.rkey, 'onlistload', t);
        } else this.__doCallbackRequest(t.rkey, 'onlistload', t);
      };
    })();
    c._$clearListInCache = (function () {
      var e = function (e, t, n) {
        n.splice(t, 1);
      };
      return function (t) {
        if (n._$isString(t)) {
          var i = this._$getListInCache(t);
          n._$reverseEach(i, e);
          this._$setLoaded(t, !1);
          if (this.__auto) this.__doGCSchedule();
        } else
          n._$loop(
            this.__lspl,
            function (e, t) {
              if ('hash' != t && n._$isArray(e)) {
                t = t.substr(0, t.length - 5);
                this._$clearListInCache(t);
              }
            },
            this,
          );
      };
    })();
    c.__doCheckItemValidity = function (e, t) {
      return !e.__dirty__;
    };
    c._$getItemInCache = function (e) {
      return this.__getHash()[e];
    };
    c._$clearItemInCache = function (e) {
      var t = this._$getItemInCache(e);
      if (t) t.__dirty__ = !0;
    };
    c.__getItemReqKey = function (e) {
      return 'r-' + e.key + '-' + e.id;
    };
    c._$getItem = function (e) {
      e = e || a;
      var t = e[this.__key] || e.id,
        n = { id: t, ext: e.ext, data: e.data || {}, key: '' + e.key || '' };
      _item = this._$getItemInCache(t);
      n.data[this.__key] = t;
      if (!_item || !this.__doCheckItemValidity(_item, n.key)) {
        var i = this,
          o = this.__getItemReqKey(n),
          r = function (e, t) {
            i._$dispatchEvent(e, n);
          };
        if (!this.__doQueueRequest(o, r)) {
          n.rkey = o;
          n.onload = this.__getItem._$bind(this, n);
          this._$dispatchEvent('doloaditem', n);
        }
      } else this._$dispatchEvent('onitemload', n);
    };
    c.__getItem = function (e, t) {
      e = e || a;
      this.__doSaveItemToCache(t, e.key);
      this.__doCallbackRequest(e.rkey, 'onitemload', e);
    };
    c._$addItem = function (e) {
      e = n._$merge({}, e);
      e.onload = this.__addItem._$bind(this, e);
      this._$dispatchEvent('doadditem', e);
    };
    c.__addItem = function (e, t) {
      var i = e.key,
        o = 0;
      var a = function (t) {
        var n = this.__doSaveItemToCache(t, i);
        if (n) {
          var a = this._$getListInCache(i);
          if (!e.push) {
            o = -1;
            var r = e.offset || 0;
            a.splice(r, 0, n);
          } else if (a.loaded) {
            o = 1;
            a.push(n);
          } else a.length++;
        }
        return n;
      };
      if (n._$isArray(t)) {
        var r = [];
        n._$forEach(
          t,
          function (e) {
            r.push(a.call(this, e));
          },
          this,
        );
        t = r;
      } else t = a.call(this, t);
      var s = { key: i, flag: o, data: t, action: 'add', ext: e.ext };
      this._$dispatchEvent('onitemadd', s);
      return s;
    };
    c._$deleteItem = function (e) {
      e = n._$merge({}, e);
      e.onload = this.__deleteItem._$bind(this, e);
      this._$dispatchEvent('dodeleteitem', e);
    };
    c.__deleteItem = function (e, t) {
      var n,
        i = e.key;
      if (t) {
        var o = e.id;
        n = this._$getItemInCache(o) || null;
        this.__doRemoveItemFromList(i, o);
      }
      var a = { key: i, data: n, result: t, action: 'delete', ext: e.ext };
      this._$dispatchEvent('onitemdelete', a);
      return a;
    };
    c._$updateItem = function (e) {
      e = n._$merge({}, e);
      e.onload = this.__updateItem._$bind(this, e);
      this._$dispatchEvent('doupdateitem', e);
    };
    c.__updateItem = function (e, t) {
      var n = e.key;
      if (t) t = this.__doSaveItemToCache(t, n);
      var i = { key: n, data: t, result: t, action: 'update', ext: e.ext };
      this._$dispatchEvent('onitemupdate', i);
      return i;
    };
    if (!0) e.P('nej.ut')._$$ListCache = o._$$CacheList;
    return o;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  'fe86216ed59e3103a56c42c850d389f0',
  '74f9cf4eae0cb03f66a18b5e6df66bdb',
);
