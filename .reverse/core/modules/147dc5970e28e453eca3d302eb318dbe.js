EDU(
  '147dc5970e28e453eca3d302eb318dbe',
  function (e, t, n, i) {
    if ('undefined' != typeof module && module.exports) {
      t = require('../base/component');
      n = require('./modal.html');
      e = require('../base/_');
      i = require('../base/draggable.js');
    }
    var o = t.extend({
      name: 'modal',
      template: n,
      config: function () {
        e.extend(this.data, {
          title: '',
          content: '',
          okButton: !0,
          cancelButton: !1,
          draggable: !1,
          type: 'warning',
        });
        this.supr();
      },
      init: function () {
        this.supr();
        if (this.$root === this) this.$inject(document.body);
      },
      close: function (e) {
        this.$emit('close', { result: e });
        e ? this.ok() : this.cancel();
      },
      ok: function () {
        this.$emit('ok');
        if (!this.data.notDestroy) this.destroy();
        else this.data.notDestroy = !1;
      },
      cancel: function () {
        this.$emit('cancel');
        this.destroy();
      },
      onKeyUp: function (e) {},
      onDragStart: function (e) {
        var t = e.proxy;
        t.style.left = t.offsetLeft + 'px';
        t.style.top = t.offsetTop + 'px';
        t.style.zIndex = '1000';
        t.style.position = 'absolute';
      },
    });
    o.alert = function (e, t, n, i) {
      var o = new this({ data: { content: e, title: t, okButton: n, type: i || 'warning' } });
      return o;
    };
    o.confirm = function (e, t, n, i, o) {
      var a = new this({
        data: {
          content: e,
          title: t,
          okButton: n,
          cancelButton: null == i ? !0 : i,
          type: o || 'warning',
        },
      });
      return a;
    };
    return o;
  },
  'ca38b7e137b28e4006cbadb343315267',
  '9d20bebf5d63a6a8b052ddae5bfeb45f',
  'd9766eea34fef83ae8cd99c1946e094e',
  '99737e1cb6d90cac9a729c7d9dd040e5',
);
