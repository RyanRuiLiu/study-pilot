EDU(
  'aa19962567a8f366a43dbd195f17cc13',
  function (e, t, n, i, o, a, r) {
    var s = window;
    var c = e.$extends({
      config: function () {
        t.extend(this, { settingKey: 'component-passport-phone-login' });
        t.extend(this.data, {
          tel: '',
          pwd: '',
          isRememberChk: !0,
          isTelError: !1,
          isPwdError: !1,
          errMsg: '',
          isInputOk: !1,
          okBtnCnt: '登 录',
          isAuthorize: !1,
        });
        this.supr();
        this.$watch(['tel', 'pwd'], function (e, t) {
          this.data.isInputOk = !(!e || !t);
          this.$update();
        });
        this._cacheIns = o.Passport._$allocate();
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
      onkeyPress: function (e) {
        if (13 == e.which) {
          this.onSubmit();
          e.event.preventDefault();
        }
      },
      onRemeberClick: function () {
        this.data.isRememberChk = !this.data.isRememberChk;
        this.$update();
      },
      onRetrievePwdClick: function () {
        this.$emit('changeStatus', 'retrievePwd');
      },
      onRegisterClick: function () {
        this.$emit('changeStatus', 'register');
      },
      onTelFocus: function () {
        this.data.errMsg = null;
        this.data.isTelError = !1;
        this.$update();
      },
      onPwdFocus: function () {
        this.data.errMsg = null;
        this.data.isPwdError = !1;
        this.$update();
      },
      onSubmit: function () {
        this.$emit('submitClick');
        if (this._validate())
          if (this.data.isAuthorize) this._validateLoginCondition();
          else this._login();
      },
      _cleanErrorMsg: function () {
        this.data.errMsg = null;
        this.data.isTelError = !1;
        this.data.isPwdError = !1;
      },
      _validate: function () {
        this._cleanErrorMsg();
        var e = this.data.tel,
          t = this.data.pwd;
        if (!e) {
          this.data.errMsg = '手机号不能为空';
          this.data.isTelError = !0;
          this.$update();
          return !1;
        }
        if (!r._$isPhone(e)) {
          this.data.errMsg = '请输入正确格式的手机号';
          this.data.isTelError = !0;
          this.$update();
          return !1;
        }
        if (!t) {
          this.data.errMsg = '密码不能为空';
          this.data.isPwdError = !0;
          this.$update();
          return !1;
        }
        if (t && (t.length < 6 || t.length > 16)) {
          this.data.errMsg = '请设置6-16位的密码';
          this.data.isPwdError = !0;
          this.$update();
          return !1;
        }
        return !0;
      },
      _validateLoginCondition: function () {
        var e = i._$md52hex(i._$md52hex((this.data.tel || '') + '' + (this.data.pwd || '')));
        this._cacheIns._$validateLoginCondition({
          data: { mobile: this.data.tel, password: e },
          onload: this._cbonvalidateLoginCondition._$bind(this),
        });
      },
      _cbonvalidateLoginCondition: function (e) {
        if (e) {
          var t = i._$md52hex(i._$md52hex((this.data.tel || '') + '' + (this.data.pwd || '')));
          if (0 == e.code) {
            var o = 'https://study.163.com';
            s.location.href =
              o +
              '/passport/cellphone/bindCallback.htm?mobile=' +
              this.data.tel +
              '&password=' +
              t +
              '&returnUrl=' +
              n._$str2b64(a._$getDecodeCurUrl());
          } else {
            if (22 == e.code) this.data.isTelError = !0;
            else if (23 == e.code) this.data.isPwdError = !0;
            else if (25 == e.code);
            this.data.errMsg = e.message;
            this.$update();
          }
        }
      },
      _login: function () {
        var e = i._$md52hex(i._$md52hex((this.data.tel || '') + '' + (this.data.pwd || '')));
        this._cacheIns._$cellphoneLogin({
          data: {
            mobile: this.data.tel,
            password: e,
            saveFlag: this.data.isRememberChk,
            returnUrl: n._$str2b64(a._$getDecodeCurUrl()),
          },
          onload: this._cbonCellPhoneLogin._$bind(this),
          onerror: function (e) {
            this.$update('errMsg', e.error.message);
          }._$bind(this),
        });
      },
      _cbonCellPhoneLogin: function (e) {
        if (e) s.location.href = e;
      },
    });
    return c;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'c23a9d4e237326dadfa12366ae1b6e48',
  'af8805404cc0bd2b95d3d3c9573484b1',
  '2932080f1bbf8ac42a0f7d0ce1d04861',
  'fb061c769bfc74628a81f422f590544c',
  '009bba45d7cebb728e423e2eb60280e3',
);
