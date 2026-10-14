EDU(
  '45ceab0613a19bcdb285ad4ef0b134cd',
  function (e, t, n, i, o, a, r, s) {
    var c = window;
    var d = { NOT_SCAN: 0, SCAN_NOT_CONFIRM: 1, CONFIRMED: 2, EXPIRED: 3, SCAN_BY_OTHER_APP: 4 };
    var l = t.$extends({
      config: function () {
        this._flushSetting(s, r);
        n.extend(this, {});
        n.extend(this.data, { qrCodeImg: '', pollKey: '', status: 0, returnUrl: '' });
        this.supr();
        this.cache = o.LoginSet._$allocate({
          onloginqrcodeload: this._onLoginQrCodeLoad._$bind(this),
          onloginqrcoderror: this._onLoginQrCodeError._$bind(this),
          onpollingscanload: this._onPollingScanLoad._$bind(this),
          onpollingscanerror: this._onPollingScanError._$bind(this),
        });
      },
      computed: {
        isDef: function (e) {
          return e.status === d.NOT_SCAN || e.status === d.SCAN_BY_OTHER_APP;
        },
        isScan: function (e) {
          return e.status === d.SCAN_NOT_CONFIRM || e.status === d.CONFIRMED;
        },
        isExpired: function (e) {
          return e.status === d.EXPIRED;
        },
      },
      init: function () {
        this.supr();
        this.getLoginQrcode();
      },
      getLoginQrcode: function () {
        this.cache.getLoginQrCode({ width: 182, height: 182 });
      },
      pollingScanStatus: function () {
        if (!this.timer) {
          this._polling();
          this.timer = setInterval(this._polling._$bind(this), 2e3);
        }
      },
      _polling: function () {
        this.cache.pollingScanStatus({ pollKey: this.data.pollKey });
      },
      _onLoginQrCodeLoad: function (e) {
        var t = e || {};
        this.data.qrCodeImg = e.codeUrl || '';
        this.data.pollKey = e.pollKey || '';
        this.pollingScanStatus();
        this.$update();
      },
      _onLoginQrCodeError: function (e) {},
      _onPollingScanLoad: function (e) {
        var t = { codeStatus: e.codeStatus || d.NOT_SCAN, token: e.token || '' };
        var n = [
          { type: d.NOT_SCAN, handler: function () {} },
          { type: d.SCAN_NOT_CONFIRM, handler: function () {} },
          { type: d.CONFIRMED, handler: this._scanConfirmHandler },
          { type: d.EXPIRED, handler: this._scanExpiredHandler },
        ];
        this.data.status = t.codeStatus;
        var i = n.filter(
          function (e) {
            return e.type === this.data.status;
          }._$bind(this),
        )[0];
        if (i) i.handler.call(this, t.token || '');
        this.$update();
      },
      _scanConfirmHandler: function (t) {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
        var n =
          '/member/logoutResult.htm' === c.location.pathname ? '' : a._$str2b64(c.location.href);
        console.log(n);
        var i = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        var o =
          location.protocol +
          '//' +
          location.host +
          '/passport/mooc/changeEduCookies.htm?single=false&returnUrl=' +
          n;
        var r = i ? o : n;
        var s =
          location.protocol +
          '//' +
          location.host +
          '/passport/logingate/mocMobChangeCookie.htm?' +
          e._$object2query({ token: t, returnUrl: a._$str2b64(r) });
        location.href = s;
      },
      _scanExpiredHandler: function () {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      },
      _onPollingScanError: function (e) {},
      refresh: function () {
        this.getLoginQrcode();
      },
      changeStatus: function (e) {
        this.$emit('changeStatus', e);
      },
      destroy: function () {
        this.supr();
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      },
    });
    return l;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '8f34a99b20d362b3542aebd517390fc1',
  '1ac3d882849ca60d20302d3cd356495f',
  'c23a9d4e237326dadfa12366ae1b6e48',
  '12615895933a003e03ff8643dc0b0f84',
  'f25c65433c9a312ccdd3c59ceffdcdf1',
);
