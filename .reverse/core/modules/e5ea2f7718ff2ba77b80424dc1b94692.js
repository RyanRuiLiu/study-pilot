EDU(
  'e5ea2f7718ff2ba77b80424dc1b94692',
  function (e, t, n, i, o, a, r) {
    if ('trident' === n._$KERNEL.engine && n._$KERNEL.release <= '2.0')
      EDU('2481d9ef4f55c416bb4b99458c7bf974', function () {
        e.__removeIFrameKeepHistory = function (e) {
          t._$setStyle(e, 'display', 'none');
          try {
            e.contentWindow.document.body.innerHTML = '&nbsp;';
          } catch (n) {}
        };
      });
    return e;
  },
  '1770e466f6786ec5b582f7891faef8ae',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'f051aeae7bb889518ead30ef6e491df3',
);
