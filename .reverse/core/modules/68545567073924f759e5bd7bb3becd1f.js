EDU(
  '68545567073924f759e5bd7bb3becd1f',
  function (e, t, n, i, o) {
    var a = e.C();
    var r = a.pro;
    r._init = function (e, t) {
      this.__name = e;
      this.__body = t;
      return this;
    };
    r.getName = function () {
      return this.__name;
    };
    r.getBody = function () {
      return this.__body;
    };
    r.setBody = function (e) {
      return this.__body;
    };
    r.toString = function () {
      var e = 'Notification Name:' + this.getName();
      e += ' Body:' + (!this.__body ? this.__body : this.__body.toString());
      return e;
    };
    return a;
  },
  'f6ea82878bd7d6947ad4b01eb6b35583',
);
