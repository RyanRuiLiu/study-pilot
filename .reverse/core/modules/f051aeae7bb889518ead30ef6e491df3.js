EDU(
  'f051aeae7bb889518ead30ef6e491df3',
  function (e, t, n, i, o) {
    var a = this.navigator.platform,
      r = this.navigator.userAgent;
    var s = { mac: a, win: a, linux: a, ipad: r, ipod: r, iphone: a, android: r };
    t._$IS = s;
    for (var c in s) s[c] = new RegExp(c, 'i').test(s[c]);
    s.ios = s.ipad || s.iphone || s.ipod;
    s.tablet = s.ipad;
    s.desktop = s.mac || s.win || (s.linux && !s.android);
    t._$is = function (e) {
      return !!s[e];
    };
    var d = {
      engine: 'unknow',
      release: 'unknow',
      browser: 'unknow',
      version: 'unknow',
      prefix: { css: '', pro: '', clz: '' },
    };
    t._$KERNEL = d;
    if (/msie\s+(.*?);/i.test(r) || /trident\/.+rv:([\d\.]+)/i.test(r)) {
      d.engine = 'trident';
      d.browser = 'ie';
      d.version = RegExp.$1;
      d.prefix = { css: 'ms', pro: 'ms', clz: 'MS', evt: 'MS' };
      var l = { 6: '2.0', 7: '3.0', 8: '4.0', 9: '5.0', 10: '6.0', 11: '7.0' };
      d.release = l[document.documentMode] || l[parseInt(d.version)];
    } else if (/webkit\/?([\d.]+?)(?=\s|$)/i.test(r)) {
      d.engine = 'webkit';
      d.release = RegExp.$1 || '';
      d.prefix = { css: 'webkit', pro: 'webkit', clz: 'WebKit' };
    } else if (/rv\:(.*?)\)\s+gecko\//i.test(r)) {
      d.engine = 'gecko';
      d.release = RegExp.$1 || '';
      d.browser = 'firefox';
      d.prefix = { css: 'Moz', pro: 'moz', clz: 'Moz' };
      if (/firefox\/(.*?)(?=\s|$)/i.test(r)) d.version = RegExp.$1 || '';
    } else if (/presto\/(.*?)\s/i.test(r)) {
      d.engine = 'presto';
      d.release = RegExp.$1 || '';
      d.browser = 'opera';
      d.prefix = { css: 'O', pro: 'o', clz: 'O' };
      if (/version\/(.*?)(?=\s|$)/i.test(r)) d.version = RegExp.$1 || '';
    }
    if ('unknow' == d.browser) {
      var l = ['chrome', 'maxthon', 'safari'];
      for (var u = 0, _ = l.length, f; u < _; u++) {
        if ('safari' == l[u]) f = 'version';
        else if ('chrome' == l[u]) f = '[chrome|CriOS]';
        else f = l[u];
        if (new RegExp(f + '/(.*?)(?=\\s|$)', 'i').test(r)) {
          d.browser = l[u];
          d.version = RegExp.$1.trim();
          break;
        }
      }
    }
    t._$SUPPORT = {};
    t._$support = function (e) {
      return !!t._$SUPPORT[e];
    };
    if (!0) e.copy(e.P('nej.p'), t);
    return t;
  },
  'bfe5ed62679ffcea351a355c70be92ca',
);
