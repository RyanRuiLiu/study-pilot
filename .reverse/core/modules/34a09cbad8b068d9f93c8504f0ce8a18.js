EDU(
  '34a09cbad8b068d9f93c8504f0ce8a18',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f) {
    var h = o.C();
    h.NAME = 'logComponent';
    var p = h.extend(a);
    p._init = function (e, t) {
      this.__super(e, t);
      this._bodyNode = n._$getByClassName(this._rootNode, 'j-log')[0];
      this._contentNode = n._$getByClassName(this._bodyNode, 'j-content')[0];
      this._closeNode = n._$getByClassName(this._bodyNode, 'j-close')[0];
      i._$addEvent(this._closeNode, 'click', this._hideLog._$bind(this));
    };
    p._getTpl = function () {
      return e;
    };
    p.listNotificationInterests = function () {
      return [
        r.LOG,
        r.MAINVIDEO_START_LOAD,
        r.MAINVIDEO_STATE,
        r.MAINVIDEO_META,
        r.VIEW_PLAY,
        r.VIEW_PAUSE,
        r.MAINVIDEO_ERROR,
        r.VIEW_SHOW_LOG,
      ];
    };
    p.handleNotification = function (e) {
      this.__super(e);
      switch (e.getName()) {
        case r.LOG:
          this._handleCustomLog(e.getBody());
          break;
        case r.MAINVIDEO_START_LOAD:
          this._handleVideoStartLoad(e.getBody());
          break;
        case r.MAINVIDEO_STATE:
          this._handleVideoState(e.getBody());
          break;
        case r.MAINVIDEO_META:
          this._handleVideoMeta(e.getBody());
          break;
        case r.VIEW_PLAY:
          this._handleViewClickPlay(e.getBody());
          break;
        case r.VIEW_PAUSE:
          this._handleViewClickPause(e.getBody());
          break;
        case r.MAINVIDEO_ERROR:
          this._handleVideoError(e.getBody());
          break;
        case r.VIEW_SHOW_LOG:
          this._handleShowLog(e.getBody());
      }
    };
    p._handleCustomLog = function (e) {
      this.log(e.content, e.type);
    };
    p._handleVideoStartLoad = function (e) {
      this.log(
        'onNewMovie, url:' +
          e.movieData.currentMovieItem.urls[0] +
          ', quality:' +
          e.movieData.currentMovieItem.quality,
      );
    };
    p._handleVideoState = function (e) {
      switch (e.newState) {
        case s.MEDIA_STATE.IDLE:
          this.log('onIdle');
          break;
        case s.MEDIA_STATE.PLAYING:
          this.log('onPlay');
          break;
        case s.MEDIA_STATE.COMPLETE:
          this.log('onEnd');
          break;
        case s.MEDIA_STATE.PAUSE:
          this.log('onPause');
      }
    };
    p._handleVideoMeta = function (e) {
      this.log('get video meta, duration:' + e.duration);
    };
    p._handleViewClickPlay = function (e) {};
    p._handleViewClickPause = function (e) {};
    p._handleVideoError = function (e) {
      this.log(e, 'error');
    };
    p._handleShowLog = function (e) {
      n._$addClassName(this._bodyNode, 'z-show');
      this._contentNode.innerHTML = this.getLog().replace(/\n/g, '<br>');
    };
    p._hideLog = function (e) {
      n._$delClassName(this._bodyNode, 'z-show');
    };
    p.log = function (e, t) {
      c.log(e, t);
    };
    p.error = function (e) {
      c.error(e);
    };
    p.getLog = function () {
      return c.getLog();
    };
    return h;
  },
  'ee54b9d654711e242dc31f09191de3df',
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'f6ea82878bd7d6947ad4b01eb6b35583',
  '39bdd394372a73feca94b5b3f04c5ad7',
  'bf51392f0d61f79621004c6cf9b27b9f',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  'fb7ea872222351a1a18d727c3cc70c47',
  'beec6201069596ecb83a09e5fc3eb415',
);
