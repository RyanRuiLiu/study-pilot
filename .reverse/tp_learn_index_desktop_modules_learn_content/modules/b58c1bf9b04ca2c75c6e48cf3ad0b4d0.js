EDU(
  'b58c1bf9b04ca2c75c6e48cf3ad0b4d0',
  function (e, t, n, i, o, a, s, r, c) {
    var d = 1;
    var l = 2;
    var _ = 3;
    var u = 1;
    var f = 3;
    var h = window.isMobilePhone === !0 || 'true' === window.isMobilePhone ? a : s;
    var p = t.$extends({
      name: 'ux-pdf-reader',
      config: function (e) {
        n.extend(this.data, {
          isWap: i._$isMobileAll(),
          usePdf: !1,
          notAllowFullScreen: !1,
          waterMark: !1,
          waterMarkContent: '',
          disableContextMenu: !0,
          pdfReaderSwfRemoteUrl:
            (window.swfUrlMap || {}).pdfReader ||
            '//s.stu.126.net/res/swf/pdfReader.swf?46f67ec609ab49d4ccafd059daba26fe',
          pdfData: null,
        });
        this._fetchDocErrorCount = 0;
        this.supr(e);
      },
      init: function () {
        this.supr();
        if (this.data.disableContextMenu)
          this.$refs.pdfNode.addEventListener('contextmenu', function (e) {
            e.preventDefault();
          });
        this._fetchDocData();
      },
      _canUseH5Pdf: function (e) {
        var t = e.sources;
        if (1 == t.length && t[0].type == d) return !1;
        else return !0;
      },
      _genReader: function () {
        setTimeout(
          function () {
            this.$emit('get_pdf_data', this.data.pdfData);
          }._$bind(this),
          100,
        );
        var e = this._canUseH5Pdf(this.data.pdfData);
        var t = e ? 'h5' : 'flash';
        if (!this._readerUI || !this.__curReaderType || this.__curReaderType != t) {
          var n = this.__curReaderType;
          this.__curReaderType = t;
          setTimeout(
            function () {
              this.$emit('onReaderType', t);
            }._$bind(this),
            0,
          );
          if (this._readerUI && n) {
            if ('h5' == n) this._readerUI && this._readerUI.destroy();
            else if ('flash' == n) this._readerUI = o._$$PdfReader._$recycle(this._readerUI);
            this._readerUI = null;
          }
          if (e) {
            this._readerUI = new h({
              data: {
                usePdf: this.data.usePdf,
                notAllowFullScreen: this.data.notAllowFullScreen,
                waterMark: this.data.waterMark,
                waterMarkContent: this.data.waterMarkContent,
                pdfData: this.data.pdfData,
              },
            }).$inject(this.$refs.pdfNode);
            this._readerUI.$on('pageChange', this._onPageChange._$bind(this));
            this._readerUI.$on('pageCounts', this._onGetPageCounts._$bind(this));
            this._readerUI.$on('canChangeReaderType', this._onCanChangeReaderType._$bind(this));
            this._readerUI.$on('readerType', this._onReaderType._$bind(this));
            this._readerUI.$on('error', this._onError._$bind(this));
          } else {
            if (!c._$checkFlash()) {
              this._showNotSupportFlash();
              return;
            }
            this._readerUI = o._$$PdfReader._$allocate({
              parent: this.$refs.pdfNode,
              pdfReaderSwfRemoteUrl: this.data.pdfReaderSwfRemoteUrl,
              notAllowFullScreen: this.data.notAllowFullScreen,
              waterMark: this.data.waterMark,
              waterMarkContent: this.data.waterMarkContent,
              pdfData: this.data.pdfData,
            });
            this._readerUI._$addEvent('onPageChange', this._onPageChange._$bind(this));
          }
        } else this._readerUI.load(this.data.pdfData);
      },
      load: function (e) {
        if (e) {
          this.data.pdfData = e;
          this._fetchDocData();
        }
      },
      _fetchDocData: function () {
        var t = this._disposeOldPros();
        if (t)
          if (this.data.pdfData.docId && this.data.pdfData.signature) {
            var n = {
              onload: function (t) {
                if (0 == t.code) {
                  this.data.pdfData = e._$merge({}, t.result, this.data.pdfData || {});
                  if (!this.data.pdfData.textPageWhRatio && t.result.whRatio)
                    this.data.pdfData.textPageWhRatio = t.result.whRatio;
                  this._genReader();
                } else if (t.code == -2) {
                  this._onError('signature_expired');
                  this._showTip('页面已过期，请<a class="j-reload">刷新页面</a>[code:-5]');
                } else {
                  this._onError('invalid_error');
                  this._showTip('图文获取失败[code:-3]');
                }
              }._$bind(this),
              onerror: function (e) {
                this._retryFetchDoc();
              }._$bind(this),
              method: 'get',
              type: 'json',
              cookie: !0,
              data: { signature: this.data.pdfData.signature, clientType: this.data.isWap ? f : u },
            };
            r._$request('//vod.study.163.com/api/v1/doc/' + this.data.pdfData.docId + '/get', n);
          } else this._genReader();
        else console.log('no pdf data to load');
      },
      _retryFetchDoc: function () {
        if (this._fetchDocErrorCount >= 3) {
          this._onError('get_video_net_work_error');
          this._showTip('图文获取失败[code:-4]');
        } else {
          this._fetchDocErrorCount++;
          this._fetchDocData();
        }
      },
      _disposeOldPros: function () {
        var e = this.data.pdfData;
        if (e)
          if (!e.docId || !e.signature) {
            e.sources = e.sources || [];
            if (e.textUrl) e.sources.push({ type: d, url: e.textUrl, size: 0 });
            if (e.pdfUrl) e.sources.push({ type: _, url: e.pdfUrl, size: 0 });
            if (!e.sources.length) return !1;
            else {
              e.sources.sort(function (e, t) {
                return t.type - e.type;
              });
              return !0;
            }
          } else if (e.docId && e.signature) return !0;
          else return !1;
        else return !1;
      },
      _showTip: function (e) {
        this.data.showTip = !0;
        this.data.tipMsg = e;
        this.$update();
      },
      _showNotSupportFlash: function () {
        this._showTip(
          '未安装flash，点击<a target="_blank" href="https://get.adobe.com/flashplayer/">这里</a>安装。如果已经安装，请检查flash是否被浏览器拦截',
        );
      },
      changePlayerType: function (e) {
        if ('h5' == this.__curReaderType && this._readerUI) this._readerUI.changePlayerType(e);
      },
      _onPageChange: function (e) {
        this.$emit('pageChange', e);
      },
      _onGetPageCounts: function (e) {
        this.$emit('pageCounts', e);
      },
      _onCanChangeReaderType: function (e) {
        this.$emit('canChangeReaderType', e);
      },
      _onReaderType: function (e) {
        this.$emit('readerType', e);
      },
      _onError: function (e) {
        this.$emit('error', e);
      },
      destroy: function () {
        if ('h5' == this.__curReaderType) this._readerUI && this._readerUI.destroy();
        else if ('flash' == this.__curReaderType && this._readerUI)
          this._readerUI = o._$$PdfReader._$recycle(this._readerUI);
        this._readerUI = null;
        this.supr();
      },
    });
    return p;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
  'beec6201069596ecb83a09e5fc3eb415',
  'dfb69f6053ff766807b472a7b5767a2e',
  'f3c978e3c32c114b58a219233836be9b',
  '81b035387ac51d97fe5f678c9cb319fa',
  '8a864b627c302d7d1c56bd928b515d1b',
  'f2277e0b522a8d6029276ad9719038dc',
);
