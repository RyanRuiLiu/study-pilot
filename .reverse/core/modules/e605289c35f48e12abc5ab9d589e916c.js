EDU(
  'e605289c35f48e12abc5ab9d589e916c',
  function (e) {
    var t = e.$extends({
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
      changeStatus: function (e) {
        this.$emit('tabchange', e);
      },
    });
    return t;
  },
  '235c21779ec98ac90606962a862dadc9',
  '8987a4022d55d952e46b2110a35e42a0',
);
