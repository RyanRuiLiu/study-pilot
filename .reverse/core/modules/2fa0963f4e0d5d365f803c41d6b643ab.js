EDU(
  '2fa0963f4e0d5d365f803c41d6b643ab',
  function (e, t, n, i, o, a) {
    var r = 'module-live-live-chat-photoview';
    var s = i.$extends({
      config: function () {
        this._flushSetting(r, o);
        n.extend(this, { settingKey: r });
        n.extend(this.data, {
          class: 'ux-module-live-live-chat-photoview',
          maskClickHide: !0,
          contentTemplate: a,
          type: '',
        });
        this.supr();
      },
      init: function () {
        this.supr();
        this.adoptNative();
      },
      adoptNative: function () {
        if ('native' === this.data.type) {
          var t = e._$getByClassName(document, 'ux-modal_dialog')[0];
          if (t.requestFullScreen) t.requestFullScreen();
          else if (t.mozRequestFullScreen) t.mozRequestFullScreen();
          else if (t.webkitRequestFullScreen) t.webkitRequestFullScreen();
        }
      },
      destroy: function () {
        this.supr();
      },
    });
    return s;
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'abe9a6b99742882e8efaadd2518b0cb2',
  'efc8956d4875a4c15f59f23aa2c73200',
  '89b2285930d16e74cda75be54a26f872',
);
