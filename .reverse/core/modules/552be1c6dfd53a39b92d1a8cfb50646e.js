EDU(
  '552be1c6dfd53a39b92d1a8cfb50646e',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f, h, p) {
    var m = t.C();
    m.NAME = 'popMenuComponent';
    var g = m.extend(i);
    g._init = function (e, t) {
      this.__super(e, t);
      this._bodyNode = o._$getByClassName(this._rootNode, 'j-popmenu')[0];
      this._itemNodes = o._$getByClassName(this._rootNode, 'j-item');
      a._$addEvent(this._rootNode, 'contextmenu', this._showMenu._$bind(this));
      a._$addEvent(this._rootNode, 'click', this._hideMenu._$bind(this));
      a._$addEvent(this._itemNodes[1], 'click', this._showLog._$bind(this));
      this._itemNodes[0].innerText = 'eduPlayer v' + u.version;
      return this;
    };
    g._getTpl = function () {
      return e;
    };
    g.listNotificationInterests = function () {
      return [];
    };
    g.handleNotification = function (e) {
      this.__super(e);
    };
    g._handleMoviedataReady = function (e) {};
    g._showMenu = function (e) {
      e && a._$stopDefault(e);
      var t = a._$pageX(e);
      var n = a._$pageY(e);
      var i = o._$offset(this._rootNode);
      this._bodyNode.style.top = n - i.y + 'px';
      this._bodyNode.style.left = t - i.x + 'px';
      o._$addClassName(this._bodyNode, 'z-show');
    };
    g._hideMenu = function (e) {
      o._$delClassName(this._bodyNode, 'z-show');
    };
    g._showLog = function () {
      this.sendNotification(r.VIEW_SHOW_LOG);
    };
    return m;
  },
  '84f742d784b2cb94992a6928273a4142',
  'f6ea82878bd7d6947ad4b01eb6b35583',
  'fe86216ed59e3103a56c42c850d389f0',
  '39bdd394372a73feca94b5b3f04c5ad7',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  'bf51392f0d61f79621004c6cf9b27b9f',
  'fc9e7b2df7d5209e7c2e8eb574f85527',
  'beec6201069596ecb83a09e5fc3eb415',
  '08622373b135f6f5d332b3d98d0782c9',
  'd179f49516aae67e50a0eac61529d79c',
  '02cb44d0a9c204ff49c6feea3ac8b74d',
);
