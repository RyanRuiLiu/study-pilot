EDU(
  '0caa45293ff72fb6f03781c0fb270351',
  function (e, t, i, n, a, o, s) {
    var r = e.$extends({
      name: 'um-recommend-feedback-box',
      data: { course: null, cb: function () {} },
      config: function () {
        this.supr();
        t.extend(this.data, {});
      },
      init: function () {
        this.supr();
      },
      openModal: function (e, t) {
        this.data.course = e;
        var i = this;
        this._modalUI && this._modalUI.destroy();
        this._modalUI = new n({
          data: {
            class: 'um-recommend-feedback-box-modal',
            okButton: !1,
            cancelButton: !1,
            content: o,
            title: '',
            type: null,
            optionList: [
              { value: 1, text: '不感兴趣' },
              { value: 2, text: '重复推荐过很多次' },
              { value: 3, text: '造成学习干扰' },
            ],
          },
          sendFeedback: function (e) {
            i.sendFeedback(e);
            t && t();
          },
        });
      },
      closeModal: function () {
        this._modalUI && this._modalUI.destroy();
      },
      sendFeedback: function (e, t) {
        s._$contentFeedback(
          {
            mocPromoFeedbackDto: JSON.stringify({
              positionType: 1,
              positionId: 6,
              fdType: e && e.value,
              contentId: this.data.course && (this.data.course.id || this.data.course.courseId),
              contentType: this.data.course && this.data.course.type,
            }),
          },
          function () {}._$bind(this),
        );
        this.closeModal();
      },
      destroy: function () {
        this.supr();
        this._modalUI && this._modalUI.destroy();
      },
    });
    return r;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'fe86216ed59e3103a56c42c850d389f0',
  'd414623f7407e577cd6c05efff08e96f',
  '93828627ddb358ed890cb65967a0c1de',
  '023f6ad1232c688c37f05d531ca475da',
  '39253eba71912d1492d6af7035e30738',
);
