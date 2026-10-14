EDU(
  '91abde66a98dea80478268cdfa059bca',
  function (e) {
    var t = e.$extends({
      name: 'ux-login-set-panel-pro',
      config: function () {
        this.supr();
      },
      onChangeStatus: function (e) {
        this.supr();
        this.$emit('tabchange', e);
      },
    });
    return t;
  },
  '6b668295c862ca39b16b7e62b0355197',
);
