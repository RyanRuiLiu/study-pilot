EDU(
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f, h, p, m) {
    function g(e) {
      if (C.test(e)) {
        var t = e.split('/');
        if ('edu-image' == t[3]) {
          t[2] = 'edu-image.nosdn.127.net';
          t.splice(3, 1);
          e = t.join('/');
        }
        if ('mooc-image' == t[3]) {
          t[2] = 'mooc-image.nosdn.127.net';
          t.splice(3, 1);
          e = t.join('/');
        }
      } else if (I.test(e)) {
        var t = e.split('/');
        t.splice(0, 3);
        t.unshift('//img-ph-mirror.nosdn.127.net');
        e = t.join('/');
      }
      return e;
    }
    var b = window,
      v = NEJ.P('nej.p'),
      E = NEJ.P('nej.u'),
      x = NEJ.P('edu.u'),
      w = NEJ.P('nej.j');
    var C = new RegExp('^(http://|https://|//)nos.netease.com/'),
      y = new RegExp('^(http://|https://|//)([a-z0-9]+)-image.nosdn.127.net'),
      $ = new RegExp('^http://nos.netease.com/.*thumbnail=(\\d*)y(\\d*).*'),
      I = new RegExp('^(http://|https://|//)img[0-9]*.ph.126.net'),
      T = new RegExp('^(http://|https://|//)img-ph-mirror.nosdn.127.net'),
      S = new RegExp('^(http://|https://|//)imgsize.ph.126.net'),
      A = '//imgsize.ph.126.net/?enlarge=true&imgurl=',
      N = new RegExp('^data:image/');
    x._$filterText = o._$filterText;
    x._$removeNRNBSP = o._$removeNRNBSP;
    x._$hiddenNode = a._$hiddenNode;
    x._$isNodeShown = a._$isNodeShown;
    x._$showNode = a._$showNode;
    x._$toggleNodeDisplay = a._$toggleNodeDisplay;
    x._$parseUrlParams = r._$parseUrlParams;
    x._$arrContains = s._$arrContains;
    x._$isIE = c._$isIE;
    x._$isAndroidWebView = d._$isAndroidWebView;
    x._$isMobile = d._$isMobile;
    x._$isAndroidWebView = d._$isAndroidWebView;
    x._$toggleClassName = a._$toggleClassName;
    x._$trackEvent = u._$trackEvent;
    x._$trackPageView = u._$trackPageView;
    x._$convertToJSONHex = _._$convertToJSONHex;
    x._$deepCopy = _._$deepCopy;
    x._$throttle = f._$throttle;
    x._$debounce = h.debounce;
    x._$scaleImage = l._$scaleImage;
    x._$isRightUMI = function (e, t) {
      if (!e || !t) return !1;
      var n = b.decodeURIComponent(e);
      var i = n.indexOf('?');
      i = i >= 0 ? i : n.length;
      n = n.substring(n.indexOf('#') + 1, i);
      if ('[object Array]' == Object.prototype.toString.call(t)) {
        for (var o = 0; o < t.length; o++) if (n == t[o]) return !0;
        return !1;
      } else return n == t;
    };
    x._$addUrlParamStr = function (e, t, n) {
      t = t || b.location.href;
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
      var l = x._$parseUrlParams(a);
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
    x._$trim = function (e) {
      e = e || '';
      if ('function' == typeof e.trim) return e.trim();
      else return e.replace(/(^\s*)|(\s*$)/g, '');
    };
    x._$stripTxt = function (e) {
      return !e ? '' : e.replace(/[\n\r]/g, '');
    };
    x._$clearStyle = function (e) {
      if (e) {
        e.getAttribute('style');
        e.removeAttribute('style');
      }
    };
    x._$isIE8 = function () {
      var e = window.navigator.userAgent;
      var t = new RegExp('MSIE 8.0', 'i').test(e);
      return t;
    };
    x._$browserSupportedOrGo = function () {
      var e = !x._$isIE() || '2.0' != v._$KERNEL.release;
      if (!e) location.replace(b.urlPrefix.notSupportedPrefix);
      return e;
    };
    x._$dealWithIeHash = function () {
      try {
        if (x._$isIE() && b.docTitle) document.title = b.docTitle;
      } catch (e) {
        e;
      }
    };
    if (x._$isIE() && !x.changeHashTimer)
      x.changeHashTimer = b.setInterval(x._$dealWithIeHash, 100);
    x._$scalePicDynamic = function (e, t, i, o) {
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
    x._$formateImagePrefix = function (e) {
      if (e) {
        var t = /img[0-9].ph.126.net/g;
        return e
          .replace(t, 'img-ph-mirror.nosdn.127.net')
          .replace('nos.netease.com/edu-image', 'edu-image.nosdn.127.net');
      }
    };
    x._$convertListToMaps = function (e) {
      var t = {};
      E._$forEach(e, function (e) {
        t[e.id] = e;
      });
      return t;
    };
    x._$isEmpty = function (e) {
      for (var t in e) return !1;
      return !0;
    };
    x._$highLight = function (e) {
      return e.replace(/{##([^{#}]+)##}/g, function () {
        return '<span class="f-fcorange">' + arguments[1] + '</span>';
      });
    };
    x._$escapeRegText = (function () {
      var e = { r: /\+/g, '+': '\\+' };
      return function (t) {
        t = E._$encode(e, t);
        return t;
      };
    })();
    x._$composeUrl = function (e, t) {
      e = e || '';
      return e + ('object' == typeof t ? '?' + E._$object2query(t) : '').replace(/\?$/, '');
    };
    x._$goBack = function (e) {
      var t = 1;
      if ('webkit' == v._$KERNEL.engine) t = 2;
      if (history.length > t) history.back();
      else b.dispatcher._$redirect(e);
    };
    x._$formatMoney = function (e) {
      e = (e || 0).toString();
      var t = '';
      for (; e.length > 3;) {
        t = ',' + e.slice(-3) + t;
        e = e.slice(0, e.length - 3);
      }
      if (e) t = e + t;
      return t;
    };
    x._$getUrlWithCsrfKey = function (e, t) {
      if (e) {
        if (t) return e;
        if (!w._$cookie('NTESSTUDYSI'));
        var n = e.split('#')[0];
        if (/\?/g.test(n)) n += '&csrfKey=' + w._$cookie('NTESSTUDYSI');
        else n += '?csrfKey=' + w._$cookie('NTESSTUDYSI');
        if (e.split('#')[1]) n += e.split('#')[1];
        return n;
      }
    };
    x._$strToHexCharCode = function (e) {
      if ('' === e) return '';
      var t = [];
      t.push('0x');
      for (var n = 0; n < e.length; n++) t.push(e.charCodeAt(n).toString(16));
      return t.join('');
    };
    x._$clampString = function (e, t) {
      var n = 0,
        i = 0;
      for (var a = 0, r = e.length; a < r; a++) {
        if (n >= t) {
          i = a + 1;
          break;
        }
        n += o._$getStringLength(e[a]);
      }
      return e.substring(0, i);
    };
    x._$roundNumber = function O(e, t) {
      if (('' + e).indexOf('e') === -1) return +(Math.round(e + 'e+' + t) + 'e-' + t);
      else {
        var n = ('' + e).split('e');
        var i = '';
        if (+n[1] + t > 0) i = '+';
        return +(Math.round(+n[0] + 'e' + i + (+n[1] + t)) + 'e-' + t);
      }
    };
    x._$toZhNum = function (e) {
      var t = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
      return t[e];
    };
    x._$log2Study = function (e, t, n) {
      var i, o;
      if (n) {
        i = e + '_' + t;
        o = h.extend({ action: i }, n);
        p._$request({
          url: '//log.study.163.com/__utm.gif',
          method: 'get',
          data: { dt: m._$str2hex(JSON.stringify(o)), p: 'mooc' },
          notShowLoading: !0,
          hideError: !0,
        });
      }
    };
    x._$log2DiTing = function (e, t) {
      p._$request({
        url: '//mam.netease.com/web/new',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        method: 'post',
        data: JSON.stringify(e),
        onload: t,
        cookie: !1,
        notShowLoading: !0,
        hideError: !0,
        notScriptToken: !0,
      });
    };
    x._$getClientIp = function (e) {
      if (!w._$cookie('CLIENT_IP'))
        p._$request({
          url: '//mam.netease.com/api/config/getClientIp',
          method: 'get',
          onload: function (e) {
            w._$cookie('CLIENT_IP', { value: e });
          },
          cookie: !1,
          notShowLoading: !0,
          hideError: !0,
          notScriptToken: !0,
        });
    };
    x._$userActionLog = function (e, t, n, i) {
      if (window.webUser) {
        var o = '//www.icourse163.org/web/j/recommendRPCBean.addOrUpdateActionFlag.rpc';
        var n = n || 1;
        var a = {
          targetId: t,
          targetType: n,
          actionFlagName: e,
          searchWord: encodeURIComponent(i) || null,
        };
        p._$request({
          url: o,
          method: 'post',
          data: { memberRecommendTagActionParm: a },
          notShowLoading: !0,
          hideError: !0,
        });
      }
    };
    x._$revenueStatisticsLog = function (e, t) {
      var n = {
        zw_mooc_pcsybjtj_: 24,
        zw_mooc_pcsybzkcph_: 25,
        zw_mooc_pcsyzdyfltj_: 26,
        zw_mooc_pcsslx_: 13,
        zw_mooc_pcsstxw_: 12,
        zw_mooc_pcssjg_: 19,
        zw_mooc_pcssjgybjtj_: 3,
        zw_mooc_pckcjsyxgkc: 7,
        zw_mooc_pckcjsywntj: 8,
        zw_mooc_pckcxxywntj: 9,
        zw_mooc_pcgrzxggw: 21,
        zw_mooc_sdk_apppdybanner: 4,
        zw_mooc_wapssjg_: 2,
        zw_mooc_wapsyhktj_: 1,
        zw_mooc_wapsybzkcph_: 8,
        zw_mooc_wapsypdhktj_: 9,
      };
      if (!d._$isWebView()) {
        var i = x._$parseUrlParams(location.search);
        var o = !window.isMobilePhone || 'false' === window.isMobilePhone;
        var a = { productId: e, productType: t, positionType: o ? 1 : 3 };
        if (i.mocInLoc) a.mocInLoc = i.mocInLoc;
        if (i.outVendor || i.mocInVendor) {
          var r = i.mocInVendor || i.outVendor;
          a.positionId = n[r];
        }
        if (i.belongChannelId) {
          a.channelId = i.belongChannelId;
          a.modelId = i.belongModuleId;
        }
        if ('zw_mooc_sdk_apppdybanner' === i.outVendor && !o) a.positionId = 3;
        if (i.mocInLoc || i.belongChannelId)
          p._$request({
            url: '//www.icourse163.org/web/j/adsTraceStatisticsBean.collectClickTraceFromPromoLoc.rpc',
            method: 'post',
            data: a,
            notShowLoading: !0,
            hideError: !0,
          });
        else if (i.outVendor || i.mocInVendor)
          p._$request({
            url: '//www.icourse163.org//web/j/adsTraceStatisticsBean.collectClickTraceOnPosition.rpc',
            method: 'post',
            data: a,
            notShowLoading: !0,
            hideError: !0,
          });
      }
    };
    x._$adActionLog = function () {
      if (!(d._$isWebView() || location.href.indexOf('landingPageReport=false') > -1)) {
        var e = x._$parseUrlParams(location.search);
        if (e.mocOutLoc && e.locRefId)
          p._$request({
            url: '//www.icourse163.org/web/j/adsTraceStatisticsBean.collectAdsTraceStatistics.rpc',
            method: 'post',
            data: { collectUrl: encodeURIComponent(location.href.split('#')[0]) },
            notShowLoading: !0,
            hideError: !0,
          });
      }
    };
    x._$adActionLogByShow = function (e, t) {
      var n = this;
      if (t) n._$adActionLogByType(e, 1);
      else
        setTimeout(function () {
          n._$adActionLogByType(e, 1);
        }, 2e3);
    };
    x._$adActionLogByClick = function (e) {
      this._$adActionLogByType(e, 2);
    };
    x._$adActionLogByType = function (e, t) {
      if (!d._$isWebView())
        p._$request({
          url: '//www.icourse163.org/web/j/adsTraceStatisticsBean.collectAdsTraceStatistics.rpc',
          method: 'post',
          data: { collectUrl: encodeURIComponent(e), collectType: t },
          notShowLoading: !0,
          hideError: !0,
        });
    };
    x.generateQrCodeImageUrlFromUrl = (function () {
      var e = document.createElement('div');
      return function (t, n, o) {
        if (n) {
          t = t || window.location.href;
          o = o || 100;
          e.innerHTML = '';
          var a = new i(e, {
            text: t,
            width: o,
            height: o,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: i.CorrectLevel.H,
          });
          var r = a._el && a._el.children && a._el.children[1];
          var s = setInterval(function () {
            if (!r.src);
            else {
              n(r.src);
              e.innerHTML = '';
              clearInterval(s);
              s = null;
            }
          });
        }
      };
    })();
    x._$convertImage2webp = function (e) {
      if (!e) return '';
      var t = localStorage.getItem('isBrowerSupportWebp');
      if (!t || 'false' == t) return e;
      if (e.indexOf('.gif') > -1 || e.indexOf('edu-image.nosdn') == -1 || /type=webp/.test(e))
        return e;
      if (/quality=100/.test(e)) e.replace('quality=100', 'quality=75');
      return e + (e.split('?').length > 1 ? '&' : '?') + 'type=webp&lossless=1';
    };
    x._$isSupportWebP = (function () {
      var e;
      try {
        e =
          0 == document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp');
      } catch (t) {
        e = !1;
      }
      return function () {
        return e;
      };
    })();
    x._$convertToWebP = function (t) {
      var n, i, o, a, r, s;
      if (!y.test(t) && !T.test(t) && !C.test(t)) return t;
      s = t.substring(t.lastIndexOf('.'));
      r = new RegExp(/^\.gif/);
      if (!x._$isSupportWebP() || r.test(s)) return t;
      a = t.split('?') || [];
      i = a[0];
      n = a[1] || '';
      o = e._$query2object(n);
      if (void 0 != o['imageView']) i = t + '&type=webp';
      else i = t + (n ? '&' : '?') + 'imageView&type=webp';
      return i;
    };
    x._$urlAddParam = function (e, t, n) {
      if (!e || e.indexOf(t) > -1) return e;
      var i = e.indexOf('?') > -1 ? '&' : '?';
      return e + i + t + '=' + n;
    };
    x._$getChangeEduCookiesUrl = function (e) {
      if (!window.webUser) return e;
      var n = t._$str2b64(e);
      return (
        'https://www.icourse163.org/passport/adult/changeEduCookies.htm?single=false&returnUrl=' + n
      );
    };
    x._$formatImage = function (e) {
      e = g(e);
      e = x._$convertToWebP(e);
      return e;
    };
    x._$changeProtocol = function (e) {
      var t = window.location.protocol || 'https';
      if (e && 0 === e.indexOf('http')) return e.replace(/^(http:|https:)/, t);
      else return e;
    };
    return x;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  'c23a9d4e237326dadfa12366ae1b6e48',
  'c8255e0675e41fe756bb2fc3ca2ab9dc',
  '754689c7f068e68312a614dcc026b5ee',
  '7af1d8adfbbd073e9119142538a22e8e',
  '6964b7ed18f05bd5ff4c3d6e5db23007',
  'fb061c769bfc74628a81f422f590544c',
  '05ed3369787ed13f9ac016a22b7b450f',
  'e7b09bf3a31c16631f5119ba11c288f4',
  'beec6201069596ecb83a09e5fc3eb415',
  'ea321df1a66d5a1d11c5df37a56589c4',
  'b803fd38b5faf2609a81b93c9bf1d352',
  '2c94f4a525e970341087318fd0b94823',
  'b29334ef462711ace068eb3dce67d8f8',
  '06a1fe998ca2ede601d4740c114f6c3c',
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  'af8805404cc0bd2b95d3d3c9573484b1',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '73940963cbde37a0177f383a34a3cf2a',
  'bf8d09e46d2369efd6e41b29fe211330',
  '93828627ddb358ed890cb65967a0c1de',
  'f051aeae7bb889518ead30ef6e491df3',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
);
