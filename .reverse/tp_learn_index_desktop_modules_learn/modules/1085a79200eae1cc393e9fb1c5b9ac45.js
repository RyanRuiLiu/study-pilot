EDU(
  '1085a79200eae1cc393e9fb1c5b9ac45',
  function (e, t) {
    var i = window,
      n = NEJ.O,
      a = NEJ.F,
      o = NEJ.P('nej.e'),
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
      _,
      l;
    var h = 'en' === window.currentLanguage;
    var f = o._$addHtmlTemplate(
      '<div class="m-choiceQuestion u-questionItem">       \t  <div class="j-title title f-cb">       \t  \t<div class="position f-fl"></div>       \t  \t<div class="qaDescription f-fl f-cb">       \t  \t    <div class="qaIndex j-qaindex f-fl f-dn"></div>       \t  \t\t<div class="qaCate j-qacate f-fl"></div>\t       \t  \t<div class="f-richEditorText j-richTxt"></div>\t       \t  \t<div class="qaMark j-qamark f-fr f-dn"></div>               <div class="j-aiQuery aiQuery f-dn"></div>       \t  \t</div>       \t  \t<label class="scoreLabel f-fr f-dn j-scoreLabel">' +
        window.moocConfig.lang.KEY_LEARN_SCORE_AND_TOTAL_SCORE +
        '</label>       \t  </div>          <div class="j-choicebox">       \t  </div>       </div>',
    );
    c._$$ChoiceQuestionUI = NEJ.C();
    _ = c._$$ChoiceQuestionUI._$extend(c._$$BaseType, !0);
    l = c._$$ChoiceQuestionUI._$supro;
    _.__initXGui = function () {
      this.__seed_html = o._$addNodeTemplate(
        o._$getHtmlTemplate(f, { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    _.__initNode = function () {
      this.__supInitNode();
      this.__titleNode = o._$getByClassName(this.__body, 'j-title')[0];
      this.__choicebox = o._$getByClassName(this.__body, 'j-choicebox')[0];
      this.__scoreLabel = o._$getByClassName(this.__body, 'j-scoreLabel')[0];
      this.__cateLabel = o._$getByClassName(this.__body, 'j-qacate')[0];
      this.__indexLabel = o._$getByClassName(this.__body, 'j-qaindex')[0];
      this.__markLabel = o._$getByClassName(this.__body, 'j-qamark')[0];
      this.__richTextNode = o._$getByClassName(this.__body, 'j-richTxt')[0];
      this.__aiQueryBox = o._$getByClassName(this.__body, 'j-aiQuery')[0];
      this.__questionInfo = o._$getChildren(this.__titleNode);
    };
    _.__buildQuestionInfo = function () {
      var t = 'en' === window.currentLanguage;
      var n = window.moocConfig.lang.KEY_LEARN_SCORE_POINTS;
      if (!this.__optIds)
        this.__optIds = this.__recordDto.qAnswerDto ? this.__recordDto.qAnswerDto.optIds : [];
      else this.__recordDto.qAnswerDto = { optIds: this.__optIds };
      var a = '',
        _ = this.__recordDto.questionDto,
        l = this.__paperType;
      if ((!this.__position && 0 != this.__position) || this.__position < 0)
        c._$hiddenNode(this.__questionInfo[0]);
      else {
        c._$showNode(this.__questionInfo[0]);
        this.__questionInfo[0].innerText = this.__position + 1;
      }
      if (this.__indexNum > 0) {
        this.__indexLabel.innerHTML = this.__indexNum + '、';
        o._$delClassName(this.__indexLabel, 'f-dn');
      }
      this.__cateLabel.innerHTML = '';
      if (this.__noScore && !c._$isWap()) {
        this.__richTextNode.innerHTML = e._$formateImagePrefix(_.title || '');
        this.__cateLabel.innerHTML = '';
      } else {
        var h = _.title || '',
          f = '';
        var u = t && _.score >= 1 ? 's' : '';
        switch (_.type) {
          case c.CONST.TYPE_OBJECTIVE_SINGLE:
            f +=
              '<span class="dan">' +
              window.moocConfig.lang.KEY_LEARN_QUESTION_TYPE_SINGLE +
              '</span>';
            if (!c._$isWap()) f += '(' + _.score + n + u + ')';
            break;
          case c.CONST.TYPE_OBJECTIVE_MULTI:
            f +=
              '<span class="duo">' +
              window.moocConfig.lang.KEY_LEARN_QUESTION_TYPE_MULTIPLE +
              '</span>';
            if (!c._$isWap()) f += '(' + _.score + n + u + ')';
            break;
          case c.CONST.TYPE_OBJECTIVE_JUDGE:
            f +=
              '<span class="pan">' +
              window.moocConfig.lang.KEY_LEARN_QUESTION_TYPE_JUDGE +
              '</span>';
            if (!c._$isWap()) f += '(' + _.score + n + u + ')';
        }
        this.__cateLabel.innerHTML = f;
        this.__richTextNode.innerHTML = h;
        if (c._$isWap() && 6 != l) {
          this.__markLabel.innerHTML = '(' + _.score + n + ')';
          o._$delClassName(this.__markLabel, 'f-dn');
        }
      }
      r._$renderRich(this.__richTextNode);
      this.__type = c._$parseOptionType(_.type);
      if (1 === this.__mode && !this.__noScore && !i.isPreview)
        if (!c._$isWap() && this.__showAnalysis)
          o._$setStyle(this.__scoreLabel, 'display', 'block');
        else o._$setStyle(this.__scoreLabel, 'display', 'none');
      else o._$setStyle(this.__scoreLabel, 'display', 'none');
      var p = [],
        m = [],
        b = null,
        g = !0,
        E = {};
      if (
        this.__recordDto.qAnswerDto &&
        this.__recordDto.qAnswerDto.optIds &&
        this.__recordDto.qAnswerDto.optIds.length > 0
      )
        E = r._$array2object(this.__recordDto.qAnswerDto.optIds || null, function (e) {
          return e;
        });
      else g = !1;
      r._$forEach(_.optionDtos, function (e, t) {
        if (E[e.id]) {
          if (!e.answer) g = !1;
          m.push(d[t]);
        }
        if (e.answer) p.push(d[t]);
        if (e.analyse) b = (b || '') + '  ' + d[t] + '、' + e.analyse;
      });
      if ('checkbox' == this.__type && m.length != p.length) g = !1;
      if (_.type == c.CONST.TYPE_OBJECTIVE_JUDGE) b = _.analyse || null;
      if (this.__showAnalysis && !b) b = '';
      a = o._$getHtmlTemplate(
        'jst-edu-testChoiceOption',
        r._$merge(
          {
            queDto: _,
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
              if (_.type == c.CONST.TYPE_OBJECTIVE_JUDGE && e) {
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
      this.__choicebox.innerHTML = a;
      if (0 === this.__mode) {
        this.__inputs = o._$getByClassName(this.__choicebox, 'u-tbi');
        r._$forEach(
          this.__inputs,
          function (e, t) {
            s._$addEvent(e, 'click', this.__onSelect._$bind(this, _.optionDtos[t]));
          }._$bind(this),
        );
      }
    };
    _.__onSelect = function (e, t) {
      if ('radio' == this.__type) {
        this.__optIds[0] = e.id;
        var i = s._$getElement(t),
          n = i.checked;
        if (c._$isWap()) {
          r._$forEach(o._$getByClassName(i.parentNode.parentNode, 'answer-item'), function (e, t) {
            o._$delClassName(e, 'checked');
          });
          if (n) o._$addClassName(i.parentNode, 'checked');
          else o._$delClassName(i.parentNode, 'checked');
        }
      } else {
        var i = s._$getElement(t),
          n = i.checked;
        if (c._$isWap())
          if (n) {
            o._$addClassName(o._$getByClassName(i.parentNode, 'optionPos-check')[0], 'checked');
            o._$addClassName(i.parentNode, 'checked');
          } else {
            o._$delClassName(o._$getByClassName(i.parentNode, 'optionPos-check')[0], 'checked');
            o._$delClassName(i.parentNode, 'checked');
          }
        for (var a = !1, d = 0, _ = this.__optIds.length; d < _; d++)
          if (this.__optIds[d] == e.id)
            if (n) a = !0;
            else this.__optIds.splice(d, 1);
        if (!a && n) this.__optIds.push(e.id);
      }
      this.__answerDto.optIds = this.__optIds;
      if (!this.__done && !this.__answerDto.time) {
        this.__done = !0;
        this.__answerDto.time = c._$getCurServerTime();
      }
      if (!this.__answerDto.qid) this.__answerDto.qid = this.__recordDto.questionDto.id;
      this._$dispatchEvent('onSelect', this.__answerDto);
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
          optIds: [],
        };
    };
    _.__destroy = function () {
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
