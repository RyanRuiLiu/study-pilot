EDU(
  '82d8e9ab89ae731ef63d88419d9bb26a',
  function (e, t, n, i, o, a, r, s, c, d, l, u) {
    var _ = t.C();
    _.NAME = 'videoDisplayComponent';
    var f = _.extend(n);
    f._init = function (e, t) {
      this.__super(e, t);
      this._bodyNode = i._$getByClassName(this._rootNode, 'j-display')[0];
      this._statewrapNode = i._$getByClassName(this._bodyNode, 'j-statewrap')[0];
      this._replayNode = i._$getByClassName(this._bodyNode, 'j-replay')[0];
      this._bufferingNode = i._$getByClassName(this._bodyNode, 'j-buffering')[0];
      this._initEvent();
      this._canShowState = !0;
      return this;
    };
    f._getTpl = function () {
      return e;
    };
    f.listNotificationInterests = function () {
      return [a.MAINVIDEO_STATE, a.MOVIEDATA_NEW, a.VIDEO_CONTROL_SHOW, a.VIDEO_CONTROL_HIDE];
    };
    f.handleNotification = function (e) {
      this.__super(e);
      switch (e.getName()) {
        case a.MOVIEDATA_NEW:
          this._handleNewmovie(e.getBody());
          break;
        case a.MAINVIDEO_STATE:
          this._handleVideoState(e.getBody());
          break;
        case a.VIDEO_CONTROL_SHOW:
          i._$delClassName(this._bodyNode, 'f-cn');
          break;
        case a.VIDEO_CONTROL_HIDE:
          i._$addClassName(this._bodyNode, 'f-cn');
      }
    };
    f._handleNewmovie = function () {
      this._showLoading();
    };
    f._handleVideoState = function (e) {
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
    f._showIDLE = function () {
      this._statewrapNode.style.display = 'none';
    };
    f._showPlaying = function () {
      this._statewrapNode.style.display = 'none';
    };
    f._showLoading = function () {
      this._statewrapNode.style.display = 'block';
      this._replayNode.style.display = 'none';
      if (this._loadingInter) clearInterval(this._loadingInter);
      this._loadingInter = setInterval(
        function () {
          if (!this._loadingRotate) this._loadingRotate = 0;
          this._loadingRotate = this._loadingRotate >= 7 ? 0 : ++this._loadingRotate;
          var e = 'rotate(' + 45 * this._loadingRotate + 'deg)';
          this._bufferingNode.style.display = 'block';
          this._bufferingNode.style['-moz-transform'] = e;
          this._bufferingNode.style['-o-transform'] = e;
          this._bufferingNode.style['-ms-transform'] = e;
          this._bufferingNode.style.webkitTransform = e;
        }._$bind(this),
        50,
      );
    };
    f._hideLoading = function () {
      if (this._loadingInter) clearInterval(this._loadingInter);
      this._bufferingNode.style.display = 'none';
    };
    f._showReplay = function () {
      if ('live' == this._config.mode);
      else {
        this._statewrapNode.style.display = 'block';
        this._replayNode.style.display = 'block';
        this._hideLoading();
      }
    };
    f._showPause = function () {
      this._statewrapNode.style.display = 'none';
      this._hideLoading();
      this._replayNode.style.display = 'none';
    };
    f._initEvent = function () {
      o._$addEvent(this._bodyNode, 'click', this._onClickDisplay._$bind(this));
      o._$addEvent(this._bodyNode, 'dblclick', this._ondblClickDisplay._$bind(this));
    };
    f._onClickDisplay = function () {
      if (!s._$isMobileAll()) {
        this._isDblClick = !1;
        setTimeout(
          function () {
            if (!this._isDblClick)
              if (this._state)
                switch (this._state) {
                  case r.MEDIA_STATE.IDLE:
                    break;
                  case r.MEDIA_STATE.COMPLETE:
                  case r.MEDIA_STATE.PAUSE:
                    this.sendNotification(a.VIEW_PLAY);
                    break;
                  case r.MEDIA_STATE.PLAYING:
                    this.sendNotification(a.VIEW_PAUSE);
                }
          }._$bind(this),
          200,
        );
      }
    };
    f._ondblClickDisplay = function () {
      this._isDblClick = !0;
      this.sendNotification(a.VIEW_FULLSCREEN);
    };
    return _;
  },
  '38492dc3334f7ef43592c3e293890205',
  'f6ea82878bd7d6947ad4b01eb6b35583',
  '39bdd394372a73feca94b5b3f04c5ad7',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'bf51392f0d61f79621004c6cf9b27b9f',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  'beec6201069596ecb83a09e5fc3eb415',
);
