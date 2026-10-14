EDU(
  'a8aeb51224a4b765d594d93d4a3cfe37',
  function (e, t) {
    var n = e.$extends({
      config: function () {
        t.extend(this, { settingKey: 'component-clock' });
        t.extend(this.data, { time: 0, interval: 1e3, title: '' });
        this.$watch('time', function (e) {
          var t = Math.floor(+e / 60);
          this.data.resttime = +e;
          this.data.allresttime = +e;
          this.data.allminute = this.formatTime(t % 60);
          this.data.allhour = this.formatTime(Math.floor(t / 60));
          this.data.allsecond = this.formatTime(e % 60);
          this.data.startTime = +new Date();
          this.data.used = 0;
        });
        this.$watch('resttime', function (e) {
          var t = Math.floor(e / 60);
          this.data.minute = this.formatTime(t % 60);
          this.data.hour = this.formatTime(Math.floor(t / 60));
          this.data.second = this.formatTime(Math.floor(+e % 60));
        });
      },
      init: function () {
        this.supr();
      },
      destroy: function () {
        this.supr();
      },
      formatTime: function (e) {
        e = '' + e;
        var t = e;
        if ('0' == e) t = '00';
        if (1 == e.length) t = '0' + e;
        return t;
      },
      setTime: function (e) {
        this.data.resttime = e;
        this.data.allresttime = e;
        this.data.startTime = +new Date();
        this.data.now = this.data.startTime;
        this.$update();
      },
      formatHour: function () {},
      timeout: function () {
        var e = this;
        this.timer = setTimeout(function () {
          if (!(e.data.resttime <= 0)) {
            var t = 0;
            var n = +new Date();
            if (n < e.data.now) e.data.startTime -= e.data.now - n;
            if (n - e.data.now > 2e3) e.data.startTime += n - e.data.now;
            var i = Math.floor((n - e.data.startTime) / 1e3);
            e.data.resttime = e.data.allresttime - i;
            if (e.data.resttime < 0) e.data.resttime = 0;
            e.data.now = n;
            e.$update();
            e.timeout();
          } else {
            clearTimeout(e.timer);
            e.$emit('finish');
            e.$update();
          }
        }, this.data.interval / 10);
      },
      start: function () {
        this.timeout();
      },
      stop: function () {
        clearTimeout(this.timer);
      },
    });
    return n;
  },
  '235c21779ec98ac90606962a862dadc9',
  '217dcfc103efb36d2f192eecc4548797',
);
