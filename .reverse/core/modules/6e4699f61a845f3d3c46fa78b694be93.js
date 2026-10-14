EDU(
  '6e4699f61a845f3d3c46fa78b694be93',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f, h, p) {
    var m = a.C();
    m.NAME = 'errorComponent';
    var g = m.extend(r);
    g._init = function (e, t) {
      this.__super(e, t);
      this._expireTime = new Date().getTime() + 144e5;
      this._bodyNode = n._$getByClassName(this._rootNode, 'j-error')[0];
      this._errorTxtNode = n._$getByClassName(this._bodyNode, 'j-error-txt')[0];
      return this;
    };
    g._getTpl = function () {
      if (!d._$isMobileAll()) return e;
      else return t;
    };
    g.listNotificationInterests = function () {
      return [s.MOVIEDATA_READY, s.MAINVIDEO_START_LOAD, s.MOVIEDATA_ERROR, s.MAINVIDEO_ERROR];
    };
    g.handleNotification = function (e) {
      this.__super(e);
      switch (e.getName()) {
        case s.MOVIEDATA_READY:
          this._handleMoviedataReady(e.getBody());
          break;
        case s.MAINVIDEO_START_LOAD:
          this._handleMainvideoStartLoad(e.getBody());
          break;
        case s.MOVIEDATA_ERROR:
          this._showError(e.getBody(), !0);
          break;
        case s.MAINVIDEO_ERROR:
          this._showError(e.getBody());
      }
    };
    g._buidView = function () {};
    g._initEvent = function () {
      this._reloadBtnNode = n._$getByClassName(this._bodyNode, 'j-error-reload')[0];
      if (this._reloadBtnNode)
        if (window.Hammer) {
          var e = new Hammer(this._reloadBtnNode);
          e.on('tap', this._onClickReload._$bind(this));
        } else i._$addEvent(this._reloadBtnNode, 'click', this._onClickReload._$bind(this));
    };
    g._handleMoviedataReady = function (e) {
      if ('live' == this._config.mode) this._lines = e.lines;
    };
    g._handleMainvideoStartLoad = function (e) {
      this._bodyNode.style.display = 'none';
    };
    g._onClickReload = function () {
      window.location.reload();
    };
    g._showError = function (e, t) {
      var i = navigator.connection;
      if (o._$isObject(e)) e = e.code;
      var a = c.ERROR_TXT[e + ''] + '[code:' + e + ']';
      var r = Number(e) > 6 && this._lines && this._lines.length > 1;
      var s = Number(e) > 6;
      if (new Date().getTime() >= this._expireTime && 'live' != this._config.mode)
        a = u.KEY_VIDEO_PAGE_EXPIRED + ' <a class="j-error-reload">' + u.KEY_VIDEO_RELOAD + '</a>';
      else if (s) {
        var d = '<a href="//www.google.cn/chrome/" target="_blank">下载使用chrome最新浏览器</a>';
        a = a + u.KEY_VIDEO_TRY + (r ? u.KEY_VIDEO_SWITCH : '') + d;
      }
      this._errorTxtNode.innerHTML = a;
      this._initEvent();
      if (t) {
        n._$addClassName(this._bodyNode, 'z-disall');
        n._$delClassName(this._bodyNode, 'z-dis');
      } else {
        n._$delClassName(this._bodyNode, 'z-disall');
        n._$addClassName(this._bodyNode, 'z-dis');
      }
      this._bodyNode.style.display = 'block';
    };
    return m;
  },
  '70d263febba388c6752e27afc8a5e8fb',
  '9040499426bea737fd5e5bd4edd9b216',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'fe86216ed59e3103a56c42c850d389f0',
  'f6ea82878bd7d6947ad4b01eb6b35583',
  '39bdd394372a73feca94b5b3f04c5ad7',
  'bf51392f0d61f79621004c6cf9b27b9f',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  'beec6201069596ecb83a09e5fc3eb415',
  'f7155d88aabc058cab24982e3c3671cc',
  'ff1c5e9840f717fea21797b5071706db',
);
