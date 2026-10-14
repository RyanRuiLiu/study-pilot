EDU(
  '7af1d8adfbbd073e9119142538a22e8e',
  function (e) {
    var t = {},
      n = (function () {
        return this;
      })();
    t._$removeNRNBSP = function (e) {
      return (e || '').replace(/[\t\r\n]+/gi, ' ').replace(/[ ]+/gi, ' ');
    };
    t._$filterText = function (e) {
      var n = document.createElement('div');
      n.innerHTML = e;
      return t._$removeNRNBSP(n.innerText);
    };
    t._$getStringLength = function (e) {
      e = e || '';
      e = e.replace(/^\n+|\n+$/g, '');
      var t = e.length,
        n = 0;
      var i = e.match(/[^\x00-\x80]/g);
      if (i && i.length > 0) n = i.length || 0;
      return t + n;
    };
    t._$sliceStrByLength = function (e, t) {
      e = e || '';
      var n = '',
        i = e.length,
        e = e.split(''),
        o = 0;
      for (var a = 0; a < i; a++) {
        var r = e[a];
        var s = r.match(/[^\x00-\x80]|[A-Z]/g);
        if (s && s.length > 0) o += 2;
        else o += 1;
        if (o > t) break;
        n += r;
      }
      return n;
    };
    t._$ellipsisStrByLength = function (e, n) {
      var i = e;
      if (t._$getStringLength(i) > n) i = t._$sliceStrByLength(i, n) + '...';
      return i;
    };
    t._$getStringLengthForEditor = function (e) {
      e = e || '';
      e = e.replace(/\s/g, '');
      e = e.replace(/^\n+|\n+$/g, '');
      var t = e.length;
      return t;
    };
    t._$isEmoilString = function (e) {
      var t = /\ud83c[\udf00-\udfff]|\ud83d[\udc00-\ude4f]|\ud83d[\ude80-\udeff]/g;
      return t.test(e) ? 1 : 0;
    };
    t._$copy = function i(e, t, n) {
      var i;
      var o = document.createElement('textarea');
      o.readOnly = !0;
      o.innerText = e;
      o.style.opacity = '0';
      o.style.position = 'fixed';
      o.left = -1e3;
      o.top = -1e3;
      document.body.appendChild(o);
      o.select();
      o.setSelectionRange(0, o.value.length);
      try {
        i = document.execCommand('Copy');
        if (i) n && n();
        else t && t();
      } catch (a) {
        t && t(a);
      } finally {
        document.body.removeChild(o);
      }
      return i;
    };
    t._$isUnvaildString = function (e) {
      var t = /[\\;,\/；，、]/;
      return t.test(e) ? 1 : 0;
    };
    return t;
  },
  'a7d1128d22219f1def1727e67cfa7d44',
);
