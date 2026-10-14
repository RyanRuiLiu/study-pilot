EDU(
  '5b1a46f551ade5cafa27284058ba7da2',
  function (e, t) {
    Component = e.$extends({
      name: 'um-recommend-side',
      data: {},
      config: function () {
        this.supr();
        t.extend(this.data, { class: 'um-recommend-side' });
      },
      init: function () {
        this.supr();
      },
      destroy: function () {
        this.supr();
      },
    });
    return Component;
  },
  'ebe210c8c771158d609dfded929fb0ed',
  '217dcfc103efb36d2f192eecc4548797',
);
