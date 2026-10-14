EDU(
  '17484da2f2f147771f9d3694c13f2ba4',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _, f, h, p) {
    var m = i.C();
    var g = m.pro;
    g._init = function (i) {
      this.__playerConfig = t._$merge({}, i);
      s.init(this.__playerConfig);
      this.__playerConfig.parent.innerHTML = e;
      this.__playerConfig.rootNode = n._$getChildren(this.__playerConfig.parent)[0];
      this._doConfig(
        i,
        function () {
          this.__componentContainer = new r();
          this.__componentList = a.get(this.__playerConfig);
          t._$forIn(
            this.__componentList,
            function (e, t) {
              e.componentContainer = this.__componentContainer;
              this.__componentContainer.registerComponent(new e(this.__playerConfig, this));
            }._$bind(this),
          );
          this._isReady = !0;
          this.__componentContainer.notifyObservers(new d(l.VIEW_READY));
          if (this._readyCallBacks) {
            for (var e = 0; e < this._readyCallBacks.length; e++) this._readyCallBacks[e]();
            delete this._readyCallBacks;
          }
        }._$bind(this),
      );
      return this;
    };
    g.ready = function (e) {
      if (this._isReady) e && e();
      else {
        this._readyCallBacks = this._readyCallBacks || [];
        this._readyCallBacks.push(e);
      }
    };
    g._doConfig = function (e, t) {
      if (u._$isMobileAll()) this.__playerConfig.beforePlay = !1;
      else this.__playerConfig.beforePlay = !0;
      c.supportAutoPlay(
        e,
        function (e) {
          if (this.__playerConfig.autoStart)
            if (e) this.__playerConfig.isPreload = !1;
            else {
              this.__playerConfig.autoStart = !1;
              this.__playerConfig.isPreload = !0;
            }
          if ('live' == this.__playerConfig.mode || u._$isMobileAll())
            this.__playerConfig.isPreload = !1;
          if (this.__playerConfig.useNative) this.__playerConfig.autoStart = !0;
          t();
        }._$bind(this),
      );
    };
    g.destory = function () {
      t._$forEach(
        this.__componentList,
        function (e, t) {
          this.__componentContainer.removeComponent(e.NAME);
        }._$bind(this),
      );
      this.__playerConfig.parent.removeChild(this.__playerConfig.rootNode);
    };
    m.extend = function (e) {
      a.add(e);
    };
    m.createComponent = function (e) {
      var t = i.C();
      t.NAME = e;
      t.extend(o);
      return t;
    };
    return m;
  },
  '74ff5e1562eb37ee1bb284612260e99c',
  'fe86216ed59e3103a56c42c850d389f0',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  'f6ea82878bd7d6947ad4b01eb6b35583',
  '39bdd394372a73feca94b5b3f04c5ad7',
  '36cf3daba8bd3958bf230dc3ddbfcbec',
  '34f419b4e71328bb35ba3615a1e0badb',
  'fb7ea872222351a1a18d727c3cc70c47',
  '5d5746ddb90ed85fcd19a9bdbdf8c50a',
  '68545567073924f759e5bd7bb3becd1f',
  'bf51392f0d61f79621004c6cf9b27b9f',
  'beec6201069596ecb83a09e5fc3eb415',
);
