EDU(
  '1f83f8e3c9352095fd466c5ef180fb8d',
  function () {
    var e = NEJ.O,
      t = NEJ.P('nej.j'),
      n = NEJ.P('nej.u'),
      i = NEJ.P('edu.d'),
      o = NEJ.P('edu.u'),
      a = n._$randNumberString(),
      s,
      r = 'ck-forumCache',
      c = 20;
    i._$$COM_Cache_ForumCache = NEJ.C();
    s = i._$$COM_Cache_ForumCache._$extend(i._$$COM_Cache);
    s._$getForumInfo = function (e) {
      this._$postDWR({
        key: r + a,
        url: 'MocForumBean.getForumInfo',
        param: [e],
        onload: this.__onGetForumInfo._$bind(this),
      });
    };
    s.__onGetForumInfo = function (e) {
      this._$dispatchEvent('onGetForumInfo', e);
    };
    s._$getForumListByTermId = function (e, t, n) {
      this._$postDWR({
        key: r + a,
        url: 'MocForumBean.getForumListByTermId',
        param: [e, t, n],
        onload: this.__onGetForumListByTermId._$bind(this),
      });
    };
    s.__onGetForumListByTermId = function (e) {
      if (e) {
        var t = e[0];
        e[0] = e[1];
        e[1] = e[2];
        e[2] = t;
        if (e[4] && e[4].type == o.CONST.FORUM_TYPE_ELITE) {
          t = e[4];
          e.splice(4, 1);
          e.splice(3, 0, t);
        }
        this._$dispatchEvent('onGetForumListByTermId', e);
      }
    };
    s._$getForumByIdWithChildrens = function (e, t, n, i) {
      this._$postDWR({
        key: r + a,
        url: 'MocForumBean.getForumByIdWithChildrens',
        param: [e, t, n, i],
        onload: this.__onGetForumByIdWithChildrens._$bind(this),
      });
    };
    s.__onGetForumByIdWithChildrens = function (e) {
      this._$dispatchEvent('onGetForumByIdWithChildrens', e);
    };
    s._$getUserFollowedPosts = function (e, t, n, i) {
      this._$postDWR({
        key: r + a,
        url: 'PostBean.getUserFollowedPosts',
        param: [e, t, n, c],
        onload: this.__onGetUserFollowedPosts._$bind(this, i),
      });
    };
    s.__onGetUserFollowedPosts = function (e, t) {
      this._$dispatchEvent('onGetUserFollowedPosts', t, e);
    };
    s._$getAllPostsPagination = function (e, t, n, i, o, s) {
      this._$postDWR({
        key: r + a,
        url: 'PostBean.getAllPostsPagination',
        param: [e, t, n, i, c, o, s || null],
        onload: this.__onGetAllPostsPagination._$bind(this),
      });
    };
    s.__onGetAllPostsPagination = function (e) {
      this._$dispatchEvent('onGetAllPostsPagination', e);
    };
    s._$getForumNavi = function (e, t, n, i) {
      this._$postDWR({
        key: r + a,
        url: 'MocForumBean.getForumNavi',
        param: [e, t, n, i],
        onload: this.__onGetForumNavi._$bind(this),
      });
    };
    s.__onGetForumNavi = function (e) {
      this._$dispatchEvent('onGetForumNavi', e);
    };
    s._$getMocMemberTrim = function (e) {
      this._$postDWR({
        key: r + a,
        url: 'MemberBean.getMocMemberTrim',
        param: [e],
        onload: this.__onGetMocMemberTrim._$bind(this),
      });
    };
    s.__onGetMocMemberTrim = function (e) {
      this._$dispatchEvent('onGetMocMemberTrim', e);
    };
    s._$searchMocForum = function (e, t) {
      e = NEJ.X(e || {}, { highlight: !0 });
      this._$postDWR({
        key: r + a,
        url: 'MocForumBean.searchMocForum',
        notShowLoading: !0,
        param: [e, t],
        onload: this.__onSearchMocForum._$bind(this),
      });
    };
    s.__onSearchMocForum = function (e) {
      this._$dispatchEvent('onSearchMocForum', e);
    };
    s._$getMocForumDto = function (e) {
      this._$postDWR({
        key: r + a,
        url: 'MocForumBean.getMocForumDto',
        param: [e],
        onload: this.__ongetMocForumDto._$bind(this),
      });
    };
    s.__ongetMocForumDto = function (e) {
      this._$dispatchEvent('ongetMocForumDto', e);
    };
  },
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  '93828627ddb358ed890cb65967a0c1de',
  'fe86216ed59e3103a56c42c850d389f0',
);
