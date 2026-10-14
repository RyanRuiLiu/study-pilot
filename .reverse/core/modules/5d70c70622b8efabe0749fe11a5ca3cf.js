EDU(
  '5d70c70622b8efabe0749fe11a5ca3cf',
  function (e, t, n, i) {
    var o = e.$extends({
      config: function () {
        t.extend(this, {});
        t.extend(this.data, {});
        this.data.UIData = i.getQuestionUIData(this.data.questionData, this.data.type);
        this.data.isReadonly =
          'view' == this.data.type || this.data.UIData.liveAnswerSectionStudentDetail.isSubmitted;
        this.data.isReadonlyClass = this.data.isReadonly ? 'view' : 'edit';
        this.data.isSelect = this.data.isReadonly;
        this.supr();
      },
      init: function () {
        this.supr();
      },
      destroy: function () {
        this.supr();
      },
      select: function (e) {
        this.data.UIData.liveAnswerOptions.forEach(
          function (t, i) {
            this.data.UIData.liveAnswerSectionStudentDetail.submitAnswers[i] =
              t.name == e.selected.name ? String(n.JUDGEMENT_RIGHT) : String(n.JUDGEMENT_WRONG);
          }._$bind(this),
        );
        if (!this.data.isSelect) {
          this.data.isSelect = !0;
          this.$emit('hasFinished', this.data.isSelect);
        }
      },
      getQuestionData: function () {
        return this.data.UIData;
      },
      hasFinished: function () {
        return this.data.isSelect;
      },
    });
    return o;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '8d98fbb0c61000406549c95ea6bf0417',
  '060140f1d313368c012ba6ce1c590132',
  '371b8505c56465889a40f5a7949b6233',
);
