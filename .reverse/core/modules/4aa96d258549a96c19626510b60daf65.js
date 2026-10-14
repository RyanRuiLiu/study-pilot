EDU(
  '4aa96d258549a96c19626510b60daf65',
  function (e, t, n, i, o, a, r, s) {
    var c;
    o._$$Node = t._$klass();
    c = o._$$Node._$extend(i._$$EventTarget);
    c.__init = function () {
      this.__super();
      this.__children = [];
    };
    c.__reset = function (e) {
      this.__super(e);
      this._$setParent(e.parent);
      this.__name = e.name || '/';
      this.__data = e.data || {};
    };
    c.__destroy = (function () {
      var e = function (e, t, n) {
        n.splice(t, 1);
        e._$recycle();
      };
      return function () {
        this.__super();
        delete this.__data;
        n._$reverseEach(this.__children, e);
        this._$setParent(null);
      };
    })();
    c.__isNode = function (e) {
      return e instanceof this.constructor;
    };
    c.__hasChild = function (e) {
      return n._$indexOf(this.__children, e) >= 0;
    };
    c._$getName = function () {
      return this.__name;
    };
    c._$getData = function () {
      return this.__data;
    };
    c._$getPath = function () {
      var e = this._$getParent(),
        t = this._$getName();
      if (!e) return t;
      var n = e._$getName();
      if ('/' != n && '/' != t) t = '/' + t;
      return e._$getPath() + t;
    };
    c._$getParent = function () {
      return this.__parent;
    };
    c._$getChildren = function () {
      return this.__children;
    };
    c._$getChildByName = function (e) {
      var t = n._$indexOf(this.__children, function (t) {
        return e == t._$getName();
      });
      return this.__children[t] || null;
    };
    c._$setParent = function (e) {
      e = this.__isNode(e) ? e : null;
      if (e != this.__parent) {
        e ? e._$appendChild(this) : this.__parent._$removeChild(this);
        this.__parent = e;
      }
    };
    c._$appendChild = function (e) {
      e = this.__isNode(e) ? e : null;
      if (e && !this.__hasChild(e)) {
        this.__children.push(e);
        e._$setParent(this);
      }
    };
    c._$removeChild = function (e) {
      e = this.__isNode(e) ? e : null;
      var t = n._$indexOf(this.__children, e);
      if (t >= 0) {
        this.__children.splice(t, 1);
        e._$setParent(null);
      }
      return e;
    };
    return o;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'f1c1923e72a7bf464958899fa52f322f',
  'fe86216ed59e3103a56c42c850d389f0',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
