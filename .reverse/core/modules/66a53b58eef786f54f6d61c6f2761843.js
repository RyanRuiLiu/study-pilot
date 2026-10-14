EDU(
  '66a53b58eef786f54f6d61c6f2761843',
  function (e, t) {
    t._$getVideoToken = function (t, n) {
      var i =
        void 0 != t.isNewVideoToken
          ? '/web/j/resourceRpcBean.getResourceToken.rpc'
          : '/web/j/resourceRpcBean.getVideoToken.rpc';
      delete t.isNewVideoToken;
      e._$request({ url: i, method: 'post', data: t, onload: n, notShowLoading: !0 });
    };
    t._$getLessonUnitPreviewVo = function (t, n) {
      e._$request({
        url: '/web/j/courseBean.getLessonUnitPreviewVo.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: !0,
      });
    };
    t._$getLiveRoomInfo = function (t, n) {
      e._$request({
        url: '/web/j/mocLiveRoomContentRpcBean.getLiveRoomInfo.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
);
