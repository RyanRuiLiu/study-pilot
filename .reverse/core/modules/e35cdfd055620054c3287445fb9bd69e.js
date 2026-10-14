EDU(
  'e35cdfd055620054c3287445fb9bd69e',
  function (e, t) {
    var n = e.$extends({
      config: function () {
        t.extend(this, {});
        t.extend(this.data, { block: !1, textClick: !0 });
        this.supr();
      },
      init: function () {
        this.supr();
      },
      doCheck: function (e) {
        var t = this;
        window.setTimeout(
          function () {
            t.validate();
            this.$emit('check', { sender: this, current: e.sender, source: this.data.source });
          }._$bind(this),
          0,
        );
      },
      doText: function (e) {
        window.setTimeout(
          function () {
            this.$emit('text', {
              sender: this,
              current: e.sender,
              pos: e.pos,
              source: this.data.source,
            });
          }._$bind(this),
          0,
        );
      },
      validate: function () {
        var e = this.data.source;
        var t = !!this.$refs.validation && this.$refs.validation.validate(e);
        return t;
      },
    });
    return n;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '430d1ce4fb5c681266bc4d4ed50214c5',
  '76b358c87f41ecd47da41ee2ba42776f',
);
