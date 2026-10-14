EDU(
  'beec6201069596ecb83a09e5fc3eb415',
  function (e, t, n, i, o) {
    var a = {},
      r = (function () {
        return this;
      })();
    var s = new RegExp('NetEaseEdu.*EDUMOOC; (.*); channel=(.*)', 'i'),
      c = new RegExp('NetEaseEdu.*study-enterprise; (.*); channel=(.*)', 'i'),
      d = new RegExp('.*EDUMOOC/(.*)', 'i'),
      l = new RegExp('NetEaseEdu.*study-enterprise;(.*);channel=(.*)', 'i'),
      u = new RegExp('NetEaseEdu.*EDUMOOC; (.*); channel=(.*)', 'i'),
      _ = new RegExp('.*EDUMOOC/(.*)', 'i'),
      f = new RegExp('qq', 'i'),
      h = new RegExp('NetEaseEdu.*aphone; k12; (.*); channel=(.*)', 'i'),
      p = new RegExp('NetEaseEdu.*iphone; k12; (.*); channel=(.*)', 'i'),
      m = new RegExp('NetEaseEdu.*aphone; geek; (.*); channel=(.*)', 'i'),
      g = new RegExp('NetEaseEdu.*iphone; geek; (.*); channel=(.*)', 'i'),
      b = r.navigator.userAgent,
      v = r.isMobilePhone;
    a._$getUserAgent = function () {
      return b;
    };
    a._$isAndroidWebView = function () {
      var e = a._$getUserAgent();
      return e.match(s);
    };
    a._$isIosWebView = function () {
      var e = a._$getUserAgent();
      return e.match(d);
    };
    a._$isAndroidEnterpriseWebView = function () {
      var e = a._$getUserAgent();
      return e.match(c);
    };
    a._$isIosEnterpriseWebView = function () {
      var e = a._$getUserAgent();
      return e.match(l);
    };
    a._$isAndroidMoocWebView = function () {
      var e = a._$getUserAgent();
      return e.match(u);
    };
    a._$isIosMoocWebView = function () {
      var e = a._$getUserAgent();
      return e.match(_);
    };
    a._$isAndroidK12webView = function () {
      var e = a._$getUserAgent();
      return e.match(h);
    };
    a._$isIosK12webView = function () {
      var e = a._$getUserAgent();
      return e.match(p);
    };
    a._$isK12webView = function () {
      return a._$isAndroidK12webView() || a._$isIosK12webView();
    };
    a._$isAndroidGeekWebView = function () {
      var e = a._$getUserAgent();
      return e.match(m);
    };
    a._$isIosGeekWebView = function () {
      var e = a._$getUserAgent();
      return e.match(g);
    };
    a._$isGeekWebView = function () {
      return a._$isAndroidGeekWebView() || a._$isIosGeekWebView();
    };
    a._$isStudywebView = function () {
      return a._$isAndroidWebView() || a._$isIosWebView();
    };
    a._$isMoocwebView = function () {
      return a._$isAndroidMoocWebView() || a._$isIosMoocWebView();
    };
    a._$isEnterprisewebView = function () {
      return a._$isAndroidEnterpriseWebView() || a._$isIosEnterpriseWebView();
    };
    a._$isWebView = function () {
      return !!(
        a._$isGeekWebView() ||
        a._$isK12webView() ||
        a._$isStudywebView() ||
        a._$isMoocwebView() ||
        a._$isEnterprisewebView()
      );
    };
    a._$isWebViewSupportJB = function () {
      var e = a._$isAndroidWebView(),
        t = a._$isIosWebView(),
        i = a._$isAndroidMoocWebView(),
        o = a._$isIosMoocWebView();
      if (e || t || i || o) {
        if (null != e) return n._$versionCompare(e[1], '2.0.0') >= 0;
        else if (null != t) return n._$versionCompare(t[1], '3.0.0') >= 0;
        else if (null != i) return n._$versionCompare(i[1], '1.2.2') >= 0;
        else if (null != o) return n._$versionCompare(o[1], '1.1.3') >= 0;
      } else return !1;
    };
    a._$isMobile = function () {
      if (a._$isWap()) return !0;
      else return a._$isMobileAll();
    };
    a._$is = function (e) {
      var t = new RegExp('(' + e + ')', 'ig'),
        n = a._$getUserAgent();
      return t.test(n);
    };
    a._$isMobileAll = function () {
      var e = a._$getUserAgent(),
        t = new RegExp('(iPhone|iPod|Android|BlackBerry|mobile|Windows Phone)', 'ig');
      return t.test(e);
    };
    a._$isIpad = function () {
      return a._$is('iPad');
    };
    a._$isIphone = function () {
      var e = a._$getUserAgent();
      return e.indexOf('iPhone') > -1;
    };
    a._$isIphoneX = function () {
      if (!this._$isIphone) return !1;
      if (812 == screen.availHeight && 375 == screen.availWidth) return !0;
      else return !1;
    };
    a._$isAndroid = function () {
      var e = a._$getUserAgent();
      return e.indexOf('Android') > -1 || e.indexOf('Adr') > -1;
    };
    a._$isWap = function () {
      return 'true' == v;
    };
    a._$isWeixin = function () {
      return a._$is('micromessenger') && !a._$is('windowswechat');
    };
    a._$getIosVersion = function () {
      var e = a._$getUserAgent().toLowerCase(),
        t = 0,
        n = /os [\d._]*/gi,
        i = e.match(n);
      if (e.indexOf('like mac os x') > 0)
        t = (i + '').replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.');
      return parseInt(t, 10);
    };
    a._$getAndroidAppVersion = function () {
      var e = a._$getUserAgent().toLowerCase();
      return e.match(s)[1];
    };
    a._$getIosAppVersion = function () {
      var e = a._$getUserAgent().toLowerCase();
      return e.match(d)[1];
    };
    a._$isSupportByVersion = function (e, t) {
      e = e || '2.0.0';
      t = t || '3.0.0';
      if (a._$isAndroidWebView()) return n._$versionCompare(a._$getAndroidAppVersion(), e) >= 0;
      else if (a._$isIosWebView()) return n._$versionCompare(a._$getIosAppVersion(), t) >= 0;
      return !1;
    };
    a._$openMobilePage = function (e, t) {
      var n = '';
      if (a.isWebView()) {
        if (a._$is('android'))
          if (e.lessonId) n = 'yktaphone://open.lesson.ykt/' + e.courseId + '_' + e.lessonId;
          else n = 'yktaphone://open.course.ykt/' + e.courseId;
        else if (e.lessonId) n = 'yktiphone://type=4-&-content=' + e.courseId + '_' + e.lessonId;
        else n = 'yktiphone://type=0-&-content=' + e.courseId;
        var i = document.createElement('iframe');
        i.setAttribute(
          'style',
          'display:none;width:0;height:0;position: absolute;top:0;left:0;border:0;height:0;width:0;',
        );
        i.src = n;
        document.body.appendChild(i);
      }
    };
    a._$callAppLogin = function (e) {
      e = i._$str2b64(e || location.href);
      if (a._$isWebViewSupportJB() && r.YixinJSBridge)
        r.YixinJSBridge.call('openLoginView', { returnUrl: e }, function (e) {});
    };
    a._$isSupportAppImageView = function () {
      return a._$isSupportByVersion('6.4.0', '6.4.0') && r.YixinJSBridge ? !0 : !1;
    };
    a._$callAppImageView = function (e, t, n) {
      var i = /^(http:|https:)/;
      var o = 0;
      e = e || '';
      t = t || [];
      if (!i.test(e)) e = 'https:' + e;
      for (var s = 0, c = t.length; s < c; s++) {
        if (!i.test(t[s])) t[s] = 'https:' + t[s];
        if (t[s] == e) o = s;
      }
      if (a._$isSupportAppImageView())
        r.YixinJSBridge.call('viewImages', { index: o, current: e, list: t }, function (e) {
          n && n(e);
        });
    };
    a._$callAppDownload = function (e, t) {
      var n = '';
      t = t || {};
      if (a._$is('android'))
        if (t.termId && t.courseId)
          n = 'yktaphone://open.course.yoc/' + t.courseId + '_' + t.termId;
        else if (t.courseId) n = 'yktaphone://open.course.ykt/' + t.courseId;
        else n = 'yktaphone://launch.app';
      else if (t.termId && t.courseId)
        n = 'yktiphone://type=6-&-content=' + t.courseId + '_' + t.termId;
      else if (t.courseId) n = 'yktiphone://type=0-&-content=' + t.courseId;
      else n = 'yktiphone://';
      if (a._$isWeixin())
        window.location.href =
          r.callAppDownloadHref +
          '?source=fromWeixin&courseId=' +
          (t.courseId || '') +
          '&termId=' +
          (t.termId || '');
      else if (a._$is('iphone')) {
        if (a._$getIosVersion() > 8) this._$openAppByForm(n);
        else this._$openAppByIframe(n);
        if ('fromCallApp' == e) {
          setTimeout(function () {
            window.location.href =
              r.callAppDownloadHref +
              '?source=fromCallApp&courseId=' +
              (t.courseId || '') +
              '&termId=' +
              (t.termId || '');
          }, 2e3);
          return;
        }
      } else if (a._$is('android')) this._$openAppByIframe(n);
      setTimeout(function () {
        window.location.href = r.appDownloadHref + '?from=mobileTopbar';
      }, 2e3);
    };
    a._$callPayApp = function (e, t) {
      if (a._$isWebViewSupportJB() && r.YixinJSBridge) {
        r.YixinJSBridge.call(
          'toPay',
          { productType: e.productType || 0, productId: e.productId || 0, ids: e.ids || [] },
          function (e) {
            t && t(e);
          },
        );
        return !0;
      }
      return !1;
    };
    a._$switchAccountInApp = function (e, t) {
      if (a._$isWebViewSupportJB() && r.YixinJSBridge)
        r.YixinJSBridge.call(
          'switchAccount',
          { returnUrl: e.returnUrl || 'https://study.163.com' },
          function (e) {
            t && t(e);
          },
        );
    };
    a._$callShareApp = function (e, t) {
      if (a._$isWebViewSupportJB() && r.YixinJSBridge) {
        e.type = e.type || 1;
        r.YixinJSBridge.call('share', e, function (e) {
          window.alert('分享成功');
          t && t(e);
        });
        return !0;
      }
      return !1;
    };
    a._$setThirdShare = function (e) {
      var t = r.wx,
        n = 'http://img2.ph.126.net/rqkJ8avE5_3Dn1l4TtnYDw==/6630541099630412039.png',
        i = document.title,
        o = document.location.href;
      if (a._$isWeixin() && t) {
        t.onMenuShareTimeline({
          title: e.title || i,
          link: e.url || o,
          imgUrl: e.pic || n,
          success: function () {},
          cancel: function () {},
        });
        t.onMenuShareAppMessage({
          title: e.title || i,
          desc: e.description || '',
          link: e.url || o,
          imgUrl: e.pic || n,
          type: '',
          dataUrl: '',
          success: function () {},
          cancel: function () {},
        });
      } else {
        r.appShareData = {
          title: e.title || i,
          description: e.description || '',
          pic: e.pic || n,
          weiboDesc: e.description || '',
          weiboPic: e.pic || n,
          url: e.url || o,
          type: 1,
        };
        r.shareData = {
          imgUrl: e.pic || n,
          timeLineLink: e.url || o,
          sendFriendLink: e.url || o,
          weiboLink: e.url || o,
          tTitle: e.title || i,
          tContent: e.description || '',
          fTitle: e.title || i,
          fContent: e.description || '',
          wContent: e.description || '',
        };
      }
    };
    a._$setThirdShare2 = function (e) {
      var t = r.wx,
        n = 'http://img2.ph.126.net/rqkJ8avE5_3Dn1l4TtnYDw==/6630541099630412039.png',
        i = document.title,
        o = document.location.href;
      if (a._$isWeixin() && t) {
        t.onMenuShareTimeline({
          title: e.title || i,
          link: e.link || o,
          imgUrl: e.imgUrl || n,
          success: (e.timeline || {}).success || function () {},
          cancel: (e.timeline || {}).cancel || function () {},
        });
        t.onMenuShareAppMessage({
          title: e.title || i,
          desc: e.desc || '',
          link: e.link || o,
          imgUrl: e.imgUrl || n,
          type: '',
          dataUrl: '',
          success: (e.weChat || {}).success || function () {},
          cancel: (e.weChat || {}).cancel || function () {},
        });
      } else {
        r.appShareData = {
          title: e.title || i,
          description: e.desc || '',
          pic: e.imgUrl || n,
          weiboDesc: e.weiboDesc || '',
          weiboPic: e.weiboImgUrl || n,
          url: e.link || o,
          type: 1,
        };
        r.shareData = {
          imgUrl: e.imgUrl || n,
          timeLineLink: e.link || o,
          sendFriendLink: e.link || o,
          weiboLink: e.link || o,
          tTitle: e.title || i,
          tContent: e.desc || '',
          fTitle: e.title || i,
          fContent: e.desc || '',
          wContent: e.desc || '',
        };
      }
    };
    a._$isInQQ = function () {
      var e = a._$getUserAgent();
      return e.match(f);
    };
    a._$inInQQView = function () {
      var e = a._$getUserAgent(),
        t = new RegExp('MQQBrowserQQ'),
        n = new RegExp('MQQBrowser QQ'),
        i = /(iPhone|iPad|iPod|iOS)/i.test(e);
      var o = i && n.test(e),
        r = a._$isAndroid() && t.test(e);
      return o && r;
    };
    a._$isWechatMiniProgram = function (e, t) {
      if (this._$isWeixin())
        if (wx && wx.miniProgram && wx.miniProgram.getEnv)
          new o(
            function (e, t) {
              wx.miniProgram.getEnv(function (n) {
                if (n.miniprogram) e();
                else t();
              });
            }._$bind(this),
          )
            .then(function () {
              e && e();
            })
            ['catch'](function (e) {
              t && t();
            });
        else t && t();
      else t && t();
    };
    a._$isWechatMiniProgramV2 = function () {
      if (this._$isWeixin())
        if (wx && wx.miniProgram && wx.miniProgram.getEnv)
          return new o(function (e) {
            wx.miniProgram.getEnv(function (t) {
              if (t.miniprogram) e(!0);
              else e(!1);
            });
          });
        else return o.resolve(!1);
      else return o.resolve(!1);
    };
    a._$isWechatMiniProgramSync = function () {
      return 'miniprogram' === window['__wxjs_environment'];
    };
    a._$RMBFilter = function (e) {
      if (a._$isIosWebView()) return e.replace(/\u00A5|￥|&yen;/gi, '');
      else return e;
    };
    a._$getClientType = function () {
      var e = {
        WX: 'weixin',
        WAP: 'wap',
        WEB: 'web',
        IOS: 'ios',
        ANDRIOD: 'android',
        MINIPROGRAM: 'wx_mini_program',
      };
      if (a._$isAndroidWebView()) return e.ANDRIOD;
      else if (a._$isIosWebView()) return e.IOS;
      else if (a._$isWechatMiniProgramSync()) return e.MINIPROGRAM;
      else if (a._$isWeixin()) return e.WX;
      else if (a._$isWap()) return e.WAP;
      return e.WEB;
    };
    return a;
  },
  'f051aeae7bb889518ead30ef6e491df3',
  'a7d1128d22219f1def1727e67cfa7d44',
  '77140f4f8e949dd8d942877d5e3e1f57',
  'c23a9d4e237326dadfa12366ae1b6e48',
  'acaf016265ee9e46872cbbb2398ea4b7',
);
