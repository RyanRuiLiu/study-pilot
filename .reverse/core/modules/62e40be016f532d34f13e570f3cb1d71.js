EDU(
  '62e40be016f532d34f13e570f3cb1d71',
  function (e, t) {
    var n = e.$extends({
      config: function () {
        t.extend(this.data, { static: !1, visible: !1 });
        this.supr();
      },
      init: function () {
        this.supr();
        if (this.$root === this) this.$inject(document.body);
      },
      show: function (e) {
        if (!this.data.disabled) {
          if (e) this.data.content = e;
          this.data.visible = !0;
          this.$update();
        }
      },
      hide: function () {
        if (!this.data.disabled) {
          this.data.visible = !1;
          this.$update();
        }
      },
      destroy: function () {
        this.supr();
      },
    });
    return n;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
);
