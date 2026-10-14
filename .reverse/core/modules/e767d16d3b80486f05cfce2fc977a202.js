EDU(
  'e767d16d3b80486f05cfce2fc977a202',
  function (e, t) {
    t.getArticleInfoVo = function (t, n) {
      e._$request({
        url: '/web/j/columnBean.getArticleInfoVo.rpc',
        method: 'post',
        data: { articleId: t, isIncludeRtfContent: !0 },
        onload: n,
      });
    };
    t._$getActivityRelAndTeamInfoVo = function (t, n) {
      e._$request({
        url: '/web/j/activityTeamBean.getActivityRelAndTeamInfoVo.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    t._$getActivityRelAndBargainInfoVo = function (t, n) {
      e._$request({
        url: '/web/j/activityTeamBean.getActivityRelAndBargainInfoVo.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    t._$getMocPromotionCourseIndexListVo = function (t, n) {
      e._$request({
        url: '/web/j/mocPromotionCourseIndexBean.getMocPromotionCourseIndexListVo.rpc',
        method: 'POST',
        onload: n,
        data: t,
      });
    };
    t._$getLearnLessonList = function (t, n) {
      e._$request({
        url: '/web/j/ColumnPublishBean.getLearnLessonList.rpc',
        method: 'POST',
        onload: n,
        data: t,
      });
    };
    t._$getLearnUnitForLessonId = function (t, n) {
      e._$request({
        url: '/web/j/columnPublishBean.getLearnUnitForLessonId.rpc',
        method: 'POST',
        onload: n,
        data: t,
      });
    };
    t._$getPagAnnouncementByTermIdAndStatus = function (t, n) {
      e._$request({
        url: '/web/j/mocAnnouncementRpcBean.getPagAnnouncementByTermIdAndStatus.rpc',
        method: 'POST',
        onload: n,
        data: t,
      });
    };
    t._$getLessonUnitVoListForFree = function (t, n) {
      e._$request({
        url: '/web/j/columnBean.getLessonUnitVoListForFree.rpc',
        method: 'POST',
        onload: n,
        data: t,
      });
    };
    t._$getVideoLessonUnitInfoVo = function (t, n) {
      e._$request({
        url: '/web/j/columnBean.getVideoLessonUnitInfoVo.rpc',
        method: 'POST',
        onload: n,
        data: t,
      });
    };
    t._$getMocLessonBaseDtos = function (t, n) {
      e._$request({
        url: '/web/j/columnBean.getMocLessonBaseDtos.rpc',
        method: 'POST',
        onload: n,
        data: t,
      });
    };
    t._$getLessonUnitBaseVoByLessonId = function (t, n) {
      e._$request({
        url: '/web/j/columnBean.getLessonUnitBaseVoByLessonId.rpc',
        method: 'POST',
        onload: n,
        data: t,
      });
    };
    t._$markVote4ColumnReply = function (t, n) {
      e._$request({
        url: '/web/j/mocForumBean.markVote4ColumnReply.rpc',
        method: 'POST',
        onload: n,
        data: t,
      });
    };
    t._$markVote4ColumnComment = function (t, n) {
      e._$request({
        url: '/web/j/mocForumBean.markVote4ColumnComment.rpc',
        method: 'POST',
        onload: n,
        data: t,
      });
    };
    t._$deleteColumnReplyOrComment = function (t, n) {
      e._$request({
        url: '/web/j/mocForumBean.deleteColumnReplyOrComment.rpc',
        method: 'POST',
        onload: n,
        data: t,
      });
    };
    t._$addOrEditColumnReplyByLessonUnitId = function (t, n) {
      e._$request({
        url: '/web/j/mocForumBean.addOrEditColumnReplyByLessonUnitId.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    t._$addOrEditColumnComment = function (t, n) {
      e._$request({
        url: '/web/j/mocForumBean.addOrEditColumnComment.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    t._$getColumnReplyPagination = function (t, n) {
      t = t || {};
      t.pageSize = t.pageSize || 20;
      t.sort = t.sort || 1;
      e._$request({
        url: '/web/j/mocForumBean.getColumnReplyPagination.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    t._$markRead = function (t, n) {
      e._$request({
        url: '/web/j/columnBean.markLearn.rpc',
        method: 'post',
        data: { lessonUnitId: t },
        onload: n || function () {},
      });
    };
    t._$getEvaluateDtoForOneCourse = function (t, n) {
      e._$request({
        url: '/web/j/mocCourseV2RpcBean.getEvaluateDtoForOneCourse.rpc',
        method: 'post',
        data: t,
        onload: n || function () {},
      });
    };
    t._$getAnnouncementByTermId = function (t, n) {
      e._$request({
        url: '/web/j/mocAnnouncementRpcBean.getAnnouncementByTermId.rpc',
        method: 'post',
        data: t,
        onload: n || function () {},
      });
    };
    t._$getResourceToken = function (t, n) {
      e._$request({
        url: '/web/j/resourceRpcBean.getResourceTokenV2.rpc',
        method: 'POST',
        data: t,
        onload: n || function () {},
      });
    };
    t._$markLearn = function (t, n) {
      e._$request({
        url: '/web/j/columnBean.markLearn.rpc',
        method: 'post',
        data: t,
        onload: n || function () {},
      });
    };
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
);
