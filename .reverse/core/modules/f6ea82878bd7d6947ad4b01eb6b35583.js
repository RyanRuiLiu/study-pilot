EDU('f6ea82878bd7d6947ad4b01eb6b35583', function (e, t, n, i) {
  var o = {};
  o.f = function () {};
  o.toString = Object.prototype.toString;
  o.trim = function (e) {
    return (e || '').replace(/(^\s*)|(\s*$)/g, '');
  };
  o.isFunction = function (e) {
    return '[object Function]' === o.toString.call(e);
  };
  o.slice = Array.prototype.slice;
  o.hasOwnProperty = Object.prototype.hasOwnProperty;
  o.stringify = function (e) {
    return JSON.stringify(e);
  };
  o.isEmpty = function (e) {
    for (var t in e) if (void 0 !== t && o.hasOwnProperty.call(e, t)) return !1;
    return !0;
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
  var r = function (e, t) {
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
      var s = function (e, t) {
        var n = r(e, t);
        if (n) {
          if (i[i.length - 1] != n.name) i.push(n.name);
          a[n.name] = n.klass._$super;
          return n.name;
        }
      };
      this.prototype.__super = function () {
        var e = i[i.length - 1],
          t = arguments.callee.caller;
        if (!e) e = s(t, this.constructor);
        else {
          var n = a[e].prototype;
          if (!n.hasOwnProperty(t) || t != n[e]) e = s(t, this.constructor);
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
  o.createEl = function (e, t) {
    var n = document.createElement(e || 'div');
    if (t && n.setAttribute)
      for (var i in t) if (o.hasOwnProperty.call(t, i)) n.setAttribute(i, t[i]);
    return n;
  };
  o.T = function (e, t) {
    t = t[0] ? t[0] : t || document;
    return !e ? null : t.getElementsByTagName(e);
  };
  o.getEvent = function (e) {
    if (document.all) return window.event;
    var t = this.getEvent.caller;
    for (; null != t;) {
      var n = t.arguments[0];
      if (n)
        if (
          n.constructor == Event ||
          n.constructor == MouseEvent ||
          ('object' == typeof n && n.preventDefault && n.stopPropagation)
        )
          return n;
      t = t.caller;
    }
    return null;
  };
  o.getMousePos = function (e) {
    if (!e) e = this.getEvent();
    if (e.pageX || e.pageY) return { x: e.pageX, y: e.pageY };
    if (document.documentElement && document.documentElement.scrollTop)
      return {
        x: e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft,
        y: e.clientY + document.documentElement.scrollTop - document.documentElement.clientTop,
      };
    if (document.body)
      return {
        x: e.clientX + document.body.scrollLeft - document.body.clientLeft,
        y: e.clientY + document.body.scrollTop - document.body.clientTop,
      };
    else;
  };
  o.getScrollX = function () {
    if ('number' == typeof window.pageXOffset) return window.pageXOffset;
    var e = document.documentElement;
    if (e && 'number' == typeof e.scrollLeft) return e.scrollLeft;
    var t = document.body;
    if (t && 'number' == typeof t.scrollLeft) return t.scrollLeft;
    else return 0;
  };
  o.getScrollY = function () {
    if ('number' == typeof window.pageYOffset) return window.pageYOffset;
    var e = document.documentElement;
    if (e && 'number' == typeof e.scrollTop) return e.scrollTop;
    var t = document.body;
    if (t && 'number' == typeof t.scrollTop) return t.scrollTop;
    else return 0;
  };
  o.offset = function (e) {
    var t = { top: 0, left: 0 },
      n = e && e.ownerDocument,
      i = n.documentElement;
    if (e.getBoundingClientRect) t = e.getBoundingClientRect();
    return {
      top: t.top + (window.pageYOffset || i.scrollTop) - (i.clientTop || 0),
      left: t.left + (window.pageXOffset || i.scrollLeft) - (i.clientLeft || 0),
    };
  };
  return o;
});
