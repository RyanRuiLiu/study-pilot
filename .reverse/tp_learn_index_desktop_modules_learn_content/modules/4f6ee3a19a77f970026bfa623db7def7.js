EDU(
  '4f6ee3a19a77f970026bfa623db7def7',
  function (e, t, n, i, o, a) {
    var s = e.C();
    var r = s.extend(t);
    r._init = function (e) {
      this.__super(e);
    };
    r.setDocument = function (e, t) {
      this.__super(e, t);
      if (this._isNodeReady) {
        if (!t || t <= 0 || t > e.numPages) t = 1;
        this._document
          .getThumbnailPage(1)
          .then(
            function (n) {
              this._defaultViewport = n.getViewport(1);
              var i = this._getThumbnailPicSize(this._defaultViewport);
              this._initScaleValue = i.scale;
              this._genThumbnails(e.numPages);
              this._slideToThumb(t);
            }._$bind(this),
          )
          ['catch'](
            function () {
              console.error('pic document getThumbnailPage fail');
            }._$bind(this),
          );
      }
    };
    r._getThumbnailPicSize = function (e) {
      var t = e.width / e.height;
      var n = o.THUMBNAIL_WIDTH / o.THUMBNAIL_HEIGHT;
      var i, a, s;
      if (t > n) {
        i = o.THUMBNAIL_WIDTH;
        a = Math.round(i / t);
      } else {
        a = o.THUMBNAIL_HEIGHT;
        i = Math.round(a * t);
      }
      s = i / e.width;
      return { width: i, height: a, scale: s };
    };
    r._genThumbnail = function (e, t) {
      return new n({
        container: e,
        id: t,
        scale: this._initScaleValue,
        defaultViewport: this._defaultViewport,
        onThumbClick: this._onThumbClick._$bind(this),
      });
    };
    r._ensurePageLoaded = function (e) {
      if (e.page) return a.resolve(e.page);
      var t = e.id;
      if (this._pagesRequests[t]) return this._pagesRequests[t];
      var n = this._document
        .getThumbnailPage(t)
        .then(
          function (n) {
            if (!e.page) e.setPage(n);
            this._pagesRequests[t] = null;
            return n;
          }._$bind(this),
        )
        ['catch'](
          function (e) {
            console.error('Unable to get page for thumb view', e);
            this._pagesRequests[t] = null;
          }._$bind(this),
        );
      this._pagesRequests[t] = n;
      return n;
    };
    r._renderPage = function (e) {
      var t = this;
      switch (e.renderingState) {
        case i.FINISHED:
          return;
        case i.RUNNING:
          break;
        case i.INITIAL:
          e.draw().then(
            function () {
              t._continueRender();
            },
            function (e) {
              t._continueRender();
              console.error('pdf thumb page draw error:' + e);
            },
          );
      }
    };
    r._continueRender = function () {
      this._forceRendering();
    };
    return s;
  },
  '04114f69dda271a25460e2c2080630c8',
  'e2585f9b03f9ebe40fef9dd6b2fdd434',
  'ace54cbf8138d8966d0eb9bdc81de612',
  'c713e1ea371d7be585e8229c82c025f6',
  '6c55c98e8114721018ba02bb36e9a7da',
  'acaf016265ee9e46872cbbb2398ea4b7',
);
