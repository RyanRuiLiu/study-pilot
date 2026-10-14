EDU(
  '2fa4cc846a44d0e7603f51822ebd537b',
  function (e, t, n, i, o) {
    if ('undefined' != typeof module && module.exports) {
      t = require('../base/component.js');
      n = require('./textarea2.html');
      e = require('../base/_.js');
      i = require('../util/validation.js');
      o = require('../util/bowser.js');
    }
    var a = t.extend({
      name: 'textarea2',
      template: n,
      config: function () {
        e.extend(this.data, {
          value: '',
          placeholder: '',
          state: '',
          maxlength: void 0,
          rules: [],
          validating: !1,
          autofocus: !1,
          eltIE9: o.msie && o.version <= 9,
        });
        this.supr();
      },
      onkeyup: function (e) {
        this.validate();
        this.$emit('keyup', e);
      },
      onblur: function (e) {
        this.validate();
        this.$emit('blur', e);
      },
      validate: function (e) {
        if (0 != e) e = this.data.isRealTime;
        var t = this.data.value;
        var n = this.data.rules;
        if (n && n.length) {
          var o = i.validate(t, n, e);
          this.data.state = o.success ? 'success' : 'error';
          this.data.tip = o.message;
          this.$update();
          return o;
        }
      },
    });
    return a;
  },
  'ca38b7e137b28e4006cbadb343315267',
  '9d20bebf5d63a6a8b052ddae5bfeb45f',
  'f16f8ba6a192e1d4c7d33fec433a4ab6',
  '01fdd3674541c450b53a219f1186e35b',
  '70dc37c0ea9dd2b3688f2eac79178cd8',
);
