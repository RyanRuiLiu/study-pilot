EDU(
  '8e64365cbe06bc9335712c8b6f1e60c0',
  function (e, t, n, i, o, a, r, s, c, d) {
    var l = t.$extends({
      config: function () {
        this.cache = i.UserAnswerSheet._$allocate({
          scope: s.getScope(),
          onGetAnswerSheet: this._cbGetAnswerSheet._$bind(this),
        });
        n.extend(this, { isFirstReq: !0 });
        n.extend(this.data, {
          lectorAccount: '',
          liveId: -1,
          account: '',
          mountDom: document.body,
        });
        this.supr();
        this.onIMCacheReady();
        this._agreeList = new d({ data: { hasMask: !0 } }).$inject(document.body);
      },
      init: function () {
        this.supr();
      },
      onIMCacheReady: function () {
        this.chatroom = o.getInstance();
        this.cache.getAnswerSheet({
          param: { liveId: +this.data.liveId },
          onload: 'onGetAnswerSheet',
        });
        this.chatroom._$addEvent(a.CUSTOM.START_ANSWER, this._onAnswerSheetMsgArrive._$bind(this));
        this.chatroom._$addEvent(a.CUSTOM.END_ANSWER, this._onAnswerSheetMsgArrive._$bind(this));
        this.chatroom._$addEvent(a.CUSTOM.CLOSE_ANSWER, this._onAnswerSheetMsgArrive._$bind(this));
        this.chatroom._$addEvent(a.CUSTOM.UPVOTE, this._onVoteMsgArrive._$bind(this));
      },
      _onVoteMsgArrive: function (e) {
        var t;
        for (var n = 0; n < e.length; n++) {
          t = e[n].content.msgBody.name;
          this._agreeList.pulishAgreeListItem({ node: this.data.mountDom, name: t });
        }
      },
      _onAnswerSheetMsgArrive: function (e) {
        for (var t = 0; t < e.length; t++)
          if (e[0].content && e[0].content.msgBody) this.quizId = e[0].content.msgBody.quizId;
        this.cache.getAnswerSheet({
          data: { quizId: this.quizId },
          param: { liveId: this.data.liveId },
          onload: 'onGetAnswerSheet',
        });
      },
      _cbGetAnswerSheet: function (e) {
        this.liveId = e.liveId;
        this.quizId = e.id;
        this.switchStatus(e.status);
        this.isFirstReq = !1;
      },
      switchStatus: function (e) {
        switch (e) {
          case r.PUBLISH_STATUS:
            this.startAnswer();
            break;
          case r.END_STATUS:
            this.endAnswer();
            break;
          default:
            !this.isFirstReq && this.closeAnswer();
        }
      },
      startAnswer: function () {
        this.hideQuestionModal();
        this.hideAnswerModal();
        this.showQuestionModal();
      },
      endAnswer: function () {
        this.hideQuestionModal();
        this.hideAnswerModal();
        this.showAnswerModal();
      },
      closeAnswer: function () {
        this.hideQuestionModal();
        this.hideAnswerModal();
      },
      hideQuestionModal: function () {
        if (this.qm) {
          this.qm.close();
          this.qm = null;
        }
      },
      hideAnswerModal: function () {
        if (this.am) {
          this.am.close();
          this.am = null;
        }
      },
      showQuestionEntry: function () {
        this.$update('isQEntryVisible', !0);
      },
      hideQuestionEntry: function () {
        this.$update('isQEntryVisible', !1);
      },
      showAnswerEntry: function () {
        this.$update('isAEntryVisible', !0);
      },
      hideAnswerEntry: function () {
        this.$update('isAEntryVisible', !1);
      },
    });
    return l;
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'd3667e60d03e1c733f8017a0deb4b1ba',
  'fe18af44da13577b1b82ec10bb4cee27',
  '9475e1821522a51b89a8da7eef6547dd',
  '8d98fbb0c61000406549c95ea6bf0417',
  '8f34a99b20d362b3542aebd517390fc1',
  'ecc0bbe3c8ad6be8c2cd6f2cc1afe656',
  '406db6475ae55f37263ad6bd32c6e912',
);
