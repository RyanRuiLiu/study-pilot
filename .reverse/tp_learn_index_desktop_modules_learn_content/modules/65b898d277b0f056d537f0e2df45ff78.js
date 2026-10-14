EDU(
  '65b898d277b0f056d537f0e2df45ff78',
  function (e, t, n) {
    var i = 'component-check-switcher';
    var o = e.$extends({
      config: function (e) {
        this._flushSetting(i, n);
        t.extend(this, { settingKey: i });
        t.extend({ status: !1, disable: !1, openText: '已开启', closeText: '已关闭' }, this.data);
        this.supr();
        this.$watch('status', this.emitStatusChange._$bind(this));
      },
      computed: {
        text: function (e) {
          if (e.status) return e.openText;
          else return e.closeText;
        },
      },
      init: function (e) {
        this.supr();
      },
      emitStatusChange: function (e) {
        if (e) this.$emit('open');
        else this.$emit('close');
      },
      toggleStatus: function () {
        if (!this.data.disable) {
          this.data.status = !this.data.status;
          this.$update();
          this.$emit('toggle', this.data.status);
        }
      },
      destroy: function () {
        this.supr();
      },
    });
    return o;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '1e48b10ef446f27504f14c515b0f3e54',
);
