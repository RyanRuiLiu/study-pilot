EDU(
  '8eb3b75523baf8c0377ea7a455876f93',
  function (e, t) {
    var n = e.$extends({
      config: function () {
        t.extend(this.data, {
          selected: this.data.source[0] || null,
          radioGroupId: new Date(),
          block: !1,
          rules: [],
          readonly: !1,
          visible: !0,
          disabled: !1,
          selectValidate: !0,
          class: '',
        });
        this.supr();
      },
      init: function () {
        this.supr();
      },
      select: function (e) {
        var t = this;
        if (!(this.data.readonly || this.data.disabled || e.readonly)) {
          this.data.selected = e;
          if (this.data.selectValidate)
            window.setTimeout(function () {
              t.validate();
            }, 0);
          this.$emit('select', { sender: this, selected: e });
        }
      },
      validate: function () {
        var e = this.data.seleced;
        var t = !!this.$refs.validation && this.$refs.validation.validate(e);
        return t;
      },
    });
    return n;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '76b358c87f41ecd47da41ee2ba42776f',
);
