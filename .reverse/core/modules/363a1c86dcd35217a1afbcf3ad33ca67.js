EDU(
  '363a1c86dcd35217a1afbcf3ad33ca67',
  function (e, t, n, i, o) {
    t.__doFixTitle = (function () {
      var e = /#.*?$/i;
      return function (t) {
        var n = document.title,
          i = n.replace(e, '');
        if (n != i) {
          t = i || t;
          document.title = t;
        }
        return document.title;
      };
    })();
    t.__doFixHashTitle = function (e) {};
    return t;
  },
  'f051aeae7bb889518ead30ef6e491df3',
);
