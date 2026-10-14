EDU(
  'f31ca1a51b9d12820c0875e5eb65c608',
  function (e, t, n, i, o, a, r) {
    if ('trident' === e._$KERNEL.engine && e._$KERNEL.release <= '5.0')
      EDU('eddbe60812cbf83ce3254c521a81ac51', function () {
        t.__hasAbortEvent = function () {
          return !1;
        };
      });
    if ('trident' === e._$KERNEL.engine && e._$KERNEL.release <= '2.0')
      EDU('f0a148bba28833d76e57bfe4a78f78cd', function () {
        t.__getXMLHttpRequest = (function () {
          var e = [
            'Msxml2.XMLHTTP.6.0',
            'Msxml2.XMLHTTP.3.0',
            'Msxml2.XMLHTTP.4.0',
            'Msxml2.XMLHTTP.5.0',
            'MSXML2.XMLHTTP',
            'Microsoft.XMLHTTP',
          ];
          return function () {
            var t = null;
            n._$forIn(e, function (e) {
              try {
                t = new ActiveXObject(e);
                return !0;
              } catch (n) {}
            });
            return t;
          };
        })();
      });
    return t;
  },
  'f051aeae7bb889518ead30ef6e491df3',
  '311f176d442c0c7039f8cd12e8c96387',
  'fe86216ed59e3103a56c42c850d389f0',
);
