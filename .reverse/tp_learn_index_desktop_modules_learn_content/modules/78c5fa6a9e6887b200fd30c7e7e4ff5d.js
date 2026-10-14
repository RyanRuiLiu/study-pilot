EDU(
  '78c5fa6a9e6887b200fd30c7e7e4ff5d',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('edu.u'),
      s = NEJ.P('edu.d'),
      r = NEJ.P('nej.u'),
      c;
    a._$$LessonBreadCrumb = NEJ.C();
    c = a._$$LessonBreadCrumb._$extend(a._$$UIBase, !0);
    c.__initXGui = function () {
      this.__seed_html = i._$addNodeTemplate(
        i._$getHtmlTemplate('jst-lessonBreadCrumbUI', {
          lang: (window.moocConfig || {}).lang || {},
        }),
      );
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__dropNode1 = i._$getByClassName(this.__body, 'j-chapter')[0];
      this.__dropNode2 = i._$getByClassName(this.__body, 'j-lesson')[0];
    };
    c.__onGetChapterList = function (e) {
      this.__chapterUI = a._$$DropListSelect._$allocate({
        parent: this.__dropNode1,
        list: this.__mocTermDto.chapters || [],
        selectId: this.__chapterVo.id,
        itemSelect: this.__onGetNewChapter._$bind(this),
      });
      this.__lessonUI = a._$$DropListSelect._$allocate({
        parent: this.__dropNode2,
        list: this.__chapterVo.lessons || [],
        selectId: this.__lessonVo.id,
        itemSelect: this.__onGetNewLesson._$bind(this),
      });
    };
    c.__onGetNewChapter = function (e) {
      this.__lessonUI = a._$$DropListSelect._$recycle(this.__lessonUI);
      if (e.lessons && !(e.lessons.length <= 0)) {
        this.__chapterVo = e;
        this.__lessonUI = a._$$DropListSelect._$allocate({
          parent: this.__dropNode2,
          list: e.lessons || [],
          defaultName: window.moocConfig.lang.KEY_LEARN_PLEASE_TIME,
          itemSelect: this.__onGetNewLesson._$bind(this),
        });
      }
    };
    c.__onGetNewLesson = function (t) {
      a._$trackEvent('selectLesson', 'click', '点击课时内下拉菜单, id:' + this.__lessonVo.id);
      this.__lessonVo = t;
      e.dispatcher._$redirect(
        a.umi('learnContent') + '?type=detail&id=' + this.__lessonVo.id + '&sm=1',
      );
    };
    c.__reset = function (e) {
      this.__supReset(e);
      this.__curChapter = -1;
      this.__curLesson = -1;
      this.__lessonVo = e.lessonVo || {};
      this.__chapterVo = e.chapterVo || {};
      this.__mocTermDto = e.mocTermDto || {};
      this.__onGetChapterList();
    };
    c.__destroy = function () {
      if (this.__chapterUI) this.__chapterUI = a._$$DropListSelect._$recycle(this.__chapterUI);
      if (this.__lessonUI) this.__lessonUI = a._$$DropListSelect._$recycle(this.__lessonUI);
      this.__supDestroy();
    };
  },
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '83af3930ddd32bf42c9b2148c50fe1e4',
  '342ad7ae4eea50c3cad860686650a915',
  'bf8d09e46d2369efd6e41b29fe211330',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
