EDU(
  '31921308bcb58962f9350daa19eae1dc',
  function (e, t) {
    var n = window;
    t._$formatProtocol = function (t) {
      var i = t;
      if (!n.rotocol) n.protocol = 'http';
      if (t && e._$isString(t)) {
        i = i
          .replace('http://', n.protocol + '://')
          .replace('https://', n.protocol + '://')
          .replace('=//', '=http://')
          .replace('=https://', '=http://');
        if (!i.match('https?://.*') && i.match(/[\\\\]?\/\/.*/)) i = n.protocol + ':' + i;
      }
      return i;
    };
    t._$addParamToUrl = function (e, t, n) {
      var i = e.indexOf('?') === -1 ? '?' : '&';
      return e + i + t + '=' + n;
    };
    return t;
  },
  'fe86216ed59e3103a56c42c850d389f0',
);
