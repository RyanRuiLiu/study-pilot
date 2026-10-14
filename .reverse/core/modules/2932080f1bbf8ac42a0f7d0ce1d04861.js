EDU(
  '2932080f1bbf8ac42a0f7d0ce1d04861',
  function (e, t, n, i, o, a, r, s, c) {
    i.config(r);
    i.config(o.get('cache-passport-passport'));
    var d = e._$klass();
    c = d._$extend(i.Cache);
    c._$cellphoneLogin = function (e) {
      e = e || {};
      var t = e.onload || function () {};
      e.onload = function (e) {
        n._$dispatchEvent(this.constructor, 'phoneloginsuccess', e);
        t(e);
      };
      this.__doSendRequest('cellphone-login', e);
    };
    c._$cellphoneRegister = function (e) {
      e = e || {};
      var t = e.onload || function () {};
      e.onload = function (e) {
        n._$dispatchEvent(this.constructor, 'phoneloginsuccess', e);
        t(e);
      };
      this.__doSendRequest('cellphone-register', e);
    };
    c.sendCode2Reg = function (e) {
      e.onload = function (e) {
        this._$dispatchEvent('onsendCode2Reg', { result: e });
      };
      e.onerror = function (e) {
        this._$dispatchEvent('onsendCode2RegError', { result: e });
      };
      this.__doSendRequest('sendcode2Reg', e);
    };
    c.sendcode2RetrievePwd = function (e) {
      e.onload = function (e) {
        this._$dispatchEvent('onSendcode2RetrievePwd', { result: e });
      };
      e.onerror = function (e) {
        this._$dispatchEvent('onSendcode2RetrievePwdError', { result: e });
      };
      this.__doSendRequest('sendcode2RetrievePwd', e);
    };
    c._$sendValidationCode2ChangePassword = function (e) {
      this.__doSendRequest('sendValidationCode2ChangePassword', e);
    };
    c._$changePassword = function (e) {
      this.__doSendRequest('changePassword', e);
    };
    c._$retrievePasswordAndLogin = function (e) {
      e = e || {};
      var t = e.onload || function () {};
      e.onload = function (e) {
        n._$dispatchEvent(this.constructor, 'phoneloginsuccess', e);
        t(e);
      };
      this.__doSendRequest('retrievePasswordAndLogin', e);
    };
    c._$verifyValidationCode = function (e) {
      this.__doSendRequest('verifyValidationCode', e);
    };
    c.needVerifyCode = function (e) {
      e.onload = function (e) {
        this._$dispatchEvent('onneedVerifyCode', { result: e });
      };
      e.onerror = function (e) {
        this._$dispatchEvent('onneedVerifyCodeError', { result: e });
      };
      this.__doSendRequest('needVerifyCode', e);
    };
    c.getEncryptKey = function (e) {
      e.onload = function (t) {
        this._$dispatchEvent('ongetEncryptKey', { result: t, data: e });
      };
      this.__doSendRequest('getEncryptKey', e);
    };
    c.sendVerifyCodeToPhoneNumber = function (e) {
      this.__doSendRequest('sendVerifyCodeToPhoneNumber', e);
    };
    c.checkPhoneAndVerifyCode = function (e) {
      this.__doSendRequest('checkPhoneAndVerifyCode', e);
    };
    c.bindMobileToAccount = function (e) {
      this.__doSendRequest('bindMobileToAccount', e);
    };
    c.switchAccount = function (e) {
      this.__doSendRequest('switchAccount', e);
    };
    c.loadUrsLoginJsonScript = function (e) {
      e = e || {};
      a._$loadScript(i.get('urs-json-script').url, {
        version: +new Date(),
        onload: function () {
          e.onload && e.onload();
        }._$bind(this),
      });
    };
    c.loadUrsLoginMessageScript = function (e) {
      e = e || {};
      a._$loadScript(i.get('urs-message-script').url, {
        version: +new Date(),
        onload: function () {
          e.onload && e.onload();
        }._$bind(this),
      });
    };
    t._$$CustomEvent._$allocate({
      element: d,
      event: ['listchange', 'phoneloginsuccess', 'snslogin'],
    });
    s.$do = i.$do._$bind(null, d);
    s.Passport = d;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'accb3fb8e644fc0d22ad33c978dcd3b3',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '395a9dcb034c1e85f57aec5bbd1340bf',
  '8f34a99b20d362b3542aebd517390fc1',
  '9a830f6a308feb17fe43372af2d6e799',
  'd1bbffe67df11c079686e79722c2111a',
);
