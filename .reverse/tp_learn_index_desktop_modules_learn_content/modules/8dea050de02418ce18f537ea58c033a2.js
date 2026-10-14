EDU(
  '8dea050de02418ce18f537ea58c033a2',
  function (e) {
    var t = window,
      n = NEJ.O,
      i = NEJ.F,
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.u'),
      c;
    var d = o._$pushCSSText(
      '    \t\t.#<uispace>{border-bottom:1px solid #eee;zoom:1;}    \t\t.#<uispace> .m-commentWrapper{margin:-5px 0 15px 0;}    \t\t.#<uispace> .m-commentWrapper .wrap{width:570px; position:relative;}    \t\t',
    );
    var l = o._$addNodeTemplate('<div class="f-pr"></div>');
    r._$$ReplyItem = NEJ.C();
    c = r._$$ReplyItem._$extend(r._$$UIBase, !0);
    c.__initXGui = function () {
      this.__seed_html = l;
      this.__seed_css = d;
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__forumDetailCache = new s._$$COM_Cache_ForumDetailCache();
      this.__forumDetailCache._$addEvent('onDelReply', this.__onDelReplyCb._$bind(this));
      this.__banUserUtil = new e.BanUserUtil();
    };
    c.__onDelReplyCb = function (e) {
      if (e) {
        this.__setCmtCount(0);
        this._$dispatchEvent('onDelSuc', e);
        r._$$ReplyItem._$recycle(this);
      }
    };
    c.__onDelHandle = function () {
      r._$$CommonDialog._$showDialog({
        type: 1,
        message:
          '<b>' +
          window.moocConfig.lang.KEY_LEARN_ARE_COMMENT_DELETE +
          '</b><p>' +
          window.moocConfig.lang.KEY_LEARN_ALL_CONFIRMATION +
          '</p>',
        okFunc: function () {
          this.__forumDetailCache._$delReply(this.__replyVo.postId, this.__replyVo.id);
        }._$bind(this),
        cancelFunc: i._$bind(this),
        focusNum: 1,
      });
    };
    c.__onCmtHandle = function (e, t) {
      if (this.__cmtWrapper) this.__cmtWrapper = r._$$CommentWrapper._$recycle(this.__cmtWrapper);
      else if (this.__replyVo.countComment || !e) {
        var n = function () {
          this.__cmtWrapper = r._$$CommentWrapper._$allocate({
            parent: this.__body,
            cmtData: this.__replyVo,
            triRight: 40 * this.__infoItem._$getOptBtnCnt() + 20,
            onUpdateCmtCnt: this.__setCmtCount._$bind(this),
            onAddItem: function () {
              this.__setCmtCount(this.__replyVo.countComment + 1);
              this._$dispatchEvent('onAddCmtItem', this.__replyVo);
            }._$bind(this),
            onDelItem: function () {
              this.__setCmtCount(this.__replyVo.countComment - 1);
            }._$bind(this),
            onVote: function (e) {
              this._$dispatchEvent('onVote', e);
            }._$bind(this),
            onBanned: function () {
              this._$dispatchEvent('onBanned');
            }._$bind(this),
          });
          this.__cmtWrapper._$getBody().style.zIndex = 99;
          if (!this.__replyVo.countComment) this.__cmtWrapper.__addcmtUI._$initUpDownStatus(!0);
        }._$bind(this);
        if (!e)
          this.__banUserUtil.checkIsBanned(
            function () {
              n();
            }._$bind(this),
            window.termDto && window.termDto.id,
          );
        else n();
      }
    };
    c.__setCmtCount = function (e) {
      this.__replyVo.countComment = e > 0 ? e : 0;
      this.__infoItem._$updateCmtCount(this.__replyVo.countComment);
      if (this.__cmtWrapper) this.__cmtWrapper._$handleTriangle(!!this.__replyVo.countComment);
    };
    c.__reset = function (e) {
      this.__supReset(e);
      this.__replyVo = e.replyVo;
      this.__replyVo.countComment = this.__replyVo.countComment || 0;
      this.__body.style.zIndex = e.zIndex || 0;
      this.__infoItem = r._$$DetailInfoItem._$allocate({
        parent: this.__body,
        infoVo: this.__replyVo,
        userDto: this.__replyVo.replyer,
        showCmtBtn: !0,
        type: r.CONST.TALK_VOTE_REPLY,
        onVote: function (e) {
          this._$dispatchEvent('onVote', e);
        }._$bind(this),
      });
      this.__infoItem._$getBody().style.zIndex = 100;
      this.__infoItem._$addEvent('onDel', this.__onDelHandle._$bind(this));
      this.__infoItem._$addEvent('onCmt', this.__onCmtHandle._$bind(this, !1));
      this.__infoItem._$updateCmtCount(this.__replyVo.commentCount);
      this.__onCmtHandle(!0);
    };
    c.__destroy = function () {
      if (this.__infoItem) this.__infoItem = r._$$DetailInfoItem._$recycle(this.__infoItem);
      if (this.__cmtWrapper) this.__cmtWrapper = r._$$CommentWrapper._$recycle(this.__cmtWrapper);
      this.__supDestroy();
    };
  },
  '8eb6c5c05557c81b78bf50f441e3f28c',
  'ea3f5e83db4dc94c1e618ff6219e35d5',
  'e8fb5373e2239362823bb77f6fc2ce39',
  'a3819abcbce305738ac672636dcc946d',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '865336bdee3def2e90e635383cc1e284',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '342ad7ae4eea50c3cad860686650a915',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  '93828627ddb358ed890cb65967a0c1de',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
);
