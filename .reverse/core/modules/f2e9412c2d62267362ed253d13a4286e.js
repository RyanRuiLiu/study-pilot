EDU(
  'f2e9412c2d62267362ed253d13a4286e',
  function (e, t) {
    var n = {
      disabled: 'th-bk-disable',
      primary: 'th-bk-main',
      warning: 'th-bk-error-gh',
      gh: 'th-bk-main-gh',
      buy: 'th-bk-help2',
      info: 'th-bk-help1',
      error: 'th-bk-error',
      deny: 'th-bk-error-gh',
    };
    var i = e.$extends({
      computed: {
        stateClazz: {
          get: function () {
            return n[this.data.state];
          },
        },
      },
      config: function () {
        t.extend(this, { settingKey: 'component-button' });
        t.extend(this.data, {
          state: 'primary',
          size: '',
          width: '',
          value: '',
          class: '',
          log: {},
        });
        this.supr();
      },
      init: function () {
        this.supr();
      },
      destroy: function () {
        this.supr();
      },
      click: function (e) {
        if ('disabled' != this.data.state) this.$emit('click', e);
      },
    });
    return i;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
);
