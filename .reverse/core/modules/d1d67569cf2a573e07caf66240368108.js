EDU(
  'd1d67569cf2a573e07caf66240368108',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f) {
    var h = e.C();
    h.NAME = 'movieData';
    var p = h.extend(t);
    p._init = function (e, t) {
      this.__super(e, t);
      this.defaultQuality = this._config.defaultQuality || i.VIDEO_QUALITY.SD;
      this.movieItemList = null;
      this.currentMovieItem = null;
      this.lines = null;
      this.currentLine = null;
      return this;
    };
    p.listNotificationInterests = function () {
      return [n.VIEW_QUALITY, n.VIEW_CDN];
    };
    p.handleNotification = function (e) {
      this.__super(e);
      switch (e.getName()) {
        case n.VIEW_QUALITY:
          this._handleViewChangeQuality(e.getBody());
          break;
        case n.VIEW_CDN:
          this._handleViewChangeCDN(e.getBody());
      }
    };
    p.setData = function (e) {
      this.sendNotification(n.MOVIEDATA_NEW, e);
      if (e.lines && (!e.lines || e.lines.length)) {
        this.liveTitle = e.liveTitle;
        this.liveStartTime = e.liveStartTime;
        this.liveEndTime = e.liveEndTime;
        this._createLines(e);
        this.originVideoData = e;
        this.sendNotification(n.MOVIEDATA_READY, this);
      } else this.sendNotification(n.MOVIEDATA_ERROR, i.ERROR_CODE.VIDEO_DATA_ERROR_NO_URL);
    };
    p._createLines = function (e) {
      this.lines = [];
      this.currentLine = null;
      var t = e.lines,
        n;
      for (var i = 0; i < t.length; i++) {
        n = t[i];
        if (void 0 !== n.type && n.ratios && n.ratios.length) {
          var o = { type: n.type, name: n.name, ratios: n.ratios };
          this.lines.push(o);
          if (e.lineSwitch && e.lineSwitch == n.type) this.currentLine = o;
        }
      }
      if (!this.currentLine) this.currentLine = this.lines[0];
      this._createMovieItem(this.currentLine);
    };
    p._createMovieItem = function (e) {
      function t(e) {
        if (!e) return '';
        else return e.replace(/^(http:|https:)/, window.location.protocol);
      }
      this.movieItemList = [];
      this.currentMovieItem = null;
      var n = e.ratios,
        i;
      for (var o = 0; o < n.length; o++) {
        i = n[o];
        if (i.url) {
          var a = this._getMediaType(i);
          this.movieItemList.push({
            quality: i.quality,
            qualityName: i.qualityName || this._getQualityName(i.quality),
            urls: [t(i.url)],
            fileType: a,
          });
        }
      }
      for (o = 0; o < this.movieItemList.length; o++)
        if (this.movieItemList[o].quality == this.defaultQuality)
          this.currentMovieItem = this.movieItemList[o];
      this.currentMovieItem = this.currentMovieItem || this.movieItemList[0];
      this.currentQuality = this.currentMovieItem.quality;
    };
    p._getQualityName = function (e) {
      return i.VIDEO_QUALITY_NAME[e + ''] || d.KEY_VIDEO_UNKNOW;
    };
    p._getMediaType = function (e) {
      if (e.format) return e.format;
      else return c.getMediaType(e.videoUrl);
    };
    p._handleViewChangeQuality = function (e) {
      if (e.newData) {
        for (var t = 0; t < this.movieItemList.length; t++)
          if (this.movieItemList[t].quality == e.newData.quality) {
            this.currentMovieItem = this.movieItemList[t];
            this.currentQuality = e.newData.quality;
            break;
          }
        this.sendNotification(n.MOVIEDATA_CURRENT_ITEM_CHANGE, this);
      }
    };
    p._changeLine = function (e) {
      if (!e || !this.currentLine || e !== this.currentLine.type)
        if (this.lines) {
          for (var t = 0; t < this.lines.length; t++)
            if (this.lines[t].type === e) {
              this.currentLine = this.lines[t];
              break;
            }
          this._createMovieItem(this.currentLine);
        }
    };
    p._handleViewChangeCDN = function (e) {
      this._changeLine(e.newData.type);
      this.sendNotification(n.MOVIEDATA_CURRENT_CDN_CHANGE, this);
    };
    return h;
  },
  'f6ea82878bd7d6947ad4b01eb6b35583',
  '39bdd394372a73feca94b5b3f04c5ad7',
  'bf51392f0d61f79621004c6cf9b27b9f',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  '8a864b627c302d7d1c56bd928b515d1b',
  'beec6201069596ecb83a09e5fc3eb415',
  'fb061c769bfc74628a81f422f590544c',
  'f7742deea4ceef0567d5c5917d8e591a',
  '5d5746ddb90ed85fcd19a9bdbdf8c50a',
  'ff1c5e9840f717fea21797b5071706db',
);
