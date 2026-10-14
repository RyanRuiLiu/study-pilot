EDU(
  '36c8961458ceeee7ab8fe75277a705d9',
  function (e, t, n, i, o, a, r, s, c) {
    var d = window;
    var l = e.$extends({
      config: function () {
        this._flushSetting(r, a);
        t.extend(this, {});
        t.extend(this.data, {
          needIgnore: !0,
          ursCustomConfig: s._$isMobile() ? a.wapPhoneBindUrsConfig : a.phoneBindUrsConfig,
          bindPhoneData: {},
        });
        this.supr();
        this.cache = i.LoginSet._$allocate({ onbindursphone: this.onBind._$bind(this) });
      },
      init: function () {
        this.supr();
        this.getConfig();
      },
      getConfig: function () {
        var e = this;
        if (this.data.cssFiles)
          n._$merge(this.data.ursCustomConfig, { cssFiles: this.data.cssFiles });
        this.data.ursCustomConfig.uniteLogin = this.data.ursCustomConfig.uniteLogin || {};
        this.data.ursCustomConfig.uniteLogin = n._$merge(
          { isItl: 0, needClause: 0, needUnLogin: 0, loginTxt: '绑 定' },
          this.data.ursCustomConfig.uniteLogin,
        );
        this.data.ursCustomConfig = n._$merge(
          {
            mobileFirst: 1,
            page: 'login',
            single: 1,
            smsLoginFirst: 1,
            includeBox: 'j-urs-phone-bind-container',
            logincb: function () {
              e.cache.bindUrsPhone(e.data.bindPhoneData);
            },
          },
          this.data.ursCustomConfig,
        );
        this.$update();
      },
      onBind: function (e) {
        this.$emit('ursBindResult', { sender: this, data: e });
      },
      ignoreBind: function () {
        this.$emit('ignoreBind');
      },
      bindUrsPhone: function () {
        this.cache.bindUrsPhone(this.data.bindPhoneData);
      },
      destroy: function () {
        this.supr();
      },
    });
    return l;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'fe86216ed59e3103a56c42c850d389f0',
  '1ac3d882849ca60d20302d3cd356495f',
  '8f34a99b20d362b3542aebd517390fc1',
  '12615895933a003e03ff8643dc0b0f84',
  'f25c65433c9a312ccdd3c59ceffdcdf1',
  'beec6201069596ecb83a09e5fc3eb415',
  'f7025bad9c69872e3ff0e4cf05072b31',
);
