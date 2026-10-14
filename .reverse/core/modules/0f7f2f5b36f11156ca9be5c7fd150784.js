EDU(
  '0f7f2f5b36f11156ca9be5c7fd150784',
  function (e, t, n, i, o) {
    var a = window;
    var r = e.$extends({
      config: function () {
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
  'beec6201069596ecb83a09e5fc3eb415',
  'f7025bad9c69872e3ff0e4cf05072b31',
);
