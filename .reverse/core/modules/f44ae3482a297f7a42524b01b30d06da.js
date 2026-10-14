EDU(
  'f44ae3482a297f7a42524b01b30d06da',
  function (_m, _p, _o, _f, _r) {
    if ('trident' === _m._$KERNEL.engine && '2.0' == _m._$KERNEL.release)
      EDU('9bf54eab228b8036c068c0f428f5415b', function () {
        JSON.parse = (function () {
          var _isSafeJSON = function (e) {
            return !/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(e.replace(/"(\\.|[^"\\])*"/g, ''));
          };
          return JSON.parse._$aop(function (_event) {
            var _str = _event.args[0] || '';
            if (_str.length >= 5e5) {
              _event.stopped = !0;
              _event.value = eval('(' + _str + ')');
            }
          });
        })();
      });
    return JSON;
  },
  'f051aeae7bb889518ead30ef6e491df3',
);
