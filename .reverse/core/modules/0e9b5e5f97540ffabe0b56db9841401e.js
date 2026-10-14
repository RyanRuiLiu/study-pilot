EDU(
  '0e9b5e5f97540ffabe0b56db9841401e',
  function (e, t) {
    var n = e.$extends({
      config: function () {
        t.extend(this, {});
        t.extend(this.data, { questions: [], index: 0 });
        this.supr();
      },
      init: function () {
        this.supr();
      },
      destroy: function () {
        this.supr();
      },
      validate: function () {
        var e = [];
        for (var n = 0; n < this.data.questions.length; n++) {
          var i = this.$refs['q' + n].validate();
          e.push(t.extend(i, { data: this.$refs['q' + n].getQuestionData() }));
        }
        return e;
      },
      isAllDone: function () {
        var e = !0;
        for (var t = 0; t < this.data.questions.length; t++) {
          e = this.$refs['q' + t].hasFinished();
          if (!e) break;
        }
        return e;
      },
      switchTo: function (e) {
        var t = this.$refs['q' + e].getQuestionData();
        this.data.index = e;
        this.$emit('switch', {
          isSubmitted: t.liveAnswerSectionStudentDetail.isSubmitted,
          data: t,
        });
      },
      update: function (e) {
        for (var t = 0; t < e.length; t++) this.data.questions[t] = e[t];
        this.$update();
      },
      _api: function () {},
    });
    return n;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
);
