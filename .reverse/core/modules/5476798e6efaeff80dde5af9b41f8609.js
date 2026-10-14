EDU(
  '5476798e6efaeff80dde5af9b41f8609',
  function (e, t, n) {
    if ('undefined' != typeof module && module.exports) {
      t = require('../base/component.js');
      n = require('./loading.html');
      e = require('../base/_.js');
    }
    var i = t.extend({
      name: 'loading',
      template: n,
      config: function () {
        e.extend(this.data, { static: !1, visible: !1 });
        this.supr();
      },
      init: function () {
        this.supr();
        if (this.$root === this) this.$inject(document.body);
      },
      show: function (e) {
        if (!this.data.disabled) {
          if (e) this.data.content = e;
          this.data.visible = !0;
          this.$update();
        }
      },
      hide: function () {
        if (!this.data.disabled) {
          this.data.visible = !1;
          this.$update();
        }
      },
    });
    var o = new i();
    i.loading = o;
    i.show = function () {
      o.show();
    };
    i.hide = function () {
      o.hide();
    };
    return i;
  },
  'ca38b7e137b28e4006cbadb343315267',
  '9d20bebf5d63a6a8b052ddae5bfeb45f',
  'd7541e668b2186cc0e798454691ef5ee',
);
