EDU(
  'accb3fb8e644fc0d22ad33c978dcd3b3',
  function (e, t, n, i, o, a, r, s, c, d) {
    var l;
    r._$$CustomEvent = t._$klass();
    l = r._$$CustomEvent._$extend(a._$$EventTarget);
    l.__init = function () {
      this.__cache = {};
      this.__super();
    };
    l.__reset = function (e) {
      this.__super(e);
      this.__element = n._$get(e.element) || window;
      this.__doEventInit(e.event);
      this.__doEventAPIEnhance();
      this._$dispatchEvent('oninit');
    };
    l.__destroy = (function () {
      var e = function (e, t, n) {
        if (!o._$isArray(e)) o._$safeDelete(this.__element, t);
        delete n[t];
      };
      return function () {
        this.__super();
        o._$loop(this.__cache, e, this);
        delete this.__element;
      };
    })();
    l.__isDelegate = function (e, t) {
      e = n._$get(e);
      return !(e !== this.__element || (t && !this.__cache['on' + t]));
    };
    l.__doEventInit = function (e) {
      if (!o._$isString(e)) {
        if (o._$isArray(e)) o._$forEach(e, this.__doEventInit, this);
      } else {
        var t = 'on' + e;
        if (!this.__cache[t]) this.__cache[t] = this.__doEventDispatch._$bind(this, e);
        this.__doEventBind(e);
      }
    };
    l.__doEventBind = function (e) {
      var t = 'on' + e,
        n = this.__element[t],
        i = this.__cache[t];
      if (n != i) {
        this.__doEventDelete(e);
        if (n && n != c) this.__doEventAdd(e, n);
        this.__element[t] = i;
      }
    };
    l.__doEventAdd = function (e, t, n) {
      var i = this.__cache[e];
      if (!i) {
        i = [];
        this.__cache[e] = i;
      }
      if (o._$isFunction(t)) !n ? i.push(t) : i.unshift(t);
    };
    l.__doEventDelete = function (e, t) {
      var n = this.__cache[e];
      if (n && n.length)
        if (t)
          o._$reverseEach(n, function (e, n, i) {
            if (t === e) {
              i.splice(n, 1);
              return !0;
            }
          });
        else delete this.__cache[e];
    };
    l.__doEventDispatch = function (e, t) {
      t = t || { noargs: !0 };
      if (t == s) t = {};
      t.type = e;
      this._$dispatchEvent('ondispatch', t);
      if (!t.stopped)
        o._$forEach(this.__cache[e], function (e) {
          if (!1) e(t);
          else
            try {
              e(t);
            } catch (n) {
              console.error(n.message);
              console.error(n.stack);
            }
        });
    };
    l.__doEventAPIEnhance = (function () {
      var t = function (e) {
        var t = e.args,
          n = t[1].toLowerCase();
        if (this.__isDelegate(t[0], n)) {
          e.stopped = !0;
          this.__doEventBind(n);
          this.__doEventAdd(n, t[2], t[3]);
          this._$dispatchEvent('oneventadd', { type: n, listener: t[2] });
        }
      };
      var n = function (e) {
        var t = e.args,
          n = t[1].toLowerCase();
        if (this.__isDelegate(t[0], n)) {
          e.stopped = !0;
          this.__doEventDelete(n, t[2]);
        }
      };
      var a = function (e) {
        var t = e.args,
          n = (t[1] || '').toLowerCase();
        if (this.__isDelegate(t[0])) {
          if (n) {
            this.__doEventDelete(n);
            return;
          }
          o._$loop(
            this.__cache,
            function (e, t) {
              if (o._$isArray(e)) this.__doEventDelete(t);
            },
            this,
          );
        }
      };
      var r = function (e) {
        var t = e.args,
          n = t[1].toLowerCase();
        if (this.__isDelegate(t[0], n)) {
          e.stopped = !0;
          t[0]['on' + n].apply(t[0], t.slice(2));
        }
      };
      return function () {
        if (!this.__enhanced) {
          this.__enhanced = !0;
          i._$addEvent = i._$addEvent._$aop(t._$bind(this));
          i._$delEvent = i._$delEvent._$aop(n._$bind(this));
          i._$clearEvent = i._$clearEvent._$aop(a._$bind(this));
          i._$dispatchEvent = i._$dispatchEvent._$aop(r._$bind(this));
          if (!0) e.copy(e.P('nej.v'), i);
        }
      };
    })();
    if (!0) e.copy(e.P('nej.ut'), r);
    return r;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
