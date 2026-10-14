EDU(
  '6efd3c28bffb30286b4103991bd3d705',
  function (e, t, n, i, o) {
    var a = this,
      r = e._$KERNEL.prefix.pro,
      s = e._$is('desktop') ? 80 : e._$is('ios') ? 50 : 30;
    t.__requestAnimationFrame = (function () {
      var t = e._$is('android') ? null : a.requestAnimationFrame || a[r + 'RequestAnimationFrame'];
      return function () {
        if (!t)
          t = function (e) {
            return window.setTimeout(function () {
              try {
                e(+new Date());
              } catch (t) {}
            }, 1e3 / s);
          };
        return t.apply(this, arguments);
      };
    })();
    t.__cancelAnimationFrame = (function () {
      var t = e._$is('android') ? null : a.cancelAnimationFrame || a[r + 'CancelAnimationFrame'];
      return function () {
        if (!t)
          t = function (e) {
            window.clearTimeout(e);
          };
        return t.apply(this, arguments);
      };
    })();
    return t;
  },
  'f051aeae7bb889518ead30ef6e491df3',
);
