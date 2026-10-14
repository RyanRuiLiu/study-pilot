EDU(
  '8feb0aecbf8368a0de85d101ba92f11b',
  function (e, t, n, i, o, a, r, s) {
    var c = window;
    n.batch(a);
    var d = ['urs', 'urs_cellphone', 'weixin', 'qq', 'weibo', 'renren', 'icourse'];
    var l = 'LAST_LOGIN_TYPE';
    var u = 'last-login-holder';
    var _ = ['weixin', 'qq', 'weibo', 'renren'];
    var f = e.$extends({
      config: function (e) {
        this.supr(e);
        t.extend(this.data, { type: 'login', returnUrl: '' });
        console.log('登录接受到的returnUrl', e, this.data);
        this.initDefShow();
      },
      init: function () {
        this.supr();
        var e = this.$refs.moocLoginSet.querySelectorAll('.ux-tabs-underline_hd li');
        var t = this.$refs.moocLoginSet.querySelectorAll('.third-icons a .icon');
        if (a.IS_SHOW_URS_PHONE)
          this.LAST_LOGIN_HOLDERS = {
            urs: e[1],
            urs_cellphone: e[0],
            icourse: e[2],
            qq: t[0],
            weixin: t[1],
            weibo: t[2],
            renren: t[3],
          };
        else
          this.LAST_LOGIN_HOLDERS = {
            urs: e[0],
            icourse: e[1],
            qq: t[0],
            weixin: t[1],
            weibo: t[2],
            renren: t[3],
          };
        r._$forIn(
          this.LAST_LOGIN_HOLDERS,
          function (e) {
            s._$addClassName(e, u);
          },
          this,
        );
        this.markLastLoginType();
      },
      destroy: function () {
        this.supr();
      },
      initDefShow: function () {
        var e = this._isLastQrCodeLogin();
        if (e) this.data.type = 'scanCode';
      },
      _isLastQrCodeLogin: function () {
        var e = !1;
        try {
          e = 1 == localStorage.getItem('IS_LOGIN_BY_QR_CODE');
        } catch (t) {
          console.log('localStorage not support');
        }
        return e;
      },
      onTabChange: function (e) {
        switch (e) {
          case 'register':
            this.data.type = 'register';
            break;
          case 'login':
            this.data.type = 'login';
            break;
          case 'scanCode':
            this.data.type = 'scanCode';
            break;
          default:
            this.data.type = 'login';
        }
        this.$update();
      },
      logincb: function (e, t) {
        if ('urs' == e) c.location.href = c.urlPrefix.thirdBindCallbackHref;
        else if ('logout' !== c.currentPageName)
          if (t) c.location.href = t;
          else c.location.reload();
        else c.location.href = c.moocHref;
      },
      getLastLoginType: function () {
        var e = null;
        if (c.localStorage) e = c.localStorage.getItem(l);
        var t = r._$forIn(d, function (t) {
          return t == e;
        });
        return null !== t ? d[t] : null;
      },
      makeMarker: function (e) {
        var t =
          null !==
          r._$forIn(_, function (t) {
            return t === e;
          });
        var n = document.createElement('div');
        var i = document.createElement('div');
        n.innerText = '上次登录';
        n.setAttribute('class', t ? 'tooltipx small' : 'tooltipx');
        i.setAttribute('class', 'arr');
        n.appendChild(i);
        return n;
      },
      markLastLoginType: function () {
        var e = this.getLastLoginType();
        if (e) {
          var t = this.LAST_LOGIN_HOLDERS[e];
          if (t) t.appendChild(this.makeMarker(e));
        }
      },
      setLastLoginType: function (e) {
        var t = r._$forIn(d, function (t) {
          return t == e;
        });
        if (!t) return !1;
        if (c.localStorage) localStorage.setItem(l, t);
        return !0;
      },
    });
    f.LAST_LOGIN_TYPE = l;
    return f;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '8f34a99b20d362b3542aebd517390fc1',
  '91abde66a98dea80478268cdfa059bca',
  'f8abe4ac60d70bc2c291d5ad377208a1',
  '1839c832e9f2e00b288b9726e30c0770',
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'd32d570462b6964423754c93bfbfc806',
);
