EDU(
  'ba24f6842569f3bad309e01524f2ffbd',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('edu.m'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.u'),
      c;
    r._$$CommentPool = NEJ.C();
    c = r._$$CommentPool._$extend(a._$$BasePool, !0);
    c.__initNode = function () {
      this.__showPager = !0;
      this.__supInitNode();
      this.__forumDetailCache = new s._$$COM_Cache_ForumDetailCache();
      this.__forumDetailCache._$addEvent('onGetCmtList', this.__onGetCmtListCb._$bind(this));
    };
    c.__itemGen = function (e) {
      var t = r._$$CommentItem._$allocate({
        commentVo: e,
        onDelSuc: this.__itemDelCb._$bind(this),
        onVote: function (e) {
          this._$dispatchEvent('onVote', e);
        }._$bind(this),
        onBanned: function () {
          this._$dispatchEvent('onBanned');
        }._$bind(this),
      });
      return t;
    };
    c.__itemDestroy = function (e) {
      return r._$$CommentItem._$recycle(e);
    };
    c.__onPageChange = function (e) {
      var t = e ? e.index : -1;
      if (this.__curIndex && this.__curIndex != t) {
        this.__curIndex = t;
        this.__forumDetailCache._$getCommentList(this.__cmtData.id, this.__curIndex);
      }
    };
    c.__onGetCmtListCb = function (e) {
      if (e) {
        var t = this.__changeCommentsData(e);
        this.__cbOnRead(t);
        this.__onUpdateCmtCnt(e);
      }
    };
    c.__onUpdateCmtCnt = function (e) {
      if (e) this._$dispatchEvent('onUpdateCmtCnt', e.totalCount);
    };
    c.__changeCommentsData = function (e) {
      var t = null;
      if (e) t = { totlePageCount: e.totalPageCount, currentPageNo: e.pageNo, list: e.list || [] };
      return t;
    };
    c.__reset = function (e) {
      this.__cmtData = e.cmtData;
      e.dataMaps = this.__changeCommentsData(e.commentsMaps);
      this.__supReset(e);
      this.__onUpdateCmtCnt(e.commentsMaps);
    };
  },
  'fb689a88a2915cc7060dce11733a426e',
  '5c2a91c71128fa627b0f43cdbb2ea6c7',
  'e8fb5373e2239362823bb77f6fc2ce39',
);
