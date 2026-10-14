EDU(
  'e2585f9b03f9ebe40fef9dd6b2fdd434',
  function (e, t, n, i, o, a, s) {
    t._$pushCSSText(i);
    var r = e.C();
    var c = r.pro;
    c._init = function (e) {
      this.container = e.container;
      this.onPageChange = e.onPageChange;
      t._$dumpCSSText();
      this._buildHtml();
      this._reset();
    };
    c._reset = function () {
      this._thumbnails = [];
      this._currentPageNumber = 1;
      this._pagesRequests = [];
    };
    c._buildHtml = function () {
      if (this.container) {
        this.container.appendChild(t._$html2node(n));
        this._bodyNode = t._$getByClassName(this.container, 'j-body')[0];
        this._sliderWrapNode = t._$getByClassName(this.container, 'j-sliderwrap')[0];
        this._bodyWidth = this._bodyNode.offsetWidth;
        this._bodyHeight = this._bodyNode.offsetHeight;
        this._af = o.watchResize(this._bodyNode, this._containerResizeHandler._$bind(this));
        this._bodyNode.addEventListener('scroll', this._containerScrollHandler._$bind(this));
      }
    };
    c._checkReady = function () {
      this._bodyWidth = this._bodyNode.offsetWidth;
      this._bodyHeight = this._bodyNode.offsetHeight;
      if (this._bodyWidth && this._bodyHeight) {
        this._isNodeReady = !0;
        return !0;
      }
      return !1;
    };
    c.setDocument = function (e, t) {
      if (this._checkReady()) {
        if (this._document) {
          this._cancelRendering();
          this._reset();
        }
        if (e) this._document = e;
      } else
        setTimeout(
          function () {
            this.setDocument(e, t);
          }._$bind(this),
          50,
        );
    };
    c._genThumbnails = function (e) {
      for (var n = 1; n <= e; ++n) {
        var i = document.createElement('div');
        i.className = 'slider j-slider';
        i.style.width = a.THUMBNAIL_WIDTH + 'px';
        i.style.height = a.THUMBNAIL_HEIGHT + 'px';
        this._sliderWrapNode.appendChild(i);
        var o = document.createElement('span');
        o.innerHTML = n;
        i.appendChild(o);
        var s = this._genThumbnail(i, n);
        this._thumbnails.push(s);
      }
      this._sliderNodes = t._$getByClassName(this._sliderWrapNode, 'j-slider');
      this._sliderWrapNode.style.width = e * a.THUMBNAIL_OUTWIDTH + 'px';
    };
    c._genThumbnail = function (e, t) {};
    c._onThumbClick = function (e) {
      this.onPageChange && this.onPageChange(e);
    };
    c.getPagesCount = function () {
      return this._thumbnails.length;
    };
    c.getCurrentPageNumber = function () {
      return this._currentPageNumber;
    };
    c.setCurrentPageNumber = function (e) {
      if (this._currentPageNumber != e) this._slideToThumb(e);
    };
    c.nextPage = function () {
      if (!(this._currentPageNumber >= this.getPagesCount()))
        this.setCurrentPageNumber(this._currentPageNumber + 1);
    };
    c.prevPage = function () {
      if (!(this._currentPageNumber <= 1)) this.setCurrentPageNumber(this._currentPageNumber - 1);
    };
    c._searchFirstVisibleView = function (e, t) {
      for (var n = 0; n < e.length; n++) if (e[n].offsetLeft + e[n].clientLeft <= t) return n;
      return 0;
    };
    c._getVisibleThumbs = function (e, t) {
      if (!t || !t.length) return null;
      var n = e.scrollLeft,
        i = n + e.clientWidth;
      var o = [],
        a,
        s;
      var r, c;
      var d = 0 === t.length ? 0 : this._searchFirstVisibleView(t, n);
      for (var l = d, _ = t.length; l < _; l++) {
        a = t[l];
        s = this._sliderNodes[l];
        r = s.offsetLeft + s.clientLeft;
        c = s.clientWidth;
        if (!(r + c < n || r > i)) o.push(a);
        else;
      }
      var u = o[0];
      var f = o[o.length - 1];
      return { first: u, last: f, views: o };
    };
    c._slideToThumb = function (e) {
      if (this._sliderNodes) {
        var n = e - 1;
        if (this._sliderNodes[n] && this._thumbnails[n]) {
          t._$delClassName(this._sliderNodes[this._currentPageNumber - 1], 'cur');
          this._currentPageNumber = e;
          t._$addClassName(this._sliderNodes[n], 'cur');
          this._bodyWidth = this._bodyNode.offsetWidth;
          var i = n * a.THUMBNAIL_OUTWIDTH;
          var o = this._bodyWidth / 2 - a.THUMBNAIL_OUTWIDTH / 2;
          var s = i - o;
          var r = this.getPagesCount() * a.THUMBNAIL_OUTWIDTH - this._bodyWidth;
          s = s < 0 ? 0 : s;
          s = s > r ? r : s;
          if (this._bodyNode.scrollTo)
            this._bodyNode.scrollTo({ top: 0, left: s, behavior: 'smooth' });
          else this._bodyNode.scrollLeft = s;
          this._forceRendering();
        }
      }
    };
    c._containerScrollHandler = function () {
      this._forceRendering();
    };
    c._containerResizeHandler = function () {
      this._forceRendering();
    };
    c._getHighestPriority = function (e) {
      if (!e) return null;
      var t = e.views;
      var n = t.length;
      if (0 === n) return !1;
      for (var i = 0; i < n; i++) {
        var o = t[i];
        if (!this._isViewFinished(o)) return o;
      }
    };
    c._isViewFinished = function (e) {
      return e.renderingState === s.FINISHED;
    };
    c._cancelRendering = function () {
      for (var e = 0; e < this._thumbnails.length; e++)
        if (this._thumbnails[e]) this._thumbnails[e].cancelRendering();
    };
    c._ensurePageLoaded = function (e) {};
    c._forceRendering = function () {
      var e = this._getVisibleThumbs(this._bodyNode, this._thumbnails);
      var t = this._getHighestPriority(e),
        n = this;
      if (t)
        this._ensurePageLoaded(t).then(function () {
          n._renderPage(t);
        });
    };
    c._renderPage = function (e) {};
    c.destroy = function () {
      if (this._af) {
        clearInterval(this._af);
        this._af = null;
      }
      if (this._thumbnails && this._thumbnails.length)
        for (var e = 0, t = this._thumbnails.length; e < t; e++) this._thumbnails[e].destroy();
      var n = this.container.childNodes;
      for (var e = n.length - 1; e >= 0; e--) this.container.removeChild(n[e]);
      this._thumbnails = null;
    };
    return r;
  },
  '04114f69dda271a25460e2c2080630c8',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'baf808aaf7dbe832091bb0b38c759bb0',
  'cf3c1180c76cb43acffd8e7251417a90',
  'c6ac68abc784a45c1aa600db388ebcc3',
  '6c55c98e8114721018ba02bb36e9a7da',
  'c713e1ea371d7be585e8229c82c025f6',
);
