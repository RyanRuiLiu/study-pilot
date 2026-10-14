EDU(
  'a3406b03e47bf5b3df6a90da7fd587f5',
  function (e, t, n, i) {
    i._$getSignInfo = function (t, n) {
      e._$request({
        url: '/web/j/MocActivityRpcBean.getSignInfo.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    i._$signIn = function (t, n) {
      e._$request({
        url: '/web/j/MocActivityRpcBean.mocActivitySignIn.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: !0,
      });
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  'fe86216ed59e3103a56c42c850d389f0',
);
