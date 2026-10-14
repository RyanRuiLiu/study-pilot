EDU(
  '5c2a91c71128fa627b0f43cdbb2ea6c7',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('edu.d'),
      s = NEJ.P('edu.u'),
      r;
    var c = i._$pushCSSText(
      '    \t\t.#<uispace>{border-bottom:1px solid #eee;}    \t\t.#<uispace> .m-detailInfoItem .bar{padding:5px 0;}    \t\t',
    );
    var d = i._$addNodeTemplate('<div></div>');
    s._$$CommentItem = NEJ.C();
    r = s._$$CommentItem._$extend(s._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = d;
      this.__seed_css = c;
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__forumDetailCache = new a._$$COM_Cache_ForumDetailCache();
      this.__forumDetailCache._$addEvent('onDelComment', this.__onDelCommentCb._$bind(this));
    };
    r.__onDelCommentCb = function (e) {
      if (e) {
        this._$dispatchEvent('onDelSuc', e);
        s._$$CommentItem._$recycle(this);
      }
    };
    r.__onDelHandle = function () {
      s._$$CommonDialog._$showDialog({
        type: 1,
        message: window.moocConfig.lang.KEY_LEARN_ARE_COMMENT,
        okFunc: function () {
          this.__forumDetailCache._$delComment(this.__commentVo.postId, this.__commentVo.id);
        }._$bind(this),
        cancelFunc: n._$bind(this),
        focusNum: 1,
      });
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__commentVo = e.commentVo;
      this.__infoItem = s._$$DetailInfoItem._$allocate({
        parent: this.__body,
        infoVo: this.__commentVo,
        userDto: this.__commentVo.commentor,
        showCmtBtn: !1,
        type: s.CONST.TALK_VOTE_COMMENT,
        onVote: function (e) {
          this._$dispatchEvent('onVote', e);
        }._$bind(this),
        onBanned: function () {
          this._$dispatchEvent('onBanned');
        }._$bind(this),
      });
      this.__infoItem._$addEvent('onDel', this.__onDelHandle._$bind(this));
    };
    r.__destroy = function () {
      if (this.__infoItem) this.__infoItem = s._$$DetailInfoItem._$recycle(this.__infoItem);
      this.__supDestroy();
    };
  },
  'ea3f5e83db4dc94c1e618ff6219e35d5',
  'e8fb5373e2239362823bb77f6fc2ce39',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '342ad7ae4eea50c3cad860686650a915',
  '93828627ddb358ed890cb65967a0c1de',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
);
