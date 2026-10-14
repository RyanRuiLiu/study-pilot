EDU(
  '67decd41e9494c49ec25f05fa0b1a5ed',
  function (e, t, n, i, o, a, r, s) {
    var c = window;
    var d = e.$extends({
      config: function () {
        t.extend(this, { settingKey: 'component-passport-phone-register' });
        t.extend(this.data, {
          tel: null,
          code: null,
          pwd: null,
          isTelError: !1,
          isCodeError: !1,
          isPwdError: !1,
          errMsg: null,
          isInputOk: !1,
          isTelInputOk: !1,
          countDown: 59,
          countStatus: 0,
        });
        this.supr();
        this.$watch(['tel', 'code', 'pwd'], function (e, t, n) {
          this.data.isInputOk = !!(e && t && n);
          this.data.isTelInputOk = !!e;
          this.$update();
        });
        this._cacheIns = o.Passport._$allocate({});
      },
      init: function () {
        this._validateMiddleWare = new s({
          target: this,
          telImageValidationNode: this.$refs.telImageValidation,
          data: { bizType: 'reg' },
          onSendCodeSuccess: this._dbSendCodeSuccess._$bind(this),
          onSendCodeError: this._dbSendCodeError._$bind(this),
        });
        this.supr();
      },
      destroy: function () {
        if (this._cacheIns) {
          this._cacheIns._$recycle();
          delete this._cacheIns;
        }
        this.supr();
      },
      onSendCode: function () {
        if (1 != this.data.countStatus && this.data.isTelInputOk) {
          var e = this.data.tel;
          if (e.length < 0 || !r._$isPhone(e)) {
            this.data.errMsg = '请输入正确格式的手机号';
            this.data.isTelError = !0;
            this.$update();
            return !1;
          }
          this._validateMiddleWare.delegateSendCode({ tel: this.data.tel });
        }
      },
      _dbSendCodeSuccess: function (e) {
        if (e) {
          this.data.errMsg = null;
          this.data.isCodeError = !1;
          this.$update();
          this.data.countStatus = 1;
          this._startCountDown()(
            function () {
              this.data.countStatus = 2;
              this.$update();
            }._$bind(this),
          );
        }
      },
      _dbSendCodeError: function (e) {
        if (e && e.error) {
          if (21 == e.error.code || 12 == e.error.code || 13 == e.error.code)
            this.data.isTelError = !0;
          this.data.errMsg = e.error.message;
          this.$update();
        }
      },
      onTelKeyup: function () {
        var e = this.data.tel;
        if (e.length > 0) this.data.isTelInputOk = !0;
      },
      onTelFocus: function () {
        this.data.errMsg = null;
        this.data.isTelError = !1;
        this.$update();
      },
      onCodeFocus: function () {
        this.data.errMsg = null;
        this.data.isCodeError = !1;
        this.$update();
      },
      onPwdFocus: function () {
        this.data.errMsg = null;
        this.data.isPwdError = !1;
        this.$update();
      },
      onSubmit: function () {
        if (this._validate()) this._register();
      },
      _startCountDown: function () {
        var e = this;
        return function (t) {
          var n = window.setInterval(function () {
            e.data.countDown--;
            e.$update();
            if (0 == e.data.countDown) {
              e.data.countDown = 59;
              window.clearInterval(n);
              t();
            }
          }, 1e3);
        };
      },
      _cleanErrorMsg: function () {
        this.data.errMsg = null;
        this.data.isTelError = !1;
        this.data.isCodeError = !1;
        this.data.isPwdError = !1;
      },
      _validate: function () {
        this._cleanErrorMsg();
        var e = this.data.tel,
          t = this.data.code,
          n = this.data.pwd;
        if (!e) {
          this.data.errMsg = '手机号不能为空';
          this.data.isTelError = !0;
          return !1;
        }
        if (!r._$isPhone(e)) {
          this.data.errMsg = '请输入正确格式的手机号';
          this.data.isTelError = !0;
          return !1;
        }
        if (!t) {
          this.data.errMsg = '验证码不能为空';
          this.data.isCodeError = !0;
          return !1;
        }
        if (!n) {
          this.data.errMsg = '密码不能为空';
          this.data.isPwdError = !0;
          return !1;
        }
        if (n && (n.length < 6 || n.length > 16)) {
          this.data.errMsg = '请设置6-16位的密码';
          this.data.isPwdError = !0;
          return !1;
        }
        return !0;
      },
      _register: function () {
        var e = i._$md52hex(i._$md52hex((this.data.tel || '') + '' + (this.data.pwd || '')));
        this._cacheIns._$cellphoneRegister({
          data: {
            mobile: this.data.tel,
            validationCode: this.data.code,
            password: e,
            returnUrl: n._$str2b64(a._$getDecodeCurUrl()),
          },
          onload: this._cbonCellPhoneRegister._$bind(this),
          onerror: function (e) {
            if (21 == e.error.code) this.data.isTelError = !0;
            this.data.errMsg = e.error.message;
            this.$update();
          }._$bind(this),
        });
      },
      _cbonCellPhoneRegister: function (e) {
        if (e) c.location.href = e;
      },
    });
    return d;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'c23a9d4e237326dadfa12366ae1b6e48',
  'af8805404cc0bd2b95d3d3c9573484b1',
  '2932080f1bbf8ac42a0f7d0ce1d04861',
  'fb061c769bfc74628a81f422f590544c',
  '009bba45d7cebb728e423e2eb60280e3',
  'ffa496c002183bc8cb9bfc52a9e4f73d',
);
