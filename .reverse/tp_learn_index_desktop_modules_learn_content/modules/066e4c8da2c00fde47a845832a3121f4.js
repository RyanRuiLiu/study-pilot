EDU(
  '066e4c8da2c00fde47a845832a3121f4',
  function (e, t, n, i, o, a, s, r, c, d, l, _) {
    t._$pushCSSText(i);
    var u = e.C();
    var f = u.pro;
    f._init = function (e) {
      this.container = e.container;
      this.onReady = e.onReady;
      this.onPageUpdate = e.onPageUpdate;
      this.onError = e.onError;
      this.activeGrab = e.activeGrab;
      this.activeWaterMark = e.activeWaterMark;
      this.waterMarkContent = e.waterMarkContent;
      t._$dumpCSSText();
      this._isNodeReady = !1;
      this._buildHtml();
      this._reset();
    };
    f._buildHtml = function () {
      if (this.container) {
        this.container.appendChild(t._$html2node(n));
        this._bodyNode = t._$getByClassName(this.container, 'j-body')[0];
        this._sliderWrapNode = t._$getByClassName(this.container, 'j-sliderwrap')[0];
        this._bodyWidth = this._bodyNode.offsetWidth;
        this._bodyHeight = this._bodyNode.offsetHeight;
        setTimeout(
          function () {
            this._containerResizeHandler();
            this._af = a.watchResize(this._bodyNode, this._containerResizeHandler._$bind(this));
          }._$bind(this),
          0,
        );
      }
    };
    f.getPagesCount = function () {
      return this._pages.length;
    };
    f.getCurrentPageNode = function () {
      return this._sliderNodes[this._currentPageNumber - 1];
    };
    f.getCurrentPageNumber = function () {
      return this._currentPageNumber;
    };
    f.setCurrentPageNumber = function (e) {
      if (this._currentPageNumber != e) this._slideToPage(e);
    };
    f.nextPage = function () {
      if (!(this._currentPageNumber >= this.getPagesCount()))
        this.setCurrentPageNumber(this._currentPageNumber + 1);
    };
    f.prevPage = function () {
      if (!(this._currentPageNumber <= 1)) this.setCurrentPageNumber(this._currentPageNumber - 1);
    };
    f.getCurrentScale = function () {
      return this._pages[this._currentPageNumber - 1].scale;
    };
    f.setCurrentScale = function (e) {
      if (this._pages[this._currentPageNumber - 1]) {
        this._update();
        this._setScale(this._pages[this._currentPageNumber - 1], e);
      }
    };
    f._reset = function () {
      this._pages = [];
      this._currentPageNumber = 1;
      this._initScaleValue = 1;
      this._currentScaleValue = 1;
      this._pagesRequests = [];
    };
    f._checkReady = function () {
      this._bodyWidth = this._bodyNode.offsetWidth;
      this._bodyHeight = this._bodyNode.offsetHeight;
      if (this._bodyWidth && this._bodyHeight) {
        this._isNodeReady = !0;
        return !0;
      }
      return !1;
    };
    f.setDocument = function (e, t) {
      if (this._checkReady()) {
        if (this._document) {
          this._cancelRendering();
          this._reset();
        }
        if (e) {
          if (this.activeWaterMark && this.waterMarkContent && !this._waterMark)
            this._waterMark = new d({ element: this.container, content: this.waterMarkContent });
          this._document = e;
          var n = this._document.numPages;
          this._buffer = new o(o.DEFAULT_CACHE_SIZE);
          if (o.DEFAULT_CACHE_SIZE > n) this._buffer.resize(n);
        }
      } else
        setTimeout(
          function () {
            this.setDocument(e, t);
          }._$bind(this),
          50,
        );
    };
    f._genPages = function (e) {
      for (var n = 1; n <= e; ++n) {
        var i = document.createElement('div');
        i.className = 'slider j-slider';
        i.style.width = this._bodyWidth + 'px';
        i.style.height = this._bodyHeight + 'px';
        this._sliderWrapNode.appendChild(i);
        if (this.activeGrab) new c({ element: i }).activate();
        var o = document.createElement('div');
        o.className = 'slidertable';
        i.appendChild(o);
        var a = this._genPageView(o, n);
        this._pages.push(a);
      }
      this._sliderNodes = t._$getByClassName(this._sliderWrapNode, 'j-slider');
      this._sliderWrapNode.style.width = e * this._bodyWidth + 'px';
    };
    f._genPageView = function (e, t) {
      return null;
    };
    f._updateScale = function (e) {
      var t = this._bodyWidth;
      var n = this._bodyHeight;
      var i = e.width;
      var o = e.height;
      var a = i / o,
        r = t / n;
      if (a < r) initScale = n / o;
      else initScale = t / i;
      initScale = initScale < s.SCALE_VALUE_MIN ? s.SCALE_VALUE_MIN : initScale;
      initScale = initScale > s.SCALE_VALUE_MAX ? s.SCALE_VALUE_MAX : initScale;
      this._initScaleValue = initScale;
    };
    f._slideToPage = function (e) {
      if (this._sliderNodes) {
        var t = e - 1;
        t = t < 0 ? 0 : t;
        t = t > this._pages.length ? this._pages.length : t;
        if (this._sliderNodes[t] && this._pages[t]) {
          this._currentPageNumber = e;
          this._sliderWrapNode.style.left = -(t * this._bodyWidth) + 'px';
          this._update();
        }
      }
    };
    f._resize = function () {
      this._bodyWidth = this._bodyNode.offsetWidth;
      this._bodyHeight = this._bodyNode.offsetHeight;
      if (this._bodyWidth && this._bodyHeight && this._pages && this._pages.length) {
        var e = this._initScaleValue;
        if (this._defaultViewport) this._updateScale(this._defaultViewport);
        if (this._sliderNodes)
          for (var t = 0; t < this._sliderNodes.length; t++) {
            this._sliderNodes[t].style.width = this._bodyWidth + 'px';
            this._sliderNodes[t].style.height = this._bodyHeight + 'px';
          }
        if (this._sliderWrapNode && this._pages) {
          this._sliderWrapNode.style.width = this._pages.length * this._bodyWidth + 'px';
          this._sliderWrapNode.style.left = -(this._currentPageNumber - 1) * this._bodyWidth + 'px';
        }
        if (this._pages) {
          for (var t = 0; t < this._pages.length; t++)
            if (this._pages[t].scale == e || this._pages[t].scale < this._initScaleValue)
              this._setScale(this._pages[t], this._initScaleValue);
          this._update();
        }
        this._waterMark && this._waterMark.update();
      }
    };
    f._setScale = function (e, t) {
      t = t < this._initScaleValue ? this._initScaleValue : t;
      t = t > s.SCALE_VALUE_MAX ? s.SCALE_VALUE_MAX : t;
      e.update(t);
    };
    f._containerResizeHandler = function () {
      console.log('container resize');
      this._resize();
    };
    f._update = function () {
      this._forceRendering(this._currentPageNumber);
      this.onPageUpdate &&
        this.onPageUpdate({
          pageIndex: this._currentPageNumber,
          scale: this._pages[this._currentPageNumber - 1].scale,
        });
    };
    f.destroy = function () {
      if (this._af) {
        clearInterval(this._af);
        this._af = null;
      }
      if (this._pages && this._pages.length)
        for (var e = 0, t = this._pages.length; e < t; e++) this._pages[e].destroy();
      var n = this.container.childNodes;
      for (var e = n.length - 1; e >= 0; e--) this.container.removeChild(n[e]);
      this._pages = null;
      this._buffer = null;
    };
    f._cancelRendering = function () {
      if (this._pages && this._pages.length)
        for (var e = 0, t = this._pages.length; e < t; e++)
          if (this._pages[e]) this._pages[e].cancelRendering();
    };
    f._ensurePageLoaded = function (e) {
      if (e.page) return _.resolve(e.page);
      var t = e.id;
      if (this._pagesRequests[t]) return this._pagesRequests[t];
      var n = this._document
        .getPage(t)
        .then(
          function (n) {
            if (!e.page) e.setPage(n);
            this._pagesRequests[t] = null;
            return n;
          }._$bind(this),
        )
        ['catch'](
          function (e) {
            console.error('Unable to get page for page view', e);
            this._pagesRequests[t] = null;
            this.onError &&
              this.onError(
                r.errorCode.LOAD_PDF_PAGE_ERROR,
                r.errorTxt[r.errorCode.LOAD_PDF_PAGE_ERROR + ''],
              );
          }._$bind(this),
        );
      this._pagesRequests[t] = n;
      return n;
    };
    f._forceRendering = function (e) {
      if (!(e < 1 || e > this._pages.length)) {
        var t = this._pages[e - 1];
        if (t)
          this._ensurePageLoaded(t).then(
            function () {
              this._renderPage(t);
            }._$bind(this),
          );
      }
    };
    f._renderPage = function (e) {};
    return u;
  },
  '04114f69dda271a25460e2c2080630c8',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'b0a021b0ab86a5e78ae95a65ac08dc03',
  '7fa96f408f6a2f4553810864c19b8774',
  'f0e047b70228ef4514444ceb678b01da',
  'c6ac68abc784a45c1aa600db388ebcc3',
  '6c55c98e8114721018ba02bb36e9a7da',
  '0ae40beefbe61a7436a36d54d2e96075',
  '8d55582df3233e044f632a8de8faa4a2',
  'b86535cf4593184fbfbdb719d41c3b83',
  'f051aeae7bb889518ead30ef6e491df3',
  'acaf016265ee9e46872cbbb2398ea4b7',
);
