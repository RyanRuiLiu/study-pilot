EDU(
  'eb38dfb19c29fff2d7ed7e478819143e',
  function (e, t) {
    var n = function () {
      this.init.call(this, arguments[0]);
    };
    var i = n.prototype;
    i.init = function (e) {
      this._picData = e;
      this._picLoaded = {};
      this._basePageInfo = null;
      this._baseThumbnailPageInfo = null;
      this.numPages = e.pageCount;
    };
    i.getPage = function (t) {
      if (this._basePageInfo) return e.resolve(this._getReturnPage(t, this._basePageInfo.baseImg));
      else {
        var n = this._getPagePicUrl(t);
        return new e(
          function (e, i) {
            this._loadPic(
              n,
              function () {},
              function (i) {
                this._picLoaded[n] = !0;
                var o = this._getReturnPage(t, i);
                this._basePageInfo = o;
                e(o);
              }._$bind(this),
              function (e) {
                i(e);
              }._$bind(this),
            );
          }._$bind(this),
        );
      }
    };
    i.getThumbnailPage = function (t) {
      if (this._baseThumbnailPageInfo)
        return e.resolve(this._getReturnPage(t, this._baseThumbnailPageInfo.baseImg, !0));
      else {
        var n = this._getPagePicUrl(t, { thumbnail: !0 });
        return new e(
          function (e, i) {
            this._loadPic(
              n,
              function () {},
              function (i) {
                this._picLoaded[n] = !0;
                var o = this._getReturnPage(t, i, !0);
                this._baseThumbnailPageInfo = o;
                e(o);
              }._$bind(this),
              function (e) {
                i(e);
              }._$bind(this),
            );
          }._$bind(this),
        );
      }
    };
    i.downloadPage = function (t) {
      if (this._picLoaded[t]) return e.resolve(t);
      else
        return new e(
          function (e, n) {
            this._loadPic(
              t,
              function () {},
              function (n) {
                this._picLoaded[t] = !0;
                e(t);
              }._$bind(this),
              function (e) {
                n(e);
              }._$bind(this),
            );
          }._$bind(this),
        );
    };
    i._getPagePicUrl = function (e, n) {
      n = n || {};
      var i =
        this._picData.picPrefix + e + '.' + this._picData.picSuffix + '?da=' + this._picData.dAuth;
      if (n.thumbnail) i = this._picData.smallPicPrefix + e + '.' + this._picData.picSuffix;
      return t._$scaleImage(i, n.width, n.height);
    };
    i._getReturnPage = function (e, t, n) {
      var i = this;
      return {
        pageNum: e,
        baseImg: t,
        url: null,
        isThumbnail: n,
        getViewport: function (e, t) {
          e = e || 1;
          return {
            width: this.baseImg.width * e,
            height: this.baseImg.height * e,
            rotation: t ? t : 0,
          };
        },
        cleanup: function () {
          delete this.baseImg;
          if (this.url) i._picLoaded[this.url] = null;
        },
        render: function (e) {
          this.params = e || {};
          this.params.thumbnail = !!this.isThumbnail;
          this.url = i._getPagePicUrl(this.pageNum, this.params);
          return i.downloadPage(this.url);
        },
      };
    };
    i.destroy = function () {
      this._picData = null;
      this._picLoaded = null;
      this._basePageInfo = null;
    };
    i._loadPic = (function () {
      var e = [],
        t = null,
        n = function () {
          var t = 0;
          for (; t < e.length; t++) e[t].end ? e.splice(t--, 1) : e[t]();
          !e.length && i();
        },
        i = function () {
          clearInterval(t);
          t = null;
        };
      return function (i, o, a, s) {
        var r,
          c,
          d,
          l,
          _,
          u = new Image();
        u.src = i;
        if (!u.complete) {
          c = -1;
          d = -1;
          u.onerror = function (e) {
            s && s(e);
            r.end = !0;
            u = u.onload = u.onerror = null;
          };
          r = function () {
            l = u.width;
            _ = u.height;
            if (l !== c || _ !== d) {
              o(u);
              r.end = !0;
            }
          };
          r();
          u.onload = function () {
            !r.end && r();
            a && a(u);
            u = u.onload = u.onerror = null;
          };
          if (!r.end) {
            e.push(r);
            if (null === t) t = setInterval(n, 40);
          }
        } else {
          o(u);
          a && a(u);
        }
      };
    })();
    return n;
  },
  'acaf016265ee9e46872cbbb2398ea4b7',
  'ea321df1a66d5a1d11c5df37a56589c4',
);
