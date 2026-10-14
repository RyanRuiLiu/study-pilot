EDU(
  'f4a213853cffcfada160edc3d1bcce37',
  function (e, t, n) {
    return e.$extends({
      name: 'ux-input',
      template: t,
      css: n,
      ontap: function (e) {
        this.$emit('tap', this.getReturnEvent(e));
      },
    });
  },
  '017fb7b63605c93e2f49836f0ff50663',
  'dc87efc955e9ff491e27d029e1483c00',
  'f0e1efd092e1ba1abf42e430aafccd21',
);
