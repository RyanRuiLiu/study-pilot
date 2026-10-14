EDU(
  'f50b2a7d02c882d847f4967bb184dd8e',
  function (e, t, n, i, o, a, r, s, c) {
    var d = window;
    var l = e.$extends({
      config: function () {
        this._flushSetting(r, a);
        t.extend(this, {});
        t.extend(this.data, { panelType: o.panelType, type: o.panelType.LOGIN.text });
        this.supr();
      },
      init: function () {
        this.supr();
      },
      onChangeStatus: function (e) {
        this.data.type = e || o.panelType.LOGIN.text;
        this.$update();
      },
      destroy: function () {
        this.supr();
      },
    });
    return l;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '8f34a99b20d362b3542aebd517390fc1',
  '8a864b627c302d7d1c56bd928b515d1b',
  '2c5b035ed921e1d36dcc3b2c3a541b04',
  '12615895933a003e03ff8643dc0b0f84',
  'f25c65433c9a312ccdd3c59ceffdcdf1',
  '9a830f6a308feb17fe43372af2d6e799',
  'fe86216ed59e3103a56c42c850d389f0',
  '0835fdbd24a6ba253a440056d98bf766',
  '8987a4022d55d952e46b2110a35e42a0',
);
