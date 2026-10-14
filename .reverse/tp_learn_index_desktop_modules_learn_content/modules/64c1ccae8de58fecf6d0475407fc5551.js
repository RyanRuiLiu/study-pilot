EDU(
  '64c1ccae8de58fecf6d0475407fc5551',
  function (e, t, n, i, o, a) {
    var s = e.C();
    var r = s.extend(t);
    r._init = function (e) {
      this.__super(e);
    };
    r._genViewer = function () {
      return new n({
        container: this._viewerContainer,
        onReady: this._onReady,
        onPageUpdate: this._onPageUpdate,
        onError: this._onError,
        activeGrab: this._activeGrab,
        activeWaterMark: this._activeWaterMark,
        waterMarkContent: this._waterMarkContent,
      });
    };
    r._genThumbnailViewer = function () {
      if (this._openThumbnail)
        return new i({
          container: this._thumbContainer,
          onPageChange: this._onPageChange._$bind(this),
        });
      else return null;
    };
    r.load = function (e, t) {
      if (a._$isMobileAll()) this.loadByXhr(e, t);
      else this.loadByPdfjs(e, t);
    };
    r.loadByXhr = function (e, t) {
      if (e) {
        var n = new XMLHttpRequest();
        n.open('GET', e, !0);
        n.responseType = 'arraybuffer';
        var i = function (e) {
          var n = PDFJS.getDocument(e)
            .then(
              function (e) {
                this._setDocument(e, t || 1);
              }._$bind(this),
            )
            ['catch'](
              function (e) {
                console && console.error(e && e.message);
                this._onError &&
                  this._onError(
                    o.errorCode.LOAD_PDF_ERROR,
                    o.errorTxt[o.errorCode.LOAD_PDF_ERROR + ''],
                  );
              }._$bind(this),
            );
        }._$bind(this);
        n.onreadystatechange = function () {
          if (4 == n.readyState) {
            var e = n.status;
            if (e >= 200 && e < 300) i(new Uint8Array(n.response));
            else
              this._onError &&
                this._onError(
                  o.errorCode.LOAD_PDF_ERROR,
                  o.errorTxt[o.errorCode.LOAD_PDF_ERROR + ''],
                );
            n = null;
          }
        }._$bind(this);
        n.send(null);
      }
    };
    r.loadByPdfjs = function (e, t) {
      if (e)
        var n = PDFJS.getDocument({ url: e, withCredentials: !1 })
          .then(
            function (e) {
              this._setDocument(e, t || 1);
            }._$bind(this),
          )
          ['catch'](
            function (e) {
              console && console.error(e && e.message);
              this._onError &&
                this._onError(
                  o.errorCode.LOAD_PDF_ERROR,
                  o.errorTxt[o.errorCode.LOAD_PDF_ERROR + ''],
                );
            }._$bind(this),
          );
    };
    return s;
  },
  '04114f69dda271a25460e2c2080630c8',
  '52d3d71916301eac2362f321943cb736',
  '86267b0a351fbf3dc9c26799ec16c180',
  'bfb9f9ce3f7c1168b4f7f00e799858d0',
  '0ae40beefbe61a7436a36d54d2e96075',
  'beec6201069596ecb83a09e5fc3eb415',
);
