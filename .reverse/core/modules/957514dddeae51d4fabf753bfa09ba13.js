EDU(
  '957514dddeae51d4fabf753bfa09ba13',
  function (e, t, n, i, o, a) {
    a = n.$extends({
      name: 'ux-mooc-comment-base',
      config: function () {
        i.extend({
          themeColorPrimary: o.getComponentSetting('theme-color-primary'),
          themeColorAction: o.getComponentSetting('theme-color-highlight'),
          gaCategory: '',
        });
        this.supr();
      },
      init: function () {
        this.supr();
      },
    });
    o.mixinExtendsWithTheming(a);
    return a;
  },
  'f2fa6d97b209372e620db24ca0a3dedf',
  'fe86216ed59e3103a56c42c850d389f0',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'a542ca25f068f41ad74799af47ad699d',
);
