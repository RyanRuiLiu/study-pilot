EDU(
  '02ce57f2ff1381675a8345ca2e16766e',
  function (e, t) {
    var n = { TARGET_TYPE: { POST: 1, REPLY: 2, COMMENT: 3 } };
    t._$checkSitePosterInfo = function (t, n) {
      e._$request({
        url: '/web/j/mocForumBean.checkSitePosterInfo.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    t.CONST = n;
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
);
