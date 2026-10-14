EDU(
  '39bdd394372a73feca94b5b3f04c5ad7',
  function (e, t, n, i, o, a, r, s, c, d, l, u, _) {
    var f = e.C();
    var h = f.pro;
    f.NAME = 'component';
    f.componentContainer = null;
    h._init = function (e, t) {
      this._name = this.constructor.NAME;
      this._container = this.constructor.componentContainer;
      this._config = e;
      this._player = t;
      this._rootNode = e.rootNode;
      this._initComponetNode(e);
      return this;
    };
    h._getTpl = function () {
      return '';
    };
    h._initComponetNode = function (e) {
      if (e.rootNode)
        if (this._getTpl())
          e.rootNode.appendChild(
            r._$getNodeTemplate(r._$addNodeTemplate(s._$get(s._$add(this._getTpl()), { lang: c }))),
          );
    };
    h.getName = function () {
      return this._name;
    };
    h.listNotificationInterests = function () {
      return [];
    };
    h.handleNotification = function (e) {};
    h.sendNotification = function (e, t) {
      var n = new o(e, t);
      this._container.notifyObservers(n);
    };
    h.onRegister = function () {};
    h.onRemove = function () {};
    h.log = function (e, t) {
      this.sendNotification(a.LOG, { content: e, type: t });
    };
    return f;
  },
  'f6ea82878bd7d6947ad4b01eb6b35583',
  '6a1b8bf06e49c82c181d1d76a6fd580c',
  '3f8f347c9171583dc1295dc796e8a1bf',
  '34f419b4e71328bb35ba3615a1e0badb',
  '68545567073924f759e5bd7bb3becd1f',
  'bf51392f0d61f79621004c6cf9b27b9f',
  'fc2697b2e0ea24c0b604d47b39f64437',
  '41a9749ffeb01bbc50889fe3e85ada4f',
  'ff1c5e9840f717fea21797b5071706db',
);
