EDU(
  '13d9d0a0fedd5c22f2453b15332aedc6',
  function (e, t, n) {
    function i(e) {
      var t = e || window.event;
      t.preventDefault && t.preventDefault();
      t.stopPropagation && t.stopPropagation();
      t.cancelBubble = !0;
      t.returnValue = !1;
      return !1;
    }
    function o(e) {
      e.ontouchstart = i;
      e.ontouchmove = i;
      e.ontouchend = i;
      e.ontouchcancel = i;
    }
    var a = window,
      r = NEJ.P('nej.p'),
      s = NEJ.P('edu.u'),
      c = '请点击右上角按钮，选择在<span class="red-text">“Safari浏览器”</span>打开';
    var d = a.isMobilePhone;
    var l = new RegExp('NetEaseEdu.*EDUMOOC; (.*); channel=(.*)', 'i'),
      u = new RegExp('.*EDUMOOC/([\\.\\d]*)/?([\\.\\d]*)?', 'i'),
      _ = a.navigator.userAgent;
    s._$isWeixin = e._$isWeixin;
    s._$is = e._$is;
    s._$isMobile = e._$isMobile;
    s._$isMobileAll = e._$isMobileAll;
    s._$isIpad = e._$isIpad;
    s._$getIosVersion = e._$getIosVersion;
    s._$isWeibo = function () {
      var e = /(weibo)/gi;
      return e.test(navigator.userAgent);
    };
    s._$isIosAppInReview = function () {
      var e = _.match(u);
      if (e) return e[2] && e[2] !== e[1];
      else return null;
    };
    s._$isAndroidWebView = function () {
      return _.match(l);
    };
    s._$isIosWebView = function () {
      return _.match(u);
    };
    s._$isWebView = function () {
      return _.match(l) || _.match(u);
    };
    s._$versionCompare = function (e, t, n) {
      function i(e) {
        return (o ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(e);
      }
      var o = n && n.lexicographical,
        a = n && n.zeroExtend,
        r = e.split('.'),
        s = t.split('.');
      if (!r.every(i) || !s.every(i)) return NaN;
      if (a) {
        for (; r.length < s.length;) r.push('0');
        for (; s.length < r.length;) s.push('0');
      }
      if (!o) {
        r = r.map(Number);
        s = s.map(Number);
      }
      for (var c = 0; c < r.length; ++c) {
        if (s.length == c) return 1;
        if (r[c] != s[c])
          if (r[c] > s[c]) return 1;
          else return -1;
        else;
      }
      if (r.length != s.length) return -1;
      else return 0;
    };
    s._$isWebViewSupportJB = function () {
      var e = s._$isAndroidWebView(),
        t = s._$isIosWebView();
      if (e || t) {
        if (null != e) return s._$versionCompare(e[1], '1.2.2') >= 0;
        else if (null != t) return s._$versionCompare(t[1], '1.1.3') >= 0;
      } else return !1;
    };
    s._$suportShareImg = function () {
      var e = s._$isAndroidWebView(),
        t = s._$isIosWebView();
      if (t && t.length > 1) return s._$versionCompare(t[1], '2.3.0') >= 0;
      else if (e && e.length > 1) return s._$versionCompare(e[1], '2.2.3') >= 0;
      return !1;
    };
    s._$suportHideColumnHead = function () {
      var e = s._$isAndroidWebView(),
        t = s._$isIosWebView();
      if (t && t.length > 1) return s._$versionCompare(t[1], '3.7.0') >= 0;
      else if (e && e.length > 1) return s._$versionCompare(e[1], '3.7.0') >= 0;
      return !1;
    };
    s._$openMobilePageByJsBridge = function (e, t, n) {
      var i = setInterval(
        function () {
          if (a.YixinJSBridge) {
            clearInterval(i);
            a.YixinJSBridge &&
              a.YixinJSBridge.invoke(e, t, function (e) {
                n && n(e);
              });
          }
        }._$bind(this),
        200,
      );
    };
    s._$openNativeLearnPage = function (e, t, i) {
      switch (e) {
        case n.PRODUCT_TYPE.COURSE:
          s._$openMobilePageByJsBridge(
            'openCourseStudy',
            { termId: t.termId, courseId: t.courseId },
            i,
          );
          break;
        case n.PRODUCT_TYPE.COURSE_PACKAGE:
          s._$openMobilePageByJsBridge('openMyStudyTab', {}, i);
          break;
        case n.PRODUCT_TYPE.COLUMN:
          s._$openMobilePageByJsBridge(
            'openColumnInfo',
            { columnId: t.columnId, enrolled: t.enrolled },
            i,
          );
      }
    };
    s._$openProductDeailApp = function (e, t) {
      switch (e) {
        case n.PRODUCT_TYPE.COURSE:
          s._$openKaoyanCourseDetailApp(t.courseId, t.termId);
          break;
        case n.PRODUCT_TYPE.COURSE_PACKAGE:
          s._$openKaoyanSubjectApp(t.subjectId, t.coursePackageId);
          break;
        case n.PRODUCT_TYPE.COLUMN:
          s._$openColumnApp(t.columnId, t.enrolled);
      }
    };
    s._$openKaoyanCourseDetailApp = function (e, t) {
      if (s._$isIos())
        if (s._$isIosWebView())
          s._$openMobilePageByJsBridge('openCourseDetail', { courseId: e, termId: t });
        else if (s._$isWeixin()) s._$callAppDownload('fromCallApp');
        else
          window.location.href =
            '//developer.icourse163.org/link/kYCourseDetail/courseId/' + e + '/termId/' + t;
      else if (s._$is('android'))
        if (s._$isWebView())
          s._$openMobilePage(
            'emaphone://open.course.moc.postgraduate/?courseId=' + e + '&termId=' + t,
            'emiphone://type=5-&-content=' + e + '_' + t,
          );
        else if (s._$isWeixin()) s._$callAppDownload('fromCallApp');
        else
          window.location.href =
            'emaphone://open.course.moc.postgraduate/?courseId=' + e + '&termId=' + t;
      else s._$callAppDownload('fromCallApp');
    };
    s._$openKaoyanSubjectApp = function (e, t) {
      if (s._$isIos())
        if (s._$isIosWebView())
          s._$openMobilePageByJsBridge('openCoursePlan', { subjectId: e, coursePackageId: t });
        else
          window.location.href =
            '//developer.icourse163.org/link/coursePlan/subjectId/' + e + '/coursePackageId/' + t;
      else if (s._$isWebView())
        s._$openMobilePage(
          'emaphone://open.subject?subjectId=' + e + '&coursePackageId=' + t,
          'emiphone://type=5-&-content=' + e,
        );
      else if (s._$isWeixin()) s._$callAppDownload('fromCallApp');
      else
        window.location.href = 'emaphone://open.subject?subjectId=' + e + '&coursePackageId=' + t;
    };
    s._$openKaoyanCoursePackageApp = function (e) {
      if (s._$isIos())
        if (s._$isIosWebView())
          s._$openMobilePageByJsBridge('openCoursePackage', { coursePackageId: e });
        else s._$callAppDownload('fromCallApp');
      else if (s._$isWebView())
        s._$openMobilePage(
          'emaphone://open.course.moc.postgraduatecoursepackage/?coursePackageId=' + e,
          'emiphone://type=6-&-content=' + e,
        );
      else s._$callAppDownload('fromCallApp');
    };
    s._$openColumnApp = function (e, t) {
      if (s._$isWebView())
        s._$openMobilePageByJsBridge('openColumnInfo', { columnId: e, enrolled: t });
      else
        s._$openMobilePage(
          'emaphone://open.columnintro?columnId=' + e + '&isExcludeMobDesc=false',
          '//developer.icourse163.org/link/column/columnId/' + e,
        );
    };
    s._$openMyLearnApp = function () {
      if (s._$isIos())
        if (s._$isIosWebView()) s._$openMobilePageByJsBridge('openMyStudyTab', {});
        else s._$callAppDownload('fromCallApp', {});
      else if (s._$isWebView()) s._$openMobilePageByJsBridge('openMyStudyTab', {});
      else s._$callAppDownload('fromCallApp', {});
    };
    s._$openLiveRoomApp = function (e) {
      if (s._$isIosWebView()) s._$openMobilePageByJsBridge('openLive', { liveId: e });
      else s._$openMobilePage('emaphone://open.live?id=' + e, 'emiphone://type=4-&-content=' + e);
    };
    s._$onJsBridgeReady = function (e) {
      function t() {
        if (!n && window.YixinJSBridge) {
          n = !0;
          e();
          clearInterval(i);
        }
      }
      var n = !1;
      var i;
      i = setInterval(t);
      document.addEventListener('YixinJSBridgeReady', t);
    };
    s._$openMobilePage = function (e, n) {
      var i = '';
      if (!s._$isWeixin()) {
        if (s._$is('android')) i = e;
        else i = n;
        if (s._$getIosVersion() > 8) window.location.href = i;
        else {
          var o = document.createElement('iframe');
          o.setAttribute(
            'style',
            'display:none;width:0;height:0;position: absolute;top:0;left:0;border:0;height:0;width:0;',
          );
          o.src = i;
          document.body.appendChild(o);
        }
      } else t.show(s._$isIos() ? c : void 0);
    };
    s._$openMobilePageOld = function (e) {
      var n = '';
      if (s._$isWebView())
        if (!s._$isWeixin()) {
          if (r._$IS['android']) n = 'emaphone://open.course.moc/' + e.courseId + '_' + e.termId;
          else n = 'emiphone://type=3-&-content=' + e.courseId + '_' + e.termId;
          if (s._$getIosVersion() > 8) window.location.href = n;
          else {
            var i = document.createElement('iframe');
            i.setAttribute(
              'style',
              'display:none;width:0;height:0;position: absolute;top:0;left:0;border:0;height:0;width:0;',
            );
            i.src = n;
            document.body.appendChild(i);
          }
        } else t.show(s._$isIos() ? c : void 0);
    };
    s._$openMobileCoursePageByToken = function (e, t, n) {
      if (n) {
        var i = '';
        if (s._$is('android')) i = 'emaphone://open.course.moc/' + e + '_' + t + '?token=' + n;
        else i = 'emiphone://open.course.moc/' + e + '_' + t + '?token=' + n;
        window.location.href = i;
      } else s._$callAppDownload('fromCallApp', { courseId: e, termId: t });
    };
    s._$isIos = function () {
      return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    };
    s._$isWap = function () {
      return 'true' == d || s._$isWebView();
    };
    s._$callApp4junwei = function (e, t) {
      var n =
        'emaphone://open.course.moc/' +
        t.courseId +
        '_' +
        t.termId +
        '?unitId=' +
        t.unitId +
        '&tabIndex=' +
        t.tabIndex +
        '&showIntro=' +
        t.showIntro +
        '&token=' +
        t.token;
      var i = document.createElement('iframe');
      i.setAttribute('style', 'width:0;height:0;display:none');
      i.src = n;
      var o = new Date();
      document.body.appendChild(i);
      i.parentNode.removeChild(i);
      setTimeout(function () {
        var e = new Date();
        if (e - o < 815)
          window.location.href = '//www.icourse163.org/appDownload.htm?from=' + t.from;
      }, 800);
    };
    s._$callAppDownload = function (e, n) {
      var i = '';
      if (!s._$isWeixin()) {
        if (s._$is('android'))
          if (n.termId && n.courseId && n.unitId)
            i =
              'emaphone://open.unit.video?courseId=' +
              n.courseId +
              '&termId=' +
              n.termId +
              '&lessonId=' +
              n.lessonId +
              '&unitId=' +
              n.unitId +
              '&contentId=' +
              n.contentId;
          else if (n.courseId && n.postId) i = 'emaphone://open.post?id=' + n.postId;
          else if (n.termId && n.courseId)
            i = 'emaphone://open.course.moc/' + n.courseId + '_' + n.termId;
          else if (n.liveId) i = 'emaphone://open.live?id=' + n.liveId;
          else i = 'emaphone://launch.app';
        else if (n.termId && n.courseId && n.unitId)
          i =
            '//developer.icourse163.org/videoUnit/unitId/' +
            n.unitId +
            '/termId/' +
            n.termId +
            '/contentId/' +
            n.contentId +
            '/lessonId/' +
            n.lessonId +
            '/courseId/' +
            n.courseId;
        else if (n.courseId && n.postId)
          i =
            '//developer.icourse163.org/postDetail/postId/' + n.postId + '/courseId/' + n.courseId;
        else if (n.termId && n.courseId)
          i =
            '//developer.icourse163.org/courseInfo/courseId/' + n.courseId + '/termId/' + n.termId;
        else if (n.courseId)
          i = '//developer.icourse163.org/courseInfo/courseId/' + n.courseId + '/termId/0';
        else if (n.liveId) i = '//developer.icourse163.org/live/' + n.liveId;
        else i = '//developer.icourse163.org/';
        if (s._$is('iphone')) {
          if (s._$getIosVersion() > 8) window.location.href = i;
          else {
            var o = document.createElement('iframe');
            o.setAttribute('style', 'width:0;height:0;display:none');
            o.src = i;
            document.body.appendChild(o);
            o.parentNode.removeChild(o);
          }
          if ('fromCallApp' == e)
            setTimeout(function () {
              window.location.href =
                a.callAppDownloadHref +
                '?source=fromCallApp&courseId=' +
                (n.courseId || '') +
                '&termId=' +
                (n.termId || '') +
                '&from=' +
                (n.from || '');
            }, 2e3);
        } else if (s._$is('android'))
          if (s._$isWeibo())
            window.location.href =
              a.callAppDownloadHref +
              '?source=fromWeibo&courseId=' +
              (n.courseId || '') +
              '&termId=' +
              (n.termId || '');
          else {
            o = document.createElement('iframe');
            o.setAttribute('style', 'width:0;height:0;display:none');
            o.src = i;
            var r = new Date();
            document.body.appendChild(o);
            o.parentNode.removeChild(o);
            setTimeout(function () {
              var e = new Date();
              if (e - r < 815)
                window.location.href = '//www.icourse163.org/appDownload.htm?from=' + n.from;
            }, 800);
          }
      } else t.show(s._$isIos() ? c : void 0);
    };
    s._$openIndexApp = function () {
      if (s._$isIos()) window.location.href = '//developer.icourse163.org/link/*';
    };
    s._$invokeAppShare = function (e) {
      if (s._$isWebView()) {
        var t = 'share';
        e.data = { url: e.url, weiboDesc: e.weiboDesc };
        e.description = e.description || e.title;
        e.weiboDesc = e.weiboDesc || e.description;
        if (e.isShareImg) {
          t = 'shareImage';
          e.imageUrl = e.imageUrl || '';
        }
        s._$openMobilePageByJsBridge(t, e);
      }
    };
    s._$openUserCenterNativePage = function (e) {
      if (s._$isIosWebView()) s._$openMobilePageByJsBridge('userProfile', { userId: e });
      else if (s._$isAndroidWebView())
        s._$openMobilePage('emaphone://open.personal.homepage?uid=' + e, '');
    };
    s._$openIOSAppOrderPage = function (e, t) {
      if (this._$isIosWebView() && window.YixinJSBridge)
        window.YixinJSBridge.invoke(
          'kYCoursePackagePurchase',
          { productId: e, productType: t },
          function () {},
        );
    };
    s._$toMyIncome = function () {
      if (window.YixinJSBridge)
        window.YixinJSBridge.invoke('showIncomePage', {}, function () {
          var e = '/cps/center/myincome.htm';
          location.href = e;
        });
    };
    s.disableImgLongPress = function (e) {};
    s._$setCommonShare = function (e, t) {
      var n = a.wx,
        i = '//edu-image.nosdn.127.net/74DBED5C8E078FEA2C54FD5D0A7D73AA.png',
        o = document.title,
        r = document.location.href;
      if (!t && s._$isWebView()) s._$invokeAppShare(e);
      if (n) {
        n.ready(function () {
          n.onMenuShareTimeline({
            title: e.title || o,
            link: e.url || r,
            imgUrl: e.pic || i,
            success: function () {
              if (e.success && e.success instanceof Function) e.success();
            },
            cancel: function () {
              if (e.cancel && e.cancel instanceof Function) e.cancel();
            },
          });
          n.onMenuShareAppMessage({
            title: e.title || o,
            desc: e.description || '',
            link: e.url || r,
            imgUrl: e.pic || i,
            type: '',
            dataUrl: '',
            success: function () {
              if (e.success && e.success instanceof Function) e.success();
            },
            cancel: function () {
              if (e.cancel && e.cancel instanceof Function) e.cancel();
            },
          });
        });
        n.error(function (e) {
          confirm(e);
        });
        n.onMenuShareQQ({
          title: e.title || o,
          desc: e.description || '',
          link: e.url || r,
          imgUrl: e.pic || i,
          success: function () {
            if (e.success && e.success instanceof Function) e.success();
          },
          cancel: function () {
            if (e.cancel && e.cancel instanceof Function) e.cancel();
          },
        });
        n.onMenuShareQZone({
          title: e.title || o,
          desc: e.description || '',
          link: e.url || r,
          imgUrl: e.pic || i,
          success: function () {
            if (e.success && e.success instanceof Function) e.success();
          },
          cancel: function () {
            if (e.cancel && e.cancel instanceof Function) e.cancel();
          },
        });
        a.appShareData = {
          title: e.title || o,
          description: e.description || '',
          pic: e.pic || i,
          weiboDesc: e.description || '',
          weiboPic: e.pic || i,
          url: e.url || r,
          type: 1,
          shareContentType: 0,
          shareChannelLimit: [],
        };
        a.shareData = {
          imgUrl: e.pic || i,
          timeLineLink: e.url || r,
          sendFriendLink: e.url || r,
          weiboLink: e.url || r,
          tTitle: e.title || o,
          tContent: e.description || '',
          fTitle: e.title || o,
          fContent: e.description || '',
          wContent: e.description || '',
        };
      }
    };
    s._$isMiniProgram = function () {
      return 'miniprogram' === a.__wxjs_environment;
    };
    return s;
  },
  'beec6201069596ecb83a09e5fc3eb415',
  '14dc9cba21bfd75d66618e3546573375',
  '93828627ddb358ed890cb65967a0c1de',
  '77140f4f8e949dd8d942877d5e3e1f57',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  'f051aeae7bb889518ead30ef6e491df3',
);
