EDU(
  '89a20d6e04a4ff5b168f1faa46d80b1a',
  function () {
    var e = window,
      t = NEJ.O,
      n = NEJ.F,
      i = NEJ.P('nej.e'),
      o = NEJ.P('nej.u'),
      a = NEJ.P('edu.u'),
      s,
      r;
    a._$$PdfReader = NEJ.C();
    s = a._$$PdfReader._$extend(a._$$UIBase, !0);
    r = a._$$PdfReader._$supro;
    s.__initNode = function () {
      this.__idNum = o._$randNumberString(2);
      this.__jsNamespace = NEJ.P('edu.u.pdfReader' + this.__idNum);
      this.__supInitNode();
      this.__initGInterface();
    };
    s.__destroy = function () {
      if (this.__parent) {
        var e = i._$getChildren(this.__parent);
        if (e) for (var t = 0; t < e.length; t++) this.__parent.removeChild(e[t]);
      }
      delete this.__flashObj;
      this.__supDestroy();
    };
    s.__initGInterface = function () {
      this.__jsNamespace.changePage = this.__changePage._$bind(this);
    };
    s.__changePage = function (e) {
      if (1 != e || this.isFirstLearnedPosition)
        this._$dispatchEvent('onPageChange', { toPageNum: e });
    };
    s.__reset = function (t) {
      this.isFirstLearnedPosition = 1 == t.lessonLearnVo.learnedPosition;
      i._$flash({
        src: e.imageUrlMap.image_pdf_swf,
        width: '100%',
        height: '100%',
        parent: t.parent,
        params: {
          wmode: 'transparent',
          flashvars: 'namespace=edu.u.pdfReader' + this.__idNum,
          allowscriptaccess: 'always',
          allowFullScreen: !t.notAllowFullScreen,
        },
        onready: function (e) {
          this.__flashObj = e;
        }._$bind(this),
      });
      this.__supReset(t);
      this._$readPdf(t.lessonLearnVo);
    };
    s._$readPdf = function (t) {
      if (t) {
        this.___lessonLearnVo = t;
        if (this.__readTimer) this.__readTimer = e.clearInterval(this.__readTimer);
        this.__readTimer = e.setInterval(
          function () {
            if (this.__flashObj) {
              this.__flashObj.loadSwfFile(t.textUrl, {
                startPageNum: t.learnedPosition || 1,
                widthHeightRadio: t.textPageWhRatio,
              });
              this.__readTimer = e.clearInterval(this.__readTimer);
            }
          }._$bind(this),
          100,
        );
      }
    };
  },
  'fa2b6ecbc49a62a4ffefe3ee4bbc79ba',
  '342ad7ae4eea50c3cad860686650a915',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'fa2b6ecbc49a62a4ffefe3ee4bbc79ba',
  'fe86216ed59e3103a56c42c850d389f0',
);
