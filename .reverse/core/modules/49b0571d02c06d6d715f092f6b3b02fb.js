EDU(
  '49b0571d02c06d6d715f092f6b3b02fb',
  function (e, t) {
    return e.$extends({
      name: 'ux-custom-hover',
      init: function () {
        this.supr();
      },
      config: function () {
        this.supr();
      },
      mouseenter: function () {
        var e = this;
        if (!this.list) {
          this.list = new t({
            data: { showArrow: this.data.showArrow, listClass: this.data.listClass },
            $body: this.$body,
            mouseenter: this.keepShow,
            mouseleave: this.toHide,
          }).$inject(this.data.injectNodeId);
          this.list.$on('$destroy', function () {
            e.$emit('hide');
          });
        }
        this.keepShow();
        this.updateListPosition();
        this.list.$update({
          left: this.data.pleft || this.list.data.left,
          top: this.data.ptop || this.list.data.top,
          arrLeft: this.data.arrLeft || this.list.data.arrLeft,
        });
      },
    });
  },
  '523b00ec7cac452165425c44dde82923',
  'ace913a9f3997ab521683a9d5bf5c1f0',
);
