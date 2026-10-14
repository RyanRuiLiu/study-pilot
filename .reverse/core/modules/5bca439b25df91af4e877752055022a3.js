EDU(
  '5bca439b25df91af4e877752055022a3',
  function (e, t, n, i, o) {
    var a = window;
    var r = e.$extends({
      config: function () {
        this._flushSetting(o, i);
        t.extend(this, {});
        t.extend(this.data, {});
        this.supr();
      },
      init: function () {
        this.supr();
      },
      changeStatus: function (e) {
        this.$emit('changeStatus', e);
      },
      destroy: function () {
        this.supr();
      },
    });
    return r;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '8f34a99b20d362b3542aebd517390fc1',
  '12615895933a003e03ff8643dc0b0f84',
  'f25c65433c9a312ccdd3c59ceffdcdf1',
  'fdbf7847b4dc8342906409015fcc743c',
  '6306958da9f9751233a5201ac9cd4691',
);
