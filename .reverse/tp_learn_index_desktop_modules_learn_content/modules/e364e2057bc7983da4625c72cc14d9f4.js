EDU(
  'e364e2057bc7983da4625c72cc14d9f4',
  function (e, t, n, i) {
    i = e.$extends({
      name: 'segmentMaskGuide',
      data: { hasSegment: !1, hasAnchor: !1, $$toNext: !1 },
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
        if (this.data.hasSegment || this.data.hasAnchor) {
          var e = document.querySelector('.j-unitctBox');
          e.classList.add('mask-disabled');
        }
      },
      next: function () {
        if (this.data.hasAnchor) {
          this.data.hasSegment = !1;
          this.$update();
        } else {
          var e = document.querySelector('.j-unitctBox');
          e.classList.remove('mask-disabled');
          this.destroy();
        }
      },
      close: function () {
        var e = document.querySelector('.j-unitctBox');
        e.classList.remove('mask-disabled');
        this.destroy();
      },
    });
    return i;
  },
  '235c21779ec98ac90606962a862dadc9',
  '93828627ddb358ed890cb65967a0c1de',
  '217dcfc103efb36d2f192eecc4548797',
);
