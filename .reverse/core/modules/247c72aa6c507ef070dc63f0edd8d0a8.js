EDU(
  '247c72aa6c507ef070dc63f0edd8d0a8',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _) {
    var f = t.C();
    f.NAME = 'videoDisplayMobileComponent';
    var h = f.extend(n);
    h._init = function (e, t) {
      this.__super(e, t);
      this._bodyNode = i._$getByClassName(this._rootNode, 'j-display')[0];
      this._replayNode = i._$getByClassName(this._bodyNode, 'j-replay')[0];
      this._bufferingNode = i._$getByClassName(this._bodyNode, 'j-buffering')[0];
      this._bufferingcNode = i._$getByClassName(this._bodyNode, 'j-bufferingc')[0];
      this._seekwrapNode = i._$getByClassName(this._bodyNode, 'j-seekwrap')[0];
      this._seekicNode = i._$getByClassName(this._seekwrapNode, 'j-seekic')[0];
      this._seekTimeNode = i._$getByClassName(this._seekwrapNode, 'j-seekwrap-time')[0];
      this._seekDurNode = i._$getByClassName(this._seekwrapNode, 'j-seekwrap-dur')[0];
      this._volumewrapNode = i._$getByClassName(this._bodyNode, 'j-volumewrap')[0];
      this._volumevconNode = i._$getByClassName(this._volumewrapNode, 'j-volume-vcon')[0];
      this._volumevbNode = i._$getByClassName(this._volumewrapNode, 'j-volume-vb')[0];
      this._volumevpNode = i._$getByClassName(this._volumewrapNode, 'j-volume-vp')[0];
      return this;
    };
    h._getTpl = function () {
      return e;
    };
    h.listNotificationInterests = function () {
      return [
        a.MAINVIDEO_STATE,
        a.MAINVIDEO_VIDEO_READY,
        a.MOVIEDATA_NEW,
        a.MAINVIDEO_VOLUME_INCREASE,
        a.MAINVIDEO_VOLUME_DECREASE,
        a.MAINVIDEO_SEEK_FORWARD,
        a.MAINVIDEO_SEEK_BACKWARD,
      ];
    };
    h.handleNotification = function (e) {
      this.__super(e);
      switch (e.getName()) {
        case a.MAINVIDEO_VIDEO_READY:
          this._handleVideoReady(e.getBody());
          break;
        case a.MOVIEDATA_NEW:
          this._handleNewmovie(e.getBody());
          break;
        case a.MAINVIDEO_STATE:
          this._handleVideoState(e.getBody());
          break;
        case a.MAINVIDEO_SEEK_FORWARD:
          this._handleSeekForward(e.getBody());
          break;
        case a.MAINVIDEO_SEEK_BACKWARD:
          this._handleSeekBackward(e.getBody());
          break;
        case a.MAINVIDEO_VOLUME_INCREASE:
        case a.MAINVIDEO_VOLUME_DECREASE:
          this._handleVolumeChange(e.getBody());
      }
    };
    h._handleNewmovie = function () {
      this._showLoading();
    };
    h._handleVideoReady = function (e) {
      this._initEvent(e);
    };
    h._handleVideoState = function (e) {
      this._state = e.newState;
      switch (this._state) {
        case r.MEDIA_STATE.IDLE:
          this._showIDLE();
          break;
        case r.MEDIA_STATE.PAUSE:
          this._showPause();
          break;
        case r.MEDIA_STATE.PLAYING:
          this._showPlaying();
          break;
        case r.MEDIA_STATE.BUFFERING:
          this._showLoading();
          break;
        case r.MEDIA_STATE.COMPLETE:
          this._showReplay();
      }
    };
    h._showIDLE = function () {
      this._bufferingNode.style.display = 'none';
      this._replayNode.style.display = 'none';
    };
    h._showPlaying = function () {
      this._bufferingNode.style.display = 'none';
      this._replayNode.style.display = 'none';
    };
    h._showPause = function () {
      this._bufferingNode.style.display = 'none';
      this._replayNode.style.display = 'none';
    };
    h._showLoading = function () {
      this._bufferingNode.style.display = 'block';
      this._replayNode.style.display = 'none';
      if (this._loadingInter) clearInterval(this._loadingInter);
      this._loadingInter = setInterval(
        function () {
          if (!this._loadingRotate) this._loadingRotate = 0;
          this._loadingRotate = this._loadingRotate >= 7 ? 0 : ++this._loadingRotate;
          var e = 'rotate(' + 45 * this._loadingRotate + 'deg)';
          var t =
            'display:block;-moz-transform:' + e + ';-o-transform:' + e + ';-ms-transform:' + e;
          this._bufferingcNode.style.cssText = t;
          this._bufferingcNode.style.webkitTransform = e;
        }._$bind(this),
        50,
      );
    };
    h._hideLoading = function () {
      if (this._loadingInter) clearInterval(this._loadingInter);
      this._bufferingNode.style.display = 'none';
    };
    h._showReplay = function () {
      if ('live' != this._config.mode) this._replayNode.style.display = 'block';
      this._hideLoading();
    };
    h._initEvent = function (e) {
      if (window.Hammer) {
        var t = e;
        var n = new Hammer(t);
        n.get('pan').set({ touchAction: 'auto' });
        n.on('panright', this._onPanRight._$bind(this));
        n.on('panleft', this._onPanLeft._$bind(this));
        n.on('panup', this._onPanUp._$bind(this));
        n.on('pandown', this._onPanDown._$bind(this));
        var i = new Hammer(this._replayNode);
        i.on('tap', this._onTapDisplay._$bind(this));
      } else o._$addEvent(this._bodyNode, 'click', this._onTapDisplay._$bind(this));
    };
    h._hengshuping = function () {
      if (180 == window.orientation || 0 == window.orientation) this._isShu = !0;
      else if (90 == window.orientation || window.orientation == -90) this._isShu = !1;
    };
    h._onTapDisplay = function () {
      if (this._state)
        switch (this._state) {
          case r.MEDIA_STATE.COMPLETE:
            this.sendNotification(a.VIEW_PLAY);
        }
    };
    h._onPanRight = function () {
      if (!this._isShowFk && !this._isShowVol) {
        this._isShowFk = !0;
        this.sendNotification(a.VIEW_SEEK_FORWARD);
      }
    };
    h._onPanLeft = function () {
      if (!this._isShowFk && !this._isShowVol) {
        this._isShowFk = !0;
        this.sendNotification(a.VIEW_SEEK_BACKWARD);
      }
    };
    h._onPanUp = function () {
      if (s.supportVolumeChange()) {
        if (this._isShowFk || this._isShowVol) return;
        this._isShowVol = !0;
        this.sendNotification(a.VIEW_VOLUME_INCREASE);
      }
    };
    h._onPanDown = function () {
      if (s.supportVolumeChange()) {
        if (this._isShowFk || this._isShowVol) return;
        this._isShowVol = !0;
        this.sendNotification(a.VIEW_VOLUME_DECREASE);
      }
    };
    h._handleSeekForward = function (e) {
      i._$delClassName(this._seekicNode, 'backward');
      i._$addClassName(this._seekicNode, 'forward');
      this._seekTimeNode.innerHTML = s.formatVideoTime(e.newData.position);
      this._seekDurNode.innerHTML = s.formatVideoTime(e.newData.duration);
      this._seekwrapNode.style.display = 'block';
      if (this._hideForwardTimout) clearTimeout(this._hideForwardTimout);
      this._hideForwardTimout = setTimeout(this._hideForwardSeek._$bind(this), 800);
    };
    h._handleSeekBackward = function (e) {
      i._$delClassName(this._seekicNode, 'forward');
      i._$addClassName(this._seekicNode, 'backward');
      this._seekTimeNode.innerHTML = s.formatVideoTime(e.newData.position);
      this._seekDurNode.innerHTML = s.formatVideoTime(e.newData.duration);
      this._seekwrapNode.style.display = 'block';
      if (this._hideBackwardTimout) clearTimeout(this._hideBackwardTimout);
      this._hideBackwardTimout = setTimeout(this._hideBackwardSeek._$bind(this), 800);
    };
    h._hideForwardSeek = function () {
      this._isShowFk = !1;
      this._seekwrapNode.style.display = 'none';
    };
    h._hideBackwardSeek = function () {
      this._isShowFk = !1;
      this._seekwrapNode.style.display = 'none';
    };
    h._handleVolumeChange = function (e) {
      this._volumewrapNode.style.display = 'block';
      i._$setStyle(
        this._volumevpNode,
        'bottom',
        this._volumevconNode.offsetHeight * e - this._volumevpNode.offsetHeight / 2 + 'px',
      );
      i._$setStyle(this._volumevbNode, 'height', this._volumevconNode.offsetHeight * e + 'px');
      if (this._hideVolumeTimout) clearTimeout(this._hideVolumeTimout);
      this._hideVolumeTimout = setTimeout(this._hideVolume._$bind(this), 1e3);
    };
    h._hideVolume = function () {
      this._isShowVol = !1;
      this._volumewrapNode.style.display = 'none';
    };
    return f;
  },
  'a8078e6fca4877637d2a70fd32e71e8a',
  'f6ea82878bd7d6947ad4b01eb6b35583',
  '39bdd394372a73feca94b5b3f04c5ad7',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'bf51392f0d61f79621004c6cf9b27b9f',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  '5d5746ddb90ed85fcd19a9bdbdf8c50a',
  'beec6201069596ecb83a09e5fc3eb415',
);
