EDU(
  'c71f4fc01e6f58a7959dc227b6cbdb5c',
  function (e, t, n, i, o, a, r) {
    var s = e._$klass();
    r = s.prototype;
    r.__init = function (e, n) {
      t.extend(this, { prefix: '' });
      this.eventList = this.getEventList();
      this.exportsEventName(n, this.eventList);
    };
    r.exec = function (e) {
      var t = this.eventList;
      for (var n = 0; n < t.length; n++)
        if (t[n].match(e)) {
          t[n].handle(e);
          return t[n];
        }
      return null;
    };
    r.getEventList = function () {
      var e = [],
        t = i.YXTYPES;
      for (var n = 0; n < t.length; n++)
        e = e.concat(this.formatEventList(this[t[n] + 'List'](), t[n]));
      return e;
    };
    r.formatEventList = function (e, t) {
      for (var n = 0; n < e.length; n++) e[n] = this.formatEvent(e[n], t);
      return e;
    };
    r.formatEvent = function (e, t) {
      if ('string' == typeof e) e = { name: e, type: t };
      else e.type = t;
      e.prefix = this.prefix;
      e.customType = this.customType;
      return new o.MsgEvent(e);
    };
    r.exportsEventName = function (e, n) {
      if (e)
        for (var i = 0, o; i < n.length; i++) {
          o = n[i].type.toUpperCase();
          e[o] || (e[o] = {});
          e[o][t.constlize(n[i].name)] = n[i].eventName;
        }
    };
    r.textList = function () {
      return [];
    };
    r.imageList = function () {
      return [];
    };
    r.audioList = function () {
      return [];
    };
    r.videoList = function () {
      return [];
    };
    r.fileList = function () {
      return [];
    };
    r.geoList = function () {
      return [];
    };
    r.customList = function () {
      return [];
    };
    r.robotList = function () {
      return [];
    };
    r.tipList = function () {
      return [];
    };
    r.notificationList = function () {
      return [];
    };
    a.Processor = s;
  },
  'f1c1923e72a7bf464958899fa52f322f',
  '06a1fe998ca2ede601d4740c114f6c3c',
  '455721c4796cc9bc7e22b59924dbe89d',
  'aa4573f12aff14ef5eb071010a13bcd5',
  '6182651a6f54d23eace06c6446bb3dcb',
);
