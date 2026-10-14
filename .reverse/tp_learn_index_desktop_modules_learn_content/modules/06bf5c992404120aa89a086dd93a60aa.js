EDU(
  '06bf5c992404120aa89a086dd93a60aa',
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
      this._setDocument(new a(e), t);
    };
    return s;
  },
  '04114f69dda271a25460e2c2080630c8',
  '52d3d71916301eac2362f321943cb736',
  'b8a080e680aec6214d4fc7f460f56254',
  '4f6ee3a19a77f970026bfa623db7def7',
  '0ae40beefbe61a7436a36d54d2e96075',
  'eb38dfb19c29fff2d7ed7e478819143e',
);
