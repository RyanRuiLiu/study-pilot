EDU('45aeb51a857b8c0e0cbd727ee1df0c1a', function () {
  var e = 'http://shared.ydstatic.com/js/yatdk/3.1.0/pcBanner.js';
  var t = { 'data-imei': '862533030034307', 'data-udid': '24C56021-A1CB-4A07-993A-2D2A7F00FDCD' };
  var n = {
    moocIndex: {
      stickyBanner: {
        config: {
          'data-id': '7f57cbe92d70223f3e1062d99719e9ce',
          'data-notify': 'stickyBannerCallback',
        },
      },
      carouselBanner: {
        config: {
          'data-id': 'e772fb3bfb42bd72afcb588393330c73',
          'data-notify': 'carouselBannerCallback',
        },
      },
      webVideoLearning: {
        config: {
          'data-id': 'b9cc7bb3fec066f91e5a4c7de5ff627b',
          'data-notify': 'webVideoLearningCallback',
        },
      },
    },
  };
  n.getScriptTagByScriptConfig = function (e, n) {
    if (!e['data-id'])
      throw new Error('getScriptTagByScriptConfig: script config has not valid data-id');
    var i = document.createElement('script');
    Object.keys(e).forEach(function (t) {
      i.setAttribute(t, e[t]);
    });
    if (n)
      Object.keys(t).forEach(function (e) {
        i.setAttribute(e, t[e]);
      });
    return i;
  };
  var i = function (t) {
    Object.keys(t).forEach(function (t) {
      var i = n[t];
      if ('[object Object]' === Object.prototype.toString.call(i))
        Object.keys(i).forEach(function (t) {
          var n = i[t].config;
          n['async'] = n['async'] || 'async';
          n['charset'] = n['charset'] || 'utf-8';
          n['src'] = n['src'] || e;
        });
    });
  };
  i(n);
  return n;
});
