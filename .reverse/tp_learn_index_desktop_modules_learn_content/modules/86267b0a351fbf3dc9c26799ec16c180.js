EDU(
  '86267b0a351fbf3dc9c26799ec16c180',
  function (e, t, n, i, o, a, s, r) {
    var c = 'ie' == r._$KERNEL.browser && r._$KERNEL.version <= 9;
    var d = e.C();
    var l = d.extend(t);
    l._init = function (e) {
      this.__super(e);
      this.syncScaleValue = {};
    };
    l._reset = function () {
      this.__super();
      this._highestPriorityPage = null;
    };
    l.setDocument = function (e, t) {
      this.__super(e, t);
      if (this._isNodeReady) {
        if (!t || t <= 0 || t > e.numPages) t = 1;
        this._document
          .getPage(1)
          .then(
            function (n) {
              var i = n.getViewport(1 * o.CSS_UNITS);
              this._defaultViewport = i.clone();
              this._updateScale(this._defaultViewport);
              this._genPages(e.numPages);
              this.onReady && this.onReady({ pagesCount: e.numPages, pageIndex: t });
              this._slideToPage(t);
            }._$bind(this),
          )
          ['catch'](
            function (e) {
              console.error('pdf document getPage fail:' + e);
              this.onError &&
                this.onError(
                  s.errorCode.LOAD_PDF_PAGE_ERROR,
                  s.errorTxt[s.errorCode.LOAD_PDF_PAGE_ERROR + ''],
                );
            }._$bind(this),
          );
      }
    };
    l._genPageView = function (e, t) {
      return new i({
        pdfViewer: this,
        container: e,
        id: t,
        scale: 3 * this._initScaleValue,
        defaultViewport: this._defaultViewport,
        onBeforeDraw: function (e) {
          this._buffer && this._buffer.push(e);
        }._$bind(this),
      });
    };
    l._renderPage = function (e) {
      switch (e.renderingState) {
        case a.FINISHED:
          this._preRender(e.id);
          return;
        case a.PAUSED:
          this._highestPriorityPage = 'page' + this._currentPageNumber;
          e.resume();
          break;
        case a.RUNNING:
          this._highestPriorityPage = 'page' + this._currentPageNumber;
          break;
        case a.INITIAL:
          this._highestPriorityPage = 'page' + this._currentPageNumber;
          e.draw()
            .then(
              function (e) {
                if (e) this._preRender(e);
              }._$bind(this),
            )
            ['catch'](
              function (e) {
                console.error('pdf page draw error:' + e);
              }._$bind(this),
            );
      }
    };
    l._preRender = function (e) {
      if (!c)
        if (e == this._currentPageNumber) {
          var t = this.syncScaleValue;
          t[e] = t[e] ? !0 : this.setCurrentScale(this._initScaleValue / 3) || !0;
          this._forceRendering(e - 1);
          this._forceRendering(e + 1);
        }
    };
    l.isCurrPage = function (e) {
      return this._highestPriorityPage == e.renderingId;
    };
    return d;
  },
  '04114f69dda271a25460e2c2080630c8',
  '066e4c8da2c00fde47a845832a3121f4',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'e83a00cddb870f1d80ccdcf07ebe03b4',
  '6c55c98e8114721018ba02bb36e9a7da',
  'c713e1ea371d7be585e8229c82c025f6',
  '0ae40beefbe61a7436a36d54d2e96075',
  'f051aeae7bb889518ead30ef6e491df3',
);
