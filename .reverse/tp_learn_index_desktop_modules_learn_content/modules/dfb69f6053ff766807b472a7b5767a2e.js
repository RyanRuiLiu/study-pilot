EDU(
  'dfb69f6053ff766807b472a7b5767a2e',
  function (e, t, n, i, o, a, s, r, c, d) {
    var l,
      _ = window;
    s._$$PdfReader = t._$klass();
    l = s._$$PdfReader._$extend(i._$$EventTarget);
    l.__init = function () {
      this.__super();
    };
    l.__reset = function (e) {
      this.__super(e);
      this.__options = e;
      this.__initNamespace();
      this.__genPlayer();
      this._buildWaterMark();
    };
    l.__initNamespace = function () {
      var t = 'edu.front.flashPdfReader' + e._$randNumberString(2);
      this.__options.namespaceStudy = t;
      this.__jsNamespace = NEJ.P(this.__options.namespaceStudy);
      this.__jsNamespace.changePage = this.__changePage._$bind(this);
    };
    l.__genPlayer = function () {
      var e = this.__options.pdfReaderSwfRemoteUrl;
      var t = 'namespace=' + this.__options.namespaceStudy;
      o._$flash({
        src: e,
        width: '100%',
        height: '100%',
        parent: this.__options.parent,
        params: {
          wmode: 'transparent',
          allowscriptaccess: 'always',
          allowFullScreen: !this.__options.notAllowFullScreen,
          flashvars: t,
        },
        onready: function (e) {
          this.__flashObj = e;
        }._$bind(this),
      });
      if (this.__options.pdfData) this._$load(this.__options.pdfData);
    };
    l.__setPlayerFunc = function (e) {
      if (e && this.__flashObj) e();
      else {
        if (this.__timer) this.__timer = _.clearInterval(this.__timer);
        this.__timer = _.setInterval(
          function () {
            if (e && this.__flashObj) {
              e();
              this.__timer = _.clearInterval(this.__timer);
            }
          }._$bind(this),
          100,
        );
      }
    };
    l._buildWaterMark = function () {
      if (this.__options.waterMark && this.__options.waterMarkContent) {
        this._waterMark = new a({
          element: this.__options.parent,
          content: this.__options.waterMarkContent,
        });
        setTimeout(
          function () {
            this._waterMark.update();
          }._$bind(this),
          50,
        );
      }
    };
    l.__destroy = function () {
      this.__clear();
      this.__supDestroy();
    };
    l.load = l._$load = function (e) {
      if (e) {
        this.__pdfData = e;
        if (!this.__pdfData.textUrl) this.__pdfData.textUrl = this.__pdfData.sources[0].url;
        this.__setPlayerFunc(
          function () {
            this.__flashObj.loadSwfFile(this.__pdfData.textUrl, {
              startPageNum: this.__pdfData.learnedPosition,
              widthHeightRadio: this.__pdfData.textPageWhRatio,
            });
          }._$bind(this),
        );
      }
    };
    l.__changePage = function (e) {
      this._$dispatchEvent('onPageChange', e);
    };
    l.__clear = function () {
      if (this.__parent) {
        var e = n._$getChildren(this.__parent);
        if (e) for (var t = 0; t < e.length; t++) this.__parent.removeChild(e[t]);
      }
      if (this.__timer) this.__timer = _.clearInterval(this.__timer);
      delete this.__flashObj;
    };
    return s;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  'fa2b6ecbc49a62a4ffefe3ee4bbc79ba',
  'b86535cf4593184fbfbdb719d41c3b83',
);
