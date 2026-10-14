EDU(
  'e7b09bf3a31c16631f5119ba11c288f4',
  function () {
    var e = {},
      t = NEJ.P('nej.p'),
      n = !0,
      i = (function () {
        return this;
      })(),
      o = {},
      a = i.navigator.userAgent;
    e._$getUserAgent = function () {
      return a;
    };
    e._$detect = function () {
      function t(e) {
        var t = o.match(e);
        return (t && t.length > 1 && t[1]) || '';
      }
      function i(e) {
        var t = o.match(e);
        return (t && t.length > 1 && t[2]) || '';
      }
      var o = e._$getUserAgent();
      var a = t(/(ipod|iphone|ipad)/i).toLowerCase(),
        r = /like android/i.test(o),
        s = !r && /android/i.test(o),
        c = /CrOS/.test(o),
        d = t(/edge\/(\d+(\.\d+)?)/i),
        l = t(/version\/(\d+(\.\d+)?)/i),
        u = /tablet/i.test(o),
        _ = !u && /[^-]mobi/i.test(o),
        f;
      if (/opera|opr/i.test(o))
        f = { name: 'Opera', opera: n, version: l || t(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i) };
      else if (/yabrowser/i.test(o))
        f = {
          name: 'Yandex Browser',
          yandexbrowser: n,
          version: l || t(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i),
        };
      else if (/windows phone/i.test(o)) {
        f = { name: 'Windows Phone', windowsphone: n };
        if (d) {
          f.msedge = n;
          f.version = d;
        } else {
          f.msie = n;
          f.version = t(/iemobile\/(\d+(\.\d+)?)/i);
        }
      } else if (/msie|trident/i.test(o))
        f = { name: 'Internet Explorer', msie: n, version: t(/(?:msie |rv:)(\d+(\.\d+)?)/i) };
      else if (c)
        f = {
          name: 'Chrome',
          chromeBook: n,
          chrome: n,
          version: t(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i),
        };
      else if (/chrome.+? edge/i.test(o)) f = { name: 'Microsoft Edge', msedge: n, version: d };
      else if (/chrome|crios|crmo/i.test(o))
        f = { name: 'Chrome', chrome: n, version: t(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i) };
      else if (a) {
        f = { name: 'iphone' == a ? 'iPhone' : 'ipad' == a ? 'iPad' : 'iPod' };
        if (l) f.version = l;
      } else if (/sailfish/i.test(o))
        f = { name: 'Sailfish', sailfish: n, version: t(/sailfish\s?browser\/(\d+(\.\d+)?)/i) };
      else if (/seamonkey\//i.test(o))
        f = { name: 'SeaMonkey', seamonkey: n, version: t(/seamonkey\/(\d+(\.\d+)?)/i) };
      else if (/firefox|iceweasel/i.test(o)) {
        f = { name: 'Firefox', firefox: n, version: t(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i) };
        if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(o)) f.firefoxos = n;
      } else if (/silk/i.test(o))
        f = { name: 'Amazon Silk', silk: n, version: t(/silk\/(\d+(\.\d+)?)/i) };
      else if (s) f = { name: 'Android', version: l };
      else if (/phantom/i.test(o))
        f = { name: 'PhantomJS', phantom: n, version: t(/phantomjs\/(\d+(\.\d+)?)/i) };
      else if (/blackberry|\bbb\d+/i.test(o) || /rim\stablet/i.test(o))
        f = {
          name: 'BlackBerry',
          blackberry: n,
          version: l || t(/blackberry[\d]+\/(\d+(\.\d+)?)/i),
        };
      else if (/(web|hpw)os/i.test(o)) {
        f = { name: 'WebOS', webos: n, version: l || t(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i) };
        /touchpad\//i.test(o) && (f.touchpad = n);
      } else if (/bada/i.test(o))
        f = { name: 'Bada', bada: n, version: t(/dolfin\/(\d+(\.\d+)?)/i) };
      else if (/tizen/i.test(o))
        f = { name: 'Tizen', tizen: n, version: t(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || l };
      else if (/safari/i.test(o)) f = { name: 'Safari', safari: n, version: l };
      else f = { name: t(/^(.*)\/(.*) /), version: i(/^(.*)\/(.*) /) };
      if (!f.msedge && /(apple)?webkit/i.test(o)) {
        f.name = f.name || 'Webkit';
        f.webkit = n;
        if (!f.version && l) f.version = l;
      } else if (!f.opera && /gecko\//i.test(o)) {
        f.name = f.name || 'Gecko';
        f.gecko = n;
        f.version = f.version || t(/gecko\/(\d+(\.\d+)?)/i);
      }
      if (!f.msedge && (s || f.silk)) f.android = n;
      else if (a) {
        f[a] = n;
        f.ios = n;
      }
      var h = '';
      if (f.windowsphone) h = t(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
      else if (a) {
        h = t(/os (\d+([_\s]\d+)*) like mac os x/i);
        h = h.replace(/[_\s]/g, '.');
      } else if (s) h = t(/android[ \/-](\d+(\.\d+)*)/i);
      else if (f.webos) h = t(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
      else if (f.blackberry) h = t(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
      else if (f.bada) h = t(/bada\/(\d+(\.\d+)*)/i);
      else if (f.tizen) h = t(/tizen[\/\s](\d+(\.\d+)*)/i);
      if (h) f.osversion = h;
      var p = h.split('.')[0];
      if (u || 'ipad' == a || (s && (3 == p || (4 == p && !_))) || f.silk) f.tablet = n;
      else if (_ || 'iphone' == a || 'ipod' == a || s || f.blackberry || f.webos || f.bada)
        f.mobile = n;
      return f;
    };
    e._$test = function (t) {
      var n = e._$detect();
      for (var i = 0; i < t.length; ++i) {
        var o = t[i];
        if ('string' == typeof o) if (o in n) return !0;
      }
      return !1;
    };
    e._$isIE = function () {
      return 'trident' == t._$KERNEL.engine;
    };
    e._$ltIE10 = function () {
      if (e._$isIE() && parseFloat(t._$KERNEL.release) < 6) return !0;
      else return !1;
    };
    e._$isPageHidden = function () {
      function e(e) {
        var t = !0,
          n = !1,
          i = { focus: t, focusin: t, pageshow: t, blur: n, focusout: n, pagehide: n };
        e = e || window.event;
        if (null == e.toElement && null == e.fromElement && void 0 === e.relatedTarget) {
          if (e.type in i) o.hidden = i[e.type];
        } else;
      }
      var t = '';
      if ('undefined' != typeof document.hidden) t = 'hidden';
      else if ('undefined' != typeof document.mozHidden) t = 'mozHidden';
      else if ('undefined' != typeof document.msHidden) t = 'msHidden';
      else if ('undefined' != typeof document.webkitHidden) t = 'webkitHidden';
      else if (!o.hasbindChange) {
        o.hasbindChange = !0;
        if ('onfocusin' in document) document.onfocusin = document.onfocusout = e;
        else i.onpageshow = i.onpagehide = i.onfocus = i.onblur = e;
      }
      if (t in document) return document[t];
      else return o.hidden || !1;
    };
    return e;
  },
  'a7d1128d22219f1def1727e67cfa7d44',
);
