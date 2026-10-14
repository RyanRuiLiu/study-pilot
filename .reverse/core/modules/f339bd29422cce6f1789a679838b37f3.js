EDU(
  'f339bd29422cce6f1789a679838b37f3',
  function (e, t, n, i, o, a) {
    var r = o._$isWap();
    a._$getPostByUserId = function (t, n) {
      e._$request({
        url: '/web/j/MocPostRpcBean.getPostByUserId.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: r,
      });
    };
    a._$getReplyByUserId = function (t, n) {
      e._$request({
        url: '/web/j/MocPostRpcBean.getReplyByUserId.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: r,
      });
    };
    a._$getCommentByUserId = function (t, n) {
      e._$request({
        url: '/web/j/MocPostRpcBean.getCommentByUserId.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: r,
      });
    };
    a._$clearUnreadCount = function (t, n) {
      e._$request({
        url: '/web/j/postBean.clearUnreadCount.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: r,
      });
    };
    a._$getActivitySignAndEnrollStatus = function (t, n) {
      e._$request({
        url: '/web/j/MocActivityScholarshipRpcBean.getActivitySignAndEnrollStatus.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: r,
      });
    };
    a._$getActivitySignAndEnrollStatusByUserId = function (t, n) {
      e._$request({
        url: '/web/j/MocActivityScholarshipRpcBean.getActivitySignAndEnrollStatusByUserId.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: r,
      });
    };
    a._$getActivityStatisticsByUser = function (t, n) {
      e._$request({
        url: '/web/j/MocActivityScholarshipRpcBean.getActivityStatisticsByUser.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: r,
      });
    };
    a._$getUnreadCount = function (t, n) {
      e._$request({
        url: '/web/j/MocPostRpcBean.getUnreadCount.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: r,
      });
    };
    a._$getActivityStatisticsAndSignCount = function (t, n) {
      e._$request({
        url: '/web/j/MocActivityScholarshipRpcBean.getActivityStatisticsAndSignCount.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: r,
      });
    };
    a._$getPostPaginationByForumId = function (t, n) {
      e._$request({
        url: '/web/j/MocPostRpcBean.getPostPaginationByForumIdAndTagId.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: r,
      });
    };
    a._$getTagByTagFamilyId = function (t, n) {
      e._$request({
        url: '/web/j/mocTagBean.getTagByTagFamilyId.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: r,
      });
    };
    a._$report = function (t, n) {
      e._$request({
        url: '/web/j/reportBean.reportPostV1OrReplyOrComment.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    a._$delete = function (t, n) {
      e._$request({
        url: '/web/j/MocPostRpcBean.deleteReplyOrComment.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    a._$deleteTopic = function (t, n) {
      e._$request({
        url: '/web/j/MocPostRpcBean.deletePost.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    a._$addTag = function (t, n) {
      e._$request({
        url: '/web/j/mocTagBean.setPostTagRel.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    a._$topTopic = function (t, n) {
      e._$request({ url: '/web/j/MocPostRpcBean.markTop.rpc', method: 'post', data: t, onload: n });
    };
    a._$setTopTag = function (t, n) {
      e._$request({
        url: '/web/j/mocTagBean.markPostToMoreTops.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    a._$up = function (t, n) {
      e._$request({
        url: '/web/j/MocPostRpcBean.markVote.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: r,
      });
    };
    a._$addComment = function (t, n) {
      e._$request({
        url: '/web/j/mocForumBean.addReplyOrComment.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    a._$addReply = function (t, n) {
      e._$request({
        url: '/web/j/mocForumBean.addReplyOrComment.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    a._$getComment = function (t, n) {
      e._$request({
        url: '/web/j/MocPostRpcBean.getPaginationReplyComment.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: r,
      });
    };
    a._$getReplyList = function (t, n) {
      e._$request({
        url: '/web/j/MocPostRpcBean.getPaginationPostReplys.rpc',
        method: 'post',
        data: t,
        onload: n,
        notShowLoading: r,
      });
    };
    a._$newPost = function (t, n) {
      e._$request({
        url: '/web/j/mocForumBean.addOrEditPost.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    a._$getAllScoreBoostingProgram = function (t, n) {
      e._$request({
        url: '/web/j/courseBean.getAllScoreBoostingProgram.rpc',
        method: 'post',
        data: t,
        onload: n,
      });
    };
    a._$checkSitePosterInfo = n._$checkSitePosterInfo;
    a.CONST = n.CONST;
  },
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  '02ce57f2ff1381675a8345ca2e16766e',
  'fe86216ed59e3103a56c42c850d389f0',
  '13d9d0a0fedd5c22f2453b15332aedc6',
);
