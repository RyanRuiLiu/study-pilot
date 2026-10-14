EDU(
  '07b9b4da0bcd7558dcf83fe738e7fc75',
  function (e, t, n, i, o, a, r) {
    var s = function (t, n, i) {
      var o = t,
        i = i || a;
      if ('/' != n)
        e._$forEach(n.split('/'), function (e) {
          var t = i(o, e);
          if (!t) return !0;
          o = t;
        });
      return o;
    };
    i._$getNodeByUMI = (function () {
      var e = function (e, t) {
        var t = t || '/',
          n = e._$getName();
        if ('/' == n && '/' == t) return e;
        else return e._$getChildByName(t);
      };
      return function (t, n) {
        return s(t, n, e);
      };
    })();
    i._$appendNodeByUMI = (function () {
      var e = function (e, n) {
        var i = e._$getName();
        if (!n && '/' == i) return e;
        var o = null;
        if ('/' != i) {
          o = e._$getChildByName('/');
          if (!o) {
            o = t._$$Node._$allocate();
            e._$appendChild(o);
          }
        }
        if (n) {
          o = e._$getChildByName(n);
          if (!o) {
            o = t._$$Node._$allocate({ name: n });
            e._$appendChild(o);
          }
        }
        return o;
      };
      return function (t, n) {
        return s(t, n, e);
      };
    })();
    i._$getCommonRoot = function (t, n, o) {
      if (!n || !o) return t;
      var n = n._$getPath().split('/'),
        o = o._$getPath().split('/'),
        a =
          e._$forIn(n, function (e, t) {
            if (e != o[t]) return !0;
          }) || 1,
        r = n.splice(0, a).join('/') || '/';
      return i._$getNodeByUMI(t, r);
    };
    i._$breadthFirstSearch = function (e, t) {
      var n = [e],
        i = n.shift(),
        t = t || a;
      for (; i;) {
        n.push.apply(n, i._$getChildren());
        t(i);
        i = n.shift();
      }
    };
    i._$isNode = function (e) {
      return e instanceof t._$$Node;
    };
    i._$isModule = function (e) {
      return e instanceof n._$$ModuleAbstract;
    };
    i._$isUMIPrivate = (function () {
      var e = /^\/?\?(?=\/|$)/;
      return function (t) {
        return e.test(t || '');
      };
    })();
    i._$path2umi = (function () {
      var e = /[\?#]/;
      return function (t) {
        var n = (t || '').trim().split(e),
          i = '/' == n[0] && 0 == (n[1] || '').indexOf('/');
        return n[0] + (i ? '?' + n[1] : '');
      };
    })();
    return i;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '4aa96d258549a96c19626510b60daf65',
  'd6c071332c7308ee7aac884791446059',
);
