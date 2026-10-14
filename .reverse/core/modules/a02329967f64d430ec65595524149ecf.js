EDU(
  'a02329967f64d430ec65595524149ecf',
  function (e) {
    function t(e) {
      return e
        .replace(n, window.location.protocol + '//')
        .replace(i, '=http://')
        .replace(o, '$1' + window.location.protocol + '//$3$4');
    }
    var n = /http(s)?:\/\//g;
    var i = /=(http(s)?:)?\/\//g;
    var o = /(<\s*img\s*src\s*=\s*\\?"\s*)(https?:\/\/)(.*?)(\s*"\s*\/?>)/g;
    var a = function (n, i) {
      i = i || t;
      if ('object' == typeof n)
        e(
          n,
          function (e, t) {
            if ('string' == typeof e) return i(e, t);
          },
          function (e) {
            return !(e instanceof HTMLElement) && e !== window.location;
          },
        );
      else if ('string' == typeof n) {
        var o = i(n);
        if (null != o) n = o;
      }
      return n;
    };
    return a;
  },
  '9f56006da628084a8cd030182e8c278d',
);
