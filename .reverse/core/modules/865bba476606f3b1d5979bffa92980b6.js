EDU(
  '865bba476606f3b1d5979bffa92980b6',
  function (e, t, n) {
    var i = NEJ.P('nej.u'),
      o = NEJ.P('edu.d'),
      a = i._$randNumberString(),
      r,
      s = 'ck-snsCache';
    o._$$COM_Cache_SnsCache = NEJ.C();
    r = o._$$COM_Cache_SnsCache._$extend(o._$$COM_Cache);
    r._$getThirdShareList = function () {
      this._$postDWR({
        key: s + a,
        url: 'ThirdShareBean.getThirdShareList',
        onload: this.__ongetThirdShareList._$bind(this),
      });
    };
    r.__ongetThirdShareList = function (e) {
      this._$dispatchEvent('ongetThirdShareList', e);
    };
    r._$getBindInfo = function (i) {
      n._$request({
        url: '/web/j/bindAccountRPCBean.getAllAccount.rpc',
        method: 'POST',
        onload: i || this.__onGetBindInfo._$bind(this),
        onerror: function (n) {
          t.alert(n, e.KEY_DIALOG_NOTES, e.KEY_DIALOG_CONFIRM);
        },
      });
    };
    r.__onGetBindInfo = function (e) {
      this._$dispatchEvent('onGetBindInfo', e);
    };
    r._$getBindMemberData = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'BindAccountBean.getBindMemberData',
        onload: this.__onGetBindMemberData._$bind(this, e),
      });
    };
    r.__onGetBindMemberData = function (e, t) {
      this._$dispatchEvent('onGetBindMemberData', t, e);
    };
    r._$changeBindMember = function (e, t) {
      this._$postDWR({
        key: s + a,
        url: 'BindAccountBean.changeBindMember',
        param: [e],
        onload: this.__onChangeBindMember._$bind(this, t),
      });
    };
    r.__onChangeBindMember = function (e, t) {
      this._$dispatchEvent('onChangeBindMember', t, e);
    };
    r._$unbindAcc = function (e) {
      this._$postDWR({
        key: s + a,
        url: 'BindAccountBean.unbindMember',
        param: [e],
        onload: this.__onUnbindAcc._$bind(this, e),
      });
    };
    r.__onUnbindAcc = function (e, t) {
      this._$dispatchEvent('onUnbindAcc', t, e);
    };
    return o._$$COM_Cache_SnsCache;
  },
  '61a3a3a5a602c34a33d876f6138c6ede',
  'd414623f7407e577cd6c05efff08e96f',
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  'fe86216ed59e3103a56c42c850d389f0',
);
