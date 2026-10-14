EDU(
  'fb7ea872222351a1a18d727c3cc70c47',
  function (e, t, n, i, o) {
    var a = !1;
    var r = [];
    t.log = function (t, n) {
      if (e._$isObject(t)) t = JSON.stringify(t);
      switch (n) {
        case 'error':
          t = '[error]' + t;
          a && console && console.error('videoplayer:' + t);
          break;
        default:
          t = '[info]' + t;
          a && console && console.log('videoplayer:' + t);
      }
      r.push(t);
    };
    t.error = function (e) {
      t.log(e, 'error');
    };
    t.getLog = function () {
      return r.join('\n');
    };
    t.init = function (e) {
      if (e.isLocal) a = !0;
    };
    window.showVideoPlayerLog = t.getLog;
    return t;
  },
  'fe86216ed59e3103a56c42c850d389f0',
);
