EDU(
  'ff399209d4b47c4c8d7e061e5944c2fb',
  function (e, t, n) {
    if ('undefined' != typeof module && module.exports) {
      t = require('../base/component');
      n = require('./notify.html');
      e = require('../base/_');
    }
    var i = t.extend({
      name: 'notify',
      template: n,
      config: function () {
        e.extend(this.data, { messages: [], position: 'topcenter', duration: 2e3, single: !1 });
        this.supr();
      },
      init: function () {
        this.supr();
        if (this.$root === this) this.$inject(document.body);
      },
      show: function (t, n, i) {
        var o = { text: t, state: n || 'success', duration: i >= 0 ? +i : +this.data.duration };
        var a = this.data.messages;
        if (this.data.single && a[0]) {
          o = e.extend(a[0], o, !0);
          o.counter++;
        } else {
          a.unshift(o);
          o.counter = 0;
        }
        this.$update();
        if (o.duration)
          setTimeout(
            function () {
              if (!o.counter) this.close(o);
              else o.counter--;
            }.bind(this),
            o.duration,
          );
        this.$emit('show', { sender: this, message: o });
      },
      close: function (e) {
        var t = this.data.messages.indexOf(e);
        if (!(t < 0)) {
          this.data.messages.splice(t, 1);
          this.$update();
          this.$emit('close', { sender: this, message: e });
        }
      },
      closeAll: function () {
        this.data.messages = [];
        this.$update();
      },
    });
    var o = ['success', 'warning', 'info', 'error'];
    o.forEach(function (e) {
      i.prototype[e] = function (t, n) {
        this.show(t, e, n);
      };
    });
    var a = new i();
    i.notify = a;
    var r = ['show', 'close', 'closeAll', 'success', 'warning', 'info', 'error'];
    i.METHODS = r;
    r.forEach(function (e) {
      i[e] = a[e].bind(a);
    });
    return i;
  },
  'ca38b7e137b28e4006cbadb343315267',
  '9d20bebf5d63a6a8b052ddae5bfeb45f',
  '3891b7cc0722bfa8c2f8b56800da7072',
);
