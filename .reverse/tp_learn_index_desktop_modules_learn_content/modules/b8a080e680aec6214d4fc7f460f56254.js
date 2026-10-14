EDU(
  'b8a080e680aec6214d4fc7f460f56254',
  function (e, t, n, i, o) {
    var a = e.C();
    var s = a.extend(t);
    s._init = function (e) {
      this.__super(e);
    };
    s.setDocument = function (e, t) {
      this.__super(e, t);
      if (this._isNodeReady) {
        if (!t || t <= 0 || t > e.numPages) t = 1;
        this._document
          .getPage(1)
          .then(
            function (n) {
              this._defaultViewport = n.getViewport();
              this._updateScale(this._defaultViewport);
              this._genPages(e.numPages);
              this.onReady && this.onReady({ pagesCount: e.numPages, pageIndex: t });
              this._slideToPage(t);
            }._$bind(this),
          )
          ['catch'](
            function (e) {
              console.error('pic document getPage fail:' + e);
              this.onError &&
                this.onError(
                  o.errorCode.LOAD_PDF_PAGE_ERROR,
                  o.errorTxt[o.errorCode.LOAD_PDF_PAGE_ERROR + ''],
                );
            }._$bind(this),
          );
      }
    };
    s._genPageView = function (e, t) {
      return new n({
        container: e,
        id: t,
        scale: this._initScaleValue,
        defaultViewport: this._defaultViewport,
        onBeforeDraw: function (e) {
          this._buffer && this._buffer.push(e);
        }._$bind(this),
      });
    };
    s._renderPage = function (e) {
      switch (e.renderingState) {
        case i.FINISHED:
          this._preRender(e.id);
          return;
        case i.RUNNING:
          break;
        case i.INITIAL:
          e.draw()
            .then(
              function (e) {
                this._preRender(e);
              }._$bind(this),
            )
            ['catch'](
              function (e) {
                console.error('pic page draw error:' + e);
              }._$bind(this),
            );
      }
    };
    s._preRender = function (e) {
      if (e == this._currentPageNumber) {
        this._forceRendering(e - 1);
        this._forceRendering(e + 1);
      }
    };
    return a;
  },
  '04114f69dda271a25460e2c2080630c8',
  '066e4c8da2c00fde47a845832a3121f4',
  '8b3037c016b81c2866ad092beeeac865',
  'c713e1ea371d7be585e8229c82c025f6',
  '0ae40beefbe61a7436a36d54d2e96075',
);
