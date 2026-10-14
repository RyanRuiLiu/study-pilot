EDU(
  'ce4a2f7bb1adaa7a71ed306e37ed2047',
  function (e, t) {
    t._formatOverflowNumber = function (e) {
      if (!isNaN(parseInt(e))) {
        e = parseInt(e);
        return e >= 1e4 ? (e / 1e4).toFixed(1).replace(/\.0$/, '') + '万' : e.toString();
      } else return (e || '').toString();
    };
    t._formatOverflowText = function (t, n) {
      t = t ? t.toString() : '';
      var i = /^[\x00-\x7F]+$/.test(t);
      n = n || 5;
      return e._$length(t) > n ? t.slice(0, i ? n : Math.floor(n / 2)) + '...' : t;
    };
    return t;
  },
  'fe86216ed59e3103a56c42c850d389f0',
);
