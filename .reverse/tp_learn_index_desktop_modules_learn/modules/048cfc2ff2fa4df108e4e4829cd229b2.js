EDU(
  '048cfc2ff2fa4df108e4e4829cd229b2',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    o._$$QuizInfoItem = NEJ.C();
    r = o._$$QuizInfoItem._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate('jst-quizInfoItem', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__submitTimeNode = n._$getByClassName(this.__body, 'j-submitTime')[0];
      this.__validScoreNode = n._$getByClassName(this.__body, 'j-validScore')[0];
      this.__validLockScoreNode = n._$getByClassName(this.__body, 'j-validLockScore')[0];
      this.__validLockScoreContainer = n._$getByClassName(
        this.__body,
        'j-validLockScore-container',
      )[0];
      this.__scoreTypeNode = n._$getByClassName(this.__body, 'j-scoreType')[0];
      this.__submitCountNode = n._$getByClassName(this.__body, 'j-submitCount')[0];
      this.__descriptionNode = n._$getByClassName(this.__body, 'j-description')[0];
    };
    r.__reset = function (t) {
      this.__supReset(t);
      this.__quizInfoVo = t.quizInfoVo || {};
      this.__submitTimeNode.innerText = o._$formatCommonTime(this.__quizInfoVo.deadline);
      var i = 1 == window.shouldHiddenScore && this.__quizInfoVo.usedTryCount > 0;
      if (i && this.__validLockScoreNode) {
        this.__validLockScoreNode.style.display = 'block';
        var a = n._$getByClassName(this.__body, 'j-validLockScore-total')[0];
        a.innerText = '/' + (this.__quizInfoVo.totalScore || 0).toFixed(2);
        this.__validScoreNode.innerText = '';
      } else {
        this.__validLockScoreNode.style.display = 'none';
        this.__validScoreNode.innerText =
          (this.__quizInfoVo.effectScore || 0).toFixed(2) +
          '/' +
          (this.__quizInfoVo.totalScore || 0).toFixed(2);
      }
      this.__scoreTypeNode.innerText = o._$getQuizValidScoreStr(this.__quizInfoVo.effectScoreRule);
      this.__submitCountNode.innerText =
        (this.__quizInfoVo.usedTryCount || 0) + '/' + (this.__quizInfoVo.totalTryCount || 0);
      this.__descriptionNode.innerText = this.__quizInfoVo.description;
      if (this.__quizInfoVo.ansformInfoList && this.__quizInfoVo.ansformInfoList.length)
        this.__quizDoneListUI = o._$$UserQuizDoneList._$allocate({
          parent: this.__body,
          ansformInfoList: this.__quizInfoVo.ansformInfoList,
          courseLearnUrl:
            e.urlPrefix.courseLearnPrefix +
            e.courseDto.schoolPanel.shortName +
            '-' +
            e.courseDto.id,
          quizInfo: this.__quizInfoVo,
        });
    };
    r.__destroy = function () {
      if (this.__quizDoneListUI)
        this.__quizDoneListUI = o._$$UserQuizDoneList._$recycle(this.__quizDoneListUI);
      this.__supDestroy();
    };
  },
  '28c5022e9cbc3e7118214389b7ecdf19',
  'cfc7f00905592e4a9dc5b4ce816a266c',
  '7ae1049f52447f73129209d74071c691',
  '342ad7ae4eea50c3cad860686650a915',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
