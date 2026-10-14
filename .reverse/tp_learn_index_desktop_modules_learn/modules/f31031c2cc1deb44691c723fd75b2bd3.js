EDU(
  'f31031c2cc1deb44691c723fd75b2bd3',
  function (e, t, i) {
    var n = window,
      a = NEJ.O,
      o = NEJ.F,
      s = NEJ.P('nej.e'),
      r = NEJ.P('nej.v'),
      c = NEJ.P('nej.u'),
      d = NEJ.P('edu.u'),
      _,
      l;
    var h = s._$addHtmlTemplate(
      '<div class="m-FillBlank examMode u-questionItem f-pr">       \t  \t<div class="j-title title f-cb">\t       \t  \t<div class="position f-fl"></div>                <div class="qaDescription f-fl f-cb">                    <div class="qaIndex j-qaindex f-fl f-dn"></div>                    <div class="qaCate j-qacate f-fl"></div>    \t       \t  \t<div class="f-richEditorText j-richTxt"></div>    \t       \t  \t<div class="qaMark j-qamark f-fr f-dn"></div>                </div>       \t  \t\t<label class="scoreLabel f-fr f-dn j-scoreLabel">${lang.KEY_LEARN_SCORE}/${lang.KEY_LEARN_TOTAL_SCORE}</label>       \t  \t</div>\t       \t<div class="f-cb inputArea">\t       \t\t<div class="f-fl j-input input"></div>\t       \t\t<div class="score f-fr f-fn j-score"></div>       \t \t</div>       \t \t<div class="analysisInfo f-dn j-analysis">            </div>       </div>',
    );
    d._$$FillBlankUI = NEJ.C();
    _ = d._$$FillBlankUI._$extend(d._$$BaseType, !0);
    l = d._$$FillBlankUI._$supro;
    _.__initXGui = function () {
      this.__seed_html = s._$addNodeTemplate(
        s._$getHtmlTemplate(h, { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    _.__initNode = function () {
      this.__supInitNode();
      this.__titleNode = s._$getByClassName(this.__body, 'j-title')[0];
      this.__input = s._$getByClassName(this.__body, 'j-input')[0];
      this.__analysisNode = s._$getByClassName(this.__body, 'j-analysis')[0];
      this.__scoreNode = s._$getByClassName(this.__body, 'j-score')[0];
      this.__scoreLabel = s._$getByClassName(this.__body, 'j-scoreLabel')[0];
      this.__indexLabel = s._$getByClassName(this.__body, 'j-qaindex')[0];
      this.__markLabel = s._$getByClassName(this.__body, 'j-qamark')[0];
      this.__cateLabel = s._$getByClassName(this.__body, 'j-qacate')[0];
      this.__richTextNode = s._$getByClassName(this.__body, 'j-richTxt')[0];
      this.__questionInfo = s._$getChildren(this.__titleNode);
    };
    _.__buildQuestionInfo = function () {
      if ((!this.__position && 0 != this.__position) || this.__position < 0)
        d._$hiddenNode(this.__questionInfo[0]);
      else {
        d._$showNode(this.__questionInfo[0]);
        this.__questionInfo[0].innerText = this.__position + 1;
      }
      if (this.__indexNum > 0) {
        this.__indexLabel.innerHTML = this.__indexNum + '、';
        s._$delClassName(this.__indexLabel, 'f-dn');
      }
      var n = !this.__noScore
        ? '<span class="pan">' + window.moocConfig.lang.KEY_LEARN_QUESTION_TYPE_FILL + '</span>'
        : '';
      var a = this.__recordDto.questionDto.score >= 1 && i.isEn() ? 's' : '';
      if (!d._$isWebView() && !this.__noScore)
        n +=
          '(' +
          this.__recordDto.questionDto.score +
          window.moocConfig.lang.KEY_LEARN_SCORE_POINTS +
          a +
          ')';
      this.__cateLabel.innerHTML = n;
      this.__richTextNode.innerHTML = e._$formateImagePrefix(
        this.__recordDto.questionDto.title || '',
      );
      c._$renderRich(this.__richTextNode);
      if (d._$isMobile() || d._$isWap()) {
        if (6 != this.__paperType) {
          var a = this.__recordDto.questionDto.score >= 1 && i.isEn() ? 's' : '';
          this.__markLabel.innerHTML =
            '(' +
            this.__recordDto.questionDto.score +
            window.moocConfig.lang.KEY_LEARN_SCORE_POINTS +
            a +
            ')';
          s._$delClassName(this.__markLabel, 'f-dn');
        }
        var o = t._$parseUrlParams(window.location.search);
        if (o.quizeCount && this.__indexNum == o.quizeCount)
          this.__fillblankInputUI = d._$$BaseInputUI._$allocate({
            parent: this.__input,
            labelText: window.moocConfig.lang.KEY_LEARN_PLEASE_ANSWER,
            onInputChange: this.__inputBlur._$bind(this),
            type: 'input',
            height: 35,
            width: 250,
          });
        else
          this.__fillblankInputUI = d._$$BaseInputUI._$allocate({
            parent: this.__input,
            labelText: window.moocConfig.lang.KEY_LEARN_PLEASE_ANSWER,
            onInputBlur: this.__inputBlur._$bind(this),
            type: 'input',
            height: 35,
            width: 250,
          });
      } else
        this.__fillblankInputUI = d._$$BaseInputUI._$allocate({
          parent: this.__input,
          labelText: window.moocConfig.lang.KEY_LEARN_PLEASE_ANSWER,
          onInputBlur: this.__inputBlur._$bind(this),
          height: 35,
          width: 250,
        });
      var r = this;
      var _ = navigator.userAgent;
      var l = _.indexOf('Android') > -1 || _.indexOf('Adr') > -1;
      if (l);
    };
    _.__inputBlur = function () {
      var e = this.__fillblankInputUI._$getContent();
      this.__answerDto.content.content = e;
      if (!this.__done && !this.__answerDto.time) {
        this.__done = !0;
        this.__answerDto.time = d._$getCurServerTime();
      }
      this._$dispatchEvent('onSelect', this.__answerDto);
    };
    _._$setAnswerRecord = function () {
      this.__fillblankInputUI._$enableInput();
      this.__fillblankInputUI._$setInitContent(
        (this.__answerDto.content && this.__answerDto.content.content) || '',
      );
      if (1 === this.__mode) {
        this.__fillblankInputUI._$disableNoInitInput();
        if (!this.__answerDto.content.content || '' == this.__answerDto.content.content) {
          this.__fillblankInputUI._$setTextLabel(window.moocConfig.lang.KEY_LEARN_YOU_ANSWER);
          var e = !1;
        } else var e = !0;
      }
      s._$addClassName(this.__analysisNode, 'f-dn');
      if (1 == this.__mode) {
        var t = this.__recordDto.questionDto.analyse
          ? '<br><b>' +
            window.moocConfig.lang.KEY_LEARN_RESOLUTION +
            ' </b>' +
            this.__recordDto.questionDto.analyse
          : null;
        if (this.__showAnalysis && !t) t = '';
        if (this.__noScore) {
          s._$delClassName(this.__analysisNode, 'f-dn');
          this.__analysisNode.innerHTML =
            '<span class="f-f0 tt1">' +
            window.moocConfig.lang.KEY_LEARN_CORRECT_ANSWER +
            '</span><span class="f-f0 tt2">' +
            c._$escape(
              this.__recordDto.questionDto.stdAnswer.replace(
                d.CONST.FILL_BLANK_SPLITCHARREG,
                ' ' + window.moocConfig.lang.KEY_LEARN_OR,
              ) || '',
            ) +
            '</span>';
          d._$toggleClassName(!this.__judgeAnswer(), this.__analysisNode, 'answrong');
        } else if (null != t) {
          s._$delClassName(this.__analysisNode, 'f-dn');
          this.__analysisNode.innerHTML =
            '<span class="f-f0 tt1">' +
            window.moocConfig.lang.KEY_LEARN_CORRECT_ANSWER +
            '</span><span class="f-f0 tt2">' +
            c._$escape(
              this.__recordDto.questionDto.stdAnswer.replace(
                d.CONST.FILL_BLANK_SPLITCHARREG,
                ' ' + window.moocConfig.lang.KEY_LEARN_OR + ' ',
              ) || '',
            ) +
            '</span>';
          if (
            (100 == window.learnMode &&
              window.termDto &&
              0 == window.termDto.supportAiLessonPlan) ||
            (window.termDto &&
              1 == window.termDto.supportAiLessonPlan &&
              1 == window.termDto.supportFastQuiz)
          )
            this.__analysisNode.innerHTML +=
              '<span class="j-global-ai-question-entry" data-id=' +
              this.__recordDto.questionDto.id +
              '>提问</span>';
          this.__analysisNode.innerHTML += t;
          d._$toggleClassName(0 != this.__answerDto.correct, this.__analysisNode, 'answrong');
        }
      }
      d._$toggleNodeDisplay(
        this.__scoreLabel,
        1 == this.__mode && !this.__noScore && !!this.__showAnalysis,
      );
      d._$toggleNodeDisplay(
        this.__scoreNode,
        1 == this.__mode && !this.__noScore && !!e && !!this.__showAnalysis,
      );
      if (1 == this.__mode && !this.__noScore)
        if (window.shouldHiddenScore)
          this.__scoreNode.innerHTML = '<span class="j-triggerLockScore"></span>';
        else {
          if (0 == this.__answerDto.correct) {
            s._$addClassName(this.__scoreNode, 'right');
            var i = '<span class="f-icon u-icon-correct"></span> ';
          } else {
            s._$delClassName(this.__scoreNode, 'right');
            var i = '<span class="f-icon u-icon-wrong"></span> ';
          }
          this.__scoreNode.innerHTML =
            i +
            (this.__answerDto.score ? this.__answerDto.score.toFixed(2) : '0.00') +
            '/' +
            this.__recordDto.questionDto.score.toFixed(2);
        }
    };
    _.__judgeAnswer = function (e) {
      switch (this.__recordDto.questionDto.fillblankType) {
        case 1:
        case 2:
          var e = (this.__recordDto.questionDto.stdAnswer || '').split(
            d.CONST.FILL_BLANK_SPLITCHAR,
          );
          var t = d._$arrContains(e, this.__answerDto.content.content);
          return t;
        case 3:
          var i = this.__recordDto.questionDto.stdAnswer.split(','),
            n = parseFloat(i[0].substr(1)),
            a = parseFloat(i[1].substr(0, i[1].length - 1)),
            o = !1,
            s = !1;
          0 == i[0].indexOf('(') ? (o = !1) : (o = !0);
          i[1].indexOf(')') > 0 ? (s = !1) : (s = !0);
          if (this.__answerDto.content.content > n && this.__answerDto.content.content < a)
            return !0;
          else if (this.__answerDto.content.content == n && o) return !0;
          else if (this.__answerDto.content.content == a && s) return !0;
          else return !1;
        case 4:
          return this.__answerDto.content.content &&
            this.__recordDto.questionDto.stdAnswer.indexOf(this.__answerDto.content.content) >= 0
            ? !0
            : !1;
      }
    };
    _.__goToAnalysisMode = function () {
      this.__fillblankInputUI._$disableNoInitInput();
    };
    _.__goToExamMode = function () {
      this.__fillblankInputUI._$enableInput();
    };
    _.__reset = function (e) {
      this.__paperType = e.type;
      this.__supReset(e);
      this.__answerDto = this.__recordDto.qAnswerDto;
      this.__done = !1;
      if (!this.__answerDto)
        this.__answerDto = {
          qid: this.__recordDto.questionDto.id,
          type: this.__recordDto.questionDto.type,
          content: { content: '' },
        };
      this._$setAnswerRecord();
    };
    _.__destroy = function () {
      this.__supDestroy();
      this.__fillblankInputUI = d._$$BaseInputUI._$recycle(this.__fillblankInputUI);
    };
  },
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fb061c769bfc74628a81f422f590544c',
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  '3f9cd2835e49e1a4b1d9cfa0e92683b1',
  '02c14b544f21e379de73ba82b326d2a9',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  '93828627ddb358ed890cb65967a0c1de',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '9bdcd8c0c351549ef3cabe6382f2d7f1',
  'fe86216ed59e3103a56c42c850d389f0',
  '08d2f36062baca2c8eb8327afd74d88c',
);
