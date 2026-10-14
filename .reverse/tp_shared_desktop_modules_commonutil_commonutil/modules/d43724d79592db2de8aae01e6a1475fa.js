EDU(
  'd43724d79592db2de8aae01e6a1475fa',
  function (e, t, i, n, a, o, s, _, r, c, d, l, u, h, f, p) {
    function E(e, t) {
      if (!t) t = window.location.href;
      e = e.replace(/[\[\]]/g, '\\$&');
      var i = new RegExp('[?&]' + e + '(=([^&#]*)|&|#|$)'),
        n = i.exec(t);
      if (!n) return null;
      if (!n[2]) return '';
      else return decodeURIComponent(n[2].replace(/\+/g, ' '));
    }
    function b() {
      if (window.webUser)
        if (webUser && webUser.schoolId)
          e._$getSchoolConfig({ schoolId: webUser.schoolId }, function (e) {
            var t = '/mooc/main/spoc/entry';
            var i = '/spoc/university.htm?schoolId=' + window.webUser.schoolId;
            var n = document.querySelector('#mySchoolCloud');
            if (n) {
              window.supportBifrost = 1 === e.supportBifrost;
              n.href = window.supportBifrost ? t : i;
            }
          });
    }
    function g(e, t) {
      if (e) return getComputedStyle(e) ? getComputedStyle(e)[t] : e.currentStyle[t];
      else return '';
    }
    var m = window,
      O = NEJ.O,
      T = NEJ.P('nej.e'),
      S = NEJ.P('nej.v'),
      U = NEJ.P('nej.u'),
      v = NEJ.P('edu.m'),
      A = NEJ.P('edu.d'),
      D = NEJ.P('edu.u'),
      y,
      $,
      w = { BIND_PHONE_MODAL_NOT_SHOWN_COOKIE_NAME: 'bpmns' };
    v._$$CommonUtil = NEJ.C();
    y = v._$$CommonUtil._$extend(v._$$Module, !0);
    $ = v._$$CommonUtil._$supro;
    b();
    !(function () {
      function e() {
        var e = new URLSearchParams(window.location.search);
        var t = e.get('appId');
        var i = ['e04a1975848683a1b16ec6aa2e19a861', '8407ae1b8ec74b381f99c53af62a9364'];
        return i.includes(t);
      }
      function t() {
        var e = document.querySelector('#spocNav');
        if (e) e.style.display = 'none';
        var t = document.querySelector('.u-navVocation-container');
        if (t) t.style.display = 'none';
        var i = document.querySelector('#web-nav-container');
        var n = document.querySelector('#g-container');
        if (!i && n) {
          i = document.createElement('div');
          i.id = 'web-nav-container';
          i.style.position = 'sticky';
          i.style.zIndex = '999';
          i.style.top = '0';
          i.style.width = '100%';
          n.insertBefore(i, n.firstChild);
        }
      }
      function i() {
        var e = new URLSearchParams(window.location.search);
        var t = e.get('appId');
        if (t) {
          var i = function (e) {
            try {
              var i = window.location.origin;
              var n = new URL(e, i);
              if (n.host !== window.location.host) return e;
              if (!n.searchParams.has('appId')) n.searchParams.set('appId', t);
              return n.href;
            } catch (a) {
              return e;
            }
          };
          var n = history.pushState;
          var a = history.replaceState;
          history.pushState = function (e, t, a) {
            var o = i(a);
            return n.call(this, e, t, o);
          };
          history.replaceState = function (e, t, n) {
            var o = i(n);
            return a.call(this, e, t, o);
          };
          document.addEventListener(
            'click',
            function (e) {
              var t = e.target.closest('a');
              if (t) {
                var n = t.getAttribute('href');
                if (n && !n.includes('appId=')) t.href = i(n);
              }
            },
            !0,
          );
          var o = window.open;
          window.open = function (e, t, n) {
            return o(i(e), t, n);
          };
        }
      }
      function n() {
        var e = document.querySelector('.u-navVocation-container');
        if (e) e.style.display = 'block';
      }
      function a() {
        var e = document.querySelector('#j-moocFooterInfo');
        var t = document.querySelector('#j-footer');
        if (e) e.style.display = 'none';
        if (t) t.style.display = 'none';
      }
      function o() {
        var e = document.querySelector('#j-moocFooterInfo');
        if (e) e.style.display = 'block';
      }
      try {
        if (e()) {
          t();
          a();
          i();
        } else {
          n();
          o();
        }
      } catch (s) {
        n();
      }
    })();
    y.__onShow = function (e) {
      e = e || {};
      this.__injectReactMoocHeader();
      $.__onShow.apply(this, arguments);
      var t = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (t && location.href.indexOf('loginSuccessCbReturnUrl=') > -1) {
        var i = E('loginSuccessCbReturnUrl', location.href);
        if (i) location.href = p._$b642str(i);
      } else {
        this.__charUtil = new v._$$CharasetUtil();
        this.__commonCache = new A._$$COM_Cache_commonCache();
        if (m.webUser) this.campusLoginCb();
        if (!this.__dealWithInit) {
          var a = T._$get('j-topnav');
          var o = T._$getByClassName(document.body, 'navLoginBtn');
          o.forEach(
            function (e) {
              this.__handleLogin(e);
            }._$bind(this),
          );
          var s = T._$getByClassName(document.body, 'j-nav-info-box');
          s.forEach(
            function (e) {
              this.__handleInfoBox(e);
            }._$bind(this),
          );
          this.__uhref = T._$getByClassName(a, 'j-uhref');
          this.__imgTag = T._$get('my-img');
          this.__dealWithPersonLink();
          if (
            e.target &&
            '/snsSpread' != e.target &&
            e.target.indexOf('/learn') < 0 &&
            e.target.indexOf('/live') < 0 &&
            !D._$isMobile() &&
            !D._$isWap() &&
            window.location.href.indexOf('/live') < 0 &&
            !/scholarship2017/.test(window.location.pathname)
          )
            if (f.isCh()) this.__scrollTop = D._$$ScrollTop2._$allocate({ parent: document.body });
          m.activityNotEnd = !1;
          var d = T._$getByClassName(document.body, ' j-nav-CateBox');
          d.forEach(
            function (e) {
              this.__handleCateNavBox(e);
            }._$bind(this),
          );
          setTimeout(
            function () {
              this.__handleMultiLineEllipsis();
              this.__injectRightBottomAiMoocEntry();
            }._$bind(this),
            300,
          );
          this.__topLinkHandler();
          this.__setEduEditorOpt();
          this.__initHoverOnCourse();
          this.__dealWithInit = !0;
          if (D._$isWap() && 'undefined' != typeof window.wx && window.wx) {
            this.__commonCache._$wxGetTicket(m.location.href.split('#')[0]);
            this.__commonCache._$addEvent('onWxGetTicket', this.__initWXJSShare._$bind(this));
          }
          D.__initLogoAndActivity();
          var l = !f.isCh();
          var u =
            '1' !== c._$cookie(w.BIND_PHONE_MODAL_NOT_SHOWN_COOKIE_NAME) &&
            !!window.webUser &&
            window.__phoneAccountFunctionalitiesSwitch &&
            !l;
          var h = this.__handleOnCloseBindPhoneModal._$bind(this);
          if (u)
            n._$getDgSchoolList(
              function (e) {
                try {
                  var t = JSON.parse(e);
                  if (t.length && t.indexOf(Number(window.webUser.schoolId)) > -1) {
                    window.isDgSchool = !0;
                    u = !1;
                  } else
                    n._$getPhoneBindPopupStatus({}, function (e) {
                      if (e) {
                        var t = r.thirdBindUtil()._$open(_.LOGINTYPE.PHONE);
                        t && t.$on('ok', h).$on('cancel', h).$on('close', h);
                      }
                    });
                } catch (i) {}
              }._$bind(this),
            );
        }
      }
    };
    y.campusLoginCb = function () {
      try {
        var e = sessionStorage.getItem('campus_login_first_success_params');
        if (e) {
          this.__commonCache._$memberVerify(JSON.parse(e), function (e) {
            if (e && e['1']);
            else console.log('认证失败');
          });
          sessionStorage.removeItem('campus_login_first_success_params');
        }
      } catch (t) {}
    };
    y.__initHoverOnCourse = function () {
      var e = (function () {
        var e, t;
        return function (i, n) {
          e = e || n.querySelector('.channel-panel');
          clearTimeout(t);
          var a = 'mouseenter' === i.type;
          if (a) e.style.display = 'block';
          else
            t = setTimeout(
              function () {
                e.style.display = 'none';
              }._$bind(this),
              300,
            );
        };
      })();
      var t = document.querySelector('.u-navLogin-course');
      if (t) {
        new o({}).$inject('.u-navLogin-course');
        t.addEventListener('mouseenter', function (i) {
          e(i, t);
        });
        t.addEventListener('mouseleave', function (i) {
          e(i, t);
        });
      }
    };
    y.__handleOnCloseBindPhoneModal = function () {
      c._$cookie(w.BIND_PHONE_MODAL_NOT_SHOWN_COOKIE_NAME, { path: '/', expires: 1e3, value: '1' });
    };
    y.__handleLogin = function (e) {
      if (e) {
        var i = e.innerText;
        if (i != t.KEY_SHARED_DESKTOP_SWITCH_ACCOUNT)
          S._$addEvent(e, 'click', this.__gotoLoginHandle._$bind(this));
        else
          e.href = m.urlPrefix.logoutPrefix + '?returnUrl=' + U._$str2b64(D._$getDecodeCurUrl({}));
      }
    };
    y.__handleCateNavBox = function (e) {};
    y.__handleMultiLineEllipsis = function () {
      var e = 0;
      var t = 0;
      for (var i = 2; i < 5; i++) {
        var n = T._$getByClassName(document.body, 'f-' + i + 'lines');
        if (n.length)
          for (var a = 0; a < n.length; a++) {
            var o = n[a];
            e = parseInt(g(o, 'lineHeight'));
            if ('auto' == g(o, 'height')) {
              o.parentElement.style.height = 'auto';
              t = parseInt(g(o.parentElement, 'height'));
            } else t = parseInt(g(o, 'height'));
            if (t > i * e)
              o.innerText = o.innerText.substr(0, (o.innerText.length * i * e) / t - 1) + '...';
          }
        else;
      }
    };
    y.__handleInfoBox = function (e) {
      if (!window.isCustomThirdPartyVisiting) {
        if (m.cert_owner && e) D._$showNode(T._$getByClassName(e, 'j-cert-card')[0]);
        if (T._$getChildren(e).length) {
          var i = T._$getByClassName(e, 'j-nav-set')[0];
          S._$addEvent(e, 'mouseover', this.__navHandle._$bind(this, !0, i));
          S._$addEvent(e, 'mouseout', this.__navHandle._$bind(this, !1, i));
          if (D._$hasMemberRole(D.CONST.ROLE_OUT_SUPER_ADMIN))
            D._$showNode(T._$getByClassName(i, 'j-partner-man')[0]);
          if (D._$hasMemberRole(D.CONST.ROLE_SCHOOLPOSTGRADEXAM_ADMIN))
            D._$showNode(T._$getByClassName(i, 'j-postgrade-man')[0]);
          if (
            D._$hasMemberRole(D.CONST.ROLE_OUT_BUSINESS_EDITOR) ||
            D._$hasMemberRole(D.CONST.ROLE_OUT_COURSE_EDITOR) ||
            D._$hasMemberRole(D.CONST.ROLE_OUT_COURSE_REVIEWER) ||
            D._$hasMemberRole(D.CONST.ROLE_OUT_ORDINARY_EDITOR)
          ) {
            var n = T._$getByClassName(i, 'j-editor-man')[0];
            var a = T._$getByClassName(n, 'j-editor-txt')[0];
            D._$showNode(n);
            if (D._$hasMemberRole(D.CONST.ROLE_OUT_BUSINESS_EDITOR))
              a.innerText = t.KEY_SHARED_DESKTOP_ROLE_MARKET_EDITOR;
            else if (
              D._$hasMemberRole(D.CONST.ROLE_OUT_COURSE_EDITOR) ||
              D._$hasMemberRole(D.CONST.ROLE_OUT_ORDINARY_EDITOR)
            )
              a.innerText = t.KEY_SHARED_DESKTOP_ROLE_COURSE_EDITOR;
            else if (D._$hasMemberRole(D.CONST.ROLE_OUT_COURSE_REVIEWER))
              a.innerText = t.KEY_SHARED_DESKTOP_ROLE_COURSE_CHECK;
          }
          if (
            D._$hasMemberRole(D.CONST.ROLE_SCHOOLSUPER_ADMIN) ||
            D._$hasMemberRole(D.CONST.ROLE_SCHOOLNORMAL_ADMIN) ||
            D._$hasMemberRole(D.CONST.ROLE_SCHOOLNORMAL_ADMIN_SELF)
          )
            !(function () {
              var e = T._$getByClassName(i, 'j-school-man')[0];
              D._$showNode(e);
              if (
                /appId=1fe22d51cfc678903b998c16daba2d5c/.test(window.location.search) &&
                e.children[0]
              )
                e.children[0].innerText = t.KEY_SHARED_DESKTOP_ROLE_ORG_MANAGE_BKG;
            })();
          if (D._$hasMemberRole(D.CONST.ROLE_REGION_ADMIN))
            !(function () {
              var e = T._$getByClassName(i, 'j-region-man')[0];
              D._$showNode(e);
            })();
          if (
            D._$hasMemberRole(D.CONST.ROLE_COLUMNIST) ||
            D._$hasMemberRole(D.CONST.ROLE_COLUMN_ASSISTANT)
          )
            if (D._$hasMemberRole(D.CONST.ROLE_COLUMNIST));
          if (
            D._$hasMemberRole(D.CONST.ROLE_LECTOR) ||
            D._$hasMemberRole(D.CONST.ROLE_SCHOOLPOSTGRADEXAM_LECTOR) ||
            D._$hasMemberRole(D.CONST.ROLE_ASSISTANT) ||
            D._$hasMemberRole(D.CONST.ROLE_COLUMNIST) ||
            D._$hasMemberRole(D.CONST.ROLE_COLUMN_ASSISTANT)
          )
            D._$showNode(T._$getByClassName(i, 'j-teacher-man')[0]);
          if (
            D._$hasMemberRole(D.CONST.ROLE_LECTOR) ||
            D._$hasMemberRole(D.CONST.ROLE_SCHOOLPOSTGRADEXAM_LECTOR)
          ) {
            m.showTeachLink = !0;
            D._$showNode(T._$getByClassName(i, 'j-teacher-main')[0]);
          }
          if (D._$hasMemberRole(D.CONST.ROLE_SCHOOLPOSTGRADEXAM_LECTOR));
          if (D._$hasMemberRole(D.CONST.ROLE_BSITE_ADMIN))
            D._$showNode(T._$getByClassName(i, 'j-bsite')[0]);
          if (
            D._$hasMemberRole(D.CONST.ROLE_SCHOOLPOSTGRADEXAM_LECTOR) ||
            D._$hasMemberRole(D.CONST.ROLE_COLUMNIST)
          )
            D._$showNode(T._$getByClassName(i, 'j-order-service')[0]);
          if (m.webUser.roles && m.webUser.roles.indexOf('lector') == -1)
            this.__commonCache._$hasOfflineClassroom(
              function (e) {
                if (e) D._$showNode(T._$getByClassName(i, 'j-offline-nonteacher-entry')[0]);
              }._$bind(this),
            );
        }
      }
    };
    y.__injectReactMoocHeader = function () {
      var e = 'MainHeader';
      var t = document.getElementById('web-nav-container');
      var i = window.termDto && 30 == window.termDto.mode;
      var n = location.href.includes('/learn');
      String.prototype.replace = window.moocTempReplace;
      String.prototype.match = window.moocTempMatch || window.moocTempReplace1;
      if (window.renderReactComponent && window.renderReactComponent[e] && t) {
        var a = window.renderReactComponent[e];
        window.renderReactComponent.render(a.component, a.initialState, t);
      } else if (t) {
        var o = (window.courseDto && window.courseDto.schoolPanel) || {};
        window.reactComponentLoadBootstrap.init(
          { name: e, container: t },
          {
            isRooc: i,
            webUser: window.webUser || {},
            schoolDto: window.schoolDto || o || {},
            fullWidth: n,
          },
        );
      }
    };
    y.__injectRightBottomAiMoocEntry = function () {
      var e = 'RightBottomAiMoocEntry';
      var t = document.querySelector('#j-reactInjectAiMoocEntry');
      if (t) {
        String.prototype.replace = window.moocTempReplace;
        String.prototype.match = window.moocTempMatch || window.moocTempReplace1;
        window.reactComponentLoadBootstrap.setFtlData({ nowPageUrl: window.location.href });
        if (window.renderReactComponent && window.renderReactComponent[e]) {
          var i = window.renderReactComponent[e];
          i.render(i.component, i.initialState, t);
        } else
          window.reactComponentLoadBootstrap.init(
            { name: e, container: t },
            {},
            {
              loadSuccessCb: function () {
                this.__injectRightBottomAiMoocEntry();
              }._$bind(this),
            },
          );
      }
    };
    y.__initWXJSShare = function (e) {
      if (e)
        if (window.wx)
          window.wx.config({
            debug: !1,
            appId: 'wx72345eb11caa176e',
            timestamp: e.timestamp,
            nonceStr: e.nonceStr,
            signature: e.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
            openTagList: ['wx-open-launch-app'],
          });
    };
    y.__initRecruit = function () {
      this.__recruitBtn = T._$get('j-recruitBtn');
      if (this.__recruitBtn)
        S._$addEvent(
          this.__recruitBtn,
          'click',
          function () {
            D._$$RecruitDialog._$showDialog({});
          }._$bind(this),
        );
    };
    y.__topLinkHandler = function () {
      this.__cloudClassLink = T._$get('j-goCloudClass');
      this.__cloudClassLink1 = T._$get('j-goCloudClass1');
      this.__goIcourse = T._$get('j-goIcourse');
      this.__goIcourse1 = T._$get('j-goIcourse1');
      this.__youdaoKaoyan = T._$get('navYDKaoyan');
      S._$addEvent(
        this.__cloudClassLink,
        'click',
        function () {
          D._$trackEvent('cloudlink', 'click', 'right');
        }._$bind(this),
      );
      S._$addEvent(
        this.__cloudClassLink1,
        'click',
        function () {
          D._$trackEvent('cloudlink', 'click', 'left');
        }._$bind(this),
      );
      S._$addEvent(
        this.__goIcourse,
        'click',
        function () {
          D._$trackEvent('icourselink', 'click', 'right');
        }._$bind(this),
      );
      S._$addEvent(
        this.__goIcourse1,
        'click',
        function () {
          D._$trackEvent('icourselink', 'click', 'left');
        }._$bind(this),
      );
      S._$addEvent(
        this.__youdaoKaoyan,
        'click',
        function () {
          window.DATracker &&
            window.DATracker.track('主导航-升学考研点击-iaw', {
              user_id: window.webUser ? window.webUser.id : '',
              pagename: 'kaoyan',
            });
        }._$bind(this),
      );
    };
    y.__dealWithPersonLink = function () {
      if (this.__uhref)
        U._$forEach(this.__uhref, function (e) {
          e.href = U._$escape(D._$getMyCenterURL());
        });
    };
    y.__onMessage = function (e) {
      var t = (e || O).data || O;
      switch (t.action) {
        case 'updatedInfo':
          this.__updateInfo(t.infoData);
          this.__dealWithPersonLink();
      }
    };
    y.__updateInfo = function (e) {
      if (e && m.webUser) {
        if (e.nickName) m.webUser.nickName = e.nickName;
        if (e.smallFaceUrl) m.webUser.smallFaceUrl = e.smallFaceUrl;
        if (e.largeFaceUrl) m.webUser.largeFaceUrl = e.largeFaceUrl;
        if (e.personalUrlSuffix) m.webUser.personalUrlSuffix = e.personalUrlSuffix;
        if (this.__imgTag && m.webUser.smallFaceUrl) this.__imgTag.src = m.webUser.smallFaceUrl;
      }
    };
    y.__gotoLoginHandle = function () {
      if (D._$isWap())
        window.location.href =
          m.moocHref +
          m.urlPrefix.loginPrefix +
          '?returnUrl=' +
          U._$str2b64(D._$getDecodeCurUrl({}));
      else {
        var e = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (e && 'www.icourse163.cn' === location.hostname) {
          var t = '/' == location.pathname ? 'https://www.icourse163.org' : location.href;
          location.href = 'https://www.icourse163.org/member/login.htm?returnUrl=' + p._$str2b64(t);
          return;
        }
        if ('/member/login.htm' === location.pathname)
          D._$$LoginDialog._$showLogin({ from: 'navi' });
        var i = /icourse163\.org\/course/g;
        var n = /chrome\/([\d\.]+)/g;
        if (
          'http:' === location.protocol &&
          i.test(location.href) &&
          n.test(navigator.userAgent.toLowerCase())
        ) {
          var a = '/member/login.htm?returnUrl=' + p._$str2b64(location.href);
          location.href = a;
          return;
        }
        D._$$LoginDialog._$showLogin({ from: 'navi' });
      }
    };
    y.__navHandle = function (e, t, i) {
      S._$stop(i);
      if (e) {
        if (this.__timer) this.__timer = clearTimeout(this.__timer);
        D._$showNode(t);
      } else
        this.__timer = m.setTimeout(
          function () {
            D._$hiddenNode(t);
          }._$bind(this),
          200,
        );
    };
    y.__setEduEditorOpt = function () {
      m.eduEditor_options = U._$merge(m.eduEditor_options || {}, {
        showLoadingFn: D.showLoading,
        hideLoadingFn: D.hideLoading,
        autoHeightEnabled: !0,
      });
    };
    y.__onHide = function () {
      if (this.__scrollTop) this.__scrollTop = D._$$ScrollTop2._$recycle(this.__scrollTop);
      $.__onHide.apply(this, arguments);
    };
    if (m.dispatcher) m.dispatcher._$loaded(D.umi('commonutil'), v._$$CommonUtil);
    return v._$$CommonUtil;
  },
  '3849f5eb84c389c7316cc900fb9cda78',
  'ff86782b505dd009231ed4954ea018f5',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'c30079064832c51159d1cf37ab222277',
  'd414623f7407e577cd6c05efff08e96f',
  'a780ef675686a51d7f3ecd22b899b1e4',
  '709a1ca4461db8be476800647eb950cf',
  '93828627ddb358ed890cb65967a0c1de',
  'c1a44a564863a56b7daf00b04a3f7c26',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  '8fb79401f5c080e87a0d5e25ee0cd608',
  '163e8fd26158a329dc0b2d60ce4fd6b8',
  '272af5852d94b7b40065909c2e324537',
  'b0fe8868b75bec6e96e9133ab916d817',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  'c23a9d4e237326dadfa12366ae1b6e48',
  'cc26d5920093e9742f0feca3855e8e68',
  'fb80274a93905bc7807baceaedc07c15',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  '02c14b544f21e379de73ba82b326d2a9',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '682eb3959b27312ff66688573dd64e00',
  '678f74e81cf8355bfe95ad6575235cfc',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '3d0ef2065032d4e6025d2a25bafd35f8',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  'fd2d304e0f3ed379c890a0e85b358838',
  'af2a7901f01e5083a1fb1f6d4a673974',
  'de71aaa4f77ef1f13ed8ee8014eef1b1',
  '493607ab361630ca82fc5bf094051616',
  'bf8d09e46d2369efd6e41b29fe211330',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'c23a9d4e237326dadfa12366ae1b6e48',
  'fe86216ed59e3103a56c42c850d389f0',
  '1b284280ad407af1a8993da91f6d7952',
  '8d118aed500eb8c7b91ad835708628c5',
);
