EDU('1b142913848c09df226ad8fac907e872', function () {
  var e = {};
  e.format = (function () {
    function e(e) {
      e = '' + (String(e) || '');
      return e.length <= 1 ? '0' + e : e;
    }
    var t = {
      yyyy: function (e) {
        return e.getFullYear();
      },
      MM: function (t) {
        return e(t.getMonth() + 1);
      },
      dd: function (t) {
        return e(t.getDate());
      },
      HH: function (t) {
        return e(t.getHours());
      },
      mm: function (t) {
        return e(t.getMinutes());
      },
      ss: function (t) {
        return e(t.getSeconds());
      },
    };
    var n = new RegExp(Object.keys(t).join('|'), 'g');
    return function (e, i) {
      if (!e) return '';
      if (e >= 32503651201e3) return '待定';
      i = i || 'yyyy-MM-dd HH:mm';
      e = new Date(e);
      return i.replace(n, function (n) {
        return t[n] ? t[n](e) : '';
      });
    };
  })();
  e.average = function (e, t) {
    e = e || [];
    return e.length ? exports.total(e, t) / e.length : 0;
  };
  e.total = function (e, t) {
    var n = 0;
    if (e) {
      e.forEach(function (e) {
        n += t ? e[t] : e;
      });
      return n;
    }
  };
  e.filter = function (e, t) {
    if (e && e.length)
      return e.filter(function (e, n) {
        return t(e, n);
      });
  };
  return e;
});
