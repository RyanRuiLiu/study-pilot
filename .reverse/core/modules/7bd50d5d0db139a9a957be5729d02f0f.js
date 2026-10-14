EDU(
  '7bd50d5d0db139a9a957be5729d02f0f',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f, h) {
    var p = i.C();
    var m = p.extend(c);
    m._init = function (e, t, n) {
      this.__super(e, t, n);
    };
    m._initVideoNode = function () {
      this.__super();
    };
    m._createFlv = function (e) {
      this._flvPlayer = flvjs.createPlayer(
        { type: 'flv', url: e, withCredentials: !1 },
        {
          isLive: 'live' == this._cfg.mode,
          enableStashBuffer: 'live' != this._cfg.mode,
          enableWorker: !0,
          stashInitialSize: 128,
          seekType: 'param',
          seekParamStart: 'start',
          seekParamEnd: 'end',
        },
      );
      this._flvPlayer.attachMediaElement(this._videoNode);
      this._flvPlayer.on(
        flvjs.Events.ERROR,
        function (e, t) {
          this._onflvError(e, t);
        }._$bind(this),
      );
    };
    m._destroyFlv = function () {
      if (this._flvPlayer) {
        this._flvPlayer.unload();
        this._flvPlayer.detachMediaElement();
        this._flvPlayer.destroy();
        this._flvPlayer = null;
      }
    };
    m.load = function (e) {
      this.__super(e);
      if (!this._flvPlayer) this._createFlv(this._item.urls[0]);
      this._flvPlayer.load();
      if (this._isNotFirst) this._catchPlay();
      this._openCheckLiveTime();
    };
    m._catchPlay = function () {
      if (this._flvPlayer) {
        var e = this._flvPlayer.play();
        if (e && e['catch'])
          e.then(function () {
            l.log('try to play success');
          })['catch'](function (e) {
            l.error('try to play fail');
          });
      }
    };
    m.play = function () {
      this.__super();
      this._catchPlay();
    };
    m.pause = function () {
      this.__super();
      this._flvPlayer && this._flvPlayer.pause();
      this._clearCheckLiveTime();
    };
    m._seek = function (e) {
      l.log('flv _seek');
      if (this._canSeek())
        try {
          this._flvPlayer.currentTime = e;
        } catch (t) {
          l.log(t.message);
        }
    };
    m.stop = function () {
      this.__super();
      this._clearCheckLiveTime();
    };
    m._autoSeek = function () {
      if (this._canSeek())
        if (!this._hasAutoSeek)
          if (this._movieData.start > 0) {
            this._seek(this._movieData.start);
            l.log('web flv do autoseek');
            this._doPreloadPause();
          } else {
            this._doPreloadPause();
            this._hasAutoSeek = !0;
          }
        else this._doPreloadPause();
    };
    m._doPreloadPause = function () {
      if (this._cfg.isPreload && !this._hasDoPreload) {
        this._hasDoPreload = !0;
        this.pause();
      } else this.play();
    };
    m._doBeforePlay = function (e) {
      if (this._hasGetMetaData && this._hasAutoSeek && 'live' != this._cfg.mode)
        if (!this._cfg.beforePlay || this._hasDoBeforePlay || this._state != s.MEDIA_STATE.PLAYING);
        else {
          this._doOptionFn(a.MEDIA_BEFORE_PLAY);
          this._hasDoBeforePlay = !0;
        }
    };
    m._onvideoEnded = function (e) {
      this.__super(e);
      this._clearCheckLiveTime();
    };
    m._doMetaReady = function () {
      this.__super();
      this._autoSeek();
    };
    m._onvideoTimeupdate = function (e) {
      this._doBeforePlay();
      this.__super(e);
    };
    m._onvideoSeeked = function (e) {
      if (!this._hasAutoSeek) this._hasAutoSeek = !0;
    };
    m._onflvError = function (e, t) {
      if (this._checkErrorCount()) {
        this.stop();
        this._doOptionFn(a.MEDIA_ERROR, {
          code: s.ERROR_CODE.MEDIA_ERROR_FLV_ERROR,
          message: e + '_' + t,
        });
      }
    };
    m.clear = function () {
      this.__super();
      this._destroyFlv();
    };
    m._openCheckLiveTime = function () {
      if ('live' == this._cfg.mode)
        if (!this._checkLiveTimeTimer)
          this._checkLiveTimeTimer = setInterval(this._checkLiveBuffer._$bind(this), 1e3);
    };
    m._clearCheckLiveTime = function () {
      if (this._checkLiveTimeTimer) {
        clearInterval(this._checkLiveTimeTimer);
        this._checkLiveTimeTimer = null;
      }
    };
    m._checkLiveBuffer = function () {
      if (this._videoNode)
        if (this._state != s.MEDIA_STATE.PAUSE) {
          var e =
            this._videoNode.buffered.length > 0
              ? this._videoNode.buffered.end(0) - this._videoNode.currentTime
              : 0;
          console.log('cur bufferTime:' + e);
          var t = !this._doFirstCheckBuffer ? 1 : 2.5;
          if (!(e > t));
          else {
            console.log('buffer time > ' + t);
            this._videoNode.currentTime = this._videoNode.buffered.end(0) - 0.1;
            this._doFirstCheckBuffer = !0;
          }
        }
    };
    m._setPlaySpeed = function () {
      if (!this._setSpeedTimer && this._videoNode)
        if (this._state != s.MEDIA_STATE.PAUSE)
          this._setSpeedTimer = setInterval(
            function () {
              if (this._state != s.MEDIA_STATE.PAUSE) {
                if (
                  this._videoNode.buffered.length > 0 &&
                  this._videoNode.buffered.end(0) - this._videoNode.currentTime > 0.5
                ) {
                  this._videoNode.currentTime += 0.1;
                  if (
                    this._videoNode.buffered.length > 0 &&
                    this._videoNode.buffered.end(0) - this._videoNode.currentTime < 0.5
                  ) {
                    clearInterval(this._setSpeedTimer);
                    this._setSpeedTimer = null;
                    console.log('speed normal');
                  }
                }
              } else {
                clearInterval(this._setSpeedTimer);
                this._setSpeedTimer = null;
              }
            }._$bind(this),
            100,
          );
    };
    return p;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'f6ea82878bd7d6947ad4b01eb6b35583',
  '5d5746ddb90ed85fcd19a9bdbdf8c50a',
  '08622373b135f6f5d332b3d98d0782c9',
  'd179f49516aae67e50a0eac61529d79c',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  'e462e776f170d88e4a3e320a47f4330b',
  'beec6201069596ecb83a09e5fc3eb415',
  'fb7ea872222351a1a18d727c3cc70c47',
);
