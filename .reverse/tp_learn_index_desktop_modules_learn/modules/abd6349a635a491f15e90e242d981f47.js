EDU(
  'abd6349a635a491f15e90e242d981f47',
  function (e, t, i, n) {
    var a = i.extend({
      template: t,
      config: function () {
        e.extend(this.data, { showClose: !1, lang: window.moocConfig.lang });
      },
      init: function () {},
      close: function () {
        this.destroy();
      },
      attend: function () {
        this.$emit('attend', {});
      },
      destroy: function () {
        this.supr();
      },
    });
    return a;
  },
  'ca38b7e137b28e4006cbadb343315267',
  '33e993f1c0153d9a1289992e7961b29b',
  '6f1453d31194f86271694dd0542354fe',
);
