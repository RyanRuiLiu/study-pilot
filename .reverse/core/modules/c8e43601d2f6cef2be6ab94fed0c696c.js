EDU(
  'c8e43601d2f6cef2be6ab94fed0c696c',
  function (e, t) {
    var n = e.extend({
      template: t,
      config: function () {},
      init: function () {
        if (document.querySelector('.g-all.m-nav'))
          this.$inject(document.querySelector('.g-all.m-nav'), 'before');
      },
      close: function () {
        this.destroy();
      },
    });
    return n;
  },
  '6f1453d31194f86271694dd0542354fe',
  'a80bf2ea6965635decef553a1923e43e',
);
