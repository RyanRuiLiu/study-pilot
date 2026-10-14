EDU(
  '159c41f99a9d6e53a8f9612d9fe8f083',
  function (e, t, n, i, o) {
    var a = e.C();
    var r = a.pro;
    r._init = function (e, t) {
      this.__notify = e;
      this.__context = t;
      return this;
    };
    r.setNotifyMethod = function (e) {
      this.__notify = e;
    };
    r.setNotifyContext = function (e) {
      this.__context = e;
    };
    r.notifyObserver = function (e) {
      this.__notify.apply(this.__context, [e]);
    };
    return a;
  },
  'f6ea82878bd7d6947ad4b01eb6b35583',
);
