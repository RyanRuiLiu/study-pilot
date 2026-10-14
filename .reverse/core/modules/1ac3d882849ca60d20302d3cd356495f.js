EDU(
  '1ac3d882849ca60d20302d3cd356495f',
  function (e, t, n, i, o, a, r, s) {
    var c = 'cache-login-set-login-set';
    var d = e._$klass();
    s = d._$extend(n.Cache);
    s.__init = function () {
      this._doFlushSetting(c, a);
      this.__super();
    };
    s._doLoadList = function (e) {
      this.__super(e);
      this.__doSendRequest('login-set-login-set-list', e);
    };
    s._doLoadItem = function (e) {
      this.__super(e);
      this.__doSendRequest('login-set-login-set-get', e);
    };
    s._doAddItem = function (e) {
      this.__super(e);
      this.__doSendRequest('login-set-login-set-create', e);
    };
    s._doDeleteItem = function (e) {
      this.__super(e);
      this.__doSendRequest('login-set-login-set-delete', e);
    };
    s._doUpdateItem = function (e) {
      this.__super(e);
      this.__doSendRequest('login-set-login-set-update', e);
    };
    s.checkSwitch = function (e) {
      var t = this;
      this.__doSendRequest('login-set-check-urs-switch', {
        data: e,
        onload: function (e) {
          t._$dispatchEvent('oncheckswitch', e);
        },
      });
    };
    s.bindUrsPhone = function (e) {
      var t = this;
      this.__doSendRequest('login-set-bind-urs-phone', {
        data: e,
        onload: function (e) {
          t._$dispatchEvent('onbindursphone', e);
        },
      });
    };
    s.getLoginQrCode = function (e) {
      var t = this;
      this.__doSendRequest('login-set-get-login-qr-code', {
        data: e,
        onload: function (e) {
          t._$dispatchEvent('onloginqrcodeload', e);
        },
        onerror: function (e) {
          t._$dispatchEvent('onloginqrcoderror', e);
        },
      });
    };
    s.pollingScanStatus = function (e) {
      var t = this;
      this.__doSendRequest('login-set-polling-scan-status', {
        data: e,
        onload: function (e) {
          t._$dispatchEvent('onpollingscanload', e);
        },
        onerror: function (e) {
          t._$dispatchEvent('onpollingscanerror', e);
        },
      });
    };
    s._doUpdateSort = function (e) {
      this.__super(e);
      this.__doSendRequest('login-set-login-set-sort', e);
    };
    t._$$CustomEvent._$allocate({ element: d, event: 'listchange' });
    r.$do = n.$do._$bind(null, d);
    r.LoginSet = d;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  'accb3fb8e644fc0d22ad33c978dcd3b3',
  '395a9dcb034c1e85f57aec5bbd1340bf',
  '8f34a99b20d362b3542aebd517390fc1',
  'faf25813ced96f47a39186480072b8a8',
  '32d80664877463e0359f2a3aca4d64eb',
);
