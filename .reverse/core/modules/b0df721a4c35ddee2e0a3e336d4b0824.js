EDU(
  'b0df721a4c35ddee2e0a3e336d4b0824',
  function (e, t) {
    var n = e.$extends({
      config: function () {
        t.extend(this, {});
        t.extend(this.data, { delayTime: 2e3, node: document.body, name: '' });
        this.supr();
        this.setUIPosition();
      },
      setUIPosition: function () {
        var e = this.data.node;
        var t = e.getBoundingClientRect();
        var n = e.clientHeight,
          i = e.clientWidth;
        this.data.uiPos = { top: t.top + document.body.scrollTop + n / 3, left: t.left, width: i };
      },
      init: function () {
        this.supr();
        setTimeout(
          function () {
            this.$emit('finish');
            this.destroy();
          }._$bind(this),
          this.data.delayTime,
        );
      },
    });
    return n;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
);
