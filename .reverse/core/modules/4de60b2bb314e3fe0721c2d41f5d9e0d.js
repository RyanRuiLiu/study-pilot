EDU(
  '4de60b2bb314e3fe0721c2d41f5d9e0d',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f, h) {
    var p = i.C();
    var m = p.extend(c);
    m._init = function (e, t, n) {
      this.__super(e, t, n);
    };
    m._initVideoNode = function () {
      this.__super();
    };
    m._setSourceNode = function (t) {
      this._clearSourceEvent();
      this._removeSourceNode();
      e._$forEach(
        t,
        function (e, t) {
          if (e) {
            var n = o.getVideoMIMEType(e);
            if (n)
              if (o.checkVideoCanPlay(n)) {
                var r = i.createEl('source', {
                  src: e,
                  crossorigin: 'anonymous',
                  type: n.split(';')[0],
                });
                this._videoNode.appendChild(r);
              } else
                this._doOptionFn(a.MEDIA_ERROR, s.ERROR_CODE.MEDIA_ERROR_SOURCETYPE_NOT_SUPPORT);
            else this._doOptionFn(a.MEDIA_ERROR, s.ERROR_CODE.MEDIA_ERROR_SOURCETYPE_NOT_SUPPORT);
          }
        },
        this,
      );
      this._sourceNodes = i.T('source', this._videoNode);
      this._initSourceEvent();
    };
    m._removeSourceNode = function () {
      if (this._sourceNodes)
        e._$forEach(
          this._sourceNodes,
          function (e, t) {
            this._videoNode.removeChild(e);
          },
          this,
        );
      this._sourceNodes = null;
    };
    m._initSourceEvent = function (t) {
      e._$forEach(
        this._sourceNodes,
        function (e, t) {
          n._$addEvent(e, 'error', this._onsourceError._$bind(this));
        }._$bind(this),
      );
    };
    m.load = function (e) {
      this.__super(e);
      this._setSourceNode(this._item.urls);
      this._videoNode.load();
      if (this._isNotFirst || !this._cfg.isPreload || d._$isMobileAll()) this._catchPlay();
    };
    m.play = function () {
      this.__super();
      this._catchPlay();
    };
    m.pause = function () {
      this.__super();
      if (this._videoNode) this._videoNode.pause();
    };
    m._seek = function (e) {
      this.__super(e);
    };
    m._autoSeek = function () {
      if (this._canSeek())
        if (!this._hasAutoSeek)
          if (this._movieData.start > 0) {
            this._seek(this._movieData.start);
            l.log('html5 video do autoseek');
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
      if (this._hasGetMetaData && 'live' != this._cfg.mode)
        if (this._hasAutoSeek || !d._$isMobileAll())
          if (
            !this._cfg.beforePlay ||
            this._hasDoBeforePlay ||
            this._state != s.MEDIA_STATE.PLAYING
          );
          else {
            this._hasDoBeforePlay = !0;
            this._doOptionFn(a.MEDIA_BEFORE_PLAY);
          }
        else this._autoSeek();
    };
    m._onvideoLoadedmetadata = function (e) {
      this.__super(e);
    };
    m._doMetaReady = function () {
      this.__super();
      if (!d._$isMobileAll()) this._autoSeek();
    };
    m._doPreloadAndBeforePlay = function () {
      if (this._hasGetMetaData && this._hasAutoSeek && 'live' != this._cfg.mode) {
        if (
          this._cfg.beforePlay &&
          !this._movieData.hasDoBeforePlay &&
          this._state == s.MEDIA_STATE.PLAYING
        ) {
          this._movieData.hasDoBeforePlay = !0;
          this._doOptionFn(a.MEDIA_BEFORE_PLAY);
          return !1;
        }
        return !0;
      }
    };
    m._onvideoTimeupdate = function (e) {
      this._doBeforePlay();
      this.__super(e);
    };
    m._onvideoEnded = function (e) {
      this.__super(e);
    };
    m._onvideoError = function (e) {
      this.__super(e);
    };
    m._onvideoSeeked = function (e) {
      if (!this._hasAutoSeek) {
        this._hasAutoSeek = !0;
        this._isAutoSeeking = !1;
      }
    };
    m._onsourceError = function (e) {
      if (this._checkErrorCount()) {
        this.stop();
        this._clearCheckCurrentTime();
        this._doOptionFn(a.MEDIA_ERROR, {
          code: s.ERROR_CODE.MEDIA_ERROR_SOURCE_ERROR,
          message: '接口请求出错',
        });
      }
    };
    m._onx5VideoEnterFullScreen = function () {
      t._$setStyle(this._videoNode, 'width', window.screen.width + 'px');
      t._$setStyle(this._videoNode, 'height', window.screen.height + 'px');
      t._$addClassName(document.body, 'z-x5-video-fullscreen');
    };
    m._onx5VideoExitFullScreen = function () {
      t._$setStyle(this._videoNode, 'width', '');
      t._$setStyle(this._videoNode, 'height', '');
      t._$delClassName(document.body, 'z-x5-video-fullscreen');
      t._$delClassName(document.body, 'z-x5-video-fullscreen-landscape');
      t._$attr(this._videoNode, 'x5-video-orientation', 'portrait');
    };
    m._checkCurrentTime = function () {
      if (!this._checkCurrentTimeTimer)
        this._checkCurrentTimeTimer = setInterval(this._checkToReload._$bind(this), 1e4);
    };
    m._clearCheckCurrentTime = function () {
      if (this._checkCurrentTimeTimer) {
        clearInterval(this._checkCurrentTimeTimer);
        this._checkCurrentTimeTimer = null;
      }
      this._lastCheckCurrentTime = void 0;
    };
    m._checkToReload = function () {
      var e = this._videoNode.currentTime;
      if (e || 0 == e)
        if (void 0 != this._lastCheckCurrentTime) {
          if (e == this._lastCheckCurrentTime && 0 != e && this._state == s.MEDIA_STATE.PLAYING)
            if ('live' == this._cfg.mode) this.reload();
          this._lastCheckCurrentTime = e;
        } else this._lastCheckCurrentTime = e;
    };
    m.clear = function () {
      if (this._videoNode) {
        this._clearSourceEvent();
        this._removeSourceNode();
      }
      this.__super();
    };
    m._clearSourceEvent = function () {
      if (this._sourceNodes)
        e._$forEach(
          this._sourceNodes,
          function (e, t) {
            n._$clearEvent(e, 'error');
          }._$bind(this),
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
