EDU(
  'be679cde8e87d7a4d28f9f32f4ee35ac',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.v'),
      a = NEJ.P('edu.u'),
      s = NEJ.P('nej.u'),
      r = NEJ.P('edu.d'),
      c;
    var d = i._$pushCSSText(
      '        .#<uispace> .unitctBox{word-break: break-word;word-wrap: break-word;padding:20px 30px;font-size:14px; overflow: auto; }        ',
    );
    a._$$RichTextUnit = NEJ.C();
    c = a._$$RichTextUnit._$extend(a._$$UIBase, !0);
    c.__initXGui = function () {
      this.__seed_html = i._$addNodeTemplate(
        i._$getHtmlTemplate('jst-lessonRichTxtUI', { lang: (window.moocConfig || {}).lang || {} }),
      );
      this.__seed_css = d;
    };
    c.__initNode = function () {
      this.__supInitNode();
      this.__unitctBoxNode = i._$getByClassName(this.__body, 'j-unitctBox')[0];
      this.__contentCache = new r._$$COM_Cache_CourseCtCache();
    };
    c.__reset = function (t) {
      this.__supReset(t);
      this.__unitVo = t.unitVo;
      this.__resourceVo = t.resourceVo;
      this.__unitctBoxNode.style.minHeight = 0.6 * this.__unitctBoxNode.scrollWidth - 40 + 'px';
      this.__unitctBoxNode.style.maxHeight = 0.8 * this.__unitctBoxNode.scrollWidth - 40 + 'px';
      this.__unitctBoxNode.innerHTML = this.__resourceVo.htmlContent || '';
      s._$renderRich(this.__unitctBoxNode);
      if (!e.isPreview) {
        var n = {
          userId: a._$getWebUser().id,
          courseId: e.courseDto.id,
          termId: this.__unitVo.termId,
          lessonId: this.__unitVo.lessonId,
          unitId: this.__unitVo.id,
          contentId: this.__unitVo.contentId,
        };
        a._$trackEvent('richTextUnit', 'view', a._$convertToJSONHex(n));
        a._$log2Study('richTextUnit', 'view', n);
        this.__contentCache._$saveLearnInfo({
          unitId: this.__unitVo.id,
          finished: !0,
          contentType: 4,
        });
      }
    };
    c.__destroy = function () {
      this.__supDestroy();
    };
  },
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'ad72e09e8978dc83423b503971b6294c',
  '9bdcd8c0c351549ef3cabe6382f2d7f1',
  '5c33d04b2d62fa9ae2df93d96d595865',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fc2697b2e0ea24c0b604d47b39f64437',
);
