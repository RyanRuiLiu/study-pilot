EDU(
  'fc3273513654082669a4cda1da469bfa',
  function (e, t, n, i, o, a, s, r, c, d) {
    var l = window;
    var _ = !!document.createElement('canvas').getContext;
    var u = !0;
    if ('ie' == d._$KERNEL.browser && d._$KERNEL.version <= 10) u = !1;
    var f = o.$extends({
      config: function () {
        a.extend(this, {});
        a.extend(this.data, {
          openThumbnail: !0,
          activeGrab: !('ie' == d._$KERNEL.browser && d._$KERNEL.version <= 9),
          notAllowFullScreen: !1,
          isFullScreenMode: !1,
          currentPageIndex: 0,
          scale: 1,
          pageCount: 0,
          showLoading: !0,
          showError: !1,
          usePdf: !1,
          curReaderType: null,
          hasOrigin: !1,
          hasPic: !1,
          pdfData: null,
          formatLoadData: null,
          errorText: '',
          waterMark: !1,
          waterMarkContent: '',
        });
        this.supr();
        this.$watch(
          'currentPageIndex',
          function (e) {
            if (e) {
              e = Number(e);
              if (n._$isNumber(e) && this.data.pageCount)
                if (e > 0 && e <= this.data.pageCount) this.go(e);
            }
          }._$bind(this),
        );
      },
      computed: {
        noPrev: function (e) {
          return 1 == e.currentPageIndex;
        },
        noNext: function (e) {
          return e.currentPageIndex == e.pageCount;
        },
      },
      init: function () {
        this.supr();
        this._rootNode = this.$refs.root;
        this._bindEvents();
        this._showLoading();
        if (this.data.pdfData) this.load(this.data.pdfData);
      },
      _bindEvents: function () {},
      _genPdfViewer: function () {
        try {
          PDFJS.cMapPacked = !0;
          PDFJS.cMapUrl =
            '//yds3-infra-arch.ydstatic.com/school-cdn-storage/mooc-static/pdfjs-dist/cmaps/';
        } catch (e) {
          console.log('cMap设置出错', e);
        }
        this._viewer = new s({
          viewerNode: this.$refs.h5pdfreader,
          thumbViewerNode: this.$refs.h5pdfthumb,
          openThumbnail: this.data.openThumbnail,
          onReady: this._getPageReady._$bind(this),
          onPageUpdate: this._getPageUpdate._$bind(this),
          onError: this._showError._$bind(this),
          activeGrab: this.data.activeGrab,
          activeWaterMark: this.data.waterMark,
          waterMarkContent: this.data.waterMarkContent,
        });
        this._viewer.load(
          this.data.formatLoadData[this.data.curReaderType],
          this.data.currentPageIndex,
        );
      },
      _genPicViewer: function () {
        this._viewer = new r({
          viewerNode: this.$refs.h5pdfreader,
          thumbViewerNode: this.$refs.h5pdfthumb,
          openThumbnail: this.data.openThumbnail,
          onReady: this._getPageReady._$bind(this),
          onPageUpdate: this._getPageUpdate._$bind(this),
          onError: this._showError._$bind(this),
          activeGrab: this.data.activeGrab,
          activeWaterMark: this.data.waterMark,
          waterMarkContent: this.data.waterMarkContent,
        });
        this._viewer.load(
          this.data.formatLoadData[this.data.curReaderType],
          this.data.currentPageIndex,
        );
      },
      load: function (e) {
        if (e) {
          this.data.pdfData = e;
          var t = this._getReaderType(e);
          if (void 0 != t)
            if (!this.data.curReaderType || this.data.curReaderType != t) {
              this.data.curReaderType = t;
              this._createReader(this.data.curReaderType);
            }
        }
      },
      _createReader: function (e) {
        if (this._viewer) {
          this._viewer.destroy();
          this._viewer = null;
        }
        if ('origin' == e)
          if (l.PDFJS) this._genPdfViewer();
          else this._loadPdfJS();
        else this._genPicViewer();
      },
      _getReaderType: function (e) {
        this.data.currentPageIndex = e.learnedPosition;
        this.data.formatLoadData = {};
        this.data.hasPic = !1;
        this.data.hasOrigin = !1;
        this.data.canChangeReaderType = !1;
        if (e.sources && e.sources.length) {
          for (var t = 0; t < e.sources.length; t++)
            if (3 == e.sources[t].type) {
              this.data.hasOrigin = !0;
              this.data.formatLoadData['origin'] = e.sources[t].url;
            } else if (2 == e.sources[t].type) {
              this.data.hasPic = !0;
              this.data.formatLoadData['pic'] = {
                picPrefix: e.sources[t].picPrefix,
                smallPicPrefix: e.sources[t].smallPicPrefix,
                picSuffix: e.sources[t].picSuffix,
                dAuth: e.sources[t].da,
                pageCount: e.pageCount,
              };
            }
          this.data.canChangeReaderType = this.data.hasOrigin && this.data.hasPic && u && _;
          this.$emit('canChangeReaderType', this.data.canChangeReaderType);
          if (this.data.usePdf)
            if (this.data.hasOrigin && u && _) {
              this.$emit('readerType', 'origin');
              return 'origin';
            }
          if (this.data.hasPic) {
            this.$emit('readerType', 'pic');
            return 'pic';
          }
          if (this.data.hasOrigin && u && _) {
            this.$emit('readerType', 'origin');
            return 'origin';
          }
          this._showError(c.errorCode.DATA_FORMAT_ERROR);
        } else this._showError(c.errorCode.DATA_FORMAT_ERROR);
      },
      _loadPdfJS: function () {
        i._$loadScript('//cst.stu.126.net/u/js/cms/pdf.js?1530862868615', {
          onload: this._genPdfViewer._$bind(this),
        });
      },
      _getPageReady: function (e) {
        this.data.pageCount = e.pagesCount;
        this._hideLoading();
        this.$emit('pageCounts', e.pagesCount);
        this.$update();
      },
      _getPageUpdate: function (e) {
        if (this.data.currentPageIndex != e.pageIndex || this.data.scale != e.scale) {
          this.data.currentPageIndex = e.pageIndex;
          this.data.scale = e.scale;
          this.$update();
          this.$emit('pageChange', e.pageIndex);
        }
      },
      changePlayerType: function (e) {
        if (this.data.canChangeReaderType)
          if ('origin' === e || 'pic' === e)
            if (this.data.curReaderType != e) {
              this.data.curReaderType = e;
              this._createReader(this.data.curReaderType);
            }
      },
      go: function (e) {
        this._viewer.setCurrentPageNumber(e);
      },
      prevPage: function (e) {
        if (e) t._$stopBubble(e);
        this._viewer.prevPage();
      },
      nextPage: function (e) {
        if (e) t._$stopBubble(e);
        this._viewer.nextPage();
      },
      scaleBigger: function (e) {
        if (e) t._$stopBubble(e);
        this.data.scale += 0.2;
        this._viewer.setCurrentScale(this.data.scale);
      },
      scaleSmaller: function (e) {
        if (e) t._$stopBubble(e);
        this.data.scale -= 0.2;
        this._viewer.setCurrentScale(this.data.scale);
      },
      _showLoading: function () {
        this.data.showLoading = !0;
        this.$update();
        if (this._loadingInter) clearInterval(this._loadingInter);
        this._loadingInter = setInterval(
          function () {
            if (!this._loadingRotate) this._loadingRotate = 0;
            this._loadingRotate = this._loadingRotate >= 7 ? 0 : ++this._loadingRotate;
            var e = 'rotate(' + 45 * this._loadingRotate + 'deg)';
            var t =
              'display:block;-moz-transform:' + e + ';-o-transform:' + e + ';-ms-transform:' + e;
            if (this.$refs && this.$refs.loading && this.$refs.loading.style) {
              this.$refs.loading.style.cssText = t;
              this.$refs.loading.style.webkitTransform = e;
            }
          }._$bind(this),
          50,
        );
      },
      _hideLoading: function () {
        if (this._loadingInter) clearInterval(this._loadingInter);
        this.data.showLoading = !1;
        this.$update();
      },
      _showError: function (e, t) {
        this._hideLoading();
        this.data.showError = !0;
        this.data.errorText = c.errorTxt[e + ''] + '[code:' + e + ']';
        this.$update();
        this.$emit('error', { errorCode: e, errorMessage: c.errorTxt[e + ''] });
      },
      reload: function () {
        l.location.reload();
      },
      doFullscreen: function (e) {
        if (e) t._$stopBubble(e);
        if (!this.data.notAllowFullScreen)
          if (this.data.isFullScreenMode) this._existfullScreen();
          else this._enterfullScreen();
      },
      _getfullScreenState: function () {
        if (void 0 !== document.fullscreen) return document.fullscreen;
        else if (void 0 !== document.webkitIsFullScreen) return document.webkitIsFullScreen;
        else if (void 0 !== document.mozFullScreen) return document.mozFullScreen;
        else return this._isFullScreenMode;
      },
      _enterfullScreen: function () {
        this.data.isFullScreenMode = !0;
        this.$update();
        if (!this._hasBindFullscreenchange) {
          document.onfullscreenchange = this._onfullScreenChange.bind(this);
          document.onwebkitfullscreenchange = this._onfullScreenChange.bind(this);
          document.onmozfullscreenchange = this._onfullScreenChange.bind(this);
          this._hasBindFullscreenchange = !0;
        }
        if (n._$isFunction(this._rootNode.requestFullScreen)) this._rootNode.requestFullScreen();
        else if (n._$isFunction(this._rootNode.webkitRequestFullScreen))
          this._rootNode.webkitRequestFullScreen();
        else if (n._$isFunction(this._rootNode.mozRequestFullScreen))
          this._rootNode.mozRequestFullScreen();
        else this._enterfullWindow();
      },
      _existfullScreen: function () {
        this.data.isFullScreenMode = !1;
        this.$update();
        if (n._$isFunction(document.exitFullscreen)) document.exitFullscreen();
        else if (n._$isFunction(document.webkitCancelFullScreen)) document.webkitCancelFullScreen();
        else if (n._$isFunction(document.mozCancelFullScreen)) document.mozCancelFullScreen();
        else this._existfullWindow();
      },
      _enterfullWindow: function () {
        t._$addEvent(document, 'keydown', this._fullWindowOnEscKey.bind(this));
        e._$addClassName(document.body, 'ux-edu-h5pdf-bodyfullWindow');
        e._$addClassName(this._rootNode, 'ux-edu-h5pdf-fullWindow');
      },
      _existfullWindow: function () {
        t._$delEvent(document, 'keydown', this._fullWindowOnEscKey.bind(this));
        e._$delClassName(document.body, 'ux-edu-h5pdf-bodyfullWindow');
        e._$delClassName(this._rootNode, 'ux-edu-h5pdf-fullWindow');
      },
      _onfullScreenChange: function (e) {
        this.data.isFullScreenMode = this._getfullScreenState();
        this.$update();
      },
      _fullWindowOnEscKey: function (e) {
        e = document.all ? window.event : e;
        if (27 === (e.keyCode || e.which))
          if (1 == this.data.isFullScreenMode) this._existfullScreen();
      },
      destroy: function () {
        this._viewer && this._viewer.destroy();
        this.supr();
      },
    });
    return f;
  },
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  '9a830f6a308feb17fe43372af2d6e799',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  '64c1ccae8de58fecf6d0475407fc5551',
  '06bf5c992404120aa89a086dd93a60aa',
  '0ae40beefbe61a7436a36d54d2e96075',
  'f051aeae7bb889518ead30ef6e491df3',
);
