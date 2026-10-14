EDU(
  'ecda170843969623fadb54552d7a6475',
  function (e, t, n, i, o, a, s, r) {
    return e.$extends({
      name: 'um-user-answer-sheet-question-generator',
      css: n,
      template: t,
      init: function () {
        this.supr();
        this._question = this.generation(this.data.questionData.type);
        this._question.$on(
          'hasFinished',
          function (e) {
            this.$emit('hasFinished', e);
          }._$bind(this),
        );
      },
      generation: function (e) {
        var t;
        switch (e) {
          case o.MULTI_CHOICE:
            this.data.questionType = 'choice';
            t = new a({
              data: { questionData: this.data.questionData, type: this.data.type },
            }).$inject(this.$refs.ele);
            break;
          case o.TRUE_FALSE:
            this.data.questionType = 'judge';
            t = new s({
              data: { questionData: this.data.questionData, type: this.data.type },
            }).$inject(this.$refs.ele);
            break;
          case o.FILL_BLANK:
            this.data.questionType = 'fillin';
            t = new r({
              data: { questionData: this.data.questionData, type: this.data.type },
            }).$inject(this.$refs.ele);
        }
        i._$addClassName(this.$refs.ele, this.data.questionType);
        return t;
      },
    });
  },
  '1b4014e7109c0a22958042c6c404d25f',
  '119d6a86c6c59b9578016faca428790d',
  '7b9afd7e5e50d03911d654e4387c6246',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '8d98fbb0c61000406549c95ea6bf0417',
  '0fd8827c50ed61c823e81a9616b748ce',
  '4a54f225fe2c22cb0ec9efccd1ac92c6',
  '380c4cdc6b0470f5a96ecbd3f14eccac',
);
