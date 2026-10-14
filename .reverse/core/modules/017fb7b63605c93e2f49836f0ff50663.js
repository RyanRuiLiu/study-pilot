EDU(
  '017fb7b63605c93e2f49836f0ff50663',
  function (e, t) {
    return e.$extends({
      config: function () {
        t.extend(this.data, {});
        this.supr();
      },
      init: function () {
        this.supr();
      },
      onclick: function (e) {
        if (this.data.eltIE9 && e.target && null != e.target.value)
          this.data.value = e.target.value;
        this.$emit('click', this.getReturnEvent());
      },
    });
  },
  'b51c56f3765b7d23c55082be643126fd',
  '217dcfc103efb36d2f192eecc4548797',
);
