EDU(
  '238c7c1492c17e4d4bc463420d450c00',
  function (e, t, n, i, o, a) {
    n._$getFrameProxy = function (e) {
      var i = t.__url2host(e);
      return (
        n._$get('frames')[i] ||
        i + '//mc.stu.126.net/res/nej_proxy_frame.html?2ff8599afec2411c2a4d188f07c517bf'
      );
    };
    n._$getFlashProxy = function (e) {
      return n._$get('flashs')[t.__url2host(e)];
    };
    n._$get = function (e) {
      return t.__get(e);
    };
    if (!0) e.copy(e.P('nej.c'), n);
    return n;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  '5dc94803fafcfd5cf78c2b274d63647c',
);
