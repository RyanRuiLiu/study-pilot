EDU(
  'c8255e0675e41fe756bb2fc3ca2ab9dc',
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
  'd8d435c3ccfb4fe05b0699a528b3d3e2',
);
