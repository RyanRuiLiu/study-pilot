EDU(
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  function (e, t, n, i, o) {
    var a = window,
      r = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      c = NEJ.P('edu.cms'),
      d;
    var l;
    r._$$LoginDialog = NEJ.C();
    d = r._$$LoginDialog._$extend(r._$$Window, !0);
    r._$$LoginDialog._$showLogin = function (e, t) {
      if (i.isCh())
        if (!r._$isWebViewSupportJB() || !a.YixinJSBridge)
          if (!r._$isMobileAll()) {
            if (!l) {
              l = r._$$LoginDialog._$allocate(e);
              l._$show();
            }
          } else {
            var n =
              'https://www.icourse163.org/member/login.htm?returnUrl=' +
              s._$str2b64(r._$getDecodeCurUrl(e.aftParams, t));
            location.href = n;
          }
        else
          a.YixinJSBridge.call(
            'openLoginView',
            { returnUrl: s._$str2b64(r._$getDecodeCurUrl({}, t)) },
            function () {},
          );
      else o.showLogin();
    };
    n._$getInstance()._$addEvent('showLogin', function (e) {
      r._$$LoginDialog._$showLogin(e);
    });
    r._$$LoginDialog._$hideLogin = function (e) {
      if (l) l = r._$$LoginDialog._$recycle(l);
    };
    d.__destroy = function () {
      l = null;
      if (this.__loginWrapper) this.__loginWrapper.destroy();
      this.__supDestroy();
    };
    d.__initNode = function () {
      this.__supInitNode();
    };
    d.__reset = function (e) {
      e = e || {};
      e.title = '登录***';
      e.clazz = 'u-logwin';
      e.maskClickNotHidden = !0;
      this.__supReset(e);
      this.__loginWrapper = new t({}).$inject(this.__body);
      r._$trackEvent('弹窗', 'click', '登陆弹窗');
    };
    c.showLoginDialog = r._$$LoginDialog._$showLogin;
    return r._$$LoginDialog;
  },
  'ddff3fe6a4233d567887a1921f3f1668',
  '3135d43d2ef57c987aaa4cc0e797048d',
  '44cc1afbd22c08dd5a5091b9cd6a94d8',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '1d9614326b72656510ee4a504c620d3f',
  '4a45c42fc3231760231794e7a1c4e452',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  '493607ab361630ca82fc5bf094051616',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'c23a9d4e237326dadfa12366ae1b6e48',
);
