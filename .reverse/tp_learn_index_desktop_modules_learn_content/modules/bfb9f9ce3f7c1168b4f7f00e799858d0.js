EDU(
  'bfb9f9ce3f7c1168b4f7f00e799858d0',
  function (e, t, n, i) {
    var o = e.C();
    var a = o.extend(t);
    a._init = function (e) {
      this.__super(e);
    };
    a.setDocument = function (e, t) {
      this.__super(e, t);
      if (this._isNodeReady) {
        if (!t || t <= 0 || t > e.numPages) t = 1;
        this._document
          .getPage(1)
          .then(
            function (n) {
              var i = n.getViewport(1);
              this._defaultViewport = i.clone();
              this._genThumbnails(e.numPages);
              this._slideToThumb(t);
            }._$bind(this),
          )
          ['catch'](
            function () {
              console.error('pdf document getThumbnailPage fail');
            }._$bind(this),
          );
      }
    };
    a._genThumbnail = function (e, t) {
      return new n({
        container: e,
        id: t,
        defaultViewport: this._defaultViewport,
        onThumbClick: this._onThumbClick._$bind(this),
      });
    };
    a._ensurePageLoaded = function (e) {
      if (e.page) return Promise.resolve(e.page);
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
            console.error('Unable to get page for thumb view', e);
            this._pagesRequests[t] = null;
          }._$bind(this),
        );
      this._pagesRequests[t] = n;
      return n;
    };
    a._renderPage = function (e) {
      var t = this;
      switch (e.renderingState) {
        case i.FINISHED:
          return;
        case i.PAUSED:
          e.resume && e.resume();
          break;
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
    a._continueRender = function () {
      this._forceRendering();
    };
    return o;
  },
  '04114f69dda271a25460e2c2080630c8',
  'e2585f9b03f9ebe40fef9dd6b2fdd434',
  '483bf8142e40c3ea54fa30040a4071eb',
  'c713e1ea371d7be585e8229c82c025f6',
);
