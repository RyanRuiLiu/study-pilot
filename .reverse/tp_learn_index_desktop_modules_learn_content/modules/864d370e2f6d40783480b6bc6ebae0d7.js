EDU(
  '864d370e2f6d40783480b6bc6ebae0d7',
  function (e, t, n, i, o, a, s, r) {
    return t.$extends({
      name: 'um-user-answer-sheet',
      css: i,
      template: n,
      config: function () {
        o.extend(this.data, {});
        this.supr();
      },
      showQuestionModal: function () {
        if (this.qm) this.qm.show();
        else {
          this.qm = new s({ data: { liveId: this.liveId, quizId: this.quizId } }).$inject(
            this.data.mountDom,
          );
          this.qm.$on(
            'hide',
            function () {
              this.showQuestionEntry();
            }._$bind(this),
          );
          this.qm.$on(
            'show',
            function () {
              this.hideQuestionEntry();
            }._$bind(this),
          );
        }
      },
      showAnswerModal: function () {
        if (this.am) this.am.show();
        else {
          this.am = new r({ data: { liveId: this.liveId, quizId: this.quizId } }).$inject(
            this.data.mountDom,
          );
          this.am.$on(
            'hide',
            function () {
              this.showAnswerEntry();
            }._$bind(this),
          );
          this.am.$on(
            'show',
            function () {
              this.hideAnswerEntry();
            }._$bind(this),
          );
        }
      },
      endAnswer: function () {
        this.supr();
        a.show(e.KYE_LIB_USERANSWER_SHEET_TEACHER_STOP_ANSWER);
      },
      closeAnswer: function () {
        this.supr();
        a.show(e.KYE_LIB_USERANSWER_SHEET_TEACHER_CLOSE_EXERCISE);
      },
      hideAnswerModal: function () {
        this.supr();
        this.hideAnswerEntry();
      },
      hideQuestionModal: function () {
        this.supr();
        this.hideQuestionEntry();
      },
    });
  },
  '12c9f5221e7895a5176aa098fce5eb84',
  '8e64365cbe06bc9335712c8b6f1e60c0',
  '3baac7dd3a4f3fc21e3b476eaa33dd96',
  '3f7e13933db824dc4e3ab51f27e7e980',
  '217dcfc103efb36d2f192eecc4548797',
  '29f555f70e6e64cf8315ed720772ced1',
  '150eae2c89b3fc74e500623a4ba54647',
  '52ed6e3df1f2290794b5ae5b3f7e446a',
);
