EDU(
  'cba1a34d557181f80d15c9e3e6057ce2',
  function () {
    var e = window,
      t = NEJ.P('nej.ut'),
      n = NEJ.P('nej.e'),
      i = NEJ.P('edu.u'),
      o = i.MOBILE_LOGIN_FORM_CSS;
    i._$$CPLoginForm = NEJ.C();
    var a = i._$$CPLoginForm.prototype;
    a.__init = function (e) {
      var t;
      if (e && e.includeBox) t = e.includeBox;
      t = t || 'cplogin-box';
      var i = n._$dataset(t, 'inst');
      if (!i) {
        var a = {
          newCDN: 1,
          version: 3,
          product: 'imooc',
          promark: 'cjJVGQM',
          host: 'www.icourse163.org',
          cookieDomain: 'icourse163.org',
          productKey: '8infaddo36mtuzseml0wohs6omu4v5lo',
          swidth: 360,
          page: 'login',
          single: 0,
          isHttps: 0 == location.protocol.indexOf('https') ? 1 : 0,
          regCookieDomain: 'icourse163.org',
          mode: 'popup',
          customStyles: {
            imagePanel: { align: 'top', height: '100px' },
            controlBar: { height: '34px' },
            gap: '10px',
          },
          capPadding: 22,
          capBarHeight: 20,
          lang: 'zh-CN',
          initReady: function () {
            n._$get('cplogin-box').style.height = 'auto';
          },
          lockConfig: {
            loginLockTxt: '正在登陆',
            regLockTxt: '请稍等',
            loginLockTxtMb: '正在登陆',
            regLockTxtMb: '请稍等',
          },
          skin: 4,
          frameSize: { width: '333', height: '333' },
          needMobileLogin: 1,
          needMobileReg: 1,
          mobileFirst: 1,
          needUnLogin: 1,
          defaultUnLogin: 1,
          unLoginText: '10天免登录',
          mobileUnLoginTimeTxt: '10天免登录',
          mobileUnLoginTime: 10,
          mobileDefaultUnLogin: 1,
          smsLoginFirst: 1,
          smsBtnTxt: '登录',
          mbBtnTxt: '登录',
          needEye: 1,
          regcb: function (e) {
            console.log(e);
          },
          logincb: function (e, t, n) {
            try {
              console.log('用户名:' + e);
              console.log('是否第三方登录:' + t);
              console.log('data', n);
            } catch (i) {
              console.log('error');
            }
            window.refresh(e, t);
          },
          style: o,
        };
        var r = {};
        NEJ.copy(r, a);
        NEJ.copy(r, e || {});
        this.__inst = new URS(r);
        n._$dataset(t, 'inst', this.__inst);
      } else this.__inst = i;
    };
  },
  'fb58975909c7fb265894aa7d5e5a9c3d',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
