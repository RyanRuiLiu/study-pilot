EDU(
  'b803fd38b5faf2609a81b93c9bf1d352',
  function (e, t) {
    var n = {},
      i = (function () {
        return this;
      })(),
      o = (i.eduProduct && i.eduProduct.gaProduct) || i.gaProduct || 'study';
    var a = (function r() {
      var e = document.createElement('img');
      return function (n) {
        e.src = '//log.study.163.com/__utm.gif?p=' + o + '&dt=' + t._$str2hex(n);
      };
    })();
    n._$trackPageView = function (e, t) {
      var n;
      if (!t) t = location.pathname + location.search;
      t += e ? location.hash : '';
      if (i[i.gaqStr]) i[i.gaqStr].push([i.gaTrackPageview, t]);
      n = {
        action: 'pageview',
        Utmp: location.href || '',
        Utmr: document.referrer || '',
        providerId: window.siteInfo
          ? window.siteInfo.providerId
          : window.provider
            ? window.provider.id
            : null,
        uid: window.webUser ? window.webUser.id : null,
      };
      a(JSON.stringify(n));
    };
    n._$trackEvent = function (e, t, n, o) {
      if (e && t) {
        var a = [i.gaTrackEvent, e, t];
        if (n) {
          a.push(n);
          if (void 0 != o && null != o) a.push(parseInt(o));
        }
        if (i[i.gaqStr]) i[i.gaqStr].push(a);
      }
    };
    n._$log = function (e) {
      if (e.bizdat) {
        for (x in e.bizdat) e[x] = e.bizdat[x];
        delete e.bizdat;
      }
      a(JSON.stringify(e));
    };
    n._$addInrefTrack = function (e, t) {
      if (e && t) return e + (e.indexOf('?') == -1 ? '?' : '&') + 'inref=' + t;
    };
    return n;
  },
  'a7d1128d22219f1def1727e67cfa7d44',
  'af8805404cc0bd2b95d3d3c9573484b1',
);
