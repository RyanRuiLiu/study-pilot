EDU(
  '060140f1d313368c012ba6ce1c590132',
  function (e, t, n) {
    function i(e) {
      e.liveAnswerSectionStudentDetail = {
        submitAnswers: (e.questionAnswer || {}).answer,
        isSubmitted: (e.questionAnswer || {}).submitted,
      };
      e.liveAnswerOptions = [];
      for (var t = 0, n = e.question.multiChoice.choicesAnswers.length, i; t < n; t++) {
        i = e.question.multiChoice.choicesAnswers[t];
        if (!e.questionAnswer) e.liveAnswerSectionStudentDetail.submitAnswers = [];
        e.liveAnswerOptions.push({
          content: String.fromCharCode(65 + t),
          standardAnswer: i.correct,
        });
      }
    }
    function o(t, o) {
      var a = { type: n.MULTI_CHOICE, questionId: t.questionId };
      if (t.question) i(t);
      a.liveAnswerSectionStudentDetail = t.liveAnswerSectionStudentDetail
        ? e._$deepCopy(t.liveAnswerSectionStudentDetail)
        : { submitAnswers: [], isSubmitted: !1 };
      if ('edit' == o)
        a.liveAnswerOptions = t.liveAnswerOptions.map(function (e, n) {
          var i = !1;
          if (a.liveAnswerSectionStudentDetail.isSubmitted)
            if (t.question)
              for (
                var o = 0, r = t.liveAnswerSectionStudentDetail.submitAnswers.length, s;
                o < r;
                o++
              ) {
                s = t.liveAnswerSectionStudentDetail.submitAnswers[o];
                if (s === String(t.question.multiChoice.choicesAnswers[n].id)) i = !0;
              }
            else i = a.liveAnswerSectionStudentDetail.submitAnswers[n];
          return {
            name: e.content || e.name,
            contentTemplate:
              "<span class='th-bg0 th-bd3' on-click={this.clickText()} r-class={{'ux-check-text-dis': disabled}}>" +
              (e.content || e.name) +
              '</span>',
            checked: i,
            standardAnswer: e.standardAnswer,
          };
        });
      if ('view' == o) {
        var r = t.question.multiChoice.choicesAnswers;
        var s = function (e) {
          var n = !1;
          if (!t.questionAnswer) return !1;
          (t.questionAnswer || {}).answer.forEach(function (t) {
            if (String(t) === String(r[e].id)) n = !0;
          });
          return n;
        };
        a.liveAnswerOptions = t.liveAnswerOptions.map(function (e, t) {
          return {
            name: e.content,
            contentTemplate:
              "<span class='th-bg0 th-bd3' on-click={this.clickText()} r-class={{'ux-check-text-dis': disabled}}>" +
              e.content +
              '</span>',
            checked: s(t),
            standardAnswer: e.standardAnswer,
          };
        });
        a.rightAnswer = r
          .map(function (e, t) {
            if (e.correct) return String.fromCharCode(65 + t);
          })
          .filter(function (e) {
            return !!e;
          })
          .join('、');
        var c, d, l;
        if (!t.questionAnswer) c = n.ANSWER_UNDO;
        else c = t.questionAnswer.status[0];
        if (c === n.ANSWER_UNDO) {
          d = '未作答';
          l = 'th-wrong';
        } else if (c === n.ANSWER_RIGHT) {
          d = '正确';
          l = 'th-fc8';
        } else {
          d = '错误';
          l = 'th-wrong';
        }
        a.judgeResult = d;
        a.resultStyle = l;
      }
      return a;
    }
    function a(e) {
      e.liveAnswerSectionStudentDetail = {
        submitAnswers: (e.questionAnswer || {}).answer || ['true', 'false'],
        isSubmitted: (e.questionAnswer || {}).submitted,
      };
      e.liveAnswerOptions = [
        { content: '1', standardAnswer: 'true' },
        { content: '2', standardAnswer: 'false' },
      ];
    }
    function r(t, i) {
      var o = { type: n.TRUE_FALSE, questionId: t.questionId, liveAnswerOptions: [] };
      if (t.question) a(t);
      o.liveAnswerSectionStudentDetail = t.liveAnswerSectionStudentDetail
        ? e._$deepCopy(t.liveAnswerSectionStudentDetail)
        : { submitAnswers: [], isSubmitted: !1 };
      if ('edit' === i) {
        o.liveAnswerOptions = t.liveAnswerOptions.map(function (e, i) {
          var a = !1,
            r;
          if (o.liveAnswerSectionStudentDetail.isSubmitted) {
            r = t.liveAnswerSectionStudentDetail.submitAnswers[0];
            if (0 == i) a = r === String(n.JUDGEMENT_RIGHT);
            else a = r === String(n.JUDGEMENT_WRONG);
          }
          var s = {
            _name: e.content || e._name,
            name: '1' === (e.content || e._name) ? '✓' : '✕',
            contentTemplate:
              '1' === (e.content || e._name)
                ? '<span class="th-bg0 th-bd3 ux-icon-right"></span>'
                : '<span class="th-bg0 th-bd3 ux-icon-wrong"></span>',
            checked: a,
            standardAnswer: e.standardAnswer,
          };
          if (!t.questionAnswer) {
            a = !1;
            o.selected = null;
          }
          if (a) o.selected = s;
          return s;
        });
        o.selected = o.selected || null;
      }
      if ('view' === i) {
        var r, s, c;
        if (!t.questionAnswer) r = n.ANSWER_UNDO;
        else r = t.questionAnswer.status[0];
        if (r === n.ANSWER_UNDO) {
          s = '未作答';
          c = 'th-wrong';
        } else if (r === n.ANSWER_RIGHT) {
          s = '正确';
          c = 'th-fc8';
        } else {
          s = '错误';
          c = 'th-wrong';
        }
        o.rightAnswer = t.question.trueOrFalse.stdAnswer ? '对' : '错';
        o.judgeResult = s;
        o.resultStyle = c;
        o.liveAnswerOptions = t.liveAnswerOptions.map(function (e, i) {
          var a = !1,
            r;
          if (o.liveAnswerSectionStudentDetail.isSubmitted) {
            r = t.liveAnswerSectionStudentDetail.submitAnswers[0];
            if (0 == i) a = r === String(n.JUDGEMENT_RIGHT);
            else a = r === String(n.JUDGEMENT_WRONG);
          }
          var s = {
            _name: e.content,
            name: '1' === e.content ? '✓' : '✕',
            contentTemplate:
              '1' === e.content
                ? '<span class="th-bg0 th-bd3 ux-icon-right"></span>'
                : '<span class="th-bg0 th-bd3 ux-icon-wrong"></span>',
            checked: a,
            standardAnswer: e.standardAnswer,
          };
          if (a) o.selected = s;
          return s;
        });
        if (!o.selected) o.selected = null;
      }
      return o;
    }
    function s(e, t) {
      var i = { type: n.FILL_BLANK, questionId: e.questionId, liveAnswerOptions: [] };
      if (!e.question) return e;
      i.liveAnswerSectionStudentDetail = {
        submitAnswers: (e.questionAnswer || {}).answer,
        isSubmitted: (e.questionAnswer || {}).submitted,
      };
      if (!e.questionAnswer) {
        var o = e.question.blanks;
        i.liveAnswerSectionStudentDetail.submitAnswers = [];
        for (var a = 0; a < o; a++) i.liveAnswerSectionStudentDetail.submitAnswers.push('');
      }
      for (var a = 0, r = e.question.blanks.length, s; a < r; a++) {
        s = e.question.blanks[a].answerList[0];
        i.liveAnswerOptions.push({ content: '', standardAnswer: s });
      }
      if ('view' == t) {
        i.judgeResults = [];
        i.resultStyle = [];
        var o = e.question.blanks.length,
          c,
          d,
          l;
        for (var a = 0; a < o; a++) {
          if (!e.questionAnswer) c = n.ANSWER_UNDO;
          else c = e.questionAnswer.status[a];
          if (c === n.ANSWER_UNDO) {
            d = '未作答';
            l = ' th-wrong';
          } else if (c === n.ANSWER_RIGHT) {
            d = '正确';
            l = ' th-fc8';
          } else {
            d = '错误';
            l = ' th-wrong';
          }
          i.judgeResults.push(d);
          i.resultStyle.push(l);
        }
      }
      return i;
    }
    function c(e) {
      var t = { type: n.MULTI_CHOICE, questionId: e.questionId, liveAnswerOptions: [] };
      t.liveAnswerSectionStudentDetail = {
        submitAnswers: e.liveAnswerSectionStudentDetail.submitAnswers,
        isSubmitted: e.liveAnswerSectionStudentDetail.isSubmitted,
        judgeResults: e.liveAnswerSectionStudentDetail.judgeResults,
      };
      t.liveAnswerOptions = e.liveAnswerOptions.map(function (e) {
        return { content: e.name, standardAnswer: e.standardAnswer };
      });
      return t;
    }
    function d(e) {
      var t = c(e);
      t.type = n.TRUE_FALSE;
      t.liveAnswerOptions = e.liveAnswerOptions.map(function (e) {
        return { content: e._name, standardAnswer: e.standardAnswer };
      });
      return t;
    }
    function l(e) {
      return e;
    }
    return {
      getQuestionUIData: function (e, t, i) {
        var a;
        i = i || 'web';
        switch (e.type) {
          case n.MULTI_CHOICE:
            a = o(e, t, i);
            break;
          case n.FILL_BLANK:
            a = s(e, t, i);
            break;
          case n.TRUE_FALSE:
            a = r(e, t, i);
        }
        return a;
      },
      getQuestionData: function (e) {
        var t;
        switch (e.type) {
          case n.MULTI_CHOICE:
            t = c(e);
            break;
          case n.TRUE_FALSE:
            t = d(e);
            break;
          case n.FILL_BLANK:
            t = l(e);
        }
        return t;
      },
    };
  },
  '2c94f4a525e970341087318fd0b94823',
  'd3667e60d03e1c733f8017a0deb4b1ba',
  '8d98fbb0c61000406549c95ea6bf0417',
);
