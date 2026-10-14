EDU(
  'e1a49a8a4d86714fdfcd7216296e9001',
  function (e) {
    var t = window,
      n = NEJ.F,
      i = NEJ.P('nej.j'),
      o = NEJ.P('nej.e'),
      a = NEJ.P('edu.m'),
      r = NEJ.P('nej.ut'),
      s = NEJ.P('edu.u'),
      c = s.EMAIL_LOGIN_FORM_CSS,
      d;
    a._$$LoginForm = NEJ.C();
    d = a._$$LoginForm._$extend(r._$$Event, !0);
    d.__init = function (a) {
      this.__supInit(a);
      this.__parentNode = (a || {}).parent;
      this.__loginSucessCb = (a || {}).sucessCb || n;
      this.__from = (a || {}).from || 'navi';
      this.__preFilledMail = (a || {}).preFilledMail || '';
      this.isSuccessLoad = !1;
      if (s._$isWap()) {
        var r = {
          frameSize: { width: '100%', height: 'auto' },
          cssDomain: '//cmc.stu.126.net/u/css/cms/',
          cssFiles: 'urs4moocm.css',
        };
        NEJ.EX(window.URSLoginConfig, r);
        if (!location.href.match(/oauthType=bind_authorization/))
          this.__loginSucessCb = function () {
            if (window.returnUrl) window.location.href = window.returnUrl.replace(/&amp;/g, '&');
            else window.location.href = t.moocHref;
          };
      }
      setTimeout(
        function () {
          if (!this.isSuccessLoad)
            i._$loadScript(
              '//only367.73119.35.167.38.nstool.netease.com/info.js?referer=//nstool.netease.com/info.js',
              {
                version: +new Date(),
                onload: this.doUrsUnloadError._$bind(this),
                charset: 'gbk',
                onerror: function () {},
              },
            );
        }._$bind(this),
        2e4,
      );
      t['_$needUrsBgp'] = 1;
      if ('index' == this.__from) {
        t.URSLoginConfigIndex.logincb = this.__loginSucessCb;
        t.URSLoginConfigIndex.initReady = function () {
          this.isSuccessLoad = !0;
        }._$bind(this);
        t.URSLoginConfigIndex.style = c;
        o._$get('j-ursContainerIndex').innerHTML = '';
        this.ursComponentIndex = new URS(t.URSLoginConfigIndex);
        this.ursComponentIndex.showIframe();
      } else {
        t.URSLoginConfig.includeBox = this.__parentNode;
        t.URSLoginConfig.logincb = this.__loginSucessCb;
        t.URSLoginConfig.initReady = function () {
          this.isSuccessLoad = !0;
        }._$bind(this);
        if (o._$get(this.__parentNode)) o._$get(this.__parentNode).innerHTML = '';
        t.URSLoginConfig.style = c;
        t.URSLoginConfig.needMobileLogin = 0;
        t.URSLoginConfig.needMobileReg = 0;
        t.URSLoginConfig.page = 'login';
        t.URSLoginConfig.single = 1;
        t.URSLoginConfig.mobileFirst = 1;
        var d = e._$merge({}, t.URSLoginConfig);
        if (this.__preFilledMail) d.preFilledMail = this.__preFilledMail;
        ((t.URSLoginConfig.style =
          '.m-cnt .m-unlogin .u-regbtn {display:block !important;} #login-form .loginbox #dologin { background-color: #00CC7E !important; border-radius: 2px;}'),
          (this.ursComponent = new URS(d)));
        this.ursComponent.showIframe();
      }
    };
    d.doUrsUnloadError = function () {
      var e = [
        '[ip:' + t.ip + ']',
        '[dns:' + t.dns + ']',
        '[ip_province:' + t.ip_province + ']',
        '[ip_city:' + t.ip_city + ']',
        '[ip_isp:' + t.ip_isp + ']',
        '[dns_province:' + t.dns_province + ']',
        '[dns_city:' + t.dns_city + ']',
        '[dns_isp:' + t.dns_isp + ']',
        '[res:' + t.res + ']',
        '[msg:' + t.msg + ']',
      ];
      var n = e.join('--');
      s._$trackEvent('urs登录框加载失败', 'UrsUnloadError', n);
    };
    a.bindLoginForm = function (e, t) {
      return new a._$$LoginForm(e, t);
    };
    d._$setFromWhere = function (e) {
      this.__fromWhere = e || 'otherauth';
      s._$trackEvent('login', this.__fromWhere);
    };
    d._$setCurUrl = function (e, t) {
      this.__snsNodes = e;
      this.__aftParams = t || [];
      var n = { loginOrAuthType: 0 };
      this.__thirdBindUtil = a.thirdBindUtil(n);
    };
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '7490976dda3c9b79e97f589de271d889',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '493607ab361630ca82fc5bf094051616',
  '05b537d315730cc58840ada1f88f3430',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  '73940963cbde37a0177f383a34a3cf2a',
  'c23a9d4e237326dadfa12366ae1b6e48',
  'c1a44a564863a56b7daf00b04a3f7c26',
  '9a830f6a308feb17fe43372af2d6e799',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
