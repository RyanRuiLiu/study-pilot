EDU(
  '3f8f347c9171583dc1295dc796e8a1bf',
  function (e, t, n, i, o, a, r, s, c) {
    var d = {},
      l = {};
    var u = (function () {
      var e = /[\s,;]+/;
      return function (t) {
        var t = (t || '').trim().toLowerCase();
        return !t ? null : t.split(e);
      };
    })();
    var _ = function (e, n, i) {
      var o = 'page' + n;
      return null != e[o] ? e[o] : e['client' + n] + t._$getPageBox()['scroll' + i];
    };
    var f = function (e, t, n) {
      var i = 'scroll' + n;
      ((_node = a._$getElement(e)), (_xret = _(e, t, n)));
      for (; _node && _node != document.body && _node != document.documentElement;) {
        _xret += _node[i] || 0;
        _node = _node.parentNode;
      }
      return _xret;
    };
    var h = function (e, i, o, a) {
      var r = {};
      e = t._$get(e);
      if (!e) return null;
      t._$id(e);
      r.element = e;
      if (!n._$isFunction(o)) return null;
      r.handler = o;
      var i = u(i);
      if (!i) return null;
      r.type = i;
      r.capture = !!a;
      return r;
    };
    a._$addEvent = l._$addEvent = (function () {
      var e = function (e, n, i) {
        var o = t._$id(n.element),
          a = d[o] || {},
          r = a[e] || [];
        r.push({
          type: i.type || e,
          func: i.handler || n.handler,
          sfun: n.handler,
          capt: n.capture,
          link: i.link,
          destroy: i.destroy,
        });
        a[e] = r;
        d[o] = a;
      };
      return function () {
        var i = h.apply(null, arguments);
        if (i)
          n._$forEach(i.type, function (a) {
            var r = o.__checkEvent(i.element, a, i.handler);
            o.__addEvent(i.element, r.type, r.handler, i.capture);
            n._$forIn(r.link, function (e) {
              e[3] = !!e[3];
              o.__addEvent.apply(o, e);
              e[0] = t._$id(e[0]);
            });
            e(a, i, r);
          });
      };
    })();
    a._$delEvent = l._$delEvent = (function () {
      var e = function (e, i) {
        var o = t._$id(i.element),
          a = d[o] || r,
          s = a[e],
          c = n._$indexOf(s, function (e) {
            return e.sfun === i.handler && e.capt === i.capture;
          });
        var l = null;
        if (c >= 0) {
          var u = s.splice(c, 1)[0];
          l = [[i.element, u.type, u.func, i.capture]];
          if (u.link) {
            n._$forEach(u.link, function (e) {
              e[0] = t._$get(e[0]);
            });
            l.push.apply(l, u.link);
          }
          if (u.destroy) u.destroy();
          if (!s.length) delete a[e];
          if (!n._$hasProperty(a)) delete d[o];
        }
        return l;
      };
      return function () {
        var t = h.apply(null, arguments);
        if (t)
          n._$forEach(t.type, function (i) {
            n._$forEach(e(i, t), function (e) {
              o.__delEvent.apply(o, e);
            });
          });
      };
    })();
    a._$clearEvent = l._$clearEvent = (function () {
      var e = function (e, t, i) {
        n._$reverseEach(i, function (n) {
          a._$delEvent(e, t, n.sfun, n.capt);
        });
      };
      return function (i, o) {
        var r = t._$id(i);
        if (r) {
          var s = d[r];
          if (s) {
            o = u(o);
            if (o)
              n._$forEach(o, function (t) {
                e(r, t, s[t]);
              });
            else
              n._$loop(s, function (e, t) {
                a._$clearEvent(i, t);
              });
          }
        }
      };
    })();
    a._$dispatchEvent = l._$dispatchEvent = function (e, i, a) {
      var e = t._$get(e);
      if (e)
        n._$forEach(u(i), function (t) {
          var n = o.__checkEvent(e, t);
          o.__dispatchEvent(e, n.type, a);
        });
    };
    a._$getElement = function (e) {
      if (!e) return null;
      var n = e.target || e.srcElement,
        i = arguments[1];
      return t._$getParent(n, i);
    };
    a._$stop = function (e) {
      a._$stopBubble(e);
      a._$stopDefault(e);
    };
    a._$stopBubble = function (e) {
      if (e) e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0);
    };
    a._$stopDefault = function (e) {
      if (e) e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
    };
    a._$page = function (e) {
      return { x: a._$pageX(e), y: a._$pageY(e) };
    };
    a._$pageX = function (e) {
      return f(e, 'X', 'Left');
    };
    a._$pageY = function (e) {
      return f(e, 'Y', 'Top');
    };
    a._$clientX = function (e) {
      return _(e, 'X', 'Left');
    };
    a._$clientY = function (e) {
      return _(e, 'Y', 'Top');
    };
    i._$merge(l);
    if (!0) e.copy(e.P('nej.v'), a);
    return a;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
  'd37bb207915efdc94c2f2a74d479b6f5',
  '7f310e4283533f8c69179605c5b8cbec',
);
