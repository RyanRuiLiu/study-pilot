EDU(
  '06fd65927611e25c8b5ce3f72c6ce481',
  function (e, t, n) {
    n._$request = (function () {
      var n = function (t, n, i) {
        t += (t.indexOf('?') < 0 ? '?' : '&') + 'callback=' + i;
        if (n) {
          if (e._$isObject(n)) n = e._$object2query(n);
          t += '&' + n;
        }
        return t;
      };
      return function (i, o) {
        console.log('data :>> ', o);
        var a = e._$uniqueID(),
          r = 'cb_' + a,
          i = n(i, o.data, r);
        if (o.onload)
          window[r] = function (t) {
            o.onload(t);
            e._$safeDelete(window, r);
          };
        var s = e._$merge({}, o);
        s.onload = null;
        s.onerror = function (t) {
          if (o.onerror) {
            e._$safeDelete(window, r);
            o.onerror(t);
          }
        };
        t._$loadScript(i, s);
        return a;
      };
    })();
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '9a830f6a308feb17fe43372af2d6e799',
);
