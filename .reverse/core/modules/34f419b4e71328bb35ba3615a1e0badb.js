EDU(
  '34f419b4e71328bb35ba3615a1e0badb',
  function (e, t, n, i, o, a) {
    var r = e.C();
    var s = r.pro;
    var c;
    s._init = function () {
      if (!c) {
        this.__componentMap = {};
        this.__observerMap = {};
        return this;
      }
    };
    s.registerObserver = function (e, t) {
      var n = this.__observerMap[e];
      if (n) n.push(t);
      else this.__observerMap[e] = [t];
    };
    s.notifyObservers = function (e) {
      if (this.__observerMap[e.getName()]) {
        var t = this.__observerMap[e.getName()];
        var n = [];
        var i;
        for (var o = 0; o < t.length; o++) {
          i = t[o];
          n.push(i);
        }
        for (o = 0; o < n.length; o++) {
          i = n[o];
          i.notifyObserver(e);
        }
      }
    };
    s.removeObserver = function (e, t) {
      var n = this.__observerMap[e];
      for (var i = 0; i < n.length; i++)
        if (n[i].context === t) {
          n.splice(i, 1);
          break;
        }
      if (0 == n.length) delete this.__observerMap[e];
    };
    s.hasComponent = function (e) {
      return !!this.__componentMap[e];
    };
    s.registerComponent = function (e) {
      if (!this.__componentMap[e.getName()]) {
        this.__componentMap[e.getName()] = e;
        var n = e.listNotificationInterests();
        if (n && n.length > 0) {
          var i = new t(e.handleNotification, e);
          for (var o = 0; o < n.length; o++) this.registerObserver(n[o], i);
        }
        e.onRegister();
      }
    };
    s.retrieveComponent = function (e) {
      return this.__componentMap[e];
    };
    s.removeComponent = function (e) {
      var t = this.__componentMap[e];
      if (t) {
        var n = t.listNotificationInterests();
        for (var i = 0; i < n.length; i++) this.removeObserver(n[i], t);
        delete this.__componentMap[e];
        t.onRemove();
      }
      return t;
    };
    return r;
  },
  'f6ea82878bd7d6947ad4b01eb6b35583',
  '159c41f99a9d6e53a8f9612d9fe8f083',
);
