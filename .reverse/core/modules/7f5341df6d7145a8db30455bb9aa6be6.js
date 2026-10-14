EDU(
  '7f5341df6d7145a8db30455bb9aa6be6',
  function (e, t, n, i, o, a, r, s, c) {
    var d = window;
    var l = [1, 8, 43];
    s._$$FlashVideoPlayer = t._$klass();
    var u = s._$$FlashVideoPlayer._$extend(i._$$EventTarget);
    u.__init = function () {
      this.__super();
    };
    u.__reset = function (e) {
      this.__super(e);
      this.__options = e;
      this.__videoOptions = e.data;
      this._hasDoLoad = !1;
      this.__initInterface();
      this.__genFlashPlayer();
    };
    u.__initInterface = function () {
      var t = 'edu.front.flashVideoPlayer' + e._$randNumberString(2);
      this.__videoOptions.flashNamespace = t;
      this.__jsNamespace = NEJ.P(this.__videoOptions.flashNamespace);
      this.__jsNamespace.onStartLoad = this.__onStartLoad._$bind(this);
      this.__jsNamespace.onMeta = this.__onMeta._$bind(this);
      this.__jsNamespace.onError = this.__onError._$bind(this);
      this.__jsNamespace.playComplete = this.__onPlayEndHandle._$bind(this);
      this.__jsNamespace.anchorHandle = this.__onAnchorHandle._$bind(this);
      this.__jsNamespace.changeVolume = this.__onChangeVolume._$bind(this);
      this.__jsNamespace.changeMute = this.__onChangeMute._$bind(this);
      this.__jsNamespace.onSeek = this.__onSeek._$bind(this);
      this.__jsNamespace.onPlay = this.__onPlay._$bind(this);
      this.__jsNamespace.onPause = this.__onPause._$bind(this);
      this.__jsNamespace.onBuffering = this.__onBuffering._$bind(this);
      this.__jsNamespace.onPlayClick = this.__onPlayClick._$bind(this);
      this.__jsNamespace.onPauseClick = this.__onPauseClick._$bind(this);
      this.__jsNamespace.selectResolution = this.__onSelectResolution._$bind(this);
      this.__jsNamespace.selectCDN = this.__onSelectCDN._$bind(this);
      this.__jsNamespace.selectCaption = this.__onSelectCaption._$bind(this);
      this.__jsNamespace.liveStreamClosed = this.__onLiveStreamClosed._$bind(this);
      this.__jsNamespace.onFullscreenChange = this.__onFullscreenChange._$bind(this);
    };
    u.__genFlashPlayer = function () {
      var e = '',
        t = '';
      if (this.__videoOptions.videoPlayerSwfRemoteUrl)
        e = this.__videoOptions.videoPlayerSwfRemoteUrl;
      if (this.__videoOptions.videoPlayerUISwfRemotePath)
        t = '&uiRemotePath=' + this.__videoOptions.videoPlayerUISwfRemotePath;
      this.__videoOptions.isLocal = !1;
      if (!e)
        e =
          '//edu-image.nosdn.127.net/component-video-player-eduPlayer_4e33ac6eccb46c8f91239b0efcb0f590.swf';
      if (!t)
        t =
          '&uiRemotePath=//edu-image.nosdn.127.net/component-video-player-swf-ui-cloudPlayerUI_bea90e41cfd162b6c65eddc5b77b6776.swf';
      var n =
        'namespace=' +
        this.__videoOptions.flashNamespace +
        '&host=' +
        this.__videoOptions.host +
        '&isLive=' +
        ('live' == this.__videoOptions.mode) +
        '&isAutoPlay=' +
        this.__videoOptions.autoStart +
        '&isPreload=' +
        this.__videoOptions.preload +
        (this.__videoOptions.volume ? '&volume=' + this.__videoOptions.volume : '') +
        (this.__videoOptions.mute ? '&mute=' + this.__videoOptions.mute : '') +
        '&isLocal=' +
        Boolean(this.__videoOptions.isLocal) +
        '&showCdnSwitch=' +
        ('live' == this.__videoOptions.mode ? !1 : this.__videoOptions.showCdnSwitch) +
        '&isInnerSite=' +
        this.__videoOptions.innerSite +
        '&showPauseAd=' +
        this.__videoOptions.showPauseAd +
        '&waterMark=' +
        this.__videoOptions.waterMark +
        '&autopnt=' +
        this.__videoOptions.openAutoPlayNextTip +
        t;
      o._$flash({
        src: e,
        width: '100%',
        height: '100%',
        parent: this.__options.parent,
        params: {
          wmode: 'transparent',
          allowscriptaccess: 'always',
          allowFullScreen: !this.__videoOptions.notAllowFullScreen,
          flashvars: n,
        },
        onready: function (e) {
          this.__flashObj = e;
        }._$bind(this),
      });
      this._checkSwfVersion();
    };
    u.__setFlashFunc = function (e) {
      if (e && this.__flashObj)
        try {
          e();
        } catch (t) {
          console && console.log(t);
        }
      else {
        if (this.__timer) this.__timer = d.clearInterval(this.__timer);
        var n = 0;
        this.__timer = d.setInterval(
          function () {
            if (e && this.__flashObj) {
              try {
                e();
              } catch (t) {
                console && console.log(t);
              }
              this.__timer = d.clearInterval(this.__timer);
            }
          }._$bind(this),
          100,
        );
      }
    };
    u.__clear = function () {
      if (this.__parent) {
        var e = n._$getChildren(this.__parent);
        if (e) for (var t = 0; t < e.length; t++) this.__parent.removeChild(e[t]);
      }
      if (this.__timer) this.__timer = d.clearInterval(this.__timer);
      delete this.__flashObj;
    };
    u.__destroy = function () {
      this.__clear();
      this.__supDestroy();
    };
    u._checkSwfVersion = function () {
      this.__setFlashFunc(
        function () {
          var e, t;
          try {
            e = this.__flashObj.version();
          } catch (n) {
            alert('swf版本太低，请更新至' + l.join('.'));
            return;
          }
          t = e.split('.');
          for (var i = t.length - 1; i >= 0; i--)
            if (parseInt(t[i]) < l[i]) {
              alert('swf版本太低，请更新至' + l.join('.'));
              return;
            }
          this._$load(this.__videoOptions.videoData);
        }._$bind(this),
      );
    };
    u._$stop = function () {
      this.__setFlashFunc(
        function () {
          this.__flashObj.nejstop();
        }._$bind(this),
      );
    };
    u._$load = function (e) {
      if (e) {
        this._hasDoLoad = !1;
        if (this.__videoOptions.defaultQuality)
          this.__videoOptions.videoData.defaultQuality = this.__videoOptions.defaultQuality;
        if (this.__videoOptions.cdnSwitch)
          this.__videoOptions.videoData.cdnSwitch = this.__videoOptions.cdnSwitch;
        this.__setFlashFunc(
          function () {
            this.__flashObj.stop();
            if (this.__videoOptions.waterMark && this.__videoOptions.waterMarkContent)
              this.__flashObj.setWaterMarkContent(this.__videoOptions.waterMarkContent);
            this.__flashObj.load(this.__videoOptions.videoData);
            this._hasDoLoad = !0;
          }._$bind(this),
        );
      }
    };
    u._$pause = function () {
      this.__setFlashFunc(
        function () {
          this.__flashObj.pause();
        }._$bind(this),
      );
    };
    u._$resume = function () {
      this.__setFlashFunc(
        function () {
          this.__flashObj.nejplay();
        }._$bind(this),
      );
    };
    u._$getPosition = function (e) {
      this.__setFlashFunc(
        function () {
          e(this.__flashObj.getPosition());
        }._$bind(this),
      );
    };
    u._$seek = function (e) {
      this.__setFlashFunc(
        function () {
          this.__flashObj.seekTime(e);
        }._$bind(this),
      );
    };
    u._$getState = function (e) {
      this.__setFlashFunc(
        function () {
          e(this.__flashObj.getState());
        }._$bind(this),
      );
    };
    u._$getStateInfo = function (e) {
      this.__setFlashFunc(
        function () {
          e(this.__flashObj.getStateInfo());
        }._$bind(this),
      );
    };
    u._$checkLiveReload = function () {
      if (this._hasDoLoad)
        this.__setFlashFunc(
          function () {
            this.__flashObj.checkLiveReload();
          }._$bind(this),
        );
    };
    u._$exitFullScreen = function () {
      return !1;
    };
    u._$isBlock = function () {
      return this.__flashObj.isBlock();
    };
    u._$metaFPS = function () {
      return this.__flashObj.metaFPS();
    };
    u._$currentFPS = function () {
      return this.__flashObj.currentFPS();
    };
    u._$currentKbps = function () {
      return this.__flashObj.currentKbps();
    };
    u._$getLog = function (e) {
      this.__setFlashFunc(
        function () {
          e(this.__flashObj.getLog());
        }._$bind(this),
      );
    };
    u.__onStartLoad = function (e) {
      this._$dispatchEvent('onStartLoad', e);
    };
    u.__onMeta = function (e) {
      this._$dispatchEvent('onMeta', e);
    };
    u.__onError = function (e) {
      this._$dispatchEvent('onError', e);
    };
    u.__onPlayEndHandle = function () {
      this._$dispatchEvent('onPlayEnd');
    };
    u.__onAnchorHandle = function (e) {
      this._$dispatchEvent('onAnchorPoint', e);
    };
    u.__onChangeVolume = function (e) {
      this._$dispatchEvent('onChangeVolume', e);
    };
    u.__onChangeMute = function (e) {
      this._$dispatchEvent('onMute', e);
    };
    u.__onSeek = function (e) {
      this._$dispatchEvent('onSeek', e);
    };
    u.__onSelectResolution = function (e) {
      this._$dispatchEvent('onSelectResolution', e);
    };
    u.__onSelectCaption = function (e) {
      this._$dispatchEvent('onSelectCaption', e);
    };
    u.__onSelectCDN = function (e) {
      this._$dispatchEvent('onChangeCDN', e);
    };
    u.__onLiveStreamClosed = function () {
      this._$dispatchEvent('onLiveStreamClosed');
    };
    u.__onPlay = function () {
      this._$dispatchEvent('onPlay');
    };
    u.__onPause = function () {
      this._$dispatchEvent('onPause');
    };
    u.__onBuffering = function () {
      this._$dispatchEvent('onBuffering');
    };
    u.__onPlayClick = function () {
      this._$dispatchEvent('onPlayClick');
    };
    u.__onPauseClick = function (e) {
      this._$dispatchEvent('onPauseClick', e);
    };
    u.__onFullscreenChange = function (e) {
      this._$dispatchEvent('onFullscreenChange', e);
    };
    return s;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  'fa2b6ecbc49a62a4ffefe3ee4bbc79ba',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  'f2277e0b522a8d6029276ad9719038dc',
);
