EDU(
  '14dc9cba21bfd75d66618e3546573375',
  function (e, t, n, i, o, a) {
    var r = {};
    var s = null;
    a = t.$extends({
      name: 'ux-wechat-invoke-app-overlay',
      css: i,
      template: n,
      data: {
        contentTemplate: '请点击右上角按钮，选择在<span class="red-text">“浏览器”</span>打开',
      },
      config: function () {
        this.supr();
      },
      init: function () {
        this.supr();
      },
      destroy: function () {
        this.supr();
      },
    });
    a.CONST = r;
    a.show = function (e) {
      s = new a({ data: { contentTemplate: e } }).$inject('body');
    };
    a.hide = function () {
      s && s.destroy();
      s = null;
    };
    return a;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '235c21779ec98ac90606962a862dadc9',
  'ffe6db5ed8df2ed0ca0eb47a75f0d881',
  'cd517436750dcba6feb01aafec93ef24',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
