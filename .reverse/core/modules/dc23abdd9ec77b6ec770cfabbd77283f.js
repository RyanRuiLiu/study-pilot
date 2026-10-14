EDU(
  'dc23abdd9ec77b6ec770cfabbd77283f',
  function (e, t, n, i, o, a, r, s) {
    var c;
    o._$$EventTarget = t._$klass();
    c = o._$$EventTarget.prototype;
    o._$$EventTarget._$allocate = function (e) {
      e = e || {};
      var t = !!this.__pool && this.__pool.shift();
      if (!t) {
        t = new this(e);
        this.__inst__ = (this.__inst__ || 0) + 1;
      }
      t.__reset(e);
      return t;
    };
    o._$$EventTarget._$recycle = (function () {
      var e = function (e, t, n) {
        e._$recycle();
        n.splice(t, 1);
      };
      return function (t) {
        if (!t) return null;
        if (!i._$isArray(t)) {
          if (!(t instanceof this)) {
            var n = t.constructor;
            if (n._$recycle) n._$recycle(t);
            return null;
          }
          if (t == this.__instance) delete this.__instance;
          if (t == this.__inctanse) delete this.__inctanse;
          t.__destroy();
          if (!this.__pool) this.__pool = [];
          if (i._$indexOf(this.__pool, t) < 0) this.__pool.push(t);
          return null;
        }
        i._$reverseEach(t, e, this);
      };
    })();
    o._$$EventTarget._$getInstance = function (e) {
      if (!this.__instance) this.__instance = this._$allocate(e);
      return this.__instance;
    };
    o._$$EventTarget._$getInstanceWithReset = function (e, t) {
      if (t && this.__inctanse) {
        this.__inctanse._$recycle();
        delete this.__inctanse;
      }
      if (!this.__inctanse) this.__inctanse = this._$allocate(e);
      else this.__inctanse.__reset(e);
      return this.__inctanse;
    };
    c.__init = function () {
      this.__events = {};
      this.__events_dom = {};
      this.id = i._$uniqueID();
    };
    c.__reset = function (e) {
      this._$batEvent(e);
    };
    c.__destroy = function () {
      this._$clearEvent();
      this.__doClearDomEvent();
    };
    c.__doInitDomEvent = (function () {
      var e = function (e) {
        if (e && !(e.length < 3)) {
          this.__events_dom['de-' + i._$uniqueID()] = e;
          n._$addEvent.apply(n, e);
        }
      };
      return function (t) {
        i._$forEach(t, e, this);
      };
    })();
    c.__doClearDomEvent = (function () {
      var e = function (e, t, i) {
        delete i[t];
        n._$delEvent.apply(n, e);
      };
      return function () {
        i._$loop(this.__events_dom, e);
      };
    })();
    c.__doClearComponent = function (e) {
      e = e || r;
      i._$loop(this, function (t, n, i) {
        if (t && t._$recycle && !e(t)) {
          delete i[n];
          t._$recycle();
        }
      });
    };
    c._$recycle = function () {
      this.constructor._$recycle(this);
    };
    c._$hasEvent = function (e) {
      var e = (e || '').toLowerCase(),
        t = this.__events[e];
      return !!t && t !== r;
    };
    c._$delEvent = function (e, t) {
      var e = (e || '').toLowerCase(),
        n = this.__events[e];
      if (i._$isArray(n)) {
        i._$reverseEach(n, function (e, n, i) {
          if (e == t) i.splice(n, 1);
        });
        if (!n.length) delete this.__events[e];
      } else if (n == t) delete this.__events[e];
    };
    c._$setEvent = function (e, t) {
      if (e && i._$isFunction(t)) this.__events[e.toLowerCase()] = t;
    };
    c._$batEvent = (function () {
      var e = function (e, t) {
        this._$setEvent(t, e);
      };
      return function (t) {
        i._$loop(t, e, this);
      };
    })();
    c._$clearEvent = (function () {
      var e = function (e, t) {
        this._$clearEvent(t);
      };
      return function (t) {
        var t = (t || '').toLowerCase();
        if (t) delete this.__events[t];
        else i._$loop(this.__events, e, this);
      };
    })();
    c._$addEvent = function (e, t) {
      if (e && i._$isFunction(t)) {
        e = e.toLowerCase();
        var n = this.__events[e];
        if (n) {
          if (!i._$isArray(n)) this.__events[e] = [n];
          this.__events[e].push(t);
        } else this.__events[e] = t;
      }
    };
    c._$dispatchEvent = function (e) {
      var e = (e || '').toLowerCase(),
        t = this.__events[e];
      if (t) {
        var n = s.slice.call(arguments, 1);
        if (i._$isArray(t))
          i._$forEach(
            t,
            function (e) {
              if (!1) e.apply(this, n);
              else
                try {
                  e.apply(this, n);
                } catch (t) {
                  console.error(t.message);
                  console.error(t.stack);
                }
            },
            this,
          );
        else t.apply(this, n);
      }
    };
    if (!0) {
      o._$$Event = o._$$EventTarget;
      e.copy(e.P('nej.ut'), o);
    }
    return o;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
);
