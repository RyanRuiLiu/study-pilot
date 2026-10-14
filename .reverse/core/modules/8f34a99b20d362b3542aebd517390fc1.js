EDU(
  '8f34a99b20d362b3542aebd517390fc1',
  function (e, t) {
    var n = {},
      i = {},
      o = {},
      a = {},
      r = {};
    t.batch = function (t) {
      var n = function (e, t) {
        this.set(t, e);
      };
      e._$loop(t, n, this);
    };
    t.$default = function (n) {
      var i = function (n, i) {
        var a = e._$merge(i, t.get(n));
        o[n] = a;
      };
      if ('string' == typeof n) {
        var a = 1;
        i(n, arguments[a]);
      } else
        e._$loop(n, function (e, t) {
          i(t, e);
        });
    };
    t.set = function (t, n) {
      var i = this.get(t);
      e._$merge(i, n);
      o[t] = i;
    };
    t.get = function (e) {
      return o[e] || {};
    };
    t.setPermission = function (t, n) {
      e._$forIn(n, function (t) {
        r = e._$merge(r, t);
      });
      e._$forEach(t, function (t) {
        e._$forIn(n[t], function (t, n) {
          a[n] = a[n] || t;
          a[n] = e._$merge(a[n], t);
        });
      });
    };
    t.isShow = function (e) {
      var t = (o[e.key] || {})[e.switcher] !== !1;
      if (r[e.key]) t = t && (a[e.key] || {})[e.switcher] === !0;
      return t;
    };
    t.isShow2 = function (e, n) {
      if (!n) return t.isShow(e);
      var i = (o[e.key] || {})[e.switcher] !== !1 && !!r[e.key];
      if (r[e.key]) i = i && (a[e.key] || {})[e.switcher] === !0;
      return i;
    };
    t.setScope = function (e) {
      n._default = e;
    };
    t.getScope = function () {
      return n._default;
    };
    t.setAuth = function (e) {
      i._default = e;
    };
    t.getAuth = function () {
      return i._default;
    };
    t.setLoginUser = function (e) {
      t.set('global-login-user', e);
    };
    t.getLoginUser = function () {
      return t.get('global-login-user');
    };
  },
  'fe86216ed59e3103a56c42c850d389f0',
);
