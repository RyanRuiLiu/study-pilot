EDU(
  '89a466f05573f560c156411121b8daae',
  function (e, t) {
    var n = window.currentLanguage && 'en' === window.currentLanguage;
    var i = {},
      o = (function () {
        return this;
      })();
    i._$getServerRespondTime = (function () {
      var e = new Date().getTime();
      return function () {
        return o.serverTimeDiff ? e - o.serverTimeDiff : e;
      };
    })();
    i._$getCurServerTime = function () {
      var e = new Date().getTime();
      return o.serverTimeDiff ? e - o.serverTimeDiff : e;
    };
    i._$getTimeData = (function () {
      var e = ['上午', '下午'],
        t = ['A.M.', 'P.M.'],
        n = ['日', '一', '二', '三', '四', '五', '六'],
        i = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        o = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      var a = function (e) {
        e = parseInt(e) || 0;
        return (e < 10 ? '0' : '') + e;
      };
      var r = function (e) {
        return e < 12 ? 0 : 1;
      };
      return function (s, c) {
        var d = { i: !0, r: /\byyyy|yy|MM|cM|eM|M|dd|d|HH|H|mm|ms|ss|m|s|w|ct|et\b/g };
        if (!s) return '';
        s = new Date(1 * s);
        d.yyyy = s.getFullYear();
        d.yy = ('' + d.yyyy).substr(2);
        d.M = s.getMonth() + 1;
        d.MM = a(d.M);
        d.eM = o[d.M - 1];
        d.cM = i[d.M - 1];
        d.d = s.getDate();
        d.dd = a(d.d);
        d.H = s.getHours();
        d.HH = a(d.H);
        d.m = s.getMinutes();
        d.mm = a(d.m);
        d.s = s.getSeconds();
        d.ss = a(d.s);
        d.ms = s.getMilliseconds();
        d.w = n[s.getDay()];
        var l = r(d.H);
        d.ct = e[l];
        d.et = t[l];
        if (c) d.H = d.H % 12;
        return d;
      };
    })();
    i._$formatTime = function (e, n, o) {
      return t._$encode(i._$getTimeData(e, o), n || 'yyyy-MM-dd');
    };
    i._$formatCommonTime = function (e) {
      if (32503651201e3 == e || 32535187201e3 == e) return n ? 'To be determined' : '待定';
      else return i._$formatTime(e, 'yyyy/MM/dd HH:mm');
    };
    i._$formatPeriod = function (e, o, a, r) {
      e = e || +new Date();
      o = o || +new Date();
      a = a || 'yyyy-MM-dd';
      if (32503651201e3 == e && 32535187201e3 == o) return n ? 'To be determined' : '待定';
      else
        return (
          t._$encode(i._$getTimeData(e), a) + (r ? r : ' - ') + t._$encode(i._$getTimeData(o), a)
        );
    };
    i._$tiktok = function (e, t) {
      var n = t || this._$getCurServerTime(),
        i = e - n,
        o,
        a,
        r,
        s;
      if (i < 1e3) return null;
      o = ~~(~~(i / 1e3) / 86400);
      a = ~~((~~(i / 1e3) - 86400 * o) / 3600);
      r = ~~((~~(i / 1e3) - 86400 * o - 3600 * a) / 60);
      s = ~~(i / 1e3) - 86400 * o - 3600 * a - 60 * r;
      _ms = i - 1e3 * (86400 * o + 3600 * a + 60 * r + s);
      return { d: o || 0, h: a || 0, m: r || 0, s: s || 0, ms: _ms || 0 };
    };
    i._$formateTiktokByHMS = function (e) {
      var t = this._$tiktok(e);
      var n, i, o;
      if (t) {
        n = t.h + 24 * t.d < 10 ? '0' + (t.h + 24 * t.d) : t.h + 24 * t.d;
        i = t.m < 10 ? '0' + t.m : t.m;
        o = t.s < 10 ? '0' + t.s : t.s;
        return n + ':' + i + ':' + o;
      }
      return '';
    };
    i._$formatTiktokTime = function (e, t) {
      var n = this._$tiktok(e, t);
      if (!n) return null;
      if (n.d >= 1) return n.d + '天' + n.h + '小时' + n.m + '分钟';
      else if (n.h >= 1) return n.h + '小时' + n.m + '分钟';
      else if (n.m >= 1) return n.m + '分钟';
      else return n.s + '秒钟';
    };
    i._$getCurDayPharse = function () {
      var e = new Date(this._$getCurServerTime()),
        t = e.getHours(),
        n = '';
      if (t < 6) n = '凌晨';
      else if (t < 9) n = '早上';
      else if (t < 12) n = '上午';
      else if (t < 14) n = '中午';
      else if (t < 17) n = '下午';
      else if (t < 24) n = '晚上';
      return n;
    };
    i._$getReplyTime = function (e) {
      var t = new Date(e || 0);
      var n = new Date(this._$getCurServerTime());
      if (n.getTime() < t.getTime()) return '1秒前';
      else if (n.getFullYear() != t.getFullYear()) return i._$formatTime(e, 'yyyy年MM月dd日');
      else if (n.getMonth() != t.getMonth() || n.getDate() != t.getDate())
        return i._$formatTime(e, 'MM月dd日');
      else if (n.getHours() != t.getHours()) return i._$formatTime(e, 'HH:mm');
      else if (n.getMinutes() != t.getMinutes()) return n.getMinutes() - t.getMinutes() + '分钟前';
      else if (n.getSeconds() != t.getSeconds()) return n.getSeconds() - t.getSeconds() + '秒前';
      else return '1秒前';
    };
    i._$formatByRuleA = function (e) {
      var t = new Date(e || 0);
      var n = new Date(this._$getCurServerTime());
      var o = new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime();
      var a = new Date(o - 864e5).getTime();
      var r = this._$tiktok(this._$getCurServerTime(), e);
      if (n.getTime() < t.getTime() || !r) return '刚刚';
      else if (n.getFullYear() != t.getFullYear()) return i._$formatTime(e, 'yyyy年M月d日');
      else if ((n.getDate() != t.getDate() || n.getMonth() != t.getMonth()) && t.getTime() < a)
        return i._$formatTime(e, 'M月d日');
      else if (t.getTime() >= a && t.getTime() < o) return i._$formatTime(e, '昨天 HH:mm');
      else if (t.getTime() >= o && r.h >= 1) return i._$formatTime(e, '今天 HH:mm');
      else if (r.m >= 1) return r.m + '分钟前';
      else return '刚刚';
    };
    i._$formatByRuleB = function (e) {
      var t = new Date(e || 0);
      var n = new Date(this._$getCurServerTime());
      var o = new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime();
      var a = new Date(o - 864e5).getTime();
      if (n.getFullYear() != t.getFullYear()) return i._$formatTime(e, 'yyyy年M月d日 HH:mm');
      else if ((n.getDate() != t.getDate() || n.getMonth() != t.getMonth()) && t.getTime() < a)
        return i._$formatTime(e, 'M月d日 HH:mm');
      else if (t.getTime() >= a && t.getTime() < o) return i._$formatTime(e, '昨天 HH:mm');
      else return i._$formatTime(e, '今天 HH:mm');
    };
    i._$Millisec2Str = i._$formatVideoTime = function (e) {
      e = e || 0;
      var t = Math.floor(e / 3600),
        n = Math.floor(e / 60) - 60 * t,
        i = Math.floor(e % 60),
        o = (n < 10 ? '0' + n : n) + ':' + (i < 10 ? '0' + i : i);
      if (t > 0) o = (t < 10 ? '0' + t : t) + ':' + o;
      return o;
    };
    i._$str2Millisec = function (e) {
      var t = e.split(':'),
        n = 0;
      var i = t.length - 1,
        o = i - 1 >= 0 ? 60 * t[i - 1] : 0,
        a = i - 2 >= 0 ? 3600 * t[i - 2] : 0;
      return Number(t[i]) + o + a;
    };
    i._$getDiffDays = function (e, t, n) {
      ((e = new Date(e)), (t = new Date(t)));
      var i = (t - e) / 864e5;
      return n ? Math.floor(i) : Math.ceil(i);
    };
    i._$getDiffDays2 = function (e, t) {
      var n = new Date(e);
      var i = new Date(t);
      var o = Math.floor((i - n) / 864e5);
      var a = new Date(i - 24 * o * 60 * 60 * 1e3);
      if (a.getDate() == n.getDate()) return o;
      else return o + 1;
    };
    return i;
  },
  'a7d1128d22219f1def1727e67cfa7d44',
  'a225fd9e6aba8ca4ae39f96771726601',
);
