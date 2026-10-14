EDU(
  '1a228bb0cf4273cf344c18e299ffc8db',
  function (e, t, n, i, o, a, r, s, c, d, l, u) {
    var _ = e.C();
    _.NAME = 'boxComponent';
    var f = _.extend(o);
    f._init = function (e, t) {
      this.__super(e, t);
      this._x5Fullscreen = e.x5Fullscreen;
      return this;
    };
    f.listNotificationInterests = function () {
      return [a.VIEW_FULLSCREEN];
    };
    f.handleNotification = function (e) {
      this.__super(e);
      switch (e.getName()) {
        case a.VIEW_FULLSCREEN:
          this._handleViewFullscreen(e.getBody());
      }
    };
    f._handleViewFullscreen = function (e) {
      if (!this._config.notAllowFullScreen)
        if (!this._config.notNeedFullscreen)
          if (this._isFullScreenMode) this._existfullScreen();
          else this._enterfullScreen();
        else {
          this.sendNotification(a.BOX_FULLSCREEN_CHANGE, !this._getfullScreenState());
          this._notNeedFullscreenModeAddEvent();
        }
    };
    f._getfullScreenState = function () {
      if (void 0 !== document.fullscreen) return document.fullscreen;
      else if (void 0 !== document.webkitIsFullScreen) return document.webkitIsFullScreen;
      else if (void 0 !== document.mozFullScreen) return document.mozFullScreen;
      else return this._isFullScreenMode;
    };
    f._enterfullScreen = function () {
      this._isFullScreenMode = !0;
      if (!this._hasBindFullscreenchange) {
        document.onfullscreenchange = this._onfullScreenChange.bind(this);
        document.onwebkitfullscreenchange = this._onfullScreenChange.bind(this);
        document.onmozfullscreenchange = this._onfullScreenChange.bind(this);
        this._hasBindFullscreenchange = !0;
      }
      if (e.isFunction(this._rootNode.requestFullScreen)) this._rootNode.requestFullScreen();
      else if (e.isFunction(this._rootNode.webkitRequestFullScreen)) {
        s.log('webkitRequestFullScreen');
        if (r._$isWeixin() && r._$isAndroid() && this._x5Fullscreen) {
          s.log('_x5Fullscreen');
          var t = document.querySelector('.j-mainVideo video');
          i._$attr(t, 'x5-video-orientation', 'landscape');
          i._$addClassName(document.body, 'z-x5-video-fullscreen-landscape');
          setTimeout(function () {
            t.style.width = window.screen.width + 'px';
            t.style.width = window.screen.height + 'px';
          });
        } else this._rootNode.webkitRequestFullScreen();
      } else if (e.isFunction(this._rootNode.mozRequestFullScreen))
        this._rootNode.mozRequestFullScreen();
      else if (
        this._container
          .retrieveComponent('mainVideoComponent')
          ._videoMediaIns.canFullscreenVideo() &&
        r._$isMobileAll()
      ) {
        s.log('_enterVideoFullWindow');
        this._enterVideoFullWindow();
      } else this._enterfullWindow();
    };
    f._existfullScreen = function () {
      var t = !0;
      if (!this._isFullScreenMode) t = !1;
      this._isFullScreenMode = !1;
      if (e.isFunction(document.exitFullscreen)) {
        var n = document.exitFullscreen();
        n &&
          n['catch'] &&
          n['catch'](function (e) {
            console.log(e);
          });
      } else if (e.isFunction(document.webkitCancelFullScreen))
        if (r._$isWeixin() && r._$isAndroid() && this._x5Fullscreen) {
          var i = document.querySelector('.j-mainVideo video');
          i.setAttribute('x5-video-orientation', 'portrait');
          setTimeout(
            function () {
              i.style.width = window.screen.width + 'px';
              i.style.width = window.screen.height + 'px';
            }._$bind(this),
          );
        } else document.webkitCancelFullScreen();
      else if (e.isFunction(document.mozCancelFullScreen)) document.mozCancelFullScreen();
      else this._existfullWindow();
      return t;
    };
    f._enterfullWindow = function () {
      n._$addEvent(document, 'keydown', this._fullWindowOnEscKey.bind(this));
      i._$addClassName(document.body, 'u-edu-h5player-bodyfullWindow');
      i._$addClassName(this._rootNode, 'u-edu-h5player-fullWindow');
      this.sendNotification(a.BOX_FULLSCREEN_CHANGE, this._isFullScreenMode);
    };
    f._existfullWindow = function () {
      n._$delEvent(document, 'keydown', this._fullWindowOnEscKey.bind(this));
      i._$delClassName(document.body, 'u-edu-h5player-bodyfullWindow');
      i._$delClassName(this._rootNode, 'u-edu-h5player-fullWindow');
      this.sendNotification(a.BOX_FULLSCREEN_CHANGE, this._isFullScreenMode);
    };
    f._enterVideoFullWindow = function () {
      this._isFullScreenMode = !1;
      this._container.retrieveComponent('mainVideoComponent')._videoMediaIns.fullscreenVideo();
      this.sendNotification(a.BOX_FULLSCREEN_CHANGE, this._isFullScreenMode);
    };
    f._onfullScreenChange = function (e) {
      this._isFullScreenMode = this._getfullScreenState();
      this.sendNotification(a.BOX_FULLSCREEN_CHANGE, this._isFullScreenMode);
    };
    f._fullWindowOnEscKey = function (t) {
      t = e.getEvent(t);
      if (27 === t.keyCode) if (1 == this._isFullScreenMode) this._existfullScreen();
    };
    f._notNeedFullscreenModeAddEvent = function () {
      if (!this._hasBindFullscreenchange) {
        document.onfullscreenchange = this._onfullScreenChange.bind(this);
        document.onwebkitfullscreenchange = this._onfullScreenChange.bind(this);
        document.onmozfullscreenchange = this._onfullScreenChange.bind(this);
        this._hasBindFullscreenchange = !0;
      }
    };
    return _;
  },
  'f6ea82878bd7d6947ad4b01eb6b35583',
  'fe86216ed59e3103a56c42c850d389f0',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '39bdd394372a73feca94b5b3f04c5ad7',
  'bf51392f0d61f79621004c6cf9b27b9f',
  'beec6201069596ecb83a09e5fc3eb415',
  'fb7ea872222351a1a18d727c3cc70c47',
);
