EDU(
  'fd8f8d17108e22f11f795d3fee40bac9',
  function (e, t, n, i, o, a, r) {
    var s = window;
    var c = e.$extends({
      config: function () {
        this._flushSetting(a, o);
        t.extend(this, {});
        t.extend(this.data, { ursCustomConfig: o.registConfig.ursCustomConfig });
        this.supr();
      },
      init: function () {
        this.supr();
        this.getConfig();
      },
      getConfig: function () {
        this.data.ursCustomConfig.includeBox = 'j-urs-phone-regist';
        this.data.ursCustomConfig.single = 1;
        this.data.ursCustomConfig.goMbRegTxt = '手机号注册';
        this.$update();
      },
      changeStatus: function (e) {
        this.$emit('changeStatus', e);
      },
      destroy: function () {
        this.supr();
      },
    });
    return c;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '8f34a99b20d362b3542aebd517390fc1',
  'beec6201069596ecb83a09e5fc3eb415',
  '12615895933a003e03ff8643dc0b0f84',
  'f25c65433c9a312ccdd3c59ceffdcdf1',
  'f7025bad9c69872e3ff0e4cf05072b31',
);
