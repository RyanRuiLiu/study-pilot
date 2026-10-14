EDU(
  'c1e87ef44060d70dabbce4090d7a065c',
  function (e, t, n) {
    if ('undefined' != typeof module && module.exports) {
      n = require('./dropdown.html');
      e = require('../base/_.js');
      t = require('../base/sourceComponent.js');
    }
    var i = t.extend({
      name: 'dropdown',
      template: n,
      config: function () {
        e.extend(this.data, { itemTemplate: null, open: !1 });
        this.supr();
      },
      toggle: function (e) {
        if (!this.data.disabled) {
          if (void 0 === e) e = !this.data.open;
          this.data.open = e;
          var t = i.opens.indexOf(this);
          if (e && t < 0) i.opens.push(this);
          else if (!e && t >= 0) i.opens.splice(t, 1);
          this.upOrDown(e);
          this.$emit('toggle', { sender: this, open: e });
        }
      },
      upOrDown: function (e, t, n) {
        n = n || 40;
        if (e && this.$refs.element && this.$refs.element.getBoundingClientRect && this.$refs.bd) {
          if (void 0 == t) {
            var i = this.$refs.bd.style.display;
            this.$refs.bd.style.display = 'block';
            t = this.$refs.bd.offsetHeight;
            this.$refs.bd.style.display = i;
          }
          var o = this.$refs.element.getBoundingClientRect();
          var a = document.documentElement.clientHeight - n - o.bottom;
          this.data.up = a < t && o.top > a;
        }
      },
      select: function (e, t) {
        if (!(this.data.disabled || e.disabled || e.divider)) {
          this.$emit('select', { sender: this, selected: e, parent: t });
          this.toggle(!1);
        }
      },
      destroy: function () {
        var e = i.opens.indexOf(this);
        e >= 0 && i.opens.splice(e, 1);
        this.supr();
      },
    });
    i.opens = [];
    e.dom.on(document, 'click', function (e) {
      i.opens.forEach(function (t, n) {
        var i = t.$refs.element;
        var o = e.target;
        for (; o;) {
          if (i == o) return;
          o = o.parentElement;
        }
        t.toggle(!1);
        t.$update();
      });
    });
    return i;
  },
  'ca38b7e137b28e4006cbadb343315267',
  '13925ddf24dc38681339d33c48b2003b',
  '833509b67f288a219d5c63aa6f8c26a3',
);
