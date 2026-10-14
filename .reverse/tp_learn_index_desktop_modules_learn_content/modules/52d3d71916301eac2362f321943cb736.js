EDU(
  '52d3d71916301eac2362f321943cb736',
  function (e) {
    var t = e.C();
    var n = t.pro;
    n._init = function (e) {
      this._viewerContainer = e.viewerNode;
      this._thumbContainer = e.thumbViewerNode;
      this._openThumbnail = e.openThumbnail;
      this._activeWaterMark = e.activeWaterMark;
      this._waterMarkContent = e.waterMarkContent;
      this._onReady = e.onReady;
      this._onPageUpdate = e.onPageUpdate;
      this._onError = e.onError;
      this._activeGrab = e.activeGrab;
      this._pagesCount = 0;
      this._viewer = this._genViewer();
      this._thumbViewer = this._genThumbnailViewer();
    };
    n._genViewer = function () {
      return null;
    };
    n._genThumbnailViewer = function () {
      if (this._openThumbnail) return null;
      else return null;
    };
    n._onPageChange = function (e) {
      this.setCurrentPageNumber(e);
    };
    n.load = function (e, t) {};
    n._setDocument = function (e, t) {
      if (e) {
        this.document = e;
        this._pagesCount = e.numPages;
        this._viewer.setDocument(this.document, t);
        this._thumbViewer && this._thumbViewer.setDocument(this.document, t);
      }
    };
    n.getPagesCount = function () {
      return this._pagesCount;
    };
    n.getCurrentPageNode = function () {
      return this._viewer.getCurrentPageNode();
    };
    n.getCurrentPageNumber = function () {
      this._viewer.getCurrentPageNumber();
    };
    n.setCurrentPageNumber = function (e) {
      this._viewer.setCurrentPageNumber(e);
      this._thumbViewer && this._thumbViewer.setCurrentPageNumber(e);
    };
    n.nextPage = function () {
      this._viewer.nextPage();
    };
    n.prevPage = function () {
      this._viewer.prevPage();
    };
    n.getCurrentScale = function () {
      return this._viewer.getCurrentScale();
    };
    n.setCurrentScale = function (e) {
      this._viewer.setCurrentScale(e);
    };
    n.destroy = function () {
      this._viewer && this._viewer.destroy();
      this._thumbViewer && this._thumbViewer.destroy();
    };
    return t;
  },
  '04114f69dda271a25460e2c2080630c8',
);
