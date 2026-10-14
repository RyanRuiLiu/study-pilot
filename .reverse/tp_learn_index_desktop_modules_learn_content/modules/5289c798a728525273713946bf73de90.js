EDU(
  '5289c798a728525273713946bf73de90',
  function (e, t, n, i) {
    var o = window,
      a = NEJ.O,
      s = NEJ.F,
      r = NEJ.P('nej.p'),
      c = NEJ.P('nej.e'),
      d = NEJ.P('nej.v'),
      l = NEJ.P('nej.u'),
      _ = NEJ.P('nej.j'),
      u = NEJ.P('edu.d'),
      f = NEJ.P('edu.u'),
      h,
      p;
    window.isVideoPlayerLoaded = 'loaded';
    f._$$VideoPlayer = NEJ.C();
    h = f._$$VideoPlayer._$extend(f._$$UIBase, !0);
    p = f._$$VideoPlayer._$supro;
    h.__initNode = function () {
      this.__supInitNode();
    };
    h.__initEvents = function () {
      this.__player.$on(
        'onAnchorPoint',
        function (e) {
          this._$dispatchEvent('onAnchorPoint', e);
        }._$bind(this),
      );
      this.__player.$on(
        'onPlayEnd',
        function () {
          f._$trackEvent('video', 'complete');
          this._$dispatchEvent('onPlayEnd');
        }._$bind(this),
      );
      this.__player.$on(
        'onSeek',
        function (e) {
          f._$trackEvent('video', 'seek', e);
          this._$dispatchEvent('onSeek', e);
        }._$bind(this),
      );
      this.__player.$on(
        'onPlay',
        function () {
          f._$trackEvent('video', 'play');
          this._$getCurVideoTime(
            function (e) {
              this._$dispatchEvent('onPlay', e);
            }._$bind(this),
          );
        }._$bind(this),
      );
      this.__player.$on(
        'onPauseClick',
        function () {
          this._$dispatchEvent('onPauseClick');
        }._$bind(this),
      );
      this.__player.$on(
        'onPlayerType',
        function (e) {
          this._$dispatchEvent('onPlayerType', e);
        }._$bind(this),
      );
    };
    h.__loadVideo = function () {
      if (this.__videoInfo) this.__player.load(this.__videoInfo);
    };
    h._$getResolutionType = function () {
      return this.__resolutionType;
    };
    h._$stopVideo = function () {
      this.__player.stop();
    };
    h._$pauseVideo = function () {
      this.__player.pause();
    };
    h._$resumeVideo = function () {
      this.__player.resume();
    };
    h._$getCurVideoTime = function (e) {
      return this.__player && this.__player.__playerUI && this.__player.getPosition(e);
    };
    h._$seekAnchorTime = function (e) {
      this.__player.seek(e);
    };
    h._$getState = function (e) {
      this.__player.getState(e);
    };
    h.__html5Support = function () {
      try {
        var e = document.createElement('video');
        var t = !!e.canPlayType && '' != e.canPlayType('video/mp4');
      } catch (n) {
        t = !1;
      }
      return t;
    };
    h.__getVideoConfigFromCookie = function () {
      this.__config = this.__config || {};
      this.__qualityMap = { 1: 'SD', 2: 'HD', 3: 'SHD' };
      this.__config.videoVolume = _._$cookie('videoVolume') || 0.8;
      this.__config.hasVolume = 'true' == (_._$cookie('hasVolume') || 'true');
      this.__config.cdnSwitch = _._$cookie('cdnName') || null;
      this.__config.videoRate = _._$cookie('videoRate') || null;
    };
    h.__dispatcherPlayer = function (e) {
      this.__videoInfo = e.videoInfo;
      this.__isEncrypted = !(!e.videoInfo || !e.videoInfo.isEncrypt);
      this.__notAllowFullScreen = e.notAllowFullScreen;
      this.__parentNode = e.parent;
      this.__getVideoConfigFromCookie();
      this.__useHtm5Player = void 0 === e.useHtml5Player ? !0 : e.useHtml5Player;
      this.__html5 = this.__html5Support();
      var i = { isNewVideoToken: e.isNewVideoToken };
      if (i.isNewVideoToken) {
        i.bizId = e.unitId;
        i.bizType = 1;
        i.contentType = 1;
      } else {
        i.videoId = this.__videoInfo.videoId;
        i.targetId = this.__videoInfo.targetId || this.__videoInfo.termId;
        i.targetType = this.__videoInfo.targetType || n.VIDEO_TARGET.COURSE;
      }
      t._$getVideoToken(
        i,
        function (e) {
          var t = e.signature || (e.videoSignDto && e.videoSignDto.signature);
          if (t) {
            this.__videoInfo.signature = t;
            this.__genPlayer();
            this.__initEvents();
          }
        }._$bind(this),
      );
    };
    h.__genPlayer = function () {
      var t = !1;
      if (this.__videoInfo.signature) {
        var n = {
          start: this.__videoInfo.start,
          videoImgUrl: this.__videoInfo.image,
          isEncrypt: this.__isEncrypted,
          clientEncryptKeyVersion: this.__videoInfo.clientEncryptKeyVersion,
          flvCaption: this.__videoInfo.html5caption,
          cluPointData: this.__videoInfo.cluPointData,
          videoId: this.__videoInfo.videoId,
          signature: this.__videoInfo.signature,
          videoDecryptData: this.__videoInfo.videoDecryptData,
        };
        try {
          t = window.termDto && +window.termDto.price > 0;
        } catch (i) {}
        this.__player = new e({
          data: {
            autoStart: !!this.__videoInfo.autoStart,
            useH5: this.__useHtm5Player,
            showCdnSwitch: !1,
            waterMark: t,
            waterMarkContent: window.webUser ? window.webUser.id : '',
            videoPlayerSwfRemoteUrl: window.swfUrlMap.CloudPlayer,
            videoPlayerUISwfRemotePath: window.swfUrlMap.cloudPlayerUI,
            beforePlay: !1,
            videoData: n,
          },
        }).$inject(this.__parentNode);
      }
    };
    h.__reset = function (e) {
      this.__supReset(e);
      this.__dispatcherPlayer(e);
    };
    h.__destroy = function () {
      this.__recycleUI();
      this.__supDestroy();
    };
    h.__recycleUI = function () {
      if (this.__parent) {
        var e = c._$getChildren(this.__parent);
        if (e) for (var t = 0; t < e.length; t++) this.__parent.removeChild(e[t]);
      }
    };
    return f._$$VideoPlayer;
  },
  '4b2a52ea911cc1cabd5156fdc88e88a2',
  '66a53b58eef786f54f6d61c6f2761843',
  '93828627ddb358ed890cb65967a0c1de',
  '17cacfcf5397cb5e99d8c8d7670bafd5',
  'fa2b6ecbc49a62a4ffefe3ee4bbc79ba',
  '342ad7ae4eea50c3cad860686650a915',
  '5bab8e2d3a5bec624e3cbe3c068023fb',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
  'f051aeae7bb889518ead30ef6e491df3',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '6ac6c7855f1e7a32c8446fed2a69b6ff',
);
