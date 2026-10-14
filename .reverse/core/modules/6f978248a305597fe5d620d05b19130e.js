EDU(
  '6f978248a305597fe5d620d05b19130e',
  function (e, t, n) {
    n[e.REQUEST_KEYS.LIST] = {
      url: t._$getUrlWithCsrfKey(
        '/web/j/mocCourseV2RpcBean.getCourseEvaluatePaginationByCourseIdOrTermId.rpc',
      ),
    };
    n[e.REQUEST_KEYS.DELETE] = {
      url: t._$getUrlWithCsrfKey('/web/j/mocCourseV2RpcBean.deleteCourseEvaluate.rpc'),
    };
    n[e.REQUEST_KEYS.VOTE] = {
      url: t._$getUrlWithCsrfKey('/web/j/mocCourseV2RpcBean.updateVoteUpByEvaluateId.rpc'),
    };
    n[e.REQUEST_KEYS.CAN_POST] = {
      url: t._$getUrlWithCsrfKey('/web/j/mocCourseV2RpcBean.canDeliver.rpc'),
    };
    n[e.REQUEST_KEYS.GET_AVERAGE_RATING_AND_COUNT] = {
      url: t._$getUrlWithCsrfKey('/web/j/mocCourseV2RpcBean.getEvaluateAvgAndCount.rpc'),
    };
    n[e.REQUEST_KEYS.POST_COMMENT] = {
      url: t._$getUrlWithCsrfKey('/web/j/mocCourseV2RpcBean.addOrEditCourseEvaluate.rpc'),
    };
  },
  '5147903096318e5db3d048c483fc6b12',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
);
