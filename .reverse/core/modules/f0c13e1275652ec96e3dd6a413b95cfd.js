EDU(
  'f0c13e1275652ec96e3dd6a413b95cfd',
  function () {
    var e = window,
      t = NEJ.P('edu.m'),
      n = NEJ.P('edu.u'),
      i = NEJ.P('nej.ut'),
      o;
    var a = window.currentLanguage && 'en' === window.currentLanguage;
    t._$$TimerUtil = NEJ.C();
    o = t._$$TimerUtil._$extend(i._$$Event, !0);
    n._$getCurServerTime = o._$getCurServerTime = function () {
      return new Date().getTime() - (e.serverTimeDiff || 0);
    };
    n._$formatCommonTime = o._$formatCommonTime = function (e) {
      if (e == n.CONST.UNDETERMINDED_STARTTIME || e == n.CONST.UNDETERMINDED_ENDTIME)
        return a ? 'To be determined' : '待定';
      var t = a ? 'Unfilled Date' : '未填写时间';
      if (null != e && void 0 != e) {
        var i = new Date();
        i.setTime(e);
        t =
          i.getFullYear() +
          (a ? '/' : '年') +
          (i.getMonth() + 1) +
          (a ? '/' : '月') +
          i.getDate() +
          (a ? '/ ' : '日 ') +
          i.getHours() +
          ':' +
          (i.getMinutes() < 10 ? '0' : '') +
          i.getMinutes();
      }
      return t;
    };
    n._$formatDateTime = o._$formatDateTime = function (e) {
      var t = new Date();
      t.setTime(e || 0);
      return (
        t.getFullYear() +
        (a ? '-' : '年') +
        (t.getMonth() + 1 < 10 ? '0' + (t.getMonth() + 1) : t.getMonth() + 1) +
        (a ? '-' : '月') +
        (t.getDate() < 10 ? '0' + t.getDate() : t.getDate()) +
        (a ? '' : '日')
      );
    };
    n._$formatForumTime = o._$formatForumTime = function (e) {
      var t = a;
      var n = new Date();
      n.setTime(e || 0);
      var i = new Date();
      if (i.getTime() < n.getTime()) return t ? '1 second ago' : '1秒前';
      else if (i.getFullYear() != n.getFullYear())
        return n.getFullYear() + '-' + (n.getMonth() + 1) + '-' + n.getDate();
      else if (i.getMonth() != n.getMonth() || i.getDate() != n.getDate())
        return n.getMonth() + 1 + (t ? '/' : '月') + n.getDate() + (t ? '' : '日');
      else if (i.getHours() != n.getHours()) {
        var o = n.getMinutes();
        o = o < 10 ? '0' + o : o;
        return n.getHours() + ':' + o;
      } else if (i.getMinutes() != n.getMinutes())
        return i.getMinutes() - n.getMinutes() + (t ? ' minutes ago' : '分钟前');
      else if (i.getSeconds() != n.getSeconds())
        return i.getSeconds() - n.getSeconds() + (t ? ' seconds ago' : '秒前');
      else return t ? '1 second ago' : '1秒前';
    };
    n._$formatVideoTime = o._$formatVideoTime = function (e) {
      e = e || 0;
      var t = parseInt(e / 60);
      var n = parseInt(e % 60);
      return (t < 10 ? '0' + t : t) + ':' + (n < 10 ? '0' + n : n);
    };
    n._$formatTimeString = o._$formatTimeString = function (e) {
      e = e || 0;
      var t = Math.floor(e / 3600),
        n = Math.floor(e / 60) - 60 * t,
        i = Math.floor(e % 60);
      return (t < 10 ? '0' + t : t) + ':' + (n < 10 ? '0' + n : n) + ':' + (i < 10 ? '0' + i : i);
    };
    n._$formatShortTime = o._$formatShortTime = function (e) {
      var t = new Date();
      t.setTime(e);
      var n = t.getMonth() + 1;
      var i = t.getDate();
      return t.getFullYear() + '-' + (n < 10 ? '0' + n : n) + '-' + (i < 10 ? '0' + i : i);
    };
    o._$formatTimeStringWithDay = function (e) {
      e = e || 0;
      var t = Math.floor(e / 86400),
        n = Math.floor(e / 3600) - 24 * t,
        i = Math.floor(e / 60) - 60 * n - 24 * t * 60,
        o = Math.floor(e % 60);
      return (
        t +
        '天 ' +
        (n < 10 ? '0' + n : n) +
        ':' +
        (i < 10 ? '0' + i : i) +
        ':' +
        (o < 10 ? '0' + o : o)
      );
    };
    o._$formatTimeHtml = function (e) {
      e = e || 0;
      var t = Math.floor(e / 3600),
        n = Math.floor(e / 60) - 60 * t,
        i = Math.floor(e % 60);
      var o = t < 10 ? '0' + t : t;
      var a = n < 10 ? '0' + n : n;
      var r = i < 10 ? '0' + i : i;
      return (
        "<span class='f-time'><span calss='h'>" +
        o +
        "</span>:<span calss='m'>" +
        a +
        "</span>:<span calss='s'>" +
        r +
        '</span></span>'
      );
    };
    o.__init = function (e) {
      this.__totalTime = e.totalTime;
      this.__intervalTime = e.intervalTime;
      this.__formatTime(this.__totalTime);
      this.__supInit(e);
    };
    o.__formatTime = function (e) {
      this.__hour = Math.floor(e / 3600);
      this.__minute = Math.floor(e / 60) - 60 * this.__hour;
      this.__second = Math.floor(e % 60);
    };
    o._$getTime = function () {
      return this.__totalTime || 0;
    };
    o._$getHour = function () {
      return this.__hour || 0;
    };
    o._$getHourStr = function () {
      var e = this._$getHour();
      return e < 10 ? '0' + e : e + '';
    };
    o._$getMinute = function () {
      return this.__minute || 0;
    };
    o._$getMinuteStr = function () {
      var e = this._$getMinute();
      return e < 10 ? '0' + e : e + '';
    };
    o._$getSecond = function () {
      return this.__second || 0;
    };
    o._$getSecondStr = function () {
      var e = this._$getSecond();
      return e < 10 ? '0' + e : e + '';
    };
    o._$start = function () {
      if (!this.__setItl)
        this.__setItl = e.setInterval(this.__itlCallback._$bind(this), 1e3 * this.__intervalTime);
    };
    o.__itlCallback = function () {
      var e = 'timer';
      this.__totalTime -= this.__intervalTime;
      if (this.__totalTime <= 0) {
        this.__totalTime = 0;
        this.__clearItl();
        e = 'timerComplete';
      }
      this.__formatTime(this.__totalTime);
      this._$dispatchEvent(e);
    };
    o.__clearItl = function () {
      if (this.__setItl) this.__setItl = e.clearInterval(this.__setItl);
    };
    o._$stop = function () {
      this.__clearItl();
    };
    o.__reset = function (e) {
      this.__supReset(e);
    };
    NEJ.copy(NEJ.P('edu.u'), o);
    return o;
  },
  'f0b73688b257e4ee4d3a3fafef7aafc1',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
