EDU(
  '76e02436c1565a0c8fb9abf57a7bbc35',
  function (e, t, n) {
    return function (i) {
      i.implement({
        config: function () {
          e.extend(this.data, {});
          this.cache = t.UserAnswerSheet._$allocate({
            scope: n.getScope(),
            onGetAnswerResult: this._cbGetAnswerResult._$bind(this),
          });
          this.supr();
        },
        init: function () {
          var e = this.data.answerformId ? { answerformId: this.data.answerformId } : {};
          this.cache.getAnswerResult({
            param: { liveId: this.data.liveId, quizId: this.data.quizId },
            data: e,
            onload: 'onGetAnswerResult',
          });
        },
        _cbGetAnswerResult: function (e) {
          if (e) this.$update('questions', e.questionList);
        },
      });
    };
  },
  '217dcfc103efb36d2f192eecc4548797',
  'd3667e60d03e1c733f8017a0deb4b1ba',
  '8f34a99b20d362b3542aebd517390fc1',
);
