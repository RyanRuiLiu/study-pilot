EDU(
  '19f4d59ac22f9fb8f4f53a14d01f6d33',
  function (e, t, n, i, o, a, r, s, c, d, l) {
    var u = window;
    var _ = e
      .$extends({
        config: function () {
          this._flushSetting(o, i);
          t.extend(this, { snsMap: i.snsConfig, snsShowConfig: i.snsShowConfig || [] });
          t.extend(this.data, { txt: '其他登录方式', snsItems: [] });
          this.supr();
        },
        init: function () {
          this.supr();
          var e;
          for (var t = 0; t < this.snsShowConfig.length; t++) {
            this.data.snsItems.push(this.snsMap[this.snsShowConfig[t]]);
            e = { sns: this.data.snsItems[t].type };
            try {
              this.data.snsItems[t].logData = JSON.stringify(e);
            } catch (n) {}
          }
          this.$update();
        },
        changeStatus: function (e) {
          this.$emit('changeStatus', e);
        },
        destroy: function () {
          this.supr();
        },
      })
      .filter({
        addParams: function (e) {
          if ('string' != typeof e)
            if (l._$isMobile()) e = e.wap;
            else e = e.web;
          if (!e) return '';
          var t = '&';
          if (e.indexOf('?') == -1) t = '?';
          var n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
          if (n) {
            var i = location.href;
            if (
              '/member/logoutResult.htm' === location.pathname ||
              '/member/login.htm' === location.pathname
            )
              i = 'https://' + location.host;
            var o =
              'https://www.icourse163.org/passport/mooc/changeEduCookies.htm?single=false&returnUrl=' +
              c._$str2b64(i);
            var a = 'https://' + location.host + '?loginSuccessCbReturnUrl=' + c._$str2b64(o);
            return e + t + 'oauthType=login&returnUrl=' + c._$str2b64(a);
          }
          return (
            e +
            t +
            'oauthType=login&returnUrl=' +
            c._$str2b64(d._$getDecodeCurUrl(e.aftParams, location.href))
          );
        },
      });
    return _;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '8f34a99b20d362b3542aebd517390fc1',
  '12615895933a003e03ff8643dc0b0f84',
  'f25c65433c9a312ccdd3c59ceffdcdf1',
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '9a830f6a308feb17fe43372af2d6e799',
  'c23a9d4e237326dadfa12366ae1b6e48',
  'fb061c769bfc74628a81f422f590544c',
  'beec6201069596ecb83a09e5fc3eb415',
);
