EDU(
  'd550f98719e03a495e71e818d9e95af6',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('nej.u'),
      s = NEJ.P('edu.m'),
      r = NEJ.P('edu.d'),
      c = NEJ.P('edu.u'),
      d;
    c._$$ReplyPool = NEJ.C();
    d = c._$$ReplyPool._$extend(s._$$BasePool, !0);
    d.__initNode = function () {
      this.__showPager = !0;
      this.__supInitNode();
      this.__forumDetailCache = new r._$$COM_Cache_ForumDetailCache();
      this.__forumDetailCache._$addEvent('onGetReplyList', this.__onGetReplyListCb._$bind(this));
    };
    d.__itemGen = function (e) {
      var t = c._$$ReplyItem._$allocate({
        replyVo: e,
        onDelSuc: this.__itemDelCb._$bind(this),
        onAddCmtItem: function (e) {
          this._$dispatchEvent('onAddCmtItem', e);
        }._$bind(this),
        onVote: function (e) {
          this._$dispatchEvent('onVote', e);
        }._$bind(this),
        onBanned: function () {
          this._$dispatchEvent('onBanned');
        }._$bind(this),
      });
      return t;
    };
    d.__itemDestroy = function (e) {
      return c._$$ReplyItem._$recycle(e);
    };
    d.__onPageChange = function (e) {
      var t = e ? e.index : -1;
      if (this.__curIndex && this.__curIndex != t) {
        this.__curIndex = t;
        this.__forumDetailCache._$getReplyList(
          this.__postVo.id,
          this.__sortType,
          this.__sortAsc,
          this.__curIndex,
        );
      }
    };
    d.__onGetReplyListCb = function (e) {
      if (e) {
        var t = this.__changeReplysData(e);
        this.__cbOnRead(t);
        this.__onUpdateReplysCnt(e);
      }
    };
    d.__onUpdateReplysCnt = function (e) {
      if (e) this._$dispatchEvent('updateCount', e.totalCount);
    };
    d.__changeReplysData = function (e) {
      var t = null;
      if (e) t = { totlePageCount: e.totalPageCount, currentPageNo: e.pageNo, list: e.list || [] };
      return t;
    };
    d._$changeSortType = function (e, t) {
      this.__sortType = e;
      this.__sortAsc = t;
      this._$getPageData(1);
    };
    d._$getSortVo = function () {
      return { sortType: this.__sortType, sortAsc: this.__sortAsc };
    };
    d.__reset = function (e) {
      this.__postVo = e.postVo;
      this.__sortType = e.sortType;
      this.__sortAsc = e.sortAsc;
      e.dataMaps = this.__changeReplysData(e.replysMaps);
      this.__supReset(e);
      this.__onUpdateReplysCnt(e.replysMaps);
    };
  },
  'fb689a88a2915cc7060dce11733a426e',
  '8dea050de02418ce18f537ea58c033a2',
  'e8fb5373e2239362823bb77f6fc2ce39',
);
