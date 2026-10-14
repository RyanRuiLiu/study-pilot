EDU('70dc37c0ea9dd2b3688f2eac79178cd8', function () {
  function e(e) {
    function n(t) {
      var n = e.match(t);
      return (n && n.length > 1 && n[1]) || '';
    }
    function i(t) {
      var n = e.match(t);
      return (n && n.length > 1 && n[2]) || '';
    }
    var o = n(/(ipod|iphone|ipad)/i).toLowerCase(),
      a = /like android/i.test(e),
      r = !a && /android/i.test(e),
      s = /CrOS/.test(e),
      c = n(/edge\/(\d+(\.\d+)?)/i),
      d = n(/version\/(\d+(\.\d+)?)/i),
      l = /tablet/i.test(e),
      u = !l && /[^-]mobi/i.test(e),
      _;
    if (/opera|opr/i.test(e))
      _ = { name: 'Opera', opera: t, version: d || n(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i) };
    else if (/yabrowser/i.test(e))
      _ = {
        name: 'Yandex Browser',
        yandexbrowser: t,
        version: d || n(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i),
      };
    else if (/windows phone/i.test(e)) {
      _ = { name: 'Windows Phone', windowsphone: t };
      if (c) {
        _.msedge = t;
        _.version = c;
      } else {
        _.msie = t;
        _.version = n(/iemobile\/(\d+(\.\d+)?)/i);
      }
    } else if (/msie|trident/i.test(e))
      _ = { name: 'Internet Explorer', msie: t, version: n(/(?:msie |rv:)(\d+(\.\d+)?)/i) };
    else if (s)
      _ = {
        name: 'Chrome',
        chromeBook: t,
        chrome: t,
        version: n(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i),
      };
    else if (/chrome.+? edge/i.test(e)) _ = { name: 'Microsoft Edge', msedge: t, version: c };
    else if (/chrome|crios|crmo/i.test(e))
      _ = { name: 'Chrome', chrome: t, version: n(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i) };
    else if (o) {
      _ = { name: 'iphone' == o ? 'iPhone' : 'ipad' == o ? 'iPad' : 'iPod' };
      if (d) _.version = d;
    } else if (/sailfish/i.test(e))
      _ = { name: 'Sailfish', sailfish: t, version: n(/sailfish\s?browser\/(\d+(\.\d+)?)/i) };
    else if (/seamonkey\//i.test(e))
      _ = { name: 'SeaMonkey', seamonkey: t, version: n(/seamonkey\/(\d+(\.\d+)?)/i) };
    else if (/firefox|iceweasel/i.test(e)) {
      _ = { name: 'Firefox', firefox: t, version: n(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i) };
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(e)) _.firefoxos = t;
    } else if (/silk/i.test(e))
      _ = { name: 'Amazon Silk', silk: t, version: n(/silk\/(\d+(\.\d+)?)/i) };
    else if (r) _ = { name: 'Android', version: d };
    else if (/phantom/i.test(e))
      _ = { name: 'PhantomJS', phantom: t, version: n(/phantomjs\/(\d+(\.\d+)?)/i) };
    else if (/blackberry|\bbb\d+/i.test(e) || /rim\stablet/i.test(e))
      _ = { name: 'BlackBerry', blackberry: t, version: d || n(/blackberry[\d]+\/(\d+(\.\d+)?)/i) };
    else if (/(web|hpw)os/i.test(e)) {
      _ = { name: 'WebOS', webos: t, version: d || n(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i) };
      /touchpad\//i.test(e) && (_.touchpad = t);
    } else if (/bada/i.test(e)) _ = { name: 'Bada', bada: t, version: n(/dolfin\/(\d+(\.\d+)?)/i) };
    else if (/tizen/i.test(e))
      _ = { name: 'Tizen', tizen: t, version: n(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || d };
    else if (/safari/i.test(e)) _ = { name: 'Safari', safari: t, version: d };
    else _ = { name: n(/^(.*)\/(.*) /), version: i(/^(.*)\/(.*) /) };
    if (!_.msedge && /(apple)?webkit/i.test(e)) {
      _.name = _.name || 'Webkit';
      _.webkit = t;
      if (!_.version && d) _.version = d;
    } else if (!_.opera && /gecko\//i.test(e)) {
      _.name = _.name || 'Gecko';
      _.gecko = t;
      _.version = _.version || n(/gecko\/(\d+(\.\d+)?)/i);
    }
    if (!_.msedge && (r || _.silk)) _.android = t;
    else if (o) {
      _[o] = t;
      _.ios = t;
    }
    var f = '';
    if (_.windowsphone) f = n(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    else if (o) {
      f = n(/os (\d+([_\s]\d+)*) like mac os x/i);
      f = f.replace(/[_\s]/g, '.');
    } else if (r) f = n(/android[ \/-](\d+(\.\d+)*)/i);
    else if (_.webos) f = n(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    else if (_.blackberry) f = n(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    else if (_.bada) f = n(/bada\/(\d+(\.\d+)*)/i);
    else if (_.tizen) f = n(/tizen[\/\s](\d+(\.\d+)*)/i);
    if (f) _.osversion = f;
    var h = f.split('.')[0];
    if (l || 'ipad' == o || (r && (3 == h || (4 == h && !u))) || _.silk) _.tablet = t;
    else if (u || 'iphone' == o || 'ipod' == o || r || _.blackberry || _.webos || _.bada)
      _.mobile = t;
    if (
      _.msedge ||
      (_.msie && _.version >= 10) ||
      (_.yandexbrowser && _.version >= 15) ||
      (_.chrome && _.version >= 20) ||
      (_.firefox && _.version >= 20) ||
      (_.safari && _.version >= 6) ||
      (_.opera && _.version >= 10) ||
      (_.ios && _.osversion && _.osversion.split('.')[0] >= 6) ||
      (_.blackberry && _.version >= 10.1)
    )
      _.a = t;
    else if (
      (_.msie && _.version < 10) ||
      (_.chrome && _.version < 20) ||
      (_.firefox && _.version < 20) ||
      (_.safari && _.version < 6) ||
      (_.opera && _.version < 10) ||
      (_.ios && _.osversion && _.osversion.split('.')[0] < 6)
    )
      _.c = t;
    else _.x = t;
    return _;
  }
  var t = !0;
  var n = e('undefined' != typeof navigator ? navigator.userAgent : '');
  n.test = function (e) {
    for (var t = 0; t < e.length; ++t) {
      var i = e[t];
      if ('string' == typeof i) if (i in n) return !0;
    }
    return !1;
  };
  n._detect = e;
  return n;
});
