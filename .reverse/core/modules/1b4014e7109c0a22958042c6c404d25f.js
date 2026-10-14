EDU(
  '1b4014e7109c0a22958042c6c404d25f',
  function (e, t) {
    var n = e.$extends({
      config: function () {
        t.extend(this, {});
        t.extend(this.data, { type: 'edit', questionData: {}, questionType: '' });
        this.supr();
      },
      getQuestionData: function () {
        if (this._question.getQuestionData) return this._question.getQuestionData();
        else throw Error('please instance ui component first!!!!');
      },
      validate: function () {
        if (this._question.validate) return this._question.validate();
        else return { success: !0, message: '' };
      },
      hasFinished: function () {
        if (this._question.hasFinished) return this._question.hasFinished();
        else throw Error('please instance ui component first!!!!');
      },
    });
    return n;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '7d23b332f614fd7897e7100865944a34',
);
