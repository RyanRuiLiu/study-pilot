EDU(
  '332901e1e8925838b63a227a77a0b3e3',
  function (e, t) {
    var n = e.$extends({
      config: function () {
        t.extend(this, { settingKey: 'component-hover' });
        t.extend(this.data, {
          showArrow: !0,
          fade: 'on:enter;class:fade fade-in,2;on:leave;class:fade fade-out,2',
        });
        this.supr();
      },
      init: function () {
        this.supr();
      },
      destroy: function () {
        this.supr();
      },
      api: function () {},
      _api: function () {},
    });
    return n;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
);
