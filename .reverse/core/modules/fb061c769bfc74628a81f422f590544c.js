EDU(
  'fb061c769bfc74628a81f422f590544c',
  function (e, t, n) {
    var i = {},
      o = (function () {
        return this;
      })();
    i._$parseUrlParams = function (e) {
      var n = e.split('?');
      if (n[1]) return t._$query2object(n[1]);
      else return {};
    };
    i._$isRightUMI = function (e, t) {
      if (!e || !t) return !1;
      var n = o.decodeURIComponent(e);
      var i = n.indexOf('?');
      i = i >= 0 ? i : n.length;
      n = n.substring(n.indexOf('#') + 1, i);
      return n == t;
    };
    i._$getDecodeCurUrl = function (e, n) {
      var n = n || o.returnUrl || location.href;
      n = o.encodeURI(o.decodeURI(n));
      var i = n.indexOf('#');
      var a = '';
      if (i >= 0) {
        a = n.substring(i);
        n = n.substring(0, i);
      }
      var r = n.indexOf('?');
      var s = [];
      if (e)
        t._$forIn(
          e,
          function (e, t) {
            n += '&' + t + (e ? '=' + e : '');
          },
          this,
        );
      n += a;
      return n;
    };
    i._$getReturnUrl = function (e, t) {
      return n._$str2b64(i._$getDecodeCurUrl(e, t));
    };
    i._$changeUrlProtocol = function (e, t) {
      var n;
      if (!e) return '';
      n = e.replace(/^(http:|https:)/, t ? t + ':' : '');
      return n;
    };
    i._$isEduUrl = function (e) {
      var n = !1;
      var i = ['study.163.com', '100.163.com', 'geek.163.com', 'icourse163.org'];
      t._$forEach(i, function (t, i) {
        var o = new RegExp('^((http:)*|(https:)*)(//)*(\\w+\\.)*' + t.replace('.', '\\.'));
        if (o.test(e)) n = !0;
      });
      return n;
    };
    return i;
  },
  'a7d1128d22219f1def1727e67cfa7d44',
  'fe86216ed59e3103a56c42c850d389f0',
  'c23a9d4e237326dadfa12366ae1b6e48',
);
