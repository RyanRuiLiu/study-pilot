EDU(
  'f0d9327da498763fd7f96b7fefd3e29b',
  function (e, t, n, i) {
    return e.$extends({
      config: function () {
        t.extend(this.data, {
          value: '',
          state: 'normal',
          eltIE9: 'ie' == i._$KERNEL.browser && 1 * i._$KERNEL.version <= 5,
          placeholder: '',
          type: 'text',
          rules: null,
          autofocus: !1,
          autoselect: !1,
          readonly: !1,
          disabled: !1,
          visible: !0,
          autoValidating: !1,
          clearErrorOnfocus: !0,
          unit: '',
          class: '',
          size: 'base',
          width: '',
          blurValidate: !0,
          resetBtn: !1,
          addon: '',
          replaceEmoji: !0,
          name: '',
        });
        this.supr();
      },
      init: function () {
        this.supr();
        if (this.data.autofocus)
          window.setTimeout(
            function () {
              this.focus();
            }._$bind(this),
            50,
          );
        if (this.data.autoselect)
          window.setTimeout(
            function () {
              this.select();
            }._$bind(this),
            50,
          );
      },
      onkeyup: function (e) {
        if (this.data.eltIE9 && e.target && null != e.target.value)
          this.data.value = e.target.value;
        if (this.data.isRealTime) this.validate();
        this.$emit('keyup', this.getReturnEvent(e));
        if (13 == e.which) this.$emit('enter', this.getReturnEvent(e));
        if (38 == e.which) this.$emit('up', this.getReturnEvent(e));
        if (40 == e.which) this.$emit('down', this.getReturnEvent(e));
      },
      onkeydown: function (e) {
        if (this.data.eltIE9 && e.target && null != e.target.value)
          this.data.value = e.target.value;
        if (this.data.isRealTime) this.validate();
        this.$emit('keydown', this.getReturnEvent());
      },
      oninput: function (e) {
        if (this.data.eltIE9 && e.target && null != e.target.value)
          this.data.value = e.target.value;
        if (this.data.isRealTime) this.validate();
        this.$emit('input', this.getReturnEvent());
      },
      getReturnEvent: function (e) {
        return { event: e, sender: this, value: this.data.value };
      },
      onblur: function () {
        if (this.data.replaceEmoji && this.data.value && this.data.value.replace)
          this.data.value = this.data.value.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
        if (this.data.blurValidate) this.validate();
        this.$emit('blur', this.getReturnEvent());
      },
      onfocus: function () {
        if (this.data.clearErrorOnfocus) this.clearErrorMsg();
        this.$emit('focus', this.getReturnEvent());
      },
      focus: function () {
        var e = this.$refs && this.$refs.input;
        if (e && 'function' == typeof e.focus) e.focus();
      },
      blur: function () {
        var e = this.$refs && this.$refs.input;
        if (e && 'function' == typeof e.blur) e.blur();
      },
      select: function () {
        var e = this.$refs && this.$refs.input;
        if (e && 'function' == typeof e.select) e.select();
      },
      resetValue: function () {
        this.data.value = '';
        this.$update();
        var e = this;
        window.setTimeout(function () {
          e.$emit('reset', { value: e.data.value });
        }, 30);
      },
      validate: function () {
        return (
          !!this.$refs.validation &&
          this.$refs.validation.validate(this.data.value, this.data.isRealTime)
        );
      },
      clearErrorMsg: function () {
        if (this.$refs.validation) {
          this.$refs.validation.data.message = '';
          this.$refs.validation.data.state = 'normal';
        }
      },
      setErrorMsg: function (e) {
        if (this.$refs.validation) this.$refs.validation.setErrorMsg(e);
      },
    });
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '76b358c87f41ecd47da41ee2ba42776f',
  'f051aeae7bb889518ead30ef6e491df3',
);
