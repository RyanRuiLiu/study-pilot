EDU(
  'e165f785e63c4ac5e3c5e01d85b415f7',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f) {
    var h = window,
      p = NEJ.O,
      m = NEJ.P('nej.p'),
      g = NEJ.P('nej.e'),
      b = NEJ.P('nej.u'),
      v = NEJ.P('edu.u'),
      E = NEJ.P('nej.j');
    v._$filterText = i._$filterText;
    v._$removeNRNBSP = i._$removeNRNBSP;
    v._$hiddenNode = o._$hiddenNode;
    v._$isNodeShown = o._$isNodeShown;
    v._$showNode = o._$showNode;
    v._$toggleNodeDisplay = o._$toggleNodeDisplay;
    v._$parseUrlParams = a._$parseUrlParams;
    v._$arrContains = r._$arrContains;
    v._$isIE = s._$isIE;
    v._$isMobile = c._$isMobile;
    v._$toggleClassName = o._$toggleClassName;
    v._$trackEvent = d._$trackEvent;
    v._$trackPageView = d._$trackPageView;
    v._$convertToJSONHex = l._$convertToJSONHex;
    v._$deepCopy = l._$deepCopy;
    v._$throttle = u._$throttle;
    v._$debounce = _.debounce;
    v._$hiddenNode = function (e) {
      if (e) e.style.display = 'none';
    };
    v._$isNodeShown = function (e) {
      if (e) return 'none' != e.style.display;
    };
    v._$showNode = function (e) {
      if (e) e.style.display = '';
    };
    v._$toggleNodeDisplay = function (e, t) {
      if (t) v._$showNode(e);
      else v._$hiddenNode(e);
    };
    v._$parseUrlParams = function (e) {
      var t = {};
      var n = e.trim();
      if (n) {
        n = decodeURIComponent(n.slice(1));
        var i = n.split('&');
        for (var o = i.length; o;) {
          var a = i[--o].split('=');
          t[a[0]] = a[1];
        }
      }
      return t;
    };
    v._$addUrlParamStr = function (e, t, n) {
      var t = t || h.location.href;
      var i = '';
      var o = '';
      var a = '';
      var r = e.substring(0, e.indexOf('='));
      var s = e.substring(e.indexOf('=') + 1);
      var c = t.indexOf('#');
      if (c >= 0) {
        o = t.substring(c);
        t = t.substring(0, c);
        if (n) o += (o.indexOf('?') > 0 ? '&' : '?') + new Date().getMilliseconds();
      }
      var d = t.indexOf('?');
      if (d >= 0) {
        a = t.substring(d);
        i = t.substring(0, d);
      } else i = t;
      var l = v._$parseUrlParams(a);
      var u = [];
      var _ = !0;
      for (var f in l) {
        if (f == r) {
          l[f] = s;
          _ = !1;
        }
        u.push(f + '=' + l[f]);
      }
      if (_) u.push(e);
      t = i + '?' + u.join('&') + o;
      return t;
    };
    v._$isRightUMI = function (e, t) {
      if (!e || !t) return !1;
      var n = h.decodeURIComponent(e);
      var i = n.indexOf('?');
      i = i >= 0 ? i : n.length;
      n = n.substring(n.indexOf('#') + 1, i);
      if ('[object Array]' == Object.prototype.toString.call(t)) {
        for (var o = 0; o < t.length; o++) if (n == t[o]) return !0;
        return !1;
      } else return n == t;
    };
    v._$arrContains = function (e, t) {
      if (e) for (var n = 0; n < e.length; n++) if (e[n] == t) return !0;
      return !1;
    };
    v._$trim = function (e) {
      e = e || '';
      if ('function' == typeof e.trim) return e.trim();
      else return e.replace(/(^\s*)|(\s*$)/g, '');
    };
    v._$stripTxt = function (e) {
      return !e ? '' : e.replace(/[\n\r]/g, '');
    };
    v._$clearStyle = function (e) {
      if (e) {
        e.getAttribute('style');
        e.removeAttribute('style');
      }
    };
    v._$isIE = function () {
      return 'trident' == m._$KERNEL.engine;
    };
    v._$isIE8 = function () {
      var e = window.navigator.userAgent;
      var t = new RegExp('MSIE 8.0', 'i').test(e);
      return t;
    };
    v._$isMobile = function () {
      var e = window.navigator.userAgent;
      var t = new RegExp('Windows Phone', 'i').test(e);
      return m._$IS['ios'] || m._$IS['android'] || m._$IS['tablet'] || t;
    };
    v._$browserSupportedOrGo = function () {
      var e = !v._$isIE() || '2.0' != m._$KERNEL.release;
      if (!e) location.replace(h.urlPrefix.notSupportedPrefix);
      return e;
    };
    v._$toggleClassName = function (e, t, n) {
      if (e) g._$addClassName(t, n);
      else g._$delClassName(t, n);
    };
    v._$dealWithIeHash = function () {
      try {
        if (v._$isIE() && h.docTitle) document.title = h.docTitle;
      } catch (e) {}
    };
    if (v._$isIE() && !v.changeHashTimer)
      v.changeHashTimer = h.setInterval(v._$dealWithIeHash, 100);
    v._$trackPageView = function (e, t) {
      if (!t) t = location.pathname + location.search;
      t += e ? location.hash : '';
      if (h[h.gaqStr]) h[h.gaqStr].push([h.gaTrackPageview, t]);
    };
    v._$trackEvent = function (e, t, n) {
      if (e && t) {
        var i = [h.gaTrackEvent, e, t];
        if (n) i.push(n);
        if (h[h.gaqStr]) h[h.gaqStr].push(i);
      }
    };
    v._$convertToJSONHex = function (e) {
      return '###' + b._$str2hex(JSON.stringify(e || {}));
    };
    v._$scalePicDynamic = function (e, t, i, o) {
      var a = o || '1x95';
      var r = '//imgsize.ph.126.net/?enlarge=true&imgurl=';
      if (e) {
        var s = e.substring(e.lastIndexOf('.'));
        if ('.gif' == s) return e;
        if (e.indexOf('.nosdn.127.net') > -1) {
          var c = e.indexOf('?') > -1 ? '&' : '?';
          r = e + c + 'thumbnail=' + t + 'x' + i + '&quality=100';
        } else if (e.indexOf('.ph.126.net') > -1)
          r =
            '//img-ph-mirror.nosdn.127.net/' +
            e.split('.ph.126.net/')[1] +
            '?imageView&thumbnail=' +
            t +
            'x' +
            i +
            '&quality=100';
        else r += e + '_' + t + 'x' + i + 'x' + a + s;
      }
      return n(r);
    };
    v._$deepCopy = function (e) {
      if (null == e) return null;
      if ('object' != typeof e) return e;
      var t = {};
      if (e.constructor == Array) t = [];
      for (var n in e) t[n] = arguments.callee(e[n]);
      return t;
    };
    v._$convertListToMaps = function (e) {
      var t = {};
      b._$forEach(e, function (e, n) {
        t[e.id] = e;
      });
      return t;
    };
    v._$isEmpty = function (e) {
      for (var t in e) return !1;
      return !0;
    };
    v._$highLight = function (e) {
      return e.replace(/{##([^{#}]+)##}/g, function () {
        return '<span class="f-fcorange">' + arguments[1] + '</span>';
      });
    };
    v._$escapeRegText = (function () {
      var e = { r: /\+/g, '+': '\\+' };
      return function (t) {
        t = b._$encode(e, t);
        return t;
      };
    })();
    v._$composeUrl = function (e, t) {
      e = e || '';
      return e + ('object' == typeof t ? '?' + b._$object2query(t) : '').replace(/\?$/, '');
    };
    v._$goBack = function (e) {
      var t = 1;
      if ('webkit' == m._$KERNEL.engine) t = 2;
      if (history.length > t) history.back();
      else h.dispatcher._$redirect(e);
    };
    v._$formatMoney = function (e) {
      var e = (e || 0).toString(),
        t = '';
      for (; e.length > 3;) {
        t = ',' + e.slice(-3) + t;
        e = e.slice(0, e.length - 3);
      }
      if (e) t = e + t;
      return t;
    };
    v._$throttle = function (e, t, n, i) {
      var o = +new Date(),
        a = 0,
        r = 0,
        s = null,
        c,
        d,
        l,
        u = function () {
          r = o;
          e.apply(d, l);
        };
      return function () {
        o = +new Date();
        d = this;
        l = arguments;
        c = o - (i ? a : r) - t;
        clearTimeout(s);
        if (i) {
          if (n) s = setTimeout(u, t);
          else if (c >= 0) u();
        } else if (c >= 0) u();
        else if (n) s = setTimeout(u, -c);
        a = o;
      };
    };
    v._$html5Support = function () {
      try {
        var e = document.createElement('video');
        var t = !!e.canPlayType && '' != e.canPlayType('video/mp4');
      } catch (n) {
        t = !1;
      }
      return t;
    };
    v._$debounce = function (e, t, n) {
      if (!this.__debounce) this.__debounce = v._$throttle(e, t, n, !0);
      return this.__debounce;
    };
    v._$scrollTo = function (e, t, n, i) {
      if (!(n <= 0)) {
        var o = t - e.scrollTop;
        var a = (o / n) * 10;
        setTimeout(function () {
          e.scrollTop = e.scrollTop + a;
          if (e.scrollTop != t) v._$scrollTo(e, t, n - 10, i);
          else i();
        }, 10);
      }
    };
    v.openUrl = function (e, t) {
      if (!/firefox/i.test(window.navigator.userAgent)) {
        t = t || '';
        var n = document.createElement('a');
        n.href = e;
        if (t) n.target = t;
        if (n.click) n.click();
        else n.dispatchEvent(new MouseEvent('click'));
        n = null;
      } else if ('_blank' === t) window.open(e);
      else window.location.href = e;
    };
    v._$getUrlWithCsrfKey = function (e) {
      if (e) {
        if (!E._$cookie('NTESSTUDYSI'));
        var t = e.split('#')[0];
        if (/\?/g.test(t)) t += '&csrfKey=' + E._$cookie('NTESSTUDYSI');
        else t += '?csrfKey=' + E._$cookie('NTESSTUDYSI');
        if (e.split('#')[1]) t += e.split('#')[1];
        return t;
      }
    };
    v._$strToHexCharCode = function (e) {
      if ('' === e) return '';
      var t = [];
      t.push('0x');
      for (var n = 0; n < e.length; n++) t.push(e.charCodeAt(n).toString(16));
      return t.join('');
    };
    v.clampString = v._$clampString = function (e, t) {
      var n = 0,
        o = 0;
      for (var a = 0, r = e.length; a < r; a++) {
        if (n >= t) {
          o = a + 1;
          break;
        }
        n += i._$getStringLength(e[a]);
      }
      return e.substring(0, o);
    };
    v._$roundNumber = function x(e, t) {
      if (('' + e).indexOf('e') === -1) return +(Math.round(e + 'e+' + t) + 'e-' + t);
      else {
        var n = ('' + e).split('e');
        var i = '';
        if (+n[1] + t > 0) i = '+';
        return +(Math.round(+n[0] + 'e' + i + (+n[1] + t)) + 'e-' + t);
      }
    };
    v._$toZhNum = function (e) {
      var t = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
      return t[e];
    };
    v._$log2Study = function (t, n, i) {
      var o, a;
      if (i) {
        o = t + '_' + n;
        a = _.extend({ action: o }, i);
        e._$getInstance()._$dispatchEvent('request', {
          url: '//log.study.163.com/__utm.gif',
          method: 'get',
          data: { dt: f._$str2hex(JSON.stringify(a)), p: 'mooc' },
          notShowLoading: !0,
          hideError: !0,
        });
      }
    };
    v._$encodeUrls = function (e) {
      t(e, function (e) {
        return /\&/.test(e) ? encodeURIComponent(e) : e;
      });
      return e;
    };
    v._$decodeUrls = function (e) {
      t(e, function (e) {
        return /\%/.test(e) ? decodeURIComponent(e) : e;
      });
      return e;
    };
    v.generateQrCodeImageUrlFromUrl = (function () {
      var e = document.createElement('div');
      return function (t, n, i) {
        if (n) {
          t = t || window.location.href;
          i = i || 100;
          e.innerHTML = '';
          var o = new QRCode(e, {
            text: t,
            width: i,
            height: i,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H,
          });
          var a = o._el && o._el.children && o._el.children[1];
          var r = setInterval(function () {
            if (!a.src);
            else {
              n(a.src);
              e.innerHTML = '';
              clearInterval(r);
              r = null;
            }
          });
        }
      };
    })();
    return v;
  },
  '10509fa5784c02e2a74daddfa2683479',
  '9f56006da628084a8cd030182e8c278d',
  'a02329967f64d430ec65595524149ecf',
  '7af1d8adfbbd073e9119142538a22e8e',
  '6964b7ed18f05bd5ff4c3d6e5db23007',
  'fb061c769bfc74628a81f422f590544c',
  '05ed3369787ed13f9ac016a22b7b450f',
  'e7b09bf3a31c16631f5119ba11c288f4',
  'beec6201069596ecb83a09e5fc3eb415',
  'b803fd38b5faf2609a81b93c9bf1d352',
  '2c94f4a525e970341087318fd0b94823',
  'b29334ef462711ace068eb3dce67d8f8',
  '06a1fe998ca2ede601d4740c114f6c3c',
  'af8805404cc0bd2b95d3d3c9573484b1',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '73940963cbde37a0177f383a34a3cf2a',
  'e750c75783308017e541f2f3647cfcb7',
  'f0b73688b257e4ee4d3a3fafef7aafc1',
  'f051aeae7bb889518ead30ef6e491df3',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
);
EDU(
  '7d25235071653e00985854a666efc1dd',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('nej.u'),
      r = NEJ.P('edu.m'),
      s = NEJ.P('nej.ut'),
      c = NEJ.P('edu.u'),
      d;
    r._$$CharasetUtil = NEJ.C();
    d = r._$$CharasetUtil._$extend(s._$$Event, !0);
    d.__init = function (e) {
      this.__supInit(e);
    };
    c._$getCharsL = d._$getCharsL = function (e) {
      e = e || '';
      e = e.replace(/^\n+|\n+$/g, '');
      var t = e.length,
        n = 0;
      var i = e.match(/[^\x00-\x80]/g);
      if (i && i.length > 0) n = i.length || 0;
      return t + n;
    };
    c._$sliceCnAndEns = d._$sliceCnAndEns = function (e, t) {
      e = e || '';
      var n = '',
        i = e.length,
        e = e.split(''),
        o = 0;
      for (var a = 0; a < i; a++) {
        var r = e[a];
        var s = r.match(/[^\x00-\x80]/g);
        if (s && s.length > 0) o += 2;
        else o += 1;
        if (o > t) break;
        n += r;
      }
      return n;
    };
    c._$genNewStrByLength = d._$genNewStrByLength = function (e, t) {
      var n = e;
      if (this._$getCharsL(n) > t) n = this._$sliceCnAndEns(n, t) + '...';
      return n;
    };
    c._$escapeText = d._$escapeText = function (e) {
      var t = {
        r: /\<|\>|\&|\r|\n|\s|\'|\"/g,
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        ' ': '&nbsp;',
        '"': '&quot;',
        "'": '&#39;',
        '\n': '',
        '\r': '',
      };
      e = a._$encode(t, e);
      return e;
    };
    c._$string2object = d._$string2object = function (e, t) {
      var n = {};
      a._$forEach((e || '').split(t), function (e) {
        var t = e.split('=');
        if (t && t.length) {
          var i = t.shift();
          if (i) n[decodeURIComponent(i)] = decodeURIComponent(encodeURIComponent(t.join('=')));
        }
      });
      return n;
    };
    d._$formatChars = function (e, t) {
      var n = new RegExp(e);
      return n.test(t);
    };
    d._$spaceFilter = function (e) {
      var t = new RegExp('(;|；|,|，|\\s{1,})');
      var n = e.split(t),
        i = [];
      for (var o = 0; o < n.length; o++)
        if (
          n[o] &&
          '' != n[o].trim() &&
          ';' != n[o].trim() &&
          '；' != n[o].trim() &&
          ',' != n[o].trim() &&
          '，' != n[o].trim()
        )
          i.push(n[o]);
      return i;
    };
    d.__reset = function (e) {
      this.__supReset(e);
    };
    return new r._$$CharasetUtil();
  },
  'fe86216ed59e3103a56c42c850d389f0',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
