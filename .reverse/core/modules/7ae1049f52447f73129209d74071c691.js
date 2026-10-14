EDU(
  '7ae1049f52447f73129209d74071c691',
  function (e) {
    var t = window,
      n = NEJ.P('edu.m'),
      i = NEJ.P('edu.u'),
      o = NEJ.P('nej.ut'),
      a;
    var r = window.currentLanguage && 'en' === window.currentLanguage;
    n._$$TimerUtil = NEJ.C();
    a = n._$$TimerUtil._$extend(o._$$Event, !0);
    a._$getCurServerTime = function () {
      return new Date().getTime() - t.serverTimeDiff;
    };
    a._$formatCommonTime = function (e) {
      if (e == i.CONST.UNDETERMINDED_STARTTIME || e == i.CONST.UNDETERMINDED_ENDTIME)
        return r ? 'To be determined' : '待定';
      var t = r ? 'Unfilled Date' : '未填写时间';
      if (null != e && void 0 != e) {
        var n = new Date();
        n.setTime(e);
        t =
          n.getFullYear() +
          (r ? '/' : '年') +
          (n.getMonth() + 1) +
          (r ? '/' : '月') +
          n.getDate() +
          (r ? '/ ' : '日 ') +
          n.getHours() +
          ':' +
          (n.getMinutes() < 10 ? '0' : '') +
          n.getMinutes();
      }
      return t;
    };
    a._$formatDateTime = function (e) {
      var t = new Date();
      t.setTime(e || 0);
      return (
        t.getFullYear() +
        (r ? '-' : '年') +
        (t.getMonth() + 1 < 10 ? '0' + (t.getMonth() + 1) : t.getMonth() + 1) +
        (r ? '-' : '月') +
        (t.getDate() < 10 ? '0' + t.getDate() : t.getDate()) +
        (r ? '-' : '日')
      );
    };
    a._$formatForumTime = function (t) {
      var n = e.isEn();
      var i = new Date();
      i.setTime(t || 0);
      var o = new Date();
      if (o.getTime() < i.getTime()) return n ? '1 second ago' : '1秒前';
      else if (o.getFullYear() != i.getFullYear())
        return i.getFullYear() + '-' + (i.getMonth() + 1) + '-' + i.getDate();
      else if (o.getMonth() != i.getMonth() || o.getDate() != i.getDate())
        return i.getMonth() + 1 + n ? '/' : '月' + i.getDate() + n ? '' : '日';
      else if (o.getHours() != i.getHours()) {
        var a = i.getMinutes();
        a = a < 10 ? '0' + a : a;
        return i.getHours() + ':' + a;
      } else if (o.getMinutes() != i.getMinutes())
        return o.getMinutes() - i.getMinutes() + n ? ' minutes ago' : '分钟前';
      else if (o.getSeconds() != i.getSeconds())
        return o.getSeconds() - i.getSeconds() + n ? ' seconds ago' : '秒前';
      else return n ? '1 second ago' : '1秒前';
    };
    a._$formatVideoTime = function (e) {
      e = e || 0;
      var t = parseInt(e / 60);
      var n = parseInt(e % 60);
      return (t < 10 ? '0' + t : t) + ':' + (n < 10 ? '0' + n : n);
    };
    a._$formatTimeString = function (e) {
      e = e || 0;
      var t = Math.floor(e / 3600),
        n = Math.floor(e / 60) - 60 * t,
        i = Math.floor(e % 60);
      return (t < 10 ? '0' + t : t) + ':' + (n < 10 ? '0' + n : n) + ':' + (i < 10 ? '0' + i : i);
    };
    a._$formatTimeStringWithDay = function (e) {
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
    a._$formatTimeHtml = function (e) {
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
    a._$formatShortTime = function (e) {
      var t = new Date();
      t.setTime(e);
      var n = t.getMonth() + 1;
      var i = t.getDate();
      return t.getFullYear() + '-' + (n < 10 ? '0' + n : n) + '-' + (i < 10 ? '0' + i : i);
    };
    a.__init = function (e) {
      this.__totalTime = e.totalTime;
      this.__intervalTime = e.intervalTime;
      this.__formatTime(this.__totalTime);
      this.__supInit(e);
    };
    a.__formatTime = function (e) {
      this.__hour = Math.floor(e / 3600);
      this.__minute = Math.floor(e / 60) - 60 * this.__hour;
      this.__second = Math.floor(e % 60);
    };
    a._$getTime = function () {
      return this.__totalTime || 0;
    };
    a._$getHour = function () {
      return this.__hour || 0;
    };
    a._$getHourStr = function () {
      var e = this._$getHour();
      return e < 10 ? '0' + e : e + '';
    };
    a._$getMinute = function () {
      return this.__minute || 0;
    };
    a._$getMinuteStr = function () {
      var e = this._$getMinute();
      return e < 10 ? '0' + e : e + '';
    };
    a._$getSecond = function () {
      return this.__second || 0;
    };
    a._$getSecondStr = function () {
      var e = this._$getSecond();
      return e < 10 ? '0' + e : e + '';
    };
    a._$start = function () {
      if (!this.__setItl)
        this.__setItl = t.setInterval(this.__itlCallback._$bind(this), 1e3 * this.__intervalTime);
    };
    a.__itlCallback = function () {
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
    a.__clearItl = function () {
      if (this.__setItl) this.__setItl = t.clearInterval(this.__setItl);
    };
    a._$stop = function () {
      this.__clearItl();
    };
    a.__reset = function (e) {
      this.__supReset(e);
    };
    NEJ.copy(NEJ.P('edu.u'), a);
    return a;
  },
  '0bfe59f6a064f7cd0db6f0bc1556935d',
  'dc23abdd9ec77b6ec770cfabbd77283f',
  '93828627ddb358ed890cb65967a0c1de',
  'dc23abdd9ec77b6ec770cfabbd77283f',
);
