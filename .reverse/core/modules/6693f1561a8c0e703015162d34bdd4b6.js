EDU(
  '6693f1561a8c0e703015162d34bdd4b6',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f) {
    var h = e.C();
    h.NAME = 'movieData';
    var p = h.extend(t);
    p._init = function (e, t) {
      this.__super(e, t);
      this.posterUrl = null;
      this.start = 0;
      this.duration = 0;
      this.videoId = null;
      this.defaultQuality = this._config.defaultQuality || i.VIDEO_QUALITY.SD;
      this.movieItemList = null;
      this.currentMovieItem = null;
      this.cluPointList = null;
      this.segmentListData = null;
      this.captionData = null;
      this.adUrl = null;
      this.cdnSwitchData = null;
      this.cdnSwitch = '';
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
    p.checkCanPlayEncryptMedia = function (e) {
      if (!e.isEncrypt) return null;
      if (e.isEncrypt)
        if (e.m3u8SdUrl) return 'hls';
        else return 'notSupport';
    };
    p.setData = function (e) {
      this.sendNotification(n.MOVIEDATA_NEW, e);
      if (e.videos && (!e.videos || e.videos.length)) {
        this.adUrl = e.adUrl;
        this.posterUrl = e.videoImgUrl;
        this.start = e.start || 0;
        this.videoId = e.videoId;
        this.duration = e.duration;
        if (void 0 !== e.isLast) this.isLast = e.isLast;
        else this.isLast = !0;
        this.liveTitle = e.liveTitle;
        this.liveStartTime = e.liveStartTime;
        this.liveEndTime = e.liveEndTime;
        this._createMovieItem(e);
        this._initCaption(e);
        this.cluPointList = e.cluPointData;
        this.segmentListData = e.segmentListData;
        if (this._config.showCdnSwitch && e.cdnPoints) {
          this.cdnSwitch = e.cdnSwitch;
          this.cdnSwitchData = e.cdnPoints;
          if (this.cdnSwitchData.length)
            this.cdnSwitchData.unshift({ ip: '', isp: 'default', ispName: d.KEY_VIDEO_DEAFULT });
          this._changeCDN(this.cdnSwitch);
        }
        this.originVideoData = e;
        this.sendNotification(n.MOVIEDATA_READY, this);
      } else this.sendNotification(n.MOVIEDATA_ERROR, i.ERROR_CODE.VIDEO_DATA_ERROR_NO_URL);
    };
    p._createMovieItem = function (e) {
      function t(e) {
        if (!e) return '';
        else return e.replace(/^(http:|https:)/, window.location.protocol);
      }
      this.movieItemList = [];
      this.currentMovieItem = null;
      var o = e.videos,
        a;
      for (var r = 0; r < o.length; r++) {
        a = o[r];
        if (a.videoUrl) {
          var s = this._getMediaType(a);
          if (a.e && 'hls' == s)
            try {
              a = window.formatM3u8EncryptUrl(a);
            } catch (c) {
              this.sendNotification(n.MOVIEDATA_ERROR, i.ERROR_CODE.MEDIA_ERROR_M3U8_DECRYPT_ERROR);
              return;
            }
          this.movieItemList.push({
            quality: a.quality,
            qualityName: this._getQualityName(a.quality),
            urls: [t(a.videoUrl)],
            fileType: s,
            encrypt: a.e,
            secondaryEncrypt: a.secondaryEncrypt,
          });
        }
      }
      for (r = 0; r < this.movieItemList.length; r++)
        if (this.movieItemList[r].quality == this.defaultQuality)
          this.currentMovieItem = this.movieItemList[r];
      this.currentMovieItem = this.currentMovieItem || this.movieItemList[0];
    };
    p._getQualityName = function (e) {
      return i.VIDEO_QUALITY_NAME[e + ''] || d.KEY_VIDEO_UNKNOW;
    };
    p._getMediaType = function (e) {
      if (e.format) return e.format;
      else return c.getMediaType(e.videoUrl);
    };
    p._initCaption = function (e) {
      this.captionData = {};
      var t = e.srtCaptions || e.mp4Caption;
      if (t && t.length > 0) this.captionData.hasCaption = !0;
      else this.captionData.hasCaption = !1;
      if (this.captionData.hasCaption) {
        this.captionData.data = [];
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          this.captionData.data.push({
            name: i.name,
            index: i.index,
            url: r._$changeUrlProtocol(i.url),
            lang: i.name == d.KEY_VIDEO_CHINESE ? 'cn' : 'en',
            isSelect: !0,
          });
        }
      }
    };
    p._handleViewChangeQuality = function (e) {
      if (e.newData) {
        for (var t = 0; t < this.movieItemList.length; t++)
          if (this.movieItemList[t].quality == e.newData.quality) {
            this.currentMovieItem = this.movieItemList[t];
            break;
          }
        this.sendNotification(n.MOVIEDATA_CURRENT_ITEM_CHANGE, this);
      }
    };
    p._changeCDN = function (e) {
      if (this.cdnSwitchData) {
        var t = '';
        for (var n = 0; n < this.cdnSwitchData.length; n++)
          if (e == this.cdnSwitchData[n].isp) t = this.cdnSwitchData[n].ip;
        for (var i = 0; i < this.movieItemList.length; i++)
          for (var o = 0; o < this.movieItemList[i].urls.length; o++) {
            var a = this.movieItemList[i].urls[o];
            if (a) {
              var r = window.location.protocol + '//';
              if (/^https?:\/\/[\d\\.]+?\//.test(a))
                a = a.replace(/^https?:\/\/[\d\\.]+?\//, function () {
                  return r + (t ? t + '/' : '');
                });
              else
                a = a.replace(/^https?:\/\//, function () {
                  return r + (t ? t + '/' : '');
                });
              this.movieItemList[i].urls[o] = a;
            } else;
          }
      }
    };
    p._handleViewChangeCDN = function (e) {
      this._changeCDN(e.newData.isp);
      this.cdnSwitch = e;
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
