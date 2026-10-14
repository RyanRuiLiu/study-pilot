EDU(
  '2a7e2f64a34af1727c18e0084fc4716d',
  function (e, t, n, i) {
    var o = e.$extends({
      config: function () {
        t.extend(this, {});
        t.extend(this.data, {});
        this.data.UIData = i.getQuestionUIData(this.data.questionData, this.data.type);
        this.data.itemCountFlag = 'item' + this.data.UIData.liveAnswerOptions.length;
        this.data.isReadonly =
          'view' == this.data.type || this.data.UIData.liveAnswerSectionStudentDetail.isSubmitted;
        if (this.data.isReadonly)
          for (var e = 0, n = this.data.UIData.liveAnswerOptions.length, o; e < n; e++) {
            o = this.data.UIData.liveAnswerOptions[e];
            o.disabled = !0;
          }
        this.data.isReadonlyClass = this.data.isReadonly ? 'view' : 'edit';
        this.data.isCheck = this.data.isReadonly;
        this.supr();
      },
      init: function () {
        this.supr();
      },
      destroy: function () {
        this.supr();
      },
      select: function (e) {
        var t = e.source
          .map(
            function (e, t) {
              this.data.UIData.liveAnswerSectionStudentDetail.submitAnswers[t] = e.checked;
              return e;
            }._$bind(this),
          )
          .some(function (e) {
            return e.checked;
          });
        if (t != this.data.isCheck) {
          this.data.isCheck = t;
          this.$emit('hasFinished', t);
        }
      },
      getQuestionData: function () {
        return this.data.UIData;
      },
      hasFinished: function () {
        return this.data.isCheck;
      },
    });
    return o;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '060140f1d313368c012ba6ce1c590132',
  '27741deec876309bd381a4fb938cdc0f',
);
