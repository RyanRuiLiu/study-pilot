EDU(
  'ffa496c002183bc8cb9bfc52a9e4f73d',
  function (e, t, n, i, o, a, r, s, c, d) {
    var l = e.$extends({
      config: function () {
        t.extend(this, {
          target: this.target || {},
          onSendCodeSuccess: this.onSendCodeSuccess,
          onSendCodeError: this.onSendCodeError,
        });
        t.extend(this.data, { bizType: null, isMobile: n._$isMobile() });
        this.supr();
        this._cacheIns = r.Passport._$allocate({
          onneedVerifyCode: this._cbonneedVerifyCode._$bind(this),
          ongetEncryptKey: this._cbongetEncryptKey._$bind(this),
          onsendCode2Reg: this._cbonsendCodeSuccess._$bind(this),
          onsendCode2RegError: this._cbonsendCodeError._$bind(this),
          onSendcode2RetrievePwd: this._cbonsendCodeSuccess._$bind(this),
          onSendcode2RetrievePwdError: this._cbonsendCodeError._$bind(this),
        });
      },
      init: function () {
        this.supr();
      },
      destroy: function () {
        this.supr();
      },
      delegateSendCode: function (e) {
        if (e) {
          this.data.tel = e.tel;
          this._needVerifyCode();
        }
      },
      _needVerifyCode: function () {
        this._cacheIns.needVerifyCode({
          data: { mobile: this.data.tel },
          onerror: this.onSendCodeError._$bind(this),
        });
      },
      _cbonneedVerifyCode: function (e) {
        if (e.result) {
          !!this._telImageValidationUI && this._telImageValidationUI.destroy();
          if (this.data.isMobile)
            this._telImageValidationUI = new c({ data: { tel: this.data.tel } }).$inject(
              document.body,
            );
          else {
            var t = this.telImageValidationNode || document.body;
            this._telImageValidationUI = new s({ data: { tel: this.data.tel } }).$inject(t);
          }
          if (this._telImageValidationUI)
            this._telImageValidationUI.$on(
              'sendCode',
              function (e) {
                if (e) {
                  this.data.imageValidationCode = e.imageValidationCode;
                  this._getEncryptKey();
                }
              }._$bind(this),
            );
        } else this._getEncryptKey();
      },
      _getEncryptKey: function () {
        this._cacheIns.getEncryptKey({ data: { mobile: this.data.tel } });
      },
      _cbongetEncryptKey: function (e) {
        var t = e.result;
        var n = this._formatParams(
          t,
          this.data.tel,
          this.data.imageValidationCode,
          this.data.bizType,
        );
        var i = { reg: 'sendCode2Reg', retrievePassword: 'sendcode2RetrievePwd' };
        var o = i[this.data.bizType] ? i[this.data.bizType] : i['reg'];
        this._cacheIns[o]({ data: n || {} });
      },
      _formatParams: function (e, t, n, r) {
        var s = '';
        try {
          s = a._$str2b64(
            i._$aesEncrypt(
              JSON.stringify({
                params: JSON.stringify({ mobile: t, verifyCode: n || '' }),
                timestamp: o._$getCurServerTime(),
                nonce: 1e5 * Math.random() + '',
                version: 'v1',
              }),
              e,
            ),
          );
        } catch (c) {
          console.log(c);
        }
        return { params: s, bizType: r, mobile: t };
      },
      _cbonsendCodeSuccess: function (e) {
        if (e) {
          if (this._telImageValidationUI) this._telImageValidationUI.destroy();
          this.onSendCodeSuccess(e);
        }
      },
      _cbonsendCodeError: function (e) {
        e = e.result ? e.result : e;
        var t = e.error || {};
        if (30 != t.code) {
          !!this._telImageValidationUI && this._telImageValidationUI.destroy();
          this.onSendCodeError(e.result || e);
        } else {
          this._showImageValidateError(t);
          if (this._telImageValidationUI) this._telImageValidationUI.changeImg();
        }
      },
      _showImageValidateError: function (e) {
        if (this._telImageValidationUI)
          this._telImageValidationUI.$update({ code: '', errMsg: e.message || '' });
      },
    });
    return l;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'beec6201069596ecb83a09e5fc3eb415',
  '0ea984c838c93088638e615cbfbdbc4d',
  '89a466f05573f560c156411121b8daae',
  'c23a9d4e237326dadfa12366ae1b6e48',
  '2932080f1bbf8ac42a0f7d0ce1d04861',
  '961679e0dbc273a1f073e32ed7d3675a',
  '0c0b05410fcd77536a7a5a0376688989',
  '3e65f29d7a8b12b8956dfacb16bba5ce',
);
