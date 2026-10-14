EDU(
  '89f376bb4de761b159f5777315e84caa',
  function (e, t) {
    var n = e.$extends({
      config: function () {
        t.extend(this, {});
        t.extend(this.data, {
          codeLength: 5,
          errMsg: null,
          imgSrc:
            'http://capture-srv.icourse163.org/captcha/getVerifyCode.htm?bizType=3&sessionId=' +
            this.data.tel,
          randomSrc: '',
        });
        this.supr();
      },
      init: function () {
        this.changeImg();
        this.supr();
      },
      destroy: function () {
        this.supr();
      },
      changeImg: function () {
        this.$refs.input.focus();
        this.getImg();
      },
      closeMe: function () {
        this.$emit('closeImageValidateCodeUI', { sender: this });
        this.destroy();
      },
      sendImageCode: function () {
        if (this.data.code && !(this.data.code.trim().length < this.data.codeLength))
          this.$emit('sendCode', { sender: this, imageValidationCode: this.data.code });
        else this.data.errMsg = '输入有误，请重新输入！';
      },
      getImg: function () {
        var e;
        if (this.data.imgSrc) {
          if (this.data.imgSrc.indexOf('?') !== -1) e = '&random=' + +new Date();
          else e = '?random=' + +new Date();
          this.data.randomSrc = this.data.imgSrc + e;
          this.data.code = '';
          this.$update();
        }
      },
      clear: function () {
        this.data.code = '';
        this.$refs.input.focus();
      },
      clearError: function () {
        this.data.errMsg = null;
        this.$update();
      },
      onkeyup: function () {
        this.clearError();
        this.data.code = this.$refs.input.value;
        if (this.data.code)
          if (this.data.code.replace(/\s/g, '').length === this.data.codeLength) {
            this.data.code = this.data.code.replace(/\s/g, '');
            this.$update();
            this.sendImageCode();
          } else if (this.data.code.replace(/\s/g, '').length > this.data.codeLength) this.clear();
      },
    });
    return n;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
);
