EDU(
  '6ccdab50b3006d28f601b40e94766d9a',
  function (e, t, n, i, o) {
    if ('undefined' != typeof module && module.exports) {
      t = require('../base/component.js');
      n = require('./input2.html');
      e = require('../base/_.js');
      o = require('../util/bowser.js');
    }
    var a = t.extend({
      name: 'input2',
      template: n,
      config: function () {
        e.extend(this.data, {
          value: '',
          type: '',
          placeholder: '',
          state: '',
          maxlength: void 0,
          unit: '',
          rules: [],
          blurRules: [],
          validating: !1,
          autofocus: !1,
          tipFlag: !1,
          eltIE9: o.msie && o.version <= 9,
        });
        this.supr();
      },
      init: function () {
        if (this.data.autofocus)
          setTimeout(
            function () {
              this.focus();
            }._$bind(this),
            50,
          );
      },
      validate: function (e, t) {
        if (0 != e) e = this.data.isRealTime;
        var n = this.data.value;
        var o = this.data.rules;
        if (t) o = t;
        if (o && o.length) {
          var a = i.validate(n, o, e);
          this.data.state = a.success ? 'success' : 'error';
          this.data.tip = a.message;
          this.$update();
          return a;
        }
      },
      resetTips: function () {
        this.data.state = 'success';
        this.data.tip = '';
        this.$update();
      },
      onkeyup: function (e) {
        if (this.data.eltIE9 && e.target && null != e.target.value)
          this.data.value = e.target.value;
        this.validate();
        this.$emit('keyup', e);
        if (13 == e.which) this.$emit('sure', e);
      },
      validateBlur: function () {
        var e = this.data.value;
        var t = this.data.blurRules;
        if (t && t.length) {
          var n = i.validate(e, t, !1);
          this.data.state = n.success ? 'success' : 'error';
          this.data.tip = n.message;
          this.$update();
          return n;
        }
      },
      onblur: function () {
        this.validateBlur();
        this.validate();
        this.$emit('blur', { sender: this, value: this.data.value });
      },
      onfocus: function () {
        this.$emit('focus', { sender: this, value: this.data.value });
      },
      focus: function () {
        var e = this.$refs && this.$refs.input;
        if (e && 'function' == typeof e.focus) e.focus();
      },
      blur: function () {
        var e = this.$refs && this.$refs.input;
        if (e && 'function' == typeof e.blur) e.blur();
      },
    });
    return a;
  },
  'ca38b7e137b28e4006cbadb343315267',
  '9d20bebf5d63a6a8b052ddae5bfeb45f',
  'ad4f4673c6631b499df0250d24ba1f1b',
  '01fdd3674541c450b53a219f1186e35b',
  '70dc37c0ea9dd2b3688f2eac79178cd8',
);
