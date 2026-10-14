EDU(
  'fe433c1d027af596754fd54a8b81bfee',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f) {
    e._$merge(s['component-login-set'].phoneBindUrsConfig, { style: u });
    r.batch(s);
    var h = window;
    var p = 'true' === window.isMobilePhone ? o : i;
    f = p.$extends({
      name: 'bind-phone-modal',
      data: {},
      config: function () {
        n.extend(this.data, {
          okButton: !1,
          cancelButton: !1,
          bindPhoneData: {},
          preFillUnite: '',
          needIgnore: !0,
        });
        this.supr();
      },
      init: function () {
        this.supr();
        if (this.$refs && this.$refs.phoneBind && this.data.preFillUnite)
          this.$refs.phoneBind.data.ursCustomConfig.uniteLogin = e._$merge(
            this.$refs.phoneBind.data.ursCustomConfig.uniteLogin,
            { preFillUnite: this.data.preFillUnite },
          );
      },
      _getCacheInst: function () {
        return null;
      },
      handleOnBind: function (e) {
        console.log('33333333', e);
        if (e && e.data) {
          if (this._isErrorNeedUnbind(e.data)) this.handleNeedUnbindError(e.data);
          if (this._isErrorShowTips(e.data)) {
            if (this.data.failCb) {
              this.data.failCb(e.data.message);
              this.ok();
            } else p.alert(e.data.message, '绑定失败', '知道了');
            this.cancel();
          } else if (e.data.bindStatus) this.bindSuccess(e.data);
        }
      },
      _isErrorNeedUnbind: function (e) {
        return 10 === e.code;
      },
      _isErrorShowTips: function (e) {
        return e.message && (!e.result || !e.result.bindStatus);
      },
      handleNeedUnbindError: function (e) {
        var t = (e || {}).result || {};
        var n = { memberId: t.memberId || '', nickName: t.nickName || '' };
        var i = c.DEFAULT_PATH.USER_HOME + '?userId=' + n.memberId;
        this._unbindModal = new p({
          data: {
            class: 'ux-modal-unbind-phone',
            userLink: i,
            nickName: n.nickName || '',
            contentTemplate: _,
            okButton: '确认',
            cancelButton: '取消',
          },
        }).$on('ok', this._unBind._$bind(this, n.memberId));
      },
      _unBind: function (e) {
        d._$unbindPhone({ memberId: e }, this._unBindLoad._$bind(this));
      },
      _unBindLoad: function (e) {
        if (!e) {
          a.error('绑定失败');
          this.ok();
        }
        if (this.$refs && this.$refs.phoneBind) this.$refs.phoneBind.bindUrsPhone();
      },
      bindSuccess: function (e) {
        this.ok();
        t._$clearEvent(window, 'beforeunload');
        if ('/member/logoutResult.htm' !== h.location.pathname) {
          var n =
            location.href.indexOf('/noAppid/') > -1
              ? 'https://www.icourse163.org/noAppid/member/addMemberInfo.htm'
              : location.href.indexOf('/rooc/') > -1
                ? 'https://www.icourse163.org/rooc/member/addMemberInfo.htm'
                : 'https://www.icourse163.org/member/addMemberInfo.htm';
          if (7 != e.loginType && 110 != preLoginType && 112 != preLoginType)
            if (this.data.successCb) this.data.successCb();
            else h.location.reload();
          else
            h.location.href =
              n +
              '?nm=true&type=' +
              h.preLoginType +
              '&returnUrl=' +
              h.returnUrl +
              '&extraInfo=' +
              h.extraInfo +
              '&appId=' +
              h.appId;
        } else h.location.href = '/';
      },
    });
    return f;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '217dcfc103efb36d2f192eecc4548797',
  'd414623f7407e577cd6c05efff08e96f',
  '1437d796d5d9f21ee9d806c63bfcd5e0',
  '29f555f70e6e64cf8315ed720772ced1',
  '8f34a99b20d362b3542aebd517390fc1',
  '1839c832e9f2e00b288b9726e30c0770',
  '84fbf16f4faec484839c62eb23fe241c',
  '3ab4a68deff63af925ef9990314868e9',
  '217dcfc103efb36d2f192eecc4548797',
  '395996e5f5b237b966438be31db7b733',
  '48a57b93daf0198f5b7b147d8d1eb526',
);
