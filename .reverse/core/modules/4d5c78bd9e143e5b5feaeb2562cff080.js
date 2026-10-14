EDU(
  '4d5c78bd9e143e5b5feaeb2562cff080',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _) {
    var f = t.C(),
      h = f.extend(n);
    f.NAME = 'videoControlMobileLiveComponent';
    h._init = function (e, t) {
      this.__super(e, t);
      this._timmer = null;
      this._bodyNode = i._$getByClassName(this._rootNode, 'j-mliveControlwrap')[0];
      this._pausePlayBtnNode = i._$getByClassName(this._bodyNode, 'j-pausePlayBtn')[0];
      this._reloadBtnNode = i._$getByClassName(this._bodyNode, 'j-reloadBtn')[0];
      this._fullScreenBtnNode = i._$getByClassName(this._bodyNode, 'j-fullScreenBtn')[0];
      this._livehNode = i._$getByClassName(this._bodyNode, 'j-liveh')[0];
      this._livepNode = i._$getByClassName(this._bodyNode, 'j-livep')[0];
      this._initEvent();
      this._controlBarAutoDisplay();
      return this;
    };
    h._getTpl = function () {
      return e;
    };
    h.listNotificationInterests = function () {
      return [a.MOVIEDATA_READY, a.MAINVIDEO_STATE, a.BOX_FULLSCREEN_CHANGE];
    };
    h.handleNotification = function (e) {
      var t = e.getBody();
      this.__super(e);
      switch (e.getName()) {
        case a.MOVIEDATA_READY:
          this._showLiveInfo(t);
          break;
        case a.MAINVIDEO_STATE:
          this._togglePlayState(t);
          break;
        case a.BOX_FULLSCREEN_CHANGE:
          this._toggleFullscreen(t);
      }
    };
    h._showLiveInfo = function (e) {
      if (e.liveTitle) this._livehNode.innerText = e.liveTitle;
      if (e.liveStartTime && e.liveEndTime)
        this._livepNode.innerText = s.formatLiveTime(e.liveStartTime, e.liveEndTime);
    };
    h._togglePlayState = function (e) {
      if ('PLAYING' == e.newState) {
        if (i._$hasClassName(this._pausePlayBtnNode, 'active')) return;
        i._$addClassName(this._pausePlayBtnNode, 'active');
      } else if ('PAUSED' == e.newState) i._$delClassName(this._pausePlayBtnNode, 'active');
    };
    h._toggleFullscreen = function (e) {
      if (e) i._$addClassName(this._fullScreenBtnNode, 'active');
      else i._$delClassName(this._fullScreenBtnNode, 'active');
    };
    h._controlBarAutoDisplay = function () {
      var e = this;
      clearTimeout(this._timmer);
      this._timmer = setTimeout(function () {
        if (!i._$hasClassName(e._bodyNode, 'f-vh')) i._$addClassName(e._bodyNode, 'f-vh');
      }, 5e3);
    };
    h._initEvent = function () {
      var e = this,
        t = new Hammer(this._pausePlayBtnNode),
        n = new Hammer(this._reloadBtnNode),
        o = new Hammer(this._fullScreenBtnNode),
        r = new Hammer(this._bodyNode),
        s = new Hammer(this._rootNode);
      r.on(
        'tap',
        function (e) {
          e.srcEvent.cancelBubble = !0;
        },
        !1,
      );
      t.on('tap', function (t) {
        if (!i._$hasClassName(e._pausePlayBtnNode, 'active')) e.sendNotification(a.VIEW_PLAY);
        else e.sendNotification(a.VIEW_PAUSE);
      });
      n.on('tap', function (t) {
        e.sendNotification(a.VIEW_RELOAD);
      });
      o.on('tap', function (t) {
        e.sendNotification(a.VIEW_FULLSCREEN);
      });
      s.on('tap', function (t) {
        if (i._$hasClassName(e._bodyNode, 'f-vh')) {
          i._$delClassName(e._bodyNode, 'f-vh');
          e._controlBarAutoDisplay();
        } else {
          i._$addClassName(e._bodyNode, 'f-vh');
          clearTimeout(this._timmer);
        }
      });
    };
    return f;
  },
  '26eec5569d0bfc9512eb93e642b53a1f',
  'f6ea82878bd7d6947ad4b01eb6b35583',
  '39bdd394372a73feca94b5b3f04c5ad7',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'bf51392f0d61f79621004c6cf9b27b9f',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  '5d5746ddb90ed85fcd19a9bdbdf8c50a',
  'beec6201069596ecb83a09e5fc3eb415',
);
