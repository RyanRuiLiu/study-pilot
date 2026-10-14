EDU(
  'b516785709eb028a7438c7fb930dc640',
  function (e, t, n, i) {
    e = t.mixinExtendsWithTheming(e);
    i = e.$extendsWithTheming({
      name: 'success-modal',
      config: function () {
        n.extend(this.data, {
          showShare: !1,
          shareTitle: '',
          shareDesc: '',
          shareUrl: '',
          sharePic: '',
          shareTopic: '中国大学MOOC',
        });
        this.supr();
      },
      init: function () {
        this.supr();
        this.data.isEn = window.currentLanguage;
        this.$update();
      },
      handleOnShare: function (e) {
        this.$emit('share', e);
      },
    });
    return i;
  },
  'd414623f7407e577cd6c05efff08e96f',
  'a542ca25f068f41ad74799af47ad699d',
  '217dcfc103efb36d2f192eecc4548797',
);
