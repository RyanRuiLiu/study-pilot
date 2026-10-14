EDU(
  '8105b977423b6de68ab733aba64a5495',
  function (e, t, n, i, o, a, r) {
    a._$$Html5VideoPlayer = t._$klass();
    var s = a._$$Html5VideoPlayer._$extend(i._$$EventTarget);
    s.__init = function () {
      this.__super();
    };
    s.__reset = function (e) {
      this.__super(e);
      this.__options = e;
      this.__videoOptions = e.data;
      this.__genH5Player();
    };
    s.__genH5Player = function () {
      this.__playerUI = new o({
        parent: this.__options.parent,
        isLocal: Boolean(this.__videoOptions.isLocal),
        mode: this.__videoOptions.mode,
        host: this.__videoOptions.host,
        useNative: this.__videoOptions.useNative,
        autoStart: this.__videoOptions.autoStart,
        defaultQuality: this.__videoOptions.defaultQuality,
        rate: this.__videoOptions.rate,
        mute: this.__videoOptions.mute,
        volume: this.__videoOptions.volume,
        isPreload: this.__videoOptions.preload,
        showPauseAd: this.__videoOptions.showPauseAd,
        showCdnSwitch: !1,
        cdnSwitch: this.__videoOptions.cdnSwitch,
        lineSwitch: this.__videoOptions.lineSwitch,
        notAllowFullScreen: this.__videoOptions.notAllowFullScreen,
        notNeedFullscreen: this.__videoOptions.notNeedFullscreen,
        x5Fullscreen: !!this.__videoOptions.x5Fullscreen,
        waterMark: this.__videoOptions.waterMark,
        waterMarkContent: this.__videoOptions.waterMarkContent,
        openAutoPlayNextTip: this.__videoOptions.openAutoPlayNextTip,
        forbidViewSegment: this.__videoOptions.forbidViewSegment,
        useFullscreenSegmentComponent: this.__videoOptions.useFullscreenSegmentComponent,
        useFullscreenAIAssistant: this.__videoOptions.useFullscreenAIAssistant,
        AIAssistantParam: this.__videoOptions.AIAssistantParam,
        forbidAiSubtitle: this.__videoOptions.forbidAiSubtitle,
        onStartLoad: this.__onStartLoad._$bind(this),
        onMeta: this.__onMeta._$bind(this),
        onError: this.__onError._$bind(this),
        onSeek: this.__onSeek._$bind(this),
        onPlay: this.__onPlay._$bind(this),
        onPause: this.__onPause._$bind(this),
        onBuffering: this.__onBuffering._$bind(this),
        onPlayClick: this.__onPlayClick._$bind(this),
        onPauseClick: this.__onPauseClick._$bind(this),
        onPlayEnd: this.__onPlayEndHandle._$bind(this),
        onChangeRate: this.__onChangeRate._$bind(this),
        onChangeVolume: this.__onChangeVolume._$bind(this),
        onMute: this.__onChangeMute._$bind(this),
        onSelectResolution: this.__onSelectResolution._$bind(this),
        onSelectCaption: this.__onSelectCaption._$bind(this),
        onChangeCDN: this.__onSelectCDN._$bind(this),
        onAnchorPoint: this.__onAnchorHandle._$bind(this),
        onLectureNoteChange: this.__onLectureNoteHandle._$bind(this),
        onShowSegmentList: this.__onShowSegmentHandle._$bind(this),
        onFullscreenChange: this.__onFullscreenChange._$bind(this),
        onTimeupdate: this.__onTimeupdate._$bind(this),
      });
      if (this.__videoOptions.videoData) {
        this.__videoOptions.videoData.cdnSwitch = this.__videoOptions.cdnSwitch;
        this.__videoOptions.videoData.lineSwitch = this.__videoOptions.lineSwitch;
        this.__playerUI.ready(
          function () {
            this.__playerUI.load(this.__videoOptions.videoData);
          }._$bind(this),
        );
      }
    };
    s.__destroy = function () {
      this.__supDestroy();
      if (this.__playerUI) {
        this.__playerUI.destory();
        this.__playerUI = null;
      }
    };
    s._$stop = function () {
      this.__playerUI.ready(
        function () {
          this.__playerUI.stop();
        }._$bind(this),
      );
    };
    s._$load = function (e) {
      if (e)
        this.__playerUI.ready(
          function () {
            this.__playerUI.load(e);
          }._$bind(this),
        );
    };
    s._$pause = function () {
      this.__playerUI.ready(
        function () {
          this.__playerUI.pause();
        }._$bind(this),
      );
    };
    s._$resume = function () {
      this.__playerUI.ready(
        function () {
          this.__playerUI.resume();
        }._$bind(this),
      );
    };
    s._$getPosition = function (e) {
      this.__playerUI.ready(
        function () {
          e && e(this.__playerUI.getPosition(e));
        }._$bind(this),
      );
    };
    s._$seek = function (e) {
      this.__playerUI.ready(
        function () {
          this.__playerUI.seek(e);
        }._$bind(this),
      );
    };
    s._$getState = function (e) {
      this.__playerUI.ready(
        function () {
          e && e(this.__playerUI.getState());
        }._$bind(this),
      );
    };
    s._$getStateInfo = function (e) {
      this.__playerUI.ready(
        function () {
          e && e(this.__playerUI.getStateInfo());
        }._$bind(this),
      );
    };
    s._$checkLiveReload = function () {};
    s._$exitFullScreen = function () {
      this.__playerUI.ready(
        function () {
          this.__playerUI.exitFullScreen();
        }._$bind(this),
      );
    };
    s._$getLog = function (e) {
      this.__playerUI.ready(
        function () {
          e && e(this.__playerUI.getLog());
        }._$bind(this),
      );
    };
    s._$metaFPS = function () {
      return this.__playerUI.metaFPS();
    };
    s._$currentFPS = function () {
      return this.__playerUI.currentFPS();
    };
    s._$currentKbps = function () {
      return this.__playerUI.currentKbps();
    };
    s._$checkLiveReload = function () {};
    s._$exitFullScreen = function () {
      return this.__playerUI.exitFullScreen();
    };
    s._$getLog = function (e) {
      e && e(this.__playerUI.getLog());
    };
    s._$isBlock = function () {
      return this.__playerUI.isBlock();
    };
    s._$metaFPS = function () {
      return this.__playerUI.metaFPS();
    };
    s._$currentFPS = function () {
      return this.__playerUI.currentFPS();
    };
    s._$currentKbps = function () {
      return this.__playerUI.currentKbps();
    };
    s.__onStartLoad = function (e) {
      this._$dispatchEvent('onStartLoad', e);
    };
    s.__onMeta = function (e) {
      this._$dispatchEvent('onMeta', e);
    };
    s.__onError = function (e) {
      this._$dispatchEvent('onError', e);
    };
    s.__onPlayEndHandle = function () {
      this._$dispatchEvent('onPlayEnd');
    };
    s.__onAnchorHandle = function (e) {
      this._$dispatchEvent('onAnchorPoint', e);
    };
    s.__onLectureNoteHandle = function (e) {
      this._$dispatchEvent('onLectureNoteChange', e);
    };
    s.__onShowSegmentHandle = function (e) {
      this._$dispatchEvent('onShowSegmentList', e);
    };
    s.__onFullscreenChange = function (e) {
      this._$dispatchEvent('onFullscreenChange', e);
    };
    s.__onTimeupdate = function (e) {
      this._$dispatchEvent('onTimeupdate', e);
    };
    s.__onChangeVolume = function (e) {
      setTimeout(
        function () {
          this._$dispatchEvent('onChangeVolume', e);
        }._$bind(this),
        0,
      );
    };
    s.__onChangeRate = function (e) {
      this._$dispatchEvent('onChangeRate', e);
    };
    s.__onChangeMute = function (e) {
      setTimeout(
        function () {
          this._$dispatchEvent('onMute', e);
        }._$bind(this),
        0,
      );
    };
    s.__onSeek = function (e) {
      this._$dispatchEvent('onSeek', e);
    };
    s.__onSelectResolution = function (e) {
      this._$dispatchEvent('onSelectResolution', e);
    };
    s.__onSelectCaption = function (e) {
      this._$dispatchEvent('onSelectCaption', e);
    };
    s.__onSelectCDN = function (e) {
      this._$dispatchEvent('onChangeCDN', e);
    };
    s.__onPlay = function () {
      this._$dispatchEvent('onPlay');
    };
    s.__onPause = function () {
      this._$dispatchEvent('onPause');
    };
    s.__onBuffering = function () {
      this._$dispatchEvent('onBuffering');
    };
    s.__onPlayClick = function () {
      this._$dispatchEvent('onPlayClick');
    };
    s.__onPauseClick = function (e) {
      this._$dispatchEvent('onPauseClick', e);
    };
    return a;
  },
  'fe86216ed59e3103a56c42c850d389f0',
  'f1c1923e72a7bf464958899fa52f322f',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '17484da2f2f147771f9d3694c13f2ba4',
);
