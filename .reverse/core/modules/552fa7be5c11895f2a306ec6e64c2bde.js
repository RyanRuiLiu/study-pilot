EDU(
  '552fa7be5c11895f2a306ec6e64c2bde',
  function (e, t, n, i, o, a, r, s) {
    var c = window;
    var d = e.$extends({
      config: function () {
        t.extend(this, { settingKey: 'component-passport-phone-retrieve-password' });
        t.extend(this.data, {
          title: '找回密码',
          tel: null,
          code: null,
          curStep: 'checktel',
          isTelError: !1,
          isCodeError: !1,
          isPwdError: !1,
          isRePwdError: !1,
          errMsg: null,
          isCodeOk: !1,
          isAllOk: !1,
          hasGotCode: !1,
          leftTime: 59,
          sendFlag: 0,
        });
        this.supr();
        this.$watch(['tel', 'code'], function () {
          if (this.data.tel && this.data.code) {
            this.data.isCodeOk = !0;
            this.$update();
          } else {
            this.data.isCodeOk = !1;
            this.$update();
          }
        });
        this.$watch(['pwd', 'repwd'], function () {
          if (this.data.pwd && this.data.repwd) {
            this.data.isAllOk = !0;
            this.$update();
          } else {
            this.data.isAllOk = !1;
            this.$update();
          }
        });
        this._cacheIns = o.Passport._$allocate();
      },
      init: function () {
        this._validateMiddleWare = new s({
          target: this,
          telImageValidationNode: this.$refs.telImageValidation,
          data: { bizType: 'retrievePassword' },
          onSendCodeSuccess: this._dbSendCodeSuccess._$bind(this),
          onSendCodeError: this._dbSendCodeError._$bind(this),
        });
        this.supr();
      },
      destroy: function () {
        this.supr();
      },
      _initLeftTimeInterval: function () {
        this.data.hasGotCode = !0;
        this.data.sendFlag = 1;
        if (this.data.leftTimeInerval) c.clearInterval(this.data.leftTimeInerval);
        this.$update();
        this.data.leftTimeInerval = c.setInterval(
          function () {
            if (this.data.leftTime > 1) this.data.leftTime--;
            else {
              this.data.leftTime = 59;
              this.data.hasGotCode = !1;
              c.clearInterval(this.data.leftTimeInerval);
            }
            this.$update();
          }.bind(this),
          1e3,
        );
      },
      onSendCode: function () {
        var e = this.data.tel || '';
        if (e.length < 1 || !r._$isPhone(e)) {
          this.data.errMsg = '请输入正确格式的手机号';
          this.data.isTelError = !0;
          this.$update();
          return !1;
        }
        this._validateMiddleWare.delegateSendCode({ tel: this.data.tel });
      },
      _dbSendCodeSuccess: function (e) {
        if (e) {
          this._initLeftTimeInterval();
          this.$update();
        }
      },
      _dbSendCodeError: function (e) {
        if (e && e.error) {
          if (22 == e.error.code) this.data.isTelError = !0;
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
      onRePwdFocus: function () {
        this.data.isRePwdError = !1;
        this.data.errMsg = null;
      },
      goNext: function () {
        var e = this.data.tel || '';
        var t = this.data.code || '';
        if (e.length < 1 || !r._$isPhone(e)) {
          this.data.errMsg = '手机号码格式不正确';
          this.data.isTelError = !0;
          this.$update();
          return !1;
        }
        if (!t) {
          this.data.errMsg = '验证码不能为空';
          this.data.isCodeError = !0;
          this.$update();
          return !1;
        }
        this._cacheIns._$verifyValidationCode({
          data: { mobile: this.data.tel, validationCode: this.data.code },
          onload: this._cbonverifyValidationCode._$bind(this),
          onerror: function (e) {
            this.$update('errMsg', e.error.message);
          }._$bind(this),
        });
      },
      _cbonverifyValidationCode: function (e) {
        if (e) {
          this.data.curStep = 'pwdinput';
          this.data.title = '设置新密码';
          this.$update();
        }
      },
      onretrievePassword: function () {
        var e = this.data.pwd || '',
          t = this.data.repwd || '';
        if (!e || !/^[\w]{6,16}$/.test(e)) {
          this.data.errMsg = '请设置6-16位的密码';
          this.data.isPwdError = !0;
          this.$update();
          return !1;
        }
        if (!t) {
          this.data.errMsg = '请设置重复密码';
          this.data.isRePwdError = !0;
          this.$update();
          return !1;
        }
        if (e !== t) {
          this.data.errMsg = '两次输入的密码不一致';
          this.data.isRePwdError = !0;
          this.$update();
          return !1;
        }
        e = i._$md52hex(i._$md52hex((this.data.tel || '') + '' + (this.data.pwd || '')));
        this._cacheIns._$retrievePasswordAndLogin({
          data: {
            mobile: this.data.tel,
            validationCode: this.data.code,
            newPassword: e,
            returnUrl: n._$str2b64(a._$getDecodeCurUrl()),
          },
          onload: this._cbretrievePasswordAndLogin._$bind(this),
          onerror: function (e) {
            if (12 == e.code) e.error.message = '验证码已过期，请重新验证手机号';
            this.$update('errMsg', e.error.message);
          }._$bind(this),
        });
      },
      _cleanErrorMsg: function () {
        this.data.errMsg = null;
        this.data.isTelError = !1;
        this.data.isCodeError = !1;
        this.data.isPwdError = !1;
        this.data.isRePwdError = !1;
      },
      _cbretrievePasswordAndLogin: function (e) {
        if (e) {
          window.location.href = e || 'http://study.163.com';
          this.$update();
        }
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
