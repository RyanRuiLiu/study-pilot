EDU(
  'f3ed5a709f05344e3fa424e5db7ef2b4',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f) {
    var h = t.C();
    h.NAME = 'mainVideoComponent';
    var p = h.extend(a);
    p._init = function (e, t) {
      this.__super(e, t);
      this._bodyNode = o._$getByClassName(this._rootNode, 'j-mainVideo')[0];
      return this;
    };
    p._getTpl = function () {
      return e;
    };
    p.listNotificationInterests = function () {
      return [
        s.MOVIEDATA_NEW,
        s.MOVIEDATA_READY,
        s.MOVIEDATA_CURRENT_ITEM_CHANGE,
        s.MOVIEDATA_CURRENT_CDN_CHANGE,
        s.VIEW_LOAD,
        s.VIEW_RELOAD,
        s.VIEW_PLAY,
        s.VIEW_PAUSE,
        s.VIEW_SEEK,
        s.VIEW_SEEK_FORWARD,
        s.VIEW_SEEK_BACKWARD,
        s.VIEW_VOLUME,
        s.VIEW_VOLUME_INCREASE,
        s.VIEW_VOLUME_DECREASE,
        s.VIEW_MUTE,
        s.VIEW_RATE,
        s.VIEW_CDN,
      ];
    };
    p.handleNotification = function (e) {
      this.__super(e);
      switch (e.getName()) {
        case s.MOVIEDATA_NEW:
          this._handleMoviedataNew(e.getBody());
          break;
        case s.MOVIEDATA_READY:
          this._handleMoviedataReady(e.getBody());
          break;
        case s.MOVIEDATA_CURRENT_ITEM_CHANGE:
          this._handleMoviedataCurrentItemChange(e.getBody());
          break;
        case s.MOVIEDATA_CURRENT_CDN_CHANGE:
          this._handleMoviedataCurrentCdnChange(e.getBody());
          break;
        case s.VIEW_LOAD:
          this._handleViewLoad(e.getBody());
          break;
        case s.VIEW_RELOAD:
          this._handleViewReLoad(e.getBody());
          break;
        case s.VIEW_PLAY:
          this._handleViewPlay(e.getBody());
          break;
        case s.VIEW_PAUSE:
          this._handleViewPause(e.getBody());
          break;
        case s.VIEW_SEEK:
          this._handleViewSeek(e.getBody());
          break;
        case s.VIEW_SEEK_FORWARD:
          this._handleViewSeekForward(e.getBody());
          break;
        case s.VIEW_SEEK_BACKWARD:
          this._handleViewSeekBackward(e.getBody());
          break;
        case s.VIEW_VOLUME:
          this._handleViewVolume(e.getBody());
          break;
        case s.VIEW_VOLUME_INCREASE:
          this._handleViewVolumeIncrease(e.getBody());
          break;
        case s.VIEW_VOLUME_DECREASE:
          this._handleViewVolumeDecrease(e.getBody());
          break;
        case s.VIEW_MUTE:
          this._handleViewMute(e.getBody());
          break;
        case s.VIEW_RATE:
          this._handleViewRate(e.getBody());
      }
    };
    p.createMediaIns = function (e) {
      var t = {};
      t[d.MEDIA_STATE] = this._mediaStateEventHandler._$bind(this);
      n._$forIn(
        c,
        function (e, n) {
          t[e] = this._mediaEventHandler._$bind(this);
        }._$bind(this),
        this,
      );
      r(this._bodyNode, this._movieData, this._config, t, e);
    };
    p._mediaStateEventHandler = function (e) {
      this.sendNotification(s.MAINVIDEO_STATE, e.data);
    };
    p._mediaEventHandler = function (e) {
      switch (e.type) {
        case c.MEDIA_VIDEO_READY:
          this.sendNotification(s.MAINVIDEO_VIDEO_READY, e.data);
          break;
        case c.MEDIA_BEFORE_LOAD:
          this.sendNotification(s.MAINVIDEO_BEFORE_LOAD, e.data);
          break;
        case c.MEDIA_START_LOAD:
          this.sendNotification(s.MAINVIDEO_START_LOAD, e.data);
          break;
        case c.MEDIA_META:
          this.sendNotification(s.MAINVIDEO_META, e.data);
          break;
        case c.MEDIA_BEFORE_PLAY:
          this.sendNotification(s.MAINVIDEO_BEFORE_PLAY, e.data);
          break;
        case c.MEDIA_QUALITY_CHANGE:
          this.sendNotification(s.MAINVIDEO_QUALITY_CHANGE, e.data);
          break;
        case c.MEDIA_RATE_CHANGE:
          this.sendNotification(s.MAINVIDEO_RATE_CHANGE, e.data);
          break;
        case c.MEDIA_BUFFER:
          this.sendNotification(s.MAINVIDEO_BUFFER, e.data);
          break;
        case c.MEDIA_BUFFER_FULL:
          this.sendNotification(s.MAINVIDEO_BUFFER_FULL, e.data);
          break;
        case c.MEDIA_TIME:
          this.sendNotification(s.MAINVIDEO_TIME, e.data);
          break;
        case c.MEDIA_ERROR:
          this.sendNotification(s.MAINVIDEO_ERROR, e.data);
          break;
        case c.MEDIA_VOLUME:
          this.sendNotification(s.MAINVIDEO_VOLUME, e.data);
          break;
        case c.MEDIA_VOLUME_INCREASE:
          this.sendNotification(s.MAINVIDEO_VOLUME_INCREASE, e.data);
          break;
        case c.MEDIA_VOLUME_DECREASE:
          this.sendNotification(s.MAINVIDEO_VOLUME_DECREASE, e.data);
          break;
        case c.MEDIA_MUTE:
          this.sendNotification(s.MAINVIDEO_MUTE, e.data);
          break;
        case c.MEDIA_SEEK:
          this.sendNotification(s.MAINVIDEO_SEEK, e.data);
          break;
        case c.MEDIA_SEEK_FORWARD:
          this.sendNotification(s.MAINVIDEO_SEEK_FORWARD, e.data);
          break;
        case c.MEDIA_SEEK_BACKWARD:
          this.sendNotification(s.MAINVIDEO_SEEK_BACKWARD, e.data);
          break;
        case c.MEDIA_TIME_UPDATE:
          this.sendNotification(s.MAINVIDEO_TIMEUPDATE, e.data);
      }
    };
    p._handleMoviedataNew = function (e) {};
    p._handleMoviedataReady = function (e) {
      this._movieData = e;
      if (this._videoMediaIns) {
        this._videoMediaIns.clear();
        this._videoMediaIns = null;
      }
      this.createMediaIns(
        function (e) {
          this._videoMediaIns = e;
          if (this._config.autoStart || this._config.isPreload)
            this._videoMediaIns.load(this._movieData);
          else this._videoMediaIns.setMovieData(this._movieData);
        }._$bind(this),
      );
    };
    p._handleMoviedataCurrentItemChange = function (e) {
      this._movieData = e;
      this._videoMediaIns.reload(this._movieData);
    };
    p._handleMoviedataCurrentCdnChange = function (e) {
      this._movieData = e;
      this._videoMediaIns.reload(this._movieData);
    };
    p._handleViewLoad = function (e) {
      if (this._movieData) this._videoMediaIns.load(this._movieData);
    };
    p._handleViewReLoad = function (e) {
      if (this._movieData) this._videoMediaIns.reload(this._movieData);
    };
    p._handleViewPlay = function (e) {
      this._videoMediaIns.play();
    };
    p._handleViewPause = function (e) {
      this._videoMediaIns.pause(e);
    };
    p._handleViewSeek = function (e) {
      this._videoMediaIns.seek(e);
    };
    p._handleViewSeekForward = function (e) {
      this._videoMediaIns.seekForward(e);
    };
    p._handleViewSeekBackward = function (e) {
      this._videoMediaIns.seekBackward(e);
    };
    p._handleViewVolume = function (e) {
      this._videoMediaIns.volume(e);
    };
    p._handleViewVolumeIncrease = function (e) {
      this._videoMediaIns.volumeIncrease(e);
    };
    p._handleViewVolumeDecrease = function (e) {
      this._videoMediaIns.volumeDecrease(e);
    };
    p._handleViewMute = function (e) {
      this._videoMediaIns.mute(e);
    };
    p._handleViewRate = function (e) {
      this._videoMediaIns.rate(e);
    };
    p.onRemove = function () {
      this.__super();
      if (this._videoMediaIns) {
        this._videoMediaIns.stop();
        this._videoMediaIns = null;
      }
    };
    p.getVideoNode = function () {
      return this._videoMediaIns.getVideoNode();
    };
    p.play = function () {
      this._videoMediaIns.play();
    };
    p.pause = function () {
      this._videoMediaIns.pause();
    };
    p.seek = function (e) {
      this._videoMediaIns.seek(e);
    };
    p.stop = function () {
      this._videoMediaIns.stop();
    };
    p.pause = function () {
      this._videoMediaIns.pause();
    };
    p.getPosition = function () {
      return this._videoMediaIns.getPosition();
    };
    p.getState = function () {
      return this._videoMediaIns.state();
    };
    p.isBlock = function () {
      return this._videoMediaIns.isBlock();
    };
    p.metaFPS = function () {
      return this._videoMediaIns.metaFPS();
    };
    p.currentFPS = function () {
      return this._videoMediaIns.currentFPS();
    };
    p.currentKbps = function () {
      return this._videoMediaIns.currentKbps();
    };
    return h;
  },
  '0f606e4bc483019538baf3f92b54f647',
  'f6ea82878bd7d6947ad4b01eb6b35583',
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '39bdd394372a73feca94b5b3f04c5ad7',
  'eaef9fb823c61ea62ff68b2908814ac8',
  'bf51392f0d61f79621004c6cf9b27b9f',
  '08622373b135f6f5d332b3d98d0782c9',
  'd179f49516aae67e50a0eac61529d79c',
);
