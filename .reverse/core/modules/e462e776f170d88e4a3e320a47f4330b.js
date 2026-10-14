EDU(
  'e462e776f170d88e4a3e320a47f4330b',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f) {
    var h = i.C();
    var p = h.pro;
    p._init = function (e, t, n) {
      this._videoParentNode = e;
      this._cfg = t;
      this._options = n;
      this._mute = this._cfg.mute;
      this._volume = this._cfg.volume;
      if (this._mute) this._volume = 0;
      this._rate = this._cfg.rate;
      this._hasDoLoad = !1;
      this._hasGetMetaData = !1;
      this._errorCount = 0;
      this._setState(s.MEDIA_STATE.IDLE);
    };
    p._doOptionFn = function (e, t) {
      this._options[e] && this._options[e]({ type: e, data: t });
    };
    p._initTech = function () {
      this._initVideoNode();
      this._initVideoNodeEvent();
      this._doOptionFn(a.MEDIA_VIDEO_READY, this._videoNode || null);
    };
    p._initVideoNode = function () {
      if (o.supportVideo()) {
        if (!this._videoNode) {
          var e = {};
          if (this._cfg.autoStart) e.autoplay = '';
          if (c._$isMobileAll()) {
            e['playsinline'] = '';
            e['webkit-playsinline'] = '';
          }
          if (c._$isWeixin() && c._$isAndroid() && this._cfg.x5Fullscreen) {
            e['x5-video-player-type'] = 'h5';
            e['x5-video-player-fullscreen'] = 'true';
          }
          if (this._cfg.useNative) e.controls = 'controls';
          this._videoNode = i.createEl('video', e);
          this._videoParentNode.appendChild(this._videoNode);
          d.log('create video node complete');
        }
      } else this._doOptionFn(a.MEDIA_ERROR, s.ERROR_CODE.MEDIA_ERROR_VIDEOTAG_NOT_SUPPORT);
    };
    p._initVideoNodeEvent = function () {
      if (this._videoNode) {
        n._$addEvent(
          this._videoNode,
          'loadstart',
          function () {
            this._doOptionFn(a.MEDIA_START_LOAD, {
              videoNode: this._videoNode,
              movieData: this._movieData,
            });
          }._$bind(this),
        );
        n._$addEvent(
          this._videoNode,
          'canplaythrough',
          function () {
            d.log('canplaythrough');
            if (!this._state == s.MEDIA_STATE.PAUSE) this._onvideoPlaying();
          }._$bind(this),
        );
        n._$addEvent(
          this._videoNode,
          'canplay',
          function () {
            d.log('canplay');
          }._$bind(this),
        );
        n._$addEvent(this._videoNode, 'loadedmetadata', this._onvideoLoadedmetadata._$bind(this));
        n._$addEvent(this._videoNode, 'ended', this._onvideoEnded._$bind(this));
        n._$addEvent(this._videoNode, 'error', this._onvideoError._$bind(this));
        n._$addEvent(this._videoNode, 'playing', this._onvideoPlaying._$bind(this));
        n._$addEvent(this._videoNode, 'progress', this._onvideoProgress._$bind(this));
        n._$addEvent(this._videoNode, 'seeked', this._onvideoSeeked._$bind(this));
        n._$addEvent(this._videoNode, 'seeking', this._onvideoSeeking._$bind(this));
        n._$addEvent(this._videoNode, 'timeupdate', this._onvideoTimeupdate._$bind(this));
        n._$addEvent(this._videoNode, 'waiting', this._onvideoWaiting._$bind(this));
        n._$addEvent(this._videoNode, 'play', this._onvideoPlaying._$bind(this));
        n._$addEvent(this._videoNode, 'pause', this._onvideoPause._$bind(this));
        if (c._$isWeixin()) {
          n._$addEvent(
            this._videoNode,
            'x5videoenterfullscreen',
            this._onx5VideoEnterFullScreen._$bind(this),
          );
          n._$addEvent(
            this._videoNode,
            'x5videoexitfullscreen',
            this._onx5VideoExitFullScreen._$bind(this),
          );
        }
      }
    };
    p.getVideoNode = function () {
      return this._videoNode || null;
    };
    p.fullscreenVideo = function () {
      if (this.canFullscreenVideo()) this._videoNode.webkitEnterFullscreen();
    };
    p.canFullscreenVideo = function () {
      return this._videoNode && i.isFunction(this._videoNode.webkitEnterFullscreen);
    };
    p.setMovieData = function (e) {
      this._movieData = e;
    };
    p.load = function (e, t) {
      d.log('load moivedata');
      this._setState(s.MEDIA_STATE.BUFFERING);
      if (!this._videoNode) this._initTech();
      this._movieData = e || this._movieData;
      this._item = this._movieData.currentMovieItem;
      d.log('current item:' + JSON.stringify(this._item));
      this._doBeforeLoad();
      this._hasGetMetaData = !1;
      this._hasAutoSeek = !1;
      this._hasDoLoad = !0;
      this._doOptionFn(a.MEDIA_QUALITY_CHANGE, this._item);
      this.volume(this._volume);
      this.rate(this._rate);
    };
    p.reload = function (e) {
      e = e || this._movieData;
      if ('live' == this._cfg.mode) e.start = 0;
      else {
        e.start = this._position || this._movieData.start || 0;
        this._reloadStart = e.start;
      }
      this._isNotFirst = !0;
      this.stop();
      this.load(e);
    };
    p._doBeforeLoad = function () {
      if (this._cfg.beforeLoad && !this._movieData.hasDoBeforeLoad) {
        this._movieData.hasDoBeforeLoad = !0;
        this._doOptionFn(a.MEDIA_BEFORE_LOAD);
      }
    };
    p._catchPlay = function () {
      if (this._videoNode) {
        var e = this._videoNode.play(),
          t = this;
        if (e && e['catch'])
          e.then(function () {
            d.log('try to play success');
          })['catch'](function (e) {
            d.error('try to play fail');
          });
      }
    };
    p.play = function () {
      if (this._hasDoLoad || !this._movieData)
        if (!this.isCompleted()) this._setState(s.MEDIA_STATE.PLAYING);
        else this.seek(0);
      else this.load(this._movieData);
    };
    p.pause = function () {
      this._setState(s.MEDIA_STATE.PAUSE);
    };
    p._seek = function (e) {
      d.log('_seek');
      if (this._canSeek())
        try {
          this._videoNode.currentTime = e;
        } catch (t) {
          d.log(t.message);
        }
    };
    p.seek = function (t) {
      d.log('seek');
      if (this._canSeek()) {
        d.log('_canSeek');
        var n = e._$isNumber(t) ? t : t.newData;
        n = !n || n < 0 ? 0 : n;
        n = n > this._duration ? 0 : n;
        var i = this._position;
        this._seek(n);
        this._catchPlay();
        this._doOptionFn(a.MEDIA_SEEK, { oldData: i, newData: n });
      }
    };
    p.seekForward = function () {
      d.log('seekForward');
      if (this._canSeek()) {
        var e =
          this._position + s.VARCONST.SEEK_STEP > this._duration
            ? this._duration
            : this._position + s.VARCONST.SEEK_STEP;
        if (this.isCompleted()) e = 0;
        this._doOptionFn(a.MEDIA_SEEK_FORWARD, {
          oldData: { position: this._position, duration: this._duration },
          newData: { position: e, duration: this._duration },
        });
        this.seek(e);
      }
    };
    p.seekBackward = function () {
      d.log('seekBackward');
      if (this._canSeek()) {
        var e =
          this._position - s.VARCONST.SEEK_STEP < 0 ? 0 : this._position - s.VARCONST.SEEK_STEP;
        this._doOptionFn(a.MEDIA_SEEK_BACKWARD, {
          oldData: { position: this._position, duration: this._duration },
          newData: { position: e, duration: this._duration },
        });
        this.seek(e);
      }
    };
    p.volume = function (e) {
      e = e > 1 ? 1 : e < 0 ? 0 : e;
      this._videoNode.volume = e;
      this._volume = e;
      if (0 == this._volume) this.mute(!0);
      else this.mute(!1);
      this._doOptionFn(a.MEDIA_VOLUME, e);
    };
    p.volumeIncrease = function () {
      var e = this._videoNode.volume;
      e = e + s.VARCONST.VOLUME_STEP > 1 ? 1 : e + s.VARCONST.VOLUME_STEP;
      this._videoNode.volume = e;
      this._volume = e;
      this._doOptionFn(a.MEDIA_VOLUME_INCREASE, e);
    };
    p.volumeDecrease = function () {
      var e = this._videoNode.volume;
      e = e - s.VARCONST.VOLUME_STEP < 0 ? 0 : e - s.VARCONST.VOLUME_STEP;
      this._videoNode.volume = e;
      this._volume = e;
      this._doOptionFn(a.MEDIA_VOLUME_DECREASE, e);
    };
    p.mute = function (e) {
      this._videoNode.muted = e;
      this._mute = e;
      this._doOptionFn(a.MEDIA_MUTE, e);
    };
    p.stop = function () {
      this.pause();
      this.clear();
      this._setState(s.MEDIA_STATE.IDLE);
    };
    p.state = function () {
      return this._state;
    };
    p.getPosition = function () {
      return this._position;
    };
    p.isCompleted = function () {
      return this._videoNode.ended;
    };
    p.rate = function (e) {
      if ('live' == this._cfg.mode) e = 1;
      else e = e || 1;
      this._videoNode.defaultPlaybackRate = e;
      this._videoNode.playbackRate = e;
      this._rate = e;
      this._doOptionFn(a.MEDIA_RATE_CHANGE, e);
    };
    p.isBlock = function () {
      this._isbLastFrameCount = this._isbLastFrameCount || 0;
      var e;
      if (this._videoNode.webkitDecodedFrameCount) {
        this._isbNowFrameCount = this._videoNode.webkitDecodedFrameCount;
        e = this._isbNowFrameCount - this._isbLastFrameCount;
        this._isbLastFrameCount = this._isbNowFrameCount;
      } else if (this._videoNode.mozDecodedFrames) {
        this._isbNowFrameCount = this._videoNode.mozDecodedFrames;
        e = this._isbNowFrameCount - this._isbLastFrameCount;
        this._isbLastFrameCount = this._isbNowFrameCount;
      }
      return void 0 != e && e <= 10;
    };
    p.metaFPS = function () {
      return 0;
    };
    p.currentFPS = function () {
      this._cfpsLastFrameCount = this._cfpsLastFrameCount || 0;
      var e = 0;
      if (!this._videoNode) return e;
      if (this._videoNode.webkitDecodedFrameCount) {
        this._cfpsNowFrameCount = this._videoNode.webkitDecodedFrameCount;
        e = this._cfpsNowFrameCount - this._cfpsLastFrameCount;
        this._cfpsLastFrameCount = this._cfpsNowFrameCount;
      } else if (this._videoNode.mozDecodedFrames) {
        this._cfpsNowFrameCount = this._videoNode.mozDecodedFrames;
        e = this._cfpsNowFrameCount - this._cfpsLastFrameCount;
        this._cfpsLastFrameCount = this._cfpsNowFrameCount;
      }
      return e;
    };
    p.currentKbps = function () {
      this._cfpslastByteLoaded = this._cfpslastByteLoaded || 0;
      var e = 0;
      if (this._videoNode.webkitVideoDecodedByteCount) {
        this._cfpsNowByteLoaded = this._videoNode.webkitVideoDecodedByteCount;
        e = this._cfpsNowByteLoaded - this._cfpslastByteLoaded;
        this._cfpslastByteLoaded = this._cfpsNowByteLoaded;
      }
      return (8 * e) / 1e3;
    };
    p._canSeek = function () {
      return (
        (!!this._duration && isFinite(this._duration) && !!this._hasGetMetaData) ||
        'live' == this._cfg.mode
      );
    };
    p._setState = function (e) {
      if (this._state != e) {
        this._doOptionFn(r.MEDIA_STATE, { newState: e, oldState: this._state });
        this._state = e;
      }
    };
    p._onvideoLoadedmetadata = function (e) {
      if (!this._hasGetMetaData) {
        this._duration = this._videoNode.duration;
        if (
          (this._videoNode.duration && isFinite(this._videoNode.duration)) ||
          'live' == this._cfg.mode
        )
          this._doMetaReady();
        else this._checkDuration();
      }
    };
    p._checkDuration = function () {
      if (this._videoNode) {
        var e = 0;
        this._checkMetaTimer = setInterval(
          function () {
            e++;
            if (!(e >= 50) || this._videoNode.duration)
              if (!this._videoNode.duration || !isFinite(this._videoNode.duration));
              else {
                clearInterval(this._checkMetaTimer);
                this._checkMetaTimer = null;
                this._duration = this._videoNode.duration;
                this._doMetaReady();
              }
            else {
              clearInterval(this._checkMetaTimer);
              this._checkMetaTimer = null;
              this._duration = this._movieData.duration || 0;
              this._doMetaReady();
            }
          }._$bind(this),
          200,
        );
      } else if (this._checkMetaTimer) {
        clearInterval(this._checkMetaTimer);
        this._checkMetaTimer = null;
      }
    };
    p._doMetaReady = function () {
      this._hasGetMetaData = !0;
      var e = {
        duration: Math.floor(this._duration),
        width: this._videoNode.videoWidth,
        height: this._videoNode.videoHeight,
      };
      this._doOptionFn(a.MEDIA_META, e);
    };
    p._onvideoTimeupdate = function (e) {
      if (this._videoNode.duration && isFinite(this._videoNode.duration))
        this._duration = this._videoNode.duration;
      var t = {
        currentTime: Math.floor(this._videoNode.currentTime),
        duration: Math.floor(this._videoNode.duration),
        preciseCurrentTime: this._videoNode.currentTime,
        preciseDuration: this._videoNode.duration,
      };
      this._position = t.currentTime;
      this._doOptionFn(a.MEDIA_TIME, t);
      if (this._state != s.MEDIA_STATE.PAUSE && this._state != s.MEDIA_STATE.PLAYING)
        this._setState(s.MEDIA_STATE.PLAYING);
      this._doOptionFn(a.MEDIA_TIME_UPDATE, t);
    };
    p._onvideoProgress = function (e) {
      this._doOptionFn(a.MEDIA_BUFFER, { bufferPercent: this._getBufferedPercent() });
    };
    p._getBufferedPercent = function () {
      var e = this._videoNode.buffered,
        t = 0;
      var n, i;
      if (!e || e.length < 1) return 0;
      else if (e && 1 == e.length) t = Math.floor(e.end(0));
      else {
        var o = this._videoNode.currentTime || 0;
        for (var a = 0, r = e.length; a < r; a++) {
          n = Math.floor(e.start(a));
          i = Math.floor(e.end(a));
          if (o <= i && o >= n) t = Math.floor(e.end(a));
        }
        if (!t) t = Math.floor(e.end(e.length - 1));
      }
      return this._duration ? t / this._duration : 0;
    };
    p._onvideoPlaying = function (e) {
      this._setState(s.MEDIA_STATE.PLAYING);
      d.log('_onvideoPlaying');
    };
    p._onvideoPause = function (e) {
      this._setState(s.MEDIA_STATE.PAUSE);
      d.log('_onvideoPause');
    };
    p._onvideoWaiting = function (e) {
      this._setState(s.MEDIA_STATE.BUFFERING);
      d.log('_onvideoWaiting');
    };
    p._onvideoSeeking = function (e) {
      d.log('_onvideoSeeking');
    };
    p._onvideoSeeked = function (e) {
      d.log('_onvideoSeeked');
    };
    p._onx5VideoEnterFullScreen = function () {
      t._$setStyle(this._videoNode, 'width', window.screen.width + 'px');
      t._$setStyle(this._videoNode, 'height', window.screen.height + 'px');
      t._$addClassName(document.body, 'z-x5-video-fullscreen');
    };
    p._onx5VideoExitFullScreen = function () {
      t._$setStyle(this._videoNode, 'width', '');
      t._$setStyle(this._videoNode, 'height', '');
      t._$delClassName(document.body, 'z-x5-video-fullscreen');
      t._$delClassName(document.body, 'z-x5-video-fullscreen-landscape');
      t._$attr(this._videoNode, 'x5-video-orientation', 'portrait');
    };
    p._onvideoEnded = function (e) {
      this._setState(s.MEDIA_STATE.COMPLETE);
    };
    p._onvideoError = function (e) {
      if (this._checkErrorCount()) {
        this.stop();
        this._doOptionFn(a.MEDIA_ERROR, {
          code: s.ERROR_CODE.MEDIA_ERROR_VIDEO_ERROR,
          message: this._formatVideoNodeError(e),
        });
      }
    };
    p._formatVideoNodeError = function (e) {
      if (e.target && e.target.error) return 'media error:' + e.target.error.code;
      else return null;
    };
    p._checkErrorCount = function () {
      if (this._reloadStart !== this._position) this._errorCount = 0;
      if (this._errorCount < 2) {
        this._errorCount++;
        this.reload();
        return !1;
      }
      return !0;
    };
    p.clear = function () {
      if (this._videoNode) {
        this._clearVideoEvent();
        this._videoParentNode.removeChild(this._videoNode);
        this._videoNode = null;
      }
    };
    p._clearVideoEvent = function () {
      if (this._videoNode) {
        n._$clearEvent(this._videoNode, 'loadedmetadata');
        n._$clearEvent(this._videoNode, 'ended');
        n._$clearEvent(this._videoNode, 'error');
        n._$clearEvent(this._videoNode, 'pause');
        n._$clearEvent(this._videoNode, 'play');
        n._$clearEvent(this._videoNode, 'playing');
        n._$clearEvent(this._videoNode, 'progress');
        n._$clearEvent(this._videoNode, 'seeked');
        n._$clearEvent(this._videoNode, 'seeking');
        n._$clearEvent(this._videoNode, 'timeupdate');
        n._$clearEvent(this._videoNode, 'waiting');
        if (c._$isWeixin() && c._$isAndroid() && this._cfg.x5Fullscreen) {
          n._$clearEvent(this._videoNode, 'x5videoenterfullscreen');
          n._$clearEvent(this._videoNode, 'x5videoexitfullscreen');
        }
      }
    };
    return h;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'f6ea82878bd7d6947ad4b01eb6b35583',
  '5d5746ddb90ed85fcd19a9bdbdf8c50a',
  '08622373b135f6f5d332b3d98d0782c9',
  'd179f49516aae67e50a0eac61529d79c',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  'beec6201069596ecb83a09e5fc3eb415',
  'fb7ea872222351a1a18d727c3cc70c47',
);
