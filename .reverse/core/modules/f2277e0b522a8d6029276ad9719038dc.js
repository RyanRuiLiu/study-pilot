EDU(
  'f2277e0b522a8d6029276ad9719038dc',
  function () {
    var e = {},
      t = (function () {
        return this;
      })();
    e._$checkFlash = function () {
      var e = !1;
      try {
        e = Boolean(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
      } catch (t) {
        e = 'undefined' != typeof navigator.mimeTypes['application/x-shockwave-flash'];
      }
      return e;
    };
    return e;
  },
  'a7d1128d22219f1def1727e67cfa7d44',
);
