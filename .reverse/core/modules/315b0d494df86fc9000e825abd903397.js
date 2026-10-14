EDU(
  '315b0d494df86fc9000e825abd903397',
  function (e, t) {
    t.set = function (n) {
      e._$loop(n, function (e, n) {
        if ('string' == typeof e) t[n] = e;
        else t[n] = e.message;
      });
    };
    t.$ = function (e, t) {
      var n = map[e] || '';
      return n;
    };
  },
  'fe86216ed59e3103a56c42c850d389f0',
);
