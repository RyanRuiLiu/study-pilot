EDU(
  '98bc2de85bcb11bb7f77ad5d5ee77c5a',
  function (e, t) {
    function n(e) {
      if (e) {
        var t = e.replace(/<\/?[^>]+>/gi, '');
        var n = document.createElement('div');
        n.innerHTML = t;
        var i = n.textContent || n.innerText || '';
        return i;
      }
    }
    var i = window;
    eu = NEJ.P('edu.u');
    var o = { VIDEO: 1, PDF: 3, QUIZ: 11, EXAM: 12, HOMEWORK: 13, OTHER: 20 };
    var a = { NORMAL: 0, QUIZ: 1, TEXT: 2, FAST_QUIZ: 3 };
    t.PAGE_TYPE = o;
    t.SCENE_TYPE = a;
    t._$getPageType = function () {
      var e = location.hash;
      if (e.indexOf('learn/quiz') > -1) return o.QUIZ;
      if (e.indexOf('learn/hw') > -1 || e.indexOf('learn/ojhw') > -1) return o.HOMEWORK;
      if (e.indexOf('learn/exam') > -1) return o.EXAM;
      else return o.OTHER;
    };
    t._$renderGLobalAIButton = function (e, t, n) {
      if (window.renderReactComponent && window.renderReactComponent['LearnAIAssistant']) {
        window.ftlData = e;
        window.dispatchEvent(new Event('myVariableChanged'));
      }
    };
    const r = ['A', 'B', 'C', 'D', 'E', 'F'];
    t._$getExamQuestion = function (e) {
      var t = [];
      if (e.objectiveQList && e.objectiveQList.length)
        for (var i = 0; i < e.objectiveQList.length; i++) {
          var o = e.objectiveQList[i];
          var a = i + 1 + '.' + n(o.ocrTitle || o.title);
          if (o.optionDtos && o.optionDtos.length)
            for (var s = 0; s < o.optionDtos.length; s++) {
              var c = o.optionDtos[s];
              a += r[s] + '.' + n(c.ocrContent || c.content) + ' ';
            }
          t.push(a);
        }
      if (e.subjectiveQList && e.subjectiveQList.length)
        for (var i = 0; i < e.subjectiveQList.length; i++) {
          var o = e.subjectiveQList[i];
          var a = i + 1 + '.' + n(o.ocrTitle || o.plainTextTitle);
          t.push(a);
        }
      return t;
    };
    t._$getQuestionList = function (e) {
      var t = [];
      if (e.objectiveQList && e.objectiveQList.length)
        for (var i = 0; i < e.objectiveQList.length; i++) {
          var o = null;
          var a = e.objectiveQList[i];
          if (a.optionDtos && a.optionDtos.length)
            for (var r = 0; r < a.optionDtos.length; r++) {
              var s = a.optionDtos[r];
              s.content = s.ocrContent ? s.ocrContent : s.content;
            }
          if (a.stdAnswer)
            o = a.stdAnswer.replace(
              eu.CONST.FILL_BLANK_SPLITCHARREG,
              ' ' + window.moocConfig.lang.KEY_LEARN_OR,
            );
          t.push({
            id: a.id,
            title: a.ocrTitle || a.plainTextTitle,
            options: a.optionDtos,
            analyse: a.analyse || '',
            type: a.type,
            stdAnswer: o,
          });
        }
      if (e.subjectiveQList && e.subjectiveQList.length)
        for (var i = 0; i < e.subjectiveQList.length; i++) {
          var a = e.subjectiveQList[i];
          t.push({
            id: a.id,
            title: a.ocrTitle || a.plainTextTitle,
            analyse: a.analyse || '',
            description: n(a.description),
            type: a.type,
          });
        }
      return t;
    };
    t._$getExamSingleQuestion = function (e) {
      var t = [];
      if (e.type !== eu.CONST.TYPE_SUBJECTIVE_NORMAL) {
        var i = n(e.ocrTitle || e.title);
        if (e.optionDtos && e.optionDtos.length)
          for (var o = 0; o < e.optionDtos.length; o++) {
            var a = e.optionDtos[o];
            i += r[o] + '.' + n(a.ocrContent || a.content) + ' ';
          }
        t.push(i);
      } else {
        var i = n(e.ocrTitle || e.plainTextTitle);
        t.push(i);
      }
      return t;
    };
    return t;
  },
  'fe86216ed59e3103a56c42c850d389f0',
);
