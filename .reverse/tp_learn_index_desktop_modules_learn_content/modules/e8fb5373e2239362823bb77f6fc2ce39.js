EDU(
  'e8fb5373e2239362823bb77f6fc2ce39',
  function (e, t) {
    var n = NEJ.O,
      i = NEJ.P('nej.j'),
      o = NEJ.P('nej.u'),
      a = NEJ.P('edu.d'),
      s = NEJ.P('edu.u'),
      r = o._$randNumberString(),
      c,
      d = 'ck-forumDetailCache';
    a._$$COM_Cache_ForumDetailCache = NEJ.C();
    c = a._$$COM_Cache_ForumDetailCache._$extend(a._$$COM_Cache);
    c._$getPostDetailById = function (e) {
      this._$postDWR({
        key: d + r,
        url: 'PostBean.getPostDetailById',
        param: [e],
        onload: this.__cbGetPostDetailById._$bind(this),
      });
    };
    c.__cbGetPostDetailById = function (e) {
      this._$dispatchEvent('onGetPostDetailById', e);
    };
    c._$addBrowseCount = function (e) {
      this._$postDWR({
        notShowLoading: !0,
        key: d + r,
        url: 'PostBean.incrPostBrowse',
        param: [e],
        onload: this.__cbAddBrowseCount._$bind(this),
      });
    };
    c.__cbAddBrowseCount = function (e) {
      this._$dispatchEvent('onAddBrowseCount', e);
    };
    c._$clearUnreadCount = function (e, t) {
      this._$postDWR({
        notShowLoading: !0,
        key: d + r,
        url: 'PostBean.clearUnreadCount',
        param: [e, t],
        onload: this.__cbclearUnreadCount._$bind(this),
      });
    };
    c.__cbclearUnreadCount = function (e) {
      this._$dispatchEvent('onclearUnreadCount', e);
    };
    c._$delPost = function (e) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.deletePost',
        param: [e],
        onload: this.__cbDelPost._$bind(this),
      });
    };
    c.__cbDelPost = function (e) {
      this._$dispatchEvent('onDelPost', e);
    };
    c._$followPost = function (e) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.changePostFollow',
        param: [e, !0],
        onload: this.__onFollowPost._$bind(this),
      });
    };
    c.__onFollowPost = function (t) {
      var n = e.KEY_FORUM_TIP_FOCUS;
      var i = e.KEY_FORUM_TIP_FOCUS_FAIL;
      if (t) {
        s.showToastTips({ content: n, type: 1 });
        this._$dispatchEvent('onFollowPost', t);
      } else s.showToastTips({ content: i, type: 2 });
    };
    c._$cancelFollowPost = function (e) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.changePostFollow',
        param: [e, !1],
        onload: this.__onCancelFollowPost._$bind(this),
      });
    };
    c.__onCancelFollowPost = function (t) {
      var n = e.KEY_FORUM_TIP_CANCEL_SUC;
      var i = e.KEY_FORUM_TIP_CANCEL_FAIL;
      if (t) {
        s.showToastTips({ content: n, type: 1 });
        this._$dispatchEvent('onCancelFollowPost', t);
      } else s.showToastTips({ content: i, type: 2 });
    };
    c._$addRely = function (e, t) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.addReply',
        param: [e, t],
        onload: this.__cbAddReply._$bind(this),
      });
    };
    c.__cbAddReply = function (e) {
      this._$dispatchEvent('onAddReply', e);
    };
    c._$delReply = function (e, t) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.deleteReply',
        param: [e, t],
        onload: this.__cbOnDelReply._$bind(this),
      });
    };
    c.__cbOnDelReply = function (e) {
      this._$dispatchEvent('onDelReply', e);
    };
    c._$getReplyList = function (e, t, n, i) {
      var o = 'gmt_create' == t ? ('asc' == n ? 1 : 2) : 3;
      this._$postDWR({
        key: d + r,
        url: 'PostBean.getPaginationReplys',
        param: [e, o, i],
        onload: this.__cbOnGetReplyList._$bind(this),
      });
    };
    c.__cbOnGetReplyList = function (e) {
      this._$dispatchEvent('onGetReplyList', e);
    };
    c._$getCommentList = function (e, t) {
      this._$postDWR({
        key: d + r,
        url: 'PostBean.getPaginationComments',
        param: [e, t],
        onload: this.__cbOnGetCmtList._$bind(this),
      });
    };
    c.__cbOnGetCmtList = function (e) {
      this._$dispatchEvent('onGetCmtList', e);
    };
    c._$addComment = function (e, t) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.addComment',
        param: [e, t],
        onload: this.__cbAddComment._$bind(this),
      });
    };
    c.__cbAddComment = function (e) {
      this._$dispatchEvent('onAddComment', e);
    };
    c._$delComment = function (e, t) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.deleteComment',
        param: [e, t],
        onload: this.__cbOnDelComment._$bind(this),
      });
    };
    c.__cbOnDelComment = function (e) {
      this._$dispatchEvent('onDelComment', e);
    };
    c._$talkVote = function (e, t, n, i, o) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.markVote',
        param: [e, t, n, i, o],
        onload: this.__cbOnVote._$bind(this),
      });
    };
    c.__cbOnVote = function (e) {
      this._$dispatchEvent('onVote', e);
    };
    c._$markTop = function (e, t, n, i) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.markTop',
        param: [e, t, n, i ? 1 : 0],
        onload: this.__cbOnMarkTop._$bind(this, i),
      });
    };
    c.__cbOnMarkTop = function (t, n) {
      var i = e.KEY_FORUM_TIP_MARCK_STIIC;
      var o = e.KEY_FORUM_TIP_CANCEL_STIIC;
      if (n) s.showToastTips({ content: t ? i : o, type: 1 });
      this._$dispatchEvent('onMarkTop', n);
    };
    c._$markAgree = function (e, t, n, i) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.markAgree',
        param: [e, t, n, i ? 1 : 0],
        onload: this.__cbOnMarkAgree._$bind(this, i),
      });
    };
    c.__cbOnMarkAgree = function (t, n) {
      var i = e.KEY_FORUM_TIP_MARCK_APPROVAL;
      var o = e.KEY_FORUM_TIP_CANCEL_APPROVAL;
      if (n) s.showToastTips({ content: t ? i : o, type: 1 });
      this._$dispatchEvent('onMarkAgree', n);
    };
    c._$markSolve = function (e, t) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.markSolve',
        param: [e, t ? 1 : 0],
        onload: this.__cbOnMarkSolve._$bind(this, t),
      });
    };
    c.__cbOnMarkSolve = function (t, n) {
      var i = e.KEY_FORUM_TIP_MARCK_RESOLVE;
      var o = e.KEY_FORUM_TIP_CANCEL_RESOLVE;
      if (n) s.showToastTips({ content: t ? i : o, type: 1 });
      this._$dispatchEvent('onMarkSolve', n);
    };
    c._$checkPosterInfo = function (e, t, n) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.checkPosterInfo',
        param: [e, t, n],
        onload: this.__cbOnCheckPosterInfo._$bind(this),
      });
    };
    c.__cbOnCheckPosterInfo = function (e) {
      this._$dispatchEvent('onCheckPosterInfo', e);
    };
    c._$addPost = function (e, t) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.addPost',
        param: [e, t],
        onload: this.__cbAddPost._$bind(this),
      });
    };
    c.__cbAddPost = function (e) {
      this._$dispatchEvent('onAddPost', e);
    };
    c._$editPost = function (e, t) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.editPost',
        param: [e, t],
        onload: this.__cbEditPost._$bind(this),
      });
    };
    c.__cbEditPost = function (e) {
      this._$dispatchEvent('onEditPost', e);
    };
    c._$setUserBannedForSite = function (e, t, n) {
      this._$postDWR({
        key: d + e,
        url: 'MocForumBean.setUserBannedForSite',
        param: [e, t],
        onload: n || this.__cbsetUserBannedForSite._$bind(this, t),
      });
    };
    c.__cbsetUserBannedForSite = function (e, t) {
      this._$dispatchEvent('onsetUserBannedForSite', t, e);
    };
    c._$setUserBannedForTerm = function (e, t, n, i) {
      this._$postDWR({
        key: d + e,
        url: 'MocForumBean.setUserBannedForTerm',
        param: [e, t, n],
        onload: i || this.__cbsetUserBannedForTerm._$bind(this, n),
      });
    };
    c.__cbsetUserBannedForTerm = function (e, t) {
      this._$dispatchEvent('onsetUserBannedForTerm', t, e);
    };
    c._$checkUserBannedList = function (e, t) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.checkUserBannedList',
        param: [e],
        onload: t || this.__cbcheckUserBannedList._$bind(this),
      });
    };
    c.__cbcheckUserBannedList = function (e) {
      this._$dispatchEvent('oncheckUserBannedList', e);
    };
    c._$copyGoodPost = function (e, t, n) {
      this._$postDWR({
        key: d + r,
        url: 'MocForumBean.copyGoodPost',
        param: [e, t, n],
        onload: this.__cbCopyGoodPost._$bind(this),
      });
    };
    c.__cbCopyGoodPost = function (e) {
      this._$dispatchEvent('onCopyGoodPost', e);
    };
    return a;
  },
  '61a3a3a5a602c34a33d876f6138c6ede',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '7c94ca1edcf8eeb73b931ff94fdcb255',
  'cc26d5920093e9742f0feca3855e8e68',
  'fe86216ed59e3103a56c42c850d389f0',
);
