EDU(
  '7872629f0fb778433629a1d520d03d44',
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
    var d = i._$pushCSSText(
      '        .#<uispace> .unitctBox{padding:20px;}        .#<uispace> .forumEnter{display:block;margin-bottom:10px;}        ',
    );
    a._$$ForumUnit = NEJ.C();
    c = a._$$ForumUnit._$extend(a._$$UIBase, !0);
    c.__initXGui = function () {
      this.__seed_html = i._$addNodeTemplate(
        i._$getHtmlTemplate('jst-lessonForumUI', { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = d;
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__unitctBoxNode = i._$getByClassName(this.__body, 'j-unitctBox')[0];
      this.__forumEnterNode = i._$getByClassName(this.__body, 'j-forumEnter')[0];
      o._$addEvent(this.__forumEnterNode, 'click', this.__handleForumEnter._$bind(this));
      this.__contentCache = new s._$$COM_Cache_CourseCtCache();
    };
    c.__handleForumEnter = function () {
      e.dispatcher._$redirect(a.umi('learnForumPanel') + '?id=' + this.__resourceVo.post.forumId);
    };
    c.__reset = function (t) {
      this.__supReset(t);
      this.__unitVo = t.unitVo;
      this.__resourceVo = t.resourceVo;
      this.__detailUI = a._$$ForumDetailUI._$allocate({
        parent: this.__unitctBoxNode,
        postVo: this.__resourceVo.post,
        forumData: { forumId: e.lessonForumId || '' },
        termId: this.__unitVo.termId,
      });
      if (!e.isPreview) {
        var n = {
          userId: a._$getWebUser().id,
          courseId: e.courseDto.id,
          termId: this.__unitVo.termId,
          lessonId: this.__unitVo.lessonId,
          unitId: this.__unitVo.id,
          postId: this.__unitVo.contentId,
        };
        a._$trackEvent('forumUnit', 'view', a._$convertToJSONHex(n));
        a._$log2Study('forumUnit', 'view', n);
        this.__contentCache._$saveLearnInfo({
          unitId: this.__unitVo.id,
          finished: !0,
          contentType: 6,
        });
      }
    };
    c.__destroy = function () {
      if (this.__detailUI) this.__detailUI = a._$$ForumDetailUI._$recycle(this.__detailUI);
      this.__supDestroy();
    };
  },
  'ec5f286cece29e66b88a702d2943a530',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'ad72e09e8978dc83423b503971b6294c',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '342ad7ae4eea50c3cad860686650a915',
  'bf8d09e46d2369efd6e41b29fe211330',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '3f8f347c9171583dc1295dc796e8a1bf',
);
