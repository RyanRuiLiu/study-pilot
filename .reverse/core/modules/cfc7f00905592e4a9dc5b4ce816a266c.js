EDU(
  'cfc7f00905592e4a9dc5b4ce816a266c',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.u'),
      o = NEJ.P('edu.u');
    var a = {
      0: { id: 0, name: 'C' },
      1: { id: 1, name: 'Cool' },
      2: { id: 2, name: 'C++' },
      3: { id: 3, name: 'Go' },
      4: { id: 4, name: 'Haskell' },
      5: { id: 5, name: 'Java' },
      6: { id: 6, name: 'JavaScript' },
      7: { id: 7, name: 'Lua' },
      8: { id: 8, name: 'Pascal' },
      9: { id: 9, name: 'PHP' },
      10: { id: 10, name: 'Perl' },
      11: { id: 11, name: 'Python2.7' },
      12: { id: 12, name: 'Ruby' },
      13: { id: 13, name: 'Shell' },
      14: { id: 14, name: 'Python3.4' },
    };
    var r = {
      ACCEPTED: '',
      PRESENTATION_ERROR: '请检查程序输出的格式',
      WRONG_ANSWER: '结果错误',
      NON_ZERO_EXIT_CODE: '程序异常，exit code非0',
      MEMORY_LIMIT_EXCEEDED: '超出内存限制',
      TIME_LIMIT_EXCEEDED: '运行时间超出限制',
      OUTPUT_LIMIT_EXCEEDED: '程序输出过长',
      FLOAT_POINT_EXCEPTION: '浮点错误',
      'SEGMENTATION_FAULT ': '程序运行异常',
      RUNTIME_ERROR: '程序运行异常',
      INTERNAL_ERROR: '无法完成判题',
    };
    o._$getEvJudgeStr = function (e) {
      var t = (window.moocConfig || {}).lang || {};
      var n = t.KEY_LEARN_TO_DETERMINED || '待定';
      switch (e) {
        case o.CONST.JUDGE_TYPE_EVALUATE:
          n = t.KEY_LEARN_STUDENT_PEER_EVALUATION || '学生互评';
          break;
        case o.CONST.JUDGE_TYPE_LECTOR:
          n = t.KEY_LEARN_TEACHER_CHECKOUT || '老师批改';
      }
      return n;
    };
    o._$getHwPhaseStr = function (e) {
      var t = '';
      switch (e) {
        case o.CONST.HW_PHASE_SUBMIT:
          t = '提交';
          break;
        case o.CONST.HW_PHASE_EVALUATION:
          t = '批改';
          break;
        case o.CONST.HW_PHASE_SCORE:
          t = '成绩公布';
      }
      return t;
    };
    o._$getHwPhaseStrByTest = function (e) {
      var t = (window.moocConfig || {}).lang || {};
      var n = o._$getCurServerTime();
      var i = null;
      var a = e.evaluateJudgeType == o.CONST.JUDGE_TYPE_LECTOR,
        r = a
          ? [
              t.KEY_LEARN_SUBMISSION_STAGE || '提交阶段',
              t.KEY_LEARN_TEACHER_CHECKOUT_STAGE || '老师批改',
              t.KEY_LEARN_RESULTS_ANNOUNCED || '成绩已公布',
            ]
          : [
              t.KEY_LEARN_SUBMISSION_STAGE || '提交阶段',
              t.KEY_LEARN_EVALUATION_COMING_STAGE || '即将开始互评',
              t.KEY_LEARN_EVALUATION_STAGE || '互评阶段',
              t.KEY_LEARN_WAIT_FOR_RESULTS || '等待成绩公布',
              t.KEY_LEARN_RESULTS_ANNOUNCED || '成绩已公布',
            ],
        s = a
          ? [e.deadline, e.evaluateScoreReleaseTime, n + 1]
          : [e.deadline, e.evaluateStart, e.evaluateEnd, e.evaluateScoreReleaseTime, n + 1],
        c = r.length,
        d = 0;
      for (; d < c; d++)
        if (s[d] > n) {
          i = r[d];
          break;
        }
      return i;
    };
    o._$getQuizValidScoreStr = function (e) {
      var t = (window.moocConfig || {}).lang || {};
      var n = '';
      switch (e) {
        case o.CONST.QUIZ_SCORE_TYPE_LAST:
          n = t.KEY_LEARN_LAST_SCORE || '最后一次得分';
          break;
        case o.CONST.QUIZ_SCORE_TYPE_BEST:
          n = t.KEY_LEARN_HIGHEST_SCORE || '最高得分';
          break;
        case o.CONST.QUIZ_SCORE_TYPE_AVG:
          n = t.KEY_LEARN_AVERAGE_SCORE || '平均得分';
      }
      return n;
    };
    o._$parseOptionType = function (e) {
      switch (e) {
        case o.CONST.TYPE_OBJECTIVE_SINGLE:
        case o.CONST.TYPE_OBJECTIVE_JUDGE:
          return 'radio';
        case o.CONST.TYPE_OBJECTIVE_MULTI:
          return 'checkbox';
      }
    };
    o._$convertPaperQustionObj = function (e, t) {
      var n = {};
      if (e)
        i._$forEach(e, function (e) {
          if (!n['_' + e.id]) n['_' + e.id] = { questionDto: o._$deepCopy(e) };
        });
      if (t)
        i._$forEach(t, function (e) {
          if (n['_' + e.qid]) n['_' + e.qid]['qAnswerDto'] = o._$deepCopy(e);
        });
      return n;
    };
    o._$convertPaperQustionArr = function (e, t) {
      var n = [];
      if (e)
        i._$forEach(e, function (e) {
          n.push({ questionDto: o._$deepCopy(e) });
        });
      if (t)
        i._$forEach(t, function (e) {
          var t;
          i._$forEach(n, function (n) {
            if (n.questionDto && n.questionDto.id == e.qid) {
              t = n;
              return !0;
            }
          });
          if (t) t['qAnswerDto'] = o._$deepCopy(e);
        });
      return n;
    };
    o._$convertJudgeDtos = function (e, t) {
      i._$forEach(t, function (t) {
        i._$forEach(e, function (e) {
          if (e.id == t.jid) {
            e.score = t;
            return !0;
          }
        });
      });
      return e;
    };
    o._$currentEvaluatePhase = function (e) {
      var t = o._$getCurServerTime();
      var n = e.deadline;
      var i = e.evaluateScoreReleaseTime;
      var a = null;
      if (t < n) a = o.CONST.HW_PHASE_SUBMIT;
      else if (t >= i) a = o.CONST.HW_PHASE_SCORE;
      else a = o.CONST.HW_PHASE_EVALUATION;
      return a;
    };
    o._$canOJHomeworkSubmit = function (e, t) {
      return 0 == t && !!e.deadline && o._$getCurServerTime() <= e.deadline;
    };
    o._$getLangs = function (e) {
      var t = [];
      i._$forEach(
        e,
        function (e) {
          t.push(a[e]);
        }._$bind(this),
      );
      return t;
    };
    o._$getCodeStr = function (e) {
      return r[e] || '';
    };
  },
  '93828627ddb358ed890cb65967a0c1de',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '7ae1049f52447f73129209d74071c691',
  'ab6af9f7e26b55b8c5a875bba5679347',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fe86216ed59e3103a56c42c850d389f0',
);
