EDU(
  '844ff2e539e8fc059b464a090ac95511',
  function (e) {
    var t = {};
    t.escape = e._$escape;
    t.formatLessonTime = function (e) {
      var t = +e;
      return Math.floor(t / 60) + '’' + (t % 60) + '”';
    };
    return t;
  },
  'fe86216ed59e3103a56c42c850d389f0',
);
