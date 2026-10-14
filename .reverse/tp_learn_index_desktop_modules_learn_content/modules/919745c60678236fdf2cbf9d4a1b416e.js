EDU(
  '919745c60678236fdf2cbf9d4a1b416e',
  function () {
    var e = (window.moocConfig || {}).lang || {};
    var t = window,
      n = NEJ.O,
      i = NEJ.F,
      o = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('edu.u'),
      c;
    r._$$AddReply = NEJ.C();
    c = r._$$AddReply._$extend(r._$$RichEditItem, !0);
    c.__initNode = function () {
      this.__supInitNode();
      this.__forumDetailCache = new s._$$COM_Cache_ForumDetailCache();
      this.__forumDetailCache._$addEvent('onAddReply', this.__onAddReplyCb._$bind(this));
    };
    c.__addReplyHandle = function () {
      var t = this._$getContent();
      if ('' != t)
        this.__forumDetailCache._$addRely(
          { postId: this.__postId, content: t, anonymous: this._$getAnonyChecked() },
          r._$formatEditorUrlsGids(this._$getPhotoIdsAndUrls()),
        );
      else r.showToastTips({ content: e.KEY_LEARN_PLEASE_ANSWER_CONTENT, type: 2 });
    };
    c.__onAddReplyCb = function (e) {
      if (e) {
        if (this.__submitCallback) this.__submitCallback(e);
        this._$clearCtAndAnony(!0);
      } else r._$$CommonDialog._$showDialog({ type: 1, message: '发表失败，请刷新重试' });
    };
    c.__reset = function (t) {
      t.btnText = t.btnText || e.KEY_LEARN_POST_COMMENT;
      this.__submitCallback = t.submitCallback;
      this.__postId = t.postId;
      this._$addEvent('onEditClick', this.__addReplyHandle._$bind(this));
      t.notShowClose = !0;
      t.focus = !1;
      t.initContent = '';
      this.__supReset(t);
    };
  },
  '831c24e8616de4f54d6f34150ec7747d',
  'cc26d5920093e9742f0feca3855e8e68',
  '24f8154ce482a05ab133345b291e357f',
  'e8fb5373e2239362823bb77f6fc2ce39',
  'ab6af9f7e26b55b8c5a875bba5679347',
);
