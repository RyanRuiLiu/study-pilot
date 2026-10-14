EDU(
  'a3819abcbce305738ac672636dcc946d',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('nej.u'),
      s = NEJ.P('edu.u'),
      r;
    var c = i._$pushCSSText(
      '    \t\t.#<uispace> .triangle{position:absolute;top:0;width:14px;height:10px;background: url(' +
        e.imageUrlMap.forum_icon_sprite +
        ') no-repeat -100px -2px;}    \t\t.#<uispace> .wrap{margin-top:7px;border:1px solid #ddd;border-radius:2px;}    \t\t.#<uispace> .wrap .m-comment-pool{padding:0 10px;}    \t\t.#<uispace> .wrap .m-comment-pool .j-list{padding-bottom:20px;}    \t\t.#<uispace> .wrap .m-add-comment{padding:15px 10px;background-color:#fafafa;border-top:1px solid #eee;position:relative;}    \t\t',
    );
    var d = i._$addNodeTemplate(
      '<div class="m-commentWrapper f-pr f-cb">\t\t\t   <div class="wrap f-fr">\t\t       \t\t<div class="m-comment-pool j-commentpool"></div>\t\t       \t\t<div class="m-add-comment j-addcomment"></div>\t\t       \t</div>\t\t\t   <div class="j-triangle triangle"></div>\t\t </div>',
    );
    s._$$CommentWrapper = NEJ.C();
    r = s._$$CommentWrapper._$extend(s._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = d;
      this.__seed_css = c;
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__triangle = i._$getByClassName(this.__body, 'j-triangle')[0];
      this.__cmtpoolNode = i._$getByClassName(this.__body, 'j-commentpool')[0];
      this.__addcmtNode = i._$getByClassName(this.__body, 'j-addcomment')[0];
    };
    r.__addCommentCb = function (e) {
      if (e && this.__cmtpoolUI) {
        this.__cmtpoolUI._$genUIItem(e);
        this._$dispatchEvent('onAddItem');
      }
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__cmtData = e.cmtData;
      this.__triangle.style.right = e.triRight + 'px' || '0px';
      this.__addcmtUI = s._$$AddComment._$allocate({
        parent: this.__addcmtNode,
        postId: this.__cmtData.postId,
        replyId: this.__cmtData.id,
        submitCallback: this.__addCommentCb._$bind(this),
        onBanned: function () {
          this._$dispatchEvent('onBanned');
        }._$bind(this),
      });
      this.__cmtpoolUI = s._$$CommentPool._$allocate({
        parent: this.__cmtpoolNode,
        cmtData: this.__cmtData,
        commentsMaps: e.commentsMaps,
        onUpdateCmtCnt: function (e) {
          this._$dispatchEvent('onUpdateCmtCnt', e);
        }._$bind(this),
        onDelItem: function () {
          this._$dispatchEvent('onDelItem');
        }._$bind(this),
        onVote: function (e) {
          this._$dispatchEvent('onVote', e);
        }._$bind(this),
        onBanned: function () {
          this._$dispatchEvent('onBanned');
        }._$bind(this),
      });
    };
    r._$handleTriangle = function (e) {
      if (e) s._$showNode(this.__triangle);
      else s._$hiddenNode(this.__triangle);
    };
    r.__destroy = function () {
      if (this.__cmtpoolUI) this.__cmtpoolUI = s._$$CommentPool._$recycle(this.__cmtpoolUI);
      if (this.__addcmtUI) this.__addcmtUI = s._$$AddComment._$recycle(this.__addcmtUI);
      this.__supDestroy();
    };
  },
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'a234059e7f4c350dd8920f68f370bdc9',
  'ba24f6842569f3bad309e01524f2ffbd',
  '5c2a91c71128fa627b0f43cdbb2ea6c7',
  '342ad7ae4eea50c3cad860686650a915',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
);
