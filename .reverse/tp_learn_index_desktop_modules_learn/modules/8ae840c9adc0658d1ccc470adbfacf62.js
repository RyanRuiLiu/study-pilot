EDU(
  '8ae840c9adc0658d1ccc470adbfacf62',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    o._$$ChapterQuizHwItem = NEJ.C();
    r = o._$$ChapterQuizHwItem._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate('jst-learnChapterQuizHwItem', {
          lang: (window.moocConfig || {}).lang || {},
        }),
      );
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__nameNode = n._$getByClassName(this.__body, 'j-titleName')[0];
    };
    r.__mergeQuizHW = function (e) {
      this.__chapterVo = e;
      this.__chapterVo.quizs = this.__chapterVo.quizs || [];
      var t = this.__chapterVo.quizs.concat(this.__chapterVo.homeworks || []);
      this.__chapterVo.mergeQuizHw = t;
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__mergeQuizHW(e.chapterVo);
      this.__nameNode.innerText = this.__chapterVo.name || '';
      this.__quizHwItemUIs = [];
      var t = this.__chapterVo.mergeQuizHw.length;
      var i = o._$getCurServerTime();
      this.donwAmount = 0;
      this.fouceNotDown = !1;
      s._$forEach(
        this.__chapterVo.mergeQuizHw.sort(function (e, t) {
          return e.position - t.position;
        }),
        function (n, a) {
          if (this.__chapterVo.mergeQuizHw.length > 1) {
            try {
              var s =
                i >= n.test.releaseTime &&
                (i <= n.test.evaluateScoreReleaseTime || i <= n.test.deadline);
              if (s) this.donwAmount++;
            } catch (r) {}
            if (this.donwAmount > 1) this.fouceNotDown = !0;
          }
          var c = o._$$QuizHwListItem._$allocate({
            parent: this.__body,
            lessonVo: n,
            clazz: a == t - 1 ? 'last' : '',
            syncMooc: e.syncMooc,
            fouceNotDown: this.fouceNotDown,
          });
          this.__quizHwItemUIs.push(c);
        }._$bind(this),
      );
    };
    r.__clearUIs = function () {
      s._$forEach(
        this.__quizHwItemUIs,
        function (e, t) {
          e = o._$$QuizHwListItem._$recycle(e);
        }._$bind(this),
      );
      this.__quizHwItemUIs = null;
    };
    r.__destroy = function () {
      this.__clearUIs();
      this.__supDestroy();
    };
  },
  '90f346889e20579d29ccd3fc01873f10',
  '93828627ddb358ed890cb65967a0c1de',
  '342ad7ae4eea50c3cad860686650a915',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
