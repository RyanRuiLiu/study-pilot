EDU(
  'a508cc68f94c8b40cb5b00c55365745f',
  function (e, t, n, i, o, a, r, s) {
    var c = e.C();
    c.NAME = 'apiComponent';
    var d = c.extend(t);
    d._init = function (e, t) {
      this.__super(e, t);
      this._initExternalFunc();
    };
    d.listNotificationInterests = function () {
      return [
        n.MAINVIDEO_START_LOAD,
        n.MAINVIDEO_STATE,
        n.MAINVIDEO_META,
        n.MAINVIDEO_ERROR,
        n.VIEW_PLAY,
        n.VIEW_PAUSE,
        n.VIEW_SEEK,
        n.MAINVIDEO_SEEK_FORWARD,
        n.MAINVIDEO_SEEK_BACKWARD,
        n.MAINVIDEO_VOLUME,
        n.MAINVIDEO_MUTE,
        n.VIEW_QUALITY,
        n.VIEW_CDN,
        n.VIEW_CAPTION_SELECT,
        n.VIEW_ANCHOR,
        n.VIEW_AI_LECTURE_NOTE,
        n.VIEW_SEGMENT,
        n.VIEW_RATE,
        n.BOX_FULLSCREEN_CHANGE,
        n.MAINVIDEO_TIMEUPDATE,
      ];
    };
    d.handleNotification = function (e) {
      this.__super(e);
      switch (e.getName()) {
        case n.MAINVIDEO_START_LOAD:
          this._handleVideoStartLoad(e.getBody());
          break;
        case n.MAINVIDEO_STATE:
          this._handleVideoState(e.getBody());
          break;
        case n.MAINVIDEO_META:
          this._handleVideoMeta(e.getBody());
          break;
        case n.MAINVIDEO_ERROR:
          this._handleVideoError(e.getBody());
          break;
        case n.VIEW_PLAY:
          this._handleViewClickPlay(e.getBody());
          break;
        case n.VIEW_PAUSE:
          this._handleViewClickPause(e.getBody());
          break;
        case n.VIEW_SEEK:
          this._handleViewSeek(e.getBody());
          break;
        case n.MAINVIDEO_SEEK_FORWARD:
        case n.MAINVIDEO_SEEK_BACKWARD:
          this._handleViewSeekWard(e.getBody());
          break;
        case n.VIEW_RATE:
          this._handleViewRateChange(e.getBody());
          break;
        case n.MAINVIDEO_VOLUME:
          this._handleViewVolume(e.getBody());
          break;
        case n.MAINVIDEO_MUTE:
          this._handleViewMute(e.getBody());
          break;
        case n.VIEW_QUALITY:
          this._handleViewQuality(e.getBody());
          break;
        case n.VIEW_CDN:
          this._handleViewCdn(e.getBody());
          break;
        case n.VIEW_CAPTION_SELECT:
          this._handleViewCaption(e.getBody());
          break;
        case n.VIEW_ANCHOR:
          this._handleViewAnchor(e.getBody());
          break;
        case n.VIEW_AI_LECTURE_NOTE:
          this._handleChangeLectureNote(e.getBody());
          break;
        case n.VIEW_SEGMENT:
          this._handleViewSegment(e.getBody());
          break;
        case n.VIEW_OPEN_ANCHOR:
          this._handleAnchorSwitch(e.getBody(), !0);
          break;
        case n.VIEW_CLOSE_ANCHOR:
          this._handleAnchorSwitch(e.getBody(), !1);
          break;
        case n.BOX_FULLSCREEN_CHANGE:
          this._handleFullscreenChange(e.getBody());
          break;
        case n.MAINVIDEO_TIMEUPDATE:
          this._handleTimeupdate(e.getBody());
      }
    };
    d._handleVideoStartLoad = function (e) {
      var t = {
        type: e.movieData.currentMovieItem.fileType,
        url: e.movieData.currentMovieItem.urls[0],
        quality: e.movieData.currentMovieItem.quality,
        encrypt: e.movieData.currentMovieItem.encrypt,
      };
      this._config.onStartLoad && this._config.onStartLoad(t);
    };
    d._handleVideoState = function (e) {
      switch (e.newState) {
        case i.MEDIA_STATE.PAUSE:
          this._config.onPause && this._config.onPause(e);
          break;
        case i.MEDIA_STATE.PLAYING:
          this._config.onPlay && this._config.onPlay(e);
          break;
        case i.MEDIA_STATE.COMPLETE:
          this._config.onPlayEnd && this._config.onPlayEnd(e);
          break;
        case i.MEDIA_STATE.BUFFERING:
          this._config.onBuffering && this._config.onBuffering(e);
      }
    };
    d._handleVideoMeta = function (e) {
      this._config.onMeta && this._config.onMeta(e);
    };
    d._handleVideoError = function (e) {
      this._config.onError && this._config.onError(e);
    };
    d._handleViewClickPlay = function (e) {
      this._config.onPlayClick && this._config.onPlayClick(e);
    };
    d._handleViewClickPause = function (e) {
      e = e || this._getComponent('mainVideoComponent').getPosition() || 0;
      this._config.onPauseClick && this._config.onPauseClick(e);
    };
    d._handleViewSeek = function (e) {
      this._config.onSeek && this._config.onSeek(e);
    };
    d._handleViewSeekWard = function (e) {
      this._config.onSeek &&
        this._config.onSeek({ oldData: e.oldData.position, newData: e.newData.position });
    };
    d._handleViewVolume = function (e) {
      this._config.onChangeVolume && this._config.onChangeVolume(e);
    };
    d._handleViewRateChange = function (e) {
      this._config.onChangeRate && this._config.onChangeRate(e);
    };
    d._handleViewMute = function (e) {
      this._config.onMute && this._config.onMute(e);
    };
    d._handleViewQuality = function (e) {
      this._config.onSelectResolution && this._config.onSelectResolution(e);
    };
    d._handleViewCdn = function (e) {
      this._config.onChangeCDN && this._config.onChangeCDN(e);
    };
    d._handleViewCaption = function (e) {
      this._config.onSelectCaption && this._config.onSelectCaption(e);
    };
    d._handleViewAnchor = function (e) {
      this._config.onAnchorPoint && this._config.onAnchorPoint(e);
    };
    d._handleChangeLectureNote = function (e) {
      this._config.onLectureNoteChange && this._config.onLectureNoteChange(e);
    };
    d._handleViewSegment = function (e) {
      this._config.onShowSegmentList && this._config.onShowSegmentList(e);
    };
    d._handleAnchorSwitch = function (e, t) {
      this._config.onSwitchAnchor && this._config.onSwitchAnchor(e, t);
    };
    d._handleFullscreenChange = function (e) {
      this._config.onFullscreenChange && this._config.onFullscreenChange(e);
    };
    d._handleTimeupdate = function (e) {
      this._config.onTimeupdate && this._config.onTimeupdate(e);
    };
    d._getComponent = function (e) {
      return this._container.retrieveComponent(e);
    };
    d._initExternalFunc = function () {
      this._player.load = function (e) {
        this._getComponent('movieData').setData(e);
      }._$bind(this);
      this._player.stop = function () {
        this._getComponent('mainVideoComponent').stop();
      }._$bind(this);
      this._player.resume = function () {
        this._getComponent('mainVideoComponent').play();
      }._$bind(this);
      this._player.pause = function () {
        this._getComponent('mainVideoComponent').pause();
      }._$bind(this);
      this._player.getPosition = function () {
        return this._getComponent('mainVideoComponent').getPosition() || 0;
      }._$bind(this);
      this._player.seek = function (e) {
        this._getComponent('mainVideoComponent').seek(e);
      }._$bind(this);
      this._player.getState = function () {
        return this._getComponent('mainVideoComponent').getState();
      }._$bind(this);
      this._player.getStateInfo = function () {
        var e = {};
        var t = this._getComponent('mainVideoComponent');
        var n = this._getComponent('movieData');
        e.status = t.getState();
        e.position = t.getPosition();
        e.quality = { name: n.currentMovieItem.qualityName, quality: n.currentMovieItem.quality };
        if (n.captionData && n.captionData.data && n.captionData.data.length) {
          e.caption = [];
          for (var i = 0; i < n.captionData.data.length; i++) {
            var o = n.captionData.data[i];
            e.caption.push({
              index: o.index,
              url: o.url,
              isSelect: o.isSelect,
              name: o.name,
              isDisable: !o.url,
            });
          }
        }
        return e;
      }._$bind(this);
      this._player.getLog = function () {
        return this._getComponent('logComponent').getLog();
      }._$bind(this);
      this._player.exitFullScreen = function () {
        return this._getComponent('boxComponent')._existfullScreen();
      }._$bind(this);
      this._player.getVideoNode = function () {
        return this._getComponent('mainVideoComponent').getVideoNode();
      }._$bind(this);
      this._player.isBlock = function () {
        return this._getComponent('mainVideoComponent').isBlock();
      }._$bind(this);
      this._player.metaFPS = function () {
        return this._getComponent('mainVideoComponent').metaFPS();
      }._$bind(this);
      this._player.currentFPS = function () {
        return this._getComponent('mainVideoComponent').currentFPS();
      }._$bind(this);
      this._player.currentKbps = function () {
        return this._getComponent('mainVideoComponent').currentKbps();
      }._$bind(this);
    };
    return c;
  },
  'f6ea82878bd7d6947ad4b01eb6b35583',
  '39bdd394372a73feca94b5b3f04c5ad7',
  'bf51392f0d61f79621004c6cf9b27b9f',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
);
