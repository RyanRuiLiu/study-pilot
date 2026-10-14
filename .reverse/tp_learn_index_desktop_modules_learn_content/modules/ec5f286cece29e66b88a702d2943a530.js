EDU(
  'ec5f286cece29e66b88a702d2943a530',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('nej.u'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.u'),
      c,
      d;
    var l = i._$pushCSSText(
      '    \t\t.#<uispace> .rinfobox{padding:30px 0 10px 0; border-bottom:1px solid #eee;}    \t\t.#<uispace> .allbox{margin-bottom:20px;}    \t\t',
    );
    var _ = i._$addNodeTemplate(
      '<div>\t\t    <div class="j-post"></div>\t\t    <div class="j-banState"></div>\t\t    <div class="rinfobox f-cb">\t\t        <h4 class="j-reply-info f-fl"></h4>\t\t        <div class="j-reply-sort f-fr"></div>\t\t    </div>\t\t\t<div class="j-reply-all allbox"></div>\t\t    <div class="j-reply-add"></div>\t\t</div>',
    );
    r._$$ForumDetailUI = NEJ.C();
    c = r._$$ForumDetailUI._$extend(r._$$UIBase, !0);
    d = r._$$ForumDetailUI._$supro;
    c.__initXGui = function () {
      this.__seed_html = _;
      this.__seed_css = l;
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__postNode = i._$getByClassName(this.__body, 'j-post')[0];
      this.__replyInfoNode = i._$getByClassName(this.__body, 'j-reply-info')[0];
      this.__replySortNode = i._$getByClassName(this.__body, 'j-reply-sort')[0];
      this.__replyAllNode = i._$getByClassName(this.__body, 'j-reply-all')[0];
      this.__replyAddNode = i._$getByClassName(this.__body, 'j-reply-add')[0];
      this.__banStateNode = i._$getByClassName(this.__body, 'j-banState')[0];
      this.__forumDetailCache = new s._$$COM_Cache_ForumDetailCache();
      this.__forumDetailCache._$addEvent(
        'oncheckUserBannedList',
        this.__onCheckForumIsJustShow._$bind(this, -1, 'banned'),
      );
      this.__ForumListCache = new s._$$COM_Cache_ForumCache();
      this.__ForumListCache._$addEvent(
        'ongetMocForumDto',
        this.__onCheckForumIsJustShow._$bind(this, -1, 'close'),
      );
    };
    c.__onSortChange = function (e) {
      if (this.__replyPool && e) this.__replyPool._$changeSortType(e.sortType, e.sortAsc);
    };
    c.__onBanned = function () {
      i._$scrollTo(this.__banStateNode);
    };
    c.__onReplyHandle = function () {
      if (this.__addReply) {
        this.__addReply._$clearCtAndAnony(!0);
        i._$scrollTo(this.__addReply._$getBody());
      } else if (this.__isJustShow > 0) this.__onBanned();
    };
    c.__onDelItem = function () {
      this.__postVo.countReply -= 1;
      this.__showReplyTotal();
    };
    c.__updateReplyCountHandle = function (e) {
      this.__postVo.countReply = e;
      this.__showReplyTotal();
    };
    c.__showReplyTotal = function () {
      this.__replyInfoNode.innerText =
        window.moocConfig.lang.KEY_LEARN_TOTAL +
        ' ' +
        (this.__postVo.countReply || 0) +
        ' ' +
        window.moocConfig.lang.KEY_LEARN_REPLIES;
    };
    c.__submitCb = function (t) {
      this.__postUI._$followStatusHandle(!0);
      this.__replyPool._$genUIItem(t);
      this.__postVo.countReply += 1;
      this.__showReplyTotal();
      if (!e.isPreview)
        r._$trackEvent('forum', 'answerPost', r._$convertToJSONHex(this.__buildBaseGAData()));
    };
    c.__buildBaseGAData = function () {
      var t = {
        userId: r._$getWebUser().id,
        courseId: e.courseDto.id,
        termId: this.__postVo.termId,
        postId: this.__postVo.id,
        postType: this.__postVo.type,
      };
      if (this.__postVo.relateUnit) {
        t['lessonId'] = this.__postVo.relateUnit.lessonId;
        t['unitId'] = this.__postVo.relateUnit.id;
      }
      return t;
    };
    c.__trackVoteInfoData = function (t) {
      if (!e.isPreview) {
        var n = this.__buildBaseGAData();
        NEJ.X(n, t);
        r._$trackEvent('forum', 'vote', r._$convertToJSONHex(n));
      }
    };
    c.__onGenPostUI = function () {
      this.__isJustShow = r._$isForumJustShow();
      this.__postUI = r._$$PostItem._$allocate({
        parent: this.__postNode,
        postVo: this.__postVo,
        onReply: this.__onReplyHandle._$bind(this),
        onVote: this.__trackVoteInfoData._$bind(this),
        onBanned: this.__onBanned._$bind(this),
      });
      this.__sortUI = r._$$TalkSortItem._$allocate({
        parent: this.__replySortNode,
        showTypes: ['gmt_create', 'vote_count'],
        sortType: this.__initSortType,
        sortAsc: this.__initAsc,
        onSortChange: this.__onSortChange._$bind(this),
      });
      this.__replyPool = r._$$ReplyPool._$allocate({
        parent: this.__replyAllNode,
        postVo: this.__postVo,
        sortType: this.__initSortType,
        sortAsc: this.__initAsc,
        updateCount: this.__updateReplyCountHandle._$bind(this),
        onDelItem: this.__onDelItem._$bind(this),
        onAddCmtItem: function (t) {
          this.__postUI._$followStatusHandle(!0);
          if (!e.isPreview) {
            var n = this.__buildBaseGAData();
            n['replyId'] = t.id;
            r._$trackEvent('forum', 'commentReply', r._$convertToJSONHex(n));
          }
        }._$bind(this),
        onVote: this.__trackVoteInfoData._$bind(this),
        onBanned: this.__onBanned._$bind(this),
      });
      if (this.__isJustShow < 0)
        this.__addReply = r._$$AddReply._$allocate({
          parent: this.__replyAddNode,
          postId: this.__postVo.id,
          termId: this.__postVo.termId,
          submitCallback: this.__submitCb._$bind(this),
        });
      else if (this.__isJustShow > 1)
        this.__banStateNode.innerHTML = i._$getHtmlTemplate('jst-edu-' + this.__isJustShow, {
          lang: (window.moocConfig || {}).lang || {},
        });
      this.__forumDetailCache._$addBrowseCount(this.__postVo.id);
      this.__forumDetailCache._$clearUnreadCount(this.__postVo.id, this.__postVo.termId);
    };
    c.__reset = function (t) {
      this.__supReset(t);
      this.__forumData = t.forumData || {};
      this.__termId = t.termId || e.termDto.id;
      this.__ForumListCache._$getMocForumDto(
        this.__forumData.subForumId > 0 ? this.__forumData.subForumId : this.__forumData.forumId,
      );
      this.__forumDetailCache._$checkUserBannedList(this.__termId);
      this.__sentinel = 2;
      this.__postVo = t.postVo;
      this.__initSortType = 'gmt_create';
      this.__initAsc = 'desc';
      this.__banStateNode.innerHTML = '';
    };
    c.__onCheckForumIsJustShow = function (t, n, i) {
      if (i)
        if ('banned' == n) e.bannedState = { site: i[0], term: i[1] };
        else if ('close' == n) {
          e.mergedClosedStatus = i.mergedClosedStatus;
          e.forumType = i.type;
        }
      this.__sentinel += t;
      if (!(this.__sentinel > 0)) this.__onGenPostUI();
    };
    c.__clearUI = function () {
      if (this.__postUI) this.__postUI = r._$$PostItem._$recycle(this.__postUI);
      if (this.__sortUI) this.__sortUI = r._$$TalkSortItem._$recycle(this.__sortUI);
      if (this.__replyPool) this.__replyPool = r._$$ReplyPool._$recycle(this.__replyPool);
      if (this.__addReply) this.__addReply = r._$$AddReply._$recycle(this.__addReply);
    };
    c.__destroy = function () {
      this.__clearUI();
      this.__supDestroy();
    };
  },
  'f89bf7955a392302db95e1359fe83de6',
  '919745c60678236fdf2cbf9d4a1b416e',
  'd550f98719e03a495e71e818d9e95af6',
  '0a60a58976df980417d408dd43f51aac',
  'e8fb5373e2239362823bb77f6fc2ce39',
  '1f83f8e3c9352095fd466c5ef180fb8d',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  '342ad7ae4eea50c3cad860686650a915',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
);
