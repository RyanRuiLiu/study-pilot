EDU(
  '68d36f7e2df0f26b1f50e5a746e668bb',
  function (e, t, n, i) {
    var o = e
      .$extends({
        config: function () {
          t.extend(this, {
            hasFinishedBeforeInput: void 0,
            answerRules: [
              {
                type: 'is',
                reg: /^[\s\.a-zA-Z0-9\u4e00-\u9fa5]*$/,
                message: '仅支持数字、空格、小数点、字母和汉字',
              },
              { min: 0, max: 12, type: 'isLength', message: '最多24个字符' },
            ],
          });
          t.extend(this.data, { type: 'edit', questionData: {} });
          this.data.questionUIData = i.getQuestionUIData(this.data.questionData, this.data.type);
          this.hasFinishedBeforeInput =
            this.data.questionUIData.liveAnswerSectionStudentDetail.isSubmitted || !1;
          this.$watch(
            'questionData',
            function (e) {
              this.data.questionUIData = i.getQuestionUIData(e, this.data.type);
              this.$update();
            }._$bind(this),
            !0,
          );
          this.supr();
        },
        init: function () {
          this.supr();
        },
        checkAnswerFinish: function () {
          var e = this.data.questionUIData.liveAnswerSectionStudentDetail;
          var t;
          if (e && e.submitAnswers) {
            for (var n = 0, i = e.submitAnswers.length; n < i; n++)
              if (!e.submitAnswers[n] || 0 === e.submitAnswers[n].length) {
                t = 'unfinished';
                break;
              }
            if ('unfinished' !== t) t = 'finished';
            if (this.hasFinishedBeforeInput && 'unfinished' === t) {
              this.$emit('hasFinished', !1);
              this.hasFinishedBeforeInput = !1;
            } else if (!this.hasFinishedBeforeInput && 'finished' === t) {
              this.$emit('hasFinished', !0);
              this.hasFinishedBeforeInput = !0;
            }
          }
        },
        hasFinished: function () {
          return this.hasFinishedBeforeInput;
        },
        validate: function () {
          return this.$refs.validation.validate();
        },
        getQuestionData: function () {
          return this.data.questionUIData;
        },
      })
      .filter({
        judgeResult: function (e) {
          var t = { 1: '正确', 2: '错误', 3: '未作答' };
          return t[e];
        },
        placeholderFilter: function (e) {
          var t;
          switch (+e + 1) {
            case 1:
              t = '填空一 ';
              break;
            case 2:
              t = '填空二 ';
              break;
            case 3:
              t = '填空三 ';
              break;
            case 4:
              t = '填空四 ';
              break;
            default:
              t = '';
          }
          t += '请输入答案';
          return t;
        },
      });
    return o;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '2c94f4a525e970341087318fd0b94823',
  '060140f1d313368c012ba6ce1c590132',
);
