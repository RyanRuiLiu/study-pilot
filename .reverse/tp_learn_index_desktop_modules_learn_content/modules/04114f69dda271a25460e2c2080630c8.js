EDU('04114f69dda271a25460e2c2080630c8', function (e, t, n, i) {
  var o = {};
  o.f = function () {};
  o.isFunction = function (e) {
    return '[object Function]' === o.toString.call(e);
  };
  var a = function (e, t, n) {
    if (e && t) {
      var i;
      for (var o in e)
        if (e.hasOwnProperty(o)) {
          i = t.call(n, e[o], o, e);
          if (i) return o;
        } else;
    }
  };
  var s = function (e, t) {
    for (; t;) {
      var n = t.prototype,
        i = a(n, function (t) {
          return e === t;
        });
      if (null != i) return { name: i, klass: t };
      t = t._$super;
    }
  };
  o.C = function () {
    var e = function () {
      return this._init.apply(this, arguments);
    };
    e.pro = e.prototype;
    e.extend = function (e) {
      if (!o.isFunction(e)) throw new TypeError('SuperClass must be a function');
      var t = function () {};
      t.prototype = e.prototype;
      this.prototype = new t();
      var n = this.prototype;
      n.constructor = this;
      if (void 0 === n._init) n._init = o.f;
      this._$super = e;
      var i = [],
        a = {};
      var r = function (e, t) {
        var n = s(e, t);
        if (n) {
          if (i[i.length - 1] != n.name) i.push(n.name);
          a[n.name] = n.klass._$super;
          return n.name;
        }
      };
      this.prototype.__super = function () {
        var e = i[i.length - 1],
          t = arguments.callee.caller;
        if (!e) e = r(t, this.constructor);
        else {
          var n = a[e].prototype;
          if (!n.hasOwnProperty(t) || t != n[e]) e = r(t, this.constructor);
          else a[e] = a[e]._$super;
        }
        var o = a[e].prototype[e].apply(this, arguments);
        if (e == i[i.length - 1]) {
          i.pop();
          delete a[e];
        }
        return o;
      };
      return n;
    };
    return e;
  };
  return o;
});
