EDU(
  '84117c1b0fcf34c8802d9f0946d1869e',
  function (e, t) {
    var n = window,
      i = NEJ.O,
      o = NEJ.F,
      a = NEJ.P('nej.e'),
      s = NEJ.P('nej.v'),
      r = NEJ.P('edu.d'),
      c = NEJ.P('edu.u'),
      d = NEJ.P('nej.u'),
      l;
    c._$$PdfUnit = NEJ.C();
    l = c._$$PdfUnit._$extend(c._$$UIBase, !0);
    l.__initXGui = function () {
      this.__seed_html = a._$addNodeTemplate(
        a._$getHtmlTemplate('jst-lessonPdfUI', { lang: (window.moocConfig || {}).lang || {} }),
      );
    };
    l.__initNode = function (e) {
      this.__supInitNode();
      this.__unitctBoxNode = a._$getByClassName(this.__body, 'j-unitctBox')[0];
      this.__unitctBarNode = a._$getByClassName(this.__body, 'j-unitctBar')[0];
      this.__contentCache = new r._$$COM_Cache_CourseCtCache();
    };
    l.__reset = function (i) {
      this.__supReset(i);
      this.__unitVo = i.unitVo;
      this.__resourceVo = i.resourceVo;
      this.__downPdfNode = a._$getByClassName(i.outNode, 'j-downpdf')[0];
      this.__curTime = new Date().getTime();
      this.__nowPage = 1;
      this.__pdfTimeLogTime = 0;
      this.__totalPage = this.__resourceVo.textPages || 0;
      if (this.__resourceVo.textOrigUrl) {
        c._$showNode(this.__unitctBarNode);
        this.__downPdfNode.href = t._$changeProtocol(this.__resourceVo.textOrigUrl);
      } else c._$hiddenNode(this.__unitctBarNode);
      this.__unitctBoxNode.style.height =
        this.__unitctBoxNode.scrollWidth / this.__resourceVo.textPageWhRatio + 'px';
      a._$setStyle(this.__unitctBoxNode, 'overflow-y', 'visible');
      var o = [{ type: 3, url: this.__resourceVo.textUrl }];
      if (this.__reader) this.__reader.destroy();
      this.__reader = new e({
        data: { pdfData: { sources: o, learnedPosition: this.__resourceVo.learnedPosition } },
      }).$inject(this.__unitctBoxNode);
      this.__reader.$on('pageChange', this.__recordTextPage._$bind(this));
      this.__reader.$on(
        'pageCounts',
        function (e) {
          this.__totalPage = e;
        }._$bind(this),
      );
      if (!n.isPreview) {
        var s = {
          userId: c._$getWebUser().id,
          courseId: n.courseDto.id,
          termId: this.__unitVo.termId,
          lessonId: this.__unitVo.lessonId,
          unitId: this.__unitVo.id,
          pdfId: this.__unitVo.contentId,
        };
        c._$trackEvent('pdfUnit', 'view', c._$convertToJSONHex(s));
        c._$log2Study('pdfUnit', 'view', s);
      }
    };
    l.__recordTextPage = function (e) {
      console.log('111111.', e);
      if (e) this.__nowPage = e;
      if (Number.isInteger(this.__curTime)) {
        var t = new Date().getTime();
        var i = t - this.__curTime;
        this.__contentCache._$saveLearnInfo({
          unitId: this.__unitVo.id,
          finished: this.__nowPage == this.__totalPage,
          contentType: 3,
          index: this.__pdfTimeLogTime++,
          pageNum: this.__nowPage,
          courseId: n.courseDto.id,
          lessonId: this.__unitVo.lessonId,
          termId: this.__unitVo.termId,
          lastLearnTime: t,
          learnedVideoTimeCount: parseInt(i / 1e3, 10),
        });
        this.__curTime = t;
      }
    };
    l.__destroy = function () {
      this.__recordTextPage();
      if (this.__reader) {
        this.__reader.destroy();
        this.__reader = null;
      }
      this.__supDestroy();
    };
  },
  '053423f7ca87a51880dfaefb4f9a31f5',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '89a20d6e04a4ff5b168f1faa46d80b1a',
  'ad72e09e8978dc83423b503971b6294c',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '342ad7ae4eea50c3cad860686650a915',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
);
