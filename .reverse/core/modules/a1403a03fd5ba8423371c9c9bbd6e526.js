EDU(
  'a1403a03fd5ba8423371c9c9bbd6e526',
  function (e, t) {
    var n = e.$extends({
      config: function () {
        t.extend(this, {});
        t.extend(this.data, {
          name: '',
          contentTemplate: '',
          pos: 0,
          textClick: !0,
          checked: !1,
          block: !1,
          disabled: !1,
          visible: !0,
          class: '',
          changeCheckedStatus: !0,
        });
        this.supr();
        this.$watch('checked', function (e, t) {
          if (void 0 !== t) this.$emit('change', { sender: this, checked: e });
        });
      },
      check: function (e) {
        if (!this.data.readonly && !this.data.disabled) {
          if (void 0 === e) e = !this.data.checked;
          if (this.data.changeCheckedStatus) this.data.checked = e;
          this.$emit('check', { sender: this, checked: e, pos: this.data.pos });
        }
      },
      clickText: function () {
        if (this.data.textClick) this.check();
        this.$emit('text', { sender: this, checked: this.data.checked, pos: this.data.pos });
      },
    });
    return n;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
);
