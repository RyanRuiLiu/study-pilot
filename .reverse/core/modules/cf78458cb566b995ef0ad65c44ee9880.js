EDU(
  'cf78458cb566b995ef0ad65c44ee9880',
  function (e, t, n, i, o, a) {
    if ('trident' === t._$KERNEL.engine && t._$KERNEL.release >= '7.0')
      EDU(
        '97aa59df7514d4c361260a264546c848',
        function (t) {
          e.__doFixHashTitle = function (n) {
            new MutationObserver(function (i) {
              t._$reverseEach(i, function (t) {
                if ('TITLE' == t.target.tagName || 'characterData' == t.type) {
                  n = e.__doFixTitle(n);
                  return !0;
                }
              });
            }).observe(document, { subtree: !0, childList: !0, characterData: !0 });
          };
        },
        'fe86216ed59e3103a56c42c850d389f0',
      );
    if ('trident' === t._$KERNEL.engine && t._$KERNEL.release < '7.0')
      EDU(
        'faf9b98c4ef7e3bf2b890724fd06a3e5',
        function (t) {
          e.__doFixHashTitle = function (n) {
            t._$addEvent(document, 'propertychange', function (t) {
              if ('title' == t.propertyName) n = e.__doFixTitle(n);
            });
          };
        },
        '3f8f347c9171583dc1295dc796e8a1bf',
      );
    return e;
  },
  '363a1c86dcd35217a1afbcf3ad33ca67',
  'f051aeae7bb889518ead30ef6e491df3',
);
