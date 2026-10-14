EDU(
  '12ae07c790f722e4c20eab5c8922d5fc',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f) {
    var h = n.C();
    h.NAME = 'videoCoverComponent';
    var p = h.extend(i);
    p._init = function (e, t) {
      this.__super(e, t);
      this._bodyNode = o._$getByClassName(this._rootNode, 'j-cover')[0];
      this._coverimgNode = o._$getByClassName(this._bodyNode, 'j-coverimg')[0];
      this._initEvent();
      return this;
    };
    p._getTpl = function () {
      if (!c.isMobileNotIncludeIPad()) return e;
      else return t;
    };
    p.listNotificationInterests = function () {
      return [r.MOVIEDATA_READY, r.MAINVIDEO_STATE];
    };
    p.handleNotification = function (e) {
      this.__super(e);
      switch (e.getName()) {
        case r.MOVIEDATA_READY:
          this._handleReady(e.getBody());
          break;
        case r.MAINVIDEO_STATE:
          this._handleVideoState(e.getBody());
      }
    };
    p._handleReady = function (e) {
      if (!this._config.autoStart && !this._config.isPreload) {
        this._bodyNode.style.display = 'block';
        if (e.posterUrl)
          setTimeout(
            function () {
              this._loadCover(e.posterUrl);
            }._$bind(this),
            0,
          );
      }
    };
    p._handleVideoState = function (e) {
      switch (e.newState) {
        case s.MEDIA_STATE.PLAYING:
        case s.MEDIA_STATE.BUFFERING:
          this._bodyNode.style.display = 'none';
      }
    };
    p._initEvent = function () {
      if (d._$isMobileAll() && window.Hammer) {
        var e = new Hammer(this._bodyNode);
        e.on('tap', this._onTapCover._$bind(this));
      } else a._$addEvent(this._bodyNode, 'click', this._onClickCover._$bind(this));
    };
    p._onClickCover = function () {
      this._bodyNode.style.display = 'none';
      this.sendNotification(r.VIEW_LOAD);
    };
    p._onTapCover = function () {
      var e = navigator.connection ? navigator.connection.type : null;
      if (e && 'cellular' == e) {
        if (confirm('正在使用移动网络，播放可能会产生流量费用，是否继续？')) {
          this._bodyNode.style.display = 'none';
          this.sendNotification(r.VIEW_LOAD);
        }
      } else {
        this._bodyNode.style.display = 'none';
        this.sendNotification(r.VIEW_LOAD);
      }
    };
    p._loadCover = function (e) {
      c.imgReady(e, function () {}, this._cbloadCover._$bind(this));
    };
    p._cbloadCover = function (e) {
      var t, n;
      var i, a;
      var r, s;
      i = this._bodyNode.offsetWidth;
      a = this._bodyNode.offsetHeight;
      r = i / a;
      s = e.width / e.height;
      if (r >= s) {
        n = a;
        t = n * s;
      } else {
        t = i;
        n = t / s;
      }
      o._$setStyle(this._coverimgNode, 'width', t + 'px');
      o._$setStyle(this._coverimgNode, 'height', n + 'px');
      o._$setStyle(this._coverimgNode, 'margin-left', '-' + t / 2 + 'px');
      o._$setStyle(this._coverimgNode, 'margin-top', '-' + n / 2 + 'px');
      this._coverimgNode.src = e.src;
    };
    return h;
  },
  'eb9b7c4c71efa82b0ff8d154c18b23c3',
  'b984053d0becbcc2b533fb238fdc6a1a',
  'f6ea82878bd7d6947ad4b01eb6b35583',
  '39bdd394372a73feca94b5b3f04c5ad7',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'bf51392f0d61f79621004c6cf9b27b9f',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  '5d5746ddb90ed85fcd19a9bdbdf8c50a',
  'beec6201069596ecb83a09e5fc3eb415',
);
