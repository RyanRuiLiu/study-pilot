EDU(
  '2a3363306c3b5897063a0cac42f320ca',
  function (e) {
    var t = e._$klass();
    var n = t.prototype;
    var i = window;
    n.__init = function (e) {
      if ('function' == typeof e.cb) {
        this.cb = e.cb;
        this.interval = e.interval || 1e3;
        this.autoStart = !!e.autoStart;
        this.continues = !e.times || isNaN(e.times);
        this.times = this.continues ? 0 : e.times;
        this.active = !1;
        this.timeout = null;
        if (this.autoStart) this.startTimer();
      }
    };
    n.setTimer = function () {
      var e = this;
      var t = function () {
        if (e.times > 0 || e.continues) e._runTimer();
        if (e.times > 0) e.times--;
      };
      this.timeout = i.setTimeout(t, this.interval);
    };
    n.clearTimer = function () {
      i.clearTimeout(this.timeout);
    };
    n.stopTimer = function () {
      this.active = !1;
      this.clearTimer();
    };
    n.startTimer = function () {
      this.active = !0;
      this.setTimer();
    };
    n._runTimer = function () {
      if (this.active) {
        try {
          this.cb();
        } catch (e) {
          console.log('Timer callback running error' + e);
        }
        this.setTimer();
      }
    };
    return t;
  },
  'f1c1923e72a7bf464958899fa52f322f',
);
