EDU(
  'b7fc133486c3e69fac5e1cd5bca47c40',
  function (e) {
    function t(e) {
      return function (t) {
        return Object.prototype.toString.call(t) === '[object ' + e + ']';
      };
    }
    var n = {},
      i = (function () {
        return this;
      })();
    var o = function (e) {
      return t('Number')(e) && e === e;
    };
    n._$formatNum = function (e, t) {
      return function (n) {
        var i;
        n = +n;
        if (!o(n)) return 0;
        var a = e / 10;
        i = n > e ? (n % e >= a ? (n / e).toFixed(1) : (n / e).toFixed(0)) : n;
        return n > e ? i + t : i;
      };
    };
    n._$num10000 = n._$formatNum(1e4, '万');
    n._$formatFileSize = function (e) {
      if (0 === e) return '0B';
      var t = 1024;
      var n = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      var i = Math.floor(Math.log(e) / Math.log(t));
      return (e / Math.pow(t, i)).toFixed(2) + n[i];
    };
    n._$formatWithComma = function (e, t) {
      t = t >= 0 && t <= 20 ? t : 2;
      e = e.toFixed(t);
      var n = e.toString().split('.')[0];
      var i = e.toString().split('.')[1];
      var o = n.length;
      var a = '';
      if (o <= 3) return e;
      var r = o % 3;
      var s =
        r > 0
          ? n.slice(0, r) + ',' + n.slice(r, o).match(/\d{3}/g).join(',')
          : n.slice(r, o).match(/\d{3}/g).join(',');
      return 0 == t ? s : s + '.' + i;
    };
    n._$toChineseNum = function (e) {
      var t = {
        0: '零',
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五',
        6: '六',
        7: '七',
        8: '八',
        9: '九',
        10: '十',
      };
      var n = { 0: '', 1: '十', 2: '百', 3: '千', 4: '万' };
      var i = 0,
        o = 10;
      var a;
      e = +e || i;
      e += '';
      if (e <= o) return t[e];
      a = e.split('').reverse();
      return a
        .map(function (e, o) {
          if (e === i) return o === i ? '' : t[e];
          else return t[e] + n[o];
        })
        .reverse()
        .join('')
        .replace(/零+/g, t[i])
        .replace(/零$/, '')
        .replace(/^一十/, t[o]);
    };
    n.isDecimal = function (e) {
      return e % 1 != 0;
    };
    n.numToPercent = function (e, t) {
      e = e || 0;
      t = t || 2;
      return (100 * e).toFixed(t) + '%';
    };
    n.decimalPlacesNum = function (e) {
      if (!isNaN(1 * e)) {
        var t = (e + '').split('.');
        if (t.length > 1) return t[1].length;
        else return 0;
      }
    };
    return n;
  },
  'a7d1128d22219f1def1727e67cfa7d44',
);
