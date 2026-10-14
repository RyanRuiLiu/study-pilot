EDU(
  'd8d93f97f229c867d2a07422bb96efb4',
  function (e, t, n, i, o, a) {
    if ('trident' === e._$KERNEL.engine && e._$KERNEL.release <= '5.0')
      EDU('8593077fdefab6326c3f73b83e48aedd', function () {
        t.__getProxyByMode = (function () {
          var e = { 0: 2, 1: 3 };
          return t.__getProxyByMode._$aop(function (t) {
            var n = t.args,
              i = n[0] || 0;
            n[0] = n[1] ? 2 : e[i] || i;
          });
        })();
      });
    return t;
  },
  'f051aeae7bb889518ead30ef6e491df3',
  '2ea29dd21e2ce086383a2607d322ed75',
);
