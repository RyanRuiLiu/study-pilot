EDU(
  '39253eba71912d1492d6af7035e30738',
  function (e, t) {
    t._$getRecommend = function (t, i) {
      t.targetTypes = JSON.stringify(t.targetTypes);
      e._$request({
        url: '/web/j/recommendRPCBean.getRecommend.rpc',
        method: 'post',
        data: t,
        onload: i,
      });
    };
    t._$contentFeedback = function (t, i) {
      e._$request({
        url: '/web/j/mocPromoFeedbackBean.contentFeedback.rpc',
        method: 'post',
        data: t,
        onload: i,
      });
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
);
