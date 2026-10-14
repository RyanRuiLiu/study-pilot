EDU(
  '958518a6821b1f27da2979785195e893',
  function (e, t, n, i, o, a) {
    var r = {};
    n.__url2host = (function () {
      var e = /^([\w]+?:\/\/.*?(?=\/|$))/i;
      return function (t) {
        t = t || '';
        if (e.test(t)) return RegExp.$1;
        else return location.protocol + '//' + location.host;
      };
    })();
    n.__set = function (e, t) {
      r[e] = t;
    };
    n.__get = function (e) {
      return r[e];
    };
    var s = (function () {
      var e = {
        portrait: { name: 'portrait', dft: 'portrait/' },
        'ajax.swf': { name: 'ajax', dft: 'nej_proxy_flash.swf' },
        'chart.swf': { name: 'chart', dft: 'nej_flex_chart.swf' },
        'audio.swf': { name: 'audio', dft: 'nej_player_audio.swf' },
        'video.swf': { name: 'video', dft: 'nej_player_video.swf' },
        'clipboard.swf': { name: 'clipboard', dft: 'nej_clipboard.swf' },
        'upload.image.swf': { name: 'uploadimage', dft: 'nej_upload_image.swf' },
      };
      var o = function (e) {
        var t = {};
        if (!e || !e.length) return t;
        for (var i = 0, o = e.length, a; i < o; i++) {
          a = e[i];
          if (a.indexOf('://') > 0) t[n.__url2host(a)] = a;
        }
        return t;
      };
      return function (a) {
        n.__set('root', a.root || '/res/');
        var r = n.__get('root');
        t._$loop(e, function (e, t, i) {
          n.__set(t, a[e.name] || r + e.dft);
        });
        var s = a.p_csrf;
        if (s === !0) s = { cookie: 'AntiCSRF', param: 'AntiCSRF' };
        s = s || i;
        n.__set('csrf', { param: s.param || '', cookie: s.cookie || '' });
        n.__set('frames', o(a.p_frame));
        n.__set('flashs', o(a.p_flash));
      };
    })();
    s(this.NEJ_CONF || i);
    return n;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
  'fe86216ed59e3103a56c42c850d389f0',
);
