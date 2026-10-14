EDU(
  '3ab4a68deff63af925ef9990314868e9',
  function (e, t) {
    t._$unbindPhone = function (t, n) {
      e._$request({
        url: '/web/j/bindAccountBean.unbindUrsCellphoneMember.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: !0,
      });
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
);
