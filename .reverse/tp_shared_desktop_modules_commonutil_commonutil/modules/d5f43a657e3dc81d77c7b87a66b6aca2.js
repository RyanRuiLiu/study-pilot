EDU(
  'd5f43a657e3dc81d77c7b87a66b6aca2',
  function (e, t, i) {
    i._$getCertificationTestResult = function (e, i) {
      t._$request({
        url: '/web/j/indexBeanV3.getCertificationTestResult.rpc',
        method: 'post',
        data: e,
        onload: i,
      });
    };
    i._$getListChannelCategoryDetail = function (t, i) {
      var n = 'ke.study.youdao.com';
      var a = 'study.163.com';
      var o = window.location.href;
      var s = '/web/j/channelBean.listChannelCategoryDetail.rpc';
      if (o.indexOf(a) >= 0 || o.indexOf(n) >= 0) s = '/course/channel/detail.do';
      e._$request(s, { method: 'post', type: 'json', data: t, onload: i });
    };
    return i;
  },
  '8a864b627c302d7d1c56bd928b515d1b',
  '7c94ca1edcf8eeb73b931ff94fdcb255',
);
