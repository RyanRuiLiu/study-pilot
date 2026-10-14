EDU(
  '5467e62f9605c8141f35bd317120d5c3',
  function () {
    var e = window,
      t = NEJ.O,
      i = NEJ.F,
      n = NEJ.P('nej.e'),
      a = NEJ.P('nej.v'),
      o = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r;
    o._$$ChapterQuizHwList = NEJ.C();
    r = o._$$ChapterQuizHwList._$extend(o._$$UIBase, !0);
    r.__initXGui = function () {
      this.__seed_html = n._$addNodeTemplate(
        n._$getHtmlTemplate('jst-learnChapterQuizHwList', {
          lang: (window.moocConfig || {}).lang || {},
        }),
      );
    };
    r.__initNode = function () {
      this.__supInitNode();
      this.__emptyNode = n._$getByClassName(this.__body, 'j-empty')[0];
    };
    r.__reset = function (e) {
      this.__supReset(e);
      this.__termVo = e.termVo || {};
      o._$hiddenNode(this.__emptyNode);
      var t = 0;
      this.__chapterQuizHwItemUIs = [];
      s._$forEach(
        this.__termVo.chapters,
        function (i, n) {
          if ((i.quizs && i.quizs.length) || (i.homeworks && i.homeworks.length)) {
            t++;
            var a = o._$$ChapterQuizHwItem._$allocate({
              parent: this.__body,
              chapterVo: i,
              syncMooc: e.syncMooc,
            });
            this.__chapterQuizHwItemUIs.push(a);
          }
        }._$bind(this),
      );
      if (t) o._$hiddenNode(this.__emptyNode);
      else o._$showNode(this.__emptyNode);
    };
    r.__destroy = function () {
      s._$forEach(
        this.__chapterQuizHwItemUIs,
        function (e, t) {
          e = o._$$ChapterQuizHwItem._$recycle(e);
        }._$bind(this),
      );
      this.__chapterQuizHwItemUIs = null;
      this.__supDestroy();
    };
  },
  '8ae840c9adc0658d1ccc470adbfacf62',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fe86216ed59e3103a56c42c850d389f0',
);
