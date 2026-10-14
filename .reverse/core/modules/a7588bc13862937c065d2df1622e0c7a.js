EDU(
  'a7588bc13862937c065d2df1622e0c7a',
  function (e, t, n) {
    if ('undefined' != typeof module && module.exports) {
      t = require('../base/component.js');
      n = require('./check2.html');
      e = require('../base/_.js');
    }
    var i = t.extend({
      name: 'check2',
      template: n,
      config: function () {
        e.extend(this.data, { name: '', checked: !1, block: !1 });
        this.supr();
        this.$watch('checked', function (e, t) {
          if (void 0 !== t) this.$emit('change', { sender: this, checked: e });
        });
      },
      check: function (e) {
        if (!this.data.readonly && !this.data.disabled) {
          if (void 0 === e) e = !this.data.checked;
          this.data.checked = e;
          this.$emit('check', { sender: this, checked: e });
        }
      },
    });
    return i;
  },
  'ca38b7e137b28e4006cbadb343315267',
  '9d20bebf5d63a6a8b052ddae5bfeb45f',
  '01a95c23540bb38624df7cbbb46afdd8',
);
