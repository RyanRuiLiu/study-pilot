EDU(
  '8e512f00db1546b056c792b6703e89ce',
  function (e, t, n, i) {
    return e.$extends({
      config: function () {
        t.extend(this.data, {
          autoHeight: !1,
          initHeight: 28,
          remainType: 1,
          state: '',
          message: '',
        });
        this.data.height = this.data.initHeight;
        this.calcuteRemain();
        this.$watch('value', function (e) {
          if (e && e.length > 0) this.calcuteRemain();
        });
        this.supr();
      },
      init: function () {
        this.supr();
        if (this.data.autoHeight)
          i._$addEvent(
            this.$refs.input,
            'input',
            function (e) {
              if (e.target.currentStyle) this.data.height = +this.data.initHeight;
              else {
                this.data.height = 0;
                this.$update();
                this.data.height = e.target.scrollHeight + 2;
                e.stopPropagation();
              }
              this.$update();
            }._$bind(this),
          );
      },
      calcuteRemain: function () {
        if (!this.data.value) return this.data.maxInput;
        if (1 === this.data.remainType)
          this.data.remain = this.data.maxInput - this.data.value.trim().length;
        else if (2 === this.data.remainType) {
          var e = Math.ceil(n._$getStringLength(this.data.value.trim()) / 2);
          this.data.remain = this.data.maxInput - e;
        }
      },
      oninput: function (e) {
        this.supr(e);
      },
    });
  },
  'b51c56f3765b7d23c55082be643126fd',
  '217dcfc103efb36d2f192eecc4548797',
  '7af1d8adfbbd073e9119142538a22e8e',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
