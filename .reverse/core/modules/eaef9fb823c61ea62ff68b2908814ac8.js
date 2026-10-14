EDU(
  'eaef9fb823c61ea62ff68b2908814ac8',
  function (e, t, n, i, o, a, r) {
    function s(e, t) {
      r._$loadScript(e, { onload: t });
    }
    return function (o, a, r, c, d) {
      var l;
      if ('mp4' == a.currentMovieItem.fileType) l = new e(o, r, c);
      else if ('hls' == a.currentMovieItem.fileType)
        if (i._$isMobileAll() && (!i._$isWeixin() || !i._$isAndroid())) l = new e(o, r, c);
        else if (!window.Hls) {
          var u =
            '//edu-cms.nosdn.127.net/topics/js/hls.js1.1.2_c902fb111b3c35a23a71584a19fcd54a.js';
          s(u, function () {
            l = new t(o, r, c);
            d && d(l);
          });
          return;
        } else l = new t(o, r, c);
      else if ('flv' == a.currentMovieItem.fileType)
        if (!window.flvjs) {
          s(
            '//edu-cms.nosdn.127.net/topics/js/flv.min_ac66b3439c4eb065c80223543aba7a9d.js',
            function () {
              l = new n(o, r, c);
              d && d(l);
            },
          );
          return;
        } else l = new n(o, r, c);
      d && d(l);
    };
  },
  '4de60b2bb314e3fe0721c2d41f5d9e0d',
  '3a4cf16e516dad8462edbf62e765041c',
  '7bd50d5d0db139a9a957be5729d02f0f',
  'beec6201069596ecb83a09e5fc3eb415',
  '5d5746ddb90ed85fcd19a9bdbdf8c50a',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  '9a830f6a308feb17fe43372af2d6e799',
);
