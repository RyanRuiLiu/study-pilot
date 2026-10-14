EDU(
  '3a4cf16e516dad8462edbf62e765041c',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f, h, p, m) {
    var g = i.C();
    var b = g.extend(c);
    b._init = function (e, t, n) {
      this.__super(e, t, n);
    };
    b._initVideoNode = function () {
      this.__super();
    };
    b._createHls = function (e, t) {
      var n = this;
      var i = {
        debug: !1,
        autoStartLoad: !0,
        startPosition: e,
        maxBufferLength: 50,
        maxMaxBufferLength: 600,
      };
      try {
        if (_._$cookie('videoRate') >= 1.5) i.maxBufferLength = 70;
      } catch (o) {}
      if (t.currentMovieItem && t.currentMovieItem.secondaryEncrypt) {
        Function.prototype.bind = window.moocTempBind
          ? window.moocTempBind
          : Function.prototype.bind;
        i.loader = function () {
          var e = new Hls.DefaultConfig.loader(i);
          this.load = function (i, o, a) {
            var r = i.type;
            var s = a.onSuccess;
            a.onSuccess = function (e, o, a, c) {
              if ('manifest' == i.type) {
                var d = window.secondaryDecrypt(e.data, t.videoId);
                e.data = d.split('#EXT-X-ENDLIST')[0] + '#EXT-X-ENDLIST';
              }
              if ('manifest' !== r && /hls\/key/.test(a.url)) {
                var l = String.fromCharCode.apply(null, new Uint8Array(e.data));
                e.data = window.secondaryDecrypt(l, t.videoId, !0);
              }
              s(e, o, i, c);
              n._logTsFile(o, t.videoId);
            };
            e.load(i, o, a);
          };
          this.abort = function () {
            return e.abort();
          };
          this.destroy = function () {
            return e.destroy();
          };
          Object.defineProperty(this, 'stats', {
            get: function () {
              return e.stats;
            },
          });
        };
      }
      if (!i.loader)
        i.loader = function () {
          var e = new Hls.DefaultConfig.loader(i);
          this.load = function (i, o, a) {
            var r = i.type;
            var s = a.onSuccess;
            a.onSuccess = function (e, o, a, r) {
              s(e, o, i, r);
              n._logTsFile(o, t.videoId);
            };
            e.load(i, o, a);
          };
          this.abort = function () {
            return e.abort();
          };
          this.destroy = function () {
            return e.destroy();
          };
          Object.defineProperty(this, 'stats', {
            get: function () {
              return e.stats;
            },
          });
        };
      this._hls = new Hls(i);
      this._hls.attachMedia(this._videoNode);
      this._hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        l.log('video and hls.js are bound');
      });
      this._hls.on(
        Hls.Events.MANIFEST_PARSED,
        function (e, t) {
          l.log('hls: manifest loaded, found ' + t.levels.length + ' quality level');
        }._$bind(this),
      );
      this._hls.on(
        Hls.Events.ERROR,
        function (e, t) {
          switch (t.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              l.error('hls: fatal network error encountered, try to recover');
              this._onhlsError(t.type, t.details);
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
          }
        }._$bind(this),
      );
    };
    b._destroyHls = function () {
      if (this._hls) {
        this._hls.stopLoad();
        this._hls.destroy();
        this._hls = null;
      }
    };
    b._logTsFile = function (e, t) {
      if (e && e.total) {
        var n = e.total;
        var i = _._$cookie('videoResolutionType') || 1;
        var o = [3e6, 4e6, 7e6];
        if (n > o[i - 1] && location.href && location.href.indexOf('/learn/'));
      }
    };
    b.load = function (e) {
      this.__super(e);
      if (!this._hls) this._createHls(e.start, e);
      this._hls.loadSource(this._item.urls[0]);
      if (this._isNotFirst) this._catchPlay();
    };
    b.play = function () {
      this.__super();
      this._catchPlay();
    };
    b.pause = function () {
      this.__super();
      if (this._videoNode) this._videoNode.pause();
    };
    b._seek = function (e) {
      this.__super(e);
    };
    b._doPreloadPause = function () {
      if (this._cfg.isPreload && !this._hasDoPreload) {
        this._hasDoPreload = !0;
        this.pause();
      } else this.play();
    };
    b._doBeforePlay = function (e) {
      if (this._hasGetMetaData && this._hasAutoSeek && 'live' != this._cfg.mode)
        if (!this._cfg.beforePlay || this._hasDoBeforePlay || this._state != s.MEDIA_STATE.PLAYING);
        else {
          this._doOptionFn(a.MEDIA_BEFORE_PLAY);
          this._hasDoBeforePlay = !0;
        }
    };
    b._doMetaReady = function () {
      this.__super();
      if (!this._movieData.start || this._movieData.start < 0) this._hasAutoSeek = !0;
      this._doPreloadPause();
    };
    b._onvideoTimeupdate = function (e) {
      this._doBeforePlay();
      this.__super(e);
    };
    b._onvideoEnded = function (e) {
      this.__super(e);
    };
    b._onvideoSeeked = function (e) {
      if (!this._hasAutoSeek) this._hasAutoSeek = !0;
    };
    b._onhlsError = function (e, t) {
      if (this._checkErrorCount()) {
        this.stop();
        this._doOptionFn(a.MEDIA_ERROR, { code: s.ERROR_CODE.MEDIA_ERROR_HLS_ERROR, message: t });
      }
    };
    b.clear = function () {
      this.__super();
      this._destroyHls();
    };
    return g;
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
  'f7742deea4ceef0567d5c5917d8e591a',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
);
