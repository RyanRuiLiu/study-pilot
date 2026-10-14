EDU(
  '1085a79200eae1cc393e9fb1c5b9ac45',
  function (e, t) {
    var n = window,
      i = NEJ.O,
      o = NEJ.F,
      a = NEJ.P('nej.e'),
      s = NEJ.P('nej.v'),
      r = NEJ.P('nej.u'),
      c = NEJ.P('edu.u'),
      d = {
        0: 'A',
        1: 'B',
        2: 'C',
        3: 'D',
        4: 'E',
        5: 'F',
        6: 'G',
        7: 'H',
        8: 'I',
        9: 'J',
        10: 'K',
        11: 'L',
        12: 'M',
        13: 'N',
        14: 'O',
        15: 'P',
        16: 'Q',
        17: 'R',
      },
      l,
      _;
    var u = 'en' === window.currentLanguage;
    var f = a._$addHtmlTemplate(
      '<div class="m-choiceQuestion u-questionItem">       \t  <div class="j-title title f-cb">       \t  \t<div class="position f-fl"></div>       \t  \t<div class="qaDescription f-fl f-cb">       \t  \t    <div class="qaIndex j-qaindex f-fl f-dn"></div>       \t  \t\t<div class="qaCate j-qacate f-fl"></div>\t       \t  \t<div class="f-richEditorText j-richTxt"></div>\t       \t  \t<div class="qaMark j-qamark f-fr f-dn"></div>               <div class="j-aiQuery aiQuery f-dn"></div>       \t  \t</div>       \t  \t<label class="scoreLabel f-fr f-dn j-scoreLabel">' +
        window.moocConfig.lang.KEY_LEARN_SCORE_AND_TOTAL_SCORE +
        '</label>       \t  </div>          <div class="j-choicebox">       \t  </div>       </div>',
    );
    c._$$ChoiceQuestionUI = NEJ.C();
    l = c._$$ChoiceQuestionUI._$extend(c._$$BaseType, !0);
    _ = c._$$ChoiceQuestionUI._$supro;
    l.__initXGui = function () {
      this.__seed_html = a._$addNodeTemplate(
        a._$getHtmlTemplate(f, { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    l.__initNode = function () {
      this.__supInitNode();
      this.__titleNode = a._$getByClassName(this.__body, 'j-title')[0];
      this.__choicebox = a._$getByClassName(this.__body, 'j-choicebox')[0];
      this.__scoreLabel = a._$getByClassName(this.__body, 'j-scoreLabel')[0];
      this.__cateLabel = a._$getByClassName(this.__body, 'j-qacate')[0];
      this.__indexLabel = a._$getByClassName(this.__body, 'j-qaindex')[0];
      this.__markLabel = a._$getByClassName(this.__body, 'j-qamark')[0];
      this.__richTextNode = a._$getByClassName(this.__body, 'j-richTxt')[0];
      this.__aiQueryBox = a._$getByClassName(this.__body, 'j-aiQuery')[0];
      this.__questionInfo = a._$getChildren(this.__titleNode);
    };
    l.__buildQuestionInfo = function () {
      var t = 'en' === window.currentLanguage;
      var i = window.moocConfig.lang.KEY_LEARN_SCORE_POINTS;
      if (!this.__optIds)
        this.__optIds = this.__recordDto.qAnswerDto ? this.__recordDto.qAnswerDto.optIds : [];
      else this.__recordDto.qAnswerDto = { optIds: this.__optIds };
      var o = '',
        l = this.__recordDto.questionDto,
        _ = this.__paperType;
      if ((!this.__position && 0 != this.__position) || this.__position < 0)
        c._$hiddenNode(this.__questionInfo[0]);
      else {
        c._$showNode(this.__questionInfo[0]);
        this.__questionInfo[0].innerText = this.__position + 1;
      }
      if (this.__indexNum > 0) {
        this.__indexLabel.innerHTML = this.__indexNum + '、';
        a._$delClassName(this.__indexLabel, 'f-dn');
      }
      this.__cateLabel.innerHTML = '';
      if (this.__noScore && !c._$isWap()) {
        this.__richTextNode.innerHTML = e._$formateImagePrefix(l.title || '');
        this.__cateLabel.innerHTML = '';
      } else {
        var u = l.title || '',
          f = '';
        var h = t && l.score >= 1 ? 's' : '';
        switch (l.type) {
          case c.CONST.TYPE_OBJECTIVE_SINGLE:
            f +=
              '<span class="dan">' +
              window.moocConfig.lang.KEY_LEARN_QUESTION_TYPE_SINGLE +
              '</span>';
            if (!c._$isWap()) f += '(' + l.score + i + h + ')';
            break;
          case c.CONST.TYPE_OBJECTIVE_MULTI:
            f +=
              '<span class="duo">' +
              window.moocConfig.lang.KEY_LEARN_QUESTION_TYPE_MULTIPLE +
              '</span>';
            if (!c._$isWap()) f += '(' + l.score + i + h + ')';
            break;
          case c.CONST.TYPE_OBJECTIVE_JUDGE:
            f +=
              '<span class="pan">' +
              window.moocConfig.lang.KEY_LEARN_QUESTION_TYPE_JUDGE +
              '</span>';
            if (!c._$isWap()) f += '(' + l.score + i + h + ')';
        }
        this.__cateLabel.innerHTML = f;
        this.__richTextNode.innerHTML = u;
        if (c._$isWap() && 6 != _) {
          this.__markLabel.innerHTML = '(' + l.score + i + ')';
          a._$delClassName(this.__markLabel, 'f-dn');
        }
      }
      r._$renderRich(this.__richTextNode);
      this.__type = c._$parseOptionType(l.type);
      if (1 === this.__mode && !this.__noScore && !n.isPreview)
        if (!c._$isWap() && this.__showAnalysis)
          a._$setStyle(this.__scoreLabel, 'display', 'block');
        else a._$setStyle(this.__scoreLabel, 'display', 'none');
      else a._$setStyle(this.__scoreLabel, 'display', 'none');
      var p = [],
        m = [],
        b = null,
        g = !0,
        v = {};
      if (
        this.__recordDto.qAnswerDto &&
        this.__recordDto.qAnswerDto.optIds &&
        this.__recordDto.qAnswerDto.optIds.length > 0
      )
        v = r._$array2object(this.__recordDto.qAnswerDto.optIds || null, function (e) {
          return e;
        });
      else g = !1;
      r._$forEach(l.optionDtos, function (e, t) {
        if (v[e.id]) {
          if (!e.answer) g = !1;
          m.push(d[t]);
        }
        if (e.answer) p.push(d[t]);
        if (e.analyse) b = (b || '') + '  ' + d[t] + '、' + e.analyse;
      });
      if ('checkbox' == this.__type && m.length != p.length) g = !1;
      if (l.type == c.CONST.TYPE_OBJECTIVE_JUDGE) b = l.analyse || null;
      if (this.__showAnalysis && !b) b = '';
      o = a._$getHtmlTemplate(
        'jst-edu-testChoiceOption',
        r._$merge(
          {
            queDto: l,
            showAskBtn:
              (100 == window.learnMode &&
                window.termDto &&
                0 == window.termDto.supportAiLessonPlan) ||
              (window.termDto &&
                1 == window.termDto.supportAiLessonPlan &&
                1 == window.termDto.supportFastQuiz),
            shouldHiddenScore: 1 == window.shouldHiddenScore,
            answers: this.__recordDto.qAnswerDto,
            mode: this.__mode,
            CONST: c.CONST,
            optionType: this.__type,
            letters: d,
            noScore: this.__noScore,
            rightAns: p.join('、'),
            selectAns: m.join('、'),
            showAnalysis: this.__showAnalysis,
            anstrue: g,
            analyse: b,
            offsetCtn: function (e) {
              if (l.type == c.CONST.TYPE_OBJECTIVE_JUDGE && e) {
                e = e.replace('正确', '<span class="u-icon-correct"></span>');
                e = e.replace('错误', '<span class="u-icon-wrong"></span>');
              }
              return e;
            }._$bind(this),
            setScore: function (e) {
              if (e && !this.__noScore) e = e.toFixed(2);
              else e = '0.00';
              return e;
            }._$bind(this),
          },
          { lang: (window.moocConfig || {}).lang || {} },
        ),
      );
      this.__choicebox.innerHTML = o;
      if (0 === this.__mode) {
        this.__inputs = a._$getByClassName(this.__choicebox, 'u-tbi');
        r._$forEach(
          this.__inputs,
          function (e, t) {
            s._$addEvent(e, 'click', this.__onSelect._$bind(this, l.optionDtos[t]));
          }._$bind(this),
        );
      }
    };
    l.__onSelect = function (e, t) {
      if ('radio' == this.__type) {
        this.__optIds[0] = e.id;
        var n = s._$getElement(t),
          i = n.checked;
        if (c._$isWap()) {
          r._$forEach(a._$getByClassName(n.parentNode.parentNode, 'answer-item'), function (e, t) {
            a._$delClassName(e, 'checked');
          });
          if (i) a._$addClassName(n.parentNode, 'checked');
          else a._$delClassName(n.parentNode, 'checked');
        }
      } else {
        var n = s._$getElement(t),
          i = n.checked;
        if (c._$isWap())
          if (i) {
            a._$addClassName(a._$getByClassName(n.parentNode, 'optionPos-check')[0], 'checked');
            a._$addClassName(n.parentNode, 'checked');
          } else {
            a._$delClassName(a._$getByClassName(n.parentNode, 'optionPos-check')[0], 'checked');
            a._$delClassName(n.parentNode, 'checked');
          }
        for (var o = !1, d = 0, l = this.__optIds.length; d < l; d++)
          if (this.__optIds[d] == e.id)
            if (i) o = !0;
            else this.__optIds.splice(d, 1);
        if (!o && i) this.__optIds.push(e.id);
      }
      this.__answerDto.optIds = this.__optIds;
      if (!this.__done && !this.__answerDto.time) {
        this.__done = !0;
        this.__answerDto.time = c._$getCurServerTime();
      }
      if (!this.__answerDto.qid) this.__answerDto.qid = this.__recordDto.questionDto.id;
      this._$dispatchEvent('onSelect', this.__answerDto);
    };
    l.__reset = function (e) {
      this.__paperType = e.type;
      this.__supReset(e);
      this.__answerDto = this.__recordDto.qAnswerDto;
      this.__done = !1;
      if (!this.__answerDto)
        this.__answerDto = {
          qid: this.__recordDto.questionDto.id,
          type: this.__recordDto.questionDto.type,
          optIds: [],
        };
    };
    l.__destroy = function () {
      this.__supDestroy();
      this.__optIds = null;
    };
  },
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '98bc2de85bcb11bb7f77ad5d5ee77c5a',
  '3f9cd2835e49e1a4b1d9cfa0e92683b1',
  '13d9d0a0fedd5c22f2453b15332aedc6',
  '9bdcd8c0c351549ef3cabe6382f2d7f1',
  '93828627ddb358ed890cb65967a0c1de',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  '08d2f36062baca2c8eb8327afd74d88c',
);
