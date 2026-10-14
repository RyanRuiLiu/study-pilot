EDU(
  '2334d2d972df9316ff24a1d267677759',
  function (e, t, n, i, o) {
    return e.$extends({
      name: 'ux-component-modal-slideModal',
      css: n,
      template: t,
      config: function () {
        i.extend(this, { animationTime: 200 });
        i.extend(this.data, { hasToggleBtn: !0, isContainerOverflowHidden: !0 });
        this.supr();
      },
      init: function () {
        this.supr();
        if (this.data.visible) this.show();
      },
      toggle: function () {
        if (this.data.visible) this.hide();
        else this.show();
      },
      $inject: function (e) {
        if ('string' == typeof e) e = document.querySelector(e);
        if ('static' == o._$getStyle(e, 'position')) o._$style(e, { position: 'relative' });
        if (this.data.isContainerOverflowHidden)
          if ('visible' == o._$getStyle(e, 'overflow')) o._$style(e, { overflow: 'hidden' });
        return this.supr(e);
      },
    });
  },
  '516d81fc0fe9e695c8e9c36e27f51066',
  'ae3c1f8bf7a436af80c6fd95f3e56020',
  'a3f370baeea30d540921f3d6084096e8',
  '217dcfc103efb36d2f192eecc4548797',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
