EDU(
  '5dbed24e3f927bf4be8397d7989526d2',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f) {
    var h = 'component-passport-phone-bind';
    var p = 'pg9i5gg5Tr9tSGjv';
    var m = { SEND: 0, VALIDATING: 1, RETRY: 2 };
    var g = { FAIL: 0, SUCCESS: 1 };
    var b = e.$extends({
      config: function () {
        this._flushSetting(h, n);
        t.extend(this, {
          settingKey: h,
          webUser: window.webUser,
          BIND_STATE_CONST: g,
          CODE_BTN_STATE_CONST: m,
        });
        t.extend(this.data, {
          phoneLabel: '手机：+86',
          verifyCodeLabel: '验证码：',
          passwordLabel: '密码：',
          phoneNumber: null,
          validateCode: null,
          codeBtnState: this.CODE_BTN_STATE_CONST.SEND,
          countDownTimer: null,
          totalCountDownTime: 60,
          currentCountDownTime: null,
          bindStatus: null,
          occupyAccountName: null,
          productContent: null,
          validateVersion: 0,
        });
        this.supr();
      },
      init: function () {
        this.supr();
      },
      destroy: function () {
        if (this._cacheIns) {
          this._cacheIns._$recycle();
          delete this._cacheIns;
        }
        this.supr();
      },
      _setCodeBtnState: function (e) {
        this.$update({ codeBtnState: e });
      },
      sendValidateCode: function () {
        if (this.checkPhoneNumber()) {
          this._createValidateMiddleware();
          this._validateMiddleWare.delegateSendCode({ tel: this.data.phoneNumber });
        }
      },
      _createValidateMiddleware: function () {
        if (this._validateMiddleWare)
          this._validateMiddleWare.delegateSendCode({ tel: this.data.tel });
        else
          this._validateMiddleWare = new u({
            target: this,
            telImageValidationNode: '#j-img-validate',
            data: { bizType: 'bind' },
            onSendCodeSuccess: this._cbSendCodeSuccess._$bind(this),
            onSendCodeError: this._cbSendCodeError._$bind(this),
          });
      },
      _cbSendCodeSuccess: function (e) {
        if (e) this._startCountDownTimer();
      },
      _cbSendCodeError: function (e) {
        if (e && e.error) {
          this.data.errMsg = e.error.message;
          this.$update();
        }
      },
      _startCountDownTimer: function () {
        this.data.currentCountDownTime = this.data.totalCountDownTime;
        this._setCodeBtnState(this.CODE_BTN_STATE_CONST.VALIDATING);
        if (!this.data.countDownTimer)
          this.data.countDownTimer = window.setInterval(
            function () {
              this.data.currentCountDownTime--;
              if (0 == this.data.currentCountDownTime) {
                this._setCodeBtnState(this.CODE_BTN_STATE_CONST.RETRY);
                this.data.countDownTimer = window.clearInterval(this.data.countDownTimer);
              }
              this.$update();
            }._$bind(this),
            1e3,
          );
        this.$update();
      },
      checkPhoneNumber: function () {
        var e = this.data.phoneNumber || '';
        if (!this.checkEmpty(e, '手机号不能为空')) return !1;
        if (!c._$isPhone(e)) {
          this.data.errMsg = '请输入正确格式的手机号';
          this.$update();
          return !1;
        }
        this._clearErrMsg();
        return !0;
      },
      checkPwd: function () {
        var e = this.data.password || '';
        if (!e) {
          this.data.errMsg = '密码不能为空';
          return !1;
        }
        if (e && (e.length < 6 || e.length > 16)) {
          this.data.errMsg = '请设置6-16位的密码';
          return !1;
        }
        this._clearErrMsg();
        return !0;
      },
      _clearErrMsg: function () {
        this.data.errMsg = '';
        this.$update();
      },
      checkEmpty: function (e, t) {
        if (!e || e.length < 1) {
          this.data.errMsg = t || '数据不能为空';
          this.$update();
          return !1;
        }
        this._clearErrMsg();
        return !0;
      },
      validateAll: function () {
        return (
          this.checkPhoneNumber() &&
          this.checkEmpty(this.data.validateCode, '验证码不能为空') &&
          this.checkPwd()
        );
      },
      _getCache: function () {
        if (!this._cacheIns) this._cacheIns = r.Passport._$allocate();
        return this._cacheIns;
      },
      bind: function () {
        if (this.validateAll())
          this._getCache().bindMobileToAccount({
            data: {
              mobile: this.data.phoneNumber,
              password: a._$md52hex(a._$md52hex(this.data.phoneNumber + '' + this.data.password)),
              validationCode: this.data.validateCode,
            },
            onload: this._cbBindMobileToAccountSuccess._$bind(this),
            onerror: function (e) {
              this.$update('errMsg', e.error.message);
            }._$bind(this),
          });
      },
      _cbBindMobileToAccountSuccess: function (e) {
        if (e) if (e.bindStatus) this.$emit('bindResult', { sender: this, data: e });
      },
      switchAccount: function () {
        var e = d._$getCurServerTime();
        this._getCache().switchAccount({
          data: {
            validateSign: l._$aesEncrypt(
              this.data.occupyUserId + '_' + this.data.phoneNumber + '_' + e,
              p,
            ),
            productContent: this.data.productContent,
            validateVersion: 1 * this.data.validateVersion,
            userPhone: this.data.phoneNumber,
            timestamp: 1 * e,
            userId: 1 * this.data.occupyUserId,
          },
          onload: this._cbSwitchAccountSuccess._$bind(this),
        });
      },
      _cbSwitchAccountSuccess: function (e) {
        if (e) this.$emit('switchAccountSuccess', { sender: this });
      },
      onInputFocus: function () {
        this._clearErrMsg();
      },
    });
    return b;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'd790ccbd06bb943cb38b720185c8332a',
  'bee6fef94cf2beab28b7ff76f5b652a0',
  'c23a9d4e237326dadfa12366ae1b6e48',
  'af8805404cc0bd2b95d3d3c9573484b1',
  '2932080f1bbf8ac42a0f7d0ce1d04861',
  'fb061c769bfc74628a81f422f590544c',
  '009bba45d7cebb728e423e2eb60280e3',
  '89a466f05573f560c156411121b8daae',
  '0ea984c838c93088638e615cbfbdbc4d',
  'ffa496c002183bc8cb9bfc52a9e4f73d',
  'f7a7f0a146b7050b707d24d8149041a6',
  '76b358c87f41ecd47da41ee2ba42776f',
);
