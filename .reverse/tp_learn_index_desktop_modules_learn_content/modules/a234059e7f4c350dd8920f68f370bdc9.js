EDU(
  'a234059e7f4c350dd8920f68f370bdc9',
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
      '       .#<uispace> {width:550px;}       .#<uispace> .small{background-color:#fff;border:1px solid #dfdfdf;padding:10px;color:#999;}       .#<uispace> .small a{color:#61A500;}       .#<uispace> .small.j-logupbox{cursor:pointer;}       .#<uispace> .ui-richEditor .rich-editor .ztbar{padding:0 4px;}       ',
    );
    var l = o._$addHtmlTemplate(
      '<div>    \t\t<p class="small j-unlogbox">${lang.KEY_LEARN_LOGIN_CLICK}<a hidefocus="true" class="j-loginbtn loginbtn">${lang.KEY_LEARN_LOG_IN}</a></p>    \t\t<p class="small j-logupbox">${lang.KEY_LEARN_ADD_COMMENT}...</p>    \t\t<div class="j-logdownbox"></div>        </div>',
    );
    r._$$AddComment = NEJ.C();
    c = r._$$AddComment._$extend(r._$$UIBase, !0);
    c.__initXGui = function () {
      this.__seed_html = o._$addNodeTemplate(
        o._$getHtmlTemplate(l, { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = d;
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__unlogBox = o._$getByClassName(this.__body, 'j-unlogbox')[0];
      this.__logupBox = o._$getByClassName(this.__body, 'j-logupbox')[0];
      this.__logdownBox = o._$getByClassName(this.__body, 'j-logdownbox')[0];
      this.__loginBtn = o._$getByClassName(this.__body, 'j-loginbtn')[0];
      a._$addEvent(this.__logupBox, 'click', this.__upDownHandle._$bind(this, !0, !0));
      a._$addEvent(this.__loginBtn, 'click', this.__loginHandle._$bind(this));
      this.__banUserUtil = new e.BanUserUtil();
      this.__forumDetailCache = new s._$$COM_Cache_ForumDetailCache();
      this.__forumDetailCache._$addEvent('onAddComment', this.__onAddCommentCb._$bind(this));
    };
    c.__loginHandle = function (e) {
      a._$stop(e);
      r._$$LoginDialog._$showLogin({});
    };
    c.__upDownHandle = function (e, t) {
      var n = function () {
        if (e) {
          r._$hiddenNode(this.__logupBox);
          r._$showNode(this.__logdownBox);
          this.__editor = r._$$RichEditItem._$allocate({
            parent: this.__logdownBox,
            focus: !0,
            initContent: '',
            height: 80,
            btnText: window.moocConfig.lang.KEY_LEARN_ADD_COMMENT,
            onEditClick: this.__addReplyHandle._$bind(this),
            onCloseClick: this._$initUpDownStatus._$bind(this, !1),
          });
        } else {
          if (this.__editor) this.__editor = r._$$RichEditItem._$recycle(this.__editor);
          r._$showNode(this.__logupBox);
          r._$hiddenNode(this.__logdownBox);
        }
      }._$bind(this);
      if (t)
        this.__banUserUtil.checkIsBanned(
          function () {
            n();
          }._$bind(this),
          window.termDto && window.termDto.id,
        );
      else n();
    };
    c._$initUpDownStatus = function (e) {
      if (r._$isUserLogin()) {
        r._$hiddenNode(this.__unlogBox);
        this.__upDownHandle(e);
      } else {
        this.__upDownHandle(!1);
        r._$showNode(this.__unlogBox);
        r._$hiddenNode(this.__logupBox);
      }
    };
    c.__addReplyHandle = function () {
      var e = this.__editor._$getContent();
      if ('' != e)
        this.__forumDetailCache._$addComment(
          {
            postId: this.__postId,
            replyId: this.__replyId,
            content: e,
            anonymous: this.__editor._$getAnonyChecked(),
          },
          r._$formatEditorUrlsGids(this.__editor._$getPhotoIdsAndUrls()),
        );
      else r.showToastTips({ content: window.moocConfig.lang.KEY_LEARN_PLEASE_COMMENT, type: 2 });
    };
    c.__onAddCommentCb = function (e) {
      if (e) {
        if (this.__submitCallback) this.__submitCallback(e);
        this._$initUpDownStatus(!1);
      } else
        r._$$CommonDialog._$showDialog({
          type: 1,
          message: window.moocConfig.lang.KEY_LEARN_POST_AGAIN,
        });
    };
    c.__reset = function (e) {
      this.__submitCallback = e.submitCallback;
      this.__postId = e.postId;
      this.__replyId = e.replyId;
      this.__supReset(e);
      this._$initUpDownStatus(!1);
    };
    c.__destroy = function () {
      if (this.__editor) this.__editor = r._$$RichEditItem._$recycle(this.__editor);
      this.__supDestroy();
    };
  },
  '8eb6c5c05557c81b78bf50f441e3f28c',
  '831c24e8616de4f54d6f34150ec7747d',
  'a55ef22bf1d891c328a7a4bd0d78ccb8',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '5c33d04b2d62fa9ae2df93d96d595865',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '24f8154ce482a05ab133345b291e357f',
  'e8fb5373e2239362823bb77f6fc2ce39',
  '342ad7ae4eea50c3cad860686650a915',
  '15343e9e5cd54986fb9a9452a3eb9adb',
  'cc26d5920093e9742f0feca3855e8e68',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
