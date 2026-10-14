EDU(
  '044e08db51d3c94f056a9988048f84ca',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f, h, p) {
    var m = t.C();
    m.NAME = 'preAdComponent';
    var g = m.extend(n);
    g._init = function (e, t) {
      this.__super(e, t);
      this._bodyNode = i._$getByClassName(this._rootNode, 'j-pread')[0];
      this._cover = i._$getByClassName(this._rootNode, 'j-pread-cover')[0];
      return this;
    };
    g._getTpl = function () {
      return e;
    };
    g.listNotificationInterests = function () {
      return [
        a.MOVIEDATA_READY,
        a.MAINVIDEO_BEFORE_LOAD,
        a.MAINVIDEO_BEFORE_PLAY,
        a.VIEW_VOLUME,
        a.VIEW_VOLUME_INCREASE,
        a.VIEW_VOLUME_DECREASE,
        a.VIEW_MUTE,
      ];
    };
    g.handleNotification = function (e) {
      this.__super(e);
      switch (e.getName()) {
        case a.MOVIEDATA_READY:
          this._handleMoviedataReady(e.getBody());
          break;
        case a.MAINVIDEO_BEFORE_PLAY:
          this._handleBeforeLoad(e.getBody());
          break;
        case a.VIEW_VOLUME:
          this._handleViewVolume(e.getBody());
          break;
        case a.VIEW_VOLUME_INCREASE:
          this._handleViewVolumeIncrease(e.getBody());
          break;
        case a.VIEW_VOLUME_DECREASE:
          this._handleViewVolumeDecrease(e.getBody());
          break;
        case a.VIEW_MUTE:
          this._handleViewMute(e.getBody());
      }
    };
    g.createMediaIns = function (e) {
      var t = {};
      t[l.MEDIA_STATE] = this._mediaStateEventHandler._$bind(this);
      t[d.MEDIA_META] = this._mediaEventHandler._$bind(this);
      t[d.MEDIA_ERROR] = this._mediaEventHandler._$bind(this);
      t[d.MEDIA_VOLUME] = this._mediaEventHandler._$bind(this);
      t[d.MEDIA_VOLUME_INCREASE] = this._mediaEventHandler._$bind(this);
      t[d.MEDIA_VOLUME_DECREASE] = this._mediaEventHandler._$bind(this);
      t[d.MEDIA_MUTE] = this._mediaEventHandler._$bind(this);
      var n = [{ fileType: u.getMediaType(this._preAdMovieUrl), urls: [this._preAdMovieUrl] }];
      this._movieData = { movieItemList: n, currentMovieItem: n[0] };
      c(
        this._bodyNode,
        this._movieData,
        {
          autoStart: !0,
          isPreload: !1,
          beforeLoad: !1,
          beforePlay: !1,
          volume: this._config.volume,
          mute: this._config.mute,
          x5Fullscreen: this._config.x5Fullscreen,
        },
        t,
        e,
      );
    };
    g._handleMoviedataReady = function (e) {
      this._preAdMovieUrl = e.adUrl;
      if (this._preAdMovieUrl && this._config.beforePlay)
        this.createMediaIns(
          function (e) {
            this._videoMediaIns = e;
          }._$bind(this),
        );
    };
    g._handleBeforeLoad = function (e) {
      if (this._preAdMovieUrl && !s._$isMobileAll()) this._playPreAdStart();
      else this._playPreAdComplete();
    };
    g._handleViewVolume = function (e) {
      this._videoMediaIns && this._videoMediaIns.volume(e);
    };
    g._handleViewVolumeIncrease = function (e) {
      this._videoMediaIns && this._videoMediaIns.volumeIncrease(e);
    };
    g._handleViewVolumeDecrease = function (e) {
      this._videoMediaIns && this._videoMediaIns.volumeDecrease(e);
    };
    g._handleViewMute = function (e) {
      this._videoMediaIns && this._videoMediaIns.mute(e);
    };
    g._mediaStateEventHandler = function (e) {
      if (e.data.newState == r.MEDIA_STATE.COMPLETE) this._playPreAdComplete();
    };
    g._mediaEventHandler = function (e) {
      switch (e.type) {
        case d.MEDIA_META:
          this._handleMovieMeta(e.data);
          break;
        case d.MEDIA_ERROR:
          this._playPreAdComplete(e.data);
          break;
        case d.MEDIA_VOLUME:
          this.sendNotification(a.MAINVIDEO_VOLUME, e.data);
          break;
        case d.MEDIA_VOLUME_INCREASE:
          this.sendNotification(a.MAINVIDEO_VOLUME_INCREASE, e.data);
          break;
        case d.MEDIA_VOLUME_DECREASE:
          this.sendNotification(a.MAINVIDEO_VOLUME_DECREASE, e.data);
      }
    };
    g._handleMovieMeta = function (e) {
      if (e.duration && e.duration >= 0) this._adduration = e.duration;
      else this._adduration = 5;
      if (this._jumpTimeout) clearTimeout(this._jumpTimeout);
      this._jumpTimeout = setTimeout(this._playPreAdComplete._$bind(this), 1e3 * this._adduration);
    };
    g._playPreAdStart = function () {
      i._$addClassName(this._cover, 'z-show');
      this.sendNotification(a.VIEW_PAUSE);
      this.sendNotification(a.VIEW_PREAD_START);
      this._bodyNode.style.display = 'block';
      this._videoMediaIns.load(this._movieData);
      if (this._jumpTimeout) clearTimeout(this._jumpTimeout);
      this._jumpTimeout = setTimeout(this._playPreAdComplete._$bind(this), 1e4);
    };
    g._playPreAdComplete = function () {
      i._$delClassName(this._cover, 'z-show');
      if (this._jumpTimeout) clearTimeout(this._jumpTimeout);
      if (this._videoMediaIns) {
        this._videoMediaIns.stop();
        this._videoMediaIns = null;
      }
      this._bodyNode.style.display = 'none';
      this.sendNotification(a.VIEW_PLAY);
      this.sendNotification(a.VIEW_PREAD_END);
    };
    g.onRemove = function () {
      this.__super();
      if (this._videoMediaIns) {
        this._videoMediaIns.stop();
        this._videoMediaIns = null;
      }
    };
    return m;
  },
  '6f8ddb84ed53bae6e714964f9dd4b1ef',
  'f6ea82878bd7d6947ad4b01eb6b35583',
  '39bdd394372a73feca94b5b3f04c5ad7',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'bf51392f0d61f79621004c6cf9b27b9f',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  'beec6201069596ecb83a09e5fc3eb415',
  'eaef9fb823c61ea62ff68b2908814ac8',
  '08622373b135f6f5d332b3d98d0782c9',
  'd179f49516aae67e50a0eac61529d79c',
  '5d5746ddb90ed85fcd19a9bdbdf8c50a',
);
