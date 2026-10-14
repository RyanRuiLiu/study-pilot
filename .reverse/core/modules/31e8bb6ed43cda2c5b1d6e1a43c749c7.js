EDU(
  '31e8bb6ed43cda2c5b1d6e1a43c749c7',
  function (e, t) {
    var n = e.$extends({
      config: function (e) {
        t.extend(this.data, { txt: '暂无数据', padding: 80 });
        this.supr();
      },
      init: function () {
        this.supr();
      },
      destroy: function () {
        this.supr();
      },
    });
    return n;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
);
