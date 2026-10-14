EDU(
  'c88089dfaf13686b510f6763b0beacfb',
  function (e, t, n) {
    n[t.REQUEST_KEYS.LIST] = {
      method: 'POST',
      url: '/web/j/mocCourseV2RpcBean.getCourseEvaluatePaginationByCourseIdOrTermId.rpc',
      rest: !1,
      format: function (n) {
        if (n && n.res && n.res.result) {
          n.result = n.result || n.res.result;
          if (n.result.list)
            n.result.list.forEach(function (n) {
              n.faceUrl = n.faceUrl || e.get(t.SETTING_KEY)[t.CONFIG_KEYS.DEFAULT_AVATAR_IMAGE_URL];
            });
        }
      },
    };
    n[t.REQUEST_KEYS.DELETE] = {
      method: 'POST',
      url: '/web/j/mocCourseV2RpcBean.deleteCourseEvaluate.rpc',
      rest: !1,
    };
    n[t.REQUEST_KEYS.VOTE] = {
      method: 'POST',
      url: '/web/j/mocCourseV2RpcBean.updateVoteUpByEvaluateId.rpc',
      rest: !1,
    };
    n[t.REQUEST_KEYS.CAN_POST] = {
      method: 'POST',
      url: '/web/j/mocCourseV2RpcBean.canDeliver.rpc',
      rest: !1,
    };
    n[t.REQUEST_KEYS.GET_AVERAGE_RATING_AND_COUNT] = {
      method: 'POST',
      url: '/web/j/mocCourseV2RpcBean.getEvaluateAvgAndCount.rpc',
      rest: !1,
    };
    n[t.REQUEST_KEYS.POST_COMMENT] = {
      method: 'POST',
      url: '/web/j/mocCourseV2RpcBean.addOrEditCourseEvaluate.rpc',
      rest: !1,
    };
    n[t.CONFIG_KEYS.DEFAULT_AVATAR_IMAGE_URL] =
      window.location.protocol + '//edu-image.nosdn.127.net/057B8DA26AAE0EECBB5F99BEF29EE3E6.png';
  },
  '8f34a99b20d362b3542aebd517390fc1',
  '5147903096318e5db3d048c483fc6b12',
);
